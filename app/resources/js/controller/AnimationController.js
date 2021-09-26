import BubbleSort from "../algorithms/BubbleSort.js";
import InsertionSort from "../algorithms/InsertionSort.js";
import SelectionSort from "../algorithms/SelectionSort.js";

import ArrayView from "../ui/ArrayView.js";
import CodeView from "../ui/CodeView.js";
import ControllerView from "../ui/ControllerView.js";

import Config from "../utils/Config.js";
import DataController from "./DataController.js";
import SpeedController from "./SpeedController.js";

var algorithmObj, speedController, dataController,
    visualizationStarted, backwardMode, forwardMode, paused,
    stepCountWithSpeed,
    timeouts, startTimeInMs, prevSpeed;


/* contains methods handling sorting animation:

    + play() - method 
    + pause() - method 
    + reset() - method 
    + skipToEnd() - method
    + stepBackward() - method
    + stepForward() - method
    
*/
    

class AnimationController {

    constructor(algorithm, mode){

        this.algorithm = algorithm;
        this.mode = mode;

        // generate initial array
        var array = [];

        for(let i = 0; i < Config.DEFAULT_ARRAY_SIZE; i++){
            array[i] = 1 + Math.floor(Math.random() * Config.DEFAULT_MAX_VALUE); 
        }

        this.unsortedArray = array;

        switch(this.algorithm){
            case Config.BUBBLESORT: 
                algorithmObj = new BubbleSort(array);
                break;
            case Config.INSERTIONSORT: 
                algorithmObj = new InsertionSort(array);
                break;
            case Config.SELECTIONSORT: 
                algorithmObj = new SelectionSort(array);   
                break;
        }


        if(this.mode == Config.MODE_SPEED){
            speedController = new SpeedController(this);
        } else if(this.mode == Config.MODE_DATA){
            dataController = new DataController(this);
        } else if(this.mode == Config.MODE_STEPTHROUGH){
            ControllerView.disableButton("#backward-button");
        }

        this.speed = Config.DEFAULT_SPEED_IN_MS;

        this.currentStep = 0;

        this.sortedArray = algorithmObj.sort();

        this.currentStep = 0;
        this.resumeTimeInMs = 0;

        visualizationStarted = false;
        backwardMode = false;
        forwardMode = false;
        paused = false;

        timeouts = [];
        
        ControllerView.disableButton("#reset-button");
        ArrayView.clearArray();
        ArrayView.renderArray(this.unsortedArray);
        
 
    }

    setUnsortedArray(array){
        this.unsortedArray = array;
        algorithmObj.array = array;
    }

    setSpeed(speed){
        this.speed = speed;
    }



    play(){

        this.speed = this.getAnimationSpeed();

        if(!visualizationStarted){

            //startVisualization

            visualizationStarted = true; 

            /*if(!forwardMode && !backwardMode){
                this.reset();
            }*/

            ControllerView.enableButton("#reset-button");
            if(this.mode == Config.MODE_STEPTHROUGH){
                ControllerView.enableButton("#backward-button");
                ControllerView.enableButton("#skip-to-end-button");
                ControllerView.enableButton("#forward-button");
            } 

            this.sortedArray = algorithmObj.sort();

            ControllerView.changeToPauseButton();

            if(forwardMode || backwardMode){
                forwardMode = false;
                backwardMode = false;
                this.animateStepMatrix(this.speed, this.currentStep + 1);
            } else {
                this.animateStepMatrix(this.speed, 0);
            }
            
            
        } else {

            //resume visualization

            paused = false;

            forwardMode = false;
            backwardMode = false;

            ControllerView.changeToPauseButton();

            var self = this;
                        
            setTimeout(function(){

                self.animateStepMatrix(self.speed, self.currentStep + 1);

            }, this.resumeTimeInMs);            
           
        }

    }

    getAnimationSpeed(){

        var speed;

        if(this.mode == Config.MODE_SPEED){
            speed = speedController.getCurrentSpeed();
        } else {
            speed = this.speed;
        }


        return speed;
    }


    animateStepMatrix(speed, step){

        timeouts = [];

        startTimeInMs = Date.now();
        prevSpeed = speed;
        stepCountWithSpeed = 0;

        var index = 0,
        self = this;
            
        for(let i = step; i < algorithmObj.stepMatrix.length; i++){

            timeouts.push(setTimeout(function animation(){

                visualizationStarted = algorithmObj.animateStep(i);
                self.currentStep = i;
                stepCountWithSpeed++;
                
            }, index * speed));

            index++;

        }
    }



    reset(){

        ControllerView.disableButton("#reset-button");
            if(this.mode == Config.MODE_STEPTHROUGH){
                ControllerView.disableButton("#backward-button");
                ControllerView.enableButton("#skip-to-end-button");
                ControllerView.enableButton("#forward-button");
            } 

        visualizationStarted = false;
        forwardMode = false;
        backwardMode = false;
        paused = false;

        for(let i = 0; i < timeouts.length; i++){
            clearTimeout(timeouts[i]);
        }
        

        ArrayView.clearArray()
        ArrayView.renderArray(this.unsortedArray);

        CodeView.removeHighlighting();

        ControllerView.changeToStartButton();

        // reset speed
        if(this.mode == Config.MODE_SPEED){
            document.getElementById("speed-slider").value = Config.DEFAULT_SPEED_IN_MS;
            this.speed = Config.DEFAULT_SPEED_IN_MS;
        }

        this.currentStep = 0;

    }


    skipToEnd(){

        for(let i = 0; i < timeouts.length; i++){
            clearTimeout(timeouts[i]);
        }
        

        ArrayView.clearArray();
        ArrayView.renderArray(this.sortedArray);

        for(let i = 0; i < this.sortedArray.length; i++){
            ArrayView.markListItemAsSorted(i);
        }

        CodeView.removeHighlighting();

        ControllerView.changeToStartButton();
        ControllerView.enableButton("#reset-button");
        ControllerView.enableButton("#backward-button");
        ControllerView.disableButton("#skip-to-end-button");
        ControllerView.disableButton("#forward-button");


        this.currentStep = algorithmObj.stepMatrix.length - 1;

        visualizationStarted = false;
        forwardMode = false;
        paused = false;

    }

    onSpeedChanged(speed){

        if(visualizationStarted && !paused){
            this.changeSpeed(speed);
        }

    }

    changeSpeed(speed){

        var timeLeftInMs =  (prevSpeed * stepCountWithSpeed) - (Date.now() - startTimeInMs),
            self = this;

        for(let i = 0; i < timeouts.length; i++){
            clearTimeout(timeouts[i]);
        }
    
        setTimeout(function startWithNewSpeed(){
            
            self.animateStepMatrix(speed, self.currentStep + 1);

        }, timeLeftInMs);  
    }


    pause(){

        paused = true;

        this.resumeTimeInMs = (prevSpeed * stepCountWithSpeed) - (Date.now() - startTimeInMs);

        for(let i = 0; i < timeouts.length; i++){
            clearTimeout(timeouts[i]);
        }

        ControllerView.changeToStartButton();
        
    }



    stepBackward(){

        forwardMode = false;

        ControllerView.enableButton("#forward-button");
        ControllerView.enableButton("#skip-to-end-button");

        if(!backwardMode){
            backwardMode = true;

            if(!paused){

                for(let i = 0; i < timeouts.length; i++){
                    clearTimeout(timeouts[i]);
                }
        
                ControllerView.changeToStartButton();
            } 

            if(algorithmObj.swapped){
                algorithmObj.animateStep(this.currentStep);
            } else {
                algorithmObj.animateStep(this.currentStep - 1);
                this.currentStep--;
            }
            

            
        
        } else {

            if(this.currentStep){
                algorithmObj.animateStep(this.currentStep - 1);

                this.currentStep--;

            } else {

                ControllerView.disableButton("#reset-button");
                ControllerView.disableButton("#backward-button");
                CodeView.removeHighlighting();
                return;
            }
           
        }

        

    }


    stepForward(){
        

        if(!forwardMode && !backwardMode){
            forwardMode = true;

            if(visualizationStarted){

                for(let i = 0; i < timeouts.length; i++){
                    clearTimeout(timeouts[i]);
                }
        
                ControllerView.changeToStartButton();

                if(algorithmObj.swapped){
                    algorithmObj.animateStep(this.currentStep + 1);
                    this.currentStep++;
                } else {
                    algorithmObj.animateStep(this.currentStep);
                }
                
    
            } else {
                algorithmObj.animateStep(this.currentStep);
                
            }
            
            ControllerView.enableButton("#reset-button");
            ControllerView.enableButton("#backward-button");
            

        
        } else {
            
            if(backwardMode){
                if(algorithmObj.swapped){
                    algorithmObj.animateStep(this.currentStep);
                } else {
                    algorithmObj.animateStep(this.currentStep + 1);
                    this.currentStep++;
                }
            } else {

                if(this.currentStep != algorithmObj.stepMatrix.length - 1){

                    algorithmObj.animateStep(this.currentStep + 1);
                        this.currentStep++;
    
                    
                } else {
    
                    ControllerView.disableButton("#skip-to-end-button");
                    ControllerView.disableButton("#forward-button");
    
                    return;
                }

            }  
         
        }

        backwardMode = false;

    }

    nearlySort(array){
        return algorithmObj.nearlySort();
    }


}
    

export default AnimationController;