
function Run(id) {
	this.oParent = document.getElementById(id); 
	this.landmarks = []; //地标
  this.oBarrys = [];//障碍 
	this.startTime = new Date();
  
}

Run.prototype.init = function (mainName){   
	  this.createCharacter(mainName);
}

Run.prototype.createCharacter = function(mainName) {
  	this.character = document.createElement('div'); 

  	this.character.className = mainName;
  	this.oParent.appendChild(this.character);

  	var that = this;

  	this.origin = this.character.offsetTop;
    this.target = this.origin -100;
    addEvent(this.oParent,'touchstart',function(event){event.preventDefault();});
     addEvent(this.oParent,'touchmove',function(event){event.preventDefault();});
  	addEvent(this.oParent,'touchend',that.leap(that.character));
    //检测碰撞
    this.checkAll();
}


Run.prototype.leap = function(character){
  var leapBtn = true;
  return function (){
    if(leapBtn) {
      leapBtn = false;
      var cls = character.className;
      newCls ='leap'+cls ;
      character.className = newCls;
      setTimeout(function(){
          character.className = cls;
          leapBtn = true;
      },1000);

    } else {
      return;
    }
  }   
}
Run.prototype.getPageY = function(){
    var  pageY = window.innerHeight/10;

        if(typeof  pageY != "number"){
            pageY = document.documentElement.clientHeight/10;

        }else{
            pageY = document.body.clientHeight/10;
        }
    return pageY;
}

Run.prototype.createBarry = function() {
	  var that = this;
   
    var Y = this.getPageY() * 0.5;

    var barrColor = ['#f88dab', '#8db5f8', '#83e998', '#fff775'];//存储障碍物颜色
	  var timer = function creaBarry(ele) {
            clearInterval(timer);
            var oBarry = document.createElement('div');
            that.oParent.appendChild(oBarry);
            oBarry.className = 'barry';
            oBarry.style.width = that.rnd(1, 3) + 'rem';
            oBarry.style.height = that.rnd(2, 3) + 'rem';
            oBarry.style.borderRadius = that.rnd(1, 2) + 'rem';
            oBarry.style.top = that.rnd(Y * 0.55, Y * 0.75) + 'rem';
            var i = that.rnd(0, 5);//随机时间

            oBarry.style.backgroundColor = barrColor[i];
            oBarry.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
                oBarry.parentNode.removeChild(oBarry);
            }, false);

        }

    var tt = this.rnd(2500,3000);
    setInterval(timer,tt);
    clearInterval(timer);        

}

Run.prototype.rnd = function(min, max){
            return (Math.floor(Math.random() * (max - min)) + min);
        }
Run.prototype.createlandmark = function (){
    var that = this;
    this.lanwidth = [18,17,18,22,36];

    //随机时间产生地标
    var raTime  = this.randomLM(2000,1500); 

    this.latimer = setTimeout(_newLM(that),raTime);


    function _newLM(that){
       return function(){
         that.newLM();
         that.raTime = that.randomLM(2000,1500);
         setTimeout(arguments.callee,raTime);
       };
    };
}

Run.prototype.newDiv = function(obj){

		 var that =this;
	   var odiv = document.createElement('div');
	   var oImg = document.createElement('img'); 

	   odiv.className='landmark';


	   oImg.src = 'images/landmark.png';
	   oImg.style.left = -obj.left + "px";

	   odiv.style.width = obj.width + "px";
	   odiv.style.left = obj.x + "rem"; 
       
	   odiv.appendChild(oImg);
	   this.oParent.appendChild(odiv);
    
     //动画结束
      odiv.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
                that.landmarks.shift();
                odiv.parentNode.removeChild(odiv);
            }, false);
     
	   return odiv;
      // this.oParent.appendChild(odiv);

	}
Run.prototype.randomLM = function(range,first){
	    var rad = Math.floor(Math.random()*range+first);
        return rad;
	}

Run.prototype.newLM = function(){
     var that=this;
	   var rad = this.randomLM(5,0); 
	   var left = 0,ofsetx = (document.documentElement.clientHeight || document.body.clientHeight)/16,len = this.landmarks.length;       //left值,ofsetx初始为屏幕宽度
       for (var i =0; i<rad;i++){
          left += this.lanwidth[i];
       }
	   var newLanMa = {
	        width:that.lanwidth[rad],//地标宽度
	        x:ofsetx,
	        height:60,
	        left:left,
	        inow:rad,//第几种地标与随机数相同
	        index:len,//第几个
	        getdiv:function getdiv(){
	               return that.newDiv(this);
	        },
          div:null
	   };
       
       newLanMa.div = newLanMa.getdiv();

       this.landmarks.push(newLanMa);//添加进地标数组
     
	}

//检测碰撞
Run.prototype.checkAll = function(){
        var that = this;
        var checkTimer = setTimeout(function(){
        
              that.oBarrys = document.querySelectorAll('.barry');

              var oBalen = that.oBarrys.length;
              var len = that.landmarks.length;
              if(len>0)//此时对象是people
              {
                for (var i =0;i<len;i++){
                    olan = that.landmarks[i].div;//跟div碰撞

                    if(rush(that.character,olan)){//发生碰撞
                       that.stopanmition();
                       var ltime = parseFloat(document.getElementById("time").innerHTML);
                       setTimeout(function(){
                          window.location = 'gameEnd.html?name=' + ltime;
                       },500);
                    }
                 }
              }else{
                   for (var i =0;i<oBalen;i++){
                       if(rush(that.character,that.oBarrys[i])){//发生碰撞
                       that.stopanmition();

                       var ltime = parseFloat(document.getElementById("time").innerHTML);
                       setTimeout(function(){
                        window.location = 'gameEnd.html?name=' + ltime;
                       },500);
                      }
                    }
              }     
       
        checkTimer = setTimeout(arguments.callee,50);
    },50);
}

Run.prototype.stopanmition = function(){
    this.oBarrys = document.querySelectorAll('.barry');
    this.olandmarks =  document.querySelectorAll('.landmark');

    var len =this.olandmarks.length;
    var oblen = this.oBarrys.length;

    for(i = 0;i<oblen;i++){
         this.oBarrys[i].style.animationPlayState = "paused";
         this.oBarrys[i].style.webkitAnimationPlayState = "paused";
    }
    
    for(var i = 0;i<len;i++){
          this.olandmarks[i].style.animationPlayState = "paused";//运动停止地标
          this.olandmarks[i].style.webkitAnimationPlayState = "paused";
    }
      
}

var boy = new Run('xiaoHong');
boy.createlandmark();
boy.init('xiaoHong');

var bay = new Run('bayMax');
bay.init('baymax');
bay.createBarry();




function addEvent(obj,type,fn){
  if(obj.addEventListener) {
    obj.addEventListener(type,fn,false);
  } else if(obj.attachEvent) {
    obj.attachEvent('on'+type,fn);
  }
  else {
      obj['on'+type] = fn;
  }
}

//检测碰撞
function rush(ren,lanma){//人是大白或者小人，lanma是地标和障碍物

    var lx = lanma.offsetLeft;
    var ly = lanma.offsetTop;
    var lw = lanma.offsetWidth;
    var lh = lanma.offsetHeight;
   
    var rx = ren.offsetLeft;
    var ry = ren.offsetTop;  
    var rw = ren.offsetWidth;
    var rh = ren.offsetHeight; 

    if(rx+rw <lx || ry+rh <ly || lw + lx < rx || ly +lh < ry)
    {
      return false;
    }else{
     return true;
   }
   
}
