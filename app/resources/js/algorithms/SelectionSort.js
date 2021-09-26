import ArrayView from "../ui/ArrayView.js";
import CodeView from "../ui/CodeView.js";
import ControllerView from "../ui/ControllerView.js";

class SelectionSort {

    constructor(array){
        this.array = array;
        this.stepMatrix = [];
       
    }
  
    
    sort(){

        this.stepMatrix = [];
    
        //clone a work copy of unsorted array
        let array = [...this.array],
            len = array.length,
            minimum;
        

        for(let i = 0; i < len; i++){

            //step for highlighting inner for loop in pseudocode
            this.stepMatrix.push([]);
            minimum = i;
            this.stepMatrix.push([i]);
            this.stepMatrix.push([[]]);

            for(let j = i+1; j < len; j++){


                //stores the two indices that should be focused (highlighted)
                this.stepMatrix.push([i, minimum, j]);

                if(array[minimum] > array[j]){

                    //HIER PASSIERT EIN FEHLER QUHUHUQHWUHEUhF

                    //stores if the two indices should be swapped 
                    this.stepMatrix.push([i, j, true]);
                    
                    minimum = j;
                }
                
            }

            if(minimum != i){
                this.stepMatrix.push([true, i, minimum]);

                let buf = array[i];
                array[i] = array[minimum];
                array[minimum] = buf;
            }
            

            //stores which index should now be marked as sorted 
            this.stepMatrix.push([i, true, array]);
            
        }  

        this.stepMatrix.push(array);


        return array;

    }

    animateStep(step){

        this.swapped = false;

        if(!this.stepMatrix[step].length){
            CodeView.highlightStep(0);
            ArrayView.clear();
            for(let i = 0; i < this.stepMatrix[step+1][0]; i++){
                ArrayView.markListItemAsSorted(i);
            }
        }

        if(this.stepMatrix[step].length == 1 && this.stepMatrix[step][0].length != 0){
            CodeView.highlightStep(1);
            ArrayView.clear();
            for(let i = 0; i < this.stepMatrix[step][0]; i++){
                ArrayView.markListItemAsSorted(i);
            }
            ArrayView.markAsPivot(this.stepMatrix[step][0]);
        }

        if(this.stepMatrix[step].length == 1 && this.stepMatrix[step][0].length == 0){
            CodeView.highlightStep(2);
            ArrayView.removeFocus();
        }


        if(this.stepMatrix[step].length == 3 && !this.stepMatrix[step].some((el) => typeof el == "boolean")){

            CodeView.highlightStep(3);

            ArrayView.clear();
            for(let i = 0; i < this.stepMatrix[step][0]; i++){
                ArrayView.markListItemAsSorted(i);
            }

            if(this.stepMatrix[step][0] != this.stepMatrix[step][1]){
                ArrayView.markAsPreviousPivot(this.stepMatrix[step][0]);
            }
            
            ArrayView.markAsPivot(this.stepMatrix[step][1]);
            ArrayView.setFocusOnListItem(this.stepMatrix[step][2]);
            
        }

        if(typeof this.stepMatrix[step][2] == "boolean"){
            ArrayView.clear();
            for(let i = 0; i < this.stepMatrix[step][0]; i++){
                ArrayView.markListItemAsSorted(i);
            }
            ArrayView.markAsPreviousPivot(this.stepMatrix[step][0]);
            ArrayView.markAsPivot(this.stepMatrix[step][1]);

            CodeView.highlightStep(4);
        }

        if(this.stepMatrix[step][0] === true){

            ArrayView.clear();
            for(let i = 0; i < this.stepMatrix[step][1]; i++){
                ArrayView.markListItemAsSorted(i);
            }

            ArrayView.markAsPivot(this.stepMatrix[step][1]); 
            ArrayView.markAsPivot(this.stepMatrix[step][2]);
            
            ArrayView.swap(this.stepMatrix[step][1], this.stepMatrix[step][2]);

            this.swapped = true;

            CodeView.highlightStep(6);
        }


        if(typeof this.stepMatrix[step][1] == "boolean"){
            ArrayView.clear();
            for(let i = 0; i <= this.stepMatrix[step][0]; i++){
                ArrayView.markListItemAsSorted(i);
            }
            
        } 

        if(this.stepMatrix[step].length > 3){
            CodeView.removeHighlighting();
            ControllerView.changeToStartButton();

            return false;
        }
        
        return true;

    }

}   

export default SelectionSort;