(() => {
  const articleUrl = document.body.dataset.articleUrl || window.location.href;
  const articleTitle = document.body.dataset.articleTitle || document.title;

  const tocList = document.getElementById("tocList");
  const articleBody = document.getElementById("articleBody");
  if (tocList && articleBody) {
    const headings = articleBody.querySelectorAll("h2, h3");
    const ul = document.createElement("ul");
    ul.className = "toc-nav-list";
    headings.forEach((heading, index) => {
      const baseId = heading.textContent
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      const id = heading.id || `${baseId || "bagian"}-${index + 1}`;
      heading.id = id;
      const li = document.createElement("li");
      li.className =
        heading.tagName.toLowerCase() === "h3" ? "toc-item-h3" : "toc-item-h2";
      const a = document.createElement("a");
      a.className = "toc-link";
      a.href = `#${id}`;
      a.textContent = heading.textContent;
      li.appendChild(a);
      ul.appendChild(li);
    });
    tocList.appendChild(ul);
  }

  const encodedUrl = encodeURIComponent(articleUrl);
  const encodedTitle = encodeURIComponent(articleTitle);
  const linkMap = {
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    x: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
  };

  Object.entries(linkMap).forEach(([key, value]) => {
    const el = document.querySelector(`[data-share="${key}"]`);
    if (el) el.href = value;
  });

  const copyButton = document.querySelector('[data-share="copy"]');
  if (copyButton) {
    copyButton.addEventListener("click", async (event) => {
      event.preventDefault();
      await navigator.clipboard.writeText(articleUrl);
      copyButton.innerHTML =
        '<i class="bi bi-check2-circle"></i> Link Tersalin';
    });
  }

  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 480) backToTop.classList.add("show");
      else backToTop.classList.remove("show");
    });
  }
})();
