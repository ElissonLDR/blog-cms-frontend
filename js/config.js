/**
 * URL base da API.
 * No PC usa localhost; no GitHub Pages usa o Render.
 */
const Config = {
    API_BASE_URL:
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1"
            ? "http://127.0.0.1:5000"
            : "https://blog-cms-api-8svb.onrender.com",
};
