import { useState } from "react";
import { DemoCta, PageHero, SectionHeading } from "../../components/restaurant/PageBits";
import { Reveal } from "../../components/restaurant/Reveal";
import { siteMeta } from "../../data/restaurantData";

export const ContactPage = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setMessage(`Thanks ${formData.get("name")}, DIGITQUO can use this demo style as a base for your restaurant website.`);
    event.currentTarget.reset();
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="End with a contact page that feels credible, polished, and ready for serious leads."
        text="This page is structured to help DIGITQUO present real agency value to restaurant owners with strong contact details, a map, and a lead form."
        image="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1800&q=80"
        actions={[{ to: "/menu", label: "Review Menu Demo", variant: "button-secondary" }]}
      />

      <section className="section contact-layout">
        <Reveal className="contact-card">
          <SectionHeading
            eyebrow="Let's Build Yours"
            title="Show restaurant owners exactly how the next step would feel."
            text="A premium demo should finish with an equally polished lead capture experience."
          />
          <div className="contact-details vertical-list">
            <p><strong>Call:</strong> <a href={siteMeta.phoneHref}>{siteMeta.phone}</a></p>
            <p><strong>WhatsApp:</strong> <a href={siteMeta.whatsappHref} target="_blank" rel="noreferrer">Chat on WhatsApp</a></p>
            <p><strong>Email:</strong> <a href={siteMeta.emailHref}>{siteMeta.email}</a></p>
            <p><strong>Address:</strong> {siteMeta.address}</p>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input name="name" type="text" placeholder="Your name" required />
            <input name="email" type="email" placeholder="Your email" required />
            <input name="business" type="text" placeholder="Restaurant name" required />
            <textarea name="message" rows="5" placeholder="Tell us what kind of restaurant website you want" required />
            <button type="submit" className="button button-primary">Send Inquiry</button>
          </form>
          {message ? <p className="form-message success">{message}</p> : null}
        </Reveal>

        <Reveal className="map-card">
          <iframe
            title="DIGITQUO demo restaurant map"
            src="https://www.google.com/maps?q=Park%20Street%20Kolkata&z=14&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </section>

      <DemoCta />
    </>
  );
};
