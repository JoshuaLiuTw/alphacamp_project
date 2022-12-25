const express = require('express')
const app = express()
const port = 3000

const Restaurant = require('./models/Restaurant') // 載入 restaurant model
const bodyParser = require('body-parser')
// 載入 method-override
const methodOverride = require('method-override') 

// 引用路由器
const routes = require('./routes')
// 將 request 導入路由器


//載入dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

require('./config/mongoose')


// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

app.use(routes)

app.use(bodyParser.urlencoded({ extended: true }));
const exphbs = require('express-handlebars')


// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))





// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
});