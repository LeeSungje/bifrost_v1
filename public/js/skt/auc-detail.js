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
		
		$(".auc-container").find(".audio").remove(); //알람 소리 제거
	}
	
	else{ //Sound OFF면
		sound_status = 1; //ON으로
		document.getElementById('speaker').src='/speaker2.png';
		
		if(document.getElementsByClassName("alarm-twinkle").length > 0) 
		{
			$(".auc-container").append(audio);
		}
	}
	
}


function play_audio(){
	
	if(document.getElementsByClassName("alarm-twinkle").length > 0 && sound_status==1) 
	{
		$(".auc-container").append(audio);
	}
} 

function pause_audio(){
	$(".auc-container").find(".audio").remove();
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
function ajaxShowAuCDetail(url){
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
	var auc_numf1 = json.result[1].auc_num;
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
    var th0 = json.result[3].th0; // DAI 성공율 임계치(AUC21,25)
    var th1 = json.result[3].th1; // SAI 성공율 임계치(AUC21,25)
	var th2 = json.result[3].th2; // DAI 성공율 임계치(AUC22) --> AUC22는 임계치 값 높아서 AUC21과 다른 값 가져옴
    var th3 = json.result[3].th3; // SAI 성공율 임계치(AUC22)
    var th4 = json.result[3].th4; // DAI 시도호 임계치
    var th5 = json.result[3].th5; // SAI 시도호 임계치
    
    var A21_th0, A21_th1, A21_th4, A21_th5; // AuC#21
    var A22_th2, A22_th3, A22_th4, A22_th5; // AuC#22
    var A25_th0, A25_th1, A25_th4, A25_th5; // AuC#25
    
    system_f3.forEach(function(e,index){
    	if(system_f3[index] == "AUC21"){
    		A21_th0 = th0[index];
    		A21_th1 = th1[index];
    		A21_th4 = th4[index];
    		A21_th5 = th5[index];
    	}
    	else if(system_f3[index] == "AUC22"){
    		A22_th2 = th2[index];
    		A22_th3 = th3[index];
    		A22_th4 = th4[index];
    		A22_th5 = th5[index];
    	}
    	else if(system_f3[index] == "AUC25"){
    		A25_th0 = th0[index];
    		A25_th1 = th1[index];
    		A25_th4 = th4[index];
    		A25_th5 = th5[index];
    	}
    });

	$(".auc-container").find(".sys-txt-value").remove(); 
	$(".auc-stat-panel").removeClass("alarm-twinkle");
	
	pause_audio();
    //$(".auc-container").find(".audio").remove();

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
		    $("#curAuCTpsContainer").append(curTpsAddHtml);
		    $("#totAuCTpsContainer").append(totTpsAddHtml);
		    
		}
	});
	
	drawPieChart(curTps, totTps, "auc-chart"); 
	
	//fallback(1)
	
	//fallback(1, 3)
	//통계 임계치 설정 및 통계 출력
	var s_format_AUC_DAI= "<div class=\"col-sm-10 auc-stat-panel\">"+
	"<div id=\"DAIstat\" class=\"auc-stat-txt\">DAI 성공률 </div></div>";
	
	var s_format_AUC_SAI="<div class=\"col-sm-10 auc-stat-panel\">" + 
    "<div id=\"SAIstat\" class=\"auc-stat-txt\">SAI 성공률 </div></div>";
	
	var a_format_AUC= "<div id=\"A1502_DAI\" class=\"col-sm-10 auc-stat-panel\">"+
	"<div class=\"auc-stat-txt\">[DAI_SUCC] STATISTIC DATA ABNORMAL ALARM</div></div>"+
    "<div id=\"A1502_SAI\" class=\"col-sm-10 auc-stat-panel\">" + 
    "<div class=\"auc-stat-txt\">[SAI_SUCC] STATISTIC DATA ABNORMAL ALARM</div></div>";
	
	
	$(".auc-container").find(".col-sm-10").remove();	
	
	system_namef1.forEach(function(e,index) {
		//console.log("1. 시스템명 : "+system_namef1[index]);
		if(system_namef1[index] == sys_num ){
			//console.log("2. 시스템명 : "+sys_num);
			if( getPrevDateTime() < date[index]+" "+time[index] && getDateTime() > date[index]+" "+time[index]){
				//console.log("3. 시스템명 : "+system_namef1[index]);
				if(auc_numf1[index] == "21"){
					//console.log("4. 시스템 번호 : "+auc_numf1[index]);
					switch(type[index]){
						case "DAI" : 
							$(".stat-panel").append(s_format_AUC_DAI);
							$(".alarm-panel").append(a_format_AUC);
							$("#DAIstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
							if(succ_rate[index] < A21_th0 && att[index] > A21_th4)
						      	  $("#DAIstat").parents(".auc-stat-panel").addClass("alarm-twinkle");
							break;
						case "SAI" : 
							$(".stat-panel").append(s_format_AUC_SAI);
							$("#SAIstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
							if(succ_rate[index] < A21_th1 && att[index] > A21_th5)
						      	  $("#SAIstat").parents(".auc-stat-panel").addClass("alarm-twinkle");
							break;
					}
				}
				else if(auc_numf1[index] == "22"){
					switch(type[index]){
						case "DAI" : 
							$(".stat-panel").append(s_format_AUC_DAI);
							$(".alarm-panel").append(a_format_AUC);
							$("#DAIstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
							if(succ_rate[index] < A22_th2 && att[index] > A22_th4)
						      	  $("#DAIstat").parents(".auc-stat-panel").addClass("alarm-twinkle");
							break;
						case "SAI" : 
							$(".stat-panel").append(s_format_AUC_SAI);
							$("#SAIstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
							if(succ_rate[index] < A22_th3 && att[index] > A22_th5)
						      	  $("#SAIstat").parents(".auc-stat-panel").addClass("alarm-twinkle");
							break;
					}
				}
				else if(auc_num[index] == "25"){
					switch(type[index]){
						case "DAI" : 
							$(".stat-panel").append(s_format_AUC_DAI);
							$(".alarm-panel").append(a_format_AUC);
							$("#DAIstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
							if(succ_rate[index] < A25_th0 && att[index] > A25_th4)
						      	  $("#DAIstat").parents(".auc-stat-panel").addClass("alarm-twinkle");
							break;
						case "SAI" : 
							$(".stat-panel").append(s_format_AUC_SAI);
							$("#SAIstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
							if(succ_rate[index] < A25_th1 && att[index] > A25_th5)
						      	  $("#SAIstat").parents(".auc-stat-panel").addClass("alarm-twinkle");
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
					case "A1502_DAI":
						$("#A1502_DAI").addClass("alarm-twinkle");
						break;
					case "A1502_SAI":
						$("#A1502_SAI").addClass("alarm-twinkle");
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
						case "A1502_DAI":
							$("#A1502_DAI").removeClass("alarm-twinkle");
							break;
						case "A1502_SAI":
							$("#A1502_SAI").removeClass("alarm-twinkle");
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
      ajaxShowAuCDetail("/api/v1/auc-list/"+$("#inputCurrentSystem").attr("val"));
    }, _PERIOD_);
  
})(jQuery);