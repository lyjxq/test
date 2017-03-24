function formatterDateTime() {
	var date=new Date()
	var month=date.getMonth() + 1
	var datetime = date.getFullYear()
		+ ""// "年"
	    + (month >= 10 ? month : "0"+ month)
	    + ""// "月"
	    + (date.getDate() < 10 ? "0" + date.getDate() : date
	        .getDate())
	    + ""
	    + (date.getHours() < 10 ? "0" + date.getHours() : date
	        .getHours())
	    + ""
	    + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
	        .getMinutes())
	    + ""
	    + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
	        .getSeconds());
	return datetime;
}



var str = [];
var $pagefirst = 2;
var $pagesecond = 2;
var slideGlobal = angular.module('slideGlobal',[])
/////////////////////////////    段子
slideGlobal.directive('firstslide',function($http,$compile){
	return{
		templateUrl:'slide-first.html',
		link:function(scope, element, attrs){			
			$http({
				type:"get",
			    url : "http://route.showapi.com/255-1",
			    params: {
				    "showapi_timestamp": formatterDateTime(),
				    "showapi_appid": 26959, //这里需要改成自己的appid '26959'
				    "showapi_sign": 'e866d3a656b14bfcab04de805203872b',  //这里需要改成自己的应用的密钥secret， 
				    "type":29,				 
				    "page":1			       
				}
			}).success(function(newItems) { 
				str1 = newItems.showapi_res_body.pagebean.contentlist;
				scope.strs = str1; 
				//console.log(str1)	
			    //console.log(str1.length)	              	                
	            }).finally(function() {
	                scope.$broadcast('scroll.refreshComplete');	                	               
	            	});	
	            	
	            	
			scope.doRefreshFirst = function(){					
				$http({
					type:"get",
			    	url : "http://route.showapi.com/255-1",
			     	params: {
				        "showapi_timestamp": formatterDateTime(),
				        "showapi_appid": 26959, //这里需要改成自己的appid '26959'
				        "showapi_sign": 'e866d3a656b14bfcab04de805203872b',  //这里需要改成自己的应用的密钥secret， 
				        "type":29,				       
				        "page":$pagefirst				       	
				    }
			    }).success(function(newItems) {                			     			     		
			     		//scope.strs = newItems.showapi_res_body.pagebean.contentlist; 
			     		strx = newItems.showapi_res_body.pagebean.contentlist;
			     		str1 = $.merge(strx,str1);
			     		scope.strs = str1;
			     		//console.log(str1)
			     		//console.log(str1.length)	              	                
	            }).finally(function() {
	                scope.$broadcast('scroll.refreshComplete');
	                $pagefirst++;
	            });	
			}
			
		}	
	}
})
//////////////////////////////         推荐
slideGlobal.directive('secondslide',function($http,$compile){
	return{
		templateUrl:'slide-second.html',
		link:function(scope, element, attrs){
			//if(!localStorage.getItem('allstr')){							
				$http({
					type:"get",
				    url : "http://route.showapi.com/109-35",
				    params: {
					    "showapi_timestamp": formatterDateTime(),
					    "showapi_appid": 27033, //这里需要改成自己的appid '26959'
					    "showapi_sign": '6e86fa3667d04607a4da108e72309a93',  //这里需要改成自己的应用的密钥secret， 
					    "title":"",
					    "type":05,
					    "page":1			       
					}
				}).success(function(newItems) { 
					str1 = newItems.showapi_res_body.pagebean.contentlist;
					scope.news = str1;
					
					localStorage.removeItem('allstr');
					str2 =  JSON.stringify(str1)
					localStorage.setItem('allstr',str2);																	
					//console.log(str1)	
				    //console.log(str1.length)	              	                
		            }).finally(function() {
		                scope.$broadcast('scroll.refreshComplete');	                	               
		            	});	
//	        }else{
//	        	console.log(99)
//	       		var allstr = localStorage.getItem('allstr');
//				var allstrs = JSON.parse(allstr)
//	       		scope.news = allstrs;
//	        }
			scope.doRefreshSecond = function(){					
				$http({
					type:"get",
			    url : "http://route.showapi.com/109-35",
			    params: {
				    "showapi_timestamp": formatterDateTime(),
				    "showapi_appid": 27033, //这里需要改成自己的appid '26959'
				    "showapi_sign": '6e86fa3667d04607a4da108e72309a93',  //这里需要改成自己的应用的密钥secret， 
				    "title":"",
				    "type":05,
				    "page":$pagesecond			       
				}
			    }).success(function(newItems) {                			     			     		
			     		//scope.strs = newItems.showapi_res_body.pagebean.contentlist; 
			     		strx = newItems.showapi_res_body.pagebean.contentlist;
			     		str1 = $.merge(strx,str1);
			     		scope.news = str1;
			     		
			     		localStorage.removeItem('allstr');
			     		str2 =  JSON.stringify(str1);
						localStorage.setItem('allstr',str2);
			     		
			     		//console.log(str1)
			     		//console.log(str1.length)	              	                
	            }).finally(function() {
	                scope.$broadcast('scroll.refreshComplete');
	                $pagesecond++;
	            });	
			}
			
		}	
	}
})

////////////////////////////////天气
slideGlobal.directive('tianqi',function($http,$compile){
	return{
		templateUrl:'slide-tianqi.html',
		link:function(scope,element,attrs){
			scope.city = "广州";
			
			//搜索天气
		scope.search = function(){
			$('.todayWeather').html("");			
			var cityname = $('#cityname').val().trim();			
			$.get("http://wthrcdn.etouch.cn/weather_mini?city="+$('#cityname').val().trim(),function(data){
				var $json = JSON.parse(data)						
				initWeather($json);
				scope.weather = $json.data.forecast;						
			})
			//初始化天气
			var initWeather = function(json){
				//console.log(json.status)
				if(json.status != 1000){
				
					$('.todayWeather').html("没有对应的天气信息，确认城市名称是否错误!");
					
					return false;					
				}
				//拼接今天的天气状况
				$('.todayWeather').append('<div class="weather1"></div>');
				$('.weather1').html(
					'<div class="weathers"><p class="wendu"><span>'
					+json.data.wendu+'</span>°</p><p class="address"><i class="ion-android-pin"></i> '
					+json.data.city+ ' | ' 
					+json.data.forecast[0].type+' </p></div>'+'<div class="ganmao"><p class="wx">温馨提示:</p><p>'
					+json.data.ganmao+'</p></div>'+'<div class="other"><div class="col-xs-4" style="padding: 0;margin: 0;text-align: center; border-right: 1px dashed white;"><sapn>'
					+json.data.forecast[0].fengxiang +'</sapn><br /><span class="max">'
					+json.data.forecast[0].fengli+'</span></div><div class="col-xs-4 "style="padding: 0;margin: 0;text-align: center; "><sapn>日期</sapn><br /><span class="max">'
					+json.data.forecast[0].date+'</span></div><div class="col-xs-4"style="padding: 0;margin: 0;text-align: center;border-left: 1px dashed white;"><sapn>空气质量</sapn><br /><span class="max">'
					+json.data.aqi+'</span></div></div></div> '								
				)
				//拼接昨天的天气状况
				$('.todayWeather').append('<div class="weather"></div>');
				$('.weather').html('<div class="col-xs-5"><p class="address"> 昨天</p><p class="address"> '+json.data.yesterday.type+' | '+json.data.yesterday.fl+' </p></div><div class="col-xs-7 font"><span >'+json.data.yesterday.low.replace('低温','')+' --'+json.data.yesterday.high.replace('高温','')+'</span></div></div>')								
				
			}
		}
		}
		
	}
})
