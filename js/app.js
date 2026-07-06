/**
 * Aplicação principal do painel — troca de telas pelo hash da URL (#/artigos, etc.)
 */
const App = {

    /** Liga menu, alertas, modal e escuta mudanças na URL */
    iniciar() {
        Alertas.iniciar();
        ModalVisualizar.iniciar();
        this._vincularMenu();
        window.addEventListener("hashchange", () => this._resolverRota());
        this._resolverRota();
    },

    /** Muda a tela: App.navegar("artigos") vira #/artigos na URL */
    navegar(rota) {
        window.location.hash = `#/${rota}`;
    },

    /** Marca o item certo do menu lateral como ativo */
    _marcarMenuAtivo(rotaBase) {
        document.querySelectorAll(".menu-lateral__link").forEach((link) => {
            link.classList.toggle("ativo", link.dataset.rota === rotaBase);
        });
    },

    /** Quando clica no menu, navega para a rota do link */
    _vincularMenu() {
        document.querySelectorAll(".menu-lateral__link").forEach((link) => {
            if (link.classList.contains("menu-lateral__link--externo")) return;

            link.addEventListener("click", (e) => {
                e.preventDefault();
                this.navegar(link.dataset.rota);
            });
        });
    },

    /** Lê o hash (#/dashboard) e chama a view correspondente */
    async _resolverRota() {
        const hash = window.location.hash.replace(/^#\/?/, "") || "dashboard";
        const partes = hash.split("/");
        const rota = partes[0];

        this._marcarMenuAtivo(rota);

        switch (rota) {
            case "dashboard":
                await ViewDashboard.renderizar();
                break;
            case "artigos":
                await ViewArtigos.renderizar();
                break;
            case "categorias":
                await ViewCategorias.renderizar();
                break;
            case "novo-artigo":
                await ViewFormularioArtigo.renderizar();
                break;
            case "editar-artigo":
                await ViewFormularioArtigo.renderizar(Number(partes[1]));
                break;
            default:
                this.navegar("dashboard");
        }
    },
};

document.addEventListener("DOMContentLoaded", () => App.iniciar());
