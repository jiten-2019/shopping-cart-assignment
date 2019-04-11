 var item = document.getElementsByClassName('js-product__buy--btn');
 var cartCountElem = document.getElementsByClassName('nav__end-cart--count')[0];

 for (let i = 0; i < item.length; i++) {
    item[i].addEventListener("click", addItemToCart);
  }

function addItemToCart(){
  //console.log("Target: ",event.target );
  fetch('/cart/add', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ productId: event.target.id })
  })
    .then(res => res.json())
    .then(function(cart) {
      cartCountElem.innerHTML = cart.count + ' items';
      document.getElementById('js-mobile-count').innerHTML = cart.count;
    });
}
