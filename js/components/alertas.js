/**
 * Componente de alertas temporários (sucesso, erro, info).
 */
const Alertas = {
    container: null,

    /** Inicializa o container de alertas no DOM. */
    iniciar() {
        this.container = document.getElementById("alertas-container");
    },

    /** Exibe alerta Bootstrap que some após alguns segundos. */
    mostrar(mensagem, tipo = "success") {
        const alerta = document.createElement("div");
        alerta.className = `alert alert-${tipo} alert-dismissible fade show shadow-sm`;
        alerta.setAttribute("role", "alert");
        alerta.innerHTML = `
            ${Utils.escaparHtml(mensagem)}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        this.container.appendChild(alerta);

        setTimeout(() => alerta.remove(), 4500);
    },
};
