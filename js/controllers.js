var doResize, setSliders, initFullPage;

app
.controller('hmCtrl', function($scope, $http, $state, $stateParams, $filter){
  // l("Home")
  PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST;
  PIXI.Graphics.prototype.updateLineStyle = function (lineWidth, color, alpha) {
    var len = this.graphicsData.length;
    for (var i = 0; i < len; i++) {
      var data = this.graphicsData[i];
      data.lineWidth = lineWidth;
      data.lineColor = color;
      data.alpha = alpha;
      this.dirty++;
      this.clearDirty++;
    }
  }

  var grArr = [], bg, w, h
  , canEl = $(".pixi-ctn")
  , pixiApp
  , ctn = new PIXI.Container()
  , img = new Image()
  , lastCenter
  , s = $scope
  , preloadArr = []
  , lastZoom
  // , testArr = []
  // , firstClick = true
  // , areaSelected = false
  ;
  
  img.onload = drawCanvas;
  s.options = {
    currHoverId: "",
    currClickId: "",    
    selLocObj: {},
    showLoaderMain: true
  }

  $(function () {
    if(!isIE()) initCanvas();
  })

  window.onresize = function(e){
    w = canEl.width();
    h = canEl.height();
    // l(w, h, bg.width, bg.height)

    // viewport.fit(false, w, h);
    // lastCenter = {
    //   x: viewport.left + viewport.width / 2,
    //   y: viewport.top + viewport.height / 2,
    // }
    pixiApp.renderer.resize(w, h);
    viewport.destroy();
    createViewPort();

    // viewport.zoom(100, true);
    // viewport.zoom(-100, true);
  }

  function initCanvas(){
    w = canEl.width();
    h = canEl.height();
    // l(w, h)
    // c = { x: w / 2, y: h / 2 };

    pixiApp = new PIXI.Application(w, h, {
      transparent: true,
      antialias: true
    })

    pixiApp.view.style.position = "absolute";
    pixiApp.view.style.top = pixiApp.view.style.left = 0;
    pixiApp.stage.addChild(ctn);
    canEl.append(pixiApp.view);
    canEl.on("mouseout", function (e) {
      e.preventDefault();
      s.$apply(function () {
        s.options.currHoverId = "";
      })
    })

    if(isIE()){
      $(".pixi-ctn .loader").css({
        transform: "translateX(50%)",
        left: "-50%"
      })
    }
  }

  function drawCanvas(e){
    if(isIE()) initCanvas();

    // l("Loaded image", this.width, this.height)
    lastZoom = s.options.currProperty.initMapZoom

    bg = new PIXI.Sprite(new PIXI.Texture.fromImage(e.target.src));
    var self = this;
    
    if(!isIE()){      
      bg.width = w > this.width ? w : this.width;
      bg.height = h > this.height ? h : this.height;
    } else{
      bg.width = w;
      bg.height = h;
    }

    bg.x = 0;
    bg.y = 0;
    // bg.interactive = true;
    // bg.mousedown = function(e){
    //   l("Body clicked");   
    // }
    ctn.addChild(bg);

    s.options.locations.forEach(function (obj, idx) {
      var area = new PIXI.Graphics();
      area.alpha = .3;
      area.id = obj.id;
      area.idx = idx;
      area.buttonMode = true;
      area.interactive = true;
      area.wasMoved = false;

      area
      .lineStyle(0, 0xffffff, 1)
      .beginFill(obj.fill, 1)
      .drawPolygon(obj.coords.map(function(c){ 
        if(!isIE()) return new PIXI.Point(c[0], c[1]) 
        else return new PIXI.Point(c[0]*w/self.width, c[1]*h/self.height) 
      }))
      .endFill()
      .on('pointerdown', function () { selectLoc(this, true, true) })
      .on('pointerover', function () { hoverLoc(this, true) })
      .on('pointerout', function () { outLoc(this) })

      grArr.push(area);
      ctn.addChild(area);

      var text = new PIXI.Text(obj.text.v,
        new PIXI.TextStyle({
          fill: 0xffffff,
          fontSize: !isIE() ? 48 : 24,
          fontWeight: "bold",
          dropShadow: true,
          dropShadowAlpha: 0.7,
          dropShadowAngle: 0.9,
          dropShadowDistance: !isIE() ? 5 : 2,
        })
      );

      if(!isIE()) text.position.set(obj.text.x, obj.text.y);
      else text.position.set(obj.text.x*w/self.width, obj.text.y*h/self.height);

      // l(obj.text.x, obj.text.y, w, h, self.width, self.height)
      // testArr.push(text.position)      

      ctn.addChild(text);
    })
    // s.testArr = testArr

    if(!isIE()) createViewPort();
    else if(isEdge()){
      setTimeout(createViewPort, 500);
    }
  }

  function createViewPort(){
    viewport = new PIXI.extras.Viewport({
      screenWidth: w,
      screenHeight: h,
      worldWidth: bg.width,
      worldHeight: bg.height,
      // the interaction module is important for wheel() to work properly when renderer.view is placed or scaled
      interaction: pixiApp.renderer.plugins.interaction
    });
    
    pixiApp.stage.addChild(viewport);
    viewport.left = w/2 + 400;
    viewport.top = h/2 - 200;

    viewport
    // .pinch() // Does not seem to work
    .drag()
    .zoomPercent(lastZoom, true)
    .wheel()
    .clamp({
      direction: "all"
    })
    .clampZoom({
      minWidth: w,
      minHeight: h,
      maxWidth: bg.width,
      maxHeight: bg.height
    })
    .fitWorld(true)
    
    viewport.addChild(ctn);

    // viewport.on('wheel', function(e){
    //   if (e.wheel.dy > 0) lastZoom -= .1
    //   else lastZoom += .1
    //   // l(lastZoom)
    // })

    // viewport.on('pinch-start', e => {
    //   alert("pinch")
    // })

    // if (lastCenter) {
    //   viewport.left = lastCenter.x - viewport.width / 2;
    //   viewport.top = lastCenter.y - viewport.height / 2;
    // }
  }

  function selectLoc(gr, toApply, fromGraphic){
    // l(gr)
    // l("Clicked - "+ this.id)
    grArr.forEach(function(obj){
      obj.clicked = false;
      obj.alpha = .3;
      obj.updateLineStyle(0, 0xffffff, 1);
    })
    gr.clicked = true;
    gr.alpha = .9;
    gr.updateLineStyle(5, 0xffffff, 1);
    
    if(fromGraphic){
      TweenMax.to('.nano-content', .5, {
        scrollTop: gr.idx * ($(".loc-box").height() + 20)
      })

      // $('.nano-content').animate({
      // }, 'slow');
    }
    
    if(toApply){      
      s.$apply(function(){
        s.options.currClickId = gr.id;
      })
    }else{
      s.options.currClickId = gr.id;      
    }
  }

  function hoverLoc(gr, toApply){
    if(!gr.clicked){
      gr.alpha = .8;
      gr.updateLineStyle(5, 0xffffff, 1);
      if(toApply){
        s.$apply(function(){
          s.options.currHoverId = "";
          s.options.currHoverId = gr.id;
        })
      }else{
        s.options.currHoverId = "";
        s.options.currHoverId = gr.id;
      }
    }
  }

  function outLoc(gr){
    if(!gr.clicked){
      gr.alpha = .3;
      gr.updateLineStyle(0, 0xffffff, 1);
    }
  }

  function preload(id, index, dir){
    // l(id, index, dir)

    var arr = $filter('filter')(preloadArr, { id: id })[0].images
    , allLoaded = true
    ;

    arr.forEach(function(el){
      allLoaded = allLoaded && el.loaded;
    })
    
    if(allLoaded){
      l("All images preloaded")
    } else{
      var i = index.valueOf()
      , j = 0 
      ;
      
      switch (dir) {
        case 'left': // Next 15 or less
          i++;
          while(i < arr.length && i <= index + 15){
            if (!arr[i].loaded) {
              var tmp = new Image();
              tmp.src = arr[i].img;
              arr[i].loaded = true;
            }
            // l(arr[i], j)
            i++; j++;
          }
        break;
  
        default: // Prev 15 or less
          i--;
          while (i >= 0 && i >= index - 15) {
            if (!arr[i].loaded) {
              var tmp = new Image();
              tmp.src = arr[i].img;
              arr[i].loaded = true;
            }
            // l(arr[i], j)
            i--; j++;
          }
        break;
      }
      l(preloadArr)      
    }
  }

  s.zoom = function(dir){
    if (dir === 'in') viewport.zoom(-200, true)
    else viewport.zoom(200, true)    
  }

  s.selectLoc = function(loc, evt){
    // l(evt.target)
    var gr = grArr.filter(function(x){
      return x.id === loc.id;
    });    
    
    if(!(evt.target.tagName === "SPAN" || evt.target.tagName === "A")){
      viewport.snap(loc.text.x , loc.text.y, { time: 200, removeOnComplete: 1 })
    } 
        
    if(gr.length){
      selectLoc(gr[0], false, false);
    }
  }

  s.hoverLoc = function(loc, evt){
    s.options.selLocObj = loc;
    $(evt.currentTarget).addClass("active");

    var gr = grArr.filter(function(x){
      return x.id === loc.id;
    });
    if(gr.length){
      hoverLoc(gr[0], false);
    }
  }

  s.outLoc = function(loc, evt){
    // l("outLoc fired", evt.target.tagName, evt.currentTarget.tagName)
    $(".loc-box.active").removeClass("active");    
    var gr = grArr.filter(function(x){
      return x.id === loc.id;
    });
    if(gr.length){
      outLoc(gr[0]);
    }
    // if(!(evt.target.tagName === "SPAN" || evt.target.tagName === "A")){
    // } 
  }

  s.showFullScreen = function(loc){
    // l(loc)
    s.options.selLocObj = loc;
    s.options.fullSliderIdx = loc.slIdx;
    s.options.fullSliderImgs = loc.imgs.carousel;
    s.options.showFullSlider = true;
  }

  s.hideFullScreen = function(){
    // l(loc)        
    // s.options.fullSliderImgs = [];
    s.options.showFullSlider = false;
  }

  s.openDetail = function(section){
    var op = s.options;
    $state.go('location', { 
      // locationName: op.selLocObj.url + "#" +section,
      // section: section,
      // s: section 

      // For opening from the property page
      all: op.locations,
      t: op.titleArr,
      p: op.currProperty,
      l: op.selLocObj, 
      // For the URL
      propertyName: op.selLocObj.parent,
      locationName: op.selLocObj.url,
      '#': section,
    });
  }

  l($stateParams)

  var pName = $stateParams.propertyName;
  // if(pName === ""){
  //   $state.go('property', { propertyName: "the-banks" });
  // }else{
  //   
  // }
  if(!pName || pName === ""){ 
    pName = 'the-banks' 
    $state.go('property', { propertyName: "the-banks" });
    return;
  }
  
  var jsonFile = 'data/' + pName + '.json?t=' + Date.now() 
  $http.get(jsonFile)
  .then(function (res) {
    // l(res.data)
    var data = res.data;
    s.options.showLoaderMain = false;
    s.options.currProperty = data;
    s.options.locations = data.locations;
    s.options.titleArr = data.titleArr;
    img.src = data.map;

    s.options.locations.forEach(function(loc){
      var tmp = []
      , carousel = loc.imgs.carousel
      ;
  
      carousel.forEach(function(img, idx){
        var path = loc.baseFolder + img.val;
        if(idx === 0) {
          tmp.push({
            img: path,
            loaded: true
          })
        } else if(idx === 1 || idx === carousel.length - 1){
          var i = new Image();
          i.src = path;
  
          tmp.push({
            img: path,
            loaded: true
          })
        } else {
          tmp.push({
            img: loc.baseFolder + img.val,
            loaded: false
          })
        }
      })
  
      preloadArr.push({
        id: loc.id,
        images: tmp
      })
    })
    // l(preloadArr)
  
    setTimeout(function () {
      if(!isTablet() && !isMobile()){          
        $(".nano").nanoScroller()
      }
  
      $('#car-full').on('slid.bs.carousel', function (e) {
        s.options.selLocObj.slIdx = e.to;
        s.$apply();
      })
  
      $('.carousel-sm').on('slid.bs.carousel', function (e) {
        // l(e)
        preload(s.options.selLocObj.id, e.to, e.direction);
        s.options.selLocObj.slIdx = e.to;
        s.$apply();
      })
    }, 0)
  })
  .catch(function(err){
    l(err)
    $state.go('property', { propertyName: "the-banks" });
  })
})
.controller('fpCtrl', function ($scope, $filter, $timeout, $state, $stateParams, $http, $rootScope, $location){
   
  // Private properties
  // For Info section and Page
  var keyCount = 1
  , scrollCount = 1
  , scrollDist = 0
  , scrollDir = "down"
  , $target = $(".info-ctn-inner")
  , s = $scope
  , op = {
    showLoaderMain: true,
    showLoaderSection: true
  }
  , tempAll = []
  ;

  s.options = op;

  // Jquery related functions
  $(function () {

    $(".section").addClass("beforeinit");    

    // Resize handling
    $(window).resize(doResize);

    // Keyboard button handling
    $(document).keydown(onKeyDown);

    if(!isMobile() && !isTablet()){
      // Info section mousewheel handling
      $("#section0").mousewheel(function (event, delta) {
        event.preventDefault();
        var dist = $target.scrollTop() - (delta * 50);
        $target.scrollTop(dist);

        if ($target.scrollTop() + $target.innerHeight() >= $target[0].scrollHeight - 1) {
          scrollDir = "up";
          scrollCount++;
          $(".more-info-btn").hide();
          $(".cont-btn").show();
          $("i.fa-chevron-down").show();
          $(".cont-btn").css("opacity", 0.05 * scrollCount);
          $(".cont-btn h3").css({
            fontSize: scrollCount * 0.12 + "rem"
          });
        } else if (dist >= 0) {
          scrollDir = "up";
          scrollCount = 1;
          $(".cont-btn").fadeOut();
          $(".cont-btn").css("opacity", 0);
          $(".more-info-btn").fadeOut();
        } else if (dist == -50) {
          scrollDir = "down";
          $(".cont-btn").hide();
          $("i.fa-chevron-down").show();
          $("i.fa-chevron-up").hide();
          $(".more-info-btn").fadeIn();
        }

        if (scrollCount > 20) {
          fullpage_api.moveTo('images');
          setTimeout(function () {
            $("i.fa-chevron-up").show();
            $("i.fa-chevron-down").hide();
            $(".more-info-btn").show();
            $(".cont-btn").hide();
            scrollCount = 1;
          }, 500)
        }
      });      

      // $('.main-ctn').on( 'touchstart', function (e) { 
      //   var target = $(e.currentTarget).find(".info-ctn-inner");      
      //   // l(target.scrollTop() + target.innerHeight(), target[0].scrollHeight)
      //   // l(target.scrollTop() + target.innerHeight() <= target[0].scrollHeight - 1)
      //   if (target.scrollTop() + target.innerHeight() > target[0].scrollHeight - 1){
      //     fullpage_api.moveTo('images')
      //     setTimeout(function () {
      //       $("i.fa-chevron-up").hide();
      //       $("i.fa-chevron-down").show();
      //       $(".more-info-btn").show();
      //       $(".cont-btn").hide();  
      //       target.scrollTop(0);
      //     }, 500);
      //   }
      // });
    }

    // Swipe actions
    $(".carousel-ctn, .img-overlay-ctn").swipe({
      swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
        // l(event, direction, distance)
        switch (direction) {
          case 'right':
            switch ($(".fp-section.active").attr("id")) {
              case "section1":
                if (s.images.all.idx > 0)
                  $("#car-main").carousel("prev");
              break;
              
              case "section3":
                if (s.images.fpImg.idx > 0)
                  $("#car-fp").carousel("prev");
              break;
              
              case "section4":
                if (s.images.mapImg.idx > 0)
                  $("#car-map").carousel("prev");
              break;
            }            
            if (Object.keys(s.images.full).length && s.images.full.idx > 0)
              $("#car-full").carousel("prev");
          break;

          case 'left':
            switch ($(".fp-section.active").attr("id")) {
              case "section1":
                if (s.images.all.idx < s.images.all.imgArr.length - 1)
                  $("#car-main").carousel("next");
              break;

              case "section3":
                if (s.images.fpImg.idx < s.images.fpImg.imgArr.length - 1)
                  $("#car-fp").carousel("next");
              break;

              case "section4":
                if (s.images.mapImg.idx < s.images.mapImg.imgArr.length - 1)
                  $("#car-map").carousel("next");
              break;
            }
            if (Object.keys(s.images.full).length && s.images.full.idx < s.images.full.imgArr.length - 1)
              $("#car-full").carousel("next");
          break;
        }
      }
    });

  });

  s.$on('$includeContentLoaded', function (){
    l("Loaded info content")
    if(!isMobile() && !isTablet()){      
      setNanoScroller();
      $timeout(function() {
        initFullPage();
      }, 1000)
    } else{
      s.options.bookNowForm = {
        prodType: [
          "Media Production",
          "Fashion Agency",
          "Production Type 3",
          "Production Type 4"
        ],
        prodTypeSel: "",
        dayLength: [
          "2 Hours",
          "5 Hours",
          "12 Hours",
          "24 Hours"
        ],
        dayLengthSel: "",
        noPeople: [
          "0 - 15 People",
          "15 - 30 People",
          "31 - 45 People",
          "> 45"
        ],
        noPeopleSel: "",
        from: new Date,
        to: new Date
      };
      s.options.showBookNow = false;
      s.options.showPreview = false;
      s.options.currFilter = "all";
      s.options.showFilter = false;
      s.options.showIframe = false;
      s.options.showSelectOpts = false;
      s.options.showIns = false;
      s.options.showSelectOpts = false;
      s.options.showLoaderMain = false;
      s.options.showLoaderSection = false;
      s.options.currFullSlider = "";
      s.options.showFullSlider = false;
      s.currMpUrl = "";
      // if(!isMobile()){
      //   s.currMpUrl = s.loc.mpUrl;
      // }

      $(document).on("scroll", function(e){
        var top = $("#section2")[0].getBoundingClientRect().top
        if(top <= window.innerHeight/2 && s.currMpUrl === ""){
          s.currMpUrl = s.loc.mpUrl;
          s.$apply();
        }
      })

      $(".section").removeClass("beforeinit");
      $(".carousel-plh").addClass("carousel slide");
      $(".btn-ctn-mob").hide();      
      
      $('#car-main').on('slid.bs.carousel', function (e) {
        afterSlide("all", e.to, e.direction);
      });

      $('#car-fp').on('slid.bs.carousel', function (e) {
        afterSlide("fpImg", e.to, e.direction);
      });

      $('#car-map').on('slid.bs.carousel', function (e) {
        afterSlide("mapImg", e.to, e.direction);
      });

      $('#car-full').on('slid.bs.carousel', function (e) {
        afterSlide(s.options.currFullSlider, e.to, e.direction);
      });

      if (sp.s) {
        s.moveToSection(sp.s);
        delete sp.s;
      }
    }
  });

  // $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
  //   if (typeof fullpage_api !== "undefined") 
  //     fullpage_api.destroy('all')
  // });

  function initFullPage(){
    if(typeof fullpage_api !== "undefined" && !isIE()) fullpage_api.destroy('all')
    setNanoScroller();
    $(".section").removeClass("beforeinit");
    $(".carousel-plh").removeClass("carousel slide");

    // Init fullPage with options
    new fullpage('#fullpage', {
      anchors: ['info', 'images', '3dvr', 'floorplan', 'maps', 'services'],
      menu: '.menu',
      lockAnchors: true,
      verticalCentered: false,
      animateAnchor: false,
      // scrollBar: true,
      normalScrollElements: ".menu, .badge-pill, #section0, .thumb-ctn, .img-overlay-ctn, .fs-ctn, .control_prev, .control_next, #book-now-ctn",
      licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
      onLeave: function(origin, destination, direction){
        // l(origin, destination, direction)
        setColors(destination.index);
        if(destination.index == 2){
          s.currMpUrl = s.loc.mpUrl;
          // s.$apply();
        }
        setNanoScroller();
      },
      afterLoad: function (origin, destination, direction) {
        // l(origin, destination, direction)        
      },
      afterRender: function(){
        s.options.bookNowForm = {
          prodType: [
            "Media Production",
            "Fashion Agency",
            "Production Type 3",
            "Production Type 4"
          ],
          prodTypeSel: "",
          dayLength: [
            "2 Hours",
            "5 Hours",
            "12 Hours",
            "24 Hours"
          ],
          dayLengthSel: "",
          noPeople: [
            "0 - 15 People",
            "15 - 30 People",
            "31 - 45 People",
            "> 45"
          ],
          noPeopleSel: "",
          from: new Date,
          to: new Date
        };
        s.options.showBookNow = false;
        s.options.showPreview = false;
        s.options.currFilter = "all";
        s.options.showFilter = false;
        s.options.showIframe = false;
        s.options.showSelectOpts = false;
        s.options.showIns = false;
        s.options.showSelectOpts = false;
        s.options.showLoaderMain = false;
        s.options.showLoaderSection = false;
        s.options.currFullSlider = "";
        s.options.showFullSlider = false;

        if(sessionStorage.getItem("showIns") != null){
          $(".ifr-outer").hide();
          $(".ifr-ctn").css("z-index", 0);
        }
                
        setColors(0);
        fullpage_api.setKeyboardScrolling(false);
        $(".nano-content").scrollTop(0);
        $("i.fa-chevron-up").hide();
        $("i.fa-chevron-down").show();
        $(".more-info-btn").show();
        $(".cont-btn").css("opacity", 0);
        $(".img-overlay-ctn").css("opacity", 1);
        $(".btn-ctn-mob").hide();      
        
        if (sp.s) {
          s.moveToSection(sp.s);
          delete sp.s;
        }

        $(".carousel-plh").addClass("carousel slide");
        
        $('#car-main').on('slid.bs.carousel', function (e) {
          afterSlide("all", e.to, e.direction);
        });

        $('#car-fp').on('slid.bs.carousel', function (e) {
          afterSlide("fpImg", e.to, e.direction);
        });

        $('#car-map').on('slid.bs.carousel', function (e) {
          afterSlide("mapImg", e.to, e.direction);
        });

        $('#car-full').on('slid.bs.carousel', function (e) {
          afterSlide(s.options.currFullSlider, e.to, e.direction);
        });

        setNanoScroller();

      }
    })
  }

  function doResize(e){
    $("img.spinner-img").hide();
    $timeout(setNanoScroller, 1000);
  }

  function setNanoScroller() {
    $(".nano").nanoScroller({ destroy: true });
    $(".nano").nanoScroller();
  }

  function afterSlide(type, to, dir){
    if(type !== ""){
      var curr = s.images[type];
      // l(curr, s.options.showFullSlider)
      preload(curr.imgArr, to, dir);
      if (type === 'all' && s.options.currFilter === 'all') {
        tempAll = angular.copy(curr.imgArr);
        l("Preloaded All:", tempAll);
      }
  
      curr.idx = to;
      s.$apply();
  
      scrollToDiv(type, to);    
    }
  }

  function scrollToDiv(type, to){
    var parent, div;
    switch(type){
      case 'all':
        parent = "#car-main-thumb .nano-content";
        div = "#car-main-thumb .thumb-single";
      break;
      
      case 'fpImg':
        parent = "#car-fp-thumb .nano-content";
        div = "#car-fp-thumb .thumb-single";
      break;
      
      case 'mapImg':
        parent = "#car-map-thumb .nano-content";
        div = "#car-map-thumb .thumb-single";
      break;
    }

    TweenMax.to(parent, .5, { scrollTo: $(div).eq(to)[0].offsetTop });
  }

  function preload(arr, index, dir){
    // l(arr, index, dir)
    var allLoaded = true;
    arr.forEach(function(el){
      allLoaded = allLoaded && el.loaded;
    })
    
    if(allLoaded){
      l("All images preloaded")
    } else{
      var i = index.valueOf()
      , j = 0 
      ;
      
      switch (dir) {
        case 'left': // Next 15 or less
          i++;
          while(i < arr.length && i <= index + 15){
            if (!arr[i].loaded) {
              var tmp = new Image();
              tmp.src = arr[i].img;
              arr[i].loaded = true;
            }
            // l(arr[i], j)
            i++; j++;
          }
        break;
  
        default: // Prev 15 or less
          i--;
          while (i >= 0 && i >= index - 15) {
            if (!arr[i].loaded) {
              var tmp = new Image();
              tmp.src = arr[i].img;
              arr[i].loaded = true;
            }
            // l(arr[i], j)
            i--; j++;
          }
        break;
      }      
      $timeout(setNanoScroller, 500);      
    }
  }

  function setColors(idx){
    if (idx == 2) {
      // Menu Colors
      $(".menu").css({
        color: "#fff"
      })
      $(".pull-down-ctn").css({
        borderColor: "#fff"
      })
      $(".btn-ctn").css({
        color: "#000"
      })

      // Top Nav Link Colors
      $(".header .nav-link, .loc-ctn .nav-link").css({
        color: "#fff"
      })
      $(".header .nav-link, .loc-ctn .nav-link").mouseenter(function () {
        $(this).css("color", "#007bff")
      });

      $(".header .nav-link, .loc-ctn .nav-link").mouseleave(function () {
        $(this).css("color", "#fff")
      });

      //Animate content box
      $(".ins-ctn").delay(500).animate({ left: 0, opacity: 1 }, 1000, function () {
        $(".note").addClass("anim-note");
      });
    } else {
      // Menu Colors
      $(".menu").css({
        color: "#000"
      })
      $(".pull-down-ctn").css({
        borderColor: "#000"
      })

      // Top Nav Link Colors
      $(".header .nav-link, .loc-ctn .nav-link").css({
        color: "#000"
      })
      $(".header .nav-link, .loc-ctn .nav-link").mouseenter(function () {
        $(this).css("color", "#007bff")
      });

      $(".header .nav-link, .loc-ctn .nav-link").mouseleave(function () {
        $(this).css("color", "#000")
      });
    }
  }

  function onKeyDown(e){
    // l(e.originalEvent)    
    switch(e.originalEvent.keyCode){
      case 27: // Escape
        //#region 
        if (s.options.showFullSlider){
          s.hideFullScreen();          
        }

        if(s.options.showIframe){
          s.toggleIframe();
        }

        if(s.options.showBookNow){
          s.toggleBookNow();
        }

        s.$apply();
        //#endregion
      break;

      case 38: // Up Arrow 
        //#region 
        l("Up")
        switch($(".fp-section.active").attr("id")){
          case "section0":
            if(scrollDist <= 0){
              scrollDist=0;
            }
            else{
              keyCount = 1;              
              scrollDist-=50;
            }

            if(scrollDist == 0){
              $("i.fa-chevron-down").show();
              $("i.fa-chevron-up").hide();
              $(".more-info-btn").fadeIn();
            }else{
              $(".cont-btn").fadeOut();
              $(".more-info-btn").fadeOut();      
            }

            $target.scrollTop(scrollDist);
          break;

          case "section1":
            if (!s.options.showFullSlider){
              fullpage_api.moveTo("info")
            }
          break;

          case "section2":
            if(!s.options.showIframe){
              fullpage_api.moveTo("images")
            }
          break;

          case "section3":
            if (!s.options.showFullSlider){            
              fullpage_api.moveTo("3dvr")
            }
          break;

          case "section4":
            if (!s.options.showFullSlider) {            
              fullpage_api.moveTo("floorplan")
            }
          break;

          case "section5":
            fullpage_api.moveTo("maps")
          break;
        }
        //#endregion
      break;

      case 40: // Down Arrow
        //#region 
        l("Down")
        switch($(".fp-section.active").attr("id")){
          case "section0":
            if($target.scrollTop() + $target.innerHeight() <= $target[0].scrollHeight - 1){
              $(".more-info-btn").fadeOut();
              scrollDist+=50;
            }else{
              $(".more-info-btn").hide();
              $(".cont-btn").show();
              
              $(".cont-btn").css({
                opacity: 0.2*keyCount
              });

              $(".cont-btn h3").css({                
                fontSize: keyCount*0.5 + "rem"
              });

              keyCount++;
            }

            if(keyCount > 6){
              fullpage_api.moveTo('images');
              setTimeout(function(){
                $("i.fa-chevron-up").show();    
                $("i.fa-chevron-down").hide();
                $(".more-info-btn").show();        
                $(".cont-btn").hide();
                keyCount = 1;
              }, 500)
            }

            $target.scrollTop(scrollDist);
          break;
  
          case "section1":
            if (!s.options.showFullSlider) {            
              fullpage_api.moveTo("3dvr")
            }
          break;

          case "section2":
            if(!s.options.showIframe){
              fullpage_api.moveTo("floorplan")
            }
          break;

          case "section3":
            if (!s.options.showFullSlider) {            
              fullpage_api.moveTo("maps")
            }
          break;

          case "section4":
            if (!s.options.showFullSlider) {            
              fullpage_api.moveTo("services")
            }
          break;
        }
        //#endregion
      break;

      case 37: // Left Arrow
        //#region 
        switch ($(".fp-section.active").attr("id")) {
          case "section1":
            if (s.images.all.idx > 0)
              $("#car-main").carousel("prev");
            break;

          case "section3":
            if (s.images.fpImg.idx > 0)
              $("#car-fp").carousel("prev");
            break;

          case "section4":
            if (s.images.mapImg.idx > 0)
              $("#car-map").carousel("prev");
            break;
        }
        if (Object.keys(s.images.full).length && s.images.full.idx > 0)
          $("#car-full").carousel("prev");
        //#endregion 
      break;

      case 39: // Right Arrow
        //#region 
        switch ($(".fp-section.active").attr("id")) {
          case "section1":
            if (s.images.all.idx < s.images.all.imgArr.length - 1)
              $("#car-main").carousel("next");
            break;

          case "section3":
            if (s.images.fpImg.idx < s.images.fpImg.imgArr.length - 1)
              $("#car-fp").carousel("next");
            break;

          case "section4":
            if (s.images.mapImg.idx < s.images.mapImg.imgArr.length - 1)
              $("#car-map").carousel("next");
            break;
        }
        if (Object.keys(s.images.full).length && s.images.full.idx < s.images.full.imgArr.length - 1)
          $("#car-full").carousel("next");
        //#endregion 
      break;
    }
  }

  function scrollTo(section){
    TweenMax.to(window, .5, { 
      scrollTo: $(section).offset().top - 20
    });
  }

  // Public properties and methods
  s.loadMore = function(type){
    // l("Load more", arr);
    l("Load more");
    var arr = s.images[type].imgArr
    , idx = -1;

    for(var i = 0; i < arr.length; i++){
      if (!arr[i].loaded){
        idx = i; break;
      }
    }
    if(idx > 0) preload(arr, idx - 1, "left");
    else l("All images preloaded from thumbnail");

    if (type === 'all' && s.options.currFilter === 'all') {
      tempAll = angular.copy(arr);
      l("Preloaded All:", tempAll);
    }
  }

  s.toggleViewSelectOpts = function(){
    s.options.showSelectOpts = !s.options.showSelectOpts;
  }

  s.hoverOption = function(loc, idx){
    s.options.showPreview = true;
    s.options.currHover = idx;  
    s.options.previewImg = loc.baseFolder + loc.imgs.carousel[0].val;
  }

  s.moveToSection = function(section){
    s.closeMobileMenu();
    if(isMobile() || isTablet()){
      switch(section){
        case 'info': scrollTo('#section0'); break;
        case 'images': scrollTo('#section1'); break;
        case '3dvr': scrollTo('#section2'); break;
        case 'floorplan': scrollTo('#section3'); break;
        case 'maps': scrollTo('#section4'); break;
        case 'services': scrollTo('#section5'); break;
      }
    }else fullpage_api.moveTo(section);    
  }

  s.selectLocation = function(loc, clicked){
    if (!s.loc || (s.loc && loc.id !== s.loc.id)){
      s.loc = loc;
      s.options.showLoaderSection = true;

      if(clicked){
        // l($location)
        // $location
        // .path('/property/' + s.loc.parent + '/' + s.loc.url)
        // .replace()
        s.options.showSelectOpts = false;
        s.options.showPreview = false;

        $state.go('location', {
          propertyName: s.loc.parent,
          locationName: s.loc.url
        }, {
          // prevent the events onStart and onSuccess from firing
          notify:false,
          // prevent reload of the current state
          reload:false, 
          // replace the last record when changing the params so you don't hit the back button and get old params
          // location: 'replace', 
          // inherit the current params on the url
          inherit:false
        });        
      }

      // Init sliders      
      s.images = {
        all: {
          idx: 0, imgArr: []
        }, fpImg: {
          idx: 0, imgArr: []
        }, mapImg: {
          idx: 0, imgArr: []
        }
      }      
          
      Object.keys(s.images).forEach(function(key){
        var arr = loc.imgs[key];
        arr.forEach(function(img, idx){
          var path = loc.baseFolder + img.val
          , tmp = s.images[key].imgArr;

          // if (idx === 0) {
          //   tmp.push({
          //     img: path,
          //     loaded: true
          //   })
          // } else if (idx === 1 || idx === arr.length - 1) {

          // For Desktop
          if(!isMobile()){
            if (idx < 5) {
              var i = new Image();
              i.src = path;
  
              tmp.push({
                img: path,
                loaded: true
              });
            } else {
              tmp.push({
                img: loc.baseFolder + img.val,
                loaded: false
              });
            }
          } else{
            if (idx < 10) {
              var i = new Image();
              i.src = path;

              tmp.push({
                img: path,
                loaded: true
              });
            } else {
              tmp.push({
                img: loc.baseFolder + img.val,
                loaded: false
              });
            }
          }
        });
      });
      tempAll = angular.copy(s.images.all.imgArr);
      s.images.full = {};
      l(s.images)
    }
    
    s.toggleViewSelectOpts();
  }

  s.filterImages = function(val){
    // $(".fst, .fs1").hide();
    $("img.spinner-img").show();
    
    if (val !== "all") {
      var filtered = $filter('filter')(s.loc.imgs.all, { 
        type: val 
      })
      .map(function (img) {
        return {
          loaded: true,
          img: s.loc.baseFolder + img.val
        }
      });

      s.images.all = {
        idx: 0,
        imgArr: filtered
      }
    }else{
      s.images.all = {
        idx: 0, 
        imgArr: tempAll
      }
    }

    s.images.full = s.images.all;

    s.options.currFilter = val;
    $(".nano-content").scrollTop(0);    
    doResize();
  }

  s.hideFilter = function(e){
    var clickedOnFilter = $(e.target).hasClass("badge-filter") || $(e.target).hasClass("filter-btn") || $(e.target).hasClass("fa-sliders");
    if(!clickedOnFilter){
      s.options.showFilter = false;
      s.options.showFilterFS = false;
    }
    // var clickedOnDD = $(e.target).hasClass("pull-down-opt-ctn");
    // if(!clickedOnDD){
    //   s.options.showSelectOpts = false;
    //   s.options.showPreview = false;
    // }
  }

  s.showMobileMenu = function() {
    if(isMobile()){
      $(".btn-ctn-mob").show();
      TweenMax.to(".btn-ctn-mob", .5, {
        opacity: 1
      })
    }
  }
  
  s.closeMobileMenu = function() {
    TweenMax.to(".btn-ctn-mob", .2, {
      opacity: 0,
      onComplete: function () {
        $(".btn-ctn-mob").hide();
      }
    })
  }

  s.showMoreInfo = function(){
    // l(scrollDir)
    if(scrollDir == "up"){
      $('.info-ctn-inner').scrollTop(0);      
      $("i.fa-chevron-down").show();
      $("i.fa-chevron-up").hide();
      scrollDir = "down";
    }else{
      $("i.fa-chevron-up").show();
      $("i.fa-chevron-down").hide();
      $('.info-ctn-inner').scrollTop($('.info-ctn-inner')[0].scrollHeight);      
      scrollDir = "up";
    }
  }

  s.backToImagesMain = function(){
    s.options.showImgMainFull = false;
    $("a.base_arrows").show();  
    $(".menu").css("z-index", 1);
  }

  s.showFullScreen = function(type){
    s.options.currFullSlider = type;
    s.options.showFullSlider = true;
    s.images.full = s.images[type];

    $(".menu").css("z-index", 0);
    $("img.spinner-img").hide();
  }

  s.hideFullScreen = function(){
    s.options.currFullSlider = "";
    s.options.showFullSlider = false;
    $(".menu").css("z-index", 1);
    $("img.spinner-img").show();
  }

  s.thumbClicked = function(type, idx){
    s.images[type].idx = idx;
    scrollToDiv(type, idx);
  }

  s.showIframe = function(){
    $(".ins-ctn").animate({
      opacity:0
    }, function(){
      $(".ins-ctn").hide();
      $(".ins-ptr").show();
      $(".ins-ptr").animate({
        top: "15vh",
        opacity: 1
      }, 1500, function(){
        $(".ifr-outer").fadeOut(2000);
        $(".ifr-ctn").css("z-index", 0);
        if(s.options.showIns)
          sessionStorage.setItem("showIns", s.options.showIns);
      });
    });
  }
 
  s.toggleBookNow = function(){
    if(isMobile() || isTablet()){
      scrollTo("#section6")
    }else{      
      if(!s.options.showBookNow){
        s.options.showBookNow = true;
        TweenMax.to("#book-now-ctn", .2, {
          left: 0
        });
      }else{
        s.options.showBookNow = false;
        TweenMax.to("#book-now-ctn", .2, {
          // left: !isMobile()?"-35%":"-100%"
          left: "-35%"
        });
      }
    }
  }

  s.submitForm = function(){
    l(s.options.bookNowForm)
  }

  var sp = angular.copy($stateParams);
  sp.s = angular.copy($location.hash());
  l(sp)

  // After the section loads, remove the hash
  $location.hash('').replace()

  if (sp.l === null) { // Load from url directly
    var jsonFile = 'data/' + sp.propertyName + '.json?t=' + Date.now() 
    $http.get(jsonFile)
    // $http.get('data/data.json')
    .then(function (res) {

      var data = res.data, op = s.options;      
      op.currProperty = data;
      op.titleArr = data.titleArr;
      op.locations = data.locations;
      
      var cl = $filter('filter')(op.locations, { 
        url: sp.locationName
      });
      
      if(cl.length) s.selectLocation(cl[0]);
      else $state.go('location', { 
        propertyName: op.currProperty.url,
        locationName: op.currProperty.locations[0].url,
      });

      // var cp = $filter('filter')(data.properties, { 
      //   url: sp.propertyName
      // });

      // if(cp.length){
        // op.currProperty = cp[0];
        // op.locations = op.currProperty.locations;
        // var cl = $filter('filter')(op.locations, { 
          // url: sp.locationName
        // });
        // 
        // if(cl.length) s.selectLocation(cl[0]);
        // else $state.go('location', { 
          // propertyName: cp[0].url,
          // locationName: cp[0].locations[0].url,
        // });
      // 
      // } else $state.go('location', { 
        // propertyName: data.properties[0].url,
        // locationName: data.properties[0].locations[0].url, 
      // });
      
      
      // op.currProperty = data.properties[0];
      // op.locations = op.currProperty.locations;
      // // sp.s = "images";
      // s.selectLocation(op.locations[0]);
    })
  } else { // Coming from property page
    op.currProperty = sp.p;
    op.titleArr = sp.t;
    op.locations = sp.all;
    s.selectLocation(sp.l);
  }
})
.controller('srCtrl', function ($scope, $state) {
  // l("Search")
  $scope.options = {
    searchStr: "",
    selLocObj: {},
    titleArr: [
      "Zynderia",
      "Locations",
      "Los Angeles",
      "Creative Compound"
    ],
    locations: [
      {
        id: "B",
        value: "Stage B: Stage B",
        desc: "Stage B description with Solid Concrete Wall, Metal Walls, Meat Locker, Walk In Cooler, Exposed Cinder Block",
        bg: "img/home/stage-d.jpg"
      },
      {
        id: "C",
        value: "Stage C: Gallery / Loft",
        desc: "Stage C description with Solid Concrete Wall, Metal Walls, Meat Locker, Walk In Cooler, Exposed Cinder Block",
        bg: "img/home/stage-c.jpg"
      },
      {
        id: "F",
        value: "Stage F: Post Apocalyptic",
        desc: "Stage F description with Solid Concrete Wall, Metal Walls, Meat Locker, Walk In Cooler, Exposed Cinder Block",
        bg: "img/home/stage-f.jpg"
      },
      {
        id: "G",
        value: "Stage G: Stage G",
        desc: "Stage G description with Solid Concrete Wall, Metal Walls, Meat Locker, Walk In Cooler, Exposed Cinder Block",
        bg: "img/home/stage-g.jpg"
      },
      {
        id: "D",
        value: "Stage D: The Hangar",
        desc: "Stage D description with Solid Concrete Wall, Metal Walls, Meat Locker, Walk In Cooler, Exposed Cinder Block",
        bg: "img/home/stage-d.jpg"
      },
      {
        id: "E",
        value: "Stage E: The Pillars",
        desc: "Stage E description with Solid Concrete Wall, Metal Walls, Meat Locker, Walk In Cooler, Exposed Cinder Block",
        bg: "img/home/stage-g.jpg"
      },
      {
        id: "A2",
        value: "Bar & Patio",
        desc: "Bar & Patio description with Solid Concrete Wall, Metal Walls, Meat Locker, Walk In Cooler, Exposed Cinder Block",
        bg: "img/home/stage-f.jpg"
      },
      {
        id: "A3",
        value: "Back Lot",
        desc: "Back Lot description with Solid Concrete Wall, Metal Walls, Meat Locker, Walk In Cooler, Exposed Cinder Block",
        bg: "img/home/stage-c.jpg"
      },
      {
        id: "A4",
        value: "Naud Lot",
        desc: "Naud Lot description with Solid Concrete Wall, Metal Walls, Meat Locker, Walk In Cooler, Exposed Cinder Block",
        bg: "img/home/stage-g.jpg"
      },
    ],
    properties: [
      { id: 1, value: "The Banks" }
    ]
  }
  $scope.options.currProperty = $scope.options.properties[0];

  $(function () {
    !isMobile()?$(".nano").nanoScroller():"";
  })

  $scope.hoverLoc = function (loc) {
    $scope.options.selLocObj = loc;
  }

  $scope.openDetail = function (section) {
    $state.go('detail', { property: $scope.options.selLocObj, section: section });
  }
})