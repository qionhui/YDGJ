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
        this.timer = setInterval(function () {
            self.rightMove();
            self.cut();
        },this.switchTime);
    }
    stopTimer(){
        clearInterval(this.timer);
    }
    cut(){
        let temp;
        let self = this;
        this.isMoveIng = true;
        this.controls.animate({
            left : this.left + "px"
        },function () {
            self.isMoveIng = false;
            if(self.now == 1 || self.now == self.max){
                self.btn.find("a").removeClass(self.btn_cssName);
                self.btn.find("a:eq(0)").addClass(self.btn_cssName);
                temp =  $("#banner_ul img:eq(0)").attr("src");
            }
            else {
                self.btn.find("a").removeClass(self.btn_cssName);
                self.btn.find("a:eq("+(self.now-1)+")").addClass(self.btn_cssName);
                temp =  $("#banner_ul img:eq("+ (self.now - 1) +")").attr("src");
            }
            $("#banner .ban_bg").css({
                "background-image": "url("+temp+")"
            })
        })
    }
    leftMove(){
        if (this.isMoveIng)return;
        this.now--;
        this.left += this.moveW;
        if(this.now <= 0){
            this.now = this.max;
            this.left = -(this.max-1) * (this.moveW);
            this.controls.css("left",this.left + "px");
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
            self.controls.css({
                left:self.left + "px"
            });
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
}