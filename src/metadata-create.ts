import { File, Web3Storage } from "web3.storage";

export const createMetadata = async (
  fullName: string,
  img_url: string,
  score: string,
  grade: string
) => {
  const client = new Web3Storage({
    token: process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN!,
  });

  const metadata = {
    name: fullName,
    symbol: "",
    description:
      "NFT from Solana and Nas Dev for all successful finishers of the Cohort Number 4.",
    image: img_url,
    attributes: [
      {
        trait_type: "Total Score",
        value: score,
      },
      {
        trait_type: "Letter Grade",
        value: grade,
      },
    ],
    properties: {
      files: [],
      category: "image",
      creators: [],
    },
  };

  const metadataFile = new File([JSON.stringify(metadata)], "metadata.json", {
    type: "application/json",
  });

  const metadata_cid = await client.put([metadataFile]);
  const metadata_url = `https://cloudflare-ipfs.com/ipfs/${metadata_cid}/metadata.json`;
  return metadata_url;
};
