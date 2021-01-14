var gwd=gwd||{};gwd.actions=gwd.actions||{};gwd.actions.events=gwd.actions.events||{};gwd.actions.events.getElementById=function(id){var gwdId=new gwd.GwdId(id);var retElement;var target=gwd.actions.events.currentTarget;if(!gwdId.getLeadingId()&&target){retElement=gwdId.getElementInInstance(document,gwd.actions.events.currentTarget)}else{retElement=gwdId.getElement(document)}if(!retElement){switch(id){case"document.body":retElement=document.body;break;case"document":retElement=document;break;case"window":retElement=window;break}}return retElement};gwd.actions.events.addHandler=function(eventTarget,eventName,eventHandler,useCapture){var gwdId=new gwd.GwdId(eventTarget);var groupName=gwdId.getGroupName();if(groupName!==""){var instances=document.querySelectorAll("["+gwd.GwdId.GROUP_REFERENCE_ATTR+" = "+groupName+"]");Array.prototype.forEach.call(instances,function(instance){var target=gwdId.getElementInInstance(document,instance);if(target){var actualHandlerProp=gwd.actions.events.actualHandlerProp;if(!eventHandler[actualHandlerProp]){eventHandler[actualHandlerProp]=gwd.actions.events.wrapHandler_.bind(null,eventHandler)}target.addEventListener(eventName,eventHandler[actualHandlerProp],useCapture)}})}else{var targetElement=gwd.actions.events.getElementById(eventTarget);if(targetElement){targetElement.addEventListener(eventName,eventHandler,useCapture)}}};gwd.actions.events.removeHandler=function(eventTarget,eventName,eventHandler,useCapture){var gwdId=new gwd.GwdId(eventTarget);var groupName=gwdId.getGroupName();if(groupName!==""){var instances=document.querySelectorAll("["+gwd.GwdId.GROUP_REFERENCE_ATTR+" = "+groupName+"]");Array.prototype.forEach.call(instances,function(instance){var target=gwdId.getElementInInstance(document,instance);if(target){var actualHandlerProp=gwd.actions.events.actualHandlerProp;if(eventHandler[actualHandlerProp]){target.removeEventListener(eventName,eventHandler[actualHandlerProp],useCapture)}}})}else{var targetElement=gwd.actions.events.getElementById(eventTarget);if(targetElement&&eventTarget[0]!=" "){targetElement.removeEventListener(eventName,eventHandler,useCapture)}}};gwd.actions.events.setInlineStyle=function(id,styles){var element=gwd.actions.events.getElementById(id);if(!element||!styles){return}var transitionProperty=element.style.transition!==undefined?"transition":"-webkit-transition";var prevTransition=element.style[transitionProperty];var splitStyles=styles.split(/\s*;\s*/);var nameValue;splitStyles.forEach(function(splitStyle){if(splitStyle){var regex=new RegExp("[:](?![/]{2})");nameValue=splitStyle.split(regex);nameValue[1]=nameValue[1]?nameValue[1].trim():null;if(!(nameValue[0]&&nameValue[1])){return}element.style.setProperty(nameValue[0],nameValue[1])}});function restoreTransition(event){var el=event.target;el.style.transition=prevTransition;el.removeEventListener(event.type,restoreTransition,false)}element.addEventListener("transitionend",restoreTransition,false);element.addEventListener("webkitTransitionEnd",restoreTransition,false)};gwd.actions.events.currentTarget=null;gwd.actions.events.actualHandlerProp="gwd_actualHandler";gwd.actions.events.wrapHandler_=function(handler,event){gwd.actions.events.currentTarget=event.target;handler.call(null,event)};gwd.actions.timeline=gwd.actions.timeline||{};gwd.actions.timeline.dispatchTimedEvent=function(event){var customEventTarget=event.target;if(customEventTarget){var customEventName=customEventTarget.getAttribute("data-event-name");if(customEventName){event.stopPropagation();var event=document.createEvent("CustomEvent");event.initCustomEvent(customEventName,true,true,null);customEventTarget.dispatchEvent(event)}}};gwd.actions.timeline.captureAnimationEnd=function(element){if(!element){return}var animationEndEvents=["animationend","webkitAnimationEnd"];for(var i=0;i<animationEndEvents.length;i++){element.addEventListener(animationEndEvents[i],gwd.actions.timeline.dispatchTimedEvent,true)}};gwd.actions.timeline.releaseAnimationEnd=function(element){if(!element){return}var animationEndEvents=["animationend","webkitAnimationEnd"];for(var i=0;i<animationEndEvents.length;i++){element.removeEventListener(animationEndEvents[i],gwd.actions.timeline.dispatchTimedEvent,true)}};gwd.actions.timeline.pauseAnimationClassName="gwd-pause-animation";gwd.actions.timeline.CURRENT_LABEL_ANIMATION="data-gwd-current-label";gwd.actions.timeline.reflow=function(el){el.offsetWidth=el.offsetWidth};gwd.actions.timeline.pause=function(id){var el=gwd.actions.events.getElementById(id);el&&el.classList&&el.classList.add(gwd.actions.timeline.pauseAnimationClassName)};gwd.actions.timeline.play=function(id){var el=gwd.actions.events.getElementById(id);el&&el.classList&&el.classList.remove(gwd.actions.timeline.pauseAnimationClassName)};gwd.actions.timeline.togglePlay=function(id){var el=gwd.actions.events.getElementById(id);el&&el.classList&&el.classList.toggle(gwd.actions.timeline.pauseAnimationClassName)};gwd.actions.timeline.gotoAndPlay=function(id,animClass){var el=gwd.actions.events.getElementById(id);if(!(el&&el.classList&&id&&animClass)){return false}var currentLabelAnimClass=el.getAttribute(gwd.actions.timeline.CURRENT_LABEL_ANIMATION);if(currentLabelAnimClass){el.classList.remove(currentLabelAnimClass);el.removeAttribute(gwd.actions.timeline.CURRENT_LABEL_ANIMATION)}gwd.actions.timeline.play(id);if(currentLabelAnimClass==animClass){gwd.actions.timeline.reflow(el)}el.classList.add(animClass);el.setAttribute(gwd.actions.timeline.CURRENT_LABEL_ANIMATION,animClass);return true};gwd.actions.timeline.gotoAndPause=function(id,animClass){var el=gwd.actions.events.getElementById(id);if(!(el&&el.classList)){return false}if(gwd.actions.timeline.gotoAndPlay(id,animClass)){var timeoutId=window.setTimeout(function(){el.classList.add(gwd.actions.timeline.pauseAnimationClassName)},40)}return!!timeoutId};gwd.actions.timeline.gotoAndPlayNTimes=function(id,animClass,count,eventName){var el=gwd.actions.events.getElementById(id);el.gwdGotoCounters=el.gwdGotoCounters||{};var counters=el.gwdGotoCounters;var counterName=eventName+"_"+animClass+"_counter";if(typeof counters[counterName]=="undefined"){counters[counterName]=0}if(counters[counterName]<count){gwd.actions.timeline.gotoAndPlay(id,animClass)}counters[counterName]++};gwd.actions.deviceShake=gwd.actions.deviceShake||{};gwd.actions.deviceShake.SHAKE_EVENT_="shake";gwd.actions.deviceShake.SHAKE_THRESHOLD_=18;gwd.actions.deviceShake.SHAKE_UPDATE_INTERVAL_=200;gwd.actions.deviceShake.SHAKE_SLEEP_INTERVAL_=1e3;gwd.actions.deviceShake.shakeHandler_=null;gwd.actions.deviceShake.initialize=function(){if(!gwd.actions.deviceShake.shakeHandler_){gwd.actions.deviceShake.shakeHandler_=new gwd.actions.deviceShake.ShakeHandler;gwd.actions.deviceShake.shakeHandler_.initListener()}};gwd.actions.deviceShake.dispose=function(){if(gwd.actions.deviceShake.shakeHandler_){gwd.actions.deviceShake.shakeHandler_.dispose();gwd.actions.deviceShake.shakeHandler_=null}};gwd.actions.deviceShake.ShakeHandler=function(){this.ax0_=NaN;this.ay0_=NaN;this.az0_=NaN;this.ax1_=NaN;this.ay1_=NaN;this.az1_=NaN;this.inMotion_=false;this.eventHandler_=this.handleDeviceMotion_.bind(this)};gwd.actions.deviceShake.ShakeHandler.prototype.dispose=function(){window.removeEventListener("devicemotion",this.eventHandler_,false)};gwd.actions.deviceShake.ShakeHandler.prototype.initListener=function(){window.addEventListener("devicemotion",this.eventHandler_,false)};gwd.actions.deviceShake.ShakeHandler.prototype.handleDeviceMotion_=function(event){var a=event.accelerationIncludingGravity;this.ax1_=a.x;this.ay1_=a.y;this.az1_=a.z;this.requestUpdate_()};gwd.actions.deviceShake.ShakeHandler.prototype.requestUpdate_=function(){if(!this.inMotion_){window.setTimeout(this.updateAcceleration_.bind(this),gwd.actions.deviceShake.SHAKE_UPDATE_INTERVAL_)}this.inMotion_=true};gwd.actions.deviceShake.ShakeHandler.prototype.updateAcceleration_=function(){var dax=Math.abs(this.ax1_-this.ax0_);var day=Math.abs(this.ay1_-this.ay0_);var daz=Math.abs(this.az1_-this.az0_);this.ax0_=this.ax1_;this.ay0_=this.ay1_;this.az0_=this.az1_;if(dax+day+daz>gwd.actions.deviceShake.SHAKE_THRESHOLD_){this.handleShake_();return}this.inMotion_=false};gwd.actions.deviceShake.ShakeHandler.prototype.handleShake_=function(){var event=document.createEvent("CustomEvent");event.initCustomEvent(gwd.actions.deviceShake.SHAKE_EVENT_,true,true,null);document.body.dispatchEvent(event);this.reset_();window.setTimeout(function(){this.inMotion_=false}.bind(this),gwd.actions.deviceShake.SHAKE_SLEEP_INTERVAL_)};gwd.actions.deviceShake.ShakeHandler.prototype.reset_=function(){this.ax0_=NaN;this.ay0_=NaN;this.az0_=NaN};gwd.actions.gwdGoogleAd=gwd.actions.gwdGoogleAd||{};gwd.actions.gwdGoogleAd.goToPage=function(receiver,opt_pageId,opt_transition,opt_duration,opt_easing,opt_direction){gwd.actions.events.getElementById(receiver).goToPage(opt_pageId,opt_transition,opt_duration,opt_easing,opt_direction)};gwd.actions.gwdGoogleAd.exit=function(receiver,exitId,url,opt_collapseOnExit,opt_pauseMedia,opt_pageId){gwd.actions.events.getElementById(receiver).exit(exitId,url,opt_collapseOnExit,opt_pauseMedia,opt_pageId)}