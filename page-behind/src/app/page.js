import { ReactLenis } from "lenis/react";
import StickyCard from "@/components/StickyCard";

export default function Home() {
  return (
    <>
      <ReactLenis root />
      <section className="intro">
        <h1>The Foundation</h1>
      </section>
      <StickyCard />
      <section className="outro">
        <h1>End in Form</h1>
      </section>
    </>
  );
}
