/* jslint browser: true, devel: true */
/* eslint-disable no-unused-vars, no-console */
/* global $, alert, console */

$(function () {
    "use strict";

    // The "solution" if you will
    var board = [
        [".", ".", ".", "S", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", "H", "A", "P", "P", "Y", "G", "I", "L", "M", "O", "R", "E", "."],
        [".", ".", ".", "A", ".", ".", ".", ".", ".", "U", ".", ".", ".", "."],
        [".", ".", ".", "C", ".", ".", ".", ".", ".", "L", ".", ".", ".", "."],
        [".", ".", ".", "E", ".", ".", "P", ".", ".", "A", ".", ".", ".", "."],
        [".", ".", ".", "J", ".", ".", "A", ".", ".", "N", ".", ".", ".", "."],
        [".", ".", ".", "A", ".", ".", "U", ".", ".", ".", ".", ".", ".", "."],
        [".", "H", "O", "M", "E", "A", "L", "O", "N", "E", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", "B", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", "L", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", "A", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", "I", "N", "T", "E", "R", "S", "T", "E", "L", "L", "A", "R"],
        [".", ".", ".", ".", ".", ".", "T", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."]
    ];

    // The clues
    var cluesAcross = [
        "2. Adam Sandler does sport",
        "5. Harry and Marv get hecked up by traps",
        "6. Space. I don't remember this movie lol"
    ];
    var cluesDown = [
        "1. Cartoons do sport",
        "3. Classic Disney movie with a strong female lead",
        "4. Action hero saves the world with amazing (mallcop) skill"
    ]

    console.log("Solution:");
    console.log(board);

    // Construct the board and print it
    var cw = "<table id='crossword'>";
    for (var row = 0; row < board.length; row++) {
        cw += "<tr>";
        for (var col = 0; col < board[row].length; col++) {
            cw += "<td id='" + row + "-" + col + "'><input type='text' maxlength='1'></input></td>";
        }
        cw += "</tr>";
    }
    cw += "</table>";
    $("#crosswordWrapper").html(cw);

    // Print out the clues
    var cluesA = "";
    for (var i = 0; i < cluesAcross.length; i++) {
        cluesA += "<li>" + cluesAcross[i] + "</li> \n"
    }
    $("#cluesAcross").html(cluesA);

    var cluesD = "";
    for (var j = 0; j < cluesDown.length; j++) {
        cluesD += "<li>" + cluesDown[j] + "</li> \n"
    }
    $("#cluesDown").html(cluesD);

    // Hide cells that contain "."
    for (var row1 = 0; row1 < board.length; row1++) {
        for (var col1 = 0; col1 < board[row1].length; col1++) {
            if (board[row1][col1] == ".") {
                $("#" + row1 + "-" + col1).addClass("hidden");
            }
        }
    }

    // Navigation through cells with arrow keys
    var keyCodes = {
        'up': 38,
        'down': 40,
        'left': 37,
        'right': 39
    };
    $('input').keyup(function (e) {
        if (e.which == keyCodes.right)
            $(this).closest('td').next().find('input').focus();
        else if (e.which == keyCodes.left)
            $(this).closest('td').prev().find('input').focus();
        else if (e.which == keyCodes.down)
            $(this).closest('tr').next().find('td:eq(' + $(this).closest('td').index() + ')').find('input').focus();
        else if (e.which == keyCodes.up)
            $(this).closest('tr').prev().find('td:eq(' + $(this).closest('td').index() + ')').find('input').focus();
    });

    // What the user has entered
    var user = [];
    $('input').on("change", updateUser);

    function updateUser() {
        user = [];
        $("#crossword tr").each(function () {
            var arrayOfThisRow = [];
            $(this).find("input").each(function () {
                var tableData = $(this);
                // console.log($(this).find('input'));
                // console.log(tableData.val());
                if (tableData.val() != "") {
                    arrayOfThisRow.push(tableData.val().toUpperCase());
                } else {
                    arrayOfThisRow.push(".");
                }
            })
            user.push(arrayOfThisRow);
            // console.log(user);
        });
    }

    // ** This is a code snippet I found that compares arrays, I didn't know how to do it myself ** //
    // Warn if overriding existing method
    if (Array.prototype.equals)
        console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
    // attach the .equals method to Array's prototype to call it on any array
    Array.prototype.equals = function (array) {
        // if the other array is a falsy value, return
        if (!array)
            return false;

        // compare lengths - can save a lot of time 
        if (this.length != array.length)
            return false;

        for (var i = 0, l = this.length; i < l; i++) {
            // Check if we have nested arrays
            if (this[i] instanceof Array && array[i] instanceof Array) {
                // recurse into the nested arrays
                if (!this[i].equals(array[i]))
                    return false;
            } else if (this[i] != array[i]) {
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;
            }
        }
        return true;
    }
    // Hide method from for-in loops
    Object.defineProperty(Array.prototype, "equals", {
        enumerable: false
    });
    // ** End ** //

    // Button that tells you if you've done it or not
    $("#check").on("click", function () {
        updateUser();
        if (user.equals(board)) {
            alert("You win!");
        } else {
            alert("Not quite!");
        }
    });
    
});
