// js/main.js
import {
    renderizarVideos,
    filtrarPorCategoria,
    filtrarPorTitulo
} from './utils.js';

const containerVideos = document.querySelector(".videos__container");
const barraDePesquisa = document.querySelector(".pesquisar__input");
const botoesCategoria = document.querySelectorAll(".superior__item");

let todosOsVideos = [];

async function buscarVideos() {
    try {
        const resposta = await fetch("http://localhost:3000/videos");
        todosOsVideos = await resposta.json();
        aplicarFiltros(); // Aplica filtros iniciais (categoria + busca)
    } catch (error) {
        containerVideos.innerHTML = `<p>Erro ao carregar vídeos: ${error.message}</p>`;
    }
}

function aplicarFiltros() {
    const termo = barraDePesquisa.value.toLowerCase();
    const categoriaSelecionada = document.querySelector(".superior__item.selected");
    const nomeCategoria = categoriaSelecionada?.getAttribute("name") || "tudo";

    let filtrados = filtrarPorCategoria(todosOsVideos, nomeCategoria);
    filtrados = filtrarPorTitulo(filtrados, termo);

    renderizarVideos(filtrados, containerVideos);
}

// EVENTOS

barraDePesquisa.addEventListener("input", aplicarFiltros);

botoesCategoria.forEach(botao => {
    botao.addEventListener("click", () => {
        botoesCategoria.forEach(btn => btn.classList.remove("selected"));
        botao.classList.add("selected");
        aplicarFiltros();
    });
});

// INICIALIZAÇÃO
buscarVideos();
