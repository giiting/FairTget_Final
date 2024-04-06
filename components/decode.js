import wallet from "../guideSecret.json";


async function decode() {
    const bs58 = require("bs58");
    //add wallet variable in the bracket
    const privkey = new Uint8Array(wallet); // content of id.json here
    console.log(bs58.encode(privkey));
}

export default decode();
