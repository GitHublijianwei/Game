$(function(){
 $("#slider").responsiveSlides({
                auto: true,
                nav: true,
                speed: 800,
                namespace: "callbacks",
                pager: true,
            });


 $(window).load(function() {
                                $("#flexiselDemo1").flexisel({
                                    visibleItems: 4,
                                    animationSpeed: 1000,
                                    autoPlay: true,
                                    autoPlaySpeed: 3000,            
                                    pauseOnHover: true,
                                    enableResponsiveBreakpoints: true,
                                    responsiveBreakpoints: { 
                                        portrait: { 
                                            changePoint:480,
                                            visibleItems: 2
                                        }, 
                                        landscape: { 
                                            changePoint:640,
                                            visibleItems:3
                                        },
                                        tablet: { 
                                            changePoint:768,
                                            visibleItems: 4,
                                        }
                                    }
                                });
                 })

// 拖拽效果
   $(function() {
        function Pointer(x, y) {
            this.x = x ;
            this.y = y ;
        }
        function Position(left, top) {
            this.left = left ;
            this.top = top ;
        }
        $(".item_content .item").each(function(i) {
            this.init = function() { // 初始化
                this.box = $(this).parent() ;
                $(this).attr("index", i).css({
                    position : "absolute",
                    left : this.box.offset().left,
                    top : this.box.offset().top
                }).appendTo(".item_content") ;
                this.drag() ;
            },
            this.move = function(callback) {  // 移动
                $(this).stop(true).animate({
                    left : this.box.offset().left,
                    top : this.box.offset().top
                }, 500, function() {
                    if(callback) {
                        callback.call(this) ;
                    }
                }) ;
            },
            this.collisionCheck = function() {
                var currentItem = this ;
                var direction = null ;
                $(this).siblings(".item").each(function() {
                    if(
                        currentItem.pointer.x > this.box.offset().left &&
                        currentItem.pointer.y > this.box.offset().top &&
                        (currentItem.pointer.x < this.box.offset().left + this.box.width()) &&
                        (currentItem.pointer.y < this.box.offset().top + this.box.height())
                    ) {
                        // 返回对象和方向
                        if(currentItem.box.offset().top < this.box.offset().top) {
                            direction = "down" ;
                        } else if(currentItem.box.offset().top > this.box.offset().top) {
                            direction = "up" ;
                        } else {
                            direction = "normal" ;
                        }
                        this.swap(currentItem, direction) ;
                    }
                }) ;
            },
            this.swap = function(currentItem, direction) { // 交换位置
                if(this.moveing) return false ;
                var directions = {
                    normal : function() {
                        var saveBox = this.box ;
                        this.box = currentItem.box ;
                        currentItem.box = saveBox ;
                        this.move() ;
                        $(this).attr("index", this.box.index()) ;
                        $(currentItem).attr("index", currentItem.box.index()) ;
                    },
                    down : function() {
                        // 移到上方
                        var box = this.box ;
                        var node = this ;
                        var startIndex = currentItem.box.index() ;
                        var endIndex = node.box.index(); ;
                        for(var i = endIndex; i > startIndex ; i--) {
                            var prevNode = $(".item_content .item[index="+ (i - 1) +"]")[0] ;
                            node.box = prevNode.box ;
                            $(node).attr("index", node.box.index()) ;
                            node.move() ;
                            node = prevNode ;
                        }
                        currentItem.box = box ;
                        $(currentItem).attr("index", box.index()) ;
                    },
                    up : function() {
                        // 移到上方
                        var box = this.box ;
                        var node = this ;
                        var startIndex = node.box.index() ;
                        var endIndex = currentItem.box.index(); ;
                        for(var i = startIndex; i < endIndex; i++) {
                            var nextNode = $(".item_content .item[index="+ (i + 1) +"]")[0] ;
                            node.box = nextNode.box ;
                            $(node).attr("index", node.box.index()) ;
                            node.move() ;
                            node = nextNode ;
                        }
                        currentItem.box = box ;
                        $(currentItem).attr("index", box.index()) ;
                    }
                }
                directions[direction].call(this) ;
            },
            this.drag = function() { // 拖拽
                var oldPosition = new Position() ;
                var oldPointer = new Pointer() ;
                var isDrag = false ;
                var currentItem = null ;
                $(this).mousedown(function(e) {
                    e.preventDefault() ;
                    oldPosition.left = $(this).position().left ;
                    oldPosition.top =  $(this).position().top ;
                    oldPointer.x = e.clientX ;
                    oldPointer.y = e.clientY ;
                    isDrag = true ;
                    
                    currentItem = this ;
                    
                }) ;
                $(document).mousemove(function(e) {
                    var currentPointer = new Pointer(e.clientX, e.clientY) ;
                    if(!isDrag) return false ;
                    $(currentItem).css({
                        "opacity" : "0.8",
                        "z-index" : 999
                    }) ;
                    var left = currentPointer.x - oldPointer.x + oldPosition.left ;
                    var top = currentPointer.y - oldPointer.y + oldPosition.top ;
                    $(currentItem).css({
                        left : left,
                        top : top
                    }) ;
                    currentItem.pointer = currentPointer ;
                    // 开始交换位置
                    

                    currentItem.collisionCheck() ;
                    
                    
                }) ;
                $(document).mouseup(function() {
                    if(!isDrag) return false ;
                    isDrag = false ;
                    currentItem.move(function() {
                        $(this).css({
                            "opacity" : "1",
                            "z-index" : 0
                        }) ;
                    }) ;
                }) ;
            }
            this.init() ;
        }) ;
    }) ;
})

// 淡入淡出轮播图
$(function(){
                var timer=null;
                var index=0;
                var length=$('.puosuis li').length;
                timer=setInterval(fun,2500);
                fun()
                function fun(){
                    if(index==length-1){
                    index=0;
                }else{
                    index++;
                }
                $('.puosuis li').eq(index).fadeIn(2000).siblings().fadeOut(2000);
                }
     })

// 正则验证
 $(function () {
    // 用户名
    $("#t_username").keyup(function(){
      var str = $("#t_username").val();
      var ret = /^[a-zA-Z][a-zA-Z0-9_]{5,20}$/;
      if(ret.test(str)){
        $('.p11').html('验证通过');
         $('.p11').css('color','blue');
      }else{
        $('.p11').html('输入错误!请输入字母数字下划线开头5到20次!');
        $('.p11').css('color','red');
      }
    });
    // 邮件
    $("#t_email").keyup(function(){
      var str = $("#t_email").val();
      var ret = /^\w{1,20}@[a-zA-Z0-9]{2,5}((\.com)$|(\.cn)$)/;
      if(ret.test(str)){
           $('.p2').html('验证通过');
         $('.p2').css('color','blue');
        $('.p11').css('display','none');
      }else{
        $('.p2').html('输入错误!请输入数字字母加@符号易.come结尾！');
        $('.p2').css('color','red');
      }
    });
    // 手机
    $("#t_phone").keyup(function(){
      var str = $("#t_phone").val();
      var ret = /^[\d]{5,20}$/;
      if(ret.test(str)){
         $('.p3').html('验证通过');
         $('.p3').css('color','blue');
           $('.p2').css('display','none');
      }else{
        $('.p3').html('输入错误!请输入数字开头5到20次！');
        $('.p3').css('color','red');
      }
    });
    $("#C_ity").keyup(function(){
      var str = $("#C_ity").val();
        if(!str==""){
         $('.p3').css('display','none');
        }
    });
  });


$(function(){
    $.ajax({
    url:'index.json',
    type:'post',
    success:function(ressponse,status,xhr){
        $.each(ressponse.ri,function(index,value){
            $.each(value,function(i,v){
                $('.distance').eq(1).html('<img src="'+v+'">');
            })
        })
    }
    })
})




