function pointerEvents() {
  var Sys = {};
  var ua = navigator.userAgent.toLowerCase();
  var s;
  var agent = {
    bool: false,
    browser: 0
  };
  (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
    (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
      (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
        (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
 var browser = Sys.firefox || Sys.chrome || Sys.safari || 0;
  if (browser)
  var  version = parseFloat(browser.substring(0, s.indexOf(".") + 5));
  switch (browser) {
    case Sys.firefox:
      if (version >= 3.6)
        agent.bool = true;
      break;
    case Sys.chrome:
      if (version >= 2)
        agent.bool = true;
      break;
    case Sys.safari:
      if (version >= 4)
        agent.bool = true;
      break;
  }
  if (Sys.ie)
    agent.browser = 1;
  return agent;
}

function Snowy(options) {
  if (options.browser) {
    var Snow= function (x, y, radius, fn) {
          this.x = x;
          this.y = y;
          this.r = radius;
          this.fn = fn;
      }
      Snow.prototype.update = function () {
          var H = docEle.height
          if (this.y > docEle.height) {
              this.x = getRandom('x');
              this.y = 0;
          } else {
              this.x = this.fn.x(this.x, this.y);
              this.y = this.fn.y(this.y, this.y);
          }
      }
      SnowList = function () {
          this.list = [];
      }
      SnowList.prototype.update = function () {
          i = 0,
              len = this.list.length;
          for (; i < len; i++) {
              this.list[i].update();
          }

      }
  } else {

      function Snow(x, y, radius, fn) {
          this.x = x;
          this.y = y;
          this.r = radius;
          this.fn = fn;
          this.move = true;
      }

      Snow.prototype.update = function (toUpper) {
          var H = docEle.height,
              prevReachX = ~~(this.x),
              nextReachX = ~~(this.x) + 1,
              thisReach = snowList.widthReach[prevReachX] || 0,
              useReachX,
              useReach;

          if (!this.move) {
              return;
          }
          if (snowList.widthReach[prevReachX] <= snowList.widthReach[nextReachX]) {
              useReachX = prevReachX;
          } else {
              useReachX = nextReachX;
          }
          useReach = snowList.widthReach[useReachX] || 0;
          if (this.y > H - thisReach - 2 && this.y < H - thisReach + 3) {
              if (toUpper) {
                  this.y = H - thisReach;
                  if (useReach < thisReach) {
                      this.x = useReachX;
                      thisReach = useReach;
                  } else {
                      useReachX = ~~this.x
                  }
                  if (H - this.y + ~~(this.r / 6) >= thisReach) {
                      snowList.widthReach[useReachX] = H - this.y + ~~(this.r / 6);
                  }
                  this.move = false;
              } else {
                  this.x = getRandom('x');
                  this.y = 0;
              }
          } else if (this.y > docEle.height) {
              if (toUpper) {
                  snowList.widthReach[useReachX] = H - this.y + ~~(this.r / 3);
                  this.move = false;
              } else {
                  this.x = getRandom('x');
                  this.y = 0;
              }
          } else {
              this.x = this.fn.x(this.x, this.y);
              this.y = this.fn.y(this.y, this.y);
          }
      }


      // about solute the line
      function UnitBezier(p1x, p1y, p2x, p2y) {
          // pre-calculate the polynomial coefficients
          // First and last control points are implied to be (0,0) and (1.0, 1.0)
          this.cx = 3.0 * p1x;
          this.bx = 3.0 * (p2x - p1x) - this.cx;
          this.ax = 1.0 - this.cx - this.bx;

          this.cy = 3.0 * p1y;
          this.by = 3.0 * (p2y - p1y) - this.cy;
          this.ay = 1.0 - this.cy - this.by;
      }
      UnitBezier.prototype = {
          epsilon: 1e-3,     // Precision  
          sampleCurveX: function (t) {
              return ((this.ax * t + this.bx) * t + this.cx) * t;
          },
          sampleCurveY: function (t) {
              return ((this.ay * t + this.by) * t + this.cy) * t;
          },
          sampleCurveDerivativeX: function (t) {
              return (3.0 * this.ax * t + 2.0 * this.bx) * t + this.cx;
          },
          solveCurveX: function (x, epsilon) {
              var t0,
                  t1,
                  t2,
                  x2,
                  d2,
                  i;

              // First try a few iterations of Newton's method -- normally very fast.
              for (t2 = x, i = 0; i < 8; i++) {
                  x2 = this.sampleCurveX(t2) - x;
                  if (Math.abs(x2) < epsilon)
                      return t2;
                  d2 = this.sampleCurveDerivativeX(t2);
                  if (Math.abs(d2) < epsilon)
                      break;
                  t2 = t2 - x2 / d2;
              }

              // No solution found - use bi-section
              t0 = 0.0;
              t1 = 1.0;
              t2 = x;

              if (t2 < t0) return t0;
              if (t2 > t1) return t1;

              while (t0 < t1) {
                  x2 = this.sampleCurveX(t2);
                  if (Math.abs(x2 - x) < epsilon)
                      return t2;
                  if (x > x2) t0 = t2;
                  else t1 = t2;

                  t2 = (t1 - t0) * .5 + t0;
              }

              // Give up
              return t2;
          },

          // Find new T as a function of Y along curve X
          solve: function (x, epsilon) {
              return this.sampleCurveY(this.solveCurveX(x, epsilon));
          }
      }

      function listReachInit(o, that) {
          var base = getDistance(o.baseX),
              bezier,
              cubic,
              len,
              per,
              i;
          if (o.cubicBezier) {
              bezier = o.cubicBezier;
              cubic = new UnitBezier(bezier[0], bezier[1], bezier[2], bezier[3]);
          }
          for (i = 0, len = o.to.X - o.from.X; i < len; i++) {
              per = (i + 1) / len;
              if (cubic) {
                  per = cubic.solve(per, 1e-3);
              }
              that.widthReach[~~(base + o.from.X) + i] = (o.to.Y - o.from.Y) * per + o.from.Y;
          }
      }
  var    SnowList = function () {
          var len = options.line.length,
              i = 0;
          this.list = [];
          this.widthReach = [];
          for (; i < len; i++) {
              listReachInit(options.line[i], this);
          }
      }
      SnowList.prototype.update = function () {
          var lenNoMove = 0,
              i = 0,
              len = this.list.length;
          for (; i < len; i++) {
              if (this.list[i].move === false) {
                  lenNoMove++;
              }
              if (len >= options.maxCell) {
                  this.list[i].update(false);
              }
              else
                  this.list[i].update(true);
          }
          /*clearInterval(interval);*/
          // if (len >= options.maxCell) return;
          if (len < options.maxCell) {
              for (i = 0, len = options.cell - (len - lenNoMove); i < len; i++) {
                  !(function () {
                      var snow, randomX, randomY, randomR, randomFnx, randomFny;
                      randomX = getRandom('x');
                      randomY = getRandom('y');
                      randomR = getRandom('r');
                      randomFnx = getRandom('fnx');
                      randomFny = getRandom('fny');

                      snow = new Snow(randomX, randomY, randomR, {
                          x: randomFnx,
                          y: randomFny
                      });
                      snow.draw(cxt);
                      snowList.push(snow);
                  })();
              }
          }
      }
  }
  //global
  SnowList.prototype.push = function (snow) {
      this.list.push(snow);
  }

  SnowList.prototype.draw = function (cxt) {
      for (var i = 0, len = this.list.length; i < len; i++) {
          this.list[i].draw(cxt);
      }
      /*cxt.clearRect(300 - 6, docEle.height - 200, 200 + 12, 4);*/
  }
  SnowList.prototype.get = function (i) {
      return this.list[i];
  }
  SnowList.prototype.size = function () {
      return this.list.length;
  }
   Snow.prototype.draw = function (cxt) {
      var grd = cxt.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
      grd.addColorStop(0, 'rgba(255, 255, 255, ' + ((this.r) / 6 * 1) + ')');
      grd.addColorStop(.5, 'rgba(255, 255, 255, ' + ((this.r) / 6 * .5) + ')');
      grd.addColorStop(1, 'rgba(255, 255, 255, 0)');
      cxt.fillStyle = grd;
      cxt.fillRect(this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
  }

  /**
   * Generate random x-pos, y-pos or fn functions
   * @param  {string} option x|y|fnx|fny
   * @return {int|Function} 
   */
  function getRandom(option) {
      var ret, random;
      switch (option) {
          case 'x':
              ret = Math.random() * docEle.width;
              break;
          case 'y':
              ret = (Math.random() - 1) * docEle.height;
              break;
          case 'r':
              ret = 2 + (Math.random() * 4);
              break;
          case 'fnx':
              random = 27 + Math.random() * 100;
              ret = function (x, y) {
                  return x + 0.5 * Math.sin(y / random);
              };
              break;
          case 'fny':
              random = 0.4 + Math.random() * 1.4
              ret = function (x, y) {
                  return y + random;
              };
              break;
      }
      return ret;
  }
  function newSnow() {
      var snow, randomX, randomY, randomR, randomFnx, randomFny;
      for (var i = 0; i < options.cell; i++) {

          randomX = getRandom('x');
          randomY = getRandom('y');
          randomR = getRandom('r');
          randomFnx = getRandom('fnx');
          randomFny = getRandom('fny');
          snow = new Snow(randomX, randomY, randomR, {
              x: randomFnx,
              y: randomFny
          });
          snow.draw(cxt);
          snowList.push(snow);
      }
  }
  function getDistance(n) {

      if (n.toString().indexOf('%') !== -1) {
          n = n.split('%')[0] / 100 * addIn.offsetWidth
      }
      return n;
  }
  // Start snow
  var addIn = document.getElementById(options.addIn) || document.getElementsByTagName('body')[0],
      docEle = {
          width: getDistance(options.width),
          height: getDistance(options.height)
      },
      canvas = document.createElement('canvas'), cxt, interval;
  addIn.appendChild(canvas);
  cxt = canvas.getContext('2d');
  // Create snow objects
  var snowList = new SnowList();
  newSnow();
  init = function () {
      canvas.height = docEle.height;
      canvas.width = docEle.width;
      snowList = new SnowList();
      newSnow();
  }
  init();

  // Update snow position data, and redraw them in each frame
  interval = setInterval(function () {
      cxt.clearRect(0, 0, canvas.width, canvas.height);
      snowList.update();
      snowList.draw(cxt);
  }, 13);

  return {
      init: init
  }
}
console.log(pointerEvents())
debugger
var winWidth = window.innerWidth;
var snowy = Snowy({
  addIn: 'snow',
  width: '100%',
  height: 180,
  cell: pointerEvents().browser ? 100 : 90,
  maxCell: pointerEvents().browser ? 80 : 1000,
  browser: pointerEvents().browser,
  line: [
    {
      baseX: '50%',
      from: {
        X: -950,
        Y: 56
      },
      to: {
        X: -878,
        Y: 62
      },
    },
    {
      baseX: '50%',
      from: {
        X: -878,
        Y: 62
      },
      to: {
        X: -835,
        Y: 55
      },
    },
    {
      baseX: '50%',
      from: {
        X: -820,
        Y: 53
      },
      to: {
        X: -789,
        Y: 70
      },
      cubicBezier: [0, .27, .06, .97]
    },
    {
      baseX: '50%',
      from: {
        X: -789,
        Y: 70
      },
      to: {
        X: -722,
        Y: 63
      },
    },
    {
      baseX: '50%',
      from: {
        X: -722,
        Y: 63
      },
      to: {
        X: -668,
        Y: 66
      },
    },
    {
      baseX: '50%',
      from: {
        X: -668,
        Y: 66
      },
      to: {
        X: -643,
        Y: 62
      },
    },
    {
      baseX: '50%',
      from: {
        X: -643,
        Y: 62
      },
      to: {
        X: -615,
        Y: 56
      },
    },
    {
      baseX: '50%',
      from: {
        X: -599,
        Y: 54
      },
      to: {
        X: -579,
        Y: 57
      },
    },
    {
      baseX: '50%',
      from: {
        X: -579,
        Y: 57
      },
      to: {
        X: -463,
        Y: 59
      },
    },
    {
      baseX: '50%',
      from: {
        X: -463,
        Y: 59
      },
      to: {
        X: -445,
        Y: 55
      },
    },
    {
      baseX: '50%',
      from: {
        X: -445,
        Y: 55
      },
      to: {
        X: -384,
        Y: 56
      },
    },
    {
      baseX: '50%',
      from: {
        X: -384,
        Y: 56
      },
      to: {
        X: -380,
        Y: 53
      },
    },
    {
      baseX: '50%',
      from: {
        X: -408,
        Y: 50
      },
      to: {
        X: -383,
        Y: 56
      },
      cubicBezier: [0, .27, .06, .97]
    },
    {
      baseX: '50%',
      from: {
        X: -383,
        Y: 56
      },
      to: {
        X: -360,
        Y: 54
      },
    },
    {
      baseX: '50%',
      from: {
        X: -348,
        Y: 55
      },
      to: {
        X: -246,
        Y: 64
      },
    },
    {
      baseX: '50%',
      from: {
        X: -246,
        Y: 64
      },
      to: {
        X: -158,
        Y: 57
      },
    },
    {
      baseX: '50%',
      from: {
        X: -158,
        Y: 57
      },
      to: {
        X: -109,
        Y: 58
      },
    },
    {
      baseX: '50%',
      from: {
        X: -109,
        Y: 58
      },
      to: {
        X: -72,
        Y: 54
      },
    },
    {
      baseX: '50%',
      from: {
        X: -43,
        Y: 55
      },
      to: {
        X: 0,
        Y: 59
      },
      cubicBezier: [.05, .35, .25, 1]
    },
    {
      baseX: '50%',
      from: {
        X: 0,
        Y: 59
      },
      to: {
        X: 49,
        Y: 57
      },
      cubicBezier: [.46, 0, .09, .85]
    },
    {
      baseX: '50%',
      from: {
        X: 49,
        Y: 57
      },
      to: {
        X: 71,
        Y: 60
      },
    },
    {
      baseX: '50%',
      from: {
        X: 71,
        Y: 60
      },
      to: {
        X: 100,
        Y: 56
      }
    },
    {
      baseX: '50%',
      from: {
        X: 100,
        Y: 56
      },
      to: {
        X: 108,
        Y: 58
      }
    },
    {
      baseX: '50%',
      from: {
        X: 108,
        Y: 58
      },
      to: {
        X: 116,
        Y: 55
      }
    },
    {
      baseX: '50%',
      from: {
        X: 125,
        Y: 55
      },
      to: {
        X: 165,
        Y: 70
      },
      cubicBezier: [.08, .36, .33, .77]
    },
    {
      baseX: '50%',
      from: {
        X: 165,
        Y: 70
      },
      to: {
        X: 357,
        Y: 58
      },
    },
    {
      baseX: '50%',
      from: {
        X: 357,
        Y: 58
      },
      to: {
        X: 505,
        Y: 64
      },
    },
    {
      baseX: '50%',
      from: {
        X: 505,
        Y: 64
      },
      to: {
        X: 570,
        Y: 56
      },
    },
    {
      baseX: '50%',
      from: {
        X: 687,
        Y: 53
      },
      to: {
        X: 705,
        Y: 57
      },
    },
    {
      baseX: '50%',
      from: {
        X: 705,
        Y: 57
      },
      to: {
        X: 720,
        Y: 52
      },
    },
    {
      baseX: '50%',
      from: {
        X: 754,
        Y: 53
      },
      to: {
        X: 861,
        Y: 80
      },
      cubicBezier: [0, .2, .34, .86]
    },
    {
      baseX: '50%',
      from: {
        X: 861,
        Y: 80
      },
      to: {
        X: 950,
        Y: 58
      },
      cubicBezier: [.4, .13, .88, .36]
    },
  ]
});

window.onload = function () {
  snowy.init();
  if (pointerEvents().bool) {
    var canvasObj = document.getElementById('snow');
    var canvasParent = canvasObj.parentNode;
    canvasParent.removeChild(canvasObj);
    canvasParent.appendChild(canvasObj);
  }
}