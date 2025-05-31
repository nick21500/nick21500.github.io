/* jslint browser: true, devel: true */
/* eslint-disable no-unused-vars, no-console */
/* global $, alert, console, document, window */

$(function () {
    "use strict";

    // Home page hero stuff
    if ($("body").attr("id") == "home") {
        $("#hero-scroll").on("click", function () {
            $.scrollTo("#section-1", 800);
        });
    
        $(".hero-text h1").fitText(0.4);
    }


    // Sidenav controls
    $("#menu").on("click", function () {
        $("#sidenav").css("width", "250px");
    });
    $("#close").on("click", function () {
        $("#sidenav").css("width", "0");
    });


    // Set hero image randomly
    // This runs after the CSS!
    var imageCount = 8;
    var filter = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))";
    var randomImg = "url('../../assets/img/hero/random/" + (Math.floor(Math.random() * imageCount) + 1) + ".jpg')";

    $(".hero-image").not(".custom").css({
        "background-image": filter + ", " + randomImg
    });


    //  THEME CONTROL  //
    switch($("body").attr("theme")) {
        case "cosmogony":
            break;
        case "svg-tool":
            break;
    }



    let bumpycircleSVG = `<svg width="100" height="100">
    <path d="M55.23,4.09L55.23,4.09c2.12,1.66,4.91,2.21,7.5,1.49l0,0c3.76-1.04,7.75,0.61,9.67,4l0,0c1.33,2.35,3.69,3.92,6.36,4.25
        l0,0c3.87,0.47,6.92,3.53,7.4,7.4v0c0.33,2.67,1.9,5.04,4.25,6.36l0,0c3.4,1.92,5.05,5.91,4,9.67l0,0c-0.72,2.6-0.17,5.38,1.49,7.5
        l0,0c2.4,3.07,2.4,7.39,0,10.46l0,0c-1.66,2.12-2.21,4.91-1.49,7.5l0,0c1.04,3.76-0.61,7.75-4,9.67l0,0
        c-2.35,1.33-3.92,3.69-4.25,6.36v0c-0.47,3.87-3.53,6.92-7.4,7.4h0c-2.67,0.33-5.04,1.9-6.36,4.25l0,0c-1.92,3.4-5.91,5.05-9.67,4
        l0,0c-2.6-0.72-5.38-0.17-7.5,1.49l0,0c-3.07,2.4-7.39,2.4-10.46,0l0,0c-2.12-1.66-4.91-2.21-7.5-1.49l0,0
        c-3.76,1.04-7.75-0.61-9.67-4l0,0c-1.33-2.35-3.69-3.92-6.36-4.25h0c-3.87-0.47-6.92-3.53-7.4-7.4l0,0
        c-0.33-2.67-1.9-5.04-4.25-6.36l0,0c-3.4-1.92-5.05-5.91-4-9.67l0,0c0.72-2.6,0.17-5.38-1.49-7.5l0,0c-2.4-3.07-2.4-7.39,0-10.46
        l0,0c1.66-2.12,2.21-4.91,1.49-7.5l0,0c-1.04-3.76,0.61-7.75,4-9.67l0,0c2.35-1.33,3.92-3.69,4.25-6.36l0,0
        c0.47-3.87,3.53-6.92,7.4-7.4l0,0c2.67-0.33,5.04-1.9,6.36-4.25l0,0c1.92-3.4,5.91-5.05,9.67-4l0,0c2.6,0.72,5.38,0.17,7.5-1.49l0,0
        C47.84,1.69,52.16,1.69,55.23,4.09z"
        
        fill="black"
    />
</svg>`;
    let bumpycirclePATH = `M55.23,4.09L55.23,4.09c2.12,1.66,4.91,2.21,7.5,1.49l0,0c3.76-1.04,7.75,0.61,9.67,4l0,0c1.33,2.35,3.69,3.92,6.36,4.25l0,0c3.87,0.47,6.92,3.53,7.4,7.4v0c0.33,2.67,1.9,5.04,4.25,6.36l0,0c3.4,1.92,5.05,5.91,4,9.67l0,0c-0.72,2.6-0.17,5.38,1.49,7.5l0,0c2.4,3.07,2.4,7.39,0,10.46l0,0c-1.66,2.12-2.21,4.91-1.49,7.5l0,0c1.04,3.76-0.61,7.75-4,9.67l0,0c-2.35,1.33-3.92,3.69-4.25,6.36v0c-0.47,3.87-3.53,6.92-7.4,7.4h0c-2.67,0.33-5.04,1.9-6.36,4.25l0,0c-1.92,3.4-5.91,5.05-9.67,4l0,0c-2.6-0.72-5.38-0.17-7.5,1.49l0,0c-3.07,2.4-7.39,2.4-10.46,0l0,0c-2.12-1.66-4.91-2.21-7.5-1.49l0,0c-3.76,1.04-7.75-0.61-9.67-4l0,0c-1.33-2.35-3.69-3.92-6.36-4.25h0c-3.87-0.47-6.92-3.53-7.4-7.4l0,0c-0.33-2.67-1.9-5.04-4.25-6.36l0,0c-3.4-1.92-5.05-5.91-4-9.67l0,0c0.72-2.6,0.17-5.38-1.49-7.5l0,0c-2.4-3.07-2.4-7.39,0-10.46l0,0c1.66-2.12,2.21-4.91,1.49-7.5l0,0c-1.04-3.76,0.61-7.75,4-9.67l0,0c2.35-1.33,3.92-3.69,4.25-6.36l0,0c0.47-3.87,3.53-6.92,7.4-7.4l0,0c2.67-0.33,5.04-1.9,6.36-4.25l0,0c1.92-3.4,5.91-5.05,9.67-4l0,0c2.6,0.72,5.38,0.17,7.5-1.49l0,0C47.84,1.69,52.16,1.69,55.23,4.09z`;
    
    $("#code-bumpycircle #copySVG").on("click", function(){
        Copy(bumpycircleSVG, 0);
    });
    $("#code-bumpycircle #copyPATH").on("click", function(){
        Copy(bumpycirclePATH, 1);
    });

    let bumpycircle2SVG = `<svg width="100" height="100" id="preview">
    <path d="M56.47,4.35L56.47,4.35
        c1.75,4.28,7.1,5.72,10.75,2.88
        l0,0
        c4.95-3.84,12.06,0.27,11.21,6.47
        l0,0
        c-0.63,4.58,3.29,8.5,7.87,7.87l0,0c6.2-0.85,10.31,6.26,6.47,11.21l0,0c-2.83,3.65-1.4,9.01,2.88,10.75l0,0
        c5.8,2.37,5.8,10.57,0,12.94l0,0c-4.28,1.75-5.72,7.1-2.88,10.75l0,0c3.84,4.95-0.27,12.06-6.47,11.21l0,0
        c-4.58-0.63-8.5,3.29-7.87,7.87l0,0c0.85,6.2-6.26,10.31-11.21,6.47l0,0c-3.65-2.83-9.01-1.4-10.75,2.88l0,0
        c-2.37,5.8-10.57,5.8-12.94,0l0,0c-1.75-4.28-7.1-5.72-10.75-2.88l0,0c-4.95,3.84-12.06-0.27-11.21-6.47l0,0
        c0.63-4.58-3.29-8.5-7.87-7.87l0,0c-6.2,0.85-10.31-6.26-6.47-11.21l0,0c2.83-3.65,1.4-9.01-2.88-10.75l0,0
        c-5.8-2.37-5.8-10.57,0-12.94l0,0c4.28-1.75,5.72-7.1,2.88-10.75l0,0C3.39,27.83,7.5,20.72,13.7,21.57l0,0
        c4.58,0.63,8.5-3.29,7.87-7.87l0,0c-0.85-6.2,6.26-10.31,11.21-6.47l0,0c3.65,2.83,9.01,1.4,10.75-2.88l0,0
        C45.9-1.45,54.1-1.45,56.47,4.35z"
        
        fill="currentColor"
    />
</svg>`;
    let bumpycircle2PATH = `M56.47,4.35L56.47,4.35c1.75,4.28,7.1,5.72,10.75,2.88l0,0c4.95-3.84,12.06,0.27,11.21,6.47l0,0c-0.63,4.58,3.29,8.5,7.87,7.87l0,0c6.2-0.85,10.31,6.26,6.47,11.21l0,0c-2.83,3.65-1.4,9.01,2.88,10.75l0,0c5.8,2.37,5.8,10.57,0,12.94l0,0c-4.28,1.75-5.72,7.1-2.88,10.75l0,0c3.84,4.95-0.27,12.06-6.47,11.21l0,0c-4.58-0.63-8.5,3.29-7.87,7.87l0,0c0.85,6.2-6.26,10.31-11.21,6.47l0,0c-3.65-2.83-9.01-1.4-10.75,2.88l0,0c-2.37,5.8-10.57,5.8-12.94,0l0,0c-1.75-4.28-7.1-5.72-10.75-2.88l0,0c-4.95,3.84-12.06-0.27-11.21-6.47l0,0c0.63-4.58-3.29-8.5-7.87-7.87l0,0c-6.2,0.85-10.31-6.26-6.47-11.21l0,0c2.83-3.65,1.4-9.01-2.88-10.75l0,0c-5.8-2.37-5.8-10.57,0-12.94l0,0c4.28-1.75,5.72-7.1,2.88-10.75l0,0C3.39,27.83,7.5,20.72,13.7,21.57l0,0c4.58,0.63,8.5-3.29,7.87-7.87l0,0c-0.85-6.2,6.26-10.31,11.21-6.47l0,0c3.65,2.83,9.01,1.4,10.75-2.88l0,0C45.9-1.45,54.1-1.45,56.47,4.35z`
    
    $("#code-bumpycircle2 #copySVG").on("click", function(){
        Copy(bumpycircle2SVG, 0);
    });
    $("#code-bumpycircle2 #copyPATH").on("click", function(){
        Copy(bumpycircle2PATH, 1);
    });

    let squaredblorbSVG = `<svg width="100" height="100" id="preview">
    <path d="M31.66,1.38l11.49,3.36c4.48,1.31,9.24,1.31,13.72,0l11.49-3.36c18.51-5.42,35.69,11.76,30.27,30.27l-3.36,11.49
        c-1.31,4.48-1.31,9.24,0,13.72l3.36,11.49c5.42,18.51-11.76,35.69-30.27,30.27l-11.49-3.36c-4.48-1.31-9.24-1.31-13.72,0
        l-11.49,3.36C13.15,104.04-4.04,86.85,1.38,68.34l3.36-11.49c1.31-4.48,1.31-9.24,0-13.72L1.38,31.66
        C-4.04,13.15,13.15-4.04,31.66,1.38z"
        
        fill="currentColor"
    />
</svg>`;
    let squaredblorbPATH = `M31.66,1.38l11.49,3.36c4.48,1.31,9.24,1.31,13.72,0l11.49-3.36c18.51-5.42,35.69,11.76,30.27,30.27l-3.36,11.49c-1.31,4.48-1.31,9.24,0,13.72l3.36,11.49c5.42,18.51-11.76,35.69-30.27,30.27l-11.49-3.36c-4.48-1.31-9.24-1.31-13.72,0l-11.49,3.36C13.15,104.04-4.04,86.85,1.38,68.34l3.36-11.49c1.31-4.48,1.31-9.24,0-13.72L1.38,31.66C-4.04,13.15,13.15-4.04,31.66,1.38z`
    
    $("#code-squaredblorb #copySVG").on("click", function(){
        Copy(squaredblorbSVG, 0);
    });
    $("#code-squaredblorb #copyPATH").on("click", function(){
        Copy(squaredblorbPATH, 1);
    });

    let pillSVG = `<svg width="100" height="100" id="preview">
    <path d="M75,75H25C11.19,75,0,63.81,0,50v0c0-13.81,11.19-25,25-25h50c13.81,0,25,11.19,25,25v0C100,63.81,88.81,75,75,75z"
        
        fill="currentColor"
    />
</svg>`;
    let pillPATH = `M75,75H25C11.19,75,0,63.81,0,50v0c0-13.81,11.19-25,25-25h50c13.81,0,25,11.19,25,25v0C100,63.81,88.81,75,75,75z`
    
    $("#code-pill #copySVG").on("click", function(){
        Copy(pillSVG, 0);
    });
    $("#code-pill #copyPATH").on("click", function(){
        Copy(pillPATH, 1);
    });


    $("#svgmachinebutton").on("click", function(){
        $("#svgmachineresult").html(PrettyPath($("#svgmachineinput").val()));
    })

    $("#svgmachinecopy").on("click", function(){
        Copy($("#svgmachineresult").html(), 2)
    })

});

function Copy(text, type) {
    // Copy the text
    navigator.clipboard.writeText(text);

    // Alert the copied text
    switch (type) {
        case 0:
            alert("Copied <svg> snippet!")
            break;
        case 1:
            alert("Copied <path> data attribute (minified)!")
            break;
        case 2:
            alert("Copied <path> data attribute (prettified)!")
            break;
    }

}

function PrettyPath(data) {
    var str = data;

    var chars = Array.from("MmLlHhVvCcSsQqTtAaZz");
    console.log(chars);

    // Remove whitespace to start
    str = str.replace(/\s/g, '');

    // Put a newline before every letter
    str = SpliceSlice(str, chars, 0, '\n');
    // Remove the very first character (newline)
    str = str.slice(1);

    // Put a space after each letter
    str = SpliceSlice(str, chars, 1, ' ');

    return str;
}

function SpliceSlice(input, charsToLookFor, beforeOrAfter, charToInsert) {
    var result = input;

    var inserts = 0;

    for (let i = 0; i < input.length; i++) {
        if (charsToLookFor.includes(input[i])) {

            switch (beforeOrAfter) {
                case 0:
                    //before
                    var str0 = result.slice(0, i + inserts);
                    var str1 = result.slice(i + inserts);

                    result = [str0, charToInsert, str1].join("");
                    break;
                case 1:
                    //after
                    var str0 = result.slice(0, i + inserts + 1);
                    var str1 = result.slice(i + inserts + 1);

                    result = [str0, charToInsert, str1].join("");
                    break;
            }

            inserts++;
        }
    }
    
    return result;
}
