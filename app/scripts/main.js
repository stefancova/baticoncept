'use strict';
$(document).ready(function () {

    //var height = $(window).height();
    //var width  = $(window).width();
    var $logo = $('#logo');
    var $letters = $('.letter');
    var $B = $('#B');
    var $A = $('#A');
    var $T = $('#T');
    var $I = $('#I');
    var $concept = $('#concept');
    var query = document.location.search;

    var initIntro = function () {

        $B.velocity({ translateZ: 0, translateY: '-250%' }, 0);
        $A.velocity({ translateZ: 0, translateX: '400%' }, 0);
        $T.velocity({ translateZ: 0, translateX: '-400%' }, 0);
        $I.velocity({ translateZ: 0, translateY: '250%' }, 0);

        $letters.velocity({ translateZ: 0, translateX: '0', translateY: '0', opacity: '1'}, 'easeInOutQuart', 1500, function() {
            $concept.find('span').velocity('transition.slideLeftIn', {
                stagger: 150,
                drag: false,
                complete: function () {
                    showContact();
                    if(query === '?1'){
                        moveLetters();
                    }
                    if(query === '?2'){
                        moveLetters2();
                    }
                }
            });
        });
    };

    var moveLetters = function(){
        var time = 250;
        var easing = 'easeOutCubic';
        $B.velocity({translateX: '100%' },  easing, time).velocity({translateY: '100%' }, easing,  time).velocity({translateX: '0' }, easing, time).velocity({translateY: '0' }, easing, time);
        $A.velocity({translateY: '100%' },  easing, time).velocity({translateX: '-100%' },easing,  time).velocity({translateY: '0' }, easing, time).velocity({translateX: '0' }, easing, time);
        $I.velocity({translateX: '-100%' }, easing, time).velocity({translateY: '-100%' },easing,  time).velocity({translateX: '0' }, easing, time).velocity({translateY: '0' }, easing, time);
        $T.velocity({translateY: '-100%' }, easing, time).velocity({translateX: '100%' }, easing,  time).velocity({translateY: '0' }, easing, time).velocity({translateX: '0' }, easing, time);
    };


    var moveLetters2 = function(){
        var time = 250;
        var easing = 'easeOutCubic';
        $('#B, #A').velocity({translateX: '100%' }, easing, time);
    };

    var showContact = function () {
        //$('.contact').velocity({ opacity: 1 }, { display: 'block' });
        $('.contact').velocity('slideDown', { delay: 0, duration: 500 }, { display: 'block' });
        if(query === '?3'){
            dotsBackground();
        }
    };


    var dotsBackground = function () {

        /*****************
         Summary
         *****************/

        /* Watch the codecast to learn how this demo was made: https://www.youtube.com/watch?v=MDLiVB6g2NY&hd=1 */

        /* This demo serves two purposes:
         1) Act as Velocity's primary visual test (in addition to the unit and load tests).
         2) Demonstrate all of Velocity's features.
         3) Demonstrate the performance capabilties of the DOM; WebGL and Canvas are not used in this demo.
         */

        /* Intended demo behavior:
         1) A message box fades out.
         2) Dots are randomly assigned coordinates and opacities then translated and increased in opacity. This animation is then reversed.
         3) Meanwhile, the dots' container has its perspective, rotateZ, and opacity animated in a loop with a delay.
         4) Once the dot animation is complete, the message box fades back in.
         */

        /*********************
         Device Detection
         *********************/

        var isWebkit = /Webkit/i.test(navigator.userAgent),
            isChrome = /Chrome/i.test(navigator.userAgent),
            isMobile = !!('ontouchstart' in window),
            isAndroid = /Android/i.test(navigator.userAgent),
            isIE = document.documentMode;

        /******************
         Redirection
         ******************/

        if (isMobile && isAndroid && !isChrome) {
            alert('Although Velocity.js works on all mobile browsers, this 3D demo is for iOS devices or Android devices running Chrome only. Redirecting you to Velocity documentation.');
            window.location = 'index.html';
        }

        /***************
         Helpers
         ***************/

        /* Randomly generate an integer between two numbers. */
        function r(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        /* Override the default easing type with something a bit more jazzy. */
        $.velocity.defaults.easing = 'easeInOutsine';

        /*******************
         Dot Creation
         *******************/

        /* Differentiate dot counts based on roughly-guestimated device and browser capabilities. */
        var dotsCount = isMobile ? (isAndroid ? 40 : 60) : (isChrome ? 175 : 125),
            dotsHtml = '',
            $count = $('#count'),
            $dots;

        for (var i = 0; i < dotsCount; i++) {
            dotsHtml += '<div class="dot"></div>';
        }

        $dots = $(dotsHtml);

        $count.html(dotsCount);

        /*************
         Setup
         *************/

        var $container = $('#container'),
            $browserWidthNotice = $('#browserWidthNotice');

        var screenWidth = window.screen.availWidth,
            screenHeight = window.screen.availHeight,
            chromeHeight = screenHeight - (document.documentElement.clientHeight || screenHeight);

        var translateZMin = -725,
            translateZMax = 600;

        var containerAnimationMap = {
            perspective: [ 215, 50 ],
            opacity: [ 0.90, 0.55 ]
        };

        /* IE10+ produce odd glitching issues when you rotateZ on a parent element subjected to 3D transforms. */
        if (!isIE) {
            containerAnimationMap.rotateZ = [ 5, 0 ];
        }

        /* Ensure the user is full-screened; this demo's translations are relative to screen width, not window width. */
        if ((document.documentElement.clientWidth / screenWidth) < 0.80) {
            $browserWidthNotice.show();
        }

        /*****************
         Animation
         *****************/

        /* Animate the dots' container. */
        $container
            .css('perspective-origin', screenWidth / 2 + 'px ' + ((screenHeight * 0.45) - chromeHeight) + 'px')
            .velocity(containerAnimationMap, { duration: 800, loop: 1, delay: 3250 });

        /* Animate the dots. */
        $dots
            .velocity({
                translateX: [
                    function () {
                        return '+=' + r(-screenWidth / 2.5, screenWidth / 2.5);
                    },
                    function () {
                        return r(0, screenWidth);
                    }
                ],
                translateY: [
                    function () {
                        return '+=' + r(-screenHeight / 2.75, screenHeight / 2.75);
                    },
                    function () {
                        return r(0, screenHeight);
                    }
                ],
                translateZ: [
                    function () {
                        return '+=' + r(translateZMin, translateZMax);
                    },
                    function () {
                        return r(translateZMin, translateZMax);
                    }
                ]/*,
                 opacity: [
                 function () {
                 return Math.random()
                 },
                 function () {
                 return Math.random() + 0.1
                 }
                 ]*/
            }, { duration: 6000 })
            .velocity('reverse', { easing: 'easeOutQuad' })
            .velocity({ opacity: 0 }, { duration: 2000, complete: function () {
                console.log('anim FINISH');
            }
            })
            .appendTo($container);

    };

    // Main init
    initIntro();
});
