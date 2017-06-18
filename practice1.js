/**
 * Created by Administrator on 2016/8/9.
 */
window.onload  = function(){
    part.apply.toText();
    part.apply.opa();
    part.apply.menu();
    part.apply.toRun();
};

var part = {} ;

part.tools = {};
part.tools.getClass = function(obj,sClass){
    var oEle = obj.getElementsByTagName("*");
    var arr = [];

    for(var i=0;i<oEle.length;i++){
        if(oEle[i].className == sClass){
            arr.push(oEle[i]);
        }
    }
    return arr ;
};
part.tools.getStyle = function (obj,attr) {
    if(obj.currentStyle){
        return obj.currentStyle[attr]
    }else {
        return getComputedStyle(obj,false)[attr]
    }

};


part.ui = {} ;
part.ui.changeText = function(obj,str){
    obj.onfocus = function(){
        if(this.value == str){this.value = ""}
    };
    obj.onblur = function(){
        if(obj.value == ""){obj.value = "Search website"}
    }
};
part.ui.fadeIn = function(obj){
    var iCur = part.tools.getStyle(obj,"opacity");
    if(iCur==100){
        return false;
    }
    var value = 0;
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var iSpeed = 5;
        if(value == 100){
            clearInterval(obj.timer)
        } else {
            value += iSpeed ;
            obj.style.opacity = value /100 ;
            obj.style.filter = "alpha(opacity:"+value+")"
        }
    },30)
};
part.ui.fadeOut = function(obj){
    var iCur = part.tools.getStyle(obj,"opacity");
    if(iCur==0){
        return false;
    }
    var value = 100;
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var iSpeed = 10;
        if(value == 0){
            clearInterval(obj.timer)
        } else {
            value -= iSpeed ;
            obj.style.opacity = value /100 ;
            obj.style.filter = "alpha(opacity:"+value+")"
        }
    },30)
};

part.ui.moveLeft = function(obj,old,now){
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var iSpeed = (now - old) / 10 ;
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed) ;

        if(now==old) {
            clearInterval(obj.timer)
        }else {
            old += iSpeed ;
            obj.style.left =  old  +  "px" ;
        }
      }
    ,20)
};


part.apply = {} ;
part.apply.toText = function(){
    var text = document.getElementsByClassName("text");
    part.ui.changeText(text[0],"Search website");
    part.ui.changeText(text[1],"Search website")
};
part.apply.opa = function(){
    var ad = document.getElementById('ad');
    var li = ad.getElementsByTagName("li");
    var iNow = 0 ;
    var oPrev = part.tools.getClass(ad,"left-arrow")[0];
    var oNext = part.tools.getClass(ad,"right-arrow")[0];
    var Prev = part.tools.getClass(ad,"prev")[0];
    var Next = part.tools.getClass(ad,"next")[0];


    var timer = setInterval(auto,2000);

    function auto(){
        if(iNow<li.length-1){
            iNow++;
        }
        else{
            iNow = 0 ;
        }
        for(var i=0;i<li.length ;i++) {
            part.ui.fadeOut(li[i])
        }
        part.ui.fadeIn(li[iNow]);
    }

    function back(){
        if(iNow>0){
            iNow--;
        }
        else{
            iNow = li.length-1 ;
        }
        for(var i=0;i<li.length ;i++) {
            part.ui.fadeOut(li[i])
        }
        part.ui.fadeIn(li[iNow]);
    }
    Prev.onmouseover = oPrev.onmouseover = function(){
        Prev.style.display = "block";
        clearInterval(timer);
    };
    Prev.onmouseout = oPrev.onmouseout = function(){
        Prev.style.display = "";
        timer = setInterval(auto,2000)
    };
    Next.onmouseover = oNext.onmouseover = function(){
        Next.style.display = "block";
        clearInterval(timer);
    };
    Next.onmouseout = oNext.onmouseout = function(){
        Next.style.display = "";
        timer = setInterval(auto,2000)
    };
    Prev.onclick = function(){
        back();
    };
    Next.onclick = function(){
        auto();
    };
};

part.apply.menu = function(){
    var oRight = document.getElementById("right_side");
    var oSort = part.tools.getClass(oRight,"sort");
    var oDd = oSort[0].getElementsByTagName("dd");
    var oUi = oSort[0].getElementsByTagName("ul");
    var oH = oSort[0].getElementsByTagName("h2");

    for(var i=0;i<oDd.length;i++){
        (function (i){
            oDd[i].onmouseover = function(){
                oUi[i].style.display = "block";
            };
            oDd[i].onmouseout = function(){
                oUi[i].style.display = "";
            }
        })(i);
    }

    for(var j=0;j<oUi.length;j++){
        oUi[j].index = j;
        var oLi = oUi[j].getElementsByTagName("li");
        for(var k=0;k<oLi.length;k++){
            (function(k){
                oLi[k].onmouseover = function(){
                    this.className = "active";
                };
                oLi[k].onmouseout = function(){
                    this.className = "";
                };
                oLi[k].onclick = function(){
                    oH[this.parentNode.index].innerHTML = this.innerHTML;
                    this.parentNode.style.display = "" ;
                }
            })(k)
        }
    }
};

part.apply.toRun = function(){
    var showPic = part.tools.getClass(document,"show_pic")[0];
    var oUi = showPic.getElementsByTagName("ul")[0];
    var oLi = oUi.getElementsByTagName("li");
    var scroll = part.tools.getClass(document,"scroll")[0];
    var nextBtn = part.tools.getClass(scroll,"next")[0];
    var lastBtn = part.tools.getClass(scroll,"last")[0];

    oUi.innerHTML = oUi.innerHTML + oUi.innerHTML ;
    oUi.style.width = oLi[0].offsetWidth * oLi.length + "px";
    var iNow = 0;
    nextBtn.onclick = function(){
        if(iNow==oLi.length/2){
            iNow=0;
            oUi.style.left=0;
        }
        part.ui.moveLeft(oUi,-iNow*oLi[0].offsetWidth,-(iNow+1)*oLi[0].offsetWidth);
        iNow++;
    };
    lastBtn.onclick = function(){
        if(iNow == 0){
            iNow = oLi.length / 2;
            oUi.style.left = -oUi.offsetWidth/2 + "px";
        }
        part.ui.moveLeft(oUi,-iNow*oLi[0].offsetWidth,-(iNow-1)*oLi[0].offsetWidth);
        iNow--;
    };

};