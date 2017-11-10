console.log("Up and running!")

$('a').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 500);
    return false;
});

var d = document;
var c = d.getElementById('my-canvas');

// c.width = 100;
// c.height = 100;
var ctx = c.getContext('2d');
var can = document.getElementById("my-canvas");

function resizeCanvas() {
 c.width = (window.innerWidth);
  setTimeout(function() {
    c.height = window.innerHeight;
  }, 0);
};

window.onresize = resizeCanvas;
resizeCanvas();

var circles = new Array();

var requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;


function Circle(radius, speed, width, xPos, yPos, id) {
    this.radius = radius;
    this.speed = speed;
    this.width = width;
    this.xPos = xPos;
    this.yPos = yPos;
    this.id = id;
    this.exeptions = [];
    this.opacity = 1;

    this.counter = 0;

    var signHelper = Math.floor(Math.random() * 2);
    if (signHelper == 1) {
        this.sign = -1;
    } else {
        this.sign = 1;
    }
    this.globSpeedX = 1;
    this.globSpeedY = 1;
}

Circle.prototype.update = function() {

    this.counter += this.sign * this.speed;
    this.xPos += this.globSpeedX;
    if (this.xPos > c.width+10 || this.xPos < 0) {
        this.globSpeedX *= -1;
    }

    this.yPos += this.globSpeedY;
    if (this.yPos > c.height+10 || this.yPos < 0) {
        this.globSpeedY *= -1;
    }


    var newXPos = this.xPos + Math.cos(this.counter / 100) * this.radius;
    var newYPos = this.yPos + Math.sin(this.counter / 100) * this.radius;

    ctx.beginPath();
    ctx.arc(
        newXPos,
        newYPos,
        2,
        0,
        Math.PI * 2,
        false);

    ctx.closePath();

    if (this.exeptions.length > 2) {
        var rgb = 'rgb(81, 81, 81)';
    } else {
        var rgb = 'rgb(81, 81, 81)';
    }

    ctx.fillStyle = rgb;
    ctx.fill();


    this.newXPos = newXPos;
    this.newYPos = newYPos;

    for (var i = 0; i < circles.length; i++) {
        var deltaX = Math.abs(newXPos - circles[i].newXPos),
            deltaY = Math.abs(newYPos - circles[i].newYPos),
            delta = deltaX * deltaX + deltaY * deltaY,
            delta = Math.sqrt(delta);
        if (delta < 200 && this.exeptions.indexOf(circles[i].id) < 0) {
            ctx.beginPath();
            ctx.moveTo(newXPos, newYPos);
            ctx.lineTo(circles[i].newXPos, circles[i].newYPos);
            ctx.strokeStyle = 'rgba(81,81,81, ' + (1 - delta / 200) + ')';
            ctx.stroke();
            circles[i].exeptions.push(this.id);
        }
    };
};

function drawCircles() {
    for (var i = 0; i < 50; i++) {
        var randomX = Math.floor(Math.random() * c.width);
        var randomY = Math.floor(Math.random() * c.height);
        var speed = .2 + Math.random() * .5;
        var size = 5 + Math.random() * 100;
        var radius = Math.floor(Math.random() * 100) + 50;
        var circle = new Circle(radius, speed, size, randomX, randomY, i);
        circles.push(circle);
    }
    draw();
}

function draw() {
    ctx.clearRect(0, 0, c.width, c.height);

    for (var i = 0; i < circles.length; i++) {
        var myCircle = circles[i];
        myCircle.update();
        myCircle.exeptions = [];
    }
    requestAnimationFrame(draw);
}
drawCircles();
