//  var remove_item = document.getElementsByClassName('js-item--remove');
//  var add_item = document.getElementsByClassName('js-item--add');
//  var nav_cart = document.getElementsByClassName('nav__end-cart--count')[0];

// Array.from(remove_item).forEach(function(elem) {
//   elem.addEventListener("click", function(event) {
//     event.preventDefault();
//     manageItemToCart("remove");
//   });
// });  

// Array.from(add_item).forEach(function(elem) {
//   elem.addEventListener("click", function(event) {
//     event.preventDefault();
//     manageItemToCart("add");
//   });  
// });  

// function manageItemToCart(op_type){
  
//   let productId = event.target.getAttribute('data-id');
//   postCartData(op_type, { productId: productId }).then(function(cart) {
//     nav_cart.innerHTML = cart.count + ' items';
//     document.getElementById('js-mobile-count').innerHTML = cart.count;
//     let cartProductDetail = cart.items.find(item => item.product.id === productId);
//     cartController.updateItemCount(
//       productId,
//       cartProductDetail && cartProductDetail.count,
//       cartProductDetail && cartProductDetail.product.price,
//       cart.count,
//       cart.totalPrice
//     );
//   });

// }

// function postCartData(type, data) {
//   return fetch('/cart/' + type, {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   }).then(res => res.json());
// }

// const cartController = (function() {
//     return {
//       updateItemCount: function(itemId, count, price, totalCount, totalPrice) {
//         count = count || 0;
//         if (count > 0) {
//           document.querySelectorAll('span[data-id="' + itemId + '"]')[0].innerHTML = count;
//           document.querySelectorAll(
//             'span[class="cart-item-detail__info--total"][data-id="' + itemId + '"]'
//           )[0].innerHTML = 'Rs.' + price * count;
//         } else {
//           let elem = document.querySelectorAll('div[class="items-details"][data-id="' + itemId + '"]')[0];
//           elem.parentNode.removeChild(elem);
//         }
//         document.getElementsByClassName('cart-header__text')[0].innerHTML = 'My Cart (' + totalCount + ' items)';
//         document.getElementsByClassName('button-price')[0].innerHTML = 'Rs.' + totalPrice;
//         if(totalPrice==0)
//             document.getElementsByClassName('button-price')[0].parentElement.style.display = "none";
//     }
//   };
// })();