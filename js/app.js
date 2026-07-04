/**
 * Aplicação SPA — roteamento por hash e inicialização geral.
 */
const App = {
  /** Inicia componentes e escuta mudanças de rota. */
  iniciar() {
    Alertas.iniciar();
    ModalVisualizar.iniciar();
    this._vincularMenu();
    window.addEventListener("hashchange", () => this._resolverRota());
    this._resolverRota();
  },

  /** Navega para uma rota via hash. */
  navegar(rota) {
    window.location.hash = `#/${rota}`;
  },

  /** Destaca item ativo no menu lateral. */
  _marcarMenuAtivo(rotaBase) {
    document.querySelectorAll(".menu-lateral__link").forEach((link) => {
      link.classList.toggle("ativo", link.dataset.rota === rotaBase);
    });
  },

  /** Vincula cliques do menu à navegação. */
  _vincularMenu() {
    document.querySelectorAll(".menu-lateral__link").forEach((link) => {
      if (link.classList.contains("menu-lateral__link--externo")) return;

      link.addEventListener("click", (e) => {
        e.preventDefault();
        this.navegar(link.dataset.rota);
      });
    });
  },

  /** Interpreta hash da URL e renderiza a view correspondente. */
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
