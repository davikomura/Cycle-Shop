# Cycle Shop

Loja demonstrativa de bicicletas com React e TypeScript, catálogo, busca, filtros,
favoritos, carrinho e checkout simulado. Os dados vêm de `data.json`; conta,
favoritos e carrinho são persistidos no localStorage. Não há autenticação de
servidor nem processamento real de pagamentos.

## Stack

- Node.js **24.21.0 LTS**, definido em `.nvmrc` e `.node-version`.
- pnpm **10.33.0**, definido em `packageManager`; use `pnpm-lock.yaml`.
- React **19.3**, TypeScript **6.0.3** com `strict` e Vite **8.3**.
- Tailwind CSS **4.3**, integrado pelo plugin `@tailwindcss/vite`.
- TanStack Router **1.170** para rotas e TanStack Query **5.104** para o catálogo.

TypeScript permanece na linha 6 por compatibilidade com typescript-eslint.
O pnpm permanece na linha 10, validada neste projeto no Windows.
As versões exatas das dependências estão registradas no lockfile.

## Desenvolvimento

Com fnm instalado:

```powershell
fnm install
fnm use
npm install --global pnpm@10.33.0
pnpm install --frozen-lockfile
pnpm dev
```

Abra o endereço informado pelo Vite, normalmente http://localhost:5173.
Também é possível instalar Node.js 24.21.0 diretamente ou usar outro gerenciador.

## Verificação

```sh
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm exec playwright install chromium
pnpm test:e2e
```

Os testes de navegador usam o build de produção: execute `pnpm build` antes deles.
Cobrem busca, detalhes de produto, favoritos, persistência do carrinho, retorno do
login ao checkout, pedido simulado, filtros e navegação móvel.

`pnpm preview` serve o build localmente. A Vercel mantém o fallback de SPA em
`vercel.json`, necessário para abrir URLs internas diretamente.

## Organização

- `src/routes.tsx`: árvore de rotas e validação dos parâmetros de busca.
- `src/lib/catalog.ts`: catálogo tipado e funções de consulta.
- `src/lib/useCatalog.ts`: cache compartilhado do catálogo via TanStack Query.
- `src/types.ts`: tipos de produtos, usuários, carrinho e pedidos.
- `src/context/`: estado local da conta, favoritos e carrinho.
- `src/index.css`: tema e estilos; Tailwind 4 usa configuração em CSS.

O catálogo empacotado é usado como `initialData` e permanece atualizado até um
novo deploy (`staleTime: Infinity`). Ao conectar uma API, adapte `queryFn`, remova
os dados iniciais locais e configure carregamento, erros e invalidação do cache.

Autor: Davi Komura de Castro. Licença [MIT](./LICENSE).

## Idiomas e moedas

A loja oferece `pt-BR`, `es-ES`, `en-US` e `de-DE`. O idioma inicial segue o
navegador (português para idiomas não suportados). As preferências de idioma
e moeda são independentes e ficam no localStorage.

A tradução usa **i18next + react-i18next**. Os arquivos ficam em
`src/i18n/locales/<idioma>/<area>.json`, separados em `common`, `home`,
`catalog`, `products`, `checkout`, `auth`, `about`, `faq` e `legal`.

- `src/i18n/config.ts`: inicialização e backend de imports dinâmicos. O Vite gera
  um chunk por idioma/área. Apenas `common` é solicitado na inicialização;
  os componentes solicitam suas áreas via `useI18n([...])`. O inglês é o fallback
  para traduções ausentes.
- `src/i18n/I18n.tsx`: integração com react-i18next e preferências de moeda.
  O Suspense em `main.tsx` aguarda os recursos antes de mostrar os textos.
- `src/i18n/settings.ts`: idiomas, moedas e taxas de conversão configuráveis.
- `src/i18n/catalogKeys.ts`: correspondência entre categorias e chaves de tradução.

Use chaves semânticas estáveis, independentes do texto traduzido:

```tsx
const { t, formatPrice } = useI18n(['common', 'catalog']);
t('common:actions.addToCart');
t('catalog:results.count', { count: results.length });
```

Parâmetros nos JSONs usam `{{nome}}`. Para contagens, forneça `count` e as
variantes `_one` / `_other`; português e espanhol também usam `_many`.
As descrições de produtos usam IDs (`products:items.1.description`), não o texto
em inglês. O FAQ também usa IDs estáveis de `data.json`, permitindo reordenar
as perguntas sem trocar suas traduções.

Ao adicionar uma tradução, atualize os quatro idiomas sem renomear chaves por
alterações de redação. Ao adicionar uma área, registre-a em `namespaces` e
declare-a nos componentes que a utilizam.

Os preços do catálogo e pedidos continuam armazenados em **EUR**. A exibição
converte para BRL, EUR ou USD usando `Intl.NumberFormat`, inclusive nos filtros,
carrinho e checkout. As taxas são **fixas e demonstrativas**, não cotações atuais:
1 EUR = 6 BRL = 1,10 USD. A loja informa essa condição no rodapé. A seleção de
moeda não implementa cobrança real ou integração cambial.

Os testes verificam cobertura dos dicionários, interpolação, plurais, fallback,
conversão de moeda, persistência das preferências, fluxo de compra e downloads
sob demanda por idioma e área no navegador.
