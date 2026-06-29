/**
 * View do Dashboard — exibe estatísticas gerais do blog.
 */
const ViewDashboard = {
  /** Renderiza cards com totais de posts e categorias. */
  async renderizar() {
    const area = document.getElementById("area-conteudo");
    area.innerHTML = `
      <div class="page-header">
        <h2>Dashboard</h2>
        <p class="text-muted">Visão geral do seu blog</p>
      </div>
      <div class="row g-4" id="dashboard-cards">
        <div class="col-12 text-center py-5">
          <div class="spinner-border text-primary" role="status"></div>
        </div>
      </div>
    `;

    try {
      const stats = await ApiClient.obterEstatisticas();
      document.getElementById("dashboard-cards").innerHTML = `
        <div class="col-sm-6 col-xl-3">
          <div class="stat-card stat-card--posts">
            <span class="stat-card__label">Total de posts</span>
            <strong class="stat-card__valor">${stats.total_posts}</strong>
          </div>
        </div>
        <div class="col-sm-6 col-xl-3">
          <div class="stat-card stat-card--categorias">
            <span class="stat-card__label">Categorias</span>
            <strong class="stat-card__valor">${stats.total_categories}</strong>
          </div>
        </div>
        <div class="col-sm-6 col-xl-3">
          <div class="stat-card stat-card--publicados">
            <span class="stat-card__label">Publicados</span>
            <strong class="stat-card__valor">${stats.published_posts}</strong>
          </div>
        </div>
        <div class="col-sm-6 col-xl-3">
          <div class="stat-card stat-card--rascunhos">
            <span class="stat-card__label">Rascunhos</span>
            <strong class="stat-card__valor">${stats.draft_posts}</strong>
          </div>
        </div>
      `;
    } catch (erro) {
      Alertas.mostrar(erro.message, "danger");
    }
  },
};
