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
		
		$(".aucList-container").find(".audio").remove(); //알람 소리 제거
	}
	
	else{ //Sound OFF면
		sound_status = 1; //ON으로
		document.getElementById('speaker').src='/speaker2.png';
		
		if(document.getElementsByClassName("alarm-twinkle").length > 0) 
		{
			$(".aucList-container").append(audio);
		}
	}
	
}


function play_audio(){
	
	if(document.getElementsByClassName("alarm-twinkle").length > 0 && sound_status==1) 
	{
		$(".aucList-container").append(audio);
	}
} 

function pause_audio(){
	$(".aucList-container").find(".audio").remove();
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
    var auc_num = json.result[0].auc_num;
    var system_type = json.result[0].system_type;
    var curTps = json.result[0].curTps;
    var totTps = json.result[0].totTps;
    
    //fallback(1)
    var curAuC21Cnt = json.result[1].curAuC21Cnt;
	var totAuC21Cnt = json.result[1].totAuC21Cnt;
	var curAuC21Tps = json.result[1].curAuC21Tps;
	var totAuC21Tps = json.result[1].totAuC21Tps;
	
	//fallback(2)
	var rm_sys_name = json.result[2].system_name;
	
	//fallback(3)
	var curAuC22Cnt = json.result[3].curAuC22Cnt;
	var totAuC22Cnt = json.result[3].totAuC22Cnt;
	var curAuC22Tps = Math.round(json.result[3].curAuC22Tps);
	var totAuC22Tps = Math.round(json.result[3].totAuC22Tps);
	
	//fallback(4)
	var curAuC25Cnt = json.result[4].curAuC25Cnt;
	var totAuC25Cnt = json.result[4].totAuC25Cnt;
	var curAuC25Tps = Math.round(json.result[4].curAuC25Tps);
	var totAuC25Tps = Math.round(json.result[4].totAuC25Tps);
	
	//var audio = new Audio('/bifrost_alarm.mp3');
	//audio.currentTime = 0;
	
    $(".aucList-container").find(".sys-detail-value").remove();   
    $(".aucList-container").find(".col-sm-6").remove();   
    $(".sys-detail-box").removeClass("alarm-twinkle");

    //$(".aucList-container").find(".audio").remove();
	pause_audio();
    
    //fallback(0)
    auc_num.forEach(function(e,index){
		if(auc_num[index] == '21'){
			var format_html= "<div class=\"col-sm-6 sys-detail-container\">"+
			"<div class=\"sys-detail-box align-middle\">"+
		    "<div id=\"system-name-AuC21\" class=\"sys-detail-ttl\"></div>"+
		    "<span id=\"curSysTPS_AuC21\"></span>" +
		    "<span class=\"sys-detail-delimiter\">&nbsp/&nbsp</span>" + 
		    "<span id=\"totSysTPS_AuC21\"></span></div>";
			
		  $(".auc21-panel").append(format_html);
		  
	      $("#system-name-AuC21").attr('id', "system-name-AuC21"+system_name[index]);
	      $("#curSysTPS_AuC21").attr('id', "curSysTPS_AuC21"+system_name[index]);
	      $("#totSysTPS_AuC21").attr('id', "totSysTPS_AuC21"+system_name[index]);
	      
	      $("#system-name-AuC21"+system_name[index]).parents(".sys-detail-box").attr("onclick", "location.href=\"/auc-list/" + system_name[index]+"\"" );
	   
	      var system_nameAddHtml = "<span class='sys-detail-value'>"+system_name[index]+"</span>"; 
	      var curTpsAddHtml = "<span class='sys-detail-value'>"+curTps[index]+"</span>";
	      var totTpsAddHtml = "<span class='sys-detail-value'>"+totTps[index]+"</span>";
	      $("#system-name-AuC21"+system_name[index]).append(system_nameAddHtml);
	      $("#curSysTPS_AuC21"+system_name[index]).append(curTpsAddHtml);
	      $("#totSysTPS_AuC21"+system_name[index]).append(totTpsAddHtml);
	      
		}
		
		else if(auc_num[index] == '22'){
			var format_html= "<div class=\"col-sm-6 sys-detail-container\">"+
			"<div class=\"sys-detail-box align-middle\">"+
		    "<div id=\"system-name-AuC22\" class=\"sys-detail-ttl\"></div>"+
		    "<span id=\"curSysTPS_AuC22\"></span>" +
		    "<span class=\"sys-detail-delimiter\">&nbsp/&nbsp</span>" + 
		    "<span id=\"totSysTPS_AuC22\"></span></div>";
			
			$(".auc22-panel").append(format_html);
		  
		      $("#system-name-AuC22").attr('id', "system-name-AuC22"+system_name[index]);
		      $("#curSysTPS_AuC22").attr('id', "curSysTPS_AuC22"+system_name[index]);
		      $("#totSysTPS_AuC22").attr('id', "totSysTPS_AuC22"+system_name[index]);
		      
		      $("#system-name-AuC22"+system_name[index]).parents(".sys-detail-box").attr("onclick", "location.href=\"/auc-list/" + system_name[index]+"\"" );
		   
		      var system_nameAddHtml = "<span class='sys-detail-value'>"+system_name[index]+"</span>"; 
		      var curTpsAddHtml = "<span class='sys-detail-value'>"+curTps[index]+"</span>";
		      var totTpsAddHtml = "<span class='sys-detail-value'>"+totTps[index]+"</span>";
		      $("#system-name-AuC22"+system_name[index]).append(system_nameAddHtml);
		      $("#curSysTPS_AuC22"+system_name[index]).append(curTpsAddHtml);
		      $("#totSysTPS_AuC22"+system_name[index]).append(totTpsAddHtml); 
		}
		
		else if(auc_num[index] == '25'){
			var format_html= "<div class=\"col-sm-6 sys-detail-container\">"+
			"<div class=\"sys-detail-box align-middle\">"+
		    "<div id=\"system-name-AuC25\" class=\"sys-detail-ttl\"></div>"+
		    "<span id=\"curSysTPS_AuC25\"></span>" +
		    "<span class=\"sys-detail-delimiter\">&nbsp/&nbsp</span>" + 
		    "<span id=\"totSysTPS_AuC25\"></span></div>";
			
			$(".auc25-panel").append(format_html);
		  
		      $("#system-name-AuC25").attr('id', "system-name-AuC25"+system_name[index]);
		      $("#curSysTPS_AuC25").attr('id', "curSysTPS_AuC25"+system_name[index]);
		      $("#totSysTPS_AuC25").attr('id', "totSysTPS_AuC25"+system_name[index]);
		      
		      $("#system-name-AuC25"+system_name[index]).parents(".sys-detail-box").attr("onclick", "location.href=\"/auc-list/" + system_name[index]+"\"" );
		   
		      var system_nameAddHtml = "<span class='sys-detail-value'>"+system_name[index]+"</span>"; 
		      var curTpsAddHtml = "<span class='sys-detail-value'>"+curTps[index]+"</span>";
		      var totTpsAddHtml = "<span class='sys-detail-value'>"+totTps[index]+"</span>";
		      $("#system-name-AuC25"+system_name[index]).append(system_nameAddHtml);
		      $("#curSysTPS_AuC25"+system_name[index]).append(curTpsAddHtml);
		      $("#totSysTPS_AuC25"+system_name[index]).append(totTpsAddHtml); 
		}
    });
    
    //fallback(1)
    var curAuC21cntAddHtml = "<span class='sys-detail-value'>"+curAuC21Cnt+"</span>"; 
    var totAuC21cntAddHtml = "<span class='sys-detail-value'>"+totAuC21Cnt+"</span>";
    var curAuC21TpsAddHtml = "<span class='sys-detail-value'>"+curAuC21Tps+"</span>";
    var totAuC21TpsAddHtml = "<span class='sys-detail-value'>"+totAuC21Tps+"</span>";
    $("#curAuC21Cnt").append(curAuC21cntAddHtml);
    $("#totAuC21Cnt").append(totAuC21cntAddHtml);
    $("#curAuC21Tps").append(curAuC21TpsAddHtml);
    $("#totAuC21Tps").append(totAuC21TpsAddHtml);
    
    
    //fallback(3)
    var curAuC22cntAddHtml = "<span class='sys-detail-value'>"+curAuC22Cnt+"</span>"; 
    var totAuC22cntAddHtml = "<span class='sys-detail-value'>"+totAuC22Cnt+"</span>";
    var curAuC22TpsAddHtml = "<span class='sys-detail-value'>"+curAuC22Tps+"</span>";
    var totAuC22TpsAddHtml = "<span class='sys-detail-value'>"+totAuC22Tps+"</span>";
    $("#curAuC22Cnt").append(curAuC22cntAddHtml);
    $("#totAuC22Cnt").append(totAuC22cntAddHtml);
    $("#curAuC22Tps").append(curAuC22TpsAddHtml);
    $("#totAuC22Tps").append(totAuC22TpsAddHtml);
    
    //fallback(4)
    var curAuC25cntAddHtml = "<span class='sys-detail-value'>"+curAuC25Cnt+"</span>"; 
    var totAuC25cntAddHtml = "<span class='sys-detail-value'>"+totAuC25Cnt+"</span>";
    var curAuC25TpsAddHtml = "<span class='sys-detail-value'>"+curAuC25Tps+"</span>";
    var totAuC25TpsAddHtml = "<span class='sys-detail-value'>"+totAuC25Tps+"</span>";
    $("#curAuC25Cnt").append(curAuC25cntAddHtml);
    $("#totAuC25Cnt").append(totAuC25cntAddHtml);
    $("#curAuC25Tps").append(curAuC25TpsAddHtml);
    $("#totAuC25Tps").append(totAuC25TpsAddHtml);
    
    
    //fallback(2) -- 알람 표시
    for(var index in rm_sys_name){
        var statusClass = "";
        var statusText = "";

        if(rm_sys_name[index] != null){ 
      	  $("#system-name-AuC21"+rm_sys_name[index]).parents(".sys-detail-box").addClass("alarm-twinkle");
      	  $("#system-name-AuC22"+rm_sys_name[index]).parents(".sys-detail-box").addClass("alarm-twinkle");
      	  $("#system-name-AuC25"+rm_sys_name[index]).parents(".sys-detail-box").addClass("alarm-twinkle");    	  
        }
     }
	
	
	play_audio();
	//var audio = "<audio autoplay class=\"audio\" src='/bifrost_alarm.mp3'></audio>";
	
	//if(document.getElementsByClassName("alarm-twinkle").length > 0) 
	//{
	//	$(".aucList-container").append(audio);
	//}
    
  });
}

(function($){
  "use strict";
  
  const _PERIOD_ = 1000*60;
  
  executeSetInterval(function(){
	  //console.log($("#inputCurrentSystem").attr("val"));
      //ajaxShowSystemDetail("/api/v1/system-detail/"+$("#inputCurrentSystem").attr("val"));
	  ajaxShowSystemDetail("/api/v1/auc-list");
    }, _PERIOD_);
  
})(jQuery);