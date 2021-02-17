/*Dashboard Init*/

"use strict";


var durchsatz_regel_data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var durchsatz_bca_data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var durchsatz_cvs_data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var durchsatz_spring_data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var fehler_regel_data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var fehler_bca_data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var fehler_cvs_data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var fehler_spring_data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var fehler_regel_quote = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var fehler_bca_quote = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var fehler_cvs_quote = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var fehler_spring_quote = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var tagesdurchsatz_regel = 0;
var tagesdurchsatz_bca = 0;
var tagesdurchsatz_cvs = 0;
var tagesdurchsatz_spring = 0;

var tagesfehler_regel = 0;
var tagesfehler_bca = 0;
var tagesfehler_cvs = 0;
var tagesfehler_spring = 0;

var color_vorverarbeitung = '#878787';
var color_regel = '#878787';
var color_bca = '#878787';
var color_cvs = '#878787';
var color_spring = '#878787';

var kuvdataregel_gesamtdaten = [];
var kuvdatabca_gesamtdaten = [];
var kuvdataspring_gesamtdaten = [];
var kuvdatacvs_gesamtdaten = [];


function getData() {

	var currentdate = new Date(); 
	var datetime = ""+ currentdate.getDate() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getFullYear() + "/"  
                + currentdate.getHours() + "-"  
                + currentdate.getMinutes() + "-" 
		+ currentdate.getSeconds();
//	console.log(datetime);


//################################################## KUVDATA #####################################################
//################################################################################################################

        //REGEL KuvData
	const urlregel = 'url_entfernt';
	console.log("call "+urlregel+datetime);
	fetch(urlregel+datetime)
		.then(response => response.json())
		.then(kuvdataregel => {
			console.log(kuvdataregel);
			durchsatz_regel_data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                        fehler_regel_data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                        tagesdurchsatz_regel = 0;
                        tagesfehler_regel = 0;
                        kuvdataregel_gesamtdaten = [];
                        
			for (var i = 0; i < kuvdataregel.length; i++) {
				durchsatz_regel_data[i] = parseInt(kuvdataregel[i].GESAMT, 10);
                                tagesdurchsatz_regel += parseInt(kuvdataregel[i].GESAMT, 10);
                                fehler_regel_data[i] = parseInt(Math.round(kuvdataregel[i].FEHLERQUOTE), 10);
                                tagesfehler_regel += parseInt(kuvdataregel[i].FEHLERHAFT, 10);
                                var d = kuvdataregel[i].INTERVALL.split(".");
                                var myDate = new Date(d[1]+"/"+d[0]+"/"+d[2]+':00');
                                kuvdataregel_gesamtdaten.push({INTERVALL: myDate.toISOString().substring(0,16).replace('T',' '), GESAMT: parseInt(kuvdataregel[i].GESAMT, 10), FEHLERHAFT: parseInt(kuvdataregel[i].FEHLERHAFT, 10)});
			}
                        document.getElementById("tagesdurchsatzregel").innerHTML = tagesdurchsatz_regel + ' / 24 Stunden';
                        document.getElementById("fehlerquoteregel").innerHTML = Math.round(((tagesfehler_regel / tagesdurchsatz_regel) *100)) + '% / 24 Stunden';
                        morrisChartregel();
		})
		.catch(err => console.log(err));
        
        //BCA KuvData
	const urlbca = 'url_entfernt';
	console.log("call "+urlbca+datetime);
	fetch(urlbca+datetime)
		.then(response => response.json())
		.then(kuvdatabca => {
			console.log(kuvdatabca);
			durchsatz_bca_data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                        fehler_bca_data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                        tagesdurchsatz_bca = 0;
                        tagesfehler_bca = 0;
                        kuvdatabca_gesamtdaten = [];  
                        
			for (var i = 0; i < kuvdatabca.length; i++) {
				durchsatz_bca_data[i] = parseInt(kuvdatabca[i].GESAMT, 10);
                                tagesdurchsatz_bca += parseInt(kuvdatabca[i].GESAMT, 10);
                                fehler_bca_data[i] = parseInt(Math.round(kuvdatabca[i].FEHLERQUOTE), 10);
                                tagesfehler_bca += parseInt(kuvdatabca[i].FEHLERHAFT, 10);
                                var d = kuvdatabca[i].INTERVALL.split(".");
                                var myDate = new Date(d[1]+"/"+d[0]+"/"+d[2]+':00');
                                kuvdatabca_gesamtdaten.push({INTERVALL: myDate.toISOString().substring(0,16).replace('T',' '), GESAMT: parseInt(kuvdatabca[i].GESAMT, 10), FEHLERHAFT: parseInt(kuvdatabca[i].FEHLERHAFT, 10)});
			}
                        document.getElementById("tagesdurchsatzbca").innerHTML = tagesdurchsatz_bca + ' / 24 Stunden';
                        document.getElementById("fehlerquotebca").innerHTML = Math.round(((tagesfehler_bca / tagesdurchsatz_bca) *100)) + '% / 24 Stunden';
                        morrisChartbca();
		})
		.catch(err => console.log(err));

        //CVS KuvData
	const urlcvs = 'url_entfernt';
	console.log("call "+urlcvs+datetime);
	fetch(urlcvs+datetime)
		.then(response => response.json())
		.then(kuvdatacvs => {
			console.log(kuvdatacvs);
			durchsatz_cvs_data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                        fehler_cvs_data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                        tagesdurchsatz_cvs = 0;
                        tagesfehler_cvs = 0;
                        kuvdatacvs_gesamtdaten = [];
                        
			for (var i = 0; i < kuvdatacvs.length; i++) {
				durchsatz_cvs_data[i] = parseInt(kuvdatacvs[i].GESAMT, 10);
                                tagesdurchsatz_cvs += parseInt(kuvdatacvs[i].GESAMT, 10);
                                fehler_cvs_data[i] = parseInt(Math.round(kuvdatacvs[i].FEHLERQUOTE), 10);
                                tagesfehler_cvs += parseInt(kuvdatacvs[i].FEHLERHAFT, 10);
                                var d = kuvdatacvs[i].INTERVALL.split(".");
                                var myDate = new Date(d[1]+"/"+d[0]+"/"+d[2]+':00');
                                kuvdatacvs_gesamtdaten.push({INTERVALL: myDate.toISOString().substring(0,16).replace('T',' '), GESAMT: parseInt(kuvdatacvs[i].GESAMT, 10), FEHLERHAFT: parseInt(kuvdatacvs[i].FEHLERHAFT, 10)});
			}
                        document.getElementById("tagesdurchsatzcvs").innerHTML = tagesdurchsatz_cvs + ' / 24 Stunden';
                        document.getElementById("fehlerquotecvs").innerHTML = Math.round(((tagesfehler_cvs / tagesdurchsatz_cvs) *100)) + '% / 24 Stunden';
                        morrisChartcvs();
		})
		.catch(err => console.log(err));
        
	//SPRING KuvData
	const urlspring = 'url_entfernt';
	console.log("call "+urlspring+datetime);
	fetch(urlspring+datetime)
		.then(response => response.json())
		.then(kuvdataspring => {
			console.log(kuvdataspring);
			durchsatz_spring_data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                        fehler_spring_data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                        tagesdurchsatz_spring = 0;
                        tagesfehler_spring = 0;
                        kuvdataspring_gesamtdaten = [];
                        
			for (var i = 0; i < kuvdataspring.length; i++) {
				durchsatz_spring_data[i] = parseInt(kuvdataspring[i].GESAMT, 10);
                                tagesdurchsatz_spring += parseInt(kuvdataspring[i].GESAMT, 10);
                                fehler_spring_data[i] = parseInt(Math.round(kuvdataspring[i].FEHLERQUOTE), 10);
                                tagesfehler_spring += parseInt(kuvdataspring[i].FEHLERHAFT, 10);
                                var d = kuvdataspring[i].INTERVALL.split(".");
                                var myDate = new Date(d[1]+"/"+d[0]+"/"+d[2]+':00');
                                kuvdataspring_gesamtdaten.push({INTERVALL: myDate.toISOString().substring(0,16).replace('T',' '), GESAMT: parseInt(kuvdataspring[i].GESAMT, 10), FEHLERHAFT: parseInt(kuvdataspring[i].FEHLERHAFT, 10)});
			}
                        document.getElementById("tagesdurchsatzspring").innerHTML = tagesdurchsatz_spring + ' / 24 Stunden';
                        document.getElementById("fehlerquotespring").innerHTML = Math.round(((tagesfehler_spring / tagesdurchsatz_spring) *100)) + '% / 24 Stunden';
                        morrisChartspring();
		})
		.catch(err => console.log(err));
        
        
//################################################## KUV STATUS #####################################################
//###################################################################################################################

//STATUS VORVERARBEITUNG
	const urlstatusvorverarbeitung = 'url_entfernt';
	fetch(urlstatusvorverarbeitung)
		.then(response => response.json())
		.then(statusvorverarbeitung => {
                        color_vorverarbeitung = '#E20000';
			
                        var statusvor = statusvorverarbeitung[0].STATUS;
                        switch (statusvor) {
                            case 'AKTIV':
                                color_vorverarbeitung = '#1bada2';
                                break;
                            case 'INAKTIV':
                                color_vorverarbeitung = '#E20000';
                                break;
                            case 'SOLL':
                                color_vorverarbeitung = '#53BAF2';
                                break;
                            default:
                                color_vorverarbeitung = '#878787';
                            }
		})
		.catch(err => console.log(err));

//STATUS REGEL
	const urlstatusregel = 'url_entfernt';
	fetch(urlstatusregel)
		.then(response => response.json())
		.then(statusregel => {
                        color_regel = '#E20000';
			
                        var statusreg = statusregel[0].STATUS;
                        switch (statusreg) {
                            case 'AKTIV':
                                color_regel = '#1bada2';
                                break;
                            case 'INAKTIV':
                                color_regel = '#E20000';
                                break;
                            case 'SOLL':
                                color_regel = '#53BAF2';
                                break;
                            default:
                                color_regel = '#878787';
                            } 
		})
		.catch(err => console.log(err));
        

//STATUS BCA
	const urlstatusbca = 'url_entfernt';
	fetch(urlstatusbca)
		.then(response => response.json())
		.then(statusbca => {
                        color_bca = '#E20000';
			
                        var statusb = statusbca[0].STATUS;
                        switch (statusb) {
                            case 'AKTIV':
                                color_bca = '#1bada2';
                                break;
                            case 'INAKTIV':
                                color_bca = '#E20000';
                                break;
                            case 'SOLL':
                                color_bca = '#53BAF2';
                                break;
                            default:
                                color_bca = '#878787';
                            } 
		})
		.catch(err => console.log(err));
        
        
//STATUS SPRING
	const urlstatusspring = 'url_entfernt';
	fetch(urlstatusspring)
		.then(response => response.json())
		.then(statusspring => {
                        color_spring = '#E20000';
			
                        var statusspri = statusspring[0].STATUS;
                        switch (statusspri) {
                            case 'AKTIV':
                                color_spring = '#1bada2';
                                break;
                            case 'INAKTIV':
                                color_spring = '#E20000';
                                break;
                            case 'SOLL':
                                color_spring = '#53BAF2';
                                break;
                            default:
                                color_spring = '#878787';
                            } 
		})
		.catch(err => console.log(err));
        
        
//STATUS CVS
	const urlstatuscvs = 'url_entfernt';
	fetch(urlstatuscvs)
		.then(response => response.json())
		.then(statuscvs => {
                        color_cvs = '#E20000';
			
                        var statusc = statuscvs[0].STATUS;
                        switch (statusc) {
                            case 'AKTIV':
                                color_cvs = '#1bada2';
                                break;
                            case 'INAKTIV':
                                color_cvs = '#E20000';
                                break;
                            case 'SOLL':
                                color_cvs = '#53BAF2';
                                break;
                            default:
                                color_cvs = '#878787';
                            } 
		})
		.catch(err => console.log(err));
        
//STATUS RECHNUNGSVEREINBARUNG
	const urlstatusrechnungsvereinbarung = 'url_entfernt';
	fetch(urlstatusrechnungsvereinbarung)
		.then(response => response.json())
		.then(statusrechnungsvereinbarung => {
                        
                        var statusrv = statusrechnungsvereinbarung[0].STATUS;
                        switch (statusrv) {
                            case 'AKTIV':
                                document.getElementById("status_RV").innerHTML = 'AKTIV';
                                $('#status_RV').removeClass('label-danger');
                                $('#status_RV').removeClass('label-success');
                                $('#status_RV').removeClass('label-default');
                                $('#status_RV').addClass('label-success');
                                break;
                            case 'INAKTIV':
                                document.getElementById("status_RV").innerHTML = 'INAKTIV';
                                $('#status_RV').removeClass('label-danger');
                                $('#status_RV').removeClass('label-success');
                                $('#status_RV').removeClass('label-default');
                                $('#status_RV').addClass('label-danger');
                                break;
                            default:
                                document.getElementById("status_RV").innerHTML = 'NO DATA';
                                $('#status_RV').removeClass('label-danger');
                                $('#status_RV').removeClass('label-success');
                                $('#status_RV').removeClass('label-default');
                                $('#status_RV').addClass('label-default');
                            } 
		})
		.catch(err => console.log(err));
        
        
//STATUS RECHNUNGSFORMAT
	const urlstatusrechnungsformat = 'url_entfernt';
	fetch(urlstatusrechnungsformat)
		.then(response => response.json())
		.then(statusrechnungsformat => {
                        
                        var statusfo = statusrechnungsformat[0].STATUS;
                        switch (statusfo) {
                            case 'AKTIV':
                                document.getElementById("status_RF").innerHTML = 'AKTIV';
                                $('#status_RF').removeClass('label-danger');
                                $('#status_RF').removeClass('label-success');
                                $('#status_RF').removeClass('label-default');
                                $('#status_RF').addClass('label-success');
                                break;
                            case 'INAKTIV':
                                document.getElementById("status_RF").innerHTML = 'INAKTIV';
                                $('#status_RF').removeClass('label-danger');
                                $('#status_RF').removeClass('label-success');
                                $('#status_RF').removeClass('label-default');
                                $('#status_RF').addClass('label-danger');
                                break;
                            default:
                                document.getElementById("status_RF").innerHTML = 'NO DATA';
                                $('#status_RF').removeClass('label-danger');
                                $('#status_RF').removeClass('label-success');
                                $('#status_RF').removeClass('label-default');
                                $('#status_RF').addClass('label-default');
                            } 
		})
		.catch(err => console.log(err));
        
        
//STATUS EINMALENTGELT
	const urlstatuseinmalentgelt = 'url_entfernt';
	fetch(urlstatuseinmalentgelt)
		.then(response => response.json())
		.then(statuseinmalentgelt => {
                        
                        var statusee = statuseinmalentgelt[0].STATUS;
                        switch (statusee) {
                            case 'AKTIV':
                                document.getElementById("status_EE").innerHTML = 'AKTIV';
                                $('#status_EE').removeClass('label-danger');
                                $('#status_EE').removeClass('label-success');
                                $('#status_EE').removeClass('label-default');
                                $('#status_EE').addClass('label-success');
                                break;
                            case 'INAKTIV':
                                document.getElementById("status_EE").innerHTML = 'INAKTIV';
                                $('#status_EE').removeClass('label-danger');
                                $('#status_EE').removeClass('label-success');
                                $('#status_EE').removeClass('label-default');
                                $('#status_EE').addClass('label-danger');
                                break;
                            default:
                                document.getElementById("status_EE").innerHTML = 'NO DATA';
                                $('#status_EE').removeClass('label-danger');
                                $('#status_EE').removeClass('label-success');
                                $('#status_EE').removeClass('label-default');
                                $('#status_EE').addClass('label-default');
                            } 
		})
		.catch(err => console.log(err));
        
        
        
//STATUS LESENVERTRAGSBESTAND
	const urlstatuslesenvertragsbestand = 'url_entfernt';
	fetch(urlstatuslesenvertragsbestand)
		.then(response => response.json())
		.then(statuslesenvertragsbestand => {
                        
                        var statuslv = statuslesenvertragsbestand[0].STATUS;
                        switch (statuslv) {
                            case 'AKTIV':
                                document.getElementById("status_LV").innerHTML = 'AKTIV';
                                $('#status_LV').removeClass('label-danger');
                                $('#status_LV').removeClass('label-success');
                                $('#status_LV').removeClass('label-default');
                                $('#status_LV').addClass('label-success');
                                break;
                            case 'INAKTIV':
                                document.getElementById("status_LV").innerHTML = 'INAKTIV';
                                $('#status_LV').removeClass('label-danger');
                                $('#status_LV').removeClass('label-success');
                                $('#status_LV').removeClass('label-default');
                                $('#status_LV').addClass('label-danger');
                                break;
                            default:
                                document.getElementById("status_LV").innerHTML = 'NO DATA';
                                $('#status_LV').removeClass('label-danger');
                                $('#status_LV').removeClass('label-success');
                                $('#status_LV').removeClass('label-default');
                                $('#status_LV').addClass('label-default');
                            } 
		})
		.catch(err => console.log(err));
        
        
//################################################## QUEUE STATUS #####################################################
//#####################################################################################################################


//QUEUE REGEL
	const urlregelqueue = 'url_entfernt';
        console.log("call "+urlregelqueue);
	fetch(urlregelqueue+datetime)
		.then(response => response.json())
		.then(queuestand_regel => {
                    if (queuestand_regel.length > 0) {
                        if (queuestand_regel[0].ANZAHL_VERGANGEN == '-'){
                            var qstand_aktuell = parseInt(queuestand_regel[0].ANZAHL_AKTUELL, 10); 
                            
                            document.getElementById("queue_regel_akt").innerHTML = qstand_aktuell;
                            document.getElementById("queue_regel_ver").innerHTML = '-';
                            document.getElementById("queue_regel_diff").innerHTML = '-';
                            $('#queue_regel_tend').removeClass('zmdi zmdi-trending-down');
                            $('#queue_regel_tend').removeClass('zmdi zmdi-trending-up');
                            $('#queue_regel_tend').removeClass('glyphicon glyphicon-ban-circle');
                            $('#queue_regel_tend').addClass('glyphicon glyphicon-ban-circle');
                            
                            /*Counter Animation*/
                            var counterAnim = $('.counter-anim-regel');
                            if( counterAnim.length > 0 )
                                {
                                counterAnim.counterUp({ delay: 10,
                                time: 1000});
                                }
                        } 
                        else if (queuestand_regel[0].ANZAHL_AKTUELL == '-'){
                            var qstand_vergangen = parseInt(queuestand_regel[0].ANZAHL_VERGANGEN, 10);
                            
                            document.getElementById("queue_regel_akt").innerHTML = '-';
                            document.getElementById("queue_regel_ver").innerHTML = qstand_vergangen;
                            document.getElementById("queue_regel_diff").innerHTML = '-';
                            $('#queue_regel_tend').removeClass('zmdi zmdi-trending-down');
                            $('#queue_regel_tend').removeClass('zmdi zmdi-trending-up');
                            $('#queue_regel_tend').removeClass('glyphicon glyphicon-ban-circle');
                            $('#queue_regel_tend').addClass('glyphicon glyphicon-ban-circle');
                        } 
                        else {
                            var qstand_aktuell = parseInt(queuestand_regel[0].ANZAHL_AKTUELL, 10);
                            var qstand_vergangen = parseInt(queuestand_regel[0].ANZAHL_VERGANGEN, 10);
                            var differenz = qstand_aktuell - qstand_vergangen;
                            var tendenz = (qstand_aktuell>qstand_vergangen) ? ('zmdi zmdi-trending-up') : ('zmdi zmdi-trending-down');
                        
                            document.getElementById("queue_regel_akt").innerHTML = qstand_aktuell;
                            document.getElementById("queue_regel_ver").innerHTML = qstand_vergangen;
                            document.getElementById("queue_regel_diff").innerHTML = differenz;
                            $('#queue_regel_tend').removeClass('zmdi zmdi-trending-down');
                            $('#queue_regel_tend').removeClass('zmdi zmdi-trending-up');
                            $('#queue_regel_tend').removeClass('glyphicon glyphicon-ban-circle');
                            $('#queue_regel_tend').addClass(tendenz);
                            
                            /*Counter Animation*/
                            var counterAnim = $('.counter-anim-regel');
                            if( counterAnim.length > 0 )
                                {
                                counterAnim.counterUp({ delay: 10,
                                time: 1000});
                             }
                        }
                    }
                    else {
                        document.getElementById("queue_regel_akt").innerHTML = '-';
                        document.getElementById("queue_regel_ver").innerHTML = '-';
                        document.getElementById("queue_regel_diff").innerHTML = '-';
                        $('#queue_regel_tend').removeClass('zmdi zmdi-trending-down');
                        $('#queue_regel_tend').removeClass('zmdi zmdi-trending-up');
                        $('#queue_regel_tend').removeClass('glyphicon glyphicon-ban-circle');
                        $('#queue_regel_tend').addClass('glyphicon glyphicon-ban-circle');
                         }
                    }
		)
		.catch(err => console.log(err));
        
        
        
//QUEUE BCA
	const urlbcaqueue = 'url_entfernt';
        console.log("call "+urlbcaqueue);
	fetch(urlbcaqueue+datetime)
		.then(response => response.json())
		.then(queuestand_bca => {
                    if (queuestand_bca.length > 0) {
                        if (queuestand_bca[0].ANZAHL_VERGANGEN == '-'){
                            var qstand_aktuell = parseInt(queuestand_bca[0].ANZAHL_AKTUELL, 10); 
                            
                            document.getElementById("queue_bca_akt").innerHTML = qstand_aktuell;
                            document.getElementById("queue_bca_ver").innerHTML = '-';
                            document.getElementById("queue_bca_diff").innerHTML = '-';
                            $('#queue_bca_tend').removeClass('zmdi zmdi-trending-down');
                            $('#queue_bca_tend').removeClass('zmdi zmdi-trending-up');
                            $('#queue_bca_tend').removeClass('glyphicon glyphicon-ban-circle');
                            $('#queue_bca_tend').addClass('glyphicon glyphicon-ban-circle');
                            
                            /*Counter Animation*/
                            var counterAnim = $('.counter-anim-bca');
                            if( counterAnim.length > 0 )
                                {
                                counterAnim.counterUp({ delay: 10,
                                time: 1000});
                                }
                        } 
                        else if (queuestand_bca[0].ANZAHL_AKTUELL == '-'){
                            var qstand_vergangen = parseInt(queuestand_bca[0].ANZAHL_VERGANGEN, 10);
                            
                            document.getElementById("queue_bca_akt").innerHTML = '-';
                            document.getElementById("queue_bca_ver").innerHTML = qstand_vergangen;
                            document.getElementById("queue_bca_diff").innerHTML = '-';
                            $('#queue_bca_tend').removeClass('zmdi zmdi-trending-down');
                            $('#queue_bca_tend').removeClass('zmdi zmdi-trending-up');
                            $('#queue_bca_tend').removeClass('glyphicon glyphicon-ban-circle');
                            $('#queue_bca_tend').addClass('glyphicon glyphicon-ban-circle');
                        } 
                        else {
                            var qstand_aktuell = parseInt(queuestand_bca[0].ANZAHL_AKTUELL, 10);
                            var qstand_vergangen = parseInt(queuestand_bca[0].ANZAHL_VERGANGEN, 10);
                            var differenz = qstand_aktuell - qstand_vergangen;
                            var tendenz = (qstand_aktuell>qstand_vergangen) ? ('zmdi zmdi-trending-up') : ('zmdi zmdi-trending-down');
                        
                            document.getElementById("queue_bca_akt").innerHTML = qstand_aktuell;
                            document.getElementById("queue_bca_ver").innerHTML = qstand_vergangen;
                            document.getElementById("queue_bca_diff").innerHTML = differenz;
                            $('#queue_bca_tend').removeClass('zmdi zmdi-trending-down');
                            $('#queue_bca_tend').removeClass('zmdi zmdi-trending-up');
                            $('#queue_bca_tend').removeClass('glyphicon glyphicon-ban-circle');
                            $('#queue_bca_tend').addClass(tendenz);
                            
                            /*Counter Animation*/
                            var counterAnim = $('.counter-anim-bca');
                            if( counterAnim.length > 0 )
                                {
                                counterAnim.counterUp({ delay: 10,
                                time: 1000});
                             }
                        }
                    }
                    else {
                        document.getElementById("queue_bca_akt").innerHTML = '-';
                        document.getElementById("queue_bca_ver").innerHTML = '-';
                        document.getElementById("queue_bca_diff").innerHTML = '-';
                        $('#queue_bca_tend').removeClass('zmdi zmdi-trending-down');
                        $('#queue_bca_tend').removeClass('zmdi zmdi-trending-up');
                        $('#queue_bca_tend').removeClass('glyphicon glyphicon-ban-circle');
                        $('#queue_bca_tend').addClass('glyphicon glyphicon-ban-circle');
                         }
                    }
		)
		.catch(err => console.log(err));

        
//QUEUE SPRING
	const urlspringqueue = 'url_entfernt';
        console.log("call "+urlspringqueue);
	fetch(urlspringqueue+datetime)
		.then(response => response.json())
		.then(queuestand_spring => {
                    if (queuestand_spring.length > 0) {
                        if (queuestand_spring[0].ANZAHL_VERGANGEN == '-'){
                            var qstand_aktuell = parseInt(queuestand_spring[0].ANZAHL_AKTUELL, 10); 
                            
                            document.getElementById("queue_spring_akt").innerHTML = qstand_aktuell;
                            document.getElementById("queue_spring_ver").innerHTML = '-';
                            document.getElementById("queue_spring_diff").innerHTML = '-';
                            $('#queue_spring_tend').removeClass('zmdi zmdi-trending-down');
                            $('#queue_spring_tend').removeClass('zmdi zmdi-trending-up');
                            $('#queue_spring_tend').removeClass('glyphicon glyphicon-ban-circle');
                            $('#queue_spring_tend').addClass('glyphicon glyphicon-ban-circle');
                            
                            /*Counter Animation*/
                            var counterAnim = $('.counter-anim-spring');
                            if( counterAnim.length > 0 )
                                {
                                counterAnim.counterUp({ delay: 10,
                                time: 1000});
                                }
                        } 
                        else if (queuestand_spring[0].ANZAHL_AKTUELL == '-'){
                            var qstand_vergangen = parseInt(queuestand_spring[0].ANZAHL_VERGANGEN, 10);
                            
                            document.getElementById("queue_spring_akt").innerHTML = '-';
                            document.getElementById("queue_spring_ver").innerHTML = qstand_vergangen;
                            document.getElementById("queue_spring_diff").innerHTML = '-';
                                }
                        } 
                        else if (queuestand_cvs[0].ANZAHL_AKTUELL == '-'){
                            var qstand_vergangen = parseInt(queuestand_cvs[0].ANZAHL_VERGANGEN, 10);
                            
                            document.getElementById("queue_cvs_akt").innerHTML = '-';
                            document.getElementById("queue_cvs_ver").innerHTML = qstand_vergangen;
                            document.getElementById("queue_cvs_diff").innerHTML = '-';
                            $('#queue_cvs_tend').removeClass('zmdi zmdi-trending-down');
                            $('#queue_cvs_tend').removeClass('zmdi zmdi-trending-up');
                            $('#queue_cvs_tend').removeClass('glyphicon glyphicon-ban-circle');
                            $('#queue_cvs_tend').addClass('glyphicon glyphicon-ban-circle');
                        } 
                        else {
                            var qstand_aktuell = parseInt(queuestand_cvs[0].ANZAHL_AKTUELL, 10);
                            var qstand_vergangen = parseInt(queuestand_cvs[0].ANZAHL_VERGANGEN, 10);
                            var differenz = qstand_aktuell - qstand_vergangen;
                            var tendenz = (qstand_aktuell>qstand_vergangen) ? ('zmdi zmdi-trending-up') : ('zmdi zmdi-trending-down');
                        
                            document.getElementById("queue_cvs_akt").innerHTML = qstand_aktuell;
                            document.getElementById("queue_cvs_ver").innerHTML = qstand_vergangen;
                            document.getElementById("queue_cvs_diff").innerHTML = differenz;
                            $('#queue_cvs_tend').removeClass('zmdi zmdi-trending-down');
                            $('#queue_cvs_tend').removeClass('zmdi zmdi-trending-up');
                            $('#queue_cvs_tend').removeClass('glyphicon glyphicon-ban-circle');
                            $('#queue_cvs_tend').addClass(tendenz);
                            
                            /*Counter Animation*/
                            var counterAnim = $('.counter-anim-cvs');
                            if( counterAnim.length > 0 )
                                {
                                counterAnim.counterUp({ delay: 10,
                                time: 1000});
                             }
                        }
                    }
                    else {
                        document.getElementById("queue_cvs_akt").innerHTML = '-';
                        document.getElementById("queue_cvs_ver").innerHTML = '-';
                        document.getElementById("queue_cvs_diff").innerHTML = '-';
                        $('#queue_cvs_tend').removeClass('zmdi zmdi-trending-down');
                        $('#queue_cvs_tend').removeClass('zmdi zmdi-trending-up');
                        $('#queue_cvs_tend').removeClass('glyphicon glyphicon-ban-circle');
                        $('#queue_cvs_tend').addClass('glyphicon glyphicon-ban-circle');
                         }
                    }
		)
		.catch(err => console.log(err));


 };
 
 
/*****Ready function end*****/       
        




/*****Ready function start*****/
$(document).ready(function () {

	$('#statement').DataTable({
		"bFilter": false,
		"bLengthChange": false,
		"bPaginate": false,
		"bInfo": false
	})
});
/*****Ready function end*****/





/*****Load function start*****/
$(window).on("load", function () {
	window.setTimeout(function () {
		$.toast({
			heading: 'ARTO',
			text: 'KuV Monitoring',
			position: 'bottom-left',
			loaderBg: '#e58b25',
			icon: 'success',
			hideAfter: 3500,
			stack: 6
		});
	}, 3000);
});
/*****Load function* end*****/

/*****E-Charts function start*****/

var echartsConfig = function () {
	if ($('#e_chart_1').length > 0) {
		var eChart_1 = echarts.init(document.getElementById('e_chart_1'));
		var option = {
			xAxis: {
				type: 'time',
				boundaryGap: false,
				axisLine: {
					show: false
				},
				axisLabel: {
					textStyle: {
						color: '#878787',
						fontStyle: 'normal',
						fontWeight: 'normal',
						fontFamily: "'Roboto', sans-serif",
						fontSize: 12
					}
				},
				splitLine: {
					show: false,
				},
			},
			yAxis: {
				data: ['1', '2', '3'],
				axisLine: {
					show: false
				},
				axisLabel: {
					textStyle: {
						color: '#878787',
						fontStyle: 'normal',
						fontWeight: 'normal',
						fontFamily: "'Roboto', sans-serif",
						fontSize: 12
					}
				},
				splitLine: {
					show: false,
				},
				boundaryGap: [0, '100%']
			},
			tooltip: {
				trigger: 'axis',
				backgroundColor: 'rgba(33,33,33,1)',
				borderRadius: 0,
				padding: 10,
				axisPointer: {
					type: 'cross',
					label: {
						backgroundColor: 'rgba(33,33,33,1)'
					}
				},
				textStyle: {
					color: '#fff',
					fontStyle: 'normal',
					fontWeight: 'normal',
					fontFamily: "'Roboto', sans-serif",
					fontSize: 12
				}
			},
			series: [
				{
					name: 'ab1',
					type: 'bar',
					stack: '1',
					itemStyle: {
						normal: {
							color: 'rgba(0,0,0,0)'
						}
					},
					data: [
						new Date("2015/09/2"),
						new Date("2015/09/8"),
						new Date("2015/09/18"),
					]
				}, {
					name: 'ab2',
					type: 'bar',
					stack: '1',
					itemStyle: {
						normal: {
							color: '#ea0a8e',
							barBorderRadius: 100,
							shadowBlur: 5,
							shadowColor: 'rgba(0, 0, 0, .5)'
						}
					},
					data: [
						new Date("2015/09/19"),
						new Date("2015/09/29"),
						new Date("2015/09/28"),
					]
				}
			]
		};
		eChart_1.setOption(option);
		eChart_1.resize();
	}
	if ($('#e_chart_durchsatz').length > 0) {
		var eChart_4 = echarts.init(document.getElementById('e_chart_durchsatz'));
		function detectionData(str) {
			var color = '#DDF1FC';
			if (str >= 30 && str <= 60) {
				color = '#98D6F7';
			} else if (str > 60) {
				color = '#53BAF2';
			}
			return color;
		}
		var option4 = {
			"tooltip": {
				"formatter": "{a} <br/>{b} : {c}%"
			},
			"series": [{
				"name": "traffic",
				"type": "gauge",
				"splitNumber": 5,
				"axisLine": {
					"lineStyle": {
						"color": [
							[0.31, "#f4f4f4"],
							[1, "#f4f4f4"]
						],
						"width": 10
					}
				},
				"axisTick": {
					"lineStyle": {
						"color": '#53BAF2',
						"width": 2
					},
					"length": -25,
					"splitNumber": 1
				},
				"axisLabel": {
					"distance": -80,
					"textStyle": {
						"color": "#878787"
					}
				},
				"splitLine": {
					"show": false
				},
				"itemStyle": {
					"normal": {
						"color": "#53BAF2"
					}
				},
				"detail": {
					"formatter": "{value}%",
					"offsetCenter": [0, "60%"],
					"textStyle": {
						"fontSize": 12,
						"color": "#878787"
					}
				},
				"title": {
					"offsetCenter": [0, "100%"]
				},
				"data": [{
					"name": "",
					"value": 31

				}]
			}]
		}
		var wert = 50;
		var app = [];
		app.timeTicket = setInterval(function () {
			wert += 5;
			wert = wert % 100;
			var value = wert.toFixed(0) - 0;
			option4.series[0].data[0].value = value;
			option4.series[0].axisLine.lineStyle.color[0][0] = value / 100;
			option4.series[0].axisLine.lineStyle.color[0][1] = detectionData(value);
			eChart_4.setOption(option4, true);
		}, 2000);

		eChart_4.setOption(option4);
		eChart_4.resize();
	}
	if ($('#e_chart_2').length > 0) {
		var eChart_2 = echarts.init(document.getElementById('e_chart_2'));
		var data = [];

		for (var i = 0; i <= 100; i++) {
			var theta = i / 100 * 360;
			var r = 5 * (1 + Math.sin(theta / 180 * Math.PI));
			data.push([r, theta]);
		}

		var option1 = {
			polar: {},
			tooltip: {
				trigger: 'axis',
				backgroundColor: 'rgba(33,33,33,1)',
				borderRadius: 0,
				padding: 10,
				axisPointer: {
					type: 'cross',
					label: {
						backgroundColor: 'rgba(33,33,33,1)'
					}
				}
			},
			angleAxis: {
				type: 'value',
				startAngle: 0,
				axisLine: {
					lineStyle: {
						color: 'rgba(33, 33, 33, 0.1)'
					},
					textStyle: {
						color: '#878787',
						fontSize: 12,
						fontFamily: "'Roboto', sans-serif",
					}
				},
				axisLabel: {
					textStyle: {
						color: '#878787',
						fontSize: 12,
						fontFamily: "'Roboto', sans-serif",
					}
				},
			},
			radiusAxis: {
				axisLine: {
					lineStyle: {
						color: 'rgba(33, 33, 33, 0.1)'
					}
				},
				axisLabel: {
					textStyle: {
						color: '#878787',
						fontSize: 12,
						fontFamily: "'Roboto', sans-serif",
					}
				},
			},

			series: [{
				coordinateSystem: 'polar',
				name: 'line',
				type: 'line',
				data: data,
				itemStyle: {
					normal: {
						color: '#ea0a8e',
					}
				},
			}]
		};
		eChart_2.setOption(option1);
		eChart_2.resize();
	}

	if ($('#e_chart_3').length > 0) {
		var eChart_3 = echarts.init(document.getElementById('e_chart_3'));
		var option3 = {
			series: [{
				type: 'liquidFill',
				data: [0.65, 0.6, 0.5, 0.4],
				radius: '100%',
				shape: 'pin',
				color: ['#f7b0d9', '#e956ac', '#E20074', '#9e075f'],
				backgroundStyle: {
					borderWidth: 0,
					color: 'rgba(255,255,255,0)',
					shadowBlur: 0
				},
				itemStyle: {
					normal: {
						shadowBlur: 5,
						shadowColor: 'rgba(0, 0, 0, .5)'
					}
				},
				outline: {
					borderDistance: 1,
					itemStyle: {
						borderWidth: 1,
						borderColor: '#E20074',
						shadowBlur: 0,
					}
				},
				label: {
					normal: {
						fontSize: 20
					}
				}
			}]
		};
		eChart_3.setOption(option3);
		eChart_3.resize();
	}

	if ($('#e_chart_5').length > 0) {
		var eChart_5 = echarts.init(document.getElementById('e_chart_5'));
		var colorPalette = ['#9e075f', '#E20074', '#e956ac', '#f7b0d9', '#ffc0f5']
		var option = {
		};
		var databeast = {
			0: [{ value: 335, name: '1' },
			{ value: 210, name: '2' },
			{ value: 334, name: '3' },
			{ value: 125, name: '4' },
			{ value: 148, name: '5' }],
			6: [{ value: 335, name: '1' },
			{ value: 510, name: '2' },
			{ value: 134, name: '3' },
			{ value: 185, name: '4' },
			{ value: 18, name: '5' }],
			12: [{ value: 35, name: '1' },
			{ value: 10, name: '2' },
			{ value: 34, name: '3' },
			{ value: 35, name: '4' },
			{ value: 548, name: '5' }],
			18: [{ value: 33, name: '1' },
			{ value: 31, name: '2' },
			{ value: 23, name: '3' },
			{ value: 13, name: '4' },
			{ value: 15, name: '5' }],
			24: [{ value: 33, name: '1' },
			{ value: 30, name: '2' },
			{ value: 23, name: '3' },
			{ value: 35, name: '4' },
			{ value: 158, name: '5' }],
			30: [{ value: 35, name: '1' },
			{ value: 310, name: '2' },
			{ value: 24, name: '3' },
			{ value: 35, name: '4' },
			{ value: 548, name: '5' }],
			36: [{ value: 135, name: '1' },
			{ value: 310, name: '2' },
			{ value: 234, name: '3' },
			{ value: 535, name: '4' },
			{ value: 548, name: '5' }],
			42: [{ value: 335, name: '1' },
			{ value: 310, name: '2' },
			{ value: 134, name: '3' },
			{ value: 35, name: '4' },
			{ value: 408, name: '5' }],
			48: [{ value: 235, name: '1' },
			{ value: 310, name: '2' },
			{ value: 234, name: '3' },
			{ value: 135, name: '4' },
			{ value: 548, name: '5' }],
			54: [{ value: 35, name: '1' },
			{ value: 10, name: '2' },
			{ value: 34, name: '3' },
			{ value: 15, name: '4' },
			{ value: 18, name: '5' }],
		};
		var timeLineData = [0, 6, 12, 18, 24, 30, 36, 42, 48, 54];
		var radiusoffset = 0;
		var xpositionoffset = 0;
		var ypostionoffset = 0;
		document.getElementById("e_chart_5").style.height = "300px";
		if (window.innerWidth < 1400) {
			xpositionoffset = 10;
			ypostionoffset = 22;
			radiusoffset = 30;
			document.getElementById("e_chart_5").style.height = "500px";
		}



		option = {
			baseOption: {
				timeline: {
					show: true,
					axisType: 'category',
					tooltip: {
						show: true,
						formatter: function (params) {
							console.log(params);
							return params.name + 'xyz';
						}
					},
					autoPlay: true,
					currentIndex: 6,
					playInterval: 5000,
					checkpointStyle: {
						color: 'transparent',
						borderColor: '#ea0a8e'
					},
					itemStyle: {
						normal: {
							color: '#ea0a8e'
						},
						emphasis: {
							color: '#ea0a8e'
						}
					},
					controlStyle: {
						show: false
					},
					lineStyle: {
						color: '#ea0a8e'
					},
					label: {
						normal: {
							show: true,
							interval: 'auto',
							formatter: '{value}',
							textStyle: {
								color: '#878787',
								fontStyle: 'normal',
								fontWeight: 'normal',
								fontFamily: "'Roboto', sans-serif",
								fontSize: 12
							}
						},
					},
					data: [],
				},
				series: [],
			},

			options: [

			],
		};
		for (var i = 0; i < timeLineData.length; i++) {
			option.baseOption.timeline.data.push(timeLineData[i]);
			option.options.push({
				tooltip: {
					trigger: 'item',
					formatter: '{a} <br/>{b}: {c} ({d}%)'
				},
				legend: {
					orient: 'vertical',
					left: 10,
					data: ['1', '2', '3', '4', '5'],
				},
				series: [
					{
						color: colorPalette,
						legendHoverLink: false,
						name: 'CPU',
						type: 'pie',
						radius: [(55 - (radiusoffset * 0.8).toFixed(0)) + '%', (70 - radiusoffset) + '%'],
						center: [(20 + (xpositionoffset)) + '%', (45 - ypostionoffset) + '%'],
						avoidLabelOverlap: false,
						itemStyle: {
							normal: {
								label: {
									show: true,
									color: '#000000',
									fontSize: '20',
									position: 'center',
									formatter: () => {
										return 'CPU';
									},
								},
								labelLine: {
									show: false
								}
							},
						},
						data: databeast[timeLineData[i]]
					},
					{
						name: 'Memory',
						type: 'pie',
						radius: [(55 - (radiusoffset * 0.8).toFixed(0)) + '%', (70 - radiusoffset) + '%'],
						center: [(40 + (xpositionoffset * 3)) + '%', (45 - ypostionoffset) + '%'],
						avoidLabelOverlap: false,
						itemStyle: {
							normal: {
								label: {
									show: true,
									color: '#000000',
									fontSize: '20',
									position: 'center',
									formatter: () => {
										return 'Memory';
									},
								},
								labelLine: {
									show: false
								}
							},
						},
						data: databeast[timeLineData[(i + 1) % 9]]
					},
					{
						name: 'Storage',
						type: 'pie',
						radius: [(55 - (radiusoffset * 0.8).toFixed(0)) + '%', (70 - radiusoffset) + '%'],
						center: [(60 - (xpositionoffset * 3)) + '%', (45 + ypostionoffset) + '%'],
						avoidLabelOverlap: false,
						itemStyle: {
							normal: {
								label: {
									show: true,
									color: '#000000',
									fontSize: '20',
									position: 'center',
									formatter: () => {
										return 'Storage';
									},
								},
								labelLine: {
									show: false
								}
							},
						},
						data: databeast[timeLineData[(i + 2) % 9]]
					},
					{
						name: 'Queue',
						type: 'pie',
						radius: [(55 - (radiusoffset * 0.8).toFixed(0)) + '%', (70 - radiusoffset) + '%'],
						center: [(80 - (xpositionoffset * 1)) + '%', (45 + ypostionoffset) + '%'],
						avoidLabelOverlap: false,
						itemStyle: {
							normal: {
								label: {
									show: true,
									color: '#000000',
									fontSize: '20',
									position: 'center',
									formatter: () => {
										return 'Queue';
									},
								},
								labelLine: {
									show: false
								}
							},
						},
						data: databeast[timeLineData[(i + 3) % 9]]
					},
				],
			});
		}
		eChart_5.setOption(option);
		eChart_5.resize();
	}
}
/*****E-Charts function end*****/

/*****Sparkline function start*****/
var sparklineLogin = function () {
	
	if ($('#sparkline_durchsatz_regel').length > 0) {
		$("#sparkline_durchsatz_regel").sparkline(durchsatz_regel_data, {
			type: 'bar',
			width: '100%',
			height: '35',
			barWidth: '5',
			barSpacing: '3',
			barColor: '#53BAF2',
			highlightSpotColor: '#53BAF2'
		});
	}
	if ($('#sparkline_durchsatz_spring').length > 0) {

		$("#sparkline_durchsatz_spring").sparkline(durchsatz_spring_data, {
			type: 'bar',
			width: '100%',
			height: '35',
			barWidth: '5',
			barSpacing: '3',
			barColor: '#53BAF2',
			highlightSpotColor: '#53BAF2'
		});
	}

	if ($('#sparkline_durchsatz_bca').length > 0) {
		$("#sparkline_durchsatz_bca").sparkline(durchsatz_bca_data, {
			type: 'bar',
			width: '100%',
			height: '35',
			barWidth: '5',
			barSpacing: '3',
			barColor: '#53BAF2',
			highlightSpotColor: '#53BAF2'
		});
	}
	if ($('#sparkline_durchsatz_cvs').length > 0) {
		$("#sparkline_durchsatz_cvs").sparkline(durchsatz_cvs_data, {
			type: 'bar',
			width: '100%',
			height: '35',
			barWidth: '5',
			barSpacing: '3',
			barColor: '#53BAF2',
			highlightSpotColor: '#53BAF2'
		});
	}

	if ($('#sparkline_fehler_regel').length > 0) {
		$("#sparkline_fehler_regel").sparkline(fehler_regel_data, {
			type: 'line',
			width: '100%',
			height: '35',
			lineColor: '#E20000',
			fillColor: '#E20000',
			minSpotColor: '#E20000',
			maxSpotColor: '#E20000',
			spotColor: '#E20000',
			highlightLineColor: '#E20000',
			highlightSpotColor: '#E20000'
		});
	}

	if ($('#sparkline_fehler_spring').length > 0) {
		$("#sparkline_fehler_spring").sparkline(fehler_spring_data, {
			type: 'line',
			width: '100%',
			height: '35',
			lineColor: '#E20000',
			fillColor: '#E20000',
			minSpotColor: '#E20000',
			maxSpotColor: '#E20000',
			spotColor: '#E20000',
			highlightLineColor: '#E20000',
			highlightSpotColor: '#E20000'
		});
	}

	if ($('#sparkline_fehler_bca').length > 0) {
		$("#sparkline_fehler_bca").sparkline(fehler_bca_data, {
			type: 'line',
			width: '100%',
			height: '35',
			lineColor: '#E20000',
			fillColor: '#E20000',
			minSpotColor: '#E20000',
			maxSpotColor: '#E20000',
			spotColor: '#E20000',
			highlightLineColor: '#E20000',
			highlightSpotColor: '#E20000'
		});
	}

	if ($('#sparkline_fehler_cvs').length > 0) {
		$("#sparkline_fehler_cvs").sparkline(fehler_cvs_data, {
			type: 'line',
			width: '100%',
			height: '35',
			lineColor: '#E20000',
			fillColor: '#E20000',
			minSpotColor: '#E20000',
			maxSpotColor: '#E20000',
			spotColor: '#E20000',
			highlightLineColor: '#E20000',
			highlightSpotColor: '#E20000'
		});
	}
}
/*****Sparkline function end*****/

var donutLogin = function () {
	
	if( $('#pie_chart_vorverarbeitung').length > 0 ){
		$('#pie_chart_vorverarbeitung').easyPieChart({
			barColor : color_vorverarbeitung,
			lineWidth: 3,
			animate: 3000,
			size:	100,
			lineCap: 'square',
			trackColor: false,
			scaleColor: false,
			onStep: function(from, to, percent) {
				$(this.el).find('.percent').text(Math.round(percent));
			}
                        
		});
	}
        if( $('#pie_chart_regel').length > 0 ){
		$('#pie_chart_regel').easyPieChart({
			barColor : color_regel,
			lineWidth: 3,
			animate: 3000,
			size:	100,
			lineCap: 'square',
			trackColor: false,
			scaleColor: false,
			onStep: function(from, to, percent) {
				$(this.el).find('.percent').text(Math.round(percent));
			}
		});
	}
	if( $('#pie_chart_spring').length > 0 ){
		$('#pie_chart_spring').easyPieChart({
			barColor : color_spring,
			lineWidth: 3,
			animate: 3000,
			size:	100,
			lineCap: 'square',
			trackColor: false,
			scaleColor: false,
			onStep: function(from, to, percent) {
				$(this.el).find('.percent').text(Math.round(percent));
			}
		});
	}
}
if( $('#bcamodal').length > 0 ){
		$('#bcamodal').on('show.bs.modal', function () {
                  setTimeout(() => { morrisChartbca(); }, 500);
		});
	}
if( $('#springmodal').length > 0 ){
		$('#springmodal').on('show.bs.modal', function () {
                  setTimeout(() => { morrisChartspring(); }, 500);
		});
	}
if( $('#cvsmodal').length > 0 ){
		$('#cvsmodal').on('show.bs.modal', function () {
                  setTimeout(() => { morrisChartcvs(); }, 500);
		});
	}

/*****Resize function start*****/
var sparkResize, echartResize, donutResize;
$(window).on("resize", function () {
	/*Sparkline Resize*/
	clearTimeout(sparkResize);
	sparkResize = setTimeout(sparklineLogin, 200);

	/*E-Chart Resize*/
	clearTimeout(echartResize);
	echartResize = setTimeout(echartsConfig, 200);
        
      	/*Donut Resize*/
	clearTimeout(donutResize);
	donutResize = setTimeout(donutLogin, 200);

}).resize();
/*****Resize function end*****/

/*****Function Call start*****/
getData();
setInterval(getData, 180000)

sparklineLogin();
setInterval(sparklineLogin,2000)

donutLogin();
setInterval(donutLogin,2000)

echartsConfig();
/*****Function Call end*****/