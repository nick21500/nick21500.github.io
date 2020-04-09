/* jslint browser: true, devel: true */
/* eslint-disable no-unused-vars, no-console */
/* global $, alert, window */

$(function () {
    "use strict";
    
    var mobile;
    
    if ($(window).width() >= 1200){
        mobile = "";
    }
    else {
        mobile = "mobile/";
    }

    window.setInterval(function () {
        var now = new Date();

        var hours = now.getHours();
        if (hours >= 12) {
            hours = hours - 12;
        }
        hours = ('0' + hours).slice(-2)

        var minutes = now.getMinutes();

        minutes = ('0' + minutes).slice(-2);

        var time = hours + "" + minutes

        //console.log("current: " + time);

        $("html").css("background-image", "url(images/" + mobile + time + ".png)")

        var timeplusone = parseInt(time) + 1;
        timeplusone = ('0000' + timeplusone).slice(-4);

        //console.log("next: " + timeplusone);

        $("#time img").attr("src", "images/" + mobile + timeplusone + ".png");

    }, 1000);

});
