import { DemoCta, PageHero, SectionHeading } from "../../components/restaurant/PageBits";
import { Reveal } from "../../components/restaurant/Reveal";

export const AboutPage = () => (
  <>
    <PageHero
      eyebrow="About The Concept"
      title="An elegant restaurant identity imagined to feel premium, warm, and fully launchable."
      text="This page shows restaurant owners how their story, philosophy, team, and atmosphere can be elevated online through editorial design and hospitality-focused structure."
      image="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1800&q=80"
      actions={[{ to: "/gallery", label: "View Gallery", variant: "button-primary" }]}
    />

    <section className="section about-layout-page">
      <Reveal className="story-card">
        <SectionHeading
          eyebrow="Our Story"
          title="From fire-led cooking to intimate service, every detail is designed to feel deliberate."
          text="DIGITQUO DEMO imagines a flagship dining room where seasonal produce, elevated plating, and warm service are supported by a website that converts curiosity into bookings."
        />
        <p className="hero-copy">
          The design direction pairs dark luxury tones, gold highlights, and refined typography with real conversion elements. The result is less like a generic template and more like a premium hospitality brand presentation.
        </p>
      </Reveal>
      <Reveal className="feature-grid-card">
        <div className="feature-list-item">
          <strong>Chef Elena Moretti</strong>
          <p>Michelin-trained, ingredient-led, and known for balancing technical precision with warm hospitality.</p>
        </div>
        <div className="feature-list-item">
          <strong>Restaurant Philosophy</strong>
          <p>Seasonal sourcing, tableside storytelling, and a dining room built for both everyday indulgence and occasion-led bookings.</p>
        </div>
        <div className="feature-list-item">
          <strong>Interior Direction</strong>
          <p>Textured surfaces, candlelit depth, brass accents, and a layout built for memorable guest experiences and social sharing.</p>
        </div>
      </Reveal>
    </section>

    <section className="section">
      <div className="gallery-grid">
        {[
          "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1200&q=80",
        ].map((image, index) => (
          <Reveal className="gallery-item static-card" key={image}>
            <img src={image} alt={`Restaurant detail ${index + 1}`} />
          </Reveal>
        ))}
      </div>
    </section>

    <DemoCta />
  </>
);
