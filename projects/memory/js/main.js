/* jslint browser: true, devel: true */
/* eslint-disable no-unused-vars, no-console */
/* global $, alert, window */

$(function () {
    "use strict";

    var isPaused = false;
    var time = 0;
    $("#startModal").css("display", "block");
    $("#play").on("click", function () {
        var theme = $("#theme").val();
        var timer = window.setInterval(function () {
            if (!isPaused) {
                time++;
                $(".time").html(time);
            }
        }, 1000);
        $("#startModal").css("display", "none");

        for (var i = 1; i <= 20; i++) {
            do {
                var x = Math.floor(Math.random() * 10);
            } while (countInArray(faces, x) > 1)
            $("#" + i).attr("src", "resources/face/" + theme + "/" + x + ".png");
            faces.push(x);
        }
    })

    var faces = [];

    function countInArray(array, what) {
        return array.filter(item => item == what).length;
    }

    var pick = 0;
    var matches = 0;
    var moves = 0;
    var storage;
    var storageNew;

    $(".card").on("click", function () {

        moves++;
        $(".moves").html(moves);

        if (pick == 0) {
            $(this).css("display", "none");
            $(this).next().css("display", "inline-block");
            storage = $(this);
            pick = 1;
        } else if (pick == 1) {
            $(this).css("display", "none");
            $(this).next().css("display", "inline-block");
            storageNew = $(this);

            if (storageNew.next().attr("src") == storage.next().attr("src")) {
                matches++;
            } else {
                window.setTimeout(noMatch, 300);
            }

            pick = 0;
        }

        if (matches == 10) {
            $("#myModal").css("display", "block");
            isPaused = true;
        }

    })

    function noMatch() {
        storage.css("display", "inline-block");
        storage.next().css("display", "none");
        storageNew.css("display", "inline-block");
        storageNew.next().css("display", "none");
    }

    // When the user clicks on (x), close the modal
    $(".close").on("click", function () {
        $("#myModal").css("display", "none");
    })

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == $("#myModal")) {
            $("#myModal").css("display", "none");
        }
    }

    $("#refresh").on("click", function () {
        location.reload();
    })

});
