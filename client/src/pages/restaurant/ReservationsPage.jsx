import { useMemo, useState } from "react";
import { DemoCta, PageHero, SectionHeading } from "../../components/restaurant/PageBits";
import { Reveal } from "../../components/restaurant/Reveal";
import { useRestaurant } from "../../context/RestaurantContext";
import { reservationPerks, reservationSlots } from "../../data/restaurantData";

const formatDate = (value) => {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("en-IN", { dateStyle: "full" }).format(new Date(value));
};

const todayISO = () => new Date().toISOString().split("T")[0];

const addMonths = (months) => {
  const next = new Date();
  next.setMonth(next.getMonth() + months);
  return next.toISOString().split("T")[0];
};

const seatingZones = [
  { name: "Main Dining Room", description: "Classic premium dining with ambient lighting.", availability: "High" },
  { name: "Chef's Counter", description: "Front-row seat to the open kitchen.", availability: "Limited" },
  { name: "Window Table", description: "Natural light and street-facing views.", availability: "Limited" },
  { name: "Private Dining", description: "Ideal for celebrations and business groups.", availability: "On Request" },
  { name: "Terrace Lounge", description: "Evening breeze with cocktail service.", availability: "High" },
];

const unavailableSlots = new Set(["7:00 PM", "8:00 PM"]);

export const ReservationsPage = () => {
  const { booking, submitBooking, isLoggedIn } = useRestaurant();
  const [selectedTime, setSelectedTime] = useState(reservationSlots[2]);
  const [message, setMessage] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [seatingChoice, setSeatingChoice] = useState("Main Dining Room");
  const [duration, setDuration] = useState("2 Hours");
  const [contactPreference, setContactPreference] = useState({ sms: true, whatsapp: true, email: true });

  const bookingSummary = useMemo(() => booking, [booking]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isLoggedIn) {
      setMessage("Please login to book a table. Use the Login button in the header.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const confirmation = submitBooking({
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      date: formData.get("date"),
      time: selectedTime,
      guests: formData.get("guests"),
      occasion: formData.get("occasion"),
      seating: seatingChoice,
      duration,
      contactPreference: Object.keys(contactPreference).filter((key) => contactPreference[key]),
      notes: formData.get("notes"),
    });

    setMessage(`Table held for ${confirmation.name}. Reference ${confirmation.reference}.`);
  };

  return (
    <>
      <PageHero
        eyebrow="Booking System"
        title="A proper reservations page with table availability, guest preferences, and instant confirmation."
        text="This is a more convincing hospitality booking experience than a basic contact form, and it gives restaurant clients something they can immediately imagine using."
        image="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1800&q=80"
        actions={[{ to: "/contact", label: "Ask For Custom Booking Flow", variant: "button-secondary" }]}
      />

      <section className="section reservation-page-grid">
        <Reveal className="reservation-card expanded-card">
          <SectionHeading
            eyebrow="Reserve A Table"
            title="Capture the details that matter before the guest arrives."
            text="Occasion, seating preference, guest count, preferred time, and notes all contribute to a realistic premium booking experience."
          />
          <form className="reservation-form reservation-page-form" onSubmit={handleSubmit}>
            <input name="name" type="text" placeholder="Guest name" required />
            <input name="phone" type="tel" placeholder="Phone number" required />
            <input name="email" type="email" placeholder="Email address" required />
            <input name="date" type="date" min={todayISO()} max={addMonths(2)} required />
            <select
              name="guests"
              value={guestCount}
              onChange={(event) => setGuestCount(event.target.value)}
              required
            >
              <option value="" disabled>Number of guests</option>
              <option value="2">2 Guests</option>
              <option value="4">4 Guests</option>
              <option value="6">6 Guests</option>
              <option value="8">8 Guests</option>
              <option value="10+">10+ Guests</option>
            </select>
            <select name="occasion" defaultValue="Birthday">
              <option>Birthday</option>
              <option>Anniversary</option>
              <option>Business Dinner</option>
              <option>Date Night</option>
              <option>Casual Dining</option>
            </select>
            <select
              name="seating"
              value={seatingChoice}
              onChange={(event) => setSeatingChoice(event.target.value)}
            >
              {seatingZones.map((zone) => (
                <option key={zone.name}>{zone.name}</option>
              ))}
            </select>
            <select name="duration" value={duration} onChange={(event) => setDuration(event.target.value)}>
              <option>1.5 Hours</option>
              <option>2 Hours</option>
              <option>2.5 Hours</option>
              <option>3 Hours</option>
            </select>
            <textarea name="notes" rows="4" placeholder="Dietary notes, celebration details, or special requests" />
            <div className="slot-picker">
              <span>Preferred time</span>
              <div className="slot-grid">
                {reservationSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    className={`slot-button ${selectedTime === slot ? "active" : ""}`}
                    onClick={() => setSelectedTime(slot)}
                    disabled={unavailableSlots.has(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              <span className="slot-note">Unavailable slots are greyed out to demonstrate real-time availability.</span>
            </div>
            <div className="preference-row">
              <span>Confirmation preference</span>
              <label>
                <input
                  type="checkbox"
                  checked={contactPreference.sms}
                  onChange={(event) =>
                    setContactPreference((current) => ({ ...current, sms: event.target.checked }))
                  }
                />
                SMS
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={contactPreference.whatsapp}
                  onChange={(event) =>
                    setContactPreference((current) => ({ ...current, whatsapp: event.target.checked }))
                  }
                />
                WhatsApp
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={contactPreference.email}
                  onChange={(event) =>
                    setContactPreference((current) => ({ ...current, email: event.target.checked }))
                  }
                />
                Email
              </label>
            </div>
            <label className="terms-line">
              <input type="checkbox" required /> I agree to the booking terms and 15-minute arrival hold window.
            </label>
            <button type="submit" className="button button-primary">
              Confirm Booking Demo
            </button>
          </form>
          {message ? <p className="form-message success">{message}</p> : null}
        </Reveal>

        <Reveal className="booking-summary-card">
          <p className="eyebrow">Live Confirmation</p>
          <h2>Reservation Summary</h2>
          {bookingSummary ? (
            <div className="summary-list">
              <p><strong>Reference:</strong> {bookingSummary.reference}</p>
              <p><strong>Name:</strong> {bookingSummary.name}</p>
              <p><strong>Date:</strong> {formatDate(bookingSummary.date)}</p>
              <p><strong>Time:</strong> {bookingSummary.time}</p>
              <p><strong>Guests:</strong> {bookingSummary.guests}</p>
              <p><strong>Occasion:</strong> {bookingSummary.occasion}</p>
              <p><strong>Seating:</strong> {bookingSummary.seating}</p>
              <p><strong>Duration:</strong> {bookingSummary.duration}</p>
              <p><strong>Contact:</strong> {bookingSummary.phone} | {bookingSummary.email}</p>
              {bookingSummary.notes ? <p><strong>Notes:</strong> {bookingSummary.notes}</p> : null}
              <p><strong>Confirmations:</strong> {bookingSummary.contactPreference?.join(", ")}</p>
            </div>
          ) : (
            <p className="hero-copy">Complete the booking form to show a realistic confirmation card here.</p>
          )}
          <div className="feature-list compact-list">
            {reservationPerks.map((perk) => (
              <div className="feature-list-item" key={perk}>
                <p>{perk}</p>
              </div>
            ))}
          </div>
          <div className="availability-card">
            <p className="eyebrow">Seating Availability</p>
            <div className="availability-grid">
              {seatingZones.map((zone) => (
                <div key={zone.name} className="availability-item">
                  <strong>{zone.name}</strong>
                  <span>{zone.description}</span>
                  <em>{zone.availability}</em>
                </div>
              ))}
            </div>
            {guestCount ? <p className="hero-copy">Recommended for {guestCount} guests: {seatingChoice}</p> : null}
          </div>
        </Reveal>
      </section>

      <DemoCta />
    </>
  );
};
