$(function(){
	var str='';
	for(var i=1;i<=70;i++){
		str+='<div class="waterfall-item">'
			+'<h2>瀑布流</h2>'
			+'<img src="img/'+i+'.jpg"/>'
			+'<p>这是瀑布流</p>'
			+'</div>';
	}

	console.log(123)
	$('.waterfall').html(str);
})

$(window).load(function(){
	var waterfall={
		init:function(){
			this.wtItems=$('.waterfall-item');
			this.itemWidth=this.wtItems.first().outerWidth();
			this.calRow();


		},
		//
		calRow:function(){
			var width=$('.waterfall').width(); //文档可视区域
			this.rows=Math.floor(width/this.itemWidth);//计算图片一共排成几列
			this.space=(width-this.rows*this.itemWidth)/(this.rows+1); //图片之间的横向间隔
			this.verticleH=15;  //设置图片之间的纵向间隔
			this.firstLine();


		},

		//设置第一行图片的位置
		firstLine:function(){
			this.position=[];  //数组里装第一行图片的left与top之
			for(var i=0;i<this.rows;i++){
				var obj= {
					 left :(this.space + this.itemWidth) * i + this.space,//第一行图片的left位置
				      top :this.verticleH *2+this.wtItems.eq(i).outerHeight()  //这个top实际是它下边的图片的top位置
			    }
			  this.position.push(obj);
				//将第一行图片设置好位置
				this.wtItems.eq(i).animate({
					left:obj.left,
					top:this.verticleH
				},500)

			}

			this.itemPos();
		},
		//计算后面每一排元素的位置
		itemPos:function(){
			for(var j=this.rows;j<this.wtItems.length;j++){ //遍历到从第二行开始的每一张图片
				var index=this.minTop(); //得到position中top值最小的下标
				//设置这张图片的位置
				this.wtItems.eq(j).animate({
					left:this.position[index].left,
					top:this.position[index].top
				},500)

				//这句话很重要  将设置位置的这个图片[this.wtItems.eq(j)]的高度和他下边的边距叠加给position中的最小下标的那个图片的top值
				this.position[index].top+=this.wtItems.eq(j).outerHeight()+15;
			}
	     },

		//计算得出position中图片top值最小的下标
		minTop:function(){
			var index=0;
			var minTop=this.position[0].top;
			//console.log(this.position.length)
			//console.log(this.rows.length)

			for(var i=0;i<this.position.length;i++){
				if(this.position[i].top<minTop){
					minTop=this.position[i].top;
					index=i; //最小下标
				}
			}
			return index;
		}

	}

	waterfall.init();
	//resize事件 当窗口发生改变的时候出发此事件
 	$(window).resize(function(){
		waterfall.calRow();
	})
})