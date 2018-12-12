/* jslint browser: true, devel: true */
/* eslint-disable no-unused-vars, no-console */
/* global $, alert, console, document, noUiSlider, window */

$(function () {
    "use strict";

    // Make a new object out of all 7 users
    // I'm pretty sure you can add more users. You just have to create a new object, a new array element, and new divs for both html pages...
    // Yeah, maybe don't add any new users unless you really want to

    var user1 = {};
    user1.name = "Atlas";
    user1.isReal = true;
    user1.isHumanoid = true;
    user1.isCleaner = false;
    user1.height = 5;

    var user2 = {};
    user2.name = "Asimo";
    user2.isReal = true;
    user2.isHumanoid = true;
    user2.isCleaner = false;
    user2.height = 4;

    var user3 = {};
    user3.name = "Sonny";
    user3.isReal = false;
    user3.isHumanoid = true;
    user3.isCleaner = false;
    user3.height = 6;

    var user4 = {};
    user4.name = "R2-D2";
    user4.isReal = false;
    user4.isHumanoid = false;
    user4.isCleaner = false;
    user4.height = 3;

    var user5 = {};
    user5.name = "Pepper";
    user5.isReal = true;
    user5.isHumanoid = true;
    user5.isCleaner = false;
    user5.height = 3;

    var user6 = {};
    user6.name = "The Iron Giant";
    user6.isReal = false;
    user6.isHumanoid = true;
    user6.isCleaner = false;
    user6.height = 50;

    var user7 = {};
    user7.name = "Roomba";
    user7.isReal = true;
    user7.isHumanoid = false;
    user7.isCleaner = true;
    user7.height = 0;


    // It's STUPID STUPID GOD DAMN STUPID how long this took me to figure out
    // But of course, the solution in the end was much simpler than I thought

    // Listens for when a search filter is applied
    // .on("input") ensures that the code will run when the range is dragged, not just when it is dropped
    $("#search-filter input").on("input", function () {
        // Every time an input is changed, start by rebuilding the list and displaying them all
        var list = [user1, user2, user3, user4, user5, user6, user7];
        var i;
        for (i = 0; i < list.length; i++) {
            $("#list-user" + (i + 1)).css("display", "block");
        }

        // If real is checked...
        if ($("#real").prop("checked")) {
            for (i = 0; i < list.length; i++) {
                // If user is not real...
                if (list[i].isReal == false) {
                    // Hide it
                    $("#list-user" + (i + 1)).css("display", "none");
                }
            }
        }
        // If humanoid is checked...
        if ($("#humanoid").prop("checked")) {
            for (i = 0; i < list.length; i++) {
                // If user is not humanoid...
                if (list[i].isHumanoid == false) {
                    // Hide it
                    $("#list-user" + (i + 1)).css("display", "none");
                }
            }
        }
        // If cleans is checked...
        if ($("#cleans").prop("checked")) {
            for (i = 0; i < list.length; i++) {
                // If user is not a cleaner...
                if (list[i].isCleaner == false) {
                    // Hide it
                    $("#list-user" + (i + 1)).css("display", "none");
                }
            }
        }

        // Code for the range input
        var heightSelected;
        heightSelected = $("#height").val();
        // Change that first number to whatever the current range value is
        $("#height-selected").html(heightSelected);
        for (i = 0; i < list.length; i++) {
            // If user is shorter than the selected height...
            if (list[i].height < heightSelected) {
                // Hide it
                $("#list-user" + (i + 1)).css("display", "none");
            }
        }
    });
});
