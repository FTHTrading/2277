const assert = require('assert');

async function runTests() {
    console.log("🧪 Starting Automated Backend Endpoint Tests...\n");
    const baseUrl = 'http://localhost:3377';

    // 1. Health check
    try {
        console.log("📋 Testing GET /health...");
        const res = await fetch(`${baseUrl}/health`);
        const data = await res.json();
        assert.strictEqual(res.status, 200);
        assert.strictEqual(data.status, 'online');
        console.log("✅ GET /health Passed!");
    } catch (err) {
        console.error("❌ GET /health Failed:", err.message);
        process.exit(1);
    }

    // 2. Solana Balance Check
    try {
        const wallet = '5vfpevJwuvsiHiw4C55sqeDkLq2FpH9Q3w99K8xsZee7';
        console.log(`📋 Testing GET /solana/balance/${wallet}...`);
        const res = await fetch(`${baseUrl}/solana/balance/${wallet}`);
        const data = await res.json();
        assert.strictEqual(res.status, 200);
        assert.strictEqual(data.success, true);
        assert.strictEqual(typeof data.balance, 'number');
        console.log(`✅ GET /solana/balance Passed! Balance: ${data.balance} SOL`);
    } catch (err) {
        console.error("❌ GET /solana/balance Failed:", err.message);
        process.exit(1);
    }

    // 3. IPFS Pinning (Certificate creation and wrangler/git mock deploy)
    try {
        console.log("📋 Testing POST /ipfs/pin...");
        const payload = {
            name: "Antigravity Automated Test",
            role: "Developer",
            msg: "Testing IPFS pinning proxy route integration"
        };
        const res = await fetch(`${baseUrl}/ipfs/pin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        assert.strictEqual(res.status, 200);
        assert.strictEqual(data.success, true);
        assert.strictEqual(typeof data.cid, 'string');
        assert.strictEqual(typeof data.url, 'string');
        console.log(`✅ POST /ipfs/pin Passed! CID: ${data.cid}`);
        console.log(`   Metadata URL: ${data.url}`);
    } catch (err) {
        console.error("❌ POST /ipfs/pin Failed:", err.message);
        process.exit(1);
    }

    console.log("\n🎉 All tests passed successfully!");
}

runTests();
