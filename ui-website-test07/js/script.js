window.addEventListener("load", function () {
  gsap.registerPlugin(ScrollTrigger);
  const container = document.querySelector("[data-scroll-container]");

  // Locomotive
  const scroller = new LocomotiveScroll({
    el: container,
    smooth: true,
    getDirection: true
  });
  scroller.on("scroll", (t) =>
    document.documentElement.setAttribute("data-direction", t.direction)
  );
  scroller.on("scroll", ScrollTrigger.update);

  // ScrollTrigger + Locomotive
  ScrollTrigger.scrollerProxy(container, {
    scrollTop(value) {
      return arguments.length
        ? scroller.scrollTo(value, 0, 0)
        : scroller.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        left: 0,
        top: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
    },
    pinType: container.style.transform ? "transform" : "fixed"
  });

  /* ------------------------ */

  const horizontal = document.querySelector("[data-horizontal]");
  const pinWrap = document.querySelector("[data-horizontal-pin]");
  const pinWrapWidth = pinWrap.offsetWidth;
  const pinScrollWidth = pinWrapWidth - window.innerWidth;

  // Horizontal scroll
  const horizontalScroll = gsap.to(pinWrap, {
    scrollTrigger: {
      scroller: container,
      scrub: true,
      pin: true,
      trigger: horizontal,
      start: "top top",
      end: () => `+=${pinWrapWidth}`,
      invalidateOnRefresh: true
      // onEnter: () => console.log('a'),
      // onLeave: () => console.log('b')
    },
    x: -pinScrollWidth,
    ease: "none"
  });

  // Horizontal section animation
  const project2 = document.querySelector('[data-project="2"]');
  const project2Title = project2.querySelector("h2");
  gsap.to(project2Title, {
    rotate: "360deg",
    scrollTrigger: {
      trigger: project2,
      containerAnimation: horizontalScroll,
      start: "left right",
      end: "right left",
      scrub: true
    }
  });

  // Breads
  const breads = document.querySelector("[data-breads]");
  const breadsScroll = gsap.to(breads, {
    scrollTrigger: {
      scroller: container,
      scrub: true,
      //pin: true,
      trigger: horizontal,
      start: "top top",
      end: () => `+=${pinWrapWidth}`,
      invalidateOnRefresh: true
      // onEnter: () => console.log('a'),
      // onLeave: () => console.log('b')
    },
    x: -pinScrollWidth,
    ease: "none"
  });

  // Arrow
  const arrow = document.querySelector("[data-arrow]");
  const screens = document.querySelectorAll("[data-screen]");
  let next;
  let arrowEvent = () => scroller.scrollTo(next);
  arrow.addEventListener("click", () => arrowEvent());

  screens.forEach((screen, i) => {
    gsap.to(screen, {
      scrollTrigger: {
        scroller: container,
        trigger: screen,
        start: "top center",
        end: "bottom top",
        onEnter: () => {
          console.log(screen.id);
          // if (screen.dataset.next) {
          //   arrow.style.display = 'block';
          //   next = document.querySelector(screen.dataset.next);
          // } else {
          //   arrow.style.display = 'none';
          // }
        }
        // onLeaveBack: () => {
        //   next = (i === 0) ? null : document.querySelector(screens[i - 1].dataset.next);
        // }
      }
    });
  });

  const hScreens = document.querySelectorAll("[data-h-screen]");
  let hNext;
  const hArrowEvent = () => {
    gsap.to(window, {
      scrollTo: 1000,
      duration: 0.5
    });
  };
  hScreens.forEach((hScreen) => {
    gsap.to(hScreen, {
      scrollTrigger: {
        scroller: container,
        containerAnimation: horizontalScroll,
        trigger: hScreen,
        start: "top center",
        end: "bottom top",
        onEnter: () => {
          console.log(hScreen.id);
          arrowEvent = hArrowEvent;
          // arrow.removeEventListened('click', arrowEvent);
          // arrow.addEventListener('click', hArrowEvent);
        }
      }
    });
  });

  ScrollTrigger.addEventListener("refresh", () => scroller.update());
  ScrollTrigger.refresh();
});