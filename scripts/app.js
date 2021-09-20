let increment = 0;
function moveBlockLeft() {
        
    increment += 2;

        $(".obstacle1").css({ marginRight: `${increment}px`, marginLeft: `${660-increment}px` }); //had difficulty with syntax of template literals in this case
        $(".obstacle3").css({ marginRight: `${increment}px`, marginLeft: `${660-increment}px` }); 
        $(".obstacle5").css({ marginRight: `${increment}px`, marginLeft: `${660-increment}px` }); 
        $(".obstacle7").css({ marginRight: `${increment}px`, marginLeft: `${660-increment}px` }); 

        //Trying to make block disappear when it leaves game area
        if (increment >= 720) {
            $(".obstacle1").hide();
            $(".obstacle3").hide();
            $(".obstacle5").hide();
            $(".obstacle7").hide();

        }
    }

let incrementRight = 0;
function moveBlockRight() {
        
    incrementRight += 2;
    $(".obstacle2").css({ marginRight: `${660-incrementRight}px`, marginLeft: `${incrementRight}px` }); 
    $(".obstacle4").css({ marginRight: `${660-incrementRight}px`, marginLeft: `${incrementRight}px` });
    $(".obstacle6").css({ marginRight: `${660-incrementRight}px`, marginLeft: `${incrementRight}px` }); 
    $(".obstacle8").css({ marginRight: `${660-incrementRight}px`, marginLeft: `${incrementRight}px` });
            //Trying to make block disappear when it leaves game area
    if (incrementRight >= 720) {
        $(".obstacle2").hide();
        $(".obstacle4").hide();
        $(".obstacle6").hide();
        $(".obstacle8").hide();
    }
        }

setInterval(moveBlockLeft, 10);
setInterval(moveBlockRight, 10);