const inputContent = document.querySelector('.add-content .add-input') as HTMLInputElement
const form = document.querySelector('form') as HTMLFormElement
const todos = document.querySelector('.list-todo') as HTMLElement
const checkBox = document.querySelector('.checkbox') as HTMLInputElement
const all = 'all'
const active = 'active'
const completed = 'completed'
const buttonAll = document.getElementById(all) as HTMLButtonElement
const buttonActive = document.getElementById(active) as HTMLButtonElement
const buttonCompleted = document.getElementById(completed) as HTMLButtonElement

interface Todo {
  text: string;
  status: string
}
form.addEventListener('submit', (e) => {
  e.preventDefault( )
  let contentValue: string = inputContent.value.trim()
  if (contentValue) {
    addTodoElement({
      text: contentValue,
      status: ''
    })
    checkActive()
    saveTodoList()
  }
  inputContent.value = ''
})
function addTodoElement(todo: Todo) {
  let liTodo = document.createElement('li')

  liTodo.innerHTML = `
    <span class='${todo.status}'>${todo.text}</span>
    <input
      type="text"
      value="${todo.text}"
      class="add-input hidden"
    />
    <span>
      <i class="fa fa-times-circle" aria-hidden="true"></i>
    </span>
  `
  liTodo.setAttribute('class', 'item-todo general-size')
  todos.appendChild(liTodo)

  //tick completed a todo
  let spanTodo = liTodo.querySelector('span:first-child') as HTMLElement
  spanTodo.addEventListener('click', function() {
    this.classList.toggle('completed')
    checkActive()
    tickAllTodo()
    count()
    saveTodoList()
  })

  deleteATodo()
  editTodo()
  tickAllTodo()
  hiddenFooter()
  getActive()
  count()
  deleteCompleted()
}
function deleteATodo() {
  let itemTodos = document.querySelectorAll('.item-todo')
  itemTodos.forEach(item => {
    (item.querySelector('span:last-child') as HTMLElement)
      .addEventListener('click', function() {
        (this.parentElement as HTMLElement).remove()
        tickAllTodo()
        hiddenFooter()
        count()
        saveTodoList()
      })
  })
}
function editTodo() {
  let itemTodos = document.querySelectorAll('.item-todo')
  itemTodos.forEach(item => {
    let spanTodo = item.querySelector('span:first-child') as HTMLElement
    spanTodo.addEventListener('dblclick', function() {
      this.classList.add('hidden')
      if (spanTodo.classList.contains('hidden')) {
        let editTodo = item.querySelector('.add-input') as HTMLInputElement
        editTodo.classList.remove('hidden')
        editTodo.focus()
        editTodo.setSelectionRange(editTodo.value.length, editTodo.value.length);
        editTodo.addEventListener('keyup', (e) => {
          if (e.key === 'Enter' && editTodo.value === '') {
            (this.parentElement as HTMLElement).remove()
            spanTodo.innerText = editTodo.value.trim()
            spanTodo.classList.remove('hidden')
            editTodo.classList.add('hidden')
            saveTodoList()
            count()
          }
        })
        editTodo.addEventListener('blur', () => {
          if (editTodo.value === '') {
            (this.parentElement as HTMLElement).remove()
            count()
          }
          spanTodo.innerText = editTodo.value.trim()
          editTodo.classList.add('hidden')
          spanTodo.classList.remove('hidden')
          saveTodoList()
        })
      }
    })
  })
}
function tickAllTodo() {
  let listAllSpan = document.querySelectorAll('.item-todo span:first-child')
  let listAllSpanComplete = document.querySelectorAll('.item-todo .completed')
  checkBox.checked = false
  //if there isn't value then hidden
  if (listAllSpan.length === 0) {
    checkBox.style.opacity = '0';
  }else {
    checkBox.style.opacity = '1';
  }
  //if all span completed then checked checkbox
  if (listAllSpan.length === listAllSpanComplete.length) {
    checkBox.checked = true
  }
  checkBox.addEventListener('click', function() {
    if (this.checked) {
      listAllSpan.forEach(item => {
        if (!item.classList.contains('completed')) {
          item.classList.add('completed');
          checkActive()
          count()
          saveTodoList()
        }
      })
    } else {
      listAllSpan.forEach(item => {
        if (item.classList.contains('completed')) {
          item.classList.remove('completed');
          checkActive()
          count()
          saveTodoList()
        }
      })
    }
  })
}
function hiddenFooter() {
  let itemTodos = document.querySelectorAll('.item-todo')
  let stat = document.querySelector('.stat') as HTMLElement
  let footer = document.querySelector('footer') as HTMLElement

  if (itemTodos.length === 0) {
    stat.classList.add('hidden')
    footer.classList.add('hidden')
  } else {
    stat.classList.remove('hidden')
    footer.classList.remove('hidden')
  }
}
function getActive() {
  let itemTodos = document.querySelectorAll('.item-todo')

  //button all
  buttonAll.addEventListener('click', function() {
    this.classList.add('on')
    buttonActive.classList.remove('on')
    buttonCompleted.classList.remove('on')

    itemTodos.forEach(item => {
      if (item.classList.contains('hidden')) {
        item.classList.remove('hidden')
      }
    })
  })
  //button active
  buttonActive.addEventListener('click', function() {
    this.classList.add('on')
    buttonAll.classList.remove('on')
    buttonCompleted.classList.remove('on')

    itemTodos.forEach(item => {
      if ((item.querySelector('span:first-child') as HTMLElement).classList.contains('completed')) {
        item.classList.add('hidden')
      } else {
        item.classList.remove('hidden')
      }
    })
  })
  //button completed
  buttonCompleted.addEventListener('click', function() {
    this.classList.add('on')
    buttonAll.classList.remove('on')
    buttonActive.classList.remove('on')

    itemTodos.forEach(item => {
      if ((item.querySelector('span:first-child') as HTMLElement).classList.contains('completed')) {
        item.classList.remove('hidden')
      } else {
        item.classList.add('hidden')
      }
    })
  })
}
function checkActive() {
  let liTodo = document.querySelectorAll('.item-todo')
  liTodo.forEach(item => {
    let spanTodo = item.querySelector('span:first-child') as HTMLElement

    if (buttonActive.classList.contains('on')) {
      if (spanTodo.classList.contains('completed')) {
        item.classList.add('hidden')
      } else {
        item.classList.remove('hidden')
      }
    } else if (buttonCompleted.classList.contains('on')) {
      if (!spanTodo.classList.contains('completed')) {
        item.classList.add('hidden')
      } else {
        item.classList.remove('hidden')
      }
    }
  })
}
function count() {
  let listAllSpan = document.querySelectorAll('.item-todo span:first-child')
  let listSpanCompleted = document.querySelectorAll('.item-todo .completed')
  let countNumber = document.querySelector('.number-item') as HTMLElement
  let count = listAllSpan.length - listSpanCompleted.length

  countNumber.innerHTML = `${count}`
}
function deleteCompleted() {
  let buttonClearCompleted = document.querySelector('#clear-completed') as HTMLButtonElement

  buttonClearCompleted.addEventListener('click', function () {
    let listSpanCompleted = document.querySelectorAll('.item-todo .completed')
    listSpanCompleted.forEach(item => {
      (item.parentElement as HTMLElement).remove()
      hiddenFooter()
      tickAllTodo()
      saveTodoList()
    })
  })
}
function saveTodoList() {
  let todoList = document.querySelectorAll('.item-todo')
  let todoStorage: Todo[] = []
  todoList.forEach((item) => {
    let text = (item.querySelector('span:first-child') as HTMLElement).innerText
    let status = ((item.querySelector('span:first-child') as HTMLElement).getAttribute('class') as string)

    todoStorage.push({
      text,
      status
    })
  })
  localStorage.setItem('todoList', JSON.stringify(todoStorage))
}
function init() {
  let data: Todo[] = JSON.parse(localStorage.getItem('todoList') || "[]")
  data.forEach(item => {
    addTodoElement(item)
  })
}
init()
