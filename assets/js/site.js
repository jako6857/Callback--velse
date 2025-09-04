
// basic MVC with app state setup

// #region init functions
let appState="listView"
let activeList=0   

let currentData=null

const dummyData = {
    darkMode: false,
    lists: [
        { id: 1, name: 'List 1', items: [
            { id: 1, name: 'Item 1', completed: false },
            { id: 2, name: 'Item 2', completed: true }
        ] },
        { id: 2, name: 'List 2', items: [
            { id: 3, name: 'Item 3', completed: false },
            { id: 4, name: 'Item 4', completed: true }
        ] }
    ],
};


const mainContent = document.getElementById('content');

initApp();

function initApp() {
    console.log('initApp called');
    let storeddata=readData();
    if (storeddata==null) {
        currentData =dummyData;
        saveData(currentData);
    } else {
        currentData = storeddata;
    }
    setupStatics();
}


// Setup static event listeners and elements (model code)
function setupStatics() {
console.log('setupStatics called');
    const newButton = document.getElementById('newListButton');
    newListButton.addEventListener('click', newCallback);
      listView();
}

 // #endregion

// #region callbacks
//---------------------------------------------------------------------------------------------------------------------
//- Callbacks with switch to handle different functions and appState
//---------------------------------------------------------------------------------------------------------------------

// Callback for creating a new list (model code) with switch and appState
function newCallback(){}

//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
// #endregion

// #region view functions
// view code to create a new list creation view
function newListCreationView() {
    // Get the content element
    const content = document.getElementById('content');
    
    // Clear the content
    content.innerHTML = '';
    
    // Create a section container
    const section = document.createElement('section');
    
    // Create label
    const label = document.createElement('label');
    label.textContent = 'Name:';
    label.setAttribute('for', 'listName');
    
    // Create text input
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'listName';
    input.value = 'default name';
    
    // Create OK button
    const okButton = document.createElement('button');
    okButton.textContent = 'OK';
    okButton.addEventListener('click', () => {
        console.log('OK clicked, list name:', input.value);
        listView();
    });
    
    // Create Cancel button
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', () => {
        console.log('Cancel clicked');
      listView();
    });
    
    // Append all elements to the section
    section.appendChild(label);
    section.appendChild(input);
    section.appendChild(okButton);
    section.appendChild(cancelButton);
    
    // Append section to content
    content.appendChild(section);
}

function newItemCreationView(){
    // Get the content element
    const content = document.getElementById('content');
    
    // Clear the content
    content.innerHTML = '';
    
    // Create a section container
    const section = document.createElement('section');
    
    // Create label
    const label = document.createElement('label');
    label.textContent = 'Name:';
    label.setAttribute('for', 'listName');
    
    // Create text input
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'listName';
    input.value = 'default name';
    
    // Create OK button
    const okButton = document.createElement('button');
    okButton.textContent = 'OK';
    okButton.addEventListener('click', () => {
        console.log('OK clicked, list name:', input.value);
        listItemView();
    });
    
    // Create Cancel button
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', () => {
        console.log('Cancel clicked');
      listItemView();
    });
    
    // Append all elements to the section
    section.appendChild(label);
    section.appendChild(input);
    section.appendChild(okButton);
    section.appendChild(cancelButton);
    
    // Append section to content
    content.appendChild(section);  
}





//---------------------------------------------------------------------------------------------------------------
// List view part of the view code that generates list views to show user the saved lists
function listView(){
    
    mainContent.innerHTML = '';
     appState = "listView";
   currentData.lists.forEach((list,index) => {
       const listElement = document.createElement('div');
       listElement.innerHTML = `<h2 onclick="listClickCallback('showList',${index})">${list.name}</h2>
       <button onclick="listClickCallback('editList',${index})">edit</button>
       <button onclick="listClickCallback('deleteList',${index})">delete</button>`;
       mainContent.appendChild(listElement);
   });
}

function listItemView() {
    console.log('List item view for index:', activeList);
    const list = currentData.lists[activeList];
    if (!list) {
        console.error('List not found:', activeList);
        return;
    }
    appState="itemView"
    mainContent.innerHTML = '';
    const title = document.createElement('h2');
    title.textContent = list.name;
    mainContent.appendChild(title);

    const itemsContainer = document.createElement('div');
    list.items.forEach((item, itemIndex) => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `<span>${item.name}</span>
        <button onclick="itemClickCallback('editItem',${itemIndex})">edit</button>
        <button onclick="itemClickCallback('deleteItem',${itemIndex})">delete</button>`;
        itemsContainer.appendChild(itemElement);
    });
    mainContent.appendChild(itemsContainer);
    const backButton = document.createElement('button');
    backButton.textContent = 'Back';
    backButton.addEventListener('click', () => {
        listView();
    });
    mainContent.appendChild(backButton);
}

// #endregion


// #region model code  

function readData() {
    // Simulate reading data from a database or API
    const storedData=localStorage.getItem('ToDooListApp_v1');

    return JSON.parse(storedData)

}

function saveData(data) {
    // Simulate saving data to a database or API
    localStorage.setItem('ToDooListApp_v1', JSON.stringify(data));
}



// #endregion
