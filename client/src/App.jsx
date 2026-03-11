import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/restaurant/AppShell";
import { AboutPage } from "./pages/restaurant/AboutPage";
import { ContactPage } from "./pages/restaurant/ContactPage";
import { GalleryPage } from "./pages/restaurant/GalleryPage";
import { HomePage } from "./pages/restaurant/HomePage";
import { MenuPage } from "./pages/restaurant/MenuPage";
import { OrderPage } from "./pages/restaurant/OrderPage";
import { ReservationsPage } from "./pages/restaurant/ReservationsPage";
import { TestimonialsPage } from "./pages/restaurant/TestimonialsPage";

const App = () => (
  <AppShell>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/reservations" element={<ReservationsPage />} />
      <Route path="/order" element={<OrderPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/testimonials" element={<TestimonialsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </AppShell>
);

export default App;
