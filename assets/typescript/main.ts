const inputContent = (<HTMLInputElement>document.querySelector('.add-content .add-input'))
const form = (<HTMLFormElement>document.querySelector('form'))
const todos = (<HTMLElement>document.querySelector('.list-todo'))
const checkBox = document.querySelector('.checkbox');
const all = 'all'
const active = 'active'
const completed = 'completed'
const buttonAll = document.getElementById(all)
const buttonActive = document.getElementById(active)
const buttonCompleted = document.getElementById(completed)

interface todo {
  text: string;
  status: string
}
form.addEventListener('submit', (e) => {
  e.preventDefault()
  let contentValue: string = inputContent.value.trim()
  if (contentValue) {
    addTodoElement({
      text: contentValue,
      status: '',
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
}
