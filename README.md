<div align="center" >
  <img src="public/logo.png" width="200" alt="垃不垃多LOGO" />
</div>
<h1 align="center" style="font-weight: 700">垃不垃多｜QR Code 掃描系統</h1>
<div align="center" >
<a href="https://lebu-leduo.vercel.app/" >專案網址</a >
</div>
<p align="center" >快速掃描，輕鬆管理</p>

## 功能介紹

**► 使用者功能**

- QR Code 掃描
- 相機拍照
- 地圖定位
- 日曆選擇
- 資料上傳
- 即時預覽

## 下載及安裝

Clone 專案

```bash
  git clone https://github.com/your-username/lebu-leduo.git
```

進入專案

```bash
  cd lebu-leduo
```

安裝套件

```bash
  pnpm install
```

啟動專案

```bash
  pnpm dev
```

## 資料夾結構

```
.
├── public/           # 靜態資源
│   ├── images/      # 圖片資源
│   └── fonts/       # 字型檔案
│
├── src/
│   ├── apis/        # API 相關
│   │   ├── auth.ts  # 認證相關 API
│   │   └── data.ts  # 資料相關 API
│   │
│   ├── assets/      # 靜態資源
│   │   ├── icons/   # 圖示
│   │   └── images/  # 圖片
│   │
│   ├── components/  # 共用元件
│   │   ├── common/  # 通用元件
│   │   ├── forms/   # 表單元件
│   │   └── layout/  # 佈局元件
│   │
│   ├── configs/     # 設定檔
│   │   ├── api.ts   # API 設定
│   │   └── theme.ts # 主題設定
│   │
│   ├── layouts/     # 頁面佈局
│   │   ├── MainLayout.tsx
│   │   └── AuthLayout.tsx
│   │
│   ├── pages/       # 頁面元件
│   │   ├── Home/    # 首頁
│   │   ├── Scanner/ # 掃描頁面
│   │   └── Map/     # 地圖頁面
│   │
│   ├── routes/      # 路由設定
│   │   ├── index.ts
│   │   └── types.ts
│   │
│   ├── services/    # 服務層
│   │   ├── auth.ts  # 認證服務
│   │   └── map.ts   # 地圖服務
│   │
│   ├── styles/      # 樣式檔案
│   │   ├── global.ts
│   │   └── theme.ts
│   │
│   ├── types/       # TypeScript 型別定義
│   │   ├── api.ts
│   │   └── common.ts
│   │
│   ├── utils/       # 工具函數
│   │   ├── date.ts
│   │   ├── format.ts
│   │   └── validation.ts
│   │
│   ├── App.tsx      # 主應用程式
│   └── main.tsx     # 入口檔案
│
├── .vscode/         # VS Code 設定
├── dist/            # 建置輸出目錄
├── node_modules/    # 依賴套件
├── .gitignore       # Git 忽略檔案
├── .vercelignore    # Vercel 忽略檔案
├── vercel.json      # Vercel 設定
├── vite.config.ts   # Vite 設定
├── tsconfig.json    # TypeScript 設定
├── package.json     # 專案設定
└── README.md        # 專案說明文件
```

## 開發環境

<h2 align="center">UI設計</h2>

<img alt="miro" src="https://img.shields.io/badge/miro-FFD02F?style=for-the-badge&logo=miro&logoColor=black" />
<img src="https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white" />
<img alt="react-icons" src="https://img.shields.io/badge/react--icons-E91E63?style=for-the-badge&logo=react&logoColor=white" />
<img src="https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white" />
<img alt="canva" src="https://img.shields.io/badge/canva-00C4CC?style=for-the-badge&logo=canva&logoColor=white" />

> **前期發想**

- **Miro**

> **設計工具:**

- **Figma**
- **Canva**
- **react-icons**

> **團隊協作/任務管理**

- **Notion**

<h2 align="center">前端技術</h2>

<img alt="javascript" src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
<img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img alt="Vite" src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" />
<img alt="styled-components" src="https://img.shields.io/badge/styled--components-db7093?style=for-the-badge&logo=styled-components&logoColor=white" />
<img alt="React Router" src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />
<img alt="Google Maps" src="https://img.shields.io/badge/Google%20Maps-4285F4?style=for-the-badge&logo=google-maps&logoColor=white" />
<img alt="Vercel" src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
<img alt="ESLINT" src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white" />
<img alt="PRETTIER" src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E" />
<img alt="React-Hook-Form" src="https://img.shields.io/badge/react--hook--form-EC5990?style=for-the-badge&logo=react-hook-form&logoColor=white" />
<img alt="postman" src="https://img.shields.io/badge/postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" />

> **JavaScript 框架與工具:**

- **TypeScript**
- **React.js**
- **Vite**

> **樣式管理:**

- **styled-components**

> **版本控制:**

- **Git / GitHub**

> **表單管理:**

- **React Hook Form**

> **地圖功能:**

- **Google Maps API**

> **部署平台:**

- **Vercel**

> **程式碼品質:**

- **ESLint**
- **Prettier**

> **API 測試:**

- **Postman**

<h2 align="center">後端技術</h2>

<img src="https://img.shields.io/badge/c%23-%23239120.svg?style=for-the-badge&logo=csharp&logoColor=white" />
<img src="https://img.shields.io/badge/Microsoft%20SQL%20Server-CC2927?style=for-the-badge&logo=microsoft%20sql%20server&logoColor=white" />
<img src="https://img.shields.io/badge/.NET-5C2D91?style=for-the-badge&logo=.net&logoColor=white" />
<img src="https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&logo=microsoftazure&logoColor=white" />

> **後端框架及語言:**

- **C# (.NET Framework)**
- **.NET Framework Web API**
- **RESTful API**

> **資料庫:**

- **MSSQL**

> **雲端 & 伺服器:**

- **Azure VM**

## Git Flow

<h2>Branch 命名規範 </h2>

| Category              | Issue Label | example 範例      |
| --------------------- | ----------- | ----------------- |
| feature-[branch name] | Feature     | feat-qr-scanner   |
| update-[branch name]  | Improvement | update-camera-ui  |
| fix-[branch name]     | Bug         | fix-map-location  |
| hotfix-[branch name]  | Hotfix      | hotfix-upload-api |

<h2>Commit Message 規範</h2>

| Type 類型 | Usage 格式       | example 範例                                   |
| --------- | ---------------- | ---------------------------------------------- |
| 新增功能  | feat (scope)     | feat(camera): add camera preview functionality |
| 修補錯誤  | fix (scope)      | fix(map): correct location marker position     |
| 更新事項  | update (scope)   | update(ui): improve QR scanner interface       |
| 重構代碼  | refactor (scope) | refactor(api): optimize data fetching logic    |
