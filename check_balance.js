const { Connection, PublicKey, Keypair } = require('@solana/web3.js');
const fs = require('fs');

async function checkBalance() {
    const oldAddress = new PublicKey('D1xUmVqAjda18tmrh2fDTsmc3fonzuRxA3i3Tffdbdca');
    console.log(`Checking old address: ${oldAddress.toString()}`);
    await queryBalance(oldAddress);

    try {
        if (fs.existsSync('new-mint-authority.json')) {
            const secret = JSON.parse(fs.readFileSync('new-mint-authority.json', 'utf8'));
            const keypair = Keypair.fromSecretKey(Uint8Array.from(secret));
            const newAddress = keypair.publicKey;
            console.log(`\nChecking new address: ${newAddress.toString()}`);
            await queryBalance(newAddress);
        }
    } catch (e) {
        console.error('Failed to read new-mint-authority.json:', e.message);
    }
}

async function queryBalance(address) {
    try {
        const devnetConnection = new Connection('https://api.devnet.solana.com', 'confirmed');
        const devnetBalance = await devnetConnection.getBalance(address);
        console.log(`Devnet Balance: ${devnetBalance / 1e9} SOL`);
    } catch (e) {
        console.error('Devnet query failed:', e.message);
    }

    try {
        const mainnetConnection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');
        const mainnetBalance = await mainnetConnection.getBalance(address);
        console.log(`Mainnet Balance: ${mainnetBalance / 1e9} SOL`);
    } catch (e) {
        console.error('Mainnet query failed:', e.message);
    }
}

checkBalance();
