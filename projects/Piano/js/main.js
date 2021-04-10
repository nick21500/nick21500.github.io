/* jslint browser: true, devel: true */
/* eslint-disable no-unused-vars, no-console */
/* global $ */

$(function () {
    "use strict";
    
    var keyAllowed = {};
    
    $(document).keydown(function(e){
        if (keyAllowed[e.which] === false) return;
        keyAllowed[e.which] = false;
        
        var key = String.fromCharCode(e.which).toUpperCase();
        var note = $("#" + key + " audio")[0];
        
        //console.log(e.which);
        console.log(key);
        
        $("#" + key).css("background-color", "grey");
        
        note.pause();
        note.currentTime = 0;
        note.play();
    });
    
    $(document).keyup(function(e){
        var key = String.fromCharCode(e.which).toUpperCase();
        var note = $("#" + key + " audio")[0];
        
        $("#" + key).css("background-color", "white");
        
        keyAllowed[e.which] = true;
    });
    
    $(document).focus(function(e){ 
        keyAllowed = {};
    });
    
});