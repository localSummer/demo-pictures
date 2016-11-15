window.onload = function() {
	var aData = [];
	for(var i = 1; i <= 16; i++) {
		aData[i - 1] = 'video/' + i + '.jpg';
	}

	create(aData);

	function create(aData) {
		var oPage = document.getElementsByTagName('article')[0];
		var oList = document.getElementById('picList');
		var aLi = oList.getElementsByTagName('li');
		var aBtns = oPage.getElementsByClassName('btn');
		var sHtml = '';
		var aRemove = [];
		var flag = true;

		for(var i = 0; i < aData.length; i++) {
			sHtml += '<li style="background-image: url('+ aData[i] +');"></li>';
		}
		oList.innerHTML = sHtml;
		setTimeout(function(){toPosition();}, 100); //li标签可能还没有渲染完成，所以需要延迟执行才会有动画

		aBtns[1].addEventListener('touchend',fnEnd, false);
		aBtns[0].addEventListener('touchend', fnRemove, false);

		function fnEnd() {
			if(flag) {
				aBtns[1].innerHTML = '取消';

				for(var i = 0; i < aLi.length; i++) {
					aLi[i].index = i;
				}
				oList.addEventListener('touchend', fnSelected, false);
			} else {
				aBtns[1].innerHTML = '选择';
				aBtns[0].style.display = 'none';
				for(var j = 0; j < aLi.length; j++) {
					aLi[j].className = '';
					aLi[j].style.opacity = 1;
				}
				oList.removeEventListener('touchend', fnSelected, false);
				aRemove.length = 0;
			}
			flag = !flag;
		}

		function fnSelected(e) {
			aRemove.push(e.target.index);
			// console.log(aRemove);
			aBtns[0].style.display = 'block';
			e.target.style.opacity = 0.35;
			// e.target.className = 'animated rollIn'; 一旦加载动画touchend事件就会部分失效
			// e.target.className = ' animated bounce';
		}

		function fnRemove() {
			aRemove = aRemove.sort(function(a, b) {
				return a - b;
			});
			while(aRemove.length) {
				var num = aRemove.pop();
				aLi[num].className = '';
				aLi[num].className = ' animated rollOut';
				setTimeout(function(){
					var animates = document.querySelectorAll('.rollOut');
					for(var i =0; i < animates.length; i++) {
						oList.removeChild(animates[i]);
					}
					toPosition();
					flag = false;
					fnEnd();
				}, 600);
			}
		}

		function toPosition() {
			for(var i = 0; i < aLi.length; i++) {
				aLi[i].style.left = i % 3 + 'rem';
				aLi[i].style.top = Math.floor(i / 3) + 'rem';
			}
		}
	}
};