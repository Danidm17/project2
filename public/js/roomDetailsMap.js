const solCoords = { lat: 40.417030047918736, lng: -3.70335134642059 }
let myMap

const IdRoom = document.querySelector('#id').value

axios
    .get(`/api/details/${IdRoom}`)
    .then(({ data }) => setMarkers(data))
    .catch(err => console.log(err))

function initMap() {

    myMap = new google.maps.Map(
        document.querySelector('#mapDetails'),
        {
            zoom: 16,
            center: solCoords,
            styles: mapStyles.retro
        }
    )
}

function setMarkers(room) {

    lat = room.location.coordinates[0]
    lng = room.location.coordinates[1]
    new google.maps.Marker({
        map: myMap,
        position: { lat, lng },
        title: room.name
    })
}
