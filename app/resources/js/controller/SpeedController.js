var speedSlider;

/* class for speed mode with following features: 

    + manipulate animation seed via a slider

*/

class SpeedController {

    constructor(animationController){

        speedSlider = document.getElementById("speed-slider");
        speedSlider.addEventListener("change", (event) => animationController.onSpeedChanged(this.getCurrentSpeed()));

    }

    getCurrentSpeed(){
        return 2000 - speedSlider.value;
    }

    
}

export default SpeedController;