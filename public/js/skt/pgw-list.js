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
		
		$(".pgwList-container").find(".audio").remove(); //알람 소리 제거
	}
	
	else{ //Sound OFF면
		sound_status = 1; //ON으로
		document.getElementById('speaker').src='/speaker2.png';
		
		if(document.getElementsByClassName("alarm-twinkle").length > 0) 
		{
			$(".pgwList-container").append(audio);
		}
	}
	
}


function play_audio(){
	
	if(document.getElementsByClassName("alarm-twinkle").length > 0 && sound_status==1) 
	{
		$(".pgwList-container").append(audio);
	}
} 

function pause_audio(){
	$(".pgwList-container").find(".audio").remove();
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
    var curDataCnt = json.result[1].curDataCnt;
	var totDataCnt = json.result[1].totDataCnt;
	var curDataSess = Math.round(json.result[1].curDataSess/10000);
	var totDataSess = Math.round(json.result[1].totDataSess/10000);
	var curDataBps = json.result[1].curDataBps;
	var totDataBps = json.result[1].totDataBps;
	
    var curHDVCnt = json.result[3].curHDVCnt;
	var totHDVCnt = json.result[3].totHDVCnt;
	var curHDVSess = Math.round(json.result[3].curHDVSess/10000);
	var totHDVSess = Math.round(json.result[3].totHDVSess/10000);
	var curHDVBps = json.result[3].curHDVBps;
	var totHDVBps = json.result[3].totHDVBps;
	
	//fallback(2)
	var rm_sys_name = json.result[2].system_name;
	
    $(".pgwList-container").find(".sys-detail-value").remove();   
    $(".pgwList-container").find(".col-sm-2").remove(); 
    $(".pgwList-container").find(".col-sm-3").remove();
    $(".sys-detail-box").removeClass("alarm-twinkle");

	pause_audio();
    
    //fallback(0)
    system_type.forEach(function(e,index){
		if(system_type[index] == 'D' || system_type[index] == 'vD'){
		  	
		  var format_html= "<div class=\"col-sm-2 sys-detail-container\">"+
			"<div class=\"sys-detail-box align-middle\">"+
		    "<div id=\"system-name-D\" class=\"sys-detail-name\"></div>"+
		    "<span id=\"curSysSesContainerD\"></span>" +
		    "<span class=\"sys-detail-delimiter\">&nbsp/&nbsp</span>" + 
		    "<span id=\"totSysSesContainerD\"></span></div>";
		  
		  $(".data-pgw-panel").append(format_html);
			
	      $("#system-name-D").attr('id', "system-name-D"+system_name[index]);
	      $("#curSysSesContainerD").attr('id', "curSysSesContainerD"+system_name[index]);
	      $("#totSysSesContainerD").attr('id', "totSysSesContainerD"+system_name[index]);
	      
	      $("#system-name-D"+system_name[index]).parents(".sys-detail-box").attr("onclick", "location.href=\"/pgw-list/" + system_name[index]+"\"" );
	   
	      var system_nameAddHtml = "<span class='sys-detail-value'>"+system_name[index]+"</span>"; 
	      var curSessAddHtml = "<span class='sys-detail-value'>"+curSess[index]+"</span>";
	      var totSessAddHtml = "<span class='sys-detail-value'>"+totSess[index]+"만</span>";
	      $("#system-name-D"+system_name[index]).append(system_nameAddHtml);
	      $("#curSysSesContainerD"+system_name[index]).append(curSessAddHtml);
	      $("#totSysSesContainerD"+system_name[index]).append(totSessAddHtml);

	      
	      
	      
		}
		else if(system_type[index] == 'H'){
		  var format_html= "<div class=\"col-sm-3 sys-detail-container\">"+
			"<div class=\"sys-detail-box align-middle\">"+
		    "<div id=\"system-name-H\" class=\"sys-detail-name\"></div>"+
		    "<span id=\"curSysSesContainerH\"></span>" +
		    "<span class=\"sys-detail-delimiter\">&nbsp/&nbsp</span>" + 
		    "<span id=\"totSysSesContainerH\"></span></div>";  	
		
		  $(".hdv-pgw-panel").append(format_html);
		
	      $("#system-name-H").attr('id', "system-name-H"+system_name[index]);
	      $("#curSysSesContainerH").attr('id', "curSysSesContainerH"+system_name[index]);
	      $("#totSysSesContainerH").attr('id', "totSysSesContainerH"+system_name[index]);
	      
	      $("#system-name-H"+system_name[index]).parents(".sys-detail-box").attr("onclick", "location.href=\"/pgw-list/" + system_name[index]+"\"" );
	   
	      var system_nameAddHtml = "<span class='sys-detail-value'>"+system_name[index]+"</span>"; 
	      var curSessAddHtml = "<span class='sys-detail-value'>"+curSess[index]+"</span>";
	      var totSessAddHtml = "<span class='sys-detail-value'>"+totSess[index]+"만</span>";
	      $("#system-name-H"+system_name[index]).append(system_nameAddHtml);
	      $("#curSysSesContainerH"+system_name[index]).append(curSessAddHtml);
	      $("#totSysSesContainerH"+system_name[index]).append(totSessAddHtml);
		}
    });
    //fallback(1)
    var curDatapgwcntAddHtml = "<span class='sys-detail-value'>"+curDataCnt+"</span>"; 
    var totDatapgwcntAddHtml = "<span class='sys-detail-value'>"+totDataCnt+"</span>";
    var curDatapgwSessAddHtml = "<span class='sys-detail-value'>"+curDataSess+"</span>";
    var totDatapgwSessAddHtml = "<span class='sys-detail-value'>"+totDataSess+"</span>";
    var curDatapgwBpsAddHtml = "<span class='sys-detail-value'>"+curDataBps+"</span>";
    var totDatapgwBpsAddHtml = "<span class='sys-detail-value'>"+totDataBps+"</span>";
    $("#curDatapgwcnt").append(curDatapgwcntAddHtml);
    $("#totDatapgwcnt").append(totDatapgwcntAddHtml);
    $("#curDatapgwSess").append(curDatapgwSessAddHtml);
    $("#totDatapgwSess").append(totDatapgwSessAddHtml);
    $("#curDatapgwBps").append(curDatapgwBpsAddHtml);
    $("#totDatapgwBps").append(totDatapgwBpsAddHtml);

    //fallback(3)
    var curHDVpgwcntAddHtml = "<span class='sys-detail-value'>"+curHDVCnt+"</span>"; 
    var totHDVpgwcntAddHtml = "<span class='sys-detail-value'>"+totHDVCnt+"</span>";
    var curHDVpgwSessAddHtml = "<span class='sys-detail-value'>"+curHDVSess+"</span>";
    var totHDVpgwSessAddHtml = "<span class='sys-detail-value'>"+totHDVSess+"</span>";
    var curHDVpgwBpsAddHtml = "<span class='sys-detail-value'>"+curHDVBps+"</span>";
    var totHDVpgwBpsAddHtml = "<span class='sys-detail-value'>"+totHDVBps+"</span>";
    $("#curHdvpgwcnt").append(curHDVpgwcntAddHtml);
    $("#totHdvpgwcnt").append(totHDVpgwcntAddHtml);
    $("#curHdvpgwSess").append(curHDVpgwSessAddHtml);
    $("#totHdvpgwSess").append(totHDVpgwSessAddHtml);
    $("#curHdvpgwBps").append(curHDVpgwBpsAddHtml);
    $("#totHdvpgwBps").append(totHDVpgwBpsAddHtml);
    
    //fallback(2) -- 알람 표시
    for(var index in rm_sys_name){
        var statusClass = "";
        var statusText = "";

        if(rm_sys_name[index] != null){ 
      	  $("#system-name-D"+rm_sys_name[index]).parents(".sys-detail-box").addClass("alarm-twinkle");
      	  $("#system-name-H"+rm_sys_name[index]).parents(".sys-detail-box").addClass("alarm-twinkle");
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
	  ajaxShowSystemDetail("/api/v1/pgw-list");
    }, _PERIOD_);
  
})(jQuery);