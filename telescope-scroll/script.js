const config = {
  gap: 0.08,
  speed: 0.3,
  arcRadius: 500,
};

const spotlightItems = [
  { name: "Silent Arc", img: "/assets/img1.jpeg" },
  { name: "Bloom", img: "/assets/img2.jpeg" },
  { name: "Dark Sky", img: "/assets/img3.jpeg" },
  { name: "Moon Glow", img: "/assets/img4.jpeg" },
  { name: "Star Dust", img: "/assets/img5.jpeg" },
  { name: "Night Wave", img: "/assets/img6.jpeg" },
  { name: "Frost", img: "/assets/img7.jpeg" },
  { name: "Dawn Light", img: "/assets/img8.jpeg" },
  { name: "Mist", img: "/assets/img9.jpeg" },
  { name: "Sun Spark", img: "/assets/img10.jpeg" },
];

const titlesContainer = document.querySelector(".spotlight-titles");
const imagesContainer = document.querySelector(".spotlight-images");
const spotlightHeader = document.querySelector(".spotlight-header");
const titlesContainerElements = document.querySelector(
  ".spotlight-titles-container"
);
const introTextElements = document.querySelectorAll(".spotlight-intro-text");
const imageElements = [];

spotlightItems.forEach((item, index) => {
  const titleElement = document.createElement("h1");
  titleElement.textContent = item.name;
  if (index === 0) {
    titleElement.style.opacity = "1";
  }
  titlesContainer.appendChild(titleElement);

  const imgWrapper = document.createElement("div");
  imgWrapper.className = "spotlight-img";

  const imgElement = document.createElement("img");
  imgElement.src = item.img;
  imgElement.alt = "img";

  imgWrapper.appendChild(imgElement);
  imagesContainer.appendChild(imgWrapper);
  imageElements.push(imgWrapper);
});

const titlesElements = titlesContainer.querySelectorAll("h1");
let currentActiveIndex = 0;

const containerWidth = window.innerWidth * 0.3;
const containerHeight = window.innerHeight;
const arcStartX = containerWidth - 200;
const arcStartY = -200;
const arcEndX = containerWidth + 200;
const arcEndY = containerHeight + 200;
const arcControlPointX = arcStartX + config.arcRadius;
const arcControlPointY = containerHeight / 2;

function getBezierPosition(t) {
  const x =
    (1 - t) * (1 - t) * arcStartX +
    2 * (1 - t) * t * arcControlPointX +
    t * t * arcEndX;

  const y =
    (1 - t) * (1 - t) * arcStartY +
    2 * (1 - t) * t * arcControlPointY +
    t * t * arcEndY;

  return {
    x,
    y,
  };
}

function getImgProgressState(index, overallProgress) {
  const startTime = index * config.gap;
  const endTime = startTime + config.speed;

  if (overallProgress < startTime) {
    return -1;
  }
  if (overallProgress > endTime) {
    return 2;
  }

  return (overallProgress - startTime) / config.speed;
}

imageElements.forEach((img) => gsap.set(img, { opacity: 0 }));

ScrollTrigger.create({
  trigger: ".spotlight",
  start: "top top ",
  end: `+=${window.innerHeight * 10}px`,
  pin: true,
  pinSpacing: true,
  scrub: 1,
  onUpdate: (self) => {
    const progress = self.progress;

    if (progress <= 0.2) {
      const animationProgress = progress / 0.2;
      const moveDistance = window.innerWidth * 0.6;

      gsap.set(introTextElements[0], {
        x: -animationProgress * moveDistance,
        opacity: 1 - animationProgress,
      });

      gsap.set(introTextElements[1], {
        x: animationProgress * moveDistance,
        opacity: 1 - animationProgress,
      });

      gsap.set(".spotlight-bg-image", {
        transform: `scale(${animationProgress})`,
      });

      gsap.set(".spotlight-bg-image img", {
        transform: `scale(${1.5 - animationProgress * 0.5})`,
      });

      imageElements.forEach((img) => gsap.set(img, { opacity: 0 }));
      spotlightHeader.style.opacity = "0";
      gsap.set(titlesContainerElements, {
        "--before-opacity": "0",
        "--after-opacity": "0",
      });
    } else if (progress > 0 && progress <= 0.25) {
      gsap.set(".spotlight-bg-image", { transform: "scale(1)" });
      gsap.set(".spotlight-bg-img img", { transform: "scale(1)" });

      gsap.set(introTextElements[0], { opacity: 0 });
      gsap.set(introTextElements[1], { opacity: 0 });

      imageElements.forEach((img) => gsap.set(img, { opacity: 0 }));

      spotlightHeader.style.opacity = "1";
      gsap.set(titlesContainerElements, {
        "--before-opacity": "1",
        "--after-opacity": "1",
      });
    } else if (progress > 0.25 && progress <= 0.95) {
      gsap.set(".spotlight-bg-image", { transform: "scale(1) " });
      gsap.set(".spotlight-bg-img img", { transform: "scale(1) " });

      gsap.set(introTextElements[0], { opacity: 0 });
      gsap.set(introTextElements[1], { opacity: 0 });

      spotlightHeader.style.opacity = "1";
      gsap.set(titlesContainerElements, {
        "--before-opacity": "1",
        "--after-opacity": "1",
      });

      const switchProgress = (progress - 0.25) / 0.7;
      const viewportHeight = window.innerHeight;
      const titlesContainerHeight = titlesContainer.scrollHeight;
      const startPosition = viewportHeight;
      const targetPosition = -titlesContainerHeight;
      const totalDistance = startPosition - targetPosition;
      const currentY = startPosition - switchProgress * totalDistance;

      gsap.set(".spotlight-titles", {
        transform: `translate(${currentY}px)`,
      });

      imageElements.forEach((img, index) => {
        const imageProgress = getImgProgressState(index, switchProgress);

        if (imageProgress < 0 || imageProgress > 1) {
          gsap.set(img, { opacity: 0 });
        } else {
          gsap.set(img, { x: pos.x - 100, y: pos.y - 75, opacity: 1 });
        }

        const viewportMiddle = viewportHeight / 2;
        let closestIndex = 0;
        let closestDistance = Infinity;

        titleElements.forEach((title, index) => {
          const titleRect = title.getBoundingClientRect();
          const titleCenter = titleRect.top + titleRect.height / 2;
          const distanceFromCenter = Math.abs(titleCenter - viewportMiddle);

          if (distanceFromCenter < closestDistance) {
            closestDistance = distanceFromCenter;
            closestIndex = index;
          }
        });

        if (closestIndex !== currentActiveIndex) {
          if (titlesElements[currentActiveIndex]) {
            titlesElements.style.opacity = "0.25";
          }
          titlesElements.style.opacity = "1";

          document.querySelector(".spotlight-bg-image img").src = 
          spotlightItems[closestIndex].img
          currentActiveIndex = closestIndex;
        }
      });
    }
    else if (progress > 0.95){
      spotlightHeader.style.opacity = "0";
      gsap.set(titlesContainerElements,{
        "--before-opacity": "0",
        "--after-opacity" : "0"
      })

    }
  },
});
