window.onload = function(){
    document.addEventListener("scroll", onScroll);
}

function onScroll(event) {
    var screenHeight = window.innerHeight;
    var offset = window.scrollY;
    var contentHeight = document.getElementById("content").scrollHeight;
    var scrollableWindowHeight = contentHeight - screenHeight;
    var percentageScrolled = offset / scrollableWindowHeight;
    var parallaxImage = document.getElementById("parallax-image");
    var imageScrollableHeight = parallaxImage.height - screenHeight;
    var amountToScroll = -imageScrollableHeight * percentageScrolled;
    parallaxImage.style.marginTop = amountToScroll.toString() + "px";
    /*var debug = "";
    debug += "screenHeight " + screenHeight + "<br/>";
    debug += "offset " + offset + "<br/>";
    debug += "scrollHeight " + document.body.scrollHeight + "<br/>";
    debug += "scrollableWindowHeight " + scrollableWindowHeight + "<br/>";
    debug += "percentageScrolled " + percentageScrolled + "<br/>";
    debug += "imageScrollableHeight " + imageScrollableHeight + "<br/>";
    debug += "amountToScroll " + amountToScroll + "<br/>";
    document.getElementById("debug").innerHTML = debug;*/

    var distanceToTop = document.getElementById("fadeIn").getBoundingClientRect().top;
    if (distanceToTop < screenHeight) {
        changeColorOnScreen();
        var distanceToEnd = 200;
        var white = parseInt("FFFFFF", 16);
        var yellow = parseInt("FFFF00", 16);
        var percentageToGoal = Math.min(1, (screenHeight - distanceToTop) / (screenHeight - distanceToEnd));
        var color = Math.ceil(percentageToGoal*(white - yellow) + yellow);
        document.getElementById("fadeIn").style.backgroundColor = "#" + color.toString(16);
    }
}

function changeColorOnScreen(element, distanceToEnd) {

}