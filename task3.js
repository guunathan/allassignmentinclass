function verifyStock(product) {
    const target = product;

    return new Promise((ok, fail) => {
        setTimeout(() => {
            if (target === "Laptop") {
                ok("In stock");
            } else {
                fail("Out of stock");
            }
        }, 500);
    });
}


verifyStock("2labtop")
    .then(response => console.log(response))
    .catch(error => console.log(error));