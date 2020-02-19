console.log("test");

const itemController = (() => {

    // Trying switching to class Item { constructor(id, name) { this.id = id; this.name=name;}}
    let Item = function(id, name) {
        this.id = id;
        this.name = name;
    }

    let allItems = [];
    // name:black beans id: 0
    // name: quinoa     id: 1

    return {
        addItem: (text) => { 
            let newItem, ID;

            if(allItems.length>0) {
                ID = allItems[allItems.length-1].id + 1;
            } else {
                ID = 0;
            }

            newItem = new Item(ID, text);

            allItems.push(newItem);

            return newItem;


        },

        deleteItem: (ID) => {
            // delete item from allItems
        }

        // deleteItem: (id) => { };
    }
})();

const UIController = (() => {

    let DOMelements = {
        groceryItem: '.grocery-item',
        addItem: '#addItem',
        input: '#input',
        itemsContainer: '#items-container'
    };

    return {

        getInput: () => {
            let inputText;
            
            // store in input
            inputText = document.querySelector(DOMelements.input).value;
            

            //return input;
            return inputText;
            
        },

        addListItem: (item) => {
            // Add List item to the UI
            // item.id   item.name
            let html, name, ID;
            name = item.name;
            ID = item.id;

            html = `
                    <div class="grocery-item" id="item${ID}">
                        <h4>${name}</h4>
                        <i class="fas fa-times ml-5 btn btn-outline-dark" id="btn${ID}"></i>
                    </div>
                    `
            document.querySelector(DOMelements.itemsContainer).insertAdjacentHTML('beforeend', html);
    
        },

        deleteListItem: (ID) => {
            const itemID = `item${ID}`
            // delete Item from UI


        },

        clearInput: () => {
            // Clear Input field
            let inputField = document.querySelector(DOMelements.input);

            inputField.value = "";

            inputField.focus();
 
        },

        getDOMelements: () => {
            return DOMelements;
        }

    }
})();

const appController = ((itemCtrl, UICtrl) => {

    const setupEventListeners = () => {
        const DOM = UICtrl.getDOMelements();

        document.querySelector(DOM.addItem).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event) {
            if(event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            } 

        });
    }

    const itemEventListener = (item) => {
        document.querySelector(`#btn${item.id}`).addEventListener('click', ctrlDeleteItem(item.id));
    }

    const ctrlAddItem = () => {
        let input, newItem;

        // 1. Get the field input data
        input = UICtrl.getInput();

        if (input !== "") { // *** Also check for empty spaces and not accept ***
        // 2. Add the item to the Item Controller
        newItem = itemCtrl.addItem(input);

        // 3. Add the item to the UI
        UICtrl.addListItem(newItem);

        // 4. Add event Listener
        itemEventListener(newItem);

        // 5. Clear the input field
        UICtrl.clearInput();
        }

    }

    const ctrlDeleteItem = (ID) => {

        // 1. Delete the item from the Item Controller
        itemCtrl.deleteItem(ID);

        // 2. Delete the item from the UI
        UICtrl.deleteListItem(ID);
    }

    return {
        init: () => {
            console.log('Application has started');
            setupEventListeners();
        }

    }
})(itemController, UIController);

appController.init();

