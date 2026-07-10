# 2277 N Peachtree Way - Interactive Funding Portal

This repository contains the interactive funding portal and legal/remodeling documentation binder for the property renovation at **2277 N Peachtree Way, Dunwoody, GA 30338**.

## 🚀 Features

- **Interactive Funding Dashboard:** Toggles individual remodeling line items and dynamically updates:
  - Total construction cost
  - Federal, state, and utility rebates
  - Net construction cost
  - Estimated yearly energy savings
  - Loan-to-Value (LTV) and After-Repair LTV ratios
- **Interactive Draw Schedule:** Adjusts percentages for each draw milestone, automatically recalculating the cash disbursement amounts and warning the user if the allocation does not equal exactly 100%.
- **Verification Binder & Legal Docs:** Full HTML documents and original downloadable files (.docx, .pdf, .jpg) for:
  - Detailed Remodeling Invoice (`invoice.html` / `Detailed_Remodeling_Invoice.docx`)
  - Joint Venture Operating Agreement (`operating_agreement.html` / `Draft_Operating_Agreement.docx`)
  - NOG LLC USDT + RWA Collateral System (`collateral_system.html` / `NOG_LLC_USDT_RWA_Collateral_System.pdf`)
  - Never Give a Buck Meme Certificate (`Never_Give_a_Buck_Meme_Certificate.jpg`)
- **Print / PDF Generator:** A print-ready stylesheet that automatically hides interactive elements, inputs, and sliders, formatting the proposal into a clean, professional, print-friendly layout when `Ctrl + P` or "Print/Download PDF Proposal" is triggered.

## 🛠️ Tech Stack & Hosting

- **Vanilla HTML5 & CSS3:** Utilizes modern dark mode styles, glassmorphic card layouts, and custom grid properties.
- **Vanilla JavaScript:** Responsive state management for instant mathematical updates.
- **Lucide Icons:** Clean vector icon kit.
- **Zero-Build Page Deployment:** Fully static. This repository can be hosted instantly on **GitHub Pages** or **Cloudflare Pages** by simply pointing the build to the root directory `/`.

## 📦 Pushing to GitHub

To push this repository to your newly created GitHub repository, run the following commands in the directory:

```bash
git init
git add .
git commit -m "Initial commit: Interactive funding portal, invoice details, operating agreement, and collateral system files"
git branch -M main
git remote add origin https://github.com/FTHTrading/2277.git
git push -u origin main
```
