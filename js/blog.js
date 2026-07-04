/**
 * Blog público — listagem e leitura de artigos publicados.
 */
const BlogPublico = {
    categorias: [],

    iniciar() {
        window.addEventListener("hashchange", () => this._resolverRota());
        this._resolverRota();
    },

    async _resolverRota() {
        const hash = window.location.hash.replace(/^#\/?/, "");
        const partes = hash.split("/");

        if (partes[0] === "post" && partes[1]) {
            await this.renderizarPost(Number(partes[1]));
            return;
        }

        await this.renderizarLista();
    },

    async renderizarLista() {
        document.title = "Blog CMS — Artigos";
        const area = document.getElementById("blog-conteudo");

        area.innerHTML = `
            <section class="blog-hero">
                <h1>Últimos artigos</h1>
                <p>Leia os conteúdos publicados do blog.</p>
            </section>

            <div class="blog-filtros card shadow-sm mb-4">
                <div class="card-body row g-3">
                    <div class="col-md-6">
                        <label class="form-label" for="blog-busca">Buscar</label>
                        <input type="search" class="form-control" id="blog-busca" placeholder="Título, resumo ou conteúdo...">
                    </div>
                    <div class="col-md-6">
                        <label class="form-label" for="blog-categoria">Categoria</label>
                        <select class="form-select" id="blog-categoria">
                            <option value="">Todas</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="row g-4" id="blog-lista">
                <div class="col-12 text-center py-5">
                    <div class="spinner-border text-primary" role="status"></div>
                </div>
            </div>
        `;

        document.getElementById("blog-busca").addEventListener("input", () => this.carregarPosts());
        document.getElementById("blog-categoria").addEventListener("change", () => this.carregarPosts());

        await this.carregarCategorias();
        await this.carregarPosts();
    },

    async renderizarPost(id) {
        const area = document.getElementById("blog-conteudo");
        area.innerHTML = `
            <div class="text-center py-5">
                <div class="spinner-border text-primary" role="status"></div>
            </div>
        `;

        try {
            const post = await ApiClient.buscarPost(id);

            if (post.status !== "published") {
                area.innerHTML = `
                    <div class="blog-empty">
                        <h2>Artigo indisponível</h2>
                        <p>Este conteúdo não está publicado.</p>
                        <a href="blog.html" class="btn btn-primary">Voltar aos artigos</a>
                    </div>
                `;
                return;
            }

            document.title = `${post.title} — Blog CMS`;

            const imagem = post.image
                ? `<img src="${Utils.escaparHtml(post.image)}" class="blog-post__imagem" alt="">`
                : "";

            area.innerHTML = `
                <article class="blog-post">
                    <a href="blog.html" class="blog-post__voltar">← Voltar aos artigos</a>
                    ${imagem}
                    <div class="blog-post__meta">
                        <span class="badge text-bg-light">${Utils.escaparHtml(post.category_name || "—")}</span>
                        <time>${Utils.formatarData(post.created_at)}</time>
                    </div>
                    <h1 class="blog-post__titulo">${Utils.escaparHtml(post.title)}</h1>
                    ${post.excerpt ? `<p class="blog-post__resumo">${Utils.escaparHtml(post.excerpt)}</p>` : ""}
                    <div class="blog-post__conteudo">${Utils.escaparHtml(post.content)}</div>
                </article>
            `;
        } catch (erro) {
            area.innerHTML = `
                <div class="blog-empty">
                    <h2>Artigo não encontrado</h2>
                    <p>${Utils.escaparHtml(erro.message)}</p>
                    <a href="blog.html" class="btn btn-primary">Voltar aos artigos</a>
                </div>
            `;
        }
    },

    async carregarCategorias() {
        try {
            this.categorias = await ApiClient.listarCategorias();
            const select = document.getElementById("blog-categoria");

            this.categorias.forEach((cat) => {
                const opt = document.createElement("option");
                opt.value = cat.id;
                opt.textContent = cat.name;
                select.appendChild(opt);
            });
        } catch (erro) {
            console.error(erro);
        }
    },

    async carregarPosts() {
        const lista = document.getElementById("blog-lista");
        const filtros = {
            busca: document.getElementById("blog-busca").value,
            category_id: document.getElementById("blog-categoria").value,
            status: "published",
        };

        try {
            const posts = await ApiClient.listarPosts(filtros);

            if (!posts.length) {
                lista.innerHTML = `
                    <div class="col-12">
                        <div class="blog-empty">Nenhum artigo publicado encontrado.</div>
                    </div>
                `;
                return;
            }

            lista.innerHTML = posts.map((post) => this._cardHtml(post)).join("");
            this._vincularCards();
        } catch (erro) {
            lista.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-danger">${Utils.escaparHtml(erro.message)}</div>
                </div>
            `;
        }
    },

    _cardHtml(post) {
        const imagem = post.image
            ? `<img src="${Utils.escaparHtml(post.image)}" class="card-img-top blog-card__img" alt="">`
            : `<div class="blog-card__img blog-card__img--placeholder">Sem imagem</div>`;

        return `
            <div class="col-md-6 col-lg-4">
                <article class="card blog-card h-100 shadow-sm">
                    <a href="#/post/${post.id}" class="blog-card__link" data-id="${post.id}">
                        ${imagem}
                        <div class="card-body">
                            <span class="blog-card__categoria">${Utils.escaparHtml(post.category_name)}</span>
                            <h2 class="blog-card__titulo">${Utils.escaparHtml(post.title)}</h2>
                            <p class="blog-card__resumo">${Utils.escaparHtml(post.excerpt || "Clique para ler o artigo completo.")}</p>
                            <time class="blog-card__data">${Utils.formatarData(post.created_at)}</time>
                        </div>
                    </a>
                </article>
            </div>
        `;
    },

    _vincularCards() {
        document.querySelectorAll(".blog-card__link").forEach((link) => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                window.location.hash = `#/post/${link.dataset.id}`;
            });
        });
    },
};

document.addEventListener("DOMContentLoaded", () => BlogPublico.iniciar());
