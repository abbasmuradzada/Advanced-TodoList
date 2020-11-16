const todoList = document.querySelector('.todo-list');
const completedList = document.querySelector('.completed-list');
const todoRow = document.querySelectorAll('.todo-row'); 

let num;

document.querySelector('button').addEventListener('click',  ()=> {
    var test = document.createElement('div');
    test.className="todo-row";
    test.id=`a${counter}`;
    test.setAttribute('draggable', 'true')
    counter++;
    todoList.appendChild(test);
})

todoRow.forEach(element => {
    element.ondragstart = function(){
        num=this.id
    } 
});

completedList.ondragover = (event) => {
    event.preventDefault();
}

todoList.ondragover = (event) => {
    event.preventDefault();
}

completedList.ondrop = (event) => {
    event.target.append(document.getElementById(num));
}

todoList.ondrop = (event) => {
    event.target.append(document.getElementById(num));
}
var counter=1;


