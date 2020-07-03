function getDateTime(){
    var date = new Date();
 let day = (date.getDate()<10? '0' : '')+date.getDate();
 let month = ((date.getMonth()+ 1)<10? '0':'')+(date.getMonth()+1);
 let year = date.getFullYear();
 let hours = (date.getHours()<10? '0' : '')+date.getHours();
 let minutes = (date.getMinutes()<10? '0' : '')+date.getMinutes();
 let seconds = (date.getSeconds()<10? '0' : '')+date.getSeconds();
 
 return (year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds);
}

function getPrevDateTime(){
 let PrevTime = new Date();
 PrevTime.setMinutes(PrevTime.getMinutes()-5);
 
 let day = (PrevTime.getDate()<10? '0' : '')+PrevTime.getDate();
 let month = ((PrevTime.getMonth()+ 1)<10? '0':'')+(PrevTime.getMonth()+1);
 let year = PrevTime.getFullYear();
 let hours = (PrevTime.getHours()<10? '0' : '')+PrevTime.getHours();
 let minutes = (PrevTime.getMinutes()<10? '0' : '')+PrevTime.getMinutes();
 let seconds = (PrevTime.getSeconds()<10? '0' : '')+PrevTime.getSeconds();
 
 return (year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds);
} 


var sound_status = 1; //Sound ON
var audio = "<audio autoplay loop class=\"audio\" src='/alert_sound.mp3'></audio>";


function executeSetInterval(func, delay){
  func();
  setInterval(func,delay);
}

function drawPieChart(data1, data2, elementId){
	var config = {
    		type: 'doughnut',
            data: {
              labels: ["Remain","Using"],
              datasets: [
                {
                  //label: "Population (millions)",
                  backgroundColor: ["#3cba9f","#c45850"],
                  data: [data2-data1, data1]
                }
              ]
            },
            options: {
              //responsive: true,
              legend: {		
            	 position: 'mid',
              },
              title: {
                display: true,
                text: (data1/data2*100).toFixed(2)+"%"
              }
            }
    }
	new Chart($("."+elementId), config);
}

function changeStatus(){
	
	if(sound_status == 1){ //Sound ON이면
		sound_status = 0; //OFF으로
		document.getElementById('speaker').src='/mute.png'; //mute 이미지로 바꾸기
		
		$(".hlr-container").find(".audio").remove(); //알람 소리 제거
	}
	
	else{ //Sound OFF면
		sound_status = 1; //ON으로
		document.getElementById('speaker').src='/speaker2.png';
		
		if(document.getElementsByClassName("alarm-twinkle").length > 0) 
		{
			$(".hlr-container").append(audio);
		}
	}
	
}


function play_audio(){
	
	if(document.getElementsByClassName("alarm-twinkle").length > 0 && sound_status==1) 
	{
		$(".hlr-container").append(audio);
	}
} 

function pause_audio(){
	$(".hlr-container").find(".audio").remove();
}

/** 2020.03.10 Ajax Function Updates System detail status -MK- */
function ajaxShowHlrDetail(url){
  $.ajax({
    url: url,
    type: "GET"
  })
  .done(function(data){
	var sys_num = $("#inputCurrentSystem").attr("val");
	var json = JSON.parse(data);
	
	//fallback(0)
	var system_namef0 = json.result[0].system_name;
	var building = json.result[0].building;
	var floor_plan = json.result[0].floor_plan;
    var curTps = json.result[0].curTps;
    var totTps = json.result[0].totTps;
	
	//fallback(1)
	var system_namef1 = json.result[1].system_name;
	var system_typef1 = json.result[1].system_type;
    var date = json.result[1].date;
    var time = json.result[1].time;
	var type = json.result[1].type;
	var succ_rate = json.result[1].succ_rate; //timeout_event*1000/succ
	var att = json.result[1].att;  //timeout_event 값
	
	//fallback(2)
    var system_name_f2 = json.result[2].system_name;
    var date_f2 = json.result[2].date;
    var time_f2 = json.result[2].time;
    var sys_sub_name_f2 = json.result[2].sys_sub_name;
    var type_f2 = json.result[2].type;
    var code_f2 = json.result[2].code;
    
    //fallback(3) - 임계치 정보
    var system_f3 = json.result[3].system;
    var th0 = json.result[3].th0; // timeout_event*1000/succ 임계치
    var th1 = json.result[3].th1; //timeout_event 값 임계치
    
    var A_th0; //Active
	var A_th1;
    var BK_th0; //BKUP
	var BK_th1;
    
    system_f3.forEach(function(e,index){
    	if(system_f3[index] == "AHLRCS"){
    		A_th0 = th0[index];
			A_th1 = th1[index];
    	}
    	else if(system_f3[index] == "BKHLRCS"){
    		BK_th0 = th0[index];
			BK_th1 = th1[index];
    	}
    });

	$(".hlr-container").find(".sys-txt-value").remove(); 
	$(".hlr-stat-panel").removeClass("alarm-twinkle");
	
	pause_audio();

	//fallback(0)
	system_namef0.forEach(function(e,index) {
		if(system_namef0[index]==sys_num){
			building = building[index];
			floor_plan = floor_plan[index];  
			curTps = curTps[index];
			totTps = totTps[index];
			
			var locationAddHtml = "<span class='sys-txt-value'>"+building+" "+floor_plan+ "</span>"; 
		    var curTpsAddHtml = "<span class='sys-txt-value'>"+curTps+"</span>";
		    var totTpsAddHtml = "<span class='sys-txt-value'>"+totTps+"</span>";
		    
		    $("#locationContainer").append(locationAddHtml);
		    $("#curHLRTpsContainer").append(curTpsAddHtml);
		    $("#totHLRTpsContainer").append(totTpsAddHtml);
		    
		}
	});
	
	drawPieChart(curTps, totTps, "hlr-chart"); 
	
	//fallback(1, 3)
	//통계 임계치 설정 및 통계 출력
	var s_format_HLR= "<div class=\"col-sm-10 hlr-stat-panel\">"+
	"<div id=\"TMOUTstat\" class=\"hlr-stat-txt\">TMOUT Timeout 건수 </div></div>";
	
	var a_format_HLR= "<div id=\"A1503\" class=\"col-sm-10 hlr-stat-panel\">"+
	"<div class=\"hlr-stat-txt\">STATISTIC DATA ABNORMAL ALARM OCCURRED</div></div>";
	
	
	$(".hlr-container").find(".col-sm-10").remove();
	
	system_namef1.forEach(function(e,index) {
		console.log("1");
		if(system_namef1[index] == sys_num ){
			console.log("2");
			console.log(getPrevDateTime());
			console.log(getDateTime());
			if( getPrevDateTime() < date[index]+" "+time[index] && getDateTime() > date[index]+" "+time[index]){  
				console.log("3");
				if(system_typef1[index] == "A"){
					console.log("4");
					switch(type[index]){
						case "TMOUT" : 
							$(".stat-panel").append(s_format_HLR);
							$(".alarm-panel").append(a_format_HLR);
							$("#TMOUTstat").append("<span class='sys-txt-value'>"+" : "+att[index]+"건</span>");
							if(succ_rate[index] > A_th0 && att[index] > A_th1) //Timeout 비율이 1(임계치)보다 크고 timeout 건수가 40건(임계치)보다 크면
						      	  $("#TMOUTstat").parents(".hlr-stat-panel").addClass("alarm-twinkle");
							break;
					}
				}
				else if(system_typef1[index] == "BK"){
					switch(type[index]){
						case "TMOUT" : 
							$(".stat-panel").append(s_format_HLR);
							$(".alarm-panel").append(a_format_HLR);
							$("#TMOUTstat").append("<span class='sys-txt-value'>"+" : "+att[index]+"건</span>");
							if(succ_rate[index] > BK_th0 && att[index] > BK_th1) //Timeout 비율이 1(임계치)보다 크고 timeout 건수가 40건(임계치)보다 크면
						      	  $("#TMOUTstat").parents(".hlr-stat-panel").addClass("alarm-twinkle");
							break;
					}
				}
			}
		}
	});
	//fallback(2) -- 알람 ON 조건 
	system_name_f2.forEach(function(e,index) {
		if(system_name_f2[index] == sys_num ){
			if(type_f2[index] == "ALARM"){
				switch(code_f2[index]){
					case "A1503":
						$("#A1503").addClass("alarm-twinkle");
						break;
				}
			}
		}
	});
	
	type_f2.forEach(function(e,index) { // Clear 조건
		if(type_f2[index] == "CLEAR" ){
			for(var i=0; i<type_f2.length; i++){
				if(type_f2[i] == "ALARM" && sys_sub_name_f2[index] == sys_sub_name_f2[i] && date[index]+" "+time[index] > date[i]+" "+time[i]){ 
					switch(code_f2[index]){
						case "A1503":
							$("#A1503").removeClass("alarm-twinkle");
							break;
					}
				}
			}
		}
	});
	
	play_audio();
	
  });
 }

(function($){
  "use strict";
  
  const _PERIOD_ = 1000*60;
  
  executeSetInterval(function(){
      ajaxShowHlrDetail("/api/v1/hlr-list/"+$("#inputCurrentSystem").attr("val"));
    }, _PERIOD_);
  
})(jQuery);