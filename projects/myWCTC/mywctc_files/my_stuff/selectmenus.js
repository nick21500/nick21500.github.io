$(function () {

    $("#selectRegistration").on("change", function(){
        window.location = $(this).val();
    })

    $("#selectPaying").on("change", function(){
        window.location = $(this).val();
    })

    $("#selectResources").on("change", function(){
        window.location = $(this).val();
    })

});