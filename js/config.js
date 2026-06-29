/**
 * Configuração da URL base da API.
 * Local: http://127.0.0.1:5000
 * Produção (Render): https://SEU-SERVICO.onrender.com
 */
const Config = {
    API_BASE_URL:
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1"
            ? "http://127.0.0.1:5000"
            : "https://blog-cms-api-8svb.onrender.com",
};
