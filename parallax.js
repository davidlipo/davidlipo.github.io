window.onload = function(){
    document.addEventListener("scroll", onScroll);
}

function onScroll(event) {
    var screenHeight = window.innerHeight;
    var offset = window.scrollY;
    var scrollableWindowHeight = document.getElementById("content").scrollHeight - screenHeight;
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
}