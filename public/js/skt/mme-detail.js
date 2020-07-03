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
		
		$(".mme-container").find(".audio").remove(); //알람 소리 제거
	}
	
	else{ //Sound OFF면
		sound_status = 1; //ON으로
		document.getElementById('speaker').src='/speaker2.png';
		
		if(document.getElementsByClassName("alarm-twinkle").length > 0) 
		{
			$(".mme-container").append(audio);
		}
	}
	
}


function play_audio(){
	
	if(document.getElementsByClassName("alarm-twinkle").length > 0 && sound_status==1) 
	{
		$(".mme-container").append(audio);
	}
} 

function pause_audio(){
	$(".mme-container").find(".audio").remove();
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
function ajaxShowMmeDetail(url){
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
    var curSub = json.result[0].curSub;
    var totSub = json.result[0].totSub;
	
	//fallback(1)
	var system_namef1 = json.result[1].system_name;
	var system_typef1 = json.result[1].system_type;
    var date = json.result[1].date;
    var time = json.result[1].time;
	var type = json.result[1].type;
	var succ_rate = json.result[1].succ_rate;
	var vendor = json.result[1].vendor;
	
	//fallback(2)
    var system_name_f2 = json.result[2].system_name;
    var date_f2 = json.result[2].date;
    var time_f2 = json.result[2].time;
    var sys_sub_name_f2 = json.result[2].sys_sub_name;
    var type_f2 = json.result[2].type;
	var code_f2 = json.result[2].code;
	
    console.log(json.result[2]);
	

    //fallback(3) - Threshold Information
    var system_f3 = json.result[3].system;
    var th0 = json.result[3].th0; // Attach Success Threshold 
    var th1 = json.result[3].th1; // SRMO Success Threshold
    var th2 = json.result[3].th2; // SRMT Success Threshold
    var th3 = json.result[3].th3; // ESRMO Success Threshold
    var th4 = json.result[3].th4; // ESRMT Success Threshold
    var th5 = json.result[3].th5; // TAU Success Threshold
    var th6 = json.result[3].th6; // PAG Success Threshold
	var th7 = json.result[3].th7; // Attach Attempt Threshold
    var th8 = json.result[3].th8; // SRMO Attempt Threshold
    var th9 = json.result[3].th9; // SRMT Attempt Threshold
    var th10 = json.result[3].th10; // ESRMO Attempt Threshold
    var th11 = json.result[3].th11; // ESRMT Attempt Threshold
    var th12 = json.result[3].th12; // TAU Attempt Threshold
    var th13 = json.result[3].th13; // PAG Attempt Threshold
    
    
    var S_th0, S_th1, S_th2, S_th3, S_th4, S_th5, S_th6, S_th7, S_th8, S_th9, S_th10, S_th11, S_th12, S_th13;
    var E_th0, E_th1, E_th2, E_th3, E_th4, E_th5, E_th6, E_th7, E_th8, E_th9, E_th10, E_th11, E_th12, E_th13;
    var G_th0, G_th1, G_th2, G_th3, G_th4, G_th5, G_th6, G_th7, G_th8, G_th9, G_th10, G_th11, G_th12, G_th13;
    
    system_f3.forEach(function(e,index){
    	if(system_f3[index] == "SMME"){
    		S_th0 = th0[index];
    		S_th1 = th1[index];
    		S_th2 = th2[index];
    		S_th3 = th3[index];
    		S_th4 = th4[index];
    		S_th5 = th5[index];
    		S_th6 = th6[index];
    		S_th7 = th7[index];
    		S_th8 = th8[index];
    		S_th9 = th9[index];
    		S_th10 = th10[index];
    		S_th11 = th11[index];
    		S_th12 = th12[index];
    		S_th13 = th13[index];
    	}
    	else if(system_f3[index] == "EMMME"){
    		E_th0 = th0[index];
    		E_th1 = th1[index];
    		E_th2 = th2[index];
    		E_th3 = th3[index];
    		E_th4 = th4[index];
    		E_th5 = th5[index];
    		E_th6 = th6[index];
    		E_th7 = th7[index];
    		E_th8 = th8[index];
    		E_th9 = th9[index];
    		E_th10 = th10[index];
    		E_th11 = th11[index];
    		E_th12 = th12[index];
    		E_th13 = th13[index];
    	}       
    	else if(system_f3[index] == "GMMME"){
    		G_th0 = th0[index];
    		G_th1 = th1[index];
    		G_th2 = th2[index];
    		G_th3 = th3[index];
    		G_th4 = th4[index];
    		G_th5 = th5[index];
    		G_th6 = th6[index];
    		G_th7 = th7[index];
    		G_th8 = th8[index];
    		G_th9 = th9[index];
    		G_th10 = th10[index];
    		G_th11 = th11[index];
    		G_th12 = th12[index];
    		G_th13 = th13[index];
    	}   
    });   
    
	$(".mme-container").find(".sys-txt-value").remove(); 
	$(".mme-stat-panel").removeClass("alarm-twinkle");
	
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
		    $("#curMMESubContainer").append(curSubAddHtml);
		    $("#totMMESubContainer").append(totSubAddHtml);
		    
		}
	});
	
	drawPieChart(curSub, totSub, "mme-chart"); 
	
	//fallback(1)
	//통계 임계치 설정 및 통계 출력
	var s_format_MME= "<div class=\"col-sm-10 mme-stat-panel\">"+
	"<div id=\"ATTstat\" class=\"mme-stat-txt\">Attach 성공률 </div></div>"+
    "<div class=\"col-sm-10 mme-stat-panel\">"+
    "<div id=\"SRMOstat\" class=\"mme-stat-txt\">SRMO 성공률 </div></div>" +
    "<div class=\"col-sm-10 mme-stat-panel\">" + 
    "<div id=\"SRMTstat\" class=\"mme-stat-txt\">SRMT 성공률 </div></div>"+
    "<div class=\"col-sm-10 mme-stat-panel\">" + 
	"<div id=\"ESRMOstat\" class=\"mme-stat-txt\">ESRMO 성공률 </div></div>"+
    "<div class=\"col-sm-10 mme-stat-panel\">" + 
	"<div id=\"ESRMTstat\" class=\"mme-stat-txt\">ESRMT 성공률 </div></div>"+
    "<div class=\"col-sm-10 mme-stat-panel\">" + 
	"<div id=\"TAUstat\" class=\"mme-stat-txt\">TAU 성공률 </div></div>"+
    "<div class=\"col-sm-10 mme-stat-panel\">" + 
    "<div id=\"PAGstat\" class=\"mme-stat-txt\">PAGING 성공률 </div></div>";

	var a_format_EMME= "<div id=\"A5110\" class=\"col-sm-10 mme-stat-panel\">"+
	"<div class=\"mme-stat-txt\">COMPONENT TERMINATION ALARM</div></div>"+
	"<div id=\"A5100\" class=\"col-sm-10 mme-stat-panel\">" + 
    "<div class=\"mme-stat-txt\">NODE TERMINATION ALARM</div></div>" +
    "<div id=\"A6800\" class=\"col-sm-10 mme-stat-panel\">" + 
    "<div class=\"mme-stat-txt\">UP CORE DEATH ALARM</div></div>"+
    "<div id=\"A6852\" class=\"col-sm-10 mme-stat-panel\">"+
	"<div class=\"mme-stat-txt\">FP PACKET BUFFER CRITICAL ALARM</div></div>" ;
    	
	
	var a_format_SMME= "<div id=\"A1000\" class=\"col-sm-10 mme-stat-panel\">"+
	"<div class=\"mme-stat-txt\">All_System_Down</div></div>"+
	"<div id=\"A1505\" class=\"col-sm-10 mme-stat-panel\">" + 
    "<div class=\"mme-stat-txt\">FAN_Function Fail</div></div>" +
    "<div id=\"A1660\" class=\"col-sm-10 mme-stat-panel\">" + 
    "<div class=\"mme-stat-txt\">Multi_Node_OUT_Of_Service</div></div>"+
    "<div id=\"A1807\" class=\"col-sm-10 mme-stat-panel\">"+
	"<div class=\"mme-stat-txt\">Disk_Access_Fail</div></div>";
	
	var a_format_GMME= "<div id=\"A1000\" class=\"col-sm-10 mme-stat-panel\">"+
	"<div class=\"mme-stat-txt\">All_System_Down</div></div>"+
    "<div id=\"A1660\" class=\"col-sm-10 mme-stat-panel\">" + 
    "<div class=\"mme-stat-txt\">Multi_Node_OUT_Of_Service</div></div>"+
    "<div id=\"A1807\" class=\"col-sm-10 mme-stat-panel\">"+
	"<div class=\"mme-stat-txt\">Disk_Access_Fail</div></div>";
	
	
	
	$(".mme-container").find(".col-sm-10").remove();
	
	system_namef1.forEach(function(e,index) {
		if(system_namef1[index] == sys_num ){
			//if( getPrevDateTime() < date[index]+" "+time[index] && getDateTime() > date[index]+" "+time[index]){
				
				if(vendor[index] == "E"){
					console.log("시스템명 : "+vendor[index]);
						switch(type[index]){
							case "ATT" : 
								$(".stat-panel").append(s_format_MME);
								$(".alarm-panel").append(a_format_EMME);
								$("#ATTstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
								if(succ_rate[index] < E_th0 && att[index] > E_th7){
							      	  $("#ATTstat").parents(".mme-stat-panel").addClass("alarm-twinkle");
							      	  //insertStatData(system_namef1[index], succ_rate[index]);
								}
								break;
							case "SRMO" : 
								$("#SRMOstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
								if(succ_rate[index] < E_th1 && att[index] > E_th8){
							      	  $("#SRMOstat").parents(".mme-stat-panel").addClass("alarm-twinkle");
								}
								break;
							case "SRMO" : 
								$("#SRMOstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
								if(succ_rate[index] < E_th1 && att[index] > E_th8){
							      	  $("#SRMOstat").parents(".mme-stat-panel").addClass("alarm-twinkle");
								}
								break;
							case "SRMT" : 
								$("#SRMTstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
								if(succ_rate[index] < E_th2 && att[index] > E_th9){
							      	  $("#SRMTstat").parents(".mme-stat-panel").addClass("alarm-twinkle");
								}
								break;
							case "ESRMO" : 
								$("#ESRMOstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
								if(succ_rate[index] < E_th3 && att[index] > E_th10){
							      	  $("#ESRMOstat").parents(".mme-stat-panel").addClass("alarm-twinkle");
								}
								break;
							case "ESRMT" : 
								$("#ESRMTstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
								if(succ_rate[index] < E_th4 && att[index] > E_th11){
							      	  $("#ESRMTstat").parents(".mme-stat-panel").addClass("alarm-twinkle");
								}
								break;
							case "TAU" : 
								$("#TAUstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
								if(succ_rate[index] < E_th5 && att[index] > E_th12){
							      	  $("#TAUstat").parents(".mme-stat-panel").addClass("alarm-twinkle");
								}
								break;
							case "PAG" : 
								$("#PAGstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
								if(succ_rate[index] < E_th6 && att[index] > E_th13){
							      	  $("#PAGstat").parents(".mme-stat-panel").addClass("alarm-twinkle");
								}
								break;
						}
				}
				if(vendor[index] == "S"){
					console.log("시스템명 : "+vendor[index]);
						switch(type[index]){
							case "ATT" : 
								$(".stat-panel").append(s_format_MME);
								$(".alarm-panel").append(a_format_SMME);
								$("#ATTstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
								if(succ_rate[index] < S_th0 && att[index] > S_th7){
							      	  $("#ATTstat").parents(".mme-stat-panel").addClass("alarm-twinkle");
							      	  //insertStatData(system_namef1[index], succ_rate[index]);
								}
								break;
							case "SRMO" : 
								$("#SRMOstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
								if(succ_rate[index] < S_th1 && att[index] > S_th8){
							      	  $("#SRMOstat").parents(".mme-stat-panel").addClass("alarm-twinkle");
								}
								break;
							case "SRMO" : 
								$("#SRMOstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
								if(succ_rate[index] < S_th1 && att[index] > S_th8){
							      	  $("#SRMOstat").parents(".mme-stat-panel").addClass("alarm-twinkle");
								}
								break;
							case "SRMT" : 
								$("#SRMTstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
								if(succ_rate[index] < S_th2 && att[index] > S_th9){
							      	  $("#SRMTstat").parents(".mme-stat-panel").addClass("alarm-twinkle");
								}
								break;
							case "ESRMO" : 
								$("#ESRMOstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
								if(succ_rate[index] < S_th3 && att[index] > S_th10){
							      	  $("#ESRMOstat").parents(".mme-stat-panel").addClass("alarm-twinkle");
								}
								break;
							case "ESRMT" : 
								$("#ESRMTstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
								if(succ_rate[index] < S_th4 && att[index] > S_th11){
							      	  $("#ESRMTstat").parents(".mme-stat-panel").addClass("alarm-twinkle");
								}
								break;
							case "TAU" : 
								$("#TAUstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
								if(succ_rate[index] < S_th5 && att[index] > S_th12){
							      	  $("#TAUstat").parents(".mme-stat-panel").addClass("alarm-twinkle");
								}
								break;
							case "PAG" : 
								$("#PAGstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
								if(succ_rate[index] < S_th6 && att[index] > S_th13){
							      	  $("#PAGstat").parents(".mme-stat-panel").addClass("alarm-twinkle");
								}
								break;
						}
				}
				if(vendor[index] == "G"){
					console.log("시스템명 : "+vendor[index]);
						switch(type[index]){
							case "ATT" : 
								$(".stat-panel").append(s_format_MME);
								$(".alarm-panel").append(a_format_GMME);
								$("#ATTstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
								if(succ_rate[index] < G_th0 && att[index] > G_th7){
							      	  $("#ATTstat").parents(".mme-stat-panel").addClass("alarm-twinkle");
							      	  //insertStatData(system_namef1[index], succ_rate[index]);
								}
								break;
							case "SRMO" : 
								$("#SRMOstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
								if(succ_rate[index] < G_th1 && att[index] > G_th8){
							      	  $("#SRMOstat").parents(".mme-stat-panel").addClass("alarm-twinkle");
								}
								break;
							case "SRMO" : 
								$("#SRMOstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
								if(succ_rate[index] < G_th1 && att[index] > G_th8){
							      	  $("#SRMOstat").parents(".mme-stat-panel").addClass("alarm-twinkle");
								}
								break;
							case "SRMT" : 
								$("#SRMTstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
								if(succ_rate[index] < G_th2 && att[index] > G_th9){
							      	  $("#SRMTstat").parents(".mme-stat-panel").addClass("alarm-twinkle");
								}
								break;
							case "ESRMO" : 
								$("#ESRMOstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
								if(succ_rate[index] < G_th3 && att[index] > G_th10){
							      	  $("#ESRMOstat").parents(".mme-stat-panel").addClass("alarm-twinkle");
								}
								break;
							case "ESRMT" : 
								$("#ESRMTstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
								if(succ_rate[index] < G_th4 && att[index] > G_th11){
							      	  $("#ESRMTstat").parents(".mme-stat-panel").addClass("alarm-twinkle");
								}
								break;
							case "TAU" : 
								$("#TAUstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
								if(succ_rate[index] < G_th5 && att[index] > G_th12){
							      	  $("#TAUstat").parents(".mme-stat-panel").addClass("alarm-twinkle");
								}
								break;
							case "PAG" : 
								$("#PAGstat").append("<span class='sys-txt-value'>"+succ_rate[index]+"%</span>");
								if(succ_rate[index] < G_th6 && att[index] > G_th13){
							      	  $("#PAGstat").parents(".mme-stat-panel").addClass("alarm-twinkle");
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
      ajaxShowMmeDetail("/api/v1/mme-list/"+$("#inputCurrentSystem").attr("val"));
    }, _PERIOD_);
  
})(jQuery);