/*CORE JS*/

//"use strict";

//global variable using namespace
var CoreData = {};
CoreData.body = document.querySelector('body').offsetHeight;

export default CoreData;

//(function() {

		/*====================================
			Core Basic JS Function 
		======================================*/
	
		export function hasClass(elem, className) {
		    //return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
			return elem.classList.contains(className) 
		}

		export function addClass(elem, className) {
		    if (!hasClass(elem, className)) {
		        //elem.className += ' ' + className;
				elem.classList.add(className);
		    }
		}


		export function removeClass(elem, className) {
		    /*var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
		    if (hasClass(elem, className)) {
		        while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
		            newClass = newClass.replace(' ' + className + ' ', ' ');
		        }
		        elem.className = newClass.replace(/^\s+|\s+$/g, '');
		    }*/

			if (hasClass(elem, className)) {
				elem.classList.remove(className);
			}
		}

		export function toggleClass(elem, className) {
		    /*var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ' ) + ' ';
		    if (hasClass(elem, className)) {
		        while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
		            newClass = newClass.replace( ' ' + className + ' ' , ' ' );
		        }
		        elem.className = newClass.replace(/^\s+|\s+$/g, '');
		    } else {
		        elem.className += ' ' + className;
		    }*/

			elem.classList.toggle(className);

		}

		export function transition(elem){
			elem.style.webkitTransition = "all .5s ease-in-out";
			elem.style.MozTransition = "all .5s ease-in-out";
			elem.style.msTransition = "all .5s ease-in-out";
			elem.style.OTransition = "all .5s ease-in-out";
			elem.style.transform = "all .5s ease-in-out";
			elem.style.transition = 'all .5s ease-in-out';
		}

		// Show an element
		export function show(elem) {
			elem.style.display = 'block';
		}

		export function showflex(elem) {
			elem.style.display = 'flex';
		}

		// Hide an element
		export function hide(elem) {
			elem.style.display = 'none';
		}
			

		// Toggle element visibility
		export function toggle(elem) {
			// If the element is visible, hide it
			if (window.getComputedStyle(elem).display === 'block') {
				hide(elem);
				return;
			}
			// Otherwise, show it
			show(elem);
		}

		// remove element by class
		export function removeElementsByClass(className){
			var elements = document.getElementsByClassName(className);
			while(elements.length > 0){
				elements[0].parentNode.removeChild(elements[0]);
			}
		}

		/*if (hasClass(document.documentElement, 'some-class')) {
		    // Do something crazy
		} else {
		    // hmmm
		}*/

		/*document.getElementById('myButton').onclick = function() {
		    addClass(document.documentElement, 'some-class');
		    removeClass(document.documentElement, 'some-class');
		    toggleClass(document.documentElement, 'some-class');
		}*/

		/*document.addEventListener('click', function (event) {
			// Prevent default link behavior
			event.preventDefault();
		}, false);*/

		export function after(el,htmlString){
			el.insertAdjacentHTML('afterend', htmlString);    //similar to  $(el).after(htmlString);
		}

		export function before(el,htmlString){
			el.insertAdjacentHTML('beforebegin', htmlString);  // similar to $(el).before(htmlString);
		}

		export function append(parentEl,el){
			parentEl.appendChild(el);   // similar to  $(parentEl).append(el);
		}

		export function prepend(parentEl,el){
			parentEl.insertBefore(el, parentEl.firstChild);   // similar to $(parentEl).prepend(el);				
		}

		export function removeElement(el){
			el.parentNode.removeChild(el);   // similar to $(el).remove();
		}

		export function fadeIn(el) { /*fadeIn(el);*/
		  el.style.opacity = 0;

		  var last = +new Date();
		  var tick = function() {
		    el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
		    last = +new Date();

		    if (+el.style.opacity < 1) {
		      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
		    }
		  };

		  tick();
		}


		export function parseHTML(htmlString) {   /*parseHTML(htmlString);*/
		  var tmp = document.implementation.createHTMLDocument();
		  tmp.body.innerHTML = htmlString;
		  return tmp.body.children;
		}		

		export function findAncestor (el, cls) {
		    while ((el = el.parentElement) && !el.classList.contains(cls));
		    return el;
		}


		export function isPortrait() {
			return window.innerHeight > window.innerWidth;
		}
		
		export function isLandscape() {
			return window.innerWidth > window.innerHeight;
		}
		
		export function getOrientation() {
			// if window.orientation is available...
			if( window.orientation && typeof window.orientation === 'number' ) {
		
				// ... and if the absolute value of orientation is 90...
				if( Math.abs( window.orientation ) == 90 ) {
					  // ... then it's landscape
					  return 'landscape';
				} else {
					  // ... otherwise it's portrait
					  return 'portrait';
				}
		
			} else {
				return false; // window.orientation not available
			}
		}


		export var isMobile = {
		    Android: function() {
		        return navigator.userAgent.match(/Android/i);
		    },
		    BlackBerry: function() {
		        return navigator.userAgent.match(/BlackBerry/i);
		    },
		    iOS: function() {
		        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		    },
		    Opera: function() {
		        return navigator.userAgent.match(/Opera Mini/i);
		    },
		    Windows: function() {
		        return navigator.userAgent.match(/IEMobile/i);
		    },
		    any: function() {
		        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		    }
		};

		/*if(isMobile.Android()){
			//$("body").addClass("android");
			addClass(document.querySelector('body'), 'android');
		}

		if(isMobile.iOS()){
			//$("body").addClass("ios");
			addClass(document.querySelector('body'), 'ios');
		}*/
		
		/*====================================
			Scroll IT Module
		======================================*/
		export function scrollIt(destination, duration = 200, easing = 'linear', callback) {
		  const easings = {
		    linear(t) {
		      return t;
		    },
		    easeInQuad(t) {
		      return t * t;
		    },
		    easeOutQuad(t) {
		      return t * (2 - t);
		    },
		    easeInOutQuad(t) {
		      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
		    },
		    easeInCubic(t) {
		      return t * t * t;
		    },
		    easeOutCubic(t) {
		      return (--t) * t * t + 1;
		    },
		    easeInOutCubic(t) {
		      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
		    },
		    easeInQuart(t) {
		      return t * t * t * t;
		    },
		    easeOutQuart(t) {
		      return 1 - (--t) * t * t * t;
		    },
		    easeInOutQuart(t) {
		      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
		    },
		    easeInQuint(t) {
		      return t * t * t * t * t;
		    },
		    easeOutQuint(t) {
		      return 1 + (--t) * t * t * t * t;
		    },
		    easeInOutQuint(t) {
		      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
		    }
		  };

		  const start = window.pageYOffset;
		  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

		  const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
		  const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
		  const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
		  const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

		  if ('requestAnimationFrame' in window === false) {
		    window.scroll(0, destinationOffsetToScroll);
		    if (callback) {
		      callback();
		    }
		    return;
		  }

		  function scroll() {
		    const now = 'now' in window.performance ? performance.now() : new Date().getTime();
		    const time = Math.min(1, ((now - startTime) / duration));
		    const timeFunction = easings[easing](time);
		    window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

		    if (window.pageYOffset === destinationOffsetToScroll) {
		      if (callback) {
		        callback();
		      }
		      return;
		    }

		    requestAnimationFrame(scroll);
		  }

		  scroll();

		}//scrollIt ENDS


		/*document.querySelector('.js-btn1').addEventListener('click', () => {
		  scrollIt(
		    document.querySelector('.js-section1'),
		    300,
		    'easeOutQuad',
		    () => console.log(`Just finished scrolling to ${window.pageYOffset}px`)
		  );
		});*/

		/*====================================
			serialize a formdata as JSON
		======================================*/

		export function FormDataToJSONString( form ) {
			var obj = {};
			var elements = form.querySelectorAll( "input, select, textarea" );
			for( var i = 0; i < elements.length; ++i ) {
				var element = elements[i];
				var name = element.name;
				var value = element.value;

				if( name ) {
					obj[ name ] = value;
				}
			}
			return JSON.stringify(obj);
		}

		/*====================================
			serialize a JSONOBJ as Querystring
		======================================*/	
	   export function serializeJsonDataToQS(obj, prefix) {
		  var str = [],
		    p;
		  for (p in obj) {
		    if (obj.hasOwnProperty(p)) {
		      var k = prefix ? prefix + "[" + p + "]" : p,
		        v = obj[p];
		      str.push((v !== null && typeof v === "object") ?
		        serializeJsonDataToQS(v, k) :
		        encodeURIComponent(k) + "=" + encodeURIComponent(v));
		    }
		  }
		  return str.join("&");
		}


		export function isNumber(evt) {
		  evt = (evt) ? evt : window.event;
		  var charCode = (evt.which) ? evt.which : evt.keyCode;
		  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		    alert("Please enter only Numbers.");
		    return false;
		  }

		  return true;
		}




	 
		


	    
	




	
    /*====================================
		Some Workarounds
	======================================*/
	 

//})();