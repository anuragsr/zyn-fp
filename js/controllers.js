app
.controller('hmCtrl', function($scope, $filter, $state){
  // l("Home")
  var grArr = [], bg, w, h, c;

  $scope.options = {
    titleArr: [
      "Zynderia",
      "Locations",
      "Los Angeles",
      "Creative Compound"
    ],
    locations: [
      {
        id: "B", text: {
          v: "Stage B",
          x: 1550,
          y: 550
        }, 
        // snap: [1550, 900],
        value: "Stage B: Stage B",
        slIdx: 0,
        slImgs: [
          "img/home/stage-b/1.jpg",
          "img/home/stage-b/2.jpg",
        ],
        imgs: [
          "img/home/stage-b/1.jpg",
          "img/home/stage-b/2.jpg",
          "img/home/stage-b/3.jpg",
          "img/home/stage-b/4.jpg",
          "img/home/stage-b/5.jpg",
          "img/home/stage-b/6.jpg",
          "img/home/stage-b/7.jpg",
          "img/home/stage-b/8.jpg",
        ],
        fill: 0xff0000,
        coords:[
          new PIXI.Point(1370, 720), 
          new PIXI.Point(1370, 620),
          new PIXI.Point(1500, 470),
          new PIXI.Point(1685, 520),
          new PIXI.Point(1735, 460),
          new PIXI.Point(1925, 505),
          new PIXI.Point(1920, 595),
          new PIXI.Point(1770, 835),
          new PIXI.Point(1370, 720)
        ]
      },
      {
        id: "C", text: {
          v: "Stage C",
          x: 1175,
          y: 175
        }, 
        value: "Stage C: Gallery / Loft",
        slIdx: 0,
        slImgs: [
          "img/home/stage-c/1.jpg",
          "img/home/stage-c/2.jpg",
        ],
        imgs: [
          "img/home/stage-c/1.jpg",
          "img/home/stage-c/2.jpg",
          "img/home/stage-c/3.jpg",
          "img/home/stage-c/4.jpg",
          "img/home/stage-c/5.jpg",
          "img/home/stage-c/6.jpg",
          "img/home/stage-c/7.jpg",
          "img/home/stage-c/8.jpg",
        ],
        bg: "img/home/stage-c/1.jpg",
        fill: 0xff4412,
        coords: [
          new PIXI.Point(1420, 234),
          new PIXI.Point(1419, 162),
          new PIXI.Point(1342, 170),
          new PIXI.Point(1345, 147),
          new PIXI.Point(1280, 153),
          new PIXI.Point(1281, 130),
          new PIXI.Point(1203, 130),
          new PIXI.Point(1064, 228),
          new PIXI.Point(1146, 227),
          new PIXI.Point(1147, 246),
          new PIXI.Point(1220, 242),
          new PIXI.Point(1220, 259),
          new PIXI.Point(1298, 259),
          new PIXI.Point(1298, 334),
          new PIXI.Point(1420, 234),
        ]
      },
      {
        id: "F", text: {
          v: "Stage F",
          x: 300,
          y: 850
        }, 
        value: "Stage F: Post Apocalyptic",
        slIdx: 0,
        slImgs: [
          "img/home/stage-f/1.jpg",
          "img/home/stage-f/2.jpg",
        ],
        imgs: [
          "img/home/stage-f/1.jpg",
          "img/home/stage-f/2.jpg",
          "img/home/stage-f/3.jpg",
          "img/home/stage-f/4.jpg",
          "img/home/stage-f/5.jpg",
          "img/home/stage-f/6.jpg",
          "img/home/stage-f/7.jpg",
          "img/home/stage-f/8.jpg",
        ],
        bg: "img/home/stage-f/1.jpg",
        fill: 0x10efd3,
        coords: [
          new PIXI.Point(412, 687),
          new PIXI.Point(490, 682),
          new PIXI.Point(594, 755),
          new PIXI.Point(599, 810),
          new PIXI.Point(642, 818),
          new PIXI.Point(698, 773),
          new PIXI.Point(744, 773),
          new PIXI.Point(795, 810),
          new PIXI.Point(800, 864),
          new PIXI.Point(102, 1475),
          new PIXI.Point(1, 1374),
          new PIXI.Point(1, 1001),
          new PIXI.Point(206, 860),
          new PIXI.Point(206, 839),
        ]
      },
      {
        id: "G", text: {
          v: "Stage G",
          x: 2200,
          y: 100
        }, 
        value: "Stage G: Stage G",
        slIdx: 0,
        slImgs: [
          "img/home/stage-g/1.jpg",
          "img/home/stage-g/2.jpg",
        ],
        imgs: [
          "img/home/stage-g/1.jpg",
          "img/home/stage-g/2.jpg",
          "img/home/stage-g/3.jpg",
          "img/home/stage-g/4.jpg",
          "img/home/stage-g/5.jpg",
          "img/home/stage-g/6.jpg",
          "img/home/stage-g/7.jpg",
          "img/home/stage-g/8.jpg",
        ],
        bg: "img/home/stage-g/1.jpg",
        fill:0x777eee,
        coords: [
          new PIXI.Point(2534, 309),
          new PIXI.Point(2553, 250),
          new PIXI.Point(2479, 3),
          new PIXI.Point(2194, 3),
          new PIXI.Point(2192, 39),
          new PIXI.Point(2117, 35),
          new PIXI.Point(2101, 106),
          new PIXI.Point(1967, 102),
          new PIXI.Point(1942, 200),
          new PIXI.Point(1942, 231),
          new PIXI.Point(2534, 309),
        ]
      },
      {
        id: "D", text: {
          v: "Stage D",
          x: 1200,
          y: 520
        }, 
        value: "Stage D: The Hangar",  
        slIdx: 0,
        slImgs: [
          "img/home/stage-d/1.jpg",
          "img/home/stage-d/2.jpg",
        ],       
        imgs: [
          "img/home/stage-d/1.jpg",
          "img/home/stage-d/2.jpg",
          "img/home/stage-d/3.jpg",
          "img/home/stage-d/4.jpg",
          "img/home/stage-d/5.gif",
        ],
        bg: "img/home/stage-d/1.jpg",
        fill: 0x00ff00,
        coords: [
          new PIXI.Point(1370, 720),
          new PIXI.Point(1370, 620),
          new PIXI.Point(1500, 470),
          new PIXI.Point(1280, 410),
          new PIXI.Point(1035, 635),
          new PIXI.Point(1038, 735),
          new PIXI.Point(1280, 815),
          new PIXI.Point(1370, 720),
        ]
      },
      {
        id: "E", text: {
          v: "Stage E",
          x: 1500,
          y: 350
        }, 
        value: "Stage E: The Pillars",
        slIdx: 0,
        slImgs: [
          "img/home/stage-e/1.jpg",
          "img/home/stage-e/2.jpg",
        ],
        imgs: [
          "img/home/stage-e/1.jpg",
          "img/home/stage-e/2.jpg",
          "img/home/stage-e/3.jpg",
          "img/home/stage-e/4.jpg",
          "img/home/stage-e/5.jpg",
          "img/home/stage-e/6.gif",
        ],
        bg: "img/home/stage-e/1.jpg",
        fill: 0x0000ff,
        coords: [
          new PIXI.Point(1500, 470),
          new PIXI.Point(1685, 520),
          new PIXI.Point(1735, 460),
          new PIXI.Point(1780, 470),
          new PIXI.Point(1825, 400),
          new PIXI.Point(1835, 330),
          new PIXI.Point(1460, 250),
          new PIXI.Point(1280, 410),
          new PIXI.Point(1500, 470),
        ]
      },
      {
        id: "A2", text: {
          v: "Bar &\nPatio",
          x: 2000,
          y: 375
        },
        value: "Bar & Patio",
        slIdx: 0,
        slImgs: [
          "img/home/bnp/1.jpg",
          "img/home/bnp/2.jpg",
        ],
        imgs: [
          "img/home/bnp/1.jpg",
          "img/home/bnp/2.jpg",
          "img/home/bnp/3.jpg",
          "img/home/bnp/4.jpg",
          "img/home/bnp/5.jpg",
          "img/home/bnp/6.jpg",
          "img/home/bnp/7.jpg",
          "img/home/bnp/8.jpg",
        ],
        bg: "img/home/bnp/1.jpg",
        fill: 0xffff00,
        coords: [
          new PIXI.Point(2105, 565),
          new PIXI.Point(2020, 545),
          new PIXI.Point(1970, 455),
          new PIXI.Point(1925, 420),
          new PIXI.Point(1930, 395),
          new PIXI.Point(1865, 375),
          new PIXI.Point(1865, 360),
          new PIXI.Point(1895, 340),
          new PIXI.Point(1980, 360),
          new PIXI.Point(2005, 335),
          new PIXI.Point(2065, 335),
          new PIXI.Point(2120, 365),
          new PIXI.Point(2150, 365),
          new PIXI.Point(2200, 385),
          new PIXI.Point(2200, 445),
          new PIXI.Point(2105, 565),
        ]
      },
      {
        id: "A3", text: {
          v: "Back Lot",
          x: 2250,
          y: 700
        }, 
        value: "Back Lot",
        slIdx: 0,
        slImgs: [
          "img/home/bl/1.jpg",
          "img/home/bl/2.jpg",
        ],
        imgs: [
          "img/home/bl/1.jpg",
          "img/home/bl/2.jpg",
          "img/home/bl/3.jpg",
          "img/home/bl/4.jpg",
          "img/home/bl/5.jpg",
          "img/home/bl/6.jpg",
          "img/home/bl/7.jpg",
          "img/home/bl/8.jpg",
        ],
        bg: "img/home/bl/1.jpg",        
        fill: 0x890a70,
        coords: [
          new PIXI.Point(2200, 460),
          new PIXI.Point(2730, 605),
          new PIXI.Point(2730, 675),
          new PIXI.Point(2355, 970),
          new PIXI.Point(2035, 880),
          new PIXI.Point(2135, 720),
          new PIXI.Point(2115, 570),
          new PIXI.Point(2200, 460),
        ]
      },
      {
        id: "A4", text: {
          v: "Naud Lot",
          x: 650,
          y: 1500
        }, 
        value: "Naud Lot",
        slIdx: 0,
        slImgs: [
          "img/home/nl/1.jpg",
          "img/home/nl/2.jpg",
        ],
        imgs: [
          "img/home/nl/1.jpg",
          "img/home/nl/2.jpg",
          "img/home/nl/3.jpg",
          "img/home/nl/4.jpg",
          "img/home/nl/5.jpg",
          "img/home/nl/6.jpg",
          "img/home/nl/7.jpg",
          "img/home/nl/8.jpg",
        ],
        bg: "img/home/nl/1.jpg",        
        fill: 0x650f1e,
        coords: [
          new PIXI.Point(613, 1260),
          new PIXI.Point(1292, 1575),
          new PIXI.Point(1415, 1661),
          new PIXI.Point(1445, 1698),
          new PIXI.Point(645, 1698),
          new PIXI.Point(432, 1636),
          new PIXI.Point(288, 1580),
          new PIXI.Point(613, 1260),
        ]
      },
    ],
    properties: [
      {id:1, value:"The Banks"}
    ],
    currHoverId: "",
    currClickId: "",
    selLocObj: {}
  }
  $scope.options.currProperty = $scope.options.properties[0];
  $scope.options.currLocation = { value: "Choose Location" };
  
  // $scope.movedSlide = function(loc){
  //   $scope.options.selLocObj = loc;
  // }

  $scope.showFullScreen = function(loc){
    l(loc)    
    $scope.options.selLocObj = loc;
    $scope.options.fullSliderIdx = loc.slIdx;
    $scope.options.fullSliderImgs = loc.imgs;
    $scope.options.showFullSlider = true;
  }

  $scope.hideFullScreen = function(){
    // l(loc)        
    // $scope.options.fullSliderImgs = [];
    $scope.options.showFullSlider = false;
  }

  $(function(){
    $.fn.carousel.Constructor.TRANSITION_DURATION = 500  // 2 seconds
    $(".nano").nanoScroller();

    w = $(".pixi-ctn").width();
    h = $(".pixi-ctn").height();
    c = {x: w/2, y: h/2};

    var pixiApp = new PIXI.Application( w, h, {
      transparent:true,
      antialias: true
    })
    , ctn = new PIXI.DisplayObjectContainer()
    , firstClick = true
    , areaSelected = false
    , lastCenter
    , lastZoom = -.5
    ;

    PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST;
    PIXI.Graphics.prototype.updateLineStyle = function(lineWidth, color, alpha){   
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

    // Init canvas
    pixiApp.view.style.position = "absolute";
    pixiApp.view.style.top = pixiApp.view.style.left = 0;
    $(".pixi-ctn").append(pixiApp.view);

    var img = new Image();
    img.src = "img/home/loc-map-1.jpg";
    img.onload = onImageLoad;

    function onImageLoad(e){
      bg = new PIXI.Sprite( new PIXI.Texture.fromImage(e.target.src) );
      bg.width = this.width;
      bg.height = this.height;
      bg.x = 0;
      bg.y = 0;
      // bg.interactive = true;
      // bg.mousedown = function(e){
      //   l("Body clicked");   
      // }
      ctn.addChild(bg);

      $scope.options.locations.forEach(function(obj, idx){
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
        .drawPolygon(obj.coords)
        .endFill()
        .on('mousedown', function(){ selectLoc(this, true, true) })
        .on('mouseover', function(){ hoverLoc(this, true) })
        .on('mouseout', function(){ outLoc(this) })

        grArr.push(area);
        ctn.addChild(area);

        var text = new PIXI.Text(obj.text.v , 
          new PIXI.TextStyle({
            fill: 0xffffff,
            fontSize: 48,
            fontWeight: "bold",
            dropShadow: true,
            dropShadowAlpha: 0.7,
            dropShadowAngle: 0.9,
            dropShadowDistance: 5,
          })
        );
        text.position.x = obj.text.x;
        text.position.y = obj.text.y;
        ctn.addChild(text);

      })

      createViewPort();
    }    

    function createViewPort(){
      viewport = new PIXI.extras.Viewport({
        screenWidth: w,
        screenHeight: h,
        worldWidth: bg.width,
        worldHeight: bg.height,
        interaction: pixiApp.renderer.plugins.interaction // the interaction module is important for wheel() to work properly when renderer.view is placed or scaled
      });
      
      viewport.left = c.x + 400;
      viewport.top = c.y - 200;

      viewport
      .drag()
      // .bounce()
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

      viewport.addChild(ctn);
      viewport.on('wheel', e => {
        // l(e)
        if(e.wheel.dy > 0) lastZoom -= .1
        else lastZoom += .1
        // l(lastZoom)
      })
      
      // if (lastCenter)
      //   viewport.center = lastCenter

      pixiApp.stage.addChild(viewport);
    }

    $(".pixi-ctn").on("mouseout", function(e){
      e.preventDefault();
      $scope.$apply(function(){
        $scope.options.currHoverId = "";
      })
    })

    window.onresize = function(event) {
      // lastCenter = viewport.center
      w = $(".pixi-ctn").width(); 
      h = $(".pixi-ctn").height();
      // l(w, h, bg.width, bg.height)

      pixiApp.renderer.resize(w, h);  
      // viewport.resize(window.innerWidth, window.innerHeight, w, h);
      viewport.destroy();
      createViewPort();
    }

    $('#car-full').on('slid.bs.carousel', function (e) {
      $scope.$apply(function(){
        $scope.options.selLocObj.slIdx = e.to;
      })
    })

    $('.carousel-sm').on('slid.bs.carousel', function (e) {

      // Add more slides
      if(e.to == 1){
        $scope.$apply(function(){
          $scope.options.selLocObj.slImgs = $scope.options.selLocObj.imgs;
        })
      }

      $scope.$apply(function(){
        l(e.to)
        // if($scope.options.selLocObj.slImgs.length > 2)
        $scope.options.selLocObj.slIdx = e.to;
      })
    })
  })
  
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
      $('.nano-content').animate({
        scrollTop: gr.idx * ($(".loc-box").height() + 20)
      }, 'slow');
    }
    
    if(toApply){      
      $scope.$apply(function(){
        $scope.options.currClickId = gr.id;
      })
    }else{
      $scope.options.currClickId = gr.id;      
    }
  }

  function hoverLoc(gr, toApply){
    if(!gr.clicked){
      gr.alpha = .8;
      gr.updateLineStyle(5, 0xffffff, 1);
      if(toApply){
        $scope.$apply(function(){
          $scope.options.currHoverId = "";
          $scope.options.currHoverId = gr.id;
        })
      }else{
        $scope.options.currHoverId = "";
        $scope.options.currHoverId = gr.id;
      }
    }
  }

  function outLoc(gr){
    if(!gr.clicked){
      gr.alpha = .3;
      gr.updateLineStyle(0, 0xffffff, 1);
    }
  }

  $scope.selectLoc = function(loc, evt){
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

  $scope.hoverLoc = function(loc, evt){
    $scope.options.selLocObj = loc;
    $(evt.currentTarget).addClass("active");

    var gr = grArr.filter(function(x){
      return x.id === loc.id;
    });
    if(gr.length){
      hoverLoc(gr[0], false);
    }
  }

  $scope.outLoc = function(loc, evt){
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

  $scope.openDetail = function(section){
    $state.go('detail', { property: $scope.options.selLocObj, section: section });
  }
})
.controller('srCtrl', function($scope, $state){
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
      {id:1, value:"The Banks"}
    ]
  }
  $scope.options.currProperty = $scope.options.properties[0];
  
  $(function(){
    $(".nano").nanoScroller();
  })

  $scope.hoverLoc = function(loc){
    $scope.options.selLocObj = loc;
  }

  $scope.openDetail = function(section){
    $state.go('detail', { property: $scope.options.selLocObj, section: section });
  }
})
.controller('fpCtrl', function($scope, $filter, $stateParams, $rootScope){
  
  // Private properties and methods
  var el;
  var elLeft;
  var elRight;
  var sliderArr;
  var slideWidth;
  var slideHeight;
  var fullSliders;
  var slideContWidth;
  var slideContHeight;
  var animating = false;
  var animatingFull = false;
  
  // For Info section
  var keyCount = 1;
  var scrollCount = 1;
  var scrollDist = 0;
  var scrollDir = "down";
  var $target = $(".info-ctn-inner");

  function onResize(e){
    setTimeout(function(){
      $(".nano").nanoScroller();

      sliderArr = [
        $(".slider1"), // Main Image Slider 
        $(".slider2"), // Floorplan Slider 
        $(".slider3")  // Map Slider
      ];

      sliderArr.forEach(function(slider){
        slideContWidth = slider.width();
        slideContHeight = slider.height();

        slider.find('img').css({ 
          height: slideContHeight,
          width: "auto"
        });

        slideWidth = $(slider.find('img')[1]).width();    
        slideHeight = $(slider.find('img')[1]).height();    

        if(slideContWidth < slideWidth){
          slider.find('img').css({ 
            width: slideContWidth,
            height: "auto"
          });

          slideWidth = $(slider.find('img')[1]).width();
          slideHeight = $(slider.find('img')[1]).height();
        }

        // var sliderUlWidth = 0;
        // slider.find('img').toArray().forEach(function(obj){
        //   sliderUlWidth+= $(obj).width() + 20;
        // })

        slider.find('.slides-ctn').css({ 
          width: 100000//sliderUlWidth
        });

        slider.find('.slides-ctn').css({
            left: slideContWidth/2 - (slideWidth/2 + 10 + $(slider.find('img')[0]).width())
        });

        slider.find('a.control_prev, a.control_next').css({
            top: slideHeight/2 - slider.find('a.control_prev').height()/2
        });
      })      

      fullSliders = [
        { arr: $scope.options.mainImg, item: $(".fs1 .fs-ctn"), fullIdx: 0},
        { arr: $scope.options.fpImg, item: $(".fs2 .fs-ctn"), fullIdx: 0},
        { arr: $scope.options.mapImg, item: $(".fs3 .fs-ctn"), fullIdx: 0},
        { arr: $scope.options.mainImg, item: $(".fst1 .fs-ctn"), fullIdx: 0}
      ]

    }, 500)
  }

  $scope.options = {
    title: "Zynderia / Locations / Los Angeles / Creative Compound / The Banks",
    titleArr: [
      "Zynderia",
      "Locations",
      "Los Angeles",
      "Creative Compound"
    ],
    locations: [
      {id: "D", value: "Stage D: The Hangar", img:"img/pre1.png"},
      {id: "A", value: "Stage A: Stage A", img:"img/pre2.png"},
      {id: "B", value: "Stage B: Stage B", img:"img/pre3.png"},
      {id: "C", value: "Stage C: Stage C", img:"img/pre4.png"}
    ],
    properties: [
      {id:1, value:"The Banks"}
    ],
    bookNowForm:{
      prodType:[
        "Media Production",
        "Fashion Agency",
        "Production Type 3",
        "Production Type 4"
      ],
      prodTypeSel:"",
      dayLength:[
        "2 Hours",
        "5 Hours",
        "12 Hours",
        "24 Hours"
      ],
      dayLengthSel:"",
      noPeople:[
        "0 - 15 People",
        "15 - 30 People",
        "31 - 45 People",
        "> 45"
      ],
      noPeopleSel:"",
      from: new Date,
      to: new Date
    },
    showBookNow: false,
    showFilter: false,
    showThumbnails: false,
    showImgFull: false,
    showImgMainFull: false,
    showIframe: false,
    showSelectOpts: false,
    showIns: false,
    allImg:[
      {val: "img/zynderia-stage-g-01.jpg", type:''},
      {val: "img/zynderia-stage-g-02.jpg", type:''},
      {val: "img/zynderia-stage-g-03.jpg", type:''},
      {val: "img/zynderia-stage-g-04.jpg", type:''},
      {val: "img/zynderia-stage-g-05.jpg", type:''},
      {val: "img/zynderia-stage-g-06.jpg", type:''},
      {val: "img/zynderia-stage-g-07.jpg", type:''},
      {val: "img/zynderia-stage-g-08.jpg", type:''},
      {val: "img/zynderia-stage-g-09.jpg", type:''},
      {val: "img/zynderia-stage-g-10.jpg", type:''},
      {val: "img/zynderia-stage-g-11.jpg", type:''},
      {val: "img/zynderia-stage-g-12.jpg", type:''},
      {val: "img/zynderia-stage-g-13.jpg", type:''},
      {val: "img/zynderia-stage-g-14.jpg", type:''},
      {val: "img/zynderia-stage-g-15.jpg", type:''},
      {val: "img/zynderia-stage-g-16.jpg", type:'stair'},
      {val: "img/zynderia-stage-g-17.jpg", type:'stair'},
      {val: "img/zynderia-stage-g-18.jpg", type:''},
      {val: "img/zynderia-stage-g-19.jpg", type:''},
      {val: "img/zynderia-stage-g-20.jpg", type:'stair'},
      {val: "img/zynderia-stage-g-21.jpg", type:''},
      {val: "img/zynderia-stage-g-22.jpg", type:''},
      {val: "img/zynderia-stage-g-23.jpg", type:''},
      {val: "img/zynderia-stage-g-24.jpg", type:''}
    ],
    fpImg:[
      {val:"img/zynderia-stage-g-floorplan-01.jpg"},
      {val:"img/zynderia-stage-g-02.jpg"},
      {val:"img/zynderia-stage-g-03.jpg"},
      {val:"img/zynderia-stage-g-04.jpg"},
      {val:"img/zynderia-stage-g-05.jpg"},
      {val:"img/zynderia-stage-g-06.jpg"},
      {val:"img/zynderia-stage-g-07.jpg"},
      {val:"img/zynderia-stage-g-08.jpg"},
      {val:"img/zynderia-stage-g-09.jpg"},
      {val:"img/zynderia-stage-g-10.jpg"},
      {val:"img/zynderia-stage-g-11.jpg"},
      {val:"img/zynderia-stage-g-12.jpg"}
    ],
    mapImg:[
      {val:"img/map-01.jpg"},
      {val:"img/map-02.jpg"},
      {val:"img/zynderia-stage-g-03.jpg"},
      {val:"img/zynderia-stage-g-04.jpg"},
      {val:"img/zynderia-stage-g-05.jpg"},
      {val:"img/zynderia-stage-g-06.jpg"},
      {val:"img/zynderia-stage-g-07.jpg"},
      {val:"img/zynderia-stage-g-08.jpg"},
      {val:"img/zynderia-stage-g-09.jpg"},
      {val:"img/zynderia-stage-g-10.jpg"},
      {val:"img/zynderia-stage-g-11.jpg"},
      {val:"img/zynderia-stage-g-12.jpg"}
    ],
    bgMain: "img/bg1.jpg"
  }

  $scope.options.fpImgFull = angular.copy($scope.options.fpImg);
  $scope.options.mapImgFull = angular.copy($scope.options.mapImg);

  rightShift($scope.options.fpImg);
  rightShift($scope.options.mapImg);

  $scope.options.currLocation = $scope.options.locations[0];
  $scope.options.previewImg = $scope.options.locations[0].img;

  $scope.options.currProperty = $scope.options.properties[0];

  function moveLeft(parent, arr) {
    if(!animating){        
      animating = true;

      $scope.$apply(function(){
        rightShift(arr);
      });

      slideWidth = $(parent.find('img')[0]).width();
      parent.find('.slides-ctn').css({
        left:parseInt(parent.find('.slides-ctn').css('left')) - slideWidth - 10
      });
      
      // This element Depends on Angular and jQuery scope. rightShift executes later with Angular
      slideWidth = $(parent.find('img')[1]).width();
      
      parent.find('.slides-ctn').animate({
        left: slideContWidth/2 - (slideWidth/2 + 20 + $(parent.find('img')[0]).width())
      }, 500, function () {
        animating = false;
      });
    }
  }

  function moveRight(parent, arr) {
    if(!animating){
      animating = true;        
      slideWidth = $(parent.find('img')[1]).width();
      parent.find('.slides-ctn').animate({
        left:parseInt(parent.find('.slides-ctn').css('left')) - (slideWidth/2 + $(parent.find('img')[2]).width()/2 + 10)
      }, 500, function () {
        $scope.$apply(function(){
          leftShift(arr);
        });
        var len = parent.find('img').length - 1;
        slideWidth = $(parent.find('img')[len]).width();
        parent.find('.slides-ctn').css({
          left:parseInt(parent.find('.slides-ctn').css('left')) + slideWidth + 10
        });
        animating = false;
      });
    }   
  }

  function leftShift(arr){
    var temp = arr[0];
    arr.shift();
    arr.push(temp);
  }

  function rightShift(arr){
    arr.unshift(arr[arr.length - 1]);
    arr.pop();
  }

  function onKeyDown(e){
    // l(e.originalEvent)    
    switch(e.originalEvent.keyCode){
      case 27: // Escape
        $scope.$apply(function(){       
          if($scope.options.showThumbnails){
            if($scope.options.showImgFull){
              $scope.backToGallery();
            }else{
              $scope.toggleThumbGallery();
            }
          }
          
          if($scope.options.showImgMainFull){
            $scope.backToImagesMain();
          }

          if($scope.options.showIframe){
            $scope.toggleIframe();
          }

          if($scope.options.showBookNow){
            $scope.toggleBookNow();
          }
        })
      break;

      case 38: // Up Arrow 
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
            if(!($scope.options.showImgFull || $scope.options.showImgMainFull)){
              fullpage_api.moveTo("info")
            }
          break;

          case "section2":
            if(!$scope.options.showIframe){
              fullpage_api.moveTo("images")
            }
          break;

          case "section3":
            if(!($scope.options.showImgFull || $scope.options.showImgMainFull)){            
              fullpage_api.moveTo("3dvr")
            }
          break;

          case "section4":
            if(!($scope.options.showImgFull || $scope.options.showImgMainFull)){            
              fullpage_api.moveTo("floorplan")
            }
          break;

          case "section5":
            fullpage_api.moveTo("maps")
          break;
        }
      break;

      case 40: // Down Arrow
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
            if(!($scope.options.showImgFull || $scope.options.showImgMainFull)){
              fullpage_api.moveTo("3dvr")
            }
          break;

          case "section2":
            if(!$scope.options.showIframe){
              fullpage_api.moveTo("floorplan")
            }
          break;

          case "section3":
            if(!($scope.options.showImgFull || $scope.options.showImgMainFull)){            
              fullpage_api.moveTo("maps")
            }
          break;

          case "section4":
            if(!($scope.options.showImgFull || $scope.options.showImgMainFull)){            
              fullpage_api.moveTo("services")
            }
          break;
        }
      break;

      case 37: // Left Arrow
        switch($(".fp-section.active").attr("id")){
          case "section1":
            if($scope.options.showImgMainFull){
              $scope.$apply(function(){
                $scope.fullImgMove('left', $scope.options.mainImgFull, 0);
              })
            }else if($scope.options.showImgFull){
              $scope.$apply(function(){
                $scope.fullImgMove('left', $scope.options.thumbImgFull, 3);
              })
            }else{
              moveLeft($(".slider1"), $scope.options.mainImg);
            }
          break;

          case "section3":
            if($scope.options.showImgMainFull){
              $scope.$apply(function(){
                $scope.fullImgMove('left', $scope.options.fpImgFull, 1);
              })
            }else{
              moveLeft($(".slider2"), $scope.options.fpImg);
            }
          break;              

          case "section4":
            if($scope.options.showImgMainFull){
              $scope.$apply(function(){
                $scope.fullImgMove('left', $scope.options.mapImgFull, 2);
              })
            }else{
              moveLeft($(".slider3"), $scope.options.mapImg);
            }
          break;          
        }
      break;

      case 39: // Right Arrow
        switch($(".fp-section.active").attr("id")){       
          case "section1":
            if($scope.options.showImgMainFull){
              $scope.$apply(function(){
                $scope.fullImgMove('right', $scope.options.mainImgFull, 0);
              })
            }else if($scope.options.showImgFull){
              $scope.$apply(function(){
                $scope.fullImgMove('right', $scope.options.thumbImgFull, 3);
              })
            }else{
              moveRight($(".slider1"), $scope.options.mainImg);
            }
          break;

          case "section3":
            if($scope.options.showImgMainFull){
              $scope.$apply(function(){
                $scope.fullImgMove('right', $scope.options.fpImgFull, 1);
              })
            }else{
              moveRight($(".slider2"), $scope.options.fpImg);
            }
          break;          

          case "section4":
            if($scope.options.showImgMainFull){
              $scope.$apply(function(){
                $scope.fullImgMove('right', $scope.options.mapImgFull, 2);
              })
            }else{
              moveRight($(".slider3"), $scope.options.mapImg);
            }
          break;
        }
      break;
    }
  }

  function setFullSlider(no){
    var slider = fullSliders[no];

    slider.item.css({      
      zIndex:0,
      left: -window.innerWidth
    })
    
    el = slider.item[slider.fullIdx];

    if(slider.fullIdx == 0){
      elLeft = slider.item[slider.item.length - 1];
    }else{
      elLeft = slider.item[slider.fullIdx - 1];      
    }

    if(slider.fullIdx == slider.item.length - 1){
      elRight = slider.item[0];       
    }else{    
      elRight = slider.item[slider.fullIdx + 1];
    }

    $(el).css({
      left: 0,
      zIndex: 1
    })

    $(elLeft).css({
      left: -window.innerWidth,
      zIndex: 1
    })

    $(elRight).css({
      left: window.innerWidth,
      zIndex: 1
    })
  }
  
  // Public properties and methods

  $scope.viewSelectOpts = function(){
    $scope.options.showSelectOpts = true;
  }  

  $scope.hoverOption = function(l){
    $scope.options.previewImg = l.img;
  } 

  $scope.selectLocation = function(l){
    $scope.options.currLocation = l;
    $scope.options.showSelectOpts = false;
  }  

  $scope.filterImages = function(val, fullSlIdx){
    $scope.options.currFilter = val;
    $(".fst1, .fs1").hide();
    $("img.spinner-img").show();
    if(val != 'all'){
      var filtered = $filter('filter')($scope.options.allImg, {type:val});
      $scope.options.mainImg = angular.copy(filtered);
      $scope.options.mainImgFull = angular.copy(filtered);
    }else{
      $scope.options.mainImg = angular.copy($scope.options.allImg);
      $scope.options.mainImgFull = angular.copy($scope.options.allImg);
    }
    $scope.options.thumbImg = angular.copy($scope.options.mainImg);
    $scope.options.thumbImgFull = angular.copy($scope.options.mainImg);
    // $scope.options.showFilter = false;
    rightShift($scope.options.mainImg);
    onResize();
    setTimeout(function(){
      setFullSlider(fullSlIdx);
      $("img.spinner-img").hide();
      $(".fst1, .fs1").show();
    }, 501)
  }

  $scope.filterImages('all', 0);  

  $scope.hideFilter = function(e){
    var clickedOnFilter = $(e.target).hasClass("badge-filter") || $(e.target).hasClass("filter-btn") || $(e.target).hasClass("fa-sliders");
    if(!clickedOnFilter){
      $scope.options.showFilter = false;
      $scope.options.showFilterFS = false;
    }
  }

  $scope.showMoreInfo = function(){
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

  $scope.goToImages = function(){
    fullpage_api.moveTo('images');      
  }

  $scope.backToImagesMain = function(){
    onResize();
    $scope.options.showImgMainFull = false;
    $("a.base_arrows").show();  
    $(".menu").css({
      zIndex:1
    })
  }

  $scope.showFullScreen = function(s, no, arr){
    $(".menu").css({
      zIndex:0
    })
    
    $scope.options.showImgMainFull = true;
    var slider = fullSliders[no];
    var val = $filter('filter')(arr, {val:s.val})[0];
    slider.fullIdx = arr.indexOf(val);
    setFullSlider(no);

    $(".fst1, .fs1").show();
    $("img.spinner-img").hide();    
    $("a.base_arrows").hide();
  }

  $scope.fullImgMove = function(dir, arr, no){
    if(!animatingFull){
      animatingFull = true;
      var slider = fullSliders[no];
      if(dir == 'right'){
        
        leftShift(slider.arr)

        if(slider.fullIdx < slider.item.length - 1)
          slider.fullIdx++;
        else
          slider.fullIdx = 0;

        $(el).animate({
          left: -window.innerWidth
        }, 500)

        $(elRight).animate({
          left: 0
        }, 500, function(){
          animatingFull = false;
          setFullSlider(no);
        })
      }else{

        rightShift(slider.arr)

        if(slider.fullIdx > 0)
          slider.fullIdx--;
        else
          slider.fullIdx = slider.item.length - 1;

        $(elLeft).animate({
          left: 0
        }, 500)

        $(el).animate({
          left: window.innerWidth
        }, 500, function(){
          animatingFull = false;
          setFullSlider(no);
        })
      }
    }
  }

  $scope.backToGallery = function(){
    $scope.options.showImgFull = false;
    $(".menu").css({
      zIndex:1
    })
  } 

  $scope.showFullScreenThumb = function(s, no, arr){
    // fullpage_api.setKeyboardScrolling(false);
    $(".menu").css({
      zIndex:0
    })
    $scope.options.showImgFull = true;
    var slider = fullSliders[no];
    var val = $filter('filter')(arr, {val:s.val})[0];
    slider.fullIdx = arr.indexOf(val);
    setFullSlider(no);
    $("img.spinner-img").hide();    
    $(".fst1, .fs1").show();
  }

  $scope.toggleThumbGallery = function(){
    if(!$scope.options.showThumbnails){      
      $scope.options.showThumbnails = true;
    }else{
      $scope.options.showThumbnails = false;
    }

  }

  $scope.showIframe = function(){
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
        if($scope.options.showIns)
          sessionStorage.setItem("showIns", $scope.options.showIns);
      });
    });
  }
 
  $scope.toggleBookNow = function(){
    if(!$scope.options.showBookNow){
      $scope.options.showBookNow = true;
      $("#book-now-ctn").animate({
        left: 0
      }, 200);
    }else{
      $scope.options.showBookNow = false;
      $("#book-now-ctn").animate({
        left: "-35%"
      }, 200);
    }
  }

  $scope.submitForm = function(){
    l($scope.options.bookNowForm)
  }

  // Jquery related functions
  $(function(){
    var myFullpage = new fullpage('#fullpage', {
        anchors: ['info', 'images', '3dvr', 'floorplan', 'maps', 'services'],
        menu: '.menu',
        lockAnchors:true,
        verticalCentered:false,
        animateAnchor:false,
        // scrollBar: true,
        normalScrollElements: ".menu, .badge-pill, #section0, .thumb-ctn, .img-overlay-ctn, .fs-ctn, .control_prev, .control_next",
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
        onLeave: function(origin, destination, direction){
          // l(origin, destination, direction)
          if(destination.index == 2){
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
            $(".header .nav-link, .loc-ctn .nav-link").mouseenter(function() {
              $(this).css("color","#007bff")
            });

            $(".header .nav-link, .loc-ctn .nav-link").mouseleave(function() {
              $(this).css("color","#fff")
            });

            //Animate content box
            $(".ins-ctn").delay(500).animate({left: 0, opacity:1}, 1000, function(){
              $(".note").addClass("anim-note");
            });
          }else{
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
            $(".header .nav-link, .loc-ctn .nav-link").mouseenter(function() {
              $(this).css("color","#007bff")
            });

            $(".header .nav-link, .loc-ctn .nav-link").mouseleave(function() {
              $(this).css("color","#000")
            });
          }
          onResize();   
        },
        afterRender: function(){
          fullpage_api.setKeyboardScrolling(false);
          if(sessionStorage.getItem("showIns") != null){
            $(".ifr-outer").hide();
            $(".ifr-ctn").css("z-index", 0);
          }
          setTimeout(function(){
            onResize();
          }, 2000)

          setTimeout(function(){
            // l($(".fp-section.active").attr("id"))
            $("#loader").fadeOut();
          }, 3000)
        }
    })

    $('.menu .btn-ctn a').not(".bookNowBtn").click(function(){
      var newSlide = $(this).parent().data("menuanchor");
      fullpage_api.moveTo(newSlide);
      if(newSlide != "images"){
        setTimeout(function(){
          $scope.$apply(function(){
            $scope.options.showThumbnails = false;
          })
        }, 500)
      }   
    });

    /* Custom Slider Code*/

    window.addEventListener("resize", onResize, false);      

    $(document).keydown(onKeyDown);
    
    $('.slider1 a.control_prev').click(function () {
        moveLeft($(".slider1"), $scope.options.mainImg);
    });

    $('.slider1 a.control_next').click(function () {
        moveRight($(".slider1"), $scope.options.mainImg);
    });

    $('.slider2 a.control_prev').click(function () {
        moveLeft($(".slider2"), $scope.options.fpImg);
    });

    $('.slider2 a.control_next').click(function () {
        moveRight($(".slider2"), $scope.options.fpImg);
    });

    $('.slider3 a.control_prev').click(function () {
        moveLeft($(".slider3"), $scope.options.mapImg);
    });

    $('.slider3 a.control_next').click(function () {
        moveRight($(".slider3"), $scope.options.mapImg);
    });
    
    $("i.fa-chevron-up").hide();
    // $(".cont-btn").hide();
    $(".cont-btn").css("opacity", 0);

    $("#section0").mousewheel(function(event, delta) {
      event.preventDefault();
      var dist = $target.scrollTop() - (delta * 50);
      $target.scrollTop(dist);
      
      if($target.scrollTop() + $target.innerHeight() >= $target[0].scrollHeight - 1){        
        scrollDir = "up";
        scrollCount++;
        $(".more-info-btn").hide();
        $(".cont-btn").show();
        $("i.fa-chevron-down").show();        
        $(".cont-btn").css("opacity", 0.05*scrollCount);
        $(".cont-btn h3").css({                
          fontSize: scrollCount*0.12 + "rem"
        });
      }else if(dist >= 0){
        scrollDir = "up";
        scrollCount = 1;
        $(".cont-btn").fadeOut();
        $(".cont-btn").css("opacity", 0);
        $(".more-info-btn").fadeOut();
      }else if(dist == -50){
        scrollDir = "down";
        $(".cont-btn").hide();
        $("i.fa-chevron-down").show();
        $("i.fa-chevron-up").hide();
        $(".more-info-btn").fadeIn();
      } 

      if(scrollCount > 20){
        fullpage_api.moveTo('images');
        setTimeout(function(){
          $("i.fa-chevron-up").show();         
          $("i.fa-chevron-down").hide();
          $(".more-info-btn").show();        
          $(".cont-btn").hide();
          scrollCount = 1;
        }, 500)
      }
    });

    $(".img-overlay-ctn").css("opacity", 1);

    $(".slider, .img-overlay-ctn").swipe( {
      swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
        switch(direction){
          case 'right':
            switch($(".fp-section.active").attr("id")){
              case "section1":
                if($scope.options.showImgMainFull){
                  $scope.$apply(function(){
                    $scope.fullImgMove('left', $scope.options.mainImgFull, 0);
                  })
                }else if($scope.options.showImgFull){
                  $scope.$apply(function(){
                    $scope.fullImgMove('left', $scope.options.thumbImgFull, 3);
                  })
                }else{
                  moveLeft($(".slider1"), $scope.options.mainImg);
                }
              break;

              case "section3":
                if($scope.options.showImgMainFull){
                  $scope.$apply(function(){
                    $scope.fullImgMove('left', $scope.options.fpImgFull, 1);
                  })
                }else{
                  moveLeft($(".slider2"), $scope.options.fpImg);
                }
              break;              

              case "section4":
                if(!$scope.options.showImgMainFull){
                  moveLeft($(".slider3"), $scope.options.mapImg);
                }
              break;          
            }
          break;
          
          case 'left':
            switch($(".fp-section.active").attr("id")){       
              case "section1":
                if($scope.options.showImgMainFull){
                  $scope.$apply(function(){
                    $scope.fullImgMove('right', $scope.options.mainImgFull, 0);
                  })
                }else if($scope.options.showImgFull){
                  $scope.$apply(function(){
                    $scope.fullImgMove('right', $scope.options.thumbImgFull, 3);
                  })
                }else{
                  moveRight($(".slider1"), $scope.options.mainImg);
                }
              break;

              case "section3":
                if($scope.options.showImgMainFull){
                  $scope.$apply(function(){
                    $scope.fullImgMove('right', $scope.options.fpImgFull, 1);
                  })
                }else{
                  moveRight($(".slider2"), $scope.options.fpImg);
                }
              break;          

              case "section4":
                if(!$scope.options.showImgMainFull){
                  moveRight($(".slider3"), $scope.options.mapImg);
                }
              break;
            }
          break;
        }
      }
    })

    // l($stateParams)
    var s = $stateParams.section;
    if(s != null)
      fullpage_api.moveTo(s);
    
    l(s);
  })

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    fullpage_api.destroy('all')
  })
})