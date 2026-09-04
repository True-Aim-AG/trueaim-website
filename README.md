# True Aim Website

Welcome! This guide will help you make changes to the True Aim website, even if you've never worked with code before.

> **Design & branding:** Colours, typography, spacing, and component rules live in [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md), the single source of truth for the True Aim brand on this site.

## Table of Contents

1. [One-Time Setup](#one-time-setup)
2. [Getting the Code](#getting-the-code)
3. [Making Text Changes](#making-text-changes)
4. [Viewing Your Changes Locally](#viewing-your-changes-locally)
5. [Submitting Your Changes](#submitting-your-changes)

---

## One-Time Setup

Before you start, you'll need to install two programs on your computer.

### Step 1: Install Node.js

Node.js is the software that runs the website on your computer.

1. Go to [nodejs.org](https://nodejs.org/)
2. Download the **LTS** version (the one that says "Recommended for Most Users")
3. Run the installer and follow the prompts (accept all defaults)

To verify it installed correctly:
- Open **Command Prompt** (Windows) or **Terminal** (Mac)
- Type `node --version` and press Enter
- You should see a version number like `v20.x.x`

### Step 2: Install Git

Git is the tool that lets you download and upload code changes.

1. Go to [git-scm.com/downloads](https://git-scm.com/downloads)
2. Download and install for your operating system
3. During installation, accept all default options

To verify it installed correctly:
- Open a new **Command Prompt** or **Terminal** window
- Type `git --version` and press Enter
- You should see something like `git version 2.x.x`

### Step 3: Install Visual Studio Code (Recommended)

VS Code is a free text editor that makes editing code easier.

1. Go to [code.visualstudio.com](https://code.visualstudio.com/)
2. Download and install for your operating system

---

## Getting the Code

### First Time Only: Clone the Repository

"Cloning" downloads a copy of the code to your computer.

1. Open **Command Prompt** (Windows) or **Terminal** (Mac)

2. Navigate to where you want to store the project:
   ```
   cd Documents
   ```

3. Clone the repository:
   ```
   git clone https://github.com/Fr3nn3r/TrueAIm.ai.git
   ```

4. Move into the project folder:
   ```
   cd TrueAIm.ai
   ```

5. Install the project dependencies (this downloads extra code the website needs):
   ```
   npm install
   ```
   This may take a few minutes.

### Returning Users: Get the Latest Changes

Before making any edits, always get the latest version:

```
cd Documents/TrueAIm.ai
git pull origin main
```

---

## Making Text Changes

### Where to Find the Website Text

The website text lives in two places:

**1. Reference Copy Document:**
```
docs/TrueAim_Website_Copy.md
```
This contains the master copy for reference, but changes here won't appear on the website.

**2. Actual Page Files (where changes take effect):**
```
src/app/page.tsx                         - Home page
src/app/company/page.tsx                 - Company/About page
src/app/technology/page.tsx              - Technology page
src/app/contact/page.tsx                 - Contact page
src/app/products/mira/page.tsx           - MIRA product page
src/app/products/claimeval/page.tsx      - ClaimEval product page
src/app/products/contextbuilder/page.tsx - ContextBuilder product page
src/app/case-studies/page.tsx            - Case Studies page
src/app/trust/page.tsx                   - Trust & Security page
src/app/roi-calculator/page.tsx          - ROI Calculator page
```

### How to Edit Text

1. **Open the project in VS Code:**
   - Open VS Code
   - Click **File > Open Folder**
   - Navigate to and select the `TrueAIm.ai` folder

2. **Find the file you want to edit:**
   - Use the file explorer on the left side
   - Navigate to `src/app/` and find the page you want to change

3. **Make your text changes:**
   - Look for text inside quotation marks `"like this"` or `'like this'`
   - Edit the text carefully, keeping the quotation marks intact

   **Example - Before:**
   ```
   <h1>Neuro-Symbolic AI for Auditable Claims</h1>
   ```

   **Example - After:**
   ```
   <h1>Your New Headline Text Goes Here</h1>
   ```

4. **Save your changes:**
   - Press `Ctrl+S` (Windows) or `Cmd+S` (Mac)

### Important Tips

- **Don't delete or change anything that looks like code** (things with `<`, `>`, `{`, `}`, etc.)
- **Only change the text between quotation marks**
- **Keep special characters:** If you see `&amp;` don't change it to `&`
- **Line breaks:** Use `<br />` if you need a line break within text

---

## Viewing Your Changes Locally

After making changes, you'll want to see how they look on the website.

### Starting the Local Server

1. Open **Command Prompt** or **Terminal**

2. Navigate to the project:
   ```
   cd Documents/TrueAIm.ai
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Wait for a message that says something like:
   ```
   ✓ Ready in 2.3s
   - Local: http://localhost:3000
   ```

5. **Open your web browser** and go to: **http://localhost:3000**

You should now see the website running on your computer!

### Seeing Your Changes

- **Changes appear automatically:** After you save a file, the browser will refresh and show your changes
- **If changes don't appear:** Try refreshing the page manually (`Ctrl+R` or `Cmd+R`)

### Stopping the Server

When you're done reviewing:
- Go back to your Command Prompt/Terminal
- Press `Ctrl+C` to stop the server

---

## Submitting Your Changes

Once you're happy with your changes, you need to submit them for review. This is called creating a "Pull Request" (PR).

### Step 1: Create a New Branch

A "branch" is like a separate copy where your changes live until they're approved.

```
git checkout -b your-name/description-of-change
```

**Example:**
```
git checkout -b sarah/update-homepage-headline
```

Use lowercase letters, numbers, and hyphens only. No spaces.

### Step 2: Stage Your Changes

This tells Git which files you want to include:

```
git add .
```

The `.` means "all changed files."

### Step 3: Commit Your Changes

A "commit" saves your changes with a description:

```
git commit -m "Brief description of what you changed"
```

**Example:**
```
git commit -m "Update homepage headline and company description"
```

### Step 4: Push to GitHub

This uploads your changes to GitHub:

```
git push origin your-name/description-of-change
```

**Example:**
```
git push origin sarah/update-homepage-headline
```

### Step 5: Create the Pull Request

1. Go to [github.com/Fr3nn3r/TrueAIm.ai](https://github.com/Fr3nn3r/TrueAIm.ai) in your browser

2. You should see a yellow banner saying your branch was recently pushed, with a **"Compare & pull request"** button. Click it.

   If you don't see the banner:
   - Click the **"Pull requests"** tab
   - Click the green **"New pull request"** button
   - Select your branch from the "compare" dropdown

3. Fill in the details:
   - **Title:** Brief summary of changes (e.g., "Update homepage headline")
   - **Description:** Explain what you changed and why

4. Click **"Create pull request"**

### Step 6: Wait for Review

Someone on the team will review your changes. They may:
- **Approve and merge** - Your changes go live!
- **Request changes** - They'll leave comments explaining what to adjust

---

## Quick Reference Commands

| What you want to do | Command |
|---------------------|---------|
| Get latest code | `git pull origin main` |
| Start the website locally | `npm run dev` |
| Stop the local website | `Ctrl+C` |
| Create a new branch | `git checkout -b branch-name` |
| Stage all changes | `git add .` |
| Commit changes | `git commit -m "message"` |
| Push changes | `git push origin branch-name` |
| Switch to main branch | `git checkout main` |
| See changed files | `git status` |

---

## Troubleshooting

### "Command not found: git" or "Command not found: node"
- Make sure you've installed Git and Node.js (see One-Time Setup)
- Try closing and reopening your terminal/command prompt

### "npm install" shows errors
- Make sure you're in the correct folder (`cd TrueAIm.ai`)
- Try deleting `node_modules` folder and running `npm install` again

### Website looks broken after my changes
- Check that you didn't accidentally delete any quotation marks or brackets
- Undo your last change: `Ctrl+Z` (Windows) or `Cmd+Z` (Mac) in VS Code
- Save the file and check again

### Changes aren't appearing in the browser
- Make sure you saved the file
- Try refreshing the browser
- Make sure the dev server is still running

### "Your branch is behind main"
Run these commands to update:
```
git checkout main
git pull origin main
git checkout your-branch-name
git merge main
```

---

## Need Help?

If you get stuck, reach out to the development team with:
1. What you were trying to do
2. The exact error message (copy and paste it)
3. Which file you were editing
