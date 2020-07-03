function executeSetInterval(func, delay){
  func();
  setInterval(func,delay);
}

var sound_status = 1; //Sound ON
var audio = "<audio autoplay loop class=\"audio\" src='/alert_sound.mp3'></audio>";

function changeStatus(){
	
	if(sound_status == 1){ //Sound ON이면
		sound_status = 0; //OFF으로
		document.getElementById('speaker').src='/mute.png'; //mute 이미지로 바꾸기
		
		$(".HlrList-container").find(".audio").remove(); //알람 소리 제거
	}
	
	else{ //Sound OFF면
		sound_status = 1; //ON으로
		document.getElementById('speaker').src='/speaker2.png';
		
		if(document.getElementsByClassName("alarm-twinkle").length > 0) 
		{
			$(".HlrList-container").append(audio);
		}
	}
	
}


function play_audio(){
	
	if(document.getElementsByClassName("alarm-twinkle").length > 0 && sound_status==1) 
	{
		$(".HlrList-container").append(audio);
	}
} 

function pause_audio(){
	$(".HlrList-container").find(".audio").remove();
}

/** 2020.02.27 Ajax Function Updates System detail status -MK- */
function ajaxShowSystemDetail(url){
  $.ajax({
    url: url,
    type: "GET"
  })
  .done(function(data){
    var json = JSON.parse(data);
    //fallback(0)
    var system_name = json.result[0].system_name;
    var system_type = json.result[0].system_type;
    var curTps = json.result[0].curTps;
    var totTps = json.result[0].totTps;
    
    console.log(json.result[0]);
    
    //fallback(1)
    var curActiveCnt = json.result[1].curActiveCnt;
	var totActiveCnt = json.result[1].totActiveCnt;
	var curActiveTps = Math.round(json.result[1].curActiveTps);
	var totActiveTps = Math.round(json.result[1].totActiveTps);
	
	//fallback(2)
	var rm_sys_name = json.result[2].system_name;
	
	//fallback(3)
	var curBKCnt = json.result[3].curBKCnt;
	var totBKCnt = json.result[3].totBKCnt;
	var curBKTps = Math.round(json.result[3].curBKTps);
	var totBKTps = Math.round(json.result[3].totBKTps);
	
	
    $(".HlrList-container").find(".sys-detail-value").remove();   
    $(".HlrList-container").find(".col-sm-4").remove();
    $(".sys-detail-box").removeClass("alarm-twinkle");

	pause_audio();
    
    //fallback(0)
    system_type.forEach(function(e,index){
		if(system_type[index] == 'A'){
			
			var format_html= "<div class=\"col-sm-4 sys-detail-container\">"+
			"<div class=\"sys-detail-box align-middle\">"+
		    "<div id=\"system-name-A\" class=\"sys-detail-ttl\"></div>"+
		    "<span id=\"curSysTPS_A\"></span>" +
		    "<span class=\"sys-detail-delimiter\">&nbsp/&nbsp</span>" + 
		    "<span id=\"totSysTPS_A\"></span></div>";
			
		  $(".active-Hlr-panel").append(format_html);
		  
	      $("#system-name-A").attr('id', "system-name-A"+system_name[index]);
	      $("#curSysTPS_A").attr('id', "curSysTPS_A"+system_name[index]);
	      $("#totSysTPS_A").attr('id', "totSysTPS_A"+system_name[index]);
	      
	      $("#system-name-A"+system_name[index]).parents(".sys-detail-box").attr("onclick", "location.href=\"/hlr-list/" + system_name[index]+"\"" );
	   
	      var system_nameAddHtml = "<span class='sys-detail-value'>"+system_name[index]+"</span>"; 
	      var curTpsAddHtml = "<span class='sys-detail-value'>"+curTps[index]+"</span>";
	      var totTpsAddHtml = "<span class='sys-detail-value'>"+totTps[index]+"</span>";
	      $("#system-name-A"+system_name[index]).append(system_nameAddHtml);
	      $("#curSysTPS_A"+system_name[index]).append(curTpsAddHtml);
	      $("#totSysTPS_A"+system_name[index]).append(totTpsAddHtml);
	      
		}
		
		else if(system_type[index] == 'BK'){
			
			var format_html= "<div class=\"col-sm-4 sys-detail-container\">"+
			"<div class=\"sys-detail-box align-middle\">"+
		    "<div id=\"system-name-BK\" class=\"sys-detail-ttl\"></div>"+
		    "<span id=\"curSysTPS_BK\"></span>" +
		    "<span class=\"sys-detail-delimiter\">&nbsp/&nbsp</span>" + 
		    "<span id=\"totSysTPS_BK\"></span></div>";
			
			$(".bkup-Hlr-panel").append(format_html);
			
		    $("#system-name-BK").attr('id', "system-name-BK"+system_name[index]);
		    $("#curSysTPS_BK").attr('id', "curSysTPS_BK"+system_name[index]);
		    $("#totSysTPS_BK").attr('id', "totSysTPS_BK"+system_name[index]);
		     
		    $("#system-name-BK"+system_name[index]).parents(".sys-detail-box").attr("onclick", "location.href=\"/hlr-list/" + system_name[index]+"\"" );
		   
		    var system_nameAddHtml = "<span class='sys-detail-value'>"+system_name[index]+"</span>"; 
		    var curTpsAddHtml = "<span class='sys-detail-value'>"+curTps[index]+"</span>";
		    var totTpsAddHtml = "<span class='sys-detail-value'>"+totTps[index]+"</span>";
		    $("#system-name-BK"+system_name[index]).append(system_nameAddHtml);
		    $("#curSysTPS_BK"+system_name[index]).append(curTpsAddHtml);
		    $("#totSysTPS_BK"+system_name[index]).append(totTpsAddHtml); 
		}
    });
    
    //fallback(1)
    var curActiveHlrcntAddHtml = "<span class='sys-detail-value'>"+curActiveCnt+"</span>"; 
    var totActiveHlrcntAddHtml = "<span class='sys-detail-value'>"+totActiveCnt+"</span>";
    var curActiveHlrTpsAddHtml = "<span class='sys-detail-value'>"+curActiveTps+"</span>";
    var totActiveHlrTpsAddHtml = "<span class='sys-detail-value'>"+totActiveTps+"</span>";
    $("#curActHlrCnt").append(curActiveHlrcntAddHtml);
    $("#totActHlrCnt").append(totActiveHlrcntAddHtml);
    $("#curActHlrTps").append(curActiveHlrTpsAddHtml);
    $("#totActHlrTps").append(totActiveHlrTpsAddHtml);
    
    //fallback(3)
    var curBKHlrcntAddHtml = "<span class='sys-detail-value'>"+curBKCnt+"</span>"; 
    var totBKHlrcntAddHtml = "<span class='sys-detail-value'>"+totBKCnt+"</span>";
    var curBKHlrTpsAddHtml = "<span class='sys-detail-value'>"+curBKTps+"</span>";
    var totBKHlrTpsAddHtml = "<span class='sys-detail-value'>"+totBKTps+"</span>";
    $("#curBKHlrCnt").append(curBKHlrcntAddHtml);
    $("#totBKHlrCnt").append(totBKHlrcntAddHtml);
    $("#curBKHlrTps").append(curBKHlrTpsAddHtml);
    $("#totBKHlrTps").append(totBKHlrTpsAddHtml);
    
    
    //fallback(2) -- 알람 표시
    for(var index in rm_sys_name){
        var statusClass = "";
        var statusText = "";

        if(rm_sys_name[index] != null){ 
      	  $("#system-name-A"+rm_sys_name[index]).parents(".sys-detail-box").addClass("alarm-twinkle");
      	  $("#system-name-BK"+rm_sys_name[index]).parents(".sys-detail-box").addClass("alarm-twinkle");
        }
        
        //$("#skt-map-center-"+site).find(".skt-map-status-btn").text(statusText);

     }
	
	
	play_audio();
    
  });
}

(function($){
  "use strict";
  
  const _PERIOD_ = 1000*60;
  
  executeSetInterval(function(){
	  //console.log($("#inputCurrentSystem").attr("val"));
      //ajaxShowSystemDetail("/api/v1/system-detail/"+$("#inputCurrentSystem").attr("val"));
	  ajaxShowSystemDetail("/api/v1/hlr-list");
    }, _PERIOD_);
  
})(jQuery);