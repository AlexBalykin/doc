function getDomain() {
  const params = new URLSearchParams(window.location.search);
  const domainFromUrl = params.get("domain");

  if (domainFromUrl) {
    // сохраняем в localStorage
    localStorage.setItem("customDomain", domainFromUrl);
    return domainFromUrl;
  }

  // если нет в URL — берем из localStorage
  return localStorage.getItem("customDomain") || "youUrl";
}

function replaceDomainInNode(node, domain) {
  if (node.nodeType === Node.TEXT_NODE) {
    node.textContent = node.textContent.replace(/youUrl/g, domain);
  } else {
    node.childNodes.forEach((child) => replaceDomainInNode(child, domain));
  }
}

function applyReplacement() {
  const domain = getDomain();
  replaceDomainInNode(document.body, domain);
}

// Ставим обработчик и на первую загрузку, и на переходы по Starlight
window.addEventListener("DOMContentLoaded", applyReplacement);

// Перехват "виртуальной" навигации Astro/Starlight
document.addEventListener("astro:page-load", applyReplacement);
