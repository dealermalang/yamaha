(() => {
  const body = document.body;
  const articleUrl = body.dataset.articleUrl || window.location.href;
  const articleTitle = body.dataset.articleTitle || document.title;
  const articleBody = document.getElementById("articleBody");
  const tocList = document.getElementById("tocList");
  const tocDetails = document.querySelector(".toc-details");
  const topButton = document.getElementById("backToTop");

  const slugify = (text) =>
    (text || "")
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

  const syncTocDefault = () => {
    if (!tocDetails) return;
    tocDetails.open = window.matchMedia("(min-width: 992px)").matches;
  };

  const buildToc = () => {
    if (!tocList || !articleBody) return [];
    const headings = [...articleBody.querySelectorAll("h2, h3")];
    if (!headings.length) return [];

    const ul = document.createElement("ul");
    ul.className = "toc-nav-list";

    const links = [];
    headings.forEach((heading, index) => {
      const base = slugify(heading.textContent);
      const id = heading.id || `${base || "bagian"}-${index + 1}`;
      heading.id = id;

      const li = document.createElement("li");
      li.className =
        heading.tagName.toLowerCase() === "h3" ? "toc-item-h3" : "toc-item-h2";

      const link = document.createElement("a");
      link.className = "toc-link";
      link.href = `#${id}`;
      link.textContent = heading.textContent;

      link.addEventListener("click", () => {
        if (window.matchMedia("(max-width: 991.98px)").matches && tocDetails) {
          tocDetails.open = false;
        }
      });

      li.appendChild(link);
      ul.appendChild(li);
      links.push({ heading, link });
    });

    tocList.innerHTML = "";
    tocList.appendChild(ul);
    return links;
  };

  const bindActiveToc = (pairs) => {
    if (!pairs.length) return;
    const markActive = () => {
      const offset = 150;
      let current = pairs[0];
      for (const pair of pairs) {
        if (pair.heading.getBoundingClientRect().top <= offset) current = pair;
      }
      pairs.forEach((pair) => pair.link.classList.remove("active"));
      current.link.classList.add("active");
    };
    window.addEventListener("scroll", markActive, { passive: true });
    markActive();
  };

  const ensureHeroCaptionSource = () => {
    const caption = document.querySelector(".hero-figure-caption");
    const heroImage = document.querySelector(".hero-figure-image");
    if (!caption || !heroImage) return;
    if (/sumber\s*:/i.test(caption.textContent || "")) return;

    const original = (caption.textContent || "").trim();
    const source =
      heroImage.dataset.source ||
      (heroImage.src.includes("yamaha-motor.co.id")
        ? "Yamaha Motor Indonesia"
        : "Dokumentasi Dealer Yamaha Malang");
    caption.textContent = `${original} Sumber: ${source}.`;
  };

  const ensureSupportFigures = () => {
    if (!articleBody) return;
    const currentCount = articleBody.querySelectorAll(".article-figure").length;
    if (currentCount >= 2) return;

    const titleText =
      document.querySelector("h1.page-title")?.textContent?.trim() ||
      "artikel Yamaha Malang";
    const fallbacks = [
      {
        src: "https://www.yamaha-motor.co.id/uploads/products/featured_image/2025111019384188604L75511.png",
        alt: `Visual pendukung ${titleText} - Yamaha NMAX Turbo`,
        caption:
          "Visual pendukung pembahasan artikel ini untuk membantu pembaca memahami konteks model Yamaha yang dibahas. Sumber: Yamaha Motor Indonesia.",
      },
      {
        src: "https://www.yamaha-motor.co.id/uploads/products/featured_image/2026020516255618687C33585.png",
        alt: `Visual pendukung ${titleText} - Yamaha Aerox Alpha`,
        caption:
          "Gambar tambahan untuk melengkapi penjelasan artikel agar lebih mudah dipahami secara visual. Sumber: Yamaha Motor Indonesia.",
      },
    ];

    const need = 2 - currentCount;
    const targetHeading = [...articleBody.querySelectorAll("h2")].find((el) =>
      /kesimpulan/i.test(el.textContent || "")
    );

    for (let i = 0; i < need; i += 1) {
      const item = fallbacks[i];
      const figure = document.createElement("figure");
      figure.className = "article-figure";
      figure.innerHTML = `
        <img class="article-figure-image" src="${item.src}" alt="${item.alt}" loading="lazy" decoding="async" width="1200" height="675">
        <figcaption class="article-figure-caption">${item.caption}</figcaption>
      `;
      if (targetHeading) {
        articleBody.insertBefore(figure, targetHeading);
      } else {
        articleBody.appendChild(figure);
      }
    }
  };

  const setupShareButtons = () => {
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
      if (!el) return;
      el.href = value;
      el.target = "_blank";
      el.rel = "noopener";
    });

    const copyButton = document.querySelector('[data-share="copy"]');
    if (!copyButton) return;
    copyButton.addEventListener("click", async (event) => {
      event.preventDefault();
      try {
        await navigator.clipboard.writeText(articleUrl);
      } catch (_) {
        const helper = document.createElement("textarea");
        helper.value = articleUrl;
        document.body.appendChild(helper);
        helper.select();
        document.execCommand("copy");
        document.body.removeChild(helper);
      }
      copyButton.innerHTML = '<i class="bi bi-check2-circle"></i> Link Tersalin';
    });
  };

  const setupFloatingButtons = () => {
    if (!topButton) return;
    window.addEventListener(
      "scroll",
      () => {
        if (window.scrollY > 420) topButton.classList.add("show");
        else topButton.classList.remove("show");
      },
      { passive: true }
    );
  };

  const optimizeImages = () => {
    document.querySelectorAll("img").forEach((img) => {
      if (!img.hasAttribute("decoding")) img.setAttribute("decoding", "async");
      if (!img.hasAttribute("loading")) img.setAttribute("loading", "lazy");
    });
  };

  syncTocDefault();
  window.addEventListener("resize", syncTocDefault);
  ensureHeroCaptionSource();
  ensureSupportFigures();
  optimizeImages();
  const tocPairs = buildToc();
  bindActiveToc(tocPairs);
  setupShareButtons();
  setupFloatingButtons();
})();
