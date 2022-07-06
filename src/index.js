// import materialize-css dan css
import materialize from "materialize-css";
import "../node_modules/materialize-css/dist/css/materialize.min.css";
import "./style/style.css";

// import file JQUERY dan JS
import "regenerator-runtime";
import $ from "jquery";
import DataSource from '../src/data/data-source.js';

// import component
import './component/search-bar.js';
import './component/my-footer.js'

//memangil DOM framework
const action = () => {
    const sideNav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sideNav);
    const slider = document.querySelectorAll('.slider');
    M.Slider.init(slider, {
        indicators: false,
        height: 500,
        transition: 600,
        interval: 4000
    });
    const parallax = document.querySelectorAll('.parallax');
    M.Parallax.init(parallax);
    const materialbox = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(materialbox);
    const scroll = document.querySelectorAll('.scrollspy');
    M.ScrollSpy.init(scroll, {
        scrollOffset: 50
    });
    const modal = document.querySelectorAll('.modal');
    M.Modal.init(modal);
    const dropdown = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropdown);
};

const main = () => {

    // memangil element component
    const searchElement = document.querySelector("search-bar");

    // mengambil data collection
    const getCollection = async () => {
        try {
            const result = await DataSource.searchCollection();
            renderCollection(result);
        } catch (message) {
            console.log(message);
        }
    };

    // menampilkan data collections
    const renderCollection = results => {
        let collects = '';
        results.forEach(col => collects += showCollection(col));
        const collectionContainer = document.querySelector('.collect');
        collectionContainer.innerHTML = collects;
    };

    // mengambil data restaurants
    const getRestaurant = async () => {
        try {
            const result = await DataSource.searchRestaurant(searchElement.value);
            renderRestaurant(result);
        } catch (message) {
            console.log(message);
        }
    };

    // menampilkan data restaurants
    const renderRestaurant = results => {
        let cards = '';
        results.forEach(res => cards += showRestaurant(res));
        const restoContainer = document.querySelector('.resto');
        restoContainer.innerHTML = cards;
    };

    // mengambil data restaurants detail
    const getRestaurantDetail = async () => {
        try {
            document.addEventListener('click', async function (e) {
                if (e.target.classList.contains('modal-detail-button')) {
                    const resid = e.target.dataset.resid;
                    const result = await DataSource.restaurantDetail(resid);
                    renderRestaurantDetail(result);
                }
            });

        } catch (message) {
            console.log(message);
        }
    };

    // menampilkan data restaurants detail
    const renderRestaurantDetail = results => {
        const restoDetail = showRestaurantDetail(results);
        const modalBody = document.querySelector('.modal-content');
        modalBody.innerHTML = restoDetail;
    }

    const showCollection = col => {
        return /*html*/ `
        <div class="col m4 s12">
            <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator" src="${col.collection.image_url}">
                </div>
                <div class="card-content">
                    <span class="card-title activator grey-text text-darken-4 center">${col.collection.title}</span>
                </div>
                <div class="card-reveal center">
                    <span class="card-title grey-text text-darken-4">${col.collection.title}<i class="material-icons right">close</i></span>
                    <p> ${col.collection.description}</p>
                    <a href="${col.collection.url}" class="btn modal-trigger red white-text r">Link</a>
                </div>
            </div>
        </div>`;
    }

    const showRestaurant = res => {
        if (res.restaurant.thumb === '') {
            res.restaurant.thumb = '/src/img/makanan/no-image.png';
        }

        return /*html*/ `
        <div class="col m4 s12">
            <div class="card center">
                <div class="card-image">
                    <img src="${res.restaurant.thumb}">
                    <span class="card-title">
                    <h4>${res.restaurant.name}</h4>
                    </span>
                    <button data-target="modal1" class="btn-floating btn-large halfway-fab waves-effect waves-light red darken-2 modal-trigger modal-detail-button" data-target="#modal1" data-resid=${res.restaurant.id}>Detail</button>
                </div>
                <div class="card-content">
                    <p>${res.restaurant.cuisines}</p>
                </div>
            </div>
        </div>`;
    }

    const showRestaurantDetail = res => {
        if (res.thumb === '') {
            res.thumb = '/src/img/makanan/no-image.png';
        }
        return /*html*/ `
        <div class="row center">
            <div class="col m6 s12">
                <img src="${res.thumb}">
            </div>
            <div class="col m6 s12">
                <ul class="collection white">
                    <li class="collection-item"><h4>${res.name}</h4></li>
                    <li class="collection-item"><strong>Cuisines : </strong>${res.cuisines}</li>
                    <li class="collection-item"><strong>Waktu : </strong>${res.timings}</li>
                    <li class="collection-item"><strong>No Telp : </strong>${res.phone_numbers}</li>
                    <li class="collection-item"><strong>Alamat : </strong><br>${res.location.address}</li>
                </ul>
            </div>
            <div class="modal-footer">
                <button class="modal-close waves-effect waves-red btn-flat">Close</button>
            </div>
        </div>`;
    }

    if (searchElement.value === '') {
        getRestaurant();
    }

    searchElement.clickEvent = getRestaurant;
    getCollection();
    getRestaurantDetail();
};

action();
main();