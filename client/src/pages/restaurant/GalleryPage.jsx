import { useState } from "react";
import { DemoCta, PageHero, SectionHeading } from "../../components/restaurant/PageBits";
import { Reveal } from "../../components/restaurant/Reveal";
import { galleryItems } from "../../data/restaurantData";

export const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Separate gallery pages give restaurants room to sell atmosphere, not just information."
        text="Food, interiors, cocktails, and kitchen moments deserve a dedicated space, especially for premium hospitality brands trying to build desire."
        image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80"
        actions={[{ to: "/contact", label: "Use This Style For My Brand", variant: "button-primary" }]}
      />

      <section className="section">
        <SectionHeading
          eyebrow="Visual Storytelling"
          title="A polished lightbox gallery turns assets into a brand experience."
          text="This layout is ideal for showcasing interiors, hero dishes, events, private dining, and chef-led moments."
        />
        <div className="gallery-grid">
          {galleryItems.map((item) => (
            <Reveal as="button" type="button" className="gallery-item" key={item.title} onClick={() => setSelectedImage(item)}>
              <img src={item.image} alt={item.title} />
              <span>{item.tag} | {item.title}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <DemoCta />

      {selectedImage ? (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="lightbox-close" onClick={() => setSelectedImage(null)}>
              Close
            </button>
            <img src={selectedImage.image} alt={selectedImage.title} />
            <p>{selectedImage.tag} | {selectedImage.title}</p>
          </div>
        </div>
      ) : null}
    </>
  );
};
