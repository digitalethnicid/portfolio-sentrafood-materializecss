class SearchBar extends HTMLElement {

    connectedCallback() {
        this.render();
    }

    set clickEvent(event) {
        this._clickEvent = event;
        this.render();
    }


    get value() {
        return document.querySelector("#input-keyword").value;
    }

    render() {
        this.innerHTML = /*html*/ `
        <style>
            .search-bar {
                border-style: solid;
                color: #acacac;
                border-width: 2px;
                border-radius: 5px;
            }

            .search-bar button {
                margin-top: 8px;
                margin-bottom: 8px;
                border-radius: 5px;
            }
        </style>
        <div class="row center search-bar">
            <div class="col m12 s12">
                <input type="text" class="col m9 s12 left" id="input-keyword" placeholder="Search Restaurant..">
                <button
                    class="col m2 s12 right btn-flat red darken-2 white-text waves-effect waves-light" id="searchButton"
                    type="button"><i class="material-icons">search</i>
                </button>
            </div>
        </div>`;

        document.querySelector("#searchButton").addEventListener("click", this._clickEvent);
    }
}

customElements.define("search-bar", SearchBar);