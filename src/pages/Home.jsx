import { Link } from "react-router-dom";
import { CATEGORIES } from "../utils/catalog";
import { useProducts } from "../context/ProductsContext";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const { items, status } = useProducts();
  const fresh = items.filter((i) => i.stock > 0).slice(0, 4);

  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">Handmade in Islamabad</p>
          <h1>Bracelets with your name, your colours, your story</h1>
          <p>
            g.s.__collections makes beaded, set and custom-name jewellery for Islamabad and
            Rawalpindi. Choose your size by wrist measurement, spell your name in beads, and
            collect it or get it delivered.
          </p>
          <Link className="btn-primary" to="/shop">Shop the collection</Link>
        </div>
        <div className="hero-photos">
          <img
            src="/images/products/flowers-wala-kara-duo.jpg"
            alt="Two handmade gemstone-chip bangles with gold chain tassels on maroon fabric"
          />
          <img
            src="/images/products/custom-name-bracelet.jpg"
            alt="Black bead bracelet with white letter beads spelling DANIAL"
          />
        </div>
      </section>

      <h2 className="section-title">Browse by style</h2>
      <ul className="cats">
        {CATEGORIES.map((c) => (
          <li key={c}>
            <Link to={`/shop?category=${encodeURIComponent(c)}`}>{c}</Link>
          </li>
        ))}
      </ul>

      {status === "ready" && fresh.length > 0 && (
        <>
          <h2 className="section-title">Fresh from the studio</h2>
          <ul className="grid">
            {fresh.map((item) => (
              <li key={item.id}><ProductCard item={item} /></li>
            ))}
          </ul>
        </>
      )}

      <h2 className="section-title">Why shop with us</h2>
      <div className="info">
        <div>
          <h3>Know your fit</h3>
          <p>Every size lists its wrist measurement in cm, right where you choose.</p>
        </div>
        <div>
          <h3>No surprise totals</h3>
          <p>Your delivery fee and total show in the cart, before checkout.</p>
        </div>
        <div>
          <h3>Pickup or delivery</h3>
          <p>Free pickup, or delivery to selected areas of Islamabad and Rawalpindi.</p>
        </div>
      </div>
    </>
  );
}
