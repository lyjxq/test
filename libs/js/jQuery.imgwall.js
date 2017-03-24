//jQuery 瀑布流照片墙
//作者：许强
//date:2016-10-13
//使用说明
/*
	window.onload = function(){
		$.imgwall({
			col:number   //number只能为 1--8 的数字，其他数样式则会乱
		})
	}
*/

(function($){
	//jQuery 扩展的插件名
	//opts 为对象形式的参数 如上使用说明的形式
	$.imgwall = function(opts){
		//默认的对象参数
		var _default = {
			content : window, //放图片的容器
			col : 4  // 默认为4列
		};
		//$.extend  jQuery 的扩展方法 （两个对象的合并）对象克隆 （产生新的对象）
		// 加 true 表示深度克隆  _default,opts中若存在相同的属性 则后者会覆盖前者 其他的则会合并
		opts = $.extend(true,_default,opts);
			//获取行数
			var col = opts.col;//1--8
			//获取容器
			var $content = opts.content;
			//以下则为相关算法

			//定义可设置的行数为 1--8 列
			var col1top = 0;
			var col2top = 0;
			var col3top = 0;
			var col4top = 0;
			var col5top = 0;
			var col6top = 0;
			var col7top = 0;
			var col8top = 0;
			
			var rowleft = 0;
			//设置每列的宽度
			var $width = $($content).width()/col;
			
			//对所有的图片进行遍历
			$('img').each(function(i,img){
				if(i%col==0){
					//图另起一行时 重新设置rowleft
					rowleft = 0;
					//给当前选中的图片赋样式
					$(img).css({
						top:col1top+"px",
						left:rowleft+"px",
						width:$width		
					});
					
					rowleft += $(img).width();
					col1top += $(img).height();


				}else if(i%col==1){
					$(img).css({
						top:col2top+"px",
						left:rowleft+"px",
						width:$width		
					});
					
					rowleft += $(img).width();
					col2top += $(img).height();

				}else if(i%col==2){
					$(img).css({
						top:col3top+"px",
						left:rowleft+"px",
						width:$width		
					});
					
					rowleft += $(img).width();
					col3top += $(img).height();

				}else if(i%col==3){
					$(img).css({
						top:col4top+"px",
						left:rowleft+"px",
						width:$width		
					});
					
					rowleft += $(img).width();
					col4top += $(img).height();

				}else if(i%col==4){
					$(img).css({
						top:col5top+"px",
						left:rowleft+"px",
						width:$width		
					});
					
					rowleft += $(img).width();
					col5top += $(img).height();

				}else if(i%col==5){
					$(img).css({
						top:col6top+"px",
						left:rowleft+"px",
						width:$width		
					});
					
					rowleft += $(img).width();
					col6top += $(img).height();

				}else if(i%col==6){
					$(img).css({
						top:col7top+"px",
						left:rowleft+"px",
						width:$width		
					});
				
					rowleft += $(img).width();
					col7top += $(img).height();

				}else if(i%col==7){
					$(img).css({
						top:col8top+"px",
						left:rowleft+"px",
						width:$width		
					});
			
					rowleft += $(img).width();
					col8top += $(img).height();

				}
			})

	}
})(jQuery)