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
		
		$(".sgw-container").find(".audio").remove(); //알람 소리 제거
	}
	
	else{ //Sound OFF면
		sound_status = 1; //ON으로
		document.getElementById('speaker').src='/speaker2.png';
		
		if(document.getElementsByClassName("alarm-twinkle").length > 0) 
		{
			$(".sgw-container").append(audio);
		}
	}
	
}


function play_audio(){
	
	if(document.getElementsByClassName("alarm-twinkle").length > 0 && sound_status==1) 
	{
		$(".sgw-container").append(audio);
	}
} 

function pause_audio(){
	$(".sgw-container").find(".audio").remove();
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
function ajaxShowPgwDetail(url){
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
    var curSess = json.result[0].curSess;
    var totSess = json.result[0].totSess;
	var curBps = json.result[0].curBps;
	var totBps = json.result[0].totBps;
	
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
    
    console.log(json.result[2]);
    
    //fallback(3) - 임계치 정보
    var system_f3 = json.result[3].system;
    var th0 = json.result[3].th0; // CSR 성공율 임계치
    var th1 = json.result[3].th1; // MBR 성공율 임계치
    var th2 = json.result[3].th2; // CSR 시도율 임계치
    var th3 = json.result[3].th3; // MBR 시도율 임계치

    
    var L_th0, L_th1, L_th2, L_th3;
    var V_th0, V_th1, V_th2, V_th3;
    var S_th0, S_th1, S_th2, S_th3;
    
    system_f3.forEach(function(e,index){
    	if(system_f3[index] == "LSGW"){
    		L_th0 = th0[index];
    		L_th1 = th1[index];
    		L_th2 = th2[index];
    		L_th3 = th3[index];
    	}
    	else if(system_f3[index] == "SSGW"){
    		S_th0 = th0[index];
    		S_th1 = th1[index];
    		S_th2 = th2[index];
    		S_th3 = th3[index];
    	}    
    	else if(system_f3[index] == "VSGW"){
    		V_th0 = th0[index];
    		V_th1 = th1[index];
    		V_th2 = th2[index];
    		V_th3 = th3[index];
    	}
    });
    
	$(".sgw-container").find(".sys-txt-value").remove(); 
	$(".sgw-stat-panel").removeClass("alarm-twinkle");
	
	pause_audio();

	//fallback(0)
	system_namef0.forEach(function(e,index) {
		if(system_namef0[index]==sys_num){
			building = building[index];
			floor_plan = floor_plan[index];  
			curSess = curSess[index];
			totSess = totSess[index];
			curBps = curBps[index];
			totBps = totBps[index];
			
			var locationAddHtml = "<span class='sys-txt-value'>"+building+" "+floor_plan+ "</span>"; 
		    var curBpsAddHtml = "<span class='sys-txt-value'>"+curBps+"</span>"; 
		    var totBpsAddHtml = "<span class='sys-txt-value'>"+totBps+"</span>";
		    var curSessAddHtml = "<span class='sys-txt-value'>"+curSess+"</span>";
		    var totSessAddHtml = "<span class='sys-txt-value'>"+totSess+"</span>";
		    
		    $("#locationContainer").append(locationAddHtml);
		    $("#curSGWSesContainer").append(curSessAddHtml);
		    $("#totSGWSesContainer").append(totSessAddHtml);
		    $("#curSGWBpsContainer").append(curBpsAddHtml);
		    $("#totSGWBpsContainer").append(totBpsAddHtml);
		    
		}
	});
	
	drawPieChart(curSess, totSess, "sgw-chart"); 
	
	//fallback(1, 3)
	//통계 임계치 설정 및 통계 출력
	var s_format_SGW= "<div class=\"col-sm-10 sgw-stat-panel\">"+
	"<div id=\"CSRstat\" class=\"sgw-stat-txt\">CSR 성공률 </div></div>"+
    "<div class=\"col-sm-10 sgw-stat-panel\">"+
    "<div id=\"MBRstat\" class=\"sgw-stat-txt\">MBR 성공률 </div></div>";
	
	var a_format_ESGW= "<div id=\"A5100\" div class=\"col-sm-10 sgw-stat-panel\">"+
	"<div class=\"sgw-stat-txt\">COMPONENT TERMINATION ALARM</div></div>"+
    "<div id=\"A5110\" class=\"col-sm-10 sgw-stat-panel\">"+
    "<div class=\"sgw-stat-txt\">NODE TERMINATION ALARM</div></div>" +
    "<div id=\"A6800\" class=\"col-sm-10 sgw-stat-panel\">" + 
    "<div class=\"sgw-stat-txt\">UP CORE DEATH ALARM</div></div>"+
    "<div id=\"A6852\" class=\"col-sm-10 sgw-stat-panel\">" + 
    "<div class=\"sgw-stat-txt\">FP PACKET BUFFER CRITICAL ALARM</div></div>";
	
	var a_format_vESGW= "<div id=\"A4111\" class=\"col-sm-10 sgw-stat-panel\">"+
	"<div class=\"sgw-stat-txt\">Active Function Failed</div></div>";
	
	
	var a_format_SSGW= "<div id=\"A1000\" class=\"col-sm-10 sgw-stat-panel\">"+
	"<div class=\"sgw-stat-txt\">ALL_SYS_DN</div></div>"+
	"<div id=\"A1505\" class=\"col-sm-10 sgw-stat-panel\">" + 
    "<div class=\"sgw-stat-txt\">FAN_FF</div></div>" +
    "<div id=\"A1660\" class=\"col-sm-10 sgw-stat-panel\">" + 
    "<div class=\"sgw-stat-txt\">MULTI_NODE_F</div></div>"+
    "<div id=\"A1807\" class=\"col-sm-10 sgw-stat-panel\">"+
	"<div class=\"sgw-stat-txt\">DISK_ACC_F</div></div>";
	

	$(".sgw-container").find(".col-sm-10").remove();
	
	system_namef1.forEach(function(e,index) {
		if(system_namef1[index] == sys_num ){
		  
		  //if( getPrevDateTime() < date[index]+" "+time[index] && getDateTime() > date[index]+" "+time[index]){
				
			if(system_typef1[index] == "L"){
					console.log("시스템명 : "+system_typef1[index]);
						switch(type[index]){
							case "CSR" : 
								$(".stat-panel").append(s_format_SGW);
								$(".alarm-panel").append(a_format_ESGW);
								$("#CSRstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
								if(succ_rate[index] < L_th0 && att[index] > L_th2){
							      	  $("#CSRstat").parents(".sgw-stat-panel").addClass("alarm-twinkle");
							      	  //insertStatData(system_namef1[index], succ_rate[index]);
								}
								break;
							case "MBR" : 
								$("#MBRstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
								if(succ_rate[index] < L_th1 && att[index] > L_th3){
							      	  $("#MBRstat").parents(".sgw-stat-panel").addClass("alarm-twinkle");
								}
								break;
						}
				}
				if(system_typef1[index] == "V"){
					console.log("시스템명 : "+system_namef1[index]);
					    switch(type[index]){
					       case "CSR" : 
					    	   $(".stat-panel").append(s_format_SGW);
					    	   $(".alarm-panel").append(a_format_vESGW);
					    	   $("#CSRstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
					    	   if(succ_rate[index] < V_th0 && att[index] > V_th2){
					    		   $("#CSRstat").parents(".sgw-stat-panel").addClass("alarm-twinkle");
					      	  //insertStatData(system_namef1[index], succ_rate[index]);
						}
					    break;
					       case "MBR" : 
					    	  $("#MBRstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
					    	  if(succ_rate[index] < V_th1 && att[index] > V_th3){
					    		  $("#MBRstat").parents(".sgw-stat-panel").addClass("alarm-twinkle");
						}
						break;
					}
			    }
				if(system_typef1[index] == "S"){
					// HDV PGW 로직 설정
					switch(type[index]){
					  case "CSR" : 
						$(".stat-panel").append(s_format_SGW);
						$(".alarm-panel").append(a_format_SSGW);
						$("#CSRstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
						if(succ_rate[index] < S_th0 && att[index] > S_th2){
					      	  $("#CSRstat").parents(".sgw-stat-panel").addClass("alarm-twinkle");
					      	  //insertStatData(system_namef1[index], succ_rate[index]);
						}
						break;
					  case "MBR" : 
						$("#MBRstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
						if(succ_rate[index] < S_th1 && att[index] > S_th3){
					      	  $("#MBRstat").parents(".sgw-stat-panel").addClass("alarm-twinkle");
						}
						break;
					}
				
				}
			//}
		}
	});
	//fallback(2) -- 알람 ON 조건 
	system_name_f2.forEach(function(e,index) {
		if(system_name_f2[index] == sys_num ){
			if(type_f2[index] == "ALARM"){
				switch(code_f2[index]){
					case "A5100":
						$("#A5100").addClass("alarm-twinkle");
						break;
					case "A5110":
						$("#A5110").addClass("alarm-twinkle");
						break;
					case "A6800":
						$("#A6800").addClass("alarm-twinkle");
						break;
					case "A6852":
						$("#A6852").addClass("alarm-twinkle");
						break;
					case "A4111":
						$("#A4111").addClass("alarm-twinkle");
						break;
					case "A1000":
						$("#A1000").addClass("alarm-twinkle");
						break;
					case "A1505":
						$("#A1505").addClass("alarm-twinkle");
						break;
					case "A1660":
						$("#A1660").addClass("alarm-twinkle");
						break;
					case "A1807":
						$("#A1807").addClass("alarm-twinkle");
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
					case "A5100":
						$("#A5100").removeClass("alarm-twinkle");
						break;
					case "A5110":
						$("#A5110").removeClass("alarm-twinkle");
						break;
					case "A6800":
						$("#A6800").removeClass("alarm-twinkle");
						break;
					case "A6852":
						$("#A6852").removeClass("alarm-twinkle");
						break;
					case "A4111":
						$("#A4111").removeClass("alarm-twinkle");
						break;
					case "A1000":
						$("#A1000").removeClass("alarm-twinkle");
						break;
					case "A1505":
						$("#A1505").removeClass("alarm-twinkle");
						break;
					case "A1660":
						$("#A1660").removeClass("alarm-twinkle");
						break;
					case "A1807":
						$("#A1807").removeClass("alarm-twinkle");
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
      ajaxShowPgwDetail("/api/v1/sgw-list/"+$("#inputCurrentSystem").attr("val"));
    }, _PERIOD_);
  
})(jQuery);