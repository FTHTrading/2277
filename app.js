// Initialize Lucide Icons
lucide.createIcons();

// Zestimate and ARV values
const ZESTIMATE = 524500;
const BASE_ARV = 725000;

// Renovation Line Items from Invoice & Proposal
const RENO_ITEMS = [
  { id: 'item-1', name: 'Kitchen Remodel (cabinetry, countertops, fixtures)', baseCost: 25257, isEnergy: false, rebate: 0, saving: 0, selected: true },
  { id: 'item-2', name: '3-Bathroom Tile & Repaint', baseCost: 15350, isEnergy: false, rebate: 0, saving: 0, selected: true },
  { id: 'item-3', name: 'Basement Floor & Carpet with Hardwood', baseCost: 7500, isEnergy: false, rebate: 0, saving: 0, selected: true },
  { id: 'item-4', name: 'Painting Entire House (Interior)', baseCost: 14500, isEnergy: false, rebate: 0, saving: 0, selected: true },
  { id: 'item-5', name: 'Replace Driveway (Concrete)', baseCost: 13500, isEnergy: false, rebate: 0, saving: 0, selected: true },
  { id: 'item-6', name: 'Remove Mold from Basement Walls', baseCost: 3500, isEnergy: false, rebate: 0, saving: 0, selected: true },
  { id: 'item-7', name: 'Remove Mold from Garage', baseCost: 2500, isEnergy: false, rebate: 0, saving: 0, selected: true },
  { id: 'item-8', name: 'Replace Laundry Room Walls/Floors (Tiling)', baseCost: 7250, isEnergy: false, rebate: 0, saving: 0, selected: true },
  { id: 'item-9', name: 'Upgrade Wood Floors Throughout House', baseCost: 13500, isEnergy: false, rebate: 0, saving: 0, selected: true },
  { id: 'item-10', name: 'Remove Trees Outside, Yard Cleanup & Haul', baseCost: 8500, isEnergy: false, rebate: 0, saving: 0, selected: true },
  { id: 'item-11', name: 'Replace Gutters & Downspouts', baseCost: 5000, isEnergy: false, rebate: 0, saving: 0, selected: true },
  { id: 'item-12', name: 'Install New Soffit (HardiePlank)', baseCost: 8500, isEnergy: false, rebate: 0, saving: 0, selected: true },
  { id: 'item-13', name: 'Install Hand Rails (Staircases)', baseCost: 1500, isEnergy: false, rebate: 0, saving: 0, selected: true },
  { id: 'item-14', name: 'Basement Wall Water Leak Remediation', baseCost: 7500, isEnergy: false, rebate: 0, saving: 0, selected: true },
  // Energy Upgrade items
  { id: 'item-15', name: 'HVAC Heat Pump Conversion (Energy Star)', baseCost: 8500, isEnergy: true, rebate: 8000, saving: 450, selected: true },
  { id: 'item-16', name: 'Smart Panel & Heavy Load Wiring', baseCost: 5500, isEnergy: true, rebate: 5500, saving: 0, selected: true },
  { id: 'item-17', name: 'Crawl Space Insulation, Sealing & Vapor Barrier', baseCost: 3850, isEnergy: true, rebate: 1600, saving: 180, selected: true },
  { id: 'item-18', name: 'Hybrid Heat Pump Water Heater', baseCost: 5500, isEnergy: true, rebate: 1750, saving: 330, selected: true },
  { id: 'item-19', name: 'Energy Star Replacement Windows (Double-Pane Low-E)', baseCost: 22000, isEnergy: true, rebate: 4000, saving: 320, selected: true },
  { id: 'item-20', name: 'Whole-House LED Lighting Conversion', baseCost: 0, isEnergy: true, rebate: 0, saving: 150, selected: true },
  { id: 'item-21', name: 'Energy Star Cool Roof Shingles (Solar Reflective)', baseCost: 24000, isEnergy: true, rebate: 0, saving: 210, selected: true }
];

// Default Draw Schedule
const DEFAULT_DRAWS = [
  { id: 'draw-1', phase: 'Initial Mobilization & Deposits', pct: 25 },
  { id: 'draw-2', phase: 'Rough-ins & Demolition', pct: 30 },
  { id: 'draw-3', phase: 'External & Structural Completion', pct: 25 },
  { id: 'draw-4', phase: 'Finishes, Hardwoods & Handover', pct: 20 }
];

let draws = JSON.parse(JSON.stringify(DEFAULT_DRAWS));
let activeFilter = 'all';

// DOM Elements
const itemsTbody = document.getElementById('items-tbody');
const chkToggleAll = document.getElementById('chk-toggle-all');
const btnFilterAll = document.getElementById('btn-filter-all');
const btnFilterEnergy = document.getElementById('btn-filter-energy');
const btnResetDraws = document.getElementById('btn-reset-draws');
const btnPrintProposal = document.getElementById('btn-print-proposal');

// Metrics DOM Elements
const valTotalCost = document.getElementById('val-total-cost');
const valTotalRebate = document.getElementById('val-total-rebate');
const valNetCost = document.getElementById('val-net-cost');
const valYearlySaving = document.getElementById('val-yearly-saving');
const valBaseLtv = document.getElementById('val-base-ltv');
const valArLtv = document.getElementById('val-ar-ltv');
const barBaseLtv = document.getElementById('bar-base-ltv');
const barArLtv = document.getElementById('bar-ar-ltv');

// Draw Schedule DOM Elements
const drawsContainer = document.getElementById('draws-container');
const drawTotalPctVal = document.getElementById('draw-total-pct-val');
const drawTotalAmtVal = document.getElementById('draw-total-amt-val');
const drawErrorBanner = document.getElementById('draw-error-banner');
const drawCurrentTotalPct = document.getElementById('draw-current-total-pct');

// Formatter utilities
function formatCurrency(val) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
}

function formatCurrencyDetailed(val) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val);
}

// Populate the Line Items Table
function populateTable() {
  itemsTbody.innerHTML = '';
  
  const itemsToRender = activeFilter === 'all' 
    ? RENO_ITEMS 
    : RENO_ITEMS.filter(item => item.isEnergy);

  itemsToRender.forEach(item => {
    const tr = document.createElement('tr');
    tr.className = `item-row ${item.selected ? '' : 'excluded'}`;
    tr.id = `row-${item.id}`;
    
    // Checkbox cell
    const tdCheck = document.createElement('td');
    const chk = document.createElement('input');
    chk.type = 'checkbox';
    chk.checked = item.selected;
    chk.addEventListener('change', () => toggleItem(item.id, chk.checked));
    tdCheck.appendChild(chk);
    
    // Name cell with Badge
    const tdName = document.createElement('td');
    tdName.textContent = item.name;
    if (item.isEnergy) {
      const badge = document.createElement('span');
      badge.className = 'badge-energy';
      badge.innerHTML = '<i data-lucide="zap" style="width: 10px; height: 10px; display: inline-block; vertical-align: middle; margin-right: 2px;"></i> Energy Star';
      tdName.appendChild(badge);
    }
    
    // Cost details cells
    const tdBaseCost = document.createElement('td');
    tdBaseCost.className = 'font-mono';
    tdBaseCost.textContent = formatCurrency(item.baseCost);
    
    const tdRebate = document.createElement('td');
    tdRebate.className = 'font-mono text-blue';
    tdRebate.textContent = item.rebate > 0 ? `-${formatCurrency(item.rebate)}` : '—';
    
    const tdNet = document.createElement('td');
    tdNet.className = 'font-mono';
    const netVal = item.baseCost - item.rebate;
    tdNet.textContent = formatCurrency(netVal);
    
    const tdSaving = document.createElement('td');
    tdSaving.className = 'font-mono text-yellow';
    tdSaving.textContent = item.saving > 0 ? `$${item.saving}/yr` : '—';
    
    tr.appendChild(tdCheck);
    tr.appendChild(tdName);
    tr.appendChild(tdBaseCost);
    tr.appendChild(tdRebate);
    tr.appendChild(tdNet);
    tr.appendChild(tdSaving);
    
    itemsTbody.appendChild(tr);
  });
  
  lucide.createIcons();
}

// Toggle an item's selected status
function toggleItem(id, selected) {
  const item = RENO_ITEMS.find(i => i.id === id);
  if (item) {
    item.selected = selected;
    
    // Update visual styling immediately
    const row = document.getElementById(`row-${id}`);
    if (row) {
      if (selected) {
        row.classList.remove('excluded');
      } else {
        row.classList.add('excluded');
      }
    }
    
    // Update global state & calculations
    recalculate();
  }
}

// Toggle all items
chkToggleAll.addEventListener('change', (e) => {
  const checked = e.target.checked;
  const itemsToToggle = activeFilter === 'all' 
    ? RENO_ITEMS 
    : RENO_ITEMS.filter(item => item.isEnergy);
    
  itemsToToggle.forEach(item => {
    item.selected = checked;
  });
  
  populateTable();
  recalculate();
});

// Financial Recalculation
function recalculate() {
  let totalCost = 0;
  let totalRebate = 0;
  let yearlySaving = 0;
  
  RENO_ITEMS.forEach(item => {
    if (item.selected) {
      totalCost += item.baseCost;
      totalRebate += item.rebate;
      yearlySaving += item.saving;
    }
  });
  
  const netCost = totalCost - totalRebate;
  
  // Calculate LTVs
  const baseLtvVal = ((totalCost / ZESTIMATE) * 100).toFixed(1);
  const arLtvVal = ((totalCost / BASE_ARV) * 100).toFixed(1);
  
  // Update Metrics Dashboard
  valTotalCost.textContent = formatCurrency(totalCost);
  valTotalRebate.textContent = totalRebate > 0 ? `-${formatCurrency(totalRebate)}` : '$0';
  valNetCost.textContent = formatCurrency(netCost);
  valYearlySaving.textContent = `$${yearlySaving}/yr`;
  valBaseLtv.textContent = `${baseLtvVal}%`;
  valArLtv.textContent = `${arLtvVal}%`;
  
  barBaseLtv.style.width = `${Math.min(baseLtvVal, 100)}%`;
  barArLtv.style.width = `${Math.min(arLtvVal, 100)}%`;
  
  // Update Draw Schedule amounts
  updateDrawAmounts(totalCost);
}

// Populate the Draw Schedule section
function populateDrawSchedule() {
  drawsContainer.innerHTML = '';
  
  draws.forEach((draw, index) => {
    const div = document.createElement('div');
    div.className = 'draw-item';
    
    const meta = document.createElement('div');
    meta.className = 'draw-meta';
    
    const title = document.createElement('span');
    title.className = 'draw-title';
    title.textContent = `Draw #${index + 1}: ${draw.phase}`;
    
    const values = document.createElement('div');
    values.className = 'draw-values';
    
    const badge = document.createElement('span');
    badge.className = 'draw-pct-badge';
    badge.id = `badge-draw-${index}`;
    badge.textContent = `${draw.pct}%`;
    
    const amt = document.createElement('span');
    amt.className = 'draw-amount font-mono text-cyan';
    amt.id = `amt-draw-${index}`;
    amt.textContent = '$0.00';
    
    values.appendChild(badge);
    values.appendChild(amt);
    meta.appendChild(title);
    meta.appendChild(values);
    
    const sliderRow = document.createElement('div');
    sliderRow.className = 'draw-slider-row';
    
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0';
    slider.max = '100';
    slider.className = 'draw-slider';
    slider.value = draw.pct;
    slider.addEventListener('input', (e) => updateDrawPct(index, parseInt(e.target.value), 'slider'));
    
    const input = document.createElement('input');
    input.type = 'number';
    input.min = '0';
    input.max = '100';
    input.className = 'draw-input';
    input.value = draw.pct;
    input.addEventListener('input', (e) => {
      const val = parseInt(e.target.value) || 0;
      updateDrawPct(index, val, 'input');
    });
    
    sliderRow.appendChild(slider);
    sliderRow.appendChild(input);
    
    div.appendChild(meta);
    div.appendChild(sliderRow);
    
    drawsContainer.appendChild(div);
  });
}

// Update individual draw percentages
function updateDrawPct(index, value, trigger) {
  // Bounded check
  value = Math.max(0, Math.min(100, value));
  draws[index].pct = value;
  
  // Sync sliders and inputs
  const drawItems = drawsContainer.children;
  if (drawItems[index]) {
    const slider = drawItems[index].querySelector('.draw-slider');
    const input = drawItems[index].querySelector('.draw-input');
    const badge = document.getElementById(`badge-draw-${index}`);
    
    if (trigger === 'slider') {
      input.value = value;
    } else {
      slider.value = value;
    }
    badge.textContent = `${value}%`;
  }
  
  // Calculate total cost
  let totalCost = 0;
  RENO_ITEMS.forEach(item => {
    if (item.selected) totalCost += item.baseCost;
  });
  
  updateDrawAmounts(totalCost);
}

// Update Draw schedule dollar amounts and display errors
function updateDrawAmounts(totalCost) {
  let totalPct = 0;
  
  draws.forEach((draw, index) => {
    totalPct += draw.pct;
    const amt = (draw.pct / 100) * totalCost;
    const amtSpan = document.getElementById(`amt-draw-${index}`);
    if (amtSpan) {
      amtSpan.textContent = formatCurrencyDetailed(amt);
    }
  });
  
  // Update Draw summary
  drawTotalPctVal.textContent = `${totalPct}%`;
  drawTotalAmtVal.textContent = formatCurrencyDetailed(totalCost);
  
  // Verify 100% total
  if (totalPct === 100) {
    drawTotalPctVal.className = 'text-green';
    drawErrorBanner.classList.add('hidden');
  } else {
    drawTotalPctVal.className = 'text-red';
    drawCurrentTotalPct.textContent = `${totalPct}%`;
    drawErrorBanner.classList.remove('hidden');
  }
}

// Filter line items
btnFilterAll.addEventListener('click', () => {
  btnFilterAll.classList.add('active');
  btnFilterEnergy.classList.remove('active');
  activeFilter = 'all';
  populateTable();
});

btnFilterEnergy.addEventListener('click', () => {
  btnFilterEnergy.classList.add('active');
  btnFilterAll.classList.remove('active');
  activeFilter = 'energy';
  populateTable();
});

// Reset Draws to defaults
btnResetDraws.addEventListener('click', () => {
  draws = JSON.parse(JSON.stringify(DEFAULT_DRAWS));
  populateDrawSchedule();
  
  let totalCost = 0;
  RENO_ITEMS.forEach(item => {
    if (item.selected) totalCost += item.baseCost;
  });
  updateDrawAmounts(totalCost);
});

// Print trigger
btnPrintProposal.addEventListener('click', () => {
  window.print();
});

// Initialize dashboard
populateTable();
populateDrawSchedule();
recalculate();
