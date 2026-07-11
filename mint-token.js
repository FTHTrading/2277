// Uses built-in global fetch

async function mint() {
    console.log("🚀 Requesting mint on Solana...");
    
    const body = {
        causeTitle: "Never Give A Buck",
        goalAmount: "194707",
        tokenName: "Never Give A Buck",
        tokenSymbol: "BUCK",
        initialSupply: "18444407",
        decimals: 6,
        description: "Sovereign charity fundraiser by UnyKorn LLC & Men of God",
        logoTemplate: "shield",
        videoUrl: "",
        translations: {},
        custodyEnabled: false,
        vaultingEnabled: false,
        seedingEnabled: false,
        routingEnabled: false
    };

    try {
        const response = await fetch('http://localhost:3377/solana/mint', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        
        const data = await response.json();
        console.log("Response:", data);
    } catch (e) {
        console.error("Mint request failed:", e);
    }
}

mint();
