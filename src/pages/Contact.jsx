import { BUSINESS } from "../data/business";
import { DELIVERY_AREAS } from "../data/deliveryAreas";

export default function Contact() {
  return (
    <div>
      <h1>Contact us</h1>
      <p>Questions about a custom name set, sizing or delivery? Reach us any of these ways.</p>
      <ul className="contact-list">
        <li><strong>Phone: </strong><a href={`tel:${BUSINESS.phoneLink}`}>{BUSINESS.phone}</a></li>
        <li>
          <strong>Instagram: </strong>
          <a href={BUSINESS.instagramUrl} target="_blank" rel="noopener noreferrer">
            {BUSINESS.instagramHandle}<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
        <li><strong>We deliver to: </strong>{DELIVERY_AREAS.join(" · ")}</li>
      </ul>
    </div>
  );
}
