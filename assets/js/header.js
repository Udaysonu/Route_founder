$(document).ready(function(){
  


    $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        console.log(scroll)
        if (scroll > 20) {
          $(".header_nav").css("background" , "rgba(230, 230, 230,1)");
          $(".header_nav span").css("color" , "black");
        }
  
        if(scroll<20){
            $(".header_nav").css("background" , "none");  	
            $(".header_nav span").css("color" , "white");
        }
    })
    $(".hover_span").on({
      mouseenter: function(){
              $(this).css("color", "yellow");
          },  
         
         
          mouseleave: function(){
              var scroll = $(window).scrollTop();
              if(scroll>40){
                  $(this).css("color","black");
              }
              else{
                  $(this).css("color","white")
              }
          },
          dblclick: function(){
              $(this).css("color", "red");
          }
    })
  })