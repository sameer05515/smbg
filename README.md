# 🌸 Shrimad Bhagwat Geeta (Angular Project)

An elegant **Angular application** presenting the eternal wisdom of the **Shrimad Bhagwat Geeta**, built with devotion and modern web technology.  
This project supports both **normal Angular** and **SSR (Server-Side Rendering)** builds and is hosted freely using **GitHub Pages**.

---

## 🚀 Live Demo
🔗 **[https://sameer05515.github.io/smbg/](https://sameer05515.github.io/smbg/)**

---

## 🧰 Tech Stack

- 🅰️ **Angular**
- ⚡ **TypeScript**
- 🎨 **TailwindCSS / CSS**
- ☁️ **GitHub Pages** (Static Hosting)
- 🧩 **PowerShell** for automated deployment

---

## 📁 Project Structure
```
ShrimadBhagwatGeeta/
├── src/                         # Angular source code
├── dist/                        # Build output after production build
│   └── smbg/
│       ├── index.html           # SPA entry (normal build)
│       └── browser/             # SSR output (if Angular Universal)
├── deploy-to-ghpages.ps1        # PowerShell deployment script
├── angular.json
├── package.json
└── README.md
```

---

## ⚙️ Build Instructions

Run this command from your project root:

```bash
ng build --configuration production --base-href "/smbg/"
```

✅ Output will be generated in:
```
dist/smbg/
```

If you are using **Angular Universal (SSR)**, your static site will be located in:
```
dist/smbg/browser/
```

---

## 🌐 Deploy to GitHub Pages

Deployment is automated using a custom **PowerShell script**.

### 🪄 One-Line Deploy
```powershell
./deploy-to-ghpages.ps1
```

This script will:
1. Build the Angular project.
2. Detect if SSR build (`/browser`) or normal build.
3. Copy correct folder to a temp clone.
4. Push contents to the `gh-pages` branch.
5. Show your live site URL after deployment.

---

## 🧰 Manual Deployment (Optional)

If you prefer manual steps:

```powershell
cd D:\my-temp
git clone https://github.com/sameer05515/smbg.git
cd smbg
git checkout gh-pages 2>$null || git checkout -b gh-pages
git rm -rf . 2>$null
xcopy "D:\GIT\unit-testing-playground\example-base-05\ShrimadBhagwatGeeta\dist\smbg\browser\*" . /s /e /y
git add .
git commit -m "🚀 Deploy Angular build"
git push -f origin gh-pages
```

✅ After that, enable Pages in GitHub:  
**Settings → Pages → Source → `gh-pages` branch → `/ (root)`**

---

## 🧘‍♂️ About

The goal of this project is to digitally present the divine teachings of the **Shrimad Bhagwat Geeta** in a simple, interactive, and responsive format — merging spirituality with modern web technologies.

Developed with ❤️ by [**Sameer**](https://github.com/sameer05515)  
Hosted freely on **GitHub Pages**  

---

## 🪷 License
This project is released under the [MIT License](LICENSE).
