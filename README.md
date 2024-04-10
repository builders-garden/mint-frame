# 🌳 mint-frame

a generic NextJS app that allows users to create trending mints frames by constructing a specific url.

## 📦 installation

once you have cloned the repository, you can install the dependencies by running the following command:

```bash
npm install # using npm
yarn install # using yarn
pnpm install # using pnpm
bun install # using bun
```

## 🚀 usage

the first step is to setup the **environment variables** for the project:

```bash
cp .env.example .env
```

make sure to populate the `.env` file with the correct values:

```bash
AIRSTACK_API_KEY="" # your Airstack API key
PUBLIC_FRAME_URL= # deployed vercel url
DEV_URL= # localhost url with port
PUBLIC_BOT_ADDRESS= # the address of the bot for deeplink with xmtp apps
```

once everything is ready, in order to start the development server you must run the following command:

```bash
npm run dev # using npm
yarn dev # using yarn
pnpm dev # using pnpm
bun dev # using bun
```

once the app is running, you can construct an URL with the following format:

```
http://localhost:3000/?chain={CHAIN}?a={ADDRESS}&c={COUNT}
```

where:

- `{CHAIN}` is the blockchain network, in this case only `base` is supported;
- `{ADDRESS}` is the address of the trending mint NFT;
- `{COUNT}` is the number of trending mints that you want to display.

## 📜 license

this project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
