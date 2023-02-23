const solCoords = { lat: 40.417030047918736, lng: -3.70335134642059 }
let myMap

axios
    .get('/api/rooms')
    .then(({ data }) => setMarkers(data))
    .catch(err => console.log(err))


function initMap() {

    myMap = new google.maps.Map(
        document.querySelector('#map'),
        {
            zoom: 16,
            center: solCoords,
            styles: mapStyles.retro
        }
    )
}

function setMarkers(rooms) {
    rooms.forEach(elm => {

        const lat = elm.location.coordinates[0]
        const lng = elm.location.coordinates[1]

        new google.maps.Marker({
            map: myMap,
            position: { lat, lng },
            title: elm.name
        })
    })
}