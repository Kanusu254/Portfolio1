/* =========================================================
   FelixTheFreelancer — site interactions
   HTML provides the structure. CSS provides the appearance.
   This file adds the behaviour that makes the site interactive.
   ========================================================= */


/* 1. Mobile navigation */

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-navigation");

if (menuButton && navigation) {
  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
    navigation.classList.remove("is-open");
  };

  menuButton.addEventListener("click", () => {
    const isOpening = menuButton.getAttribute("aria-expanded") !== "true";

    menuButton.setAttribute("aria-expanded", String(isOpening));
    menuButton.setAttribute(
      "aria-label",
      isOpening ? "Close menu" : "Open menu"
    );
    navigation.classList.toggle("is-open", isOpening);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeMenu();
  });
}


/* 2. Browser preferences */

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const saveData = navigator.connection?.saveData === true;


/* 3. Hero typewriter sequence
   The workbench appears last, after the introduction, headline and CTAs. */

const hero = document.querySelector(".hero");
const intro = document.querySelector("#typed-intro");
const discipline = document.querySelector(".hero-discipline");
const heading = document.querySelector(".hero h1");
const description = document.querySelector(".hero-description");
const actions = document.querySelector(".hero-actions");
const consoleGraphic = document.querySelector("#ideas-console");
const cursor = document.querySelector(".type-cursor");

const wait = (milliseconds) =>
  new Promise((resolve) => window.setTimeout(resolve, milliseconds));

function typeText(element, text, speed) {
  return new Promise((resolve) => {
    let index = 0;
    element.textContent = "";

    const typeNextCharacter = () => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index += 1;
        window.setTimeout(typeNextCharacter, speed);
      } else {
        resolve();
      }
    };

    typeNextCharacter();
  });
}

async function playHeroSequence() {
  if (!hero || !intro || !heading || !description) return;

  // Respect visitors who prefer reduced motion.
  if (reducedMotion) {
    intro.textContent = "HELLO, I'M FELIX.";

    heading.querySelectorAll("[data-type-text]").forEach((part) => {
      part.textContent = part.dataset.typeText;
    });

    description.textContent = description.dataset.typeText;

    [discipline, heading, description, actions, consoleGraphic].forEach(
      (element) => element?.classList.add("is-visible")
    );

    cursor?.remove();
    return;
  }

  await wait(650);
  await typeText(intro, "HELLO, I'M FELIX.", 68);
  cursor?.remove();

  discipline?.classList.add("is-visible");
  await wait(180);

  // Type each heading line separately to preserve the intentional line breaks.
  const headingParts = heading.querySelectorAll("[data-type-text]");

  for (const part of headingParts) {
    await typeText(part, part.dataset.typeText, 27);
  }

  heading.classList.add("is-visible");

  // Reveal and type the supporting paragraph.
  await wait(120);
  description.classList.add("is-visible");
  await typeText(description, description.dataset.typeText, 11);
  actions?.classList.add("is-visible");

  // Finish with the IDEAS INTO ACTION workbench.
  await wait(380);
  consoleGraphic?.classList.add("is-visible");
}

playHeroSequence();


/* 4. Background video playback
   Play videos only while they are near the visible part of the page. */

document.querySelectorAll(".hero-film, .tribe-board-film").forEach((video) => {
  if (reducedMotion || saveData) {
    video.pause();
    return;
  }

  if (!("IntersectionObserver" in window)) return;

  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const playRequest = video.play();

          if (playRequest?.catch) {
            playRequest.catch(() => {});
          }
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.08 }
  );

  videoObserver.observe(video);
});


/* 5. Scroll reveal animations */

const revealItems = document.querySelectorAll(
  ".venture-card, .case-track, .scoreboard, .service-card, .about-copy"
);

if (!reducedMotion && "IntersectionObserver" in window) {
  revealItems.forEach((item) => item.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}


/* 6. Animated case-study scoreboards
   These values are demonstration figures, not verified business results. */

const scoreboards = document.querySelectorAll(".scoreboard");

function showFinalScore(counter) {
  const value = Number(counter.dataset.count);
  const prefix = counter.dataset.prefix || "";
  const suffix = counter.dataset.suffix || "";

  counter.textContent = prefix + value.toLocaleString("en-KE") + suffix;
}

function animateScore(counter, duration = 1750) {
  const target = Number(counter.dataset.count);
  const prefix = counter.dataset.prefix || "";
  const suffix = counter.dataset.suffix || "";
  const startTime = performance.now();

  function updateNumber(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.round(target * easedProgress);

    counter.textContent =
      prefix + currentValue.toLocaleString("en-KE") + suffix;

    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    }
  }

  requestAnimationFrame(updateNumber);
}

if ("IntersectionObserver" in window && !reducedMotion) {
  scoreboards.forEach((board) => {
    let hasAnimated = false;

    const scoreboardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || hasAnimated) return;

          hasAnimated = true;

          board.querySelectorAll("[data-count]").forEach((counter) => {
            animateScore(counter);
          });

          scoreboardObserver.unobserve(board);
        });
      },
      { threshold: 0.25 }
    );

    scoreboardObserver.observe(board);
  });
} else {
  scoreboards.forEach((board) => {
    board.querySelectorAll("[data-count]").forEach(showFinalScore);
  });
}
