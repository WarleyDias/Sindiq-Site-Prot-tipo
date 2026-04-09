# Sindiq Prototype

Protótipo de landing page interativa e de alta conversão para a plataforma Sindiq, voltado à administração e gestão inteligente de condomínios.

## Visão Geral do Projeto

Este repositório contém a interface de pré-venda e apresentação institucional do Sindiq. O escopo do projeto visa demonstrar recursos chave através de mockups criados em CSS e garantir alto engajamento através de animações assíncronas no scroll da página e componentes reativos, como a simulação de chat de suporte integrado.

## Arquitetura e Tomada de Decisão Técnica

Atualmente, o projeto é mantido puramente em um arquivo `index.html` estático, em conjunto de ativos de imagem (logotipo e representações isométricas). 

**Por que uma arquitetura em único arquivo para este protótipo?**
Tratando-se de uma Prova de Conceito (PoC) voltada puramente para apresentação da interface de usuário (UI) e mapeamento de experiência (UX), o uso de integrações CDN elimina burocracias de setup, build tools (como Webpack ou Vite) e gerenciadores de pacote. 
O projeto pode ser inspecionado sob qualquer ambiente sem a necessidade de instanciar instâncias Node.js. Para ambientes de produção com fatiamento de componentes, a evolução natural sugerida seria uma migração para Next.js, Nuxt ou equivalente.

### Tecnologias Implementadas

*   **HTML5 Semântico:** Estruturação orientada a seções e legibilidade para indexação preliminar.
*   **Tailwind CSS (via CDN):** Utilizado para estilização utilitária ágil, responsividade mobile-first e estruturação de layouts complexos como o painel isométrico de cartas de apresentação utilizando `transform-gpu` e `rotate`.
*   **GSAP (GreenSock Animation Platform):** Motor responsável pela cadência das animações e tracking de viewport (`ScrollTrigger`). Assegura performance mantendo processamento restrito via GPU em transformações.
*   **Lucide Icons:** Conjunto de ícones vetoriais dinâmicos inseridos e controlados via data-attributes de forma leve.

## Componentes de Destaque

1.  **Chatbot de Triagem Institucional:**
    Simulação assíncrona orientada a manipulações dinâmicas de DOM via JavaScript procedural. Implementa delay contextual (typing indicators) dependendo do input e interage reativamente via botões customizados que instanciam respostas engatilhando endpoints externos nativos (`mailto:` e `wa.me`).

2.  **Painel Isométrico CSS (Área de Implantação):**
    Composição que prescinde de imagens formatadas por software gráfico, adotando uso nativo de hierarquia de camadas (Z-Index fixo) e desfoque nativo (backdrop-filter) para prover um painel analítico interativo e dinâmico aos cursores do usuário.

## Como Executar

Dado que a interface não provê dependências restritamente locais em servidores back-end, basta instanciar index.html nativamente por qualquer navegador web moderno:

1. Clone o repositório localmente.
2. Abra o arquivo raiz `index.html` em seu navegador.

*(Recomendado utilizar extensões como Live Server em ambientes locais como VSCode para emulação de protocolo http caso alguma feature bloqueie rotas de path origin (CORS) localmente).*

## Estrutura de Diretórios 

```text
/
├── index.html           # Core da aplicação
├── README.md            # Documentação técnica
├── logo-sindiq.png      # Identidade visual primária
└── icon-*.png           # Elementos vetoriais 3d isométricos importados
```
