import { useState } from "react";

export default function ProductImage({ image, name, eager = false }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="photo photo-missing" role="img" aria-label={`Photo of ${name} unavailable`}>
        <span>Photo coming soon</span>
      </div>
    );
  }
  return (
    <img
      className="photo"
      src={image.src}
      alt={image.alt}
      loading={eager ? "eager" : "lazy"}
      onError={() => setFailed(true)}
    />
  );
}
