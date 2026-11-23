(() => {
  "use strict";

  function varint(value) {
    const bytes = [];
    while (value > 127) {
      bytes.push((value & 127) | 128);
      value >>>= 7;
    }
    return [...bytes, value];
  }

  function scalar(field, value) {
    return [...varint(field << 3), ...varint(value)];
  }

  function bytes(field, content) {
    return [...varint((field << 3) | 2), ...varint(content.length), ...content];
  }

  function text(field, value) {
    return bytes(field, Array.from(value, character => character.charCodeAt(0)));
  }

  function airport(field, code) {
    return bytes(field, [...scalar(1, 1), ...text(2, code)]);
  }

  function leg(origin, destination, date) {
    return bytes(3, [
      ...(date ? text(2, date) : []),
      ...airport(13, origin),
      ...airport(14, destination)
    ]);
  }

  window.buildGoogleFlightsUrl = ({origin, destination, departure, back, travelers}) => {
    const adults = Math.min(9, Math.max(1, Math.trunc(Number(travelers)) || 1));
    const roundTrip = Boolean(back);
    const message = [
      ...scalar(1, 28),
      ...scalar(2, 2),
      ...leg(origin, destination, departure),
      ...(roundTrip ? leg(destination, origin, back) : []),
      ...Array.from({length: adults}, () => scalar(8, 1)).flat(),
      ...scalar(9, 1),
      ...scalar(14, 1),
      ...scalar(19, roundTrip ? 1 : 2)
    ];
    const tfs = btoa(String.fromCharCode(...message)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    const params = new URLSearchParams({tfs, hl: "pt-BR", gl: "BR", curr: "BRL"});
    return `https://www.google.com/travel/flights?${params}`;
  };
})();
