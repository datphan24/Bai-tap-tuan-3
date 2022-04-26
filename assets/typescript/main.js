var inputContent = document.querySelector('.add-content .add-input');
var form = document.querySelector('form');
var todos = document.querySelector('.list-todo');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    var contentValue = inputContent.value.trim();
    if (contentValue) {
        addTodoElement({
            text: contentValue,
            status: ''
        });
    }
    inputContent.value = '';
});
function addTodoElement(todo) {
    var liTodo = document.createElement('li');
    liTodo.innerHTML = "\n    <span class='".concat(todo.status, "'>").concat(todo.text, "</span>\n    <input\n      type=\"text\"\n      value=\"").concat(todo.text, "\"\n      class=\"add-input hidden\"\n    />\n    <span>\n      <i class=\"fa fa-times-circle\" aria-hidden=\"true\"></i>\n    </span>\n  ");
    liTodo.setAttribute('class', 'item-todo general-size');
    todos.appendChild(liTodo);
    //tick a todo completed
    var spanTodo = liTodo.querySelector('span:first-child');
    spanTodo.addEventListener('click', function (e) {
        this.classList.toggle('completed');
    });
    deleteATodo();
}
function deleteATodo() {
    var itemTodos = document.querySelectorAll('.item-todo');
    itemTodos.forEach(function (item) {
        item.querySelector('span:last-child')
            .addEventListener('click', function (e) {
            this.parentElement.remove();
        });
    });
}
