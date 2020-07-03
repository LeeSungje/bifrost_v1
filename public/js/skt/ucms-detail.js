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

function changeStatus(){
	
	if(sound_status == 1){ //Sound ON이면
		sound_status = 0; //OFF으로
		document.getElementById('speaker').src='/mute.png'; //mute 이미지로 바꾸기
		
		$(".ucms-container").find(".audio").remove(); //알람 소리 제거
	}
	
	else{ //Sound OFF면
		sound_status = 1; //ON으로
		document.getElementById('speaker').src='/speaker2.png';
		
		if(document.getElementsByClassName("alarm-twinkle").length > 0) 
		{
			$(".ucms-container").append(audio);
		}
	}
	
}


function play_audio(){
	
	if(document.getElementsByClassName("alarm-twinkle").length > 0 && sound_status==1) 
	{
		$(".ucms-container").append(audio);
	}
} 

function pause_audio(){
	$(".ucms-container").find(".audio").remove();
}


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

/** 2020.03.10 Ajax Function Updates System detail status -MK- */
function ajaxShowUcmsDetail(url){
  $.ajax({
    url: url,
    type: "GET"
  })
  .done(function(data){
	var sys_num = $("#inputCurrentSystem").attr("val"); //UCMS
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
	var succ_rate = json.result[1].succ_rate;
	var att = json.result[1].att;
	
	//fallback(2)
    var system_name_f2 = json.result[2].system_name;
    var date_f2 = json.result[2].date;
    var time_f2 = json.result[2].time;
    var sys_sub_name_f2 = json.result[2].sys_sub_name;
    var type_f2 = json.result[2].type;
    var code_f2 = json.result[2].code;
    
    //fallback(3) - 임계치 정보
    var system_f3 = json.result[3].system;
    var th0 = json.result[3].th0; // 카드서비스 성공율 임계치
    var th1 = json.result[3].th1; // BIP개통 성공율 임계치
    var th2 = json.result[3].th2; // POS개통 성공율 임계치
    var th3 = json.result[3].th3; // OTA개통 성공율 임계치
    var th4 = json.result[3].th4; // CDS 성공율 임계치
    var th5 = json.result[3].th5; // 카드서비스 시도호 임계치
    var th6 = json.result[3].th6; // BIP개통 시도호 임계치
    var th7 = json.result[3].th7; // POS개통 시도호 임계치
    var th8 = json.result[3].th8; // OTA개통 시도호 임계치
    var th9 = json.result[3].th9; // CDS 시도호 임계치
    
    var UCMS_th0, UCMS_th1, UCMS_th2, UCMS_th3, UCMS_th4, UCMS_th5, UCMS_th6, UCMS_th7, UCMS_th8, UCMS_th9; 
    
    system_f3.forEach(function(e,index){
    	if(system_f3[index] == "UCMS"){
    		UCMS_th0 = th0[index];
    		UCMS_th1 = th1[index];
    		UCMS_th2 = th2[index];
    		UCMS_th3 = th3[index];
    		UCMS_th4 = th4[index];
    		UCMS_th5 = th5[index];
    		UCMS_th6 = th6[index];
    		UCMS_th7 = th7[index];
    		UCMS_th8 = th8[index];
    		UCMS_th9 = th9[index];
    	}
    });

	$(".ucms-container").find(".sys-txt-value").remove(); 
	$(".ucms-stat-panel").removeClass("alarm-twinkle");
	
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
		    $("#curUcmsTpsContainer").append(curTpsAddHtml);
		    $("#totUcmsTpsContainer").append(totTpsAddHtml);
		    
		}
	});
	
	drawPieChart(curTps, totTps, "ucms-chart"); 
	
	//fallback(1)
	
	//fallback(1, 3)
	//통계 임계치 설정 및 통계 출력
	var s_format_UCMS_CARD= "<div class=\"col-sm-10 ucms-stat-panel\">"+
	"<div id=\"CARDstat\" class=\"ucms-stat-txt\">카드서비스 성공률 </div></div>";
	
    var s_format_UCMS_BIP= "<div class=\"col-sm-10 ucms-stat-panel\">" + 
    "<div id=\"BIPstat\" class=\"ucms-stat-txt\">BIP개통 성공률 </div></div>";

    var s_format_UCMS_POS= "<div class=\"col-sm-10 ucms-stat-panel\">"+
    "<div id=\"POSstat\" class=\"ucms-stat-txt\">POS개통 성공률 </div></div>";

    var s_format_UCMS_OTA= "<div class=\"col-sm-10 ucms-stat-panel\">" + 
    "<div id=\"OTAstat\" class=\"ucms-stat-txt\">OTA개통 성공률 </div></div>";

    var s_format_UCMS_CDS= "<div class=\"col-sm-10 ucms-stat-panel\">" + 
    "<div id=\"CDSstat\" class=\"ucms-stat-txt\">CDS 성공률 </div></div>";
	
	var a_format_UCMS= "<div id=\"Tmp1\" class=\"col-sm-10 ucms-stat-panel\">"+
	"<div class=\"ucms-stat-txt\">INF RELEASED CRI</div></div>"+
    "<div id=\"Tmp2\" class=\"col-sm-10 ucms-stat-panel\">" + 
    "<div class=\"ucms-stat-txt\">STAT_SVC_CARDO CRI-STAT</div></div>"+
    "<div id=\"Tmp3\" class=\"col-sm-10 ucms-stat-panel\">" + 
    "<div class=\"ucms-stat-txt\">STAT_SVC_BIPA UPDATE_BA CRI-STAT</div></div>"+
    "<div id=\"Tmp4\" class=\"col-sm-10 ucms-stat-panel\">" + 
    "<div class=\"ucms-stat-txt\">STAT_SVC_POSW UPDATE_SUBS CRI-STAT</div></div>"+
    "<div id=\"Tmp5\" class=\"col-sm-10 ucms-stat-panel\">" + 
    "<div class=\"ucms-stat-txt\">STAT_CDS CRI-STAT</div></div>"+
    "<div id=\"Tmp6\" class=\"col-sm-10 ucms-stat-panel\">" + 
    "<div class=\"ucms-stat-txt\">OGEVNT ERROR</div></div>";
	
	
	$(".ucms-container").find(".col-sm-10").remove();	
	
	system_namef1.forEach(function(e,index) {
		console.log("1. 시스템명 : "+system_namef1[index]);
		if(system_namef1[index] == sys_num ){
			console.log("2. 시스템명 : "+sys_num + time[index]);
			if( getPrevDateTime() < date[index]+" "+time[index] && getDateTime() > date[index]+" "+time[index]){
				console.log("3. 시스템명 : "+system_namef1[index]);
				if(system_typef1[index] == "A"){
					switch(type[index]){
						case "CARD" : 
							$(".stat-panel").append(s_format_UCMS_CARD);
							$(".alarm-panel").append(a_format_UCMS);
							$("#CARDstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
							if(succ_rate[index] < UCMS_th0 && att[index] > UCMS_th5)
						      	  $("#CARDstat").parents(".ucms-stat-panel").addClass("alarm-twinkle");
							break;
							
						case "BIP" : 
							$(".stat-panel").append(s_format_UCMS_BIP);
							$("#BIPstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
							if(succ_rate[index] < UCMS_th1 && att[index] > UCMS_th6)
						      	  $("#BIPstat").parents(".ucms-stat-panel").addClass("alarm-twinkle");
							break;
							
						case "POS" : 
							$(".stat-panel").append(s_format_UCMS_POS);
							$("#POSstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
							if(succ_rate[index] < UCMS_th2 && att[index] > UCMS_th7)
						      	  $("#POSstat").parents(".ucms-stat-panel").addClass("alarm-twinkle");
							break;
							
						case "OTA" : 
							$(".stat-panel").append(s_format_UCMS_OTA);
							$("#OTAstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
							if(succ_rate[index] < UCMS_th3 && att[index] > UCMS_th8)
						      	  $("#OTAstat").parents(".ucms-stat-panel").addClass("alarm-twinkle");
							break;
						case "CDS" : 
							$(".stat-panel").append(s_format_UCMS_CDS);
							$("#CDSstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
							if(succ_rate[index] < UCMS_th4 && att[index] > UCMS_th9)
						      	  $("#CDSstat").parents(".ucms-stat-panel").addClass("alarm-twinkle");
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
					case "Tmp1":
						$("#Tmp1").addClass("alarm-twinkle");
						break;
					case "Tmp2":
						$("#Tmp2").addClass("alarm-twinkle");
						break;
					case "Tmp3":
						$("#Tmp3").addClass("alarm-twinkle");
						break;
					case "Tmp4":
						$("#Tmp4").addClass("alarm-twinkle");
						break;
					case "Tmp5":
						$("#Tmp5").addClass("alarm-twinkle");
						break;
					case "Tmp6":
						$("#Tmp6").addClass("alarm-twinkle");
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
						case "Tmp1":
							$("#Tmp1").removeClass("alarm-twinkle");
							break;
						case "Tmp2":
							$("#Tmp2").removeClass("alarm-twinkle");
							break;
						case "Tmp3":
							$("#Tmp3").removeClass("alarm-twinkle");
							break;
						case "Tmp4":
							$("#Tmp4").removeClass("alarm-twinkle");
							break;
						case "Tmp5":
							$("#Tmp5").removeClass("alarm-twinkle");
							break;
						case "Tmp6":
							$("#Tmp6").removeClass("alarm-twinkle");
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
      ajaxShowUcmsDetail("/api/v1/ucms-detail");
    }, _PERIOD_);
  
})(jQuery);