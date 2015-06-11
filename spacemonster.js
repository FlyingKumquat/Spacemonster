var _SM_Version;
var _SM_Data;
var _timer;
var _targets;
var _targets_achi;
var _groups;

if($("#alloptions").find("#sm_options").length > 0){
	$("#sm_options").remove();
	$("#spacemonster_style").remove();
	$("#tickspeed").parents(".row .optionitem").remove();

	_SM_Version = 'v.1.1-1.8';
	_SM_Data = new Object();
	_timer = new Object();
		_timer['last'] = Date.now();
		_timer['now'] = _timer['last'];
		_timer['diff'] = 0;
		_timer['save_game'] = 0;
		_timer['income'] = 0;
		
	_targets = [1,5,25,50,75,100,150,200,250,300,350,400,450,500,600,700,800,900,1000,1100];
	_targets_achi = [10,50,100,150,200,250];

	_groups = new Object();
		_groups['Quantum'] = {units:[0,1,2,3], color:'#3d828b'};
		_groups['Molecular'] = {units:[4,5,6,7,8], color:'#825980'};
		_groups['Cellular'] = {units:[9,10,11], color:'#89930b'};
		_groups['Miniature'] = {units:[12,13,14,15], color:'#828284'};
		_groups['Organic'] = {units:[16,17,18,19], color:'#587925'};
		_groups['Massive'] = {units:[20,21,22,23], color:'#734a38'};
		_groups['Planetary'] = {units:[24,25,26,27,28,29,30,31,32,33], color:'#cd8539'};
		_groups['Stellar'] = {units:[34,35,36,37,38,39,40,41,42,43,44,45], color:'#c2569d'};
		_groups['Celestial'] = {units:[46,47,48,49,50,51,52,53,54,55,56,57,58], color:'#829eba'};
		_groups['Galactic'] = {units:[59,60,61,62,63,64,65,66], color:'#c1c1c2'};
		_groups['Hypergalactic'] = {units:[67,68,69,70,71,72,73], color:'#93777d'};
		_groups['Universal'] = {units:[74], color:'#03456c'};
	
	$('head').append('<link rel="stylesheet" href="https://rawgit.com/seiyria/bootstrap-slider/master/css/bootstrap-slider.css" type="text/css" />');
	$.getScript('https://rawgit.com/seiyria/bootstrap-slider/master/js/bootstrap-slider.js',function(){
		Load_SM();
	});
}else if($("#sm_options").length > 0){
	alert("already loaded");
}

function Load_SM(){
	$("head").append("<style id='spacemonster_style'></style>");
	$("#spacemonster_style").text(""
		+ ".littlebuttons { position:absolute; bottom:4px; right:3px; padding:0px; line-height:initial; font-size:14px; opacity:0.7; margin-bottom:0px; }"
		+ ".littlebuttons>li { padding:0px; }"
		+ ".littlebuttons>li>button { height:19px; width:30px; margin-right:1px; outline:none !important; }"
		+ ".littlebuttons>li>button:disabled, .littlebuttons>li>button:disabled:hover { color:#aa0000; background:#ffbbbb; text-decoration: line-through; opacity:1; }"
		+ ".next_glow { box-shadow:0 0 10px rgba(136, 255, 136, 0.5); border-color:#88ff88 !important; z-index:100; -webkit-animation: glow 1s ease-out; -webkit-animation-iteration-count: infinite; }"
		+ ".next_glow .divinfo { background-color:rgba(136, 255, 136, 0); -webkit-animation: pulsate 1s ease-out; -webkit-animation-iteration-count: infinite; }"
		+ ".navig { font-size:1.7em; }"
		+ ".navig>ul { display:table; width:100%; table-layout:fixed; }"
		+ ".sm_nav { display:table-cell !important; }"
		+ ".sm_note { opacity:0.75; font-style:normal; }"
		+ ".sm_note-danger { color:#ff8888; }"
		+ "#sm_option>a.toclick { color:#88ff88; }"
		+ "#sm_options { padding-top:10px; padding-bottom:15px; display:none; color:white; opacity:0.8; text-align:center; }"
		+ "#sm_options input[type=\"radio\"]:checked+span { color:#88ff88; opacity:1; }"
		+ "#sm_options input[type=\"checkbox\"]:checked+span { color:#88ff88; opacity:1; }"
		+ "#sm_options input[type=\"radio\"]+span { opacity:0.5; }"
		+ "#sm_options input[type=\"checkbox\"]+span { opacity:0.5; }"
		+ "#sm_options h1 { border-bottom: 1px dotted white; width:75%; }"
		+ ".sm_unit_type { color:#88ff88; position:absolute; top:2px; right:4px; padding:0px; line-height:initial; font-size:18px; opacity:1; }"
		+ "@-webkit-keyframes pulsate{"
		+ "0% { background-color:rgba(136, 255, 136, 0); }"
		+ "50% { background-color:rgba(136, 255, 136, 0.075); }"
		+ "100% { background-color:rgba(136, 255, 136, 0); }}"
		+ "@-webkit-keyframes glow{"
		+ "0% { box-shadow:0 0 3px rgba(136, 255, 136, 0) }"
		+ "50% { box-shadow:0 0 10px rgba(136, 255, 136, 0.75) }"
		+ "100% { box-shadow:0 0 3px rgba(136, 255, 136, 0) }}"
		+ ".slider-handle { background:#88ff88; opacity:1; }"
		+ ".slider-track { background:rgba(255,255,255,0.5); }"
		+ ".slider-selection { background:rgba(136, 255, 136, 0.5); }"
		+ ".slider .tooltip { pointer-events: none; font-family:inherit; }"
		+ ".sm_gritter { width:250px; left:-106px; }"
		+ "#gritter-notice-wrapper.top-left .sm_gritter { left:0px; }"
		+ "#gritter-notice-wrapper.bottom-left .sm_gritter { left:0px; }"
		+ "#gritter-notice-wrapper.top-right { width: 144px; text-align: center; }"
		+ "#gritter-notice-wrapper.bottom-left { width: 144px; text-align: center; }"
		+ "#gritter-notice-wrapper.top-left { width: 144px; text-align: center; }"
		+ "#gritter-notice-wrapper.bottom-left .achi {width: 241px; margin-left: 0px !important;}"
		+ "#gritter-notice-wrapper.top-left .achi {width: 241px; margin-left: 0px !important;}"
		+ "#idmain { z-index:101; }"
	+ "");

	Setup_Nav();
	Create_Options_Menu();
	Init_Options();
	Load_SM_Data();
	Handle_Loaded_Data();
	Edit_Functions();
	
	$.gritter.add({
		title: '<span style="color:#88ff88;"><i class="fa fa-rocket"></i> Spacemonster</span>',
		text: 'Spacemonster ' + _SM_Version + ' has been loaded successfully!',
		class_name: 'sm_gritter',
		time: 3000
	});
	
	SM_Main_Loop();
	SM_Game_Loop();
}

function SM_Main_Loop(){
	var timeNow = Date.now();
	Manage_Timer();
	Check_Unit_Options();
	Update_Visuals();
    setTimeout(function (){
        SM_Main_Loop();
    },1000 / _SM_Data['Spacemonster Update Rate'] - (Date.now() - timeNow)) // "true" ms
}

function SM_Game_Loop(){
	var timeNow = Date.now();
	Manage_Timer();
	Do_Income();
	setTimeout(function (){
        SM_Game_Loop();
    },Calc_Game_Time() - (Date.now() - timeNow)) // "true" ms
}

function Do_Income(){
	if (atomepersecond > 0) {
		var amount = ((atomepersecond * prestige) * (_timer['income'] / 1000));
		totalAtome += amount;
		atomsaccu += amount;
		actualiser();
		checkspec();
	}
	_timer['income'] = 0;
	noclick();
}

function Calc_Game_Time(){
	var out = 0;
	switch(_SM_Data['Game Update Rate']){
		case "1": out = 10000; break;
		case "2": out = 5000; break;
		case "3": out = 3000; break;
		case "4": out = 1000; break;
		case "5": out = 500; break;
		case "6": out = 250; break;
		case "7": out = 100; break;
		case "8": out = 67; break;
		case "9": out = 33; break;
		case "10": out = 17; break;
	}
	return out;
}

function Update_Visuals(){
	if(_SM_Data['Scroll Top Atom Bar'] == "1"){
		//$('#idmain').css('top', '0px');
	}
}

function Manage_Timer(){
	_timer['last'] = _timer['now'];
	_timer['now'] = Date.now();
	_timer['diff'] = _timer['now'] - _timer['last'];
	_timer['save_game'] += _timer['diff'];
	_timer['income'] += _timer['diff'];
	
	if(_SM_Data['Auto Save Game Frequency'] < 930 && (_timer['save_game'] / 1000) > _SM_Data['Auto Save Game Frequency']){
		setAll();
		$.gritter.add({
			title: '<span style="color:#88ff88;"><i class="fa fa-save"></i> Game Saved</span>',
			text: 'The universe is expanding',
			time: 5000
		});
		_timer['save_game'] = 0;
	}
}

function Check_Unit_Options(){
	Update_Table();
	Check_Can_Buy();
}

function Check_Can_Buy(){
	$.each(arUnit, function(k,v){
		if(arUnit[k][16] == true || k == 0){
			var type = Get_Unit_Type(k);
			var tmp = arUnit[k][2];
			var cost = tmp;
			var afford = [false, false, false, false, false, false];
			var next = Find_ToNext(k);
			for(var i = 1; i <= 100; i++){
				if(totalAtome >= cost){
					tmp = Number(tmp) + (tmp * arUnit[k][3]) / 100;
					var tar = (arUnit[k][4] * 1) + i;
					var a = $.inArray(tar, _targets);
					var reduction = 1;
					if(a > -1 && tar <= 1000){
						var b = true;
						$.each(type[2],function(k2,v2){
							if(v2 != k && arUnit[v2][4] < tar){
								b = false;
							}
						});
						if(b){
							var c = $.inArray(totalAchi() + 1, _targets_achi);
							if(c > -1){
								reduction *= (1 - ((c + 1) * 0.01));
							}
							reduction *= (1 - ((a + 1) * 0.01));
						}
					}
					tmp *= reduction;
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
		if($(this).hasClass('ads')){ continue; }
		if($(this).find('ul.littlebuttons').length < 1){
			var id = $(this).attr('id').replace('tc','') - 1;
			var unit_type = Get_Unit_Type(id);
			$(this).find('button.littlex10').remove();
			$(this).find('button.littlemax').remove();
			$(this).find('.divinfo').attr('style', '');
			$(this).find('.divinfo div').append(''
				+ '<div class="sm_unit_type" style="color:' + unit_type[1] + ';" style="display:none;">' + unit_type[0] + '</div>'
				+ '<ul class="list-unstyled list-inline text-center littlebuttons">'
					+ '<li><button id="' + id + '_x5" class="btn btn-default btn-xs" type="button" onmouseover="seeUnit(' + id + ')" onclick="toxN(5,' + id + '); Check_Unit_Options();" style="display:none;">X5</button></li>'
					+ '<li><button id="' + id + '_x10" class="btn btn-default btn-xs" type="button" onmouseover="seeUnit(' + id + ')" onclick="toxN(10,' + id + '); Check_Unit_Options();" style="display:none;">X10</button></li>'
					+ '<li><button id="' + id + '_x25" class="btn btn-default btn-xs" type="button" onmouseover="seeUnit(' + id + ')" onclick="toxN(25,' + id + '); Check_Unit_Options();" style="display:none;">X25</button></li>'
					+ '<li><button id="' + id + '_x50" class="btn btn-default btn-xs" type="button" onmouseover="seeUnit(' + id + ')" onclick="toxN(50,' + id + '); Check_Unit_Options();" style="display:none;">X50</button></li>'
					+ '<li><button id="' + id + '_x100" class="btn btn-default btn-xs" type="button" onmouseover="seeUnit(' + id + ')" onclick="toxN(100,' + id + '); Check_Unit_Options();" style="display:none;">X100</button></li>'
					+ '<li><button id="' + id + '_next" class="btn btn-default btn-xs" type="button" onmouseover="seeUnit(' + id + ')" onclick="tonext(' + id + '); Check_Unit_Options();" style="display:none;">NEXT</button></li>'
					+ '<li><button id="' + id + '_max" class="btn btn-default btn-xs" type="button" onmouseover="seeUnit(' + id + ')" onclick="tomax(' + id + '); Check_Unit_Options();" style="display:none;">MAX</button></li>'
				+ '</ul>'
			+ '');
		}
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
			+ "<div class='col-sm-12' style=''>"
				+ "<p class='optionsheader' style='color:#88ff88;'>Spacemonster <small style='color:#ffffff; font-size:50%; opacity:0.5;'>"+_SM_Version+"</small></p>"
			+ "</div>"
		+ "</div>"
		+ "<div class='row'>"
			+ "<div class='col-sm-6' style='font-size:20px;'>"
				+ "<center><h1><i class='fa fa-cube'></i> Units</h1></center>"
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
					+ "</label>&nbsp;&nbsp;&nbsp;&nbsp;"
					+ "<label class='checkbox-inline'>"
						+ "<input type='checkbox' name='SM_Option_5'> <span>X25</span>"
					+ "</label>&nbsp;&nbsp;&nbsp;&nbsp;"
					+ "<label class='checkbox-inline'>"
						+ "<input type='checkbox' name='SM_Option_6'> <span>X50</span>"
					+ "</label>&nbsp;&nbsp;&nbsp;&nbsp;"
					+ "<label class='checkbox-inline'>"
						+ "<input type='checkbox' name='SM_Option_7'> <span>X100</span>"
					+ "</label>&nbsp;&nbsp;&nbsp;&nbsp;"
					+ "<label class='checkbox-inline'>"
						+ "<input type='checkbox' name='SM_Option_8'> <span>NEXT</span>"
					+ "</label>&nbsp;&nbsp;&nbsp;&nbsp;"
					+ "<label class='checkbox-inline'>"
						+ "<input type='checkbox' name='SM_Option_9' checked> <span>MAX</span>"
					+ "</label>"
				+ "</div>"
			+ "</div>"
			+ "<div class='col-sm-6' style='font-size:20px;'>"
			+ "<center><h1><i class='fa fa-asterisk'></i> Misc</h1></center>"
				+ "<div class='col-sm-6' align=right>Game Update Rate:</div>"
				+ "<div class='col-sm-6' align=left>"
					+ "<input id='SM_Option_15' data-slider-id='SM_Option_15' type='text' data-slider-min='1' data-slider-max='10' data-slider-step='1' data-slider-value='7'/>"
				+ "</div>"
				+ "<div class='col-sm-6' align=right>Spacemonster Update Rate:</div>"
				+ "<div class='col-sm-6' align=left>"
					+ "<input id='SM_Option_11' data-slider-id='SM_Option_11' type='text' data-slider-min='1' data-slider-max='60' data-slider-step='1' data-slider-value='10'/>"
				+ "</div>"
				+ "<div class='col-sm-12' align=center><small class='sm_note sm_note-danger'><i class='fa fa-exclamation-triangle'></i> higher update rates may cause the game to run slower than normal <i class='fa fa-exclamation-triangle'></i></small></div>"
				+ "<div class='col-sm-6' align=right>Auto Save Game Frequency:</div>"
				+ "<div class='col-sm-6' align=left>"
					+ "<input id='SM_Option_12' data-slider-id='SM_Option_12' type='text' data-slider-min='30' data-slider-max='930' data-slider-step='30' data-slider-value='300'/>"
				+ "</div>"
			+ "</div>"
			+ "<div class='col-sm-6' style='font-size:20px;'>"
			+ "<center><h1><i class='fa fa-desktop'></i> General Display</h1></center>"
				+ "<div class='col-sm-6' align=right>Scroll Top Atom Bar:</div>"
				+ "<div class='col-sm-6' align=left>"
					+ "<label class='radio-inline'>"
						+ "<input type='radio' name='SM_Option_13' value='0' checked> <span>Yes</span>"
					+ "</label>&nbsp;&nbsp;&nbsp;&nbsp;"
					+ "<label class='radio-inline'>"
						+ "<input type='radio' name='SM_Option_13' value='1'> <span>No</span>"
					+ "</label>"
				+ "</div>"
				+ "<div class='col-sm-6' align=right>Notifications Position:</div>"
				+ "<div class='col-sm-6' align=left>"
					+ "<label class='radio-inline'>"
						+ "<input type='radio' name='SM_Option_14' value='0'> <span>Top Left</span>"
					+ "</label>&nbsp;&nbsp;&nbsp;&nbsp;"
					+ "<label class='radio-inline'>"
						+ "<input type='radio' name='SM_Option_14' value='1'> <span>Top Right</span>"
					+ "</label></br>"
					+ "<label class='radio-inline'>"
						+ "<input type='radio' name='SM_Option_14' value='2'> <span>Bot Left</span>"
					+ "</label>&nbsp;&nbsp;&nbsp;&nbsp;"
					+ "<label class='radio-inline'>"
						+ "<input type='radio' name='SM_Option_14' value='3' checked> <span>Bot Right</span>"
					+ "</label>"
				+ "</div>"
			+ "</div>"
		+ "</div>"
	+ "</div>");
}

function Change_Notifications_Position(){
	var pos = '';
	switch($('input[name="SM_Option_14"]:checked').val()){
		case "0": pos = 'top-left'; break;
		case "1": pos = 'top-right'; break;
		case "2": pos = 'bottom-left'; break;
		case "3": pos = 'bottom-right'; break;
	}
	$.extend($.gritter.options, { position: pos, fade_in_speed: 'medium', fade_out_speed: 500, time: 10000 });
}

function Init_Options(){
	for(var i = 0; i < 15; i++){
		$('input[name="SM_Option_' + i + '"]').bind("change",function(){ Save_SM_Data(); });
	}
	$('#SM_Option_11').on('slideStop',Save_SM_Data);
	$('#SM_Option_12').on('slideStop',Save_SM_Data);
	$('#SM_Option_15').on('slideStop',Save_SM_Data);
	$('input[name="SM_Option_14"]').bind("change",function(){ Change_Notifications_Position(); });
}

function Load_SM_Data(){
	if (typeof Storage !== "undefined"){
		if(localStorage.SpaceMonster != undefined){
			var json = JSON.parse(localStorage.SpaceMonster);
			if(json['version'] == _SM_Version){
				_SM_Data = json;
				return;
			}
		}
	}
	$('input[name="SM_Option_4"]').prop('checked', true);
	$('input[name="SM_Option_9"]').prop('checked', true);
	localStorage.SpaceMonster = "{}";
	Save_SM_Data();
}

function Save_SM_Data(){
	var obj = new Object();
		obj['version'] = _SM_Version;
	
	obj['Display Unit Types'] = $('input[name="SM_Option_0"]:checked').val();
	obj['Color Units by Type'] = $('input[name="SM_Option_1"]:checked').val();
	obj['Disable Unaffordable Buttons'] = $('input[name="SM_Option_2"]:checked').val();
	obj['Glow Unit on Next'] = $('input[name="SM_Option_10"]:checked').val();
	obj['Scroll Top Atom Bar'] = $('input[name="SM_Option_13"]:checked').val();
	obj['Notifications Position'] = $('input[name="SM_Option_14"]:checked').val();

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
	
	if($('div#SM_Option_11').length < 1){
		obj['Spacemonster Update Rate'] = $('#SM_Option_11').attr('data-slider-value');
		obj['Auto Save Game Frequency'] = $('#SM_Option_12').attr('data-slider-value');
		obj['Game Update Rate'] = $('#SM_Option_15').attr('data-slider-value');
	}else{
		obj['Spacemonster Update Rate'] = $('input[id="SM_Option_11"]').val();
		obj['Auto Save Game Frequency'] = $('input[id="SM_Option_12"]').val();
		obj['Game Update Rate'] = $('input[id="SM_Option_15"]').val();
	}

	if (typeof Storage !== "undefined"){
		localStorage.SpaceMonster = JSON.stringify(obj);
	}
	_SM_Data = obj;
}

function Handle_Loaded_Data(){
	$('input[name="SM_Option_0"][value="' + _SM_Data['Display Unit Types'] + '"]').prop('checked', true);
	$('input[name="SM_Option_1"][value="' + _SM_Data['Color Units by Type'] + '"]').prop('checked', true);
	$('input[name="SM_Option_2"][value="' + _SM_Data['Disable Unaffordable Buttons'] + '"]').prop('checked', true);
	$('input[name="SM_Option_10"][value="' + _SM_Data['Glow Unit on Next'] + '"]').prop('checked', true);
	$('input[name="SM_Option_13"][value="' + _SM_Data['Scroll Top Atom Bar'] + '"]').prop('checked', true);
	$('input[name="SM_Option_14"][value="' + _SM_Data['Notifications Position'] + '"]').prop('checked', true);
	Change_Notifications_Position();
	
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
	
	if(_SM_Data['Spacemonster Update Rate'] != undefined){
		$('#SM_Option_11').attr('data-slider-value', _SM_Data['Spacemonster Update Rate']);
		$('#SM_Option_12').attr('data-slider-value', _SM_Data['Auto Save Game Frequency']);
		$('#SM_Option_15').attr('data-slider-value', _SM_Data['Game Update Rate']);
	}
		
	$('#SM_Option_11').slider({
		formatter: function(value) {
			return value + '/sec.';
		}
	});
	
	$('#SM_Option_12').slider({
		formatter: function(value) {
			return To_Time(value);
		}
	});
	
	$('#SM_Option_15').slider({
		formatter: function(value) {
			return To_Rate(value);
		}
	});
}

function Edit_Functions(){
	var temp = '';
	// Main_Loop()
	Main_Loop = function(){ return false; }
	
	//game save interval
	clearInterval(thirdinterval);
	
	//game income interval
	clearInterval(inter1);
	
	// lightreset()
	temp = lightreset.toString().replace("&& a != encrypt('Py')", "&& a != encrypt('Py') && a != 'SpaceMonster'");
	lightreset = new Function(temp.substring(temp.indexOf('{')+1,temp.lastIndexOf('}')));
	
	// deleteAll()
	temp = deleteAll.toString().replace("localStorage.clear();", "var hodl = localStorage.SpaceMonster;\r\n\tlocalStorage.clear();\r\n\tlocalStorage.SpaceMonster = hodl;");
	deleteAll = new Function(temp.substring(temp.indexOf('{')+1,temp.lastIndexOf('}')));
	
	// window scroll functionality
	$(window).scroll(function(){
		/*if(_SM_Data['Scroll Top Atom Bar'] == "0"){
			if($('#idmain2').css('position') == 'fixed' || $(window).scrollTop() < 80){
				$('#idmain').css('top', '0px');
			}else if($(window).scrollTop() > 79){
				$('#idmain').css('top', ($(window).scrollTop() - 79) + 'px');
			}
		}*/
		if(_SM_Data['Scroll Top Atom Bar'] == "1"){
			$('#idmain').css('cssText', 'position:relative !important;');
		}
	});
	
	/*
	$('script').each(function(k, v){
		if(v.innerText.indexOf("$(window).scroll(function") >= 0){
			console.log(v.innerText);
			return false;
		}
	});
	*/
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
	var c = arUnit[id][4];
	var n = 0;
	for(var i = _targets.length-1; i >= 0; i--){
		if(c < _targets[i]){ n = _targets[i]; }
		else { break; }
	}
	return n - c;
}

function Get_Unit_Type(id){
	var out;
	$.each(_groups,function(k,v){
		if($.inArray(id, v['units']) != -1){
			out = [k, v['color'], v['units']];
			return false;
		}
	});
	return out;
}

function To_Time(s){
	if(s == 930){ return "never"; }

	var out = "";
	var min = parseInt( s / 60 ) % 60;
	var sec = s % 60;
	
	if(min > 0){
		out += min + "min. "
	}
	if(sec > 0){
		out += sec + "sec."
	}
	
	return out;
}

function To_Rate(s){
	var out = "";
	switch(s){
		case 1: out = "1 per 10sec."; break;
		case 2: out = "1 per 5sec."; break;
		case 3: out = "1 per 3sec."; break;
		case 4: out = "1 per 1sec."; break;
		case 5: out = "2 per 1sec."; break;
		case 6: out = "4 per 1sec."; break;
		case 7: out = "10 per 1sec."; break;
		case 8: out = "15 per 1sec."; break;
		case 9: out = "30 per 1sec."; break;
		case 10: out = "60 per 1sec."; break;
	}
	return out;
}

function Find_MAX_Buy(id){
	var out = 0;
	if(arUnit[id][16] == true || id == 0){
		var type = Get_Unit_Type(id);
		var tmp = arUnit[id][2];
		var cost = tmp;
		while(true){
			if(totalAtome >= cost){
				out++;
				tmp = Number(tmp) + (tmp * arUnit[id][3]) / 100;
				var tar = (arUnit[id][4] * 1) + out;
				var a = $.inArray(tar, _targets);
				var reduction = 1;
				if(a > -1 && tar <= 1000){
					var b = true;
					$.each(type[2],function(k,v){
						if(v != id && arUnit[v][4] < tar){
							b = false;
						}
					});
					if(b){
						var c = $.inArray(totalAchi() + 1, _targets_achi);
						if(c > -1){
							reduction *= (1 - ((c + 1) * 0.01));
						}
						reduction *= (1 - ((a + 1) * 0.01));
					}
				}
				tmp *= reduction;
				cost += tmp;
			}else{
				break;
			}
		}
	}
	return out;
}

function Find_Cost(id,count){
	var out = [0,0];
	if(arUnit[id][16] == true || id == 0){
		var type = Get_Unit_Type(id);
		var tmp = arUnit[id][2];
		var cost = tmp;
		for(var i = 1; i <= count; i++){
			tmp = Number(tmp) + (tmp * arUnit[id][3]) / 100;
			out = [cost,tmp];
			var tar = (arUnit[id][4] * 1) + i;
			var a = $.inArray(tar, _targets);
			var reduction = 1;
			if(a > -1 && tar <= 1000){
				var b = true;
				$.each(type[2],function(k,v){
					if(v != id && arUnit[v][4] < tar){
						b = false;
					}
				});
				if(b){
					var c = $.inArray(totalAchi() + 1, _targets_achi);
					if(c > -1){
						reduction *= (1 - ((c + 1) * 0.01));
					}
					reduction *= (1 - ((a + 1) * 0.01));
				}
			}
			tmp *= reduction;
			cost += tmp;
		}
	}
	return out;
}

function Find_APS(id,count){
	var out = 0;
	if(arUnit[id][16] == true || id == 0){
		var tmp = arUnit[id][5];
		var aps = tmp;
		var multi = 1;
		for(var i = 1; i <= count; i++){
			out = aps;
			var tar = (arUnit[id][4] * 1) + i;
			var a = $.inArray(tar, _targets);
			if(a > -1){
				if(tar >= 5 && tar <= 100){ multi *= 2; }
				if(tar >= 150 && tar <= 500){ multi *= 3; }
				if(tar >= 600 && tar <= 1000){ multi *= 5; }
			}
			aps += tmp * multi;
		}
	}
	return out;
}

function SM_Buy(id,count){
	var cost = [0,0];
	var aps = 0;
	if(count == "NEXT"){
		count = Find_ToNext(id);
	}else if(count == "MAX"){
		count = Find_MAX_Buy(id);
	}
	if(count > 0){
		cost = Find_Cost(id,count);
		aps = Find_APS(id,count);
		if(totalAtome >= cost[0]){
			atomsinvest += cost[0];
			doc.getElementById('atomsinvest').innerHTML = rounding(atomsinvest, false,0);
			totalAtome -= cost[0];
			arUnit[id][2] = cost[1];
			arUnit[id][4] += count;
		}
	}
}
