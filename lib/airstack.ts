import { getRedisClient } from "@/lib/redis";

export const fetchNft = async (address: string) => {
  const redis = await getRedisClient();

  const unparsedNFT = await redis.get(address);
  const cachedNft = JSON.parse(unparsedNFT ?? "");
  if (cachedNft) {
    if (process.env.DEBUG === "true") console.log("cachedNft");
    return cachedNft;
  }
  return null;
};
