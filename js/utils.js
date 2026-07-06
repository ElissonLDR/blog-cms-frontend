/**
 * Funções auxiliares usadas em várias telas.
 */
const Utils = {

    /** Transforma data do banco (2024-01-15...) em texto legível (15 jan. 2024) */
    formatarData(dataIso) {
        if (!dataIso) return "—";
        const data = new Date(dataIso);
        return data.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    },

    /** Cria slug a partir do título: "Meu Post" vira "meu-post" */
    gerarSlug(titulo) {
        return titulo
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");
    },

    /** Devolve HTML do badge colorido (Publicado ou Rascunho) */
    badgeStatus(status) {
        const mapa = {
            published: { classe: "bg-success", texto: "Publicado" },
            draft: { classe: "bg-secondary", texto: "Rascunho" },
        };
        const info = mapa[status] || mapa.draft;
        return `<span class="badge ${info.classe}">${info.texto}</span>`;
    },

    /** Escapa texto para não quebrar o HTML nem permitir scripts maliciosos */
    escaparHtml(texto) {
        const div = document.createElement("div");
        div.textContent = texto ?? "";
        return div.innerHTML;
    },
};
