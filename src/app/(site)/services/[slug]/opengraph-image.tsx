import { ogImage, ogSize } from "@/lib/og";
import { getService } from "@/lib/services";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Everbreeze Heating And Air® service";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const service = getService((await params).slug);
  return ogImage({
    eyebrow: "Sacramento, CA",
    title: service?.name ?? "Heating & Air Conditioning",
    badge: service?.offer ? `${service.offer.amount} SMUD rebate` : undefined,
  });
}
