import { fetchMetadata } from "frames.js/next";
import { checksumAddress } from "viem";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ searchParams }: Props) {
  let queryParams = [];
  if (searchParams.chain) queryParams.push(`chain=${searchParams.chain}`);
  if (searchParams.a) queryParams.push(`a=${searchParams.a}`);
  if (searchParams.c) queryParams.push(`c=${searchParams.c}`);

  const query = queryParams.join("&");

  const queryString = `/frame?${query}`;

  const metadata = {
    title: "Mint Frame",
    other: {
      ...(await fetchMetadata(
        new URL(queryString, process.env.BASE_URL || "http://localhost:3001")
      )),
    },
  };

  return metadata;
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
          <div className="text-3xl text-center font-black">Mint Frame</div>
          <div className="text-lg text-center font-semibold">
            Display Base mints in an Open Frame
          </div>
        </div>
        {a && c && chain && (
          <div className="flex flex-col items-center justify-center space-y-2">
            <img
              src={`${
                process.env.BASE_URL || "http://localhost:3001"
              }/api/image?a=${a}&c=${c}`}
            />
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
