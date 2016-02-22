function getQueryTime(){
     var qs = (window.location.search.length>0? window.location.search.substring(1) : ""),
         items = qs.length ? qs.split('=') : [];
         return items;
}
window.onload = function(){
  var showtime = document.getElementById('grade');
  var share = document.getElementById('e_show');
  var oimg = document.getElementById('share');

  var ar = getQueryTime(); console.log(oimg);
  showtime.innerHTML = '你玩了:'+ar[1]+'s'+'<br />'+'历史最高:'+getBest()+'s';

  function getBest(){
	 if(!localStorage.score){
	    localStorage.score = ar[1];
	 } else {console.log(typeof  localStorage.score);
	    if( parseInt(ar[1])  > parseInt(localStorage.score)){	 
	   	 localStorage.score = ar[1];
	   }
	 }
	 return localStorage.score;
  }
  addEvent(share,'touchend',function(){
       oimg.style.display = 'block';
  });
 




}

function addEvent(obj,type,fn){
  if(obj.addEventListener) {
    obj.addEventListener(type,fn,false);
  } else if(obj.attachEvent) {
    obj.attachEvent('on'+type,fn);
  }
}



