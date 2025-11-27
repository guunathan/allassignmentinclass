function checkStock(productName) {
    const targetItem = productName;

    return new Promise((success, failure) => {
        setTimeout(() => {
            targetItem === "Laptop"
                ? success("In stock")
                : failure("Out of stock");
        }, 500);
    });
}