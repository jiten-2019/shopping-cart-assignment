(function(){
  var modal = document.getElementById('cartModal');
  var btn = document.getElementById("cartBtn");
  var span = document.getElementsByClassName("close")[0];

    window.addEventListener('load', function() {
      btn.addEventListener('mouseover', function(e) {
        modal.style.display = "block";
      })
      span.addEventListener('click', function(e) {
        modal.style.display = "none";
      })
      window.onmouseover = function(event) {
          if (event.target == modal) {
          modal.style.display = "none";
          }
      }
  });
})();

// Mobile select
(function(){
  const selectElement = document.querySelector('.mobile-menu');
  if(selectElement != undefined || selectElement != null){
    selectElement.addEventListener('change', (event) => {
        event.preventDefault();
        var url = selectElement.options[selectElement.selectedIndex].value;
        document.location = url;
        console.log(url);
    });  
  }

})();

// Hamburger icon
(function(){
  var icon = document.getElementById("hamburger-icon");
  var menu = document.getElementById("mobile-nav");
  //console.log(menu);

  window.onload = function(){
    icon.addEventListener('click', function(e) {
        e.preventDefault();
        if(icon.classList.contains("open")){
            icon.classList.remove('open'); 
            menu.classList.remove('open'); 
        }else{
            icon.classList.add('open'); 
            menu.classList.add('open'); 
        }
    });
  }
})();

// SLider Home Page
(function(){
  var prev = document.getElementById("prev_slide");
  var next = document.getElementById("next_slide");
  var slider_dot = document.getElementsByClassName("dot");
  var slider_dot = Array.prototype.slice.call( slider_dot )
  var slideIndex = 1;

  if (typeof(slider_dot) != 'undefined' && slider_dot != null)
  {
    slider_dot.forEach(function(elem, index) {
      elem.addEventListener("click", function() {
        currentSlide(index+1);
      });
    });
    
  }

  if (typeof(prev) != 'undefined' && prev != null)
  {
    showSlides(slideIndex);

    prev.addEventListener("click", function(){
      slideIndex--;
      showSlides(slideIndex);
    });
    next.addEventListener("click", function(){
      slideIndex++
      showSlides(slideIndex);
    });
  }

  function plusSlides(n) {
    console.log("n=",n);
    showSlides(slideIndex += n);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
        dots[i].className = dots[i].className.replace(" active", "");
    }
    // for (i = 0; i < dots.length; i++) {
    //     dots[i].className = dots[i].className.replace(" active", "");
    // }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
  }
})();

// Cart Page
(function(){
  var remove_item = document.getElementsByClassName('js-item--remove');
  var add_item = document.getElementsByClassName('js-item--add');
  var change_item = document.getElementsByClassName('cart-item-detail__info--item-count');
  var remove_item = Array.prototype.slice.call( remove_item );
  var add_item = Array.prototype.slice.call( add_item );
  var change_item = Array.prototype.slice.call( change_item );

  remove_item.forEach(function(elem) {
    elem.addEventListener("click", function(event) {
      event.preventDefault();
      manageItemToCart("remove");
    });
  });  

  add_item.forEach(function(elem) {
    elem.addEventListener("click", function(event) {
      event.preventDefault();
      manageItemToCart("add");
    });  
  });  

  change_item.forEach(function(elem) {
    elem.addEventListener("change", function(event) {
      event.preventDefault();
       manageItemToCart("change", event.target.value);
    });  
  });  

})();

function manageItemToCart(op_type, change=null){
  var nav_cart = document.getElementsByClassName('nav__end-cart--count')[0];
 let productId = event.target.getAttribute('data-id');
 console.log("change item", change);
 postCartData(op_type, { productId: productId, change: change }).then(function(cart) {
   nav_cart.innerHTML = cart.count + ' items';
   document.getElementById('js-mobile-count').innerHTML = cart.count;
   let cartProductDetail = cart.items.find(item => item.product.id === productId);
   cartController.updateItemCount(
     productId,
     cartProductDetail && cartProductDetail.count,
     cartProductDetail && cartProductDetail.product.price,
     cart.count,
     cart.totalPrice
   );
 });

}

function postCartData(type, data) {
 return fetch('/cart/' + type, {
   method: 'POST',
   headers: {
     Accept: 'application/json',
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(data)
 }).then(res => res.json());
}

const cartController = (function() {
   return {
     updateItemCount: function(itemId, count, price, totalCount, totalPrice) {
       count = count || 0;
       if (count > 0) {
         document.querySelectorAll('span[data-id="' + itemId + '"]')[0].innerHTML = count;

         document.querySelectorAll('input[data-id="' + itemId + '"]')[0].value = count;

         document.querySelectorAll(
           'span[class="cart-item-detail__info--total"][data-id="' + itemId + '"]'
         )[0].innerHTML = 'Rs.' + price * count;
       } else {
         let elem = document.querySelectorAll('div[class="item-in-cart__items-details"][data-id="' + itemId + '"]')[0];
         elem.parentNode.removeChild(elem);
       }
       const cart_nav = document.getElementsByClassName('cart-header__text')[0];
       if(cart_nav)
        cart_nav.innerHTML = 'My Cart (' + totalCount + ' items)';
       document.getElementsByClassName('button-price')[0].innerHTML = 'Rs.' + totalPrice;
       if(totalPrice==0)
           document.getElementsByClassName('button-price')[0].parentElement.style.display = "none";
   }
 };
})();

// Add item to cart header
(function(){
  var item = document.getElementsByClassName('js-product__buy--btn');
  var item = Array.prototype.slice.call( item );
  
    item.forEach(function(element) {
      element.addEventListener("click", function () {
        var cartCountElem = document.getElementsByClassName('nav__end-cart--count')[0];
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
      });
    }); 
    
})(); 