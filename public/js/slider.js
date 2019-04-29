
// SLider Home Page
var sliderFunc = (function (){
    return{ 
      slider: function(prev,next,slider_dot,slides,dots){
        var prev = Array.prototype.slice.call( prev );
        var next = Array.prototype.slice.call( next );
        var slider_dot = Array.prototype.slice.call( slider_dot );
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
      
          prev[0].addEventListener("click", function(){
            slideIndex--;
            showSlides(slideIndex);
          });
          next[0].addEventListener("click", function(){
            slideIndex++
            showSlides(slideIndex);
          });
        }
    
        function currentSlide(n) {
          showSlides(slideIndex = n);
        }
    
        function showSlides(n) {
          var i;
          if (n > slides.length) {slideIndex = 1}    
            if (n < 1) {slideIndex = slides.length}
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";  
                dots[i].className = dots[i].className.replace(" active", "");
            }
          slides[slideIndex-1].style.display = "block";  
          dots[slideIndex-1].className += " active";
        }
    }
  }
  })();
  
  ( slider_id => {
    sliderFunc.slider(
        document.getElementById(slider_id).querySelectorAll("#prev_slide"),
        document.getElementById(slider_id).querySelectorAll("#next_slide"),
        document.getElementById(slider_id).querySelectorAll(".dot"),
        document.getElementById(slider_id).querySelectorAll(".mySlides"),
        document.getElementById(slider_id).querySelectorAll(".dot")
      );
  })("img_slider_1");

  