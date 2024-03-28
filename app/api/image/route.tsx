import { fetchNft } from "@/lib/airstack";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get("a");
  const count = req.nextUrl.searchParams.get("c");

  const nft = await fetchNft(address!);
  const image = nft.contentValue?.image?.small;

  return new ImageResponse(
    (
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
          <div
            style={{
              fontSize: "32",
              color: "white",
              display: "flex",
              textAlign: "center",
            }}
          >
            {nft.metaData?.name}
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "white",
              display: "flex",
              textAlign: "center",
            }}
          >
            {parseInt(count!) || 0} mints
          </div>
        </div>
      </div>
    ),
    {
      width: 764,
      height: 400,
    }
  );
}
