const note = document.getElementById("note");
const todoItems = document.getElementById("todoItems");
const checkTodo = document.getElementById('checkTodo');
const body = document.querySelector('body');
var todos = [];

// fetch notes from Storage if avaialable
window.onload = async () => {
    let fetchTodos = await localStorage.getItem('notes');
    todos = JSON.parse(fetchTodos);
    if (todos.length === 0) {
        todoItems.appendChild(createMsg());
    } else {
        renderNotes();
    }
}

const renderNotes = () => {

    todos.map((data) => {

        const myDiv = document.createElement('div');
        myDiv.id = data.date;
        myDiv.innerHTML = `${data.item}
            <div class="btnGroup d-inline float-right mx-2">
                    <i class="fa fa-times mx-1" onclick="deleteNotes(${data.date})"></i>
                    <i class="fa fa-pencil" data-toggle="modal" data-target="#myModal${data.date}"></i>
            </div>
        `;

        body.appendChild(createModal(data.item, data.date));

        myDiv.classList.add('todoItem', 'itemShadow');
        todoItems.appendChild(myDiv)
    })
}

// createNote 
const createNote = () => {
    let date = Date.now()
    if (todoItems.firstChild === document.getElementById('msg')) {
        todoItems.removeChild(document.getElementById('msg'))
    }
    const myDiv = document.createElement('div');
    myDiv.innerHTML = `${note.value}
            <div class="btnGroup d-inline float-right mx-2">
                    <i class="fa fa-times mx-1" onclick="deleteNotes(${date})"></i>
                    <i class="fa fa-pencil" data-toggle="modal" data-target="#myModal${date}"></i>
            </div>
        `;

    body.appendChild(createModal(note.value, date))

    myDiv.id = date;
    const obj = {
        item: note.value,
        date: date
    }

    todos.push(obj);
    myDiv.classList.add('todoItem', 'itemShadow');
    localStorage.setItem('notes', JSON.stringify(todos))
    note.value = "";
    todoItems.appendChild(myDiv);
}

const deleteNotes = (arg) => {
    const deletedElem = document.getElementById(arg);
    todoItems.removeChild(deletedElem);

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].date === arg) {
            todos.splice(i, 1)
            localStorage.setItem('notes', JSON.stringify(todos))
            if (todos.length === 0) {
                todoItems.appendChild(createMsg());
            }
            break;
        }
    }

}

const updateNotes = (arg) => {
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].date === arg) {
            console.log(todos[i], document.getElementById('updateNote').value);
            todos[i].item = document.getElementById('updateNote').value;
            localStorage.setItem('notes', JSON.stringify(todos))
            break;
        }
    }
}


const createMsg = () => {
    let msg = document.createElement('h3');
    msg.id = 'msg';
    msg.innerHTML = "There are no Notes!"
    return msg;
}

const createModal = (item, date) => {
    let myDiv = document.createElement('div');
    myDiv.setAttribute('class', 'modal');
    myDiv.setAttribute('tabindex', '-1');
    myDiv.setAttribute('id', `myModal${date}`)
    myDiv.setAttribute('id', `myModal${date}`);
    myDiv.setAttribute('role', 'dialoge');

    myDiv.innerHTML = `
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Update Your Note</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <input type="text" id="updateNote${date}" onkeyup="changeVal(updateNote${date})" value="${item}" class="input-group" style="font-size: larger;">
                </div>
                <div class="modal-footer">
                    <button type="button" onclick="updateNotes(${date})" data-dismiss="modal" class="btn btn-primary">Save</button>
                </div>
            </div>
    </div
    `

    return myDiv;
}