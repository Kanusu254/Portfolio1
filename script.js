
/* ==========================================
   FELIXTHEFREELANCER
   JavaScript
   ========================================== */


/* 1. MOBILE NAVIGATION */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        const isOpen = navLinks.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

    });


    // Close menu after selecting a navigation link

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        });

    });


    // Close menu when Escape is pressed

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }

    });

}


/* 2. TYPEWRITER EFFECT */

const typingText = document.querySelector("#typing-text");
const typingCursor = document.querySelector(".typing-cursor");

const introText = "HELLO, I'M FELIX.";

if (typingText && typingCursor) {

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {

        typingText.textContent = introText;
        typingCursor.style.display = "none";

    } else {

        typingText.textContent = "";

        let characterIndex = 0;

        function typeWriter() {

            if (characterIndex < introText.length) {

                typingText.textContent += introText.charAt(characterIndex);

                characterIndex++;

                setTimeout(typeWriter, 90);

            } else {

                typingCursor.style.display = "none";

            }

        }

        typeWriter();

    }

}


/* 3. HERO STAGE POINTER MOTION */

const heroStage = document.querySelector(".hero-stage");

if (heroStage) {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    if (!reduceMotion && finePointer) {
        heroStage.addEventListener("pointermove", event => {
            const bounds = heroStage.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
            const y = (event.clientY - bounds.top) / bounds.height - 0.5;

            heroStage.style.setProperty("--tilt-x", `${x * 2.5}deg`);
            heroStage.style.setProperty("--tilt-y", `${y * -2.5}deg`);
        });

        heroStage.addEventListener("pointerleave", () => {
            heroStage.style.setProperty("--tilt-x", "0deg");
            heroStage.style.setProperty("--tilt-y", "0deg");
        });
    }
}


/* 4. VISUAL EXPERIENCE: reveal and gentle card movement */
const visualRevealTargets = document.querySelectorAll(
    ".project-card, .case-study, #about .about-content, #skills > div"
);

if ("IntersectionObserver" in window) {
    visualRevealTargets.forEach((element, index) => {
        element.classList.add("reveal-on-scroll");
        element.style.transitionDelay = `${(index % 3) * 75}ms`;
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    visualRevealTargets.forEach(element => revealObserver.observe(element));
} else {
    visualRevealTargets.forEach(element => element.classList.add("is-visible"));
}

const projectCards = document.querySelectorAll(".project-card");
const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (supportsHover && !prefersReducedMotion) {
    projectCards.forEach(card => {
        card.addEventListener("pointermove", event => {
            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;
            card.style.setProperty("--pointer-x", `${x * 12}px`);
            card.style.setProperty("--pointer-y", `${y * 12}px`);
        });
        card.addEventListener("pointerleave", () => {
            card.style.setProperty("--pointer-x", "0px");
            card.style.setProperty("--pointer-y", "0px");
        });
    });
}

// Cinematic hero video: respect reduced motion, data saver and viewport visibility.
(() => {
 const video=document.querySelector(".hero-video");
 if(!video) return;
 const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 const saveData=navigator.connection && navigator.connection.saveData;
 if(reduceMotion || saveData){video.pause();return;}
 if("IntersectionObserver" in window){
  const observer=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{
    if(entry.isIntersecting){const p=video.play();if(p&&p.catch)p.catch(()=>{});}
    else video.pause();
   });
  },{threshold:.08});
  observer.observe(video);
 }
})();
