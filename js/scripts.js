//Back-end
function Account(firstName, lastName, initialDeposit, id) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.balance = parseFloat(initialDeposit);
  this.id = id;
}


function serviceAction(array, accountNumber, depositAmount, withdrawAmount) {
  //Add value to blank fields
  var deposit = parseFloat(depositAmount);
  var withdraw = parseFloat(withdrawAmount);
  if (!deposit && !withdraw) {
    deposit = 0;
    withdraw = 0;
  } else if (!deposit) {
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
  $("#first-name").val("");
  $("#last-name").val("");
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

    var firstNameInput = $("#first-name").val();
    var lastNameInput = $("#last-name").val();
    var initialDepositInput = parseFloat($("#initial-deposit").val()).toFixed(2);

    bankAccount = new Account(firstNameInput, lastNameInput, initialDepositInput, makeId);
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
