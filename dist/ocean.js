(() => {
  "use strict";

  const video = document.getElementById("ocean-video");
  const source = video?.dataset.src;
  if (!source || !video.canPlayType("video/mp4")) return;

  const toggle = document.getElementById("ocean-toggle");
  const icon = toggle?.querySelector("use");
  const label = toggle?.querySelector("[data-motion-label]");
  const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
  const observesVisibility = "IntersectionObserver" in window;
  let inView = !observesVisibility;
  let sceneVisible = true;
  let userPaused = null;
  let needsGesture = false;
  let failed = false;
  let requested = false;
  let shouldPlay = false;
  let playAttempt = 0;

  video.muted = true;
  video.playsInline = true;
  toggle?.removeAttribute("aria-pressed");

  function isPaused() {
    return needsGesture || (userPaused ?? motionPreference.matches);
  }

  function updateButton() {
    if (!toggle) return;
    const paused = isPaused();
    const action = paused ? "Reproduzir o vídeo do mar" : "Pausar o vídeo do mar";
    toggle.hidden = failed;
    toggle.setAttribute("aria-label", action);
    icon?.setAttribute("href", paused ? "#play" : "#pause");
    if (label) label.textContent = action;
  }

  function useStillImage() {
    failed = true;
    shouldPlay = false;
    video.pause();
    video.classList.remove("ocean-video-ready");
    updateButton();
  }

  async function start(attempt) {
    try {
      await video.play();
    } catch (error) {
      if (!shouldPlay || attempt !== playAttempt) return;
      if (error.name === "NotAllowedError" || error.name === "AbortError") {
        needsGesture = true;
        synchronize();
      } else {
        useStillImage();
      }
    }
  }

  function synchronize() {
    updateButton();
    const next = !failed && !isPaused() && sceneVisible && inView && !document.hidden;
    if (next === shouldPlay) return;
    shouldPlay = next;
    if (!shouldPlay) {
      video.pause();
      return;
    }

    if (!requested) {
      requested = true;
      video.src = source;
    }

    start(++playAttempt);
  }

  video.addEventListener("playing", () => {
    if (shouldPlay && !failed) video.classList.add("ocean-video-ready");
  });
  video.addEventListener("error", useStillImage);

  toggle?.addEventListener("click", () => {
    userPaused = !isPaused();
    needsGesture = false;
    synchronize();
  });
  motionPreference.addEventListener("change", () => {
    userPaused = null;
    if (motionPreference.matches) video.classList.remove("ocean-video-ready");
    synchronize();
  });
  document.addEventListener("visibilitychange", synchronize);
  document.addEventListener("ocean:visibility", event => {
    sceneVisible = event.detail !== false;
    synchronize();
  }, true);

  if (observesVisibility) {
    new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      synchronize();
    }).observe(video);
  }

  synchronize();
})();
