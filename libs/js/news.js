$(function(){
	$('.news-content').css('height',$(document).height()-88+'px');	
	$('.pms i').each(function(){
		$(this).on('touchstart',function(){
		$('.pms i').css('color','black')
			$(this).css('color','red')
		})
	})
	var allstr = localStorage.getItem('allstr');
	var allstrs = JSON.parse(allstr)
	console.log( allstrs )
	
	function  getUrl(){
		var _url = window.location.search; //获取url中"?"符后的字串
		var obj = { };
		if(_url.indexOf("?") !=-1){ //判断是否有参数
			var str1 = _url.substr( 1 ); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
			var strs = str1.split("&"); //用&号进行分隔 （有多个参数 要用&号分隔 再用等号进行分隔）
			for(var i=0;i<strs.length;i++){				
				obj[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);//  unescape() 函数可对通过 escape() 编码的字 符串进行解码。用法unescape(string)
			}
		}
		return obj;
				
	}
	getid = getUrl();
	var id = getid.id;
	var Date = getid.Date;
	for(var i=0;i<allstrs.length;i++){		
		if(id==allstrs[i].channelId && Date==allstrs[i].pubDate){	
			$('.news-content').html("");
			
			document.createElement('div')
			$('.news-content').append('<div class="biaoti" ></div>')
			$('.news-content>div:last-child()').html("<h3>"+allstrs[i].title+"</h3>")
			
			document.createElement('div')
			$('.news-content').append('<div class="author-mas" ></div>')
			$('.news-content>div:last-child()').html("<img src='libs/imgs/man.png'/><div class='mes'><p>小野牛的小野牛</p><p>"+allstrs[i].pubDate+"</p></div><div class='gz'>+关注</div>")
			if(allstrs[i].allList.length>0){							
				for(var j=0;j<allstrs[i].allList.length;j++){						
					if( typeof allstrs[i].allList[j]=='object'){
						document.createElement('div')
						$('.news-content').append('<div class="news" ></div>')
						$('.news-content>div:last-child()').html("<img src="+allstrs[i].allList[j].url+">")				
					}else{
						document.createElement('div')
						$('.news-content').append('<div class="news"></div>')
						$('.news-content>div:last-child()').html(allstrs[i].allList[j])					
					}
				}
			}else{
				document.createElement('div')
				$('.news-content').append('<div class="news"></div>')
				$('.news-content>div:last-child()').html(allstrs[i].desc)	
			}
			
		}	
	}
})

