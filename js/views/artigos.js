/**
 * View de artigos — listagem em cards com busca, filtros e ações CRUD.
 */
const ViewArtigos = {
  categorias: [],

  /** Renderiza a página de gerenciamento de artigos. */
  async renderizar() {
    const area = document.getElementById("area-conteudo");
    area.innerHTML = `
      <div class="page-header d-flex flex-wrap justify-content-between align-items-center gap-3">
        <div>
          <h2>Artigos</h2>
          <p class="text-muted mb-0">Gerencie todos os posts do blog</p>
        </div>
        <button class="btn btn-primary" id="btn-novo-artigo">+ Novo artigo</button>
      </div>

      <div class="filtros-bar card shadow-sm mb-4">
        <div class="card-body row g-3">
          <div class="col-md-4">
            <label class="form-label">Buscar</label>
            <input type="search" class="form-control" id="filtro-busca" placeholder="Título, resumo ou conteúdo...">
          </div>
          <div class="col-md-4">
            <label class="form-label">Categoria</label>
            <select class="form-select" id="filtro-categoria">
              <option value="">Todas</option>
            </select>
          </div>
          <div class="col-md-4">
            <label class="form-label">Status</label>
            <select class="form-select" id="filtro-status">
              <option value="">Todos</option>
              <option value="published">Publicado</option>
              <option value="draft">Rascunho</option>
            </select>
          </div>
        </div>
      </div>

      <div class="row g-4" id="lista-artigos">
        <div class="col-12 text-center py-5">
          <div class="spinner-border text-primary" role="status"></div>
        </div>
      </div>
    `;

    document.getElementById("btn-novo-artigo").addEventListener("click", () => {
      App.navegar("novo-artigo");
    });

    ["filtro-busca", "filtro-categoria", "filtro-status"].forEach((id) => {
      document.getElementById(id).addEventListener("change", () => this.carregarPosts());
      if (id === "filtro-busca") {
        document.getElementById(id).addEventListener("input", () => this.carregarPosts());
      }
    });

    await this.carregarCategorias();
    await this.carregarPosts();
  },

  /** Carrega categorias para o filtro e formulários. */
  async carregarCategorias() {
    try {
      this.categorias = await ApiClient.listarCategorias();
      const select = document.getElementById("filtro-categoria");
      this.categorias.forEach((cat) => {
        const opt = document.createElement("option");
        opt.value = cat.id;
        opt.textContent = cat.name;
        select.appendChild(opt);
      });
    } catch (erro) {
      Alertas.mostrar(erro.message, "danger");
    }
  },

  /** Busca posts na API aplicando filtros ativos. */
  async carregarPosts() {
    const lista = document.getElementById("lista-artigos");
    const filtros = {
      busca: document.getElementById("filtro-busca").value,
      category_id: document.getElementById("filtro-categoria").value,
      status: document.getElementById("filtro-status").value,
    };

    try {
      const posts = await ApiClient.listarPosts(filtros);

      if (!posts.length) {
        lista.innerHTML = `
          <div class="col-12">
            <div class="empty-state">Nenhum artigo encontrado.</div>
          </div>
        `;
        return;
      }

      lista.innerHTML = posts.map((post) => this._cardHtml(post)).join("");
      this._vincularAcoes(posts);
    } catch (erro) {
      lista.innerHTML = `<div class="col-12"><div class="alert alert-danger">${Utils.escaparHtml(erro.message)}</div></div>`;
    }
  },

  /** Monta HTML de um card de artigo. */
  _cardHtml(post) {
    const imagem = post.image
      ? `<img src="${Utils.escaparHtml(post.image)}" class="card-img-top artigo-card__img" alt="">`
      : `<div class="artigo-card__img artigo-card__img--placeholder">Sem imagem</div>`;

    return `
      <div class="col-md-6 col-xl-4">
        <article class="card artigo-card h-100 shadow-sm">
          ${imagem}
          <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
              <h5 class="card-title mb-0">${Utils.escaparHtml(post.title)}</h5>
              ${Utils.badgeStatus(post.status)}
            </div>
            <p class="card-text text-muted flex-grow-1">${Utils.escaparHtml(post.excerpt || "Sem resumo.")}</p>
            <div class="artigo-card__meta">
              <span>${Utils.escaparHtml(post.category_name)}</span>
              <span>${Utils.formatarData(post.created_at)}</span>
            </div>
            <div class="artigo-card__acoes mt-3">
              <button class="btn btn-sm btn-outline-primary" data-acao="ver" data-id="${post.id}">Visualizar</button>
              <button class="btn btn-sm btn-outline-secondary" data-acao="editar" data-id="${post.id}">Editar</button>
              <button class="btn btn-sm btn-outline-danger" data-acao="excluir" data-id="${post.id}">Excluir</button>
            </div>
          </div>
        </article>
      </div>
    `;
  },

  /** Vincula eventos dos botões de cada card. */
  _vincularAcoes(posts) {
    document.querySelectorAll("[data-acao]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = Number(btn.dataset.id);
        const acao = btn.dataset.acao;
        const post = posts.find((p) => p.id === id);

        if (acao === "ver" && post) ModalVisualizar.abrir(post);
        if (acao === "editar") App.navegar(`editar-artigo/${id}`);
        if (acao === "excluir") await this._excluir(id);
      });
    });
  },

  /** Confirma e exclui um artigo. */
  async _excluir(id) {
    if (!confirm("Deseja realmente excluir este artigo?")) return;

    try {
      await ApiClient.excluirPost(id);
      Alertas.mostrar("Artigo excluído com sucesso.");
      await this.carregarPosts();
    } catch (erro) {
      Alertas.mostrar(erro.message, "danger");
    }
  },
};
