/* jslint browser: true, devel: true */
/* eslint-disable no-unused-vars, no-console */
/* global $, alert, console, document, window */

$(function () {
    "use strict";

    $("#hero-scroll").on("click", function () {
        $.scrollTo("#section-1", 800);
        //console.log("scrollTo");
    });

    $("#menu").on("click", function () {
        $("#sidenav").css("width", "250px");
    });

    $("#close").on("click", function () {
        $("#sidenav").css("width", "0");
    });


    var imageCount = 8;
    var filter = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))";
    var randomImg = "url('../../resources/img/hero/" + (Math.floor(Math.random() * imageCount) + 1) + ".jpg')";

    //console.log(randomImg);

    $(".hero-image").not(".custom").css({
        "background-image": filter + ", " + randomImg
    });

    $(".hero-text h1").fitText(0.6);

});
