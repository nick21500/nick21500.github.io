/* jslint browser: true, devel: true */
/* eslint-disable no-unused-vars, no-console */
/* global $, alert, console, window */

$(function () {
    "use strict";

    $("#hero-scroll").on("click", function () {
        $.scrollTo("#section-1", 800);
        console.log("scrollTo");
    });

    $("#menu").on("click", function () {
        $("#mySidenav").css("width", "250px");
    });

    $("#closeBtn").on("click", function () {
        $("#mySidenav").css("width", "0");
    });


    var imageCount = 8;
    var filter = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))";
    var randomImg = "url('../../resources/img/hero/" + (Math.floor(Math.random() * imageCount) + 1) + ".jpg')";

    //console.log(randomImg);

    $(".hero-image").css({
        "background-image": filter + ", " + randomImg
    });


    /* curator-feed-default-feed-layout */
    (function () {
        var i, e, d = document,
            s = "script";
        i = d.createElement("script");
        i.async = 1;
        i.src = "https://cdn.curator.io/published/c0c78e5c-e7b7-4662-9022-8dff1ff268f4.js";
        e = d.getElementsByTagName(s)[0];
        e.parentNode.insertBefore(i, e);
    })();

});
