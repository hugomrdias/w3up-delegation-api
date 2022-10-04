# w3up-delegation-api

> HTTP API that can delegate capabilities to the agent DID using `w3up-client`

## Usage

1. Install HTTP API dependencies:

```
pnpm i
```

2. Install `w3up` CLI from NPM:

```sh
npm install -g @web3-storage/w3up-cli
```

3. Create a DID and export your account settings for the HTTP API:

```sh
w3up id
w3up register <email>
w3up export-settings settings.json
```

4. Start your HTTP API Server (same directory where `settings.json` was exported):

```sh
npm run start
```

5. Create a new account DID

```sh
w3up id
✔ Agent DID: did:key:z6M...
✔ Account DID: did:key:z6M...
```

6. Delegate capabilities to a DID agent:

```sh
curl http://127.0.0.1:3000\?did\=did:key:z6M... --output test.car
```

7. Import UCAN elegation provided:

```sh
w3up import-delegation test.car main
```
