let map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 12.8797, //change this to US lat
      lng: 121.774, //change this to US lng
    },
    zoom: 6,
  });
  infoWindow = new google.maps.InfoWindow();
  // const locationButton = document.createElement("button");
  // locationButton.textContent = "Pan to Current Location";
  // locationButton.classList.add("custom-map-control-button");
  // map.controls[google.maps.ControlPosition.TOP_CENTER].push(
  //     locationButton
  // );

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const geocoder = new google.maps.Geocoder();
        const latlng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        geocoder.geocode(
          {
            location: latlng,
          },
          (results, status) => {
            if (status === "OK") {
              if (results[0]) {
                // console.log(results[0]);
                map.setZoom(15);
                const marker = new google.maps.Marker({
                  position: latlng,
                  map: map,
                });
                infoWindow.setContent(results[0].formatted_address);
                infoWindow.open(map, marker);

                sessionStorage.setItem("gadd", results[0].formatted_address);
              } else {
                window.alert("No results found");
              }
            } else {
              window.alert("Geocoder failed due to: " + status);
            }
          }
        );

        // infoWindow.setPosition(pos);
        // infoWindow.setContent("Location found.");
        // infoWindow.open(map);
        // map.setCenter(pos);
      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

var arr3 = [];
var positions = [];
const eventId = sessionStorage.getItem("eventId");

$(document).ready(() => {
  var data3 = [];
  var settings = {
    url:
      "https://iqq7nfcdw5.execute-api.us-east-1.amazonaws.com/fvs/allcalendar",
    method: "GET",
    timeout: 0,
  };

  $.ajax(settings).done((response) => {
    var count = response.Count;
    // console.log(response.Items[0]);
    for (var i = 0; i < count; i++) {
      var res = response.Items[i];
      arr3[i] = {
        adminEmail: res.adminEmail.S,
        allDay: res.allDay.S,
        cLocation: res.cLocation.S,
        cStartingTime: res.cStartingTime.S,
        color: res.color.S,
        comid: res.comid.S,
        day: res.day.S,
        employeeEmail: res.employeeEmail.S,
        employeeName: res.employeeName.S,
        end: res.end.S,
        hr: res.hr.S,
        id: res.id.S,
        lat: res.lat.S,
        lng: res.lng.S,
        location: res.location.S,
        mins: res.mins.S,
        month: res.month.S,
        secs: res.secs.S,
        start: res.start.S,
        startingTime: res.startingTime.S,
        task: res.task.L,
        title: res.title.S,
        year: res.year.S,
      };
      data3.push(arr3[i]);
    }

    positions = arr3.map((pos) => {
      const latlng = {
        id: pos.id,
        lat: pos.lat,
        lng: pos.lng,
      };

      return latlng;
    });

    const pos = positions.filter((position) => position.id === eventId);
    console.log(pos);
  });
});
