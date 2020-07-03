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
		
		$(".tasList-container").find(".audio").remove(); //알람 소리 제거
	}
	
	else{ //Sound OFF면
		sound_status = 1; //ON으로
		document.getElementById('speaker').src='/speaker2.png';
		
		if(document.getElementsByClassName("alarm-twinkle").length > 0) 
		{
			$(".tasList-container").append(audio);
		}
	}
	
}


function play_audio(){
	
	if(document.getElementsByClassName("alarm-twinkle").length > 0 && sound_status==1) 
	{
		$(".tasList-container").append(audio);
	}
} 

function pause_audio(){
	$(".tasList-container").find(".audio").remove();
}


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
	    var zone = json.result[0].zone;
	    var curSub = json.result[0].curSub;
	    var totSub = json.result[0].totSub;
	    
	    console.log(json.result[1]);
	    
	    
	    //fallback(1) Zone별 요약 정보
	    var curACnt = json.result[1].curACnt;
		var totACnt = json.result[1].totACnt;
		var curASub = Math.round(json.result[1].curASub/10000);
		var totASub = Math.round(json.result[1].totASub/10000);
		
		var curBCnt = json.result[2].curBCnt;
		var totBCnt = json.result[2].totBCnt;
		var curBSub = Math.round(json.result[2].curBSub/10000);
		var totBSub = Math.round(json.result[2].totBSub/10000);
		
		var curBKCnt = json.result[3].curBKCnt;
		var totBKCnt = json.result[3].totBKCnt;
		var curBKSub = Math.round(json.result[3].curBKSub/10000);
		var totBKSub = Math.round(json.result[3].totBKSub/10000);
		
		
		//fallback(4) 알람 표시
		var rm_sys_name = json.result[4].system_name;
		
	    $(".tasList-container").find(".sys-detail-value").remove();   
	    $(".tasList-container").find(".col-sm-4").remove();
	    $(".sys-detail-box").removeClass("alarm-twinkle");

		pause_audio();

	    //fallback(0)
	    system_type.forEach(function(e,index){
			if(zone[index] == 'A'){
				  var format_html= "<div class=\"col-sm-4 sys-detail-container\">"+
					"<div class=\"sys-detail-box align-middle\">"+
				    "<div id=\"system-name-A\" class=\"sys-detail-name\"></div>"+
				    "<span id=\"curSysSubContainerA\"></span>" +
				    "<span class=\"sys-detail-delimiter\">&nbsp/&nbsp</span>" + 
				    "<span id=\"totSysSubContainerA\"></span></div>";
				  
				  $("#azone").append(format_html);
					
			      $("#system-name-A").attr('id', "system-name-A"+system_name[index]);
			      $("#curSysSubContainerA").attr('id', "curSysSubContainerA"+system_name[index]);
			      $("#totSysSubContainerA").attr('id', "totSysSubContainerA"+system_name[index]);
			      
			      $("#system-name-A"+system_name[index]).parents(".sys-detail-box").attr("onclick", "location.href=\"/tas-list/" + system_name[index]+"\"" );
			   
			      var system_nameAddHtml = "<span class='sys-detail-value'>"+system_name[index]+"</span>"; 
			      var curSubAddHtml = "<span class='sys-detail-value'>"+curSub[index]+"</span>";
			      var totSubAddHtml = "<span class='sys-detail-value'>"+totSub[index]+"만</span>";
			      $("#system-name-A"+system_name[index]).append(system_nameAddHtml);
			      $("#curSysSubContainerA"+system_name[index]).append(curSubAddHtml);
			      $("#totSysSubContainerA"+system_name[index]).append(totSubAddHtml);
			}
			else if(zone[index] == 'B'){
				  var format_html= "<div class=\"col-sm-4 sys-detail-container\">"+
					"<div class=\"sys-detail-box align-middle\">"+
				    "<div id=\"system-name-B\" class=\"sys-detail-name\"></div>"+
				    "<span id=\"curSysSubContainerB\"></span>" +
				    "<span class=\"sys-detail-delimiter\">&nbsp/&nbsp</span>" + 
				    "<span id=\"totSysSubContainerB\"></span></div>";
			
				  $("#bzone").append(format_html);
				
			      $("#system-name-B").attr('id', "system-name-B"+system_name[index]);
			      $("#curSysSubContainerB").attr('id', "curSysSubContainerB"+system_name[index]);
			      $("#totSysSubContainerB").attr('id', "totSysSubContainerB"+system_name[index]);
			      
			      $("#system-name-B"+system_name[index]).parents(".sys-detail-box").attr("onclick", "location.href=\"/tas-list/" + system_name[index]+"\"" );
			   
			      var system_nameAddHtml = "<span class='sys-detail-value'>"+system_name[index]+"</span>"; 
			      var curSubAddHtml = "<span class='sys-detail-value'>"+curSub[index]+"</span>";
			      var totSubAddHtml = "<span class='sys-detail-value'>"+totSub[index]+"만</span>";
			      $("#system-name-B"+system_name[index]).append(system_nameAddHtml);
			      $("#curSysSubContainerB"+system_name[index]).append(curSubAddHtml);
			      $("#totSysSubContainerB"+system_name[index]).append(totSubAddHtml);
			}
			else if(zone[index] == 'BK'){
				  var format_html= "<div class=\"col-sm-4 sys-detail-container\">"+
					"<div class=\"sys-detail-box align-middle\">"+
				    "<div id=\"system-name-BK\" class=\"sys-detail-name\"></div>"+
				    "<span id=\"curSysSubContainerBK\"></span>" +
				    "<span class=\"sys-detail-delimiter\">&nbsp/&nbsp</span>" + 
				    "<span id=\"totSysSubContainerBK\"></span></div>";
			
				  $("#bkzone").append(format_html);
				
			      $("#system-name-BK").attr('id', "system-name-BK"+system_name[index]);
			      $("#curSysSubContainerBK").attr('id', "curSysSubContainerBK"+system_name[index]);
			      $("#totSysSubContainerBK").attr('id', "totSysSubContainerBK"+system_name[index]);
			      
			      $("#system-name-BK"+system_name[index]).parents(".sys-detail-box").attr("onclick", "location.href=\"/tas-list/" + system_name[index]+"\"" );
			   
			      var system_nameAddHtml = "<span class='sys-detail-value'>"+system_name[index]+"</span>"; 
			      var curSubAddHtml = "<span class='sys-detail-value'>"+curSub[index]+"</span>";
			      var totSubAddHtml = "<span class='sys-detail-value'>"+totSub[index]+"만</span>";
			      $("#system-name-BK"+system_name[index]).append(system_nameAddHtml);
			      $("#curSysSubContainerBK"+system_name[index]).append(curSubAddHtml);
			      $("#totSysSubContainerBK"+system_name[index]).append(totSubAddHtml);
			}
	    });
	    
	    
	    //fallback(1)
	    var curAcntAddHtml = "<span class='sys-detail-value'>"+curACnt+"</span>"; 
	    var totAcntAddHtml = "<span class='sys-detail-value'>"+totACnt+"</span>";
	    var curASubAddHtml = "<span class='sys-detail-value'>"+curASub+"</span>";
	    var totASubAddHtml = "<span class='sys-detail-value'>"+totASub+"</span>";
	    $("#curATAScnt").append(curAcntAddHtml);
	    $("#totATAScnt").append(totAcntAddHtml);
	    $("#curATASSub").append(curASubAddHtml);
	    $("#totATASSub").append(totASubAddHtml);
	    
	    
	    console.log(curBCnt,totBCnt);
	    var curBcntAddHtml = "<span class='sys-detail-value'>"+curBCnt+"</span>"; 
	    var totBcntAddHtml = "<span class='sys-detail-value'>"+totBCnt+"</span>";
	    var curBSubAddHtml = "<span class='sys-detail-value'>"+curBSub+"</span>";
	    var totBSubAddHtml = "<span class='sys-detail-value'>"+totBSub+"</span>";
	    $("#curBTAScnt").append(curBcntAddHtml);
	    $("#totBTAScnt").append(totBcntAddHtml);
	    $("#curBTASSub").append(curBSubAddHtml);
	    $("#totBTASSub").append(totBSubAddHtml);
	    
	    var curBKcntAddHtml = "<span class='sys-detail-value'>"+curBKCnt+"</span>"; 
	    var totBKcntAddHtml = "<span class='sys-detail-value'>"+totBKCnt+"</span>";
	    var curBKSubAddHtml = "<span class='sys-detail-value'>"+curBKSub+"</span>";
	    var totBKSubAddHtml = "<span class='sys-detail-value'>"+totBKSub+"</span>";
	    $("#curBKTAScnt").append(curBKcntAddHtml);
	    $("#totBKTAScnt").append(totBKcntAddHtml);
	    $("#curBKTASSub").append(curBKSubAddHtml);
	    $("#totBKTASSub").append(totBKSubAddHtml);
	    
	    //fallback(4) -- 알람 표시
	    for(var index in rm_sys_name){
	        var statusClass = "";
	        var statusText = "";

	        if(rm_sys_name[index] != null){ 
	      	  $("#system-name-A"+rm_sys_name[index]).parents(".sys-detail-box").addClass("alarm-twinkle");
	      	  $("#system-name-B"+rm_sys_name[index]).parents(".sys-detail-box").addClass("alarm-twinkle");
	          $("#system-name-BK"+rm_sys_name[index]).parents(".sys-detail-box").addClass("alarm-twinkle");
	        }
	        
	        //$("#skt-map-center-"+site).find(".skt-map-status-btn").text(statusText);

	      }

		pause_audio();

	  });
 }
(function($){
	  "use strict";
	  
	  const _PERIOD_ = 1000*60;
	  
	  executeSetInterval(function(){
		  //console.log($("#inputCurrentSystem").attr("val"));
	      //ajaxShowSystemDetail("/api/v1/system-detail/"+$("#inputCurrentSystem").attr("val"));
		  ajaxShowSystemDetail("/api/v1/tas-list");
	    }, _PERIOD_);
	  
	})(jQuery);