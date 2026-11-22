import { BUSINESS } from "../data/business";
export default function Contact() {
  return (
    <div className="contact-page">
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
        <li><strong>We deliver to: </strong>Islamabad and Rawalpindi.</li>
        <li><strong>Pickup: </strong>You can pick up your order from FAST NUCES Islamabad.</li>
      </ul>
    </div>
  );
}
