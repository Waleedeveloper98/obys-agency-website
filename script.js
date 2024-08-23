function locomotive() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}

function loadingAnimation() {


    var tl = gsap.timeline()
    tl.from(".line h1", {
        y: 150,
        stagger: .2,
        duration: .6,
        delay: .5
    })
    tl.from("#line1-part1 , .line h2", {
        opacity: 0,
        onStart: function () {
            var h5timer = document.querySelector("#line1-part1 h5")
            var grow = 0;
            setInterval(function () {
                if (grow < 100) {
                    h5timer.textContent = grow++
                } else {
                    h5timer.innerHTML = grow
                }
            }, 30)
        }
    })
    tl.to(".line h2", {
        animationName: "anime",
        opacity: 1
    })
    tl.to("#loader ", {
        opacity: 0,
        delay: 3.2,
        duration: .3
    })
    tl.from("#page1", {
        // delay:.2,
        y: -100,
        duration: .5,
        opacity: 0,
        ease: Power4
    })
    tl.to("#loader", {
        display: "none"
    })
    tl.from("#nav", {
        opacity: 0
    })
    tl.from("#hero1 h1, #hero2 h1, #hero3 h2, #hero4 h1", {
        y: 120,
        stagger: .2
    })
    tl.from("#hero1 #page2", {
        opacity: 0
    }, "-=1.2")
}

function cursorAnimation() {
    Shery.mouseFollower({
        skew: true,
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 1,
    });
    Shery.makeMagnet("#nav-part2 h4");

    var videoContainer = document.querySelector("#video-container")
    var video = document.querySelector("#video-container video")
    var videoCover = document.querySelector("#video-container img")
    videoContainer.addEventListener("mouseenter", function () {
        videoContainer.addEventListener("mousemove", function (dets) {
            gsap.to(".mousefollower", {
                opacity: 0
            })
            gsap.to("#video-cursor", {
                left: dets.x - 470,
                y: dets.y - 400
            })
        })
    })
    videoContainer.addEventListener("mouseleave", function () {
        gsap.to(".mousefollower", {
            opacity: 1
        })
        gsap.to("#video-cursor", {
            top: "0%",
            left: "75%"
        })
    })
    var flag = 0;
    videoContainer.addEventListener("click", function () {
        if (flag === 0) {
            videoCover.style.opacity = 0;
            video.play(); // Make sure video is defined and points to the video element
            video.style.opacity = 1;
            document.querySelector("#video-cursor").innerHTML = `<i class="ri-pause-fill"></i>`;
            gsap.to("#video-cursor", {
                scale: 0.5,
            });
            flag = 1;
        } else {
            videoCover.style.opacity = 1;
            video.pause(); // Ensure video is correctly defined
            video.style.opacity = 0;
            document.querySelector("#video-cursor").innerHTML = `<i class="ri-play-large-fill"></i>`;
            gsap.to("#video-cursor", {
                scale: 1,
            });
            flag = 0;
        }
    });
    
}

locomotive()
loadingAnimation();
cursorAnimation()

function sheryAnimation() {
    Shery.imageEffect(".image-div", {
        style: 5,
        config: { "a": { "value": 2, "range": [0, 30] }, "b": { "value": -0.97, "range": [-1, 1] }, "zindex": { "value": -9996999, "range": [-9999999, 9999999] }, "aspect": { "value": 0.7333170572916666 }, "ignoreShapeAspect": { "value": true }, "shapePosition": { "value": { "x": 0, "y": 0 } }, "shapeScale": { "value": { "x": 0.5, "y": 0.5 } }, "shapeEdgeSoftness": { "value": 0, "range": [0, 0.5] }, "shapeRadius": { "value": 0, "range": [0, 2] }, "currentScroll": { "value": 0 }, "scrollLerp": { "value": 0.07 }, "gooey": { "value": true }, "infiniteGooey": { "value": false }, "growSize": { "value": 4, "range": [1, 15] }, "durationOut": { "value": 1, "range": [0.1, 5] }, "durationIn": { "value": 1.5, "range": [0.1, 5] }, "displaceAmount": { "value": 0.5 }, "masker": { "value": true }, "maskVal": { "value": 1.25, "range": [1, 5] }, "scrollType": { "value": 0 }, "geoVertex": { "range": [1, 64], "value": 1 }, "noEffectGooey": { "value": true }, "onMouse": { "value": 0 }, "noise_speed": { "value": 0.2, "range": [0, 10] }, "metaball": { "value": 0.43, "range": [0, 2] }, "discard_threshold": { "value": 0.5, "range": [0, 1] }, "antialias_threshold": { "value": 0, "range": [0, 0.1] }, "noise_height": { "value": 0.5, "range": [0, 2] }, "noise_scale": { "value": 10, "range": [0, 100] } },
        gooey: true
    })
}
sheryAnimation()

document.addEventListener("mousemove",function(dets){
    gsap.to("#flag",{
        x:dets.x,
        y:dets.y
    })
})
document.querySelector("#hero3").addEventListener("mouseenter",function(){
    gsap.to("#flag",{
        opacity:1
    })
})
document.querySelector("#hero3").addEventListener("mouseleave",function(){
    gsap.to("#flag",{
        opacity:0
    })
})