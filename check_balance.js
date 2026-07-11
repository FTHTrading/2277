const { Connection, PublicKey, Keypair } = require('@solana/web3.js');
const fs = require('fs');
const path = require('path');
const os = require('os');

async function checkBalance() {
    // Old BURNED addresses (DO NOT SEND SOL)
    console.log('=== BURNED ADDRESSES (DO NOT USE) ===');
    const burned1 = new PublicKey('D1xUmVqAjda18tmrh2fDTsmc3fonzuRxA3i3Tffdbdca');
    console.log(`[BURNED] ${burned1.toString()}`);
    await queryBalance(burned1);

    const burned2 = new PublicKey('5vfpevJwuvsiHiw4C55sqeDkLq2FpH9Q3w99K8xsZee7');
    console.log(`\n[BURNED] ${burned2.toString()}`);
    await queryBalance(burned2);

    // New secure mint authority (key stored OUTSIDE project)
    console.log('\n=== ACTIVE MINT AUTHORITY ===');
    try {
        const keyPath = path.join(os.homedir(), '.config', 'solana', 'mog-mint-authority.json');
        if (fs.existsSync(keyPath)) {
            const secret = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
            const keypair = Keypair.fromSecretKey(Uint8Array.from(secret));
            console.log(`[ACTIVE] ${keypair.publicKey.toString()}`);
            await queryBalance(keypair.publicKey);
        } else {
            console.log('Key file not found at:', keyPath);
        }
    } catch (e) {
        console.error('Failed to read mint authority:', e.message);
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
