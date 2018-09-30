function imgResize(){
	$('img').each(function(){
		var imgRatio = $(this).height() / $(this).width();
		if (imgRatio > 1) {
			$(this).parent().removeClass("portrait landscape").addClass("portrait");
		} else {
			$(this).parent().removeClass("portrait landscape").addClass("landscape");
		}
	});
};
$(window).on('load', function () {
	imgResize();
});
$(document).ready(function() {
	$(window).resize(function () {
		imgResize();
	});
	$("i.collect").click(function(){
		$(this).toggleClass("icon-heart-outlined icon-heart");
	});
	$(".ham").click(function(){
		$(this).toggleClass("active");
		$(".menu").slideToggle();
	});
	$('.tab li').click(function () {
		var tabIndex = $(this).index();
		$(this).addClass('active').siblings('.active').removeClass('active');
		$(this).parent().siblings('.tabContent').children('form').removeClass('active').eq(tabIndex).addClass('active');
	});
	function formatCurrencyTenThou(num) {
		num = num.toString().replace(/\$|\,/g,''); 
		if(isNaN(num)) 
		num = "0"; 
		sign = (num == (num = Math.abs(num))); 
		num = Math.floor(num*10+0.50000000001); 
		//cents = num%10; 
		num = Math.floor(num/10).toString(); 
		for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++) 
		num = num.substring(0,num.length-(4*i+3))+','+ 
		num.substring(num.length-(4*i+3)); 
		return (((sign)?'':'-') + num ); 
	};
	function productChange(){
		var sum = 0;
		$(".accumulate span").each(function(){
			sum += +$(this).html();
		});
		$(".product-prize span").text(sum);
		$(".sum-prize span").text(function(){
			sum = sum + 300;
			$(this).html(sum);
		});
	};
	if ($("section").hasClass("cart")) {
		//單項總額
		$(".accumulate span").each(function () {
			$(this).html(
				$(this).parent().siblings(".basic").children(".edit").children("input").val()
				*
				$(this).parent().siblings(".basic").children(".detail").children(".prize").children("span").html()
			);
		});
		$(".minus").click(function () {
			if ($(this).next().val() > 1) {
				$(this).next().val(+$(this).next().val() - 1);
				$(this).parent(".edit").parent(".basic").siblings(".accumulate").children("span").html(
					$(this).next().val()
					*
					$(this).parent(".edit").siblings(".detail").children(".prize").children("span").html()
				);
				productChange();
			}
		});
		$(".plus").click(function () {
			if ($(this).prev().val() < 10) {
				$(this).prev().val(+$(this).prev().val() + 1);
				$(this).parent(".edit").parent(".basic").siblings(".accumulate").children("span").html(
					$(this).prev().val()
					*
					$(this).parent(".edit").siblings(".detail").children(".prize").children("span").html()
				);
				productChange();
			}
		});
		productChange();
	};
	if ($("label").hasClass("addr-selector-win")) {
		new TwCitySelector({
			el: ".addr-selector-win",
			elCounty: ".county",
			elDistrict: ".district",
			elZipcode: ".zipcode"
		});
	};
});