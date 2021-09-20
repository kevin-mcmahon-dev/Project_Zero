let increment = 0;
function moveBlockLeft() {
        
    increment += 1;
        console.log(increment);
        $(".obstacle1").css({ marginRight: `${increment}px`, marginLeft: `${660-increment}px` }); //had difficulty with syntax of template literals in this case
        //Trying to make block disappear when it leaves game area
        if (increment >= 720) {
            $(".obstacle1").hide();
        }
    }

setInterval(moveBlockLeft, 10);