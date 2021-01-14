let lat = 0;
let lng = 0;
let map, infoWindow;

function loadBody() {
  lat = parseFloat(sessionStorage.getItem("lat")) || 14.599512;
  lng = parseFloat(sessionStorage.getItem("lng")) || 120.984222;
}

function initMap() {
  setTimeout(() => {
    map = new google.maps.Map(document.getElementById("map"), {
      center: {
        lat: lat, //change this to US lat
        lng: lng, //change this to US lng
      },
      zoom: 14,
    });
    infoWindow = new google.maps.InfoWindow();

    const geocoder = new google.maps.Geocoder();
    const latlng = {
      lat: lat,
      lng: lng,
    };
    geocoder.geocode(
      {
        location: latlng,
      },
      (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            map.setCenter(results[0].geometry.location);
            map.setZoom(14);
            const marker = new google.maps.Marker({
              position: results[0].geometry.location,
              map: map,
            });
            infoWindow.setContent(results[0].formatted_address);
            infoWindow.open(map, marker);
          } else {
            window.alert("No results found");
          }
        } else {
          window.alert("Geocoder failed due to: " + status);
        }
      }
    );
  }, 500);
}

function unloadBody() {
  lat = 0;
  lng = 0;
  sessionStorage.removeItem("lat");
  sessionStorage.removeItem("lng");
}
