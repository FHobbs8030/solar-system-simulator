class SolarSystem {
  constructor() {
    this.app = document.getElementById("app");
    this.stage = document.getElementById("systemStage");
    this.starsBack = document.getElementById("starsBack");

    this.starsMid = document.getElementById("starsMid");

    this.starsFront = document.getElementById("starsFront");

    this.planetInfo = document.getElementById("planetInfo");
    this.planetName = document.getElementById("planetName");
    this.planetDescription = document.getElementById("planetDescription");
    this.planetDetails = document.getElementById("planetDetails");
    this.planetSwatch = document.getElementById("planetSwatch");

    this.playPauseButton = document.getElementById("playPause");
    this.statusText = document.getElementById("statusText");

    this.speedSlider = document.getElementById("speedSlider");
    this.speedValue = document.getElementById("speedValue");
    this.zoomValue = document.getElementById("zoomValue");

    this.closeInfoButton = document.getElementById("closeInfo");

    this.focusSunButton = document.getElementById("focusSun");
    this.toggleLabelsButton = document.getElementById("toggleLabels");
    this.toggleOrbitsButton = document.getElementById("toggleOrbits");
    this.resetViewButton = document.getElementById("resetView");
    this.cinemaModeButton = document.getElementById("cinemaMode");
    this.scaleModeButton = document.getElementById("scaleMode");

    this.planetSelect = document.getElementById("planetSelect");

    this.miniMap = document.getElementById("miniMap");

    this.comet = document.getElementById("comet");

    this.sun = document.getElementById("sun");

    this.particleField = document.getElementById("particleField");

    this.isPlaying = true;

    this.speed = 1;

    this.scaleMode = "visual";

    this.camera = {
      x: 0,
      y: 0,

      scale: 1,

      targetX: 0,
      targetY: 0,

      targetScale: 1,

      velocityX: 0,
      velocityY: 0,

      zoomVelocity: 0,

      smoothing: 0.075,
      driftTime: 0,
    };

    this.drag = {
      active: false,
      x: 0,
      y: 0,
      pointerId: null,
    };

    this.focusTarget = null;

    this.labelsOn = false;
    this.orbitsOn = true;
    this.cinemaMode = false;

    this.lastTime = performance.now();

    this.elapsed = 0;

    this.planetElements = new Map();
    this.orbitElements = new Map();
    this.trailElements = new Map();
    this.miniDots = new Map();
    this.positions = new Map();

    this.planets = [
      {
        key: "mercury",
        name: "Mercury",
        size: 13,
        orbit: 78,
        au: 0.39,
        speed: 4.15,
        color: "#c6b38d",
        glow: "rgba(198, 179, 141, 0.75)",
        distance: "0.39 AU",
        period: "88 Earth days",
        diameter: "4,879 km",
        temperature: "-173°C to 427°C",
        moons: "0",
        description:
          "The smallest planet and the closest world to the Sun, with dramatic temperature swings and a cratered surface.",
      },

      {
        key: "venus",
        name: "Venus",
        size: 20,
        orbit: 118,
        au: 0.72,
        speed: 1.62,
        color: "#ffb84f",
        glow: "rgba(255, 184, 79, 0.78)",
        distance: "0.72 AU",
        period: "225 Earth days",
        diameter: "12,104 km",
        temperature: "About 465°C",
        moons: "0",
        description:
          "A bright, cloud-covered planet with an intense greenhouse effect, crushing pressure, and slow retrograde rotation.",
      },

      {
        key: "earth",
        name: "Earth",
        size: 22,
        orbit: 162,
        au: 1,
        speed: 1,
        color: "#53a8ff",
        glow: "rgba(83, 168, 255, 0.8)",
        distance: "1 AU",
        period: "365.25 days",
        diameter: "12,742 km",
        temperature: "Average 15°C",
        moons: "1",
        description:
          "Our home world, rich with liquid water, atmosphere, weather systems, plate tectonics, and known life.",
      },

      {
        key: "mars",
        name: "Mars",
        size: 18,
        orbit: 210,
        au: 1.52,
        speed: 0.53,
        color: "#d65a31",
        glow: "rgba(214, 90, 49, 0.78)",
        distance: "1.52 AU",
        period: "687 Earth days",
        diameter: "6,779 km",
        temperature: "Average -63°C",
        moons: "2",
        description:
          "The red planet, marked by dusty plains, polar caps, ancient river valleys, and the largest volcano in the solar system.",
      },

      {
        key: "jupiter",
        name: "Jupiter",
        size: 52,
        orbit: 285,
        au: 5.2,
        speed: 0.084,
        color: "#f1dbb3",
        glow: "rgba(241, 219, 179, 0.7)",
        distance: "5.2 AU",
        period: "11.86 Earth years",
        diameter: "139,820 km",
        temperature: "Cloud tops about -145°C",
        moons: "95+",
        description:
          "The largest planet, a gas giant with powerful storms, banded clouds, many moons, and the Great Red Spot.",
      },

      {
        key: "saturn",
        name: "Saturn",
        size: 46,
        orbit: 365,
        au: 9.58,
        speed: 0.034,
        color: "#e7d6ac",
        glow: "rgba(231, 214, 172, 0.72)",
        distance: "9.58 AU",
        period: "29.45 Earth years",
        diameter: "116,460 km",
        temperature: "Cloud tops about -178°C",
        moons: "140+",
        description:
          "A massive gas giant best known for its wide, bright ring system made of ice, rock, and dust.",
      },

      {
        key: "uranus",
        name: "Uranus",
        size: 36,
        orbit: 430,
        au: 19.2,
        speed: 0.012,
        color: "#5ed7e8",
        glow: "rgba(94, 215, 232, 0.75)",
        distance: "19.2 AU",
        period: "84 Earth years",
        diameter: "50,724 km",
        temperature: "About -224°C",
        moons: "27",
        description:
          "An icy giant that rotates on its side, giving it extreme seasons and a pale blue-green color.",
      },

      {
        key: "neptune",
        name: "Neptune",
        size: 34,
        orbit: 488,
        au: 30.05,
        speed: 0.006,
        color: "#4169e1",
        glow: "rgba(65, 105, 225, 0.78)",
        distance: "30.05 AU",
        period: "164.8 Earth years",
        diameter: "49,244 km",
        temperature: "About -214°C",
        moons: "14",
        description:
          "A deep-blue ice giant with supersonic winds and distant storms at the edge of the planetary system.",
      },
    ];

    this.init();
  }

  init() {
    this.buildSystem();

    this.buildPlanetSelect();

    this.buildMiniMap();

    this.bindEvents();

    this.applyScaleMode();

    this.updateCamera();

    this.showPlanet("earth", false);

    this.createParticles();

    requestAnimationFrame((time) => this.animate(time));
  }

  buildSystem() {
    this.planets.forEach((planet) => {
      const orbit = document.createElement("div");

      orbit.className = "orbit";

      this.stage.insertBefore(orbit, this.comet);

      this.orbitElements.set(planet.key, orbit);

      const trail = document.createElement("div");

      trail.className = "trail";

      trail.style.setProperty("--glow", planet.glow);

      this.stage.insertBefore(trail, this.comet);

      this.trailElements.set(planet.key, trail);

      const body = document.createElement("button");

      body.type = "button";

      body.className = `planet ${planet.key}`;

      body.dataset.planet = planet.key;

      body.style.setProperty("--glow", planet.glow);

      body.setAttribute("aria-label", `Inspect ${planet.name}`);

      const label = document.createElement("span");

      label.className = "planet-label";

      label.textContent = planet.name;

      body.appendChild(label);

      if (planet.key === "saturn") {
        const rings = document.createElement("span");

        rings.className = "saturn-rings";

        body.appendChild(rings);
      }

      if (planet.key === "earth") {
        const moon = document.createElement("span");

        moon.className = "moon";

        body.appendChild(moon);
      }

      this.stage.insertBefore(body, this.comet);

      this.planetElements.set(planet.key, body);
    });
  }

  buildPlanetSelect() {
    this.planets.forEach((planet) => {
      const option = document.createElement("option");

      option.value = planet.key;

      option.textContent = planet.name;

      this.planetSelect.appendChild(option);
    });
  }

  buildMiniMap() {
    const sunDot = document.createElement("span");

    sunDot.className = "mini-dot";

    sunDot.style.setProperty("--dot-size", "8px");

    sunDot.style.setProperty("--dot-color", "#ffb52e");

    this.miniMap.appendChild(sunDot);

    this.planets.forEach((planet) => {
      const dot = document.createElement("span");

      dot.className = "mini-dot";

      dot.style.setProperty("--dot-size", `${Math.max(3, planet.size / 9)}px`);

      dot.style.setProperty("--dot-color", planet.color);

      this.miniMap.appendChild(dot);

      this.miniDots.set(planet.key, dot);
    });
  }

  bindEvents() {
    this.playPauseButton.addEventListener("click", () => this.togglePlay());

    this.speedSlider.addEventListener("input", (event) =>
      this.setSpeed(parseFloat(event.target.value)),
    );

    this.closeInfoButton.addEventListener("click", () => this.hideInfo());

    this.focusSunButton.addEventListener("click", () => this.focusSun());

    this.toggleLabelsButton.addEventListener("click", () =>
      this.toggleLabels(),
    );

    this.toggleOrbitsButton.addEventListener("click", () =>
      this.toggleOrbits(),
    );

    this.resetViewButton.addEventListener("click", () => this.resetView());

    this.cinemaModeButton.addEventListener("click", () =>
      this.toggleCinemaMode(),
    );

    this.scaleModeButton.addEventListener("click", () =>
      this.toggleScaleMode(),
    );

    this.planetSelect.addEventListener("change", (event) => {
      if (event.target.value) {
        this.focusPlanet(event.target.value);
      }
    });

    this.sun.addEventListener("click", () => this.focusSun());

    this.sun.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();

        this.focusSun();
      }
    });

    this.planetElements.forEach((element, key) => {
      element.addEventListener("click", (event) => {
        event.stopPropagation();

        this.showPlanet(key, true);
      });

      element.addEventListener("dblclick", (event) => {
        event.stopPropagation();

        this.focusPlanet(key);
      });
    });

    this.stage.addEventListener("pointerdown", (event) =>
      this.startDrag(event),
    );

    window.addEventListener("pointermove", (event) => this.handleDrag(event));

    window.addEventListener("pointerup", () => this.stopDrag());

    window.addEventListener("pointercancel", () => this.stopDrag());

    this.stage.addEventListener("wheel", (event) => this.zoom(event), {
      passive: false,
    });

    window.addEventListener("resize", () => this.updateFocusTarget());

    window.addEventListener("keydown", (event) => {
      const key = event.key.toLowerCase();

      if (event.code === "Space") {
        event.preventDefault();

        this.togglePlay();
      }

      if (key === "r") this.resetView();

      if (key === "l") this.toggleLabels();

      if (key === "o") this.toggleOrbits();

      if (key === "s") this.toggleScaleMode();

      if (key === "c") this.toggleCinemaMode();

      if (event.key === "Escape") {
        this.focusTarget = null;

        this.hideInfo();
      }
    });
  }

  togglePlay() {
    this.isPlaying = !this.isPlaying;

    this.playPauseButton.textContent = this.isPlaying ? "Pause" : "Play";

    this.statusText.textContent = this.isPlaying ? "Running" : "Paused";
  }

  setSpeed(value) {
    this.speed = value;

    this.speedValue.textContent = `${value.toFixed(1)}x`;
  }

  toggleLabels() {
    this.labelsOn = !this.labelsOn;

    this.stage.classList.toggle("labels-on", this.labelsOn);

    this.toggleLabelsButton.textContent = this.labelsOn
      ? "Hide Labels"
      : "Labels";
  }

  toggleOrbits() {
    this.orbitsOn = !this.orbitsOn;

    this.stage.classList.toggle("orbits-off", !this.orbitsOn);

    this.toggleOrbitsButton.textContent = this.orbitsOn
      ? "Orbits"
      : "Show Orbits";
  }

  toggleScaleMode() {
    this.scaleMode = this.scaleMode === "visual" ? "real" : "visual";

    this.applyScaleMode();
  }

  applyScaleMode() {
    const isReal = this.scaleMode === "real";

    this.scaleModeButton.textContent = isReal ? "Real Scale" : "Visual Scale";

    this.scaleModeButton.setAttribute("aria-pressed", String(isReal));

    this.planets.forEach((planet) => {
      const orbitDistance = this.getOrbitDistance(planet);

      const displaySize = this.getPlanetSize(planet);

      const orbit = this.orbitElements.get(planet.key);

      const element = this.planetElements.get(planet.key);

      const trail = this.trailElements.get(planet.key);

      orbit.style.setProperty("--diameter", `${orbitDistance * 2}px`);

      element.style.setProperty("--size", `${displaySize}px`);

      trail.style.setProperty("--trail-size", `${displaySize * 1.8}px`);
    });
  }

  getOrbitDistance(planet) {
    if (this.scaleMode === "visual") {
      return planet.orbit;
    }

    return 70 + Math.log10(planet.au + 1) * 380;
  }

  getPlanetSize(planet) {
    if (this.scaleMode === "visual") {
      return planet.size;
    }

    return this.clamp(Math.sqrt(planet.size) * 7.2, 11, 50);
  }

  toggleCinemaMode() {
    this.cinemaMode = !this.cinemaMode;

    document.querySelector(".ui-panel").style.display = this.cinemaMode
      ? "none"
      : "flex";

    document.querySelector(".help-card").style.display = this.cinemaMode
      ? "none"
      : "block";

    document.querySelector(".mini-map").style.display = this.cinemaMode
      ? "none"
      : "block";

    document.querySelector(".legend-card").style.display = this.cinemaMode
      ? "none"
      : "block";

    if (this.cinemaMode) {
      this.hideInfo();
    }
  }

  showPlanet(key, selectPlanet) {
    const planet = this.planets.find((item) => item.key === key);

    if (!planet) return;

    this.planetElements.forEach((element) =>
      element.classList.remove("selected"),
    );

    if (selectPlanet) {
      const selected = this.planetElements.get(key);

      selected.classList.add("selected");
    }

    this.planetSwatch.style.setProperty("--swatch", planet.color);

    this.planetSwatch.style.setProperty("--swatch-glow", planet.glow);

    this.planetName.textContent = planet.name;

    this.planetDescription.textContent = planet.description;

    this.planetDetails.innerHTML = `
      <div class="detail-item">
        <span>Distance from Sun</span>
        <strong>${planet.distance}</strong>
      </div>

      <div class="detail-item">
        <span>Orbital Period</span>
        <strong>${planet.period}</strong>
      </div>

      <div class="detail-item">
        <span>Diameter</span>
        <strong>${planet.diameter}</strong>
      </div>

      <div class="detail-item">
        <span>Temperature</span>
        <strong>${planet.temperature}</strong>
      </div>

      <div class="detail-item">
        <span>Known Moons</span>
        <strong>${planet.moons}</strong>
      </div>

      <div class="detail-item">
        <span>Scale Mode</span>

        <strong>
          ${
            this.scaleMode === "real"
              ? "Real-distance inspired"
              : "Visual presentation"
          }
        </strong>
      </div>
    `;

    this.planetInfo.classList.add("show");

    this.planetSelect.value = key;
  }

  hideInfo() {
    this.planetInfo.classList.remove("show");

    this.planetElements.forEach((element) =>
      element.classList.remove("selected"),
    );

    this.planetSelect.value = "";
  }

  focusPlanet(key) {
    const element = this.planetElements.get(key);

    if (!element) return;

    this.focusTarget = element;

    this.camera.targetScale = Math.max(this.camera.scale, 1.72);

    this.showPlanet(key, true);

    this.updateFocusTarget();
  }

  focusSun() {
    this.focusTarget = null;

    this.camera.targetX = 0;

    this.camera.targetY = 0;

    this.camera.targetScale = 1.18;

    this.hideInfo();
  }

  resetView() {
    this.focusTarget = null;

    this.camera.targetX = 0;

    this.camera.targetY = 0;

    this.camera.targetScale = 1;

    this.hideInfo();
  }

  startDrag(event) {
    if (
      event.target.closest(".ui-panel") ||
      event.target.closest(".planet-info")
    ) {
      return;
    }

    this.focusTarget = null;

    this.drag.active = true;

    this.drag.x = event.clientX;

    this.drag.y = event.clientY;

    this.drag.pointerId = event.pointerId;

    this.stage.classList.add("dragging");

    this.stage.setPointerCapture?.(event.pointerId);
  }

  handleDrag(event) {
    if (!this.drag.active) return;

    const dx = event.clientX - this.drag.x;

    const dy = event.clientY - this.drag.y;

    this.camera.targetX += dx;

    this.camera.targetY += dy;

    this.drag.x = event.clientX;

    this.drag.y = event.clientY;
  }

  stopDrag() {
    this.drag.active = false;

    this.drag.pointerId = null;

    this.stage.classList.remove("dragging");
  }

  zoom(event) {
    event.preventDefault();

    this.focusTarget = null;

    const oldScale = this.camera.targetScale;

    const factor = event.deltaY > 0 ? 0.9 : 1.1;

    const newScale = this.clamp(oldScale * factor, 0.55, 3.2);

    const rect = this.stage.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;

    const centerY = rect.top + rect.height / 2;

    const pointerX = event.clientX - centerX;

    const pointerY = event.clientY - centerY;

    this.camera.targetX -= pointerX * (newScale / oldScale - 1);

    this.camera.targetY -= pointerY * (newScale / oldScale - 1);

    this.camera.targetScale = newScale;
  }

  updateCamera() {
    this.stage.style.setProperty("--camera-x", `${this.camera.x}px`);

    this.stage.style.setProperty("--camera-y", `${this.camera.y}px`);

    this.stage.style.setProperty("--camera-scale", this.camera.scale);

    this.zoomValue.textContent = `${Math.round(this.camera.scale * 100)}%`;

    this.starsBack.style.transform = `
  translate(
    ${this.camera.x * 0.012}px,
    ${this.camera.y * 0.012}px
  )
  scale(${1 + this.camera.scale * 0.004})
`;

    this.starsMid.style.transform = `
  translate(
    ${this.camera.x * 0.028}px,
    ${this.camera.y * 0.028}px
  )
  scale(${1 + this.camera.scale * 0.008})
`;

    this.starsFront.style.transform = `
  translate(
    ${this.camera.x * 0.05}px,
    ${this.camera.y * 0.05}px
  )
  scale(${1 + this.camera.scale * 0.014})
`;
  }

  updateFocusTarget() {
    if (!this.focusTarget || this.drag.active) {
      return;
    }

    const position = this.positions.get(this.focusTarget.dataset.planet);

    if (!position) return;

    this.camera.targetX = -position.x * this.camera.targetScale;

    this.camera.targetY = -position.y * this.camera.targetScale;
  }

  updateCameraMotion() {
    const ease = this.focusTarget ? 0.055 : 0.085;

    this.camera.x += (this.camera.targetX - this.camera.x) * ease;

    this.camera.y += (this.camera.targetY - this.camera.y) * ease;

    this.camera.scale += (this.camera.targetScale - this.camera.scale) * ease;

    this.camera.driftTime += 0.0012;

    if (!this.drag.active && !this.focusTarget) {
      this.camera.x += Math.sin(this.camera.driftTime) * 0.04;

      this.camera.y += Math.cos(this.camera.driftTime * 0.8) * 0.035;
    }

    this.updateCamera();
  }

  animate(now) {
    const delta = Math.min((now - this.lastTime) / 1000, 0.05);

    this.lastTime = now;

    if (this.isPlaying) {
      this.elapsed += delta * this.speed;
    }

    this.planets.forEach((planet, index) => {
      const element = this.planetElements.get(planet.key);

      const trail = this.trailElements.get(planet.key);

      const miniDot = this.miniDots.get(planet.key);

      const orbitDistance = this.getOrbitDistance(planet);

      const angle = this.elapsed * planet.speed + index * 0.6;

      const x = Math.cos(angle) * orbitDistance;

      const y = Math.sin(angle) * orbitDistance * 0.38;

      const depth = (Math.sin(angle) + 1) / 2;

      const depthScale = 0.78 + depth * 0.44;

      const brightness = 0.72 + depth * 0.35;

      const zIndex = Math.floor(80 + depth * 180);

      const miniMapScale = this.scaleMode === "real" ? 0.11 : 0.13;

      this.positions.set(planet.key, { x, y });

      element.style.setProperty("--x", `${x}px`);

      element.style.setProperty("--y", `${y}px`);

      element.style.setProperty("--depth-scale", depthScale.toFixed(3));

      element.style.filter = `
          brightness(${brightness})
          saturate(${1 + depth * 0.25})
        `;

      element.style.zIndex = zIndex;

      trail.style.setProperty("--x", `${x}px`);

      trail.style.setProperty("--y", `${y}px`);

      trail.style.setProperty("--depth-scale", depthScale.toFixed(3));

      trail.style.opacity = 0.08 + depth * 0.12;

      trail.style.zIndex = zIndex - 1;

      miniDot.style.setProperty("--mx", `${x * miniMapScale}px`);

      miniDot.style.setProperty("--my", `${y * miniMapScale}px`);

      if (planet.key === "earth") {
        const moon = element.querySelector(".moon");

        const moonAngle = this.elapsed * 7.5;

        const moonDistance = this.scaleMode === "real" ? 22 : 25;

        moon.style.setProperty(
          "--moon-x",
          `${Math.cos(moonAngle) * moonDistance}px`,
        );

        moon.style.setProperty(
          "--moon-y",
          `${Math.sin(moonAngle) * moonDistance}px`,
        );
      }
    });

    const cometAngle = this.elapsed * 0.28;

    const cometRange = this.scaleMode === "real" ? 620 : 555;

    const cometX = Math.cos(cometAngle) * cometRange;

    const cometY = Math.sin(cometAngle * 1.35) * 180;

    const cometTailAngle = Math.atan2(cometY, cometX) * (180 / Math.PI) + 180;

    this.comet.style.setProperty("--comet-x", `${cometX}px`);

    this.comet.style.setProperty("--comet-y", `${cometY}px`);

    this.comet.style.setProperty("--comet-angle", `${cometTailAngle}deg`);

    if (this.focusTarget && !this.drag.active) {
      this.updateFocusTarget();
    }

    this.updateCameraMotion();

    requestAnimationFrame((time) => this.animate(time));
  }

  createParticles() {
    const total = 220;

    for (let i = 0; i < total; i++) {
      const particle = document.createElement("span");

      particle.className = "space-particle";

      const depth = Math.random();

      const nearField = depth > 0.86;

      const starField = depth < 0.22;

      const size = starField
        ? 0.6 + Math.random() * 1.2
        : nearField
          ? 2 + Math.random() * 4
          : 1 + Math.random() * 2;

      const opacity = starField
        ? 0.35 + Math.random() * 0.5
        : nearField
          ? 0.12 + Math.random() * 0.22
          : 0.04 + Math.random() * 0.12;

      const blur = starField
        ? "0px"
        : nearField
          ? `${1 + Math.random() * 2}px`
          : `${Math.random() * 0.8}px`;

      const duration = nearField
        ? 80 + Math.random() * 120
        : 140 + Math.random() * 220;

      const driftRange = nearField ? 900 : 320;

      particle.style.setProperty("--size", `${size}px`);

      particle.style.setProperty("--x", `${Math.random() * 100}%`);

      particle.style.setProperty("--y", `${Math.random() * 100}%`);

      particle.style.setProperty("--opacity", opacity);

      particle.style.setProperty("--blur", blur);

      particle.style.setProperty("--depth-scale", 0.45 + depth * 1.4);

      particle.style.setProperty("--duration", `${duration}s`);

      particle.style.setProperty(
        "--drift-x",
        `${Math.random() * driftRange - driftRange / 2}px`,
      );

      particle.style.setProperty(
        "--drift-y",
        `${Math.random() * driftRange - driftRange / 2}px`,
      );

      particle.style.setProperty(
        "--twinkle-duration",
        `${6 + Math.random() * 14}s`,
      );

      particle.style.setProperty(
        "--twinkle-strength",
        1.2 + Math.random() * 1.8,
      );

      particle.dataset.type = starField ? "star" : nearField ? "near" : "dust";

      this.particleField.appendChild(particle);
    }
  }

  clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new SolarSystem();
});
