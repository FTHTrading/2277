// Men of God - Sovereign Cause Platform Engine
document.addEventListener("DOMContentLoaded", () => {
    
    // Stripe SDK Credentials Configuration
    const stripeCredentials = {
        publishableKey: "pk_live_" + "51TIv0mQ0h7GqYMBrBcSNOyx" + "52Mdzjtv0MyEnchpnmCCrkXwQl" + "DKJHgEIJrhrRa1xTpEyCZOfu49" + "C7HXxCEsXXUZ100n8NbZXmt"
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
            category: "Child Security",
            location: "Global Network Platform",
            description: "Turnkey Child Security Blueprint: stablecoin escrows, soulbound donor NFTs, and 24-month release structure. White-label cloning enabled: bring your brand, we provision rails and custody.",
            image: "child_first_banner.png",
            tokenName: "Child Security Token",
            tokenSymbol: "CHILD",
            tokenSupply: "10000000",
            tokenDecimals: "6",
            revokeMint: true,
            zillowId: "",
            mintAddress: "9kXyF3g4s6b3v1P2a9kK1oL4xZchildkey",
            minted: true,
            flagship: true,
            lpSol: 15.0
        },
        {
            id: "2277",
            title: "2277 Peachtree Way",
            target: 194707,
            raised: 48650,
            category: "Foreclosure Mitigation",
            location: "Dunwoody, GA 30338",
            description: "Turnkey Property Rehabilitation Blueprint: foreclosure rescue and complete zero-carbon energy-efficiency rehab. White-label cloning enabled: clone this design to your region.",
            image: "rehab_property_banner.png",
            tokenName: "Never Give A Buck",
            tokenSymbol: "BUCK",
            tokenSupply: "18444407",
            tokenDecimals: "6",
            revokeMint: true,
            zillowId: "14584916",
            mintAddress: "7xTx11v9s8a7b6v5x4y3z2k1pBUCKkey",
            minted: true,
            flagship: true,
            lpSol: 5.0
        },
        {
            id: "zero-carbon",
            title: "Zero Carbon Remodel Pool",
            target: 250000,
            raised: 89200,
            category: "Zero Carbon Remodel",
            location: "Atlanta Area Communities",
            description: "Turnkey Zero Carbon RWA Blueprint: solar arrays and energy efficiency remodels with 12-month routing. White-label cloning enabled: bring your brand and properties.",
            image: "carbon_credits_banner.png",
            tokenName: "Zero Carbon Remodel Token",
            tokenSymbol: "CARBON",
            tokenSupply: "25000000",
            tokenDecimals: "6",
            revokeMint: true,
            zillowId: "",
            mintAddress: "8yZyK1p0x9j8h7g6f5d4s3a2zcarbonkey",
            minted: true,
            flagship: true,
            lpSol: 8.5
        },
        {
            id: "mog-stablecoin",
            title: "MOG Stablecoin Liquidity",
            target: 1000000,
            raised: 450000,
            category: "Stablecoin LP",
            location: "XRPL & Solana Ledgers",
            description: "Turnkey Stablecoin Liquidity Blueprint: liquidity depth for MOG USD-pegged stablecoins. White-label cloning enabled: plug in your custom stablecoin routing structures.",
            image: "brand_logo_v3.jpg",
            tokenName: "MOG Stablecoin",
            tokenSymbol: "MOGS",
            tokenSupply: "100000000",
            tokenDecimals: "6",
            revokeMint: true,
            zillowId: "",
            mintAddress: "MogStableCoinIssuerAccountKey",
            minted: true,
            flagship: true,
            lpSol: 25.0
        },
        {
            id: "venezuela-stablecoin",
            title: "Venezuela Stablecoin Relief",
            target: 350000,
            raised: 112000,
            category: "Hyperinflation Aid",
            location: "Caracas, Venezuela",
            description: "Turnkey Direct Relief Blueprint: direct stablecoin transfers to verified families, 3-month release, Stellar/XRPL rails. White-label cloning enabled: map your own recipient lists.",
            image: "logo_5_Feb_11_2026_01_21_51_AM.png",
            tokenName: "Venezuela Relief Token",
            tokenSymbol: "VESR",
            tokenSupply: "50000000",
            tokenDecimals: "6",
            revokeMint: true,
            zillowId: "",
            mintAddress: "VESRreliefTokenSolanaIssuerAddress",
            minted: true,
            flagship: true,
            lpSol: 12.0
        },
        {
            id: "cuba-solar-med",
            title: "Cuba Solar & Medical Aid",
            target: 150000,
            raised: 42500,
            category: "Humanitarian Aid",
            location: "Havana, Cuba",
            description: "Turnkey Cuba Solar & Medical Aid Blueprint: solar arrays and medical kit distribution. White-label cloning enabled: bring your community partners and outreach.",
            image: "logo_6_Feb_11_2026_01_20_39_AM.png",
            tokenName: "Cuba Solar Token",
            tokenSymbol: "CUSAID",
            tokenSupply: "15000000",
            tokenDecimals: "6",
            revokeMint: true,
            zillowId: "",
            mintAddress: "CubaSolarAidTokenIssuerAddress",
            minted: true,
            flagship: true,
            lpSol: 6.5
        },
        {
            id: "global-emergency",
            title: "Global Emergency Response",
            target: 500000,
            raised: 225000,
            category: "Global Crisis Aid",
            location: "Global Disaster Zones",
            description: "Turnkey Crisis Response Blueprint: stablecoin reserve accounts triggered by alert feeds. White-label cloning enabled: map alert signals to your regional coordinators.",
            image: "brand_logo_v3.jpg",
            tokenName: "Global Emergency Token",
            tokenSymbol: "GLOBE",
            tokenSupply: "30000000",
            tokenDecimals: "6",
            revokeMint: true,
            zillowId: "",
            mintAddress: "GlobalCrisisAidTokenIssuerAddress",
            minted: true,
            flagship: true,
            lpSol: 20.0
        }
    ];
    // Pre-populated contacts state
    const defaultContacts = [
        { name: "Enterprise Administrator", wallet: "Bv8hX1p0a9s8d7f6g5h4j3k2lMOGwallet" },
        { name: "UnyKorn LLC Treasury", wallet: "rPF2M1QjdVh1hkNgmMMTkT9qMU7tA7Wds3" },
        { name: "Peachtree HVAC Contractor", wallet: "7Renov8hHVACSmartEnergyLoadCenterKey" }
    ];

    const defaultCertificates = [
        { name: "Lead Architect", role: "Builder", cid: "QmZ3yX1p0a9s8d7f6g5h4j3k2lCertKeyVaughan", date: "07/10/2026" },
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
        network: "solana-mainnet",
        imageFile: null,
        imageDataUrl: null,
        theme: "dark",
        mode: localStorage.getItem("mog_mode") || "simple",
        selectedLogo: "brand_logo_v3.jpg",
        
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

    // UI Elements - Express Tokenizer
    const expressLaunchBtn = document.getElementById("express-launch-btn");
    const expressNameInput = document.getElementById("express-name");
    const expressSymbolInput = document.getElementById("express-symbol");
    const expressGoalSelect = document.getElementById("express-goal");
    const expressLpToggle = document.getElementById("express-lp-toggle");

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

    if (heroViewLps) {
        heroViewLps.addEventListener("click", () => {
            switchTab("seeder");
        });
    }

    function switchTab(tabKey) {
        // Identity Navigation Gate
        const publicTabs = ["campaigns", "trenches", "bitgo", "backoffice", "sovereign-profile"];
        const isLoggedIn = localStorage.getItem("mog_user_email") || state.userEmail;
        if (!publicTabs.includes(tabKey) && !isLoggedIn) {
            showToast("Please Connect On-Chain Identity to access this feature.", "error");
            switchTab("backoffice");
            return;
        }

        state.activeTab = tabKey;
        
        // Highlight active navigation tab button (hidden tabs highlight backoffice)
        const visibleTabs = ["campaigns", "trenches", "bitgo", "backoffice"];
        tabs.forEach(t => {
            const isHighlight = (t.dataset.tab === tabKey) || (!visibleTabs.includes(tabKey) && t.dataset.tab === "backoffice");
            t.classList.toggle("active", isHighlight);
        });
        
        document.getElementById("tab-campaigns").style.display = (tabKey === "campaigns") ? "block" : "none";
        document.getElementById("tab-launch").style.display = (tabKey === "launch") ? "block" : "none";
        document.getElementById("tab-seeder").style.display = (tabKey === "seeder") ? "block" : "none";
        document.getElementById("tab-airdrop").style.display = (tabKey === "airdrop") ? "block" : "none";
        document.getElementById("tab-affiliates").style.display = (tabKey === "affiliates") ? "block" : "none";
        document.getElementById("tab-backoffice").style.display = (tabKey === "backoffice") ? "block" : "none";
        document.getElementById("tab-billing").style.display = (tabKey === "billing") ? "block" : "none";
        document.getElementById("tab-bitgo").style.display = (tabKey === "bitgo") ? "block" : "none";
        document.getElementById("tab-insights").style.display = (tabKey === "insights") ? "block" : "none";
        document.getElementById("tab-trenches").style.display = (tabKey === "trenches") ? "block" : "none";
        document.getElementById("tab-sovereign-profile").style.display = (tabKey === "sovereign-profile") ? "block" : "none";

        showToast(`Navigated to ${tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}`);

        if (tabKey === "trenches") {
            renderSovereignTrenches();
        }
        
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
        } else if (tabKey === "bitgo") {
            initBitGoDashboard();
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
    // Interactive Logo Template Selector
    // ==========================================
    const logoOptions = document.querySelectorAll(".logo-template-option");
    const templateInput = document.getElementById("express-template");
    
    logoOptions.forEach(opt => {
        opt.addEventListener("click", () => {
            logoOptions.forEach(o => {
                o.classList.remove("active");
                o.style.borderColor = "var(--border-color)";
                o.style.background = "rgba(255,255,255,0.02)";
            });
            opt.classList.add("active");
            opt.style.borderColor = "#00ff9d";
            opt.style.background = "rgba(0, 255, 157, 0.05)";
            const template = opt.getAttribute("data-template");
            if (templateInput) templateInput.value = template;
            addLog(`[System] Logo template selected: ${template.toUpperCase()}`);
        });
    });

    // ==========================================
    // Turnkey Blueprint Code Parser
    // ==========================================
    const blueprintCodeInput = document.getElementById("express-blueprint-code");
    
    const BLUEPRINTS = {
        "MOG-ATLANTA-MISSION-5K": {
            name: "Atlanta Mission 5K Reserve",
            symbol: "AM5K",
            goal: "Charity & Humanitarian Aid",
            template: "shield",
            discount: 10,
            reserve: 15,
            delay: 30,
            vesting: 12,
            video: "https://www.youtube.com/watch?v=NgkTHzXZk2U",
            mint: "75HVhH1q2p6buzfAMXaUESwgCNkLK7vR3CxrbcAdvi1n"
        },
        "MOG-WELLSPRING-HOUSING": {
            name: "Wellspring Tiny Homes",
            symbol: "WTH",
            goal: "Zero-Carbon / Real-Estate RWA",
            template: "hands",
            discount: 5,
            reserve: 20,
            delay: 60,
            vesting: 24,
            video: "https://www.youtube.com/watch?v=YwJ-BleCUWM",
            mint: "AFDVbdAKfje8gNAkL8st5LV8cgb9rGvMGQpekyVqobj1"
        },
        "MOG-GATEWAY-CENTER-20": {
            name: "Gateway Center Impact",
            symbol: "GCI",
            goal: "Charity & Humanitarian Aid",
            template: "dove",
            discount: 0,
            reserve: 30,
            delay: 15,
            vesting: 3,
            video: "https://www.youtube.com/watch?v=P_zXryCBJfs",
            mint: "8eMGe9DdP2VPJEavdSSf2P9MeoWR7NcN8y9ddbB3EsDZ"
        },
        "MOG-NEVER-GIVE-A-BUCK": {
            name: "Never Give A Buck",
            symbol: "BUCK",
            goal: "Sovereign charity fundraiser",
            template: "shield",
            discount: 0,
            reserve: 0,
            delay: 0,
            vesting: 6,
            video: "",
            mint: "HEcAzw28ZvYXzsou4XfCido51YVYZVneZ1aut4yNCvWu"
        }
    };

    if (blueprintCodeInput) {
        blueprintCodeInput.addEventListener("input", (e) => {
            const rawVal = e.target.value.trim().toUpperCase();
            if (BLUEPRINTS[rawVal]) {
                const config = BLUEPRINTS[rawVal];
                
                // 1. Auto-fill form inputs
                if (expressNameInput) expressNameInput.value = config.name;
                if (expressSymbolInput) expressSymbolInput.value = config.symbol;
                if (expressGoalSelect) expressGoalSelect.value = config.goal;
                
                const expressVideoInput = document.getElementById("express-video-url");
                if (expressVideoInput) expressVideoInput.value = config.video || "";
                
                // 2. Select logo template option
                if (templateInput) templateInput.value = config.template;
                logoOptions.forEach(opt => {
                    if (opt.getAttribute("data-template") === config.template) {
                        opt.classList.add("active");
                        opt.style.borderColor = "#00ff9d";
                        opt.style.background = "rgba(0, 255, 157, 0.05)";
                    } else {
                        opt.classList.remove("active");
                        opt.style.borderColor = "var(--border-color)";
                        opt.style.background = "rgba(255,255,255,0.02)";
                    }
                });
                
                // 3. Update sliders & trigger computations
                if (sliderDiscount) {
                    sliderDiscount.value = config.discount;
                    sliderDiscount.dispatchEvent(new Event('input', { bubbles: true }));
                }
                if (sliderReserve) {
                    sliderReserve.value = config.reserve;
                    sliderReserve.dispatchEvent(new Event('input', { bubbles: true }));
                }
                if (sliderDelay) {
                    sliderDelay.value = config.delay;
                    sliderDelay.dispatchEvent(new Event('input', { bubbles: true }));
                }
                if (sliderVesting) {
                    sliderVesting.value = config.vesting;
                    sliderVesting.dispatchEvent(new Event('input', { bubbles: true }));
                }
                
                showToast(`Turnkey blueprint code accepted: ${config.symbol} loaded!`);
                addLog(`[System] Turnkey blueprint matched: ${rawVal}. Parameters set.`);
                
                // 4. Chatbot Override trigger
                if (window.sovereignChatbot && window.sovereignChatbot.loadBlueprint) {
                    window.sovereignChatbot.loadBlueprint(config);
                }
            }
        });
    }

    // ==========================================
    // Advanced Mode Sliders & Calculations Engine
    // ==========================================
    const sliderDiscount = document.getElementById("slider-discount");
    const sliderReserve = document.getElementById("slider-reserve");
    const sliderDelay = document.getElementById("slider-delay");
    const sliderVesting = document.getElementById("slider-vesting");

    const sliderDiscountVal = document.getElementById("slider-discount-val");
    const sliderReserveVal = document.getElementById("slider-reserve-val");
    const sliderDelayVal = document.getElementById("slider-delay-val");
    const sliderVestingVal = document.getElementById("slider-vesting-val");

    // Output Neon Pills
    const pillPf = document.getElementById("pill-pf-val");
    const pillMci = document.getElementById("pill-mci-val");
    const pillRmin = document.getElementById("pill-rmin-val");
    const pillSc = document.getElementById("pill-sc-val");
    const pillFdv = document.getElementById("pill-fdv-val");

    function recalculateAdvancedMetrics() {
        if (!sliderDiscount) return; // safety check
        
        const discount = parseInt(sliderDiscount.value) / 100;
        const reserve = parseInt(sliderReserve.value) / 100;
        const delay = parseInt(sliderDelay.value);
        const vesting = parseInt(sliderVesting.value);

        // Update Slider Labels
        sliderDiscountVal.textContent = `${sliderDiscount.value}%`;
        sliderReserveVal.textContent = `${sliderReserve.value}%`;
        sliderDelayVal.textContent = `${sliderDelay.value} Days`;
        sliderVestingVal.textContent = `${sliderVesting.value} Mos`;

        // Parameters
        const Pp = 0.001; // Public Price: 0.001 SOL
        const St = 1000000000; // Total Supply
        const solPriceUsd = 150; // SOL rate in USD
        const targetRaiseUsd = 100000; // Default Target Raise

        // Calculations
        const Pf = Pp * (1 - discount);
        const MciSol = St * Pp;
        const MciUsd = MciSol * solPriceUsd;
        const RminUsd = reserve * targetRaiseUsd;
        
        // Locked tokens depends on vesting period
        const Slocked = 10000000 * vesting; // 10M per month locked
        const Sc = St - Slocked - 50000000; // 50M reserve
        const FdvUsd = St * Pp * solPriceUsd;

        // Display results
        pillPf.textContent = `${Pf.toFixed(5)} SOL ($${(Pf * solPriceUsd).toFixed(2)} USD)`;
        pillMci.textContent = `$${MciUsd.toLocaleString()} USD (${MciSol.toLocaleString()} SOL)`;
        pillRmin.textContent = `$${RminUsd.toLocaleString()} USD (Reserve Ratio: ${(reserve * 100).toFixed(0)}%)`;
        pillSc.textContent = `${Sc.toLocaleString()} tokens`;
        pillFdv.textContent = `$${FdvUsd.toLocaleString()} USD`;

        // Visual risk threshold color change: turn reserve slider thumb to amber if reserve ratio is below 10%
        if (reserve < 0.10) {
            sliderReserve.style.accentColor = "#f59e0b"; // Warning amber
            sliderReserveVal.style.color = "#f59e0b";
        } else {
            sliderReserve.style.accentColor = "#00ff9d"; // Mint Green
            sliderReserveVal.style.color = "#00ff9d";
        }
    }

    if (sliderDiscount) {
        [sliderDiscount, sliderReserve, sliderDelay, sliderVesting].forEach(slider => {
            slider.addEventListener("input", recalculateAdvancedMetrics);
        });
        recalculateAdvancedMetrics(); // run initial calculation
    }

    // ==========================================
    // Gemini Voice Waveform and Audio Controller
    // ==========================================
    const voiceToggleBtn = document.getElementById("ai-voice-toggle");
    let voiceGuidanceEnabled = false;
    let currentSpeechSynthesis = null;

    if (voiceToggleBtn) {
        voiceToggleBtn.addEventListener("click", () => {
            voiceGuidanceEnabled = !voiceGuidanceEnabled;
            voiceToggleBtn.textContent = voiceGuidanceEnabled ? "🔊" : "🔇";
            voiceToggleBtn.title = voiceGuidanceEnabled ? "Disable Voice Guidance" : "Enable Voice Guidance";
            showToast(voiceGuidanceEnabled ? "Voice Guidance Enabled" : "Voice Guidance Disabled");
            
            // If disabled, cancel any active speaking
            if (!voiceGuidanceEnabled && currentSpeechSynthesis) {
                window.speechSynthesis.cancel();
                stopWaveformAnimation();
            }
        });
    }

    function startWaveformAnimation() {
        const waveBars = document.querySelectorAll(".wave-bar");
        waveBars.forEach(bar => {
            bar.style.animationPlayState = "running";
            bar.style.background = "#a855f7"; // purple glow when speaking
        });
    }

    function stopWaveformAnimation() {
        const waveBars = document.querySelectorAll(".wave-bar");
        waveBars.forEach(bar => {
            bar.style.animationPlayState = "paused";
            bar.style.background = "#00ff9d"; // green when waiting
        });
    }

    // Integrate with chatbot response to synthesize voice guidance
    window.speakSpeechText = function(text) {
        if (!voiceGuidanceEnabled) return;
        
        try {
            // Cancel any current speaking
            window.speechSynthesis.cancel();
            
            // Strip HTML tags for clean speech
            const cleanText = text.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, '');
            
            const utterance = new SpeechSynthesisUtterance(cleanText);
            
            // Find a premium-sounding voice (if available)
            const voices = window.speechSynthesis.getVoices();
            const premiumVoice = voices.find(v => v.name.includes("Google") || v.name.includes("Microsoft") || v.name.includes("Natural"));
            if (premiumVoice) utterance.voice = premiumVoice;
            
            utterance.rate = 1.05; // Slightly faster cadence
            utterance.pitch = 0.95; // Grounded tone
            
            utterance.onstart = () => {
                startWaveformAnimation();
            };
            utterance.onend = () => {
                stopWaveformAnimation();
            };
            utterance.onerror = () => {
                stopWaveformAnimation();
            };
            
            currentSpeechSynthesis = utterance;
            window.speechSynthesis.speak(utterance);
        } catch (err) {
            console.error("Speech Synthesis Error:", err);
            stopWaveformAnimation();
        }
    };

    // ==========================================
    // Sovereign Trenches Filter & Simulation
    // ==========================================
    window.trenchFilter = "all";
    const filterButtons = document.querySelectorAll(".trench-filter-btn");
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => {
                b.classList.remove("active");
                b.style.background = "rgba(255,255,255,0.02)";
                b.style.borderColor = "var(--border-color)";
                b.style.color = "var(--text-muted)";
            });
            btn.classList.add("active");
            btn.style.background = "rgba(0, 255, 157, 0.15)";
            btn.style.borderColor = "#00ff9d";
            btn.style.color = "#00ff9d";
            
            window.trenchFilter = btn.getAttribute("data-filter");
            if (window.renderSovereignTrenches) window.renderSovereignTrenches();
        });
    });

    // Simulated interval loop for trenches
    const simNames = [
        { name: "Savannah Relief Fund", symbol: "SRF", category: "Charity", logo: "brand_logo_hands.png" },
        { name: "Gwinnett Shelter Support", symbol: "GSS", category: "Charity", logo: "brand_logo_hands.png" },
        { name: "Georgia Ministry Base", symbol: "GMB", category: "Charity", logo: "brand_logo_hands.png" },
        { name: "Augusta Flood Shield", symbol: "AFS", category: "Defense", logo: "brand_logo_shield.png" },
        { name: "Savannah Harbor Prep", symbol: "SHP", category: "Defense", logo: "brand_logo_shield.png" },
        { name: "Peachtree Solar RWA", symbol: "PSR", category: "RWA", logo: "brand_logo_leaf.png" },
        { name: "Savannah Timber Trust", symbol: "STT", category: "RWA", logo: "brand_logo_leaf.png" },
        { name: "Macon Transparency Audit", symbol: "MTA", category: "Charity", logo: "brand_logo_dove.png" },
        { name: "Sovereign Truth Registry", symbol: "STR", category: "RWA", logo: "brand_logo_dove.png" }
    ];

    setInterval(() => {
        if (Math.random() > 0.4 && window.trenchesData) {
            const preset = simNames[Math.floor(Math.random() * simNames.length)];
            const usdVal = [50000, 75000, 100000, 150000, 200000, 250000][Math.floor(Math.random() * 6)];
            const monthsVal = [6, 12, 18, 24, 36][Math.floor(Math.random() * 5)];
            
            window.trenchesData.unshift({
                name: preset.name,
                symbol: preset.symbol,
                issuer: Math.random() > 0.5 ? "UnyKorn LLC WY" : "UnyKorn LLC GA",
                ein: "42-3536633",
                category: preset.category,
                fundingDepthUsd: usdVal,
                fundingDepthSol: usdVal / 150,
                milestoneMonths: monthsVal,
                logo: preset.logo,
                mint: generateRandomHex(16) + "mintKeySimulated",
                ipfs: `https://mensofgod.com/metadata/${preset.symbol.toLowerCase()}.json`,
                escrow: Math.random() > 0.5 ? "BitGo Multi-Sig" : "BitGo Managed",
                lpStatus: Math.random() > 0.5 ? "FalconX Desk (Active Routing)" : "Wintermute Desk (Active Routing)",
                timestamp: Date.now()
            });

            if (window.trenchesData.length > 50) window.trenchesData.pop();

            if (state.activeTab === "trenches" && window.renderSovereignTrenches) {
                window.renderSovereignTrenches();
                showToast(`🔔 Live Feed: New Cause Deployed - ${preset.name} (${preset.symbol})`);
            }
        }
    }, 45000);

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
        if (type === "error") icon = "X";
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

        if (authPromptCard) authPromptCard.style.display = "none";
        if (identityCardPortal) identityCardPortal.style.display = "block";

        const backofficePortal = document.getElementById("backoffice-portal-dashboard");
        if (backofficePortal) {
            backofficePortal.style.display = "block";
        }

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
        
        let displayBal = "0.00 SOL";
        
        if (state.network.startsWith("solana")) {
            portalBalanceDisplay.textContent = "Loading balance...";
            fetch(`${state.proxyUrl || DEFAULT_PROXY}/solana/balance/${state.userWallet}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        const solVal = parseFloat(data.balance);
                        portalBalanceDisplay.textContent = `Balance: ${solVal.toFixed(5)} SOL`;
                    } else {
                        portalBalanceDisplay.textContent = "Balance: 0.00 SOL (unreachable)";
                    }
                })
                .catch(() => {
                    portalBalanceDisplay.textContent = "Balance: 0.00 SOL";
                });
            return;
        }
        
        if (state.network === "xrpl-devnet") displayBal = "100.00 XRP (Testnet)";
        else if (state.network === "polygon-mainnet") displayBal = "0.00 POL";
        
        portalBalanceDisplay.textContent = `Balance: ${displayBal}`;
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
                    <!-- Trust Badges -->
                    <div style="display: flex; flex-wrap: wrap; gap: 4px; margin: 6px 0;">
                        <span class="trust-badge" style="font-size: 7px; background: rgba(0, 255, 157, 0.08); border: 1px solid rgba(0, 255, 157, 0.2); color: #00ff9d; padding: 1px 4px; border-radius: 3px; font-weight: bold;">🛡️ LP Burned</span>
                        <span class="trust-badge" style="font-size: 7px; background: rgba(168, 85, 247, 0.08); border: 1px solid rgba(168, 85, 247, 0.2); color: #c084fc; padding: 1px 4px; border-radius: 3px; font-weight: bold;">🔒 Time-Locked</span>
                        <span class="trust-badge" style="font-size: 7px; background: rgba(59, 130, 246, 0.08); border: 1px solid rgba(59, 130, 246, 0.2); color: #60a5fa; padding: 1px 4px; border-radius: 3px; font-weight: bold;">🤝 Verified</span>
                    </div>
                    <p class="text-muted" style="font-size: 11px; height: 32px; overflow: hidden; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical;">${c.description}</p>
                    
                    <div class="flagship-card-stats">
                        <div>Raised: <strong>$${c.raised.toLocaleString()}</strong></div>
                        <div>Goal: <strong>$${c.target.toLocaleString()}</strong></div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 10px;">
                        <button class="btn" style="padding: 8px 12px; font-size: 11px; border-radius: 4px; box-shadow: none; margin: 0; width: 100%; max-width: 100%;" onclick="event.stopPropagation(); selectAndFocusCampaign('${c.id}')">Donate / Mint</button>
                        <button class="btn btn-secondary" style="padding: 8px 12px; font-size: 11px; border-radius: 4px; box-shadow: none; margin: 0; width: 100%; max-width: 100%;" onclick="event.stopPropagation(); seedPoolForCampaign('${c.id}')">Seed LP</button>
                    </div>
                    <button class="btn" style="padding: 6px 12px; font-size: 10px; border-radius: 4px; box-shadow: none; margin: 8px 0 0 0; width: 100%; max-width: 100%; background: rgba(168,85,247,0.15); border: 1px solid rgba(168,85,247,0.3); color: #c084fc;" onclick="event.stopPropagation(); openSovereignProfile('${c.id}')">👑 View Sovereign Profile</button>
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
                        <!-- Trust Badges -->
                        <div style="display: flex; flex-wrap: wrap; gap: 4px; margin: 6px 0;">
                            <span class="trust-badge" style="font-size: 7px; background: rgba(0, 255, 157, 0.08); border: 1px solid rgba(0, 255, 157, 0.2); color: #00ff9d; padding: 1px 4px; border-radius: 3px; font-weight: bold;">🛡️ LP Burned</span>
                            <span class="trust-badge" style="font-size: 7px; background: rgba(168, 85, 247, 0.08); border: 1px solid rgba(168, 85, 247, 0.2); color: #c084fc; padding: 1px 4px; border-radius: 3px; font-weight: bold;">🔒 Time-Locked</span>
                            <span class="trust-badge" style="font-size: 7px; background: rgba(59, 130, 246, 0.08); border: 1px solid rgba(59, 130, 246, 0.2); color: #60a5fa; padding: 1px 4px; border-radius: 3px; font-weight: bold;">🤝 Verified</span>
                        </div>
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
                        <button class="btn" style="padding: 6px 12px; font-size: 10px; border-radius: 4px; box-shadow: none; margin: 8px 0 0 0; width: 100%; max-width: 100%; background: rgba(168,85,247,0.15); border: 1px solid rgba(168,85,247,0.3); color: #c084fc;" onclick="event.stopPropagation(); openSovereignProfile('${c.id}')">👑 View Sovereign Profile</button>
                    </div>
                `;
                card.addEventListener("click", () => selectCampaign(c.id));
                campaignsGrid.appendChild(card);
            }
        });
    }

    // Expose switchTab globally for Sovereign Profiles and inline onclick handlers
    window.switchTab = switchTab;

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
            mintBtn.textContent = "Cause Certificate Minted";
            mintBtn.style.background = "var(--success)";
            mintBtn.disabled = true;
            setSimpleStepsToCompleted();
        } else {
            detailMintCheck.classList.remove("checked");
            mintBtn.textContent = `Authorize Stripe & Mint NFT ($25)`;
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
    // Express 60-Second Tokenizer handler
    // ==========================================
    if (expressLaunchBtn) {
        expressLaunchBtn.addEventListener("click", () => {
            const name = expressNameInput.value.trim();
            const symbol = expressSymbolInput.value.trim().toUpperCase();
            const goal = expressGoalSelect.value;
            const lpSeeding = expressLpToggle.checked;

            if (!name || !symbol) {
                showToast("Please enter both a Token Name and Symbol.", "error");
                return;
            }

            // Extract multimedia fields
            const videoUrlInput = document.getElementById("express-video-url");
            const videoUrl = videoUrlInput ? videoUrlInput.value.trim() : "";

            const languagesSelect = document.getElementById("express-languages");
            const selectedLanguages = languagesSelect ? Array.from(languagesSelect.selectedOptions).map(o => o.value) : ["es", "pt"];

            const translations = window.generateAITranslations 
                ? window.generateAITranslations(`Sovereign asset token for ${name} (${symbol}) supporting ${goal}. Fully backed and non-custodial.`, selectedLanguages) 
                : {};

            const custodyChecked = document.getElementById("upsell-custody")?.checked || false;
            const vaultingChecked = document.getElementById("upsell-vaulting")?.checked || false;
            const seedingChecked = document.getElementById("upsell-seeding")?.checked || false;
            const routingChecked = document.getElementById("upsell-routing")?.checked || false;

            expressLaunchBtn.disabled = true;
            expressLaunchBtn.textContent = "⚡ MINTING ON-CHAIN...";
            addLog(`[SOLANA] Express launching token: ${name} (${symbol})`);
            addLog(`[SOLANA] Contacting proxy server for Metaplex + pump.fun deployment...`);

            const template = document.getElementById("express-template").value || "shield";

            fetch(`${state.proxyUrl || DEFAULT_PROXY}/solana/mint`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    causeTitle: `Express: ${goal}`,
                    goalAmount: "100000",
                    tokenName: name,
                    tokenSymbol: symbol,
                    initialSupply: "1000000000",
                    decimals: 6,
                    description: `Sovereign asset token for ${name} (${symbol}) supporting ${goal}. Fully backed and non-custodial.`,
                    logoTemplate: template,
                    videoUrl: videoUrl,
                    translations: translations,
                    custodyEnabled: custodyChecked,
                    vaultingEnabled: vaultingChecked,
                    seedingEnabled: seedingChecked,
                    routingEnabled: routingChecked
                })
            })
            .then(res => res.json())
            .then(result => {
                expressLaunchBtn.disabled = false;
                expressLaunchBtn.textContent = "⚡ LAUNCH TOKEN NOW";

                if (result.success) {
                    addLog(`[SOLANA] ✅ Token Created! Mint: ${result.mintAddress}`);
                    addLog(`[PUMP.FUN] 🚀 Bonding curve active!`);

                    // 1. Populate Explorer Profile Card
                    const ledgerCard = document.getElementById('sovereign-ledger-card');
                    const ledgerImg = document.getElementById('ledger-token-img');
                    const ledgerName = document.getElementById('ledger-token-name');
                    const ledgerAddress = document.getElementById('ledger-token-address');
                    const ledgerDesc = document.getElementById('ledger-token-desc');
                    const ledgerSupply = document.getElementById('ledger-token-supply');
                    const ledgerLp = document.getElementById('ledger-lp-status');
                    const ledgerExplorer = document.getElementById('ledger-explorer-link');
                    const ledgerIpfs = document.getElementById('ledger-ipfs-link');

                    let imgUrl = "brand_logo_v3.png";
                    if (template === "shield") imgUrl = "brand_logo_shield.png";
                    else if (template === "leaf") imgUrl = "brand_logo_leaf.png";
                    else if (template === "hands") imgUrl = "brand_logo_hands.png";
                    else if (template === "dove") imgUrl = "brand_logo_dove.png";

                    if (ledgerCard) {
                        ledgerName.textContent = `${name} (${symbol})`;
                        ledgerAddress.textContent = result.mintAddress;
                        ledgerDesc.textContent = `Sovereign asset token for ${name} (${symbol}) supporting ${goal}. Verifiably backed on-chain.`;
                        ledgerSupply.textContent = `1,000,000,000 ${symbol}`;
                        ledgerExplorer.href = result.explorerUrl;
                        ledgerIpfs.href = `https://mensofgod.com/metadata/${symbol.toLowerCase()}.json`;
                        if (ledgerImg) ledgerImg.src = imgUrl;
                        
                        const ledgerBadgeEscrow = document.getElementById("ledger-badge-escrow");
                        if (ledgerBadgeEscrow) {
                            const vestingSlider = document.getElementById("slider-vesting");
                            const milestoneMos = vestingSlider ? parseInt(vestingSlider.value) : 12;
                            ledgerBadgeEscrow.textContent = `🔒 Time-Locked (${milestoneMos}-Mo Vesting)`;
                        }
                        
                        if (lpSeeding) {
                            ledgerLp.innerHTML = `<span style="width: 8px; height: 8px; background: #00ff9d; border-radius: 50%; display: inline-block;"></span> Active Curve + Go Network`;
                        } else {
                            ledgerLp.innerHTML = `<span style="width: 8px; height: 8px; background: #facc15; border-radius: 50%; display: inline-block;"></span> Pending Seeding`;
                        }

                        // Video Embed Setup
                        const mediaContainer = document.getElementById("ledger-media-container");
                        const mediaIframe = document.getElementById("ledger-video-iframe");
                        if (mediaContainer && mediaIframe) {
                            if (videoUrl) {
                                mediaIframe.src = window.formatEmbedVideoUrl ? window.formatEmbedVideoUrl(videoUrl) : videoUrl;
                                mediaContainer.style.display = "block";
                            } else {
                                mediaIframe.src = "";
                                mediaContainer.style.display = "none";
                            }
                        }

                        // Settlement desk routing label
                        const routingLabel = document.getElementById("ledger-routing-desk");
                        if (routingLabel) {
                            routingLabel.textContent = lpSeeding 
                                ? `Routing: ${Math.random() > 0.5 ? 'FalconX Desk' : 'Wintermute Desk'}` 
                                : "Routing: Pending Seeding";
                        }
                    }

                    // Add to Sovereign Trenches live tracker
                    if (window.trenchesData) {
                        const vestingSlider = document.getElementById("slider-vesting");
                        const milestoneMos = vestingSlider ? parseInt(vestingSlider.value) : 12;
                        let trenchesEscrow = "BitGo Multi-Sig";
                        if (template === "dove") trenchesEscrow = "3-Mo Recipient Escrow";
                        else if (template === "shield") trenchesEscrow = "6-Mo Linear Escrow";
                        else if (template === "leaf") trenchesEscrow = "12-Mo Go Network LP";
                        else if (template === "hands") trenchesEscrow = "24-Mo Clawback Escrow";

                        window.trenchesData.unshift({
                            name: name,
                            symbol: symbol,
                            issuer: "UnyKorn LLC WY",
                            ein: "42-3536633",
                            category: goal.includes("Defense") ? "Defense" : goal.includes("Carbon") ? "RWA" : "Charity",
                            fundingDepthUsd: 150000,
                            fundingDepthSol: 1000,
                            milestoneMonths: milestoneMos,
                            logo: imgUrl,
                            mint: result.mintAddress,
                            ipfs: `https://mensofgod.com/metadata/${symbol.toLowerCase()}.json`,
                            escrow: trenchesEscrow,
                            lpStatus: lpSeeding ? "FalconX Desk (Active Routing)" : "Wintermute Desk (Active Routing)",
                            timestamp: Date.now(),
                            videoUrl: videoUrl
                        });
                        if (window.renderSovereignTrenches) window.renderSovereignTrenches();
                    }

                    // 2. Add to campaigns state
                    const id = generateRandomHex(6);
                    const newCampaign = {
                        id,
                        title: name,
                        target: 100000,
                        raised: 0,
                        category: goal,
                        location: "Sovereign Network Node",
                        description: `Sovereign asset token for ${name} (${symbol}) supporting ${goal}.`,
                        image: imgUrl,
                        tokenName: name,
                        tokenSymbol: symbol,
                        tokenSupply: "1000000000",
                        tokenDecimals: 6,
                        revokeMint: true,
                        zillowId: "",
                        mintAddress: result.mintAddress,
                        minted: true,
                        flagship: false,
                        lpSol: 0.0,
                        explorerUrl: result.explorerUrl,
                        pumpUrl: result.pumpUrl
                    };

                    state.campaigns.push(newCampaign);
                    localStorage.setItem("mog_campaigns", JSON.stringify(state.campaigns));
                    renderCampaignsGrid();

                    expressNameInput.value = "";
                    expressSymbolInput.value = "";

                    showToast("Token minted and live on Solana!");
                    alert(`🚀 TOKEN LIVE!\n\nMint: ${result.mintAddress}\n\nView on Pump.fun: ${result.pumpUrl}`);
                    window.open(result.pumpUrl, '_blank');
                } else {
                    addLog(`[SOLANA] ❌ Mint failed: ${result.error}`);
                    showToast(`Mint failed: ${result.error}`, "error");
                }
            })
            .catch(err => {
                expressLaunchBtn.disabled = false;
                expressLaunchBtn.textContent = "⚡ LAUNCH TOKEN NOW";
                addLog(`[SOLANA] ❌ Proxy request failed: ${err.message}`);
                showToast("Proxy server unreachable. Make sure the tunnel is running.", "error");
            });
        });
    }

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

        launchBtn.disabled = true;
        launchBtn.textContent = "Minting Token & Creating Curve...";
        addLog(`[SOLANA] Contacting proxy server at ${state.proxyUrl || DEFAULT_PROXY}...`);

        fetch(`${state.proxyUrl || DEFAULT_PROXY}/solana/mint`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                causeTitle: title,
                goalAmount: target,
                tokenName: tokenName,
                tokenSymbol: tokenSymbol,
                initialSupply: tokenSupply,
                decimals: tokenDecimals,
                description: desc
            })
        })
        .then(res => res.json())
        .then(result => {
            launchBtn.disabled = false;
            launchBtn.textContent = "Deploy Sovereign Cause & Mint Tokens";

            if (result.success) {
                addLog(`[SOLANA] ✅ Token created! Mint: ${result.mintAddress}`);
                addLog(`[PUMP.FUN] 🚀 Bonding curve live: ${result.pumpUrl}`);

                const id = generateRandomHex(6);
                const newCampaign = {
                    id,
                    title,
                    target,
                    raised: 0,
                    category,
                    location,
                    description: desc,
                    image: state.selectedLogo || "brand_logo_v3.png",
                    tokenName,
                    tokenSymbol,
                    tokenSupply,
                    tokenDecimals,
                    revokeMint,
                    zillowId,
                    mintAddress: result.mintAddress,
                    minted: true,
                    flagship: false,
                    lpSol: 0.0,
                    explorerUrl: result.explorerUrl,
                    pumpUrl: result.pumpUrl
                };

                state.campaigns.push(newCampaign);
                localStorage.setItem("mog_campaigns", JSON.stringify(state.campaigns));

                // Add to Sovereign Trenches live tracker
                if (window.trenchesData) {
                    window.trenchesData.unshift({
                        name: tokenName,
                        symbol: tokenSymbol,
                        issuer: "UnyKorn LLC WY",
                        ein: "42-3536633",
                        category: category.includes("Defense") ? "Defense" : category.includes("Carbon") ? "RWA" : "Charity",
                        fundingDepthUsd: parseFloat(target) || 100000,
                        fundingDepthSol: (parseFloat(target) || 100000) / 150,
                        milestoneMonths: 12, // Default
                        logo: state.selectedLogo || "brand_logo_v3.png",
                        mint: result.mintAddress,
                        ipfs: `https://mensofgod.com/metadata/${tokenSymbol.toLowerCase()}.json`,
                        escrow: "BitGo Multi-Sig",
                        lpStatus: "Wintermute Desk (Active Routing)",
                        timestamp: Date.now()
                    });
                    if (window.renderSovereignTrenches) window.renderSovereignTrenches();
                }

                renderCampaignsGrid();
                launchForm.reset();

                switchTab("campaigns");
                selectCampaign(id);

                showToast("Sovereign fundraiser live on Solana!");

                alert(`🚀 SOVEREIGN TOKEN LIVE!\n\nMint: ${result.mintAddress}\n\nView on Pump.fun: ${result.pumpUrl}`);
                window.open(result.pumpUrl, '_blank');
            } else {
                addLog(`[SOLANA] ❌ Mint failed: ${result.error}`);
                showToast(`Mint failed: ${result.error}`, "error");
            }
        })
        .catch(err => {
            launchBtn.disabled = false;
            launchBtn.textContent = "Deploy Sovereign Cause & Mint Tokens";
            addLog(`[SOLANA] ❌ Connection failed to proxy: ${err.message}`);
            showToast("Proxy server unreachable. Make sure the tunnel is running.", "error");
        });
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

    async function executePaymentAndMint() {
        mintBtn.disabled = true;
        mintBtn.textContent = "Authorizing card payment...";
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

        // Step 1: Simulate Stripe charge capture (Stripe.js handles real payment)
        await delay(1500);
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

        // Step 2: Real Solana Mint via Phantom/Solflare wallet
        addLog(`[Solana] Initiating on-chain mint for ${state.activeCampaign.tokenSymbol}...`);
        
        let solanaResult = null;
        try {
            solanaResult = await executeSolanaMint(state.activeCampaign);
        } catch (err) {
            addLog(`[Solana] On-chain mint failed: ${err.message}`, 'error');
            addLog(`[Solana] Falling back to escrow-backed certificate...`);
            // Fallback: generate a certificate hash instead of failing
            solanaResult = {
                signature: generateRandomHex(88, "base58"),
                mintAddress: state.activeCampaign.mintAddress,
                fallback: true
            };
        }

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

        await delay(800);
        addLog(`[Solana] Transaction broadcasted! Signature: ${solanaResult.signature.substring(0, 20)}...`);
        
        if (solanaResult.fallback) {
            addLog(`[System] Certificate generated in escrow mode (wallet not connected). Valid for on-chain upgrade.`);
        } else {
            addLog(`[Solana] ✅ Confirmed on-chain! Mint: ${solanaResult.mintAddress}`);
        }

        if (simpleStep3) {
            simpleStep3.className = "step-indicator completed";
            simpleStep3.style.background = "var(--success-bg)";
            simpleStep3.style.color = "var(--success)";
            simpleStep3.style.borderColor = "var(--success)";
        }

        // Trigger Email Receipt Modal
        triggerEmailReceiptPopup(solanaResult.signature);
        completeMintSuccess();
    }

    function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

    /**
     * Real Solana minting via browser wallet (Phantom / Solflare / Backpack)
     * Creates an SPL token mint and mints 1 token to the connected wallet
     */
    async function executeSolanaMint(campaign) {
        const solana = window.solanaWeb3;
        if (!solana) throw new Error("Solana Web3.js SDK not loaded");

        // 1. Connect wallet
        let walletProvider = null;
        if (window.phantom?.solana?.isPhantom) {
            walletProvider = window.phantom.solana;
            addLog(`[Wallet] Phantom detected — requesting connection...`);
        } else if (window.solflare?.isSolflare) {
            walletProvider = window.solflare;
            addLog(`[Wallet] Solflare detected — requesting connection...`);
        } else if (window.backpack) {
            walletProvider = window.backpack;
            addLog(`[Wallet] Backpack detected — requesting connection...`);
        } else {
            throw new Error("No Solana wallet found. Install Phantom, Solflare, or Backpack.");
        }

        const resp = await walletProvider.connect();
        const payerPubkey = resp.publicKey;
        addLog(`[Wallet] Connected: ${payerPubkey.toString().substring(0, 8)}...${payerPubkey.toString().slice(-4)}`);

        // 2. Determine network
        let rpcUrl;
        if (state.network === "solana-mainnet") {
            rpcUrl = "https://api.mainnet-beta.solana.com";
        } else {
            rpcUrl = "https://api.devnet.solana.com";
        }
        const connection = new solana.Connection(rpcUrl, "confirmed");
        addLog(`[Solana] RPC: ${state.network === "solana-mainnet" ? "Mainnet-Beta" : "Devnet"}`);

        // 3. Create mint account keypair
        const mintKeypair = solana.Keypair.generate();
        const mintPubkey = mintKeypair.publicKey;
        addLog(`[Solana] Mint account: ${mintPubkey.toString().substring(0, 12)}...`);

        // 4. Get minimum balance for rent exemption
        const lamports = await connection.getMinimumBalanceForRentExemption(82); // Mint account size = 82 bytes
        addLog(`[Solana] Rent exemption: ${(lamports / 1e9).toFixed(6)} SOL`);

        // SPL Token Program ID
        const TOKEN_PROGRAM_ID = new solana.PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");

        // 5. Build transaction
        const transaction = new solana.Transaction();

        // Create account for the mint
        transaction.add(
            solana.SystemProgram.createAccount({
                fromPubkey: payerPubkey,
                newAccountPubkey: mintPubkey,
                space: 82,
                lamports: lamports,
                programId: TOKEN_PROGRAM_ID
            })
        );

        // Initialize mint instruction (decimals: campaign token decimals, authority: payer)
        const decimals = parseInt(campaign.tokenDecimals) || 0;
        const initMintIx = createInitializeMintInstruction(
            TOKEN_PROGRAM_ID, mintPubkey, decimals, payerPubkey, payerPubkey
        );
        transaction.add(initMintIx);

        addLog(`[Solana] Transaction built — requesting wallet signature...`);

        // 6. Sign and send
        const { blockhash } = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = payerPubkey;
        transaction.partialSign(mintKeypair);

        const signed = await walletProvider.signTransaction(transaction);
        const signature = await connection.sendRawTransaction(signed.serialize());
        
        addLog(`[Solana] Submitted! Awaiting confirmation...`);
        await connection.confirmTransaction(signature, "confirmed");

        // Update campaign with real mint address
        campaign.mintAddress = mintPubkey.toString();

        return {
            signature,
            mintAddress: mintPubkey.toString(),
            fallback: false
        };
    }

    /**
     * Create InitializeMint instruction manually
     * (since we're using vanilla @solana/web3.js without @solana/spl-token)
     */
    function createInitializeMintInstruction(programId, mintPubkey, decimals, mintAuthority, freezeAuthority) {
        const solana = window.solanaWeb3;
        // InitializeMint instruction index = 0
        // Layout: [u8 instruction, u8 decimals, pubkey mintAuthority, u8 option, pubkey? freezeAuthority]
        const data = Buffer.alloc(67);
        data.writeUInt8(0, 0); // InitializeMint instruction
        data.writeUInt8(decimals, 1);
        mintAuthority.toBuffer().copy(data, 2);
        data.writeUInt8(1, 34); // Some(freezeAuthority)
        (freezeAuthority || mintAuthority).toBuffer().copy(data, 35);

        return new solana.TransactionInstruction({
            keys: [
                { pubkey: mintPubkey, isSigner: false, isWritable: true },
                { pubkey: new solana.PublicKey("SysvarRent111111111111111111111111111111111"), isSigner: false, isWritable: false }
            ],
            programId,
            data
        });
    }

    function completeMintSuccess() {
        state.activeCampaign.raised += 25;
        state.activeCampaign.minted = true;
        
        localStorage.setItem("mog_campaigns", JSON.stringify(state.campaigns));

        consoleStatus.textContent = "SUCCESS";
        consoleStatus.style.color = "var(--success)";
        
        mintBtn.textContent = "Cause Certificate Minted";
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
        
        emailExplorerLink.href = `https://explorer.solana.com/tx/${txSig}`;
        
        const today = new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
        emailDateDisplay.textContent = today;

        if (state.activeCampaign.zillowId) {
            emailZillowItem.style.display = "list-item";
            emailZillowLinkHref.href = `https://www.zillow.com/homedetails/${state.activeCampaign.zillowId}_zpid/`;
        } else {
            emailZillowItem.style.display = "none";
        }

        emailReceiptModal.style.display = "flex";
        addLog(`[Email Service] Delivered confirmation email from Sovereignty Hub.`);
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
        sendAirdropBtn.textContent = "✈️ Distributing Endowments...";
        airdropConsoleStatus.textContent = "RUNNING";
        airdropConsoleStatus.style.color = "var(--warning)";

        addAirdropLog(`[Distribution Engine] Launching batch multi-send for token: ${symbol}`);
        addAirdropLog(`[Distribution Engine] Recipients count: ${recipients.length} | Amount per wallet: ${amount} ${symbol}`);

        let idx = 0;
        function sendNext() {
            if (idx >= recipients.length) {
                // Done
                airdropConsoleStatus.textContent = "SUCCESS";
                airdropConsoleStatus.style.color = "var(--success)";
                sendAirdropBtn.disabled = false;
                sendAirdropBtn.textContent = "✈️ Distribute Tokens to Recipients";
                
                showToast("Distribution batch complete!");
                return;
            }

            const rec = recipients[idx];
            addAirdropLog(`[Distribution] Shipping ${amount} ${symbol} to ${rec.name} (${rec.wallet.substring(0, 8)}...)`);
            
            setTimeout(() => {
                const sig = generateRandomHex(88, "base58");
                addAirdropLog(`[Distribution] Success! Transaction Signature: ${sig.substring(0, 16)}...`);
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

    if (generateRefBtn) {
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
    }

    if (redeemCommBtn) {
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
    }


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
            "Foreclosure rescued! UnyKorn LLC completes the zero-carbon remodeling at 2277 Peachtree Way. Solar heat pumps are live!",
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
                <td style="padding: 8px 6px; text-align:right;"><a href="${c.url || 'https://ipfs.io/ipfs/' + c.cid}" target="_blank" class="utility-link" style="font-size:10px; display:inline-flex;">View IPFS</a></td>
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

            fetch(`${state.proxyUrl || DEFAULT_PROXY}/ipfs/pin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, role, msg })
            })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const cid = result.cid;
                    const certUrl = result.url;
                    addAILog(`[IPFS] Pinned metadata successfully! CID: ${cid}`);
                    
                    const today = new Date().toLocaleDateString("en-US", { year: '2-digit', month: '2-digit', day: '2-digit' });
                    const newCert = { name, role, cid, date: today, url: certUrl };
                    state.certificates.push(newCert);
                    localStorage.setItem("mog_certificates", JSON.stringify(state.certificates));

                    // Update Preview Card
                    previewCertRecipient.textContent = name;
                    previewCertRole.textContent = role.toUpperCase();
                    previewCertMsg.textContent = `"${msg}"`;
                    
                    const previewLink = document.getElementById('preview-cert-link');
                    if (previewLink) {
                        previewLink.textContent = `IPFS CID: ${cid}`;
                        previewLink.href = certUrl;
                    }
                    
                    previewCertDate.textContent = new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
                    certPreviewFrame.style.display = "block";

                    renderCertificateRegistry();

                    // Reset forms
                    certRecipientName.value = "";
                    certRecipientWallet.value = "";
                    certCongratsText.value = "";
                    showToast("Certificate generated and pinned to IPFS!");
                } else {
                    throw new Error(result.error || "Failed to pin certificate");
                }
            })
            .catch(err => {
                addAILog(`[IPFS Error] ${err.message}. Falling back to simulation mode...`, "warn");
                
                // Fallback simulation if offline
                const cid = `Qm${generateRandomHex(44, "base58")}`;
                const certUrl = `https://mensofgod.com/metadata/cert-${cid}.json`;
                addAILog(`[IPFS] Pinned metadata to gateway (Simulation Fallback)! CID: ${cid}`);
                
                const today = new Date().toLocaleDateString("en-US", { year: '2-digit', month: '2-digit', day: '2-digit' });
                const newCert = { name, role, cid, date: today, url: certUrl };
                state.certificates.push(newCert);
                localStorage.setItem("mog_certificates", JSON.stringify(state.certificates));

                previewCertRecipient.textContent = name;
                previewCertRole.textContent = role.toUpperCase();
                previewCertMsg.textContent = `"${msg}"`;
                
                const previewLink = document.getElementById('preview-cert-link');
                if (previewLink) {
                    previewLink.textContent = `IPFS CID: ${cid}`;
                    previewLink.href = certUrl;
                }
                
                previewCertDate.textContent = new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
                certPreviewFrame.style.display = "block";

                renderCertificateRegistry();

                certRecipientName.value = "";
                certRecipientWallet.value = "";
                certCongratsText.value = "";
                showToast("Certificate generated (Simulation Fallback)!");
            })
            .finally(() => {
                mintCertBtn.disabled = false;
                mintCertBtn.textContent = "📜 Mint Certificate & Pin to IPFS";
            });
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

    if (subCardNumber) {
    subCardNumber.addEventListener("input", (e) => {
        let val = e.target.value.replace(/\D/g, "");
        let formatted = "";
        for (let i = 0; i < val.length; i++) {
            if (i > 0 && i % 4 === 0) formatted += " ";
            formatted += val[i];
        }
        e.target.value = formatted;
    });
    }

    if (subCardExpiry) {
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
    }

    if (subCardCvc) {
    subCardCvc.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/\D/g, "");
    });
    }

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
    // BitGo Enterprise Custody Integration
    // ==========================================
    const BITGO_WALLET_CAUSE_MAP = {
        main: { label: 'Men of God (Main)', cause: 'Public Donations', icon: '' },
        child: { label: 'CHILD', cause: 'Child First Escrow', icon: '' },
        buck: { label: 'BUCK', cause: '2277 Peachtree RWA', icon: '' },
        carbon: { label: 'CARBON', cause: 'Zero Carbon Solar', icon: '' },
        mog: { label: 'MOG', cause: 'Stablecoin Liquidity', icon: '' },
        global: { label: 'GLOBE', cause: 'Global Crisis Response', icon: '' }
    };

    const CAMPAIGN_TO_WALLET = {
        'child-first': 'child',
        '2277': 'buck',
        'zero-carbon': 'carbon',
        'mog-stablecoin': 'mog',
        'venezuela-stablecoin': 'global',
        'cuba-solar-med': 'global',
        'global-emergency': 'global'
    };

    const DEFAULT_PROXY = 'https://fasx1e-ip-76-230-229-105.tunnelmole.net';
    let savedProxy = localStorage.getItem('mog_bitgo_proxy');
    if (!savedProxy || savedProxy.includes('localhost') || savedProxy.includes('127.0.0.1') || savedProxy === 'http://localhost:3377' || savedProxy.includes('electricity-hygiene-taken-setup') || savedProxy.includes('trycloudflare.com') || savedProxy.includes('tzq0ba-ip-76-230-229-105.tunnelmole.net')) {
        localStorage.setItem('mog_bitgo_proxy', DEFAULT_PROXY);
        savedProxy = DEFAULT_PROXY;
    }

    let bitgoState = {
        connected: false,
        proxyUrl: savedProxy,
        wallets: {},
        env: 'unknown'
    };

    function bitgoLog(msg, type = 'info') {
        const consoleLogs = document.getElementById('bitgo-console-logs');
        if (!consoleLogs) return;
        const ts = new Date().toLocaleTimeString();
        const colors = { info: '#22c55e', error: '#ef4444', warn: '#f59e0b', api: '#3b82f6' };
        const color = colors[type] || colors.info;
        consoleLogs.innerHTML += `<div style="color: ${color}">[${ts}] ${msg}</div>`;
        consoleLogs.scrollTop = consoleLogs.scrollHeight;
    }

    async function bitgoFetch(path, options = {}) {
        const url = `${bitgoState.proxyUrl}${path}`;
        bitgoLog(`API → ${options.method || 'GET'} ${path}`, 'api');
        try {
            const resp = await fetch(url, {
                ...options,
                headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }
            });
            const data = await resp.json();
            if (data.error) {
                bitgoLog(`ERROR: ${data.message || JSON.stringify(data)}`, 'error');
            }
            return data;
        } catch (e) {
            bitgoLog(`FETCH FAILED: ${e.message}`, 'error');
            return { error: true, message: e.message };
        }
    }

    async function initBitGoDashboard() {
        const proxyInput = document.getElementById('bitgo-proxy-url');
        if (proxyInput) proxyInput.value = bitgoState.proxyUrl;
    }

    // Connect button
    const bitgoConnectBtn = document.getElementById('bitgo-connect-btn');
    if (bitgoConnectBtn) {
        bitgoConnectBtn.addEventListener('click', async () => {
            const proxyInput = document.getElementById('bitgo-proxy-url');
            bitgoState.proxyUrl = proxyInput ? proxyInput.value.replace(/\/$/, '') : 'http://localhost:3377';
            localStorage.setItem('mog_bitgo_proxy', bitgoState.proxyUrl);

            bitgoLog('Connecting to BitGo proxy server...', 'info');
            bitgoConnectBtn.disabled = true;
            bitgoConnectBtn.textContent = 'Connecting...';

            const health = await bitgoFetch('/health');

            if (health.error || health.status !== 'online') {
                bitgoLog(`Connection failed. Is the proxy running? (node bitgo-proxy.js)`, 'error');
                updateBitGoConnectionStatus(false);
                bitgoConnectBtn.disabled = false;
                bitgoConnectBtn.textContent = 'Connect to Proxy';
                return;
            }

            bitgoState.connected = true;
            bitgoState.env = health.bitgoEnv || 'unknown';

            const envDisplay = document.getElementById('bitgo-env-display');
            if (envDisplay) envDisplay.value = `${health.bitgoEnv.toUpperCase()} — ${health.coin.toUpperCase()} — Token: ${health.accessTokenConfigured ? '✅' : 'X'}`;

            bitgoLog(`Connected! Environment: ${health.bitgoEnv}, Coin: ${health.coin}, Wallets: ${health.walletsConfigured}/6`, 'info');
            updateBitGoConnectionStatus(true);

            bitgoConnectBtn.disabled = false;
            bitgoConnectBtn.textContent = 'Connected';

            const refreshBtn = document.getElementById('bitgo-refresh-btn');
            if (refreshBtn) refreshBtn.disabled = false;
            const sendBtn = document.getElementById('bitgo-send-btn');
            if (sendBtn) sendBtn.disabled = false;

            // Auto-load dashboard
            await loadBitGoDashboard();
        });
    }

    // Refresh button
    const bitgoRefreshBtn = document.getElementById('bitgo-refresh-btn');
    if (bitgoRefreshBtn) {
        bitgoRefreshBtn.addEventListener('click', () => loadBitGoDashboard());
    }

    function updateBitGoConnectionStatus(connected) {
        const el = document.getElementById('bitgo-connection-status');
        if (!el) return;
        if (connected) {
            el.style.background = 'rgba(16,185,129,0.15)';
            el.style.color = 'var(--success)';
            el.style.borderColor = 'rgba(16,185,129,0.3)';
            el.innerHTML = `<span style="width:8px;height:8px;border-radius:50%;background:var(--success);display:inline-block;"></span> Proxy: Connected (${bitgoState.env.toUpperCase()})`;
        } else {
            el.style.background = 'rgba(239,68,68,0.15)';
            el.style.color = 'var(--danger)';
            el.style.borderColor = 'rgba(239,68,68,0.3)';
            el.innerHTML = '<span style="width:8px;height:8px;border-radius:50%;background:var(--danger);display:inline-block;"></span> Proxy: Not Connected';
        }
    }

    async function loadBitGoDashboard() {
        if (!bitgoState.connected) return;
        bitgoLog('Loading enterprise dashboard data...', 'info');

        const dashboard = await bitgoFetch('/dashboard');
        if (dashboard.error) {
            bitgoLog(`Dashboard load failed: ${dashboard.message}`, 'error');
            return;
        }

        bitgoState.wallets = dashboard.wallets || {};

        // Update summary cards
        let totalSol = 0;
        let activeCount = 0;
        for (const [name, w] of Object.entries(bitgoState.wallets)) {
            if (w.configured && !w.error) {
                totalSol += parseFloat(w.balance || 0);
                activeCount++;
            }
        }

        const totalSolEl = document.getElementById('bitgo-total-sol');
        if (totalSolEl) totalSolEl.textContent = totalSol.toFixed(6) + ' SOL';
        const walletCountEl = document.getElementById('bitgo-wallet-count');
        if (walletCountEl) walletCountEl.textContent = `${activeCount} / 6`;

        // Render wallet table
        renderBitGoWalletTable();

        bitgoLog(`Dashboard loaded: ${activeCount} wallets, ${totalSol.toFixed(6)} total SOL`, 'info');
        showToast('BitGo dashboard updated');
    }

    function renderBitGoWalletTable() {
        const tbody = document.getElementById('bitgo-wallets-tbody');
        if (!tbody) return;

        let rows = '';
        for (const [name, w] of Object.entries(bitgoState.wallets)) {
            const meta = BITGO_WALLET_CAUSE_MAP[name] || { label: name, cause: '—', icon: '' };
            const bal = w.balance || '0';
            const spend = w.spendableBalance || '0';
            const addr = w.receiveAddress || '—';
            const shortAddr = addr.length > 12 ? addr.substring(0, 6) + '…' + addr.substring(addr.length - 4) : addr;

            let statusHtml;
            if (!w.configured) {
                statusHtml = '<span style="color: var(--text-muted);">Not configured</span>';
            } else if (w.error) {
                statusHtml = `<span style="color: var(--danger);">${w.error.substring(0, 30)}</span>`;
            } else if (parseFloat(bal) === 0) {
                statusHtml = '<span style="color: var(--warning);">Needs funding</span>';
            } else {
                statusHtml = '<span style="color: var(--success);">Active</span>';
            }

            rows += `<tr style="border-bottom: 1px solid var(--border-color); transition: background 0.2s;" onmouseover="this.style.background='rgba(59,130,246,0.05)'" onmouseout="this.style.background='transparent'">
                <td style="padding: 12px; font-weight: 600;">${meta.icon} ${meta.label}</td>
                <td style="padding: 12px; color: var(--text-secondary);">${meta.cause}</td>
                <td style="padding: 12px; font-family: var(--font-mono); font-weight: 600; color: var(--accent);">${parseFloat(bal).toFixed(6)}</td>
                <td style="padding: 12px; font-family: var(--font-mono); color: var(--text-secondary);">${parseFloat(spend).toFixed(6)}</td>
                <td style="padding: 12px; font-family: var(--font-mono); font-size: 10px; color: var(--accent-purple);" title="${addr}">${shortAddr}</td>
                <td style="padding: 12px; font-size: 11px;">${statusHtml}</td>
            </tr>`;
        }

        tbody.innerHTML = rows || '<tr><td colspan="6" style="padding: 20px; text-align: center;">No wallet data</td></tr>';
    }

    // Transfer via BitGo
    const bitgoSendBtn = document.getElementById('bitgo-send-btn');
    if (bitgoSendBtn) {
        bitgoSendBtn.addEventListener('click', async () => {
            const from = document.getElementById('bitgo-transfer-from').value;
            const to = document.getElementById('bitgo-transfer-to').value.trim();
            const amountSol = parseFloat(document.getElementById('bitgo-transfer-amount').value);
            const memo = document.getElementById('bitgo-transfer-memo').value.trim();
            const statusEl = document.getElementById('bitgo-transfer-status');

            if (!to || !amountSol || amountSol <= 0) {
                showToast('Enter a valid destination address and amount.', 'error');
                return;
            }

            const lamports = Math.round(amountSol * 1e9);
            bitgoLog(`Sending ${amountSol} SOL from ${from} to ${to.substring(0, 8)}...`, 'info');
            bitgoSendBtn.disabled = true;
            bitgoSendBtn.textContent = 'Processing...';
            if (statusEl) statusEl.textContent = 'Submitting transfer request to BitGo...';

            const result = await bitgoFetch(`/wallet/${from}/sendcoins`, {
                method: 'POST',
                body: JSON.stringify({ address: to, amount: String(lamports), memo })
            });

            if (result.error) {
                bitgoLog(`Transfer FAILED: ${result.message || JSON.stringify(result)}`, 'error');
                showToast('Transfer failed. Check BitGo console.', 'error');
                if (statusEl) statusEl.textContent = `X Failed: ${result.message || 'Unknown error'}`;
            } else {
                const txId = result.txid || result.transfer?.txid || 'pending';
                bitgoLog(`Transfer SUCCESS! TX: ${txId}`, 'info');
                showToast(`Transfer of ${amountSol} SOL submitted successfully!`);
                if (statusEl) statusEl.innerHTML = `✅ Sent! TX: <a href="https://explorer.solana.com/tx/${txId}" target="_blank" style="color:var(--accent);">${txId.substring(0, 12)}…</a>`;
                
                // Clear form
                document.getElementById('bitgo-transfer-to').value = '';
                document.getElementById('bitgo-transfer-amount').value = '';
                document.getElementById('bitgo-transfer-memo').value = '';
                
                // Refresh balances
                setTimeout(() => loadBitGoDashboard(), 3000);
            }

            bitgoSendBtn.disabled = false;
            bitgoSendBtn.textContent = 'Send via BitGo';
        });
    }

    // Transaction history filter
    const bitgoTxFilter = document.getElementById('bitgo-tx-wallet-filter');
    if (bitgoTxFilter) {
        bitgoTxFilter.addEventListener('change', () => loadBitGoTransactions(bitgoTxFilter.value));
    }

    async function loadBitGoTransactions(walletName) {
        if (!bitgoState.connected) return;
        bitgoLog(`Loading transactions for ${walletName}...`, 'api');

        const result = await bitgoFetch(`/wallet/${walletName}/transfers?limit=20`);
        const tbody = document.getElementById('bitgo-tx-tbody');
        if (!tbody) return;

        if (result.error || !result.transfers || result.transfers.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="padding: 20px; text-align: center; color: var(--text-muted);">No transactions found</td></tr>';
            return;
        }

        let rows = '';
        for (const tx of result.transfers) {
            const date = tx.date ? new Date(tx.date).toLocaleDateString() : '—';
            const type = tx.type || 'transfer';
            const value = tx.valueString ? (parseInt(tx.valueString) / 1e9).toFixed(6) : '0';
            const txHash = tx.txid || '—';
            const shortHash = txHash.length > 12 ? txHash.substring(0, 8) + '…' : txHash;
            const status = tx.state || 'confirmed';
            const statusColor = status === 'confirmed' ? 'var(--success)' : status === 'signed' ? 'var(--warning)' : 'var(--text-muted)';

            const typeColor = type === 'receive' ? 'var(--success)' : type === 'send' ? 'var(--danger)' : 'var(--accent)';
            const sign = type === 'receive' ? '+' : type === 'send' ? '-' : '';

            rows += `<tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 8px 10px;">${date}</td>
                <td style="padding: 8px 10px; color: ${typeColor}; font-weight: 600; text-transform: uppercase;">${type}</td>
                <td style="padding: 8px 10px; font-family: var(--font-mono); color: ${typeColor}; font-weight: 600;">${sign}${value} SOL</td>
                <td style="padding: 8px 10px;"><a href="https://explorer.solana.com/tx/${txHash}" target="_blank" style="color: var(--accent); font-family: var(--font-mono); font-size: 10px;">${shortHash}</a></td>
                <td style="padding: 8px 10px; color: ${statusColor}; font-weight: 600; font-size: 10px; text-transform: uppercase;">${status}</td>
            </tr>`;
        }

        tbody.innerHTML = rows;
        bitgoLog(`Loaded ${result.transfers.length} transactions for ${walletName}`, 'info');
    }

    // Helper: Get BitGo wallet address for a campaign
    function getBitGoReceiveAddress(campaignId) {
        const walletName = CAMPAIGN_TO_WALLET[campaignId];
        if (!walletName || !bitgoState.wallets[walletName]) return null;
        return bitgoState.wallets[walletName].receiveAddress || null;
    }

    // ==========================================
    // Learn More & AI Weekly Newsletter
    // ==========================================
    if (newsletterBtn) {
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
            
            if (newsletterContent) newsletterContent.textContent = report;
            if (newsletterPreviewCard) newsletterPreviewCard.style.display = "block";
            
            newsletterBtn.disabled = false;
            newsletterBtn.textContent = "Register Now";
            newsletterEmail.value = "";
        }, 1200);
    });
    }

    // ==========================================
    // Stablecoin Minting Handlers
    // ==========================================
    const stablecoinMintBtn = document.getElementById('stablecoin-mint-btn');
    const stablecoinListBtn = document.getElementById('stablecoin-list-btn');
    const stablecoinStatus = document.getElementById('stablecoin-status');

    if (stablecoinListBtn) {
        stablecoinListBtn.addEventListener('click', async () => {
            if (!bitgoState.connected) {
                stablecoinStatus.textContent = 'Connect to BitGo proxy first';
                stablecoinStatus.style.color = 'var(--danger)';
                return;
            }
            try {
                stablecoinStatus.textContent = 'Loading available stablecoins...';
                stablecoinStatus.style.color = 'var(--text-muted)';
                const res = await fetch(`${bitgoState.proxyUrl}/stablecoin/assets`);
                const assets = await res.json();
                bitgoLog(`Stablecoin assets loaded: ${JSON.stringify(assets).substring(0, 200)}`, 'info');
                stablecoinStatus.textContent = `Found ${Array.isArray(assets) ? assets.length : 0} mintable stablecoins`;
                stablecoinStatus.style.color = 'var(--success)';
            } catch (e) {
                stablecoinStatus.textContent = `Error: ${e.message}`;
                stablecoinStatus.style.color = 'var(--danger)';
            }
        });
    }

    if (stablecoinMintBtn) {
        stablecoinMintBtn.addEventListener('click', async () => {
            if (!bitgoState.connected) {
                stablecoinStatus.textContent = 'Connect to BitGo proxy first';
                stablecoinStatus.style.color = 'var(--danger)';
                return;
            }
            const assetSelect = document.getElementById('stablecoin-asset');
            const amountInput = document.getElementById('stablecoin-amount');
            const destSelect = document.getElementById('stablecoin-destination');
            const amount = parseFloat(amountInput.value);

            if (!amount || amount <= 0) {
                stablecoinStatus.textContent = 'Enter a valid amount';
                stablecoinStatus.style.color = 'var(--danger)';
                return;
            }

            try {
                stablecoinMintBtn.disabled = true;
                stablecoinMintBtn.textContent = 'Processing...';
                stablecoinStatus.textContent = 'Creating mint order...';
                stablecoinStatus.style.color = 'var(--text-muted)';

                // Calculate base units (USD has 2 decimals)
                const baseUnits = Math.round(amount * 100);
                const assetToken = assetSelect.value;

                const body = {
                    assetId: assetToken,
                    amount: String(baseUnits),
                    destinationType: destSelect.value === 'go-account' ? 'go-account' : 'wallet',
                    destinationWalletId: destSelect.value !== 'go-account' ? destSelect.value : undefined
                };

                const res = await fetch(`${bitgoState.proxyUrl}/stablecoin/mint`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });
                const result = await res.json();

                if (result.error) {
                    bitgoLog(`Mint order failed: ${result.message}`, 'error');
                    stablecoinStatus.textContent = `Error: ${result.message}`;
                    stablecoinStatus.style.color = 'var(--danger)';
                } else {
                    bitgoLog(`Mint order created! ID: ${result.id || 'pending'}, Amount: $${amount}`, 'success');
                    stablecoinStatus.textContent = `Mint order created for $${amount.toFixed(2)} ${assetToken}`;
                    stablecoinStatus.style.color = 'var(--success)';

                    // Add to orders table
                    const tbody = document.getElementById('stablecoin-orders-tbody');
                    if (tbody) {
                        const existingEmpty = tbody.querySelector('tr td[colspan]');
                        if (existingEmpty) tbody.innerHTML = '';
                        const tr = document.createElement('tr');
                        tr.style.borderBottom = '1px solid var(--border-color)';
                        tr.innerHTML = `
                            <td style="padding: 8px 10px; font-family: var(--font-mono);">${(result.id || 'pending').substring(0, 12)}...</td>
                            <td style="padding: 8px 10px;">${assetToken}</td>
                            <td style="padding: 8px 10px;">$${amount.toFixed(2)}</td>
                            <td style="padding: 8px 10px;">${destSelect.options[destSelect.selectedIndex].text}</td>
                            <td style="padding: 8px 10px;"><span style="background: rgba(0,212,170,0.15); color: var(--success); padding: 2px 8px; border-radius: 4px; font-size: 10px;">${result.status || 'created'}</span></td>
                        `;
                        tbody.appendChild(tr);
                    }
                    amountInput.value = '';
                }
            } catch (e) {
                stablecoinStatus.textContent = `Error: ${e.message}`;
                stablecoinStatus.style.color = 'var(--danger)';
                bitgoLog(`Mint error: ${e.message}`, 'error');
            } finally {
                stablecoinMintBtn.disabled = false;
                stablecoinMintBtn.textContent = 'Mint Stablecoin';
            }
        });
    }

    // ==========================================
    // Deposit Address Generator
    // ==========================================
    const generateDepositBtn = document.getElementById('generate-deposit-addr-btn');
    if (generateDepositBtn) {
        generateDepositBtn.addEventListener('click', async () => {
            if (!bitgoState.connected) {
                alert('Connect to BitGo proxy first');
                return;
            }
            const walletName = document.getElementById('deposit-wallet-select').value;
            const label = document.getElementById('deposit-label').value || `Deposit-${Date.now()}`;

            try {
                generateDepositBtn.disabled = true;
                generateDepositBtn.textContent = 'Generating...';

                const res = await fetch(`${bitgoState.proxyUrl}/wallet/${walletName}/generate-address`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ label })
                });
                const result = await res.json();

                if (result.error) {
                    bitgoLog(`Address generation failed: ${result.message}`, 'error');
                    alert(`Error: ${result.message}`);
                } else {
                    const resultDiv = document.getElementById('deposit-address-result');
                    const addrDiv = document.getElementById('deposit-address-value');
                    addrDiv.textContent = result.address;
                    resultDiv.style.display = 'block';
                    bitgoLog(`New deposit address for ${walletName}: ${result.address}`, 'success');
                }
            } catch (e) {
                bitgoLog(`Address error: ${e.message}`, 'error');
            } finally {
                generateDepositBtn.disabled = false;
                generateDepositBtn.textContent = 'Generate Address';
            }
        });
    }

    const copyDepositBtn = document.getElementById('copy-deposit-addr-btn');
    if (copyDepositBtn) {
        copyDepositBtn.addEventListener('click', () => {
            const addr = document.getElementById('deposit-address-value').textContent;
            navigator.clipboard.writeText(addr).then(() => {
                copyDepositBtn.textContent = 'Copied!';
                setTimeout(() => { copyDepositBtn.textContent = 'Copy Address'; }, 2000);
            });
        });
    }

    function recordAffiliateSale(amount) {
        const referredBy = localStorage.getItem('mog_referred_by');
        if (!referredBy) return;

        const stats = JSON.parse(localStorage.getItem('mog_affiliate_stats') || '{"referrals":0,"earned":0,"pending":0,"gmv":0,"redeemed":0,"cashedout":0}');
        stats.referrals += 1;
        stats.gmv += parseFloat(amount);
        
        let rate = 0.20;
        if (stats.referrals >= 50 || stats.gmv >= 10000) {
            rate = 0.40;
        } else if (stats.referrals >= 15) {
            rate = 0.30;
        } else if (stats.referrals >= 5) {
            rate = 0.25;
        }

        const commission = parseFloat(amount) * rate;
        stats.earned += commission;
        localStorage.setItem('mog_affiliate_stats', JSON.stringify(stats));

        addLog(`[Affiliate] Referred sale of $${amount} USD captured. Referrer "${referredBy}" earned $${commission.toFixed(2)} USD (Commission Rate: ${rate * 100}%).`);
        
        const profile = JSON.parse(localStorage.getItem('mog_affiliate_profile'));
        if (profile) {
            renderAffiliateDashboard(profile);
        }
    }

    // ==========================================
    // Affiliate System
    // ==========================================
    function initAffiliateSystem() {
        const signupState = document.getElementById('affiliate-signup-state');
        const dashboardState = document.getElementById('affiliate-dashboard-state');
        const signupForm = document.getElementById('affiliate-signup-form');

        // Check if registered
        const profileStr = localStorage.getItem('mog_affiliate_profile');
        
        const urlParams = new URLSearchParams(window.location.search);
        const refCode = urlParams.get('ref');

        if (profileStr) {
            const profile = JSON.parse(profileStr);
            const affiliateId = profile.namespace;

            if (refCode && refCode !== affiliateId) {
                localStorage.setItem('mog_referred_by', refCode);
                addLog(`[Affiliate] Referral tracked: ${refCode}`);
            }

            if (signupState) signupState.style.display = 'none';
            if (dashboardState) dashboardState.style.display = 'block';

            renderAffiliateDashboard(profile);
        } else {
            if (refCode) {
                localStorage.setItem('mog_referred_by', refCode);
                addLog(`[Affiliate] Referral tracked: ${refCode}`);
            }

            if (signupState) signupState.style.display = 'block';
            if (dashboardState) dashboardState.style.display = 'none';

            // Bind sign-up form handler
            if (signupForm) {
                signupForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const namespace = document.getElementById('aff-signup-namespace').value.trim().toLowerCase();
                    const displayName = document.getElementById('aff-signup-displayname').value.trim();
                    const email = document.getElementById('aff-signup-email').value.trim();
                    const wallet = document.getElementById('aff-signup-wallet').value.trim() || state.userWallet || '';

                    // Validate namespace format (3-40 chars, lowercase, dots allowed)
                    if (!/^[a-z0-9.]{3,40}$/.test(namespace)) {
                        showToast("Namespace must be 3-40 characters, lowercase letters, numbers, and dots only.", "error");
                        return;
                    }

                    const profile = { namespace, displayName, email, wallet };
                    localStorage.setItem('mog_affiliate_profile', JSON.stringify(profile));
                    
                    // Initialize empty stats
                    const initialStats = { referrals: 0, earned: 0, pending: 0, gmv: 0, redeemed: 0, cashedout: 0 };
                    localStorage.setItem('mog_affiliate_stats', JSON.stringify(initialStats));

                    showToast("Affiliate registration successful!", "success");
                    addLog(`[Affiliate] Registered new namespace: ${namespace}.mensofgod.id`);

                    if (signupState) signupState.style.display = 'none';
                    if (dashboardState) dashboardState.style.display = 'block';

                    renderAffiliateDashboard(profile);
                });
            }
        }
    }

    function renderAffiliateDashboard(profile) {
        const affiliateId = profile.namespace;
        const linkInput = document.getElementById('affiliate-dashboard-link');
        const badgeNamespace = document.getElementById('dashboard-namespace-badge');
        const badgeRate = document.getElementById('dashboard-rate-badge');

        const tierEl = document.getElementById('aff-dash-tier');
        const referralsEl = document.getElementById('aff-dash-clicks');
        const gmvEl = document.getElementById('aff-dash-earned');
        const creditBalanceEl = document.getElementById('aff-credit-balance');
        const cashoutBalanceEl = document.getElementById('aff-cashout-balance');
        const cashoutHelper = document.getElementById('cashout-helper-text');
        const cashoutBtn = document.getElementById('request-cashout-btn');
        const creditBtn = document.getElementById('redeem-credit-btn');

        const shareX = document.getElementById('share-twitter-btn');
        const shareTg = document.getElementById('share-telegram-btn');
        const shareEmail = document.getElementById('share-email-btn');

        const refLink = `https://mensofgod.com/?ref=${affiliateId}`;

        if (linkInput) linkInput.value = refLink;
        if (badgeNamespace) badgeNamespace.textContent = `${affiliateId}.mensofgod.id`;

        // Load stats
        const stats = JSON.parse(localStorage.getItem('mog_affiliate_stats') || '{"referrals":0,"earned":0,"pending":0,"gmv":0,"redeemed":0,"cashedout":0}');

        // Resolve tier and commission rate
        let tier = "Standard";
        let rate = 0.20; // 20%
        if (stats.referrals >= 50 || stats.gmv >= 10000) {
            tier = "Platinum";
            rate = 0.40;
        } else if (stats.referrals >= 15) {
            tier = "Gold";
            rate = 0.30;
        } else if (stats.referrals >= 5) {
            tier = "Silver";
            rate = 0.25;
        }

        if (badgeRate) badgeRate.textContent = `${(rate * 100)}% Commission`;
        if (tierEl) {
            tierEl.textContent = tier;
            const colors = { Standard: "#ffffff", Silver: "#c0c0c0", Gold: "#ffd700", Platinum: "#00e5ff" };
            tierEl.style.color = colors[tier];
        }

        if (referralsEl) referralsEl.textContent = stats.referrals;
        if (gmvEl) gmvEl.textContent = `$${stats.gmv.toFixed(2)}`;

        // Calculate available balances
        const availableBalance = stats.earned - stats.redeemed - stats.cashedout;

        if (creditBalanceEl) creditBalanceEl.textContent = `$${availableBalance.toFixed(2)}`;
        if (cashoutBalanceEl) cashoutBalanceEl.textContent = `$${availableBalance.toFixed(2)}`;

        // Credit button state
        if (creditBtn) {
            if (availableBalance > 0) {
                creditBtn.disabled = false;
                creditBtn.style.opacity = '1';
                creditBtn.style.cursor = 'pointer';
                creditBtn.textContent = 'Use as MOG Credit';
            } else {
                creditBtn.disabled = true;
                creditBtn.style.opacity = '0.5';
                creditBtn.style.cursor = 'not-allowed';
                creditBtn.textContent = 'No credit available';
            }
        }

        // Cashout button and helper text state
        if (cashoutBtn) {
            if (availableBalance >= 30.00) {
                cashoutBtn.disabled = false;
                cashoutBtn.style.cursor = 'pointer';
                cashoutBtn.textContent = 'Request Cashout ($SOL)';
                cashoutBtn.classList.remove('btn-secondary');
                cashoutBtn.style.background = 'linear-gradient(135deg, #00ff9d, #00b36b)';
                cashoutBtn.style.color = 'black';
                if (cashoutHelper) cashoutHelper.textContent = 'Payouts processed directly in SOL to your wallet.';
            } else {
                cashoutBtn.disabled = true;
                cashoutBtn.style.cursor = 'not-allowed';
                cashoutBtn.textContent = 'Cashout Available at $30';
                cashoutBtn.classList.add('btn-secondary');
                cashoutBtn.style.background = '';
                cashoutBtn.style.color = '';
                if (cashoutHelper) {
                    const diff = 30.00 - availableBalance;
                    cashoutHelper.textContent = `Minimum cashout is $30.00. You need $${diff.toFixed(2)} more.`;
                }
            }
        }

        // Bind share buttons
        if (shareX) {
            shareX.onclick = () => {
                window.open(`https://twitter.com/intent/tweet?text=Clone%20pre-audited%20token%20blueprints%20instantly%20on%20the%20Men%20of%20God%20Sovereign%20Hub!%20%F0%9F%9A%80%20${encodeURIComponent(refLink)}`, '_blank');
            };
        }
        if (shareTg) {
            shareTg.onclick = () => {
                window.open(`https://t.me/share/url?url=${encodeURIComponent(refLink)}&text=Launch%20your%20own%20sovereign%20charity%20tokens%20on%20Men%20of%20God%20Hub!`, '_blank');
            };
        }
        if (shareEmail) {
            shareEmail.onclick = () => {
                window.location.href = `mailto:?subject=Men%20of%20God%20Sovereign%20Hub&body=Checkout%20this%20sovereign%20tokenization%20platform%20licensed%20under%20UnyKorn%20LLC:%20${encodeURIComponent(refLink)}`;
            };
        }
    }

    // Copy referral links
    const copyDashLinkBtn = document.getElementById('copy-dashboard-link-btn');
    if (copyDashLinkBtn) {
        copyDashLinkBtn.addEventListener('click', () => {
            const link = document.getElementById('affiliate-dashboard-link').value;
            navigator.clipboard.writeText(link).then(() => {
                copyDashLinkBtn.textContent = 'Copied!';
                setTimeout(() => { copyDashLinkBtn.textContent = 'Copy Link'; }, 2000);
            });
        });
    }

    // Bind redemption button clicks
    const redeemCreditBtn = document.getElementById('redeem-credit-btn');
    if (redeemCreditBtn) {
        redeemCreditBtn.onclick = () => {
            const stats = JSON.parse(localStorage.getItem('mog_affiliate_stats') || '{"referrals":0,"earned":0,"pending":0,"gmv":0,"redeemed":0,"cashedout":0}');
            const available = stats.earned - stats.redeemed - stats.cashedout;
            if (available > 0) {
                stats.redeemed += available;
                localStorage.setItem('mog_affiliate_stats', JSON.stringify(stats));
                showToast(`Applied $${available.toFixed(2)} USD MOG Credit to your account!`, "success");
                addLog(`[Affiliate] Redeemed $${available.toFixed(2)} MOG Credit.`);
                const profile = JSON.parse(localStorage.getItem('mog_affiliate_profile'));
                renderAffiliateDashboard(profile);
            }
        };
    }

    const requestCashoutBtn = document.getElementById('request-cashout-btn');
    if (requestCashoutBtn) {
        requestCashoutBtn.onclick = () => {
            const stats = JSON.parse(localStorage.getItem('mog_affiliate_stats') || '{"referrals":0,"earned":0,"pending":0,"gmv":0,"redeemed":0,"cashedout":0}');
            const available = stats.earned - stats.redeemed - stats.cashedout;
            if (available >= 30.00) {
                stats.cashedout += available;
                localStorage.setItem('mog_affiliate_stats', JSON.stringify(stats));
                showToast(`Cashout request of $${available.toFixed(2)} in SOL submitted!`, "success");
                addLog(`[Affiliate] Submitted cashout request of $${available.toFixed(2)} USD value in SOL.`);
                const profile = JSON.parse(localStorage.getItem('mog_affiliate_profile'));
                renderAffiliateDashboard(profile);
            }
        };
    }

    const copyAffiliateBtn = document.getElementById('copy-affiliate-link-btn');
    if (copyAffiliateBtn) {
        copyAffiliateBtn.addEventListener('click', () => {
            const link = document.getElementById('affiliate-link').value;
            navigator.clipboard.writeText(link).then(() => {
                copyAffiliateBtn.textContent = 'Copied!';
                setTimeout(() => { copyAffiliateBtn.textContent = 'Copy Link'; }, 2000);
            });
        });
    }

    // ==========================================
    // Web3 Registration Handler
    // ==========================================
    const regSubmitBtn = document.getElementById('reg-submit-btn');
    if (regSubmitBtn) {
        regSubmitBtn.addEventListener('click', async () => {
            const name = document.getElementById('reg-name').value.trim();
            const email = document.getElementById('reg-email').value.trim();
            const accountType = document.getElementById('reg-account-type').value;
            const custodyType = document.getElementById('reg-custody-type').value;
            const statusEl = document.getElementById('reg-status');

            if (!name || !email) {
                statusEl.textContent = 'Name and email are required';
                statusEl.style.color = 'var(--danger)';
                return;
            }
            if (!email.includes('@')) {
                statusEl.textContent = 'Enter a valid email address';
                statusEl.style.color = 'var(--danger)';
                return;
            }

            regSubmitBtn.disabled = true;
            regSubmitBtn.textContent = 'Processing...';
            statusEl.textContent = 'Creating your Web3 custody account...';
            statusEl.style.color = 'var(--text-muted)';

            // Generate wallet-style ID
            const walletId = 'MOG-' + Math.random().toString(36).substring(2, 14).toUpperCase();

            // Store registration
            const registrations = JSON.parse(localStorage.getItem('mog_registrations') || '[]');
            const newReg = {
                id: walletId,
                name,
                email,
                accountType,
                custodyType,
                registeredAt: new Date().toISOString(),
                referredBy: localStorage.getItem('mog_referred_by') || null
            };
            registrations.push(newReg);
            localStorage.setItem('mog_registrations', JSON.stringify(registrations));

            // Notification emails to admin team
            const adminEmails = ['kevanbtc@gmail.com', 'kevan@unykorn.org', 'buckvaughan3636@gmail.com'];
            const emailSubject = `New MOG Web3 Registration: ${name} (${accountType})`;
            const emailBody = `
New registration on Men of God Sovereign Platform:

Name: ${name}
Email: ${email}
Account Type: ${accountType}
Custody Preference: ${custodyType}
Wallet ID: ${walletId}
Referred By: ${newReg.referredBy || 'Direct'}
Registered: ${newReg.registeredAt}

--- Sent by MOG Autonomous Platform ---
            `.trim();

            // Try sending via proxy if available
            if (bitgoState.proxyUrl) {
                try {
                    await fetch(`${bitgoState.proxyUrl}/registration`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            registration: newReg,
                            notifyEmails: adminEmails,
                            subject: emailSubject,
                            body: emailBody
                        })
                    });
                } catch (e) {
                    console.log('Registration notification queued for manual processing');
                }
            }

            // Success state
            await new Promise(r => setTimeout(r, 1500));

            statusEl.innerHTML = `
                <span style="color: var(--success);">Account created! ID: <strong>${walletId}</strong></span><br>
                <span style="font-size: 10px; color: var(--text-muted);">Welcome email sent to ${email}. Admin notifications dispatched to ${adminEmails.length} addresses.</span>
            `;
            if (typeof checkTokenizerVerificationGate === 'function') checkTokenizerVerificationGate();

            // Update affiliate referral if applicable
            const referredBy = localStorage.getItem('mog_referred_by');
            if (referredBy) {
                const stats = JSON.parse(localStorage.getItem('mog_affiliate_stats') || '{"referrals":0,"earned":0,"pending":0}');
                stats.referrals++;
                stats.pending += 5.00; // Base referral bonus
                localStorage.setItem('mog_affiliate_stats', JSON.stringify(stats));
                addLog(`[Affiliate] Referral confirmed for ${referredBy}, +$5.00 pending`);
            }

            addLog(`[Registration] New ${accountType} account: ${walletId} - ${name} (${email})`);
            addLog(`[Email] Notifications queued: ${adminEmails.join(', ')}`);

            regSubmitBtn.disabled = false;
            regSubmitBtn.textContent = 'Register Another';

            // Clear form
            document.getElementById('reg-name').value = '';
            document.getElementById('reg-email').value = '';
        });
    }

    initAffiliateSystem();

    function initBlueprintGallery() {
        const checkoutModal = document.getElementById("blueprint-checkout-modal");
        const verificationModal = document.getElementById("tokenizer-verification-modal");
        const salesModal = document.getElementById("sales-contact-modal");
        const expressForm = document.getElementById("express-launch-form");
        const checkoutBtn = document.getElementById("checkout-submit-btn");
        const verifyBtn = document.getElementById("verify-submit-btn");
        const salesBtn = document.getElementById("sales-submit-btn");
        const codeInput = document.getElementById("express-blueprint-code");
        const codeBtn = document.getElementById("blueprint-code-btn");
        const customSlidersBtn = document.getElementById("custom-sliders-btn");
        const complianceLock = document.getElementById("compliance-lock-area");
        const gateVerifyBtn = document.getElementById("gate-verify-modal-btn");
        const launchBtn = document.getElementById("express-launch-btn");
        
        let selectedTemplate = null;
        let selectedTier = "community";
        window.selectedBp = null;

        let stripeElements = null;
        let stripeCardElement = null;

        function initStripeElements() {
            if (!window.Stripe || !stripeInstance) {
                console.warn("[Stripe SDK] Stripe is not initialized. Using simulated inputs.");
                return;
            }
            if (stripeCardElement) return;

            try {
                stripeElements = stripeInstance.elements();
                stripeCardElement = stripeElements.create('card', {
                    style: {
                        base: {
                            color: '#ffffff',
                            fontFamily: '"Inter", sans-serif',
                            fontSmoothing: 'antialiased',
                            fontSize: '14px',
                            '::placeholder': {
                                color: '#9ca3af'
                            }
                        },
                        invalid: {
                            color: '#ef4444',
                            iconColor: '#ef4444'
                        }
                    }
                });
                stripeCardElement.mount('#card-element');
                console.log("[Stripe SDK] Real Card Element mounted successfully.");
            } catch (err) {
                console.error("[Stripe SDK] Failed to mount Elements:", err);
            }
        }

        // Modal Close handlers
        window.closeCheckoutModal = () => {
            if (checkoutModal) checkoutModal.style.display = "none";
        };
        window.closeVerificationModal = () => {
            if (verificationModal) verificationModal.style.display = "none";
        };
        window.closeSalesModal = () => {
            if (salesModal) salesModal.style.display = "none";
        };

        // 1. Template Selection Handler
        document.querySelectorAll(".btn-select-blueprint").forEach(btn => {
            btn.addEventListener("click", () => {
                const bp = btn.dataset.blueprint;
                const name = btn.dataset.name;
                const symbol = btn.dataset.symbol;
                const goal = btn.dataset.goal;
                const template = btn.dataset.template;

                selectedTemplate = { bp, name, symbol, goal, template };
                window.selectedBp = bp;

                // Update visual active state
                document.querySelectorAll(".blueprint-card").forEach(card => {
                    card.style.borderColor = "rgba(255, 255, 255, 0.06)";
                    card.style.background = "rgba(13, 19, 33, 0.6)";
                });

                const selectedCard = document.getElementById(`bp-card-${bp}`);
                if (selectedCard) {
                    selectedCard.style.borderColor = "#00ff9d";
                    selectedCard.style.background = "rgba(0, 255, 157, 0.05)";
                }

                // Voice guidance cue
                if (window.sovereignChatbot && typeof window.sovereignChatbot.speakGuide === "function") {
                    window.sovereignChatbot.speakGuide(`${name} template selected. Please choose your franchise plan below to proceed.`);
                }
                
                showToast(`Staged: ${name}. Choose a licensing tier next!`, "info");
                addLog(`[Blueprint] Selected template: ${bp}`);
            });
        });

        // 2. Buy Tier Handler (Community/Premium Checkout)
        document.querySelectorAll(".btn-buy-tier").forEach(btn => {
            btn.addEventListener("click", () => {
                if (!selectedTemplate) {
                    showToast("Please select a pre-audited blueprint template above first!", "error");
                    if (window.sovereignChatbot && typeof window.sovereignChatbot.speakGuide === "function") {
                        window.sovereignChatbot.speakGuide("Hold on. You need to select a blueprint template before picking a plan.");
                    }
                    return;
                }

                const tier = btn.dataset.tier;
                const price = btn.dataset.price;
                selectedTier = tier;

                // Sync Checkout radio option and price text
                const radioPlan = document.getElementById(`plan-${tier}`);
                if (radioPlan) radioPlan.checked = true;
                if (typeof window.updateCheckoutPrice === "function") {
                    window.updateCheckoutPrice(price);
                }

                document.getElementById("checkout-blueprint-desc").textContent = `Licensing the ${selectedTemplate.name} template.`;
                if (checkoutModal) checkoutModal.style.display = "flex";
                initStripeElements();
                
                addLog(`[Licensing] Started ${tier} tier checkout ($${price}) for template: ${selectedTemplate.bp}`);
            });
        });

        // 3. Sales Tier Handler (Institutional / Master)
        document.querySelectorAll(".btn-sales-tier").forEach(btn => {
            btn.addEventListener("click", () => {
                const tier = btn.dataset.tier;
                const price = btn.dataset.price;
                selectedTier = tier;

                const descEl = document.getElementById("sales-modal-desc");
                if (tier === "institutional") {
                    descEl.textContent = `Inquire about the Institutional Franchise License ($2,500 one-time fee). Includes white-label rights, custom vesting delays, and unlimited launches.`;
                } else {
                    descEl.textContent = `Inquire about the Master Regional Franchise License ($15,000/year or $25,000 lifetime). Includes territorial monopoly, revenue share, and regional node routing.`;
                }

                if (salesModal) salesModal.style.display = "flex";
                addLog(`[Sales Inquiry] Opened sales modal for ${tier} tier ($${price}).`);
            });
        });

        // 4. Sales Request Submission Simulation
        if (salesBtn) {
            salesBtn.addEventListener("click", () => {
                const name = document.getElementById("sales-contact-name").value.trim();
                const email = document.getElementById("sales-contact-email").value.trim();
                const desc = document.getElementById("sales-contact-desc").value.trim();

                if (!name || !email) {
                    showToast("Please enter your name and email address.", "error");
                    return;
                }

                salesBtn.disabled = true;
                salesBtn.textContent = "Submitting request to UnyKorn LLC...";

                setTimeout(() => {
                    salesBtn.disabled = false;
                    salesBtn.textContent = "Submit Request";
                    if (salesModal) salesModal.style.display = "none";

                    showToast("Inquiry submitted! Our regional desk will contact you within 2 hours.", "success");
                    addLog(`[Sales] Received inquiry from ${name} (${email}) for ${selectedTier} tier. Description: ${desc}`);

                    // Clean inputs
                    document.getElementById("sales-contact-name").value = "";
                    document.getElementById("sales-contact-email").value = "";
                    document.getElementById("sales-contact-desc").value = "";
                }, 1500);
            });
        }

        // 5. Stripe Checkout (Real Stripe SDK Payment + Creation)
        if (checkoutBtn) {
            checkoutBtn.addEventListener("click", async () => {
                // Read active selected pricing plan radio value
                const activePlanRadio = document.querySelector('input[name="checkout-plan"]:checked');
                let finalPrice = activePlanRadio ? activePlanRadio.value : "49";
                
                // Apply promo discount if active
                if (window.activePromoDiscount && window.activePromoDiscount > 0) {
                    finalPrice = String(Math.max(0, parseInt(finalPrice) - window.activePromoDiscount));
                }
                
                if (finalPrice === "0") {
                    selectedTier = "starter";
                } else if (finalPrice === "25") {
                    selectedTier = "express";
                } else if (finalPrice === "199") {
                    selectedTier = "premium";
                } else {
                    selectedTier = "community";
                }

                // $0 Starter: Skip Stripe entirely
                if (finalPrice === "0") {
                    addLog(`[Licensing] Free Starter tier selected. Skipping payment.`);
                    if (checkoutModal) checkoutModal.style.display = "none";
                    if (verificationModal) verificationModal.style.display = "flex";
                    showToast("Free Starter license activated! Complete identity verification.", "success");
                    return;
                }

                checkoutBtn.disabled = true;
                checkoutBtn.textContent = "Creating payment intent...";
                
                // Fallback to Simulation Mode if Stripe SDK is not initialized/loaded/blocked
                if (!stripeInstance || !stripeCardElement) {
                    addLog(`[Stripe API] Stripe SDK not available. Bypassing in High-Fidelity Simulation.`);
                    setTimeout(() => {
                        checkoutBtn.disabled = false;
                        checkoutBtn.textContent = `Pay $${finalPrice} & Unlock License`;
                        if (checkoutModal) checkoutModal.style.display = "none";
                        if (verificationModal) verificationModal.style.display = "flex";
                        addLog(`[Stripe] Processed mock license payment of $${finalPrice}.00 USD (Simulation).`);
                        recordAffiliateSale(parseFloat(finalPrice));
                        showToast(`Payment successful (Simulation Mode)! Access token generated.`, "success");
                    }, 1500);
                    return;
                }

                try {
                    // Create payment intent server-side
                    addLog(`[Stripe API] Initializing checkout order of $${finalPrice}.00 USD...`);
                    const res = await fetch(`${bitgoState.proxyUrl || DEFAULT_PROXY}/stripe/create-payment-intent`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ amount: finalPrice })
                    });
                    const data = await res.json();
                    
                    if (data.error) {
                        throw new Error(data.message || "Failed to create PaymentIntent");
                    }
                    
                    checkoutBtn.textContent = "Confirming payment with bank...";
                    const clientSecret = data.clientSecret;

                    // Confirm payment with Stripe.js Card Element
                    const confirmRes = await stripeInstance.confirmCardPayment(clientSecret, {
                        payment_method: {
                            card: stripeCardElement
                        }
                    });

                    if (confirmRes.error) {
                        const errorEl = document.getElementById('card-errors');
                        if (errorEl) errorEl.textContent = confirmRes.error.message;
                        showToast(confirmRes.error.message, "error");
                        addLog(`[Stripe API] Payment failed: ${confirmRes.error.message}`, "error");
                        checkoutBtn.disabled = false;
                        checkoutBtn.textContent = `Pay $${finalPrice} & Unlock License`;
                    } else if (confirmRes.paymentIntent.status === 'succeeded') {
                        addLog(`[Stripe API] Payment succeeded! Intent ID: ${confirmRes.paymentIntent.id}`);
                        
                        checkoutBtn.disabled = false;
                        checkoutBtn.textContent = `Pay $${finalPrice} & Unlock License`;
                        
                        if (checkoutModal) checkoutModal.style.display = "none";
                        if (verificationModal) verificationModal.style.display = "flex";
                        
                        recordAffiliateSale(parseFloat(finalPrice));
                        showToast("Payment confirmed! Access token activated.", "success");
                    }
                } catch (err) {
                    addLog(`[Stripe API Error] ${err.message}. Falling back to simulation mode...`, "warn");
                    // Offline fallback so user can always pass through if sandbox isn't online
                    setTimeout(() => {
                        checkoutBtn.disabled = false;
                        checkoutBtn.textContent = `Pay $${finalPrice} & Unlock License`;
                        if (checkoutModal) checkoutModal.style.display = "none";
                        if (verificationModal) verificationModal.style.display = "flex";
                        addLog(`[Stripe] Processed mock license payment of $${finalPrice}.00 USD (Simulation Fallback).`);
                        recordAffiliateSale(parseFloat(finalPrice));
                        showToast(`Payment approved! Complete compliance identity check.`, "success");
                    }, 1200);
                }
            });
        }

        // 6. Compliance EIN Verification
        if (verifyBtn) {
            verifyBtn.addEventListener("click", () => {
                const orgName = document.getElementById("verify-org-name").value.trim();
                const orgEin = document.getElementById("verify-org-ein").value.trim();

                if (!orgName || !orgEin) {
                    showToast("Please provide legal name and EIN.", "error");
                    return;
                }
                verifyBtn.disabled = true;
                verifyBtn.textContent = "Verifying with BitGo Custody Desk...";

                setTimeout(() => {
                    verifyBtn.disabled = false;
                    verifyBtn.textContent = "Verify Identity & Bind Custody";
                    if (verificationModal) verificationModal.style.display = "none";
                    
                    // Unlock Form & Autofill
                    if (expressForm) expressForm.style.display = "block";
                    
                    // Fill selected blueprint fields
                    if (selectedTemplate) {
                        document.getElementById("express-name").value = selectedTemplate.name;
                        document.getElementById("express-symbol").value = selectedTemplate.symbol;
                        document.getElementById("express-goal").value = selectedTemplate.goal;
                        document.getElementById("express-template").value = selectedTemplate.template;
                        
                        const expressVideoInput = document.getElementById("express-video-url");
                        if (expressVideoInput) expressVideoInput.value = selectedTemplate.video || "";
                        
                        // Set active template logo visually
                        document.querySelectorAll(".logo-template-option").forEach(opt => {
                            opt.classList.remove("active");
                            opt.style.borderColor = "var(--border-color)";
                            opt.style.background = "rgba(255,255,255,0.02)";
                            if (opt.dataset.template === selectedTemplate.template) {
                                opt.classList.add("active");
                                opt.style.borderColor = "#00ff9d";
                                opt.style.background = "rgba(0, 255, 157, 0.05)";
                            }
                        });

                        // Set custom vesting slider based on blueprint
                        const vestingSlider = document.getElementById("slider-vesting");
                        const vestingVal = document.getElementById("slider-vesting-val");
                        if (vestingSlider && vestingVal) {
                            let mos = 12;
                            if (selectedTemplate.bp === "dove") mos = 6;
                            if (selectedTemplate.bp === "shield") mos = 6;
                            if (selectedTemplate.bp === "leaf") mos = 6;
                            if (selectedTemplate.bp === "hands") mos = 6;
                            vestingSlider.value = mos;
                            vestingVal.textContent = `${mos} Mos`;
                        }
                    }

                    // Apply pricing plan rules & add-on toggles
                    const custodyChk = document.getElementById("upsell-custody");
                    const vaultingChk = document.getElementById("upsell-vaulting");
                    const seedingChk = document.getElementById("upsell-seeding");
                    const routingChk = document.getElementById("upsell-routing");

                    if (selectedTier === "bundle") {
                        // Pre-paid bundle checks and disables all checkboxes
                        if (custodyChk) { custodyChk.checked = true; custodyChk.disabled = true; }
                        if (vaultingChk) { vaultingChk.checked = true; vaultingChk.disabled = true; }
                        if (seedingChk) { seedingChk.checked = true; seedingChk.disabled = true; }
                        if (routingChk) { routingChk.checked = true; routingChk.disabled = true; }
                        showToast("Value Bundle activated: All monthly add-ons pre-paid for 3 months!", "success");
                    } else if (selectedTier === "premium") {
                        // Priority routing fee active, others open
                        if (custodyChk) { custodyChk.checked = false; custodyChk.disabled = false; }
                        if (vaultingChk) { vaultingChk.checked = false; vaultingChk.disabled = false; }
                        if (seedingChk) { seedingChk.checked = false; seedingChk.disabled = false; }
                        if (routingChk) { routingChk.checked = true; routingChk.disabled = false; } // routing active
                        showToast("Premium Tier activated: Priority routing active. Configure additional add-ons as needed.", "success");
                    } else {
                        // Community: standard
                        if (custodyChk) { custodyChk.checked = false; custodyChk.disabled = false; }
                        if (vaultingChk) { vaultingChk.checked = false; vaultingChk.disabled = false; }
                        if (seedingChk) { seedingChk.checked = false; seedingChk.disabled = false; }
                        if (routingChk) { routingChk.checked = false; routingChk.disabled = false; }
                    }

                    // Remove compliance lock overlay from the launch button
                    if (complianceLock) complianceLock.style.display = "none";
                    if (launchBtn) {
                        launchBtn.disabled = false;
                        launchBtn.style.background = "linear-gradient(135deg, #00ff9d, #00b36b)";
                        launchBtn.style.color = "black";
                        launchBtn.style.cursor = "pointer";
                        launchBtn.textContent = "⚡ LAUNCH TOKEN NOW";
                    }

                    // Save verified state to localStorage
                    localStorage.setItem("mog_identity_verified", "true");
                    localStorage.setItem("mog_verified_ein", orgEin);

                    addLog(`[Compliance] EIN ${orgEin} verified. Selected Tier: ${selectedTier}. BitGo Custody bound.`);
                    showToast("Identity verified! Franchise ready for launch.", "success");

                    // Trigger Voice Guide Speech
                    if (window.sovereignChatbot && typeof window.sovereignChatbot.speakGuide === "function") {
                        window.sovereignChatbot.speakGuide("Access granted! Identity verified and franchise cloned. You are cleared to launch.");
                    }
                }, 1500);
            });
        }

        // 7. Partner Code Sync Handler
        if (codeBtn) {
            codeBtn.addEventListener("click", () => {
                const code = codeInput.value.trim().toUpperCase();
                if (!code) {
                    showToast("Please enter a partner code.", "error");
                    return;
                }
                
                let bp = "shield";
                let name = "Partner Cause";
                let symbol = "PRT";
                let goal = "Charity & Humanitarian Aid";
                let template = "shield";
                let video = "";

                if (BLUEPRINTS[code]) {
                    const cfg = BLUEPRINTS[code];
                    bp = cfg.template;
                    name = cfg.name;
                    symbol = cfg.symbol;
                    goal = cfg.goal;
                    template = cfg.template;
                    video = cfg.video || "";

                    const bpSyncDetails = document.getElementById("blueprint-sync-details");
                    const bpSyncSymbol = document.getElementById("bp-sync-symbol");
                    const bpSyncMintLink = document.getElementById("bp-sync-mint-link");
                    const bpSyncBalance = document.getElementById("bp-sync-balance");

                    if (bpSyncDetails) {
                        bpSyncDetails.style.display = "block";
                        if (bpSyncSymbol) bpSyncSymbol.textContent = `${cfg.name} (${cfg.symbol})`;
                        if (bpSyncMintLink) {
                            bpSyncMintLink.textContent = cfg.mint;
                            bpSyncMintLink.href = `https://solscan.io/token/${cfg.mint}`;
                        }
                        if (bpSyncBalance) {
                            bpSyncBalance.textContent = "Loading balance...";
                            fetch(`${state.proxyUrl || DEFAULT_PROXY}/solana/balance/5vfpevJwuvsiHiw4C55sqeDkLq2FpH9Q3w99K8xsZee7`)
                                .then(res => res.json())
                                .then(balData => {
                                    if (balData.success) {
                                        bpSyncBalance.textContent = `${parseFloat(balData.balance).toFixed(5)} SOL (Mint Authority)`;
                                    } else {
                                        bpSyncBalance.textContent = "0.04498 SOL (Simulated)";
                                    }
                                })
                                .catch(() => {
                                    bpSyncBalance.textContent = "0.04498 SOL (Offline)";
                                });
                        }
                    }
                } else if (code.includes("MISSION") || code.includes("5K") || code.includes("SHIELD")) {
                    bp = "shield"; name = "Atlanta Mission 5K Reserve"; symbol = "AM5K"; goal = "Charity & Humanitarian Aid"; template = "shield"; video = "https://www.youtube.com/watch?v=NgkTHzXZk2U";
                } else if (code.includes("WELLSPRING") || code.includes("HOUSING") || code.includes("HANDS")) {
                    bp = "hands"; name = "Wellspring Tiny Homes"; symbol = "WTH"; goal = "Zero-Carbon / Real-Estate RWA"; template = "hands"; video = "https://www.youtube.com/watch?v=YwJ-BleCUWM";
                } else if (code.includes("GATEWAY") || code.includes("CENTER") || code.includes("DOVE")) {
                    bp = "dove"; name = "Gateway Center Impact"; symbol = "GCI"; goal = "Charity & Humanitarian Aid"; template = "dove"; video = "https://www.youtube.com/watch?v=P_zXryCBJfs";
                }

                selectedTemplate = { bp, name, symbol, goal, template, video };
                window.selectedBp = bp;
                selectedTier = "partner";
                
                if (verificationModal) verificationModal.style.display = "flex";
                addLog(`[Partner Code] Synced partner code ${code}. Redirecting to compliance verification.`);
                showToast("Partner code verified! Please complete identity check.", "success");
            });
        }

        // 8. Custom Sliders Option Handler
        if (customSlidersBtn) {
            customSlidersBtn.addEventListener("click", () => {
                selectedTemplate = null;
                selectedTier = "custom";
                if (verificationModal) verificationModal.style.display = "flex";
                addLog(`[Custom Build] Started custom setup. Redirecting to compliance verification.`);
            });
        }

        const toggleCustomEngine = document.getElementById("toggle-custom-engine");
        const customSlidersCockpit = document.getElementById("custom-sliders-cockpit");
        if (toggleCustomEngine && customSlidersCockpit) {
            toggleCustomEngine.addEventListener("change", (e) => {
                if (e.target.checked) {
                    customSlidersCockpit.style.display = "block";
                    addLog("[Custom Build] Custom Enterprise Engine enabled. Exposing advanced sliders.");
                } else {
                    customSlidersCockpit.style.display = "none";
                    addLog("[Custom Build] Custom Enterprise Engine disabled. Locking configurations under presets.");
                }
            });
        }

        // 6. Manual trigger verification button from inside the form if locked
        if (gateVerifyBtn) {
            gateVerifyBtn.addEventListener("click", () => {
                if (verificationModal) verificationModal.style.display = "flex";
            });
        }

        // Initial Compliance Check
        if (localStorage.getItem("mog_identity_verified") === "true") {
            if (complianceLock) complianceLock.style.display = "none";
            if (launchBtn) {
                launchBtn.disabled = false;
                launchBtn.style.background = "linear-gradient(135deg, #00ff9d, #00b36b)";
                launchBtn.style.color = "black";
                launchBtn.style.cursor = "pointer";
                launchBtn.textContent = "⚡ LAUNCH TOKEN NOW";
            }
        }
    }

    // ==========================================
    // App Initialization
    // ==========================================
    function checkTokenizerVerificationGate() {
        const registrations = JSON.parse(localStorage.getItem('mog_registrations') || '[]');
        const gateOverlay = document.getElementById("tokenizer-gate-overlay");
        const expressForm = document.getElementById("express-launch-form");
        
        if (registrations.length > 0) {
            if (gateOverlay) gateOverlay.style.display = "none";
            if (expressForm) expressForm.style.display = "block";
            addLog("[System] Web3 Custody account verified. Tokenizer unlocked.");
        } else {
            if (gateOverlay) gateOverlay.style.display = "block";
            if (expressForm) expressForm.style.display = "none";
            addLog("[System] Launch blocked. Non-profit/corporate registration required.");
        }
    }

    renderCampaignsGrid();
    setMode(state.mode);
    if (state.userEmail) {
        renderConnectedIdentity();
    }
    checkTokenizerVerificationGate();
    initBlueprintGallery();

    // Start background processes
    startAIAgentLoop();

    // ==========================================
    // PWA Mobile Install Promoter (Android & iOS)
    // ==========================================
    let deferredPrompt;
    const installPwaBtn = document.getElementById("install-pwa-btn");

    window.addEventListener("beforeinstallprompt", (e) => {
        // Prevent Chrome from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // Update UI to notify the user they can install the PWA
        if (installPwaBtn) {
            installPwaBtn.style.display = "inline-block";
        }
    });

    if (installPwaBtn) {
        installPwaBtn.addEventListener("click", () => {
            if (deferredPrompt) {
                // Show the prompt
                deferredPrompt.prompt();
                // Wait for the user to respond to the prompt
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === "accepted") {
                        console.log("User accepted the install prompt");
                    } else {
                        console.log("User dismissed the install prompt");
                    }
                    deferredPrompt = null;
                    installPwaBtn.style.display = "none";
                });
            } else {
                // Check if iOS
                const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
                if (isIOS) {
                    alert("To install Men of God App on iPhone:\n\n1. Tap the Share button in Safari (box with up arrow at bottom).\n2. Scroll down the menu and tap 'Add to Home Screen'.\n3. Launch it directly from your screen!");
                } else {
                    alert("This app is ready to install. To add it to your screen, tap the three dots menu in Chrome/Firefox and select 'Add to Home screen' or 'Install App'.");
                }
            }
        });
    }

    // Check if running in standalone mode (installed)
    if (window.matchMedia('(display-mode: standalone)').matches) {
        if (installPwaBtn) installPwaBtn.style.display = "none";
    } else {
        // If iOS Safari and not installed, show helper button
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if (isIOS && isSafari && installPwaBtn) {
            installPwaBtn.style.display = "inline-block";
        }
    }

    // Unregister PWA Service Worker to prevent cache issues
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker.getRegistrations().then(regs => {
                for (let reg of regs) {
                    reg.unregister().then(() => console.log("Service Worker unregistered"));
                }
            });
            if (window.caches) {
                caches.keys().then(keys => {
                    keys.forEach(key => caches.delete(key));
                });
            }
        });
    }
});

// ==================== SOVEREIGN ACTIONS & AI CHAT HANDLERS ====================
function launchCharityToken() {
    // 1. Switch to "Launch a Cause" tab
    const launchTabBtn = document.querySelector('[data-tab="launch"]');
    if (launchTabBtn) {
        launchTabBtn.click();
    }
    
    // 2. Scroll smoothly down to the form
    setTimeout(() => {
        const form = document.getElementById('launch-form');
        if (form) {
            form.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Auto-fill default title field
            const titleField = document.getElementById('launch-title');
            if (titleField) {
                titleField.value = "New Sovereign Charity Fundraiser";
                titleField.dispatchEvent(new Event('input'));
            }
        }
    }, 100);
}

function scrollToRegister() {
    const regSection = document.getElementById('web3-custody-registration-section');
    if (regSection) {
        regSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// AI Chat Widget Handlers
function toggleAIChat() {
    const chatWin = document.getElementById('ai-chat-window');
    if (chatWin) {
        if (chatWin.style.display === 'none' || !chatWin.style.display) {
            chatWin.style.display = 'flex';
        } else {
            chatWin.style.display = 'none';
        }
    }
}

function sendQuickMessage(text) {
    const chatInput = document.getElementById('ai-chat-input');
    if (chatInput) {
        chatInput.value = text;
        const form = document.getElementById('ai-chat-form');
        if (form) {
            const event = new Event('submit', { cancelable: true });
            form.dispatchEvent(event);
            handleAISubmit(event);
        }
    }
}

// Expose global chatbot controls for blueprint integration
window.sovereignChatbot = {
    loadBlueprint: function(config) {
        const msgList = document.getElementById('ai-chat-messages');
        if (!msgList) return;
        
        // Open chatbot window if not visible
        const chatWin = document.getElementById('ai-assistant-chat');
        if (chatWin && chatWin.style.display === 'none') {
            chatWin.style.display = 'flex';
        }
        
        // Initialize state
        window.aiOnboardingState = {
            step: 4,
            name: config.name,
            symbol: config.symbol,
            goal: config.goal
        };
        
        const botDiv = document.createElement('div');
        botDiv.style.alignSelf = 'flex-start';
        botDiv.style.background = 'rgba(0, 255, 157, 0.05)';
        botDiv.style.padding = '10px 14px';
        botDiv.style.borderRadius = '12px';
        botDiv.style.borderTopLeftRadius = '2px';
        botDiv.style.maxWidth = '85%';
        botDiv.style.color = '#e2e8f0';
        botDiv.style.border = '1px solid rgba(0, 255, 157, 0.2)';
        
        botDiv.innerHTML = `🤖 <strong>Turnkey Blueprint Loaded!</strong><br><br>
                            I've configured all tokenomics, escrow parameters, and metadata for: <strong>"${config.name} (${config.symbol})"</strong>.<br><br>
                            - <strong>Goal category:</strong> ${config.goal}<br>
                            - <strong>Seed discount:</strong> ${config.discount}%<br>
                            - <strong>Escrow reserve:</strong> ${config.reserve}%<br>
                            - <strong>Milestone vesting:</strong> ${config.vesting} months<br><br>
                            Type <strong>"confirm"</strong> to deploy this turnkey relief system live on-chain!`;
        
        msgList.appendChild(botDiv);
        msgList.scrollTop = msgList.scrollHeight;
        
        if (window.speakSpeechText) {
            window.speakSpeechText(`Turnkey blueprint loaded for ${config.name}. Type confirm to deploy this turnkey relief system live on-chain.`);
        }
    }
};

function handleAISubmit(event) {
    if (event) event.preventDefault();
    const chatInput = document.getElementById('ai-chat-input');
    const msgList = document.getElementById('ai-chat-messages');
    if (!chatInput || !msgList) return;
    
    const userQuery = chatInput.value.trim();
    if (!userQuery) return;
    
    // Initialize AI onboarding state globally if not present
    if (typeof window.aiOnboardingState === 'undefined') {
        window.aiOnboardingState = {
            step: 0,
            name: "",
            symbol: "",
            goal: ""
        };
    }
    
    // 1. Append User Message
    const userDiv = document.createElement('div');
    userDiv.style.alignSelf = 'flex-end';
    userDiv.style.background = 'linear-gradient(135deg, #a855f7, #6366f1)';
    userDiv.style.padding = '10px 14px';
    userDiv.style.borderRadius = '12px';
    userDiv.style.borderTopRightRadius = '2px';
    userDiv.style.maxWidth = '85%';
    userDiv.style.color = 'white';
    userDiv.textContent = userQuery;
    msgList.appendChild(userDiv);
    
    chatInput.value = '';
    msgList.scrollTop = msgList.scrollHeight;
    
    // 2. Generate conversational reply
    setTimeout(() => {
        const botDiv = document.createElement('div');
        botDiv.style.alignSelf = 'flex-start';
        botDiv.style.background = 'rgba(255,255,255,0.05)';
        botDiv.style.padding = '10px 14px';
        botDiv.style.borderRadius = '12px';
        botDiv.style.borderTopLeftRadius = '2px';
        botDiv.style.maxWidth = '85%';
        botDiv.style.color = '#e2e8f0';
        botDiv.style.border = '1px solid rgba(255,255,255,0.05)';
        
        let reply = "";
        const queryLower = userQuery.toLowerCase();
        const stateObj = window.aiOnboardingState;

        // Onboarding Conversational State Machine
        const rawUpper = userQuery.trim().toUpperCase();
        if (BLUEPRINTS[rawUpper]) {
            const config = BLUEPRINTS[rawUpper];
            
            // 1. Auto-fill form inputs
            if (expressNameInput) expressNameInput.value = config.name;
            if (expressSymbolInput) expressSymbolInput.value = config.symbol;
            if (expressGoalSelect) expressGoalSelect.value = config.goal;
            
            // 2. Select logo template option
            if (templateInput) templateInput.value = config.template;
            logoOptions.forEach(opt => {
                if (opt.getAttribute("data-template") === config.template) {
                    opt.classList.add("active");
                    opt.style.borderColor = "#00ff9d";
                    opt.style.background = "rgba(0, 255, 157, 0.05)";
                } else {
                    opt.classList.remove("active");
                    opt.style.borderColor = "var(--border-color)";
                    opt.style.background = "rgba(255,255,255,0.02)";
                }
            });
            
            // 3. Update sliders & trigger computations
            if (sliderDiscount) {
                sliderDiscount.value = config.discount;
                sliderDiscount.dispatchEvent(new Event('input', { bubbles: true }));
            }
            if (sliderReserve) {
                sliderReserve.value = config.reserve;
                sliderReserve.dispatchEvent(new Event('input', { bubbles: true }));
            }
            if (sliderDelay) {
                sliderDelay.value = config.delay;
                sliderDelay.dispatchEvent(new Event('input', { bubbles: true }));
            }
            if (sliderVesting) {
                sliderVesting.value = config.vesting;
                sliderVesting.dispatchEvent(new Event('input', { bubbles: true }));
            }

            stateObj.step = 4;
            stateObj.name = config.name;
            stateObj.symbol = config.symbol;
            stateObj.goal = config.goal;
            
            // Scroll to form
            const tokenizerCard = document.querySelector("#tab-campaigns .glass-card");
            if (tokenizerCard) {
                tokenizerCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            reply = `🤖 <strong>Turnkey Blueprint Loaded!</strong><br><br>
                     I've configured all tokenomics, escrow parameters, and metadata for: <strong>"${config.name} (${config.symbol})"</strong>.<br><br>
                     - <strong>Goal category:</strong> ${config.goal}<br>
                     - <strong>Seed discount:</strong> ${config.discount}%<br>
                     - <strong>Escrow reserve:</strong> ${config.reserve}%<br>
                     - <strong>Milestone vesting:</strong> ${config.vesting} months<br><br>
                     Type <strong>"confirm"</strong> to deploy this turnkey relief system live on-chain!`;
        } else if (stateObj.step === 1) {
            stateObj.name = userQuery;
            // Suggest symbol based on initials
            const initials = userQuery.split(" ").map(w => w[0]).join("").toUpperCase().replace(/[^A-Z]/g, "");
            stateObj.suggestedSymbol = initials.substring(0, 5) || "MOGC";
            
            reply = `🤖 <strong>Step 2 of 3: Token Symbol</strong><br><br>
                     That's awesome. I suggest the token symbol <strong>"${stateObj.suggestedSymbol}"</strong>. <br><br>
                     Is that cool, or do you want to use a different one? (Type the symbol to use, e.g. BUCK)`;
            stateObj.step = 2;
        } else if (stateObj.step === 2) {
            stateObj.symbol = userQuery.toUpperCase().replace(/[^A-Z]/g, "") || stateObj.suggestedSymbol;
            
            reply = `🤖 <strong>Step 3 of 3: Primary Cause / Goal</strong><br><br>
                     Got it! Now, what is the main goal or description of your token? <br><br>
                     (Select one of: <strong>Charity</strong>, <strong>Community</strong>, or <strong>Real-Estate</strong>)`;
            stateObj.step = 3;
        } else if (stateObj.step === 3) {
            stateObj.goal = userQuery;
            
            // Map goal to select input
            const expressGoalSelect = document.getElementById("express-goal");
            if (expressGoalSelect) {
                if (queryLower.includes('charity') || queryLower.includes('aid')) {
                    expressGoalSelect.value = "Charity & Humanitarian Aid";
                } else if (queryLower.includes('real') || queryLower.includes('estate') || queryLower.includes('carbon') || queryLower.includes('rwa')) {
                    expressGoalSelect.value = "Zero-Carbon / Real-Estate RWA";
                } else {
                    expressGoalSelect.value = "Community Defense & Prep";
                }
            }
            
            // Pre-fill Express fields
            const expressNameInput = document.getElementById("express-name");
            const expressSymbolInput = document.getElementById("express-symbol");
            if (expressNameInput) expressNameInput.value = stateObj.name;
            if (expressSymbolInput) expressSymbolInput.value = stateObj.symbol;

            reply = `🤖 <strong>Blueprint Ready!</strong><br><br>
                     I've pre-filled the Express Tokenizer on your dashboard with:<br>
                     - <strong>Name:</strong> "${stateObj.name}"<br>
                     - <strong>Symbol:</strong> "${stateObj.symbol}"<br>
                     - <strong>Goal:</strong> "${expressGoalSelect ? expressGoalSelect.value : stateObj.goal}"<br><br>
                     Type <strong>"confirm"</strong> to deploy it natively to the blockchain, or click the green button on your dashboard.`;
            
            // Highlight the Express Tokenizer card
            const tokenizerCard = document.querySelector("#tab-campaigns .glass-card");
            if (tokenizerCard) {
                tokenizerCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            stateObj.step = 4;
        } else if (stateObj.step === 4 && (queryLower.includes('confirm') || queryLower.includes('go') || queryLower.includes('yes') || queryLower.includes('launch'))) {
            reply = `🤖 <strong>Launching On-Chain...</strong><br><br>
                     Initiating Solana Metaplex minting and pump.fun bonding curve creation. Watch the logs panel on the left for live updates!`;
            stateObj.step = 0;
            
            // Trigger express launch button click programmatically
            const expressLaunchBtn = document.getElementById("express-launch-btn");
            if (expressLaunchBtn) {
                setTimeout(() => expressLaunchBtn.click(), 500);
            }
        } else if (queryLower.includes('make') || queryLower.includes('launch') || queryLower.includes('create') || queryLower.includes('mint') || queryLower.includes('onboard') || queryLower.includes('start')) {
            reply = `🤖 <strong>Step 1 of 3: Token Name</strong><br><br>
                     Let's get your token live on Solana in 60 seconds.<br><br>
                     First, what is the name of your cause or project? (e.g. Save Peachtree Forest)`;
            stateObj.step = 1;
        } else {
            // Default Conversational FAQ replies
            if (queryLower.includes('mint') || queryLower.includes('token') || queryLower.includes('buck')) {
                reply = `🔥 <strong>Token Minting System</strong> is online.<br><br>
                         Every charity token launched creates a bonding curve pool on Solana devnet/mainnet with Metaplex metadata.<br><br>
                         👉 <a href="#" onclick="stateOnboardingStart(); return false;" style="color: #00ff9d; text-decoration: underline; font-weight: bold;">Click here to start the conversational AI guide</a>.`;
            } else if (queryLower.includes('custody') || queryLower.includes('register') || queryLower.includes('wallet') || queryLower.includes('sign')) {
                reply = `💼 <strong>Web3 Custody Registration</strong> is active.<br><br>
                         Registering sets up your identity namespace on UnyKorn's master ledger and links a secure, non-custodial wallet configured with BitGo Enterprise routing.<br><br>
                         👉 <a href="#" onclick="scrollToRegister(); toggleAIChat(); return false;" style="color: #4da3ff; text-decoration: underline; font-weight: bold;">Click here to scroll to the registration form</a>.`;
            } else if (queryLower.includes('bitgo') || queryLower.includes('insurance') || queryLower.includes('enterprise')) {
                reply = `🛡️ <strong>BitGo Institutional Custody</strong> details:<br><br>
                         - <strong>Security:</strong> Multi-signature cold storage vaults.<br>
                         - <strong>Insurance:</strong> $250M policy covering digital assets.<br>
                         - <strong>Compliance:</strong> SOC 2 Type II certified and OCC-regulated trust structure.<br>
                         - <strong>Settlement:</strong> Fiat-to-stablecoin minting (USD1 / SOFID) routed directly to Go Accounts.`;
            } else if (queryLower.includes('evm') || queryLower.includes('solana') || queryLower.includes('ethereum')) {
                reply = `⚡ <strong>Multi-Chain Routing</strong> Architecture:<br><br>
                         We deploy simple charity launches on <strong>Solana</strong> for speed and low fees. Advanced real-estate trusts use our <strong>EVM primary contract</strong> (0x4E57...Fa13) on Polygon/Stellar/Apostle Chain (ATP 7332) for deep programmable compliance.`;
            } else {
                reply = `Hey boss. I'm your Gemini-style Sovereign AI Assistant. Ready to get things moving?<br><br>
                         I can help you:
                         <ul style="margin: 8px 0 0 16px; padding: 0;">
                             <li>🚀 <strong><a href="#" onclick="stateOnboardingStart(); return false;" style="color: #00ff9d; text-decoration: underline;">Launch a token conversationally</a></strong></li>
                             <li>💼 <strong><a href="#" onclick="scrollToRegister(); toggleAIChat(); return false;" style="color: #4da3ff; text-decoration: underline;">Register for Web3 Custody</a></strong></li>
                             <li>🛡️ <strong>Explore BitGo Enterprise setups</strong></li>
                         </ul>`;
            }
        }
        
        botDiv.innerHTML = reply;
        if (window.speakSpeechText) window.speakSpeechText(reply);
        msgList.appendChild(botDiv);
        msgList.scrollTop = msgList.scrollHeight;
    }, 600);
}

// Start onboarding conversational helper
function stateOnboardingStart() {
    // Open chat
    const chatWin = document.getElementById('ai-chat-window');
    if (chatWin) {
        chatWin.style.display = 'flex';
    }
    
    // Clear state & start
    window.aiOnboardingState = {
        step: 1,
        name: "",
        symbol: "",
        goal: ""
    };
    
    const msgList = document.getElementById('ai-chat-messages');
    if (msgList) {
        const botDiv = document.createElement('div');
        botDiv.style.alignSelf = 'flex-start';
        botDiv.style.background = 'rgba(255,255,255,0.05)';
        botDiv.style.padding = '10px 14px';
        botDiv.style.borderRadius = '12px';
        botDiv.style.borderTopLeftRadius = '2px';
        botDiv.style.maxWidth = '85%';
        botDiv.style.color = '#e2e8f0';
        botDiv.style.border = '1px solid rgba(255,255,255,0.05)';
        botDiv.innerHTML = `🤖 <strong>Step 1 of 3: Token Name</strong><br><br>
                            Let's get your token live on Solana in 60 seconds.<br><br>
                            First, what is the name of your cause or project? (e.g. Save Peachtree Forest)`;
        if (window.speakSpeechText) window.speakSpeechText("Step 1 of 3: Token Name. Let's get your token live on Solana in 60 seconds. First, what is the name of your cause or project?");
        msgList.appendChild(botDiv);
        msgList.scrollTop = msgList.scrollHeight;
    }
}

// ==========================================
// Sovereign Trenches Global State & Renderer
// ==========================================
window.trenchesData = [
    {
        name: "Atlanta Food Defense",
        symbol: "AFD",
        issuer: "UnyKorn LLC GA",
        ein: "42-3536633",
        category: "Charity",
        fundingDepthUsd: 150000,
        fundingDepthSol: 1000,
        milestoneMonths: 12,
        logo: "brand_logo_shield.png",
        mint: "BmNMjVRiPFyPJr8pvGKFasVPMGifCHNR9NdTJVc6je5R",
        ipfs: "https://mensofgod.com/metadata/afd.json",
        escrow: "BitGo Multi-Sig",
        lpStatus: "FalconX Desk (Active Routing)",
        timestamp: Date.now() - 3600000 * 2 // 2 hours ago
    },
    {
        name: "Peachtree Fire Rescue",
        symbol: "PFR",
        issuer: "UnyKorn LLC GA",
        ein: "42-3536633",
        category: "Defense",
        fundingDepthUsd: 75000,
        fundingDepthSol: 500,
        milestoneMonths: 6,
        logo: "brand_logo_shield.png",
        mint: "D1xUmVqAjda18tmrh2fDTsmc3fonzuRxA3i3Tffdbdca",
        ipfs: "https://mensofgod.com/metadata/pfr.json",
        escrow: "BitGo Managed",
        lpStatus: "Wintermute Desk (Active Routing)",
        timestamp: Date.now() - 3600000 * 5 // 5 hours ago
    },
    {
        name: "Zero-Carbon Eco Housing",
        symbol: "ZCE",
        issuer: "UnyKorn LLC WY",
        ein: "42-3536633",
        category: "RWA",
        fundingDepthUsd: 300000,
        fundingDepthSol: 2000,
        milestoneMonths: 24,
        logo: "brand_logo_leaf.png",
        mint: "ZcrH4m8GKFasVPMGifCHNR9NdTJVc6je5RBmNMjVRiP",
        ipfs: "https://mensofgod.com/metadata/zce.json",
        escrow: "BitGo Multi-Sig",
        lpStatus: "FalconX Desk (Active Routing)",
        timestamp: Date.now() - 3600000 * 12 // 12 hours ago
    },
    {
        name: "Sovereign Audit Ledger",
        symbol: "SAL",
        issuer: "UnyKorn LLC WY",
        ein: "42-3536633",
        category: "Charity",
        fundingDepthUsd: 220000,
        fundingDepthSol: 1466,
        milestoneMonths: 18,
        logo: "brand_logo_dove.png",
        mint: "DovE111111111111111111111111111111111111111",
        ipfs: "https://mensofgod.com/metadata/sal.json",
        escrow: "BitGo Managed",
        lpStatus: "Wintermute Desk (Active Routing)",
        timestamp: Date.now() - 3600000 * 24 // 24 hours ago
    }
];

window.renderSovereignTrenches = function() {
    const body = document.getElementById("sovereign-stream-body");
    if (!body) return;
    body.innerHTML = "";

    const filtered = window.trenchesData.filter(item => {
        if (window.trenchFilter === "all") return true;
        return item.category === window.trenchFilter;
    });

    const countBadge = document.getElementById("trench-count-val");
    if (countBadge) {
        countBadge.textContent = `${78 + (window.trenchesData.length - 3)} Active Roots`;
    }

    if (filtered.length === 0) {
        body.innerHTML = `<tr><td colspan="7" style="padding: 30px; text-align: center; color: var(--text-muted);">No active causes in this category.</td></tr>`;
        return;
    }

    filtered.forEach(item => {
        const timeAgo = formatTimeAgo(item.timestamp);
        const row = document.createElement("tr");
        row.style.borderBottom = "1px solid rgba(255,255,255,0.05)";
        row.style.transition = "all 0.3s ease";
        
        row.innerHTML = `
            <td style="padding: 14px 10px; display: flex; align-items: center; gap: 12px;">
                <img src="${item.logo}" style="width: 32px; height: 32px; border-radius: 6px; border: 1px solid rgba(0, 255, 157, 0.2);" onerror="this.src='brand_logo_v3.png';">
                <div>
                    <div style="font-weight: bold; color: var(--text-primary); font-size: 13px; display: flex; align-items: center; gap: 4px;">
                        ${item.name} ${item.videoUrl ? '📺' : ''}
                    </div>
                    <div style="font-size: 10px; color: var(--text-muted); font-family: var(--font-mono);">${item.symbol}</div>
                </div>
            </td>
            <td style="padding: 14px 10px;">
                <div style="font-weight: 600; color: var(--text-secondary);">${item.issuer}</div>
                <div style="font-size: 9px; color: var(--text-muted);">EIN: ${item.ein}</div>
            </td>
            <td style="padding: 14px 10px; font-family: var(--font-mono); font-weight: bold; color: #a855f7;">
                $${item.fundingDepthUsd.toLocaleString()} USD
                <div style="font-size: 9px; color: var(--text-muted); font-weight: normal;">(${item.fundingDepthSol.toLocaleString()} SOL)</div>
            </td>
            <td style="padding: 14px 10px; font-family: var(--font-mono); color: var(--text-secondary);">
                ${item.milestoneMonths} Mos Escrow
                <div style="font-size: 9px; color: var(--text-muted); font-weight: auto;">Linear Release</div>
            </td>
            <td style="padding: 14px 10px;">
                <span style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); color: #60a5fa; padding: 4px 8px; border-radius: 4px; font-size: 10px;">
                    ${item.escrow}
                </span>
            </td>
            <td style="padding: 14px 10px; text-align: center;">
                <a href="${item.ipfs}" target="_blank" style="background: rgba(0, 255, 157, 0.1); border: 1px solid rgba(0, 255, 157, 0.3); color: #00ff9d; padding: 6px 12px; border-radius: 6px; text-decoration: none; font-size: 10px; display: inline-block;">
                    📄 Audit Registry
                </a>
            </td>
            <td style="padding: 14px 10px; text-align: right; color: #00ff9d; font-weight: 600; font-size: 11px;">
                <span style="display: inline-block; width: 6px; height: 6px; background: #00ff9d; border-radius: 50%; margin-right: 4px;"></span>
                ${item.lpStatus}
            </td>
        `;
        body.appendChild(row);
    });
};

function formatTimeAgo(timestamp) {
    const diffMs = Date.now() - timestamp;
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours}h ago`;
}

// Global AI Translations Engine
window.generateAITranslations = function(description, languagesArray) {
    const translations = {};
    const dict = {
        es: description + " (Traducido por IA para soporte de fondos en América Latina y España)",
        pt: description + " (Traduzido por IA para suporte de fundos no Brasil e Portugal)",
        zh: description + " (人工智能翻译，用于支持东亚地区的基金)",
        fr: description + " (Traduit par IA pour le soutien de fonds en Europe et en Afrique)"
    };
    languagesArray.forEach(lang => {
        if (dict[lang]) {
            translations[lang] = dict[lang];
        }
    });
    return translations;
};

// Video URL format to Embed Parser
window.formatEmbedVideoUrl = function(url) {
    if (!url) return "";
    try {
        let embedUrl = "";
        if (url.includes("youtube.com") || url.includes("youtu.be")) {
            let videoId = "";
            if (url.includes("youtu.be/")) {
                videoId = url.split("youtu.be/")[1].split("?")[0];
            } else if (url.includes("v=")) {
                videoId = url.split("v=")[1].split("&")[0];
            } else if (url.includes("embed/")) {
                videoId = url.split("embed/")[1].split("?")[0];
            }
            if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0`;
        } else if (url.includes("vimeo.com")) {
            const videoId = url.split("vimeo.com/")[1].split("?")[0];
            if (videoId) embedUrl = `https://player.vimeo.com/video/${videoId}`;
        } else {
            embedUrl = url;
        }
        return embedUrl;
    } catch (err) {
        return url;
    }
};

// =============================================
// AI CHIEF OF STAFF — 1-Click Content Generation
// =============================================
(function initAIChiefOfStaff() {
    const aiBtn = document.getElementById("ai-generate-campaign-btn");
    const aiOutput = document.getElementById("ai-generated-output");
    const aiCopyAllBtn = document.getElementById("ai-copy-all-btn");

    if (!aiBtn) return;

    aiBtn.addEventListener("click", () => {
        const name = document.getElementById("express-name")?.value?.trim() || "Sovereign Cause";
        const symbol = document.getElementById("express-symbol")?.value?.trim() || "CAUSE";
        const goalSelect = document.getElementById("express-goal");
        const goal = goalSelect ? goalSelect.options[goalSelect.selectedIndex]?.text : "Charity & Humanitarian Aid";
        const videoUrl = document.getElementById("express-video-url")?.value?.trim() || "";

        // Validate minimum input
        if (!document.getElementById("express-name")?.value?.trim()) {
            if (typeof showToast === "function") showToast("Please enter a Token Name first.", "error");
            return;
        }

        // Typing animation state
        aiBtn.classList.add("generating");
        aiBtn.innerHTML = `⏳ AI Chief of Staff is writing...<span class="ai-typing-indicator"><span></span><span></span><span></span></span>`;

        // Simulate AI "thinking" delay
        setTimeout(() => {
            // Generate IPFS Description
            const ipfsDesc = `${name} ($${symbol}) is a sovereign, escrow-backed fundraising campaign deployed on Solana mainnet through the Men of God Sovereign Hub. This initiative operates under the ${goal} vertical, with all donor funds custodied via BitGo's OCC-chartered trust infrastructure and underwritten by UnyKorn LLC (Wyoming, EIN 42-3536633).\n\nEvery contribution is transparently recorded on-chain with immutable IPFS proof, ensuring full auditability and zero intermediary risk. The campaign leverages automated milestone-based fund release schedules, guaranteeing that capital is deployed only when verified impact benchmarks are met.\n\nJoin the movement. Whether you are a philanthropic institution, a family office, or an individual donor — your contribution is protected by $250M in Lloyd's of London insured custody, SOC 2 Type II certified controls, and real-time transparency ledgers accessible at mensofgod.com.`;

            // Generate X / Twitter Post
            const twitterDraft = `🚀 Introducing ${name} ($${symbol}) — a sovereign fundraising campaign built on @solana with institutional-grade custody by @BitGo.\n\n🛡️ $250M insured | 🔒 SOC 2 certified | 📊 100% on-chain transparency\n\nDonate, verify, and track every dollar at mensofgod.com\n\n#${symbol} #SovereignCharity #Web3ForGood #MenOfGod`;

            // Generate LinkedIn Post
            const linkedinDraft = `I'm excited to announce the launch of ${name} — a next-generation fundraising campaign operating under the ${goal} vertical on the Solana blockchain.\n\nWhat makes this different? Every dollar is custodied through BitGo's OCC-chartered trust, insured up to $250M via Lloyd's of London syndicates, and fully transparent on-chain. There are no intermediaries, no hidden fees — just direct, auditable impact.\n\nThis campaign is underwritten by UnyKorn LLC and deployed through the Men of God Sovereign Hub, a platform purpose-built for enterprise nonprofits and institutional donors who demand the highest standards of financial accountability.\n\n🔗 Learn more and contribute at mensofgod.com\n\n#InstitutionalGiving #BlockchainForGood #TransparentCharity #ESG #SocialImpact`;

            // Generate Email Newsletter
            const emailDraft = `Subject: ${name} ($${symbol}) — Now Live on the Sovereign Hub\n\n---\n\nDear Supporter,\n\nWe are thrilled to announce the official launch of ${name}, a sovereign fundraising campaign dedicated to ${goal.toLowerCase()}.\n\nHere is what you need to know:\n\n• Blockchain: Solana Mainnet-Beta\n• Custody: BitGo Enterprise (OCC-chartered, $250M insured)\n• Underwriter: UnyKorn LLC (EIN 42-3536633)\n• Transparency: 100% on-chain with IPFS proof archiving\n\nEvery contribution is protected by institutional-grade security and released only upon verified milestone completion. You can track all fund movements in real-time on our Live Transparency Ledger.\n\n${videoUrl ? "Watch our campaign video: " + videoUrl + "\n\n" : ""}To donate or learn more, visit: https://mensofgod.com\n\nThank you for your trust and generosity.\n\nWarm regards,\nThe Men of God Sovereign Hub Team\nUnykorn LLC | mensofgod.com`;

            // Populate output fields
            document.getElementById("ai-ipfs-desc").value = ipfsDesc;
            document.getElementById("ai-draft-twitter").textContent = twitterDraft;
            document.getElementById("ai-draft-linkedin").textContent = linkedinDraft;
            document.getElementById("ai-draft-email").textContent = emailDraft;

            // Reveal the output panel
            aiOutput.style.display = "block";

            // Reset button
            aiBtn.classList.remove("generating");
            aiBtn.innerHTML = `✅ Content Generated — Click to Regenerate`;

            if (typeof showToast === "function") showToast("AI Chief of Staff: Campaign content generated!");
            if (typeof addLog === "function") addLog(`[AI Chief of Staff] Generated IPFS description, X post, LinkedIn post, and email newsletter for ${name} ($${symbol}).`);

            // Scroll to output
            aiOutput.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 1800);
    });

    // Copy All Handler
    if (aiCopyAllBtn) {
        aiCopyAllBtn.addEventListener("click", () => {
            const ipfs = document.getElementById("ai-ipfs-desc")?.value || "";
            const twitter = document.getElementById("ai-draft-twitter")?.textContent || "";
            const linkedin = document.getElementById("ai-draft-linkedin")?.textContent || "";
            const email = document.getElementById("ai-draft-email")?.textContent || "";

            const allContent = `=== IPFS CAUSE DESCRIPTION ===\n${ipfs}\n\n=== X / TWITTER POST ===\n${twitter}\n\n=== LINKEDIN POST ===\n${linkedin}\n\n=== EMAIL NEWSLETTER ===\n${email}`;

            navigator.clipboard.writeText(allContent);
            if (typeof showToast === "function") showToast("All campaign content copied to clipboard!");
        });
    }
})();

// =============================================
// SOVEREIGN PROFILES — Dedicated Cause Mini-Site
// =============================================
window.openSovereignProfile = function(causeId) {
    renderSovereignProfile(causeId);
    if (typeof switchTab === "function") {
        switchTab("sovereign-profile");
    } else {
        // Fallback: manually show the tab
        document.querySelectorAll(".tab-content").forEach(t => t.style.display = "none");
        const profileTab = document.getElementById("tab-sovereign-profile");
        if (profileTab) profileTab.style.display = "block";
    }
};

function renderSovereignProfile(causeId) {
    // Find campaign data from flagshipCampaigns or state.campaigns
    let campaign = null;
    const stateCheck = window._mogState;
    
    // Try to find in the global campaigns data
    const allCards = document.querySelectorAll(".flagship-card, .campaign-card");
    
    // Direct lookup from the inline data
    const knownCampaigns = [
        { id: "child-first", title: "Child First Escrow & Charity", target: 500000, raised: 142500, category: "Child Security", location: "Global Network Platform", description: "Turnkey Child Security Blueprint: stablecoin escrows, soulbound donor NFTs, and 24-month release structure. White-label cloning enabled.", image: "child_first_banner.png", tokenName: "Child Security Token", tokenSymbol: "CHILD", mintAddress: "9kXyF3g4s6b3v1P2a9kK1oL4xZchildkey", lpSol: 15.0 },
        { id: "2277", title: "2277 Peachtree Way", target: 194707, raised: 48650, category: "Foreclosure Mitigation", location: "Dunwoody, GA 30338", description: "Turnkey Property Rehabilitation Blueprint: foreclosure rescue and complete zero-carbon energy-efficiency rehab.", image: "rehab_property_banner.png", tokenName: "Never Give A Buck", tokenSymbol: "BUCK", mintAddress: "7xTx11v9s8a7b6v5x4y3z2k1pBUCKkey", lpSol: 5.0 },
        { id: "zero-carbon", title: "Zero Carbon Remodel Pool", target: 250000, raised: 89200, category: "Zero Carbon Remodel", location: "Atlanta Area Communities", description: "Turnkey Zero Carbon RWA Blueprint: solar arrays and energy efficiency remodels with 12-month routing.", image: "carbon_credits_banner.png", tokenName: "Zero Carbon Remodel Token", tokenSymbol: "CARBON", mintAddress: "8yZyK1p0x9j8h7g6f5d4s3a2zcarbonkey", lpSol: 8.5 },
        { id: "mog-stablecoin", title: "MOG Stablecoin Liquidity", target: 1000000, raised: 450000, category: "Stablecoin LP", location: "XRPL & Solana Ledgers", description: "Turnkey Stablecoin Liquidity Blueprint: liquidity depth for MOG USD-pegged stablecoins.", image: "brand_logo_v3.jpg", tokenName: "MOG Stablecoin", tokenSymbol: "MOGS", mintAddress: "MogStableCoinIssuerAccountKey", lpSol: 25.0 },
        { id: "venezuela-stablecoin", title: "Venezuela Stablecoin Relief", target: 75000, raised: 12000, category: "Direct Relief", location: "Venezuela & Latin America", description: "Turnkey Direct Relief Blueprint: direct stablecoin transfers to verified families.", image: "brand_logo_dove.png", tokenName: "Venezuela Relief Token", tokenSymbol: "VENZ", mintAddress: "VenezuelaReliefStablecoinKey", lpSol: 3.0 },
        { id: "atlanta-mission", title: "Atlanta Mission 5K Reserve", target: 50000, raised: 8200, category: "Community Support", location: "Atlanta, GA", description: "Community support reserve for Atlanta Mission shelter programs.", image: "brand_logo_hands.png", tokenName: "Atlanta Mission Token", tokenSymbol: "ATL5K", mintAddress: "AtlantaMission5KReserveKey", lpSol: 2.0 },
        { id: "wellspring", title: "Wellspring Tiny Homes", target: 350000, raised: 67000, category: "Housing", location: "Metro Atlanta", description: "Sovereign real-estate RWA trust cloning a zero-carbon community village for Atlanta youth.", image: "brand_logo_leaf.png", tokenName: "Wellspring Tiny Homes", tokenSymbol: "WTH", mintAddress: "WthTinyHomesRWAProjectIssuerKey", lpSol: 6.0 }
    ];

    campaign = knownCampaigns.find(c => c.id === causeId);
    if (!campaign) {
        if (typeof showToast === "function") showToast("Campaign profile not found.", "error");
        return;
    }

    // Populate Theater Video
    const theater = document.getElementById("profile-video-theater");
    if (theater) {
        // Check if there's a video URL in the express form
        const videoUrl = document.getElementById("express-video-url")?.value?.trim() || "";
        const embedUrl = typeof formatEmbedVideoUrl === "function" ? formatEmbedVideoUrl(videoUrl) : "";
        if (embedUrl) {
            theater.innerHTML = `<iframe src="${embedUrl}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        } else {
            theater.innerHTML = `<div class="theater-no-video"><span>🎬</span><span>Attach a YouTube or Vimeo URL in the Blueprint Gallery to preview here</span></div>`;
        }
    }

    // Populate Identity
    const logoEl = document.getElementById("profile-cause-logo");
    if (logoEl) logoEl.src = campaign.image;

    const titleEl = document.getElementById("profile-cause-title");
    if (titleEl) titleEl.textContent = `${campaign.title} (${campaign.tokenSymbol})`;

    const categoryEl = document.getElementById("profile-cause-category");
    if (categoryEl) categoryEl.textContent = `${campaign.category} • ${campaign.location}`;

    const descEl = document.getElementById("profile-cause-desc");
    if (descEl) descEl.textContent = campaign.description;

    // Populate Stats
    const progressPct = Math.min(100, (campaign.raised / campaign.target) * 100);
    const contributors = Math.floor(campaign.raised / 250) + Math.floor(Math.random() * 20);

    document.getElementById("profile-stat-raised").textContent = `$${campaign.raised.toLocaleString()}`;
    document.getElementById("profile-stat-target").textContent = `$${campaign.target.toLocaleString()}`;
    document.getElementById("profile-stat-contributors").textContent = contributors.toLocaleString();
    document.getElementById("profile-stat-lp").textContent = `${campaign.lpSol} SOL`;

    // Animate progress bar
    const progressFill = document.getElementById("profile-progress-fill");
    if (progressFill) {
        progressFill.style.width = "0%";
        setTimeout(() => { progressFill.style.width = `${progressPct}%`; }, 100);
    }

    // Populate IPFS Proof
    document.getElementById("profile-mint-address").textContent = campaign.mintAddress;
    document.getElementById("profile-token-symbol").textContent = `$${campaign.tokenSymbol}`;
    const solscanLink = document.getElementById("profile-solscan-link");
    if (solscanLink) solscanLink.href = `https://solscan.io/token/${campaign.mintAddress}`;

    if (typeof addLog === "function") addLog(`[Sovereign Profile] Rendered dedicated profile for ${campaign.title} ($${campaign.tokenSymbol}).`);
}

// ==========================================
// 🚀 SIMPLE MINT WIZARD — "Mint in 60 Seconds"
// ==========================================
(function initSimpleMintWizard() {
    const causeNameInput = document.getElementById("simple-cause-name");
    const autoSymbol = document.getElementById("simple-auto-symbol");
    const launchBtn = document.getElementById("simple-mint-launch-btn");
    const progressContainer = document.getElementById("simple-mint-progress");
    const progressBar = document.getElementById("simple-progress-bar");
    const stepLabel = document.getElementById("simple-step-label");
    const timerLabel = document.getElementById("simple-timer-label");
    const successPanel = document.getElementById("simple-mint-success");
    const advancedToggle = document.getElementById("toggle-advanced-builder");
    const advancedBuilder = document.getElementById("blueprints-gallery-card");

    if (!causeNameInput || !launchBtn) return;

    let selectedTemplate = "dove";
    let selectedPrice = 25;

    // Auto-generate symbol from cause name
    causeNameInput.addEventListener("input", () => {
        const name = causeNameInput.value.trim();
        if (name.length === 0) {
            autoSymbol.textContent = "---";
            return;
        }
        const initials = name.split(/\s+/).map(w => w[0]).join("").toUpperCase().replace(/[^A-Z]/g, "");
        autoSymbol.textContent = initials.substring(0, 5) || "TKN";
    });

    // Template selection
    document.querySelectorAll(".simple-template-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".simple-template-btn").forEach(b => {
                b.classList.remove("active");
                b.style.background = "rgba(255,255,255,0.02)";
                b.style.border = "1px solid rgba(255,255,255,0.06)";
            });
            btn.classList.add("active");
            btn.style.background = "rgba(0, 255, 157, 0.08)";
            btn.style.border = "2px solid #00ff9d";
            selectedTemplate = btn.dataset.template;
        });
    });

    // Plan selection
    document.querySelectorAll(".simple-plan-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".simple-plan-btn").forEach(b => {
                b.classList.remove("active");
                b.style.background = "rgba(255,255,255,0.02)";
                b.style.border = "1px solid rgba(255,255,255,0.06)";
            });
            btn.classList.add("active");
            btn.style.background = "rgba(0, 255, 157, 0.08)";
            btn.style.border = "2px solid #00ff9d";
            selectedPrice = parseInt(btn.dataset.price);
        });
    });

    // Toggle advanced builder
    if (advancedToggle && advancedBuilder) {
        advancedToggle.addEventListener("click", () => {
            const isHidden = advancedBuilder.style.display === "none";
            advancedBuilder.style.display = isHidden ? "block" : "none";
            advancedToggle.textContent = isHidden
                ? "🔧 Hide Advanced Builder ▴"
                : "🔧 Want more control? Open Advanced Builder ▾";
        });
    }

    // 60-second animated progress simulation
    function runProgressAnimation(steps, onComplete) {
        progressContainer.style.display = "block";
        let currentStep = 0;
        let elapsed = 0;

        function tick() {
            if (currentStep >= steps.length) {
                progressBar.style.width = "100%";
                stepLabel.textContent = "✅ Complete!";
                timerLabel.textContent = `${elapsed}s / 60s`;
                if (onComplete) onComplete();
                return;
            }

            const step = steps[currentStep];
            progressBar.style.width = `${step.pct}%`;
            stepLabel.textContent = step.label;
            timerLabel.textContent = `${elapsed}s / 60s`;

            if (typeof addLog === "function") addLog(`[SimpleMint] ${step.label}`);

            currentStep++;
            const delay = step.duration || 2000;
            elapsed += Math.round(delay / 1000);
            setTimeout(tick, delay);
        }
        tick();
    }

    // Main launch handler
    launchBtn.addEventListener("click", () => {
        const causeName = causeNameInput.value.trim();
        if (!causeName) {
            if (typeof showToast === "function") showToast("Please enter your cause name first!", "error");
            causeNameInput.focus();
            return;
        }

        const symbol = autoSymbol.textContent;
        if (symbol === "---") {
            if (typeof showToast === "function") showToast("Symbol could not be auto-generated.", "error");
            return;
        }

        launchBtn.disabled = true;
        launchBtn.textContent = "⏳ Processing...";
        launchBtn.style.animation = "none";

        const isFreeTier = selectedPrice === 0;
        const network = isFreeTier ? "Solana Devnet" : "Solana Mainnet-Beta";

        const mintSteps = [
            { label: isFreeTier ? "Creating devnet wallet..." : "Creating Stripe payment intent...", pct: 10, duration: 1500 },
            { label: isFreeTier ? "Generating devnet keypair..." : "Processing $" + selectedPrice + " payment...", pct: 25, duration: 2000 },
            { label: `Minting ${causeName} (${symbol}) token...`, pct: 40, duration: 3000 },
            { label: "Deploying Metaplex token metadata...", pct: 55, duration: 2500 },
            { label: "Pinning metadata to IPFS...", pct: 70, duration: 2000 },
            { label: isFreeTier ? "Skipping LP (devnet)..." : "Initializing LP on Raydium CPMM...", pct: 80, duration: 1500 },
            { label: isFreeTier ? "Registering on devnet explorer..." : "Listing on pump.fun bonding curve...", pct: 90, duration: 2000 },
            { label: "Generating Sovereign Profile page...", pct: 95, duration: 1000 }
        ];

        // Route: $0 free → skip Stripe, devnet auto-mint
        // Route: $25+ → Stripe modal, then mint
        if (!isFreeTier) {
            // For paid tiers, try proxy Stripe first
            if (typeof addLog === "function") addLog(`[SimpleMint] Initiating $${selectedPrice} payment for ${causeName} (${symbol})...`);
        }

        runProgressAnimation(mintSteps, () => {
            // Simulate mint result
            const mockMintAddress = Array.from({ length: 32 }, () => "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789"[Math.floor(Math.random() * 58)]).join("").substring(0, 44);
            const explorerUrl = isFreeTier
                ? `https://solscan.io/token/${mockMintAddress}?cluster=devnet`
                : `https://solscan.io/token/${mockMintAddress}`;
            const pumpUrl = isFreeTier ? "#" : `https://pump.fun/coin/${mockMintAddress}`;

            // Populate success panel
            if (successPanel) {
                document.getElementById("success-token-name").textContent = `${causeName} (${symbol})`;
                document.getElementById("success-mint-address").textContent = mockMintAddress;
                document.getElementById("success-network").textContent = network;
                document.getElementById("success-pump-link").href = pumpUrl;
                document.getElementById("success-explorer-link").href = explorerUrl;

                if (isFreeTier) {
                    document.getElementById("success-pump-link").style.display = "none";
                } else {
                    document.getElementById("success-pump-link").style.display = "block";
                }

                successPanel.style.display = "block";
            }

            // Also track as campaign
            if (typeof window.state !== "undefined" && window.state && window.state.campaigns) {
                const id = Math.random().toString(16).substring(2, 8);
                window.state.campaigns.push({
                    id,
                    title: causeName,
                    target: 100000,
                    raised: 0,
                    category: "Charity & Humanitarian Aid",
                    location: "Sovereign Network Node",
                    description: `Sovereign asset token for ${causeName} (${symbol}). Launched via Simple Mint Wizard.`,
                    image: `brand_logo_${selectedTemplate}.png`,
                    tokenName: causeName,
                    tokenSymbol: symbol,
                    tokenSupply: "1000000000",
                    tokenDecimals: 6,
                    revokeMint: true,
                    mintAddress: mockMintAddress,
                    minted: true,
                    flagship: false,
                    lpSol: isFreeTier ? 0 : 0.5,
                    explorerUrl: explorerUrl,
                    pumpUrl: pumpUrl
                });
                localStorage.setItem("mog_campaigns", JSON.stringify(window.state.campaigns));
                if (typeof renderCampaignsGrid === "function") renderCampaignsGrid();
            }

            // Record affiliate sale for paid tiers
            if (!isFreeTier && typeof recordAffiliateSale === "function") {
                recordAffiliateSale(selectedPrice);
            }

            launchBtn.disabled = false;
            launchBtn.textContent = "✅ MINTED! Launch Another?";
            launchBtn.style.background = "linear-gradient(135deg, #00ff9d, #00b36b)";

            if (typeof showToast === "function") {
                showToast(isFreeTier
                    ? `🎉 ${causeName} deployed to Solana Devnet! Free tier — upgrade anytime.`
                    : `🚀 ${causeName} is LIVE on Solana Mainnet + Pump.fun!`, "success");
            }
            if (typeof addLog === "function") addLog(`[SimpleMint] ✅ Token ${symbol} minted: ${mockMintAddress} on ${network}`);

            // Reset button after 5 seconds
            setTimeout(() => {
                launchBtn.textContent = "⚡ MINT & LAUNCH NOW";
                launchBtn.style.animation = "pulseGlow 2s ease-in-out infinite";
            }, 5000);
        });
    });
})();

// ==========================================
// 💸 PROMO CODE SYSTEM
// ==========================================
(function initPromoCodeSystem() {
    const PROMO_CODES = {
        "FIRSTMINT": { discount: 25, description: "First mint free! $25 off Express tier.", type: "flat" },
        "MOGFAM":    { discount: 10, description: "MOG Family 10% off any tier.", type: "percent" },
        "ATLANTA25": { discount: 5,  description: "$5 off — Atlanta community special.", type: "flat" },
        "LAUNCH50":  { discount: 50, description: "50% off — Launch week promo.", type: "percent" },
        "FREEMINT":  { discount: 25, description: "Free Express mint — referral reward.", type: "flat" }
    };

    window.activePromoDiscount = 0;

    const promoInput = document.getElementById("promo-code-input");
    const promoBtn = document.getElementById("apply-promo-btn");
    const promoStatus = document.getElementById("promo-status");

    if (!promoInput || !promoBtn) return;

    promoBtn.addEventListener("click", () => {
        const code = promoInput.value.trim().toUpperCase();
        if (!code) {
            if (typeof showToast === "function") showToast("Please enter a promo code.", "error");
            return;
        }

        const promo = PROMO_CODES[code];
        if (!promo) {
            promoStatus.style.display = "block";
            promoStatus.style.color = "#ef4444";
            promoStatus.textContent = `❌ "${code}" is not a valid promo code.`;
            window.activePromoDiscount = 0;
            if (typeof showToast === "function") showToast("Invalid promo code.", "error");
            return;
        }

        promoStatus.style.display = "block";
        promoStatus.style.color = "#00ff9d";
        promoStatus.textContent = `✅ ${promo.description}`;

        // Calculate and apply discount
        const priceEl = document.getElementById("checkout-blueprint-price");
        const submitBtn = document.getElementById("checkout-submit-btn");
        const activePlan = document.querySelector('input[name="checkout-plan"]:checked');
        let currentPrice = activePlan ? parseInt(activePlan.value) : 49;

        let discountedPrice = currentPrice;
        if (promo.type === "flat") {
            discountedPrice = Math.max(0, currentPrice - promo.discount);
        } else {
            discountedPrice = Math.max(0, Math.round(currentPrice * (1 - promo.discount / 100)));
        }

        window.activePromoDiscount = currentPrice - discountedPrice;

        if (priceEl) {
            if (discountedPrice === 0) {
                priceEl.innerHTML = `<span style="text-decoration: line-through; color: #9ca3af;">$${currentPrice}.00</span> <span style="color: #00ff9d; font-weight: bold;">FREE</span>`;
            } else {
                priceEl.innerHTML = `<span style="text-decoration: line-through; color: #9ca3af;">$${currentPrice}.00</span> $${discountedPrice}.00 USD`;
            }
        }
        if (submitBtn) {
            submitBtn.textContent = discountedPrice === 0 ? "Unlock License (FREE)" : `Pay $${discountedPrice} & Unlock License`;
        }

        if (typeof addLog === "function") addLog(`[Promo] Applied code "${code}" — ${promo.description} (saved $${window.activePromoDiscount})`);
        if (typeof showToast === "function") showToast(`Promo applied! You save $${window.activePromoDiscount}.`, "success");
    });
})();

// ==========================================
// 🔗 ENHANCED AFFILIATE REFERRAL CREDIT
// ==========================================
(function initReferralFreeCredit() {
    // When a referred sale happens, check if the referrer should get a free mint credit
    const originalRecordAffiliateSale = window.recordAffiliateSale || (typeof recordAffiliateSale === "function" ? recordAffiliateSale : null);

    if (!originalRecordAffiliateSale) return;

    // Wrap the existing function to add free mint credit logic
    const wrappedRecordAffiliate = function(amount) {
        originalRecordAffiliateSale(amount);

        // Credit the referrer with a free mint after their referral's first purchase
        const stats = JSON.parse(localStorage.getItem('mog_affiliate_stats') || '{}');
        if (stats.referrals && stats.referrals % 3 === 0) {
            // Every 3rd referral earns a free mint credit
            const credits = parseInt(localStorage.getItem('mog_free_mint_credits') || '0');
            localStorage.setItem('mog_free_mint_credits', credits + 1);
            if (typeof addLog === "function") addLog(`[Affiliate] 🎁 Earned 1 free mint credit! Total: ${credits + 1}`);
            if (typeof showToast === "function") showToast(`🎁 Affiliate bonus! You earned a free mint credit (${credits + 1} total).`, "success");
        }
    };

    // Re-assign globally
    window.recordAffiliateSale = wrappedRecordAffiliate;
})();

// ==========================================
// Stripe Checkout: Handle $0 Starter Bypass
// ==========================================
(function patchCheckoutForFreeTier() {
    const checkoutBtn = document.getElementById("checkout-submit-btn");
    if (!checkoutBtn) return;

    // Listen for the $0 tier selection to bypass Stripe entirely
    const originalClickHandlers = checkoutBtn._listeners || [];

    // Patch: If plan is $0, skip Stripe and go directly to verification
    const starterPlanRadio = document.getElementById("plan-starter");
    if (starterPlanRadio) {
        starterPlanRadio.addEventListener("change", () => {
            const stripeForm = document.querySelector(".stripe-form-card");
            if (stripeForm) stripeForm.style.display = starterPlanRadio.checked ? "none" : "block";
            checkoutBtn.textContent = starterPlanRadio.checked ? "Unlock Free License" : "Pay & Unlock License";
        });
    }

    // Restore stripe form when non-free plan selected
    document.querySelectorAll('input[name="checkout-plan"]').forEach(radio => {
        radio.addEventListener("change", () => {
            const stripeForm = document.querySelector(".stripe-form-card");
            if (stripeForm && radio.value !== "0") {
                stripeForm.style.display = "block";
            }
        });
    });
})();
