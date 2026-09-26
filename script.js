/* =========================================================
   H. P. VERLEKAR JEWELLERS
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. MOBILE MENU
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen = mainNav.classList.toggle("open");

            menuToggle.classList.toggle("active", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        /* Close menu after clicking a link */

        const navLinks = mainNav.querySelectorAll("a");

        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("open");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =====================================================
       2. HEADER SCROLL EFFECT
    ===================================================== */

    const header = document.getElementById("header");

    function handleHeaderScroll() {

        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );

    handleHeaderScroll();


    /* =====================================================
       3. CURRENT YEAR
    ===================================================== */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =====================================================
       4. SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".collection-card, .product-card, .contact-card, .about-content"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observerInstance.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {

            element.classList.add("reveal");

            observer.observe(element);

        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("visible");
        });

    }


    /* =====================================================
       5. SMOOTH INTERNAL LINKS
    ===================================================== */

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                targetId.length < 2
            ) {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       6. CATALOGUE IMAGE FALLBACK
       
       If a temporary image ever fails to load,
       replace it with a clean neutral background.
    ===================================================== */

    const catalogueImages = document.querySelectorAll(
        ".product-image img"
    );

    catalogueImages.forEach((image) => {

        image.addEventListener("error", () => {

            image.style.display = "none";

            image.parentElement.classList.add(
                "image-fallback"
            );

        });

    });


    /* =====================================================
       7. WHATSAPP BUTTON CLICK TRACKING
       
       This doesn't send any data anywhere.
       It simply logs the click in the browser console.
    ===================================================== */

    const whatsappLinks = document.querySelectorAll(
        'a[href*="wa.me"]'
    );

    whatsappLinks.forEach((link) => {

        link.addEventListener("click", () => {

            console.log(
                "WhatsApp enquiry button clicked."
            );

        });

    });


    /* =====================================================
       8. ESCAPE KEY CLOSES MOBILE MENU
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            if (mainNav) {
                mainNav.classList.remove("open");
            }

            if (menuToggle) {

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    });

});