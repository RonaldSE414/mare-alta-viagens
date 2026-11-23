(() => {
  "use strict";

  const form = document.getElementById("flight-form");
  const originField = document.getElementById("flight-origin");
  const destinationField = document.getElementById("flight-destination");
  const departureField = document.getElementById("flight-departure");
  const backField = document.getElementById("flight-return");
  const travelersField = document.getElementById("flight-travelers");
  const datalist = document.getElementById("flight-airports");
  const feedback = document.getElementById("flight-feedback");
  const airports = window.MARE_AIRPORTS || [];
  const today = document.getElementById("departure").min;
  const airportFields = [originField, destinationField];

  departureField.min = today;
  backField.min = today;
  departureField.addEventListener("input", () => {
    backField.min = departureField.value || today;
  });

  const normalize = value => value.normalize("NFD").replace(/\p{M}/gu, "").trim().toLowerCase();

  function showAirportSuggestions() {
    if (datalist.options.length) return;
    const options = document.createDocumentFragment();
    for (const [code, city, name] of airports) {
      const option = document.createElement("option");
      option.value = `${city} (${code})`;
      option.label = name;
      options.append(option);
    }
    datalist.append(options);
  }

  function airportCode(value) {
    const typed = value.trim().toUpperCase();
    if (/^[A-Z]{3}$/.test(typed)) return typed;

    const selected = typed.match(/\(([A-Z]{3})\)$/);
    if (selected) return selected[1];

    const name = normalize(value);
    const matches = airports.filter(([, city, airport]) => normalize(city) === name || normalize(airport) === name);
    return matches.length === 1 ? matches[0][0] : "";
  }

  for (const field of airportFields) {
    field.addEventListener("focus", showAirportSuggestions, {once: true});
    field.addEventListener("input", () => {
      for (const airport of airportFields) airport.setCustomValidity("");
      feedback.hidden = true;
    });
  }

  form.addEventListener("submit", event => {
    const origin = airportCode(originField.value);
    const destination = airportCode(destinationField.value);
    const missingAirport = !origin ? originField : !destination ? destinationField : null;
    if (missingAirport || origin === destination) {
      event.preventDefault();
      const invalidField = missingAirport || destinationField;
      invalidField.setCustomValidity(missingAirport
        ? "Escolha um aeroporto da lista ou digite a sigla IATA de três letras, como FOR."
        : "Escolha um destino diferente da origem.");
      invalidField.reportValidity();
      return;
    }

    if (typeof window.buildGoogleFlightsUrl !== "function") {
      event.preventDefault();
      feedback.textContent = "A busca de voos não carregou. Atualize a página e tente novamente.";
      feedback.hidden = false;
      return;
    }

    const url = new URL(window.buildGoogleFlightsUrl({
      origin,
      destination,
      departure: departureField.value,
      back: backField.value,
      travelers: Number(travelersField.value)
    }));
    form.elements.tfs.value = url.searchParams.get("tfs");
    feedback.hidden = true;
  });
})();
