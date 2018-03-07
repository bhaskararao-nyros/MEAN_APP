$(document).ready(function) {
	function slick_start() {
		$('.slick_slider').slick({
			infinite: false,
			adaptiveHeight: false
		});
	}
	function slick_stop() {
		$('.slick_slider').slick('unslick');
	}
}
