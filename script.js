/* jslint browser: true, devel: true */
/* eslint-disable no-unused-vars, no-console */
/* global $, alert, window */

$(function () {
    "use strict";

    var threshold = $("#section-1").offset().top;
    
    $(window).scroll(function(){
        if (window.pageYOffset > threshold) {
            $(".header").addClass("header-bg");
        } else {
            $(".header").removeClass("header-bg");
        }
    });

});
