import { fetchNft } from "@/lib/airstack";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import fs from "fs";
import { join } from "path";

const interFontPath = join(process.cwd(), "Inter-SemiBold.ttf");
const interFontData = fs.readFileSync(interFontPath);

export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get("a");
  const count = req.nextUrl.searchParams.get("c");

  const nft = await fetchNft(address!);
  const image = nft?.contentValue?.image?.small as string;
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
          width: "100%",
          position: "relative",
          padding: "4px",
        }}
      >
        <img
          src={image}
          style={{
            width: "100%",
            borderRadius: "8px",
            border: "2px solid white",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 8,
            left: 8,
            width: "98%",
            height: "40px",
            color: "white",
            background: "rgba(0, 0, 0, 0.5)",
            borderRadius: "0 0 8px 8px",
            display: "flex",
            justifyContent: "flex-end",
            padding: "8px",
            flexDirection: "column",
            fontFamily: "Inter-SemiBold",
          }}
        >
          {nft.metaData?.name}
        </div>
        <div
          style={{
            display: "flex",
            padding: "8px",
            position: "absolute",
            top: 12,
            right: 12,
            backgroundColor: "white",
            borderRadius: "60px",
            fontFamily: "Inter-SemiBold",
          }}
        >
          {parseInt(count!) || 0} mints
        </div>
      </div>
    ),
    {
      width: 400,
      height: 400,
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
