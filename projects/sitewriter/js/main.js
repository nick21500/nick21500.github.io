/* jslint browser: true, devel: true */
/* eslint-disable no-unused-vars, no-console */
/* global $, alert */

$(function () {
    "use strict";

    $("#style-font").on("change", function () {
        $("#style-font").css("font-family", $("#style-font").val());
    });
    $("#style-heading-font").on("change", function () {
        $("#style-heading-font").css("font-family", $("#style-heading-font").val());
    });

    var contentCount = 1;

    $("#add-subheading").on("click", function () {
        $("#additional-fields").append(`
            <label for="write-subheading">Subheading</label> <br>
            <input name="write-subheading" type="text" class="input" id="write-subheading` + contentCount + `" placeholder="Check out my content!">
            <br>
            <br>
        `);
        contentCount++;
    });

    $("#add-image").on("click", function () {
        $("#additional-fields").append(`
            <label for="no">Image</label> <br>
            <label style="font-size: 55%; font-family: Roboto; font-weight: normal" for="write-image` + contentCount + `" class="custom-file-upload">
                Choose Image
            </label>
            <input type="file" accept="image/*" class="input img" id="write-image` + contentCount + `">
            <p class="filename" id="write-filename` + contentCount + `"></p>
            <br>
            <br>
        `);
        contentCount++;
        showFileNames();
    });

    $("#add-body").on("click", function () {
        $("#additional-fields").append(`
            <label for="write-body">Body</label> <br>
            <textarea name="write-body" class="input" id="write-body` + contentCount + `" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."></textarea>
            <br>
            <br>
        `);
        contentCount++;
    });

    $("#write-button").on("click", function () {
        $("#write").css("display", "none");
        $("#site").css("display", "block");

        $("#content").append(`
            <h1 class="site-heading">
                ` + $("#write-heading").val() + `
            <h1>
        `);

        for (var i = 0; i < contentCount; i++) {
            if ($("#write-subheading" + i).val() != null) {
                $("#content").append(`
                    <h3 class="site-subheading">
                        ` + $("#write-subheading" + i).val() + `
                    </h3>
                `);
            }

            if ($("#write-image" + i).val() != "") {
                $("#content").append(`
                    <img src="" class="site-image" id="site-image` + i + `" />
                    <script>
                            document.getElementById('site-image` + i + `').src = URL.createObjectURL($("#write-image` + i + `").get(0).files[0]);
                    </script>
                    <br>
                `);
                console.log(
                    document.getElementById('"site-image' + i + '"')
                );
                console.log(
                    $("#write-image" + i).val()
                );
            }

            if ($("#write-body" + i).val() != null) {
                $("#content").append(`
                    <p class="site-body">
                        ` + $("#write-body" + i).val() + `
                    </p>
                `);
            }
        }

        $("body").css("background-color", $("#style-background").val());
        $("#site").css("color", $("#style-text").val());
        $("#site").css("text-align", $("#style-align").val());
        $("body").css("font-family", $("#style-font").val());
        $(".site-heading").css("font-family", $("#style-heading-font").val());
    });

    var mode = "light";
    $("#toggle-dark").on("click", function () {
        switch (mode) {
            case "light":
                darkMode();
                mode = "dark";
                $(this).html("Light");
                break;
            case "dark":
                lightMode();
                mode = "light";
                $(this).html("Dark");
                break;
        }
    })

    $(".add").on("click", function () {
        switch (mode) {
            case "light":
                lightMode();
                break;
            case "dark":
                darkMode();
                break;
        }
    })

    $("#site-button").on("click", function () {
        $("#write").css("display", "block");
        $("#site").css("display", "none");

        switch (mode) {
            case "light":
                $("body").css("background-color", "#FFFFFF");
                break;
            case "dark":
                $("body").css("background-color", "#0b0b0b");
                break;
        }

        $("body").css("font-family", "Quicksand");

        $("#content").empty();
    });

    function darkMode() {
        $("body").css("background-color", "#0b0b0b");
        $("body").css("color", "#e9e9e9");
        $(".column-l, .column-r").css("background-color", "#292929");
        $(".input").css("background-color", "#292929");
        $(".input").css("border", "2px solid #414141");
        $(".input").css("color", "#e9e9e9");
        $(".input.img").css("border", "0");
        $("button").css("color", "#e9e9e9");
        $("button").css("border", "1px solid #3e3e3e");
        $("button").removeClass("light-hover");
        $("button").addClass("dark-hover");
        $(".custom-file-upload").css("border", "2px solid #414141");
    }

    function lightMode() {
        $("body").css("background-color", "#ffffff");
        $("body").css("color", "#000000");
        $(".column-l, .column-r").css("background-color", "#ffffff");
        $(".input").css("background-color", "#ffffff");
        $(".input").css("border", "");
        $(".input").css("color", "#000000");
        $(".input.img").css("border", "0");
        $("button").css("color", "#000000");
        $("button").css("border", "1px solid #a9a9a9");
        $("button").removeClass("dark-hover");
        $("button").addClass("light-hover");
        $(".custom-file-upload").css("border", "1px solid #a9a9a9");
    }

    showFileNames();

    function showFileNames() {
        $(".input.img").on("change", function () {
            var thisId = $(this).attr("id");
            var num = thisId.replace(/\D+/, "");
            $(`#write-filename` + num + ``).html($('#write-image' + num + '').val().split('\\').pop());
        });

    }


});
