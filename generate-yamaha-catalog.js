const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const BASE_URL = 'https://www.yamaha-motor.co.id';
const SITE_URL = 'https://yamahamalang.web.id';
const WHATSAPP = 'https://wa.me/62895639068080';

const PRODUCTS = [
  { id: 'tmax-tech-max', file: 'detail-tmax.html', categoryKey: 'maxi', source: `${BASE_URL}/product/tmax-tech-max/` },
  { id: 'xmax-250-connected', file: 'detail-xmax-250.html', categoryKey: 'maxi', source: `${BASE_URL}/product/xmax-connected/` },
  { id: 'nmax-turbo', file: 'detail-nmax-turbo.html', categoryKey: 'maxi', source: `${BASE_URL}/product/nmax-turbo/` },
  { id: 'aerox-alpha', file: 'detail-aerox-alpha.html', categoryKey: 'maxi', source: `${BASE_URL}/product/aerox-alpha/` },
  { id: 'lexi-lx-155', file: 'detail-lexi-lx-155.html', categoryKey: 'maxi', source: `${BASE_URL}/product/lexi-lx-155/` },
  { id: 'nmax-155-connected', file: 'detail-nmax-155.html', categoryKey: 'maxi', source: `${BASE_URL}/product/all-new-nmax155-connected/` },
  { id: 'aerox-155-connected', file: 'detail-aerox-155.html', categoryKey: 'maxi', source: `${BASE_URL}/product/all-new-aerox155-connected/` },

  { id: 'grand-filano', file: 'detail-grand-filano.html', categoryKey: 'classy', source: `${BASE_URL}/product/grand-filano/` },
  { id: 'fazzio-hybrid', file: 'detail-fazzio.html', categoryKey: 'classy', source: `${BASE_URL}/product/fazzio/` },

  { id: 'gear-ultima-125-hybrid', file: 'detail-gear-ultima.html', categoryKey: 'matic', source: `${BASE_URL}/product/gear-ultima/` },
  { id: 'gear-125', file: 'detail-gear-125.html', categoryKey: 'matic', source: `${BASE_URL}/product/gear-125/` },
  { id: 'freego-125', file: 'detail-freego-125.html', categoryKey: 'matic', source: `${BASE_URL}/product/freego-125/` },
  { id: 'x-ride-125', file: 'detail-x-ride-125.html', categoryKey: 'matic', source: `${BASE_URL}/product/x-ride/` },
  { id: 'mio-m3-125', file: 'detail-mio-m3-125.html', categoryKey: 'matic', source: `${BASE_URL}/product/mio-m3/` },
  { id: 'fino-125', file: 'detail-fino-125.html', categoryKey: 'matic', source: `${BASE_URL}/product/fino/` },

  { id: 'xsr-155', file: 'detail-xsr-155.html', categoryKey: 'sport', source: `${BASE_URL}/product/xsr-155/` },
  { id: 'r15-connected', file: 'detail-r15-connected.html', categoryKey: 'sport', source: `${BASE_URL}/product/all-new-R15-connected/` },
  { id: 'r25', file: 'detail-r25.html', categoryKey: 'sport', source: `${BASE_URL}/product/r25/` },
  { id: 'mt-25', file: 'detail-mt-25.html', categoryKey: 'sport', source: `${BASE_URL}/product/mt25/` },
  { id: 'mt-15', file: 'detail-mt-15.html', categoryKey: 'sport', source: `${BASE_URL}/product/mt15/` },
  { id: 'vixion', file: 'detail-vixion.html', categoryKey: 'sport', source: `${BASE_URL}/product/vixion/` },

  { id: 'wr-155-r', file: 'detail-wr-155-r.html', categoryKey: 'offroad', source: `${BASE_URL}/product/wr155r/` },
  { id: 'yz125x', file: 'detail-yz125x.html', categoryKey: 'offroad', source: `${BASE_URL}/product/yz125x/` },
  { id: 'yz250x', file: 'detail-yz250x.html', categoryKey: 'offroad', source: `${BASE_URL}/product/yz250x/` },
  { id: 'yz250f', file: 'detail-yz250f.html', categoryKey: 'offroad', source: `${BASE_URL}/product/yz250f/` },
  { id: 'yz250fx', file: 'detail-yz250fx.html', categoryKey: 'offroad', source: `${BASE_URL}/product/yz250fx/` },

  { id: 'mx-king-150', file: 'detail-mx-king-150.html', categoryKey: 'moped', source: `${BASE_URL}/product/mx-king-150/` },
  { id: 'jupiter-z1', file: 'detail-jupiter-z1.html', categoryKey: 'moped', source: `${BASE_URL}/product/jupiter-z1/` },
  { id: 'vega-force', file: 'detail-vega-force.html', categoryKey: 'moped', source: `${BASE_URL}/product/vega-force/` },
];

const SECTIONS = [
  {
    key: 'maxi',
    id: 'maxi-collection',
    labelIcon: 'stars',
    label: 'MAXi Yamaha',
    title: 'Lini MAXi resmi Yamaha untuk premium scooter dan performa harian.',
    text: 'Urutan model mengikuti katalog resmi Yamaha Motor Indonesia agar pengunjung langsung melihat keluarga MAXi dari TMAX, XMAX, NMAX, LEXi, sampai Aerox dalam satu alur yang konsisten.'
  },
  {
    key: 'classy',
    id: 'classy-collection',
    labelIcon: 'gem',
    label: 'Classy Yamaha',
    title: 'Skutik Classy untuk gaya premium, ringan, dan modern.',
    text: 'Grand Filano dan Fazzio dipisahkan dalam blok khusus seperti di website resmi Yamaha supaya pengunjung yang datang dari lineup Classy langsung menemukan dua model utamanya.'
  },
  {
    key: 'matic',
    id: 'matic-collection',
    labelIcon: 'scooter',
    label: 'Matic Yamaha',
    title: 'Skutik harian Yamaha untuk keluarga, komuter, dan utility riding.',
    text: 'Kategori ini mengikuti lineup resmi Yamaha di luar MAXi dan Classy, mulai dari Gear, FreeGo, X-Ride, Mio M3, sampai Fino.'
  },
  {
    key: 'sport',
    id: 'sport-collection',
    labelIcon: 'lightning-fill',
    label: 'Sport Yamaha',
    title: 'Motor sport Yamaha untuk fairing, naked bike, dan neo retro.',
    text: 'Strukturnya disamakan dengan katalog resmi Yamaha sehingga R-Series, MT-Series, XSR, dan Vixion tetap rapi dalam satu grup sport jalan raya.'
  },
  {
    key: 'offroad',
    id: 'offroad-collection',
    labelIcon: 'tree',
    label: 'Off-Road Yamaha',
    title: 'Lini dual purpose dan competition off-road Yamaha.',
    text: 'WR 155 R dan keluarga YZ dipisahkan dari sport jalan raya seperti di website resmi Yamaha agar pembeli trail dan motocross langsung masuk ke model yang relevan.'
  },
  {
    key: 'moped',
    id: 'moped-collection',
    labelIcon: 'bicycle',
    label: 'Moped Yamaha',
    title: 'Motor bebek Yamaha untuk kebutuhan praktis, irit, dan tangguh.',
    text: 'Kategori moped mempertahankan istilah resmi Yamaha namun tetap komunikatif untuk pengunjung lokal yang mencari MX King, Jupiter Z1, dan Vega Force.'
  }
];

const ENTITY_MAP = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&nbsp;': ' '
};

function decodeHtml(value = '') {
  return value
    .replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (match) => ENTITY_MAP[match] || match)
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([\da-fA-F]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16)));
}

function stripTags(value = '') {
  return decodeHtml(value.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function slugToTitle(value) {
  return value
    .split('-')
    .map((part) => part.toUpperCase() === part ? part : part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
    .replace(/\bMx\b/g, 'MX')
    .replace(/\bMt\b/g, 'MT')
    .replace(/\bR\b/g, 'R')
    .replace(/\bXsr\b/g, 'XSR');
}

function absoluteUrl(url = '') {
  if (!url) return '';
  return url.startsWith('http') ? url : `${BASE_URL}${url}`;
}

function getMeta(html, attr, name) {
  const patterns = [
    new RegExp(`<meta[^>]+${attr}="${escapeRegExp(name)}"[^>]+content="([^"]+)"`, 'i'),
    new RegExp(`<meta[^>]+content="([^"]+)"[^>]+${attr}="${escapeRegExp(name)}"`, 'i')
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) return stripTags(match[1]);
  }

  return '';
}

function getSection(html, id) {
  const match = html.match(new RegExp(`<section id="${id}">([\\s\\S]*?)</section>`, 'i'));
  return match ? match[1] : '';
}

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function summarizeText(text, maxLength = 180) {
  if (!text) return '';
  const firstSentence = text.split(/(?<=[.!?])\s+/)[0]?.trim() || text.trim();
  if (firstSentence.length <= maxLength) return firstSentence;
  return `${firstSentence.slice(0, maxLength - 1).trim()}...`;
}

function extractVariantBlocks(sectionHtml) {
  const names = [...sectionHtml.matchAll(/<p class="sec2-version-txt">([\s\S]*?)<\/p>/gi)].map((match) => stripTags(match[1]));
  const blocks = [...sectionHtml.matchAll(/<div id="sec2-div\d+" class="sec2-div[^"]*">([\s\S]*?)(?=<div id="sec2-div\d+" class="sec2-div|$)/gi)].map((match) => match[1]);
  const variants = [];

  blocks.forEach((block, index) => {
    const images = unique([...block.matchAll(/<img class="sec2-swiper-img"[^>]+src="([^"]+)"/gi)].map((match) => absoluteUrl(match[1])));
    const colors = unique([...block.matchAll(/data-src="([^"]+)"/gi)].map((match) => stripTags(match[1])));
    const priceMatch = block.match(/Rp\s*[\d.]+/i);
    const price = priceMatch ? priceMatch[0].replace(/\s+/g, ' ').trim() : '';
    const title = names[index] || `Varian ${index + 1}`;
    variants.push({
      title,
      price,
      colors,
      images
    });
  });

  if (!variants.length && names.length) {
    names.forEach((name) => {
      variants.push({ title: name, price: '', colors: [], images: [] });
    });
  }

  return variants;
}

function extractFeatures(sectionHtml) {
  return [...sectionHtml.matchAll(/<img class="sec3-swiper-img"[^>]+src="([^"]+)"[\s\S]*?<p class="sec3-swiper-title">([\s\S]*?)<\/p>[\s\S]*?<p class="sec3-swiper-txt">([\s\S]*?)<\/p>/gi)]
    .map((match) => ({
      image: absoluteUrl(match[1]),
      title: stripTags(match[2]),
      text: stripTags(match[3])
    }))
    .filter((item) => item.title && item.text)
    .slice(0, 8);
}

function extractSpecifications(sectionHtml) {
  const chunks = sectionHtml.split(/<a class="sec4-a"/i).slice(1);
  return chunks.map((chunk) => {
    const titleMatch = chunk.match(/<p class="sec4-title-txt">([\s\S]*?)<\/p>/i);
    const rows = [...chunk.matchAll(/<td class="sec4-td1">([\s\S]*?)<\/td>[\s\S]*?<td class="sec4-td3">([\s\S]*?)<\/td>/gi)]
      .map((row) => ({ key: stripTags(row[1]), value: stripTags(row[2]) }))
      .filter((row) => row.key && row.value);
    return {
      title: titleMatch ? stripTags(titleMatch[1]) : '',
      rows
    };
  }).filter((group) => group.title && group.rows.length);
}

function buildData(product, html) {
  const name = getMeta(html, 'property', 'og:title') || stripTags((html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || '') || slugToTitle(product.id);
  const description = getMeta(html, 'name', 'description') || getMeta(html, 'property', 'og:description');
  const featuredImage = absoluteUrl(getMeta(html, 'property', 'og:image'));
  const section2 = getSection(html, 'section2');
  const section3 = getSection(html, 'section3');
  const section4 = getSection(html, 'section4');
  const variants = extractVariantBlocks(section2);
  const features = extractFeatures(section3);
  const specs = extractSpecifications(section4);
  const images = unique([
    featuredImage,
    ...variants.flatMap((variant) => variant.images),
    ...features.map((feature) => feature.image)
  ]).slice(0, 8);
  const priceCandidates = unique(variants.map((variant) => variant.price).filter(Boolean));
  const priceText = !priceCandidates.length
    ? 'Info lengkap di halaman detail'
    : priceCandidates.length === 1
      ? priceCandidates[0]
      : `Mulai ${priceCandidates[0]}`;
  const heroStats = [
    { label: 'Varian', value: String(Math.max(variants.length, 1)) },
    { label: 'Fitur Utama', value: String(Math.max(features.length, 1)) },
    { label: 'Kelompok Spek', value: String(Math.max(specs.length, 1)) }
  ];

  return {
    ...product,
    name,
    shortName: name.replace(/^Yamaha\s+/i, ''),
    description,
    summary: summarizeText(description, 165),
    featuredImage,
    images: images.length ? images : [featuredImage].filter(Boolean),
    variants,
    features,
    specs,
    priceText,
    heroStats,
    faq: buildFaq(name, description, priceText, features, specs)
  };
}

function buildFaq(name, description, priceText, features, specs) {
  const featureTitles = features.slice(0, 3).map((item) => item.title).join(', ');
  const specTitles = specs.slice(0, 2).map((item) => item.title).join(' dan ');
  return [
    {
      question: `Berapa harga ${name} di Dealer Yamaha Malang?`,
      answer: `${name} kami tampilkan dengan referensi harga resmi Yamaha Indonesia. Harga yang muncul di halaman ini ${priceText.toLowerCase()}. Untuk OTR Malang, promo, DP ringan, dan tenor kredit terbaru, hubungi sales kami melalui WhatsApp.`
    },
    {
      question: `Apa keunggulan utama ${name}?`,
      answer: featureTitles
        ? `${name} menonjol lewat fitur seperti ${featureTitles}. Detail fitur resmi sudah kami rangkum dari halaman produk Yamaha agar calon pembeli bisa membandingkan dengan lebih cepat.`
        : `${name} menawarkan karakter produk yang mengikuti informasi resmi Yamaha Indonesia, mulai dari desain, fitur utama, sampai positioning penggunaannya.`
    },
    {
      question: `Apakah ${name} bisa dibeli secara kredit?`,
      answer: `${name} bisa dikonsultasikan untuk pembelian tunai maupun kredit. Tim Dealer Yamaha Malang siap membantu simulasi DP, tenor, cicilan, promo aktif, dan ketersediaan warna/unit.`
    },
    {
      question: `Di mana saya bisa melihat spesifikasi ${name}?`,
      answer: specTitles
        ? `Spesifikasi ${name} sudah kami susun berdasarkan data resmi Yamaha, termasuk bagian ${specTitles} dan kelompok teknis lainnya di halaman detail ini.`
        : `Spesifikasi ${name} sudah kami rangkum di halaman ini berdasarkan sumber resmi Yamaha Indonesia, lalu kami lengkapi dengan tombol konsultasi agar proses pembelian lebih cepat.`
    }
  ];
}

function renderVariantSection(data) {
  if (!data.variants.length) return '';
  return `
    <section class="content-section section-shell">
      <div class="section-heading">
        <span class="section-label-alt"><i class="bi bi-grid-1x2-fill"></i> Varian & Harga</span>
        <h2>Pilihan ${escapeHtml(data.shortName)}</h2>
        <p>${escapeHtml(data.summary)}</p>
      </div>
      <div class="variant-grid">
        ${data.variants.map((variant) => `
          <article class="info-card variant-card">
            <div class="variant-media">
              <img class="variant-media-image" src="${escapeHtml(variant.images[0] || data.images[0] || data.featuredImage)}" alt="${escapeHtml(`${data.name} ${variant.title}`)}" loading="lazy" decoding="async">
            </div>
            <h3 class="card-title-ym">${escapeHtml(variant.title)}</h3>
            <p class="variant-price">${escapeHtml(variant.price || 'Hubungi sales untuk harga terbaru')}</p>
            ${variant.colors.length ? `<p class="variant-colors">Pilihan warna: ${escapeHtml(variant.colors.join(', '))}</p>` : `<p class="variant-colors">Konsultasi warna dan stok terbaru langsung dengan tim sales kami.</p>`}
          </article>
        `).join('')}
      </div>
    </section>`;
}

function renderFeatureSection(data) {
  if (!data.features.length) return '';
  return `
    <section class="content-section section-shell">
      <div class="section-heading">
        <span class="section-label-alt"><i class="bi bi-stars"></i> Highlight Produk</span>
        <h2>Fitur resmi ${escapeHtml(data.shortName)}</h2>
        <p>Seluruh poin di bawah ini dirangkum dari halaman resmi Yamaha Indonesia untuk membantu calon pembeli melihat keunggulan utama tanpa membuka banyak tab.</p>
      </div>
      <div class="feature-grid">
        ${data.features.map((feature) => `
          <article class="feature-card">
            <img class="feature-media-image" src="${escapeHtml(feature.image)}" alt="${escapeHtml(feature.title)}" loading="lazy" decoding="async">
            <div class="feature-card-body">
              <h3 class="card-title-ym">${escapeHtml(feature.title)}</h3>
              <p class="card-copy-ym">${escapeHtml(feature.text)}</p>
            </div>
          </article>
        `).join('')}
      </div>
    </section>`;
}

function renderSpecSection(data) {
  if (!data.specs.length) return '';
  return `
    <section class="content-section section-shell" id="specifications">
      <div class="section-heading">
        <span class="section-label-alt"><i class="bi bi-speedometer2"></i> Spesifikasi</span>
        <h2>Data teknis ${escapeHtml(data.shortName)}</h2>
        <p>Tabel berikut kami susun dari struktur spesifikasi resmi Yamaha supaya pengunjung bisa membandingkan mesin, dimensi, rangka, dan detail teknis lainnya dengan cepat.</p>
      </div>
      <div class="accordion accordion-ym" id="specAccordion">
        ${data.specs.map((group, index) => `
          <div class="accordion-item">
            <h3 class="accordion-header" id="spec-head-${index}">
              <button class="accordion-button ${index === 0 ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#spec-body-${index}" aria-expanded="${index === 0 ? 'true' : 'false'}" aria-controls="spec-body-${index}">
                ${escapeHtml(group.title)}
              </button>
            </h3>
            <div id="spec-body-${index}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" aria-labelledby="spec-head-${index}" data-bs-parent="#specAccordion">
              <div class="accordion-body">
                <div class="spec-table">
                  ${group.rows.map((row) => `
                    <div class="spec-row">
                      <span class="spec-key">${escapeHtml(row.key)}</span>
                      <span class="spec-value">${escapeHtml(row.value)}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </section>`;
}

function renderFaqSection(data) {
  return `
    <section class="content-section section-shell" id="faq-section">
      <div class="section-heading">
        <span class="section-label-alt"><i class="bi bi-chat-dots-fill"></i> FAQ</span>
        <h2>Pertanyaan yang paling sering ditanyakan</h2>
        <p>Bagian ini membantu calon pembeli yang datang dari halaman katalog untuk langsung masuk ke informasi harga, fitur, spesifikasi, dan proses kredit.</p>
      </div>
      <div class="accordion accordion-ym" id="faqAccordion">
        ${data.faq.map((item, index) => `
          <div class="accordion-item">
            <h3 class="accordion-header" id="faq-head-${index}">
              <button class="accordion-button ${index === 0 ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#faq-body-${index}" aria-expanded="${index === 0 ? 'true' : 'false'}" aria-controls="faq-body-${index}">
                ${escapeHtml(item.question)}
              </button>
            </h3>
            <div id="faq-body-${index}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" aria-labelledby="faq-head-${index}" data-bs-parent="#faqAccordion">
              <div class="accordion-body">${escapeHtml(item.answer)}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </section>`;
}

function renderPage(data) {
  const pageUrl = `${SITE_URL}/${data.file.replace('.html', '')}`;
  const title = `${data.name} - Harga, Spesifikasi & Kredit | Dealer Yamaha Malang`;
  const description = data.description || `${data.name} dengan informasi fitur, spesifikasi, dan konsultasi kredit terbaru di Dealer Yamaha Malang.`;
  const whatsappText = encodeURIComponent(`Halo, saya ingin info ${data.name} di Dealer Yamaha Malang`);
  const galleryImages = data.images.length ? data.images : [data.featuredImage].filter(Boolean);
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: data.name,
      image: galleryImages.slice(0, 5),
      description,
      brand: { '@type': 'Brand', name: 'Yamaha' },
      category: SECTIONS.find((section) => section.key === data.categoryKey)?.label || 'Motor Yamaha',
      offers: data.variants.length
        ? data.variants.map((variant) => ({
            '@type': 'Offer',
            name: `${data.name} ${variant.title}`,
            priceCurrency: 'IDR',
            price: (variant.price.match(/[\d.]+/) || [''])[0].replace(/\./g, ''),
            availability: 'https://schema.org/InStock',
            url: pageUrl
          }))
        : [{ '@type': 'Offer', availability: 'https://schema.org/InStock', url: pageUrl }]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Katalog', item: `${SITE_URL}/katalog.html` },
        { '@type': 'ListItem', position: 3, name: data.name, item: pageUrl }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer }
      }))
    }
  ];

  return `<!DOCTYPE html>
<html lang="id" dir="ltr" prefix="og: https://ogp.me/ns#">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="keywords" content="${escapeHtml(`${data.name}, harga ${data.shortName.toLowerCase()}, spesifikasi ${data.shortName.toLowerCase()}, dealer yamaha malang, kredit motor yamaha`) }">
  <meta name="author" content="Dealer Resmi Yamaha Malang">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="${escapeHtml(pageUrl)}">
  <meta property="og:locale" content="id_ID">
  <meta property="og:type" content="product">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${escapeHtml(pageUrl)}">
  <meta property="og:image" content="${escapeHtml(data.featuredImage || galleryImages[0] || '')}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${escapeHtml(data.featuredImage || galleryImages[0] || '')}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  <style>
    :root { --ym-red:#e31837; --ym-blue:#123a86; --ym-dark:#0b1020; --ym-ink:#14213d; --ym-soft:#edf3ff; --ym-gold:#ffd166; }
    * { box-sizing:border-box; }
    html { scroll-behavior:smooth; }
    body { margin:0; font-family:'Plus Jakarta Sans', system-ui, sans-serif; color:var(--ym-ink); background:linear-gradient(180deg, #f6f8fc 0%, #eef4fb 100%); }
    .navbar-ym { background:rgba(10,15,30,.96); backdrop-filter:blur(12px); box-shadow:0 12px 32px rgba(0,0,0,.18); }
    .navbar-brand, .navbar-brand:hover { color:#fff; }
    .navbar-ym .navbar-brand img { height:42px; }
    .navbar-ym .nav-link { color:#fff; font-weight:500; letter-spacing:.3px; transition:color .2s; }
    .navbar-ym .nav-link:hover, .navbar-ym .nav-link.active { color:var(--ym-red); }
    .product-hero { padding:112px 0 54px; position:relative; overflow:hidden; background:radial-gradient(circle at top right, rgba(227,24,55,.24), transparent 25%), radial-gradient(circle at left bottom, rgba(18,58,134,.26), transparent 30%), linear-gradient(135deg, #0b1020 0%, #15284e 52%, #17376f 100%); }
    .product-hero::after { content:''; position:absolute; inset:auto -120px -120px auto; width:340px; height:340px; border-radius:50%; background:radial-gradient(circle, rgba(255,209,102,.20), transparent 70%); }
    .product-hero .breadcrumb-item a, .product-hero .breadcrumb-item.active, .product-hero .breadcrumb-item + .breadcrumb-item::before { color:rgba(255,255,255,.72); }
    .hero-badge, .section-label-alt { display:inline-flex; align-items:center; gap:.5rem; border-radius:999px; font-size:.78rem; font-weight:800; letter-spacing:.08em; text-transform:uppercase; }
    .hero-badge { padding:.6rem 1rem; background:rgba(255,255,255,.12); color:#fff; border:1px solid rgba(255,255,255,.18); }
    .section-label-alt { padding:.55rem .95rem; background:rgba(18,58,134,.08); color:var(--ym-blue); }
    .product-hero h1 { color:#fff; font-weight:800; font-size:clamp(2rem, 4vw, 3.4rem); line-height:1.06; margin:.9rem 0; }
    .product-hero h1 span { color:var(--ym-gold); }
    .hero-copy { color:rgba(255,255,255,.82); font-size:1.02rem; max-width:680px; }
    .hero-price { display:inline-flex; align-items:center; gap:.55rem; margin:1.2rem 0 1rem; padding:.8rem 1rem; border-radius:16px; background:rgba(255,255,255,.10); color:#fff; font-weight:700; }
    .hero-actions { display:flex; flex-wrap:wrap; gap:.85rem; margin-top:1.4rem; }
    .btn-ym, .btn-outline-ym { display:inline-flex; align-items:center; justify-content:center; gap:.55rem; border-radius:999px; padding:.95rem 1.4rem; font-weight:700; text-decoration:none; transition:.25s ease; }
    .btn-ym { background:linear-gradient(135deg, var(--ym-red), #c51230); color:#fff; box-shadow:0 14px 34px rgba(227,24,55,.24); }
    .btn-ym:hover { transform:translateY(-2px); color:#fff; }
    .btn-outline-ym { color:#fff; border:1px solid rgba(255,255,255,.3); background:rgba(255,255,255,.06); }
    .btn-outline-ym:hover { color:#fff; background:rgba(255,255,255,.12); }
    .hero-stats { display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:.9rem; margin-top:1.6rem; }
    .hero-stat { background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.11); border-radius:22px; padding:1rem; color:#fff; }
    .hero-stat strong { display:block; font-size:1.6rem; }
    .hero-art { position:relative; }
    .hero-main-image { width:100%; max-height:470px; object-fit:contain; filter:drop-shadow(0 26px 48px rgba(0,0,0,.35)); }
    .section-shell { width:min(1180px, calc(100% - 32px)); margin:0 auto; }
    .content-section { margin-top:2rem; }
    .gallery-shell { margin-top:-34px; position:relative; z-index:2; }
    .gallery-panel, .info-card, .support-panel, .accordion-item { background:#fff; border:1px solid rgba(16,35,74,.08); box-shadow:0 18px 50px rgba(16,35,74,.08); }
    .gallery-panel { border-radius:28px; padding:1.35rem; }
    .gallery-main { background:linear-gradient(180deg, #f8fbff 0%, #eef5ff 100%); border-radius:22px; min-height:380px; display:flex; align-items:center; justify-content:center; padding:1.2rem; }
    .gallery-main-image { max-width:100%; max-height:340px; object-fit:contain; }
    .thumb-row { display:grid; grid-template-columns:repeat(auto-fit, minmax(110px, 1fr)); gap:.8rem; margin-top:1rem; }
    .thumb-btn { border:none; border-radius:18px; background:#f5f8fd; padding:.7rem; min-height:88px; cursor:pointer; }
    .thumb-btn.active { outline:2px solid rgba(227,24,55,.28); background:#fff2f5; }
    .gallery-thumb-image { width:100%; height:72px; object-fit:contain; }
    .section-heading { margin-bottom:1.2rem; }
    .section-heading h2 { font-size:clamp(1.65rem, 2.5vw, 2.35rem); margin:.7rem 0 .35rem; color:#0f2148; font-weight:800; }
    .section-heading p { color:#5a6782; max-width:820px; }
    .overview-grid, .variant-grid, .feature-grid { display:grid; gap:1rem; }
    .overview-grid { grid-template-columns:repeat(3, minmax(0,1fr)); }
    .variant-grid, .feature-grid { grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); }
    .info-card, .feature-card { border-radius:24px; overflow:hidden; }
    .info-card { padding:1.35rem; }
    .card-title-ym { margin:0 0 .6rem; font-size:1.1rem; font-weight:800; color:#0f2148; }
    .card-copy-ym { margin:0; color:#5b6880; }
    .feature-media-image { width:100%; height:210px; object-fit:contain; background:linear-gradient(180deg, #f9fbff 0%, #eef5ff 100%); }
    .variant-media-image { width:100%; height:210px; object-fit:contain; background:linear-gradient(180deg, #f9fbff 0%, #eef5ff 100%); }
    .feature-card-body { padding:1.15rem 1.25rem 1.3rem; }
    .variant-price { color:var(--ym-red); font-weight:800; margin-bottom:.5rem; }
    .variant-colors { font-size:.95rem; }
    .accordion-ym .accordion-item { border-radius:20px; overflow:hidden; margin-bottom:.85rem; }
    .accordion-ym .accordion-button { font-weight:800; color:#0f2148; background:#fff; box-shadow:none; }
    .accordion-ym .accordion-button:not(.collapsed) { background:#f5f8ff; color:var(--ym-blue); }
    .spec-table { display:grid; gap:.75rem; }
    .spec-row { display:grid; grid-template-columns:minmax(0, 250px) minmax(0, 1fr); gap:1rem; padding:.85rem 0; border-bottom:1px solid rgba(16,35,74,.08); }
    .spec-row:last-child { border-bottom:none; }
    .spec-key { color:#60708c; font-weight:700; }
    .spec-value { color:#10244d; font-weight:600; }
    .support-panel { border-radius:30px; padding:2rem; background:linear-gradient(135deg, #11264d 0%, #193d7d 55%, #1e56a7 100%); color:#fff; margin:2.1rem auto 0; }
    .support-copy { color:rgba(255,255,255,.82); max-width:760px; }
    .support-list { list-style:none; padding:0; margin:1rem 0 0; display:grid; gap:.7rem; }
    .support-list li { display:flex; gap:.8rem; align-items:flex-start; }
    .support-list i { color:#8effbf; }
    .footer-ym { margin-top:2rem; background:#0b1020; color:rgba(255,255,255,.72); }
    .footer-link { color:#fff; text-decoration:none; }
    .wa-float { position:fixed; right:18px; bottom:18px; width:58px; height:58px; border-radius:50%; display:grid; place-items:center; background:#25d366; color:#fff; box-shadow:0 20px 35px rgba(37,211,102,.28); font-size:1.5rem; z-index:30; }
    @media (max-width: 991px) { .hero-stats, .overview-grid { grid-template-columns:1fr; } .gallery-shell { margin-top:1rem; } }
    @media (max-width: 767px) { .product-hero { padding-top:100px; } .gallery-main { min-height:280px; } .spec-row { grid-template-columns:1fr; gap:.35rem; } }
  </style>
</head>
<body>
  <nav class="navbar navbar-expand-lg navbar-ym fixed-top" id="mainNav">
    <div class="container">
      <a class="navbar-brand" href="index.html" aria-label="Yamaha Malang Home"><img src="https://www.yamaha-motor.co.id/web_new/shared/image/logo-sepeda-motor-yamaha-indonesia.png?1741327215" alt="Logo Yamaha Motor Indonesia - Dealer Yamaha Malang" height="42" width="auto" loading="eager"></a>
      <button class="navbar-toggler border-0 text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu" aria-controls="navMenu" aria-expanded="false" aria-label="Toggle navigasi"><i class="bi bi-list fs-2"></i></button>
      <div class="collapse navbar-collapse" id="navMenu">
        <ul class="navbar-nav ms-auto gap-1">
          <li class="nav-item"><a class="nav-link" href="index.html#home">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="index.html#produk">Produk Motor</a></li>
          <li class="nav-item"><a class="nav-link active" href="katalog.html">Katalog</a></li>
          <li class="nav-item"><a class="nav-link" href="index.html#keunggulan">Keunggulan</a></li>
          <li class="nav-item"><a class="nav-link" href="index.html#promo">Promo</a></li>
          <li class="nav-item"><a class="nav-link" href="news.html">News</a></li>
          <li class="nav-item"><a class="nav-link" href="about.html">Tentang</a></li>
          <li class="nav-item"><a class="nav-link" href="index.html#faq">FAQ</a></li>
          <li class="nav-item"><a class="nav-link" href="index.html#kontak">Kontak</a></li>
        </ul>
        <a href="${WHATSAPP}?text=${whatsappText}" class="btn btn-ym ms-lg-3 mt-2 mt-lg-0" rel="noopener"><i class="bi bi-whatsapp me-1"></i> Hubungi Kami</a>
      </div>
    </div>
  </nav>

  <header class="product-hero">
    <div class="section-shell">
      <div class="row align-items-center g-4">
        <div class="col-lg-6">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-3">
              <li class="breadcrumb-item"><a href="index.html">Home</a></li>
              <li class="breadcrumb-item"><a href="katalog.html">Katalog</a></li>
              <li class="breadcrumb-item active" aria-current="page">${escapeHtml(data.shortName)}</li>
            </ol>
          </nav>
          <span class="hero-badge"><i class="bi bi-patch-check-fill"></i> Data resmi Yamaha Indonesia</span>
          <h1>${escapeHtml(data.name.replace(data.shortName, ''))}<span>${escapeHtml(data.shortName)}</span></h1>
          <p class="hero-copy">${escapeHtml(description)}</p>
          <div class="hero-price"><i class="bi bi-tag-fill"></i> ${escapeHtml(data.priceText)}</div>
          <div class="hero-actions">
            <a href="${WHATSAPP}?text=${whatsappText}" class="btn-ym" rel="noopener"><i class="bi bi-whatsapp"></i> Tanya Sales</a>
            <a href="#specifications" class="btn-outline-ym"><i class="bi bi-speedometer2"></i> Lihat Spesifikasi</a>
          </div>
          <div class="hero-stats">
            ${data.heroStats.map((stat) => `<div class="hero-stat"><strong>${escapeHtml(stat.value)}</strong><span>${escapeHtml(stat.label)}</span></div>`).join('')}
          </div>
        </div>
        <div class="col-lg-6 hero-art text-center">
          <img class="hero-main-image" src="${escapeHtml(galleryImages[0] || data.featuredImage || '')}" alt="${escapeHtml(data.name)}" loading="eager" decoding="async" id="galleryMainImg">
        </div>
      </div>
    </div>
  </header>

  <main>
    <section class="gallery-shell section-shell">
      <div class="gallery-panel">
        <div class="gallery-main">
          <img class="gallery-main-image" src="${escapeHtml(galleryImages[0] || data.featuredImage || '')}" alt="${escapeHtml(data.name)}" loading="lazy" decoding="async" id="galleryMirrorImg">
        </div>
        ${galleryImages.length > 1 ? `<div class="thumb-row">${galleryImages.map((image, index) => `<button class="thumb-btn ${index === 0 ? 'active' : ''}" type="button" data-image="${escapeHtml(image)}" aria-label="Lihat gambar ${index + 1}"><img class="gallery-thumb-image" src="${escapeHtml(image)}" alt="${escapeHtml(`${data.name} ${index + 1}`)}" loading="lazy" decoding="async"></button>`).join('')}</div>` : ''}
      </div>
    </section>

    <section class="content-section section-shell" id="product-overview">
      <div class="section-heading">
        <span class="section-label-alt"><i class="bi bi-info-circle-fill"></i> Ringkasan Produk</span>
        <h2>${escapeHtml(data.name)} untuk kebutuhan berkendara modern</h2>
        <p>${escapeHtml(description)}</p>
      </div>
      <div class="overview-grid">
        <article class="info-card">
          <h3 class="card-title-ym">Kenapa halaman ini dibuat</h3>
          <p class="card-copy-ym">Halaman detail ini dirangkum berdasarkan website resmi Yamaha Motor Indonesia agar calon pembeli di Malang bisa melihat fitur, harga, dan spesifikasi tanpa harus keluar dari website dealer.</p>
        </article>
        <article class="info-card">
          <h3 class="card-title-ym">Fokus pembahasan</h3>
          <p class="card-copy-ym">Kami menampilkan varian resmi, sorotan fitur utama, gambar terbaru Yamaha, serta kelompok spesifikasi teknis yang paling sering ditanyakan saat konsultasi pembelian.</p>
        </article>
        <article class="info-card">
          <h3 class="card-title-ym">Langkah berikutnya</h3>
          <p class="card-copy-ym">Setelah melihat detail produk, Anda bisa langsung konsultasi warna, stok, promo, simulasi DP, dan tenor kredit dengan tim Dealer Yamaha Malang melalui tombol WhatsApp.</p>
        </article>
      </div>
    </section>

    ${renderVariantSection(data)}
    ${renderFeatureSection(data)}
    ${renderSpecSection(data)}
    ${renderFaqSection(data)}

    <section class="section-shell">
      <div class="support-panel">
        <span class="hero-badge"><i class="bi bi-headset"></i> Butuh bantuan memilih?</span>
        <h2 class="mt-3 mb-3">Konsultasi ${escapeHtml(data.shortName)} langsung dengan sales Yamaha Malang.</h2>
        <p class="support-copy">Kami bantu cek ketersediaan unit, warna, simulasi kredit, promo aktif, serta estimasi pengiriman area Malang Raya. Semua data produk di halaman ini sudah diselaraskan dengan sumber resmi Yamaha Indonesia.</p>
        <ul class="support-list">
          <li><i class="bi bi-check-circle-fill"></i><span>Simulasi DP ringan dan tenor sesuai budget.</span></li>
          <li><i class="bi bi-check-circle-fill"></i><span>Update stok unit dan warna terbaru.</span></li>
          <li><i class="bi bi-check-circle-fill"></i><span>Bantuan perbandingan dengan model Yamaha lain dalam kategori yang sama.</span></li>
        </ul>
        <div class="hero-actions mt-4">
          <a href="${WHATSAPP}?text=${whatsappText}" class="btn-ym" rel="noopener"><i class="bi bi-whatsapp"></i> Chat WhatsApp</a>
          <a href="katalog.html" class="btn-outline-ym"><i class="bi bi-grid-3x3-gap-fill"></i> Kembali ke Katalog</a>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer-ym pt-5 pb-3">
    <div class="section-shell">
      <div class="row g-4 mb-4">
        <div class="col-lg-4">
          <div class="mb-3"><img src="https://www.yamaha-motor.co.id/web_new/shared/image/logo-sepeda-motor-yamaha-indonesia.png?1741327215" alt="Logo Yamaha Motor Indonesia" height="36" loading="lazy" style="filter:brightness(0) invert(1);"></div>
          <p class="small">Dealer resmi motor Yamaha di Malang yang menyediakan penjualan motor baru, kredit DP ringan, servis berkala, dan spare part original Yamaha untuk area Malang Raya.</p>
        </div>
        <div class="col-lg-2 col-6">
          <h5 class="h6 text-white">Navigasi</h5>
          <ul class="list-unstyled small">
            <li class="mb-2"><a class="footer-link" href="index.html#home">Home</a></li>
            <li class="mb-2"><a class="footer-link" href="index.html#produk">Produk Motor</a></li>
            <li class="mb-2"><a class="footer-link" href="katalog.html">Katalog</a></li>
            <li class="mb-2"><a class="footer-link" href="index.html#keunggulan">Keunggulan</a></li>
            <li class="mb-2"><a class="footer-link" href="index.html#promo">Promo</a></li>
            <li class="mb-2"><a class="footer-link" href="news.html">News</a></li>
            <li class="mb-2"><a class="footer-link" href="about.html">Tentang Kami</a></li>
          </ul>
        </div>
        <div class="col-lg-3 col-6">
          <h5 class="h6 text-white">Kategori Motor</h5>
          <ul class="list-unstyled small">
            <li class="mb-2"><a class="footer-link" href="katalog.html#matic-collection">Motor Matic Yamaha</a></li>
            <li class="mb-2"><a class="footer-link" href="katalog.html#sport-collection">Motor Sport Yamaha</a></li>
            <li class="mb-2"><a class="footer-link" href="katalog.html#moped-collection">Motor Bebek Yamaha</a></li>
          </ul>
        </div>
        <div class="col-lg-3">
          <h5 class="h6 text-white">Hubungi Kami</h5>
          <p class="small mb-1"><i class="bi bi-geo-alt me-1"></i>Jl. Soekarno Hatta No. 1, Malang</p>
          <p class="small mb-1"><i class="bi bi-telephone me-1"></i>0895-6390-68080</p>
          <p class="small mb-1"><i class="bi bi-envelope me-1"></i>info@yamahamalang.web.id</p>
        </div>
      </div>
      <hr style="border-color:rgba(255,255,255,0.1);">
      <div class="d-flex flex-wrap justify-content-between align-items-center py-2 gap-2">
        <p class="small mb-0">&copy; 2026 Dealer Resmi Yamaha Malang | <a class="footer-link" href="https://yamahamalang.web.id/">yamahamalang.web.id</a></p>
        <p class="small mb-0">Harga dapat berubah sewaktu-waktu tanpa pemberitahuan</p>
      </div>
    </div>
  </footer>

  <a href="${WHATSAPP}?text=${whatsappText}" class="wa-float" rel="noopener" aria-label="Hubungi via WhatsApp"><i class="bi bi-whatsapp"></i></a>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" defer></script>
  <script>
    const thumbButtons = document.querySelectorAll('.thumb-btn');
    for (const button of thumbButtons) {
      button.addEventListener('click', () => {
        const image = button.dataset.image;
        const hero = document.getElementById('galleryMainImg');
        const mirror = document.getElementById('galleryMirrorImg');
        if (hero) hero.src = image;
        if (mirror) mirror.src = image;
        for (const item of thumbButtons) {
          item.classList.remove('active');
        }
        button.classList.add('active');
      });
    }
  </script>
</body>
</html>`;
}

function renderCatalogCard(data) {
  const title = data.name;
  const buttonText = 'Lihat Detail';
  const whatsappText = encodeURIComponent(`Halo, saya ingin info ${data.name} di Dealer Yamaha Malang`);
  return `
    <div class="col-lg-4 col-md-6 fade-up">
      <article class="catalog-card" id="${escapeHtml(data.id)}">
        <span class="catalog-badge">Detail tersedia</span>
        <div class="catalog-media">
          <img src="${escapeHtml(data.featuredImage || data.images[0] || '')}" alt="${escapeHtml(title)}" loading="lazy" decoding="async">
        </div>
        <h3>${escapeHtml(title)}</h3>
        <div class="price-tag"><i class="bi bi-tag-fill"></i> ${escapeHtml(data.priceText)}</div>
        <p>${escapeHtml(data.summary || data.description)}</p>
        <div class="catalog-actions">
          <a href="${escapeHtml(data.file)}" class="btn btn-ym">${buttonText}</a>
          <a href="${WHATSAPP}?text=${whatsappText}" class="btn btn-outline-ym" rel="noopener">Info Kredit</a>
        </div>
      </article>
    </div>`;
}

function renderCatalogSection(section, dataList) {
  return `
            <section class="section-shell mb-5 fade-up" id="${section.id}">
                <span class="section-label"><i class="bi bi-${section.labelIcon}"></i> ${section.label}</span>
                <h2 class="section-title">${section.title}</h2>
                <p class="section-text">${section.text}</p>
                <div class="row g-4 mt-2">
${dataList.map(renderCatalogCard).join('')}
                </div>
            </section>`;
}

function renderSupportCard() {
  return `
            <section class="support-card fade-up" id="konsultasi-kredit">
                <span class="section-label text-white border-0" style="background:rgba(255,255,255,0.16);color:#fff;">Butuh bantuan memilih?</span>
                <h2 class="section-title text-white mt-3 mb-3">Konsultasi kredit dan rekomendasi motor Yamaha dalam satu chat.</h2>
                <p>Seluruh model resmi Yamaha yang tampil di katalog ini sudah kami lengkapi dengan halaman detail tersendiri. Jika Anda ingin bandingkan varian, cek stok, promo, simulasi DP, atau estimasi cicilan untuk area Malang Raya, tim sales kami siap membantu langsung lewat WhatsApp.</p>
                <ul class="support-list">
                    <li><i class="bi bi-check-circle-fill"></i><span>Perbandingan motor berdasarkan budget, gaya berkendara, dan kebutuhan harian.</span></li>
                    <li><i class="bi bi-check-circle-fill"></i><span>Simulasi kredit cepat untuk seluruh lini MAXi, Classy, Matic, Sport, Off-Road, dan Moped Yamaha.</span></li>
                    <li><i class="bi bi-check-circle-fill"></i><span>Info promo terbaru, DP ringan, ketersediaan warna, dan estimasi pengiriman unit.</span></li>
                </ul>
                <div class="catalog-actions mt-4">
                    <a href="${WHATSAPP}?text=Halo%20saya%20ingin%20konsultasi%20kredit%20motor%20Yamaha" class="btn btn-ym" rel="noopener">Chat WhatsApp</a>
                    <a href="index.html#kontak" class="btn btn-outline-ym">Lihat Kontak Dealer</a>
                </div>
            </section>`;
}

function updateCatalog(allData) {
  const filePath = path.join(ROOT, 'katalog.html');
  let html = fs.readFileSync(filePath, 'utf8');
  const combinedSections = `${SECTIONS.map((section) => {
    const sectionData = allData.filter((item) => item.categoryKey === section.key);
    return renderCatalogSection(section, sectionData);
  }).join('\n\n')}
${renderSupportCard()}`;

  html = html.replace(
    /<section class="section-shell mb-5 fade-up" id="maxi-collection">[\s\S]*?<section class="support-card fade-up" id="konsultasi-kredit">[\s\S]*?<\/section>/,
    combinedSections
  );

  fs.writeFileSync(filePath, html, 'utf8');
}

async function fetchHtml(url) {
  const response = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0' } });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  return response.text();
}

async function main() {
  const allData = [];

  for (const product of PRODUCTS) {
    const html = await fetchHtml(product.source);
    const data = buildData(product, html);
    allData.push(data);
    fs.writeFileSync(path.join(ROOT, product.file), renderPage(data), 'utf8');
  }

  updateCatalog(allData);
  console.log(`Generated ${allData.length} product detail pages and refreshed katalog.html`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
