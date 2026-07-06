# Blog CMS — Front-end

SPA (Single Page Application) para gerenciamento de artigos, consumindo a API REST do Blog CMS.

## Acesso online (GitHub Pages)

**Site publicado:** [https://elissonldr.github.io/blog-cms-frontend/](https://elissonldr.github.io/blog-cms-frontend/)

### Páginas

| Página | URL |
|--------|-----|
| Painel administrativo | [https://elissonldr.github.io/blog-cms-frontend/](https://elissonldr.github.io/blog-cms-frontend/) |
| Dashboard | [https://elissonldr.github.io/blog-cms-frontend/#/dashboard](https://elissonldr.github.io/blog-cms-frontend/#/dashboard) |
| Artigos | [https://elissonldr.github.io/blog-cms-frontend/#/artigos](https://elissonldr.github.io/blog-cms-frontend/#/artigos) |
| Categorias | [https://elissonldr.github.io/blog-cms-frontend/#/categorias](https://elissonldr.github.io/blog-cms-frontend/#/categorias) |
| Novo artigo | [https://elissonldr.github.io/blog-cms-frontend/#/novo-artigo](https://elissonldr.github.io/blog-cms-frontend/#/novo-artigo) |
| Blog público (leitura) | [https://elissonldr.github.io/blog-cms-frontend/blog.html](https://elissonldr.github.io/blog-cms-frontend/blog.html) |
| Ler um artigo | `https://elissonldr.github.io/blog-cms-frontend/blog.html#/post/{id}` |

> O painel usa rotas por **hash** (`#/dashboard`, `#/artigos`, etc.). O blog público é uma página separada (`blog.html`).

## Descrição

Interface administrativa com dashboard, listagem em cards, formulários, busca, filtros e modal de visualização. Inclui também uma **página pública** (`blog.html`) para leitura dos artigos publicados. Desenvolvida com HTML5, CSS3 e JavaScript puro (ES6 + Fetch API).

## Stack

- HTML5
- CSS3 (personalizado)
- JavaScript Vanilla (ES6)
- Bootstrap 5
- Fetch API

## Instalação

Não há dependências para instalar. Basta clonar o repositório.

## Execução

1. Certifique-se de que a **API está rodando** (`http://127.0.0.1:5000`).
2. Abra o `index.html` no navegador **ou** sirva a pasta com um servidor local:

```bash
cd frontend
python -m http.server 8080
```

Acesse: `http://127.0.0.1:8080`

> **Importante:** altere `API_BASE_URL` em `js/config.js` se a API estiver em outro endereço (ex.: deploy no Render).

## Funcionalidades

- Dashboard com estatísticas
- CRUD de artigos (cards com visualizar, editar, excluir)
- CRUD de categorias
- Busca por texto
- Filtros por categoria e status
- Formulário de cadastro/edição com geração automática de slug
- Menu lateral responsivo
- Alertas e modal de visualização
- Blog público para leitura de artigos publicados

## Estrutura do projeto

```
frontend/
├── index.html              # Painel administrativo (SPA)
├── blog.html               # Blog público (leitura)
├── css/
│   └── estilos.css
├── js/
│   ├── config.js           # URL da API
│   ├── api.js              # Cliente HTTP
│   ├── utils.js            # Funções auxiliares
│   ├── app.js              # Roteador SPA
│   ├── blog.js             # Blog público
│   ├── components/         # Componentes reutilizáveis
│   └── views/              # Telas da aplicação
└── assets/                 # Imagens estáticas (opcional)
```

## Deploy

- **GitHub Pages:** [https://elissonldr.github.io/blog-cms-frontend/](https://elissonldr.github.io/blog-cms-frontend/)
- **Render Static Site** (alternativa)
- A URL da API em produção está em `js/config.js` (`API_BASE_URL`)
