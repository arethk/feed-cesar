const DEV = true;
const assets = {
    /*
    "intro": {
        objectURL: null,
        url: "assets/intro.mp4"
    },
    "salad": {
        objectURL: null,
        url: "assets/salad.mp4"
    },
    "chicken": {
        objectURL: null,
        url: "assets/chicken.mp4"
    },
    "fruit": {
        objectURL: null,
        url: "assets/fruit.mp4"
    },
    "chips": {
        objectURL: null,
        url: "assets/chips.mp4"
    },
    "pizza": {
        objectURL: null,
        url: "assets/pizza.mp4"
    },
    "donuts": {
        objectURL: null,
        url: "assets/donuts.mp4"
    },
    "endhealthy": {
        objectURL: null,
        url: "assets/endhealthy.mp4"
    },
    "endunhealthy": {
        objectURL: null,
        url: "assets/endunhealthy.mp4"
    }
    */
};
class FeedCesar {
    constructor(assets) {
        // singelton
        if (FeedCesar.instance) {
            return FaceBlaster.instance;
        }
        FeedCesar.instance = this;
        // make the ui selectors handy and setup event listeners
        this.assets = assets;
        this.gameContainer = document.querySelector(".game");
        this.videoContainer = document.querySelector(".main-video");
        this.nextStepContainer = document.querySelector(".next-step");
        const menuPngs = document.querySelectorAll(".meal");
        const [meal1Png, meal2Png, meal3Png] = Array.from(menuPngs);
        this.meal1Png = meal1Png;
        this.meal2Png = meal2Png;
        this.meal3Png = meal3Png;
        this.buttonSalad = document.querySelector("#salad");
        this.buttonChicken = document.querySelector("#chicken");
        this.buttonFruit = document.querySelector("#fruit");
        this.buttonChips = document.querySelector("#chips");
        this.buttonPizza = document.querySelector("#pizza");
        this.buttonDonuts = document.querySelector("#donuts");
        this.buttonSalad.addEventListener("click", this.handleMenuSelection);
        this.buttonChicken.addEventListener("click", this.handleMenuSelection);
        this.buttonFruit.addEventListener("click", this.handleMenuSelection);
        this.buttonChips.addEventListener("click", this.handleMenuSelection);
        this.buttonPizza.addEventListener("click", this.handleMenuSelection);
        this.buttonDonuts.addEventListener("click", this.handleMenuSelection);
    }

    reset() {
        this.healthy = 0;
        this.unhealthy = 0;
        this.disableAllMenuButtons();
        this.meal1Png.classList.add("dim");
        this.meal2Png.classList.add("dim");
        this.meal3Png.classList.add("dim");
        this.videoContainer.classList.remove("hide");
        this.nextStepContainer.classList.add("hide");
        this.gameContainer.classList.remove("hide");
        // TODO: play intro here

        setTimeout(() => {
            this.enableAllMenuButtons();
            this.flipMainContainerView();
        }, 3000); // 10000
    }

    runVideo(src) {
        let isLastSelection = false;
        const selections = document.querySelectorAll(".selection");
        if (Array.from(selections).length === 3) {
            isLastSelection = true;
        }
        this.flipMainContainerView();
        if (isLastSelection === true) {
            if (this.unhealthy > this.healthy) {
                // TODO: play unhealthy ending video
                console.log("unhealthy");
            } else {
                // TODO: play healthy ending video
                console.log("healthy");
            }
        } else {
            // TODO: play src video

            setTimeout(() => {
                this.enableNonSelectedMenuButtons();
                this.flipMainContainerView();
            }, 1000);
        }
    }

    flipMainContainerView() {
        if (this.videoContainer.classList.contains("hide")) {
            this.videoContainer.classList.remove("hide");
            this.nextStepContainer.classList.add("hide");
        } else {
            this.videoContainer.classList.add("hide");
            this.nextStepContainer.classList.remove("hide");
            if (this.meal1Png.classList.contains("dim")) {
                this.meal1Png.classList.remove("dim");
            } else if (this.meal2Png.classList.contains("dim")) {
                this.meal2Png.classList.remove("dim");
            } else if (this.meal3Png.classList.contains("dim")) {
                this.meal3Png.classList.remove("dim");
            }
        }
    }

    enableNonSelectedMenuButtons() {
        this.buttonSalad.disabled = this.buttonSalad.classList.contains("selection");
        this.buttonChicken.disabled = this.buttonChicken.classList.contains("selection");
        this.buttonFruit.disabled = this.buttonFruit.classList.contains("selection");
        this.buttonChips.disabled = this.buttonChips.classList.contains("selection");
        this.buttonPizza.disabled = this.buttonPizza.classList.contains("selection");
        this.buttonDonuts.disabled = this.buttonDonuts.classList.contains("selection");
    }

    enableAllMenuButtons() {
        this.buttonSalad.disabled = false;
        this.buttonChicken.disabled = false;
        this.buttonFruit.disabled = false;
        this.buttonChips.disabled = false;
        this.buttonPizza.disabled = false;
        this.buttonDonuts.disabled = false;
    }

    disableAllMenuButtons() {
        this.buttonSalad.disabled = true;
        this.buttonChicken.disabled = true;
        this.buttonFruit.disabled = true;
        this.buttonChips.disabled = true;
        this.buttonPizza.disabled = true;
        this.buttonDonuts.disabled = true;
    }

    handleMenuSelection(event) {
        const button = event.target;
        const id = button.id;
        button.classList.add("selection");
        app.disableAllMenuButtons();
        switch (id) {
            case "salad":
                ++app.healthy;
                break;
            case "chicken":
                ++app.healthy;
                break;
            case "fruit":
                ++app.healthy;
                break;
            case "chips":
                ++app.unhealthy;
                break;
            case "pizza":
                ++app.unhealthy;
                break;
            case "donuts":
                ++app.unhealthy;
                break;
            default:
                console.log("Button id not found");
        }
        app.runVideo(app.assets[id]);
    }

    destroy() {
        for (const key in assets) {
            const objectURL = assets[key].objectURL;
            if (objectURL) {
                URL.revokeObjectURL(objectURL);
            }
        }
    }
}

const app = new FeedCesar(assets);

window.onload = async function () {
    await Util.loadAssets(assets);
    const spinner = document.querySelector(".spinner");
    const startButton = document.querySelector(".start-button")
    spinner.classList.add("hide");
    startButton.classList.remove("hide");
    if (DEV === true) {
        startFeedCesar();
    }
}

window.onbeforeunload = function () {
    app.destroy();
}

function startFeedCesar() {
    const startMenu = document.querySelector(".start-menu");
    startMenu.remove();
    app.reset();
}