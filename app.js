import Ball from "./ball_module.js";

var ball;

ball = new Ball(".canva", "./objects/ball.glb", true, 0.001, 0xf0f0cf);


window.addEventListener('resize', function(){
    ball.resize();
});