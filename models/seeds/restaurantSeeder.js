const bcrypt = require("bcryptjs");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const User = require("../user");
const Restaurant = require('../Restaurant') // 載入 restaurant model
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose')


const SEED_USER = [
  {
    name: "user1",
    email: "user1@example.com",
    password: "12345678",
    restaurantIndex: [0, 1, 2],
  },
  {
    name: "user2",
    email: "user2@example.com",
    password: "12345678",
    restaurantIndex: [3, 4, 5],
  },
]

db.once('open', () => {
  return Promise.all(
    SEED_USER.map((user) => {
      const { restaurantIndex } = user// 定義user裡面的restaurantindex


      return bcrypt.genSalt(10)
        .then((salt) => bcrypt.hash(user.password, salt))
        .then((hash) =>
          User.create({
            name: user.name,
            email: user.email,
            password: hash
          })
        )//將密碼加密
        .then((user) => {
          const restaurants = restaurantIndex.map((index) => {
            const restaurant = restaurantList[index];
            restaurant.userId = user.id;
            return restaurant;
          })
          return Restaurant.create(restaurants)
        })//把加上使用者id的餐廳加進資料庫
        .catch((error) => console.log(error))
    })
  )
    .then(() => {
      console.log("done");
      process.exit();
    })
    .catch((error) => console.log(error));
});
