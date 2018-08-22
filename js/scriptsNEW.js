//BACK-END
var allAccounts = []

function Account(first, last, balance) {
  this.first = first;
  this.last = last;
  this.balance = balance;
  this.id = this.first[0] + this.first.charAt(this.first.length-1) + this.last[0] + this.last.charAt(this.last.length-1);
  allAccounts.push(this);
}

function updateBalance(id, update) {
  allAccounts.forEach(function(Account) {
    while (id === Account.id) {
      Account.balance += update;
      console.log(Account.balance);
      return Account.balance
    }
  });
}

function resetFields() {
  $("form input").val("");
}

//FRONT-END
$(document).ready(function() {
  $("form#registerInput").submit(function(event) {
    event.preventDefault();

    var firstNameInput = $("input#first-name").val();
    var lastNameInput = $("input#last-name").val();
    var initialDepositInput = parseFloat($("input#initial-deposit").val());
    var accountInstance = new Account(firstNameInput, lastNameInput, initialDepositInput);
    console.log(accountInstance);

    $("#currentBalance").text("$" + accountInstance.balance);
    resetFields();
    alert("Your bank account ID is: " + accountInstance.id)
  });

  $("form#serviceInput").submit(function(event) {
    event.preventDefault();

    var idInput = $("input#id").val();
    var depositInput = parseFloat($("input#deposit").val());
    var withdrawalInput = parseFloat($("input#withdraw").val());
    var netChange = depositInput - withdrawalInput
    var newBalance = updateBalance(idInput, netChange);
    console.log("newBalance = " + newBalance);
    $("#currentBalance").text("$" + newBalance);
    resetFields();
  });
});
