class MyFooter extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = /*html*/ `
        <style>
            footer {
                padding: 20px 0;
            }
            footer h4 {
                font-family: Viga;
            }
            footer span{
                color: #d32f2f;
                text-shadow: 1px 1px 3px rgba(255, 255, 255, 0.8);
            }

        </style>
        <footer class="grey darken-3 center white-text">
        <h4><span>Sentra</span>Food</h4><p class="flow-text">Copyright by Muhammad Fariz Syakur Aghniya, 2020.</p>
    </footer>`;

    }


}

customElements.define("my-footer", MyFooter);