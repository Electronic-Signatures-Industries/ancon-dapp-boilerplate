# Run Nodo Bee

# Command Docker compose

run the following docker command to add application container bee and signer container for clef

```
mkdir -p bee && cd bee
wget -q https://raw.githubusercontent.com/ethersphere/bee/master/packaging/docker/docker-compose.yml
wget -q https://raw.githubusercontent.com/ethersphere/bee/master/packaging/docker/env -O .env
```

# Configuration variables environment

## chain id to use for signing (100=mainnet(xdai), 5=testnet(goerli)) (default: 12345)
- `CLEF_CHAINID=5`

## enable clef signer
- `BEE_CLEF_SIGNER_ENABLE=true`

## clef signer endpoint
- `BEE_CLEF_SIGNER_ENDPOINT=http://clef-1:8550`

## origins with CORS headers enabled
- `BEE_CORS_ALLOWED_ORIGINS='http://localhost:8081'`

## enable debug HTTP API
- `BEE_DEBUG_API_ENABLE=true`

## cause the node to start in full mode
- `BEE_FULL_NODE=true`

## password for decrypting keys
- `BEE_PASSWORD=12345678`

## swap ethereum blockchain endpoint (default ws://localhost:8546)
BEE_SWAP_ENDPOINT=wss://goerli.infura.io/ws/v3/0d040d8837314f62afbc23381449a8a7

# Run Docker compose

```
docker-compose up -d
```

From logs find URL line with `on goerli you can get both goerli eth and goerli bzz from` and prefund your node
```
docker-compose logs -f bee-1
```

# Update Docker compose 

```
docker-compose pull && docker-compose up -d
```

# Step for faucet sprinkle your node 

1. go to the following link https://discord.com/invite/wdghaQsGq5

2. verify in the verification channel with a `#verification`

3. in the same verification channel we add `/faucet sprinkle addresses: 0x0`

4. check if our node is working using the following command in console: `curl localhost:1633`

5. for withdraw from your node use the following command in console: `curl -XPOST "http://localhost:1635/chequebook/withdraw?amount=9000000"`
