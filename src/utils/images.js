export function imagesFor(item, colorLabel) {
  if (item.colors) {
    const match = item.colors.find((c) => c.label === colorLabel) ?? item.colors[0];
    return match.images;
  }
  return item.images;
}

export const coverImage = (item) => imagesFor(item, item.colors?.[0].label)[0];
