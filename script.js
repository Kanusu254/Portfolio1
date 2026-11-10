
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
