## Avoid external calls when possible
This app does make use of external function calls since they will only be called externally. While they have the potential for executing malicious code, attempst have been made to minimize this risk by avoiding the use of call.value(y)() which has the potential for being given all available gas.

## Restricting Access
A modifier called restricted is used to restrict access to particular functions to the contract owner (ex. circuitBreake()r, kill()).

## Pull over Push Payments
This app currently does not deal with transfer of payments. Future enhancements that include payments would be secured by requiring the contract owner to initiate pulls from the contract instead of pushing payment updates.

## Prepare for failure
A circuit breaker design pattern has been implemented for when things go wrong.

## Pitfalls in Race Condition Solutions, Cross-function Race Conditions
Although this app does not include functions that call other functions or share state, one would minimize this risk by treating all external functions as insecure (marking them insecure). Additionally, it is recommended that functions complete all internal work before making any external calls.

# Reentrancy
Due to the simple nature of this app, there is minimal risk for reentrance.

# Timestamp Dependence
While this app does not currently make use of timestamp. Future enhancements could include an image owner wanting to prove they are the original owner by way of timestamp. In this case the use of block.timestamp would be sufficient.

# DoS with Block Gas Limit
This app does not loop over an array of unknown size and therefore has minimal risk for this security issue.

# Forcibly Sending Ether to a Contract
Although the app does not accept Ether payments, Ether can be forcibly sent via the selfdestruct() method. If future enhancements included payments, precautions would be taken to secure logic that included contract balance.