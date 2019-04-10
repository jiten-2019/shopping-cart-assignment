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