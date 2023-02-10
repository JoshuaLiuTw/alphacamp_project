// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Restaurant model
const Restaurant = require('../../models/Restaurant')

//新增餐廳
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const restaurant_id = req.body._id
  const userId = req.user._id
  const { name, name_en, category, location, phone, image, google_map, description, rating } = req.body
  return Restaurant.create({ restaurant_id, name, name_en, location, phone, category, image, description, google_map, rating, userId })     // 存入資料庫
    .then(() => {
      res.redirect('/')
    })
    .catch(error => console.log(error))
})


//餐廳詳細資料
router.get('/:_id', (req, res) => {
  const _id = req.params._id
  const userId = req.user._id
  console.log(_id , userId)
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//編輯餐廳頁面 
router.get('/:_id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params._id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error));
})

//編輯後更新餐廳頁面 
router.put('/:_id', (req, res) => {
  const _id = req.params._id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      restaurant.name = req.body.name;

      restaurant.image = req.body.image;
      restaurant.category = req.body.category;
      restaurant.rating = req.body.rating;
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})
//刪除餐廳頁面 
router.delete('/:_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params._id
  return Restaurant.findOne({ _id, userId })
    .then(restaurants => restaurants.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router