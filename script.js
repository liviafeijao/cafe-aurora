
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

// Atualiza automaticamente o ano do rodapé
const anoAtual = document.getElementById("current-year");

anoAtual.textContent = new Date().getFullYear();
