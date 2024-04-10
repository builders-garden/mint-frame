/* eslint-disable react/jsx-key */
import { fetchNft } from "@/lib/airstack";
import { createFrames, Button } from "frames.js/next";
import { checksumAddress, isAddress } from "viem";

const frames = createFrames();
let url = process.env.PUBLIC_FRAME_URL;
if (process.env.NODE_ENV === "development") {
  url = process.env.DEV_URL;
}
const handleRequest = frames(async (ctx) => {
  // console.log(ctx.url);
  const chain = ctx.url.searchParams.get("chain");
  const address = ctx.url.searchParams.get("a");
  const count = ctx.url.searchParams.get("c");
  if (chain !== "base" || !address || !isAddress(address) || !count) {
    return {
      accepts: [
        {
          id: "farcaster",
          version: "vNext",
        },
        {
          id: "xmtp",
          version: "vNext",
        },
      ],
      image: (
        <div
          style={{
            alignItems: "center",
            background: "black",
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            height: "100%",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: 60,
              fontStyle: "normal",
              letterSpacing: "-0.025em",
              lineHeight: 1.4,
              marginTop: 30,
              padding: "0 120px",
              whiteSpace: "pre-wrap",
            }}
          >
            {`The mint you're looking for is no longer trending, sorry!`}
          </div>
        </div>
      ),
    };
  }
  const nft = await fetchNft(address);
  if (!nft) {
    return {
      accepts: [
        {
          id: "farcaster",
          version: "vNext",
        },
        {
          id: "xmtp",
          version: "vNext",
        },
      ],
      image: (
        <div
          style={{
            alignItems: "center",
            background: "black",
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            height: "100%",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: 60,
              fontStyle: "normal",
              letterSpacing: "-0.025em",
              lineHeight: 1.4,
              marginTop: 30,
              padding: "0 120px",
              whiteSpace: "pre-wrap",
            }}
          >
            {`The mint you're looking for is no longer trending, sorry!`}
          </div>
        </div>
      ),
    };
  }

  return {
    image: `${url}/api/image?a=${address}&c=${count}`,
    imageOptions: {
      aspectRatio: "1:1",
      width: 500,
      height: 500,
    },
    accepts: [
      {
        id: "farcaster",
        version: "vNext",
      },
      {
        id: "xmtp",
        version: "vNext",
      },
    ],
    buttons: [
      <Button
        action="link"
        target={`https://zora.co/collect/${chain.toLowerCase()}:${checksumAddress(
          address
        )}`}
      >
        Mint on Zora
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
