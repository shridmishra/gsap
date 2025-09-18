"use client";

import { ReactLenis } from "lenis/react";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./globals.css"; // keep global fonts/colors

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const cards = [
    {
      index: "01",
      title: "Modularity",
      imagePath: "/images/img1.jpg",
      description:
        "Breaking a system into smaller, independent modules makes code easier to maintain, scale, and reuse.",
    },
    {
      index: "02",
      title: "Abstraction",
      imagePath: "/images/img2.jpg",
      description:
        "Abstraction hides unnecessary details and exposes only essential features, simplifying complex systems.",
    },
    {
      index: "03",
      title: "Scalability",
      imagePath: "/images/img3.jpg",
      description:
        "A scalable system can handle increasing workloads without a drop in performance or the need for major redesigns.",
    },
    {
      index: "04",
      title: "Concurrency",
      imagePath: "/images/img4.jpg",
      description:
        "Concurrency allows multiple tasks to run at the same time, improving efficiency and responsiveness.",
    },
  ];

  const container = useRef(null);

  useGSAP(
    () => {
      const stickyCards = gsap.utils.toArray(".sticky-card");

      stickyCards.forEach((card, index) => {
        if (index < stickyCards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            endTrigger: stickyCards[stickyCards.length - 1],
            end: "top top",
            pin: true,
            pinSpacing: false,
          });
        }

        if (index < stickyCards.length - 1) {
          ScrollTrigger.create({
            trigger: stickyCards[index + 1],
            start: "top bottom",
            end: "top top",
            onUpdate: (self) => {
              const progress = self.progress;
              const scale = 1 - progress * 0.25;
              const rotation = (index % 2 === 0 ? 5 : -5) * progress;
              const afterOpacity = progress;

              gsap.set(card, {
                scale,
                rotation,
                "--after-opacity": afterOpacity,
              });
            },
          });
        }
      });
    },
    { scope: container }
  );

  return (
    <>
      <ReactLenis root />
      <section className="intro">
        <h1>The Foundation</h1>
      </section>

      <div className="sticky-cards" ref={container}>
        {cards.map((card) => (
          <div className="sticky-card" key={card.index}>
            <div className="sticky-card-index">
              <h1>{card.index}</h1>
            </div>
            <div className="sticky-card-content">
              <div className="sticky-card-content-wrapper">
                <h1 className="sticky-card-header">{card.title}</h1>
                <div className="sticky-card-img">
                  <img src={card.imagePath} alt={card.title} />
                </div>
                <div className="sticky-card-copy">
                  <div className="sticky-card-copy-title">
                    <p>(About the concept)</p>
                  </div>
                  <div className="sticky-card-copy-description">
                    <p>{card.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="outro">
        <h1>End in Form</h1>
      </section>
    </>
  );
}
