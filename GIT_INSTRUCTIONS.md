# Git Repository Setup & Push Guide

Your local Git repository is initialized, configured, and committed on branch `main`.

---

## How to Push to GitHub / GitLab

### Step 1: Create a new repository on GitHub
1. Go to [https://github.com/new](https://github.com/new)
2. Enter repository name: `one-school-solution` (or your preferred name)
3. Leave **"Add a README file"**, **".gitignore"**, and **"license"** **UNCHECKED** (we already created them)
4. Click **Create repository**

### Step 2: Push your local code to GitHub
Open your terminal in this project folder (`e:\ajay\Project files\school landing`) and run:

```bash
# 1. Link to your GitHub repository (replace with your repository URL)
git remote add origin https://github.com/<your-username>/<your-repo-name>.git

# 2. Ensure you are on branch main
git branch -M main

# 3. Push all files to GitHub
git push -u origin main
```

---

## Included Git Files

- **`.gitignore`**: Excludes `node_modules/`, `.env`, temporary logs, scratch files, and OS cache files.
- **`README.md`**: Complete documentation covering features, tech stack, quick start guide, directory map, and contact information.
- **`.env.example`**: Clean environment template for email configuration.
