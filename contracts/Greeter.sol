// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Greeter {

  string private _greeting = 'Hello World!';
  address private _owner;

  constructor () {
    _owner = msg.sender;
  }

  modifier onlyOnwer {
    require(
      msg.sender == _owner, 
      'Ownable: caller is not the owner'
      );
    _;
  }

  function greet() external view returns(string memory) {
    return _greeting;
  }

  function setGreeting(string calldata greeting) external onlyOnwer{
    _greeting = greeting;
  }

  function getOwner() public view returns(address) {
    return _owner;
  }

}
