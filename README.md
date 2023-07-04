# react-news-api
專案：https://react-news-api-puce.vercel.app/

此新聞網站使用 React 框架建置以及串接 [News API](https://newsapi.org/) 製作而成，感謝您的閱覽。

版型參考：
- https://preview.colorlib.com/#world
- https://preview.colorlib.com/#avision


---
### Environment - 環境建置
1. nvm(Windows)

[nvm-windows](https://github.com/coreybutler/nvm-windows/releases)，點擊`nvm-setup.zip`下載安裝。開啟終端機(Terminal)，輸入下述指令以確定安裝成功。
```
nvm version
```

2. Node.js

開啟終端機(Terminal)，輸入下述指令查看可安裝的Node.js的版本。下載並使用Node.js，這裡下載14.18.1版本。
```
nvm list available
nvm install 14.18.1
nvm use 14.18.1
```

---
### Installing - 專案建置
1.開啟終端機(Terminal)，Clone 此專案至本機電腦。
```
git clone https://github.com/b10332040/react-news-api.git
```

2.進入專案資料夾。
```
cd [專案資料夾]
```

3.下載相關套件。
```
npm install
```

4.去 [News API](https://newsapi.org/) 申請 Api key。

5.在更目錄下建立 .env 檔，並設定 VITE_NEWS_API_KEY
```
VITE_NEWS_API_KEY= {貼上在 News API 申請到的 api key}
```

6.啟動專案
```
npm run dev
```