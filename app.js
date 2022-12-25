const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
// 引用路由器
const routes = require('./routes')


const Restaurant = require('./models/Restaurant') // 載入 restaurant model
const bodyParser = require('body-parser')

//載入dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()}
  
require('./config/mongoose')

const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// setting static files
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

app.use(routes)
// setting template engine





// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
});