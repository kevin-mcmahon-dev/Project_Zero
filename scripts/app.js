let playerX; //Assigned value based on arrow key entry
let playerWidth = 42;
let obstacleWidth = 60;
let lives = 3;

let startRow = 10; //player start row
let startPlayerMarginRight = 339;
let startPlayerMarginLeft = 339;

let increment = 0; //defined outside function so the value can accumulate
let incrementMiddle = 0;

function moveBlock() {
        
    increment += 2;
    incrementMiddle += 2;

    $(".obstacle1").css({ marginRight: `${increment}px`, marginLeft: `${660-increment}px` }); //had difficulty with syntax of template literals in this case
    $(".obstacle3").css({ marginRight: `${increment}px`, marginLeft: `${660-increment}px` }); 
    $(".obstacle5").css({ marginRight: `${increment}px`, marginLeft: `${660-increment}px` }); 
    $(".obstacle7").css({ marginRight: `${increment}px`, marginLeft: `${660-increment}px` }); 
    $(".obstacle2").css({ marginRight: `${660-increment}px`, marginLeft: `${increment}px` }); 
    $(".obstacle4").css({ marginRight: `${660-increment}px`, marginLeft: `${increment}px` });
    $(".obstacle6").css({ marginRight: `${660-increment}px`, marginLeft: `${increment}px` }); 
    $(".obstacle8").css({ marginRight: `${660-increment}px`, marginLeft: `${increment}px` });

    $(".obstacle9").css({ marginRight: `${360 + incrementMiddle}px`, marginLeft: `${300-incrementMiddle}px` });
    $(".obstacle11").css({ marginRight: `${360 + incrementMiddle}px`, marginLeft: `${300-incrementMiddle}px` });
    $(".obstacle13").css({ marginRight: `${360 + incrementMiddle}px`, marginLeft: `${300-incrementMiddle}px` });
    $(".obstacle15").css({ marginRight: `${360 + incrementMiddle}px`, marginLeft: `${300-incrementMiddle}px` });
    $(".obstacle10").css({ marginRight: `${300-incrementMiddle}px`, marginLeft: `${360 + incrementMiddle}px` }); 
    $(".obstacle12").css({ marginRight: `${300-incrementMiddle}px`, marginLeft: `${360 + incrementMiddle}px` });
    $(".obstacle14").css({ marginRight: `${300-incrementMiddle}px`, marginLeft: `${360 + incrementMiddle}px` }); 
    $(".obstacle16").css({ marginRight: `${300-incrementMiddle}px`, marginLeft: `${360 + incrementMiddle}px` });

    if (increment >= 720) { //resets increment value when obstacle leaves game area, creating appearance that it looped back to original location
        increment = 0;
    }

    if (incrementMiddle >= 360) {
        incrementMiddle = -360;
    }

    if (playerX < (increment + obstacleWidth) && (playerX + playerWidth) > increment && 
        (startRow === 9 || startRow === 7 || startRow === 5 || startRow === 3)) {
        console.log("hit from right");
        lostLife();
    }

    if (playerX < (incrementMiddle + obstacleWidth + 360) && (playerX + playerWidth) > (incrementMiddle + 360) && 
        (startRow === 9 || startRow === 7 || startRow === 5 || startRow === 3)) {
        console.log("hit from right");
        lostLife();
    }

    if (playerX < ((660-increment)+obstacleWidth) && (playerX + playerWidth) > (660-increment) && 
        (startRow === 8 || startRow === 6 || startRow === 4 || startRow === 2)) {
        console.log("hit from left");
        lostLife();
    }

    if (playerX < ((300-incrementMiddle)+obstacleWidth) && (playerX + playerWidth) > (300-incrementMiddle) && 
        (startRow === 8 || startRow === 6 || startRow === 4 || startRow === 2)) {
        console.log("hit from left");
        lostLife();
    }
}

function lostLife() {
    lives -= 1;
    $(".player").css({gridRow: "10", marginRight: "339px"});
    startRow = 10; //player start row
    startPlayerMarginRight = 339;
    startPlayerMarginLeft = 339;

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
            if (startRow === 10) {
                break;
            }
            $(".player").css({gridRow: `${startRow = startRow + 1}`});
            break;
        case "ArrowUp":
            if (startRow === 1) {
                break;
            }
            $(".player").css({gridRow: `${startRow = startRow - 1}`});
            break;
        case "ArrowLeft":
            if (startPlayerMarginLeft < 0) {
                lostLife();
                break;
            }
            $(".player").css({marginRight: `${startPlayerMarginRight += 52}px`, marginLeft: `${startPlayerMarginLeft -= 52}px`});
            break;
        case "ArrowRight":
            if (startPlayerMarginRight < 0) {
                lostLife();
                break;
            }
            $(".player").css({marginRight: `${startPlayerMarginRight -= 52}px`, marginLeft: `${startPlayerMarginLeft += 52}px`});
            
            break;
        default:
            return;
    }

    playerX = startPlayerMarginRight;
    e.preventDefault();
}, true);

setInterval(moveBlock, 7);


