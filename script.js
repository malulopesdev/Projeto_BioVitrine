// Seleciona todos os botões de produtos
const btnProdutos = document.querySelectorAll(".product-card button");

// Seleciona modal e elementos dentro dele
const modal = document.getElementById("modal-marcas"); // Modal
const marcasList = document.getElementById("marcas-list"); // Lista de marcas no modal
const closeModal = document.querySelector(".close"); // Botão de fechar modal

// Lista de marcas por categoria
const marcas = {
    cabelos: ["Marca X", "Marca Y", "Marca W"],
    higiene: ["Marca X", "Marca Y", "Marca W"],
    maquiagem: ["Marca X", "Marca Y", "Marca W"],
    skincare: ["Marca X", "Marca Y", "Marca W"]
};

// Adiciona evento de clique em cada botão
btnProdutos.forEach(btn => {
    btn.addEventListener("click", () => {
        const categoria = btn.getAttribute("data-produto"); // Pega categoria do botão
        mostrarMarcas(categoria); // Chama função para mostrar marcas
    });
});

// Função que mostra marcas no modal
function mostrarMarcas(categoria) {
    marcasList.innerHTML = ""; // Limpa lista antes de adicionar
    marcas[categoria].forEach(marca => {
        const li = document.createElement("li"); // Cria item da lista
        li.textContent = marca; // Adiciona nome da marca
        marcasList.appendChild(li); // Adiciona à lista no modal
    });
    modal.style.display = "block"; // Mostra o modal
}

// Fecha modal ao clicar no X
closeModal.addEventListener("click", () => {
    modal.style.display = "none"; // Esconde modal
});

// Fecha modal ao clicar fora do conteúdo
window.addEventListener("click", (e) => {
    if(e.target === modal){
        modal.style.display = "none"; // Esconde modal
    }
});

