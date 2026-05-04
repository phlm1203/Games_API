// Array global que armazena todos os jogos carregados da API
let todosOsJogos = [];

// Função principal: busca os jogos na API e exibe na tela
async function carregarJogos() {
  const container = document.getElementById("cardsContainer");
  container.innerHTML = "<p>Carregando...</p>";   // Mensagem enquanto carrega

  try {
    
  // URL da API 
    const url = "https://www.freetogame.com/api/games?platform=pc";

  // Usa um proxy para evitar bloqueio de CORS ao fazer a requisição
    const resposta = await fetch("https://corsproxy.io/?url=" + encodeURIComponent(url));
    const jogos = await resposta.json();   // Converte a resposta para JSON

        todosOsJogos = jogos;         // salva para filtrar depois
        renderizarCards(jogos);       // renderiza os cards

  } catch (error) {
  // Se der algum erro na requisição, exibe mensagem de erro
    container.innerHTML = "<p>Erro ao carregar os dados dos jogos.</p>";
    console.error(error);
  }
}

// Função de filtragem por título, gênero ou empresa
function filtrarJogos() {
  const busca = document
    .getElementById("campoBusca")
    .value.toLowerCase();


// Só busca os jogos que tiverem as letras da empresa, gênero ou título
  const filtrados = todosOsJogos.filter(jogo =>
    jogo.title.toLowerCase().includes(busca)    ||
    jogo.genre.toLowerCase().includes(busca)    ||
    jogo.publisher.toLowerCase().includes(busca)  ||
    jogo.release_date.toLowerCase().includes(busca)
  );

  renderizarCards(filtrados); // Atualiza a tela com os resultados filtrados
}

// Recebe uma lista de jogos e cria os cards dinamicamente no HTML
function renderizarCards(jogos) {
  const container = document.getElementById("cardsContainer");
  container.innerHTML = ""; // Limpa os cards anteriores antes de renderizar

// Se não encontrou nenhum jogo, exibe mensagem e encerra a função
    if (jogos.length === 0) {
    container.innerHTML = "<p>Nenhum jogo encontrado.</p>";
    return;
  }

// Para cada jogo, cria um card com suas informações e adiciona no container
  jogos.forEach(jogo => {
    const card = document.createElement("div");
    card.classList.add("card");

// Preenche o card com imagem e detalhes do jogo
    card.innerHTML = `
      <img src="${jogo.thumbnail}" alt="${jogo.title}">
      <div class="card-content">
        <h3>${jogo.title}</h3>
        <p><strong>Plataforma:</strong> ${jogo.platform || "Desconhecida"}</p>
        <p><strong>Gênero:</strong> ${jogo.genre || "Desconhecido"}</p>
        <p><strong>Empresa:</strong> ${jogo.publisher || "Desconhecida"}</p>
        <p><strong>Lançamento:</strong> ${jogo.release_date || "Desconhecida"}</p>
      </div>
    `;

    container.appendChild(card); // Adiciona o card no container da página
  });
}

// Quando a página terminar de carregar, chama a função para buscar os jogos
document.addEventListener("DOMContentLoaded", () => { carregarJogos(); });