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

let startRow = 10;
let startPlayerMarginRight = 339;
let startPlayerMarginLeft = 339;
window.addEventListener("keydown", function (e) {
    // if (e.defaultPrevented) {
    //     return;
    // }
    switch (e.key) {
        case "ArrowDown":
            console.log("down");
            if (startRow === 10) {
                break;
            }
            $(".player").css({gridRow: `${startRow = startRow + 1}`});
            break;
        case "ArrowUp":
            console.log("up");
            if (startRow === 1) {
                break;
            }
            $(".player").css({gridRow: `${startRow = startRow - 1}`});
            break;
        case "ArrowLeft":
            console.log("left");
            if (startPlayerMarginLeft <= 0) {
                break;
            }
            $(".player").css({marginRight: `${startPlayerMarginRight += 20}px`, marginLeft: `${startPlayerMarginLeft -= 20}px`});
            break;
        case "ArrowRight":
            console.log("right");
            if (startPlayerMarginRight <= 0) {
                break;
            }
            $(".player").css({marginRight: `${startPlayerMarginRight -= 20}px`, marginLeft: `${startPlayerMarginLeft += 20}px`});
            break;
        default:
            return;
    }

    e.preventDefault();
}, true);

setInterval(moveBlockLeft, 10);
setInterval(moveBlockRight, 10);