$(document).ready(function(){
    $(".navbar .nav-link").on('click', function(event) {

        if (this.hash !== "") {

            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function(){
                window.location.hash = hash;
            });
        } 
    });
});

new WOW().init();

function initMap() {
    var guayaquil = { lat: -2.152327, lng: -80.062502 }; // Coordenadas de Guayaquil
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: guayaquil
    });
    var marker = new google.maps.Marker({
      position: guayaquil,
      map: map
    });
  }
