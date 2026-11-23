(() => {
  "use strict";

  const opening = document.getElementById("inicio");
  const scene = opening?.querySelector(".ocean-scene");
  const visual = opening?.querySelector(".ocean-visual");
  const site = document.querySelector(".site");
  const header = document.getElementById("explorar");
  if (!scene || !visual || !site || !header || !CSS.supports("position", "sticky")) return;

  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let frame = 0;
  let start = 0;
  let distance = 0;
  let previous = -1;
  let oceanVisible = true;

  function ease(start, end, value) {
    const t = Math.max(0, Math.min(1, (value - start) / (end - start)));
    return t * t * (3 - 2 * t);
  }

  function setOceanVisible(visible) {
    if (oceanVisible === visible) return;
    oceanVisible = visible;
    opening.classList.toggle("ocean-is-revealed", !visible);
    visual.dispatchEvent(new CustomEvent("ocean:visibility", {detail: visible}));
  }

  function shorelines(progress) {
    const water = ["0% 0%", "100% 0%"];
    const wash = [...water];
    const base = 111 - 129 * (.78 * progress + .22 * ease(0, 1, progress));
    const swell = ease(.02, .28, progress) * (1 - .48 * ease(.76, 1, progress));

    for (let i = 36; i >= 0; i--) {
      const x = i / 36;
      // A broad oblique surge and smaller ripples trace the retiring edge.
      const wave = 7.3 * Math.sin(x * 3.9 + progress * 3.7)
        + 3.4 * Math.sin(x * 9.6 - progress * 4.4)
        + 1.1 * Math.sin(x * 23.4 - progress * 7.1);
      const y = base + swell * (wave + 7 * (x - .5));
      const foam = 2.3 * swell * (1.2 + .55 * Math.sin(x * 14 + progress * 5));
      const column = (x * 100).toFixed(2) + "% ";
      water.push(column + y.toFixed(2) + "%");
      wash.push(column + (y + foam).toFixed(2) + "%");
    }

    return {
      water: "polygon(" + water.join(",") + ")",
      wash: "polygon(" + wash.join(",") + ")",
      glassStart: (base - 9 * swell).toFixed(2) + "%",
      glassEnd: (base + 7 * swell).toFixed(2) + "%"
    };
  }

  function render() {
    frame = 0;
    if (!distance) return;
    const progress = Math.max(0, Math.min(1, (window.scrollY - start) / distance));
    if (progress === previous) return;
    previous = progress;

    const shore = shorelines(progress);
    const waterOpacity = 1 - .2 * ease(.18, .82, progress) - .8 * ease(.78, 1, progress);
    const textOpacity = 1 - ease(.035, .53, progress);
    const washOpacity = .82 * ease(.03, .23, progress) * (1 - ease(.81, 1, progress));
    scene.style.setProperty("--shoreline", shore.water);
    scene.style.setProperty("--wash-line", shore.wash);
    scene.style.setProperty("--glass-start", shore.glassStart);
    scene.style.setProperty("--glass-end", shore.glassEnd);
    scene.style.setProperty("--water-opacity", Math.max(0, waterOpacity).toFixed(3));
    scene.style.setProperty("--wash-opacity", washOpacity.toFixed(3));
    scene.style.setProperty("--foreground-opacity", textOpacity.toFixed(3));
    scene.style.setProperty("--foreground-lift", (-25 * progress).toFixed(1) + "px");

    opening.classList.toggle("ocean-hide-controls", progress >= .53);
    opening.classList.toggle("ocean-pass-through", progress >= .86);
    setOceanVisible(progress < 1);
  }

  function scheduleRender() {
    if (distance && !frame) frame = requestAnimationFrame(render);
  }

  function measure() {
    start = opening.getBoundingClientRect().top + window.scrollY;
    distance = opening.offsetHeight - scene.offsetHeight;
    previous = -1;
    if (frame) cancelAnimationFrame(frame);
    render();
  }

  function configure() {
    const animate = !reducedMotion.matches;
    opening.classList.toggle("ocean-reveal", animate);
    if (animate) {
      measure();
    } else {
      distance = 0;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      opening.classList.remove("ocean-hide-controls", "ocean-pass-through");
      scene.removeAttribute("style");
      setOceanVisible(true);
    }
  }

  // Keyboard navigation into the content should never place focus behind the scene.
  site.addEventListener("focusin", event => {
    if (event.target !== header && distance && window.scrollY < start + distance - 1) {
      window.scrollTo({top: start + distance, behavior: "instant"});
      render();
    }
  });

  window.addEventListener("scroll", scheduleRender, {passive: true});
  window.addEventListener("resize", measure);
  window.addEventListener("pageshow", measure);
  reducedMotion.addEventListener("change", configure);
  configure();
})();
