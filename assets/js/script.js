const todoList = document.querySelector('.todo-list');
const completedList = document.querySelector('.completed-list');
const todoInput = document.querySelector('.todo-input')
const checkBtns = document.querySelectorAll('.check');
const todoRow = document.querySelectorAll('.todo-row'); 
const addBtn = document.querySelector('.add');
const editInput = document.querySelector('.edit');
const editBtn = document.querySelector('.edit-btn');
const todoRank = document.querySelector('.rank');


let elementId;
let editedElementId;
let counter=todoRow.length + 1;

// CReate todoRow with input
addBtn.addEventListener('click',  (event)=> {
    if (todoInput.value.length) {
        event.preventDefault();
        // add To Do Row
        let row = document.createElement('div');
        row.id=counter;
        row.className = todoRank.value == 'important' ? "todo-row important" : "todo-row";
        row.setAttribute('draggable', 'true')
        todoList.appendChild(row);    
        // add checkbox
        let input = document.createElement('input');
        input.setAttribute('type', 'checkbox')
        input.className="check";
        row.appendChild(input);
        // add number
        let num = document.createElement('span');
        num.className="listNum";
        num.innerText=`${counter}. `;
        row.appendChild(num);
        // add text content
        let spanContent = document.createElement('span');
        spanContent.innerText=` ${todoInput.value}`
        spanContent.className="todoContent"
        row.appendChild(spanContent);
        // add edit btn
        let editBtn = document.createElement('button');
        editBtn.className=('edit');
        let editI = document.createElement('i');
        editI.className='far fa-edit';
        editBtn.append(editI)
        row.appendChild(editBtn);
        // add delete btn
        let deleteBtn = document.createElement('button');
        deleteBtn.className=('delete');
        let deleteI = document.createElement('i');
        deleteI.className='far fa-trash-alt';
        deleteBtn.append(deleteI)
        row.appendChild(deleteBtn);

        todoInput.value='';
        counter++;
        renderTodoList()
        clickCheckBox();
        deleteToDoRow();
        editToDoRow();
    }else{
        alert("You cannot enter empty task")
    }
    
})

// Remove Element
var deleteToDoRow = () => {
    const deleteBtns = document.querySelectorAll('.delete');
    deleteBtns.forEach(element => {
        element.addEventListener('click', () => {
            element.parentElement.remove();
        })
    });
}
deleteToDoRow();

// Edit Element
var editToDoRow = () => {
    const editBtns = document.querySelectorAll('.edit');
    editBtns.forEach(element => {
        element.addEventListener('click', () => {
            editBtn.removeAttribute('disabled');
            editInput.removeAttribute('disabled');
            editInput.value = element.previousElementSibling.innerText;
            editInput.focus();
            editedElementId=element.parentElement.id;
        })
    });
}
editToDoRow();

editBtn.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById(editedElementId).querySelector('.todoContent').innerText = editInput.value;
    editInput.value='';
    editBtn.setAttribute('disabled', 'true');
    editInput.setAttribute('disabled', 'true'   );
    editInput.blur();
    editedElementId = null;
})

// In drag starting take element 
var renderTodoList = () => {
    const todoRow = document.querySelectorAll('.todo-row'); 
    todoRow.forEach(element => {
        element.ondragstart = function(){
            elementId=this.id
        }
    });    
}
renderTodoList()

// Click CheckBox and change TodoWow Position
var clickCheckBox = () => {
    let checkedInput = document.querySelectorAll('.check');
    checkedInput.forEach(element => {
        element.addEventListener('click', ()=>{
            setTimeout(() => {
                if (element.checked) {
                    completedList.append(element.parentElement);
                    element.parentElement.querySelector('.edit').style.visibility = "hidden";
                    element.parentElement.querySelector('.delete').style.visibility = "hidden";
                }else{
                    todoList.append(element.parentElement);
                    element.parentElement.querySelector('.edit').style.visibility = "visible";
                    element.parentElement.querySelector('.delete').style.visibility = "visible";
                }
            }, 300);
        })
    });
}
clickCheckBox();

//Clear drag over
completedList.ondragover = (event) => {
    event.preventDefault();
}

todoList.ondragover = (event) => {
    event.preventDefault();
}

// In dropping, element append
completedList.ondrop = (event) => {
    const draggedElement = document.getElementById(elementId);
    completedList.append(draggedElement);
    draggedElement.querySelector('.check').checked=true;
    draggedElement.querySelector('.edit').style.visibility = "hidden";
    draggedElement.querySelector('.delete').style.visibility = "hidden";
}

todoList.ondrop = (event) => {
    const draggedElement = document.getElementById(elementId);
    todoList.append(draggedElement);
    draggedElement.querySelector('.check').checked=false;
    draggedElement.querySelector('.edit').style.visibility = "visible";
    draggedElement.querySelector('.delete').style.visibility = "visible";
}