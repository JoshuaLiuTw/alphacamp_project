## Introduce

這是一個可以紀錄自己餐廳的網站，可以查看餐廳，可以查看詳細資訊。

### 功能介紹

- 查看全部的餐廳
- 點擊餐廳的圖片或名字可以瀏覽餐廳的詳細資料
- 搜尋特定的餐廳
- 新增餐廳
- 點擊圖示可以編輯餐廳資料
- 點擊圖示可以刪除餐廳
- 點擊 sort 可以選擇喜歡的排序分類
- 可以註冊帳號，需求資料有名字、email、密碼、確認密碼
- 可以透過 Facebook 註冊登入帳號
- 需要登入才能使用餐廳清單
- 登入或註冊失敗會有系統訊息

## 使用本專案

1. 先確認有安裝 Node.js 與 npm

---

2. 使用 clone 到本地資料，使用 Terminal 輸入指令

```
git clone https://github.com/kai3kai2/Restaurant-List.git
```

---

3. 安裝 npm 套件，使用 Terminal 輸入指令

```
npm install
```

---

4. 新增.env 檔案並設置資料庫連線字串，

```
MONGODB_URL=mongodb+srv://<account>:<password>@cluster0.<xxxxx>.mongodb.net/<table>?retryWrites=true&w=majority
```

---

5. 啟用前先使用 Terminal 輸入以下指令建立種子資料，看見 done 代表建立成功。

```
npm run seed
```

啟用專案: 在 Terminal 請輸入以下指令

```
npm run dev
```

---

6. 若成功運行會出現以下文字，右邊網址可以前往

```
The server is listening on http://localhost:${3000}
```

---

7. 欲暫停此專案在 Terminal 使用 :

```
ctrl + c (windows)
command + c (mac)
```

## 開發工具

- Node.js 4.16.0
- Express 4.16.4
- Express-Handlebars 3.0.0
- Bootstrap 5.2.2
- Font-awesome 6.2.0
- MongoDB
- Mongoose 6.7.2
- Bcryptjs 2.4.3
- Connect-Flash 0.1.1
- Express-Session 1.17.3
- Method-Overide 3.0.0
- Passport 0.4.1
- Passport-Local 1.0.0