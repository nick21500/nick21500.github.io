/* jslint browser: true, devel: true */
/* eslint-disable no-unused-vars, no-console */
/* global $, alert, console, window */

$(function () {
    "use strict";

    var deg3 = Math.floor(Math.random() * 8) * 45;
    $("#3").rotate(deg3);
    var deg2 = Math.floor(Math.random() * 8) * 45;
    $("#2").rotate(deg2);
    var deg1 = Math.floor(Math.random() * 8) * 45;
    $("#1").rotate(deg1);

    var finaldeg3 = deg3;
    var finaldeg2 = deg2;
    var finaldeg1 = deg1;

    /*
    debug
    console.log("finaldeg3 (small):  " + finaldeg3);
    console.log("finaldeg2 (medium): " + finaldeg2);
    console.log("finaldeg1 (large):  " + finaldeg1);
    console.log("");
    */

    $("#3l").on("click", function () {
        deg3 -= 45;
        finaldeg3 -= 45;
        if (deg3 % 360 == 0 && deg3 != 0) {
            finaldeg3 = 0;
        }
        
        if (finaldeg3 < 0) {
            finaldeg3 = 360 - Math.abs(finaldeg3);
        }
        //MAYBE
        if (finaldeg3 % 360 == 0) {
            finaldeg3 = 0;
        }
        
        $("#3").rotate({
            animateTo: deg3
        });
    })
    $("#3r").on("click", function () {
        deg3 += 45;
        finaldeg3 += 45;
        if (deg3 % 360 == 0 && deg3 != 0) {
            finaldeg3 = 0;
        }
        
        if (finaldeg3 < 0) {
            finaldeg3 = 360 - Math.abs(finaldeg3);
        }
        //MAYBE
        if (finaldeg3 % 360 == 0) {
            finaldeg3 = 0;
        }
        
        $("#3").rotate({
            animateTo: deg3
        });
    })

    $("#2l").on("click", function () {
        deg2 -= 45;
        finaldeg2 -= 45;
        if (deg2 % 360 == 0 && deg2 != 0) {
            finaldeg2 = 0;
        }
        
        if (finaldeg2 < 0) {
            finaldeg2 = 360 - Math.abs(finaldeg2);
        }
        //MAYBE
        if (finaldeg2 % 360 == 0) {
            finaldeg2 = 0;
        }
        
        $("#2").rotate({
            animateTo: deg2
        });
    })
    $("#2r").on("click", function () {
        deg2 += 45;
        finaldeg2 += 45;
        if (deg2 % 360 == 0 && deg2 != 0) {
            finaldeg2 = 0;
        }
        
        if (finaldeg2 < 0) {
            finaldeg2 = 360 - Math.abs(finaldeg2);
        }
        //MAYBE
        if (finaldeg2 % 360 == 0) {
            finaldeg2 = 0;
        }
        
        $("#2").rotate({
            animateTo: deg2
        });
    })

    $("#1l").on("click", function () {
        deg1 -= 45;
        finaldeg1 -= 45;
        if (deg1 % 360 == 0 && deg1 != 0) {
            finaldeg1 = 0;
        }
        
        if (finaldeg1 < 0) {
            finaldeg1 = 360 - Math.abs(finaldeg1);
        }
        //MAYBE
        if (finaldeg1 % 360 == 0) {
            finaldeg1 = 0;
        }
        
        $("#1").rotate({
            animateTo: deg1
        });
    })
    $("#1r").on("click", function () {
        deg1 += 45;
        finaldeg1 += 45;
        if (deg1 % 360 == 0 && deg1 != 0) {
            finaldeg1 = 0;
        }
        
        if (finaldeg1 < 0) {
            finaldeg1 = 360 - Math.abs(finaldeg1);
        }
        //MAYBE
        if (finaldeg1 % 360 == 0) {
            finaldeg1 = 0;
        }
        
        $("#1").rotate({
            animateTo: deg1
        });
    })

    
    /*
    debug
    $("#eye").on("click", function () {
        console.log("finaldeg3 (small):  " + finaldeg3);
        console.log("finaldeg2 (medium): " + finaldeg2);
        console.log("finaldeg1 (large):  " + finaldeg1);
        console.log("");
    })
    */
    

    //Check for "FOG"
    $("#eye").on("click", function () {
        if ((finaldeg2 - finaldeg1 == 135 || finaldeg2 - finaldeg1 == -225) && (finaldeg3 - finaldeg2 == 135 || finaldeg3 - finaldeg2 == -225)) {
            window.location.replace("http://nicolasorlandini.rocks/boofq/fog");
        }
    })

    // You can't take my images
    $("img").attr("draggable", "false");

});
