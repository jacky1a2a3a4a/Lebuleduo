# 垃不垃多

<div align="center">
  <img src="https://raw.githubusercontent.com/jacky1a2a3a4a/Lebuleduo/main/public/assets/images/Lebuledou_truck_login_border.png" width="180" alt="垃不垃多圖片" />
  <br />
  <img src="https://raw.githubusercontent.com/jacky1a2a3a4a/Lebuleduo/main/public/assets/logos/logotype-customer-blue.png" width="200" alt="垃不垃多Logo" />
</div>

## 專業垃圾代收平台

[![專案網址](https://img.shields.io/badge/專案網址-lebuleduo.vercel.app-blue)](https://lebuleduo.vercel.app/)

> 別讓垃圾控制你，專人代收好安心
>
> 讓專業的團隊為您解決垃圾處理的煩惱

## 🚀 功能介紹

### 👤 使用者端

- Landing Page 品牌介紹頁（引導加入 LINE 官方帳號）
- LINE Login（快速登入平台）
- 訂閱垃圾代收方案（小資／標準／大量）
- 選擇預訂期程與收運日期（1、3、6個月／每週1～7次）
- QR Code 取得（自行列印或郵寄貼紙）
- 收運狀態追蹤（前往中 / 已抵達 / 已完成）
- 異常任務通知（如垃圾超重）
- 線上付款（整合藍新金流）
- 系統通知（透過 LINE Notify 傳送：如收運完成通知、補款提醒等）

### 🚛 代收員端

- LINE Login（使用專屬 LINE 帳號登入）
- 查看每日任務（限隔天任務）
- 瀏覽任務地點、時間、備註等資訊
- 執行收運流程（導航 → 掃 QR → 拍照紀錄 → 上傳重量）
- 任務狀態更新（前往中 / 已抵達 / 已完成）
- 查看個人排班行事曆

### 👨‍💼 後台管理員端

- 任務結單日操作（每日進行次日任務分派）
- 批量任務發派（自動分派或手動分配）

## 🧭 建議體驗流程

### 🧑‍💼 使用者端 – 建議體驗流程

1. **Landing Page → 加入 LINE**
   - 在品牌首頁了解服務特色與方案試算。
   - 點「立即預訂」→ 跳轉加入 **垃不垃多 LINE 官方帳號**。
2. **LINE Login & 快速導入平台**
   - 點擊聊天選單「登入平台」→ 完成 LINE Login，免填帳密直接進入訂閱流程。
3. **選擇方案**
   1. 在「方案預訂 Step 1」選 **小資／標準／大量**。
   2. 立即看到每次可收容量、月費與加購說明。
4. **設定期程 & 收運日**
   - Step 1 同頁面選：
     - **預訂期程**：1 / 3 / 6 個月（顯示優惠折扣）。
     - **每週固定收運日**：點選 1-5 天（即時計費）。
5. **QR Code 取得方式**
   - 「自行列印」：最快 **下單 24 h** 後開始服務。
   - 「郵寄貼紙」：系統提示 3 天寄達，開始日期自動延後。
6. **開始日期**
   - Date Picker 只能選最早可服務日；若換列印方式則自動刷新。
7. **付款**
   - Line Pay / 信用卡（藍新金流跳轉）→ 交易成功 LINE Notify 推播「訂單成立」。
8. **貼 QR → 等待收運**
   - 收到貼紙（郵寄或列印）後，把 QR Code 貼在垃圾袋上。
   - LINE Bot 自動提醒「明日 09:00-11:00 將收運」。
9. **當日收運狀態**
   - 打開「我的訂單」→ 看到今日任務進度條：**前往中 → 已抵達 → 已完成**。
   - 每一步也同步 LINE Notify 圖文訊息（含現場照片）。
10. **異常處理（如超重）**
    - 若超重：LINE 推播「垃圾稍微超量，需要補款 NT$ XX」。
    - 點「立即補款」→ 跳回平台補刷差額，完成後即解除限制。
11. **訂閱期滿前提醒**
    - 期滿前 3 天：LINE 提醒「方案將於 MM / DD 到期，可續訂享 95 折」。
    - 點「續訂」→ 直接帶入上次設定，一鍵完成付款。

### 🐶 代收員端 - 建議體驗流程

1. **LINE Login**
   - 點選「Lebu-Dog 代收員」LINE OA ➜ 一鍵登入平台。
2. **檢視隔日任務**
   - 進入「今日任務」頁 → 系統自動顯示 **當日任務總數**。
   - 點選「行事曆」只能看到 **前 1 個月排班** 與 **明天任務**，其餘日期鎖定。
3. **瀏覽任務卡片**
   - 每張卡含 時段／地址（導航按鈕）／備註。
   - 按「訂單詳情」可查看收運詳情、放置點照片。
4. **執行收運流程**
   1. 點「確認前往」→ 狀態更新為 **前往中**。
   2. 抵達後掃 QR → 秤重（自動寫入公斤數）→拍照。
   3. 上傳照片→ 點「完成收運」 → 狀態改 **已完成**，卡片滑到底會折疊收起。
5. **突發狀況**
   - 如垃圾超重：在掃碼後顯示「超重」彈窗，依指示拍照並送出；系統同步推播用戶補款。

### 🛠 後台管理員端 - 建議體驗流程

1. **系統結單 & 匯入任務**
   - 自動將隔日所有收運訂單展開為 **單次任務列表**。
   - 指標卡先顯示：未分派數 / 已分派數 / 可上工代收員數（上限 25 單/人）。
2. **檢查代收員排班**
   - 「行事曆檢視」→ 一眼看明天誰可出勤、每人目前分派量。
   - 若個人 >25 件即顯紅框，提示需調整。
3. **批量發派任務**
   - 在「每日任務」勾選全部或篩選後勾選 → 點 **批量發派**。
   - 彈窗：
     1. Tab ① **自動分派**：系統以均分 + 上限 25 規則秒排。
     2. Tab ② **手動分配**：下拉選單挑人，或點行事曆槽位拖放。
   - 確認 → 立即更新任務狀態為 **已分派**，並寫入代收員行事曆。
   - 系統同時透過 LINE Notify 推播給各代收員。
4. **當日監控**
   - 工作日（D 日）打開「任務監控」即時查看每張單的狀態條。
   - 若代收員請假 → 該日任務自動回到「待派」欄，管理員重新勾選批量分派即可。
5. **異常與補款**
   - 收到「超重」或「無垃圾」異常 ⇒ 任務標黃並列入「異常任務」分頁。

## 下載及安裝

Clone 專案

```bash
  git clone https://github.com/your-username/lebuledu.git
```

進入專案

```bash
  cd lebuledu
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
├── src/
│   ├── apis/        # API 相關
│   │   └── admin/
│   ├── assets/      # 靜態資源
│   ├── components/  # 共用元件
│   │   ├── common/
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── customer/
│   │   └── deliver/
│   ├── configs/     # 設定檔
│   ├── layouts/     # 頁面佈局
│   ├── pages/       # 頁面元件
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── customer/
│   │   └── deliver/
│   ├── routes/      # 路由設定
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── customer/
│   │   └── deliver/
│   ├── services/    # 服務層
│   ├── styles/      # 樣式檔案
│   ├── types/       # TypeScript 型別定義
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── customer/
│   │   └── deliver/
│   ├── utils/       # 工具函數
│   ├── App.tsx      # 主應用程式
│   └── main.tsx     # 入口檔案
├── .gitignore       # Git 忽略檔案
├── .vercelignore    # Vercel 忽略檔案
├── dist/            # 建置輸出目錄
├── node_modules/    # 依賴套件
├── vercel.json      # Vercel 設定
├── vite.config.ts   # Vite 設定
├── tsconfig.json    # TypeScript 設定
├── package.json     # 專案設定
└── README.md        # 專案說明文件
```

## 元件結構

專案採用三件套的元件結構，每個元件都包含以下三個檔案：

```
└── component/
    ├── index.tsx    # 元件主體
    ├── styles.ts    # 樣式定義
    └── types.ts     # 型別定義
```

這種結構確保了：

- 元件的獨立性和封裝性
- 清晰的職責分離
- 易於維護和擴展

## 開發環境與技術

### UI設計

#### 前期發想

<img alt="miro" src="https://img.shields.io/badge/miro-FFD02F?style=for-the-badge&logo=miro&logoColor=black" />
<img alt="v0" src="https://img.shields.io/badge/v0-000000?style=for-the-badge&logo=v0&logoColor=white" />
<img alt="lovable" src="https://img.shields.io/badge/lovable-FF69B4?style=for-the-badge&logo=lovable&logoColor=white" />
<img alt="gpt" src="https://img.shields.io/badge/gpt-10A37F?style=for-the-badge&logo=openai&logoColor=white" />
<img alt="claude" src="https://img.shields.io/badge/claude-FFA500?style=for-the-badge&logo=anthropic&logoColor=white" />

#### 設計工具

<img src="https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white" />
<img alt="canva" src="https://img.shields.io/badge/canva-00C4CC?style=for-the-badge&logo=canva&logoColor=white" />
<img alt="react-icons" src="https://img.shields.io/badge/react--icons-E91E63?style=for-the-badge&logo=react&logoColor=white" />

#### 團隊協作/任務管理

<img src="https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white" />

### 前端技術

#### JavaScript 框架與工具

<img alt="javascript" src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
<img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img alt="Vite" src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" />

#### 樣式管理

<img alt="styled-components" src="https://img.shields.io/badge/styled--components-db7093?style=for-the-badge&logo=styled-components&logoColor=white" />

#### 版本控制

<img alt="React Router" src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />

#### 地圖功能

<img alt="Google Maps" src="https://img.shields.io/badge/Google%20Maps-4285F4?style=for-the-badge&logo=google-maps&logoColor=white" />

#### 掃描功能

<img alt="React QR Scanner" src="https://img.shields.io/badge/React%20QR%20Scanner-61DAFB?style=for-the-badge&logo=react&logoColor=white" />

#### 部署平台

<img alt="Vercel" src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />

#### 程式碼品質

<img alt="ESLINT" src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white" />
<img alt="PRETTIER" src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E" />

#### API 測試與溝通

<img alt="postman" src="https://img.shields.io/badge/postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" />
<img src="https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white" />

#### AI 協作

<img alt="claude" src="https://img.shields.io/badge/claude-FFA500?style=for-the-badge&logo=anthropic&logoColor=white" />

### 後端技術

#### 後端框架及語言

<img src="https://img.shields.io/badge/c%23-%23239120.svg?style=for-the-badge&logo=csharp&logoColor=white" />
<img src="https://img.shields.io/badge/.NET-5C2D91?style=for-the-badge&logo=.net&logoColor=white" />

#### 資料庫

<img src="https://img.shields.io/badge/Microsoft%20SQL%20Server-CC2927?style=for-the-badge&logo=microsoft%20sql%20server&logoColor=white" />

#### 雲端 & 伺服器

<img src="https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&logo=microsoftazure&logoColor=white" />

## Git Flow

### Branch 命名規範

| Category              | Issue Label | example 範例      |
| --------------------- | ----------- | ----------------- |
| feature-[branch name] | Feature     | feat-qr-scanner   |
| update-[branch name]  | Improvement | update-camera-ui  |
| fix-[branch name]     | Bug         | fix-map-location  |
| hotfix-[branch name]  | Hotfix      | hotfix-upload-api |

### Commit Message 規範

| Type 類型 | Usage 格式       | example 範例                                   |
| --------- | ---------------- | ---------------------------------------------- |
| 新增功能  | feat (scope)     | feat(camera): add camera preview functionality |
| 修補錯誤  | fix (scope)      | fix(map): correct location marker position     |
| 更新事項  | update (scope)   | update(ui): improve QR scanner interface       |
| 重構代碼  | refactor (scope) | refactor(api): optimize data fetching logic    |
