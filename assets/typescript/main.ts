const inputContent = document.querySelector('.add-content .add-input') as HTMLInputElement
const form = document.querySelector('form') as HTMLFormElement
const todos = document.querySelector('.list-todo') as HTMLElement
const checkBox = document.querySelector('.checkbox') as HTMLInputElement

interface todo {
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
  }
  inputContent.value = ''
})
function addTodoElement(todo: todo) {
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
  spanTodo.addEventListener('click', function(e) {
    this.classList.toggle('completed')
  })

  deleteATodo()
  editTodo()
  tickAllTodo()
}
function deleteATodo() {
  let itemTodos = document.querySelectorAll('.item-todo')
  itemTodos.forEach(item => {
    (item.querySelector('span:last-child') as HTMLElement)
      .addEventListener('click', function(e) {
        (this.parentElement as HTMLElement).remove()
      })
  })
}
function editTodo() {
  let itemTodos = document.querySelectorAll('.item-todo')
  itemTodos.forEach(item => {
    let spanTodo = item.querySelector('span:first-child') as HTMLElement
    spanTodo.addEventListener('dblclick', function(e) {
      this.classList.add('hidden')
      if (spanTodo.classList.contains('hidden')) {
        let editTodo = item.querySelector('.add-input') as HTMLInputElement
        editTodo.classList.remove('hidden')
        editTodo.addEventListener('keyup', (e) => {
          if (e.key === 'Enter') {
            spanTodo.innerText = editTodo.value.trim()
            spanTodo.classList.remove('hidden')
            editTodo.classList.add('hidden')
          }
        })
        editTodo.addEventListener('blur', (e) => {
          spanTodo.innerText = editTodo.value.trim()
          editTodo.classList.add('hidden')
          spanTodo.classList.remove('hidden')
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
    if (this.checked == true) {
      listAllSpan.forEach(item => {
        if (!item.classList.contains('completed')) {
          item.classList.add('completed');
        }
      })
    } else {
      listAllSpan.forEach(item => {
        if (item.classList.contains('completed')) {
          item.classList.remove('completed');
        }
      })
    }
  })
}
