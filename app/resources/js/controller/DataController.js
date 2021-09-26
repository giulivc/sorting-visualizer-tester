import Config from "../utils/Config.js";
import ArrayView from "../ui/ArrayView.js";


var randomGenDiv, customGenDiv,
    dataToggle, generateRandomButton, generateCustomButton,
    sizeInput, sizeSlider, modePicker,
    customArrayInputBox, errorMsgField;


/* class for data mode with following features: 

    + manipulate array size
    + choose between generatin random, nearly sorted or sorted array
    + input a custom array 

*/

class DataController {

    constructor(animationController){

        this.animationController = animationController;

        randomGenDiv = document.getElementById("random-generator");
        customGenDiv = document.getElementById("custom-generator");

        dataToggle = document.getElementById("data-toggle");
        dataToggle.addEventListener("change", (event) => this.onToggleChecked());

        generateRandomButton = document.getElementById("generate-random");
        generateRandomButton.addEventListener("click", (event) => this.onGenerateRandom());

        generateCustomButton = document.getElementById("generate-custom");
        generateCustomButton.addEventListener("click", (event) => this.onGenerateCustom());


        sizeSlider = document.getElementById("size-setting");
        sizeInput = document.getElementById("size-input");

        sizeSlider.addEventListener("input", (event) => this.onSizeInput());
        sizeInput.addEventListener ("change", function () {
            
            if(!isNaN(this.value.trim())){
                sizeSlider.value = this.value.trim();
            }

            this.value = sizeSlider.value;
            
            
         });

        customArrayInputBox = document.getElementById("custom-input");

        errorMsgField = document.getElementById("error-text");

        modePicker = document.getElementById("mode-picker");

        modePicker.addEventListener("click", (event) => this.onModeSelected(event.target));

        this.selectedMode = Config.MODE_RANDOM;

        
    }

    onToggleChecked(){
        if(dataToggle.checked){
            this.displayCustomGenerator();
        } else {
            this.displayRandomGenerator();
        }
    }

    displayRandomGenerator(){
        customGenDiv.style.display = "none";
        randomGenDiv.style.display = "block";
    }

    displayCustomGenerator(){
        randomGenDiv.style.display = "none";
        customGenDiv.style.display = "block";
    }
    
    onGenerateRandom(){

        this.animationController.reset();

        let size = sizeSlider.value, array = [];

        for(let i = 0; i < size; i++){
            array[i] = 1 + Math.floor(Math.random() * Config.DEFAULT_MAX_VALUE);
        }

        

        switch(this.selectedMode){

            case Config.SETTING_RANDOM: 
                break;

            case Config.SETTING_NEARLY_SORTED: 
                this.nearlySort(array);
                break;

            case Config.SETTING_SORTED: 
                array.sort(function(a, b){ return a-b });
                break;
        }


        ArrayView.clearArray();
        ArrayView.renderArray(array);

        this.animationController.setUnsortedArray(array);
        this.animationController.setSpeed(this.getSpeed(size));
        


    }
    
    nearlySort(array){
        this.quickSortNearly(array, 0, array.length - 1);
    }

    
    quickSortNearly(arr, start, end) {
        // Base case or terminating case

        if (Math.abs(start - end) <= 3) {
            return;
        }
        
        // Returns pivotIndex
        let index = this.partition(arr, start, end);
        
        // Recursively apply the same logic to the left and right subarrays
        this.quickSortNearly(arr, start, index - 1);
        this.quickSortNearly(arr, index + 1, end);
    }

    partition(arr, start, end){
        // Taking the last element as the pivot
        const pivotValue = arr[end];
        let pivotIndex = start; 
        for (let i = start; i < end; i++) {
            if (arr[i] < pivotValue) {
            // Swapping elements
            [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
            // Moving to next element
            pivotIndex++;
            }
        }
        
        // Putting the pivot value in the middle
        [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]] 
        return pivotIndex;
    }




    getSpeed(arraySize){

        if(arraySize <= 15){
            return 1000;
        }

        if(arraySize <= 30){
            return 750;
        }

        if(arraySize <= 50){
            return 200;
        }

        if(arraySize <= 70){
            return 50;
        }

        return 10;
    }



    onGenerateCustom(){

        this.animationController.reset();

        errorMsgField.style.visibility = "hidden";
        
        var input = customArrayInputBox.value;

        if(this.isValid(input)){

            let inputArray = input.split(','),
                size = inputArray.length,
                array = [];


            if(size >= 4){
                if(size > 20){
                    errorMsgField.style.visibility = "visible";
                    errorMsgField.innerHTML = "You exceeded the maximum of 20 elements.";
                    return;
                }
                for(let i = 0; i < size; i++) {
                    if(inputArray[i] > Config.DEFAULT_MAX_VALUE){

                        errorMsgField.style.visibility = "visible";
                        errorMsgField.innerHTML = "You can't enter numbers higher than " + Config.DEFAULT_MAX_VALUE + ". (" + inputArray[i] + " is out of range)";
                        return;

                    } else if (inputArray[i] <= 0){

                        errorMsgField.style.visibility = "visible";
                        errorMsgField.innerHTML = "You can't enter numbers less than or equal to 0. (" + inputArray[i] + " is out of range)";
                        return;

                    } else {
                        array[i] = parseInt(inputArray[i]);
                    }
                }
    
                ArrayView.clearArray();
                ArrayView.renderArray(array);
    
                this.animationController.setUnsortedArray(array);
            } else {
                errorMsgField.style.visibility = "visible";
                errorMsgField.innerHTML = "You have to enter a minimum of 4 elements.";
                return;
            }

        }


    }

    isValid(input){

        
        if(input.match("^\\s*[0-9]+(,\\s*[0-9]*\\s*)*$")){
            return true;
        } else {
            errorMsgField.style.visibility = "visible";
            errorMsgField.innerHTML = "Your entry doesn't match the required format. (x, y, z, ...)";
            return false;
        }
        
    }

    onSizeInput(){
        sizeInput.value = sizeSlider.value;
    }

    onModeSelected(target){

        var modeButtons = target.parentNode.children;
        for(let i = 0; i <  modeButtons.length; i++){
            modeButtons[i].classList.remove("selected");
        }

        target.classList.add("selected");

        this.selectedMode = parseInt(target.id);

    }


}

export default DataController;