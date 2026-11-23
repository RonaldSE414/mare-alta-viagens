"use strict";

(() => {
  const journal = document.querySelector("#journal");
  if (!journal) return;

  const stories = [
    {
      id: "noronha",
      tab: "Noronha",
      location: "Fernando de Noronha, Brasil",
      title: ["O dia segue", "a maré."],
      summary: "Da primeira descida à praia ao último raio de sol sobre a Vila dos Remédios.",
      imageAlt: "Marolas alcançam a areia diante dos morros de Fernando de Noronha",
      detailAlt: "Vista elevada dos morros gêmeos e da orla de Fernando de Noronha",
      steps: [
        ["Manhã", "Baía do Sancho", "Desça à praia seguindo os horários de acesso do parque."],
        ["Tarde", "Praia do Porto", "Entre com máscara e snorkel quando o mar estiver calmo."],
        ["Fim de tarde", "Forte dos Remédios", "Veja o sol baixar com vista para o mar."]
      ]
    },
    {
      id: "madeira",
      tab: "Madeira",
      location: "Ilha da Madeira, Portugal",
      title: ["Entre névoa", "e mar."],
      summary: "A costa norte da Madeira passa de encostas cobertas de verde a piscinas abertas para o Atlântico.",
      imageAlt: "Falésias verdes e trilha costeira sob a névoa na ilha da Madeira",
      detailAlt: "Estrada serpenteia a costa rochosa e as encostas verdes da Madeira",
      steps: [
        ["Manhã", "Véu da Noiva", "Veja a cascata e o mar do miradouro."],
        ["Tarde", "Porto Moniz", "Tome banho nas piscinas vulcânicas se estiverem abertas."],
        ["Fim de tarde", "Seixal", "Passeie junto ao mar na vila."]
      ]
    },
    {
      id: "lencois",
      tab: "Lençóis",
      location: "Lençóis Maranhenses, Brasil",
      title: ["A chuva vira", "lagoa."],
      summary: "O vento desenha as dunas, a chuva enche as lagoas e Santo Amaro é o ponto de partida.",
      imageAlt: "Lagoa curva entre dunas iluminadas pelo pôr do sol nos Lençóis Maranhenses",
      detailAlt: "Vista aérea de uma sequência de dunas claras e lagoas azuis",
      steps: [
        ["Manhã", "Santo Amaro", "Caminhe pela vila às margens do Rio Alegre."],
        ["Tarde", "Lagoa da Gaivota", "Siga o circuito de dunas e lagoas com um guia local."],
        ["Fim de tarde", "Pôr do sol nas dunas", "Espere a luz baixar e revelar as ondulações da areia."]
      ]
    }
  ];

  journal.setAttribute("aria-labelledby", "journal-title");
  journal.innerHTML = `
    <div class="journal-wrap">
      <header class="journal-header">
        <h2 id="journal-title">Diário <em>de bordo.</em></h2>
        <div class="journal-navigation">
          <p id="journal-tab-label">Roteiros de um dia</p>
          <div class="journal-tabs" role="tablist" aria-labelledby="journal-tab-label">
            ${stories.map(story => `<button id="journal-tab-${story.id}" role="tab" type="button" aria-controls="journal-panel">${story.tab}</button>`).join("")}
          </div>
        </div>
      </header>
      <div id="journal-panel" role="tabpanel" tabindex="0"></div>
    </div>`;

  const tabs = [...journal.querySelectorAll('[role="tab"]')];
  const tablist = journal.querySelector('[role="tablist"]');
  const panel = journal.querySelector("#journal-panel");
  let selectedIndex = -1;

  function selectStory(index) {
    if (index === selectedIndex) return;
    selectedIndex = index;

    const story = stories[index];
    tabs.forEach((tab, tabIndex) => {
      tab.setAttribute("aria-selected", String(tabIndex === index));
      tab.tabIndex = tabIndex === index ? 0 : -1;
    });
    panel.setAttribute("aria-labelledby", tabs[index].id);
    panel.innerHTML = `
      <article class="journal-spread">
        <div class="journal-story">
          <p class="journal-location"><svg aria-hidden="true"><use href="#pin"/></svg> ${story.location}</p>
          <h3>${story.title[0]} <em>${story.title[1]}</em></h3>
          <p class="journal-summary">${story.summary}</p>
        </div>
        <figure class="journal-primary">
          <div class="journal-image-frame"><img class="journal-main-image" alt="${story.imageAlt}" width="502" height="1024" loading="lazy" decoding="async"></div>
          <figcaption>Imagens ilustrativas</figcaption>
        </figure>
        <div class="journal-detail">
          <img class="journal-secondary-image" src="img/${story.id}.webp" alt="${story.detailAlt}" width="506" height="506" loading="lazy" decoding="async">
        </div>
        <div class="journal-plan">
          <h4>O roteiro</h4>
          <ol>
            ${story.steps.map(([period, place, idea]) => `<li><p class="journal-period">${period}</p><p class="journal-place">${place}</p><p class="journal-note">${idea}</p></li>`).join("")}
          </ol>
          <button type="button" class="journal-action" data-detail="${story.id}">Ver pacote</button>
        </div>
      </article>`;

    const panorama = panel.querySelector(".journal-main-image");
    panorama.addEventListener("error", () => {
      panorama.src = `img/${story.id}.webp`;
    }, {once: true});
    panorama.src = `img/journal-${story.id}.webp`;
  }

  tabs.forEach((tab, index) => tab.addEventListener("click", () => selectStory(index)));
  tablist.addEventListener("keydown", event => {
    const index = tabs.indexOf(event.target);
    let nextIndex;

    switch (event.key) {
      case "ArrowLeft": nextIndex = (index - 1 + tabs.length) % tabs.length; break;
      case "ArrowRight": nextIndex = (index + 1) % tabs.length; break;
      case "Home": nextIndex = 0; break;
      case "End": nextIndex = tabs.length - 1; break;
      default: return;
    }

    event.preventDefault();
    selectStory(nextIndex);
    tabs[nextIndex].focus();
  });

  selectStory(0);
})();
