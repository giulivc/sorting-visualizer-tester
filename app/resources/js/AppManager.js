import Config from "./utils/Config.js";
import VisualizationView from "./ui/VisualizationView.js";
import AnimationController from "./controller/AnimationController.js";

var firstPage, visualizationDiv, 
    visualizationView, 
    animationController;

class AppManager {

    constructor(algorithm, mode){

        this.algorithm = algorithm;
        this.mode = mode;

        firstPage = document.getElementById("choose-condition");
        visualizationDiv = document.getElementById("visualization");
        
    }

    startVisualizer(){
        firstPage.style.display = "none";
        visualizationDiv.style.display = "block";
    
        visualizationView = new VisualizationView(this.algorithm, this.mode);
    
        visualizationView.setAlgorithmTitle(this.stringifyAlgorithm(this.algorithm));
        visualizationView.setPseudoCode();
        visualizationView.displayModeParameter();
    
        this.initListener(this.algorithm, this.mode);
    }

    stringifyAlgorithm(algorithm){

        switch(algorithm){
            case Config.BUBBLESORT: 
                return "BubbleSort";
            case Config.INSERTIONSORT: 
                return "InsertionSort";
            case Config.SELECTIONSORT: 
                return "SelectionSort";
            default: 
                return "";
        }
    }

   

    initListener(algorithm, mode){

        animationController = new AnimationController(algorithm, mode);
    
        if(mode !== Config.MODE_STEPTHROUGH){
    
            let startButton = document.querySelector("#base-controller #start-button"),
                pauseButton = document.querySelector("#base-controller #pause-button"),
                resetButton = document.querySelector("#base-controller #reset-button");
    
            startButton.addEventListener("click", (event) => animationController.play());
            pauseButton.addEventListener("click", (event) => animationController.pause());
            resetButton.addEventListener("click", (event) => animationController.reset());
    
        } else {
    
            let startButton = document.querySelector("#step-controller #start-button"),
                pauseButton = document.querySelector("#step-controller #pause-button"),
                resetButton = document.querySelector("#step-controller #reset-button"),
                skipToEndBtn = document.getElementById("skip-to-end-button"),
                backwardBtn = document.getElementById("backward-button"),
                forwardBtn = document.getElementById("forward-button");
    
            startButton.addEventListener("click", (event) => animationController.play());
            pauseButton.addEventListener("click", (event) => animationController.pause());
            resetButton.addEventListener("click", (event) => animationController.reset());
            skipToEndBtn.addEventListener("click", (event) => animationController.skipToEnd());
            backwardBtn.addEventListener("click", (event) => animationController.stepBackward());
            forwardBtn.addEventListener("click", (event) => animationController.stepForward());
        }
        
    }

}


export default AppManager;