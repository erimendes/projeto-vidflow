const containerVideos = document.querySelector(".videos__container");
const barraDePesquisa = document.querySelector(".pesquisar__input");
const botoesCategoria = document.querySelectorAll(".superior__item");

let todosOsVideos = []; // Guardar todos os vídeos carregados

// Cria o card HTML para cada vídeo
function criarCard(video) {
    const li = document.createElement("li");
    li.classList.add("videos__item");
    li.dataset.categoria = video.categoria.toLowerCase();

    li.innerHTML = `
        <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
        <div class="descricao-video">
            <img class="img-canal" src="${video.imagem}" alt="Logo do Canal">
            <h3 class="titulo-video">${video.titulo}</h3>
            <p class="titulo-canal">${video.descricao}</p>
        </div>
    `;

    return li;
}

// Busca vídeos da API e renderiza
async function buscarEMostrarVideos() {
    try {
        const resposta = await fetch("http://localhost:3000/videos");
        const videos = await resposta.json();

        todosOsVideos = videos;
        renderizarVideos(videos);
    } catch (error) {
        containerVideos.innerHTML = `<p>Houve um erro ao carregar os vídeos: ${error.message}</p>`;
    }
}

// Renderiza os vídeos no DOM usando DocumentFragment
function renderizarVideos(videos) {
    containerVideos.innerHTML = "";
    const fragment = document.createDocumentFragment();

    videos.forEach(video => {
        if (!video.categoria || !video.titulo) return; // Proteção
        const card = criarCard(video);
        fragment.appendChild(card);
    });

    containerVideos.appendChild(fragment);
}

// Filtra por título digitado na busca
function filtrarPesquisa() {
    const termo = barraDePesquisa.value.toLowerCase();

    const videosFiltrados = todosOsVideos.filter(video =>
        video.titulo.toLowerCase().includes(termo)
    );

    renderizarVideos(filtrarPorCategoriaAtiva(videosFiltrados));
}

// Retorna os vídeos filtrados pela categoria selecionada
function filtrarPorCategoriaAtiva(videos) {
    const categoriaSelecionada = document.querySelector(".superior__item.selected");
    if (!categoriaSelecionada) return videos;

    const filtro = categoriaSelecionada.getAttribute("name").toLowerCase();

    if (filtro === "tudo") return videos;

    return videos.filter(video =>
        video.categoria && video.categoria.toLowerCase().includes(filtro)
    );
}

// Aplica o filtro de categoria e depois o filtro de busca
function aplicarFiltroCategoria(botaoClicado) {
    botoesCategoria.forEach(btn => btn.classList.remove("selected"));
    botaoClicado.classList.add("selected");

    const videosFiltrados = filtrarPorCategoriaAtiva(todosOsVideos);
    const termo = barraDePesquisa.value.toLowerCase();

    const resultadoFinal = videosFiltrados.filter(video =>
        video.titulo.toLowerCase().includes(termo)
    );

    renderizarVideos(resultadoFinal);
}

// Eventos
barraDePesquisa.addEventListener("input", filtrarPesquisa);

botoesCategoria.forEach(botao => {
    botao.addEventListener("click", () => aplicarFiltroCategoria(botao));
});

// Inicializa
buscarEMostrarVideos();
