/**
 * API endpoint para compilar TikZ usando node-tikzjax
 */
import { tex, dvi2svg, load } from 'node-tikzjax'

let tikzLoaded = false

// Fila de compilação para evitar processamento simultâneo
type CompilationTask = {
  code: string
  libraries: string[]
  resolve: (svg: string) => void
  reject: (error: Error) => void
}

const compilationQueue: CompilationTask[] = []
let processingPromise: Promise<void> | null = null

async function processQueue() {
  while (compilationQueue.length > 0) {
    const task = compilationQueue.shift()!

    try {
      console.log(`[TikZ Queue] Processando (${compilationQueue.length} restantes na fila)`)

      // Envolve o código TikZ em um documento LaTeX completo
      const fullCode = `\\begin{document}\n${task.code}\n\\end{document}`

      // Compila o TikZ
      const dvi = await tex(fullCode, {
        tikzLibraries: task.libraries.join(','),
        showConsole: true
      })

      // Converte DVI para SVG
      const svgBuffer = await dvi2svg(dvi)
      const svg = svgBuffer.toString()

      console.log('[TikZ Queue] ✓ SVG gerado com sucesso!')
      task.resolve(svg)

    } catch (err: any) {
      console.error('[TikZ Queue] ✗ ERRO:', err.message)
      if (err.log) console.error('[TikZ Queue] Log:', err.log)
      task.reject(err)
    }
  }
}

async function enqueueTikzCompilation(code: string, libraries: string[]): Promise<string> {
  return new Promise((resolve, reject) => {
    compilationQueue.push({ code, libraries, resolve, reject })

    // Inicia o processamento se não estiver rodando
    if (!processingPromise) {
      console.log('[TikZ Queue] Iniciando processamento da fila')
      processingPromise = processQueue().finally(() => {
        processingPromise = null
        console.log('[TikZ Queue] Fila processada completamente')
      })
    }
  })
}

export async function handleTikzRequest(req: any, res: any) {
  if (req.method !== 'POST') {
    res.statusCode = 405
    res.end('Method Not Allowed')
    return
  }

  try {
    // Carrega o TikZ (apenas uma vez)
    if (!tikzLoaded) {
      console.log('[TikZ API] Carregando node-tikzjax...')
      await load()
      tikzLoaded = true
      console.log('[TikZ API] node-tikzjax carregado!')
    }

    // Lê o body
    let body = ''
    req.on('data', (chunk: Buffer) => {
      body += chunk.toString()
    })

    await new Promise((resolve) => req.on('end', resolve))

    const { code, libraries = [] } = JSON.parse(body)

    if (!code) {
      throw new Error('Código TikZ vazio')
    }

    console.log('[TikZ API] ==========================================')
    console.log('[TikZ API] Enfileirando código TikZ')
    console.log('[TikZ API] Tamanho:', code.length, 'caracteres')
    console.log('[TikZ API] Bibliotecas:', libraries)
    console.log('[TikZ API] Primeiros 100 chars:', code.substring(0, 100))
    console.log('[TikZ API] ==========================================')

    // Usa a fila para compilar (evita compilações simultâneas)
    const svg = await enqueueTikzCompilation(code, libraries)

    // Retorna o SVG
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ svg }))

  } catch (err: any) {
    console.error('[TikZ API] ==========================================')
    console.error('[TikZ API] ERRO NA COMPILAÇÃO')
    console.error('[TikZ API] Mensagem:', err.message)
    console.error('[TikZ API] Stack:', err.stack)
    if (err.log) console.error('[TikZ API] Log do TeX:', err.log)
    console.error('[TikZ API] ==========================================')

    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({
      error: err.message || 'Erro desconhecido',
      log: err.log || undefined
    }))
  }
}
