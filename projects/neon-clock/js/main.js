/* jslint browser: true, devel: true */
/* eslint-disable no-unused-vars, no-console */
/* global $ */

$(function () {
    "use strict";

    /*
    function loadImage(x) {
        var preload = new createjs.LoadQueue();
        preload.addEventListener("fileload", handleFileComplete);
        preload.loadFile("../images/" + x + ".png");
    }
    */

    window.setInterval(function () {
        var now = new Date();

        var hours = now.getHours();
        if (hours >= 12) {
            hours = hours - 12;
        }
        hours = ('0' + hours).slice(-2)

        var minutes = now.getMinutes();

        var time = hours + "" + minutes

        //$("#time").text(time);

        $("html").css("background-image", "url(images/" + time + ".png)")
        
        //loadImage(time + 1);

    }, 1000);

});
