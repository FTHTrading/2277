const fetch = require('node-fetch'); // Fallback if node version is older, but we can check if fetch is global

const blueprints = [
    {
        causeTitle: "Atlanta Mission 5K Reserve",
        goalAmount: "500000",
        tokenName: "Atlanta Mission 5K Reserve",
        tokenSymbol: "AM5K",
        initialSupply: "1000000000",
        decimals: 6,
        description: "Turnkey Property Rehabilitation Blueprint: foreclosure rescue and complete zero-carbon energy-efficiency rehab.",
        logoTemplate: "shield",
        videoUrl: "https://www.youtube.com/watch?v=NgkTHzXZk2U",
        translations: {},
        custodyEnabled: true,
        vaultingEnabled: true,
        seedingEnabled: true,
        routingEnabled: true
    },
    {
        causeTitle: "Wellspring Tiny Homes",
        goalAmount: "194707",
        tokenName: "Wellspring Tiny Homes",
        tokenSymbol: "WTH",
        initialSupply: "1000000000",
        decimals: 6,
        description: "Turnkey Property Rehabilitation Blueprint: foreclosure rescue and complete zero-carbon energy-efficiency rehab.",
        logoTemplate: "hands",
        videoUrl: "https://www.youtube.com/watch?v=YwJ-BleCUWM",
        translations: {},
        custodyEnabled: true,
        vaultingEnabled: true,
        seedingEnabled: true,
        routingEnabled: true
    },
    {
        causeTitle: "Gateway Center Impact",
        goalAmount: "250000",
        tokenName: "Gateway Center Impact",
        tokenSymbol: "GCI",
        initialSupply: "1000000000",
        decimals: 6,
        description: "Turnkey Zero Carbon RWA Blueprint: solar arrays and energy efficiency remodels with 12-month routing.",
        logoTemplate: "dove",
        videoUrl: "https://www.youtube.com/watch?v=P_zXryCBJfs",
        translations: {},
        custodyEnabled: true,
        vaultingEnabled: true,
        seedingEnabled: true,
        routingEnabled: true
    }
];

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function mintAll() {
    console.log("🚀 Starting sequential mainnet minting for templates...");
    
    for (const bp of blueprints) {
        console.log(`\n--------------------------------------------`);
        console.log(`⚡ Minting ${bp.tokenSymbol} (${bp.tokenName})...`);
        
        try {
            const response = await globalThis.fetch('http://localhost:3377/solana/mint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bp)
            });
            
            const data = await response.json();
            console.log("Result:", data);
            
            if (data.success) {
                console.log(`✅ ${bp.tokenSymbol} Minted Successfully! Address: ${data.mintAddress}`);
            } else {
                console.error(`❌ Failed to mint ${bp.tokenSymbol}:`, data.error);
            }
        } catch (e) {
            console.error(`❌ Network error while minting ${bp.tokenSymbol}:`, e.message);
        }
        
        console.log("Waiting 10 seconds before next mint to ensure blockhash updates...");
        await delay(10000);
    }
    
    console.log("\n✨ All template mints completed!");
}

mintAll();
