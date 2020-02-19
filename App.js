console.log("test");

const itemController = (() => {

    let Item = (id, name) => {
        this.id = id;
        this.name = name;
    }

    let allItems = [];

    return {
        publicTest: (b) => {
            return add(b);
        },

        addItem: (text) => { 
            let newItem;
        }

        // deleteItem: (id) => { };
    }
})();

const UIController = (() => {

    let DOMelements = {
        groceryItem: '.grocery-item',
        addItem: '#addItem',
        input: '#input'
    };

    return {

        getInput: () => {
            let inputText = "";
            
            // store in input
            inputText = document.querySelector(DOMelements.input).value;
            console.log(inputText);

            //return input;
            return inputText;
        },

        addListItem: (item) => {
            // Add List item to the UI
        },

        clearInput: () => {
            // Clear Input field
        },

        getDOMelements: () => {
            return DOMelements;
        }

    }
})();

const appController = ((itemCtrl, UICtrl) => {

    const setupEventListeners = () => {
        var DOM = UICtrl.getDOMelements();

        document.querySelector(DOM.addItem).addEventListener('click', ctrlAddItem);
    }

    const ctrlAddItem = () => {
        let input, newItem;

        // 1. Get the field input data
        input = UICtrl.getInput();

        // 2. Add the item to the Item Controller
        newItem = itemCtrl.addItem(input);

        // 3. Add the item to the UI
        UICtrl.addListItem(newItem);

        // 4. Clear the input field
        UICtrl.clearInput();

    }

    return {
        init: () => {
            console.log('Application has started');
            setupEventListeners();
        }

    }
})(itemController, UIController);

appController.init();

