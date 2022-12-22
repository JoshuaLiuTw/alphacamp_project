const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const Restaurant = require('./models/Restaurant') // 載入 restaurant model
const bodyParser = require('body-parser')

//載入dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.use(bodyParser.urlencoded({ extended: true }))
const exphbs = require('express-handlebars')


// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// 將資料傳給 index 樣版
app.get('/', (req, res) => {
  Restaurant.find() // 
    .lean() // 
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

//新增餐廳
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  return Restaurant.create(req.body)//將資料傳回資料庫
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


//搜尋餐廳
app.get('/search', (req, res) => {

  if (!req.query.keyword) {
    return res.redirect("/")
  }

  const keyword = req.query.keyword.trim().toLowerCase()

  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword) || restaurant.category.includes(keyword)
  })

  res.render('index', { restaurants: restaurants })
})

//
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})