const projects = [
  {
    number: "01",
    title: "Datnie",
    category: "Mixed Reality Dating",
    image: "../../public/datnie.webp",
    position: "center",
  },
  {
    number: "02",
    title: "Signie",
    category: "ASL Learning System",
    image: "../../public/linkedinthumbnail.webp",
    position: "center 38%",
  },
  {
    number: "03",
    title: "I AND AI: MIRROR",
    category: "Immersive AI Installation",
    image: "../../public/iandaithumb.jpg",
    position: "center",
  },
  {
    number: "04",
    title: "The Shadow of Horizon",
    category: "Motion Capture",
    image: "../../public/mocapthumbnail.webp",
    position: "center",
  },
  {
    number: "05",
    title: "The Tool Box",
    category: "AI Shopping Assistant",
    image: "../../public/toolboxthumb.webp",
    position: "center",
  },
  {
    number: "06",
    title: "Aether Tag",
    category: "XR Game Design",
    image: "../../public/aetherTagthumb.webp",
    position: "center",
  },
];

const projectGrid = document.querySelector("#project-grid");
const panel = document.querySelector("#glass-panel");
const scene = document.querySelector(".scene");
const projectPreview = document.querySelector("#project-preview");
const projectPreviewCategory = document.querySelector("#project-preview-category");
const projectPreviewTitle = document.querySelector("#project-preview-title");

const projectCardMarkup = ({ number, title, category, image, position }) => `
  <article
    class="project-card"
    tabindex="0"
    style="--image-position: ${position}"
    aria-label="${number}. ${title}, ${category}"
  >
    <img class="project-card__image" src="${image}" alt="" loading="eager" />
    <span class="project-card__veil" aria-hidden="true"></span>
    <span class="project-card__number">${number}</span>
    <span class="project-card__content">
      <span class="project-card__category">${category}</span>
      <span class="project-card__title">${title}</span>
      <span class="project-card__cta" aria-hidden="true">View project</span>
    </span>
  </article>
`;

projectGrid.innerHTML = projects.map(projectCardMarkup).join("");

function getProjectFromCard(card) {
  const cards = [...projectGrid.querySelectorAll(".project-card")];
  const index = cards.indexOf(card);
  return index >= 0 ? projects[index] : null;
}

function showProjectPreview(card) {
  const project = getProjectFromCard(card);
  if (!project) return;

  projectPreviewCategory.textContent = project.category;
  projectPreviewTitle.textContent = project.title;
  projectPreview.setAttribute("aria-hidden", "false");
  projectPreview.classList.add("is-visible");
}

function hideProjectPreview() {
  projectPreview.classList.remove("is-visible");
  projectPreview.setAttribute("aria-hidden", "true");
}

projectGrid.addEventListener("pointerover", (event) => {
  const card = event.target.closest(".project-card");
  if (card && projectGrid.contains(card)) showProjectPreview(card);
});

projectGrid.addEventListener("pointerleave", () => {
  if (!projectGrid.contains(document.activeElement)) hideProjectPreview();
});

projectGrid.addEventListener("focusin", (event) => {
  const card = event.target.closest(".project-card");
  if (card) showProjectPreview(card);
});

projectGrid.addEventListener("focusout", () => {
  requestAnimationFrame(() => {
    if (!projectGrid.contains(document.activeElement) && !projectGrid.matches(":hover")) {
      hideProjectPreview();
    }
  });
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
const desktop = window.matchMedia("(min-width: 901px)");

let animationFrame = 0;
let target = { x: 0, y: 0 };
let current = { x: 0, y: 0 };
let isTracking = false;

function canUseParallax() {
  return !reduceMotion.matches && finePointer.matches && desktop.matches;
}

function writeParallax(x, y) {
  panel.style.setProperty("--panel-x", `${x * 4.5}px`);
  panel.style.setProperty("--panel-y", `${y * 3.5}px`);
  panel.style.setProperty("--panel-rx", `${y * -1.2}deg`);
  panel.style.setProperty("--panel-ry", `${x * 1.75}deg`);
  panel.style.setProperty("--card-x", `${x * 2.4}px`);
  panel.style.setProperty("--card-y", `${y * 1.8}px`);
}

function animateParallax() {
  current.x += (target.x - current.x) * 0.075;
  current.y += (target.y - current.y) * 0.075;
  writeParallax(current.x, current.y);

  const stillMoving =
    Math.abs(target.x - current.x) > 0.001 ||
    Math.abs(target.y - current.y) > 0.001;

  if (isTracking || stillMoving) {
    animationFrame = requestAnimationFrame(animateParallax);
  } else {
    animationFrame = 0;
  }
}

function requestParallaxFrame() {
  if (!animationFrame) {
    animationFrame = requestAnimationFrame(animateParallax);
  }
}

function handlePointerMove(event) {
  if (!canUseParallax()) return;

  const bounds = scene.getBoundingClientRect();
  target.x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
  target.y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2));
  isTracking = true;
  requestParallaxFrame();
}

function resetParallax() {
  target = { x: 0, y: 0 };
  isTracking = false;
  requestParallaxFrame();
}

function handleCapabilityChange() {
  if (!canUseParallax()) {
    current = { x: 0, y: 0 };
    target = { x: 0, y: 0 };
    writeParallax(0, 0);
  }
}

scene.addEventListener("pointermove", handlePointerMove, { passive: true });
scene.addEventListener("pointerleave", resetParallax);
window.addEventListener("blur", resetParallax);
reduceMotion.addEventListener("change", handleCapabilityChange);
finePointer.addEventListener("change", handleCapabilityChange);
desktop.addEventListener("change", handleCapabilityChange);
