var inputContent = document.querySelector('.add-content .add-input');
var form = document.querySelector('form');
var todos = document.querySelector('.list-todo');
var checkBox = document.querySelector('.checkbox');
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
    //tick completed a todo
    var spanTodo = liTodo.querySelector('span:first-child');
    spanTodo.addEventListener('click', function (e) {
        this.classList.toggle('completed');
    });
    deleteATodo();
    editTodo();
    tickAllTodo();
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
function editTodo() {
    var itemTodos = document.querySelectorAll('.item-todo');
    itemTodos.forEach(function (item) {
        var spanTodo = item.querySelector('span:first-child');
        spanTodo.addEventListener('dblclick', function (e) {
            this.classList.add('hidden');
            if (spanTodo.classList.contains('hidden')) {
                var editTodo_1 = item.querySelector('.add-input');
                editTodo_1.classList.remove('hidden');
                editTodo_1.addEventListener('keyup', function (e) {
                    if (e.key === 'Enter') {
                        spanTodo.innerText = editTodo_1.value.trim();
                        spanTodo.classList.remove('hidden');
                        editTodo_1.classList.add('hidden');
                    }
                });
                editTodo_1.addEventListener('blur', function (e) {
                    spanTodo.innerText = editTodo_1.value.trim();
                    editTodo_1.classList.add('hidden');
                    spanTodo.classList.remove('hidden');
                });
            }
        });
    });
}
function tickAllTodo() {
    var listAllSpan = document.querySelectorAll('.item-todo span:first-child');
    var listAllSpanComplete = document.querySelectorAll('.item-todo .completed');
    checkBox.checked = false;
    //if there isn't value then hidden
    if (listAllSpan.length === 0) {
        checkBox.style.opacity = '0';
    }
    else {
        checkBox.style.opacity = '1';
    }
    //if all span completed then checked checkbox
    if (listAllSpan.length === listAllSpanComplete.length) {
        checkBox.checked = true;
    }
    checkBox.addEventListener('click', function () {
        if (this.checked == true) {
            listAllSpan.forEach(function (item) {
                if (!item.classList.contains('completed')) {
                    item.classList.add('completed');
                }
            });
        }
        else {
            listAllSpan.forEach(function (item) {
                if (item.classList.contains('completed')) {
                    item.classList.remove('completed');
                }
            });
        }
    });
}
