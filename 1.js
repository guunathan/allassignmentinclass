function CreateBankAccount(initialBalance) {
    let balance = initialBalance;

    const getBalance = () => balance;

    const deposit = (amount) => {
        balance = balance + amount;
    };

    const withdraw = (amount) => {
        if (amount > balance) {
            console.log("Cannot withdraw cause balance not enough.");
            return;
        }
        balance = balance - amount;
    };

    return {
        getBalance: getBalance,
        deposit: deposit,
        withdraw: withdraw
    };
}

const userAccount = CreateBankAccount(1000);
userAccount.getBalance();

userAccount.deposit(1000);
userAccount.getBalance();

userAccount.withdraw(5000);
userAccount.getBalance();

userAccount.withdraw(200);
userAccount.getBalance();
