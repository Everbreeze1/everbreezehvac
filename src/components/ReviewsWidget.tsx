import { getGoogleReviews } from "@/lib/reviews";
import { site } from "@/lib/site";
import { ReviewsWidgetPanel } from "./ReviewsWidgetPanel";

export async function ReviewsWidget() {
  const data = await getGoogleReviews();
  if (!data || data.reviews.length === 0) return null;
  return <ReviewsWidgetPanel data={data} url={site.googleReviewsUrl} />;
}
