export function localFetch(beforeFetchMsg, url, responseMsg) {
    console.log(beforeFetchMsg);

    return fetch(url, {
        accept: "application/json"
    })
        .then(response => {
            return response.json();
        })
        .then(responseJson => {
            if (responseJson.message === "Access Denied") {
                console.log("Access denied!");
                window.location.pathname = "auth/recurse";
            } else {
                console.log(responseMsg, responseJson);
                return responseJson;
            }
        });
}

export function getRcLocations() {
    return localFetch(
        "API: Get all geolocation data",
        "/api/locations/all",
        "Geolocation Data: "
    );
}

export function getLocationSuggestions(query) {
    return localFetch(
        "API: Location query = " + query,
        "/api/locations/search?query=" + query,
        "Location Suggestions "
    );
}

export function getLocationData(location) {
    const id = location["id"];
    const name = location["name"];
    const shortName = location["short_name"];
    const type = location["type"];

    return localFetch(
        `API: Location lookup, id: ${id}, name: ${name}`,
        `/api/locations/${id}?name=${name}&short_name=${shortName}&type=${type}`,
        "Location lookup results "
    );
}
