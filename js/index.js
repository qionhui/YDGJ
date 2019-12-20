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


    let a = new Banner("banner_ul");
    a.switchTime = 2000;
    a.xzStop = "#banner .auto";
    a.setBtn("#banner .sele_btn","xz");
    a.setLeftRight("#banner .left_move","#banner .right_move");
    a.init();
    a.startTimer();

    $("#banner .sele_btn a").click(function () {
        $("#banner .sele_btn a").removeClass("xz");
        $(this).addClass("xz");
        a.setNow($(this).index()+1);
    })

})