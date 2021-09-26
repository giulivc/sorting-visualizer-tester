class CodeView {

    getCurrentCodeContainer(){

        var codeContainer;

        document.querySelectorAll('.pseudocode').forEach(function(ul){

            if(ul.style.display == "block"){
                codeContainer = ul;
            }
        });

        return codeContainer;

    }


    highlightStep(stepNum){
        let line = this.getCurrentCodeContainer().children[stepNum];

        this.removeHighlighting();
        
        if(!line.classList.contains("highlighted")){
            line.classList.add("highlighted");
        }    
    }

    removeHighlighting(){
        
        var listItems = this.getCurrentCodeContainer().getElementsByTagName("li");

        for(let i = 0; i < listItems.length; i++){

            if(listItems[i].classList.contains("highlighted")){
                listItems[i].classList.remove("highlighted");
            }
        }
        
    }


}

export default new CodeView();
