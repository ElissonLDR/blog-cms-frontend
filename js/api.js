/**
 * Cliente HTTP — encapsula chamadas Fetch para todas as rotas da API.
 */
const ApiClient = {
    /** Monta URL completa com query string opcional. */
    _url(caminho, params = {}) {
        const url = new URL(`${Config.API_BASE_URL}${caminho}`);
        Object.entries(params).forEach(([chave, valor]) => {
            if (valor !== null && valor !== undefined && valor !== "") {
                url.searchParams.append(chave, valor);
            }
        });
        return url.toString();
    },

    /** Executa requisição genérica e trata erros HTTP. */
    async _request(url, options = {}) {
        const response = await fetch(url, {
            headers: { "Content-Type": "application/json", ...options.headers },
            ...options,
        });

        const dados = await response.json().catch(() => ({}));

        if (!response.ok) {
            const mensagem = dados.message || `Erro HTTP ${response.status}`;
            throw new Error(mensagem);
        }

        return dados;
    },

    // --- Categorias ---

    async listarCategorias() {
        return this._request(this._url("/categories"));
    },

    async criarCategoria(name) {
        return this._request(this._url("/categories"), {
            method: "POST",
            body: JSON.stringify({ name }),
        });
    },

    async atualizarCategoria(id, name) {
        return this._request(this._url(`/categories/${id}`), {
            method: "PUT",
            body: JSON.stringify({ name }),
        });
    },

    async excluirCategoria(id) {
        return this._request(this._url(`/categories/${id}`), { method: "DELETE" });
    },

    // --- Posts ---

    async listarPosts(filtros = {}) {
        return this._request(this._url("/posts", filtros));
    },

    async buscarPost(id) {
        return this._request(this._url(`/posts/${id}`));
    },

    async criarPost(dados) {
        return this._request(this._url("/posts"), {
            method: "POST",
            body: JSON.stringify(dados),
        });
    },

    async atualizarPost(id, dados) {
        return this._request(this._url(`/posts/${id}`), {
            method: "PUT",
            body: JSON.stringify(dados),
        });
    },

    async excluirPost(id) {
        return this._request(this._url(`/posts/${id}`), { method: "DELETE" });
    },

    async obterEstatisticas() {
        return this._request(this._url("/posts/stats/dashboard"));
    },
};
