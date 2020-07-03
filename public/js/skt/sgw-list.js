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
		
		$(".sgwList-container").find(".audio").remove(); //알람 소리 제거
	}
	
	else{ //Sound OFF면
		sound_status = 1; //ON으로
		document.getElementById('speaker').src='/speaker2.png';
		
		if(document.getElementsByClassName("alarm-twinkle").length > 0) 
		{
			$(".sgwList-container").append(audio);
		}
	}
	
}


function play_audio(){
	
	if(document.getElementsByClassName("alarm-twinkle").length > 0 && sound_status==1) 
	{
		$(".sgwList-container").append(audio);
	}
} 

function pause_audio(){
	$(".sgwList-container").find(".audio").remove();
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
    var curSess = json.result[0].curSess;
    var totSess = json.result[0].totSess;
    
    console.log(json.result[0]);
    
    //fallback(1)
    var curLCnt = json.result[1].curLCnt;
	var totLCnt = json.result[1].totLCnt;
	var curLSess = Math.round(json.result[1].curLSess/10000);
	var totLSess = Math.round(json.result[1].totLSess/10000);
	var curLBps = json.result[1].curLBps;
	var totLBps = json.result[1].totLBps;
	
    var curVCnt = json.result[3].curVCnt;
	var totVCnt = json.result[3].totVCnt;
	var curVSess = Math.round(json.result[3].curVSess/10000);
	var totVSess = Math.round(json.result[3].totVSess/10000);
	var curVBps = json.result[3].curVBps;
	var totVBps = json.result[3].totVBps;
	
    var curSCnt = json.result[4].curSCnt;
	var totSCnt = json.result[4].totSCnt;
	var curSSess = Math.round(json.result[4].curSSess/10000);
	var totSSess = Math.round(json.result[4].totSSess/10000);
	var curSBps = json.result[4].curSBps;
	var totSBps = json.result[4].totSBps;
	
	//fallback(2)
	var rm_sys_name = json.result[2].system_name;
	
    $(".sgwList-container").find(".sys-detail-value").remove();   
    $(".sys-detail-box").removeClass("alarm-twinkle");

	pause_audio();
    
    //fallback(0)
    system_type.forEach(function(e,index){
		if(system_type[index] == 'L'){
	      $("#system-name-L").attr('id', "system-name-L"+system_name[index]);
	      $("#curSysSesContainerL").attr('id', "curSysSesContainerL"+system_name[index]);
	      $("#totSysSesContainerL").attr('id', "totSysSesContainerL"+system_name[index]);
	      
	      $("#system-name-L"+system_name[index]).parents(".sys-detail-box").attr("onclick", "location.href=\"/sgw-list/" + system_name[index]+"\"" );
	   
	      var system_nameAddHtml = "<span class='sys-detail-value'>"+system_name[index]+"</span>"; 
	      var curSessAddHtml = "<span class='sys-detail-value'>"+curSess[index]+"</span>";
	      var totSessAddHtml = "<span class='sys-detail-value'>"+totSess[index]+"</span>";
	      $("#system-name-L"+system_name[index]).append(system_nameAddHtml);
	      $("#curSysSesContainerL"+system_name[index]).append(curSessAddHtml);
	      $("#totSysSesContainerL"+system_name[index]).append(totSessAddHtml);
	      
	      
	      
	      
	      
		}
		else if(system_type[index] == 'V'){
	      $("#system-name-V").attr('id', "system-name-V"+system_name[index]);
	      $("#curSysSesContainerV").attr('id', "curSysSesContainerV"+system_name[index]);
	      $("#totSysSesContainerV").attr('id', "totSysSesContainerV"+system_name[index]);
	      
	      $("#system-name-V"+system_name[index]).parents(".sys-detail-box").attr("onclick", "location.href=\"/sgw-list/" + system_name[index]+"\"" );
	   
	      var system_nameAddHtml = "<span class='sys-detail-value'>"+system_name[index]+"</span>"; 
	      var curSessAddHtml = "<span class='sys-detail-value'>"+curSess[index]+"</span>";
	      var totSessAddHtml = "<span class='sys-detail-value'>"+totSess[index]+"</span>";
	      $("#system-name-V"+system_name[index]).append(system_nameAddHtml);
	      $("#curSysSesContainerV"+system_name[index]).append(curSessAddHtml);
	      $("#totSysSesContainerV"+system_name[index]).append(totSessAddHtml);
		}
		else if(system_type[index] == 'S'){
		      $("#system-name-S").attr('id', "system-name-S"+system_name[index]);
		      $("#curSysSesContainerS").attr('id', "curSysSesContainerS"+system_name[index]);
		      $("#totSysSesContainerS").attr('id', "totSysSesContainerS"+system_name[index]);
		      
		      $("#system-name-S"+system_name[index]).parents(".sys-detail-box").attr("onclick", "location.href=\"/sgw-list/" + system_name[index]+"\"" );
		   
		      var system_nameAddHtml = "<span class='sys-detail-value'>"+system_name[index]+"</span>"; 
		      var curSessAddHtml = "<span class='sys-detail-value'>"+curSess[index]+"</span>";
		      var totSessAddHtml = "<span class='sys-detail-value'>"+totSess[index]+"</span>";
		      $("#system-name-S"+system_name[index]).append(system_nameAddHtml);
		      $("#curSysSesContainerS"+system_name[index]).append(curSessAddHtml);
		      $("#totSysSesContainerS"+system_name[index]).append(totSessAddHtml);
			}
    });
    //fallback(1)
    var curLsgwcntAddHtml = "<span class='sys-detail-value'>"+curLCnt+"</span>"; 
    var totLsgwcntAddHtml = "<span class='sys-detail-value'>"+totLCnt+"</span>";
    var curLsgwSessAddHtml = "<span class='sys-detail-value'>"+curLSess+"</span>";
    var totLsgwSessAddHtml = "<span class='sys-detail-value'>"+totLSess+"</span>";
    var curLsgwBpsAddHtml = "<span class='sys-detail-value'>"+curLBps+"</span>";
    var totLsgwBpsAddHtml = "<span class='sys-detail-value'>"+totLBps+"</span>";
    $("#curLsgwcnt").append(curLsgwcntAddHtml);
    $("#totLsgwcnt").append(totLsgwcntAddHtml);
    $("#curLsgwSess").append(curLsgwSessAddHtml);
    $("#totLsgwSess").append(totLsgwSessAddHtml);
    $("#curLsgwBps").append(curLsgwBpsAddHtml);
    $("#totLsgwBps").append(totLsgwBpsAddHtml);

    //fallback(3)
    var curVsgwcntAddHtml = "<span class='sys-detail-value'>"+curVCnt+"</span>"; 
    var totVsgwcntAddHtml = "<span class='sys-detail-value'>"+totVCnt+"</span>";
    var curVsgwSessAddHtml = "<span class='sys-detail-value'>"+curVSess+"</span>";
    var totVsgwSessAddHtml = "<span class='sys-detail-value'>"+totVSess+"</span>";
    var curVsgwBpsAddHtml = "<span class='sys-detail-value'>"+curVBps+"</span>";
    var totVsgwBpsAddHtml = "<span class='sys-detail-value'>"+totVBps+"</span>";
    $("#curVsgwcnt").append(curVsgwcntAddHtml);
    $("#totVsgwcnt").append(totVsgwcntAddHtml);
    $("#curVsgwSess").append(curVsgwSessAddHtml);
    $("#totVsgwSess").append(totVsgwSessAddHtml);
    $("#curVsgwBps").append(curVsgwBpsAddHtml);
    $("#totVsgwBps").append(totVsgwBpsAddHtml);
    
    //fallback(4)
    var curSsgwcntAddHtml = "<span class='sys-detail-value'>"+curSCnt+"</span>"; 
    var totSsgwcntAddHtml = "<span class='sys-detail-value'>"+totSCnt+"</span>";
    var curSsgwSessAddHtml = "<span class='sys-detail-value'>"+curSSess+"</span>";
    var totSsgwSessAddHtml = "<span class='sys-detail-value'>"+totSSess+"</span>";
    var curSsgwBpsAddHtml = "<span class='sys-detail-value'>"+curSBps+"</span>";
    var totSsgwBpsAddHtml = "<span class='sys-detail-value'>"+totSBps+"</span>";
    $("#curSsgwcnt").append(curSsgwcntAddHtml);
    $("#totSsgwcnt").append(totSsgwcntAddHtml);
    $("#curSsgwSess").append(curSsgwSessAddHtml);
    $("#totSsgwSess").append(totSsgwSessAddHtml);
    $("#curSsgwBps").append(curSsgwBpsAddHtml);
    $("#totSsgwBps").append(totSsgwBpsAddHtml);

    //fallback(1+4)
    var curLSCnt = Number(curLCnt)+Number(curSCnt);
    var totLSCnt = Number(totLCnt)+Number(totSCnt);
    var curLSSess = Number(curLSess)+Number(curSSess);
    var totLSSess = Number(totLSess)+Number(totSSess);
    var curLSBps = Number(curLBps)+Number(curSBps);
    var totLSBps = Number(totLBps)+Number(totSBps);
    
    var curLSsgwcntAddHtml = "<span class='sys-detail-value'>"+curLSCnt+"</span>"; 
    var totLSsgwcntAddHtml = "<span class='sys-detail-value'>"+totLSCnt+"</span>";
    var curLSsgwSessAddHtml = "<span class='sys-detail-value'>"+curLSSess+"</span>";
    var totLSsgwSessAddHtml = "<span class='sys-detail-value'>"+totLSSess+"</span>";
    var curLSsgwBpsAddHtml = "<span class='sys-detail-value'>"+curLSBps.toFixed(2)+"</span>";
    var totLSsgwBpsAddHtml = "<span class='sys-detail-value'>"+totLSBps+"</span>";
    $("#curLSsgwcnt").append(curLSsgwcntAddHtml);
    $("#totLSsgwcnt").append(totLSsgwcntAddHtml);
    $("#curLSsgwSess").append(curLSsgwSessAddHtml);
    $("#totLSsgwSess").append(totLSsgwSessAddHtml);
    $("#curLSsgwBps").append(curLSsgwBpsAddHtml);
    $("#totLSsgwBps").append(totLSsgwBpsAddHtml);
    
    //fallback(2) -- 알람 표시
    for(var index in rm_sys_name){
        var statusClass = "";
        var statusText = "";

        if(rm_sys_name[index] != null){ 
      	  $("#system-name-L"+rm_sys_name[index]).parents(".sys-detail-box").addClass("alarm-twinkle");
      	  $("#system-name-V"+rm_sys_name[index]).parents(".sys-detail-box").addClass("alarm-twinkle");
      	  $("#system-name-S"+rm_sys_name[index]).parents(".sys-detail-box").addClass("alarm-twinkle");
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
	  ajaxShowSystemDetail("/api/v1/sgw-list");
    }, _PERIOD_);
  
})(jQuery);