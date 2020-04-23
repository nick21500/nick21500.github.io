/* jslint browser: true, devel: true */
/* eslint-disable no-unused-vars, no-console */
/* global $, alert, console, fabric, window */

$(function () {
    "use strict";

    
    $("#computer-icon").on("dblclick", function () {
        $("#computer-window").css("visibility", "visible");
        $("#documents").css("visibility", "visible");
        $("#classified").css("visibility", "hidden");
        $("#tree li:nth-child(1) li:nth-child(1)").css("outline", "1px dotted #000000");
        $("#tree li:nth-child(3) li:nth-child(1)").css("outline", "none");
    })
    
    $("#tree li:nth-child(1) li:nth-child(1)").on("click", function(){
        $("#documents").css("visibility", "visible");
        $("#classified").css("visibility", "hidden");
        $("#tree li:nth-child(1) li:nth-child(1)").css("outline", "1px dotted #000000");
        $("#tree li:nth-child(3) li:nth-child(1)").css("outline", "none");
    })

    $("#tree li:nth-child(3) li:nth-child(1)").on("click", function(){
        $("#documents").css("visibility", "hidden");
        $("#classified").css("visibility", "visible");
        $("#tree li:nth-child(1) li:nth-child(1)").css("outline", "none");
        $("#tree li:nth-child(3) li:nth-child(1)").css("outline", "1px dotted #000000");
    })
    
    $("#explorer #content .desktop-icon#memo").on("dblclick", function(){
        window.open("memo.html");
    })
    
    $("#computer-window .title-bar-controls button:nth-child(3)").on("click", function(){
        $("#computer-window").css("visibility", "hidden");
        $("#documents").css("visibility", "hidden");
        $("#classified").css("visibility", "hidden");
    })
    
    
    $("#paint-icon").on("dblclick", function () {
        $("#paint-window").css("visibility", "visible");
    })

    var canvas = new fabric.Canvas('sheet');
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = 3;
    canvas.freeDrawingBrush.color = "#000000";
    console.log(canvas);
    
    $("#paint-window .title-bar-controls button:nth-child(3)").on("click", function(){
        $("#paint-window").css("visibility", "hidden");
        canvas.clear();
    })
    
    
    // You can't take my images
    $("img").attr("draggable", "false");

});
