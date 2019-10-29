pragma solidity ^0.5.8;

/*This contract is for employee to clock out and receive their pay every day*/
contract Payment {
    string public employeee;
    /*Creating a New Employee Object*/
    struct Employee{
        uint id;
        string name;
        address wallet;
    }

    /*When this contract is deployed the Employee is created*/
    constructor() public{
        addNewEmployee("Paul Griffin", 0x13Ef0CFe283D21b140e8Bed83aDD6e8B886a28a5);
        addNewEmployee("Barros Raphael", 0x6ca1779C7466A7249cc14306315385858A47D6d6);
        employeee = "YOU DID IT"; /*app.employeee() <- call this*/
    }

    /*Map the Employee id to the Employee Object, this is a function - to get a particular employee app.employee(id)*/
    mapping(uint => Employee) public employees;

    /*Keeping track of # of Employee*/
    uint public employeeCount;

    function hoursWorked(uint clockIn, uint clockOut, uint _amount, address payable payee)public payable {
        uint hoursCalculated = clockOut - clockIn;
        uint amount_payable = hoursCalculated * _amount;
        payee.transfer(amount_payable);
    }

    /*Create new Employee privately if we need*/
    function addNewEmployee(string memory _name, address _address) public {
        employeeCount ++;
        employees[employeeCount] = Employee(employeeCount, _name, _address);
    }
}