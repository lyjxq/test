var app = angular.module('myApp',['ionic','slideGlobal']);
	app.controller('myCtrl',['$scope','$http','$ionicSlideBoxDelegate','$ionicSideMenuDelegate',function($scope,$http,$ionicSlideBoxDelegate,$ionicSideMenuDelegate){
		$scope.title = '掌上宝';
		$scope.doRefresh = function(){
			console.log(0)
			
		}
		$scope.slideHasChanged = function(_index){			
			//$scope.slideIndex = _index;
			$('#menus a').removeClass('active')
			$('#menus a').eq(_index).addClass('active')			
		}
		$scope.activeslide = function(_index){			
			$ionicSlideBoxDelegate.slide(_index);		
		}
		$scope.toggleLeft = function(){
			 $ionicSideMenuDelegate.toggleLeft();
		}
	}])
	
	
	
	
$(function() {
    var _startX;
    var _endX;
    var _moveX;
    var _X=0;
	//手指触碰屏幕时触发函数
    $('#menus').on('touchstart',function(e) {
        e.preventDefault();
		var _touch = e.originalEvent.targetTouches[0];
		    _startX = _touch.pageX;		    
		});
	//手指在屏幕滑动时触发函数
	$('#menus').on('touchmove',function(e) {
		e.preventDefault();
    	var _touch = e.originalEvent.targetTouches[0];
     	_moveX= _touch.pageX;
     	
    	_X += (_moveX- _startX)*0.02;
		$(this).css('left',_X+'px');
	});
	//手指离开屏幕时触发函数
	$('#menus').on('touchend',function(e) {
		e.preventDefault();
    	//var _touch = e.originalEvent.changedTouches[0];
   		//_endX= _touch.pageX;		
		if($(this).offset().left>=0){
			$(this).css('left',0+'px');
		}else if($(this).offset().left<=-110){
			$(this).css('left',-110+'px');
		}		
    })
	$('.content-box').css('height',$(document).height()-74-45+'px');
	$('#menus a').eq(0).addClass('active');
	$('.bg-footer div').eq(0).addClass('active');
	$('.bg-footer div').on('touchstart',function(){
		$('.bg-footer div').removeClass('active');
		$(this).addClass('active');
	})
	
})