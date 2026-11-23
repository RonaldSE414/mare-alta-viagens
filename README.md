# Maré Alta Viagens

Site de turismo com uma abertura em vídeo, uma transição em forma de onda e um catálogo de destinos para explorar.

**[Visite o site publicado](https://marealta-1rt.pages.dev/)**

## O que você encontra

- Destinos filtrados por região e paisagem, com galerias, roteiros e favoritos.
- Busca de pacotes no catálogo local de seis destinos, com valores ilustrativos.
- Busca de voos por cidade ou código IATA. A rota, as datas e o número de adultos são enviados para o Google Flights, onde aparecem as tarifas atuais.
- Diário de Bordo com roteiros de um dia para Noronha, Madeira e Lençóis Maranhenses.

## Rodar localmente

1. Clone este repositório ou use **Code → Download ZIP** no GitHub e extraia os arquivos.
2. Abra a pasta do projeto no VS Code.
3. Abra [dist/index.html](dist/index.html) no navegador. A extensão Live Server é opcional.

O site usa HTML, CSS e JavaScript. Os favoritos ficam no navegador via `localStorage`, e os dados de aeroportos são lidos de um arquivo local.

## Estrutura

| Arquivo | Função |
| --- | --- |
| `dist/index.html` | Estrutura e formulários |
| `dist/style.css` e `dist/coast.css` | Estilos e layout responsivo |
| `dist/ocean.js` e `dist/ocean-reveal.js` | Vídeo da abertura e transição com a rolagem |
| `dist/app.js` | Pacotes, filtros, galerias e favoritos |
| `dist/flight-search.js` e `dist/flight-link.js` | Formulário de voos e link do Google Flights |
| `dist/journal.js` e `dist/journal.css` | Diário de Bordo |

## Publicação

Envie o conteúdo de `dist/` para uma hospedagem estática. No Cloudflare Pages, selecione a pasta `dist` no upload direto para que `index.html` fique na raiz do site.

## Créditos

- Filmagem da abertura adaptada de [Beach seen from the air with waves reaching the shore](https://mixkit.co/free-stock-video/beach-seen-from-the-air-with-waves-reaching-the-shore-51461/), sob a [Mixkit Stock Video Free License](https://mixkit.co/license/#videoFree).
- As sugestões de aeroportos usam os dados de domínio público de [OurAirports](https://ourairports.com/data/).
- As imagens dos destinos são ilustrativas. As fontes DM Sans e Instrument Serif e suas licenças estão em [dist/fonts](dist/fonts).
