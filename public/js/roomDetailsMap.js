// const solCoords = { lat: 40.417030047918736, lng: -3.70335134642059 }
let myMap


// function initMap() {
//     const map = new google.maps.Map(document.getElementById("mapDetails"), {
//         zoom: 16,
//         center: solCoords,
//     });
//     const geocoder = new google.maps.Geocoder();
//     const infowindow = new google.maps.InfoWindow();

//     document.getElementById("submit").addEventListener("click", () => {
//         geocodeLatLng(geocoder, map, infowindow);
//     });
// }

// function geocodeLatLng(geocoder, map, infowindow) {
//     const input = document.getElementById("latlng").value;
//     const latlngStr = input.split(",", 2);
//     const latlng = {
//         lat: parseFloat(latlngStr[0]),
//         lng: parseFloat(latlngStr[1]),
//     };

//     geocoder
//         .geocode({ location: latlng })
//         .then((response) => {
//             if (response.results[0]) {
//                 map.setZoom(16);

//                 const marker = new google.maps.Marker({
//                     position: latlng,
//                     map: map,
//                 });

//                 infowindow.setContent(response.results[0].formatted_address);
//                 infowindow.open(map, marker);
//             } else {
//                 window.alert("No results found");
//             }
//         })
//         .catch((e) => window.alert("Geocoder failed due to: " + e));
// }

// window.initMap = initMap;

const idRoom = document.querySelector('#id').value

axios
    .get(`/api/rooms/${idRoom}`)
    .then(({ data }) => setMarkers(data))
    .catch(err => console.log(err))


function initMap() {

    myMap = new google.maps.Map(
        document.querySelector('#mapDetails'),
        {
            zoom: 16,
            center: { lat: 40.417030047918736, lng: -3.70335134642059 },
            styles: mapStyles.retro
        }
    )
}


function setMarkers(rooms) {
    rooms.forEach(() => {

        lat = rooms.location.coordinates[0]
        lng = rooms.location.coordinates[1]

        myMap.setCenter({ lat, lng })
        new google.maps.Marker({
            map: myMap,
            position: { lat, lng },
            title: elm.name
        })
    })
}