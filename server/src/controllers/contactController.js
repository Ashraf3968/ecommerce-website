import { isDemoModeEnabled } from "../config/storage.js";
import { createContactMessageInStore } from "../data/demoStore.js";
import ContactMessage from "../models/ContactMessage.js";

export const createContactMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    res.status(400);
    throw new Error("Please fill in all contact form fields.");
  }

  const payload = {
    name,
    email,
    subject,
    message
  };

  const contactMessage = isDemoModeEnabled()
    ? createContactMessageInStore(payload)
    : await ContactMessage.create(payload);

  res.status(201).json({
    message: "Thanks for reaching out. We will get back to you soon.",
    contactMessage
  });
};