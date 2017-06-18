/**
 * Created by Administrator on  0010.
 */
  // Js Document
  $(function () {

    //search change
      (function () {
          var aLi = $('#index li');
          var oBar = $('.bar');
          var oText = oBar.find('.text');
          var arrText = [
              '例如：荷塘鱼坊烧鱼 或 樱花日本料理',
              '例如：昌平区育新站龙旗广场2号楼609室',
              '例如：万达影院双人情侣券',
              '例如：东莞出事了，大老虎是谁？',
              '例如：北京初春降雪，天气变幻莫测'
          ];
          var iNow = 0;
          var iText = $('.sou').find('#sou_text');

          oText.val(arrText[iNow]);

          aLi.each(function(index){
              $(this).click(function(){
                  aLi.attr('class','gradient');
                  $(this).attr('class','active');
                  iNow = index;
                  oText.val(arrText[iNow]);
              })
          });

          oText.focus(function () {

              if($(this).val() === arrText[iNow]){
                  $(this).val('');
              }
          });


          oText.blur(function () {
              if($(this).val() === ''){
                  oText.val(arrText[iNow]);
              }
          });

          iText.focus(function () {

              if($(this).val() === iText.val()){
                  $(this).val('');
              }
          });

          iText.blur(function () {
              if($(this).val() === ''){
                  iText.val('请输入关键字')  ;
              }
          });

          oBar.mouseleave(function () {
              $(this).find('.bd').css('display','none');
          });

      })();

    //update article
      (function () {

          var oUl = $('.update ul');
          var oLi = oUl.find('li');
          var oH = oLi.height();
          var oUp = $('.update_up');
          var oDown = $('.update_down');
          var i = 0 ;
          var iTime = null;

          oDown.click(function () {
              Down() ;
          });
              function Down() {
                  if(i===oLi.length-1 || i<0){
                      i = 0;
                  }else {
                      i++;
                  }
              oUl.stop().animate({'top':oH*-i},500);


              }


          oUp.click(function () {
              Up();
          });
              function Up() {
                  console.log(i);
                  if(i === 0){
                      i = -4;
                  }else {
                      i--;
                  }
                   i = Math.abs(i);
                      oUl.stop().animate({'top':oH*-i},500);

              }


          play();

          function play() {
              iTime = setInterval(function () {
                  Down();
              },1000)
          }
          oUp.hover(function () {
              clearInterval(iTime)
          },play);
          oDown.hover(function () {
              clearInterval(iTime)
          },play);
          oLi.find('a').hover(function () {
              clearInterval(iTime)
          },play)
      })();


   //选项卡切换
      (function () {
          fn_tab($('.oNav'),$('.aCon'));
          fn_tab($('.oNav_1'),$('.pic_sub'));
          fn_tab($('.oNav_2'),$('.know'));
          fn_tab($('.oNav_3'),$('.good_food'));

          function fn_tab(oNav,aCon ) {
              var aElem = oNav.children();
              aCon.hide().eq(0).show();

              aElem.each(function (index) {

                  $(this).click(function () {
                      aElem.removeClass('active').addClass('gradient');
                      $(this).removeClass('gradient').addClass('active');
                      aElem.find('.dot').attr('class','dot triangle_down_gray');
                      $(this).find('.dot').attr('class','dot triangle_down_red');

                      aCon.hide().eq(index).show();

                  })
              });

          }

      })();


    //hot_area
      (function () {
        var arr = [
            '用户:1<br/>区域:1<br/>人气:1',
            '用户:2<br/>区域:2<br/>人气:2',
            '用户名：性感宝贝<br/>区域：朝阳<br/>人气：128547 ' ,
            '用户:4<br/>区域:4<br/>人气:4',
            '用户:5<br/>区域:5<br/>人气:5',
            '用户:6<br/>区域:6<br/>人气:6',
            '用户:7<br/>区域:7<br/>人气:7',
            '用户:8<br/>区域:8<br/>人气:8',
            '用户:9<br/>区域:9<br/>人气:9',
            '用户:10<br/>区域:10<br/>人气:10',
            '用户:11<br/>区域:11<br/>人气:11'
        ];
        $('.hot_area li').mouseenter(function () {
            $('.hot_area li p').remove();
            $(this).append('<p style="width:'+($(this).width()-20)+'px;height:'+($(this).height()-20)+'px;">'+arr[$(this).index()]+'</p>')

        })
      })();


    //calendar notes
      (function () {
          var oSpan = $('.calendar h3 span');
          var oImg = $('.calendar .img_2');
          var oPrompt = $('.today_info');
          var Img =oPrompt.find('img');
          var oStrong =oPrompt.find('strong');
          var oP =oPrompt.find('p');

          oImg.hover(function () {

              var iTop = $(this).parent().position().top-30;
              var iLeft = $(this).parent().position().left+56;
              var index = $(this).parent().index()%(oSpan.length);

              oPrompt.show().css({'left':iLeft,'top':iTop});
              oP.text($(this).attr('title'));
              Img.attr('src',$(this).attr('src'));
              oStrong.text(oSpan.eq(index).text());
          },function () {
              oPrompt.hide();
          })

      })();


   //bbs高亮显示
      (function () {
          $('.bbs ol li').mouseenter(function () {
              $('.bbs ol li').removeClass('active').eq($(this).index()).addClass('active')
          });
      })();


   //自动播放焦点图
      (function () {
          var aLi =  $('.pic ul li');
          var aOi =  $('.pic ol li');
          var oP = $('.pic p' );
          var arr = ['让人惊叹的大轮船','豪华酒店自带泳池','记得那天骑行的快乐'];
          var iNow = 0;
          var iTime = null ;


          $(aLi).hide();
          $(aLi).eq(0).show();
          oP.text(arr[iNow]);
          autoPlay();
          function autoPlay() {
                iTime = setInterval(function () {
                    iNow ++;
                    iNow %= arr.length;
                    aLi.hide().css('zIndex', 1);
                    aOi.removeClass('active');
                    aOi.eq(iNow).addClass('active');
                    aLi.eq(iNow).css('zIndex',2).fadeIn();
                    oP.text(arr[iNow]);

                },2000)
          }



          aOi.each(function () {
              $(this).click(function () {
                  iNow = $(this).index();
                  active();
                  function active(){
                      aLi.hide().css('zIndex', 1);
                      aOi.removeClass('active');
                      aOi.eq(iNow).addClass('active');
                      aLi.eq(iNow).css('zIndex',2).fadeIn();
                      oP.text(arr[iNow]);
                  }

              })

          });

          $('.pic').hover(function () {
                  clearInterval(iTime)
          },autoPlay)

      })();


   //回到顶部
      (function () {
          var aSide = $("aside");
          $(window).scroll(function () {
              if ($(window).scrollTop() > 100) {
                  aSide.fadeIn(600);
              } else {
                  aSide.fadeOut(600);
              }
          });
          aSide.click(function() {
              $('body,html').animate({
                      scrollTop: 0
                  },
                  400);
          });
      })();



   //百度搜索API调用
      (function () {

          var tex = document.getElementById('te');
          tex.onkeyup = function () {
              document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
              if (this.value !== ''){
                  var oS = document.createElement("script");
                  oS.src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+this.value+"&cb=fn";
                  document.body.appendChild(oS);
              }else {
                  oUi.style.display = 'none';
              }
          };
          var Su  = document.getElementById('su');
          Su.onclick = function () {
              window.open('http://www.baidu.com/s?wd='+tex.value+'&cb=fn'+'>'+tex.value);
          };

      })();


    // 百度地图调用
      (function () {
              var map = $('#allmap');
              var shade = $('.allmap');

              $('.self_position').click(function (ev) {
                  ev.stopPropagation();
                  $(document).click(function (e) {
                      if(map.attr('display') !=='none'&&e.target.className === 'allmap'){
                          map.css('display','none');
                          shade.css('display','none');

                      }
                  });
                  map.css('display','block');
                  shade.css('display','block');

                  var offsetHeight = $(window).height()/2-map.height()/2+$(window).scrollTop();
                  var offsetWidth = $(window).width()/2-map.width()/2;

                  var shadow = $(document).height();
                  shade.css('height',shadow);
                  map.css('left',offsetWidth);
                  map.css('top',offsetHeight);


                  //获取经度和纬度
                  navigator.geolocation.getCurrentPosition(function (position) {
                      position_y = position.coords.latitude ;
                      position_x = position.coords.longitude;

                      // 百度地图API功能
                      var map = new BMap.Map("allmap");
                      map.centerAndZoom(new BMap.Point(position_x,position_y),13);
                      map.enableScrollWheelZoom(true);


                      // 添加带有定位的导航控件
                      var navigationControl = new BMap.NavigationControl({
                          // 靠左上角位置
                          anchor: BMAP_ANCHOR_TOP_LEFT,
                          // LARGE类型
                          type: BMAP_NAVIGATION_CONTROL_LARGE,
                          // 启用显示定位
                          enableGeolocation: true
                      });
                      map.addControl(navigationControl);
                      // 添加定位控件
                      var geolocationControl = new BMap.GeolocationControl();
                      geolocationControl.addEventListener("locationSuccess", function(e){
                          // 定位成功事件
                          var address = '';
                          address += e.addressComponent.province;
                          address += e.addressComponent.city;
                          address += e.addressComponent.district;
                          address += e.addressComponent.street;
                          address += e.addressComponent.streetNumber;
                          alert("当前定位地址为：" + address);
                      });
                      geolocationControl.addEventListener("locationError",function(e){
                          // 定位失败事件
                          alert(e.message);
                      });
                      map.addControl(geolocationControl);




                      // 用经纬度设置地图中心点
                      function theLocation(){
                          if(position_x !== "" && position_y !== ""){
                              map.clearOverlays();
                              var new_point = new BMap.Point(position_x,position_y);
                              var marker = new BMap.Marker(new_point);  // 创建标注
                              map.addOverlay(marker);              // 将标注添加到地图中
                              map.panTo(new_point);
                          }
                      }
                      theLocation();
                  });
              });

    })()

  });


//json 回调函数
function fn(json) {
    oUi = document.getElementById("search").getElementsByTagName('ul')[0];
    oUi.style.display = 'block';
    var html = '';
    if(json.s.length){
        oUi.style.display = 'block';
        for(var i=0;i<json.s.length;i++){
            html+='<li><a href='+'https://www.baidu.com/s?wd='+json.s[i]+'&cb=fn'+'>'+json.s[i]+'</a></li>';
        }
        oUi.innerHTML = html;
    }
}
