document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("macro-search");
    const cards = document.querySelectorAll(".macro-card");
    const emptyState = document.getElementById("search-empty");

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.trim().toLowerCase();
        let visible = 0;

        cards.forEach((card) => {
            const haystack = card.dataset.search || card.textContent;
            const match = haystack.toLowerCase().includes(query);
            card.hidden = !match;
            if (match) visible += 1;
        });

        emptyState.hidden = visible !== 0;
    });

    document.querySelectorAll(".macro-item-link").forEach((button) => {
        button.addEventListener("click", () => {
            const panel = document.getElementById(button.getAttribute("aria-controls"));
            if (!panel) return;

            const card = button.closest(".macro-card");
            const opening = !panel.classList.contains("open");

            card.querySelectorAll(".macro-panel").forEach((other) => {
                other.classList.remove("open");
            });
            card.querySelectorAll(".macro-item-link").forEach((other) => {
                other.setAttribute("aria-expanded", "false");
                other.textContent = "View";
            });

            if (opening) {
                panel.classList.add("open");
                button.setAttribute("aria-expanded", "true");
                button.textContent = "Hide";
            }
        });
    });
});