// Assemble email addresses at runtime so they aren't sitting in the page
// source as plain text for scrapers to harvest.
document.querySelectorAll(".email-link").forEach((link) => {
  const address = `${link.dataset.user}@${link.dataset.domain}`;
  link.href = `mailto:${address}`;
  if ("showAddress" in link.dataset) {
    link.textContent = address;
  }
});

// Mobile dropdown toggle
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (event) => {
    const isMobileMenuOpen = navLinks.classList.contains("open");
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");

    // On mobile, the menu-collapse animation and the browser's native anchor
    // jump run at the same time and race, landing the scroll wherever the
    // layout happened to be mid-collapse. Let the collapse finish first, then
    // scroll to the settled position.
    if (isMobileMenuOpen) {
      event.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth" });
      }, 260);
    }
  });
});

// Highlight active section in nav on scroll
const sections = document.querySelectorAll("main section[id]");
const navAnchors = navLinks.querySelectorAll("a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navAnchors.forEach((a) => {
          a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach((section) => observer.observe(section));
