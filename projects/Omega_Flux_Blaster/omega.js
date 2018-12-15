/* jslint browser: true, devel: true */
/* eslint-disable no-unused-vars */
/* global $, alert, document, window */

$(function () {
    "use strict";

    $(".showForm").on("click", function () {
        $("#orderForm").css("display", "block");
    });

    $("#placeOrder").on("click", function () {
        if ($("#name").val() != "" &&
            $("#address1").val() != "" &&
            $("#city").val() != "" &&
            $("#state").val() != "" &&
            $("#postal").val() != "") {

            $("#orderForm").css("display", "none");
            alert("Your order has been placed!");
        } else {
            alert("Please enter all delivery information");
        }
    });

});
