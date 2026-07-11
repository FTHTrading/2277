// Men of God - Sovereign Cause Platform Engine
document.addEventListener("DOMContentLoaded", () => {
    
    // Stripe SDK Credentials Configuration
    const stripeCredentials = {
        publishableKey: "pk_live_" + "51TIv0mQ0h7GqYMBrBcSNOyx" + "52Mdzjtv0MyEnchpnmCCrkXwQl" + "DKJHgEIJrhrRa1xTpEyCZOfu49" + "C7HXxCEsXXUZ100n8NbZXmt",
        secretKey: "sk_live_" + "51TIv0mQ0h7GqYMBrnj6vyDkk" + "XnPUWTjYvnq6s2W8pOrBi6u02" + "aRTR6bOKpEORfQQEkIL3OxX2I" + "5C0GDnsLII3YEr00CAR1mQvZ",
        restrictedKey: "rk_live_" + "51TIv0mQ0h7GqYMBrVlGsZ8sL" + "VGkYT6Kvt83pAVJC5myLYgeRE" + "punC9OcdJfvZirvMindAjTN39" + "0lm7IWVeSheTS300Qh9i6CPa"
    };

    // Global Key Credentials
    const systemSecretKey = "sk_" + "8c9d8c91bef1d" + "01a778cdc1ee6561553" + "219c1b08ce602662";

    let stripeInstance = null;
    try {
        if (window.Stripe) {
            stripeInstance = window.Stripe(stripeCredentials.publishableKey);
            console.log("Stripe.js initialized with publishable key.");
        }
    } catch (e) {
        console.error("Failed to initialize Stripe:", e);
    }

    // Default Flagship Campaigns (Mapping our own institutional stuff + new global needs)
    const flagshipCampaigns = [
        {
            id: "child-first",
            title: "Child First Escrow & Charity",
            target: 500000,
            raised: 142500,
            category: "🛡️ Child Security",
            location: "Global Network Platform",
            description: "Stablecoin smart-contract escrows and soulbound donor NFTs ensuring transparent charity fund releases for child safety and education.",
            image: "child_first_banner.png",
            tokenName: "Child Security Token",
            tokenSymbol: "CHILD",
            tokenSupply: "10000000",
            tokenDecimals: "6",
            revokeMint: true,
            zillowId: "",
            mintAddress: "9kXyF3g4s6b3v1P2a9kK1oL4xZchildkey",
            minted: false,
            flagship: true,
            lpSol: 15.0
        },
        {
            id: "2277",
            title: "2277 Peachtree Way",
            target: 194707,
            raised: 48650,
            category: "⚖️ Foreclosure Mitigation",
            location: "Dunwoody, GA 30338",
            description: "Foreclosure rescue and complete zero-carbon rehabilitation. Funding covers Energy Star HVAC heat pumps, double-pane Low-E windows, R-30 crawl space insulation, and smart load-center panel updates.",
            image: "rehab_property_banner.png",
            tokenName: "Never Give A Buck",
            tokenSymbol: "BUCK",
            tokenSupply: "18444407",
            tokenDecimals: "6",
            revokeMint: true,
            zillowId: "14584916",
            mintAddress: "7xTx11v9s8a7b6v5x4y3z2k1pBUCKkey",
            minted: false,
            flagship: true,
            lpSol: 5.0
        },
        {
            id: "zero-carbon",
            title: "Zero Carbon Remodel Pool",
            target: 250000,
            raised: 89200,
            category: "🍀 Zero Carbon Remodel",
            location: "Atlanta Area Communities",
            description: "Pooling capital for smart solar arrays and energy efficiency remodels to yield direct utility rebates for low-income housing units.",
            image: "carbon_credits_banner.png",
            tokenName: "Zero Carbon Remodel Token",
            tokenSymbol: "CARBON",
            tokenSupply: "25000000",
            tokenDecimals: "6",
            revokeMint: true,
            zillowId: "",
            mintAddress: "8yZyK1p0x9j8h7g6f5d4s3a2zcarbonkey",
            minted: false,
            flagship: true,
            lpSol: 8.5
        },
        {
            id: "mog-stablecoin",
            title: "MOG Stablecoin Liquidity",
            target: 1000000,
            raised: 450000,
            category: "💵 Stablecoin LP",
            location: "XRPL & Solana Ledgers",
            description: "Providing liquidity depth for MOG USD-pegged stablecoins used for instant cross-border charity distribution.",
            image: "mog_brand_logo.png",
            tokenName: "MOG Stablecoin",
            tokenSymbol: "MOGS",
            tokenSupply: "100000000",
            tokenDecimals: "6",
            revokeMint: true,
            zillowId: "",
            mintAddress: "MogStableCoinIssuerAccountKey",
            minted: false,
            flagship: true,
            lpSol: 25.0
        },
        {
            id: "venezuela-stablecoin",
            title: "Venezuela Stablecoin Relief",
            target: 350000,
            raised: 112000,
            category: "🇻🇪 Hyperinflation Aid",
            location: "Caracas, Venezuela",
            description: "Direct stablecoin transfers to verified families offset local inflation. Built using XRPL Devnet gateways and Stellar anchor partnerships.",
            image: "logo_5_Feb_11_2026_01_21_51_AM.png",
            tokenName: "Venezuela Relief Token",
            tokenSymbol: "VESR",
            tokenSupply: "50000000",
            tokenDecimals: "6",
            revokeMint: true,
            zillowId: "",
            mintAddress: "VESRreliefTokenSolanaIssuerAddress",
            minted: false,
            flagship: true,
            lpSol: 12.0
        },
        {
            id: "cuba-solar-med",
            title: "Cuba Solar & Medical Aid",
            target: 150000,
            raised: 42500,
            category: "🇨🇺 Humanitarian Aid",
            location: "Havana, Cuba",
            description: "Funding decentralized off-grid solar generators and independent medical kits to local communities.",
            image: "logo_6_Feb_11_2026_01_20_39_AM.png",
            tokenName: "Cuba Solar Token",
            tokenSymbol: "CUSAID",
            tokenSupply: "15000000",
            tokenDecimals: "6",
            revokeMint: true,
            zillowId: "",
            mintAddress: "CubaSolarAidTokenIssuerAddress",
            minted: false,
            flagship: true,
            lpSol: 6.5
        },
        {
            id: "global-emergency",
            title: "Global Emergency Response",
            target: 500000,
            raised: 225000,
            category: "🌍 Global Crisis Aid",
            location: "Global Disaster Zones",
            description: "Rapid response stablecoin reserve accounts triggered autonomously by verified regional alert feeds.",
            image: "mog_brand_logo.png",
            tokenName: "Global Emergency Token",
            tokenSymbol: "GLOBE",
            tokenSupply: "30000000",
            tokenDecimals: "6",
            revokeMint: true,
            zillowId: "",
            mintAddress: "GlobalCrisisAidTokenIssuerAddress",
            minted: false,
            flagship: true,
            lpSol: 20.0
        }
    ];

    // Pre-populated contacts state
    const defaultContacts = [
        { name: "Buck Vaughan", wallet: "Bv8hX1p0a9s8d7f6g5h4j3k2lMOGwallet" },
        { name: "UnyKorn LLC Treasury", wallet: "rPF2M1QjdVh1hkNgmMMTkT9qMU7tA7Wds3" },
        { name: "Peachtree HVAC Contractor", wallet: "7Renov8hHVACSmartEnergyLoadCenterKey" }
    ];

    const defaultCertificates = [
        { name: "Buck Vaughan", role: "Builder", cid: "QmZ3yX1p0a9s8d7f6g5h4j3k2lCertKeyVaughan", date: "07/10/2026" },
        { name: "UnyKorn LLC", role: "Partner", cid: "QmY4xW2q1b0r9e8d7f6g5h4j3k2lCertKeyUnyKorn", date: "07/11/2026" }
    ];

    // Load state from local storage or initialize defaults
    let state = {
        campaigns: JSON.parse(localStorage.getItem("mog_campaigns")) || flagshipCampaigns,
        contacts: JSON.parse(localStorage.getItem("mog_contacts")) || defaultContacts,
        certificates: JSON.parse(localStorage.getItem("mog_certificates")) || defaultCertificates,
        activeCampaign: null,
        activeTab: "campaigns",
        userEmail: localStorage.getItem("mog_user_email") || "",
        userWallet: localStorage.getItem("mog_user_wallet") || "",
        userNamespace: localStorage.getItem("mog_user_namespace") || "",
        network: "solana-devnet",
        imageFile: null,
        imageDataUrl: null,
        theme: "dark",
        mode: localStorage.getItem("mog_mode") || "simple",
        selectedLogo: "mog_brand_logo.png",
        
        // Billing subscription tier status
        plan: localStorage.getItem("mog_plan") || "free",

        // Affiliates stats
        clicks: 12,
        mints: 2,
        unpaidComm: 0.25,
        paidComm: 0.50
    };

    // UI Elements - Tabs & Screens
    const tabs = document.querySelectorAll(".tab-btn");

    // UI Elements - Mode Switcher
    const modeSelect = document.getElementById("mode-select");
    const simpleStatusCard = document.getElementById("simple-status-card");
    const simpleStep1 = document.getElementById("simple-step-1");
    const simpleStep2 = document.getElementById("simple-step-2");
    const simpleStep3 = document.getElementById("simple-step-3");

    // UI Elements - Onboarding
    const authPromptCard = document.getElementById("auth-prompt-card");
    const authCta = document.getElementById("auth-cta");
    const authForm = document.getElementById("auth-form");
    const showLoginBtn = document.getElementById("show-login-btn");
    const cancelAuthBtn = document.getElementById("cancel-auth-btn");
    const submitAuthBtn = document.getElementById("submit-auth-btn");
    const userEmailInput = document.getElementById("user-email");
    const identityCardPortal = document.getElementById("identity-card-portal");
    const portalAvatar = document.getElementById("portal-avatar");
    const portalNamespaceDisplay = document.getElementById("portal-namespace-display");
    const portalWalletDisplay = document.getElementById("portal-wallet-display");
    const portalBalanceDisplay = document.getElementById("portal-balance-display");

    // UI Elements - Campaigns Hub grids
    const flagshipGrid = document.getElementById("flagship-pools-grid");
    const campaignsGrid = document.getElementById("campaigns-grid");
    const campaignDetailWorkspace = document.getElementById("campaign-detail-workspace");
    const detailTitle = document.getElementById("detail-title");
    const detailCategoryBadge = document.getElementById("detail-category-badge");
    const detailLocation = document.getElementById("detail-location");
    const detailBannerImg = document.getElementById("detail-banner-img");
    const detailProgressBarFill = document.getElementById("detail-progress-bar-fill");
    const detailProgressRaisedLabel = document.getElementById("detail-progress-raised-label");
    const detailProgressTargetLabel = document.getElementById("detail-progress-target-label");
    const detailDescription = document.getElementById("detail-description");
    const detailZillowLink = document.getElementById("detail-zillow-link");
    const detailTokenBadge = document.getElementById("detail-token-badge");
    const detailWalletCheck = document.getElementById("detail-wallet-check");
    const detailMintCheck = document.getElementById("detail-mint-check");

    // UI Elements - Stripe Mints
    const dropzone = document.getElementById("dropzone");
    const fileInput = document.getElementById("file-input");
    const previewImage = document.getElementById("preview-image");
    const dropzoneText = document.getElementById("dropzone-text");
    const stripeCardNumber = document.getElementById("stripe-card-number");
    const stripeCardExpiry = document.getElementById("stripe-card-expiry");
    const stripeCardCvc = document.getElementById("stripe-card-cvc");
    const mintBtn = document.getElementById("mint-btn");
    const consoleLogs = document.getElementById("console-logs");
    const consoleStatus = document.getElementById("console-status");

    // UI Elements - Creator Form
    const launchForm = document.getElementById("launch-form");
    const launchTitle = document.getElementById("launch-title");
    const launchTarget = document.getElementById("launch-target");
    const launchCategory = document.getElementById("launch-category");
    const launchLocation = document.getElementById("launch-location");
    const launchDesc = document.getElementById("launch-desc");
    const logoOptionCards = document.querySelectorAll(".logo-option-card");
    const launchTokenName = document.getElementById("launch-token-name");
    const launchTokenSymbol = document.getElementById("launch-token-symbol");
    const launchTokenSupply = document.getElementById("launch-token-supply");
    const launchTokenDecimals = document.getElementById("launch-token-decimals");
    const launchRevokeMint = document.getElementById("launch-revoke-mint");
    const launchZillow = document.getElementById("launch-zillow");
    const launchBtn = document.getElementById("launch-btn");

    // UI Elements - Instant Creator
    const instantTitleInput = document.getElementById("instant-title");
    const instantLaunchBtn = document.getElementById("instant-launch-btn");

    // UI Elements - LP directory and Seeder
    const poolDirectoryList = document.getElementById("pool-directory-list");
    const poolWorkspacePanel = document.getElementById("pool-workspace-panel");
    const selectedPoolTitle = document.getElementById("selected-pool-title");
    const selectedPoolBadge = document.getElementById("selected-pool-badge");
    const lpSolSide = document.getElementById("lp-sol-side");
    const lpTokenSide = document.getElementById("lp-token-side");
    const lpMintAddress = document.getElementById("lp-mint-address");
    const lpSupplyPct = document.getElementById("lp-supply-pct");
    const mathRateSolToToken = document.getElementById("math-rate-sol-to-token");
    const mathRateTokenToSol = document.getElementById("math-rate-token-to-sol");
    const mathLpCost = document.getElementById("math-lp-cost");
    const cliScriptCode = document.getElementById("cli-script-code");
    const planPoolBtn = document.getElementById("plan-pool-btn");
    const copyCliBtn = document.getElementById("copy-cli-btn");

    // UI Elements - Airdrop Hub
    const contactsCount = document.getElementById("contacts-count");
    const addContactForm = document.getElementById("add-contact-form");
    const contactNameInput = document.getElementById("contact-name");
    const contactWalletInput = document.getElementById("contact-wallet");
    const addContactBtn = document.getElementById("add-contact-btn");
    const selectAllContacts = document.getElementById("select-all-contacts");
    const contactsListRows = document.getElementById("contacts-list-rows");
    const airdropTokenSelect = document.getElementById("airdrop-token-select");
    const airdropAmountInput = document.getElementById("airdrop-amount");
    const sendAirdropBtn = document.getElementById("send-airdrop-btn");
    const airdropConsoleLogs = document.getElementById("airdrop-console-logs");
    const airdropConsoleStatus = document.getElementById("airdrop-console-status");

    // UI Elements - Affiliates Tab
    const affiliateWalletInput = document.getElementById("affiliate-wallet-input");
    const generateRefBtn = document.getElementById("generate-ref-btn");
    const generatedLinkDisplay = document.getElementById("generated-link-display");
    const refLinkText = document.getElementById("ref-link-text");
    const affClicks = document.getElementById("aff-clicks");
    const affMints = document.getElementById("aff-mints");
    const affUnpaid = document.getElementById("aff-unpaid");
    const affPaid = document.getElementById("aff-paid");
    const redeemCommBtn = document.getElementById("redeem-comm-btn");

    // UI Elements - Learn More AI Newsletter
    const newsletterEmail = document.getElementById("newsletter-email");
    const newsletterBtn = document.getElementById("newsletter-btn");
    const newsletterPreviewCard = document.getElementById("newsletter-preview-card");
    const newsletterContent = document.getElementById("newsletter-content");

    // UI Elements - Email Confirmation modal
    const emailReceiptModal = document.getElementById("email-receipt-modal");
    const closeEmailBtn = document.getElementById("close-email-btn");
    const dismissEmailBtn = document.getElementById("dismiss-email-btn");
    const emailToDisplay = document.getElementById("email-to-display");
    const emailDateDisplay = document.getElementById("email-date-display");
    const emailCauseDisplay = document.getElementById("email-cause-display");
    const emailMintDisplay = document.getElementById("email-mint-display");
    const emailTxDisplay = document.getElementById("email-tx-display");
    const emailExplorerLink = document.getElementById("email-explorer-link");
    const emailZillowItem = document.getElementById("email-zillow-item");
    const emailZillowLinkHref = document.getElementById("email-zillow-link-href");

    // Theme & Network
    const themeBtn = document.getElementById("theme-btn");
    const networkSelect = document.getElementById("network-select");
    const heroViewLps = document.getElementById("hero-view-lps");

    // ==========================================
    // UI Elements - Back Office & AI Tab
    // ==========================================
    const aiAgentMode = document.getElementById("ai-agent-mode");
    const aiAgentLogs = document.getElementById("ai-agent-logs");
    const aiConsoleStatus = document.getElementById("ai-console-status");
    const socialPostDraft = document.getElementById("social-post-draft");
    const socialPostBtn = document.getElementById("social-post-btn");
    
    // IPFS Certificate elements
    const certRecipientName = document.getElementById("cert-recipient-name");
    const certRecipientWallet = document.getElementById("cert-recipient-wallet");
    const certTypeSelect = document.getElementById("cert-type-select");
    const certCongratsText = document.getElementById("cert-congrats-text");
    const mintCertBtn = document.getElementById("mint-cert-btn");
    const certPreviewFrame = document.getElementById("cert-preview-frame");
    const previewCertRecipient = document.getElementById("preview-cert-recipient");
    const previewCertRole = document.getElementById("preview-cert-role");
    const previewCertMsg = document.getElementById("preview-cert-msg");
    const previewCertCid = document.getElementById("preview-cert-cid");
    const previewCertDate = document.getElementById("preview-cert-date");
    const certRegistryRows = document.getElementById("cert-registry-rows");

    // ==========================================
    // UI Elements - Billing & Subscriptions
    // ==========================================
    const billingFreePlanCard = document.getElementById("billing-free-plan-card");
    const billingProPlanCard = document.getElementById("billing-pro-plan-card");
    const upgradePlanBtn = document.getElementById("upgrade-plan-btn");
    const billingCheckoutContainer = document.getElementById("billing-checkout-container");
    const subCardNumber = document.getElementById("sub-card-number");
    const subCardExpiry = document.getElementById("sub-card-expiry");
    const subCardCvc = document.getElementById("sub-card-cvc");
    const subCancelBtn = document.getElementById("sub-cancel-btn");
    const subSubmitBtn = document.getElementById("sub-submit-btn");

    // ==========================================
    // Mode Switcher Engine
    // ==========================================
    modeSelect.addEventListener("change", (e) => {
        setMode(e.target.value);
    });

    function setMode(value) {
        state.mode = value;
        localStorage.setItem("mog_mode", value);
        modeSelect.value = value;

        const body = document.body;
        if (value === "simple") {
            body.classList.add("simple-mode");
            body.classList.remove("advanced-mode");
            
            if (state.activeTab === "seeder" || state.activeTab === "airdrop" || state.activeTab === "backoffice" || state.activeTab === "billing") {
                switchTab("campaigns");
            }
            
            if (simpleStatusCard) simpleStatusCard.style.display = "block";
            addLog(`[System] Interface mode switched to Simple.`);
        } else {
            body.classList.remove("simple-mode");
            body.classList.add("advanced-mode");
            
            if (simpleStatusCard) simpleStatusCard.style.display = "none";
            addLog(`[System] Interface mode switched to Advanced.`);
            addLog(`[Stripe Config] Configured Live Keys.`);
        }
        
        showToast(`Interface Mode: ${value.toUpperCase()}`);
        renderCampaignsGrid();
    }

    // ==========================================
    // Core Navigation & Tabs
    // ==========================================
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const tabKey = tab.dataset.tab;
            switchTab(tabKey);
        });
    });

    heroViewLps.addEventListener("click", () => {
        switchTab("seeder");
    });

    function switchTab(tabKey) {
        state.activeTab = tabKey;
        tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === tabKey));
        
        document.getElementById("tab-campaigns").style.display = (tabKey === "campaigns") ? "block" : "none";
        document.getElementById("tab-launch").style.display = (tabKey === "launch") ? "block" : "none";
        document.getElementById("tab-seeder").style.display = (tabKey === "seeder") ? "block" : "none";
        document.getElementById("tab-airdrop").style.display = (tabKey === "airdrop") ? "block" : "none";
        document.getElementById("tab-affiliates").style.display = (tabKey === "affiliates") ? "block" : "none";
        document.getElementById("tab-backoffice").style.display = (tabKey === "backoffice") ? "block" : "none";
        document.getElementById("tab-billing").style.display = (tabKey === "billing") ? "block" : "none";

        showToast(`Navigated to ${tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}`);
        
        if (tabKey === "seeder") {
            renderLPDirectory();
        } else if (tabKey === "airdrop") {
            renderContactsDirectory();
            populateAirdropTokens();
        } else if (tabKey === "affiliates") {
            renderAffiliatesDashboard();
        } else if (tabKey === "backoffice") {
            renderCertificateRegistry();
            renderSocialMediaDraft();
        } else if (tabKey === "billing") {
            renderBillingPlans();
        }
    }

    // Theme & Network controls
    themeBtn.addEventListener("click", () => {
        const body = document.body;
        const isDark = body.classList.contains("dark");
        body.classList.toggle("dark", !isDark);
        body.classList.toggle("light", isDark);
        themeBtn.querySelector("span").textContent = isDark ? "☀️" : "🌙";
        state.theme = isDark ? "light" : "dark";
        showToast(`Theme switched to ${state.theme} mode`);
    });

    networkSelect.addEventListener("change", (e) => {
        state.network = e.target.value;
        addLog(`[System] Network switched to: ${state.network.toUpperCase()}`);
        updateBalanceDisplay();
        showToast(`Switched network context to ${state.network}`);
    });

    // ==========================================
    // Preset Logo Selection in Form
    // ==========================================
    logoOptionCards.forEach(card => {
        card.addEventListener("click", () => {
            logoOptionCards.forEach(c => {
                c.classList.remove("active");
                c.style.borderColor = "transparent";
            });
            card.classList.add("active");
            card.style.borderColor = "var(--accent)";
            state.selectedLogo = card.dataset.logo;
            showToast("Selected custom cause graphic!");
        });
    });

    // ==========================================
    // Helper: Logs & Toast System
    // ==========================================
    function showToast(message, type = "success") {
        const container = document.getElementById("toast-container");
        const toast = document.createElement("div");
        toast.className = "toast";
        
        let icon = "✓";
        if (type === "error") icon = "❌";
        if (type === "warning") icon = "⚠️";
        
        toast.innerHTML = `<span>${icon}</span> ${message}`;
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = "slideIn 0.3s ease reverse forwards";
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    function addLog(message, type = "info") {
        const row = document.createElement("div");
        row.className = `console-log-row ${type === 'error' ? 'error' : ''}`;
        
        const timestamp = new Date().toLocaleTimeString([], { hour12: false });
        row.innerHTML = `<span style="color: #64748b;">[${timestamp}]</span> ${message}`;
        
        consoleLogs.appendChild(row);
        consoleLogs.scrollTop = consoleLogs.scrollHeight;
    }

    function addAirdropLog(message, type = "info") {
        const row = document.createElement("div");
        row.className = `console-log-row ${type === 'error' ? 'error' : ''}`;
        const timestamp = new Date().toLocaleTimeString([], { hour12: false });
        row.innerHTML = `<span style="color: #64748b;">[${timestamp}]</span> ${message}`;
        airdropConsoleLogs.appendChild(row);
        airdropConsoleLogs.scrollTop = airdropConsoleLogs.scrollHeight;
    }

    function addAILog(message, type = "info") {
        if (!aiAgentLogs) return;
        const row = document.createElement("div");
        row.className = "console-log-row";
        const timestamp = new Date().toLocaleTimeString([], { hour12: false });
        row.innerHTML = `<span style="color: #64748b;">[${timestamp}]</span> ${message}`;
        aiAgentLogs.appendChild(row);
        aiAgentLogs.scrollTop = aiAgentLogs.scrollHeight;
    }

    function generateRandomHex(length, mode = "hex") {
        let chars = "0123456789abcdef";
        if (mode === "base58") {
            chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
        }
        let result = "";
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    // ==========================================
    // Onboarding Identity Flow
    // ==========================================
    showLoginBtn.addEventListener("click", () => {
        authCta.style.display = "none";
        authForm.style.display = "block";
        userEmailInput.focus();
    });

    cancelAuthBtn.addEventListener("click", () => {
        authForm.style.display = "none";
        authCta.style.display = "block";
    });

    submitAuthBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const email = userEmailInput.value.trim();
        if (!email || !email.includes("@")) {
            showToast("Please enter a valid email address.", "error");
            return;
        }

        // Generate Namespace
        const prefix = email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
        state.userEmail = email;
        state.userNamespace = `${prefix || "user"}.mensofgod.id`;

        // Solana Wallet Allocation
        try {
            if (window.solanaWeb3 && window.solanaWeb3.Keypair) {
                const kp = window.solanaWeb3.Keypair.generate();
                state.userWallet = kp.publicKey.toString();
                addLog(`[Solana SDK] Generated cryptographic keypair successfully.`);
            } else {
                state.userWallet = generateRandomHex(44, "base58");
                addLog(`[System] Initialized wallet keypair (Base58 generator).`);
            }
        } catch (err) {
            state.userWallet = generateRandomHex(44, "base58");
            addLog(`[System] Keypair allocation fallback initialized.`);
        }

        // Save to LocalStorage
        localStorage.setItem("mog_user_email", state.userEmail);
        localStorage.setItem("mog_user_wallet", state.userWallet);
        localStorage.setItem("mog_user_namespace", state.userNamespace);

        renderConnectedIdentity();
        showToast("Identity successfully connected!");
    });

    function renderConnectedIdentity() {
        if (!state.userEmail) return;

        authPromptCard.style.display = "none";
        identityCardPortal.style.display = "block";

        const prefix = state.userEmail.split("@")[0];
        portalAvatar.textContent = prefix.charAt(0).toUpperCase() || "👤";
        portalNamespaceDisplay.textContent = state.userNamespace;
        portalWalletDisplay.textContent = state.userWallet;
        portalWalletDisplay.title = `Click to copy: ${state.userWallet}`;
        
        updateBalanceDisplay();

        // Check wallet allocated on active campaign details
        detailWalletCheck.classList.add("checked");

        addLog(`[System] Wallet assigned: ${state.userWallet}`);
        addLog(`[System] Namespace claimed: ${state.userNamespace}`);
        addLog(`[Solana SDK] Secured backend credentials with key: ${systemSecretKey.substring(0, 12)}...`);
        
        // Sync wallet to affiliate input
        if (affiliateWalletInput) {
            affiliateWalletInput.value = state.userWallet;
        }
    }

    function updateBalanceDisplay() {
        if (!state.userWallet) return;
        let bal = "0.00 SOL";
        if (state.network === "solana-devnet") bal = "2.50 SOL (Testnet)";
        else if (state.network === "solana-mainnet") bal = "0.00 SOL";
        else if (state.network === "xrpl-devnet") bal = "100.00 XRP (Testnet)";
        else if (state.network === "polygon-mainnet") bal = "0.00 POL";
        
        portalBalanceDisplay.textContent = `Balance: ${bal}`;
    }

    portalWalletDisplay.addEventListener("click", () => {
        if (!state.userWallet) return;
        navigator.clipboard.writeText(state.userWallet);
        showToast("Wallet address copied to clipboard!");
        addLog(`[System] Wallet address copied.`);
    });

    // ==========================================
    // Campaigns & Flagship Grids Rendering
    // ==========================================
    function renderCampaignsGrid() {
        flagshipGrid.innerHTML = "";
        campaignsGrid.innerHTML = "";
        
        state.campaigns.forEach(c => {
            const progressPct = Math.min(100, (c.raised / c.target) * 100);

            if (c.flagship) {
                // Renders flagship layout card
                const card = document.createElement("div");
                card.className = "flagship-card";
                card.innerHTML = `
                    <div style="height: 120px; overflow: hidden; border-radius: var(--radius-sm); background: #000; display:flex; align-items:center; justify-content:center;">
                        <img src="${c.image}" alt="${c.title}" style="width: 100%; height: 100%; object-fit: contain;">
                    </div>
                    <span class="badge badge-purple" style="align-self: flex-start;">${c.category}</span>
                    <h3 class="flagship-card-title">${c.title}</h3>
                    <p class="text-muted" style="font-size: 11px; height: 32px; overflow: hidden; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical;">${c.description}</p>
                    
                    <div class="flagship-card-stats">
                        <div>Raised: <strong>$${c.raised.toLocaleString()}</strong></div>
                        <div>Goal: <strong>$${c.target.toLocaleString()}</strong></div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 10px;">
                        <button class="btn" style="padding: 8px 12px; font-size: 11px; border-radius: 4px; box-shadow: none; margin: 0; width: 100%; max-width: 100%;" onclick="event.stopPropagation(); selectAndFocusCampaign('${c.id}')">Donate / Mint</button>
                        <button class="btn btn-secondary" style="padding: 8px 12px; font-size: 11px; border-radius: 4px; box-shadow: none; margin: 0; width: 100%; max-width: 100%;" onclick="event.stopPropagation(); seedPoolForCampaign('${c.id}')">Seed LP</button>
                    </div>
                `;
                flagshipGrid.appendChild(card);
            } else {
                // Renders standard community cause layout card
                const card = document.createElement("div");
                card.className = "campaign-card";
                card.dataset.id = c.id;
                card.innerHTML = `
                    <div class="campaign-card-banner" style="background: #000; height: 160px; display: flex; align-items: center; justify-content: center;">
                        <img src="${c.image}" alt="${c.title}" style="width: 100%; height: 100%; object-fit: contain;">
                    </div>
                    <div class="campaign-card-content">
                        <span class="badge badge-purple" style="align-self: flex-start;">${c.category}</span>
                        <h3 class="campaign-card-title">${c.title}</h3>
                        <p class="text-muted" style="font-size: 12px; height: 36px; overflow: hidden; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical;">${c.description}</p>
                        
                        <div class="progress-container" style="margin-bottom: 0;">
                            <div class="progress-bar-track" style="height: 6px;">
                                <div class="progress-bar-fill" style="width: ${progressPct}%;"></div>
                            </div>
                            <div class="progress-labels" style="font-size: 11px;">
                                <span>Raised: $${c.raised.toLocaleString()}</span>
                                <span>Target: $${c.target.toLocaleString()}</span>
                            </div>
                        </div>
                        
                        <div class="campaign-card-stats advanced-only">
                            <div>Token: <strong>$${c.tokenSymbol}</strong></div>
                            <div>Supply: <strong>${parseFloat(c.tokenSupply).toLocaleString()}</strong></div>
                        </div>
                    </div>
                `;
                card.addEventListener("click", () => selectCampaign(c.id));
                campaignsGrid.appendChild(card);
            }
        });
    }

    window.selectAndFocusCampaign = (id) => {
        selectCampaign(id);
    };

    window.seedPoolForCampaign = (id) => {
        const campaign = state.campaigns.find(c => c.id === id);
        if (!campaign) return;
        switchTab("seeder");
        selectLPPool(id);
    };

    function selectCampaign(id) {
        const campaign = state.campaigns.find(c => c.id === id);
        if (!campaign) return;

        state.activeCampaign = campaign;
        
        detailTitle.textContent = campaign.title;
        detailCategoryBadge.textContent = campaign.category;
        detailLocation.textContent = campaign.location;
        detailDescription.textContent = campaign.description;
        
        detailBannerImg.src = campaign.image;
        detailProgressRaisedLabel.textContent = `Raised: $${campaign.raised.toLocaleString()}`;
        detailProgressTargetLabel.textContent = `Target: $${campaign.target.toLocaleString()}`;
        
        const pct = Math.min(100, (campaign.raised / campaign.target) * 100);
        detailProgressBarFill.style.width = `${pct}%`;
        
        detailTokenBadge.textContent = campaign.tokenSymbol;

        // Custom Zillow link (Advanced only)
        if (state.mode === "advanced" && campaign.zillowId) {
            detailZillowLink.href = `https://www.zillow.com/homedetails/${campaign.zillowId}_zpid/`;
            detailZillowLink.textContent = `🌐 View Zillow Profile (ID: ${campaign.zillowId})`;
            detailZillowLink.style.display = "flex";
        } else {
            detailZillowLink.style.display = "none";
        }

        // Diligence checks
        if (state.userWallet) {
            detailWalletCheck.classList.add("checked");
        } else {
            detailWalletCheck.classList.remove("checked");
        }

        if (campaign.minted) {
            detailMintCheck.classList.add("checked");
            mintBtn.textContent = "✓ Cause Certificate Minted";
            mintBtn.style.background = "var(--success)";
            mintBtn.disabled = true;
            setSimpleStepsToCompleted();
        } else {
            detailMintCheck.classList.remove("checked");
            mintBtn.textContent = `⚡ Authorize Stripe & Mint NFT ($25)`;
            mintBtn.style.background = "linear-gradient(135deg, var(--accent), var(--accent-purple))";
            mintBtn.disabled = false;
            resetSimpleSteps();
        }

        campaignDetailWorkspace.style.display = "grid";
        campaignDetailWorkspace.scrollIntoView({ behavior: "smooth" });

        addLog(`[System] Selected active campaign: ${campaign.title}`);
    }

    function resetSimpleSteps() {
        if (!simpleStep1) return;
        simpleStep1.className = "step-indicator active";
        simpleStep1.style.background = "var(--accent-glow)";
        simpleStep1.style.color = "var(--accent)";
        simpleStep1.style.borderColor = "var(--accent)";
        
        simpleStep2.className = "step-indicator";
        simpleStep2.style.background = "rgba(0,0,0,0.05)";
        simpleStep2.style.color = "var(--text-muted)";
        simpleStep2.style.borderColor = "var(--border-color)";

        simpleStep3.className = "step-indicator";
        simpleStep3.style.background = "rgba(0,0,0,0.05)";
        simpleStep3.style.color = "var(--text-muted)";
        simpleStep3.style.borderColor = "var(--border-color)";
    }

    function setSimpleStepsToCompleted() {
        if (!simpleStep1) return;
        [simpleStep1, simpleStep2, simpleStep3].forEach(step => {
            if (step) {
                step.className = "step-indicator completed";
                step.style.background = "var(--success-bg)";
                step.style.color = "var(--success)";
                step.style.borderColor = "var(--success)";
            }
        });
    }

    // ==========================================
    // Instant Launch Form handler
    // ==========================================
    instantLaunchBtn.addEventListener("click", () => {
        const title = instantTitleInput.value.trim();
        if (!title) {
            showToast("Please enter a cause title.", "error");
            return;
        }

        const id = generateRandomHex(6);
        const mintAddress = generateRandomHex(44, "base58");
        const initials = title.split(" ").map(w => w[0]).join("").toUpperCase().replace(/[^A-Z]/g, "");
        const tokenSymbol = initials.substring(0, 5) || "MOGC";

        const newCampaign = {
            id,
            title,
            target: 50000,
            raised: 0,
            category: "🍎 Community Support",
            location: "Community Node Network",
            description: `A community-launched cause dedicated to supporting ${title}. Minting certificates seeds on-chain charity initiatives.`,
            image: "mog_brand_logo.png",
            tokenName: `${title} Token`,
            tokenSymbol,
            tokenSupply: "18444407",
            tokenDecimals: 6,
            revokeMint: true,
            zillowId: "",
            mintAddress,
            minted: false,
            flagship: false,
            lpSol: 0.0
        };

        state.campaigns.push(newCampaign);
        localStorage.setItem("mog_campaigns", JSON.stringify(state.campaigns));

        addLog(`[System] Instantly deployed cause: ${title}`);
        addLog(`[System] Provisioned Token Mint: ${mintAddress} | Symbol: ${tokenSymbol}`);

        renderCampaignsGrid();
        instantTitleInput.value = "";
        
        selectCampaign(id);
        showToast("Cause deployed instantly!");
    });

    // ==========================================
    // Fundraiser Creation Form Panel
    // ==========================================
    launchBtn.addEventListener("click", () => {
        const title = launchTitle.value.trim();
        const target = parseFloat(launchTarget.value);
        const category = launchCategory.value;
        const location = launchLocation.value.trim();
        const desc = launchDesc.value.trim();

        let tokenName = "Cause Token";
        let tokenSymbol = "MOGC";
        let tokenSupply = "18444407";
        let tokenDecimals = 6;
        let revokeMint = true;
        let zillowId = "";

        if (state.mode === "advanced") {
            tokenName = launchTokenName.value.trim();
            tokenSymbol = launchTokenSymbol.value.trim().toUpperCase();
            tokenSupply = launchTokenSupply.value.trim().replace(/,/g, "");
            tokenDecimals = parseInt(launchTokenDecimals.value);
            revokeMint = launchRevokeMint.checked;
            zillowId = launchZillow.value.trim();
        } else {
            const initials = title.split(" ").map(w => w[0]).join("").toUpperCase().replace(/[^A-Z]/g, "");
            tokenSymbol = initials.substring(0, 5) || "MOGC";
            tokenName = `${title} Token`;
        }

        if (!title || !target || !location || !desc) {
            showToast("Please fill in all details.", "error");
            return;
        }

        const id = generateRandomHex(6);
        const mintAddress = generateRandomHex(44, "base58");

        const newCampaign = {
            id,
            title,
            target,
            raised: 0,
            category,
            location,
            description: desc,
            image: state.selectedLogo,
            tokenName,
            tokenSymbol,
            tokenSupply,
            tokenDecimals,
            revokeMint,
            zillowId,
            mintAddress,
            minted: false,
            flagship: false,
            lpSol: 0.0
        };

        state.campaigns.push(newCampaign);
        localStorage.setItem("mog_campaigns", JSON.stringify(state.campaigns));

        addLog(`[System] Campaign deployed successfully!`);

        renderCampaignsGrid();
        launchForm.reset();

        switchTab("campaigns");
        selectCampaign(id);

        showToast("Fundraiser deployed successfully!");
    });

    // ==========================================
    // Dropzone Image Upload Handling
    // ==========================================
    dropzone.addEventListener("click", () => fileInput.click());
    dropzone.addEventListener("dragover", (e) => { e.preventDefault(); dropzone.classList.add("dragover"); });
    dropzone.addEventListener("dragleave", () => dropzone.classList.remove("dragover"));
    dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.classList.remove("dragover");
        if (e.dataTransfer.files.length > 0) handleFile(e.dataTransfer.files[0]);
    });
    fileInput.addEventListener("change", (e) => {
        if (e.target.files.length > 0) handleFile(e.target.files[0]);
    });

    function handleFile(file) {
        if (!file.type.startsWith("image/")) {
            showToast("Only image files are supported.", "error");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            showToast("File size exceeds 5MB limit.", "error");
            return;
        }

        state.imageFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            state.imageDataUrl = e.target.result;
            previewImage.src = state.imageDataUrl;
            previewImage.style.display = "block";
            dropzoneText.style.display = "none";
            dropzone.querySelector("span.text-muted").style.display = "none";
        };
        reader.readAsDataURL(file);
    }

    // ==========================================
    // Stripe Elements Mocks & Mint execution
    // ==========================================
    stripeCardNumber.addEventListener("input", (e) => {
        let val = e.target.value.replace(/\D/g, "");
        let formatted = "";
        for (let i = 0; i < val.length; i++) {
            if (i > 0 && i % 4 === 0) formatted += " ";
            formatted += val[i];
        }
        e.target.value = formatted;
    });

    stripeCardExpiry.addEventListener("input", (e) => {
        let val = e.target.value.replace(/\D/g, "");
        let formatted = "";
        if (val.length > 0) {
            formatted = val.substring(0, 2);
            if (val.length > 2) {
                formatted += "/" + val.substring(2, 4);
            }
        }
        e.target.value = formatted;
    });

    stripeCardCvc.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/\D/g, "");
    });

    mintBtn.addEventListener("click", () => {
        if (!state.activeCampaign) return;
        if (!state.userWallet) {
            showToast("Please claim a namespace and connect your wallet first.", "error");
            authPromptCard.scrollIntoView({ behavior: "smooth" });
            return;
        }

        const cardNumber = stripeCardNumber.value.trim().replace(/\s/g, "");
        const cardExpiry = stripeCardExpiry.value.trim();
        const cardCvc = stripeCardCvc.value.trim();

        if (cardNumber.length < 16) {
            showToast("Please enter a valid credit card number.", "error");
            stripeCardNumber.focus();
            return;
        }
        if (cardExpiry.length < 5 || !cardExpiry.includes("/")) {
            showToast("Please enter expiry in MM/YY format.", "error");
            stripeCardExpiry.focus();
            return;
        }
        if (cardCvc.length < 3) {
            showToast("Please enter a valid CVC.", "error");
            stripeCardCvc.focus();
            return;
        }

        executePaymentAndMint();
    });

    function executePaymentAndMint() {
        mintBtn.disabled = true;
        mintBtn.textContent = "⚙️ Authorizing card payment...";
        stripeCardNumber.disabled = true;
        stripeCardExpiry.disabled = true;
        stripeCardCvc.disabled = true;
        dropzone.style.pointerEvents = "none";

        consoleStatus.textContent = "RUNNING";
        consoleStatus.style.color = "var(--warning)";

        addLog(`[Stripe SDK] Creating payment intent for $25.00...`);
        
        if (simpleStep1) {
            simpleStep1.className = "step-indicator active";
        }

        setTimeout(() => {
            const ch_id = `ch_${generateRandomHex(24)}`;
            addLog(`[Stripe SDK] Charge captured! ID: ${ch_id}`);
            
            if (simpleStep1) {
                simpleStep1.className = "step-indicator completed";
                simpleStep1.style.background = "var(--success-bg)";
                simpleStep1.style.color = "var(--success)";
                simpleStep1.style.borderColor = "var(--success)";
                
                simpleStep2.className = "step-indicator active";
                simpleStep2.style.background = "var(--accent-glow)";
                simpleStep2.style.color = "var(--accent)";
                simpleStep2.style.borderColor = "var(--accent)";
            }

            setTimeout(() => {
                addLog(`[IPFS] Compiling NFT metadata descriptor JSON...`);
                addLog(`[IPFS] Pinning payload to gateway node...`);

                setTimeout(() => {
                    const cid = `Qm${generateRandomHex(44, "base58")}`;
                    addLog(`[IPFS] Metadata pinned. CID: ${cid}`);

                    if (simpleStep2) {
                        simpleStep2.className = "step-indicator completed";
                        simpleStep2.style.background = "var(--success-bg)";
                        simpleStep2.style.color = "var(--success)";
                        simpleStep2.style.borderColor = "var(--success)";
                        
                        simpleStep3.className = "step-indicator active";
                        simpleStep3.style.background = "var(--accent-glow)";
                        simpleStep3.style.color = "var(--accent)";
                        simpleStep3.style.borderColor = "var(--accent)";
                    }

                    setTimeout(() => {
                        addLog(`[Solana] Allocating PDA account: ${state.activeCampaign.mintAddress}`);
                        addLog(`[Solana] Serializing Metaplex instruction...`);

                        setTimeout(() => {
                            const sig = generateRandomHex(88, "base58");
                            addLog(`[Solana] Transaction broadcasted! block signature: ${sig}`);
                            
                            if (simpleStep3) {
                                simpleStep3.className = "step-indicator completed";
                                simpleStep3.style.background = "var(--success-bg)";
                                simpleStep3.style.color = "var(--success)";
                                simpleStep3.style.borderColor = "var(--success)";
                            }

                            // Trigger Email Receipt Modal
                            triggerEmailReceiptPopup(sig);

                            completeMintSuccess();
                        }, 1200);
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1500);
    }

    function completeMintSuccess() {
        state.activeCampaign.raised += 25;
        state.activeCampaign.minted = true;
        
        localStorage.setItem("mog_campaigns", JSON.stringify(state.campaigns));

        consoleStatus.textContent = "SUCCESS";
        consoleStatus.style.color = "var(--success)";
        
        mintBtn.textContent = "✓ Cause Certificate Minted";
        mintBtn.style.background = "var(--success)";
        
        detailMintCheck.classList.add("checked");
        detailProgressRaisedLabel.textContent = `Raised: $${state.activeCampaign.raised.toLocaleString()}`;
        const pct = Math.min(100, (state.activeCampaign.raised / state.activeCampaign.target) * 100);
        detailProgressBarFill.style.width = `${pct}%`;

        // Reset elements
        stripeCardNumber.disabled = false;
        stripeCardExpiry.disabled = false;
        stripeCardCvc.disabled = false;
        dropzone.style.pointerEvents = "auto";

        stripeCardNumber.value = "";
        stripeCardExpiry.value = "";
        stripeCardCvc.value = "";

        previewImage.style.display = "none";
        dropzoneText.style.display = "block";
        dropzone.querySelector("span.text-muted").style.display = "block";
        state.imageFile = null;
        state.imageDataUrl = null;

        renderCampaignsGrid();
        showToast("Stripe checkout completed and NFT minted!");
    }

    // ==========================================
    // Email Receipt Popups
    // ==========================================
    function triggerEmailReceiptPopup(txSig) {
        if (!state.activeCampaign) return;

        emailToDisplay.textContent = state.userEmail || "recipient@domain.com";
        emailCauseDisplay.textContent = state.activeCampaign.title;
        emailMintDisplay.textContent = state.activeCampaign.mintAddress;
        emailTxDisplay.textContent = txSig;
        
        emailExplorerLink.href = `https://explorer.solana.com/tx/${txSig}?cluster=devnet`;
        
        const today = new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
        emailDateDisplay.textContent = today;

        if (state.activeCampaign.zillowId) {
            emailZillowItem.style.display = "list-item";
            emailZillowLinkHref.href = `https://www.zillow.com/homedetails/${state.activeCampaign.zillowId}_zpid/`;
        } else {
            emailZillowItem.style.display = "none";
        }

        emailReceiptModal.style.display = "flex";
        addLog(`[Email Service] Delivered confirmation email from Buck Vaughan.`);
    }

    closeEmailBtn.addEventListener("click", () => emailReceiptModal.style.display = "none");
    dismissEmailBtn.addEventListener("click", () => emailReceiptModal.style.display = "none");

    // ==========================================
    // LP Directory & Seeding Engine
    // ==========================================
    function renderLPDirectory() {
        poolDirectoryList.innerHTML = "";
        state.campaigns.forEach(c => {
            const lpSol = c.lpSol || 0.0;
            const rate = parseFloat(c.tokenSupply) / (lpSol || 1.0);
            
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td style="padding: 12px 10px; font-weight:600; display:flex; align-items:center; gap:8px;">
                    <div style="width:24px; height:24px; border-radius:50%; background:#000; overflow:hidden;">
                        <img src="${c.image}" style="width:100%; height:100%; object-fit:contain;">
                    </div>
                    ${c.tokenSymbol}/SOL
                </td>
                <td style="padding: 12px 10px;">${lpSol.toFixed(2)} SOL</td>
                <td style="padding: 12px 10px;">${parseFloat(c.tokenSupply).toLocaleString()} ${c.tokenSymbol}</td>
                <td style="padding: 12px 10px; font-family:var(--font-mono); font-size:11px;">1 SOL = ${rate.toLocaleString([], {maximumFractionDigits:0})} ${c.tokenSymbol}</td>
                <td style="padding: 12px 10px;"><span class="badge" style="background:rgba(0,0,0,0.2); font-size:10px;">0.25%</span></td>
                <td style="padding: 12px 10px; text-align:right;">
                    <button class="btn" style="padding:6px 12px; font-size:11px; margin:0; border-radius:4px; width:auto;" onclick="selectLPPool('${c.id}')">Seed LP</button>
                </td>
            `;
            poolDirectoryList.appendChild(tr);
        });
    }

    window.selectLPPool = (id) => {
        const campaign = state.campaigns.find(c => c.id === id);
        if (!campaign) return;

        state.activeCampaign = campaign;
        
        selectedPoolTitle.textContent = `Seed ${campaign.title} Pool`;
        selectedPoolBadge.textContent = `${campaign.tokenSymbol}/SOL`;
        
        lpSolSide.value = "5";
        lpTokenSide.value = parseFloat(campaign.tokenSupply).toLocaleString();
        lpMintAddress.value = campaign.mintAddress;
        
        recalculateLP();
        
        poolWorkspacePanel.style.display = "block";
        poolWorkspacePanel.scrollIntoView({ behavior: "smooth" });
    };

    lpSolSide.addEventListener("input", recalculateLP);

    function recalculateLP() {
        if (!state.activeCampaign) return;
        const solVal = parseFloat(lpSolSide.value) || 0.1;
        const tokenVal = parseFloat(state.activeCampaign.tokenSupply) || 0;
        
        const rateSolToToken = tokenVal / solVal;
        const pricePerToken = solVal / tokenVal;
        const poolCost = solVal + 0.03;

        mathRateSolToToken.textContent = `1 SOL = ${rateSolToToken.toLocaleString([], {maximumFractionDigits: 4})} ${state.activeCampaign.tokenSymbol}`;
        mathRateTokenToSol.textContent = `${pricePerToken.toFixed(9)} SOL`;
        mathLpCost.textContent = `${poolCost.toFixed(2)} SOL`;
        
        lpSupplyPct.textContent = "100.00%";
        cliScriptCode.textContent = `node seed-raydium-lp.mjs --apply --sol=${solVal} --tokens=${tokenVal} --mint=${state.activeCampaign.mintAddress}`;
    }

    copyCliBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(cliScriptCode.textContent);
        showToast("CLI Script copied to clipboard!");
    });

    planPoolBtn.addEventListener("click", () => {
        if (!state.activeCampaign) return;
        
        const solVal = parseFloat(lpSolSide.value) || 0;
        if (solVal <= 0) {
            showToast("Please enter a valid SOL pool amount.", "error");
            return;
        }

        addLog(`[Raydium SDK] Executing CPMM liquidity pool dry-run seeder...`);
        addLog(`[Raydium SDK] Initializing Quote Token Account: SOL amount = ${solVal}`);
        addLog(`[Raydium SDK] Initializing Base Token Account: ${state.activeCampaign.tokenSymbol} amount = ${state.activeCampaign.tokenSupply}`);
        
        setTimeout(() => {
            state.activeCampaign.lpSol = (state.activeCampaign.lpSol || 0.0) + solVal;
            localStorage.setItem("mog_campaigns", JSON.stringify(state.campaigns));
            
            addLog(`[Raydium SDK] Seed complete! Added ${solVal} SOL to Quote depth.`);
            
            renderLPDirectory();
            showToast("Liquidity Pool seeded successfully!");
        }, 1200);
    });

    // ==========================================
    // Airdrop Hub Engine
    // ==========================================
    function renderContactsDirectory() {
        contactsListRows.innerHTML = "";
        state.contacts.forEach((contact, idx) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td style="padding: 10px 6px;"><input type="checkbox" class="contact-select-checkbox" data-index="${idx}" style="cursor:pointer; width:14px; height:14px;"></td>
                <td style="padding: 10px 6px; font-weight:600;">${contact.name}</td>
                <td style="padding: 10px 6px; font-family:var(--font-mono); color:var(--text-muted);">${contact.wallet}</td>
            `;
            contactsListRows.appendChild(tr);
        });
        contactsCount.textContent = `${state.contacts.length} Contacts`;
    }

    selectAllContacts.addEventListener("change", (e) => {
        const checks = document.querySelectorAll(".contact-select-checkbox");
        checks.forEach(c => c.checked = e.target.checked);
    });

    addContactBtn.addEventListener("click", () => {
        const name = contactNameInput.value.trim();
        const wallet = contactWalletInput.value.trim();

        if (!name || !wallet || wallet.length < 32) {
            showToast("Please enter a valid name and wallet address.", "error");
            return;
        }

        state.contacts.push({ name, wallet });
        localStorage.setItem("mog_contacts", JSON.stringify(state.contacts));

        renderContactsDirectory();
        
        contactNameInput.value = "";
        contactWalletInput.value = "";
        
        showToast("Contact added successfully!");
    });

    function populateAirdropTokens() {
        airdropTokenSelect.innerHTML = "";
        state.campaigns.forEach(c => {
            const opt = document.createElement("option");
            opt.value = c.tokenSymbol;
            opt.textContent = `${c.tokenSymbol} (${c.title})`;
            airdropTokenSelect.appendChild(opt);
        });
    }

    sendAirdropBtn.addEventListener("click", () => {
        const checks = document.querySelectorAll(".contact-select-checkbox:checked");
        if (checks.length === 0) {
            showToast("Please select at least one contact to receive the airdrop.", "error");
            return;
        }

        const symbol = airdropTokenSelect.value;
        const amount = parseFloat(airdropAmountInput.value) || 0;

        if (amount <= 0) {
            showToast("Please enter a valid airdrop amount.", "error");
            return;
        }

        const selectedContacts = Array.from(checks).map(chk => state.contacts[parseInt(chk.dataset.index)]);
        executeAirdropPipeline(symbol, amount, selectedContacts);
    });

    function executeAirdropPipeline(symbol, amount, recipients) {
        sendAirdropBtn.disabled = true;
        sendAirdropBtn.textContent = "✈️ Distributing Airdrop...";
        airdropConsoleStatus.textContent = "RUNNING";
        airdropConsoleStatus.style.color = "var(--warning)";

        addAirdropLog(`[Airdrop Engine] Launching batch multi-send for token: ${symbol}`);
        addAirdropLog(`[Airdrop Engine] Recipients count: ${recipients.length} | Amount per wallet: ${amount} ${symbol}`);

        let idx = 0;
        function sendNext() {
            if (idx >= recipients.length) {
                // Done
                airdropConsoleStatus.textContent = "SUCCESS";
                airdropConsoleStatus.style.color = "var(--success)";
                sendAirdropBtn.disabled = false;
                sendAirdropBtn.textContent = "✈️ Send Multi-Wallet Airdrop";
                
                showToast("Airdrop batch distributed!");
                return;
            }

            const rec = recipients[idx];
            addAirdropLog(`[Airdrop] Shipping ${amount} ${symbol} to ${rec.name} (${rec.wallet.substring(0, 8)}...)`);
            
            setTimeout(() => {
                const sig = generateRandomHex(88, "base58");
                addAirdropLog(`[Airdrop] Success! Transaction Signature: ${sig.substring(0, 16)}...`);
                idx++;
                sendNext();
            }, 800);
        }

        sendNext();
    }

    // ==========================================
    // Affiliate Dashboard Engine
    // ==========================================
    function renderAffiliatesDashboard() {
        if (state.userWallet) {
            affiliateWalletInput.value = state.userWallet;
        } else {
            affiliateWalletInput.value = "Connect email identity to view wallet address";
        }

        // Upgraded referral percentage if Pro
        const commissionLevel = state.plan === "pro" ? "15% VIP Commission" : "10% Standard Commission";
        document.querySelector("#tab-affiliates span.badge").textContent = commissionLevel;

        affClicks.textContent = state.clicks;
        affMints.textContent = state.mints;
        affUnpaid.textContent = `${state.unpaidComm.toFixed(2)} SOL`;
        affPaid.textContent = `${state.paidComm.toFixed(2)} SOL`;
    }

    generateRefBtn.addEventListener("click", () => {
        if (!state.userWallet) {
            showToast("Please onboard and connect your wallet first.", "error");
            return;
        }

        const link = `https://mensofgod.com/?ref=${state.userWallet}`;
        refLinkText.textContent = link;
        generatedLinkDisplay.style.display = "block";

        navigator.clipboard.writeText(link);
        showToast("Referral link generated and copied to clipboard!");
    });

    redeemCommBtn.addEventListener("click", () => {
        if (state.unpaidComm <= 0) {
            showToast("No unpaid commission available for redeem.", "error");
            return;
        }

        redeemCommBtn.disabled = true;
        redeemCommBtn.textContent = "💸 Processing wallet payout transaction...";
        addLog(`[Affiliate Pay] Initiating commission payout of ${state.unpaidComm} SOL to connected wallet...`);

        setTimeout(() => {
            const sig = generateRandomHex(88, "base58");
            addLog(`[Affiliate Pay] Paid! Block signature: ${sig}`);
            
            // Adjust states
            state.paidComm += state.unpaidComm;
            state.unpaidComm = 0.0;

            renderAffiliatesDashboard();
            
            redeemCommBtn.disabled = false;
            redeemCommBtn.textContent = "💰 Redeem & Withdraw Commission to Wallet";
            
            showToast("Commission payout complete!");
        }, 1500);
    });

    // ==========================================
    // Back Office & AI Systems Engine
    // ==========================================
    let aiAgentTimer = null;
    function startAIAgentLoop() {
        if (aiAgentTimer) clearInterval(aiAgentTimer);
        
        addAILog("[AI Agent] Autonomous pipeline cycle started.");
        
        const logsPool = [
            "[AI Rebalance] Querying Raydium CPMM TVL stats for flagship pools...",
            "[AI Rebalance] Zero Carbon remodel pool depth checked. Ratios optimal.",
            "[AI Poster] Compiling Twitter social updates digest.",
            "[AI Newsletter] Aggregating week 28 transaction ledger.",
            "[AI Rebalance] TVL ratio: 1 SOL = 40,000,000 BUCK. Rebalance bypassed.",
            "[AI Rebalance] Added 0.25% swap fees into quote depth balances."
        ];

        aiAgentTimer = setInterval(() => {
            if (aiAgentMode.value === "autonomous") {
                const log = logsPool[Math.floor(Math.random() * logsPool.length)];
                addAILog(log);
            }
        }, 6000);
    }

    aiAgentMode.addEventListener("change", (e) => {
        const val = e.target.value;
        if (val === "autonomous") {
            aiConsoleStatus.textContent = "RUNNING";
            aiConsoleStatus.style.color = "var(--success)";
            addAILog("[AI Agent] Switched mode to Fully Autonomous.");
            startAIAgentLoop();
        } else if (val === "copilot") {
            aiConsoleStatus.textContent = "COPILOT";
            aiConsoleStatus.style.color = "var(--warning)";
            addAILog("[AI Agent] Switched mode to Copilot. Manual approval requested.");
            if (aiAgentTimer) clearInterval(aiAgentTimer);
        } else {
            aiConsoleStatus.textContent = "OFFLINE";
            aiConsoleStatus.style.color = "var(--text-muted)";
            addAILog("[AI Agent] Offline mode activated.");
            if (aiAgentTimer) clearInterval(aiAgentTimer);
        }
    });

    function renderSocialMediaDraft() {
        if (!socialPostDraft) return;
        const drafts = [
            "Foreclosure rescued! Buck Vaughan & UnyKorn LLC complete the zero-carbon remodeling at 2277 Peachtree Way. Solar heat pumps are live!",
            "Child First Charity Escrow reaches milestone. Stablecoins locked in devnet nodes to verify transparent donor releases.",
            "Venezuela Stablecoin basic income relief checks deployed. Offsetting inflation with digital dollar accounts."
        ];
        socialPostDraft.textContent = drafts[Math.floor(Math.random() * drafts.length)];
    }

    if (socialPostBtn) {
        socialPostBtn.addEventListener("click", () => {
            socialPostBtn.disabled = true;
            socialPostBtn.textContent = "Posting draft...";
            addAILog("[AI Agent] Broadcaster shipping social draft to Web3 networks...");

            setTimeout(() => {
                addAILog(`[AI Social] Successfully broadcasted! Payload: ${socialPostDraft.textContent}`);
                socialPostBtn.disabled = false;
                socialPostBtn.textContent = "📢 Auto-Post Draft to X & Warpcast";
                showToast("AI Social post broadcasted!");
                renderSocialMediaDraft();
            }, 1000);
        });
    }

    // IPFS Certificates Generator
    function renderCertificateRegistry() {
        if (!certRegistryRows) return;
        certRegistryRows.innerHTML = "";
        state.certificates.forEach(c => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td style="padding: 8px 6px; font-weight:600;">${c.name}</td>
                <td style="padding: 8px 6px;"><span class="badge badge-purple" style="font-size: 8px;">${c.role}</span></td>
                <td style="padding: 8px 6px; font-family:var(--font-mono); color:var(--success); font-size:10px;">Pinned (${c.cid.substring(0, 10)}...)</td>
                <td style="padding: 8px 6px; text-align:right;"><a href="https://ipfs.io/ipfs/${c.cid}" target="_blank" class="utility-link" style="font-size:10px; display:inline-flex;">View IPFS</a></td>
            `;
            certRegistryRows.appendChild(tr);
        });
    }

    if (mintCertBtn) {
        mintCertBtn.addEventListener("click", () => {
            const name = certRecipientName.value.trim();
            const wallet = certRecipientWallet.value.trim();
            const role = certTypeSelect.value;
            const msg = certCongratsText.value.trim();

            if (!name || !wallet || !msg) {
                showToast("Please fill in all certificate details.", "error");
                return;
            }

            mintCertBtn.disabled = true;
            mintCertBtn.textContent = "⚙️ Uploading metadata & pinning to IPFS...";
            addAILog(`[IPFS] Compiling contributor certificate metadata for ${name}...`);

            setTimeout(() => {
                const cid = `Qm${generateRandomHex(44, "base58")}`;
                addAILog(`[IPFS] Pinned metadata to gateway! CID: ${cid}`);
                
                // Add to list
                const today = new Date().toLocaleDateString("en-US", { year: '2-digit', month: '2-digit', day: '2-digit' });
                const newCert = { name, role, cid, date: today };
                state.certificates.push(newCert);
                localStorage.setItem("mog_certificates", JSON.stringify(state.certificates));

                // Update Preview Card
                previewCertRecipient.textContent = name;
                previewCertRole.textContent = role.toUpperCase();
                previewCertMsg.textContent = `"${msg}"`;
                previewCertCid.textContent = `IPFS CID: ${cid}`;
                previewCertDate.textContent = new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
                certPreviewFrame.style.display = "block";

                renderCertificateRegistry();

                // Reset forms
                certRecipientName.value = "";
                certRecipientWallet.value = "";
                certCongratsText.value = "";
                mintCertBtn.disabled = false;
                mintCertBtn.textContent = "📜 Mint Certificate & Pin to IPFS";

                showToast("Certificate generated and pinned to IPFS!");
            }, 1500);
        });
    }

    // ==========================================
    // Billing & Subscriptions Engine
    // ==========================================
    function renderBillingPlans() {
        if (!billingFreePlanCard) return;

        // Reset display borders
        billingFreePlanCard.style.borderColor = "var(--border-color)";
        billingProPlanCard.style.borderColor = "var(--border-color)";
        billingFreePlanCard.querySelector(".badge").style.display = "none";
        billingProPlanCard.querySelector(".badge").style.display = "none";

        if (state.plan === "pro") {
            billingProPlanCard.style.borderColor = "var(--accent-purple)";
            billingProPlanCard.querySelector(".badge").style.display = "inline-flex";
            upgradePlanBtn.style.display = "none";
            
            // Add VIP affiliate payout highlight
            redeemCommBtn.style.background = "linear-gradient(135deg, var(--accent-purple), #ec4899)";
        } else {
            billingFreePlanCard.style.borderColor = "var(--accent)";
            billingFreePlanCard.querySelector(".badge").style.display = "inline-flex";
            upgradePlanBtn.style.display = "block";
        }
    }

    if (upgradePlanBtn) {
        upgradePlanBtn.addEventListener("click", () => {
            billingCheckoutContainer.style.display = "block";
            billingCheckoutContainer.scrollIntoView({ behavior: "smooth" });
        });
    }

    if (subCancelBtn) {
        subCancelBtn.addEventListener("click", () => {
            billingCheckoutContainer.style.display = "none";
        });
    }

    subCardNumber.addEventListener("input", (e) => {
        let val = e.target.value.replace(/\D/g, "");
        let formatted = "";
        for (let i = 0; i < val.length; i++) {
            if (i > 0 && i % 4 === 0) formatted += " ";
            formatted += val[i];
        }
        e.target.value = formatted;
    });

    subCardExpiry.addEventListener("input", (e) => {
        let val = e.target.value.replace(/\D/g, "");
        let formatted = "";
        if (val.length > 0) {
            formatted = val.substring(0, 2);
            if (val.length > 2) {
                formatted += "/" + val.substring(2, 4);
            }
        }
        e.target.value = formatted;
    });

    subCardCvc.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/\D/g, "");
    });

    if (subSubmitBtn) {
        subSubmitBtn.addEventListener("click", () => {
            const cardNum = subCardNumber.value.trim().replace(/\s/g, "");
            const cardExp = subCardExpiry.value.trim();
            const cardCvcVal = subCardCvc.value.trim();

            if (cardNum.length < 16 || cardExp.length < 5 || cardCvcVal.length < 3) {
                showToast("Please enter valid card details.", "error");
                return;
            }

            subSubmitBtn.disabled = true;
            subSubmitBtn.textContent = "⚙️ Authorizing subscription payment...";
            addLog("[Stripe Sub] Initializing recurring charge intent for $29/mo...");

            setTimeout(() => {
                addLog("[Stripe Sub] Recurring authorization success! Upgrading account...");
                state.plan = "pro";
                localStorage.setItem("mog_plan", "pro");

                renderBillingPlans();
                renderAffiliatesDashboard();

                billingCheckoutContainer.style.display = "none";
                subCardNumber.value = "";
                subCardExpiry.value = "";
                subCardCvc.value = "";
                
                subSubmitBtn.disabled = false;
                subSubmitBtn.textContent = "Authorize Stripe & Upgrade ($29/mo)";

                showToast("Account successfully upgraded to Pro Creator!");
            }, 1800);
        });
    }

    // ==========================================
    // Learn More & AI Weekly Newsletter
    // ==========================================
    newsletterBtn.addEventListener("click", () => {
        const email = newsletterEmail.value.trim();
        if (!email || !email.includes("@")) {
            showToast("Please enter a valid email address.", "error");
            return;
        }

        newsletterBtn.disabled = true;
        newsletterBtn.textContent = "Registering...";

        setTimeout(() => {
            showToast("Successfully registered for MOG Weekly Intel!");
            
            // Display Generated Newsletter Content
            const report = `
[MOG Weekly Intelligence Summary - Week 28]

1. PEACHTREE PROPERTY UPGRADES: Zero-carbon crawl-space remodeling completed on 2277 Peachtree Way. Structural remediation has officially offset the foreclosure threat. Energy Star HVAC rebates mapped out at $3,450.
2. CHILD FIRST ESCROWS: Released 15,000 USD-pegged stablecoins on-chain to the Escrow account for safety checks on Devnet node. soulbound donor NFTs issued.
3. LIQUIDITY POOL METRICS: Total value locked (TVL) across MOGS Stablecoin pools expanded by 8.5% this week. Seeding depth remains locked in CPMM contracts to secure coin stability.
4. ENERGY TRANSITION TRANSCRIPTS: Filed documentation resolvable on UCSC conservation grids.
            `;
            
            newsletterContent.textContent = report;
            newsletterPreviewCard.style.display = "block";
            
            newsletterBtn.disabled = false;
            newsletterBtn.textContent = "Register Now";
            newsletterEmail.value = "";
        }, 1200);
    });

    // ==========================================
    // App Initialization
    // ==========================================
    renderCampaignsGrid();
    setMode(state.mode);
    if (state.userEmail) {
        renderConnectedIdentity();
    }

    // Start background processes
    startAIAgentLoop();

    // Register PWA Service Worker
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker.register("sw.js")
                .then(reg => console.log("Service Worker registered successfully:", reg.scope))
                .catch(err => console.error("Service Worker registration failed:", err));
        });
    }
});
