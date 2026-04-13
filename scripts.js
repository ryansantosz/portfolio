// --- Animação de Digitação ---
const textElement = document.getElementById("typing-text");
const text = "Ryan Silva";
let index = 0;
let isDeleting = false;
let speed = 200;

function type() {
    if (!textElement) return; // Segurança caso o elemento não exista
    
    const currentText = text.substring(0, index);
    textElement.textContent = currentText;

    if (!isDeleting && index < text.length) {
        index++;
        speed = 200;
    } else if (isDeleting && index > 0) {
        index--;
        speed = 100;
    } else if (!isDeleting && index === text.length) {
        isDeleting = true;
        speed = 2000;
    } else {
        isDeleting = false;
        index = 0;
        speed = 500;
    }
    setTimeout(type, speed);
}

// --- Lógica de Projetos Dinâmicos ---
const outrosProjetos = [
    {
        titulo: "Catálogo de Filmes",
        subtitulo: "Projeto Pessoal",
        descricao: "Catálogo de Filmes é um projeto pessoal desenvolvido em colaboração com amigos, com foco em aprendizado prático, divisão de responsabilidades e superação de desafios em equipe. A aplicação permite explorar filmes, visualizar detalhes e navegar por diferentes categorias, com interface moderna, responsiva e otimizada para uma ótima experiência do usuário.",
        tecnologias: ["React", "Tailwind CSS", "JavaScript / TypeScript", "Vite", "TMDB API"],
        imagem: "img/FotoProjeto2.jpeg",
        link: "https://github.com/ryansantosz/project-filmes"
    },
    {
        titulo: "Landing Page iPhone 17 Pro",
        subtitulo: "Projeto de Estudo",
        descricao: "Landing page desenvolvida como projeto de estudo em React, inspirada no lançamento do iPhone 17 Pro. O foco foi praticar componentização, responsividade e construção de interfaces modernas, reproduzindo uma experiência visual premium com animações sutis e seções bem estruturadas.",
        tecnologias: ["React", "Tailwind CSS", "JavaScript / TypeScript", "Vite"],
        imagem: "img/FotoProjeto3.jpeg",
        link: "https://github.com/ryansantosz/curso-de-react-yt-2"
    },
    {
        titulo: "Gerenciador de Tarefas",
        subtitulo: "Projeto de Estudo",
        descricao: "Aplicação desenvolvida em React durante um curso prático, com foco na criação de um gerenciador de tarefas funcional. O projeto foi utilizado para aprofundar conceitos como componentização, gerenciamento de estado, manipulação de listas, criação e remoção de tarefas e construção de interfaces responsivas voltadas à produtividade.",
        tecnologias: ["React", "Tailwind CSS", "JavaScript / TypeScript", "Vite"],
        imagem: "img/FotoProjeto4.jpeg",
        link: "https://github.com/ryansantosz/curso-de-react-yt"
    }

];

let projetosCarregados = false;

function carregarOutrosProjetos() {
    if (projetosCarregados) return;

    const container = document.getElementById('carousel-projects-container');
    if (!container) return;

    const htmlOutros = outrosProjetos.map(projeto => {
        const badges = projeto.tecnologias.map(tech => 
            `<span class="badge rounded-pill bg-dark border border-cyan me-2">${tech}</span>`
        ).join('');

        return `
            <div class="carousel-item">
                <div class="row align-items-center">
                    <div class="col-lg-6 pe-lg-5 order-2 order-lg-1">
                        <span class="brand-color fw-bold">${projeto.subtitulo}</span>
                        <h3 class="display-6 fw-bold mb-3 text-white">${projeto.titulo}</h3>
                        <p class="text-white-50">${projeto.descricao}</p>
                        <div class="mt-4 mb-4">${badges}</div>
                    </div>
                    <div class="col-lg-6 order-1 order-lg-2">
                        <div class="project-img-container">
                            <img src="${projeto.imagem}" class="d-block w-100 rounded-4" alt="${projeto.titulo}">
                            <a href="${projeto.link}" target="_blank" class="project-overlay">
                                <span class="fw-bold">IR ATÉ O PROJETO? <i class="fas fa-external-link-alt ms-2"></i></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>`;
    }).join('');

    container.innerHTML += htmlOutros;
    projetosCarregados = true;
    
    // Removi o dispose/init manual pois o Bootstrap 5 lida bem com itens injetados 
    // se as classes 'carousel-item' estiverem corretas.
}

// Inicialização Única
document.addEventListener("DOMContentLoaded", () => {
    type();

    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const carouselElement = document.getElementById('carousel-projects-container');

    const carousel = new bootstrap.Carousel(carouselElement);

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const primeiraCarga = !projetosCarregados;
            carregarOutrosProjetos();

            if (primeiraCarga) {
                carousel.next(); 
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const primeiraCarga = !projetosCarregados;
            carregarOutrosProjetos();

            if (primeiraCarga) {
                carousel.prev();
            }
        });
    }
});

// Atualiza o link ativo na navbar ao rolar a página
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// --- Função de Scroll Suave Manual (Controle de Velocidade) ---
function smoothScrollTo(targetSelector, duration) {
    const target = document.querySelector(targetSelector);
    if (!target) return;

    const targetPosition = target.offsetTop - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Função de "Ease" para aceleração e desaceleração suave
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Intercepta os cliques nos links
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        
        if (targetId.startsWith('#')) {
            e.preventDefault();
            smoothScrollTo(targetId, 1000); // 1000ms = 1 segundo de duração

            // Fecha o menu mobile
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                new bootstrap.Collapse(navbarCollapse).hide();
            }
        }
    });
});

// --- Atualização do Link Ativo Corrigida ---
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 90; // Ajuste para detectar a seção antes
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        // Verifica se o href do link é igual ao id da seção atual
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});