import Config from "./utils/Config.js";
import AppManager from "./AppManager.js";

var selectedAlgorihtm, selectedMode;

function init(){

    var secondPageBtn = document.getElementById("second-page-button"),
    algorithmPicker = document.getElementById("choose-algorithm"),
    modePicker = document.getElementById("choose-mode");

    secondPageBtn.addEventListener("click", (event) => {
        var application = new AppManager(selectedAlgorihtm, selectedMode);
        application.startVisualizer();

    });

    algorithmPicker.addEventListener("click", (event) => onAlgorithmSelected(event.target));
    modePicker.addEventListener("click", (event) => onModeSelected(event.target));

    selectedAlgorihtm = Config.BUBBLESORT;
    selectedMode = Config.MODE_BASELINE;

}

function onModeSelected(target){

    var modeButtons = target.parentNode.children;
    for(let i = 0; i <  modeButtons.length; i++){
        modeButtons[i].classList.remove("selected");
    }

    target.classList.add("selected");

    selectedMode = target.id;

}

function onAlgorithmSelected(target){

    var algorithmButtons = target.parentNode.children;
    for(let i = 0; i <  algorithmButtons.length; i++){
        algorithmButtons[i].classList.remove("selected");
    }

    target.classList.add("selected");

    selectedAlgorihtm = target.id;
}

init();