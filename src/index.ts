import fs from "fs";
import { Item, airdropOne, CURRENT_PATH, BATCH_SIZE } from "./utils";
import { createMetadata } from "./metadata-create";

const airdropAll = async () => {
  const data = fs.readFileSync(CURRENT_PATH, "utf8");
  const json: Item[] = JSON.parse(data.toString())["Sheet1"];
  const start = 0;
  const batch = json.slice(start, start + BATCH_SIZE);

  await Promise.all(
    batch.map(async (item) => {
      const wallet = item["Wallet Address"];
      console.log("Airdropping to", wallet);
      const uri = await createMetadata(
        item["Full Name"],
        item["PNG"],
        item["Total Score"],
        item["Letter Grade"]
      );
      const nft = await airdropOne(wallet, uri);
      // for (let i = 0; i < batch.length; i++) {
      //   if (batch[i]["__3"] === wallet && nft?.uri === METADATA_URI) {
      //     // updating the field in the item
      //     batch[i]["__4"] = "TRUE";
      //     json[i]["__4"] = "TRUE";
      //   }
      // }
      //     fs.writeFileSync(CURRENT_PATH, JSON.stringify(json, null, 2), "utf8");
      //     if (nft?.uri === METADATA_URI) {
      //       // success callback
      //       console.log("Airdropped to", wallet);
      //     }
    })
  );
};

airdropAll();
