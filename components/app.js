import { Connection, Keypair } from "@solana/web3.js";
import { Metaplex, keypairIdentity, bundlrStorage, toMetaplexFile, } from "@metaplex-foundation/js";
import * as fs from "fs";
import secret from "../guideSecret.json";
const QUICKNODE_RPC = "https://maximum-crimson-bush.solana-devnet.quiknode.pro/eb5ff8064685c7ebbbd537027983fba5a110ca9f/";
const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC, "confirmed");
//enter the secret key from guideSecret.json
const WALLET = Keypair.fromSecretKey(new Uint8Array(secret));
const METAPLEX = Metaplex.make(SOLANA_CONNECTION)
    .use(keypairIdentity(WALLET))
    .use(bundlrStorage({
    address: "https://devnet.bundlr.network",
    providerUrl: QUICKNODE_RPC,
    timeout: 60000,
}));
//CONFIGURATION. feel free to change the values
const CONFIG = {
    uploadPath: "uploads/",
    imgFileName: "image.png",
    imgType: "image/png",
    imgName: "QuickNode Pixel",
    description: "NFT ticket",
    attributes: [
        { trait_type: "Speed", value: "Quick" },
        { trait_type: "Type", value: "Pixelated" },
        { trait_type: "Background", value: "QuickNode Blue" },
    ],
    sellerFeeBasisPoints: 500, //500 bp = 5%
    symbol: "QNPIX",
    creators: [{ address: WALLET.publicKey, share: 100 }],
};
async function uploadImage(filePath, fileName) {
    console.log(`Step 1 - Uploading Image`);
    const imgBuffer = fs.readFileSync(filePath + fileName);
    const imgMetaplexFile = toMetaplexFile(imgBuffer, fileName);
    const imgUri = await METAPLEX.storage().upload(imgMetaplexFile);
    console.log(`   Image URI:`, imgUri);
    return imgUri;
}
async function uploadMetadata(imgUri, imgType, nftName, description, attributes) {
    console.log(`Step 2 - Uploading Metadata`);
    const { uri } = await METAPLEX.nfts().uploadMetadata({
        name: nftName,
        description: description,
        image: imgUri,
        attributes: attributes,
        properties: {
            files: [
                {
                    type: imgType,
                    uri: imgUri,
                },
            ],
        },
    });
    console.log("   Metadata URI:", uri);
    return uri;
}
async function mintNft(metadataUri, name, sellerFee, symbol, creators) {
    console.log(`Step 3 - Minting NFT`);
    const { nft } = await METAPLEX.nfts().create({
        uri: metadataUri,
        name: name,
        sellerFeeBasisPoints: sellerFee,
        symbol: symbol,
        creators: creators,
        isMutable: false,
    });
    console.log(`   Success!🎉`);
    console.log(`   Minted NFT: https://explorer.solana.com/address/${nft.address}?cluster=devnet`);
}
async function depployNft() {
    console.log(`Minting ${CONFIG.imgName} to an NFT in Wallet ${WALLET.publicKey.toBase58()}.`);
    //Step 1 - Upload Image
    const imgUri = await uploadImage(CONFIG.uploadPath, CONFIG.imgFileName);
    //Step 2 - Upload Metadata
    const metadataUri = await uploadMetadata(imgUri, CONFIG.imgType, CONFIG.imgName, CONFIG.description, CONFIG.attributes);
    //Step 3 - Mint NFT
    mintNft(metadataUri, CONFIG.imgName, CONFIG.sellerFeeBasisPoints, CONFIG.symbol, CONFIG.creators);
}
export default depployNft();
