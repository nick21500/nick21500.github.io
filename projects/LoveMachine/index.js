/* jslint browser: true, devel: true */
/* eslint-disable no-unused-vars */
/* global $, alert, document, noUiSlider, window */

$(function () {
    "use strict";

    // Code for the ""slideshow""
    var slideIndex = 1;
    showSlides(slideIndex);

    function showSlides(n) {
        var i;
        var slides = $(".slide");

        if (n > slides.length) {
            slideIndex = 1
        }

        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex - 1].style.display = "block";
    }

    // Listens for a click of the "Pass" button
    var clicked = false;
    $(".pass").on("click", function () {
        // Swipe and fade the currently displayed user to the left
        $("#user" + slideIndex).animate({
            "right": "+=200px",
            "opacity": "0"
        }, 200);
        // Also bring it back but in a way that won't be seen to the user
        // The animation is so long that by the time it starts to fade in, the slideshow code will have already set its display to none
        $("#user" + slideIndex).animate({
            "right": "-=200px",
            "opacity": "1"
        }, 2000);

        // The first time "Pass" is clicked, fade out its label
        if (clicked == false) {
            $(".label").animate({
                "opacity": "0"
            }, 200);
            clicked = true;
        }

        // After the card is swiped and faded, run the slideshow code to display the next card
        window.setTimeout(function () {
            showSlides(slideIndex += 1);
        }, 400);
    });

    // Listens for a click of the "Like" button and does all the same stuff
    $(".like").on("click", function () {
        $("#user" + slideIndex).animate({
            "left": "+=200px",
            "opacity": "0"
        }, 200);
        $("#user" + slideIndex).animate({
            "left": "-=200px",
            "opacity": "1"
        }, 2000);

        if (clicked == false) {
            $(".label").animate({
                "opacity": "0"
            }, 200);
            clicked = true;
        }

        window.setTimeout(function () {
            showSlides(slideIndex += 1);
        }, 400);
    });
});
