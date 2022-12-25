// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Restaurant model
const Restaurant = require('../../models/Restaurant')
// 定義首頁路由
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

//搜尋餐廳
router.get('/search', (req, res) => {

  if (!req.query.keyword) {
    return res.redirect("/")
  }

  const keyword = req.query.keyword.trim().toLowerCase()

  Restaurant.find({})
    .lean()
    .then((restaurantsData) => {
      const filterRestaurantsData = restaurantsData.filter(
        (data) =>
          data.name.toLowerCase().includes(keyword) ||
          data.category.includes(keyword)
      );

      res.render("index", { restaurants: filterRestaurantsData, keyword: req.query.keyword });
    })
    .catch((err) => console.log(err));
});

// 匯出路由模組
module.exports = router