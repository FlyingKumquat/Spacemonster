var _version;
var _SM_Data;

if($("#sm_options").length > 0){
	alert("already loaded");
}else{
	_version = 'v.1.0-1.65';
	_SM_Data = new Object();
	Load_SM();
}

function Load_SM(){
	$("head").append("<style id='spacemonster_style'></style>");
	$("#spacemonster_style").text(""
		+ ".littlebuttons { position:absolute; bottom:4px; right:3px; padding:0px; line-height:initial; font-size:14px; opacity:0.7; margin-bottom:0px; }"
		+ ".littlebuttons>li { padding:0px; }"
		+ ".littlebuttons>li>button { height:19px; width:30px; margin-right:1px; outline:none !important; }"
		+ ".littlebuttons>li>button:disabled { color:#aa0000; background:#ffbbbb; text-decoration: line-through; opacity:1; }"
		+ ".next_glow { box-shadow:0 0 10px rgba(136, 255, 136, 0.5); border-color:#88ff88 !important; z-index:100; -webkit-animation: glow 1s ease-out; -webkit-animation-iteration-count: infinite; }"
		+ ".next_glow .divinfo { background-color:rgba(136, 255, 136, 0); -webkit-animation: pulsate 1s ease-out; -webkit-animation-iteration-count: infinite; }"
		+ ".navig { font-size:1.7em; }"
		+ ".navig>ul { display:table; width:100%; table-layout:fixed; }"
		+ ".sm_nav { display:table-cell !important; }"
		+ "#sm_option>a.toclick { color:#88ff88; }"
		+ "#sm_options { padding-top:10px; display:none; color:white; opacity:0.8; text-align:center; }"
		+ "#sm_options input[type=\"radio\"]:checked+span { color:#88ff88; opacity:1; }"
		+ "#sm_options input[type=\"checkbox\"]:checked+span { color:#88ff88; opacity:1; }"
		+ "#sm_options input[type=\"radio\"]+span { opacity:0.5; }"
		+ "#sm_options input[type=\"checkbox\"]+span { opacity:0.5; }"
		+ ".sm_unit_type { color:#88ff88; position:absolute; top:2px; right:4px; padding:0px; line-height:initial; font-size:18px; opacity:1; }"
		+ "@-webkit-keyframes pulsate{"
		+ "0% { background-color:rgba(136, 255, 136, 0); }"
		+ "50% { background-color:rgba(136, 255, 136, 0.075); }"
		+ "100% { background-color:rgba(136, 255, 136, 0); }}"
		+ "@-webkit-keyframes glow{"
		+ "0% { box-shadow:0 0 3px rgba(136, 255, 136, 0) }"
		+ "50% { box-shadow:0 0 10px rgba(136, 255, 136, 0.75) }"
		+ "100% { box-shadow:0 0 3px rgba(136, 255, 136, 0) }}"
	+ "");

	Setup_Nav();
	Create_Options_Menu();
	Init_Options();
	Load_SM_Data();
	Handle_Loaded_Data();
	Edit_Functions();
	
	Main_Loop();
}

function Main_Loop(){
	var timeNow = Date.now();
	Check_Unit_Options();
    setTimeout(function (){
        Main_Loop();
    },100 - (Date.now() - timeNow)) // "true" 100ms
}

function Check_Unit_Options(){
	Update_Table();
	Check_Can_Buy();
}

function Check_Can_Buy(){
	$.each(arUnit, function(k,v){
		if(arUnit[k][16] == true || k == 0){
			var tmp = arUnit[k][2];
			var cost = tmp;
			var afford = [false, false, false, false, false, false];
			var next = Find_ToNext(k);
			for(var i = 1; i <= 100; i++){
				if(totalAtome >= cost){
					tmp = Number(tmp) + (tmp * arUnit[k][3]) / 100;
					cost += tmp;
				}else{
					break;
				}
				switch(i){
					case 5: afford[0] = true; break;
					case 10: afford[1] = true; break;
					case 25: afford[2] = true; break;
					case 50: afford[3] = true; break;
					case 100: afford[4] = true; break;
				}
				if(i == next){ afford[5] = true; }
			}
			
			if($("#" + k + "_x5").is(':disabled') && (_SM_Data['Disable Unaffordable Buttons'] == "1" || afford[0])){
				$("#" + k + "_x5").prop('disabled', false);
			}else if(_SM_Data['Disable Unaffordable Buttons'] == "0" && $("#" + k + "_x5").not(':disabled') && !afford[0]){
				$("#" + k + "_x5").prop('disabled', true);
			}
			
			if($("#" + k + "_x10").is(':disabled') && (_SM_Data['Disable Unaffordable Buttons'] == "1" || afford[1])){
				$("#" + k + "_x10").prop('disabled', false);
			}else if(_SM_Data['Disable Unaffordable Buttons'] == "0" && $("#" + k + "_x10").not(':disabled') && !afford[1]){
				$("#" + k + "_x10").prop('disabled', true);
			}
			
			if($("#" + k + "_x25").is(':disabled') && (_SM_Data['Disable Unaffordable Buttons'] == "1" || afford[2])){
				$("#" + k + "_x25").prop('disabled', false);
			}else if(_SM_Data['Disable Unaffordable Buttons'] == "0" && $("#" + k + "_x25").not(':disabled') && !afford[2]){
				$("#" + k + "_x25").prop('disabled', true);
			}
			
			if($("#" + k + "_x50").is(':disabled') && (_SM_Data['Disable Unaffordable Buttons'] == "1" || afford[3])){
				$("#" + k + "_x50").prop('disabled', false);
			}else if(_SM_Data['Disable Unaffordable Buttons'] == "0" && $("#" + k + "_x50").not(':disabled') && !afford[3]){
				$("#" + k + "_x50").prop('disabled', true);
			}
			
			if($("#" + k + "_x100").is(':disabled') && (_SM_Data['Disable Unaffordable Buttons'] == "1" || afford[4])){
				$("#" + k + "_x100").prop('disabled', false);
			}else if(_SM_Data['Disable Unaffordable Buttons'] == "0" && $("#" + k + "_x100").not(':disabled') && !afford[4]){
				$("#" + k + "_x100").prop('disabled', true);
			}
			
			if($("#" + k + "_next").is(':disabled') && (_SM_Data['Disable Unaffordable Buttons'] == "1" || afford[5])){
				$("#" + k + "_next").prop('disabled', false);
			}else if(_SM_Data['Disable Unaffordable Buttons'] == "0" && $("#" + k + "_next").not(':disabled') && !afford[5]){
				$("#" + k + "_next").prop('disabled', true);
			}
			
			if(_SM_Data['Glow Unit on Next'] == "0" && afford[5]){
				$("#tc" + (k + 1)).addClass('next_glow');
			}else{
				$("#tc" + (k + 1)).removeClass('next_glow');
			}
		}
	});
}

function Update_Table(){
	$('#TableObjects').children().each(function(i){
		if($(this).find('i.fa-lock').length > 0){ return false; }
		if($(this).find('ul.littlebuttons').length < 1){
			var id = $(this).attr('id').replace('tc','') - 1;
			var unit_type = Get_Unit_Type(id);
			$(this).find('button.littlex10').remove();
			$(this).find('button.littlemax').remove();
			$(this).find('.divinfo').attr('style', '');
			$(this).find('.divinfo div').append(''
				+ '<div class="sm_unit_type" style="color:' + unit_type[1] + ';" hidden>' + unit_type[0] + '</div>'
				+ '<ul class="list-unstyled list-inline text-center littlebuttons">'
					+ '<li><button id="' + id + '_x5" class="btn btn-default btn-xs" type="button" onmouseover="seeUnit(' + id + ')" onclick="toxN(5,' + id + ')" hidden>X5</button></li>'
					+ '<li><button id="' + id + '_x10" class="btn btn-default btn-xs" type="button" onmouseover="seeUnit(' + id + ')" onclick="toxN(10,' + id + ')" hidden>X10</button></li>'
					+ '<li><button id="' + id + '_x25" class="btn btn-default btn-xs" type="button" onmouseover="seeUnit(' + id + ')" onclick="toxN(25,' + id + ')" hidden>X25</button></li>'
					+ '<li><button id="' + id + '_x50" class="btn btn-default btn-xs" type="button" onmouseover="seeUnit(' + id + ')" onclick="toxN(50,' + id + ')" hidden>X50</button></li>'
					+ '<li><button id="' + id + '_x100" class="btn btn-default btn-xs" type="button" onmouseover="seeUnit(' + id + ')" onclick="toxN(100,' + id + ')" hidden>X100</button></li>'
					+ '<li><button id="' + id + '_next" class="btn btn-default btn-xs" type="button" onmouseover="seeUnit(' + id + ')" onclick="tonext(' + id + ')" hidden>NEXT</button></li>'
					+ '<li><button id="' + id + '_max" class="btn btn-default btn-xs" type="button" onmouseover="seeUnit(' + id + ')" onclick="tomax(' + id + ')" hidden>MAX</button></li>'
				+ '</ul>'
			+ '');
		}else{
			var id = $(this).attr('id').replace('tc','') - 1;
			var unit_type = Get_Unit_Type(id);
			
			if(_SM_Data['Display Unit Types'] == "0" && $(this).find('.sm_unit_type').is(":hidden")){
				$(this).find('.sm_unit_type').show();
			}else if(_SM_Data['Display Unit Types'] == "1" && $(this).find('.sm_unit_type').is(":visible")){
				$(this).find('.sm_unit_type').hide();
			}
			
			if(_SM_Data['Color Units by Type'] == "1" && $(this).find('.divinfo').attr('style').indexOf("box-shadow") >= 0){
				$(this).find('.divinfo').attr('style','');
			}else if(_SM_Data['Color Units by Type'] == "0" && $(this).find('.divinfo').attr('style').indexOf("box-shadow") == -1){
				$(this).find('.divinfo').attr('style','box-shadow:inset 0 0 5px 1px ' + unit_type[1] + ';');
			}
			
			if(_SM_Data['Display Buy Buttons X5'] == "1" && $('#' + id + '_x5').is(":hidden")){
				$('#' + id + '_x5').show();
			}else if(_SM_Data['Display Buy Buttons X5'] == "0" && $('#' + id + '_x5').is(":visible")){
				$('#' + id + '_x5').hide();
			}
			
			if(_SM_Data['Display Buy Buttons X10'] == "1" && $('#' + id + '_x10').is(":hidden")){
				$('#' + id + '_x10').show();
			}else if(_SM_Data['Display Buy Buttons X10'] == "0" && $('#' + id + '_x10').is(":visible")){
				$('#' + id + '_x10').hide();
			}
			
			if(_SM_Data['Display Buy Buttons X25'] == "1" && $('#' + id + '_x25').is(":hidden")){
				$('#' + id + '_x25').show();
			}else if(_SM_Data['Display Buy Buttons X25'] == "0" && $('#' + id + '_x25').is(":visible")){
				$('#' + id + '_x25').hide();
			}
			
			if(_SM_Data['Display Buy Buttons X50'] == "1" && $('#' + id + '_x50').is(":hidden")){
				$('#' + id + '_x50').show();
			}else if(_SM_Data['Display Buy Buttons X50'] == "0" && $('#' + id + '_x50').is(":visible")){
				$('#' + id + '_x50').hide();
			}
			
			if(_SM_Data['Display Buy Buttons X100'] == "1" && $('#' + id + '_x100').is(":hidden")){
				$('#' + id + '_x100').show();
			}else if(_SM_Data['Display Buy Buttons X100'] == "0" && $('#' + id + '_x100').is(":visible")){
				$('#' + id + '_x100').hide();
			}
			
			if(_SM_Data['Display Buy Buttons NEXT'] == "1" && $('#' + id + '_next').is(":hidden")){
				$('#' + id + '_next').show();
			}else if(_SM_Data['Display Buy Buttons NEXT'] == "0" && $('#' + id + '_next').is(":visible")){
				$('#' + id + '_next').hide();
			}
			
			if(_SM_Data['Display Buy Buttons MAX'] == "1" && $('#' + id + '_max').is(":hidden")){
				$('#' + id + '_max').show();
			}else if(_SM_Data['Display Buy Buttons MAX'] == "0" && $('#' + id + '_max').is(":visible")){
				$('#' + id + '_max').hide();
			}
		}
	});
}

function Setup_Nav(){
	$(".navig").children("ul").append(""
		+ "<li class id='sm_option'><a class='toclick'><i class='fa fa-rocket'></i>&nbsp;Spacemonster</a></li>"
	+ "");
	
	$(".navig").children("ul").children("li").each(function(i){
		$(this).removeClass();
		$(this).addClass("sm_nav");
	});
	
	$("#special").click(function(){ $("#sm_options").hide(); });
	$("#upgrade").click(function(){ $("#sm_options").hide(); });
	$("#unit").click(function(){ $("#sm_options").hide(); });
	$("#achievement").click(function(){ $("#sm_options").hide(); });
	$("#option").click(function(){ $("#sm_options").hide(); });
	$("#prestige").click(function(){ $("#sm_options").hide(); });
	$("#sm_option").click(function(){
		$('#allbonus').hide();
		$('#TableObjects').hide();
		$('#specials').hide();
		$('#achievements').hide();
		$('#idInfosAndProgress').hide();
		$('#prestiges').hide();
		$('#alloptions').hide();
		$("#sm_options").show();
	});
}

function Create_Options_Menu(){
	$("#Main").append("<div id='sm_options'>"
		+ "<div class='row'>"
			+ "<div class='col-sm-12' style='border-bottom:1px solid white;'>"
				+ "<p class='optionsheader' style='color:#88ff88;'>Spacemonster <small style='color:#ffffff; font-size:50%; opacity:0.5;'>"+_version+"</small></p>"
			+ "</div>"
		+ "</div>"
		+ "<div class='row'>"
			+ "<div class='col-sm-6' style='font-size:20px;'>"
				+ "<center><h1>Units</h1></center>"
				+ "<div class='col-sm-6' align=right>Display Unit Types:</div>"
				+ "<div class='col-sm-6' align=left>"
					+ "<label class='radio-inline'>"
						+ "<input type='radio' name='SM_Option_0' value='0'> <span>Yes</span>"
					+ "</label>&nbsp;&nbsp;&nbsp;&nbsp;"
					+ "<label class='radio-inline'>"
						+ "<input type='radio' name='SM_Option_0' value='1' checked> <span>No</span>"
					+ "</label>"
				+ "</div>"
				+ "<div class='col-sm-6' align=right>Color Units by Type:</div>"
				+ "<div class='col-sm-6' align=left>"
					+ "<label class='radio-inline'>"
						+ "<input type='radio' name='SM_Option_1' value='0'> <span>Yes</span>"
					+ "</label>&nbsp;&nbsp;&nbsp;&nbsp;"
					+ "<label class='radio-inline'>"
						+ "<input type='radio' name='SM_Option_1' value='1' checked> <span>No</span>"
					+ "</label>"
				+ "</div>"
				+ "<div class='col-sm-6' align=right>Disable Unaffordable Buttons:</div>"
				+ "<div class='col-sm-6' align=left>"
					+ "<label class='radio-inline'>"
						+ "<input type='radio' name='SM_Option_2' value='0'> <span>Yes</span>"
					+ "</label>&nbsp;&nbsp;&nbsp;&nbsp;"
					+ "<label class='radio-inline'>"
						+ "<input type='radio' name='SM_Option_2' value='1' checked> <span>No</span>"
					+ "</label>"
				+ "</div>"
				+ "<div class='col-sm-6' align=right>Glow Unit on Next:</div>"
				+ "<div class='col-sm-6' align=left>"
					+ "<label class='radio-inline'>"
						+ "<input type='radio' name='SM_Option_10' value='0'> <span>Yes</span>"
					+ "</label>&nbsp;&nbsp;&nbsp;&nbsp;"
					+ "<label class='radio-inline'>"
						+ "<input type='radio' name='SM_Option_10' value='1' checked> <span>No</span>"
					+ "</label>"
				+ "</div>"
				+ "<div class='col-sm-6' align=right>Display Buy Buttons:</div>"
				+ "<div class='col-sm-6' align=left>"
					+ "<label class='checkbox-inline'>"
						+ "<input type='checkbox' name='SM_Option_3'> <span>X5</span>"
					+ "</label>&nbsp;&nbsp;&nbsp;&nbsp;"
					+ "<label class='checkbox-inline'>"
						+ "<input type='checkbox' name='SM_Option_4' checked> <span>X10</span>"
					+ "</label>"
					+ "<label class='checkbox-inline'>"
						+ "<input type='checkbox' name='SM_Option_5'> <span>X25</span>"
					+ "</label>"
					+ "<label class='checkbox-inline'>"
						+ "<input type='checkbox' name='SM_Option_6'> <span>X50</span>"
					+ "</label>"
					+ "<label class='checkbox-inline'>"
						+ "<input type='checkbox' name='SM_Option_7'> <span>X100</span>"
					+ "</label>"
					+ "<label class='checkbox-inline'>"
						+ "<input type='checkbox' name='SM_Option_8'> <span>NEXT</span>"
					+ "</label>"
					+ "<label class='checkbox-inline'>"
						+ "<input type='checkbox' name='SM_Option_9' checked> <span>MAX</span>"
					+ "</label>"
				+ "</div>"
			+ "</div>"
		+ "</div>"
	+ "</div>");
}

function Init_Options(){
	for(var i = 0; i < 11; i++){
		$('input[name="SM_Option_' + i + '"]').bind("change",function(){ Save_SM_Data(); });
	}
}

function Load_SM_Data(){
	if (typeof Storage !== "undefined"){
		if(localStorage.SM_Data != undefined){
			var json = JSON.parse(localStorage.SM_Data);
			if(json['version'] == _version){
				_SM_Data = json;
				return;
			}
		}
	}
	$('input[name="SM_Option_4"]').prop('checked', true);
	$('input[name="SM_Option_9"]').prop('checked', true);
	localStorage.SM_Data = "{}";
	Save_SM_Data();
}

function Save_SM_Data(){
	var obj = new Object();
		obj['version'] = _version;
	
	obj['Display Unit Types'] = $('input[name="SM_Option_0"]:checked').val();
	obj['Color Units by Type'] = $('input[name="SM_Option_1"]:checked').val();
	obj['Disable Unaffordable Buttons'] = $('input[name="SM_Option_2"]:checked').val();
	obj['Glow Unit on Next'] = $('input[name="SM_Option_10"]:checked').val();

	if($('input[name="SM_Option_3"]').is(':checked')) { obj['Display Buy Buttons X5'] = "1"; }
	else { obj['Display Buy Buttons X5'] = "0"; }
	
	if($('input[name="SM_Option_4"]').is(':checked')) { obj['Display Buy Buttons X10'] = "1"; }
	else { obj['Display Buy Buttons X10'] = "0"; }
	
	if($('input[name="SM_Option_5"]').is(':checked')) { obj['Display Buy Buttons X25'] = "1"; }
	else { obj['Display Buy Buttons X25'] = "0"; }
	
	if($('input[name="SM_Option_6"]').is(':checked')) { obj['Display Buy Buttons X50'] = "1"; }
	else { obj['Display Buy Buttons X50'] = "0"; }
	
	if($('input[name="SM_Option_7"]').is(':checked')) { obj['Display Buy Buttons X100'] = "1"; }
	else { obj['Display Buy Buttons X100'] = "0"; }
	
	if($('input[name="SM_Option_8"]').is(':checked')) { obj['Display Buy Buttons NEXT'] = "1"; }
	else { obj['Display Buy Buttons NEXT'] = "0"; }
	
	if($('input[name="SM_Option_9"]').is(':checked')) { obj['Display Buy Buttons MAX'] = "1"; }
	else { obj['Display Buy Buttons MAX'] = "0"; }

	if (typeof Storage !== "undefined"){
		localStorage.SM_Data = JSON.stringify(obj);
	}
	_SM_Data = obj;
}

function Handle_Loaded_Data(){
	$('input[name="SM_Option_0"][value="' + _SM_Data['Display Unit Types'] + '"]').prop('checked', true);
	$('input[name="SM_Option_1"][value="' + _SM_Data['Color Units by Type'] + '"]').prop('checked', true);
	$('input[name="SM_Option_2"][value="' + _SM_Data['Disable Unaffordable Buttons'] + '"]').prop('checked', true);
	$('input[name="SM_Option_10"][value="' + _SM_Data['Glow Unit on Next'] + '"]').prop('checked', true);
	
	if(_SM_Data['Display Buy Buttons X5'] == "1") { $('input[name="SM_Option_3"]').prop('checked', true); }
	else { $('input[name="SM_Option_3"]').prop('checked', false);}
	
	if(_SM_Data['Display Buy Buttons X10'] == "1") { $('input[name="SM_Option_4"]').prop('checked', true); }
	else { $('input[name="SM_Option_4"]').prop('checked', false);}
	
	if(_SM_Data['Display Buy Buttons X25'] == "1") { $('input[name="SM_Option_5"]').prop('checked', true); }
	else { $('input[name="SM_Option_5"]').prop('checked', false);}
	
	if(_SM_Data['Display Buy Buttons X50'] == "1") { $('input[name="SM_Option_6"]').prop('checked', true); }
	else { $('input[name="SM_Option_6"]').prop('checked', false);}
	
	if(_SM_Data['Display Buy Buttons X100'] == "1") { $('input[name="SM_Option_7"]').prop('checked', true); }
	else { $('input[name="SM_Option_7"]').prop('checked', false);}
	
	if(_SM_Data['Display Buy Buttons NEXT'] == "1") { $('input[name="SM_Option_8"]').prop('checked', true); }
	else { $('input[name="SM_Option_8"]').prop('checked', false);}
	
	if(_SM_Data['Display Buy Buttons MAX'] == "1") { $('input[name="SM_Option_9"]').prop('checked', true); }
	else { $('input[name="SM_Option_9"]').prop('checked', false);}
}

function Edit_Functions(){
	var temp = '';
	// lightreset()
	temp = lightreset.toString().replace("&& a != encrypt('Py')", "&& a != encrypt('Py') && a != 'SM_Data'");
	lightreset = new Function(temp.substring(temp.indexOf('{')+1,temp.lastIndexOf('}')));
	
	// deleteAll()
	temp = deleteAll.toString().replace("localStorage.clear();", "var hodl = localStorage.SM_Data;\r\n\tlocalStorage.clear();\r\n\tlocalStorage.SM_Data = hodl;");
	deleteAll = new Function(temp.substring(temp.indexOf('{')+1,temp.lastIndexOf('}')));
}

function toxN(n,id){
	if(arUnit[id][16] || arUnit[id][8] == "quantum foam"){
		for(var y = 0; y < n; y++){
			mainCalc(id);
		}
	}
}

function tonext(id){
	var next = Find_ToNext(id);
	if(arUnit[id][16] || arUnit[id][8] == "quantum foam"){
		for(var y = 0; y < next; y++){
			mainCalc(id);
		}
	}
}

function Find_ToNext(id){
	var targets = [1,5,25,50,75,100,150,200,250,300,350,400,450,500,600,700,800,900,1000,1100];
	var c = arUnit[id][4];
	var n = 0;
	for(var i = targets.length-1; i >= 0; i--){
		if(c < targets[i]){ n = targets[i]; }
		else { break; }
	}
	return n - c;
}

function Get_Unit_Type(id){
	var types 	= ['Quantum',	'Molecular',	'Cellular',	'Miniature',	'Organic',	'Massive',	'Planetary',	'Stellar',	'Celestial',	'Galactic',	'Hypergalactic',	'Universal'];
	var colors 	= ['#3d828b',	'#825980',		'#89930b',	'#828284',		'#587925',	'#734a38',	'#cd8539',		'#c2569d',	'#829eba',		'#c1c1c2',	'#93777d',			'#03456c'];
	var t = 0;
	if(id < 4){ t = 0; }
	if(id > 3 && id < 9){ t = 1; }
	if(id > 8 && id < 12){ t = 2; }
	if(id > 11 && id < 16){ t = 3; }
	if(id > 15 && id < 20){ t = 4; }
	if(id > 19 && id < 24){ t = 5; }
	if(id > 23 && id < 34){ t = 6; }
	if(id > 33 && id < 46){ t = 7; }
	if(id > 45 && id < 59){ t = 8; }
	if(id > 58 && id < 67){ t = 9; }
	if(id > 66 && id < 74){ t = 10; }
	if(id > 73 && id < 75){ t = 11; }
	return [types[t], colors[t]];
}