function getDateTime(){
    var date = new Date();
	let day = ("0" + date.getDate()).slice(-2);
	let month = ("0" + (date.getMonth() + 1)).slice(-2);
	let year = date.getFullYear();
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let seconds = date.getSeconds();
	
	return (year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds);
}

function getPrevDateTime(){
	let PrevTime = new Date();
	PrevTime.setMinutes(PrevTime.getMinutes()-5);
	
	let date = ("0" + PrevTime.getDate()).slice(-2);
	let month = ("0" + (PrevTime.getMonth() + 1)).slice(-2);
	let year = PrevTime.getFullYear();
	let hours = PrevTime.getHours();
	let minutes = PrevTime.getMinutes();
	let seconds = PrevTime.getSeconds();
	
	return (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
}

var sound_status = 1; //Sound ON
var audio = "<audio autoplay loop class=\"audio\" src='/bifrost_alarm.mp3'></audio>";

function changeStatus(){
	
	if(sound_status == 1){ //Sound ON이면
		sound_status = 0; //OFF으로
		document.getElementById('speaker').src='/mute.png'; //mute 이미지로 바꾸기
		
		$("#skt-map-cont-2").find(".audio").remove(); //알람 소리 제거
	}
	
	else{ //Sound OFF면
		sound_status = 1; //ON으로
		document.getElementById('speaker').src='/speaker2.png';
		
		if(document.getElementsByClassName("alarm-twinkle").length > 0) 
		{
			$("#skt-map-cont-2").append(audio);
		}
	}
	
	console.log(sound_status);
}

/** draw variable is used to plot charts -JJ- */
var draw = {
  dunsan: {
    cpuNormal: [],
    cpuMin: [],
    cpuMaj: [],
    cpuCri: [],
    ambNormal: [],
    ambMin: [],
    ambMaj: [],
    ambCri: []
  },
  cheonan: {
    cpuNormal: [],
    cpuMin: [],
    cpuMaj: [],
    cpuCri: [],
    ambNormal: [],
    ambMin: [],
    ambMaj: [],
    ambCri: []
  },
  jeonju: {
    cpuNormal: [],
    cpuMin: [],
    cpuMaj: [],
    cpuCri: [],
    ambNormal: [],
    ambMin: [],
    ambMaj: [],
    ambCri: []
  },
  gwangju: {
    cpuNormal: [],
    cpuMin: [],
    cpuMaj: [],
    cpuCri: [],
    ambNormal: [],
    ambMin: [],
    ambMaj: [],
    ambCri: []
  },
  gangneung: {
    cpuNormal: [],
    cpuMin: [],
    cpuMaj: [],
    cpuCri: [],
    ambNormal: [],
    ambMin: [],
    ambMaj: [],
    ambCri: []
  },
  wonju: {
    cpuNormal: [],
    cpuMin: [],
    cpuMaj: [],
    cpuCri: [],
    ambNormal: [],
    ambMin: [],
    ambMaj: [],
    ambCri: []
  },
  yeongju: {
    cpuNormal: [],
    cpuMin: [],
    cpuMaj: [],
    cpuCri: [],
    ambNormal: [],
    ambMin: [],
    ambMaj: [],
    ambCri: []
  },
  daegu: {
    cpuNormal: [],
    cpuMin: [],
    cpuMaj: [],
    cpuCri: [],
    ambNormal: [],
    ambMin: [],
    ambMaj: [],
    ambCri: []
  },
  busan: {
    cpuNormal: [],
    cpuMin: [],
    cpuMaj: [],
    cpuCri: [],
    ambNormal: [],
    ambMin: [],
    ambMaj: [],
    ambCri: []
  },
  jinju: {
    cpuNormal: [],
    cpuMin: [],
    cpuMaj: [],
    cpuCri: [],
    ambNormal: [],
    ambMin: [],
    ambMaj: [],
    ambCri: []
  },
  jeju: {
    cpuNormal: [],
    cpuMin: [],
    cpuMaj: [],
    cpuCri: [],
    ambNormal: [],
    ambMin: [],
    ambMaj: [],
    ambCri: []
  }
};
var timer = {
  dunsan: undefined,
  cheonan: undefined,
  jeonju: undefined,
  gwnagju: undefined,
  gangneung: undefined,
  wonju: undefined,
  yeongju: undefined,
  wonju: undefined,
  wonju: undefined,
};
const _DT_MIN = 37;
const _DT_MAJ = 29;
const _DT_CRI = 17;



/** 2019.05.26 Added function calculates the timestamp after particular minutes -JJ- */
function addMinutes(date, minutes){
  var a = new Date(date);
  // TODO : change minutes*1000 to minutes*60000
  return new Date(a.getTime() + minutes*60000);
}

/** 2019.05.26 Function draws line chart by (data,id) -JJ- */
function drawLineChart(dataBottom, dataMiddle1, dataMiddle2, dataTop, elementId){
  var options = {
    series: {
      shadowSize: 0,
      lines: {
        show: !1,
        lineWidth: 0
      }
    },
    grid: {
      borderWidth: 0,
      labelMargin: 10,
      hoverable: !0,
      clickable: !0,
      mouseActiveRadius: 6
    },
    xaxis: {
      show: 1,
      ticks: 6,
      tickColor: "#555555",
      mode: "time",
      timezone: "browser",
      font: {
        size: 12,
        color: "#eeeeee",
        weight: "bold"
      }
    },
    yaxis: {
      show: 1,
      tickDecimals: 0,
      ticks: 10,
      tickColor: "#555555",
      font: {
        size: 0,
        color: "#eeeeee",
        weight: "bold"
      },
      max: 100
    },
    legend: {
      show: !1
    }
  };
  $("#" + elementId)[0] && $.plot($("#"+elementId), [{
    data: dataTop,
    lines: {
      show: !0,
      fill: .90
    },
    label: "Downtime 36분 초과",
    stack: !0,
    color: "#44af69"
  }, {
    data: dataMiddle2,
    lines: {
      show: !0,
      fill: .90
    },
    label: "Downtime 36분 이하",
    stack: !0,
    color: "#ffe120"
  }, {
    data: dataMiddle1,
    lines: {
      show: !0,
      fill: .90
    },
    label: "Downtime 28분 이하",
    stack: !0,
    color: "#ff9926"
  }, {
    data: dataBottom,
    lines: {
      show: !0,
      fill: .90
    },
    label: "Downtime 20분 이하",
    stack: !0,
    color: "#f8333c"
  }], options), $(".flot-chart")[0] && ($(".flot-chart").bind("plothover", function(event, pos, item) {
    if (item) {
      var x = item.datapoint[0].toFixed(2),
        y = item.datapoint[1].toFixed(2);
      $(".flot-tooltip").html(item.series.label + " of " + x + " = " + y).css({
        top: item.pageY + 5,
        left: item.pageX + 5
      }).show()
    } else $(".flot-tooltip").hide()
  }), $("<div class='flot-tooltip' class='chart-tooltip'></div>").appendTo("body"));
}

function ajaxUpdateDtCharts(site){
  var currentTime = Date.now();
  const _RANGE = 6*60;

  $.ajax({
    url: "/api/v1/servers?site="+site,
    type: "GET"
  })
  .done(function(data){
    var json = JSON.parse(data);
    var dtCpu = json.result.downtimeCpu;
    var dtAmb = json.result.downtimeAmb;
    var countCpu = {
      normal : 0,
      min : 0,
      maj : 0,
      cri : 0
    };
    var countAmb = {
      normal : 0,
      min : 0,
      maj : 0,
      cri : 0
    };

    dtCpu.forEach(function(e){
      if(e > _DT_MIN) countCpu.normal++;
      else if(e > _DT_MAJ) countCpu.min++;
      else if(e > _DT_CRI) countCpu.maj++;
      else if(e <= _DT_CRI) countCpu.cri++;
    });
    dtAmb.forEach(function(e){
      if(e > _DT_MIN) countAmb.normal++;
      else if(e > _DT_MAJ) countAmb.min++;
      else if(e > _DT_CRI) countAmb.maj++;
      else if(e <= _DT_CRI) countAmb.cri++;
    });

    /** Apply the counts to the text elements */
    $("#skt-map-dt-chart-cpu-normal-"+site).html(countCpu.normal);
    $("#skt-map-dt-chart-cpu-min-"+site).html(countCpu.min);
    $("#skt-map-dt-chart-cpu-maj-"+site).html(countCpu.maj);
    $("#skt-map-dt-chart-cpu-cri-"+site).html(countCpu.cri);
    $("#skt-map-dt-chart-amb-normal-"+site).html(countAmb.normal);
    $("#skt-map-dt-chart-amb-min-"+site).html(countAmb.min);
    $("#skt-map-dt-chart-amb-maj-"+site).html(countAmb.maj);
    $("#skt-map-dt-chart-amb-cri-"+site).html(countAmb.cri);

    /** data modification is applied for visualization */
    /** make them seem bigger than it is (RED & YELLOW) - multiply 10 to yellow and red counts*/
    var tempCpu = countCpu.normal + 10*countCpu.min + 10*countCpu.maj + 10*countCpu.cri;
    var tempAmb = countAmb.normal + 10*countAmb.min + 10*countAmb.maj + 10*countAmb.cri;
    draw[site].cpuCri.push([currentTime, 10*countCpu.cri/tempCpu*100]);
    draw[site].cpuMaj.push([currentTime, (10*countCpu.cri + 10*countCpu.maj)/tempCpu*100]);
    draw[site].cpuMin.push([currentTime, (10*countCpu.cri + 10*countCpu.maj + 10*countCpu.min)/tempCpu*100]);
    draw[site].cpuNormal.push([currentTime, (10*countCpu.cri + 10*countCpu.maj + 10*countCpu.min + countCpu.normal)/tempCpu*100]);
    draw[site].ambCri.push([currentTime, 10*countAmb.cri/tempAmb*100]);
    draw[site].ambMaj.push([currentTime, (10*countAmb.cri + 10*countAmb.maj)/tempAmb*100]);
    draw[site].ambMin.push([currentTime, (10*countAmb.cri + 10*countAmb.maj + 10*countAmb.min)/tempAmb*100]);
    draw[site].ambNormal.push([currentTime, (10*countAmb.cri + 10*countAmb.maj + 10*countAmb.min + countAmb.normal)/tempAmb*100]);

    for(var key in draw[site]){
      while(draw[site][key].length > _RANGE) draw[site][key].shift();
    }

    var concatResult = {
      cpuNormal: [],
      cpuMin: [],
      cpuMaj: [],
      cpuCri: [],
      ambNormal: [],
      ambMin: [],
      ambMaj: [],
      ambCri: []
    };

    for(var key in draw[site]){
      var padding = [];
      var n = 1;

      while(draw[site][key].length + n - 1 < _RANGE){
        padding.push([addMinutes(currentTime,n), null]);
        n = n+1;
      }
      concatResult[key] = draw[site][key].concat(padding);
    }

    /** Draw line charts */
    drawLineChart(concatResult.cpuCri,concatResult.cpuMaj,concatResult.cpuMin,concatResult.cpuNormal,"skt-map-dt-chart-cpu-"+site);
    drawLineChart(concatResult.ambCri,concatResult.ambMaj,concatResult.ambMin,concatResult.ambNormal,"skt-map-dt-chart-amb-"+site);
  });
}


function ajaxUpdateAlarm(url){
  $.ajax({
    url: url,
    type: "GET"
  })
  .done(function(data){
    var json = JSON.parse(data);
    var eventTime = json.result[1].eventTime;
    var alarm_type = json.result[1].alarm_type;
    var system_name = json.result[1].serverName;
    var serverLocation = json.result[1].serverLocation;
    var event = json.result[1].event;
    var site = json.result[1].site;
    var alarm_code = json.result[1].alarm_code;
    
    console.log(json.result[1]);
    
    var statusClass = "";
    var statusText = "";
    
    $("#alarm-table").find(".skt-alarm-txt").remove();
    $(".skt-map-center").removeClass("cri-alert-on maj-alert-on min-alert-on skt-map-status-cri skt-map-status-maj skt-map-status-min");
    $(".sys-container").removeClass("alarm-twinkle");

	$("#skt-map-cont-2").find(".audio").remove(); //sj
	
    
    eventTime.forEach(function(e,index){
    	var timeAddHtml = "<p class='skt-alarm-txt'>"+eventTime[index]+"</p>";
	    var targetAddHtml = "<p class='skt-alarm-txt'>"+system_name[index]+"</p>";
	    var locationAddHtml = "<p class='skt-alarm-txt'>"+serverLocation[index]+"</p>";
	    var eventAddHtml = "<p class='skt-alarm-txt'>"+event[index]+"</p>";
	    $("#alarmEventTimeContainer").append(timeAddHtml);
	    $("#alarmTargetContainer").append(targetAddHtml);
	    $("#alarmLocationContainer").append(locationAddHtml);
	    $("#alarmDetailsContainer").append(eventAddHtml);
	    
	    
	    
	    if((system_name.toString()).match("PGW*")){
	      	 $("#PGW").addClass("alarm-twinkle");
       }if((system_name.toString()).match("SGW*")){
      	 $("#SGW").addClass("alarm-twinkle");
       }if((system_name.toString()).match("MME*")){
      	 $("#MME").addClass("alarm-twinkle");
       }if((system_name.toString()).match("MSS*")){
      	 $("#MSS").addClass("alarm-twinkle");
       }if((system_name.toString()).match("TAS*")){
      	 $("#TAS").addClass("alarm-twinkle");
       }if((system_name.toString()).match("HSS*")){
      	 $("#HSS").addClass("alarm-twinkle");
       }if((system_name.toString()).match("HLR*")){
      	 $("#HLR").addClass("alarm-twinkle");
       }if((system_name.toString()).match("AUC*")){
      	 $("#AUC").addClass("alarm-twinkle");
       }if((system_name.toString()).match("UCMS*")){
      	 $("#UCMS").addClass("alarm-twinkle");
       }
    });
    	
    if(site != 0) { 
  	  statusClass = "cri-alert-on skt-map-status-cri"; statusText = "critical"; 
    }
	$("#skt-map-center-"+site).addClass(statusClass);
	$("#skt-map-center-"+site).find(".skt-map-status-btn").text(statusText);
	
	//sj
	if(document.getElementsByClassName("alarm-twinkle").length > 0 && sound_status==1) 
	{
		$("#skt-map-cont-2").append(audio);
	}
	
  });
}
/** 2020.02.21  -MK- */
function drawPieChart(data1, data2, elementId){
	var config = {
    		type: 'doughnut',
            data: {
              labels: ["Critical","Nomarl"],
              datasets: [
                {
                  //label: "Population (millions)",
                  backgroundColor: ["#c45850","#3cba9f"],
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
                text: data1/data2*100+"%"
              }
            }
    }
	
	new Chart($("#"+elementId), config);
}

/** 2020.02.08 Ajax Function Updates LTE group status -MK- */
function ajaxUpdate5Gsystem(url){ 
  $.ajax({
    url: url,
    type: "GET"
  })
  .done(function(data){
    var json = JSON.parse(data);
    var curPGWCnt = json.result[0].curPGWCnt;
    var totPGWCnt = json.result[0].totPGWCnt;
    var curPGWSess = json.result[0].curPGWSess;
    var totPGWSess = json.result[0].totPGWSess;
    
    var curTASCnt = json.result[1].curTASCnt;
    var totTASCnt = json.result[1].totTASCnt;
    var curTASSub = json.result[1].curTASSub;
    var totTASSub = json.result[1].totTASSub;
    
  //fallback(2) HSS 정보
    var curHSSCnt = json.result[2].curHSSCnt;
    var totHSSCnt = json.result[2].totHSSCnt;
    var curHSSTps = json.result[2].curHSSTps;
    var totHSSTps = json.result[2].totHSSTps;
    
    //fallback(3) HLR 정보
    var curHLRCnt = json.result[3].curHLRCnt;
    var totHLRCnt = json.result[3].totHLRCnt;
    var curHLRTps = json.result[3].curHLRTps;
    var totHLRTps = json.result[3].totHLRTps;
    
    //fallback(4) AuC 정보
    var curAuCCnt = json.result[4].curAuCCnt;
    var totAuCCnt = json.result[4].totAuCCnt;
    var curAuCTps = json.result[4].curAuCTps;
    var totAuCTps = json.result[4].totAuCTps;
    
  //fallback(5) UCMS 정보
    var curUCMSCnt = json.result[5].curUCMSCnt;
    var totUCMSCnt = json.result[5].totUCMSCnt;
    var curUCMSTps = json.result[5].curUCMSTps;
    var totUCMSTps = json.result[5].totUCMSTps;
    
    
    drawPieChart(curPGWCnt, totPGWCnt, "doughnut-chart"); //pgw
    drawPieChart(curTASCnt, totTASCnt, "doughnut-chart-tas"); 
    drawPieChart(curHSSCnt, totHSSCnt, "doughnut-chart-hss"); 
    drawPieChart(curHLRCnt, totHLRCnt, "doughnut-chart-hlr");
    drawPieChart(curAuCCnt, totAuCCnt, "doughnut-chart-auc");
    drawPieChart(curUCMSCnt, totUCMSCnt, "doughnut-chart-ucms");
    
    console.log(json.result[1]);
    
    //TEST용 PIE Chart 삽입
    for (var i=1; i<=11; i++){
    	drawPieChart(10, 10, "doughnut-chart"+i); 
    }
    //$("#5G_PGW").attr(, "onclick="location.href='http://art-life.tistory.com'"")
    $(".sysGroup_table").find(".sys-txt-value").remove();
	$(".sysGroup_table").find(".sys-txt-value-hlr").remove();
    
    totPGWCnt.forEach(function(e,index){
      var curPGWCntAddHtml = "<span class='sys-txt-value'>"+curPGWCnt[index]+"</span>"; 
      var totPGWCntAddHtml = "<span class='sys-txt-value'>"+totPGWCnt[index]+"</span>";
      var curSessAddHtml = "<span class='sys-txt-value'>"+curPGWSess[index]+"</span>";
      var totSessAddHtml = "<span class='sys-txt-value'>"+totPGWSess[index]+"</span>";
      $("#curPGWCntContainer").append(curPGWCntAddHtml);
      $("#totPGWCntContainer").append(totPGWCntAddHtml);
      $("#curPGWSesContainer").append(curSessAddHtml);
      $("#totPGWSesContainer").append(totSessAddHtml);
    });
      
    totTASCnt.forEach(function(e,index){
      var curTASCntAddHtml = "<span class='sys-txt-value'>"+curTASCnt[index]+"</span>"; 
      var totTASCntAddHtml = "<span class='sys-txt-value'>"+totTASCnt[index]+"</span>";
      var curSubAddHtml = "<span class='sys-txt-value'>"+curTASSub[index]+"</span>";
      var totSubAddHtml = "<span class='sys-txt-value'>"+totTASSub[index]+"</span>";
      $("#curTASCntContainer").append(curTASCntAddHtml);
      $("#totTASCntContainer").append(totTASCntAddHtml);
      $("#curTASSesContainer").append(curSubAddHtml);
      $("#totTASSesContainer").append(totSubAddHtml);
    });
    
    totHSSCnt.forEach(function(e,index){
        var curHSSCntAddHtml = "<span class='sys-txt-value'>"+curHSSCnt[index]+"</span>"; 
        var totHSSCntAddHtml = "<span class='sys-txt-value'>"+totHSSCnt[index]+"</span>";
        var curTpsAddHtml = "<span class='sys-txt-value'>"+curHSSTps[index]+"</span>";
        var totTpsAddHtml = "<span class='sys-txt-value'>"+totHSSTps[index]+"</span>";
        $("#curHSSCntContainer").append(curHSSCntAddHtml);
        $("#totHSSCntContainer").append(totHSSCntAddHtml);
        $("#curHSSTpsContainer").append(curTpsAddHtml);
        $("#totHSSTpsContainer").append(totTpsAddHtml);
      });
    
    totHLRCnt.forEach(function(e,index){
        var curHLRCntAddHtml = "<span class='sys-txt-value'>"+curHLRCnt[index]+"</span>"; 
        var totHLRCntAddHtml = "<span class='sys-txt-value'>"+totHLRCnt[index]+"</span>";
        var curTpsAddHtml = "<span class='sys-txt-value-hlr'>"+curHLRTps[index]+"</span>";
        var totTpsAddHtml = "<span class='sys-txt-value-hlr'>"+totHLRTps[index]+"Tps</span>";
        $("#curHLRCntContainer").append(curHLRCntAddHtml);
        $("#totHLRCntContainer").append(totHLRCntAddHtml);
        $("#curHLRTpsContainer").append(curTpsAddHtml);
        $("#totHLRTpsContainer").append(totTpsAddHtml);
      });
    
    totAuCCnt.forEach(function(e,index){
        var curAuCCntAddHtml = "<span class='sys-txt-value'>"+curAuCCnt[index]+"</span>"; 
        var totAuCCntAddHtml = "<span class='sys-txt-value'>"+totAuCCnt[index]+"</span>";
        var curTpsAddHtml = "<span class='sys-txt-value'>"+curAuCTps[index]+"</span>";
        var totTpsAddHtml = "<span class='sys-txt-value'>"+totAuCTps[index]+"</span>";
        $("#curAuCCntContainer").append(curAuCCntAddHtml);
        $("#totAuCCntContainer").append(totAuCCntAddHtml);
        $("#curAuCTpsContainer").append(curTpsAddHtml);
        $("#totAuCTpsContainer").append(totTpsAddHtml);
      });
    
    totUCMSCnt.forEach(function(e,index){
        var curUCMSCntAddHtml = "<span class='sys-txt-value'>"+curUCMSCnt[index]+"</span>"; 
        var totUCMSCntAddHtml = "<span class='sys-txt-value'>"+totUCMSCnt[index]+"</span>";
        var curTpsAddHtml = "<span class='sys-txt-value'>"+curUCMSTps[index]+"</span>";
        var totTpsAddHtml = "<span class='sys-txt-value'>"+totUCMSTps[index]+"</span>";
        $("#curUCMSCntContainer").append(curUCMSCntAddHtml);
        $("#totUCMSCntContainer").append(totUCMSCntAddHtml);
        $("#curUCMSTpsContainer").append(curTpsAddHtml);
        $("#totUCMSTpsContainer").append(totTpsAddHtml);
      });
  });
}


/** 2019.06.13 Ajax Function Updates Map status -JJ- */
function ajaxUpdateCenterStatus(url){
  $.ajax({
    url: url,
    type: "GET"
  })
  .done(function(data){
    var json = JSON.parse(data);
    var cluster = json.result;
    //var site = json.result.site;
    //var system_name = json.result.system_name;
  });
}

/** 임계치 보다 낮은 PGW 통계 data를 alarm_list table에 insert하는 logic*/
function ajaxInsertStatToAlarm(url){
  $.ajax({
    url: url,
    type: "GET"
  })
  .done(function(data){
	var sys_num = $("#inputCurrentSystem").attr("val");
	var json = JSON.parse(data);
	

	//fallback(0)
	var system_namef0 = json.result[0].system_name;
	var system_typef0 = json.result[0].system_type;
    var date = json.result[0].date;
    var time = json.result[0].time;
	var type = json.result[0].type;
	var succ_rate = json.result[0].succ_rate;
	var att = json.result[0].att;
	
    


  });
}

/* sj 20-06-18 */
function ajaxUncollected(url){
  $.ajax({
    url: url,
    type: "GET"
  })
  .done(function(data){
    var json = JSON.parse(data);

    var eventTime = json.result[1].eventTime;
    var alarm_type = json.result[1].alarm_type;
    var system_name = json.result[1].serverName;
    var serverLocation = json.result[1].serverLocation;
    var event = json.result[1].event;
    var site = json.result[1].site;
    var alarm_code = json.result[1].alarm_code;
    
    console.log(json.result[1]);
    
    var statusClass = "";
    var statusText = "";
    
    $("#alarm-table").find(".skt-alarm-txt").remove();
    $(".skt-map-center").removeClass("cri-alert-on maj-alert-on min-alert-on skt-map-status-cri skt-map-status-maj skt-map-status-min");
    $(".sys-container").removeClass("alarm-twinkle");

	$("#skt-map-cont-2").find(".audio").remove(); //sj
	
    
    eventTime.forEach(function(e,index){
    	var timeAddHtml = "<p class='skt-alarm-txt'>"+eventTime[index]+"</p>";
	    var targetAddHtml = "<p class='skt-alarm-txt'>"+system_name[index]+"</p>";
	    var locationAddHtml = "<p class='skt-alarm-txt'>"+serverLocation[index]+"</p>";
	    var eventAddHtml = "<p class='skt-alarm-txt'>"+event[index]+"</p>";
	    $("#alarmEventTimeContainer").append(timeAddHtml);
	    $("#alarmTargetContainer").append(targetAddHtml);
	    $("#alarmLocationContainer").append(locationAddHtml);
	    $("#alarmDetailsContainer").append(eventAddHtml);
	    
	    
	    
	    if((system_name.toString()).match("PGW*")){
	      	 $("#PGW").addClass("alarm-twinkle");
       }if((system_name.toString()).match("SGW*")){
      	 $("#SGW").addClass("alarm-twinkle");
       }if((system_name.toString()).match("MME*")){
      	 $("#MME").addClass("alarm-twinkle");
       }if((system_name.toString()).match("MSS*")){
      	 $("#MSS").addClass("alarm-twinkle");
       }if((system_name.toString()).match("TAS*")){
      	 $("#TAS").addClass("alarm-twinkle");
       }if((system_name.toString()).match("HSS*")){
      	 $("#HSS").addClass("alarm-twinkle");
       }if((system_name.toString()).match("HLR*")){
      	 $("#HLR").addClass("alarm-twinkle");
       }if((system_name.toString()).match("AUC*")){
      	 $("#AUC").addClass("alarm-twinkle");
       }if((system_name.toString()).match("UCMS*")){
      	 $("#UCMS").addClass("alarm-twinkle");
       }
    });
    	
    if(site != 0) { 
  	  statusClass = "cri-alert-on skt-map-status-cri"; statusText = "critical"; 
    }
	$("#skt-map-center-"+site).addClass(statusClass);
	$("#skt-map-center-"+site).find(".skt-map-status-btn").text(statusText);
	
	//sj
	if(document.getElementsByClassName("alarm-twinkle").length > 0 && sound_status==1) 
	{
		$("#skt-map-cont-2").append(audio);
	}
	
  });
}

/** 2019.05.18 Customized setInterval function to execute the function before set setInterval action */
function executeSetInterval(func, delay){
  func();
  return setInterval(func,delay);
}

(function($){
  var centers = [
    {
      svgid: "서구_3_",
      name: "둔산",
      tag: "dunsan"
    },
    {
      svgid: "천안시",
      name: "천안",
      tag: "cheonan"
    },
    {
      svgid: "전주시",
      name: "전주",
      tag: "jeonju"
    },
    {
      svgid: "광주광역시",
      name: "광주",
      tag: "gwangju"
    },
    {
	  svgid: "강릉시",
	  name: "강릉",
	  tag: "gangneung"
    },
    {
      svgid: "원주시",
      name: "원주",
      tag: "wonju"
    },
    {
      svgid: "영주시",
      name: "영주",
      tag: "yeongju"
    },
    {
      svgid: "대구광역시",
      name: "대구",
      tag: "daegu"
    },
    {
      svgid: "부산광역시",
      name: "부산",
      tag: "busan"
    },
    {
      svgid: "진주시",
      name: "진주",
      tag: "jinju"
    },
    {
      svgid: "서귀포시",
      name: "제주",
      tag: "jeju"
     }
  ]
  var ttlMapArr = [["dunsan", "둔산"], ["sungsu", "성수"], ["bundang", "분당"], ["boramae", "보라매"],["cheonan", "천안"],["jeonju", "전주"],["gwangju", "광주"],["gangneung", "강릉"],
	               ["wonju", "원주"],["yeongju", "영주"],["daegu", "대구"],["busan", "부산"],["jinju", "진주"],["jeju", "제주"]];
  var ttlMap = new Map(ttlMapArr);

  const _PERIOD_ = 1000*30;

  for(var key in centers){
    /** Append the center info boxes to map */
    var centerHtml_old = '<a href="/'+centers[key].tag+'"><div id="skt-map-center-'+centers[key].tag+'" class="circular-frame skt-map-center '+
    'skt-map-status-normal"><p class="skt-map-center-txt">'+centers[key].name+
    '<p class="btn skt-map-status-btn">normal</p></p></div></a>'

    var centerHtml = '<a id="skt-map-center-'+centers[key].tag+'" href="/'+centers[key].tag+'" class="skt-map-center skt-map-status-normal">'+
    '<span class="fa fa-stack">'+
    '<p><i class="fa fa-stack-1x fa-map-marker skt-map-marker"></i></p>'+
    //지역명 hidden = skt-map-center-txt-off
    //'<span class="fa fa-stack-2x skt-map-marker-desc skt-map-center-txt-off">'+centers[key].name+'</span>'+
    '<span class="fa fa-stack-2x skt-map-marker-desc">'+centers[key].name+'</span>'+
    '</span></a>';

    $(".skt-map-area").append(centerHtml);
    $("#skt-map-center-"+centers[key].tag).css("top", $("#"+centers[key].svgid).offset().top-25);
    $("#skt-map-center-"+centers[key].tag).css("left", $("#"+centers[key].svgid).offset().left-10);

    /** Add check box elements */
    var chkboxHtml = '<label class="skt-map-info-txt"><input class="skt-map-chk-box" type="checkbox" name="chks" value="'+
    centers[key].tag+'"/>&nbsp'+centers[key].name+'&nbsp&nbsp&nbsp</label>';
    $(".skt-map-chk-box-parent").append(chkboxHtml);
  }

  $(".skt-map-chk-box").iCheck({
    checkboxClass: "icheckbox_polaris",
    radioClass: "iradio_polaris",
  });

  /** Make the containers have same heights */
  $("#skt-map-cont-2").css("height",$("#skt-map-cont-1").css("height").replace('"',''));

  /** Window resize event for relocating the center circles */
  $(window).resize(function(){
    for(var key in centers){
      $("#skt-map-center-"+centers[key].tag).css("top", $("#"+centers[key].svgid).offset().top-25);
      $("#skt-map-center-"+centers[key].tag).css("left", $("#"+centers[key].svgid).offset().left-10);
    }
    $("#skt-map-cont-2").css("height",$("#skt-map-cont-1").css("height").replace('"',''));
  });
  /** 여기부터 수정 */
  /** Checkbox change event for monitoring the paricular centers */

  $(".skt-map-chk-box").on("ifChecked", function(event){
    var smrHtml = '<div class="skt-container skt-map-container skt-map-container-'+$(event.target).attr("value")+'">'+
      '<p class="skt-map-chart-ttl">'+ttlMap.get($(event.target).attr("value"))+'</p>'+
      '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">'+
        '<p class="skt-map-chart-hd">CPU Downtime 분포 변화<br>'+
          '<span>'+
            '<i class="fa fa-square normal"></i>&nbsp :&nbsp'+
            '<span id="skt-map-dt-chart-cpu-normal-'+$(event.target).attr("value")+'"></span>&nbsp&nbsp&nbsp&nbsp'+
          '</span>'+
          '<span>'+
            '<i class="fa fa-square minor"></i>&nbsp :&nbsp'+
            '<span id="skt-map-dt-chart-cpu-min-'+$(event.target).attr("value")+'"></span>&nbsp&nbsp&nbsp&nbsp'+
          '</span>'+
          '<span>'+
            '<i class="fa fa-square major"></i>&nbsp :&nbsp'+
            '<span id="skt-map-dt-chart-cpu-maj-'+$(event.target).attr("value")+'"></span>&nbsp&nbsp&nbsp&nbsp'+
          '</span>'+
          '<span>'+
            '<i class="fa fa-square critical"></i>&nbsp :&nbsp'+
            '<span id="skt-map-dt-chart-cpu-cri-'+$(event.target).attr("value")+'"></span>&nbsp&nbsp&nbsp&nbsp'+
          '</span>'+
        '</p>'+
        '<div class="flot-chart-wp skt-map-flot-chart-wp">'+
          '<div class="flot-chart flot-ch-pg skt-map-dt-chart" id="skt-map-dt-chart-cpu-'+$(event.target).attr("value")+'"></div>'+
        '</div>'+
      '</div>'+
      '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">'+
        '<p class="skt-map-chart-hd">Ambient Downtime 분포 변화<br>'+
          '<span>'+
            '<i class="fa fa-square normal"></i>&nbsp :&nbsp'+
            '<span id="skt-map-dt-chart-amb-normal-'+$(event.target).attr("value")+'"></span>&nbsp&nbsp&nbsp&nbsp'+
          '</span>'+
          '<span>'+
            '<i class="fa fa-square minor"></i>&nbsp :&nbsp'+
            '<span id="skt-map-dt-chart-amb-min-'+$(event.target).attr("value")+'"></span>&nbsp&nbsp&nbsp&nbsp'+
          '</span>'+
          '<span>'+
            '<i class="fa fa-square major"></i>&nbsp :&nbsp'+
            '<span id="skt-map-dt-chart-amb-maj-'+$(event.target).attr("value")+'"></span>&nbsp&nbsp&nbsp&nbsp'+
          '</span>'+
          '<span>'+
            '<i class="fa fa-square critical"></i>&nbsp :&nbsp'+
            '<span id="skt-map-dt-chart-amb-cri-'+$(event.target).attr("value")+'"></span>&nbsp&nbsp&nbsp&nbsp'+
          '</span>'+
        '</p>'+
        '<div class="flot-chart-wp skt-map-flot-chart-wp">'+
          '<div class="flot-chart flot-ch-pg skt-map-dt-chart" id="skt-map-dt-chart-amb-'+$(event.target).attr("value")+'"></div>'+
        '</div>'+
      '</div>'+
    '</div>';
    $(".skt-map-smr-center-parent").append(smrHtml);
    timer[$(event.target).attr("value")] = executeSetInterval(function(){
      ajaxUpdateDtCharts($(event.target).attr("value"));
    }, _PERIOD_);
  });

  $(".skt-map-chk-box").on("ifUnchecked", function(event){
    $(".skt-map-container-"+$(event.target).attr("value")).remove();
    clearInterval(timer[$(event.target).attr("value")]);
    for(var key in draw[$(event.target).attr("value")]){
      draw[$(event.target).attr("value")][key] = [];
    }
  });

  /** Scrollbar activation (Alarm Panel) -JJ- */
/*  $("#skt-map-cont-2").mCustomScrollbar({
    autoHideScrollbar: false,
    scrollbarPosition: "inside",
    theme:"light-1"
  }); */
  $("#alarm-panel").mCustomScrollbar({
    autoHideScrollbar: false,
    scrollbarPosition: "inside",
    theme:"light-1"
  });

  /** periodic AJAX module lists -MK- */
  executeSetInterval(function(){
    ajaxUpdateCenterStatus("/api/v1/map");
    ajaxUpdateAlarm("/api/v1/alarms?");
    ajaxUpdate5Gsystem("/api/v1/5Gsystem?");
    ajaxInsertStatToAlarm("/api/v1/stats");
    
  }, _PERIOD_);

  /** periodic twinkle functions -JJ- */
  executeSetInterval(function(){
    $(".skt-map-status-cri").twinkle({
      'effect': 'splash',
      'effectOptions': {
        'color': 'rgba(255,0,0,0.7)',
        'radius': 60,
        'duration': 1000
      }
    });
    $(".skt-map-status-maj").twinkle({
      'effect': 'splash',
      'effectOptions': {
        'color': 'rgba(255,153,38,0.7)',
        'radius': 60,
        'duration': 1000
      }
    });
    $(".skt-map-status-min").twinkle({
      'effect': 'splash',
      'effectOptions': {
        'color': 'rgba(255,225,32,0.7)',
        'radius': 60,
        'duration': 1000
      }
    });
    $(".btn-status-cri").twinkle({
      'effect': 'splash',
      'effectOptions': {
        'color': 'rgba(255,0,0,0.7)',
        'radius': 100,
        'duration': 1000
      }
    });
  }, 2000);

})(jQuery);