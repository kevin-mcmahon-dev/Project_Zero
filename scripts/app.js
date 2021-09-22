let lives = 3;
let timer = 0;

function playGame() {

    $(".player").css({backgroundColor: "rgba(0,0,0,100)"});
    $(".obstacle").css({backgroundColor: "rgba(0,0,0,100)"});
    $(".startGame").css({display: "none"});

    let playerX; //Assigned value based on arrow key entry
    let playerWidth = 42;
    let obstacleWidth = 60;

    let startRow = 10; //player start row
    let startPlayerMarginRight = 339;
    let startPlayerMarginLeft = 339;

    let incrementLeft = 0; //defined outside function so the value can accumulate
    let incrementMiddleLeft = 0;
    let incrementRight = 0;
    let incrementMiddleRight = 0;

    //Controls motion of obstacles, hit detection, and detemines if player has reached end zone
    function moveBlockLeft() {

        incrementLeft += 2;

        $(".motionLeft").css({ marginRight: `${-60+incrementLeft}px`, marginLeft: `${720-incrementLeft}px` }); //had difficulty with syntax of template literals in this case

        if (incrementLeft >= 780) { //resets increment value when obstacle leaves game area, creating appearance that it looped back to original location
            incrementLeft = 0;
        }

        if (playerX < (incrementLeft - 60 + obstacleWidth) && (playerX + playerWidth) > (incrementLeft-60) && 
            (startRow === 9 || startRow === 7 || startRow === 5 || startRow === 3)) {
            console.log("hit from right");
            lostLife();
        }

        //If player reaches end zone, game is over, and winGame() is executed
        if (startRow === 1) {
            winGame();
        }
    }

    setInterval(moveBlockLeft, 4);

    function moveBlockMiddleLeft() {

        incrementMiddleLeft += 2;

        $(".motionLeftOffset").css({ marginRight: `${360 + incrementMiddleLeft}px`, marginLeft: `${300-incrementMiddleLeft}px` });

        if (incrementMiddleLeft >= 360) {
            incrementMiddleLeft = -420;
        }

        if (playerX < (incrementMiddleLeft + obstacleWidth + 360) && (playerX + playerWidth) > (incrementMiddleLeft + 360) && 
            (startRow === 9 || startRow === 7 || startRow === 5 || startRow === 3)) {
            console.log("hit from right");
            lostLife();
        }

        //If player reaches end zone, game is over, and winGame() is executed
        if (startRow === 1) {
            winGame();
        }
    }

    setInterval(moveBlockMiddleLeft, 7);

    function moveBlockRight() {

        incrementRight += 2;

        $(".motionRight").css({ marginRight: `${720-incrementRight}px`, marginLeft: `${-60+incrementRight}px` }); 

        if (incrementRight >= 780) { //resets increment value when obstacle leaves game area, creating appearance that it looped back to original location
            incrementRight = 0;
        }

        if (playerX < ((720-incrementRight)+obstacleWidth) && (playerX + playerWidth) > (720-incrementRight) && 
            (startRow === 8 || startRow === 6 || startRow === 4 || startRow === 2)) {
            console.log("hit from left");
            lostLife();
        }

        //If player reaches end zone, game is over, and winGame() is executed
        if (startRow === 1) {
            winGame();
        }
    }

    setInterval(moveBlockRight, 5);

    function moveBlockMiddleRight() {

        incrementMiddleRight += 2;

        $(".motionRightOffset").css({ marginRight: `${300-incrementMiddleRight}px`, marginLeft: `${360 + incrementMiddleRight}px` }); 

        if (incrementMiddleRight >= 360) {
            incrementMiddleRight = -420;
        }

        if (playerX < ((300-incrementMiddleRight)+obstacleWidth) && (playerX + playerWidth) > (300-incrementMiddleRight) && 
            (startRow === 8 || startRow === 6 || startRow === 4 || startRow === 2)) {
            console.log("hit from left");
            lostLife();
        }

        //If player reaches end zone, game is over, and winGame() is executed
        if (startRow === 1) {
            winGame();
        }
    }

    setInterval(moveBlockMiddleRight, 4);

    //Defines what occurs when player wins game
    function winGame() {
        $(".player").css({gridRow: "10", marginRight: "339px", marginLeft: "339px"});
        startRow = 10; //player start row
        startPlayerMarginRight = 339;
        startPlayerMarginLeft = 339;

        $("#gameContainer").css({display: "none"});
        $(".Win-Message").text(`You Win! You completed the game in ${timer} seconds!`)
        console.log(timer);
        $(".Win-Message").css({display: "block"})
        $(".playAgain").css({display: "block"});
        lives = 3;
        return;
    }

    function lostLife() {
        console.log("lost life");
        lives -= 1;
        $(".player").css({gridRow: "10", marginRight: "339px", marginLeft: "339px"});
        startRow = 10; //player start row
        startPlayerMarginRight = 339;
        startPlayerMarginLeft = 339;

        if (lives === 2) {
            $(".heart3").css({display: "none"});
        } else if (lives === 1) {
            $(".heart2").css({display: "none"});
        } else if (lives <= 0) {
            $("#gameContainer").css({display: "none"});
            $(".Loss-Message").css({display: "block"})
            $(".playAgain").css({display: "block"});
            return;
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
                console.log("down");
                $(".player").css({gridRow: `${startRow = startRow + 1}`});
                break;
            case "ArrowUp":
                if (startRow === 1) {
                    break;
                }
                console.log("up");
                $(".player").css({gridRow: `${startRow = startRow - 1}`});
                break;
            case "ArrowLeft":
                if (startPlayerMarginLeft < 0) {
                    lostLife();
                    break;
                }
                console.log("left");
                $(".player").css({marginRight: `${startPlayerMarginRight += 52}px`, marginLeft: `${startPlayerMarginLeft -= 52}px`});
                break;
            case "ArrowRight":
                if (startPlayerMarginRight < 0) {
                    lostLife();
                    break;
                }
                console.log("right");
                $(".player").css({marginRight: `${startPlayerMarginRight -= 52}px`, marginLeft: `${startPlayerMarginLeft += 52}px`});

                break;
            // default:
            //     return;
        }

        playerX = startPlayerMarginRight;
        e.preventDefault();
    }, true);
    
    //tracks time in the game
    function timerRun() {
        timer++;
        $(".Timer").text(`Time: ${timer}s`);
    }
    setInterval(timerRun, 1000);
}

//Event listener on button to start game
$(".startGame").on("click", playGame);

//Button click to play again after victory or gameover
$(".playAgain").on("click", function () {
    console.log("Another one");

    $("#gameContainer").css({display: "grid"});
    $(".Loss-Message").css({display: "none"});
    $(".Win-Message").css({display: "none"});
    $(".playAgain").css({display: "none"});

    lives = 3;
    timer = 0;
    $(".Timer").text(`Time: ${timer}s`);
    $(".heart2").css({display: "inline"});
    $(".heart3").css({display: "inline"});
    $(".player").css({gridRow: "10", marginRight: "339px", marginLeft: "339px"});
    document.querySelector("#gameContainer").reset();
    // $("#gameContainer").reset();

    playGame();
});

//Old motion function with all obstacles combined:

   // function moveBlock() { //This combines the motion functions into one; however, only one speed can be chosen for all blocks

    //     increment += 2;
    //     incrementMiddle += 2;

    //     $(".motionLeft").css({ marginRight: `${-60+increment}px`, marginLeft: `${720-increment}px` }); //had difficulty with syntax of template literals in this case
    //     $(".motionRight").css({ marginRight: `${720-increment}px`, marginLeft: `${-60+increment}px` }); 

    //     $(".motionLeftOffset").css({ marginRight: `${360 + incrementMiddle}px`, marginLeft: `${300-incrementMiddle}px` });
    //     $(".motionRightOffset").css({ marginRight: `${300-incrementMiddle}px`, marginLeft: `${360 + incrementMiddle}px` }); 

    //     if (increment >= 780) { //resets increment value when obstacle leaves game area, creating appearance that it looped back to original location
    //         increment = 0;
    //     }

    //     if (incrementMiddle >= 360) {
    //         incrementMiddle = -420;
    //     }

    //     if (playerX < (increment - 60 + obstacleWidth) && (playerX + playerWidth) > (increment-60) && 
    //         (startRow === 9 || startRow === 7 || startRow === 5 || startRow === 3)) {
    //         console.log("hit from right");
    //         lostLife();
    //     }

    //     if (playerX < (incrementMiddle + obstacleWidth + 360) && (playerX + playerWidth) > (incrementMiddle + 360) && 
    //         (startRow === 9 || startRow === 7 || startRow === 5 || startRow === 3)) {
    //         console.log("hit from right");
    //         lostLife();
    //     }

    //     if (playerX < ((720-increment)+obstacleWidth) && (playerX + playerWidth) > (720-increment) && 
    //         (startRow === 8 || startRow === 6 || startRow === 4 || startRow === 2)) {
    //         console.log("hit from left");
    //         lostLife();
    //     }

    //     if (playerX < ((300-incrementMiddle)+obstacleWidth) && (playerX + playerWidth) > (300-incrementMiddle) && 
    //         (startRow === 8 || startRow === 6 || startRow === 4 || startRow === 2)) {
    //         console.log("hit from left");
    //         lostLife();
    //     }

    //     //If player reaches end zone, game is over, and winGame() is executed
    //     if (startRow === 1) {
    //         winGame();
    //     }
    // }

    // setInterval(moveBlock, 50);

