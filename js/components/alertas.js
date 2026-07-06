/**
 * Mensagens de sucesso/erro que aparecem no topo da tela.
 */
const Alertas = {
    container: null,

    /** Pega o elemento HTML onde os alertas serão inseridos */
    iniciar() {
        this.container = document.getElementById("alertas-container");
    },

    /** Mostra um alerta que some sozinho depois de alguns segundos */
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
