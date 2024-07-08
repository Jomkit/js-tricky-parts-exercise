function createAccount(pin, amount = 0) {

    return {
        checkBalance: (checkPin) => {
            if(checkPin === pin){
                return `$${amount}`;
            } else{
                return "Invalid PIN.";
            }
        },
        deposit: (checkPin, depositAmt) => {
            if(checkPin === pin){
                amount += depositAmt;
                return `Successfully deposited $${depositAmt}. Current balance: $${amount}.`;
            } else{
                return "Invalid PIN.";
            }
        }, 
        withdraw: (checkPin, withdrawAmt) => {
            if(checkPin === pin) {
                if(withdrawAmt <= amount){
                    amount -= withdrawAmt;
                    return `Successfully withdrew $${withdrawAmt}. Current balance: $${amount}.`;
                } else{
                    return "Withdrawal amount exceeds account balance. Transaction cancelled."
                }
            } else{
                return "Invalid PIN.";
            }
        },
        changePin: (checkPin, newPin) => {
            if(checkPin === pin){
                pin = newPin;
                return "PIN successfully changed!";
            } else{
                return "Invalid PIN.";
            }
        }
    }
}

module.exports = { createAccount };
