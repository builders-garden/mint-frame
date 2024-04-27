/* eslint-disable react/jsx-key */
import { ImageResponse } from "next/og";
import { fetchNft } from "@/lib/airstack";
import { createFrames, Button } from "frames.js/next";
import fs from "fs";
import { join } from "path";
import { checksumAddress, isAddress } from "viem";

const frames = createFrames();
const interFontPath = join(process.cwd(), "Inter-SemiBold.ttf");
const interFontData = fs.readFileSync(interFontPath);

const handleRequest = frames(async (ctx) => {
  const chain = ctx.url.pathname.replaceAll("/frame/", "");
  const address = ctx.url.searchParams.get("a");
  const count = ctx.url.searchParams.get("c");
  if (chain !== "base" || !address || !isAddress(address) || !count) {
    return new ImageResponse(
      (
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
            {`Invalid mint!`}
          </div>
        </div>
      ),
      {
        width: 500,
        height: 500,
        fonts: [
          {
            data: interFontData,
            name: "Inter-SemiBold.ttf",
            style: "normal",
            weight: 400,
          },
        ],
      }
    );
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
    image: `${
      process.env.BASE_URL || "http://localhost:3001"
    }/api/image?a=${address}&c=${count}`,
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
