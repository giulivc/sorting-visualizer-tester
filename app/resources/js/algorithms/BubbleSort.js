import ArrayView from "../ui/ArrayView.js";
import CodeView from "../ui/CodeView.js";
import ControllerView from "../ui/ControllerView.js";

class BubbleSort {

    constructor(array){
        this.array = array;
        this.stepMatrix = [];
       
    }
    
    
    sort(){

        this.stepMatrix = [];

        //clone a work copy of unsorted array
        let array = [...this.array],
            len = array.length;
        

        for(let i = 0; i < len; i++){

            //step for highlighting inner for loop in pseudocode
            this.stepMatrix.push([]);
            this.stepMatrix.push([[]]);

            for(let j = 0; j < len - i - 1; j++){

                //stores the two indices that should be focused (highlighted)
                this.stepMatrix.push([j, j+1]);

                if(array[j] > array[j+1]){

                    //stores if the two indices should be swapped 
                    this.stepMatrix.push([true, j, j+1])
                    let buf = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = buf;
                }
                
            }

            //stores which index should now be marked as sorted 
            this.stepMatrix.push([len - i - 1, true, array]);
            
        }  

        this.stepMatrix.push(array);

        return array;


    }

    animateStep(step){

        this.swapped = false;

        if(!this.stepMatrix[step].length){
            CodeView.highlightStep(0);
            ArrayView.removeFocus();
        }

        if(this.stepMatrix[step].length == 1){
            CodeView.highlightStep(1);
            ArrayView.removeFocus();
        }


        if(this.stepMatrix[step].length == 2){
            
            ArrayView.setFocusOnListItems(this.stepMatrix[step]);
            CodeView.highlightStep(2);
        }

        if(typeof this.stepMatrix[step][0] == "boolean"){

            ArrayView.setFocusOnListItems([this.stepMatrix[step][1], this.stepMatrix[step][2]]);
            
            var a = ArrayView.getListItemById(this.stepMatrix[step][1]),
                b = ArrayView.getListItemById(this.stepMatrix[step][2]);

            a.parentNode.insertBefore(b,a);

            this.swapped = true;

            CodeView.highlightStep(3);
        }

        if(typeof this.stepMatrix[step][1] == "boolean"){
            ArrayView.markListItemAsSorted(this.stepMatrix[step][0]);
        } 

        if(this.stepMatrix[step].length > 3){
            CodeView.removeHighlighting();
            ControllerView.changeToStartButton();

            return false;
        }

        return true;
    }

    nearlySort(array){

    }
}

export default BubbleSort;