/**
 * Funções utilitárias compartilhadas pelo front-end.
 */
const Utils = {
    /** Formata data ISO para exibição em pt-BR. */
    formatarData(dataIso) {
        if (!dataIso) return "—";
        const data = new Date(dataIso);
        return data.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    },

    /** Gera slug a partir do título. */
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

    /** Retorna badge HTML conforme status do post. */
    badgeStatus(status) {
        const mapa = {
            published: { classe: "bg-success", texto: "Publicado" },
            draft: { classe: "bg-secondary", texto: "Rascunho" },
        };
        const info = mapa[status] || mapa.draft;
        return `<span class="badge ${info.classe}">${info.texto}</span>`;
    },

    /** Escapa HTML para evitar XSS ao renderizar conteúdo dinâmico. */
    escaparHtml(texto) {
        const div = document.createElement("div");
        div.textContent = texto ?? "";
        return div.innerHTML;
    },
};
