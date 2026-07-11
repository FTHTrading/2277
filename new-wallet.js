// new-wallet.js
const { Keypair } = require('@solana/web3.js');
const fs = require('fs');

console.log("🔑 Generating new secure Solana wallet...\n");

const keypair = Keypair.generate();
const secretArray = Array.from(keypair.secretKey);
const address = keypair.publicKey.toString();

console.log("✅ New Wallet Created!");
console.log("────────────────────────────────────");
console.log("New Wallet Address:");
console.log(address);
console.log("────────────────────────────────────\n");

fs.writeFileSync('new-mint-authority.json', JSON.stringify(secretArray));

console.log("✅ Saved wallet to: new-mint-authority.json");
console.log("⚠️  KEEP THIS FILE SAFE — IT CONTAINS YOUR PRIVATE KEY!\n");

console.log("Next step: Send some SOL to this address:");
console.log(address);
