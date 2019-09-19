/* jslint browser: true, devel: true */
/* eslint-disable no-unused-vars, no-console */
/* global $ */

$(function () {
    "use strict";

    var hacks = 0;
    var hpe = 1; // Hacks per "E"
    var hps = 0; // Hacks per second




    var price1 = 50,
        price2 = 200,
        price3 = 400,
        price4 = 800,
        price5 = 1600;

    $("#c1").attr("price", price1);
    $("#a1").attr("price", price1);

    $("#c2").attr("price", price2);
    $("#a2").attr("price", price2);

    $("#c3").attr("price", price3);
    $("#a3").attr("price", price3);

    $("#c4").attr("price", price4);
    $("#a4").attr("price", price4);

    $("#c5").attr("price", price5);
    $("#a5").attr("price", price5);




    function checkBalance() {
        if (hacks >= price1) {
            $("#c1").removeClass("disabled");
            $("#a1").removeClass("disabled");
        } else {
            $("#c1").addClass("disabled");
            $("#a1").addClass("disabled");
        }

        if (hacks >= price2) {
            $("#c2").removeClass("disabled");
            $("#a2").removeClass("disabled");
        } else {
            $("#c2").addClass("disabled");
            $("#a2").addClass("disabled");
        }

        if (hacks >= price3) {
            $("#c3").removeClass("disabled");
            $("#a3").removeClass("disabled");
        } else {
            $("#c3").addClass("disabled");
            $("#a3").addClass("disabled");
        }

        if (hacks >= price4) {
            $("#c4").removeClass("disabled");
            $("#a4").removeClass("disabled");
        } else {
            $("#c4").addClass("disabled");
            $("#a4").addClass("disabled");
        }

        if (hacks >= price5) {
            $("#c5").removeClass("disabled");
            $("#a5").removeClass("disabled");
        } else {
            $("#c5").addClass("disabled");
            $("#a5").addClass("disabled");
        }
    }



    var press = true;

    // DEBUG
    $(document).on('keypress', function (e) {
        if (e.which === 122) {
            hacks += 50;
            $("#count").text(hacks);
            checkBalance();
        }
    });
    //DEBUG

    $(document).on('keydown', function (e) {
        if (e.which === 69) {
            if (press == true) {
                press = false;
                hacks += hpe;
                $("#count").text(hacks);
                checkBalance();

            }
        }
    });

    $(document).on('keyup', function (e) {
        if (e.which === 69) {
            press = true;
        }
    });

    var timing;
    /*window.setInterval(function () {
        if (hps > 0) {
            hacks++;
            $("#count").text(hacks);
            checkBalance();
        }
        console.log(timing);
    }, timing);*/

    var interval = 500;
    var intervalId;
    // store in a function so we can call it again
    function startInterval(_interval) {
        // Store the id of the interval so we can clear it later
        intervalId = setInterval(function () {
            hacks++;
            $("#count").text(hacks);
            checkBalance();
        }, _interval);
    }

    function getInterval() {
        return interval;
    }


    var upgrades = [["c1", "" + price1 + " hacks. Pressing E hacks twice as... powerfully."],
                    ["c2", "" + price2 + " hacks. Pressing E hacks four times as... hackily."],
                    ["c3", "" + price3 + " hacks. Pressing E hacks eight times as... well."],
                    ["c4", "" + price4 + " hacks. Pressing E hacks sixteen times as... hard."],
                    ["c5", "" + price5 + " hacks. You get the idea."],
                    ["a1", "" + price1 + " hacks. The system gets auto-hacked at a rate of 1 hps (hacks per second, as us cool kids say)."],
                    ["a2", "" + price2 + " hacks. The system gets auto-hacked at a rate of 2 hps."],
                    ["a3", "" + price3 + " hacks. The system gets auto-hacked at a rate of 4 hps."],
                    ["a4", "" + price4 + " hacks. The system gets auto-hacked at a rate of 8 hps."],
                    ["a5", "" + price5 + " hacks. The system gets auto-hacked at a rate of, you guessed it, 16 hps."]
                   ];

    $(".side-item").hover(function () {
        var id = this.id;
        var tt;
        for (var i = 0; i < upgrades.length; i++) {
            if (upgrades[i][0] === id) {
                tt = upgrades[i][1];
            }
        }
        $(".tooltip").html(tt);

    }, function () {
        $(".tooltip").html("Hover over an upgrade to get information about it, and how many hacks it takes to unlock.");
    });





    $(".side-item").on("click", function () {
        if (hacks >= $(this).attr("price")) {
            hacks -= $(this).attr("price");
            $("#count").text(hacks);
            $(this).addClass("purchased");

            $("#" + this.id + "i").removeClass("disabled");

            if ($(this).attr("item-type") == "cpu") {
                //alert("cpu");
                hpe = parseInt($(this).attr("val"));
            } else if ($(this).attr("item-type") == "auto") {
                //alert("auto");
                if (hps == 0) {
                    hps = 1;
                }
                hps *= $(this).attr("val");
                interval = 1000 / hps;
                // clear the existing interval
                clearInterval(intervalId);
                // just start a new one
                startInterval(interval);
            }
        }

        if ($(".disabled").length === 1) {
            $("img.robot").removeClass("invisible");
        }

        checkBalance();


    })

});
