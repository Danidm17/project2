let autocomplete;
function initAutocomplete() {
    const room = {}
    const autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('location'),
        {
            types: ['address'],
            componentRestrictions: { 'country': ['ES'] }
        })

    autocomplete.addListener('place_changed', function () {
        const place = autocomplete.getPlace()
        document.getElementById('latitude').value = place.geometry.location.lat()
        document.getElementById('longitude').value = place.geometry.location.lng()

    })
}




//document.getElementById('location').value = [document.getElementById('latitude').value, document.getElementById('longitude').value]


// if (place.geometry && place.geometry.location) {
//     const lat = place.geometry.location.lat();
//     const lng = place.geometry.location.lng();
//     room.location = {
//         type: 'Point',
//         coordinates: [lat, lng]
//     };
// }