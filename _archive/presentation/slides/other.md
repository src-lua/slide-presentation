---
layout: default
---

# Código

```cpp


```

---
layout: default
---

# Múltiplos Códigos

<div class="grid grid-cols-2 gap-4">

```cpp
// Função 1
int funcao1() {
    return 42;
}
```

```cpp
// Função 2
void funcao2() {
    // ...
}
```

</div>

<div class="mt-4">

```cpp
// Função principal que usa as anteriores
int main() {
    int x = funcao1();
    funcao2();
    return 0;
}
```

</div>

<!--
Múltiplos blocos de código em um slide
2 em cima, 1 embaixo
-->

---
layout: default
class: bg-dark text-white
---

# Slide com Background Escuro

Conteúdo em background escuro.

- Ponto 1
- Ponto 2
- Ponto 3

<AnnotationBox>
Anotação em vermelho sobre fundo escuro
</AnnotationBox>

<!--
Use class="bg-dark text-white" para slides escuros
-->

---
layout: default
---

# Combinando Elementos

<div class="grid grid-cols-2 gap-4">

<div>

**Código:**

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```

</div>

<div>

**Complexidade:**

Recursão simples: $O(2^n)$

<AnnotationBox>
⚠️ **Ineficiente!** Use DP para $O(n)$
</AnnotationBox>

**Com memoização:**
- Tempo: $O(n)$
- Espaço: $O(n)$

</div>

</div>

<!--
Combinação: código + análise + anotação
-->

---
layout: center
---

# Slide de Destaque

<div class="text-3xl text-primary">
Informação importante
</div>

<div class="mt-8 text-xl opacity-80">
Explicação adicional
</div>

<!--
Use para destacar informações cruciais
class="text-primary" aplica a cor vermelha (#DB1E2F)
-->

---
layout: default
---

# Lista com Destaques

- <span class="text-primary">**Primeiro ponto importante**</span>
  - Detalhes do primeiro ponto
  - Mais informações

- <span class="text-primary">**Segundo ponto importante**</span>
  - Detalhes do segundo ponto

- Ponto normal sem destaque

<AnnotationBox>
💡 **Dica:** Use `text-primary` para destacar em vermelho
</AnnotationBox>

<!--
Destaque pontos importantes com cor do tema
-->

---
layout: two-cols
---

# Prós e Contras

## ✅ Vantagens

- Vantagem 1
- Vantagem 2
- Vantagem 3

## 💡 Casos de Uso

- Caso 1
- Caso 2

::right::

## ❌ Desvantagens

- Desvantagem 1
- Desvantagem 2

## ⚠️ Limitações

- Limitação 1
- Limitação 2

<AnnotationBox size="small">
Use com cautela!
</AnnotationBox>

<!--
Layout para análise: prós vs contras
Use emojis para visual mais amigável
-->

---
layout: default
---

# Tabela Comparativa

| Característica | Opção A | Opção B | Opção C |
|----------------|---------|---------|---------|
| Complexidade | $O(n)$ | $O(\log n)$ | $O(1)$ |
| Espaço | Alto | Médio | Baixo |
| Implementação | Fácil | Média | Difícil |

<AnnotationBox>
📊 **Escolha:** Depende do caso de uso específico
</AnnotationBox>

<!--
Tabelas são suportadas em Markdown
Ótimas para comparações estruturadas
-->

---
layout: center
class: text-center
---

# Fim da Seção

<div class="text-xl opacity-80 mt-8">
Próximo: [Outro Tópico]
</div>

<!--
Slide de transição entre seções principais
-->

---
layout: center
class: text-center
---

# Obrigado!

<div class="mt-8">

## Perguntas?

<div class="text-sm opacity-70 mt-4">
Contato: seu@email.com<br>
GitHub: @seuusername
</div>

</div>

<!--
Slide final - Perguntas e contato
-->

---
layout: default
---

# Referências e Recursos

## Documentação

- [Slidev](https://sli.dev) - Framework de apresentação
- [KaTeX](https://katex.org/docs/supported.html) - Sintaxe matemática
- [Shiki](https://shiki.matsu.io/) - Syntax highlighting

## Componentes Customizados

- `<AnnotationBox>`: Caixa vermelha para anotações
- `<AnnotationBox size="small">`: Versão menor

## Layouts Disponíveis

- `default`: Padrão com título
- `center`: Conteúdo centralizado
- `two-cols`: Duas colunas
- `code-compare`: Comparação de código
- `diagram`: Slide para diagramas

<!--
Slide de referências - opcional
-->