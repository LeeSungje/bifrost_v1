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
		
		$(".tas-container").find(".audio").remove(); //알람 소리 제거
	}
	
	else{ //Sound OFF면
		sound_status = 1; //ON으로
		document.getElementById('speaker').src='/speaker2.png';
		
		if(document.getElementsByClassName("alarm-twinkle").length > 0) 
		{
			$(".tas-container").append(audio);
		}
	}
	
}


function play_audio(){
	
	if(document.getElementsByClassName("alarm-twinkle").length > 0 && sound_status==1) 
	{
		$(".tas-container").append(audio);
	}
} 

function pause_audio(){
	$(".tas-container").find(".audio").remove();
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
                  data: [data2-data1, data2]
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
/** 2020.05.12 Ajax Function Updates System detail status -MK- */
function ajaxShowTASDetail(url){
  $.ajax({
    url: url,
    type: "GET"
  })
  .done(function(data){
	var sys_num = $("#inputCurrentSystem").attr("val");
	var json = JSON.parse(data);
	 
	//fallback(0) 상면, 가입자수 DATA Query
	var system_namef0 = json.result[0].system_name;
	var zone = json.result[0].zone;
	var building = json.result[0].building;
	var floor_plan = json.result[0].floor_plan;
    var curSub = json.result[0].curSub;
    var totSub = json.result[0].totSub;
	
	//fallback(1) 통계 DATA Query
	var system_namef1 = json.result[1].system_name;
	var zonef1 = json.result[1].zone;
    var date = json.result[1].date;
    var time = json.result[1].time;
	var type = json.result[1].type;
	var succ_rate = json.result[1].succ_rate;
	var att = json.result[1].att;
	
	//fallback(2) 알람 data Query
    var system_name_f2 = json.result[2].system_name;
    var date_f2 = json.result[2].date;
    var time_f2 = json.result[2].time;
    var sys_sub_name_f2 = json.result[2].sys_sub_name;
    var type_f2 = json.result[2].type;
    var code_f2 = json.result[2].code;
    
    console.log(json.result[2]);
    
    //fallback(3) - 임계치 정보
    var system_f3 = json.result[3].system;
    var th0 = json.result[3].th0; // DNS 성공율 임계치
    var th1 = json.result[3].th1; // CSR 성공율 임계치
    var th2 = json.result[3].th2; // MBR 성공율 임계치
    var th3 = json.result[3].th3; // OCS 성공율 임계치
    var th4 = json.result[3].th4; // DNS 시도호 임계치
    var th5 = json.result[3].th5; // CSR 시도호 임계치
    var th6 = json.result[3].th6; // MBR 시도호 임계치
    var th7 = json.result[3].th7; // OCS 시도호 임계치
    
    var T_th0, T_th1, T_th2, T_th3, T_th4, T_th5, T_th6, T_th7;
    
    system_f3.forEach(function(e,index){
    	if(system_f3[index] == "TAS"){
    		T_th0 = th0[index];
    		T_th1 = th1[index];
    		T_th2 = th2[index];
    		T_th3 = th3[index];
    		T_th4 = th4[index];
    		T_th5 = th5[index];
    		T_th6 = th6[index];
    		T_th7 = th7[index];
    	}
    });
    
	$(".tas-container").find(".sys-txt-value").remove(); 
	$(".tas-stat-panel").removeClass("alarm-twinkle");
	
	pause_audio();

	//fallback(0)
	system_namef0.forEach(function(e,index) {
		if(system_namef0[index]==sys_num){
			building = building[index];
			floor_plan = floor_plan[index];  
			curSub = curSub[index];
			totSub = totSub[index];
			
			var locationAddHtml = "<span class='sys-txt-value'>"+building+" "+floor_plan+ "</span>"; 
		    var curSubAddHtml = "<span class='sys-txt-value'>"+curSub+"</span>";
		    var totSubAddHtml = "<span class='sys-txt-value'>"+totSub+"</span>";
		    
		    $("#locationContainer").append(locationAddHtml);
		    $("#curTASSubContainer").append(curSubAddHtml);
		    $("#totTASSubContainer").append(totSubAddHtml);
		    
		}
	});
	
	drawPieChart(curSub, totSub, "tas-chart"); 
	
	//fallback(1, 3)
	//통계 임계치 설정 및 통계 출력
	system_namef1.forEach(function(e,index) {
		if(system_namef1[index] == sys_num ){
			if( getPrevDateTime() < date[index]+" "+time[index] && getDateTime() > date[index]+" "+time[index]){
					switch(type[index]){
						case "REGI" : 
							$("#REGIstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
							if(succ_rate[index] < T_th0 && att[index] > T_th4){
						      	  $("#REGIstat").parents(".tas-stat-panel").addClass("alarm-twinkle");
						      	  //insertStatData(system_namef1[index], succ_rate[index]);
							}
							break;
						case "ORIG" : //발신INVITE성공율
							$("#OISstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
							if(succ_rate[index] < T_th1 && att[index] > T_th5){
						      	  $("#OISstat").parents(".tas-stat-panel").addClass("alarm-twinkle");
							}
							break;
						case "TERM" : //착신INVITE성공율
							$("#TISstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
							if(succ_rate[index] < T_th2 && att[index] > T_th6){
						      	  $("#TISstat").parents(".tas-stat-panel").addClass("alarm-twinkle");
							}
							break;
						
					}
			}
		}
	});
	//fallback(2) -- 알람 ON 조건 
	system_name_f2.forEach(function(e,index) {
		if(system_name_f2[index] == sys_num ){
			if(type_f2[index] == "ALARM"){
				switch(code_f2[index]){
					case "A1251":
						$("#A1251").addClass("alarm-twinkle");
						break;
					case "A34013":
						$("#A34013").addClass("alarm-twinkle");
						break;
					case "A5401":
						$("#A5401").addClass("alarm-twinkle");
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
					case "A1251":
						$("#A1251").removeClass("alarm-twinkle");
						break;
					case "A34013":
						$("#A34013").removeClass("alarm-twinkle");
						break;
					case "A5401":
						$("#A5401").removeClass("alarm-twinkle");
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
	      ajaxShowTASDetail("/api/v1/tas-list/"+$("#inputCurrentSystem").attr("val"));
	    }, _PERIOD_);
	  
	})(jQuery);