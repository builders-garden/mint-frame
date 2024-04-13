import { fetchMetadata } from "frames.js/next";
import { useRouter } from "next/router";
import { checksumAddress } from "viem";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ searchParams }: Props) {
  const metadata = await fetchMetadata(
    new URL(
      `/frame/${searchParams.chain}?a=${searchParams.a}&c=${searchParams.c}`,
      url
    )
  );
  console.log(
    `/frame/${searchParams.chain}?a=${searchParams.a}&c=${searchParams.c}`,
    url
  );
  return {
    title: "Trending Mints Bot",
    other: {
      ...metadata,
    },
  };
}

export default function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { a, c, chain } = searchParams as any;
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-black">
      <div className="flex flex-col items-center justify-center space-y-8">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="text-3xl text-center font-black">
            Trending Mints Bot
          </div>
          <div className="text-lg text-center font-semibold">
            Get the latest trending mints on Zora
          </div>
        </div>
        {a && c && chain && (
          <div className="flex flex-col items-center justify-center space-y-2">
            <img src={`${url}/api/image?a=${a}&c=${c}`} />
            <div>
              <button className="bg-white rounded-lg text-black p-2">
                <a
                  target="_blank"
                  href={`https://zora.co/collect/${chain.toLowerCase()}:${checksumAddress(
                    a
                  )}`}
                >
                  Mint on Zora
                </a>
              </button>
            </div>
          </div>
        )}
        <div className="flex flex-col mt-8 space-y-4">
          <div className="flex flex-row space-x-2">
            <p className="text-center font-medium">
              <a
                target="_blank"
                className="text-red-600"
                href={`https://converse.xyz/dm/${process.env.PUBLIC_BOT_ADDRESS}`}
              >
                Converse
              </a>
            </p>
            <p>•</p>
            <p className="text-center font-medium">
              <a
                target="_blank"
                className="text-blue-600"
                href={`https://go.cb-w.com/messaging?address=${process.env.PUBLIC_BOT_ADDRESS}`}
              >
                Coinbase Wallet
              </a>
            </p>
          </div>

          <p className="text-center text-sm">
            Made with ❤️ by{" "}
            <a className="text-green-500" href="https://builders.garden">
              builders.garden
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
