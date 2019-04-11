// var js_sidenav = document.getElementsByClassName("js--sidenav");
// var js_sidenav = Array.prototype.slice.call( js_sidenav )

// console.log("js_sidenav", js_sidenav);

// if (typeof(js_sidenav) != 'undefined' && js_sidenav != null)
// {
//     js_sidenav.forEach(function(elem, index) {
//         elem.addEventListener("click", function() {
//             this.className += " active";
//     });
//   });
  
// }


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
