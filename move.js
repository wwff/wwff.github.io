
var prevTime='';
var ispeed = 4;
var k=1;
function startMove(obj,ren,json,fnEnd)
{
  if(prevTime === '') {
     prevTime = new Date();  
  } else {
   var nowTime = new Date();
   var gapTime = (nowTime-prevTime)/1000;
 
  }

  if(gapTime > 20*k) { 
    ispeed+=2;
    k++;
  }
  clearInterval(obj.timer);
  obj.timer = setInterval(function(){
     var bStop = true;
      for(var attr in json)
      {
         if(!rush(ren,obj)){ //检测碰撞
             var time = parseFloat(document.getElementById('time').innerHTML);
             
                // window.location = 'gameend.html?time=' + time;

              }

           var cur = 0;
               cur = parseInt(getStyle(obj,attr));
           var speed = (json[attr]- cur) >0 ? ispeed:-ispeed;

           if(cur-json[attr] > ispeed || cur-json[attr] < ispeed) {
              bStop = false;
           }

              if(attr == 'opacity'){
                obj.style.filter ='alpha(opacity:'+(cur + speed) +')';
                obj.style.opacity = (cur + speed)/100;
              }
              else {
                obj.style[attr] = cur +speed +"px";
              } 

      }
      if(bStop){
              obj.style[attr] = cur +speed +"px";
              clearInterval(obj.timer);
              if(fnEnd) {
                 fnEnd(obj);
              }
           }
  },25);

  
}

 function getStyle(obj,attr){
    if(obj.currentStyle){
       return obj.currentStyle[attr];//IE
    }    
    else {
       return getComputedStyle(obj,null)[attr];
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
 }

//检测碰撞
 function rush(ren,lanma){
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
      return true;
      
    }else{
     return false;
   }
   
}