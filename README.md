# Blog CMS Front-end

Eu fiz este site para ser a parte visual do Blog CMS. É aqui que a pessoa usa o sistema no navegador.

Separei em duas áreas. O **painel** (`index.html`) é onde eu gerencio artigos e categorias: criar, editar, excluir, buscar e filtrar. O **blog público** (`blog.html`) é onde qualquer um lê os artigos já publicados. Usei só HTML, CSS e JavaScript puro, sem React ou Vue, e o site conversa com a API que fiz no back-end.

Projeto da disciplina de Desenvolvimento Full Stack Básico da Pós.

## Acesso online (GitHub Pages)

Publiquei o site aqui: [https://elissonldr.github.io/blog-cms-frontend/](https://elissonldr.github.io/blog-cms-frontend/)

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

> No painel eu usei rotas por **hash** (`#/dashboard`, `#/artigos`, etc.). O blog público é outra página (`blog.html`).

## Stack

- HTML5
- CSS3 (personalizado)
- JavaScript Vanilla (ES6)
- Bootstrap 5
- Fetch API

## Instalação

Não tem dependência para instalar. Só clonar o repositório.

## Execução

1. Deixe a **API rodando** (`http://127.0.0.1:5000`).
2. Abra o `index.html` no navegador **ou** suba um servidor local na pasta:

```bash
cd frontend
python -m http.server 8080
```

Acesse: `http://127.0.0.1:8080`

> Se a API estiver em outro endereço (por exemplo no Render), mude o `API_BASE_URL` em `js/config.js`.

## O que eu implementei

- Dashboard com totais de posts e categorias
- Listagem de artigos em cards (visualizar, editar, excluir)
- Cadastro e edição de categorias
- Busca por texto
- Filtros por categoria e status
- Formulário de artigo com slug gerado automaticamente pelo título
- Menu lateral responsivo
- Alertas e modal para ver o artigo completo
- Página pública só com artigos publicados

## Estrutura do projeto

```
frontend/
├── index.html              # Painel administrativo
├── blog.html               # Blog público
├── css/
│   └── estilos.css
├── js/
│   ├── config.js           # URL da API
│   ├── api.js              # Chamadas para o back-end
│   ├── utils.js            # Funções que uso em várias telas
│   ├── app.js              # Troca de telas pelo hash da URL
│   ├── blog.js             # Lógica do blog público
│   ├── components/         # Alertas e modal
│   └── views/              # Dashboard, artigos, categorias, formulário
└── assets/                 # Imagens (opcional)
```

## Deploy

- Publiquei no **GitHub Pages**: [https://elissonldr.github.io/blog-cms-frontend/](https://elissonldr.github.io/blog-cms-frontend/)
- Também dá para usar **Render Static Site**
- A URL da API em produção está em `js/config.js` (`API_BASE_URL`)
