import { CartProvider } from "./context/CartContext";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Statement } from "./components/Statement";
import { MoonExperience } from "./components/MoonExperience";
import { BuyCTA } from "./components/BuyCTA";
import { ShopSection } from "./components/ShopSection";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";

export default function App() {
  return (
    <CartProvider>
      <Navbar />
      <main>
        <Hero />
        <Statement />
        <MoonExperience />
        <BuyCTA />
        <ShopSection />
      </main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
