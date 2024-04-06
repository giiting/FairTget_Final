This is Project FairTget by team 2dudes. Is a NFT ticketing platfrom that uses NFT ticket and decentralized identity verification to reduce ticket scalping. 

This is a very rough prototype code. To get a clearer picture of the project please direct to https://www.figma.com/file/fiA9BLdaGB10LcRtAZGGeA/Fairtget-by-2dudes?type=whiteboard&node-id=832-830&t=fGPLCzzlB9sVaXJE-0

also 
https://app.pitch.com/app/presentation/fe9bf095-417b-4e36-b7ba-1ad15e0c1ca7/c7f3965b-d278-4a9f-a192-14f05721d19a

# Steps to follow:

1. Run the following command:

```
yarn install
```

2. upload your preferred image into folder "uploads" and rename it to "image.png"

3. Generate a test wallet for demo purposes. Run the following command:

```
yarn wallet
```

4. Request for airdrop by running the following command:

```
yarn airdrop
```

> Recommended: Import your newly created wallet to Phantom/Solflare with private keys. To get the private key, run the following command: yarn decode 

5. Login to Quicknode Dashboard and retrieve API key, and paste it in app.ts file

   > const QUICKNODE_RPC = "paste_api_here";

6. Mint NFT by running the following command:

```
yarn app
```


## Try the app here: [Click Me](https://solanaboilerplate.vercel.app/)


