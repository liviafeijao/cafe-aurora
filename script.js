
"use strict";

// Seleciona os elementos do menu
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

// Abre ou fecha o menu ao clicar no botão
menuToggle.addEventListener("click", () => {
    const menuAberto = navMenu.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", String(menuAberto));
    menuToggle.setAttribute(
        "aria-label",
        menuAberto ? "Fechar menu" : "Abrir menu"
    );

    menuToggle.textContent = menuAberto ? "✕" : "☰";
});

// Fecha o menu quando uma opção é selecionada
const linksMenu = navMenu.querySelectorAll("a");

linksMenu.forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        menuToggle.textContent = "☰";
    });
});

// Carrossel de destaques
const carousel = document.querySelector(".featured-carousel");
const slides = document.querySelectorAll(".carousel-slide");
const indicators = document.querySelectorAll(".carousel-indicator");
const prevButton = document.querySelector(".carousel-control.prev");
const nextButton = document.querySelector(".carousel-control.next");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let currentSlide = 0;
let carouselInterval = null;
const AUTO_ROTATE_DELAY = 5000;

function updateCarousel(index) {
    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === currentSlide;

        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", String(!isActive));
    });

    indicators.forEach((indicator, indicatorIndex) => {
        const isActive = indicatorIndex === currentSlide;

        indicator.classList.toggle("is-active", isActive);
        indicator.setAttribute("aria-current", String(isActive));
    });
}

function startAutoRotate() {
    if (prefersReducedMotion.matches || !carousel) {
        return;
    }

    clearInterval(carouselInterval);
    carouselInterval = setInterval(() => {
        updateCarousel(currentSlide + 1);
    }, AUTO_ROTATE_DELAY);
}

function stopAutoRotate() {
    clearInterval(carouselInterval);
    carouselInterval = null;
}

if (carousel) {
    prevButton.addEventListener("click", () => {
        updateCarousel(currentSlide - 1);
        startAutoRotate();
    });

    nextButton.addEventListener("click", () => {
        updateCarousel(currentSlide + 1);
        startAutoRotate();
    });

    indicators.forEach((indicator) => {
        indicator.addEventListener("click", () => {
            updateCarousel(Number(indicator.dataset.index));
            startAutoRotate();
        });
    });

    carousel.addEventListener("mouseenter", stopAutoRotate);
    carousel.addEventListener("mouseleave", startAutoRotate);
    carousel.addEventListener("focusin", stopAutoRotate);
    carousel.addEventListener("focusout", (event) => {
        if (!carousel.contains(event.relatedTarget)) {
            startAutoRotate();
        }
    });

    carousel.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight") {
            event.preventDefault();
            updateCarousel(currentSlide + 1);
            startAutoRotate();
        }

        if (event.key === "ArrowLeft") {
            event.preventDefault();
            updateCarousel(currentSlide - 1);
            startAutoRotate();
        }
    });

    let touchStartX = 0;

    carousel.addEventListener(
        "touchstart",
        (event) => {
            touchStartX = event.changedTouches[0].screenX;
        },
        { passive: true }
    );

    carousel.addEventListener(
        "touchend",
        (event) => {
            const touchEndX = event.changedTouches[0].screenX;
            const distance = touchStartX - touchEndX;

            if (Math.abs(distance) > 40) {
                updateCarousel(distance > 0 ? currentSlide + 1 : currentSlide - 1);
                startAutoRotate();
            }
        },
        { passive: true }
    );

    updateCarousel(0);
    startAutoRotate();

    if (typeof prefersReducedMotion.addEventListener === "function") {
        prefersReducedMotion.addEventListener("change", () => {
            if (prefersReducedMotion.matches) {
                stopAutoRotate();
            } else {
                startAutoRotate();
            }
        });
    }
}

// Atualiza automaticamente o ano do rodapé
const anoAtual = document.getElementById("current-year");

anoAtual.textContent = new Date().getFullYear();
