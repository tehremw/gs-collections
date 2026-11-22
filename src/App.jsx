import { useEffect, useRef } from "react";
import { Routes, Route, Link, NavLink, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ItemDetails from "./pages/ItemDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import Demo from "./pages/Demo";
import { BUSINESS } from "./data/business";
import { useCart } from "./context/CartContext";

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 8h12l-1 12H7L6 8z" /><path d="M9 8a3 3 0 0 1 6 0" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
      strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

export default function App() {
  const { count } = useCart();
  const { pathname } = useLocation();
  const mainRef = useRef(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo(0, 0);
    mainRef.current?.focus();
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <header className="site-header">
        <div className="container">
          <Link className="brand" to="/">
            <img src="/logo.png" alt="" width="44" height="44" />
            <span>g.s.__collections</span>
          </Link>
          <nav aria-label="Main" className="site-nav">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/shop">Shop</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/cart" className="cart-link" aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}>
              <BagIcon /><span aria-hidden="true">Cart</span>
              {count > 0 && <span className="cart-count" aria-hidden="true">{count}</span>}
            </NavLink>
          </nav>
        </div>
      </header>
      <main id="main" tabIndex={-1} ref={mainRef} className="container page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/items/:id" element={<ItemDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <div className="container footer-grid">
          <div><h2>g.s.__collections</h2><p>Handmade bracelets, Islamabad &amp; Rawalpindi.</p></div>
          <div><h2>Contact us</h2><p><a href={`tel:${BUSINESS.phoneLink}`}>{BUSINESS.phone}</a></p>
            <p><Link to="/contact">More ways to reach us</Link></p></div>
          <div><h2>Follow us</h2><a className="insta" href={BUSINESS.instagramUrl} target="_blank" rel="noopener noreferrer">
            <InstagramIcon />Instagram<span className="sr-only"> (opens in a new tab)</span></a></div>
        </div>
        <div className="container">
          <p className="footer-note">
            Student project: all orders are simulated and no payment is taken.{" "}
            <Link to="/demo">Demo controls (for markers)</Link>
          </p>
        </div>
      </footer>
    </>
  );
}
