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
		
		$(".mmeList-container").find(".audio").remove(); //알람 소리 제거
	}
	
	else{ //Sound OFF면
		sound_status = 1; //ON으로
		document.getElementById('speaker').src='/speaker2.png';
		
		if(document.getElementsByClassName("alarm-twinkle").length > 0) 
		{
			$(".mmeList-container").append(audio);
		}
	}
	
}


function play_audio(){
	
	if(document.getElementsByClassName("alarm-twinkle").length > 0 && sound_status==1) 
	{
		$(".mmeList-container").append(audio);
	}
} 

function pause_audio(){
	$(".mmeList-container").find(".audio").remove();
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
    var curSub = json.result[0].curSub;
    var totSub = json.result[0].totSub;
    
    console.log(json.result[0]);
    
    //fallback(1)
    var curCenterCnt = json.result[1].curCenterCnt;
	var totCenterCnt = json.result[1].totCenterCnt;
	var curCenterSub = Math.round(json.result[1].curCenterSub/10000);
	var totCenterSub = Math.round(json.result[1].totCenterSub/10000);
	
    var curEastCnt = json.result[3].curEastCnt;
	var totEastCnt = json.result[3].totEastCnt;
	var curEastSub = Math.round(json.result[3].curEastSub/10000);
	var totEastSub = Math.round(json.result[3].totEastSub/10000);

    var curngCnt = json.result[4].curngCnt;
	var totngCnt = json.result[4].totngCnt;
	var curngSub = Math.round(json.result[4].curngSub/10000);
	var totngSub = Math.round(json.result[4].totngSub/10000);
	//fallback(2)
	var rm_sys_name = json.result[2].system_name;
	
    $(".mmeList-container").find(".sys-detail-value").remove();   
    $(".sys-detail-box").removeClass("alarm-twinkle");
    
	pause_audio();

    //fallback(0)
    system_type.forEach(function(e,index){
		if(system_type[index] == 'C'){
	      $("#system-name-C").attr('id', "system-name-C"+system_name[index]);
	      $("#curSysSubContainerC").attr('id', "curSysSubContainerC"+system_name[index]);
	      $("#totSysSubContainerC").attr('id', "totSysSubContainerC"+system_name[index]);
	      
	      $("#system-name-C"+system_name[index]).parents(".sys-detail-box").attr("onclick", "location.href=\"/mme-list/" + system_name[index]+"\"" );
	   
	      var system_nameAddHtml = "<span class='sys-detail-value'>"+system_name[index]+"</span>"; 
	      var curSubAddHtml = "<span class='sys-detail-value'>"+curSub[index]+"</span>";
	      var totSubAddHtml = "<span class='sys-detail-value'>"+totSub[index]+"</span>";
	      $("#system-name-C"+system_name[index]).append(system_nameAddHtml);
	      $("#curSysSubContainerC"+system_name[index]).append(curSubAddHtml);
	      $("#totSysSubContainerC"+system_name[index]).append(totSubAddHtml);
		}
		else if(system_type[index] == 'E'){
	      $("#system-name-E").attr('id', "system-name-E"+system_name[index]);
	      $("#curSysSubContainerE").attr('id', "curSysSubContainerE"+system_name[index]);
	      $("#totSysSubContainerE").attr('id', "totSysSubContainerE"+system_name[index]);
	      
	      $("#system-name-E"+system_name[index]).parents(".sys-detail-box").attr("onclick", "location.href=\"/mme-list/" + system_name[index]+"\"" );
	   
	      var system_nameAddHtml = "<span class='sys-detail-value'>"+system_name[index]+"</span>"; 
	      var curSubAddHtml = "<span class='sys-detail-value'>"+curSub[index]+"</span>";
	      var totSubAddHtml = "<span class='sys-detail-value'>"+totSub[index]+"</span>";
	      $("#system-name-E"+system_name[index]).append(system_nameAddHtml);
	      $("#curSysSubContainerE"+system_name[index]).append(curSubAddHtml);
	      $("#totSysSubContainerE"+system_name[index]).append(totSubAddHtml);
		}
		else if(system_type[index] == 'G'){
		  $("#system-name-G").attr('id', "system-name-G"+system_name[index]);
		  $("#curSysSubContainerG").attr('id', "curSysSubContainerG"+system_name[index]);
		  $("#totSysSubContainerG").attr('id', "totSysSubContainerG"+system_name[index]);
		      
		  $("#system-name-G"+system_name[index]).parents(".sys-detail-box").attr("onclick", "location.href=\"/mme-list/" + system_name[index]+"\"" );
		   
		  var system_nameAddHtml = "<span class='sys-detail-value'>"+system_name[index]+"</span>"; 
		  var curSubAddHtml = "<span class='sys-detail-value'>"+curSub[index]+"</span>";
		  var totSubAddHtml = "<span class='sys-detail-value'>"+totSub[index]+"</span>";
		  $("#system-name-G"+system_name[index]).append(system_nameAddHtml);
		  $("#curSysSubContainerG"+system_name[index]).append(curSubAddHtml);
		  $("#totSysSubContainerG"+system_name[index]).append(totSubAddHtml);
		}
    });
    //fallback(1)
    var curcentermmeCntAddHtml = "<span class='sys-detail-value'>"+curCenterCnt+"</span>"; 
    var totcentermmeCntAddHtml = "<span class='sys-detail-value'>"+totCenterCnt+"</span>";
    var curcentermmeSubAddHtml = "<span class='sys-detail-value'>"+curCenterSub+"</span>";
    var totcentermmeSubAddHtml = "<span class='sys-detail-value'>"+totCenterSub+"</span>";
    $("#curCentermmecnt").append(curcentermmeCntAddHtml);
    $("#totCentermmecnt").append(totcentermmeCntAddHtml);
    $("#curCentermmeSub").append(curcentermmeSubAddHtml);
    $("#totCentermmeSub").append(totcentermmeSubAddHtml);

    //fallback(3)
    var curEastmmecntAddHtml = "<span class='sys-detail-value'>"+curEastCnt+"</span>"; 
    var totEastmmecntAddHtml = "<span class='sys-detail-value'>"+totEastCnt+"</span>";
    var curEastmmeSubAddHtml = "<span class='sys-detail-value'>"+curEastSub+"</span>";
    var totEastmmeSubAddHtml = "<span class='sys-detail-value'>"+totEastSub+"</span>";
    $("#curEastmmecnt").append(curEastmmecntAddHtml);
    $("#totEastmmecnt").append(totEastmmecntAddHtml);
    $("#curEastmmeSub").append(curEastmmeSubAddHtml);
    $("#totEastmmeSub").append(totEastmmeSubAddHtml);
    //    fallback(4)
    var curngmmecntAddHtml = "<span class='sys-detail-value'>"+curngCnt+"</span>"; 
    var totngmmecntAddHtml = "<span class='sys-detail-value'>"+totngCnt+"</span>";
    var curngmmeSubAddHtml = "<span class='sys-detail-value'>"+curngSub+"</span>";
    var totngmmeSubAddHtml = "<span class='sys-detail-value'>"+totngSub+"</span>";
    $("#curngmmecnt").append(curngmmecntAddHtml);
    $("#totngmmecnt").append(totngmmecntAddHtml);
    $("#curngmmeSub").append(curngmmeSubAddHtml);
    $("#totngmmeSub").append(totngmmeSubAddHtml);
    
    //fallback(2) -- 알람 표시
    for(var index in rm_sys_name){
        var statusClass = "";
        var statusText = "";

        if(rm_sys_name[index] != null){ 
      	  $("#system-name-C"+rm_sys_name[index]).parents(".sys-detail-box").addClass("alarm-twinkle");
      	  $("#system-name-E"+rm_sys_name[index]).parents(".sys-detail-box").addClass("alarm-twinkle");
      	  $("#system-name-G"+rm_sys_name[index]).parents(".sys-detail-box").addClass("alarm-twinkle");
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
	  ajaxShowSystemDetail("/api/v1/mme-list");
    }, _PERIOD_);
  
})(jQuery);