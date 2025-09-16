"use client";

import "./StickyCard.css";
import React from "react";

const StickyCard = () => {
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

  return (
    <div className="sticky-cards">
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
                  <p>(About the state)</p>
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
  );
};

export default StickyCard;
