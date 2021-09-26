import Config from "../utils/Config.js";

class VisualizationView {

    constructor(algorithm, mode){
        this.algorithm = algorithm;
        this.mode = mode; 


    }
    
    setAlgorithmTitle(title){
    
        document.getElementById("algorithm-title").innerHTML = title;
    
    }

    setPseudoCode(){  

        let self = this;

        document.querySelectorAll(".pseudocode").forEach(function(ul){
           
            if(ul.id === self.algorithm){
                ul.style.display = "block";
            } else {
                ul.style.display = "none";
            }
        });  
    
    }

    displayModeParameter(){
        switch(this.mode){
            case Config.MODE_SPEED:
                this.displaySpeedController();
                break;
            case Config.MODE_DATA:
                this.displayDataController();
                break;
            case Config.MODE_STEPTHROUGH:
                this.displayStepController();
                break;
            default:
                break;
        }
    }
    
    
    displaySpeedController(){
        document.getElementById("speed-controller").style.display = "block";
    }
    
    displayDataController(){
        document.getElementById("data-controller").style.display = "block";
    }
    
    displayStepController(){
        document.getElementById("step-controller").style.display = "block";
        document.getElementById("base-controller").style.display = "none";
    }

    getAlgorithm(){
        return this.algorithm;
    }



}

export default VisualizationView;