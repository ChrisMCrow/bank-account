//Back-end
function Account(name, initialDeposit, id) {
  this.name = name;
  this.balance = parseFloat(initialDeposit);
  this.id = id;
}


function serviceAction(array, accountNumber, depositAmount, withdrawAmount) {
  //Add value to blank fields
  var deposit = parseFloat(depositAmount);
  var withdraw = parseFloat(withdrawAmount);
  if (!deposit) {
    deposit = 0;
  } else if (!withdraw) {
    withdraw = 0;
  }


  // Find the bank account from the account #
  var index = -1;
  array.forEach(function(account) {
    index = array.findIndex(x => x.id == accountNumber);
  });

  //Add deposits and subtract withdrawals from the account specified
  if (index !== -1) {
    array[index].balance = array[index].balance + deposit - withdraw;
    return array[index].balance;
  } else {
    alert("Please enter a valid account number.");
  }
  // account.balance = account.balance + deposit - withdraw;
}

//clear register inputs
function clearRegisterFields() {
  $("#name").val("");
  $("#initial-deposit").val("");
}

//clear service inputs
function clearServiceFields() {
  $("#id").val("");
  $("#deposit").val("");
  $("#withdraw").val("");
}


//User Interface
$(document).ready(function() {
  var accountArray = [];
  var bankAccount;
  var makeId = 1;
  $("#registerInput").submit(function(event) {
    event.preventDefault();

    $("#currentBalance").text("");

    var nameInput = $("#name").val();
    var initialDepositInput = parseFloat($("#initial-deposit").val()).toFixed(2);

    bankAccount = new Account(nameInput, initialDepositInput, makeId);
    alert("Your account number is " + bankAccount.id);
    accountArray.push(bankAccount);
    $("#currentBalance").text("$" + bankAccount.balance);
    makeId++;
    clearRegisterFields();
  })


  $("#serviceInput").submit(function(event) {
    event.preventDefault();
    var idInput = parseInt($("#id").val());
    var depositInput = parseFloat($("#deposit").val()).toFixed(2);
    var withdrawInput = parseFloat($("#withdraw").val()).toFixed(2);
    var newBalance = serviceAction(accountArray, idInput, depositInput, withdrawInput);
    $("#currentBalance").text("$" + newBalance);
    clearServiceFields();
  })
})
