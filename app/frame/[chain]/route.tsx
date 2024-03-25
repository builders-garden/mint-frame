/* eslint-disable react/jsx-key */
import { fetchNft } from "@/lib/airstack";
import { createFrames, Button } from "frames.js/next";
import { checksumAddress, isAddress } from "viem";

const frames = createFrames();

const handleRequest = frames(async (ctx) => {
  // console.log(ctx.url);
  const chain = ctx.url.pathname.replaceAll("/frame/", "");
  const address = ctx.url.searchParams.get("a");
  const count = ctx.url.searchParams.get("c");

  if (chain !== "base" || !address || !isAddress(address) || !count) {
    return {
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

  const image = nft.contentValue?.image?.medium;

  return {
    image: (
      <div
        style={{
          alignItems: "center",
          background: "black",
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "space-around",
          textAlign: "center",
          width: "100%",
        }}
      >
        <img src={image!} style={{ width: "50%" }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <h1 style={{ fontSize: "36px", color: "white" }}>
            {nft.metaData?.name}
          </h1>
          <p style={{ fontSize: "24px", color: "white" }}>
            {parseInt(count) || 0} mints
          </p>
        </div>
      </div>
    ),
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
