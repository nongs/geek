/* 기획공연 객체생성 */
function PlanGall (title, list, date, price, media1, media2, media3) {
	this.title = title;
	this.list = list;
	this.date = date;
	this.price = price;
	this.detail = '<br/>' + date + '<span class="blockspan">' + price + '</span>';
	this.image = media1;
	this.video1 = media2;
	this.video2 = media3;
	this.imglist = '<li><img src="' + media1 + '" alt="기획공연 사진1"></li><li><img src="https://i.ytimg.com/vi/' + media2 + '/sddefault.jpg" alt="기획공연 사진2"></li><li><img src="https://i.ytimg.com/vi/' + media3 + '/sddefault.jpg" alt="기획공연 사진3"></li>';
}
/* 리사이즈 이벤트 */
$(document).ready(function(){ 
	setPos();
	$(window).scroll(function(){
		if($('#perform').css('display') == 'block') {
			planH();
		}
	});
	$(window).resize(function(){
		setPos();
		planH();
	});
});
/* 이미지 버튼 클릭 이벤트 */
$(function(){	
	$('.forStage').click(function(){
		stageShow();
	});
	$('.forPerform').click(function(){
		performShow();
	});
	$('.backbg').click(function(){
		if ($('#stage').css('display') == 'block') {
			stageHide()
		} else if ($('#perform').css('display') == 'block') {
			performHide()
		}
		setPos();
		$('html, body').animate({ scrollTop: 0 }, 500);
	});
});
/* 스크롤 이벤트 / 사이드바 이벤트 */
$(function(){	
	$('aside a').click(function(event){
		event.preventDefault();
		var goingOn = $(this).attr("href");
		$('html, body').animate({ scrollTop: $(goingOn).offset().top }, 500);
	});
	$('#navbar-stage').on('activate.bs.scrollspy', function () {
		$('li.active').parents('.sublnb').addClass('active');
	});
});
/* 메뉴 이벤트 */
$(function(){	
	$('.menuIcon').click(function(){
		$('.outermenu').fadeIn();
		$('body').css('overflow', 'hidden');
	});
	$('.menu-close').click(function(){
		$(this).parents('.outermenu').fadeOut();
		$('body').css('overflow', 'auto');
	});
	$('.menu a').click(function(event){
		event.preventDefault();
		var goingOn = $(this).attr("href");
		$('.outermenu').fadeOut();
		if ($(this).parents('li').hasClass('menu-main') && $('.backbg').css('display') == 'block') {
			stageHide();
			performHide();
		} else if ($(this).parents('li').hasClass('menu-stage')) {
			if ($('#perform').css('display') == 'block') performHide();
			stageShow();
		} else if ($(this).parents('li').hasClass('menu-perform')) {
			if ($('#stage').css('display') == 'block') stageHide();
			performShow();
			planH();
		}
		$('body').css('overflow', 'auto');
		$('html, body').animate({ scrollTop: $(goingOn).offset().top}, 500);
		setPos();
	});
});
/* 긱 라이브 하우스 특징 토글 / 대관안내 테이블 푸터 토글 */
$(function(){
	$('#theGeek dt').click(function(){
		$(this).siblings('dd').slideToggle();
		$(this).find('.caret').toggleClass('active');
	});
	$('.rent_more').click(function(event){
		event.preventDefault();
		$(this).children('svg').toggleClass('active');
		$(this).prev('ul').slideToggle(400);
	});
	$('#rent dt.panel-heading').click(function(){
		$(this).siblings('dd').slideToggle();
		$(this).find('.caret').toggleClass('active');
	});
});
/* 긱 라이브 하우스 특징 모달 */
$(function(){
	var isfalse = false;
	var btnPosition; var listLength; var indexNum; var getTarget;
	$('.more').click(function(){
		getTarget = $(this).attr('data-target');
		$(getTarget).appendTo("body");
		indexNum = 0;
		$(getTarget).find('.modal-body li').hide();
		$(getTarget).find('.modal-body .viewItem').show();
		listLength = $(getTarget).find('.modal-body li').length;
		$(getTarget).find('.modal-page').html('1 / ' + listLength);
		$(this).blur();
	});
	/* 긱 라이브 하우스 리스트 모달 */
	$('.prev_btn').click(function(){
		btnPosition = $(this).siblings('ul');
		listLength = btnPosition.children('li');
		indexNum += -1;
		if (indexNum > -1 && isfalse == false) {
			isfalse = true;
			listLength.eq(indexNum+1).hide();
			listLength.eq(indexNum).fadeIn();
			$(getTarget).find('.modal-page').html(indexNum + 1 + ' / ' + listLength.length);
			isfalse = false;
		} else {
		indexNum += 1;
		}
	});
	$('.next_btn').click(function(){
		btnPosition = $(this).siblings('ul');
		listLength = btnPosition.children('li');
		indexNum += 1;
		if (indexNum < listLength.length && isfalse == false) {
			isfalse = true;
			listLength.eq(indexNum-1).hide();
			listLength.eq(indexNum).fadeIn();
			$(getTarget).find('.modal-page').html(indexNum + 1 + ' / ' + listLength.length);
			isfalse = false;
		} else {
		indexNum += -1;
		}
	});
	$('[data-toggle="tooltip"]').tooltip();
});
/* 소리만긱 이미지 슬라이더 */ // 수정중 대관공연 슬라이드 수정
$(function(){
	var isTrue = false;
	var list_s; var list_sl; var list_sm; var list_ss; var list_sw; var list_sv;
	$('.next').click(function(){
		if ($(this).parents('div').hasClass('sound_list')) {
			list_s = $('.sound_list_ul');
			list_ss = $('.sound_list_ul li').outerWidth(true);
		} else if ($(this).parents('div').hasClass('plan_gall')) {
			list_s = $('.plan_gall_ul');
			list_ss = $('.plan_gall_ul li').outerWidth(true);
		} else if ($(this).parents('div').hasClass('rent_gall')) {
			list_s = $('.rent_gall_ul');
			list_ss = $('.rent_gall_ul li.thumb_n.thumb_n').siblings('li').outerWidth(true);
			list_sw = $('.rent_gall_ul li.thumb_n.thumb_n').outerWidth(true);
			list_sw = list_sw.toFixed(1)*1;
		}
		list_sv = $(this).parents('div').width();
		list_sl = list_s.css('margin-left').indexOf('px');
		list_sm = list_s.css('margin-left').substring(list_sl, -list_sl) * 1;
		list_ss = list_ss.toFixed(1)*1;
		list_sm = list_sm.toFixed(1)*1;
		list_sv = list_sv.toFixed(1)*1;
		list_sl = list_s.width().toFixed(1)*1;
		if ($(this).parents('div').hasClass('rent_gall') && isTrue == false && list_sv < list_sl + list_sm) {
			isTrue = true;
			list_s.children('.thumb_n').removeClass('thumb_n').next('li').addClass('thumb_n');
			list_s.animate({
				marginLeft: list_sm - list_ss + "px"
			}, 300, function(){isTrue = false});
			return false;
		} else if (!$(this).parents('div').hasClass('rent_gall') && list_sv + list_ss < list_sl + list_sm && isTrue == false) {
			isTrue = true;
			list_s.animate({
				marginLeft: list_sm - list_ss + "px"
			}, 300, function(){isTrue = false});
		}
	});
	$('.prev').click(function(){
		if ($(this).parents('div').hasClass('sound_list')) {
			list_s = $('.sound_list_ul');
			list_ss = $('.sound_list_ul li').outerWidth(true);
		} else if ($(this).parents('div').hasClass('plan_gall')) {
			list_s = $('.plan_gall_ul');
			list_ss = $('.plan_gall_ul li').outerWidth(true);
		} else if ($(this).parents('div').hasClass('rent_gall')) {
			list_s = $('.rent_gall_ul');
			list_ss = $('.rent_gall_ul li.thumb_n.thumb_n').siblings('li').outerWidth(true);
		}
		list_sl = list_s.css('margin-left').indexOf('px');
		list_sm = list_s.css('margin-left').substring(list_sl, -list_sl) * 1;
		list_ss = list_ss.toFixed(1)*1;
		list_sm = list_sm.toFixed(1)*1;
		list_sl = list_s.width().toFixed(1)*1;
		if ($(this).parents('div').hasClass('rent_gall') && list_sm < list_ss && isTrue == false) {
				isTrue = true;
				list_s.children('.thumb_n').removeClass('thumb_n').prev('li').addClass('thumb_n');
				list_s.animate({
					marginLeft: list_sm + list_ss + "px"
				}, 300, function(){isTrue = false});
		} else if (!$(this).parents('div').hasClass('rent_gall') && list_sm < -1 && isTrue == false) {
			isTrue = true;
			list_s.animate({
				marginLeft: list_sm + list_ss + "px"
			}, 300, function(){isTrue = false});
		}
	});
	var btnPosition; var listLength; var indexNum; var getTarget;
	$('.sound_list_ul li').click(function(){
		getTarget = $(this).attr('data-target');
		$(getTarget).appendTo("body");
		indexNum = $(this).index('.sound_list_ul li');
		$(getTarget).find('.modal-body li').hide();
		$(getTarget).find('.modal-body li').eq(indexNum).show();
		listLength = $(getTarget).find('.modal-body li').length;
		$(getTarget).find('.modal-page').html(indexNum + 1 + ' / ' + listLength);
		$(this).blur();
	});
	$('#soundGeek .prev_btn, #rentGeek .prev_btn').click(function(){
		btnPosition = $(this).siblings('ul');
		listLength = btnPosition.children('li');
		indexNum += -1;
		if (indexNum > -1 && isTrue == false) {
			isTrue = true;
			listLength.eq(indexNum+1).hide();
			listLength.eq(indexNum).fadeIn();
			$(getTarget).find('.modal-page').html(indexNum + 1 + ' / ' + listLength.length);
			isTrue = false;
		} else {
			indexNum += 1;
		}
	});
	$('#soundGeek .next_btn, #rentGeek .next_btn').click(function(){
		btnPosition = $(this).siblings('ul');
		listLength = btnPosition.children('li');
		indexNum += 1;
		if (indexNum < listLength.length && isTrue == false) {
			isTrue = true;
			listLength.eq(indexNum-1).hide();
			listLength.eq(indexNum).fadeIn();
			$(getTarget).find('.modal-page').html(indexNum + 1 + ' / ' + listLength.length);
			isTrue = false;
		} else {
			indexNum += -1;
		}
	});
	var planarry = [];
	planarry[0] = new PlanGall('20160709(토) "GEEKERZ(긱커즈) 3" - 92 스페셜 - 힙합 기획공연', '<li>&lt; Line up &gt;</li><li>2TONE / 어센틱키즈</li><li>GimGABB / 신얼</li><li>Aphelia / 머리X윌로</li><li>Dino.T</li>', '2016. 7. 9 (토) 6:00 PM', '10,000 원', 'img/plan1_img.jpg', '66QCOtqqrcQ' ,'PISZFoFVyhI'); 
	planarry[1] = new PlanGall('20160708(금) "Rabbit♡100% ~ 소녀와 토끼와 금요일 ~" - DJ 종합 문화 기획공연', '<li>&lt; 아티스트 &gt;</li><li><dl><dt>키라라 KIRARA</dt><dd>한국의 전자음악 프로듀서이다. "이쁘고 강한 음악" 이라는 캐치프라이즈를 사용하고 있다.<br/><a href="https://soundcloud.com/stqpkiraradongjea">https://soundcloud.com/stqpkiraradongjea</a></dd><br/></li><li><dl><dt>타카스시 Taka Sushi</dt><dd>애틀랜타 출신의 DJ/프로듀서, 명인. 어린 시절 비디오 게임과 영화, 코믹스들을 마구잡이로 습득. 지금은 오래된 게임의 기판을 활용해 만든 음악. "칩튠(Chiptune)"장르를 기반으로 한국에서 활동하고 있다.<br/><a href="https://soundcloud.com/takasushi">https://soundcloud.com/takasushi</a></dd><br/></li><li><dl><dt>미소녀필크토끼전사 Pretty Pink Rabbit Soldier</dt><dd>2013년 여름, 평화와 유전자를 수호하기 위해 각성한 미소녀핑크토끼전사. 2016년 부활하여 깡총뛰는 중</dd><br/></li><li>&lt; 타임테이블 &gt;</li><li>8:00 ~ 8:50 Taka Sushi</li><li>8:50 ~ 9:15 Pretty Pink Rabbit Soldier</li><li>9:15 ~ 10:00 KIRARA</li>', '2016.7.8 (sat) 8:00~10:00p.m', ' ', 'img/plan2_img.jpg', '5bR0PXB_wxk' ,'239IDaICwdY');
	planarry[2] = new PlanGall('20160703(일) "남사당패 3" 힙합 기획공연', '<li>&lt; Line up &gt;</li><li>알웨일 / 신얼</li><li>엔티스트 / 라올</li><li>김갭 / 다이노티</li><li>케이케이X나쑈</li><li><br/>지금까지 홍대에서 두번의 판과 한강에서 특별한 판을 벌이면서 활발한 활동을 연달아 보이고 있는 5일장 크루의 기획공연 "남사당패"가 오는 7월 3일 신촌 긱라이브하우스와 함께 관객 분들에게 세 번째 판 소식을 전한다.</li><li><br/>5일장 페이지  <a href="http://www.facebook.com/fiveoneking">www.facebook.com/fiveoneking</a></li>', '2016년 07월 03일(일) 오후 6시', '5,000 원<br/>당일 선착순 입장 (티켓부스 오픈 PM 4:00 / 입장 PM 5:30 / 공연시작 PM 6:00 / 당일 사정에 따라 변동 가능)', 'img/plan3_img.jpg', 'a5SiQN2YgTY' ,'blLb1LrfaHM');
	planarry[3] = new PlanGall('20160702(토) "Fire work 5." - 힙합 기획공연', '<li>&lt; Line up &gt;</li><li>어센틱키즈 / MC Thatsuck</li><li>Clock / ID</li><li>엠제로 / 솔라시도</li><li>T-NAP / KIFF CLAN</li><li>Bigmonster crew</li>', '2016. 7. 2 (토) 6:00 PM', ' ', 'img/plan4_img.jpg', 'LKIL3w5V4Bw' ,'uOn9RJUFX2g');
	planarry[4] = new PlanGall('20160709(토) "20160617(금) "GEEKERZ(긱커즈) 2" 크루 스페셜 - 힙합 기획공연', '                            <li>&lt; Line up &gt;</li><li>H.hour / Big Monster</li><li>허밍와일즈 / 오큐파이</li><li>lt; Guset &gt;</li><li>조뜰 / 비정상크루</li>', '2016. 6. 17 (금) 7:00 PM', ' ', 'img/plan5_img.jpg', 'y4yhDCxqFEg' ,'9LtBSMvyeXE');
	planarry[5] = new PlanGall('20160611(토) "Fire work vol.4" 힙합기획공연', '<li>&lt; Line up &gt;</li><li>T-Nap</li><li>퍼즈</li><li>워농</li><li>Emerpus YC</li><li>누케이</li><li>OQPY</li><li>루킹</li><li>루스헤브</li><li>T.K.O</li>', '2016. 6. 11 (토) 6:00 PM', '10,000 원', 'img/plan6_img.jpg', 'KbppLPAXfDc' ,'0EY9zsVIE88');
	$('.plan_gall_ul li').click(function(){
		indexNum = $(this).index('.plan_gall_ul li');
		indexImg = $(this).children('img').attr('src');
		$('#planGall figure').children('img').attr("src", indexImg);
		$('#planGall h4').text(planarry[indexNum].title);
		$('#planGall .plan_lineup').html(planarry[indexNum].list);
		$('#planGall .plan_detail').html(planarry[indexNum].detail);
		$('#planGall .plan_list').html(planarry[indexNum].imglist);
		planH();
	});
	$('.rent_gall_ul li').click(function(){
		getTarget = $(this).attr('data-target');
		$(getTarget).appendTo("body");
		indexNum = $(this).index('.rent_gall_ul li');
		$(getTarget).find('.modal-body li').hide();
		$(getTarget).find('.modal-body li').eq(indexNum).show();
		listLength = $(getTarget).find('.modal-body li').length;
		$(getTarget).find('.modal-page').html(indexNum + 1 + ' / ' + listLength);
		videoScale();
	});
});
/* 기획공연 높이값 조정 */
function planH() {
	var planh = $('#planGall').children('figure').height();
	$('#planGall').children('article').innerHeight(planh);
}
/* 헤더 위치 함수 */
var h;
function setPos() {
	h = $('.map img').height();
	$('.map').next().css("margin-top", h - 70);
}
/* 서브 페이지 함수 */
function stageShow() {
	if ($('#forStage').hasClass('imageBtn'))
		$('html, body').animate({ scrollTop: 0 }, 500);
	$('#forStage').addClass('active').removeClass('forStage').removeClass('imageBtn');
	$('#stage').show();
	$('.backbg').show();
	$('#intro section').hide();
}
function stageHide() {
	$('#forStage').removeClass('active').addClass('imageBtn').addClass('forStage');
	$('#intro section').show();
	$('#stage').hide();
	$('.backbg').hide();
}
function performShow() {
	if ($('#forPerform').hasClass('imageBtn'))
		$('html, body').animate({ scrollTop: 0 }, 500);
	$('#forPerform').addClass('active').removeClass('forPerform').removeClass('imageBtn');
	$('#perform').show();
	$('.backbg').show();
	$('#intro section').hide();
}
function performHide() {
	$('#forPerform').removeClass('active').addClass('imageBtn').addClass('forPerform');
	$('#intro section').show();
	$('#perform').hide();
	$('.backbg').hide();
}