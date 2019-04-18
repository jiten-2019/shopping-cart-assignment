var modal = document.getElementById('cartModal');
var btn = document.getElementById("cartBtn");
var span = document.getElementsByClassName("close")[0];

btn.onmouseover = function() {
      modal.style.display = "block";
  }
  span.onclick = function() {
      modal.style.display = "none";
  }
  window.onmouseover = function(event) {
      if (event.target == modal) {
      modal.style.display = "none";
      }
  }

  // Mobile select
  const selectElement = document.querySelector('.mobile-menu');
  if(selectElement != undefined || selectElement != null){
  selectElement.addEventListener('change', (event) => {
      event.preventDefault();
      var url = selectElement.options[selectElement.selectedIndex].value;
      document.location = url;
      console.log(url);
  });  
}

// Hamburger icon
var icon = document.getElementById("hamburger-icon");
var menu = document.getElementById("mobile-nav");
console.log(menu);
icon.addEventListener('click', function(e) {
    e.preventDefault();
    if(icon.classList.contains("open")){
        icon.classList.remove('open'); 
        menu.classList.remove('open'); 
    }else{
        icon.classList.add('open'); 
        menu.classList.add('open'); 
    }
    //icon.classList.toggle('open'); 
});


// SLider Home Page
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
  //  console.log("prev: ",slideIndex);
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
  console.log("slides: ",slides);
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}


// Cart Page
var remove_item = document.getElementsByClassName('js-item--remove');
var add_item = document.getElementsByClassName('js-item--add');
var nav_cart = document.getElementsByClassName('nav__end-cart--count')[0];

Array.from(remove_item).forEach(function(elem) {
 elem.addEventListener("click", function(event) {
   event.preventDefault();
   manageItemToCart("remove");
 });
});  

Array.from(add_item).forEach(function(elem) {
 elem.addEventListener("click", function(event) {
   event.preventDefault();
   manageItemToCart("add");
 });  
});  

function manageItemToCart(op_type){
 
 let productId = event.target.getAttribute('data-id');
 postCartData(op_type, { productId: productId }).then(function(cart) {
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
         document.querySelectorAll(
           'span[class="cart-item-detail__info--total"][data-id="' + itemId + '"]'
         )[0].innerHTML = 'Rs.' + price * count;
       } else {
         let elem = document.querySelectorAll('div[class="item-in-cart__items-details"][data-id="' + itemId + '"]')[0];
         elem.parentNode.removeChild(elem);
       }
       document.getElementsByClassName('cart-header__text')[0].innerHTML = 'My Cart (' + totalCount + ' items)';
       document.getElementsByClassName('button-price')[0].innerHTML = 'Rs.' + totalPrice;
       if(totalPrice==0)
           document.getElementsByClassName('button-price')[0].parentElement.style.display = "none";
   }
 };
})();