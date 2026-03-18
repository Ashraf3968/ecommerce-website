import { Link } from "react-router-dom";
import { DemoCta, PageHero, SectionHeading } from "../../components/restaurant/PageBits";
import { Reveal } from "../../components/restaurant/Reveal";
import {
  eventHighlights,
  experiences,
  faqItems,
  featuredDishes,
  highlights,
  offers,
  stats,
  testimonials,
  videoShowcase,
} from "../../data/restaurantData";

const CounterCard = ({ stat }) => (
  <Reveal className="stat-card">
    <strong>{stat.value.toLocaleString()}+</strong>
    <span>{stat.label}</span>
  </Reveal>
);

export const HomePage = () => {
  return (
    <>
      <PageHero
        eyebrow="DIGITQUO DEMO | Premium Restaurant Website"
        title="A restaurant homepage that feels like an invitation, not a brochure."
        text="Built as a polished agency demo with separate pages, elegant storytelling, live ordering, and a realistic booking journey for premium hospitality brands."
        image="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=80"
        actions={[
          { to: "/reservations", label: "Book a Table", variant: "button-primary" },
          { to: "/menu", label: "View Menu", variant: "button-secondary" },
        ]}
      />

      <section className="section">
        <SectionHeading
          eyebrow="Signature Dishes"
          title="Hero dishes that make the restaurant feel real from the first scroll."
          text="Every section is designed to look client-ready, with premium imagery, editorial typography, and strong conversion points."
        />
        <div className="featured-grid">
          {featuredDishes.map((dish) => (
            <Reveal className="dish-card" key={dish.id}>
              <img src={dish.image} alt={dish.name} />
              <div className="dish-content">
                <div className="dish-header">
                  <h3>{dish.name}</h3>
                  <span>${dish.price}</span>
                </div>
                <p>{dish.description}</p>
                <Link className="button button-primary" to="/menu">
                  Explore Menu
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Premium hospitality touches that help diners trust and book faster."
          text="These highlights are structured to build confidence and move visitors toward reservations."
        />
        <div className="highlight-grid">
          {highlights.map((item) => (
            <Reveal className="feature-grid-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section split-highlight">
        <Reveal className="story-card">
          <p className="eyebrow">Experience</p>
          <h2>Designed around atmosphere, storytelling, and premium service touchpoints.</h2>
          <p className="hero-copy">
            The layout mirrors what restaurant owners expect from a real launch-ready website: booking flow, menu browsing, social proof, and cinematic brand moments.
          </p>
          <div className="feature-list">
            {experiences.map((item) => (
              <div key={item.title} className="feature-list-item">
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal className="visual-stack">
          <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80" alt="Restaurant interior" />
          <img src="https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1200&q=80" alt="Chef plating food" />
        </Reveal>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Chef Recommendations"
          title="Limited-seat experiences curated for higher-ticket reservations."
          text="Promotional offers are displayed with premium cards to highlight exclusivity and urgency."
        />
        <div className="offer-grid">
          {offers.map((offer) => (
            <Reveal className="offer-card" key={offer.title}>
              <span className="pill-label">{offer.tag}</span>
              <h3>{offer.title}</h3>
              <p>{offer.text}</p>
              <strong>{offer.price}</strong>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Video Preview"
          title="Cinematic video moments that sell the dining experience."
          text="Add reels, short films, or dining atmosphere clips to make the demo feel fully real."
        />
        <div className="video-grid">
          {videoShowcase.map((video) => (
            <Reveal className="video-card" key={video.title}>
              <img src={video.image} alt={video.title} />
              <div className="video-overlay">
                <span className="pill-label">{video.tag}</span>
                <h3>{video.title}</h3>
                <button className="play-button" type="button" aria-label="Play video">
                  Play
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Private Dining"
          title="Events and celebrations deserve a dedicated experience."
          text="Showcase private dining to encourage high-value bookings and group inquiries."
        />
        <div className="event-grid">
          {eventHighlights.map((event) => (
            <Reveal className="event-card" key={event.title}>
              <h3>{event.title}</h3>
              <p>{event.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="stats-grid">
          {stats.map((stat) => (
            <CounterCard key={stat.label} stat={stat} />
          ))}
        </div>
      </section>

      <section className="section preview-strip">
        <Reveal className="testimonial-spotlight">
          <p className="eyebrow">What Clients See</p>
          <h2>"The booking flow is especially convincing."</h2>
          <p className="hero-copy">{testimonials[3].review}</p>
          <strong>{testimonials[3].name}</strong>
          <span>{testimonials[3].role}</span>
          <div className="hero-actions">
            <Link className="button button-secondary" to="/testimonials">
              Read Reviews
            </Link>
            <Link className="button button-primary" to="/about">
              Explore Brand Story
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="FAQ"
          title="Answer the questions that usually block a reservation."
          text="Short, polished responses keep conversion momentum strong."
        />
        <div className="faq-grid">
          {faqItems.map((faq) => (
            <Reveal className="faq-card" key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <DemoCta />
    </>
  );
};
