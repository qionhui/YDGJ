class Banner {
    constructor(ul_id){
        this.controls = $("#" + ul_id);
        this.moveW = $(this.controls).find("li").width();//每次移动的长度
        this.left = 0;//控件的位置
        this.timer = null;
        this.isMoveIng = false;//是否正在移动
        this.switchTime = 1000;//多少毫秒切换一次动画
        this.moveTime = 500;//切换一次花多少毫秒
        this.max = Math.floor(this.controls.width() / this.moveW);//获取有几个移动的块
        this.now = 1;
        this.xzStop = null;//选中停止(获取控件)
        this.btn = null;
        this.btn_cssName = null;
        this.btn_name = null;
        this.startX = 0;
        this.endX = 0;
        this.moveTemp = 0;
        this.movX = 0;
        this.isDown = false;

        this.init();
    }
    init(){
        let self = this;
        if (self.xzStop){
            $(this.xzStop).hover(function () {
                if($(window).width() < 1000)return;
                self.stopTimer();
            },function () {
                self.startTimer();
            })
        }
    }
    startTimer(){
        let self = this;
        if (this.timer != null)
            clearInterval(this.timer);
        this.timer = setInterval(function () {
            self.rightMove();
            self.cut();
        },this.switchTime);
    }
    stopTimer(){
        clearInterval(this.timer);
        this.timer = null;
    }
    cut(){
        let temp;
        let self = this;
        this.isMoveIng = true;
        this.startX = 0;
        this.movX = 0;
        this.endX = 0;
        this.controls.animate({
            left : ((this.now-1) * -100) + "%"
        },function () {
            self.isMoveIng = false;
            if(self.now == 1 || self.now == self.max){
                if(self.btn_name == null){
                    self.btn.find("a").removeClass(self.btn_cssName);
                    self.btn.find("a:eq(0)").addClass(self.btn_cssName);
                }else {
                    $(self.btn_name).removeClass(self.btn_cssName);
                    $(self.btn_name + ":eq(0)").addClass(self.btn_cssName);
                }
            }
            else {
                if(self.btn_name == null){
                    self.btn.find("a").removeClass(self.btn_cssName);
                    self.btn.find("a:eq("+(self.now-1)+")").addClass(self.btn_cssName);
                }else {
                    $(self.btn_name).removeClass(self.btn_cssName);
                    $(self.btn_name + ":eq("+(self.now-1)+")").addClass(self.btn_cssName);
                }
                self.btn.find("a").removeClass(self.btn_cssName);
                self.btn.find("a:eq("+(self.now-1)+")").addClass(self.btn_cssName);
                temp =  $("#banner_ul img:eq("+ (self.now - 1) +")").attr("src");
            }
            temp =  $("#banner_ul img:eq("+ (self.now - 1) +")").attr("src");
            if (self.now == self.max) temp =  $("#banner_ul img:eq("+ 0 +")").attr("src");
            $("#banner .ban_bg").css({
                "background-image": "url("+temp+")"
            })
        })
    }
    resetCut(){
        this.controls.animate({
            left : ((this.now-1) * -100) + "%"
        })
    }
    leftMove(){
        if (this.isMoveIng)return;
        this.now--;
        this.left += this.moveW;
        if(this.now <= 0){
            this.now = this.max;
            this.left = -(this.max-1) * (this.moveW);
            this.controls.css("left",((this.now-1) * -100) + "%");
            this.now--;
            this.left += this.moveW;
        }
        this.cut();
    }
    rightMove(){
        if (this.isMoveIng)return;
        this.now++;
        this.left -= this.moveW;
        let self = this;
        if(self.now > self.max){
            self.now = 1;
            self.left = 0;
            self.controls.css("left",((this.now-1) * -100) + "%");
            this.now++;
            this.left -= this.moveW;
        }
        this.cut();
    }
    setLeftRight(left_,right_){
        let self = this;
        $(left_).click(function () {
            self.leftMove();
        })
        $(right_).click(function () {
            self.rightMove();
        })
    }
    setBtn(Btn_box,cssName){
        this.btn = $(Btn_box);
        this.btn_cssName = cssName;
    }
    setNow(index){
        this.now = index;
        this.left = (index-1) * -this.moveW;
        this.cut();
    }
    startTouch(touch_){
        let self = this;
        $(touch_).on("touchstart", function(e) {
            e.preventDefault();
            self.stopTimer();
            self.startX = e.originalEvent.changedTouches[0].pageX;
        });

        $(touch_).on("touchend", function(e) {
            e.preventDefault();
            self.startTimer();
            self.endX = e.originalEvent.changedTouches[0].pageX;
            let x = self.endX - self.startX;
            if(x <=  -(self.controls.find("li").width()/2))
            {
                self.rightMove();
            }
            if(x > (self.controls.find("li").width()/2))
            {
                self.leftMove();
            }
            self.resetCut();
        });

        $(touch_).on("touchmove", function(e) {
            e.preventDefault();
            self.stopTimer();
            let moveX = e.originalEvent.changedTouches[0].pageX - self.startX;
            if(moveX < 0){
                if(self.now == self.max){
                    self.now = 1;
                    self.controls.css("left",((this.now-1) * -100) + "%");
                }
                self.controls.css({
                    "left": (-(self.controls.find("li").width()) * (self.now-1) + moveX) + "px"
                })
            }
            if(moveX > 0){
                if (self.now == 1){
                    self.now = self.max;
                    self.controls.css("left",((this.now-1) * -100) + "%");
                }
                self.controls.css({
                    "left": ((-self.controls.find("li").width()) * (self.now-1) + moveX) + "px"
                })
            }
        });
    }
    startPcTouch(touch_){
        let self = this;
        $(touch_).on("mousedown", function(e) {
            e.preventDefault();
            self.isDown = true;
            self.startX = e.pageX;
        });

        $(touch_).on("mouseup", function(e) {
            e.preventDefault();
            self.isDown = false;
            if (self.startX == 0)return;
            if (self.movX == 0)return;
            self.endX = e.pageX;
            let x = self.endX - self.startX;
            if(x <=  -(self.controls.find("li").width()/2))
            {
                self.rightMove();
            }
            if(x > (self.controls.find("li").width()/2))
            {
                self.leftMove();
            }
            self.resetCut();

            self.startX = 0;
            self.movX = 0;
            self.endX = 0;
        });
        $(touch_).on("mouseleave", function(e) {
            e.preventDefault();
            if(self.startX == 0)return;
            self.endX = e.pageX;
            let x = self.endX - self.startX;
            if(x <=  -(self.controls.find("li").width()/2))
            {
                self.rightMove();
            }
            if(x > (self.controls.find("li").width()/2))
            {
                self.leftMove();
            }
            self.resetCut();

            self.startX = 0;
        });
        $(touch_).on("mousemove", function(e) {
            e.preventDefault();
            self.stopTimer();
            if (!self.isDown) return;
            if (self.startX == 0)return;
            let moveX = e.pageX - self.startX;
            self.movX = moveX;
            if(moveX < 0){
                if(self.now == self.max){
                    self.now = 1;
                    self.controls.css("left",((this.now-1) * -100) + "%");
                }
                self.controls.css({
                    "left": (-(self.controls.find("li").width()) * (self.now-1) + moveX) + "px"
                })
            }
            if(moveX > 0){
                if (self.now == 1){
                    self.now = self.max;
                    self.controls.css("left",((this.now-1) * -100) + "%");
                }
                self.controls.css({
                    "left": ((-self.controls.find("li").width()) * (self.now-1) + moveX) + "px"
                })
            }
        });
    }
}