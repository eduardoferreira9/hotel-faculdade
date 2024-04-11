// Função para criar o calendário
function createCalendar() {
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  let selectionStart = null;
  let selectionEnd = null;

  const calendarElement = document.querySelector('.calendar');

  // Adiciona os botões de navegação
  const nav = document.createElement('div');
  nav.classList.add('calendar-nav');
  const prevButton = document.createElement('button');
  prevButton.textContent = 'Antes';
  const nextButton = document.createElement('button');
  nextButton.textContent = 'Próximo';
  nav.appendChild(prevButton);
  nav.appendChild(nextButton);
  calendarElement.appendChild(nav);

  const header = document.createElement('div');
  header.classList.add('calendar-header');
  calendarElement.appendChild(header);

  const grid = document.createElement('div');
  grid.classList.add('calendar-grid');
  calendarElement.appendChild(grid);

  prevButton.addEventListener('click', () => {
      currentMonth--;
      if (currentMonth < 0) {
          currentMonth = 11;
          currentYear--;
      }
      renderCalendar(currentYear, currentMonth);
  });

  nextButton.addEventListener('click', () => {
      currentMonth++;
      if (currentMonth > 11) {
          currentMonth = 0;
          currentYear++;
      }
      renderCalendar(currentYear, currentMonth);
  });

  // Adiciona um evento de clique para limpar a seleção atual
  calendarElement.addEventListener('click', (event) => {
      if (!event.target.classList.contains('calendar-cell')) {
          clearSelection();
      }
  });

  // Renderiza o calendário inicial
  renderCalendar(currentYear, currentMonth);

  function renderCalendar(year, month) {
      // Atualiza o cabeçalho do calendário
      header.innerHTML = `<h2>${months[month]} ${year}</h2>`;

      // Limpa o conteúdo do grid do calendário antes de renderizar
      grid.innerHTML = '';

      const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

      // Cria os cabeçalhos dos dias da semana
      daysOfWeek.forEach(day => {
          const cell = document.createElement('div');
          cell.classList.add('calendar-cell');
          cell.textContent = day;
          grid.appendChild(cell);
      });

      // Obter o primeiro dia do mês
      const firstDayOfMonth = new Date(year, month, 1);
      const startingDay = firstDayOfMonth.getDay();

      // Obter o último dia do mês
      const lastDayOfMonth = new Date(year, month + 1, 0);
      const totalDays = lastDayOfMonth.getDate();

      // Adiciona células vazias para preencher os dias do mês anterior
      for (let i = 0; i < startingDay; i++) {
          const cell = document.createElement('div');
          cell.classList.add('calendar-cell');
          grid.appendChild(cell);
      }

      // Adiciona os dias do mês atual
      for (let i = 1; i <= totalDays; i++) {
          const cell = document.createElement('div');
          cell.classList.add('calendar-cell');
          cell.textContent = i;
          cell.addEventListener('click', () => {
              toggleDateSelection(cell, year, month, i);
          });
          grid.appendChild(cell);
      }
  }

  function toggleDateSelection(cell, year, month, day) {
      const date = new Date(year, month, day);
      if (!selectionStart || (selectionStart && selectionEnd)) {
          // Iniciar uma nova seleção se não houver seleção anterior ou se a seleção anterior estiver completa
          selectionStart = date;
          selectionEnd = null;
      } else if (date < selectionStart) {
          // Iniciar uma nova seleção se a data for anterior à data de início atual
          selectionStart = date;
          selectionEnd = null;
      } else if (date > selectionStart && !selectionEnd) {
          // Continuar a seleção se a data estiver depois da data de início e não houver data de término
          selectionEnd = date;
      } else {
          // Finalizar a seleção se já houver uma data de início e uma data de término
          selectionEnd = null;
          selectionStart = date;
      }
      updateSelectedDates();
  }

  function updateSelectedDates() {
      const cells = document.querySelectorAll('.calendar-cell');
      cells.forEach(cell => {
          const cellDate = new Date(currentYear, currentMonth, parseInt(cell.textContent));
          if (selectionStart && selectionEnd) {
              const start = new Date(Math.min(selectionStart.getTime(), selectionEnd.getTime()));
              const end = new Date(Math.max(selectionStart.getTime(), selectionEnd.getTime()));
              const currentDate = new Date(currentYear, currentMonth, parseInt(cell.textContent));
              if (currentDate >= start && currentDate <= end) {
                  cell.classList.add('selected');
              } else {
                  cell.classList.remove('selected');
              }
          } else if (selectionStart && !selectionEnd) {
              if (cellDate.getTime() === selectionStart.getTime()) {
                  cell.classList.add('selected');
              } else {
                  cell.classList.remove('selected');
              }
          } else {
              cell.classList.remove('selected');
          }
      });
  }

  function clearSelection() {
      const cells = document.querySelectorAll('.calendar-cell');
      cells.forEach(cell => {
          cell.classList.remove('selected');
      });
      selectionStart = null;
      selectionEnd = null;
  }
}

// Chama a função para criar o calendário
createCalendar();

// Função para adicionar na tabela
function adicionarNaTabela() {
    var nome = document.getElementById("nome").value;
    var sobrenome = document.getElementById("sobrenome").value;
    var cpf = document.getElementById("inputCPF").value;
    var faixaEtariaRadios = document.getElementsByName("faixaEtaria");
    var faixaEtaria;
  
    if (nome && sobrenome && cpf) {
      if (!verificarCPFRepetido(cpf)) {
        for (var i = 0; i < faixaEtariaRadios.length; i++) {
          if (faixaEtariaRadios[i].checked) {
            faixaEtaria = faixaEtariaRadios[i].value;
            break;
          }
        }
  
        var table = document.getElementById("minhaTabela").getElementsByTagName('tbody')[0];
        var newRow = table.insertRow();
  
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);
  
        cell1.innerHTML = nome;
        cell2.innerHTML = sobrenome;
        cell3.innerHTML = cpf;
        cell4.innerHTML = faixaEtaria;
      } else {
        alert("CPF já existe na tabela. Por favor, insira um CPF diferente.");
      }
    } else {
      alert("Por favor, preencha todos os campos antes de adicionar à tabela.");
    }
  }
  
  // Função para verificar se o CPF já está na tabela
  function verificarCPFRepetido(cpf) {
    var table = document.getElementById("minhaTabela").getElementsByTagName('tbody')[0];
    for (var i = 0; i < table.rows.length; i++) {
      if (table.rows[i].cells[2].innerHTML === cpf) {
        return true; // CPF encontrado na tabela
      }
    }
    return false; // CPF não encontrado na tabela
  }
  
  // Função para formatar CPF com máscara
  function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    cpf = cpf.slice(0, 11);
    cpf = cpf.replace(/^(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
    cpf = cpf.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
    return cpf;
  }
  
  // Função a ser executada quando o documento HTML estiver totalmente carregado
  document.addEventListener("DOMContentLoaded", function() {
    var inputCPF = document.getElementById("inputCPF");
    inputCPF.addEventListener("input", function(event) {
      inputCPF.value = formatarCPF(inputCPF.value);
    });
  
    document.getElementById("enviarButton").addEventListener("click", adicionarNaTabela);
  });

  $(document).ready(function(){
    $("#loginLink").click(function(){
      $("#loginModal").modal('show');
    });
  });

  // Função para coletar os dados da tabela e os dias selecionados no calendário
function enviarParaBancoDeDados() {
  // Coletar dados da tabela
  var tabelaData = [];
  var table = document.getElementById("minhaTabela").getElementsByTagName('tbody')[0];
  for (var i = 0; i < table.rows.length; i++) {
      var rowData = [];
      for (var j = 0; j < table.rows[i].cells.length; j++) {
          rowData.push(table.rows[i].cells[j].innerHTML);
      }
      tabelaData.push(rowData);
  }

  // Coletar dias selecionados no calendário
  var diasSelecionados = [];
  var selectedCells = document.querySelectorAll('.calendar-cell.selected');
  selectedCells.forEach(cell => {
      diasSelecionados.push(parseInt(cell.textContent));
  });

  // Aqui você deve enviar os dados para o seu backend
  // Por exemplo, usando AJAX para enviar os dados para um servidor
  // Neste exemplo, estou apenas exibindo os dados no console e uma mensagem de confirmação
  console.log("Dados da tabela:", tabelaData);
  console.log("Dias selecionados:", diasSelecionados);

  // Simulando uma reserva bem-sucedida (você precisa implementar a lógica real)
  var reservaBemSucedida = true;

  if (reservaBemSucedida) {
      alert("Reserva bem-sucedida! Sua reserva foi confirmada.");
  } else {
      alert("Houve um problema ao processar sua reserva. Por favor, tente novamente mais tarde.");
  }

  // Limpar seleção após o envio
  clearSelection();
}

// Adicione um evento de clique ao botão
document.getElementById("enviarParaBancoButton").addEventListener("click", enviarParaBancoDeDados);
