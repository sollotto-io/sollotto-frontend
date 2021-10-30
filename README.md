<p align="center">
  <a href="https://app.sollotto.io/">
    <img alt="Metaplex" src="https://app.sollotto.io/static/media/SolLotto-logo-horizontal.b4b49b1a.png" width="250" />
  </a>
</p>

# About us

SolLotto is the first decentralized peer-to-peer lottery system built on the Solana blockchain.

We believe a community-driven approach to effective altruism will result in the most impact globally, which is why we're introducing a lottery system that utilizes verifiable community-consensus to dynamically allocate the resources where the community believes they will do the most good each week.

### Model 1 (Traditional “Lottery” Giveaway Model)

Donate for a ticket, pick 6 numbers, vote for a charity, if your numbers match the 6 randomly selected winning numbers then you win.

### Model 2 (Pooled Giveaway Model)

Stake supported tokens, have a chance to win the prize pool generated from staking rewards based on how much of the staking pool you contributed.

### Model 3 (Launchpad Pool Model)

Stake supported tokens, have a chance to win a prize pool donated by an up and coming Solana project.

### Model 4 (Lifetime “Lottery” Giveaway Model)

Chances to win are increased by playing the traditional lottery model

### Model 5 (Fixed-Quantity Giveaway Model)(not implemented)

Only holders of the platform token are eligible to purchase a single ticket for each token held.

## Community

- [Discord](https://discord.gg/uMgJcMr5m2)
- [@teamsollotto](https://twitter.com/teamsollotto) on twitter
- [Website](https://sollotto.io/)

# Usage

## Installation

```bash
$ git clone https://github.com/sollotto-io/sollotto-frontend.git
$ cd solloto-frontend
$ npm install
```

### Setup enviroment variables

In order to start the app go to the `.env` file and proceed to fill the environment variables.

For setting up a development environment you will need to start locally the backend server included in [sollotto backend](https://github.com/sollotto-io/sollotto-backend.git) repo.

#### Enviroment Variables

```
REACT_APP_SOLANA_INIT_LOTTERY_PROGRAM = ""
REACT_APP_SOLANA_NETWORK = ""
REACT_APP_HOLDING_WALLET_PK_STRING = ""
REACT_APP_BACKEND_SERVER =""
REACT_APP_IMAGE_LINK =""
REACT_APP_UPLOAD_TO_S3 =""
```

- **SOLANA_INIT_PROGRAM:** Is the address for the on-chain model 1 lottery initialization. The on-chain model 1 program source code can be found in the [sollotto backend](https://github.com/sollotto-io/sollotto-backend.git) in the **feature/model4** branch

- **SOLANA_NETWORK:** The Solana network in which the program operates, for example: `https://api.devnet.solana.com/`

- **HOLDING_WALLET_PK_STRING:** The public key string for the holding wallet.

- **BACKEND_SERVER:** Link to the backend server. If you setting up the development environment locally it should be like this `http://localhost:5000/graphql`

- **IMAGE_LINK:** Link to the server where images are stored, we used AWS S3 for example

- **UPLOAD_TO_S3:** Link to the S3 Bucket where you gonna upload images, **this is important for the image upload functionality**

## Start the app

**Important in order to start the app you will need the BACKEND_SERVER env setup!**

```bash
$ npm start
```

Once is started you can go to `http://localhost:3000/` to see the app running

## Build the app

In order to build the app for production you will need to implement the following script

```bash
$ npm run build
$ cd build
```

In that folder you will find the app ready for production.
