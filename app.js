// Professional Invoice & Funding Proposal Studio State and Logic

const presets = {
    "all-items": {
        title: "Full List Sum ($203,207.00)",
        items: [
            { desc: "Remodeling the entire kitchen, everything new and up to date", qty: 1, price: 25257.00, active: true },
            { desc: "Replace the entire 3-bathroom tile and repaint (sinks, toilets, tile floor, showers, glass doors, tub)", qty: 1, price: 15350.00, active: true },
            { desc: "Replace floors and carpets in the basement with hardwood", qty: 1, price: 7500.00, active: true },
            { desc: "Painting the entire house inside", qty: 1, price: 14500.00, active: true },
            { desc: "Replace all the windows", qty: 1, price: 22000.00, active: true },
            { desc: "Replace the driveway", qty: 1, price: 13500.00, active: true },
            { desc: "Remove the mold from the wall in the basement", qty: 1, price: 3500.00, active: true },
            { desc: "Remove all the mold from the garage", qty: 1, price: 2500.00, active: true },
            { desc: "Replace the laundry room walls and floors with tile", qty: 1, price: 7250.00, active: true },
            { desc: "Upgrade wood floors throughout the house", qty: 1, price: 13500.00, active: true },
            { desc: "Remove all the trees from outside to clean up all the yard and haul away", qty: 1, price: 8500.00, active: true },
            { desc: "Crawl space plastic to be installed", qty: 1, price: 3850.00, active: true },
            { desc: "Install a new pump", qty: 1, price: 5500.00, active: true },
            { desc: "Shingles on the roof and haul away", qty: 1, price: 24000.00, active: true },
            { desc: "Gutters have to be replaced", qty: 1, price: 5000.00, active: true },
            { desc: "Installing a new soffit Hardy Plank", qty: 1, price: 8500.00, active: true },
            { desc: "HVAC new unit", qty: 1, price: 8500.00, active: true },
            { desc: "Hand Rails", qty: 1, price: 1500.00, active: true },
            { desc: "Electrical problems", qty: 1, price: 5500.00, active: true },
            { desc: "Water leak in the basement wall", qty: 1, price: 7500.00, active: true }
        ],
        amountPaid: 0,
        status: "estimate"
    },
    "original-math": {
        title: "Document Total ($194,707.00)",
        items: [
            { desc: "Remodeling the entire kitchen, everything new and up to date", qty: 1, price: 25257.00, active: true },
            { desc: "Replace the entire 3-bathroom tile and repaint (sinks, toilets, tile floor, showers, glass doors, tub)", qty: 1, price: 15350.00, active: true },
            { desc: "Replace floors and carpets in the basement with hardwood", qty: 1, price: 7500.00, active: true },
            { desc: "Painting the entire house inside", qty: 1, price: 14500.00, active: true },
            { desc: "Replace all the windows", qty: 1, price: 22000.00, active: true },
            { desc: "Replace the driveway", qty: 1, price: 13500.00, active: true },
            { desc: "Remove the mold from the wall in the basement", qty: 1, price: 3500.00, active: false }, // Excluded to match $194,707
            { desc: "Remove all the mold from the garage", qty: 1, price: 2500.00, active: true },
            { desc: "Replace the laundry room walls and floors with tile", qty: 1, price: 7250.00, active: true },
            { desc: "Upgrade wood floors throughout the house", qty: 1, price: 13500.00, active: true },
            { desc: "Remove all the trees from outside to clean up all the yard and haul away", qty: 1, price: 8500.00, active: true },
            { desc: "Crawl space plastic to be installed", qty: 1, price: 3850.00, active: true },
            { desc: "Install a new pump", qty: 1, price: 5500.00, active: true },
            { desc: "Shingles on the roof and haul away", qty: 1, price: 24000.00, active: true },
            { desc: "Gutters have to be replaced", qty: 1, price: 5000.00, active: false }, // Excluded to match $194,707
            { desc: "Installing a new soffit Hardy Plank", qty: 1, price: 8500.00, active: true },
            { desc: "HVAC new unit", qty: 1, price: 8500.00, active: true },
            { desc: "Hand Rails", qty: 1, price: 1500.00, active: true },
            { desc: "Electrical problems", qty: 1, price: 5500.00, active: true },
            { desc: "Water leak in the basement wall", qty: 1, price: 7500.00, active: true }
        ],
        amountPaid: 194707.00,
        status: "paid"
    },
    "flat-contract": {
        title: "Base Contract ($189,000.00)",
        items: [
            { desc: "Remodeling the entire house per agreement specifications", qty: 1, price: 189000.00, active: true }
        ],
        amountPaid: 0,
        status: "unpaid"
    }
};

let invoiceState = {
    activeTab: "invoice",
    
    // Invoice Metadata
    invoiceNo: "REC-2026-0624",
    issueDate: "2026-06-24",
    dueDate: "2026-07-24",
    projectName: "2277 North Peachtree Way Remodeling",
    poNumber: "REC-2277NP",
    status: "estimate",
    
    // Sender Profile
    senderName: "The Real Estate Connections LLC",
    senderAddress: "110 Habersham Dr, Suite 140\nFayetteville Ga 30314",
    senderPayee: "Real Estate Connections LLC\nFayetteville Ga 30276",
    senderWebsite: "TheRealEstateConnection.com",
    
    // Client Profile
    clientName: "Buck Vaughan",
    clientAddress: "2277 North Peachtree Way\nDunwoody Ga 30338",
    
    // Property Information Profile
    propertyBedsBaths: "4 Beds, 3 Baths",
    propertyYear: "1969",
    propertySize: "2,659 Sq Ft",
    propertyLot: "0.96 Acres",
    propertyValuation: 524500,
    propertyARV: 725000,
    
    // Draw Schedule Config
    draw1: 25,
    draw2: 30,
    draw3: 25,
    draw4: 20,

    // Energy Rebates config
    rebateHVAC: 8000,
    rebateElectric: 5500,
    rebateCrawl: 1600,
    rebatePump: 1750,
    rebateWindows: 4000,
    
    // Banking Details
    bankName: "Chase Bank",
    bankBranch: "Summit Point Branch, Fayetteville Ga",
    bankPhone: "770-460-2914",
    bankRouting: "502101025",
    bankAccount: "932922302",
    
    // Financials
    discount: 0,
    taxRate: 0,
    amountPaid: 0,
    terms: "All invoices are payable when received. Thank you for your business!",
    
    // Appraisal Valuation Adjustments Coefficients
    coeffSqFt: 100,
    coeffBed: 15000,
    coeffBath: 10000,
    coeffEnergy: 30000,

    // Line Items
    items: JSON.parse(JSON.stringify(presets["original-math"].items))
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
    // Bind form elements to state
    bindInputs();
    
    // Preset toggling
    document.querySelectorAll(".preset-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const presetKey = e.target.dataset.preset;
            loadPreset(presetKey);
            
            document.querySelectorAll(".preset-btn").forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
        });
    });

    // Tab switching logic
    document.querySelectorAll(".tab-switcher .tab-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const tab = e.target.dataset.tab;
            switchTab(tab);
        });
    });

    // Add Item Button
    document.getElementById("add-item").addEventListener("click", () => {
        invoiceState.items.push({
            desc: "New Remodeling Item",
            qty: 1,
            price: 0.00,
            active: true
        });
        renderItemsEditor();
        updateInvoice();
        showToast("New item added to invoice");
    });

    // Theme toggle button
    document.getElementById("theme-toggle").addEventListener("click", () => {
        const sheets = ["invoice-sheet", "proposal-sheet", "upgrades-sheet", "binder-sheet", "appraisal-sheet"];
        sheets.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.toggle("dark-preview");
        });
        
        const isDark = document.getElementById("invoice-sheet").classList.contains("dark-preview");
        document.getElementById("theme-icon").textContent = isDark ? "☀️" : "🌙";
        showToast(`Theme switched to ${isDark ? 'Dark' : 'Light'} preview`);
    });

    // Import/Export
    document.getElementById("export-json").addEventListener("click", exportInvoiceJSON);
    document.getElementById("import-file").addEventListener("change", importInvoiceJSON);
    document.getElementById("print-invoice").addEventListener("click", () => {
        window.print();
    });
    
    // Download full PDF package
    document.getElementById("download-package-pdf").addEventListener("click", downloadFullPDF);

    // Load initial original-math preset details
    loadPreset("original-math");
});

function switchTab(tab) {
    invoiceState.activeTab = tab;
    
    // Toggle Button UI
    document.querySelectorAll(".tab-switcher .tab-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.tab === tab);
    });

    // Toggle Preview Cards Display
    document.getElementById("invoice-sheet").style.display = (tab === "invoice") ? "flex" : "none";
    document.getElementById("proposal-sheet").style.display = (tab === "proposal") ? "flex" : "none";
    document.getElementById("upgrades-sheet").style.display = (tab === "upgrades") ? "flex" : "none";
    document.getElementById("binder-sheet").style.display = (tab === "binder") ? "flex" : "none";
    document.getElementById("appraisal-sheet").style.display = (tab === "appraisal") ? "flex" : "none";
    
    if (tab === "appraisal") {
        setTimeout(() => {
            initMap();
            if (myMap) {
                myMap.invalidateSize();
            }
        }, 100);
    }
    
    showToast(`Switched view to ${tab.charAt(0).toUpperCase() + tab.slice(1)}`);
}

function bindInputs() {
    const fields = [
        "invoiceNo", "issueDate", "dueDate", "projectName", "poNumber", "status",
        "senderName", "senderAddress", "senderPayee", "senderWebsite",
        "clientName", "clientAddress",
        "propertyBedsBaths", "propertyYear", "propertySize", "propertyLot", "propertyValuation", "propertyARV",
        "draw1", "draw2", "draw3", "draw4",
        "rebateHVAC", "rebateElectric", "rebateCrawl", "rebatePump", "rebateWindows",
        "bankName", "bankBranch", "bankPhone", "bankRouting", "bankAccount",
        "discount", "taxRate", "amountPaid", "terms",
        "coeffSqFt", "coeffBed", "coeffBath", "coeffEnergy"
    ];

    fields.forEach(field => {
        const el = document.getElementById(`edit-${field}`);
        if (!el) return;

        // Set initial value
        el.value = invoiceState[field];

        // Update state on input
        el.addEventListener("input", (e) => {
            let val = e.target.value;
            if (e.target.type === "number") {
                val = parseFloat(val) || 0;
            }
            invoiceState[field] = val;
            updateInvoice();
        });
    });
}

function loadPreset(key) {
    if (!presets[key]) return;
    const preset = presets[key];
    
    // Copy items deep
    invoiceState.items = JSON.parse(JSON.stringify(preset.items));
    invoiceState.amountPaid = preset.amountPaid;
    invoiceState.status = preset.status;
    
    // Update input UI values
    document.getElementById("edit-amountPaid").value = preset.amountPaid;
    document.getElementById("edit-status").value = preset.status;
    
    renderItemsEditor();
    updateInvoice();
    showToast(`Loaded Preset: ${preset.title}`);
}

function renderItemsEditor() {
    const listContainer = document.getElementById("editor-items-list");
    listContainer.innerHTML = "";

    invoiceState.items.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = `editor-item-card ${item.active ? '' : 'disabled'}`;
        card.dataset.index = index;

        card.innerHTML = `
            <div class="editor-item-top">
                <input type="checkbox" class="editor-item-checkbox" ${item.active ? 'checked' : ''}>
                <input type="text" class="editor-item-desc" value="${item.desc}" placeholder="Item Description">
            </div>
            <div class="editor-item-bottom">
                <label style="margin: 0; font-size: 10px;">Qty:</label>
                <input type="number" class="editor-item-qty" min="0" value="${item.qty}">
                <label style="margin: 0; font-size: 10px;">Cost ($):</label>
                <input type="number" class="editor-item-price" step="0.01" min="0" value="${item.price.toFixed(2)}">
                <div class="editor-item-total">$${(item.qty * item.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                <button class="delete-item-btn" title="Delete Item">🗑️</button>
            </div>
        `;

        // Event Listeners for item modifications
        const checkbox = card.querySelector(".editor-item-checkbox");
        checkbox.addEventListener("change", (e) => {
            item.active = e.target.checked;
            card.classList.toggle("disabled", !item.active);
            updateInvoice();
        });

        const descInput = card.querySelector(".editor-item-desc");
        descInput.addEventListener("input", (e) => {
            item.desc = e.target.value;
            updateInvoice();
        });

        const qtyInput = card.querySelector(".editor-item-qty");
        qtyInput.addEventListener("input", (e) => {
            item.qty = parseFloat(e.target.value) || 0;
            card.querySelector(".editor-item-total").textContent = `$${(item.qty * item.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
            updateInvoice();
        });

        const priceInput = card.querySelector(".editor-item-price");
        priceInput.addEventListener("input", (e) => {
            item.price = parseFloat(e.target.value) || 0;
            card.querySelector(".editor-item-total").textContent = `$${(item.qty * item.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
            updateInvoice();
        });

        const deleteBtn = card.querySelector(".delete-item-btn");
        deleteBtn.addEventListener("click", () => {
            invoiceState.items.splice(index, 1);
            renderItemsEditor();
            updateInvoice();
            showToast("Item deleted");
        });

        listContainer.appendChild(card);
    });
}

function updateInvoice() {
    // 1. Sync Text/Meta Info to Preview
    document.getElementById("preview-senderName").textContent = invoiceState.senderName;
    document.getElementById("preview-senderAddress").innerHTML = invoiceState.senderAddress.replace(/\n/g, "<br>");
    document.getElementById("preview-senderPayee").innerHTML = invoiceState.senderPayee.replace(/\n/g, "<br>");
    document.getElementById("preview-senderWebsite").textContent = invoiceState.senderWebsite;
    document.getElementById("preview-senderWebsite").href = `https://${invoiceState.senderWebsite}`;

    document.getElementById("preview-clientName").textContent = invoiceState.clientName;
    document.getElementById("preview-clientAddress").innerHTML = invoiceState.clientAddress.replace(/\n/g, "<br>");

    document.getElementById("preview-invoiceNo").textContent = invoiceState.invoiceNo;
    document.getElementById("preview-projectName").textContent = invoiceState.projectName;
    document.getElementById("preview-poNumber").textContent = invoiceState.poNumber;
    
    // Date formatting helper
    document.getElementById("preview-issueDate").textContent = formatDate(invoiceState.issueDate);
    document.getElementById("preview-dueDate").textContent = formatDate(invoiceState.dueDate);

    // Status Badge
    const badge = document.getElementById("preview-status-badge");
    badge.className = `invoice-status-badge status-${invoiceState.status}`;
    if (invoiceState.status === "paid") {
        badge.innerHTML = "<span>✓</span> Paid";
    } else if (invoiceState.status === "unpaid") {
        badge.innerHTML = "<span>⚠</span> Unpaid";
    } else {
        badge.innerHTML = "<span>✎</span> Estimate / Draft";
    }

    // 2. Render Line Items Table
    const tableBody = document.getElementById("preview-table-body");
    tableBody.innerHTML = "";
    
    let subtotal = 0;
    let indexCount = 1;

    invoiceState.items.forEach((item) => {
        const tr = document.createElement("tr");
        if (!item.active) {
            tr.className = "item-inactive";
        }
        
        const lineTotal = item.qty * item.price;
        if (item.active) {
            subtotal += lineTotal;
        }

        tr.innerHTML = `
            <td class="item-index">${indexCount++}</td>
            <td>
                <div class="item-desc-wrapper">
                    <span class="item-desc-title">${escapeHTML(item.desc)}</span>
                    ${!item.active ? '<span class="item-disabled-note">(Excluded from invoice totals)</span>' : ''}
                </div>
            </td>
            <td class="col-qty">${item.qty}</td>
            <td class="col-price">$${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td class="col-total">$${lineTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
        `;

        tableBody.appendChild(tr);
    });

    // 3. Financial Calculations
    const discountVal = subtotal * (invoiceState.discount / 100);
    const taxedSubtotal = subtotal - discountVal;
    const taxVal = taxedSubtotal * (invoiceState.taxRate / 100);
    const grandTotal = taxedSubtotal + taxVal;
    const balanceDue = grandTotal - invoiceState.amountPaid;

    // 4. Update Preview Financials
    document.getElementById("preview-subtotal").textContent = `$${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    
    const discountRow = document.getElementById("preview-discount-row");
    if (invoiceState.discount > 0) {
        discountRow.style.display = "flex";
        document.getElementById("preview-discount-label").textContent = `Discount (${invoiceState.discount}%)`;
        document.getElementById("preview-discount").textContent = `-$${discountVal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    } else {
        discountRow.style.display = "none";
    }

    const taxRow = document.getElementById("preview-tax-row");
    if (invoiceState.taxRate > 0) {
        taxRow.style.display = "flex";
        document.getElementById("preview-tax-label").textContent = `Tax (${invoiceState.taxRate}%)`;
        document.getElementById("preview-tax").textContent = `$${taxVal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    } else {
        taxRow.style.display = "none";
    }

    document.getElementById("preview-total").textContent = `$${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById("preview-paid").textContent = `$${invoiceState.amountPaid.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    
    const balanceRow = document.getElementById("preview-balance-row");
    const previewBalance = document.getElementById("preview-balance");
    previewBalance.textContent = `$${balanceDue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    
    if (balanceDue > 0) {
        balanceRow.className = "totals-row balance-due";
    } else {
        balanceRow.className = "totals-row";
    }

    // 5. Banking & Footer Terms
    document.getElementById("preview-bankName").textContent = invoiceState.bankName;
    document.getElementById("preview-bankBranch").textContent = invoiceState.bankBranch;
    document.getElementById("preview-bankPhone").textContent = invoiceState.bankPhone;
    document.getElementById("preview-bankRouting").textContent = invoiceState.bankRouting;
    document.getElementById("preview-bankAccount").textContent = invoiceState.bankAccount;
    document.getElementById("preview-terms-text").textContent = invoiceState.terms;

    // ==========================================
    // 6. Funding Proposal Tab Dynamic Updates
    // ==========================================
    document.getElementById("prop-year").textContent = invoiceState.propertyYear;
    document.getElementById("prop-size").textContent = invoiceState.propertySize;
    document.getElementById("prop-lot").textContent = invoiceState.propertyLot;
    document.getElementById("prop-beds").textContent = invoiceState.propertyBedsBaths;
    
    document.getElementById("prop-current-val").textContent = `$${invoiceState.propertyValuation.toLocaleString('en-US')}`;
    document.getElementById("prop-arv-val").textContent = `$${invoiceState.propertyARV.toLocaleString('en-US')}`;
    
    document.getElementById("proposal-payee").textContent = invoiceState.senderPayee.split('\n')[0];
    document.getElementById("proposal-routing").textContent = invoiceState.bankRouting;
    document.getElementById("proposal-account").textContent = invoiceState.bankAccount;
    document.getElementById("proposal-ref-po").textContent = invoiceState.poNumber;

    // LTV Calculations
    const ltvBase = invoiceState.propertyValuation > 0 ? (grandTotal / invoiceState.propertyValuation) * 100 : 0;
    const ltvArv = invoiceState.propertyARV > 0 ? (grandTotal / invoiceState.propertyARV) * 100 : 0;
    
    document.getElementById("prop-ltv-base").textContent = `${ltvBase.toFixed(1)}%`;
    document.getElementById("prop-ltv-arv").textContent = `${ltvArv.toFixed(1)}%`;

    // Draw Schedule Calculations
    const dPctSum = invoiceState.draw1 + invoiceState.draw2 + invoiceState.draw3 + invoiceState.draw4;
    const drawSumLabel = document.getElementById("draw-percentage-sum");
    drawSumLabel.textContent = dPctSum;
    
    if (dPctSum !== 100) {
        drawSumLabel.style.color = "var(--danger)";
    } else {
        drawSumLabel.style.color = "var(--success)";
    }

    // Sync percentages to table
    document.getElementById("draw-pct-1").textContent = invoiceState.draw1;
    document.getElementById("draw-pct-2").textContent = invoiceState.draw2;
    document.getElementById("draw-pct-3").textContent = invoiceState.draw3;
    document.getElementById("draw-pct-4").textContent = invoiceState.draw4;

    // Calculate dollar values for draws
    const drawAmt1 = grandTotal * (invoiceState.draw1 / 100);
    const drawAmt2 = grandTotal * (invoiceState.draw2 / 100);
    const drawAmt3 = grandTotal * (invoiceState.draw3 / 100);
    const drawAmt4 = grandTotal * (invoiceState.draw4 / 100);

    document.getElementById("draw-amt-1").textContent = `$${drawAmt1.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById("draw-amt-2").textContent = `$${drawAmt2.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById("draw-amt-3").textContent = `$${drawAmt3.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById("draw-amt-4").textContent = `$${drawAmt4.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById("draw-total-amt").textContent = `$${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    // ==========================================
    // 7. Energy Upgrades Tab Dynamic Updates
    // ==========================================
    
    // Sync rebates to table labels
    document.getElementById("prev-rebateHVAC").textContent = invoiceState.rebateHVAC.toLocaleString('en-US', { minimumFractionDigits: 2 });
    document.getElementById("prev-rebateElectric").textContent = invoiceState.rebateElectric.toLocaleString('en-US', { minimumFractionDigits: 2 });
    document.getElementById("prev-rebateCrawl").textContent = invoiceState.rebateCrawl.toLocaleString('en-US', { minimumFractionDigits: 2 });
    document.getElementById("prev-rebatePump").textContent = invoiceState.rebatePump.toLocaleString('en-US', { minimumFractionDigits: 2 });
    document.getElementById("prev-rebateWindows").textContent = invoiceState.rebateWindows.toLocaleString('en-US', { minimumFractionDigits: 2 });

    // Calculate individual net values
    const netHVAC = Math.max(0, 8500 - invoiceState.rebateHVAC);
    const netElectric = Math.max(0, 5500 - invoiceState.rebateElectric);
    const netCrawl = Math.max(0, 3850 - invoiceState.rebateCrawl);
    const netPump = Math.max(0, 5500 - invoiceState.rebatePump);
    const netWindows = Math.max(0, 22000 - invoiceState.rebateWindows);

    document.getElementById("prev-netHVAC").textContent = `$${netHVAC.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    document.getElementById("prev-netElectric").textContent = `$${netElectric.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    document.getElementById("prev-netCrawl").textContent = `$${netCrawl.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    document.getElementById("prev-netPump").textContent = `$${netPump.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    document.getElementById("prev-netWindows").textContent = `$${netWindows.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

    // Summary calculations
    const baseTotal = 8500 + 5500 + 3850 + 5500 + 22000 + 24000; // sum of listed bases
    const rebatesTotal = invoiceState.rebateHVAC + invoiceState.rebateElectric + invoiceState.rebateCrawl + invoiceState.rebatePump + invoiceState.rebateWindows;
    const netTotal = baseTotal - rebatesTotal;
    const savingsTotal = 450 + 180 + 330 + 320 + 150 + 210; // HVAC + Crawl + HPWH + Windows + LED + Cool Roof

    document.getElementById("up-total-base").textContent = `$${baseTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    document.getElementById("up-total-rebates").textContent = `-$${rebatesTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    document.getElementById("up-total-net").textContent = `$${netTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    document.getElementById("up-total-savings").textContent = `$${savingsTotal.toLocaleString('en-US')}/yr`;

    // 8. Run Desk Appraisal Calculations
    recalculateAppraisal();
}

// Helpers & Formatting
function formatDate(dateStr) {
    if (!dateStr) return "";
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    return `${parts[1]}/${parts[2]}/${parts[0]}`;
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

function showToast(message) {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span>⚙</span> ${message}`;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = "slideIn 0.3s ease reverse forwards";
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// JSON Import / Export Functions
function exportInvoiceJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(invoiceState, null, 4));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `proposal-invoice-${invoiceState.invoiceNo}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Project state exported as JSON");
}

function importInvoiceJSON(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(evt) {
        try {
            const data = JSON.parse(evt.target.result);
            Object.assign(invoiceState, data);
            
            // Rebind UI inputs
            bindInputs();
            renderItemsEditor();
            updateInvoice();
            showToast("Project state imported successfully!");
        } catch (err) {
            alert("Error parsing JSON file. Please check that it is a valid backup.");
        }
    };
    reader.readAsText(file);
}

// ==========================================
// 8. Interactive Desk Appraisal & Leaflet Map
// ==========================================
let myMap = null;

function initMap() {
    if (typeof L === 'undefined') return;
    if (myMap) return;

    try {
        const subjectLatLng = [33.9482, -84.3216];
        myMap = L.map('appraisal-map').setView(subjectLatLng, 15);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(myMap);
        
        // Add markers
        L.marker(subjectLatLng).addTo(myMap)
            .bindPopup('<strong>Subject Property</strong><br>2277 N Peachtree Way<br>Dunwoody, GA 30338')
            .openPopup();
            
        L.marker([33.9490, -84.3205]).addTo(myMap)
            .bindPopup('<strong>Comp 1: 2295 N Peachtree Way</strong><br>Sold: $680,000<br>Distance: 0.1 miles');
            
        L.marker([33.9425, -84.3225]).addTo(myMap)
            .bindPopup('<strong>Comp 2: 5410 North Peachtree Rd</strong><br>Sold: $745,000<br>Distance: 0.4 miles');
            
        L.marker([33.9475, -84.3270]).addTo(myMap)
            .bindPopup('<strong>Comp 3: 2210 Peachtree Ln</strong><br>Sold: $655,000<br>Distance: 0.3 miles');
    } catch (e) {
        console.error("Leaflet map initialization failed: ", e);
    }
}

function recalculateAppraisal() {
    const indicatedEl = document.getElementById("appr-indicated-val");
    if (!indicatedEl) return;

    // Coefficients
    const coeffSqFt = parseFloat(invoiceState.coeffSqFt) || 0;
    const coeffBed = parseFloat(invoiceState.coeffBed) || 0;
    const coeffBath = parseFloat(invoiceState.coeffBath) || 0;
    const coeffEnergy = parseFloat(invoiceState.coeffEnergy) || 0;

    // Subject
    const subSqFt = 2659;
    const subBeds = 4;
    const subBaths = 3.0;

    // Comps
    const comps = [
        { price: 680000, sqft: 2500, beds: 4, baths: 2.5, idx: 1 },
        { price: 745000, sqft: 2800, beds: 4, baths: 3.5, idx: 2 },
        { price: 655000, sqft: 2400, beds: 3, baths: 2.5, idx: 3 }
    ];

    let totalAdjustedPrice = 0;

    comps.forEach(comp => {
        const sqftDiff = subSqFt - comp.sqft;
        const sqftAdj = sqftDiff * coeffSqFt;

        const bedDiff = subBeds - comp.beds;
        const bedAdj = bedDiff * coeffBed;

        const bathDiff = subBaths - comp.baths;
        const bathAdj = bathDiff * coeffBath;

        const energyAdj = coeffEnergy;

        const netAdj = sqftAdj + bedAdj + bathAdj + energyAdj;
        const adjustedPrice = comp.price + netAdj;

        totalAdjustedPrice += adjustedPrice;

        // UI formatting signs
        const sqftSign = sqftAdj >= 0 ? '+' : '';
        const bbAdj = bedAdj + bathAdj;
        const bbSign = bbAdj >= 0 ? '+' : '';
        const energySign = energyAdj >= 0 ? '+' : '';
        const netSign = netAdj >= 0 ? '+' : '';

        const setAdjText = (elId, val, sign) => {
            const el = document.getElementById(elId);
            if (el) {
                el.textContent = `${sign}$${Math.abs(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                el.className = val > 0 ? "appr-adj-text text-green" : (val < 0 ? "appr-adj-text text-red" : "appr-adj-text text-muted");
            }
        };

        setAdjText(`appr-adj-sqft-${comp.idx}`, sqftAdj, sqftSign);
        setAdjText(`appr-adj-bb-${comp.idx}`, bbAdj, bbSign);
        setAdjText(`appr-adj-energy-${comp.idx}`, energyAdj, energySign);

        const netAdjEl = document.getElementById(`appr-net-adj-${comp.idx}`);
        if (netAdjEl) {
            netAdjEl.textContent = `${netSign}$${Math.abs(netAdj).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
            netAdjEl.style.color = netAdj >= 0 ? "var(--success)" : "var(--danger)";
        }

        const adjPriceEl = document.getElementById(`appr-adj-price-${comp.idx}`);
        if (adjPriceEl) {
            adjPriceEl.textContent = `$${adjustedPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }
    });

    const indicatedVal = totalAdjustedPrice / comps.length;
    indicatedEl.textContent = `$${indicatedVal.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

    // Sync Estimated ARV if changed
    const roundedIndicated = Math.round(indicatedVal);
    if (invoiceState.propertyARV !== roundedIndicated) {
        invoiceState.propertyARV = roundedIndicated;
        
        const arvInput = document.getElementById("edit-propertyARV");
        if (arvInput) arvInput.value = roundedIndicated;

        const propArvVal = document.getElementById("prop-arv-val");
        if (propArvVal) propArvVal.textContent = `$${roundedIndicated.toLocaleString('en-US')}`;

        // Re-calculate LTV
        const subtotal = invoiceState.items.reduce((sum, item) => sum + (item.active ? item.qty * item.price : 0), 0);
        const discountVal = subtotal * (invoiceState.discount / 100);
        const taxedSubtotal = subtotal - discountVal;
        const taxVal = taxedSubtotal * (invoiceState.taxRate / 100);
        const grandTotal = taxedSubtotal + taxVal;
        
        const ltvArv = roundedIndicated > 0 ? (grandTotal / roundedIndicated) * 100 : 0;
        const propLtvArv = document.getElementById("prop-ltv-arv");
        if (propLtvArv) propLtvArv.textContent = `${ltvArv.toFixed(1)}%`;
    }
}

// ==========================================
// 9. Consolidated PDF Generation
// ==========================================
function downloadFullPDF() {
    if (typeof html2pdf === 'undefined') {
        alert("The PDF library is still loading. Please try again in a moment.");
        return;
    }
    
    showToast("Compiling full PDF package...");
    
    const container = document.createElement("div");
    container.style.width = "750px";
    container.style.padding = "10px";
    container.style.background = "#ffffff";
    container.style.color = "#1f2937";
    container.style.fontSize = "11px";
    
    const sheetsList = ["invoice-sheet", "proposal-sheet", "upgrades-sheet", "binder-sheet", "appraisal-sheet"];
    
    sheetsList.forEach((id, index) => {
        const originalSheet = document.getElementById(id);
        if (!originalSheet) return;
        
        const clone = originalSheet.cloneNode(true);
        clone.style.display = "flex";
        clone.style.boxShadow = "none";
        clone.style.border = "none";
        clone.style.padding = "0";
        clone.style.margin = "0 0 30px 0";
        clone.style.width = "100%";
        clone.style.minHeight = "auto";
        clone.style.background = "#ffffff";
        clone.style.color = "#1f2937";
        
        clone.classList.remove("dark-preview");
        clone.style.setProperty("--invoice-bg", "#ffffff");
        clone.style.setProperty("--invoice-text", "#1f2937");
        clone.style.setProperty("--invoice-text-muted", "#4b5563");
        clone.style.setProperty("--invoice-border", "#e5e7eb");
        
        clone.querySelectorAll(".no-print, button").forEach(el => el.remove());
        
        container.appendChild(clone);
        
        if (index < sheetsList.length - 1) {
            const pageBreak = document.createElement("div");
            pageBreak.className = "html2pdf__page-break";
            container.appendChild(pageBreak);
        }
    });
    
    const opt = {
        margin: [10, 10, 15, 10],
        filename: `2277_Peachtree_Dunwoody_Full_Proposal_Package.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'] }
    };
    
    html2pdf().set(opt).from(container).save().then(() => {
        showToast("PDF Package downloaded successfully!");
    }).catch(err => {
        console.error("PDF generation error: ", err);
        showToast("Failed to compile PDF document", "warning");
    });
}
