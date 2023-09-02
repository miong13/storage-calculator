
var total_storage = 0;

function isEmail(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}

function percent_accumulated_storage(ftsq_val, sugg_stor){
	var fin;
	if(sugg_stor == null){
		fin = 400;
	}else{
		fin = sugg_stor;
	}
	
	var perc = (ftsq_val / fin) * 100;
	return perc;
}

function total_storage_value(ftsq_val){
	ftsq_val = Number(ftsq_val);
	total_storage = total_storage + ftsq_val;
	total_storage = Number.parseFloat(total_storage);
	// console.log('+total : ' + total_storage);
	return total_storage; 
}

function subtract_storage_value(ftsq_val){
	ftsq_val = Number(ftsq_val);
	if(total_storage > 0){
		total_storage -= ftsq_val;
	}else{
		total_storage = 0;
	}
	if(total_storage == 0){
		total_storage = 0;
	}
	total_storage = Number.parseFloat(total_storage);
	// console.log('-total : ' + total_storage);
	return total_storage; 
}

function collect_items(item_id, item_collection){
	var get_cont = jQuery('#' + item_collection).val();
	// var get_cont = item_id;
	get_cont = get_cont.replace(item_id + ';', '');
	get_cont += item_id + ";";
	jQuery('#'+ item_collection).val(get_cont);
}

function remove_from_collection(item_id, item_collection){
	var get_cont = jQuery('#' + item_collection).val();
	get_cont = get_cont.replace(item_id + ';', '');
	jQuery('#'+ item_collection).val(get_cont);	
}

function compute_collected_items(item_collection){
	var collections = jQuery('#' + item_collection).val();
	console.log('collections : ' + collections);
	var array_collections = collections.split(';');
	var qty, ftsql, total_cap = 0, temp_total;
	console.log(array_collections);

	array_collections.forEach(function(item, index){
		if(item !== ""){
			qty = jQuery('#' + item ).val();
			ftsql = jQuery('#ftsq-val-'+ item).val();
			temp_total = ftsql * qty;
			total_cap = total_cap + temp_total;
		}
		console.log('item : ' + item);
		

	});
	console.log('total cap : ' + total_cap);
	return total_cap;
}

function suggestedStorage(storage_val){
/*
7.5'x10'	75 ft2	600 ft3
10'x10'	100 ft2	800 ft3
10'x15'	150 ft2	1200 ft3
10'x20'	200 ft2	1600 ft3
10'x25'	250 ft2	2000 ft3
10'x30'	300 ft2	2400 ft3
*/
	var suggestion1 = "5' x 10' = 50 ft<sup>2</sup> = 400ft<sup>3</sup>";
	var suggestion2 = "7.5' x 10' = 75 ft<sup>2</sup> = 600ft<sup>3</sup>";
	var suggestion3 = "10' x 10' = 100 ft<sup>2</sup> = 800ft<sup>3</sup>";
	var suggestion4 = "10' x 15' = 150 ft<sup>2</sup> = 1200ft<sup>3</sup>";
	var suggestion5 = "10' x 20' = 200 ft<sup>2</sup> = 1600ft<sup>3</sup>";
	var suggestion6 = "10' x 25' = 250 ft<sup>2</sup> = 2000ft<sup>3</sup>";
	var suggestion7 = "10' x 23' = 300 ft<sup>2</sup> = 2400ft<sup>3</sup>";
	if(storage_val > 0 && storage_val <= 400){
		jQuery('#suggested_storage').html(suggestion1);
		jQuery('#suggested_cubeft').html('400');
		return 400;
	}else if(storage_val > 400 && storage_val <= 600){
		jQuery('#suggested_storage').html(suggestion2);
		jQuery('#suggested_cubeft').html('600');
		return 600;
	}else if(storage_val > 600 && storage_val <= 800){
		jQuery('#suggested_storage').html(suggestion3);
		jQuery('#suggested_cubeft').html('800');
		return 800;
	}else if(storage_val > 800 && storage_val <= 1200){
		jQuery('#suggested_storage').html(suggestion4);
		jQuery('#suggested_cubeft').html('1200');
		return 1200;
	}else if(storage_val > 1200 && storage_val <= 1600){
		jQuery('#suggested_storage').html(suggestion5);
		jQuery('#suggested_cubeft').html('1600');
		return 1600;
	}else if(storage_val > 1600 && storage_val <= 2000){
		jQuery('#suggested_storage').html(suggestion6);
		jQuery('#suggested_cubeft').html('2000');
		return 2000;
	}else if(storage_val > 2000 && storage_val <= 2400){
		jQuery('#suggested_storage').html(suggestion7);
		jQuery('#suggested_cubeft').html('2400');
		return 2400;
	}
}

function solveCubicFeetInch(l, w, h){
	console.log('solving...');
	var res = 0;
	res = (l * w * h) / 1728;
	console.log(res.toFixed(1));
	return res.toFixed(1);
}

jQuery.noConflict();
(function( $ ) {
  $(function() {
    // More code using $ as alias to jQuery
	$('.livingroom').change(function() {
		
		console.log('click check');
		var id = $(this).data('id');
		var qty_current;
		var get_val = $('#ftsq-val-'+ id).val();
		// console.log('get_val : ' + get_val);
		var t_storage;
		if(this.checked){
			collect_items(id, 'living_room_items');
			
			qty_current = $('#' + id).val();
			if(qty_current == '0'){
				$('#' + id).val('1');
			}
			// t_storage = total_storage_value(get_val);
		}else{
			remove_from_collection(id, 'living_room_items');

			// t_storage = subtract_storage_value(get_val);
			$('#' + id).val('0');
		}

		t_storage = compute_collected_items('living_room_items');

		$('#out_of_value').html('');
		$('#out_of_value').html(t_storage.toFixed(2));
		var suggested_storage = suggestedStorage(t_storage.toFixed(2));


		var pe = percent_accumulated_storage(t_storage, suggested_storage).toFixed(2);
		$('#storageProgress').attr('style', 'width: '+ pe +'%;');
		$('#storageProgress').attr('aria-valuenow',  pe );
		update_pie();
	});

	$('#v-pills-livingroom .qty').change(function() {
		var t_storage;
		t_storage = compute_collected_items('living_room_items');

		$('#out_of_value').html('');
		$('#out_of_value').html(t_storage.toFixed(2));
		var suggested_storage = suggestedStorage(t_storage.toFixed(2));

		var pe = percent_accumulated_storage(t_storage, suggested_storage).toFixed(2);
		$('#storageProgress').attr('style', 'width: '+ pe +'%;');
		$('#storageProgress').attr('aria-valuenow',  pe );

		var getid = $(this).attr('id');
		var getval = $(this).val();

		if(getval == 0){
			$('#chk' + getid).prop('checked', false);
			$('#chk' + getid).trigger('change');
		}else{
			$('#chk' + getid).prop('checked', true);
			$('#chk' + getid).trigger('change');
		}
		update_pie();
	});


	$('.diningroom').change(function() {
		console.log('click check');
		var id = $(this).data('id');
		var qty_current;
		var get_val = $('#ftsq-val-'+ id).val();
		// console.log('get_val : ' + get_val);
		var t_storage;
		if(this.checked){
			collect_items(id, 'living_room_items');
			
			qty_current = $('#' + id).val();
			if(qty_current == '0'){
				$('#' + id).val('1');
			}
			// t_storage = total_storage_value(get_val);
		}else{
			remove_from_collection(id, 'living_room_items');

			// t_storage = subtract_storage_value(get_val);
			$('#' + id).val('0');
		}

		t_storage = compute_collected_items('living_room_items');

		$('#out_of_value').html('');
		$('#out_of_value').html(t_storage.toFixed(2));
		var suggested_storage = suggestedStorage(t_storage.toFixed(2));

		var pe = percent_accumulated_storage(t_storage, suggested_storage).toFixed(2);
		$('#storageProgress').attr('style', 'width: '+ pe +'%;');
		$('#storageProgress').attr('aria-valuenow',  pe );
		update_pie();
	});

	$('#v-pills-diningroom .qty').change(function() {
		console.log('click dining qty');
		var t_storage;
		t_storage = compute_collected_items('living_room_items');

		$('#out_of_value').html('');
		$('#out_of_value').html(t_storage.toFixed(2));
		var suggested_storage = suggestedStorage(t_storage.toFixed(2));

		var pe = percent_accumulated_storage(t_storage, suggested_storage).toFixed(2);
		$('#storageProgress').attr('style', 'width: '+ pe +'%;');
		$('#storageProgress').attr('aria-valuenow',  pe );

		var getid = $(this).attr('id');
		var getval = $(this).val();

		if(getval == 0){
			$('#chk' + getid).prop('checked', false);
			$('#chk' + getid).trigger('change');
		}else{
			$('#chk' + getid).prop('checked', true);
			$('#chk' + getid).trigger('change');
		}
		update_pie();
	});
	// $('#v-pills-diningroom').on('change', '.qty', function() {
	// 	var t_storage;
	// 	t_storage = compute_collected_items('living_room_items');

	// 	$('#out_of_value').html('');
	// 	$('#out_of_value').html(t_storage.toFixed(2));

	// 	var pe = percent_accumulated_storage(t_storage).toFixed(2);
	// 	$('#storageProgress').attr('style', 'width: '+ pe +'%;');
	// 	$('#storageProgress').attr('aria-valuenow',  pe );

	// 	var getid = $(this).attr('id');
	// 	var getval = $(this).val();

	// 	if(getval == 0){
	// 		$('#chk' + getid).prop('checked', false);
	// 		$('#chk' + getid).trigger('change');
	// 	}else{
	// 		$('#chk' + getid).prop('checked', true);
	// 		$('#chk' + getid).trigger('change');
	// 	}
	// 	update_pie();
	// });

	$('.majorappliance').change(function() {
		
		console.log('click check');
		var id = $(this).data('id');
		var qty_current;
		var get_val = $('#ftsq-val-'+ id).val();
		// console.log('get_val : ' + get_val);
		var t_storage;
		if(this.checked){
			collect_items(id, 'living_room_items');
			
			qty_current = $('#' + id).val();
			if(qty_current == '0'){
				$('#' + id).val('1');
			}
			// t_storage = total_storage_value(get_val);
		}else{
			remove_from_collection(id, 'living_room_items');

			// t_storage = subtract_storage_value(get_val);
			$('#' + id).val('0');
		}

		t_storage = compute_collected_items('living_room_items');

		$('#out_of_value').html('');
		$('#out_of_value').html(t_storage.toFixed(2));
		var suggested_storage = suggestedStorage(t_storage.toFixed(2));

		var pe = percent_accumulated_storage(t_storage, suggested_storage).toFixed(2);
		$('#storageProgress').attr('style', 'width: '+ pe +'%;');
		$('#storageProgress').attr('aria-valuenow',  pe );
		update_pie();
	});

	$('#v-pills-majorappliance .qty').change(function() {
		var t_storage;
		t_storage = compute_collected_items('living_room_items');

		$('#out_of_value').html('');
		$('#out_of_value').html(t_storage.toFixed(2));
		var suggested_storage = suggestedStorage(t_storage.toFixed(2));

		var pe = percent_accumulated_storage(t_storage, suggested_storage).toFixed(2);
		$('#storageProgress').attr('style', 'width: '+ pe +'%;');
		$('#storageProgress').attr('aria-valuenow',  pe );

		var getid = $(this).attr('id');
		var getval = $(this).val();

		if(getval == 0){
			$('#chk' + getid).prop('checked', false);
			$('#chk' + getid).trigger('change');
		}else{
			$('#chk' + getid).prop('checked', true);
			$('#chk' + getid).trigger('change');
		}
		update_pie();
	});



	$('.bedroom').change(function() {
		
		console.log('click check');
		var id = $(this).data('id');
		var qty_current;
		var get_val = $('#ftsq-val-'+ id).val();
		// console.log('get_val : ' + get_val);
		var t_storage;
		if(this.checked){
			collect_items(id, 'living_room_items');
			
			qty_current = $('#' + id).val();
			if(qty_current == '0'){
				$('#' + id).val('1');
			}
			// t_storage = total_storage_value(get_val);
		}else{
			remove_from_collection(id, 'living_room_items');

			// t_storage = subtract_storage_value(get_val);
			$('#' + id).val('0');
		}

		t_storage = compute_collected_items('living_room_items');

		$('#out_of_value').html('');
		$('#out_of_value').html(t_storage.toFixed(2));
		var suggested_storage = suggestedStorage(t_storage.toFixed(2));

		var pe = percent_accumulated_storage(t_storage, suggested_storage).toFixed(2);
		$('#storageProgress').attr('style', 'width: '+ pe +'%;');
		$('#storageProgress').attr('aria-valuenow',  pe );
		update_pie();
	});

	$('#v-pills-bedroom .qty').change(function() {
		var t_storage;
		t_storage = compute_collected_items('living_room_items');

		$('#out_of_value').html('');
		$('#out_of_value').html(t_storage.toFixed(2));
		var suggested_storage = suggestedStorage(t_storage.toFixed(2));

		var pe = percent_accumulated_storage(t_storage, suggested_storage).toFixed(2);
		$('#storageProgress').attr('style', 'width: '+ pe +'%;');
		$('#storageProgress').attr('aria-valuenow',  pe );

		var getid = $(this).attr('id');
		var getval = $(this).val();

		if(getval == 0){
			$('#chk' + getid).prop('checked', false);
			$('#chk' + getid).trigger('change');
		}else{
			$('#chk' + getid).prop('checked', true);
			$('#chk' + getid).trigger('change');
		}
		update_pie();
	});


	$('.lifestyleoutdoor').change(function() {
		
		console.log('click check');
		var id = $(this).data('id');
		var qty_current;
		var get_val = $('#ftsq-val-'+ id).val();
		// console.log('get_val : ' + get_val);
		var t_storage;
		if(this.checked){
			collect_items(id, 'living_room_items');
			
			qty_current = $('#' + id).val();
			if(qty_current == '0'){
				$('#' + id).val('1');
			}
			// t_storage = total_storage_value(get_val);
		}else{
			remove_from_collection(id, 'living_room_items');

			// t_storage = subtract_storage_value(get_val);
			$('#' + id).val('0');
		}

		t_storage = compute_collected_items('living_room_items');

		$('#out_of_value').html('');
		$('#out_of_value').html(t_storage.toFixed(2));
		var suggested_storage = suggestedStorage(t_storage.toFixed(2));

		var pe = percent_accumulated_storage(t_storage, suggested_storage).toFixed(2);
		$('#storageProgress').attr('style', 'width: '+ pe +'%;');
		$('#storageProgress').attr('aria-valuenow',  pe );
		update_pie();
	});

	$('#v-pills-lifestyle .qty').change(function() {
		var t_storage;
		t_storage = compute_collected_items('living_room_items');

		$('#out_of_value').html('');
		$('#out_of_value').html(t_storage.toFixed(2));
		var suggested_storage = suggestedStorage(t_storage.toFixed(2));

		var pe = percent_accumulated_storage(t_storage, suggested_storage).toFixed(2);
		$('#storageProgress').attr('style', 'width: '+ pe +'%;');
		$('#storageProgress').attr('aria-valuenow',  pe );

		var getid = $(this).attr('id');
		var getval = $(this).val();

		if(getval == 0){
			$('#chk' + getid).prop('checked', false);
			$('#chk' + getid).trigger('change');
		}else{
			$('#chk' + getid).prop('checked', true);
			$('#chk' + getid).trigger('change');
		}
		update_pie();
	});

	$('#btnSendInventory').click(function(){
		// var element = document.getElementById('sc-results');
		// var opt = {
		//   margin:       1,
		//   filename:     'your-storage.pdf',
		//   image:        { type: 'jpeg', quality: 1 },
		//   html2canvas:  { scale: 2 },
		//   jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
		// };
		
		// // New Promise-based usage:
		// html2pdf().set(opt).from(element).save();

		// // Old monolithic-style usage:
		// html2pdf(element, opt);
		console.log('Sending Inventory!');
		var collected_items = $('#living_room_items').val();
		var array_collections = collected_items.split(';');
		console.log(array_collections);

		var html_collect = '';

		if(array_collections.length > 0){
			array_collections.sort();
			console.log(array_collections);
			array_collections.forEach(function(e){
				console.log(e);
				if(e != ''){
					var html_get = $('#' + e).parent().parent().html();
					html_collect += $('<div>').html(html_get).text() + $('#' + e).val() + '[*]';
				}
			});
			console.log(html_collect);
		}


		var email = $('#txtInventoryEmail').val();
		if(isEmail(email)){
			$.ajax({
				type: 'post',
				url : ajaxurl,
				data : {
					'action' : 'emailInventory',
					'email' : email,
					'html' : html_collect
				},
				success: function(result){
					console.log('result' + result);
				}
			});
			swal("Good job!", "Your Inventory has been sent to your email!", "success");
		}else{
			swal("Stop!", "Email Address is invalid!", "warning");
		}
	});



	// function checkMyFields(element){
	// 	var lr_name = element.parent().find('.ot-lr-name');
	// 	var lr_name_val = lr_name.val();

	// 	var lr_length = element.parent().parent().parent().find('.ot_lr_l');
	// 	var lr_length_val = lr_length.val();

	// 	var lr_width = element.parent().parent().parent().find('.ot_lr_w');
	// 	var lr_width_val = lr_width.val();

	// 	var lr_height = element.parent().parent().parent().find('.ot_lr_h');
	// 	var lr_height_val = lr_height.val();

	// 	var lr_cubicfeet = element.parent().parent().parent().find('.ot_ftsq_val_lr');
	// 	var lr_cubicfeet_val = lr_cubicfeet.val();

	// 	if(lr_name_val == '' || lr_name_val == null){
	// 		lr_name.attr("style","border-color:red !important;");
	// 	}else{	
	// 		lr_name.attr("style", "border-color: #ebebeb !important;");
	// 	}

	// 	if(lr_length_val == '' || lr_length_val == null){
	// 		lr_length.attr("style","border-color:red !important;");
	// 	}else{	
	// 		lr_length.attr("style", "border-color: #ebebeb !important;");
	// 	}

	// 	if(lr_width_val == '' || lr_width_val == null){
	// 		lr_width.attr("style","border-color:red !important;");
	// 	}else{	
	// 		lr_width.attr("style", "border-color: #ebebeb !important;");
	// 	}

	// 	if(lr_height_val == '' || lr_height_val == null){
	// 		lr_height.attr("style","border-color:red !important;");
	// 	}else{	
	// 		lr_height.attr("style", "border-color: #ebebeb !important;");
	// 		var cubic_feet_ans = solveCubicFeetInch(lr_length_val, lr_width_val, lr_height_val);
	// 		lr_cubicfeet.val(cubic_feet_ans);

	// 		console.log(lr_cubicfeet);
	// 		console.log('solved!');
	// 	}

	// 	if(lr_cubicfeet_val == '' || lr_cubicfeet_val == null){
	// 		lr_cubicfeet.attr("style","border-color:red !important;");
	// 	}else{	
	// 		lr_cubicfeet.attr("style", "border-color: #ebebeb !important;");
	// 	}

	// }

	// var last_numLivingRoom = $('input.livingroom').length;
	// $('#btnOILivingRoom').click(function(){
	// 	last_numLivingRoom++;
	// 	var html_ = '\
	// 	<div class="row row_livingroom_ot">\
	// 		<div class="col-4">\
	// 			<div class="form-check">\
	// 				<input class="form-check-input livingroom_ot" type="checkbox" value="" data-id="lr'+ last_numLivingRoom + '" id="chklr'+ last_numLivingRoom +'>\
	// 				<label class="form-check-label" for="flexCheckDefault">\
	// 					<input type="text" class="ot-lr-name" value="">\
	// 				</label>\
	// 			</div>\
	// 		</div>\
	// 		<div class="col-4">\
	// 			<div class="row">\
	// 				<div class="col-4">L<input type="text" class="ot_lr_l" value="" placeholder="inch"></div>\
	// 				<div class="col-4">W<input type="text" class="ot_lr_w" value="" placeholder="inch"></div>\
	// 				<div class="col-4">H<input type="text" class="ot_lr_h" value="" placeholder="inch"></div>\
	// 			</div>\
	// 		</div>\
	// 		<div class="col-2">Ft. Sq. <input type="text" class="ot_ftsq_val_lr" value="" id="ftsq-val-lr'+ last_numLivingRoom +'"></div>\
	// 		<div class="col-2">QTY - <input type="number" class="ot_qty" value="0" min="0" id="lr'+ last_numLivingRoom + '"></div>\
	// 	</div>\
	// 	';
	// 	$('#div_livingroom_ot').append(html_);

	// 	$('.row_livingroom_ot').on('change', '.livingroom_ot', function(){
	// 		console.log('click check bind');
	// 		var id = $(this).data('id');
	// 		var qty_current;
	// 		var get_val = $('#ftsq-val-'+ id).val();
	// 		// console.log('get_val : ' + get_val);
	// 		var t_storage;
	// 		if(this.checked){
	// 			checkMyFields($(this));
	// 			collect_items(id, 'living_room_items');
				
	// 			qty_current = $('#' + id).val();
	// 			if(qty_current == '0'){
	// 				$('#' + id).val('1');
	// 			}
	// 			// t_storage = total_storage_value(get_val);
	// 		}else{
	// 			remove_from_collection(id, 'living_room_items');
	
	// 			// t_storage = subtract_storage_value(get_val);
	// 			$('#' + id).val('0');
	// 		}
	
	// 		t_storage = compute_collected_items('living_room_items');
	
	// 		$('#out_of_value').html('');
	// 		$('#out_of_value').html(t_storage.toFixed(2));
	// 		var suggested_storage = suggestedStorage(t_storage.toFixed(2));
	
	
	// 		var pe = percent_accumulated_storage(t_storage, suggested_storage).toFixed(2);
	// 		$('#storageProgress').attr('style', 'width: '+ pe +'%;');
	// 		$('#storageProgress').attr('aria-valuenow',  pe );
	// 		update_pie();
	// 	});

	// 	$('.row_livingroom_ot').on('change', '.ot_qty', function(){
	// 		var t_storage;
	// 		t_storage = compute_collected_items('living_room_items');
	
	// 		$('#out_of_value').html('');
	// 		$('#out_of_value').html(t_storage.toFixed(2));
	// 		var suggested_storage = suggestedStorage(t_storage.toFixed(2));
	
	// 		var pe = percent_accumulated_storage(t_storage, suggested_storage).toFixed(2);
	// 		$('#storageProgress').attr('style', 'width: '+ pe +'%;');
	// 		$('#storageProgress').attr('aria-valuenow',  pe );
	
	// 		// var getid = $(this).attr('id');
	// 		var getval = $(this).val();
	// 		console.log('getval' + getval);
	
	// 		if(getval == 0){
	// 			$(this).parent().parent().find('.livingroom_ot').prop('checked', false);
	// 			$(this).parent().parent().find('.livingroom_ot').trigger('change');
	// 		}else{
	// 			$(this).parent().parent().find('.livingroom_ot').prop('checked', true);
	// 			$(this).parent().parent().find('.livingroom_ot').trigger('change');
	// 		}
	// 		update_pie();
	// 	});

	// 	$('.row_livingroom_ot').on('blur', '.ot-lr-name', function(){
	// 		checkMyFields($(this).parent());
	// 		var t_storage;
	// 		t_storage = compute_collected_items('living_room_items');
	
	// 		$('#out_of_value').html('');
	// 		$('#out_of_value').html(t_storage.toFixed(2));
	// 		var suggested_storage = suggestedStorage(t_storage.toFixed(2));
	
	// 		var pe = percent_accumulated_storage(t_storage, suggested_storage).toFixed(2);
	// 		$('#storageProgress').attr('style', 'width: '+ pe +'%;');
	// 		$('#storageProgress').attr('aria-valuenow',  pe );
	// 	});
		
	// 	$('.row_livingroom_ot').on('blur', '.ot_lr_l', function(){
	// 		checkMyFields($(this).parent().parent().parent());
	// 		var t_storage;
	// 		t_storage = compute_collected_items('living_room_items');
	
	// 		$('#out_of_value').html('');
	// 		$('#out_of_value').html(t_storage.toFixed(2));
	// 		var suggested_storage = suggestedStorage(t_storage.toFixed(2));
	
	// 		var pe = percent_accumulated_storage(t_storage, suggested_storage).toFixed(2);
	// 		$('#storageProgress').attr('style', 'width: '+ pe +'%;');
	// 		$('#storageProgress').attr('aria-valuenow',  pe );
	// 	});

	// 	$('.row_livingroom_ot').on('blur', '.ot_lr_w', function(){
	// 		checkMyFields($(this).parent().parent().parent());
	// 		var t_storage;
	// 		t_storage = compute_collected_items('living_room_items');
	
	// 		$('#out_of_value').html('');
	// 		$('#out_of_value').html(t_storage.toFixed(2));
	// 		var suggested_storage = suggestedStorage(t_storage.toFixed(2));
	
	// 		var pe = percent_accumulated_storage(t_storage, suggested_storage).toFixed(2);
	// 		$('#storageProgress').attr('style', 'width: '+ pe +'%;');
	// 		$('#storageProgress').attr('aria-valuenow',  pe );
	// 	});

	// 	$('.row_livingroom_ot').on('blur', '.ot_lr_h', function(){
	// 		checkMyFields($(this).parent().parent().parent());
	// 		var t_storage;
	// 		t_storage = compute_collected_items('living_room_items');
	
	// 		$('#out_of_value').html('');
	// 		$('#out_of_value').html(t_storage.toFixed(2));
	// 		var suggested_storage = suggestedStorage(t_storage.toFixed(2));
	
	// 		var pe = percent_accumulated_storage(t_storage, suggested_storage).toFixed(2);
	// 		$('#storageProgress').attr('style', 'width: '+ pe +'%;');
	// 		$('#storageProgress').attr('aria-valuenow',  pe );
	// 	});

	// 	$('.row_livingroom_ot').on('blur', '.ot_ftsq_val_lr', function(){
	// 		checkMyFields($(this).parent().parent());
	// 		var t_storage;
	// 		t_storage = compute_collected_items('living_room_items');
	
	// 		$('#out_of_value').html('');
	// 		$('#out_of_value').html(t_storage.toFixed(2));
	// 		var suggested_storage = suggestedStorage(t_storage.toFixed(2));
	
	// 		var pe = percent_accumulated_storage(t_storage, suggested_storage).toFixed(2);
	// 		$('#storageProgress').attr('style', 'width: '+ pe +'%;');
	// 		$('#storageProgress').attr('aria-valuenow',  pe );
	// 	});

		
	// });


  });
})(jQuery);



'use strict';

window.chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};

(function(global) {
	var MONTHS = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	var COLORS = [
		'#4dc9f6',
		'#f67019',
		'#f53794',
		'#537bc4',
		'#acc236',
		'#166a8f',
		'#00a950',
		'#58595b',
		'#8549ba'
	];

	var Samples = global.Samples || (global.Samples = {});
	var Color = global.Color;

	Samples.utils = {
		// Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
		srand: function(seed) {
			this._seed = seed;
		},

		rand: function(min, max) {
			var seed = this._seed;
			min = min === undefined ? 0 : min;
			max = max === undefined ? 1 : max;
			this._seed = (seed * 9301 + 49297) % 233280;
			return min + (this._seed / 233280) * (max - min);
		},

		numbers: function(config) {
			var cfg = config || {};
			var min = cfg.min || 0;
			var max = cfg.max || 1;
			var from = cfg.from || [];
			var count = cfg.count || 8;
			var decimals = cfg.decimals || 8;
			var continuity = cfg.continuity || 1;
			var dfactor = Math.pow(10, decimals) || 0;
			var data = [];
			var i, value;

			for (i = 0; i < count; ++i) {
				value = (from[i] || 0) + this.rand(min, max);
				if (this.rand() <= continuity) {
					data.push(Math.round(dfactor * value) / dfactor);
				} else {
					data.push(null);
				}
			}

			return data;
		},

		labels: function(config) {
			var cfg = config || {};
			var min = cfg.min || 0;
			var max = cfg.max || 100;
			var count = cfg.count || 8;
			var step = (max - min) / count;
			var decimals = cfg.decimals || 8;
			var dfactor = Math.pow(10, decimals) || 0;
			var prefix = cfg.prefix || '';
			var values = [];
			var i;

			for (i = min; i < max; i += step) {
				values.push(prefix + Math.round(dfactor * i) / dfactor);
			}

			return values;
		},

		months: function(config) {
			var cfg = config || {};
			var count = cfg.count || 12;
			var section = cfg.section;
			var values = [];
			var i, value;

			for (i = 0; i < count; ++i) {
				value = MONTHS[Math.ceil(i) % 12];
				values.push(value.substring(0, section));
			}

			return values;
		},

		color: function(index) {
			return COLORS[index % COLORS.length];
		},

		transparentize: function(color, opacity) {
			var alpha = opacity === undefined ? 0.5 : 1 - opacity;
			return Color(color).alpha(alpha).rgbString();
		}
	};

	// DEPRECATED
	window.randomScalingFactor = function() {
		return Math.round(Samples.utils.rand(-100, 100));
	};

	// INITIALIZATION

	Samples.utils.srand(Date.now());

	// Google Analytics
	/* eslint-disable */
	if (document.location.hostname.match(/^(www\.)?chartjs\.org$/)) {
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		ga('create', 'UA-28909194-3', 'auto');
		ga('send', 'pageview');
	}
	/* eslint-enable */

}(this));


function collection_for_pie(item_collection, return_collections){
	var collections = jQuery('#' + item_collection).val();
	console.log('collections : ' + collections);
	var array_collections = collections.split(';');
	var qty, ftsql, total_cap = 0, temp_total;
	console.log(array_collections);

	array_collections.forEach(function(item, index){
		if(item !== "" && item.indexOf(return_collections) > -1){
			qty = jQuery('#' + item ).val();
			ftsql = jQuery('#ftsq-val-'+ item).val();
			// temp_total = ftsql * qty;
			// temp_total = qty;
			total_cap = total_cap + Number(qty);
		}
		console.log('item : ' + item);
		

	});
	console.log('total cap : ' + total_cap);
	return total_cap;
}

function update_pie(){
	config.data.datasets.forEach(function(dataset) {
		console.log(dataset.data);
		
		dataset.data[0] = collection_for_pie('living_room_items', 'lr');
		dataset.data[1] = collection_for_pie('living_room_items', 'dr');
		dataset.data[2] = collection_for_pie('living_room_items', 'ma');
		dataset.data[3] = collection_for_pie('living_room_items', 'br');
		dataset.data[4] = collection_for_pie('living_room_items', 'lo');
		// dataset.data = dataset.data.map(function() {
		// 	return randomScalingFactor();
		// });
	});
	window.myPie.update();
}

var randomScalingFactor = function() {
	return Math.round(Math.random() * 100);
};

var config = {
	type: 'pie',
	data: {
		datasets: [{
			// data: [
			// 	collection_for_pie('living_room_items', 'lr'),
			// 	collection_for_pie('living_room_items', 'dr'),
			// 	collection_for_pie('living_room_items', 'ma'),
			// 	collection_for_pie('living_room_items', 'br'),
			// 	collection_for_pie('living_room_items', 'lo'),
			// ],
			data: [
				0,
				0,
				0,
				0,
				0,
			],
			backgroundColor: [
				window.chartColors.red,
				window.chartColors.orange,
				window.chartColors.yellow,
				window.chartColors.green,
				window.chartColors.blue,
			],
			label: 'Dataset 1'
		}],
		labels: [
			'Living Room & Study',
			'Dining Room &  Kitchen',
			'Major Appliances',
			'Bedroom & Bathroom',
			'Lifestyle & Outdoors'
		]
	},
	options: {
		responsive: true
	}
};

window.onload = function() {
	var ctx = document.getElementById('chart-area').getContext('2d');
	window.myPie = new Chart(ctx, config);
};

// document.getElementById('randomizeData').addEventListener('click', function() {
// 	config.data.datasets.forEach(function(dataset) {
// 		dataset.data = dataset.data.map(function() {
// 			return randomScalingFactor();
// 		});
// 	});

// 	window.myPie.update();
// });

// var colorNames = Object.keys(window.chartColors);
// document.getElementById('addDataset').addEventListener('click', function() {
// 	var newDataset = {
// 		backgroundColor: [],
// 		data: [],
// 		label: 'New dataset ' + config.data.datasets.length,
// 	};

// 	for (var index = 0; index < 10; ++index) {
// 		newDataset.data.push(randomScalingFactor());

// 		var colorName = colorNames[index % colorNames.length];
// 		var newColor = window.chartColors[colorName];
// 		newDataset.backgroundColor.push(newColor);
// 	}

// 	config.data.datasets.push(newDataset);
// 	window.myPie.update();
// });

// document.getElementById('removeDataset').addEventListener('click', function() {
// 	config.data.datasets.splice(0, 1);
// 	window.myPie.update();
// });
