var express = require('express');
var router = express.Router();
var banners = require('../public/data/banners/index.get.json');
var prodCategories = require('../public/data/categories/index.get.json');
var prodHbs = require('../public/data/products/index.get.json');

const cart={
  items: [],
  count: 0,
  totalPrice: 0
}

/* GET home page. */
router.get('/', function(req, res, next) {
  ActiveBanners = banners.filter(banner => banner.isActive);
  ActiveCategories = prodCategories.filter(category => category.enabled);
  res.render('home', {banners:ActiveBanners,categories:ActiveCategories,cart});
});

router.get('/product', function(req, res, next) {
  ActiveCategories = prodCategories.filter(category => category.enabled);
  res.render('product', {prodHbs:prodHbs, categories:ActiveCategories,cart});
});

router.get('/product/:id', function(req, res, next) {
  var catId = req.params.id;
  ActiveCategories = prodCategories.filter(category => category.enabled);
  prodHbs1 = prodHbs.filter(prod => prod.category === catId);
   res.render('product', {prodHbs:prodHbs1, categories:ActiveCategories,cart});
});

// router.get('/index', function(req, res, next) {
//   ActiveBanners = banners.filter(banner => banner.isActive);
//   ActiveCategories = prodCategories.filter(category => category.enabled);
//   res.render('home', {banners:ActiveBanners,categories:ActiveCategories,cart});
// });

router.get('/signin', function(req, res, next) {
  res.render('signin.hbs', { cart });
});

router.get('/signup', function(req, res, next) {
  res.render('signup.hbs', { cart });
});

router.get('/cart', function(req, res, next) {
  res.render('cart.hbs', { cart });
});

// cart operations 
router.post('/cart/:operation', function(req, res) {
  const operation = req.params.operation;
  let count = 0;
  if (operation === 'add') {
    count = 1;
  } else if (operation === 'remove') {
    count = -1;
  } else {
    return res.status(404).send('Not Found');
  }
  const product = prodHbs.find(val => val.id === req.body.productId);
  if (product) {
    const oldItem = cart.items.find(item => item.product.id === product.id);
    if (oldItem) {
     
       oldItem.count += count;
      cart.totalPrice -= oldItem.totalPrice;
      oldItem.totalPrice = oldItem.product.price * oldItem.count
      cart.count += count;
      cart.totalPrice += oldItem.totalPrice;

      if (oldItem.count <= 0) {
        cart.items.splice(cart.items.findIndex(item => item.product.id === product.id), 1);
      }
    } else {
      // cart.items.push({ product, count });
      // cart.count += count;
      // cart.totalPrice += product.price;

      let itemPrice = product.price;
      cart.items.push({
          product,
          count,
          totalPrice: product.price * count,
          totalPrice: itemPrice
      });
      cart.count += count;
      cart.totalPrice += itemPrice;

    }
    return res.send(cart);
  }
  return res.status(404).send('Not Found');
});


module.exports = router;
