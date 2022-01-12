var state = {
    balance:10000,
    income:1200,
    expence:200,
    transactions:[
    ],
}

var balanceEl = document.querySelector('#balence');
var incomeEl = document.querySelector('#income');
var expenseEl = document.querySelector('#expence');
var transactionsEl = document.querySelector('#transaction');
var incomeBtnEl = document.querySelector('#income-btn');
var expenseBtnEl = document.querySelector('#expence-btn');
var nameInputEl = document.querySelector('#name');
var amountInputEl = document.querySelector('#amount');
var B_name = prompt('Which file do you want to open?')

function init(){
    var localState = JSON.parse(localStorage.getItem(B_name));
    if(localState!== null){
        state= localState
    }
    updateState();
    initListeners();

}

function initListeners(){
    incomeBtnEl.addEventListener('click',onAddIncomeClick);
    expenseBtnEl.addEventListener('click', onAddExpenseClick);
}

function onAddIncomeClick(){
    var name = nameInputEl.value;
    var amount = amountInputEl.value;
    if(name!=='' && amount!==''){
        var transaction = { id:uniqueId(), name:nameInputEl.value, amount:parseInt(amountInputEl.value), type:'income' };
        state.transactions.push(transaction);
        updateState();
    }
    else {alert('Please enter a valid data');}

    nameInputEl.value = '';
    amountInputEl.value = '';
}

function onAddExpenseClick(){
   var name = nameInputEl.value;
    var amount = amountInputEl.value;
    if(name!=='' && amount!==''){
        var transaction = { id:uniqueId(), name:nameInputEl.value, amount:parseInt(amountInputEl.value), type:'expense' };
        state.transactions.push(transaction);
        updateState();
    }
    else {alert('Please enter a valid data');}
    nameInputEl.value = '';
    amountInputEl.value = '';
}

function updateState(){
     var balance = 0,
         income = 0,
         expense = 0,
         item;
    for (var i =0;i<state.transactions.length;i++){
        item = state.transactions[i];

        if (item.type === 'income'){
            income+=item.amount;
        }
        if (item.type === 'expense'){
            expense+=item.amount;
        }
    }

    balance = income-expense;

    state.balance = balance;
    state.income = income;
    state.expence = expense;
    localStorage.setItem(B_name, JSON.stringify(state))
    render();
}

function uniqueId(){
    return Math.round(Math.random()*1000000);
}

function onDeleteClick(event){
    var id = parseInt(event.target.getAttribute('data-id'));
    var delete_index;

    for(var i =0; i<state.transactions.length;i++){
        if(state.transactions[i].id === id){
            delete_index = i;
            break;
        }
    }
    state.transactions.splice(delete_index, 1);

    updateState();
}

function render(){
    balanceEl.innerHTML = `$${state.balance}`;
    incomeEl.innerHTML = `$${state.income}`;
    expenseEl.innerHTML = `$${state.expence}`;

    transactionsEl.innerHTML = '';

    for (var i = 0;i<state.transactions.length;i++){
        item= state.transactions[i];
        transactionEl = document.createElement('li');
        c= document.createElement('h3');
        c.append(state.transactions[i].name);
        transactionEl.append(c)
        transactionsEl.appendChild(transactionEl);

        containerEl= document.createElement('div');
        amountEl= document.createElement('span');
        if(item.type ==='income'){
            amountEl.classList.add('income-amt');
        }
        else if(item.type === 'expense'){
            amountEl.classList.add('expence-amt');
        }
        amountEl.innerHTML = `$${item.amount}`;

        containerEl.appendChild(amountEl);

        buttonEl = document.createElement('button');
        buttonEl.setAttribute('data-id',item.id);
        buttonEl.innerHTML = ('X');

        buttonEl.addEventListener('click', onDeleteClick);

        containerEl.appendChild(buttonEl);

        transactionEl.appendChild(containerEl);
    }
}



init();

