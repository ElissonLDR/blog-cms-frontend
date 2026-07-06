/**
 * Tela de Categorias — formulário + tabela com criar, editar e excluir.
 */
const ViewCategorias = {

    /** Monta a página e carrega a lista */
    async renderizar() {
        const area = document.getElementById("area-conteudo");
        area.innerHTML = `
            <div class="page-header">
                <h2>Categorias</h2>
                <p class="text-muted">Organize os artigos por tema</p>
            </div>

            <div class="card shadow-sm mb-4">
                <div class="card-body">
                    <form id="form-categoria" class="row g-3 align-items-end">
                        <input type="hidden" id="categoria-id">
                        <div class="col-md-8">
                            <label class="form-label" for="categoria-nome">Nome da categoria</label>
                            <input type="text" class="form-control" id="categoria-nome" required maxlength="100">
                        </div>
                        <div class="col-md-4 d-flex gap-2">
                            <button type="submit" class="btn btn-primary flex-grow-1" id="btn-salvar-categoria">Salvar</button>
                            <button type="button" class="btn btn-outline-secondary d-none" id="btn-cancelar-categoria">Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>

            <div class="card shadow-sm">
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Posts</th>
                                <th>Criada em</th>
                                <th class="text-end">Ações</th>
                            </tr>
                        </thead>
                        <tbody id="tabela-categorias">
                            <tr><td colspan="4" class="text-center py-4">Carregando...</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        document.getElementById("form-categoria").addEventListener("submit", (e) => this._salvar(e));
        document.getElementById("btn-cancelar-categoria").addEventListener("click", () => this._limparFormulario());
        await this.carregarCategorias();
    },

    /** Busca categorias na API e monta as linhas da tabela */
    async carregarCategorias() {
        const tbody = document.getElementById("tabela-categorias");

        try {
            const categorias = await ApiClient.listarCategorias();

            if (!categorias.length) {
                tbody.innerHTML = `<tr><td colspan="4" class="text-center py-4">Nenhuma categoria cadastrada.</td></tr>`;
                return;
            }

            tbody.innerHTML = categorias
                .map(
                    (cat) => `
                <tr>
                    <td>${Utils.escaparHtml(cat.name)}</td>
                    <td>${cat.posts_count}</td>
                    <td>${Utils.formatarData(cat.created_at)}</td>
                    <td class="text-end">
                        <button class="btn btn-sm btn-outline-secondary me-1" data-editar="${cat.id}" data-nome="${Utils.escaparHtml(cat.name)}">Editar</button>
                        <button class="btn btn-sm btn-outline-danger" data-excluir="${cat.id}">Excluir</button>
                    </td>
                </tr>
            `
                )
                .join("");

            tbody.querySelectorAll("[data-editar]").forEach((btn) => {
                btn.addEventListener("click", () => {
                    document.getElementById("categoria-id").value = btn.dataset.editar;
                    document.getElementById("categoria-nome").value = btn.dataset.nome;
                    document.getElementById("btn-cancelar-categoria").classList.remove("d-none");
                });
            });

            tbody.querySelectorAll("[data-excluir]").forEach((btn) => {
                btn.addEventListener("click", () => this._excluir(Number(btn.dataset.excluir)));
            });
        } catch (erro) {
            tbody.innerHTML = `<tr><td colspan="4" class="text-danger text-center py-4">${Utils.escaparHtml(erro.message)}</td></tr>`;
        }
    },

    /** Salva categoria nova ou atualiza se já tem id no formulário */
    async _salvar(evento) {
        evento.preventDefault();
        const id = document.getElementById("categoria-id").value;
        const nome = document.getElementById("categoria-nome").value.trim();

        try {
            if (id) {
                await ApiClient.atualizarCategoria(id, nome);
                Alertas.mostrar("Categoria atualizada.");
            } else {
                await ApiClient.criarCategoria(nome);
                Alertas.mostrar("Categoria criada.");
            }
            this._limparFormulario();
            await this.carregarCategorias();
        } catch (erro) {
            Alertas.mostrar(erro.message, "danger");
        }
    },

    /** Apaga categoria após o usuário confirmar */
    async _excluir(id) {
        if (!confirm("Deseja excluir esta categoria?")) return;

        try {
            await ApiClient.excluirCategoria(id);
            Alertas.mostrar("Categoria excluída.");
            await this.carregarCategorias();
        } catch (erro) {
            Alertas.mostrar(erro.message, "danger");
        }
    },

    /** Limpa o formulário para voltar ao modo "criar nova" */
    _limparFormulario() {
        document.getElementById("categoria-id").value = "";
        document.getElementById("categoria-nome").value = "";
        document.getElementById("btn-cancelar-categoria").classList.add("d-none");
    },
};
