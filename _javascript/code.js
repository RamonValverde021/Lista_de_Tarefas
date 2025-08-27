// Espera o carregamento total do HTML antes de rodar o JS
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("tarefaInput");               // Pega o input de texto (onde o usuário digita a tarefa)
  const btnAdicionar = document.getElementById("btnAdicionar");       // Pega o botão "Adicionar"
  const btnRemoverTodos = document.getElementById("btnRemoverTodos"); // Pega o botão "Adicionar"
  const grupoTarefas = document.getElementById("grupoTarefas");       // Pega o <optgroup> onde as opções (tarefas) serão inseridas
  const select = document.getElementById("tarefas");                  // Pega o próprio <select> (usaremos para controlar o "size")

  // Função para atualizar o tamanho do select (sempre caber todas as tarefas)
  function atualizarTamanhoLista() {
    const total = grupoTarefas.querySelectorAll("option").length; // Conta quantas opções existem dentro do optgroup
    // Atualiza o atributo size do select para o total de tarefas 
    select.size = total + 1; // +1 para dar um espaço extra para o titulo do select
  }

  // Função para adicionar uma nova tarefa
  function adicionarTarefa() {
    const texto = input.value.trim();                            // Pega o texto digitado e remove espaços extras
    if (texto === "") return;                                    // Se estiver vazio, não faz nada
    const novaTarefa = document.createElement("option");         // Cria um novo <option>
    novaTarefa.textContent = texto;                              // Define o texto que aparece na tela
    novaTarefa.value = texto.toLowerCase().replace(/\s+/g, "_"); // Define um value "seguro" (sem espaços, minúsculo)

    // Adiciona evento: se o usuário clicar nessa opção, ela é removida
    novaTarefa.addEventListener("click", () => {
      grupoTarefas.removeChild(novaTarefa); // Remove o elemento escolhido
      atualizarTamanhoLista();              // Ajusta o tamanho após remover
    });

    grupoTarefas.appendChild(novaTarefa); // Coloca essa nova tarefa dentro do optgroup
    input.value = "";                     // Limpa o campo de entrada para o usuário digitar outra
    atualizarTamanhoLista();              // Atualiza o tamanho do select
  }

   // Função para adicionar uma nova tarefa
  function limparLista() {
    grupoTarefas.innerHTML = ""; // Remove todas as tarefas
    atualizarTamanhoLista();     // Ajusta o tamanho após remover
  }

  btnAdicionar.addEventListener("click", adicionarTarefa); // Quando clicar no botão "Adicionar", chama a função
  btnRemoverTodos.addEventListener("click", limparLista);  // Quando clicar no botão "Limpar", chama a função

  // Se o usuário apertar Enter dentro do input, também adiciona a tarefa
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") adicionarTarefa();
  });

  // Adiciona evento de remoção para as tarefas que já estavam no HTML inicialmente
  grupoTarefas.querySelectorAll("option").forEach(opt => {
    opt.addEventListener("click", () => {
      grupoTarefas.removeChild(opt);
      atualizarTamanhoLista(); // Ajusta depois de remover
    });
  });

  atualizarTamanhoLista(); // Atualiza o tamanho da lista logo no início (para refletir as tarefas iniciais)
});
