$(function () {
    $(".nav_hide").fadeOut(0);
    $("nav  .ul_none .flex_1").mouseover(function () {
        if($(window).width() <= 1000){
            $(".nav_hide ul").addClass("hide");
            $(".nav_hide ul:eq(" + $(this).index() + ")").removeClass("hide");
        }
        $(this).addClass("show");
        $(".nav_hide ul:eq(" + $(this).index() + ")").addClass("show");
    })
    $("nav  .ul_none .flex_1").mouseleave(function () {
        $(this).removeClass("show");
        $(".nav_hide ul:eq("+$(this).index()+")").removeClass("show");
        if($(window).width() <= 1000){
            // $(".nav_hide ul").removeClass("hide");
        }
    })
    $(".nav_hide ul").hover(function () {
        $("nav  .ul_none .flex_1:eq("+$(this).index()+")").addClass("show");
        $(this).addClass("show");
    },function () {
        $(this).removeClass("show");
        $("nav  .ul_none .flex_1:eq("+$(this).index()+")").removeClass("show");
    })

    $("nav").hover(function () {
        $(".nav_hide").stop(true);
        $(".nav_hide").fadeIn();
    },function () {
        $(".nav_hide").fadeOut();
    })

})