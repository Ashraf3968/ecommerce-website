import { useState } from "react";
import { api } from "../utils/api";

const initialState = {
  name: "",
  email: "",
  subject: "",
  message: ""
};

const ContactPage = () => {
  const [formState, setFormState] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccessMessage("");

    try {
      const data = await api.post("/contact", formState);
      setSuccessMessage(data.message);
      setFormState(initialState);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="container page-section">
      <div className="contact-layout">
        <div>
          <div className="section-heading">
            <p className="eyebrow">Contact Page</p>
            <h1>Let customers reach your team.</h1>
          </div>
          <p className="contact-copy">
            Use this page for support, wholesale requests, or general brand inquiries.
          </p>
          <div className="contact-card-list">
            <article className="info-card">
              <h3>Email</h3>
              <p>support@digitquostore.com</p>
            </article>
            <article className="info-card">
              <h3>Phone</h3>
              <p>+91 98765 43210</p>
            </article>
            <article className="info-card">
              <h3>Visit</h3>
              <p>MG Road, Bengaluru</p>
            </article>
          </div>
        </div>

        <form className="stack-form contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={handleChange}
              placeholder="Your name"
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              placeholder="Your email"
            />
          </label>
          <label>
            Subject
            <input
              type="text"
              name="subject"
              value={formState.subject}
              onChange={handleChange}
              placeholder="What is this about?"
            />
          </label>
          <label>
            Message
            <textarea
              rows="6"
              name="message"
              value={formState.message}
              onChange={handleChange}
              placeholder="Tell us how we can help"
            />
          </label>

          {successMessage ? <div className="flash success">{successMessage}</div> : null}
          {error ? <div className="flash error">{error}</div> : null}

          <button type="submit" className="button primary" disabled={submitting}>
            {submitting ? "Sending..." : "Send message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactPage;
