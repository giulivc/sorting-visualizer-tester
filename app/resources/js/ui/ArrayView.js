import Config from "../utils/Config.js";

var arrayContainer;

class ArrayView {

    constructor(){
        arrayContainer = document.getElementById("array");

    }

    renderArray(array){
        
        let barWidth = this.getBarWidth(array.length);

        for(var i = 0; i < array.length; i++){

            var value = array[i];
            var valueBar = document.createElement("li");

            valueBar.style.width = barWidth + 'px';
            valueBar.style.height = value * 10 + 'px'; 

            arrayContainer.appendChild(valueBar);
        }

    }

    getBarWidth(arraySize){

        if(arraySize <= 15){
            return 20;
        }

        if(arraySize <= 30){
            return 15;
        }

        if(arraySize <= 50){
            return 10;
        }

        if(arraySize <= 70){
            return 5;
        }

        return 2;

    }

    clearArray(){
        arrayContainer.innerHTML = "";
    }

    getListItemById(id){
        return arrayContainer.children[id];
    
    }

    markListItemAsSorted(id){
        let li = this.getListItemById(id);

        this.removeFocus();

        var listItems = arrayContainer.getElementsByTagName("li");

        for(let i = 0; i < listItems.length; i++){

            if(listItems[i].style.backgroundColor == "rgb(214, 204, 255)"){ // #D6CCFF
                listItems[i].style.backgroundColor = "white";
            }
        }


        li.style.backgroundColor = Config.MAIN_GREEN;
    }

    setFocusOnListItems(indices){

        let li1 = this.getListItemById(indices[0]),
            li2 = this.getListItemById(indices[1]);

        this.removeFocus();

        li1.style.backgroundColor = Config.MAIN_ORANGE;
        li2.style.backgroundColor = Config.MAIN_ORANGE;

    }

    setFocusOnListItem(id){

        let li = this.getListItemById(id);
        
        this.removeFocus();

        li.style.backgroundColor = Config.MAIN_ORANGE;
        
    }

    removeFocus(){

        var listItems = arrayContainer.getElementsByTagName("li");

        for(let i = 0; i < listItems.length; i++){

            if(listItems[i].style.backgroundColor == "rgb(255, 153, 0)"){ // #FF9900
                listItems[i].style.backgroundColor = "white";
            }
        }
    }

    clear(){

        var listItems = arrayContainer.getElementsByTagName("li");

        for(let i = 0; i < listItems.length; i++){
            listItems[i].style.backgroundColor = "white";
        }
    }

    markAsPivot(id){

        let li = this.getListItemById(id);

        li.style.backgroundColor = Config.MAIN_PURPLE;

    }

    markAsPreviousPivot(id){
        this.getListItemById(id).style.backgroundColor = Config.LIGHT_PURPLE; 
    }


    swap(id1, id2){

        this.removeFocus();

        
        var a = this.getListItemById(id1);
        var b = this.getListItemById(id2);
        var after_b = b.nextSibling;


        //replace a by b
        arrayContainer.replaceChild(b, a);

        if (after_b) {
            arrayContainer.insertBefore(a, after_b);
            
        } else {
            arrayContainer.appendChild(a);
        } 


    }

    


}

export default new ArrayView();
