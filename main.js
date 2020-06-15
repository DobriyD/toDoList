let addMessage = document.querySelector('.message'),
    todo = document.querySelector('.todo'),
    addButton = document.querySelector('.add');

let toDoList = [];

// saving the tasks data in local storage to solve problem with refreshing page

if (localStorage.getItem('todo')){
    toDoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}

//showing a new li in toDoList

function displayMessages() {
    let displayMessage = '';
    if (toDoList.length === 0) todo.innerHTML = '';
    toDoList.forEach(function(item, i) {
        displayMessage += `
            <li>
                <input type="checkbox" id="item_${i}" ${item.checked ? 'checked' : ''}>
                <label for="item_${i}" class="${item.important ? 'important' : ''}">${item.todo}</label>
            </li>
            `;

        todo.innerHTML = displayMessage;
    });
}


function addItem() {
    if(!addMessage.value) return;
    let newToDo = {
        todo: addMessage.value,
        checked:false,
        important:false
    };

    toDoList.push(newToDo);
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(toDoList));
    addMessage.value = '';
}


//creating event on click or enter to push new li to the list

addButton.addEventListener('click', () => {
    addItem();
});

addButton.addEventListener('keydown', KeyboardEvent => {
    if (KeyboardEvent.enter) {
        addItem();
    }
});

//creating separate part for each li

todo.addEventListener('change', function (event) {
        let valueLabel = todo.querySelector('[for='+ event.target.getAttribute('id') + ']').innerHTML;

        toDoList.forEach(function (item) {
            if (item.todo === valueLabel) {
                item.checked = !item.checked;
                localStorage.setItem('todo', JSON.stringify(toDoList))
            }
        });
});

// you can erase each li with right click + ctrl
// you can put 'important' tag on every li by right click

todo.addEventListener('contextmenu', function (event) {
    event.preventDefault();
    toDoList.forEach(function (item, i) {
        if (item.todo === event.target.innerHTML) {
            if(event.ctrlKey || event.mateKey) {
                toDoList.splice(i, 1);
            } else {
                item.important = !item.important;
            }
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(toDoList));
        }
    });
});
