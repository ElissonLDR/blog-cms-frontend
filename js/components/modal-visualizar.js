/**
 * Modal reutilizável para visualização completa de um artigo.
 */
const ModalVisualizar = {
    modal: null,

    /** Configura instância Bootstrap do modal. */
    iniciar() {
        this.modal = new bootstrap.Modal(document.getElementById("modal-visualizar"));
    },

    /** Preenche e abre o modal com dados do post. */
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
