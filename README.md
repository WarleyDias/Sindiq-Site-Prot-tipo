# Sindiq Prototype

Protótipo de landing page interativa e de alta conversão para a plataforma Sindiq, voltado à administração e gestão inteligente de condomínios.

## Visão Geral do Projeto

Este repositório contém a interface de pré-venda e apresentação institucional do Sindiq. O escopo do projeto visa demonstrar recursos chave através de mockups dinâmicos e garantir alto engajamento através de animações assíncronas no scroll da página e componentes reativos, como a simulação de chat de suporte integrado.

## Arquitetura e Tomada de Decisão Técnica

O projeto foi migrado para a arquitetura **Next.js 14+ (App Router)** utilizando **TypeScript** nativo. 

Tratando-se de uma interface de alto desempenho voltada à conversão de vendas e usabilidade contínua (SaaS), o uso de Next.js provê:
1. **Otimização de Imagens:** Ativos gráficos estão localizados no diretório `/public` para lazy loading nativo.
2. **Componentização React:** Facilita a manutenção dos elementos da interface, especialmente nas integrações contextuais com a inteligência do chatbot (state machine) e GSAP Animations.
3. **Estilização Atômica:** Tailwind CSS integrado assegura a manutenção dos mockups CSS puramente nativos sem acúmulo de bytes pesados na rede.

### Tecnologias Implementadas

*   **Next.js (App Router):** Roteamento SSR/SSG.
*   **TypeScript:** Tipagem estática robusta garantindo baixa quebra durante a evolução do app.
*   **Tailwind CSS:** Utilizado para estilização utilitária ágil, responsividade mobile-first e estruturação de layouts complexos como o painel isométrico de cartas de apresentação utilizando `transform-gpu` e `rotate`.
*   **GSAP (GreenSock Animation Platform):** Motor responsável pela cadência das animações e tracking de viewport (`ScrollTrigger`). Assegura performance mantendo processamento restrito via GPU em transformações complexas.
*   **Lucide Icons:** Conjunto de ícones compatíveis nativamente.

## Componentes de Destaque

1.  **Chatbot de Triagem Institucional:**
    Simulação assíncrona orientada a manipulações dinâmicas. Implementa delay contextual (typing indicators) dependendo do input e interage reativamente via botões iterativos baseados em heurísticas que instanciam respostas engatilhando endpoints externos nativos (`mailto:` e `wa.me`).

2.  **Painel Isométrico Front-End:**
    Composição que prescinde de imagens estáticas retangulares formatadas por software gráfico, adotando puro código e Z-Index iterativo nativo com desfoque de fundo (backdrop-filter) provendo um painel analítico interativo e dinâmico aos eventos de cursor/mouse.

## Como Executar

Por utilizar a infraestrutura atualizada do Next.js + Node, siga:

1. Clone o repositório localmente.
2. Certifique-se de estar rodando uma versão LTS do Node.js instalada (versão mínima exigida: v20).
3. Na raiz, instale as dependências via NPM / Node:
   ```bash
   npm install
   ```
4. Execute o servidor de desenvolvimento SSR de pré-visualização:
   ```bash
   npm run dev
   ```
5. Acesse `http://localhost:3000` em seu navegador.

## Estrutura de Diretórios 

```text
/
├── public/              # Ativos gráficos estáticos e Ícones 3D
├── src/                 # Código Fonte React (Next App Router)
├── index.html           # Documento legado original do protótipo (Backup local preservado)
├── README.md            # Documentação técnica
├── tailwind.config.ts   # Timings e Definições de Cores
└── package.json         # Gestão de dependências ECMAScript
```
