$(function () {
    $("#sign").fadeOut(0);
    $(".nav_hide").fadeOut(0);
    $(".row1_left .carousel .text_ul li").hide();
    $(".row1_right .content2").hide();
    $(".row1_left .carousel .text_ul li").css("opacity",1);
    $("nav  .ul_none .flex_1").mouseover(function () {
        if($(window).width() <= 1000){
            $(".nav_hide ul").addClass("hide");
            $(".nav_hide ul:eq(" + $(this).index() + ")").removeClass("hide");
        }
        else $(".nav_hide ul").removeClass("hide");
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
    a.switchTime = 5000;
    a.xzStop = "#banner .auto";
    a.setBtn("#banner .sele_btn","xz");
    a.setLeftRight("#banner .left_move","#banner .right_move");
    a.init();
    a.startTimer();
    let a2 = new Banner("carousel_ul");
    a2.switchTime = 5000;
    a2.xzStop = "#carousel .auto";
    a2.setBtn("#carousel .sele_btn","xz");
    a2.setLeftRight("#carousel .left_move","#carousel .right_move");
    a2.btn_name = ".box  .sele_btn a";
    a2.init();
    a2.startTimer();
    $("#banner .sele_btn a").click(function () {
        $("#banner .sele_btn a").removeClass("xz");
        $(this).addClass("xz");
        a.setNow($(this).index()+1);
    })
    $(".box .sele_btn a").click(function () {
        $(".box .sele_btn a").removeClass("xz");
        $(this).addClass("xz");
        a2.setNow($(this).index()+1);
    })
    let cutIndex = 0;
    let oldCutIndex = 0;
    let timer;
    let isCutIng = false;
    function startTimer() {
        timer = setInterval(function () {
            cutIndex++;
            cut();
        },3000);
    }
    function stopTimer() {
        clearInterval(timer);
    }
    function cut() {
        isCutIng = true;
        if (cutIndex >= 5){
            cutIndex = 0;
        }
        if(cutIndex < 0){
            cutIndex = 4;
        }
            $(".row1_left .carousel .img_ul li:eq("+(oldCutIndex)+")").animate({
                "opacity":0
            },500);
            $(".row1_left .carousel .text_ul li:eq("+(oldCutIndex)+")").hide();
        $(".row1_left .carousel .img_ul li:eq("+cutIndex+")").animate({
            "opacity":1
        },function () {
            isCutIng = false;
        });
        $(".row1_left .carousel .text_ul li:eq("+cutIndex+")").show();
        oldCutIndex = cutIndex;
    }
    startTimer();
    oldCutIndex = 4;
    cut();

    $(".row1_left .left_move").click(function () {
        if (isCutIng)return;
        cutIndex++;
        cut();
    })
    $(".row1_left .right_move").click(function () {
        if (isCutIng)return;
        cutIndex--;
        cut();
    })
    $(".row1_left").mouseover(function () {
        stopTimer();
    })
    $(".row1_left").mouseleave(function () {
        startTimer();
    })
    $(".row1_right .title a").hover(function () {
        if($(window).width() < 770)return;
        $(".row1_right .xz").removeClass("xz");
        $(this).addClass("xz");
        $(".row1_right .content .re>.flex").hide();
        $(".row1_right .content .re>.flex").stop(true);
        $(".row1_right .content .re>.flex:eq("+$(this).index()+")").fadeIn(500);
    })
    $(".row1_right .title a").click(function () {
        if($(window).width() >= 770)return;
        $(".row1_right .title a").toggleClass("xz");
        $(".row1_right .content .re>.flex").hide();
        $(".row1_right .content .re>.flex").stop(true);
        $(".row1_right .content .re>.flex:eq("+$(this).index()+")").fadeIn(500);
    })

    $(".showSign").click(function () {
        $("#sign").fadeIn(500);
    })
    $(".sign_bg").click(function () {
        $("#sign").fadeOut(500);
    })
    $("#sign .btn").click(function () {
        $("#sign").fadeOut(500);
    })
})