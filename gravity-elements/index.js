import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lenis } from "lenis/react";

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  const animateScroll = true;

  const config = {
    gravity: { x: 0, y: 1 },
    restitution: 0.5,
    friction: 0.15,
    frictionAir: 0.02,
    density: 0.002,
    wallThickness: 200,
    mouseStiffness: 0.6,
  };

  let engine,
    runner,
    mouseConstraint,
    bodies = [],
    topWall = null;

  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  function initPhysics(container) {
    engine = Matter.engine.create();
    engine.gravity = config.gravity;
    engine.constraintIterations = 10;
    engine.positionIteration = 20;
    engine.velocityIteration = 16;
    engine.timing.timeScale = 1;

    const containerRect = container.getBoundingClientRect();
    const wallThickness = config.wallThickness;

    const walls = [
      Matter.Bodies.rectangle(
        containerRect.width / 2,
        containerRect.height + wallThickness / 2,
        containerRect.width + wallThickness * 2,
        wallThickness,
        { isStatic: true }
      ),

      Matter.Bodies.rectangle(
        -wallThickness / 2,
        container.height / 2,
        wallThickness,
        containerRect.height + wallThickness * 2,
        { isStatic: true }
      ),

      Matter.Bodies.rectangle(
        containerRect.width + wallThickness / 2,
        container.height / 2,
        wallThickness,
        container.height + wallThickness * 2,
        { isStatic: true }
      ),
    ];

    Matter.World.add(engine.world, walls);
  }
});
