# Blockchain

Create a simple Angular application that uses the [tzkt.io](https://tzkt.io) REST service API.
Use Observables to pass around data between Services and UI components or use the NgRx framework
for state management.

The REST API can be used to fetch data about the Tezos Blockchain.

The application should use the REST API to fetch the list of blocks and show them in a paged
table.

The endpoints to fetch the list of blocks are described [here](https://api.tzkt.io/#tag/Blocks).

Each row of the table should show the block level, proposer, timestamp and the number of
transactions included in the block (this requires querying the 
[transactions count endpoint](https://api.tzkt.io/#operation/Operations_GetTransactionsCount) and
filtering for the desired block levels). The table should be sorted in descending order on the
block level.

Clicking on a row should go to a Details page where the block’s transactions are listed in a
paged table. Use the [transactions endpoint](https://api.tzkt.io/#operation/Operations_GetTransactions)
to fetch the transactions for a certain block level.
The transactions table should display each transactions’ sender, target, amount and status.

The UI does not need to be fancy, the important part is the code/business logic.

Bonus: Add unit tests.

## Demo
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`
