import { useEffect, useMemo, useState } from "react";
import { DemoCta, PageHero, SectionHeading } from "../../components/restaurant/PageBits";
import { Reveal } from "../../components/restaurant/Reveal";
import { testimonials as baseTestimonials } from "../../data/restaurantData";

const storageKey = "digitquo-demo-reviews";

export const TestimonialsPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [customReviews, setCustomReviews] = useState([]);
  const [formState, setFormState] = useState({
    name: "",
    role: "Restaurant Owner",
    rating: "5",
    review: "",
  });

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % baseTestimonials.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCustomReviews(parsed);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(customReviews));
  }, [customReviews]);

  const allTestimonials = useMemo(
    () => [...customReviews, ...baseTestimonials],
    [customReviews]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formState.name || !formState.review) {
      return;
    }

    const newReview = {
      name: formState.name.trim(),
      role: formState.role.trim() || "Guest",
      rating: Number(formState.rating || 5),
      review: formState.review.trim(),
    };

    setCustomReviews((current) => [newReview, ...current]);
    setFormState({ name: "", role: "Restaurant Owner", rating: "5", review: "" });
  };

  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="Social proof looks stronger when it has its own dedicated page and motion."
        text="Use this section to show owners how reviews, trust signals, and hospitality reputation can become part of the website's sales experience."
        image="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=80"
        actions={[{ to: "/reservations", label: "Try Booking Demo", variant: "button-primary" }]}
      />

      <section className="section">
        <SectionHeading
          eyebrow="Guest Reviews"
          title="Premium brands need social proof that feels designed, not pasted in."
          text="This carousel and review grid help sell trust, quality, and experience in a way that fits the luxury visual language."
        />
        <Reveal className="testimonial-slider main-slider">
          <button type="button" className="slider-arrow" onClick={() => setActiveIndex((activeIndex - 1 + baseTestimonials.length) % baseTestimonials.length)}>
            Prev
          </button>
          <article className="testimonial-card featured-testimonial">
            <div className="stars">{"?".repeat(baseTestimonials[activeIndex].rating)}</div>
            <p>{baseTestimonials[activeIndex].review}</p>
            <strong>{baseTestimonials[activeIndex].name}</strong>
            <span>{baseTestimonials[activeIndex].role}</span>
          </article>
          <button type="button" className="slider-arrow" onClick={() => setActiveIndex((activeIndex + 1) % baseTestimonials.length)}>
            Next
          </button>
        </Reveal>
      </section>

      <section className="section reviews-layout">
        <Reveal className="review-form-card">
          <SectionHeading
            eyebrow="Review System"
            title="Let clients experience a realistic review submission flow."
            text="This form is demo-only and stores reviews locally for presentation purposes."
          />
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              name="name"
              type="text"
              placeholder="Your name"
              value={formState.name}
              onChange={handleChange}
              required
            />
            <input
              name="role"
              type="text"
              placeholder="Role or business"
              value={formState.role}
              onChange={handleChange}
            />
            <select name="rating" value={formState.rating} onChange={handleChange}>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
            <textarea
              name="review"
              rows="5"
              placeholder="Write your review"
              value={formState.review}
              onChange={handleChange}
              required
            />
            <button type="submit" className="button button-primary">Submit Review</button>
          </form>
        </Reveal>

        <div className="testimonial-grid">
          {allTestimonials.map((testimonial) => (
            <Reveal className="testimonial-card compact-testimonial" key={`${testimonial.name}-${testimonial.review.slice(0, 12)}`}>
              <div className="stars">{"?".repeat(testimonial.rating)}</div>
              <p>{testimonial.review}</p>
              <strong>{testimonial.name}</strong>
              <span>{testimonial.role}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <DemoCta />
    </>
  );
};
