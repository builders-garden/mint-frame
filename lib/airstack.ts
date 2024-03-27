import { fetchQuery, init } from "@airstack/node";
import {
  NftDetailQuery,
  TimeFrame,
  TrendingMintsCriteria,
  TrendingsMintsQuery,
} from "./airstack-types";
import { getRedisClient } from "./redis";

init(process.env.AIRSTACK_API_KEY as string);

export const TRENDING_MINTS_QUERY_BASE =
  /* GraphQL */
  `
    query TrendingsMints(
      $timeFrame: TimeFrame!
      $criteria: TrendingMintsCriteria!
      $address: Address!
    ) {
      TrendingMints(
        input: {
          timeFrame: $timeFrame
          audience: all
          blockchain: base
          criteria: $criteria
          filter: { address: { _eq: $address } }
        }
      ) {
        TrendingMint {
          address
          erc1155TokenID
          criteriaCount
          timeFrom
          timeTo
          token {
            name
            symbol
            type
            tokenNfts {
              contentValue {
                image {
                  original
                  medium
                  large
                  extraSmall
                  small
                }
              }
            }
          }
        }
      }
    }
  `;

interface QueryResponse {
  data: TrendingsMintsQuery | null;
  error: Error | null;
}

interface Error {
  message: string;
}

export const fetchTrendingMint = async (
  timeFrame: TimeFrame,
  criteria: TrendingMintsCriteria,
  address: string
) => {
  const { data, error }: QueryResponse = await fetchQuery(
    TRENDING_MINTS_QUERY_BASE,
    {
      timeFrame,
      criteria,
      address,
    }
  );

  if (error) {
    console.error(error);
    process.exit(1);
  }

  if (
    !data ||
    !data.TrendingMints ||
    data.TrendingMints.TrendingMint?.length === 0
  ) {
    console.error("No trending mints found in timeframe:", timeFrame);
    return [];
  }

  return data.TrendingMints.TrendingMint;
};

const NFT_DETAIL_QUERY_BASE =
  /* GraphQL */
  `
    query NFTDetail($address: Address!) {
      TokenNfts(
        input: { filter: { address: { _eq: $address } }, blockchain: base }
      ) {
        TokenNft {
          tokenURI
          contentValue {
            image {
              small
              medium
            }
          }
          metaData {
            name
            description
          }
        }
      }
    }
  `;

interface NFTQueryResponse {
  data: NftDetailQuery | null;
  error: Error | null;
}

interface Error {
  message: string;
}

export const fetchNft = async (address: string) => {
  const redis = await getRedisClient();

  const cachedNft = await redis.get(address);

  if (cachedNft) {
    return JSON.parse(cachedNft);
  }

  const { data, error }: NFTQueryResponse = await fetchQuery(
    NFT_DETAIL_QUERY_BASE,
    {
      address,
    }
  );

  if (error) {
    console.error(error);
    process.exit(1);
  }

  if (!data || !data.TokenNfts || data.TokenNfts.TokenNft?.length === 0) {
    console.error("No NFT found");
    return null;
  }

  const nft = data.TokenNfts.TokenNft![0];

  const thirtyDaysInSeconds = 60 * 60 * 24 * 30;
  await redis.setEx(address, thirtyDaysInSeconds, JSON.stringify(nft));

  return nft;
};
