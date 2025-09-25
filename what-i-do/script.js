// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll(".animate-text").forEach((textElement) => {
  textElement.setAttribute("data-text", textElement.textContent.trim());

  ScrollTrigger.create({
    trigger: textElement,
    start: "top 50%",
    end: "bottom 50%",
    scrub: 1,
    onUpdate: (self) => {
      const clipValue = Math.max(0, 100 - self.progress * 100);
      textElement.style.setProperty("--clip-value", `${clipValue}%`);
    },
  });

  ScrollTrigger.create({
    trigger: ".services",
    start: " top bottom",
    end: "top top ",
    scrub: 1,
    onUpdate: (self) => {
      const headers = document.querySelectorAll(".service-header");
      gsap.set(headers[0], { x: `${100 - self.progress * 100}%` });
      gsap.set(headers[1], { x: `${-100 - self.progress * 100}%` });
      gsap.set(headers[2], { x: `${100 - self.progress * 100}%` });
    },
  });
});
