class DataSource {

    // Mengambil data restaurants dari API Zomato
    static searchRestaurant(keyword) {
        return fetch(`https://developers.zomato.com/api/v2.1/search?entity_id=74&entity_type=city&count=12&radius=100&sort=rating&order=asc&q=${keyword}`, {
            headers: {
                "user-key": "28c43b080b42bafd8d456b291bbccf74"
            }
        })
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                if (responseJson.restaurants.length > 0) {
                    return Promise.resolve(responseJson.restaurants);
                } else {
                    return Promise.reject(`${keyword} is not found`);
                }
            })
    }

    // Mengambil data detail restaurant dari API Zomato
    static restaurantDetail(resid) {
        return fetch(`https://developers.zomato.com/api/v2.1/restaurant?res_id=${resid}`, {
            headers: {
                "user-key": "28c43b080b42bafd8d456b291bbccf74"
            }
        })
            .then(response => response.json())
            .then(res => res);
    }

    // Mengambil data collection dari API Zomato
    static searchCollection() {
        return fetch(`https://developers.zomato.com/api/v2.1/collections?city_id=74&count=9`, {
            headers: {
                "user-key": "28c43b080b42bafd8d456b291bbccf74"
            }
        })
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                if (responseJson.collections.length > 0) {
                    return Promise.resolve(responseJson.collections);
                } else {
                    return Promise.reject(`is not found`);
                }
            })
    }
}

export default DataSource;