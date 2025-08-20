// js/utils.js

export function criarCard(video) {
    const li = document.createElement("li");
    li.classList.add("videos__item");
    li.dataset.categoria = video.categoria?.toLowerCase() || "";

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

export function renderizarVideos(videos, container) {
    container.innerHTML = "";
    const fragment = document.createDocumentFragment();

    videos.forEach(video => {
        if (!video.categoria || !video.titulo) return;
        const card = criarCard(video);
        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}

export function filtrarPorCategoria(videos, categoria) {
    const filtro = categoria.toLowerCase();
    if (filtro === "tudo") return videos;

    return videos.filter(video =>
        video.categoria?.toLowerCase().includes(filtro)
    );
}

export function filtrarPorTitulo(videos, termo) {
    const filtro = termo.toLowerCase();
    return videos.filter(video =>
        video.titulo.toLowerCase().includes(filtro)
    );
}
