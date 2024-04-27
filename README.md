# Mint Frame 🌳

> 💬 **Try it:** Message `trendingmints.eth`

## Usage

Once the app is running, you can construct an URL with the following format:

```
http://localhost:3001/?chain={CHAIN}&a={ADDRESS}&c={COUNT}
```

where:

- `{CHAIN}` is the blockchain network, in this case only `base` is supported;
- `{ADDRESS}` is the address of the NFT
- `{COUNT}` is the number of trending mints that you want to display.

## Development

To kickstart the tutorial, you'll need to clone the repository containing the bot code. Follow these steps:

```bash
git clone https://github.com/fabriguespe/mint-frame.git
cd mint-frame
# copy env variables template
cp .env.example .env
```

**Set the variables**

```bash
BASE_URL= # frame url
AIRSTACK_API_KEY= # api key
PUBLIC_BOT_ADDRESS= # bot address
REDIS_CONNECTION_STRING= # redis connection string
```

> ⚠️ Bot kit is not compatible with `bun` yet. Use `npm` or `yarn`

```bash
# install dependencies
yarn install

# running the bot
yarn build
yarn start

# to run with hot-reload
yarn build:watch
yarn start:watch
```
