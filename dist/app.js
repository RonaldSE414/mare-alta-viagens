"use strict";

const catalog = [
  {
    id: "noronha", name: "Fernando de Noronha", location: "Pernambuco, Brasil",
    region: "Brasil", tag: "Mergulho", nights: 5, price: 4590,
    description: "Baías de água transparente, trilhas costeiras e os morros gêmeos que emolduram o mar de Noronha.",
    note: "Praia do Porto · pôr do sol no forte",
    photos: [
      ["noronha", "Morro Dois Irmãos"],
      ["journal-noronha", "Espuma e morros gêmeos"]
    ],
    activities: [
      ["Baía do Sancho", "Desça pelas escadas entre as falésias e explore a praia conforme as condições do mar."],
      ["Praia do Porto", "Faça snorkel e observe a vida marinha à distância."],
      ["Forte dos Remédios", "Suba ao forte no fim da tarde para ver o sol baixar sobre o mar."]
    ],
    inclusion: "Passeio guiado pelas praias da ilha.",
    season: "Agosto a outubro costuma ter menos chuva."
  },
  {
    id: "maldivas", name: "Maldivas", location: "Atóis das Maldivas",
    region: "Internacional", tag: "Ilhas", nights: 7, price: 12490,
    description: "Lagoas de azul claro, bancos de areia e recifes cercam os pequenos atóis do Índico.",
    note: "Recifes · bancos de areia",
    photos: [
      ["maldivas", "Lagoa de um atol"],
      ["journal-maldivas", "Bangalôs ao amanhecer"]
    ],
    activities: [
      ["Recifes do Índico", "Faça uma saída guiada para explorar os recifes."],
      ["Banco de areia", "Reserve uma tarde para conhecer a lagoa, de acordo com a maré."],
      ["Ilha habitada", "Passeie por uma comunidade insular e prove um mas huni no café da manhã."]
    ],
    inclusion: "Saída guiada para snorkel no recife.",
    season: "Janeiro a março costuma ter tempo mais seco."
  },
  {
    id: "grecia", name: "Ilhas Jônicas", location: "Costa oeste, Grécia",
    region: "Internacional", tag: "Costa mediterrânea", nights: 6, price: 8490,
    description: "Falésias claras, vilarejos à beira-mar e enseadas de água azul no oeste da Grécia.",
    note: "Corfu · enseadas de Paxos",
    photos: [
      ["grecia", "Falésias do Jônico"],
      ["journal-grecia", "Vila costeira em Corfu"],
      ["hero", "Enseada nas Ilhas Jônicas"]
    ],
    activities: [
      ["Paleokastritsa", "Explore as enseadas de Corfu e as praias entre os penhascos."],
      ["Centro histórico de Corfu", "Percorra a pé as ruelas e praças da cidade antiga."],
      ["Paxos", "Passe um dia na ilha e confira os horários da balsa com antecedência."]
    ],
    inclusion: "Passeio costeiro em Corfu.",
    season: "Maio a setembro é a principal temporada de praia."
  },
  {
    id: "jeri", name: "Jericoacoara", location: "Ceará, Brasil",
    region: "Brasil", tag: "Dunas", nights: 4, price: 2590,
    description: "Ruas de areia, lagoas e ventos alísios que atraem velejadores para o litoral cearense.",
    note: "Lagoa do Paraíso · Pedra Furada",
    photos: [
      ["jeri", "Vento e mar no litoral cearense"],
      ["journal-jeri", "Dunas e pipas de kitesurf"]
    ],
    activities: [
      ["Lagoa do Paraíso", "Passe a manhã junto à água doce, na região de Jijoca."],
      ["Pedra Furada", "Siga a pé até o arco natural de acordo com a maré."],
      ["Vila de Jeri", "Caminhe pelas ruas de areia e veja o fim de tarde à beira-mar."]
    ],
    inclusion: "Passeio às lagoas da região.",
    season: "Julho a dezembro costuma ter mais vento e menos chuva."
  },
  {
    id: "madeira", name: "Ilha da Madeira", location: "Madeira, Portugal",
    region: "Internacional", tag: "Trilhas", nights: 6, price: 7490,
    description: "Montanhas sobre o Atlântico, piscinas vulcânicas e caminhos cercados de loureiros.",
    note: "Porto Moniz · trilhas nas levadas",
    photos: [
      ["madeira", "Montanhas sobre o Atlântico"],
      ["journal-madeira", "Encosta da Madeira entre nuvens"]
    ],
    activities: [
      ["Porto Moniz", "Conheça as piscinas naturais formadas na costa vulcânica."],
      ["Levadas", "Caminhe junto aos canais que atravessam a ilha e confira o estado da trilha antes de sair."],
      ["Funchal", "Visite o Mercado dos Lavradores para conhecer flores, frutas e sabores da ilha."]
    ],
    inclusion: "Caminhada guiada por uma levada.",
    season: "Primavera e início do outono costumam ter temperaturas amenas."
  },
  {
    id: "lencois", name: "Lençóis Maranhenses", location: "Maranhão, Brasil",
    region: "Brasil", tag: "Lagoas", nights: 5, price: 3190,
    description: "Dunas brancas e lagoas que se formam com as chuvas, entre Barreirinhas, Santo Amaro e Atins.",
    note: "Santo Amaro · Atins",
    photos: [
      ["lencois", "Dunas brancas e lagoas sazonais"],
      ["journal-lencois", "Fim de tarde nas dunas"]
    ],
    activities: [
      ["Circuito Lagoa Azul", "Visite as dunas da região de Barreirinhas com um guia local."],
      ["Santo Amaro", "Explore lagoas entre dunas, conforme as condições do período."],
      ["Atins", "Caminhe pela orla da vila ao fim da tarde."]
    ],
    inclusion: "Passeio guiado por um circuito de lagoas.",
    season: "Junho a agosto costuma ter lagoas mais cheias."
  }
];

const landscapes = {
  coast: {title: "Pela <em>costa</em>", destinations: ["noronha", "grecia", "jeri", "madeira"]},
  island: {title: "Entre <em>ilhas</em>", destinations: ["noronha", "maldivas", "grecia", "madeira"]},
  mountains: {title: "Pelas <em>montanhas</em>", destinations: ["madeira"]},
  dunes: {title: "Entre <em>dunas</em>", destinations: ["jeri", "lencois"]}
};

const get = id => document.getElementById(id);
const destinationTitle = get("results-title").innerHTML;
const money = new Intl.NumberFormat("pt-BR", {style:"currency", currency:"BRL",maximumFractionDigits:0});
const icon = name => `<svg aria-hidden="true"><use href="#${name}"/></svg>`;
const dateLabel = value => value ? value.split("-").reverse().join("/") : "a definir";
const date = new Date();
const today = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
let favorites = [];
try {
  const stored = JSON.parse(localStorage.getItem("mare-alta-favoritos") || "[]");
  if (Array.isArray(stored)) favorites = stored.filter(id => catalog.some(item => item.id === id));
} catch {}
let view = "destinos";
let filter = "Todos";
let landscape = "";
let query = null;
let lastFocus;
const detail = get("detail");

for (const item of catalog) {
  get("destination").add(new Option(item.name, item.id));
}
get("departure").min = today;
get("return-date").min = today;
get("departure").addEventListener("change", () => {
  get("return-date").min = get("departure").value || today;
  if (get("return-date").value < get("return-date").min) get("return-date").value = "";
});

function setMode(mode) {
  const isFlight = mode === "voos";
  get("search-form").hidden = isFlight;
  get("flight-form").hidden = !isFlight;
  document.querySelectorAll(".tabs button").forEach(button => {
    button.setAttribute("aria-pressed", button.dataset.mode === mode);
  });
}

function image([file, caption], className = "") {
  return `<img class="${className}" src="img/${file}.webp" alt="${caption}" loading="lazy" width="650" height="430">`;
}

function packageCard(item, index) {
  const liked = favorites.includes(item.id);
  return `<article class="card" data-destination="${item.id}" style="--delay:${index * 45}ms">
    <div class="card-media">
      <button class="card-open" type="button" data-detail="${item.id}" aria-label="Ver roteiro de ${item.name}">
        ${image(item.photos[0])}
        <span class="card-open-label" aria-hidden="true">Ver roteiro</span>
      </button>
      <span class="badge">${item.tag}</span>
      <button class="favorite" type="button" data-favorite="${item.id}" aria-label="Favoritar ${item.name}" aria-pressed="${liked}">${icon("heart")}</button>
    </div>
    <div class="card-content">
      <small class="card-meta">${item.location} · ${item.nights} noites</small>
      <h3>${item.name}</h3>
      <p class="card-note">${item.note}</p>
      <div class="card-bottom">
        <div class="price"><strong>${money.format(item.price)}</strong><small>por pessoa · estimativa</small></div>
      </div>
    </div>
  </article>`;
}

function render() {
  const isFavorite = view === "favoritos";
  const collection = landscapes[landscape];
  const title = {
    destinos: collection?.title || destinationTitle,
    pacotes: "Pacotes <em>para explorar</em>",
    favoritos: "Seus <em>favoritos</em>"
  };
  get("results-title").innerHTML = title[view];
  get("filters").hidden = isFavorite;
  const clearLandscape = get("clear-landscape");
  if (clearLandscape) clearLandscape.hidden = !collection;
  document.querySelectorAll("[data-filter]").forEach(button => {
    button.setAttribute("aria-pressed", button.dataset.filter === filter);
  });
  document.querySelectorAll("[data-landscape]").forEach(button => {
    button.setAttribute("aria-pressed", button.dataset.landscape === landscape);
  });
  const matches = catalog.filter(item => {
    if (isFavorite) return favorites.includes(item.id);
    if (collection && !collection.destinations.includes(item.id)) return false;
    return (!query?.destination || item.id === query.destination) &&
      (filter === "Todos" || item.region === filter);
  });
  const people = query?.travelers === 1 ? "1 viajante" : `${query?.travelers} viajantes`;
  const options = `${matches.length} ${matches.length === 1 ? "opção" : "opções"}`;
  const destinations = `${matches.length} ${matches.length === 1 ? "destino" : "destinos"}`;
  get("results-status").textContent = query
    ? `${options} · ${people} · preços ilustrativos${query.departure ? " · ida " + dateLabel(query.departure) : ""}${query.back ? " · volta " + dateLabel(query.back) : ""}`
    : collection ? destinations : "";
  const results = get("results");
  results.dataset.view = view;
  results.dataset.landscapeActive = landscape;
  let emptyMessage = "Nenhum resultado para esses filtros. Experimente selecionar outro destino ou região.";
  if (isFavorite) emptyMessage = "Toque no coração de um destino para salvá-lo aqui.";
  if (collection) emptyMessage = "Nenhum destino com essa paisagem na região escolhida.";
  results.innerHTML = matches.length
    ? matches.map(packageCard).join("")
    : `<p class="empty">${emptyMessage}</p>`;
  get("saved").setAttribute("aria-label", `Favoritos (${favorites.length})`);
}

function showResults() {
  render();
  get("results-title").focus({preventScroll:true});
  get("destinos").scrollIntoView();
}

function gallery(item) {
  return `<div class="detail-gallery" role="group" aria-label="Galeria de ${item.name}">
    <header class="gallery-header" hidden>
      <p id="detail-gallery-title">${item.name}</p>
      <button class="gallery-return gallery-button" type="button">Voltar ao pacote</button>
    </header>
    <figure class="detail-figure">
      <div class="gallery-stage">
        ${image(item.photos[0], "detail-image")}
        <button class="gallery-expand" type="button" aria-label="Ampliar esta imagem">
          <span>
            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M8 4H4v4m12-4h4v4M4 16v4h4m12-4v4h-4"/></svg>
            Ampliar
          </span>
        </button>
      </div>
      <figcaption class="detail-caption" aria-live="polite" aria-atomic="true">
        <span class="gallery-caption-text">${item.photos[0][1]}</span>
        <span class="gallery-counter" aria-label="Imagem 1 de ${item.photos.length}">1 / ${item.photos.length}</span>
      </figcaption>
    </figure>
    <div class="detail-thumbs" role="group" aria-label="Escolher imagem">
      ${item.photos.map(([file, caption], index) => `
      <button class="detail-thumb" type="button" data-photo="${index}" aria-label="${caption}" aria-pressed="${index === 0}">
        <img src="img/${file}.webp" alt="" width="104" height="68">
      </button>`).join("")}
    </div>
    <div class="gallery-navigation" role="group" aria-label="Navegação das imagens" hidden>
      <button class="gallery-button" type="button" data-step="-1">Anterior</button>
      <button class="gallery-button" type="button" data-step="1">Próxima</button>
    </div>
  </div>`;
}

function bindGallery(body, photos) {
  const gallery = body.querySelector(".detail-gallery");
  const stage = gallery.querySelector(".gallery-stage");
  const picture = stage.querySelector(".detail-image");
  const caption = gallery.querySelector(".gallery-caption-text");
  const counter = gallery.querySelector(".gallery-counter");
  const expand = stage.querySelector(".gallery-expand");
  const header = gallery.querySelector(".gallery-header");
  const returnButton = header.querySelector(".gallery-return");
  const navigation = gallery.querySelector(".gallery-navigation");
  const thumbs = [...gallery.querySelectorAll(".detail-thumb")];
  let current = 0;
  let touchOrigin;

  function showPhoto(index) {
    current = (index + photos.length) % photos.length;
    const [file, label] = photos[current];
    picture.src = `img/${file}.webp`;
    picture.alt = label;
    picture.classList.toggle("detail-image-portrait", file.startsWith("journal-"));
    caption.textContent = label;
    counter.textContent = `${current + 1} / ${photos.length}`;
    counter.setAttribute("aria-label", `Imagem ${current + 1} de ${photos.length}`);
    thumbs.forEach((button, index) => button.setAttribute("aria-pressed", String(index === current)));
  }

  function setExpanded(expanded) {
    detail.toggleAttribute("data-gallery-expanded", expanded);
    detail.setAttribute("aria-labelledby", expanded ? "detail-gallery-title" : "detail-title");
    expand.hidden = expanded;
    header.hidden = navigation.hidden = !expanded;
    touchOrigin = undefined;
    detail.scrollTop = 0;
    (expanded ? returnButton : expand).focus({preventScroll: true});
  }

  expand.addEventListener("click", () => setExpanded(true));
  returnButton.addEventListener("click", () => setExpanded(false));
  thumbs.forEach((button, index) => button.addEventListener("click", () => showPhoto(index)));
  navigation.querySelectorAll("[data-step]").forEach(button => {
    button.addEventListener("click", () => showPhoto(current + Number(button.dataset.step)));
  });

  gallery.addEventListener("keydown", event => {
    if (navigation.hidden || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    event.preventDefault();
    showPhoto(current + (event.key === "ArrowLeft" ? -1 : 1));
  });

  stage.addEventListener("pointerdown", event => {
    if (navigation.hidden || event.pointerType !== "touch" || !event.isPrimary) return;
    touchOrigin = {id: event.pointerId, x: event.clientX, y: event.clientY};
  });
  stage.addEventListener("pointerup", event => {
    if (touchOrigin?.id !== event.pointerId) return;
    const dx = event.clientX - touchOrigin.x;
    const dy = event.clientY - touchOrigin.y;
    touchOrigin = undefined;
    if (Math.abs(dx) > 42 && Math.abs(dx) > 1.45 * Math.abs(dy)) {
      showPhoto(current + (dx < 0 ? 1 : -1));
    }
  });
  stage.addEventListener("pointercancel", () => { touchOrigin = undefined; });
}

function openDetail(id) {
  const item = catalog.find(entry => entry.id === id);
  if (!item || detail.open) return;

  const travelers = query?.travelers ?? Number(get("travelers").value);
  const departure = query?.departure ?? get("departure").value;
  const back = query?.back ?? get("return-date").value;
  const people = `${travelers} ${travelers === 1 ? "viajante" : "viajantes"}`;
  const dates = `Ida ${dateLabel(departure)} · Volta ${dateLabel(back)}`;
  const total = money.format(item.price * travelers);
  const includes = `Hospedagem por ${item.nights} noites. ${item.inclusion}`;
  const summary = [
    `Maré Alta Viagens · ${item.name}`,
    `${item.location} · ${item.nights} noites · ${people}`,
    dates,
    `Estimativa do pacote: ${total}`,
    "",
    "Experiências sugeridas",
    ...item.activities.map(([name, description]) => `• ${name}. ${description}`),
    "",
    `Quando ir: ${item.season}`,
    `Composição ilustrativa: ${includes}`,
    "Passagens aéreas consultadas à parte. Catálogo demonstrativo."
  ].join("\n");

  lastFocus = document.activeElement;
  const body = get("detail-body");
  body.innerHTML = `${gallery(item)}
    <div class="detail-copy">
      <div class="detail-kicker">${icon("pin")} ${item.location} · ${item.nights} noites</div>
      <h2 id="detail-title">${item.name}</h2>
      <p>${item.description}</p>
      <h3>Experiências do roteiro</h3>
      <ol class="detail-activities">
        ${item.activities.map(([name, description]) => `<li><strong>${name}</strong><p>${description}</p></li>`).join("")}
      </ol>
      <dl class="detail-facts">
        <div><dt>Quando ir</dt><dd>${item.season}</dd></div>
        <div><dt>O que o pacote prevê</dt><dd>${includes} Passagens aéreas consultadas à parte.</dd></div>
      </dl>
      <h3>Seu roteiro</h3>
      <dl class="itinerary" id="itinerary">
        <div><dt>Datas escolhidas</dt><dd>${departure || back ? dates : "A definir"}</dd></div>
        <div><dt>Viajantes</dt><dd>${people}</dd></div>
        <div><dt>Estimativa total</dt><dd>${total}</dd></div>
      </dl>
      <p class="reference">Pacote, valores e imagens ilustrativos.</p>
      <div class="booking">
        <button type="button" class="primary" id="download-plan">Baixar roteiro</button>
        <button type="button" class="text-button" id="copy-plan">Copiar resumo</button>
      </div>
      <p class="booking-status" id="booking-status" aria-live="polite"></p>
    </div>`;

  bindGallery(body, item.photos);

  const status = get("booking-status");
  get("copy-plan").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(summary);
      status.textContent = "Resumo copiado.";
    } catch {
      status.textContent = "Use o botão Baixar roteiro para guardar uma cópia.";
    }
  });
  get("download-plan").addEventListener("click", () => {
    const url = URL.createObjectURL(new Blob([summary], {type:"text/plain;charset=utf-8"}));
    const link = document.createElement("a");
    link.href = url;
    link.download = `mare-alta-${item.id}.txt`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    status.textContent = "Roteiro pronto para download.";
  });
  detail.showModal();
}

document.addEventListener("click", event => {
  const control = event.target.closest("[data-mode], [data-filter], [data-detail], [data-favorite], [data-landscape], #clear-landscape");
  if (!control) return;
  if (control.dataset.mode) setMode(control.dataset.mode);
  const requestedLandscape = control.dataset.landscape;
  if (requestedLandscape && Object.hasOwn(landscapes, requestedLandscape)) {
    event.preventDefault();
    if (view !== "destinos") filter = "Todos";
    landscape = landscape === requestedLandscape ? "" : requestedLandscape;
    view = "destinos";
    query = null;
    showResults();
    return;
  }
  if (control.id === "clear-landscape") {
    landscape = "";
    showResults();
    return;
  }
  if (control.dataset.filter) {
    filter = control.dataset.filter;
    render();
  }
  if (control.dataset.detail) openDetail(control.dataset.detail);
  if (control.dataset.favorite) {
    const id = control.dataset.favorite;
    favorites = favorites.includes(id) ? favorites.filter(item => item !== id) : [...favorites, id];
    try { localStorage.setItem("mare-alta-favoritos", JSON.stringify(favorites)); } catch {}
    if (view === "favoritos") {
      render();
      const nextFavorite = get("results").querySelector("[data-favorite]");
      (nextFavorite || get("saved")).focus({preventScroll:true});
    } else {
      control.setAttribute("aria-pressed", favorites.includes(id));
      get("saved").setAttribute("aria-label", `Favoritos (${favorites.length})`);
    }
  }
});

get("search-form").addEventListener("submit", event => {
  event.preventDefault();
  query = {
    destination:get("destination").value,
    departure:get("departure").value,
    back:get("return-date").value,
    travelers:Number(get("travelers").value)
  };
  view = "pacotes";
  filter = "Todos";
  landscape = "";
  showResults();
});
document.querySelectorAll('a[href="#destinos"]:not([data-landscape])').forEach(link => link.addEventListener("click", () => {
  view = "destinos";
  filter = "Todos";
  landscape = "";
  query = null;
  render();
}));
get("saved").addEventListener("click", () => {
  view = view === "favoritos" ? "destinos" : "favoritos";
  landscape = "";
  query = null;
  filter = "Todos";
  showResults();
});
detail.querySelector(".close").addEventListener("click", () => detail.close());
detail.addEventListener("click", event => {
  if (event.target !== detail) return;
  if (detail.hasAttribute("data-gallery-expanded")) detail.querySelector(".gallery-return").click();
  else detail.close();
});
detail.addEventListener("cancel", event => {
  if (!detail.hasAttribute("data-gallery-expanded")) return;
  event.preventDefault();
  detail.querySelector(".gallery-return").click();
});
detail.addEventListener("close", () => {
  detail.removeAttribute("data-gallery-expanded");
  detail.setAttribute("aria-labelledby", "detail-title");
  lastFocus?.focus({preventScroll:true});
});
render();
