// Espera o carregamento total do HTML antes de rodar o JS
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("tarefaInput");               // Pega o input de texto (onde o usuário digita a tarefa)
  const btnAdicionar = document.getElementById("btnAdicionar");       // Pega o botão "Adicionar"
  const btnRemoverTodos = document.getElementById("btnRemoverTodos"); // Pega o botão "Adicionar"
  const grupoTarefas = document.getElementById("grupoTarefas");       // Pega o <optgroup> onde as opções (tarefas) serão inseridas
  const select = document.getElementById("tarefas");                  // Pega o próprio <select> (usaremos para controlar o "size")
  const pesquisar = document.getElementById("pesquisar");             // Campo de pesquisa
  const dica = document.getElementById("dica");                       // Parágrafo de dica para o usuário
  const key = "minhasTarefas";                                        // Chave para salvar no localStorage


  // ---------- FUNÇÕES AUXILIARES ----------

  // Salva todas as tarefas no localStorage
  function salvarTarefas() {
    const tarefas = Array.from(grupoTarefas.querySelectorAll("option")).map(opt => opt.textContent); // Prmeiro pega todas as opções e transforma em array, depois mapeia só o texto
    localStorage.setItem(key, JSON.stringify(tarefas)); // Salva como string JSON o array de tarefas
  }

  // Carrega as tarefas salvas e recria na lista
  function carregarTarefas() {
    const tarefasSalvas = JSON.parse(localStorage.getItem(key)) || []; // Pega as tarefas salvas ou um array vazio se não houver
    tarefasSalvas.forEach(texto => criarTarefa(texto)); // Para cada tarefa salva, cria uma nova opção
    atualizarTamanhoLista();
  }

  // Função para atualizar o tamanho do select (sempre caber todas as tarefas)
  function atualizarTamanhoLista() {
    const total = grupoTarefas.querySelectorAll("option").length;  // Conta quantas opções existem dentro do optgroup
    // Atualiza o atributo size do select para o total de tarefas 
    select.size = total + 1;                                       // +1 para dar um espaço extra para o titulo do select
    pesquisar.style.display = total > 1 ? "block" : "none";        // Exibe campo de pesquisa só se houver mais de 1 tarefa
    dica.style.display = total > 0 ? "block" : "none";             // Exibe a dica só se houver pelo menos 1 tarefa
    select.style.display = total > 0 ? "block" : "none";           // Exibe o select só se houver pelo menos 1 tarefa
  }

  // Cria uma <option> com evento de remoção
  function criarTarefa(texto) {
    const novaTarefa = document.createElement("option");         // Cria uma nova opção 
    novaTarefa.textContent = texto;                              // Texto visível da opção
    novaTarefa.value = texto.toLowerCase().replace(/\s+/g, "_"); // Valor em minúsculo com underscores no lugar dos espaços
    grupoTarefas.appendChild(novaTarefa);                        // Adiciona a nova tarefa no optgroup

    // Evento de remover ao clicar
    novaTarefa.addEventListener("click", () => {
      grupoTarefas.removeChild(novaTarefa); // Remove a tarefa clicada 
      atualizarTamanhoLista();              // Ajusta o tamanho depois de remover
      salvarTarefas();                      // Salva depois de remover
    });
  }

  // ---------- FUNÇÕES PRINCIPAIS ----------

  function adicionarTarefa() {
    const texto = input.value.trim(); // Pega o texto digitado e remove espaços extras no começo/fim
    if (texto === "") return;         // Se estiver vazio, não faz nada
    criarTarefa(texto);               // Cria e adiciona no select
    input.value = "";                 // Limpa o input
    atualizarTamanhoLista();          // Ajusta o tamanho após adicionar
    salvarTarefas();                  // Salva no localStorage
  }

  // Função para adicionar uma nova tarefa
  function limparLista() {
    grupoTarefas.innerHTML = ""; // Remove todas as tarefas
    localStorage.clear();        // Limpa o localStorage
    atualizarTamanhoLista();     // Ajusta o tamanho após remover
  }

  // ---------- FILTRO DE PESQUISA ----------

  // Filtro de pesquisa em tempo real
  pesquisar.addEventListener("input", () => {
    const termo = pesquisar.value.toLowerCase(); // Pega o termo digitado e transforma em minúsculo
    // Para cada opção, verifica se o texto inclui o termo pesquisado
    grupoTarefas.querySelectorAll("option").forEach(opt => {
      const texto = opt.textContent.toLowerCase(); // Texto da opção em minúsculo
      // Se incluir, exibe; se não, esconde
      opt.style.display = texto.includes(termo) ? "block" : "none"; // Usar "block" para manter o espaço, "none" para esconder
    });
  });

  btnAdicionar.addEventListener("click", adicionarTarefa); // Quando clicar no botão "Adicionar", chama a função
  btnRemoverTodos.addEventListener("click", limparLista);  // Quando clicar no botão "Limpar", chama a função

  // Se o usuário apertar Enter dentro do input, também adiciona a tarefa
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") adicionarTarefa();
  });

  // ---------- INICIALIZAÇÃO ----------
  carregarTarefas(); // Restaura tarefas salvas ao carregar a página
});

// Construindo rodapé com renderização dinamica
let body = document.querySelector("html");
let rodape = document.createElement("footer");
rodape.innerHTML = `<em>Copyright © 2025 by Ramon Aguiar Valverde</em>`;
body.insertAdjacentElement("beforeend", rodape);

/*
  // Adiciona evento de remoção para as tarefas que já estavam no HTML inicialmente
  grupoTarefas.querySelectorAll("option").forEach(opt => {
    opt.addEventListener("click", () => {
      grupoTarefas.removeChild(opt);
      atualizarTamanhoLista(); // Ajusta depois de remover
    });
  });
*/

