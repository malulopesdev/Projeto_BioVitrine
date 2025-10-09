// ===============================================
// 1. FUNCIONALIDADE DO CARROSSEL (SLIDER) - HOME
// ===============================================

// Verifica se os elementos do carrossel existem para evitar erros em outras páginas
if (document.querySelector('.slider-container')) {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    const dotsContainer = document.querySelector('.slider-dots');
    const totalSlides = slides.length;
    let currentIndex = 0;

    // Função para atualizar a posição do slider
    function updateSlider() {
        const offset = -currentIndex * 100;
        sliderWrapper.style.transform = `translateX(${offset}%)`;
        updateDots();
    }

    // Função para avançar para o próximo slide
    function goToNextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }

    // Função para voltar para o slide anterior
    function goToPrevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    // Cria os pontos de navegação (dots)
    function createDots() {
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.setAttribute('data-index', i);
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateSlider();
            });
            dotsContainer.appendChild(dot);
        }
        updateDots();
    }

    // Atualiza o estado ativo dos pontos
    function updateDots() {
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Adiciona eventos aos botões
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', goToPrevSlide);
        nextButton.addEventListener('click', goToNextSlide);
    }
    
    // Inicializa o carrossel
    createDots();
    // Inicia o auto-play (transição a cada 5 segundos)
    setInterval(goToNextSlide, 5000); 
}


// ===============================================
// 2. MODAL DE MARCAS - PRODUTOS
// ===============================================

// Seleciona elementos do modal de marcas
const btnProdutos = document.querySelectorAll(".product-card button");
const modalMarcas = document.getElementById("modal-marcas");
const marcasList = document.getElementById("marcas-list");
const closeModalMarcas = modalMarcas ? modalMarcas.querySelector(".close") : null;
const modalTitulo = document.getElementById("modal-categoria-titulo"); 

// Lista de marcas por categoria com links (como solicitado pelo usuário)
const marcas = {
    cabelos: [
        { nome: "Bothanico Cosméticos", link: "https://www.bothanicocosmeticos.com.br/" },
        { nome: "WNF", link: "https://www.wnf.com.br/" },
        { nome: "Livealoe", link: "https://www.livealoe.com.br/esfoliante-natural-120-ml?srsltid=AfmBOoqzszGhaNFvQIio78zM1S0_yMU1VJyB0ujLqPhmq7zj7lza0ta7" }
    ],
    higiene: [
        { nome: "Korui", link: "https://korui.com.br/" },
        { nome: "Inciclo", link: "https://www.inciclo.com/" },
        { nome: "Peter Paiva", link: "https://www.lojapeterpaiva.com.br/" }
    ],
    maquiagem: [
        { nome: "Amo Karité", link: "https://amokarite.com.br/" },
        { nome: "DC Beauty", link: "https://dcbeauty.dooca.store/" },
        { nome: "Elementais do Cerrado", link: "https://www.elementaisdocerrado.com/" }
    ],
    skincare: [
        { nome: "ADCOS", link: "https://www.lojaadcos.com.br/" },
        { nome: "Ekilibre Amazônia", link: "https://www.ekilibreamazonia.com/" },
        { nome: "Livealoe", link: "https://www.livealoe.com.br/esfoliante-natural-120-ml?srsltid=AfmBOoqzszGhaNFvQIio78zM1S0_yMU1VJyB0ujLqPhmq7zj7lza0ta7" }
    ]
};

// Função que mostra marcas no modal
function mostrarMarcas(categoria) {
    if (!marcasList || !modalMarcas || !modalTitulo) return; // Garante que estamos na página produtos.html

    marcasList.innerHTML = "";
    let categoriaFormatada = categoria.charAt(0).toUpperCase() + categoria.slice(1);
    
    // Ajuste o nome da categoria para o título do modal
    if (categoria === "higiene") {
        categoriaFormatada = "Higiene Íntima";
    }
    modalTitulo.textContent = categoriaFormatada;

    // Cria os links clicáveis
    (marcas[categoria] || []).forEach(marca => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        
        a.textContent = marca.nome;
        a.href = marca.link;
        a.target = "_blank"; // Abre o link em uma nova aba
        
        li.appendChild(a);
        marcasList.appendChild(li);
    });
    modalMarcas.style.display = "block"; // Mostra o modal
}


// Adiciona evento de clique em cada botão de produto
btnProdutos.forEach(btn => {
    btn.addEventListener("click", () => {
        const categoria = btn.getAttribute("data-produto");
        mostrarMarcas(categoria);
    });
});

// Fecha modal de marcas ao clicar no X
if (closeModalMarcas) {
    closeModalMarcas.addEventListener("click", () => {
        modalMarcas.style.display = "none";
    });
}

// Fecha o modal de marcas se o usuário clicar fora dele
if (modalMarcas) {
    window.addEventListener("click", (event) => {
        if (event.target == modalMarcas) {
            modalMarcas.style.display = "none";
        }
    });
}


// ===============================================
// 3. MODAL DO CARRINHO (Usado em todas as páginas)
// ===============================================

const openCarrinho = document.getElementById('open-carrinho');
const modalCarrinho = document.getElementById('modal-carrinho');
const closeCarrinho = modalCarrinho ? modalCarrinho.querySelector('.close-carrinho') : null;
const btnContinuar = modalCarrinho ? modalCarrinho.querySelector('.btn-continuar-comprando') : null;

if (openCarrinho && modalCarrinho) {
    // Abre o modal
    openCarrinho.addEventListener('click', (e) => {
        e.preventDefault();
        modalCarrinho.style.display = 'block';
    });
    
    // Fecha o modal no X
    if (closeCarrinho) {
        closeCarrinho.addEventListener('click', () => {
            modalCarrinho.style.display = 'none';
        });
    }

    // Fecha o modal no botão "Continuar comprando"
    if (btnContinuar) {
        btnContinuar.addEventListener('click', () => {
            modalCarrinho.style.display = 'none';
        });
    }

    // Fecha o modal se o usuário clicar fora dele
    window.addEventListener('click', (event) => {
        if (event.target === modalCarrinho) {
            modalCarrinho.style.display = 'none';
        }
    });
}