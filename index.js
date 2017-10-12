window.addEventListener('DOMContentLoaded',()=>{
    var obj = new paint(document.getElementsByTagName('canvas')[0]);
    //下载成图片
    var downloadToPic = document.getElementsByClassName('downloadToPic')[0];
    downloadToPic.onclick = function(){
        obj.downloadToPic(downloadToPic);
    }
    //上一步
    var before = document.getElementsByClassName('before')[0];
    before.onclick = function(){
        obj.before();
    }
    //下一步
    var next = document.getElementsByClassName('next')[0];
    next.onclick = function(){ 
        obj.next();
    }
    //画实线
    var line = document.getElementsByClassName('line')[0];
    line.onclick = function(){
        obj.drawLine();
    }
    //画虚线
    var dashline = document.getElementsByClassName('dashline')[0];
    dashline.onclick = function(){
        obj.drawdashLine();
    }
    //画粗实线
    var blodline = document.getElementsByClassName('blodline')[0];
    blodline.onclick = function(){
        obj.drawBlodLine();
    }
    //画粗虚线
    var bloddashline = document.getElementsByClassName('bloddashline')[0];
    bloddashline.onclick = function(){
        obj.drawBlodDashLine();
    }
    //画矩形
    var rect = document.getElementsByClassName('rect')[0];
    rect.onclick = function(){
        obj.drawRect();
    }
    //画圆形
    var circle = document.getElementsByClassName('circle')[0];
    circle.onclick = function(){
        obj.drawCircle();
    }
    //描边
    var stroke = document.getElementsByClassName('stroke')[0];
    stroke.onchange = function(){
        obj.stroke(stroke.value); 
    }
    //填充
    var fill = document.getElementsByClassName('fill')[0];
    fill.onchange = function(){
        obj.fill(fill.value); 
    }
    //画笔
    var pain = document.getElementsByClassName('pain')[0];
    pain.onclick = function(){
        obj.pain(); 
    }
    //橡皮擦
    var eraser = document.getElementsByClassName('eraser')[0];
    eraser.onclick = function(){
        var eraserbox = document.getElementsByClassName('eraserbox')[0];  
        obj.eraser(eraserbox); 
    }
    //裁剪
    var cut = document.getElementsByClassName('cut')[0];
    cut.onclick = function(){
        obj.cut();  
    }
    //插入文字
    var insertFont = document.getElementsByClassName('insertFont')[0];
    insertFont.onclick = function(){
        var canvasbox = document.getElementsByClassName('canvasbox')[0];
        obj.insertFont(canvasbox); 
    }
    
});