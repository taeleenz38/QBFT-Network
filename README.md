# Besu Hyperledger

Private Blockchain (permissioned) using QBFT consensus mechanism

<br>

## Start Node-1

* In the Node-1 directory, start Node-1 using this command below:
```bash
besu --data-path=data --genesis-file=../genesis.json --rpc-http-enabled --rpc-http-api=ETH,NET,QBFT --host-allowlist="*" --rpc-http-cors-origins="all"
```
* When the node starts, the enode URL displays. Copy the enode URL to specify Node-1 as the bootnode in the following steps.

<br>

## Start Node-2

* Start another terminal, change to the Node-2 directory and start Node-2 specifying the Node-1 enode URL copied when starting Node-1 as the bootnode:
```bash
besu --data-path=data --genesis-file=../genesis.json --bootnodes=enode://d0b6073615e5de973f0253bdebeda73c4063fd467915d26eb1832d382852bcf855eead92a5e42e00c5f419561023c8382f790f8dcbccd2c87d41d1a7a7837e38@127.0.0.1:30303 --p2p-port=30304 --rpc-http-enabled --rpc-http-api=ETH,NET,QBFT --host-allowlist="*" --rpc-http-cors-origins="all" --rpc-http-port=8546
```

<br>

## Start Node-3

* Start another terminal, change to the Node-3 directory and start Node-3 specifying the Node-1 enode URL copied when starting Node-1 as the bootnode:
```bash
besu --data-path=data --genesis-file=../genesis.json --bootnodes=enode://d0b6073615e5de973f0253bdebeda73c4063fd467915d26eb1832d382852bcf855eead92a5e42e00c5f419561023c8382f790f8dcbccd2c87d41d1a7a7837e38@127.0.0.1:30303 --p2p-port=30305 --rpc-http-enabled --rpc-http-api=ETH,NET,QBFT --host-allowlist="*" --rpc-http-cors-origins="all" --rpc-http-port=8547
```

<br>

## Start Node-4

* Start another terminal, change to the Node-4 directory and start Node-4 specifying the Node-1 enode URL copied when starting Node-1 as the bootnode:
```bash
besu --data-path=data --genesis-file=../genesis.json --bootnodes=enode://d0b6073615e5de973f0253bdebeda73c4063fd467915d26eb1832d382852bcf855eead92a5e42e00c5f419561023c8382f790f8dcbccd2c87d41d1a7a7837e38@127.0.0.1:30303 --p2p-port=30306 --rpc-http-enabled --rpc-http-api=ETH,NET,QBFT --host-allowlist="*" --rpc-http-cors-origins="all" --rpc-http-port=8548
```

<br>

## Confirm the private network is working

* Start another terminal, use curl to call the JSON-RPC API qbft_getvalidatorsbyblocknumber method and confirm the network has four validators:
```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"qbft_getValidatorsByBlockNumber","params":["latest"], "id":1}' localhost:8545
```
* The result should display four validators:
```bash
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [
  "0x73ced0bd3def2e2d9859e3bd0882683a2e6835fb",
  "0x7a175f3542ceb60bf80fb536b3f42e7a30c0a6d7",
  "0x7f6efa6e34f8c9b591a9ad4763e21b3fca31bcd6",
  "0xc64140f1c9d5bb82e54976e568ad39958c3e94be"
  ]
  }
```
* Look at the logs to confirm Besu is producing blocks:
```bash
2021-05-26 08:47:00.221+10:00 | EthScheduler-Workers-0 | INFO  | PersistBlockTask | Imported #1 / 0 tx / 0 om / 0 (0.0%) gas / (0x4ee4456536e2793523df87288fae76518089eec91c3f7e05e220f1f4d3f6f95b) in 0.016s. Peers: 4
2021-05-26 08:47:02.071+10:00 | pool-8-thread-1 | INFO  | QbftBesuControllerBuilder | Imported #2 / 0 tx / 0 pending / 0 (0.0%) gas / (0x6fc47ada7146d75f6a46911d8d4038795b0c99970bbd4ce0c6d6aa60955f66fe)
2021-05-26 08:47:04.051+10:00 | pool-8-thread-1 | INFO  | QbftBesuControllerBuilder | Imported #3 / 0 tx / 0 pending / 0 (0.0%) gas / (0x3cb663880a65103266b11a8d8631beca5c482d515ac287125aa077b2e31b80b0)
2021-05-26 08:47:06.058+10:00 | pool-8-thread-1 | INFO  | QbftBesuControllerBuilder | Produced #4 / 0 tx / 0 pending / 0 (0.0%) gas / (0xc2927915ac0c94bab5fc9acea6608455f1c857d69e97191dc2c39e4ac411817b)
2021-05-26 08:47:08.058+10:00 | pool-8-thread-1 | INFO  | QbftBesuControllerBuilder | Imported #5 / 0 tx / 0 pending / 0 (0.0%) gas / (0xba63471d62c936733add9b884f5213c3842af9f52460268e39e0666ab82f02a5)
```

<br>

## Deploy smart contracts using truffle
* npx truffle migrate --network besu
* Smart contracts will be located in the "contracts" folder while scripts are in the "migrations" folder.

<br>

## Considerations
* If any changes are made to the genesis file (Besu network configuration), all nodes must be shut down.
* You may need to empty the data directory in each node (e.g. Node-1/data) in order to properly start the nodes again after altering the genesis file.
