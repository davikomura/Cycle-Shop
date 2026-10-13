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
