import { useState } from "react";
import ProductImage from "./ProductImage";

export default function ProductGallery({ images, name }) {
  const [index, setIndex] = useState(0);
  const current = images[index] ?? images[0];

  return (
    <div className="gallery">
      <ProductImage key={current.src} image={current} name={name} eager />
      {images.length > 1 && (
        <ul className="thumbs" aria-label="More photos">
          {images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                className="thumb"
                aria-pressed={i === index}
                aria-label={`Show photo ${i + 1} of ${images.length}`}
                onClick={() => setIndex(i)}
              >
                <img src={img.src} alt="" loading="lazy" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
