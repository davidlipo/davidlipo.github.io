window.onload = function(){
    document.addEventListener("scroll", onScroll);

    // PARALLAX
    var contentHeight = document.getElementById("content").scrollHeight;
    var parallaxImages = document.getElementsByClassName("parallax-image");
    for (var i = 0; i < parallaxImages.length; i++) {
        parallaxImages[i].style.minWidth = window.innerWidth.toString() + "px";
        parallaxImages[i].style.minHeight = (window.innerHeight + 200).toString() + "px";

        var minHeight = window.innerHeight + 200;
        if (minHeight * parallaxImages[i].width / parallaxImages[i].height) {
            parallaxImages[i].style.width = window.innerWidth.toString() + "px";
        } else {
            parallaxImages[i].style.height = minHeight.toString() + "px";
        }
    }

    // LETTERBOX_IMAGE
    var letterboxParents = document.getElementsByClassName("letterbox-parent");
    for (var i = 0; i < letterboxParents.length; i++) {
        var letterboxImage = letterboxParents[i].getElementsByClassName("letterbox-image")[0];
        var scrollPercentage = parseInt(letterboxParents[i].dataset.scrollPercentage, 10) / 100;
        letterboxParents[i].style.height = ((1 - scrollPercentage) * letterboxImage.height).toString() + "px";
        var amountToScroll = -(scrollPercentage * letterboxImage.height);
        letterboxImage.style.marginTop = amountToScroll.toString() + "px";
    }

    // FADE_IMAGE
    var fadeParents = document.getElementsByClassName("fade-parent");
    for (var i = 0; i < fadeParents.length; i++) {
        var fadeImage = fadeParents[i].getElementsByClassName("fade-initial")[0];
        fadeParents[i].style.height = fadeImage.height + "px";
    }
}

function onScroll(event) {
    var screenHeight = window.innerHeight;
    var offset = window.scrollY;
    var contentHeight = document.getElementById("content").scrollHeight;
    var scrollableWindowHeight = contentHeight - screenHeight;
    var percentageScrolled = offset / scrollableWindowHeight;
    var parallaxImages = document.getElementsByClassName("parallax-image");

    var fadePercentage = 0.1;
    var percentageSoFar = 0;
    for (var i = 0; i < parallaxImages.length; i++) {
        var currentPercentage = parseInt((parallaxImages[i].dataset.percentage || 100), 10) / 100;
        var imageScrollableHeight = parallaxImages[i].height - screenHeight;
        if (percentageSoFar - fadePercentage <= percentageScrolled && percentageSoFar + currentPercentage + fadePercentage >= percentageScrolled) {
            var amountToScrollOnImage = imageScrollableHeight * (percentageScrolled - percentageSoFar) / currentPercentage;
            var totalAmountToScroll = -(amountToScrollOnImage);
            parallaxImages[i].style.top = totalAmountToScroll.toString() + "px";
            var amountToFade = 0;
            if (percentageSoFar > percentageScrolled) {
                amountToFade = percentageSoFar - percentageScrolled;
            } else if (percentageSoFar + currentPercentage < percentageScrolled) {
                amountToFade = percentageScrolled - (percentageSoFar + currentPercentage);
            }
            if (amountToFade > 0) {
                var opacity = 1 - (amountToFade / fadePercentage);
                parallaxImages[i].style.opacity = opacity;
            } else {
                parallaxImages[i].style.opacity = 1;
            }
        } else {
            parallaxImages[i].style.top = "50000px";
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
        var boundingBox = divsToFadeIn[i].getBoundingClientRect();
        var distanceToTop = boundingBox.top + (boundingBox.height / 2);
        if (distanceToTop < screenHeight) {
            var distanceToEnd = (boundingBox.height / 2);
            var percentageToGoal = Math.min(1, (screenHeight - distanceToTop) / (screenHeight - distanceToEnd));
            switch (divsToFadeIn[i].dataset.onappear) {
                case "FADE_COLOR":
                    changeColorOnScreen(divsToFadeIn[i], percentageToGoal);
                    break;
                case "PULL_QUOTES":
                    addAnimationClass(divsToFadeIn[i], percentageToGoal);
                    break;
                case "LETTERBOX_IMAGE":
                    scrollLetterbox(divsToFadeIn[i], percentageToGoal);
                    break;
                case "FADE_IMAGE":
                    fadeImage(divsToFadeIn[i], percentageToGoal);
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
            divsToAddClass[i].classList.remove("animationEnd");
            void divsToAddClass[i].offsetWidth; // reading the property requires a recalc
            divsToAddClass[i].classList.add("animationStart");
        } else if (divsToAddClass[i].classList.contains("animationStart") && percentageToGoal < 0.5) {
            divsToAddClass[i].classList.remove("animationStart");
            void divsToAddClass[i].offsetWidth; // reading the property requires a recalc
            divsToAddClass[i].classList.add("animationEnd");
        }
    }
}

function scrollLetterbox(element, percentageToGoal) {
    var startPercentage = 0;
    if (percentageToGoal > startPercentage) {
        var percentageTillEnd = (percentageToGoal - startPercentage) / (1 - startPercentage);
        var letterboxParent = element.getElementsByClassName("letterbox-parent")[0];
        var letterboxImage = letterboxParent.getElementsByClassName("letterbox-image")[0];
        var scrollPercentage = parseInt(letterboxParent.dataset.scrollPercentage, 10) / 100;
        var amountToScroll = -(scrollPercentage * letterboxImage.height * (1 - percentageTillEnd));
        letterboxImage.style.marginTop = (amountToScroll).toString() + "px";
    }
}

function fadeImage(element, percentageToGoal) {
    var startPercentage = 0.2;
    if (percentageToGoal > startPercentage) {
        var percentageTillEnd = (percentageToGoal - startPercentage) / (1 - startPercentage);
        var fadeParent = element.getElementsByClassName("fade-parent")[0];
        var fadeInitial = fadeParent.getElementsByClassName("fade-initial")[0];
        var fadeNew = fadeParent.getElementsByClassName("fade-new")[0];
        fadeNew.style.opacity = percentageTillEnd;
    }
}