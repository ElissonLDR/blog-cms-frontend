# Blog CMS — Front-end

SPA (Single Page Application) para gerenciamento de artigos, consumindo a API REST do Blog CMS.

## Descrição

Interface administrativa com dashboard, listagem em cards, formulários, busca, filtros e modal de visualização. Desenvolvida com HTML5, CSS3 e JavaScript puro (ES6 + Fetch API).

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

## Estrutura do projeto

```
frontend/
├── index.html
├── css/
│   └── estilos.css
├── js/
│   ├── config.js           # URL da API
│   ├── api.js              # Cliente HTTP
│   ├── utils.js            # Funções auxiliares
│   ├── app.js              # Roteador SPA
│   ├── components/         # Componentes reutilizáveis
│   └── views/              # Telas da aplicação
└── assets/                 # Imagens estáticas (opcional)
```

## Deploy

- **GitHub Pages** ou **Render Static Site**
- Atualize `API_BASE_URL` em `js/config.js` para a URL da API em produção
