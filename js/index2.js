$(function(){
	var str='';
	for(var i=1;i<=70;i++){

		str+='<div class="waterfall-item">'
			+'<h2>瀑布流</h2>'
			+'<img src="img/'+i+'.jpg">'
			+'<p>这是瀑布流的效果</p>'
			+'</div>';

	}


	$('.waterfall').html(str);
});

$(window).load(function(){
	var waterfall={
		init:function(){
			this.wtItems=$(".waterfall-item");
			this.wtItemWidth=this.wtItems.first().outerWidth();
			this.rows=Math.floor($('.waterfall').outerWidth()/this.wtItemWidth);
			this.space=($('.waterfall').outerWidth()-this.wtItemWidth*this.rows)/(this.rows+1);
			this.verticalH=10;

			this.firstLine();

		},

		firstLine:function(){
			var that=this;
			this.position=[];
			for(var i=0;i<this.rows;i++){
				var obj={
					left:(this.space+this.wtItemWidth)*i+this.space,
				    top:this.verticalH*2+this.wtItems.eq(i).outerHeight()
				};
			  this.position.push(obj);

			}

		  //设置第一行位置
			for(var i=0;i<this.rows;i++){
				this.wtItems.eq(i).animate({
					left:this.position[i].left,
					top:this.verticalH
				},500)
			}
			this.pos();
		},

		pos:function(){
		    for(var j=this.rows;j<this.wtItems.length;j++){
				var index=this.minTop();
				this.wtItems.eq(j).animate({
					left:this.position[index].left,
				    top:this.position[index].top
				},500)

				this.position[index].top+=this.wtItems.eq(j).outerHeight()+15;
			}
		},
		minTop:function(){
			var minTop=this.position[0].top;
			var index=0;
			for(var i=0;i<this.position.length;i++){
				if(minTop>this.position[i].top){
					minTop=this.position[i].top;
					index=i
				}
			}

			return index;
		}

	};

	waterfall.init();

	$(window).resize(function(){
		waterfall.init();
	})
})
