let obstacleX;
let playerX;
let playerWidth = 42;
let obstacleWidth = 60;

let startRow = 10; //player start row
let startPlayerMarginRight = 339;
let startPlayerMarginLeft = 339;
let increment = 0;

function moveBlock() {
        
    increment += 2;
    obstacleX = increment;
        $(".obstacle1").css({ marginRight: `${increment}px`, marginLeft: `${660-increment}px` }); //had difficulty with syntax of template literals in this case
        $(".obstacle3").css({ marginRight: `${increment}px`, marginLeft: `${660-increment}px` }); 
        $(".obstacle5").css({ marginRight: `${increment}px`, marginLeft: `${660-increment}px` }); 
        $(".obstacle7").css({ marginRight: `${increment}px`, marginLeft: `${660-increment}px` }); 
        $(".obstacle2").css({ marginRight: `${660-increment}px`, marginLeft: `${increment}px` }); 
        $(".obstacle4").css({ marginRight: `${660-increment}px`, marginLeft: `${increment}px` });
        $(".obstacle6").css({ marginRight: `${660-increment}px`, marginLeft: `${increment}px` }); 
        $(".obstacle8").css({ marginRight: `${660-increment}px`, marginLeft: `${increment}px` });

        //Trying to make block disappear when it leaves game area
        if (increment >= 720) {
            // $(".obstacle1").hide();
            increment = 0;
        }
        //&& $(".obstacle1").css({gridRow: 9/10}) === $(".player").css({gridRow: 9/10}) *conditional addendum to check for grid-row
        if (playerX < (obstacleX + obstacleWidth) && (playerX + playerWidth) > obstacleX && 
            (startRow === 9 || startRow === 7 || startRow === 5 || startRow === 3)) {
            console.log("hit from right");
        }
        if (playerX < ((660-increment)+obstacleWidth) && (playerX + playerWidth) > (660-increment) && 
            (startRow === 8 || startRow === 6 || startRow === 4 || startRow === 2)) {
            console.log("hit from left")
        }
        // console.log(obstacleX);
}

//Previously had two separate functions for motion right and motion left
// let incrementRight = 0;
// function moveBlockRight() {
        
//     incrementRight += 2;
//     $(".obstacle2").css({ marginRight: `${660-incrementRight}px`, marginLeft: `${incrementRight}px` }); 
//     $(".obstacle4").css({ marginRight: `${660-incrementRight}px`, marginLeft: `${incrementRight}px` });
//     $(".obstacle6").css({ marginRight: `${660-incrementRight}px`, marginLeft: `${incrementRight}px` }); 
//     $(".obstacle8").css({ marginRight: `${660-incrementRight}px`, marginLeft: `${incrementRight}px` });
    
//     //Trying to make block disappear when it leaves game area
//     if (incrementRight >= 720) {
//         // $(".obstacle2").hide();
//         incrementRight = 0;
//     }
// }

let lives = 3;
function lostLife() {
    lives -= 1;
    //add code that resets game to beginning
    if (lives <= 0) {
        console.log("Game Over");
        // $("body").css({position: "absolute"}); //create game over message on game board
    }
}
///Event listener to read for arrow key inputs
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
            if (startPlayerMarginLeft < 0) {
                lostLife();
                break;
            }
            $(".player").css({marginRight: `${startPlayerMarginRight += 52}px`, marginLeft: `${startPlayerMarginLeft -= 52}px`});
            break;
        case "ArrowRight":
            console.log("right");
            if (startPlayerMarginRight < 0) {
                lostLife();
                break;
            }
            $(".player").css({marginRight: `${startPlayerMarginRight -= 52}px`, marginLeft: `${startPlayerMarginLeft += 52}px`});
            
            break;
        default:
            return;
    }
    console.log(startRow);
    console.log(startPlayerMarginRight);
    playerX = startPlayerMarginRight;
    e.preventDefault();
}, true);

setInterval(moveBlock, 10);


