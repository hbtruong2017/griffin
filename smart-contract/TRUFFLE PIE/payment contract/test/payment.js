var Payment = artifacts.require("./Payment.sol");

/*Check that you have 2 employees initialised*/
contract("Payment", function(accounts){
    it("it initializes with two employee", function(){ /*mocha*/
        return Payment.deployed().then(function(i) {
            return i.employeeCount();
        }).then(function(count){
            assert.equal(count,2); /*chai*/
        });
    });
});