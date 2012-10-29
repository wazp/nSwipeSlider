/*!
 * nSwipeSlider - https://github.com/wazp/nSwipeSlider
 * Item slider, using css transitions in enabled browsers and jquery animation in disabled ones.
 * Using jquery.event.move 1.3.1 and jQuery.event.swipe 0.5 by Stephan Band:
 * https://github.com/stephband/jquery.event.move - https://github.com/stephband/jquery.event.swipe
 *
 *
 * And yes, I did just call IE <=9 disabled.
 */
;(function($){
	$.fn.nSwipeSlider = function(userOptions){
		// do not load plugins twice
		if(typeof(jQuery.event.special.movestart) == 'undefined') (function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a)}else{a(jQuery)}})(function(s,j){var c=6,e=s.event.add,v=s.event.remove,y=function(R,Q,S){s.event.trigger(Q,S,R)},C=(function(){return(window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(R,Q){return window.setTimeout(function(){R()},25)})})(),g={textarea:true,input:true,select:true,button:true},i={move:"mousemove",cancel:"mouseup dragstart",end:"mouseup"},d={move:"touchmove",cancel:"touchend",end:"touchend"};function n(S){var U=S,T=false,Q=false;function R(V){if(T){U();C(R);Q=true;T=false}else{Q=false}}this.kick=function(V){T=true;if(!Q){R()}};this.end=function(W){var V=U;if(!W){return}if(!Q){W()}else{U=T?function(){V();W()}:W;T=true}}}function K(){return true}function P(){return false}function B(Q){Q.preventDefault()}function N(Q){if(g[Q.target.tagName.toLowerCase()]){return}Q.preventDefault()}function F(Q){return(Q.which===1&&!Q.ctrlKey&&!Q.altKey)}function L(S,T){var R,Q;if(S.identifiedTouch){return S.identifiedTouch(T)}R=-1;Q=S.length;while(++R<Q){if(S[R].identifier===T){return S[R]}}}function l(R,Q){var S=L(R.changedTouches,Q.identifier);if(!S){return}if(S.pageX===Q.pageX&&S.pageY===Q.pageY){return}return S}function o(R){var Q;if(!F(R)){return}Q={target:R.target,startX:R.pageX,startY:R.pageY,timeStamp:(typeof(R.timeStamp)=="undefined")?new Date().getTime():R.timeStamp};e(document,i.move,u,Q);e(document,i.cancel,x,Q)}function u(R){var Q=R.data;r(R,Q,R,z)}function x(Q){z()}function z(){v(document,i.move,u);v(document,i.cancel,z)}function O(R){var S,Q;if(g[R.target.tagName.toLowerCase()]){return}S=R.changedTouches[0];Q={target:S.target,startX:S.pageX,startY:S.pageY,timeStamp:new Date().getTime(),identifier:S.identifier};e(document,d.move+"."+S.identifier,p,Q);e(document,d.cancel+"."+S.identifier,D,Q)}function p(R){var Q=R.data,S=l(R,Q);if(!S){return}r(R,Q,S,M)}function D(R){var Q=R.data,S=L(R.changedTouches,Q.identifier);if(!S){return}M(Q.identifier)}function M(Q){v(document,"."+Q,p);v(document,"."+Q,D)}function r(U,T,V,S){var R=V.pageX-T.startX,Q=V.pageY-T.startY;if((R*R)+(Q*Q)<(c*c)){return}q(U,T,V,R,Q,S)}function H(){this._handled=K;return false}function J(Q){Q._handled()}function q(U,Y,S,X,V,W){var R=Y.target,T,Q;T=U.targetTouches;Q=((typeof(U.timeStamp)=="undefined")?new Date().getTime():U.timeStamp)-Y.timeStamp;Y.type="movestart";Y.distX=X;Y.distY=V;Y.deltaX=X;Y.deltaY=V;Y.pageX=S.pageX;Y.pageY=S.pageY;Y.velocityX=X/Q;Y.velocityY=V/Q;Y.targetTouches=T;Y.finger=T?T.length:1;Y._handled=H;Y._preventTouchmoveDefault=function(){U.preventDefault()};y(Y.target,Y);W(Y.identifier)}function G(R){var Q=R.data.event,S=R.data.timer;E(Q,R,((typeof(R.timeStamp)=="undefined")?new Date().getTime():R.timeStamp),S)}function b(R){var Q=R.data.event,S=R.data.timer;a();w(Q,S,function(){setTimeout(function(){v(Q.target,"click",P)},0)})}function a(Q){v(document,i.move,G);v(document,i.end,b)}function A(R){var Q=R.data.event,T=R.data.timer,S=l(R,Q);if(!S){return}R.preventDefault();Q.targetTouches=R.targetTouches;E(Q,S,((typeof(R.timeStamp)=="undefined")?new Date().getTime():R.timeStamp),T)}function h(R){var Q=R.data.event,T=R.data.timer,S=L(R.changedTouches,Q.identifier);if(!S){return}k(Q);w(Q,T)}function k(Q){v(document,"."+Q.identifier,A);v(document,"."+Q.identifier,h)}function E(R,U,Q,T){var S=Q-R.timeStamp;R.type="move";R.distX=U.pageX-R.startX;R.distY=U.pageY-R.startY;R.deltaX=U.pageX-R.pageX;R.deltaY=U.pageY-R.pageY;R.velocityX=0.3*R.velocityX+0.7*R.deltaX/S;R.velocityY=0.3*R.velocityY+0.7*R.deltaY/S;R.pageX=U.pageX;R.pageY=U.pageY;T.kick()}function w(R,S,Q){S.end(function(){R.type="moveend";y(R.target,R);return Q&&Q()})}function f(S,R,Q){e(this,"movestart.move",J);return true}function t(Q){v(this,"dragstart drag",B);v(this,"mousedown touchstart",N);v(this,"movestart",J);return true}function I(Q){if(Q.namespace==="move"||Q.namespace==="moveend"){return}e(this,"dragstart."+Q.guid+" drag."+Q.guid,B,j,Q.selector);e(this,"mousedown."+Q.guid,N,j,Q.selector)}function m(Q){if(Q.namespace==="move"||Q.namespace==="moveend"){return}v(this,"dragstart."+Q.guid+" drag."+Q.guid);v(this,"mousedown."+Q.guid)}s.event.special.movestart={setup:f,teardown:t,add:I,remove:m,_default:function(S){var Q,R;if(!S._handled()){return}Q={target:S.target,startX:S.startX,startY:S.startY,pageX:S.pageX,pageY:S.pageY,distX:S.distX,distY:S.distY,deltaX:S.deltaX,deltaY:S.deltaY,velocityX:S.velocityX,velocityY:S.velocityY,timeStamp:S.timeStamp,identifier:S.identifier,targetTouches:S.targetTouches,finger:S.finger};R={event:Q,timer:new n(function(T){y(S.target,Q)})};if(S.identifier===j){e(S.target,"click",P);e(document,i.move,G,R);e(document,i.end,b,R)}else{S._preventTouchmoveDefault();e(document,d.move+"."+S.identifier,A,R);e(document,d.end+"."+S.identifier,h,R)}}};s.event.special.move={setup:function(){e(this,"movestart.move",s.noop)},teardown:function(){v(this,"movestart.move",s.noop)}};s.event.special.moveend={setup:function(){e(this,"movestart.moveend",s.noop)},teardown:function(){v(this,"movestart.moveend",s.noop)}};e(document,"mousedown.move",o);e(document,"touchstart.move",O);if(typeof Array.prototype.indexOf==="function"){(function(S,T){var R=["changedTouches","targetTouches"],Q=R.length;while(Q--){if(S.event.props.indexOf(R[Q])===-1){S.event.props.push(R[Q])}}})(s)}});
		if(typeof(jQuery.event.special.swipe) == 'undefined') (function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a)}else{a(jQuery)}})(function(g,h){var f=g.event.add,c=g.event.remove,d=function(j,i,k){g.event.trigger(i,k,j)},e={threshold:0.4,sensitivity:6};function b(l){var i,j,k;i=l.target.offsetWidth;j=l.target.offsetHeight;k={distX:l.distX,distY:l.distY,velocityX:l.velocityX,velocityY:l.velocityY,finger:l.finger};if(l.distX>l.distY){if(l.distX>-l.distY){if(l.distX/i>e.threshold||l.velocityX*l.distX/i*e.sensitivity>1){k.type="swiperight";d(l.currentTarget,k)}}else{if(-l.distY/j>e.threshold||l.velocityY*l.distY/i*e.sensitivity>1){k.type="swipeup";d(l.currentTarget,k)}}}else{if(l.distX>-l.distY){if(l.distY/j>e.threshold||l.velocityY*l.distY/i*e.sensitivity>1){k.type="swipedown";d(l.currentTarget,k)}}else{if(-l.distX/i>e.threshold||l.velocityX*l.distX/i*e.sensitivity>1){k.type="swipeleft";d(l.currentTarget,k)}}}}function a(i){var j=g.data(i,"event_swipe");if(!j){j={count:0};g.data(i,"event_swipe",j)}return j}g.event.special.swipe=g.event.special.swipeleft=g.event.special.swiperight=g.event.special.swipeup=g.event.special.swipedown={setup:function(k,j,i){var k=a(this);if(k.count++>0){return}f(this,"moveend",b);return true},teardown:function(){var i=a(this);if(--i.count>0){return}c(this,"moveend",b);return true},settings:e}});

		var defaults = { wrapAround : true, nonTransSpeed:200 }, // default options. nonTransSpeed is anim milliseconds for non css transition browsers
			options = $.extend(defaults, userOptions),
			// quick check if the browser has support for css3 transitions. if true, we'll use that otherwise we fallback to jQuery .animate
			hasTrans = (function(a,b){a=(new Image).style;b='ransition';return't'+b in a||'webkitT'+b in a||'MozT'+b in a||'OT'+b in a})(),
			// depending on browser we want the correct call for the transitionEnd event;
			transEnd = (function(){var t,el = document.createElement('fakeelement'),transitions = {'transition':'transitionEnd','OTransition':'oTransitionEnd','MSTransition':'msTransitionEnd','MozTransition':'transitionend','WebkitTransition':'webkitTransitionEnd'};for(t in transitions){if( el.style[t] !== undefined ){return transitions[t];}}})();
			
		return this.each(function(){
			if(typeof($(this).data('nSwipeSlider')) != 'undefined') return; // if already loaded, it won't be undefined.
			$(this).data('nSwipeSlider',{loaded:true}); // add data to element that we've already loaded a slider on it.
			if(options.wrapAround){ // if we want a wrap around effect...
				// ...we need to clone elements from first to last, last to first to simulate it.
				$(this).find('> div').eq(0).clone(true).appendTo($(this)).removeClass('active');
				$(this).find('> div').eq($(this).find('> div').length-2).clone(true).prependTo($(this));
			}
			
			// some jQ caches and vars
			var $wrap = $(this),
				$items = $wrap.find('> div'),
				active = $items.filter('.active'),
				i = $items.index(active),
				width = $wrap.width();
			
			$items.on('movestart', function(e) {
				// sliding finger up or down? prevent default and scroll instead.
				if ((e.distX > e.distY && e.distX < -e.distY) ||
				    (e.distX < e.distY && e.distX > -e.distY)) {
					e.preventDefault();
					return;
				}
				$wrap.trigger('nSwipeSlider.swipeStart',[$(this),i]);
				$wrap.addClass('notransition'); // turn off the css3 transitions for now
			}).on('move', function(e) {
				var left = 100 * e.distX / width;
				// Move slides with the finger
				if (e.distX < 0) {
					if ($items[i+1]) {
						$items[i].style.left = left + '%';
						$items[i+1].style.left = (left+100)+'%';
					}
					else {
						$items[i].style.left = left/4 + '%';
					}
				}
				if (e.distX > 0) {
					if ($items[i-1]) {
						$items[i].style.left = left + '%';
						$items[i-1].style.left = (left-100)+'%';
					}
					else {
						$items[i].style.left = left/5 + '%';
					}
				}
			}).on('moveend', function(e) {
				if(hasTrans){
					$wrap.removeClass('notransition');
					resetStyleTag();
				}else{
					$items.eq(i).animate({left:0},options.nonTransSpeed,function(){$wrap.removeClass('notransition'); resetStyleTag(); });
					$items.eq(i).prev('div').animate({left:'-100%'},options.nonTransSpeed);
					$items.eq(i).next('div').animate({left:'100%'},options.nonTransSpeed);
				}
			}).on('swipeleft', function(e) {
				if (i === $items.length - 1) { return; }
				$items.eq(i + 1).trigger('slideTo');
			}).on('swiperight', function(e) {
				if (i === 0) { return; }
				$items.eq(i - 1).trigger('slideTo');
			}).on('slideTo', function(e) { 
				if(hasTrans){ // we have transition enabled in browser, woohoo!
					$items.eq(i).removeClass('active');
					$(e.target).addClass('active');
					e.target.addEventListener(transEnd,triggerDoneEvent,false);
					// Update the active slide index
					i = $items.index(e.target);
				}else{ // we're using a disabled browser. Bring in the wheelchair!
					$items.stop(true); // just to make sure, we stop every animation. worked better on it's own then when chained, for some unknown reason
					var direction = (i>$items.index(e.target)) ? '100%':'-100%'; // are we going left or right, eh?
					$items.eq(i).animate({left:direction},options.nonTransSpeed,function(){
						$(this).removeClass('active');
						$(e.target).addClass('active');
						i = $items.index(e.target);
						if(options.wrapAround){
							changeCurrent();
						}
						// reset back to style.left='' - for some reason it didn't happen in ie. go figure. also needed a small delay. go figure again.
						setTimeout(resetStyleTag,20);
					});
					$(e.target).animate({left:0},options.nonTransSpeed,function(){
						// let the world know we're done!
						$wrap.trigger('nSwipeSlider.swipeDone',[$(this),i]);
					});					
				}
			});
			
			if(options.wrapAround && hasTrans){ // this takes care of the wrap around when we're using built in css3 transitions!
				// bind event listeners to the first and last item;
				$items.eq(0)[0].addEventListener(transEnd,changeCurrent,false);
				$items.eq($items.length-1)[0].addEventListener(transEnd,changeCurrent,false);
				
				// Warp speed on the wrap around, Mr. Zulu. Engage!
				function changeCurrent(){
					if( i === 0){
						$wrap.addClass('notransition');
						$items.eq(i).removeClass('active').end().eq($items.length-2).addClass('active');
						i = $items.length-2;
						setTimeout(function(){$wrap.removeClass('notransition');},options.nonTransSpeed);
					}else if(i === $items.length-1){
						$wrap.addClass('notransition');
						$items.eq($items.length-1).removeClass('active').end().eq(1).addClass('active');
						$items.eq($items.length-1)[0].style.left = '';
						i = 1;
						setTimeout(function(){$wrap.removeClass('notransition');},options.nonTransSpeed);
					}
				}
			}
			
			function resetStyleTag(){
				$items.each(function(){ $(this)[0].style.left = ''; });
			}
			
			function triggerDoneEvent(e){
				$wrap.trigger('nSwipeSlider.swipeDone',[$(e.target),i]);
				e.target.removeEventListener(transEnd,triggerDoneEvent,false);
			}
			
		});
	};
})(jQuery);