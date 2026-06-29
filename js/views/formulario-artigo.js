/**
 * View de formulário — cadastro e edição de artigos.
 */
const ViewFormularioArtigo = {
  postId: null,
  slugManual: false,

  /** Renderiza formulário vazio (novo) ou preenchido (edição). */
  async renderizar(postId = null) {
    this.postId = postId;
    this.slugManual = false;

    const area = document.getElementById("area-conteudo");
    const tituloPagina = postId ? "Editar artigo" : "Novo artigo";

    area.innerHTML = `
      <div class="page-header">
        <h2>${tituloPagina}</h2>
        <p class="text-muted">Preencha os campos do artigo</p>
      </div>

      <div class="card shadow-sm">
        <div class="card-body">
          <form id="form-artigo" class="row g-3">
            <div class="col-md-8">
              <label class="form-label" for="artigo-titulo">Título *</label>
              <input type="text" class="form-control" id="artigo-titulo" required maxlength="200">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="artigo-slug">Slug *</label>
              <input type="text" class="form-control" id="artigo-slug" required maxlength="220">
            </div>
            <div class="col-12">
              <label class="form-label" for="artigo-resumo">Resumo</label>
              <textarea class="form-control" id="artigo-resumo" rows="2"></textarea>
            </div>
            <div class="col-12">
              <label class="form-label" for="artigo-conteudo">Conteúdo *</label>
              <textarea class="form-control" id="artigo-conteudo" rows="8" required></textarea>
            </div>
            <div class="col-md-6">
              <label class="form-label" for="artigo-imagem">URL da imagem</label>
              <input type="url" class="form-control" id="artigo-imagem" placeholder="https://...">
            </div>
            <div class="col-md-3">
              <label class="form-label" for="artigo-categoria">Categoria *</label>
              <select class="form-select" id="artigo-categoria" required>
                <option value="">Selecione...</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label" for="artigo-status">Status</label>
              <select class="form-select" id="artigo-status">
                <option value="draft">Rascunho</option>
                <option value="published">Publicado</option>
              </select>
            </div>
            <div class="col-12 d-flex gap-2">
              <button type="submit" class="btn btn-primary">Salvar</button>
              <button type="button" class="btn btn-outline-secondary" id="btn-voltar-artigos">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    `;

    document.getElementById("form-artigo").addEventListener("submit", (e) => this._salvar(e));
    document.getElementById("btn-voltar-artigos").addEventListener("click", () => App.navegar("artigos"));

    const inputTitulo = document.getElementById("artigo-titulo");
    const inputSlug = document.getElementById("artigo-slug");

    inputTitulo.addEventListener("input", () => {
      if (!this.slugManual) inputSlug.value = Utils.gerarSlug(inputTitulo.value);
    });

    inputSlug.addEventListener("input", () => {
      this.slugManual = inputSlug.value.length > 0;
    });

    await this._carregarCategorias();

    if (postId) await this._carregarPost(postId);
  },

  /** Popula select de categorias. */
  async _carregarCategorias() {
    const select = document.getElementById("artigo-categoria");
    try {
      const categorias = await ApiClient.listarCategorias();
      categorias.forEach((cat) => {
        const opt = document.createElement("option");
        opt.value = cat.id;
        opt.textContent = cat.name;
        select.appendChild(opt);
      });
    } catch (erro) {
      Alertas.mostrar(erro.message, "danger");
    }
  },

  /** Carrega dados do post para edição. */
  async _carregarPost(id) {
    try {
      const post = await ApiClient.buscarPost(id);
      document.getElementById("artigo-titulo").value = post.title;
      document.getElementById("artigo-slug").value = post.slug;
      document.getElementById("artigo-resumo").value = post.excerpt || "";
      document.getElementById("artigo-conteudo").value = post.content;
      document.getElementById("artigo-imagem").value = post.image || "";
      document.getElementById("artigo-categoria").value = post.category_id;
      document.getElementById("artigo-status").value = post.status;
      this.slugManual = true;
    } catch (erro) {
      Alertas.mostrar(erro.message, "danger");
      App.navegar("artigos");
    }
  },

  /** Envia dados do formulário para criar ou atualizar post. */
  async _salvar(evento) {
    evento.preventDefault();

    const dados = {
      title: document.getElementById("artigo-titulo").value.trim(),
      slug: document.getElementById("artigo-slug").value.trim(),
      excerpt: document.getElementById("artigo-resumo").value.trim(),
      content: document.getElementById("artigo-conteudo").value.trim(),
      image: document.getElementById("artigo-imagem").value.trim(),
      category_id: Number(document.getElementById("artigo-categoria").value),
      status: document.getElementById("artigo-status").value,
    };

    try {
      if (this.postId) {
        await ApiClient.atualizarPost(this.postId, dados);
        Alertas.mostrar("Artigo atualizado com sucesso.");
      } else {
        await ApiClient.criarPost(dados);
        Alertas.mostrar("Artigo criado com sucesso.");
      }
      App.navegar("artigos");
    } catch (erro) {
      Alertas.mostrar(erro.message, "danger");
    }
  },
};
