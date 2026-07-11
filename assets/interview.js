(() => {
  const nav = document.querySelector(".guide-nav");
  const tabs = [...document.querySelectorAll(".guide-nav [data-level]")];

  if (!nav || tabs.length === 0) return;

  const sections = tabs
    .map((tab) => document.getElementById(tab.dataset.level))
    .filter(Boolean);

  const setActiveTab = (level) => {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.level === level;
      tab.classList.toggle("is-active", isActive);

      if (isActive) {
        tab.setAttribute("aria-current", "true");
      } else {
        tab.removeAttribute("aria-current");
      }
    });
  };

  const updateActiveTab = () => {
    const marker = window.scrollY + nav.offsetHeight + 32;
    let currentSection = sections[0];

    for (const section of sections) {
      if (section.offsetTop <= marker) currentSection = section;
    }

    if (currentSection) setActiveTab(currentSection.id);
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => setActiveTab(tab.dataset.level));
  });

  window.addEventListener("scroll", updateActiveTab, { passive: true });
  window.addEventListener("resize", updateActiveTab);
  updateActiveTab();
})();
