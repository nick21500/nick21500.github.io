/* jslint browser: true, devel: true */
/* eslint-disable no-unused-vars, no-console */
/* global $ */

$(function () {
    "use strict";

    $.fn.random = function () {
        return this.eq(Math.floor(Math.random() * this.length));
    }

    var text = "";
    var turn = 0;
    var textSpeed = 60;

    var writeText = function (segments) {
        $(".blocker").css("display", "block");
        var segment = segments.shift();
        $("#text").append(segment);
        if (segments.length) {
            setTimeout(writeText.bind(null, segments), textSpeed);
        } else {
            $(".blocker").css("display", "none");
        }
    }

    function clearConsole() {
        $("#text").text("");
    }

    $(".modal").on("click", function () {
        $(".modal").addClass("hidden");
        $(".modal-container").addClass("hidden");
        text = "Hey intern, I'm taking off for a hot minute. " +
            "\n> Don't touch anything while I'm gone. " +
            "\n> "
        setTimeout(writeText.bind(null, text.split('')), 1000);
        $(".blocker").css("display", "none");
        turn = 1;
    })

    // DEBUG
    $(document).on('keypress', function (e) {
        if (e.which === 122) {
            turn = 5;
        }
    });
    //DEBUG

    var timerID;

    $(".thing").on("click", function () {
        if (turn === 1) {
            text = "You- really? " +
                "\n> That's a thing. " +
                "\n> I don't know if you knew, but that's a thing. " +
                "\n> Okay, I'm leaving. Don't do it again. " +
                "\n> ";
            clearConsole();
            setTimeout(writeText.bind(null, text.split('')), 1000);

            turn = 2;

        } else if (turn === 2) {
            text = "Okay, wiseguy. I just got an alert that something was touched." +
                "\n> You're really pushing my buttons by pushing those buttons. " +
                "\n> Fine, you can touch things. Just DO NOT touch the blue thing. " +
                "\n> ";
            clearConsole();
            setTimeout(writeText.bind(null, text.split('')), 1000);

            var colors = ["red", "#f27305", "yellow", "green", "purple", "white"];
            $(".thing").each(function () {
                var randomColor = colors[Math.floor(Math.random() * colors.length)];
                $(this).css("color", randomColor);
                $(this).css("border-color", randomColor);
            })
            var randItem = $(".thing").random();
            randItem.css("color", "rgb(0, 0, 255)");
            randItem.css("border-color", "rgb(0, 0, 255)");

            turn = 3;

        } else if (turn === 3) {
            if ($(this).css("color") === "rgb(0, 0, 255)") {
                text = "SO many options. " +
                    "\n> And you touched the blue one. " +
                    "\n> You're obviously doing this out of spite toward me. " +
                    "\n> What did I do? " +
                    "\n> Why are you acting like this? " +
                    "\n> I take special care of my things, especially the one that makes your cursor give a warning. " +
                    "\n> ";
                clearConsole();
                setTimeout(writeText.bind(null, text.split('')), 1000);

                $(".thing").each(function () {
                    $(this).css("color", "white");
                    $(this).css("border-color", "white");
                })

                $(".thing").random().css("cursor", "not-allowed");

                turn = 4;
            }
        } else if (turn === 4) {
            if ($(this).css("cursor") === "not-allowed") {
                text = "SPECIAL CARE. " +
                    "\n> SPECIAL. " +
                    "\n> CARE. " +
                    "\n> Do you know what that means? " +
                    "\n> That means you're being a real jerk right now. " +
                    "\n> Know what? Be my guest. Try and touch one of my things. " +
                    "\n> ";
                clearConsole();
                setTimeout(writeText.bind(null, text.split('')), 1000);

                $(this).css("cursor", "initial");

                function peekThing() {
                    $(".thing").each(function () {
                        $(this).css("opacity", "0");
                        $(this).css("z-index", "1");
                        $(this).hover(function () {
                            $(this).css("cursor", "initial");
                        })
                    })
                    $(".blocker").css("display", "block");
                    var randItem = $(".thing").random();
                    randItem.css("opacity", "1");
                    randItem.css("z-index", "3");
                    randItem.hover(function () {
                        $(this).css("cursor", "pointer");
                    })
                }
                timerID = setInterval(peekThing, 600);

                turn = 5;
            }
        } else if (turn === 5) {
            text = "What now? " +
                "\n> ";
            clearConsole();
            setTimeout(writeText.bind(null, text.split('')), 1000);

            clearInterval(timerID);

            $(".thing").each(function () {
                $(this).css("opacity", "0");
                $(this).css("z-index", "1");
                $(this).hover(function () {
                    $(this).css("cursor", "pointer");
                })
            })

            turn = 6;
        } else if (turn === 6) {
            text = "..... " +
                "\n> I don't like you. " +
                "\n> Why did I hire you? " +
                "\n> Just stop touching things. " +
                "\n> ";
            clearConsole();
            setTimeout(writeText.bind(null, text.split('')), 1000);

            $(".thing").each(function () {
                $(this).css("opacity", "1");
            })


            turn = 7;
        } else if (turn === 7) {
            text = "Look, you don't even know what you're doing. " +
                "\n> For all you know, touching one of those things could be dangerous. " +
                "\n> I'll show you. Every time you touch something, a sheep dies. " +
                "\n> ";
            clearConsole();
            setTimeout(writeText.bind(null, text.split('')), 1000);

            $(".sheep-container").css("display", "flex");

            turn = 8;
        } else if (turn === 8) {
            $("#s1").addClass("dead");
            turn = 9;
        } else if (turn === 9) {
            $("#s2").addClass("dead");
            turn = 10;
        } else if (turn === 10) {
            $("#s3").addClass("dead");
            turn = 11;
        } else if (turn === 11) {
            $("#s4").addClass("dead");
            turn = 12;
        } else if (turn === 12) {
            text = "Seriously? " +
                "\n> Do you feel no remorse for that? " +
                "\n> You killed merciless sheep. In cold blood. " +
                "\n> You should really apologize. " +
                "\n> ";
            clearConsole();
            setTimeout(writeText.bind(null, text.split('')), 1000);

            $("#s5").addClass("dead");
            
            $(".thing").each(function () {
                $(this).html("sorry");
            })
            $(".thing").random().html("thing");
            
            turn = 13;
        } else if (turn === 13) {
            if ($(this).html() === "thing") {
                alert("thing");
            } else {
                alert("sorry");
            }
        }
    })



});
