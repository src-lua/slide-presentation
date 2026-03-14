/**
 * Script de inicialização do TikZJax
 * Deve ser carregado ANTES do tikzjax.js
 */

(function() {
  console.log('[TikZ Init] Configurando TikZJax...');

  // Detecta o base path automaticamente
  const currentScript = document.currentScript;
  const basePath = currentScript ? new URL('.', currentScript.src).pathname + 'tikz/' : '/tikz/';

  console.log('[TikZ Init] Base path:', basePath);

  // Configuração global para o TikZJax
  // IMPORTANTE: Estas variáveis devem ser definidas ANTES de carregar tikzjax.js
  if (typeof window !== 'undefined') {
    // Configuração para o rod2ik/tikzjax
    window.texWasmPath = basePath + 'tex.wasm';
    window.texDumpPath = basePath + 'core.dump.gz';

    console.log('[TikZ Init] Configurado:');
    console.log('  - texWasmPath:', window.texWasmPath);
    console.log('  - texDumpPath:', window.texDumpPath);
  }

  // Listener para verificar quando o TikZJax carregar
  window.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
      if (window.tikzjax) {
        console.log('[TikZ Init] TikZJax carregado e pronto!');
        // Dispara evento custom para indicar que está pronto
        document.dispatchEvent(new CustomEvent('tikzjax-ready'));
      } else {
        console.warn('[TikZ Init] TikZJax não foi carregado após 1 segundo');
      }
    }, 1000);
  });
})();
