
jQuery.noConflict();
(function( $ ) {
	$(function() {
	// More code using $ as alias to jQuery
	});

	function validateEmail(email) {
	  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	  return re.test(email);
	}

	$('.input-imp').blur(function(){
		var imp_vals = Array();
		var t = false;
		$('.input-imp').each(function(){
			console.log($(this).val());
			if($(this).val() !== ''){
				if($(this).val() > 0 && $(this).val() < 8){
					if(imp_vals.indexOf($(this).val()) > -1){
						$(this).val('');
						$(this).addClass('error_field');
						t = true;
					}else{
						imp_vals.push($(this).val());
						$('.input-imp').removeClass('error_field');
						t = false;
					}
				}else{
					$(this).val('');
					$(this).addClass('error_field');
					t = true;
				}
			}
		});
		if(t){
			$.growl.error({ message: "Valid numbers are 1 to 7. You can only use a number one time" });
		}
		// console.log('hell0');
	});

	$('.input-wer').blur(function(){
		var v = $(this).val();
		var t = false;
		if(v !== ''){
			if(v > 0 && v < 11){
				//
				t = false;
				$('.input-wer').removeClass('error_field');
			}else{
				$(this).val('');
				$(this).addClass('error_field');
				t = true;
			}
			if(t){
				$.growl.error({ message: "Valid numbers are 1 to 10" });
			}
		}
	});

	var importance_array = Array();
	importance_array[1] = 10; //100
	importance_array[2] = 8; //80
	importance_array[3] = 6; //60
	importance_array[4] = 4; //40
	importance_array[5] = 3; //30
	importance_array[6] = 2; //20
	importance_array[7] = 1; //10

	var total_importance = 340;

	function happiness_submit_score_func(){
		var myHapUID = hs_id;
		var myHapName = hs_fname;
		var myHapLName = hs_lname;
		var myHapEmail = hs_email;
		var myHappyResult = $('#myHappyResult').val();

		var impFamily = $('#impFamily').val();
		var impFriends = $('#impFriends').val();
		var impFinance = $('#impFinance').val();
		var impHealth = $('#impHealth').val();
		var impCareer = $('#impCareer').val();
		var impPersonal = $('#impPersonal').val();
		var impContribution = $('#impContribution').val();

		var werFamily = $('#werFamily').val();
		var werFriends = $('#werFriends').val();
		var werFinance = $('#werFinance').val();
		var werHealth = $('#werHealth').val();
		var werCareer = $('#werCareer').val();
		var werPersonal = $('#werPersonal').val();
		var werContribution = $('#werContribution').val();
		$.ajax({
			type: 'post',
			url : mlr_admin_ajax,
			data : {
				'action' : 'sendOntraport',
				'hc_name' : myHapName,
				'hc_lname' : myHapLName,
				'hc_email' : myHapEmail,
				'hc_result' : myHappyResult,
				'impFamily': impFamily,
				'impFriends': impFriends,
				'impFinance': impFinance,
				'impHealth': impHealth,
				'impCareer': impCareer,
				'impPersonal': impPersonal,
				'impContribution': impContribution,
				'werFamily': werFamily,
				'werFriends': werFriends,
				'werFinance': werFinance,
				'werHealth': werHealth,
				'werCareer': werCareer,
				'werPersonal': werPersonal,
				'werContribution': werContribution,
				'hc_uid' : myHapUID
			},
			beforeSend: function(){
				$('#btnSubmitAns').attr("disabled", "disabled");
				$('#btnSubmitAns').html('<i class="fa fa-pulse fa-spinner"></i> Sending...');
				$('body').append('<div class="lds-heart"><div></div></div>');
			},
			success : function(res){
				console.log(res);
				swal("Thank you!", "Please check your account for your latest score!", "success").then((value) => {
						$('#happiness_result').html('<strong>Your Happiness Score :</strong> ' + myHappyResult);
				});

				$('#btnSubmitAns').removeAttr("disabled");
				$('#btnSubmitAns').html('  <i class="fa fa-smile-o" aria-hidden="true"></i> Get my Happiness Score');
				$('.lds-heart').remove();
			}
		});
		// if(myHapName !== '' && myHapEmail !== ''){
		// 	if(validateEmail(myHapEmail)){
		//
		// 	}else{
		// 		swal("Sorry!", "Please enter valid email format!", "error");
		// 	}
		//
		// }else{
		// 	swal("Sorry!", "Please fill-in all fields!", "warning");
		// }
	}


	$('#btnSubmitAns').click(function(){
		var impFamily = $('#impFamily').val();
		var impFriends = $('#impFriends').val();
		var impFinance = $('#impFinance').val();
		var impHealth = $('#impHealth').val();
		var impCareer = $('#impCareer').val();
		var impPersonal = $('#impPersonal').val();
		var impContribution = $('#impContribution').val();

		var werFamily = $('#werFamily').val();
		var werFriends = $('#werFriends').val();
		var werFinance = $('#werFinance').val();
		var werHealth = $('#werHealth').val();
		var werCareer = $('#werCareer').val();
		var werPersonal = $('#werPersonal').val();
		var werContribution = $('#werContribution').val();
		if(impFamily !== '' &&  impFriends !== '' &&  impFinance !== '' &&  impHealth !== '' &&  impCareer !== '' &&  impPersonal !== '' &&  impContribution !== '' &&  werFamily !== '' &&  werFriends !== '' &&  werFinance !== '' &&  werHealth !== '' &&  werCareer !== '' &&  werPersonal !== '' &&  werContribution !== '')  {
			var index_Family = $('#impFamily').val();
			var res_Family = importance_array[index_Family] * werFamily;
			$('#resFamily').val(res_Family);
			//===============================================
			var index_Friends = $('#impFriends').val();
			var res_Friends = importance_array[index_Friends] * werFriends;
			$('#resFriends').val(res_Friends);
			//===============================================
			var index_Finance = $('#impFinance').val();
			var res_Finance = importance_array[index_Finance] * werFinance;
			$('#resFinance').val(res_Finance);
			//===============================================
			var index_Health = $('#impHealth').val();
			var res_Health = importance_array[index_Health] * werHealth;
			$('#resHealth').val(res_Health);
			//===============================================
			var index_Career = $('#impCareer').val();
			var res_Career = importance_array[index_Career] * werCareer;
			$('#resCareer').val(res_Career);
			//===============================================
			var index_Personal = $('#impPersonal').val();
			var res_Personal = importance_array[index_Personal] * werPersonal;
			$('#resPersonal').val(res_Personal);
			//===============================================
			var index_Contribution = $('#impContribution').val();
			var res_Contribution = importance_array[index_Contribution] * werContribution;
			$('#resContribution').val(res_Contribution);

			var total_imp_score = res_Family + res_Friends + res_Finance + res_Health + res_Career + res_Personal + res_Contribution;
			var result_happiness = (total_imp_score / total_importance) * 10;

			var display_res = Number(result_happiness).toFixed(1);
			// console.log();
			// $('#myHappinessModal').modal('show');
			// $('#happiness_result').html(display_res);
			$('#myHappyResult').val(display_res);
			happiness_submit_score_func();
			// $('#myHappinessModal').modal('show');
		}else{
			swal("Sorry!", "Please fill-in all fields!", "warning");
		}


	});

	// $('#btnSubmitOntra').click(function(){
	// 	var myHapName = $('#myHapName').val();
	// 	var myHapLName = $('#myHapLName').val();
	// 	var myHapEmail = $('#myHapEmail').val();
	// 	var myHappyResult = $('#myHappyResult').val();
	//
	// 	var impFamily = $('#impFamily').val();
	// 	var impFriends = $('#impFriends').val();
	// 	var impFinance = $('#impFinance').val();
	// 	var impHealth = $('#impHealth').val();
	// 	var impCareer = $('#impCareer').val();
	// 	var impPersonal = $('#impPersonal').val();
	// 	var impContribution = $('#impContribution').val();
	//
	// 	var werFamily = $('#werFamily').val();
	// 	var werFriends = $('#werFriends').val();
	// 	var werFinance = $('#werFinance').val();
	// 	var werHealth = $('#werHealth').val();
	// 	var werCareer = $('#werCareer').val();
	// 	var werPersonal = $('#werPersonal').val();
	// 	var werContribution = $('#werContribution').val();
	//
	// 	if(myHapName !== '' && myHapEmail !== ''){
	// 		if(validateEmail(myHapEmail)){
	// 			$.ajax({
	// 				type: 'post',
	// 				url : mlr_admin_ajax,
	// 				data : {
	// 					'action' : 'sendOntraport',
	// 					'hc_name' : myHapName,
	// 					'hc_lname' : myHapLName,
	// 					'hc_email' : myHapEmail,
	// 					'hc_result' : myHappyResult,
	// 					'impFamily': impFamily,
	// 					'impFriends': impFriends,
	// 					'impFinance': impFinance,
	// 					'impHealth': impHealth,
	// 					'impCareer': impCareer,
	// 					'impPersonal': impPersonal,
	// 					'impContribution': impContribution,
	// 					'werFamily': werFamily,
	// 					'werFriends': werFriends,
	// 					'werFinance': werFinance,
	// 					'werHealth': werHealth,
	// 					'werCareer': werCareer,
	// 					'werPersonal': werPersonal,
	// 					'werContribution': werContribution
	// 				},
	// 				beforeSend: function(){
	// 					$('#btnSubmitOntra').attr("disabled", "disabled");
	// 					$('#btnSubmitOntra').html('<i class="fa fa-pulse fa-spinner"></i> Sending...');
	// 					$('body').append('<div class="lds-heart"><div></div></div>');
	// 				},
	// 				success : function(res){
	// 					console.log(res);
	// 					swal("Thank you!", "Please check your email for the result!", "success").then((value) => {
  // 							window.location.reload();
	// 					});
	//
	// 					$('#btnSubmitOntra').removeAttr("disabled");
	// 					$('#btnSubmitOntra').html('<i class="fa fa-paper-plane"></i> Send my score');
	// 					$('.lds-heart').remove();
	// 				}
	// 			});
	// 		}else{
	// 			swal("Sorry!", "Please enter valid email format!", "error");
	// 		}
	//
	// 	}else{
	// 		swal("Sorry!", "Please fill-in all fields!", "warning");
	// 	}
	// });

	var myHappinessModal = $('#myHappinessModal').detach();
	myHappinessModal.appendTo('body');


	
})(jQuery);
