export type GoogleReviews = {
  rating: number;
  count: number;
  reviews: { author: string; rating: number; text: string; when: string }[];
};

type PlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  reviews?: {
    rating: number;
    text?: { text: string };
    authorAttribution?: { displayName?: string };
    relativePublishTimeDescription?: string;
  }[];
};

// Live Google reviews via the Places API. Returns null when not configured or on any error,
// so the site never shows placeholder reviews.
export async function getGoogleReviews(): Promise<GoogleReviews | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) return null;
  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: { "X-Goog-Api-Key": key, "X-Goog-FieldMask": "rating,userRatingCount,reviews" },
      next: { revalidate: 6 * 60 * 60 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as PlacesResponse;
    if (!data.rating || !data.userRatingCount) return null;
    return {
      rating: data.rating,
      count: data.userRatingCount,
      reviews: (data.reviews ?? [])
        .filter((r) => r.rating >= 4 && r.text?.text)
        .map((r) => ({
          author: r.authorAttribution?.displayName ?? "Google user",
          rating: r.rating,
          text: r.text!.text,
          when: r.relativePublishTimeDescription ?? "",
        })),
    };
  } catch {
    return null;
  }
}
