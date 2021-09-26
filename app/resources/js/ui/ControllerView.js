class ControllerView {

    getCurrentContainer(){

        var container;

        [...document.querySelector(".footer").children].forEach(function(controller){

            if(controller.style.display == "block"){
                container = controller;
            }
        });

        return container;

    }


    enableButton(selector){
        var button = this.getCurrentContainer().querySelector(selector);

        button.style.opacity = "100%";
        button.style.pointerEvents = "initial";
        button.disabled = false;
    }

    disableButton(selector){
        var button = this.getCurrentContainer().querySelector(selector);

        button.style.opacity = "50%";
        button.style.pointerEvents = "none";
        button.disabled = true;
    }

    changeToStartButton(){

        var startButton = this.getCurrentContainer().querySelector("#start-button"),
            pauseButton = this.getCurrentContainer().querySelector("#pause-button"),
            buttonDescr = this.getCurrentContainer().querySelector("#button-descr");

        startButton.style.display = "inline";
        pauseButton.style.display = "none";

        buttonDescr.innerHTML = "Play";
    
    }

    changeToPauseButton(){

        var startButton = this.getCurrentContainer().querySelector("#start-button"),
            pauseButton = this.getCurrentContainer().querySelector("#pause-button"),
            buttonDescr = this.getCurrentContainer().querySelector("#button-descr");

        pauseButton.style.display = "inline";
        startButton.style.display = "none";

        buttonDescr.innerHTML = "Pause";
    
    }


}

export default new ControllerView();
