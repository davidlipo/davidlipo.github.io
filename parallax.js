window.onload = function(){
    document.addEventListener("scroll", onScroll);

    var speedOfScroll = 0.8;
    var contentHeight = document.getElementById("content").scrollHeight;
    var parallaxImages = document.getElementsByClassName("parallax-image");
    for (var i = 0; i < parallaxImages.length; i++) {
        parallaxImages[i].style.minWidth = window.innerWidth.toString() + "px";
        parallaxImages[i].style.minHeight = (window.innerHeight + 200).toString() + "px";
    }
}

function onScroll(event) {
    var screenHeight = window.innerHeight;
    var offset = window.scrollY;
    var contentHeight = document.getElementById("content").scrollHeight;
    var scrollableWindowHeight = contentHeight - screenHeight;
    var percentageScrolled = offset / scrollableWindowHeight;
    var parallaxImages = document.getElementsByClassName("parallax-image");

    var percentageSoFar = 0;
    for (var i = 0; i < parallaxImages.length; i++) {
        var currentPercentage = parseInt(parallaxImages[i].dataset.percentage, 10) / 100;
        var imageScrollableHeight = parallaxImages[i].height - screenHeight;
        if (percentageSoFar <= percentageScrolled && percentageSoFar + currentPercentage >= percentageScrolled) {
            var amountToScrollOnImage = imageScrollableHeight * (percentageScrolled - percentageSoFar) / currentPercentage;
            var totalAmountToScroll = -(amountToScrollOnImage);
            parallaxImages[i].style.top = totalAmountToScroll.toString() + "px";
        } else {
            parallaxImages[i].style.top = "50000px";
            // TODO - Fade in -----------------------------------------------------------------------
        }
        percentageSoFar += currentPercentage;
    }
    /*var debug = "";
    debug += "screenHeight " + screenHeight + "<br/>";
    debug += "offset " + offset + "<br/>";
    debug += "scrollHeight " + document.body.scrollHeight + "<br/>";
    debug += "scrollableWindowHeight " + scrollableWindowHeight + "<br/>";
    debug += "percentageScrolled " + percentageScrolled + "<br/>";
    debug += "imageScrollableHeight " + imageScrollableHeight + "<br/>";
    debug += "amountToScroll " + amountToScroll + "<br/>";
    document.getElementById("debug").innerHTML = debug;*/

    var divsToFadeIn = document.getElementsByClassName("onappear");
    for (var i = 0; i < divsToFadeIn.length; i++) {
        var distanceToTop = divsToFadeIn[i].getBoundingClientRect().top;
        if (distanceToTop < screenHeight) {
            var distanceToEnd = 200;
            var percentageToGoal = Math.min(1, (screenHeight - distanceToTop) / (screenHeight - distanceToEnd));
            switch (divsToFadeIn[i].dataset.onappear) {
                case "FADE_COLOR":
                    changeColorOnScreen(divsToFadeIn[i], percentageToGoal);
                    break;
                case "PULL_QUOTES":
                    addAnimationClass(divsToFadeIn[i], percentageToGoal);
                    break;
            }
        }
    }
}

function changeColorOnScreen(element, percentageToGoal) {
    var white = parseInt("FFFFFF", 16);
    var yellow = parseInt("FFFF00", 16);
    var color = Math.ceil(percentageToGoal*(white - yellow) + yellow);
    element.style.backgroundColor = "#" + color.toString(16);
}

function addAnimationClass(element, percentageToGoal) {
    var divsToAddClass = element.getElementsByClassName("quotes");
    for (var i = 0; i < divsToAddClass.length; i++) {
        if (!divsToAddClass[i].classList.contains("animationStart") && percentageToGoal > 0.5) {
            divsToAddClass[i].classList.add("animationStart");
        }
    }
}