jQuery.noConflict();
(function( $ ) {
  $(function() {
    // More code using $ as alias to jQuery
	function checkMyFields(element){
		var lr_name = element.find('.ot-lr-name');
		var lr_name_val = lr_name.val();

		var lr_length = element.find('.ot_lr_l');
		var lr_length_val = lr_length.val();

		var lr_width = element.find('.ot_lr_w');
		var lr_width_val = lr_width.val();

		var lr_height = element.find('.ot_lr_h');
		var lr_height_val = lr_height.val();

		var lr_cubicfeet = element.find('.ot_ftsq_val_lr');
		var lr_cubicfeet_val = lr_cubicfeet.val();

		if(lr_name_val == '' || lr_name_val == null){
			lr_name.attr("style","border-color:red !important;");
			element.find('.ot-lr-cname').html(' - ');
		}else{	
			lr_name.attr("style", "border-color: #ebebeb !important;");
			element.find('.ot-lr-cname').html(lr_name_val + ' - ');
		}

		if(lr_length_val == '' || lr_length_val == null){
			lr_length.attr("style","border-color:red !important;");
			element.find('.ot_lr_l_c').html(' - ');
		}else{	
			lr_length.attr("style", "border-color: #ebebeb !important;");
			element.find('.ot_lr_l_c').html(' - ' + lr_length_val + ' ');
		}

		if(lr_width_val == '' || lr_width_val == null){
			lr_width.attr("style","border-color:red !important;");
			element.find('.ot_lr_w_c').html(' - ');
		}else{	
			lr_width.attr("style", "border-color: #ebebeb !important;");
			element.find('.ot_lr_w_c').html(' - ' + lr_width_val + ' ');
		}

		if(lr_height_val == '' || lr_height_val == null){
			lr_height.attr("style","border-color:red !important;");
			element.find('.ot_lr_h_c').html(' - ');
		}else{	
			lr_height.attr("style", "border-color: #ebebeb !important;");
			element.find('.ot_lr_h_c').html(' - ' + lr_height_val + ' ');

			var cubic_feet_ans = solveCubicFeetInch(lr_length_val, lr_width_val, lr_height_val);
			lr_cubicfeet.val(cubic_feet_ans);

			console.log(lr_cubicfeet);
			console.log('solved!');
			element.find('.ot_ftsq_val_lr_c').html(' - ' + cubic_feet_ans + ' ');
		}

		if(lr_cubicfeet_val == '' || lr_cubicfeet_val == null){
			lr_cubicfeet.attr("style","border-color:red !important;");
			element.find('.ot_ftsq_val_lr_c').html(' - ');
		}else{	
			lr_cubicfeet.attr("style", "border-color: #ebebeb !important;");
			element.find('.ot_ftsq_val_lr_c').html(' - ' + lr_cubicfeet_val + ' ');
		}

	}


	var last_numLivingRoom = $('input.livingroom').length;
	$('#btnOILivingRoom').click(function(){
		last_numLivingRoom++;
		var html_ = '\
		<div class="row row_livingroom_ot">\
			<div class="col-4">\
				<div class="form-check">\
					<input class="form-check-input livingroom_ot" type="checkbox" value="" data-id="lr'+ last_numLivingRoom + '" id="chklr'+ last_numLivingRoom +'>\
					<label class="form-check-label" for="flexCheckDefault">\
						<input type="text" class="ot-lr-name" value="" placeholder="Add other item">\
						<span class="ot-lr-cname" style="display: none;"></span>\
					</label>\
				</div>\
			</div>\
			<div class="col-4">\
				<div class="row">\
					<div class="col-4">L<input type="text" class="ot_lr_l" value="" placeholder="Inch"></div>\
					<span class="ot_lr_l_c" style="display: none;"></span>\
					<div class="col-4">W<input type="text" class="ot_lr_w" value="" placeholder="Inch"></div>\
					<span class="ot_lr_w_c" style="display: none;"></span>\
					<div class="col-4">H<input type="text" class="ot_lr_h" value="" placeholder="Inch"></div>\
					<span class="ot_lr_h_c" style="display: none;"></span>\
				</div>\
			</div>\
			<div class="col-2">Ft. Sq. <input type="text" class="ot_ftsq_val_lr" value="" id="ftsq-val-lr'+ last_numLivingRoom +'"></div>\
			<span class="ot_ftsq_val_lr_c" style="display: none;"></span>\
			<div class="col-2">QTY<input type="number" class="ot_qty" value="0" min="0" id="lr'+ last_numLivingRoom + '"></div>\
		</div>\
		';
		$('#div_livingroom_ot').append(html_);

		$('.row_livingroom_ot').on('change', '.livingroom_ot', function(){
			console.log('click check bind');
			var id = $(this).data('id');
			var qty_current;
			var get_val = $('#ftsq-val-'+ id).val();
			// console.log('get_val : ' + get_val);
			var t_storage;
			if(this.checked){
				checkMyFields($(this).parent().parent().parent());
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

		$('.row_livingroom_ot').on('change', '.ot_qty', function(){
			var t_storage;
			t_storage = compute_collected_items('living_room_items');
	
			$('#out_of_value').html('');
			$('#out_of_value').html(t_storage.toFixed(2));
			var suggested_storage = suggestedStorage(t_storage.toFixed(2));
	
			var pe = percent_accumulated_storage(t_storage, suggested_storage).toFixed(2);
			$('#storageProgress').attr('style', 'width: '+ pe +'%;');
			$('#storageProgress').attr('aria-valuenow',  pe );
	
			// var getid = $(this).attr('id');
			var getval = $(this).val();
			console.log('getval' + getval);
	
			if(getval == 0){
				$(this).parent().parent().find('.livingroom_ot').prop('checked', false);
				$(this).parent().parent().find('.livingroom_ot').trigger('change');
			}else{
				$(this).parent().parent().find('.livingroom_ot').prop('checked', true);
				$(this).parent().parent().find('.livingroom_ot').trigger('change');
			}
			update_pie();
		});

		$('.row_livingroom_ot').on('blur', '.ot-lr-name', function(){
			checkMyFields($(this).parent().parent().parent());
			var t_storage;
			t_storage = compute_collected_items('living_room_items');
	
			$('#out_of_value').html('');
			$('#out_of_value').html(t_storage.toFixed(2));
			var suggested_storage = suggestedStorage(t_storage.toFixed(2));
	
			var pe = percent_accumulated_storage(t_storage, suggested_storage).toFixed(2);
			$('#storageProgress').attr('style', 'width: '+ pe +'%;');
			$('#storageProgress').attr('aria-valuenow',  pe );
		});
		
		$('.row_livingroom_ot').on('blur', '.ot_lr_l', function(){
			checkMyFields($(this).parent().parent().parent().parent());
			var t_storage;
			t_storage = compute_collected_items('living_room_items');
	
			$('#out_of_value').html('');
			$('#out_of_value').html(t_storage.toFixed(2));
			var suggested_storage = suggestedStorage(t_storage.toFixed(2));
	
			var pe = percent_accumulated_storage(t_storage, suggested_storage).toFixed(2);
			$('#storageProgress').attr('style', 'width: '+ pe +'%;');
			$('#storageProgress').attr('aria-valuenow',  pe );
		});

		$('.row_livingroom_ot').on('blur', '.ot_lr_w', function(){
			checkMyFields($(this).parent().parent().parent().parent());
			var t_storage;
			t_storage = compute_collected_items('living_room_items');
	
			$('#out_of_value').html('');
			$('#out_of_value').html(t_storage.toFixed(2));
			var suggested_storage = suggestedStorage(t_storage.toFixed(2));
	
			var pe = percent_accumulated_storage(t_storage, suggested_storage).toFixed(2);
			$('#storageProgress').attr('style', 'width: '+ pe +'%;');
			$('#storageProgress').attr('aria-valuenow',  pe );
		});

		$('.row_livingroom_ot').on('blur', '.ot_lr_h', function(){
			checkMyFields($(this).parent().parent().parent().parent());
			var t_storage;
			t_storage = compute_collected_items('living_room_items');
	
			$('#out_of_value').html('');
			$('#out_of_value').html(t_storage.toFixed(2));
			var suggested_storage = suggestedStorage(t_storage.toFixed(2));
	
			var pe = percent_accumulated_storage(t_storage, suggested_storage).toFixed(2);
			$('#storageProgress').attr('style', 'width: '+ pe +'%;');
			$('#storageProgress').attr('aria-valuenow',  pe );
		});

		$('.row_livingroom_ot').on('blur', '.ot_ftsq_val_lr', function(){
			checkMyFields($(this).parent().parent());

			var t_storage;
			t_storage = compute_collected_items('living_room_items');
	
			$('#out_of_value').html('');
			$('#out_of_value').html(t_storage.toFixed(2));
			var suggested_storage = suggestedStorage(t_storage.toFixed(2));
	
			var pe = percent_accumulated_storage(t_storage, suggested_storage).toFixed(2);
			$('#storageProgress').attr('style', 'width: '+ pe +'%;');
			$('#storageProgress').attr('aria-valuenow',  pe );
		});	
	});

  });
})(jQuery);