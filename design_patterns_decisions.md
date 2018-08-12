## Mortal
Implemented the ability to kill the contract and remove it from the block chain. Future enhancements would include restricting this feature to admin users.

## Fail early, fail loud
Require statements and modifiers are used to check that required conditions are met early on.

## Circuit breaker
Pause execution of the contract in case of emergency. Due to the simple nature of this application, currently any contract owner can implement this feature. Future enhancements would include restricting this feature to admin users.

## Restricting Access
A modifier called resricted is used to restrict access to particular functions. Currently, this is retricted to the smart contract owner. Future enhancements would include an onlyAdmin modifier.

# Withdrawal Pattern
Future enhancements that would include any transfer of payments would be secured with using the withraw() method. (Pull vs push payments)

