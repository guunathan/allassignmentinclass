function CreateItemManager() {
    let items = [];

    const addItem = (value) => {
        if (value) {
            if (!items.includes(value)) {
                items.push(value);
                console.log("Item added.");
            } else {
                console.log("This item already exists.");
            }
        }
    };

    const removeItem = (value) => {
        if (value) {
            const idx = items.indexOf(value);
            if (idx !== -1) {
                items.splice(idx, 1);
                console.log("Item removed.");
            } else {
                console.log("Item not found.");
            }
        }
    };

    const listItems = () => items;

    return {
        addItem,
        removeItem,
        listItems
    };
}

let itemBox = CreateItemManager();

itemBox.addItem("a");
itemBox.addItem("b");
itemBox.addItem("c");
itemBox.addItem("d");
itemBox.addItem("e");

itemBox.addItem("a");

itemBox.listItems();
itemBox.removeItem("a");
itemBox.removeItem("d");

itemBox.removeItem("a"); 

itemBox.listItems();
