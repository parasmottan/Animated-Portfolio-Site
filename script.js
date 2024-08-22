var timeout;

const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function firstPageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingelem", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 2,
      delay: -1,
      stagger: 0.2,
    })
    .from("#footerof1st", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    });
}

function circleChaptaKaro() {
  // define default scale value
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    circleMouseFollower(xscale, yscale);

    timeout = setTimeout(function () {
      document.querySelector(
        "#small-circle"
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
    }, 100);
  });
}

function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      "#small-circle"
    ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
  });
}

circleChaptaKaro();
circleMouseFollower();
firstPageAnim()


document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function () {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3.easeOut,
      duration: 0.5,
    });
  });

  elem.addEventListener("mousemove", function (dets) {
    var rect = elem.getBoundingClientRect();
    var diffY = dets.clientY - rect.top;
    var diffX = dets.clientX - rect.left;

    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;

    var img = elem.querySelector("img");
    var imgWidth = img.offsetWidth;
    var imgHeight = img.offsetHeight;

    gsap.to(img, {
      opacity: 1,
      ease: Power3.easeOut,
      top: diffY - imgHeight / 2,
      left: diffX - imgWidth / 2,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  });
});
