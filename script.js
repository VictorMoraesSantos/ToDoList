class TodoList {
  constructor() {
    this.containerToDo = document.querySelector('#todoList');
    this.inputAdd = document.querySelector('#newItemInput'); // ID atualizado
    this.banco = this.getBanco();
    this.initialize();
  }

  getBanco() {
    return JSON.parse(localStorage.getItem('todoList')) ?? [];
  }

  setBanco(banco) {
    localStorage.setItem('todoList', JSON.stringify(banco));
  }

  criarTarefa(text, status, index) {
    const label = document.createElement('label');
    const div = document.createElement('div');
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('data-indice', index);
    if (status === 'checked') {
      input.checked = true;
    }
    const button = document.createElement('input');
    button.setAttribute('type', 'button');
    button.setAttribute('value', 'X');
    button.setAttribute('data-indice', index);
    label.classList.add('todo__item');
    div.textContent = text;
    label.appendChild(input);
    label.appendChild(div);
    label.appendChild(button);
    this.containerToDo.appendChild(label);
  }

  limparTarefa() {
    while (this.containerToDo.firstChild) {
      this.containerToDo.removeChild(this.containerToDo.lastChild);
    }
  }

  atualizarTela() {
    this.limparTarefa();
    this.banco.forEach((item, index) =>
      this.criarTarefa(item.tarefa, item.status, index)
    );
  }

  inserirItem(text) {
    if (text.trim() !== '') {
      this.banco.push({ tarefa: text, status: '' });
      this.setBanco(this.banco);
      this.atualizarTela();
      this.inputAdd.value = '';
    }
  }

  removerItem(index) {
    this.banco.splice(index, 1);
    this.setBanco(this.banco);
    this.atualizarTela();
  }

  atualizarItem(index) {
    this.banco[index].status = this.banco[index].status === '' ? 'checked' : '';
    this.setBanco(this.banco);
    this.atualizarTela();
  }

  clickItem(e) {
    const element = e.target;
    const index = element.getAttribute('data-indice');
    if (element.getAttribute('type') === 'button') {
      this.removerItem(index);
    } else if (element.getAttribute('type') === 'checkbox') {
      this.atualizarItem(index);
    }
  }

  initialize() {
    this.inputAdd.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.inserirItem(e.target.value);
      }
    });

    this.containerToDo.addEventListener('click', (e) => {
      this.clickItem(e);
    });

    this.atualizarTela();
  }
}

const todoList = new TodoList();
