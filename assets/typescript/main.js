var inputContent = document.querySelector('.add-content .add-input');
var form = document.querySelector('form');
var todos = document.querySelector('.list-todo');
var checkBox = document.querySelector('.checkbox');
var all = 'all';
var active = 'active';
var completed = 'completed';
var buttonAll = document.getElementById(all);
var buttonActive = document.getElementById(active);
var buttonCompleted = document.getElementById(completed);
form.addEventListener('submit', function (e) {
    e.preventDefault();
    var contentValue = inputContent.value.trim();
    if (contentValue) {
        addTodoElement({
            text: contentValue,
            status: ''
        });
        checkActive();
        saveTodoList();
    }
    inputContent.value = '';
});
function addTodoElement(todo) {
    var liTodo = document.createElement('li');
    liTodo.innerHTML = "\n    <span class='".concat(todo.status, "'>").concat(todo.text, "</span>\n    <input\n      type=\"text\"\n      value=\"").concat(todo.text, "\"\n      class=\"add-input hidden\"\n    />\n    <span>\n      <i class=\"fa fa-times-circle\" aria-hidden=\"true\"></i>\n    </span>\n  ");
    liTodo.setAttribute('class', 'item-todo general-size');
    todos.appendChild(liTodo);
    // tick completed a todo
    var spanTodo = liTodo.querySelector('span:first-child');
    spanTodo.addEventListener('click', function () {
        this.classList.toggle('completed');
        checkActive();
        tickAllTodo();
        count();
        saveTodoList();
    });
    deleteATodo();
    editTodo();
    tickAllTodo();
    hiddenFooter();
    getActive();
    count();
    deleteCompleted();
}
function deleteATodo() {
    var todoList = document.querySelectorAll('.item-todo');
    todoList.forEach(function (item) {
        item.querySelector('span:last-child')
            .addEventListener('click', function () {
            this.parentElement.remove();
            tickAllTodo();
            hiddenFooter();
            count();
            saveTodoList();
        });
    });
}
function editTodo() {
    var todoList = document.querySelectorAll('.item-todo');
    todoList.forEach(function (item) {
        var spanTodo = item.querySelector('span:first-child');
        spanTodo.addEventListener('dblclick', function () {
            var _this = this;
            this.classList.add('hidden');
            if (spanTodo.classList.contains('hidden')) {
                var editTodo_1 = item.querySelector('.add-input');
                editTodo_1.classList.remove('hidden');
                editTodo_1.focus();
                editTodo_1.setSelectionRange(editTodo_1.value.length, editTodo_1.value.length);
                editTodo_1.addEventListener('keyup', function (e) {
                    if (e.key === 'Enter') {
                        spanTodo.innerText = editTodo_1.value.trim();
                        spanTodo.classList.remove('hidden');
                        editTodo_1.classList.add('hidden');
                        saveTodoList();
                    }
                });
                editTodo_1.addEventListener('blur', function () {
                    if (editTodo_1.value === '') {
                        _this.parentElement.remove();
                        count();
                    }
                    spanTodo.innerText = editTodo_1.value.trim();
                    editTodo_1.classList.add('hidden');
                    spanTodo.classList.remove('hidden');
                    saveTodoList();
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
        if (this.checked) {
            listAllSpan.forEach(function (item) {
                if (!item.classList.contains('completed')) {
                    item.classList.add('completed');
                    checkActive();
                    count();
                    saveTodoList();
                }
            });
        }
        else {
            listAllSpan.forEach(function (item) {
                if (item.classList.contains('completed')) {
                    item.classList.remove('completed');
                    checkActive();
                    count();
                    saveTodoList();
                }
            });
        }
    });
}
function hiddenFooter() {
    var todoList = document.querySelectorAll('.item-todo');
    var stat = document.querySelector('.stat');
    var footer = document.querySelector('footer');
    if (todoList.length === 0) {
        stat.classList.add('hidden');
        footer.classList.add('hidden');
    }
    else {
        stat.classList.remove('hidden');
        footer.classList.remove('hidden');
    }
}
function getActive() {
    var todoList = document.querySelectorAll('.item-todo');
    //button all
    buttonAll.addEventListener('click', function () {
        this.classList.add('on');
        buttonActive.classList.remove('on');
        buttonCompleted.classList.remove('on');
        todoList.forEach(function (item) {
            if (item.classList.contains('hidden')) {
                item.classList.remove('hidden');
            }
        });
    });
    //button active
    buttonActive.addEventListener('click', function () {
        this.classList.add('on');
        buttonAll.classList.remove('on');
        buttonCompleted.classList.remove('on');
        todoList.forEach(function (item) {
            if (item.querySelector('span:first-child').classList.contains('completed')) {
                item.classList.add('hidden');
            }
            else {
                item.classList.remove('hidden');
            }
        });
    });
    //button completed
    buttonCompleted.addEventListener('click', function () {
        this.classList.add('on');
        buttonAll.classList.remove('on');
        buttonActive.classList.remove('on');
        todoList.forEach(function (item) {
            if (item.querySelector('span:first-child').classList.contains('completed')) {
                item.classList.remove('hidden');
            }
            else {
                item.classList.add('hidden');
            }
        });
    });
}
function checkActive() {
    var todoList = document.querySelectorAll('.item-todo');
    todoList.forEach(function (item) {
        var spanTodo = item.querySelector('span:first-child');
        if (buttonActive.classList.contains('on')) {
            if (spanTodo.classList.contains('completed')) {
                item.classList.add('hidden');
            }
            else {
                item.classList.remove('hidden');
            }
        }
        else if (buttonCompleted.classList.contains('on')) {
            if (!spanTodo.classList.contains('completed')) {
                item.classList.add('hidden');
            }
            else {
                item.classList.remove('hidden');
            }
        }
    });
}
function count() {
    var listAllSpan = document.querySelectorAll('.item-todo span:first-child');
    var listSpanCompleted = document.querySelectorAll('.item-todo .completed');
    var countNumber = document.querySelector('.number-item');
    var count = listAllSpan.length - listSpanCompleted.length;
    countNumber.innerHTML = "".concat(count);
}
function deleteCompleted() {
    var buttonClearCompleted = document.querySelector('#clear-completed');
    buttonClearCompleted.addEventListener('click', function () {
        var listSpanCompleted = document.querySelectorAll('.item-todo .completed');
        listSpanCompleted.forEach(function (item) {
            item.parentElement.remove();
            hiddenFooter();
            tickAllTodo();
            saveTodoList();
        });
    });
}
function saveTodoList() {
    var todoList = document.querySelectorAll('.item-todo');
    var todoStorage = [];
    todoList.forEach(function (item) {
        var text = item.querySelector('span:first-child').innerText;
        var status = item.querySelector('span:first-child').getAttribute('class');
        todoStorage.push({
            text: text,
            status: status
        });
    });
    localStorage.setItem('todoList', JSON.stringify(todoStorage));
}
function init() {
    var data = JSON.parse(localStorage.getItem('todoList') || "[]");
    data.forEach(function (item) {
        addTodoElement(item);
    });
}
init();
