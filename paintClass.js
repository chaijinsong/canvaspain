class paint{
    //构造函数
    /*
        构造函数中需要哪些属性:
            1.canvas对象
            2.线宽
            3.
    */
    constructor(canvas){
        //传入一个canvas作为参数
        this.canvas = canvas;
        //获取绘图环境
        this.ctx = this.canvas.getContext("2d");
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "#000";
        this.style = "stroke"; //填充方式，描边还是填充
        //历史记录的方法
        this.history = [];
    }
    //初始化各种样式的方法
    init(){
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "#000";
    }
    //下载成图片的方法
    downloadToPic(a){
        a.href = this.canvas.toDataURL('image/jpg');
        a.download = "a.jpg";
    }
    //画直线的方法
    drawLine(){ 
        this.init();
        let that = this;
        this.ctx.lineWidth = 1;
        this.ctx.setLineDash([0,0]);
        this.canvas.onmousedown = function(e){
            let oldX = e.offsetX;
            let oldY = e.offsetY;
            that.canvas.onmousemove = function(e){
                that.ctx.clearRect(0,0,1000,570);
                if(that.history.length > 0){
                    that.ctx.putImageData(that.history[that.history.length - 1] , 0 , 0);
                }
                let newX = e.offsetX;
                let newY = e.offsetY;
                that.ctx.beginPath();
                that.ctx.moveTo(oldX,oldY);
                that.ctx.lineTo(newX,newY); 
                that.ctx.closePath(); 
                that.ctx.stroke();
            }
            that.canvas.onmouseup = function(){
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
                that.history.push(that.ctx.getImageData(0,0,1000,570));
            }
        }
    } 
    //画矩形的方法
    drawRect(){
        this.init();
        let that = this;
        this.canvas.onmousedown = function(e){
            let oldX = e.offsetX;
            let oldY = e.offsetY;
            that.canvas.onmousemove = function(e){
                that.ctx.clearRect(0,0,1000,570);
                if(that.history.length > 0){
                    that.ctx.putImageData(that.history[that.history.length - 1] , 0 , 0);
                }
                let newX = e.offsetX;
                let newY = e.offsetY;
                let width = newX - oldX;
                let height = newY - oldY;
                that.ctx.beginPath();
                if(that.style == "stroke"){
                    that.ctx.strokeRect(oldX,oldY,width,height);
                }else{
                    that.ctx.fillRect(oldX,oldY,width,height);
                }
                that.ctx.closePath();
            }
            that.canvas.onmouseup = function(){
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
                that.history.push(that.ctx.getImageData(0,0,1000,570));
            }
        }
    }
    //画圆的方法
    drawCircle(){
        this.init();
        let that = this;
        this.canvas.onmousedown =  function(e){
            let oldX = e.offsetX;
            let oldY = e.offsetY;
            that.canvas.onmousemove = function(e){
                that.ctx.clearRect(0,0,1000,570);
                if(that.history.length > 0){
                    that.ctx.putImageData(that.history[that.history.length - 1] , 0 , 0);
                }
                let newX = e.offsetX;
                let newY = e.offsetY;
                let r = Math.abs(newX - oldX);
                that.ctx.beginPath();
                that.ctx.arc(oldX,oldY,r,0,Math.PI*2);
                that.ctx.closePath();
                if(that.style == "stroke"){
                    that.ctx.stroke();
                }else{
                    that.ctx.fill();
                }
            }
            that.canvas.onmouseup = function(){
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
                that.history.push(that.ctx.getImageData(0,0,1000,570));
            }
        }
    }
    //画笔
    pain(){
        this.init();
        let that = this;
        this.canvas.onmousedown = function(e){
            that.ctx.clearRect(0,0,that.canvas.width,that.canvas.height);
            if(that.history.length > 0){
                that.ctx.putImageData(that.history[that.history.length - 1] , 0, 0);
            }
            let oldX = e.offsetX;
            let oldY = e.offsetY;
            that.ctx.beginPath();
            that.ctx.moveTo(oldX,oldY);
            that.canvas.onmousemove = function(e){  
                let newX = e.offsetX;
                let newY = e.offsetY;
                that.ctx.lineTo(newX,newY);
                that.ctx.stroke();
            }
            that.canvas.onmouseup = function(){
                that.ctx.closePath();
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
                that.history.push(that.ctx.getImageData(0,0,that.canvas.width,that.canvas.height));
            }
        }
    }
    //画虚线
    drawdashLine(){
        this.drawLine();
        this.ctx.setLineDash([5,10]);
    }
    //粗实线
    drawBlodLine(){
        this.drawLine();
        this.ctx.lineWidth = 3;
    }
    //粗虚线
    drawBlodDashLine(){
        this.drawLine();
        this.ctx.lineWidth = 3;
        this.ctx.setLineDash([5,10]);
    }
    //描边颜色
    stroke(value){
        this.ctx.strokeStyle = value;
        this.style = "stroke";
    }
    //填充颜色
    fill(value){
        this.ctx.fillStyle = value;
        this.style = "fill";
    }
    //橡皮擦
    eraser(box){
        let that = this;
        this.canvas.onmousedown = function(){
            that.canvas.onmousemove = function(e){
                let x = e.offsetX - 10;
                let y = e.offsetY - 10;
                if( x < 0 ){
                    x = 0;
                }
                if( x > 980){
                    x = 980;
                }
                if( y < 0){
                    y = 0;
                }
                if( y > 550){
                    y = 550;
                }
                box.style.left = x + "px";
                box.style.top = y + "px";
                box.style.display = "block";
                that.ctx.clearRect(x,y,20,20);
                box.onmouseup = function(){
                    that.canvas.onmousedown = null; 
                    that.canvas.onmousemove = null; 
                    that.history.push(that.ctx.getImageData(0,0,1000,570));
                    box.style.display = "none";
                }
            }
        }
        
    }
    //插入文字
    insertFont(box){
        let that = this;
        this.canvas.onmousedown = function(e){
            that.init();
            let left = e.offsetX,top = e.offsetY;//按下的时候鼠标的位置
            let div = document.createElement('div');
            div.style.cssText = `
                width:100px;
                height:25px;
                lineheight:50px;
                border:1px solid #000;
                position:absolute;
                left:${left}px;
                top:${top}px;
            `;
            div.contentEditable = "true";
            box.appendChild(div);
            that.canvas.onmousedown = null;

            //实现对div进行拖拽功能
            div.onmousedown = function(e){
                let clientLeft = e.clientX; //获取点下时相对于浏览器左边的位置
                let clientTop = e.clientY; //获取点下时相对于浏览器上边的位置
                let offsetLeft = div.offsetLeft;//获取div距离左边的距离
                let offsetTop = div.offsetTop;//获取div距离上面的距离
                that.canvas.onmousemove = function(e){
                    let cx = e.clientX,cy = e.clientY;//获取当前移动的时候刘浏览器的距离
                    left = cx-clientLeft+offsetLeft;
                    top = cy - clientTop + offsetTop;
                    
                    if(left < 0){
                        left = 0;
                    }
                    if(left > 900){
                        left = 900;
                    }
                    if(top < 0){
                        top = 0;
                    }
                    if(top > 545){
                        top = 545;
                    }
                    div.style.left = `${left}px`;
                    div.style.top = `${top}px`;
                }

                div.onmouseup = function(){
                    that.canvas.onmousedown = null;
                    that.canvas.onmousemove = null;
                    that.canvas.onmouseup = null;
                }
            }
            
            //失去焦点时获取内容写入到canvas中，并且将创建出来的div移除掉
            div.onblur = function(){
                let val = div.innerText;
                that.ctx.font = "normal 16px sans-serif"; 
                box.removeChild(div);
                that.ctx.fillText(val,left,top+18);
                that.history.push(that.ctx.getImageData(0,0,that.canvas.width,that.canvas.height));
            }
        }
    }
}