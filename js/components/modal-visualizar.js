/**
 * Janela (modal) para ver o artigo completo sem sair da listagem.
 */
const ModalVisualizar = {
    modal: null,

    /** Prepara o modal do Bootstrap */
    iniciar() {
        this.modal = new bootstrap.Modal(document.getElementById("modal-visualizar"));
    },

    /** Preenche os campos do modal com os dados do post e abre */
    abrir(post) {
        document.getElementById("modal-titulo").textContent = post.title;
        document.getElementById("modal-categoria").textContent = post.category_name || "—";
        document.getElementById("modal-data").textContent = Utils.formatarData(post.created_at);
        document.getElementById("modal-status").innerHTML = Utils.badgeStatus(post.status);
        document.getElementById("modal-resumo").textContent = post.excerpt || "Sem resumo.";
        document.getElementById("modal-conteudo").textContent = post.content;

        const img = document.getElementById("modal-imagem");
        if (post.image) {
            img.src = post.image;
            img.classList.remove("d-none");
        } else {
            img.classList.add("d-none");
        }

        this.modal.show();
    },
};
