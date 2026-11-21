// Progressive enhancements only — every page works without this file.
(() => {
  const LEAD_HOURS = 72;

  // Keep the menu jump-bar tucked under the sticky header.
  const header = document.querySelector(".site-header");
  const setHeaderHeight = () => {
    if (header) document.documentElement.style.setProperty("--header-h", `${header.offsetHeight}px`);
  };
  setHeaderHeight();
  window.addEventListener("resize", setHeaderHeight);

  // ---- Menu: allergen filter ----
  const filter = document.getElementById("allergen-filter");
  if (filter) {
    filter.hidden = false;
    const cards = [...document.querySelectorAll(".menu-section .item-card")];
    const status = filter.querySelector(".filters-status");
    const apply = () => {
      const excluded = [...filter.querySelectorAll("input:checked")].map((i) => i.value);
      let shown = 0;
      cards.forEach((card) => {
        const contains = (card.dataset.contains || "").split(" ").filter(Boolean);
        const hide = excluded.some((a) => contains.includes(a));
        card.hidden = hide;
        if (!hide) shown++;
      });
      status.textContent = excluded.length ? `Showing ${shown} of ${cards.length} items.` : "";
    };
    filter.addEventListener("change", apply);
    filter.addEventListener("submit", (e) => e.preventDefault());
  }

  // ---- Order form ----
  const form = document.querySelector("form.order-form");
  if (form) {
    // Earliest pickup date = the calendar day LEAD_HOURS from now (local time).
    const date = form.querySelector('input[name="pickup_date"]');
    const earliest = new Date(Date.now() + LEAD_HOURS * 3600 * 1000);
    const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    if (date) {
      date.min = iso(earliest);
      const hint = document.getElementById("date-hint");
      if (hint) hint.textContent = `Earliest pickup: ${earliest.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}.`;
    }

    const error = document.getElementById("form-error");
    form.addEventListener("submit", (e) => {
      const problems = [];
      const val = (name) => (form.elements[name]?.value || "").trim();
      if (!val("phone") && !val("email") && !val("instagram")) {
        problems.push("Add a phone number, email or Instagram handle so we can confirm your order.");
      }
      const qtys = [...form.querySelectorAll('input[type="number"]')].map((i) => Number(i.value) || 0);
      if (!qtys.some((n) => n > 0) && !val("custom_details")) {
        problems.push("Choose at least one item, or describe your custom order.");
      }
      if (problems.length) {
        e.preventDefault();
        error.innerHTML = problems.map((p) => `<span>${p}</span>`).join("<br>");
        error.hidden = false;
        error.scrollIntoView({ block: "center" });
      } else if (error) {
        error.hidden = true;
      }
    });
  }
})();
