import ArrayView from "../ui/ArrayView.js";
import CodeView from "../ui/CodeView.js";
import ControllerView from "../ui/ControllerView.js";

class InsertionSort {

    constructor(array){
        this.array = array;
        this.stepMatrix = [];
       
    }

    sort(){

        this.stepMatrix = [];
    
        //clone a work copy of unsorted array
        let array = [...this.array],
            len = array.length;


        for (let i = 0; i < len; i++) {

            this.stepMatrix.push([]);
            this.stepMatrix.push([i]);
            this.stepMatrix.push([[]]);

            for (let j = i; j > 0 ; j--) {
                
                this.stepMatrix.push([j, j-1, i]);
                if(array[j] < array[j - 1]){
                    this.stepMatrix.push([true, j, j-1]);
                    this.stepMatrix.push([false, j-1, i]);
                    [array[j], array[j - 1]] = [array[j - 1], array[j]];
                } else {
                    break;
                }
                
            }

            this.stepMatrix.push([i, true]);
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
            ArrayView.clear();
            for(let i = 0; i < this.stepMatrix[step][0]; i++){
                ArrayView.markListItemAsSorted(i);
            }
            ArrayView.markAsPivot(this.stepMatrix[step][0]);
            CodeView.highlightStep(1);
        }

        if(this.stepMatrix[step].length == 1 && this.stepMatrix[step][0].length == 0){
            CodeView.highlightStep(2);
        }

        if(this.stepMatrix[step].length == 3 && typeof this.stepMatrix[step][0] != "boolean"){ 
            ArrayView.clear();
            for(let i = 0; i <= this.stepMatrix[step][2]; i++){
                ArrayView.markListItemAsSorted(i);
            }
            ArrayView.setFocusOnListItems([this.stepMatrix[step][0], this.stepMatrix[step][1]]);
            CodeView.highlightStep(2);
        }

        if(this.stepMatrix[step].length == 3 && this.stepMatrix[step][0] === true){

            var a = ArrayView.getListItemById(this.stepMatrix[step][2]),
                b = ArrayView.getListItemById(this.stepMatrix[step][1]);

            a.parentNode.insertBefore(b,a);

            this.swapped = true;

            CodeView.highlightStep(3);
        }

        if(this.stepMatrix[step].length == 3 && this.stepMatrix[step][0] === false){

            ArrayView.clear();
            for(let i = 0; i <= this.stepMatrix[step][2]; i++){
                ArrayView.markListItemAsSorted(i);
            }

            ArrayView.markAsPivot(this.stepMatrix[step][1]);

            //  CodeView.highlightStep(3); 

        }

        if(this.stepMatrix[step].length == 2 && typeof this.stepMatrix[step][1] == "boolean"){
            ArrayView.removeFocus();
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

export default InsertionSort;