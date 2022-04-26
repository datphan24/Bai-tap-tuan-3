const inputContent = document.querySelector('.add-content .add-input') as HTMLInputElement
const form = document.querySelector('form') as HTMLFormElement
const todos = document.querySelector('.list-todo') as HTMLElement

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

  //tick a todo completed
  let spanTodo = liTodo.querySelector('span:first-child') as HTMLElement
  spanTodo.addEventListener('click', function(e) {
    this.classList.toggle('completed')
  })

  deleteATodo()
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
