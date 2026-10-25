import { ogImage, ogSize } from "@/lib/og";
import { getArea } from "@/lib/areas";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Everbreeze Heating And Air® service area";

export default async function Image({ params }: { params: Promise<{ city: string }> }) {
  const area = getArea((await params).city);
  return ogImage({
    eyebrow: `${area?.name ?? "Sacramento"}, CA`,
    title: `Heating & air conditioning in ${area?.name ?? "Sacramento"}`,
  });
}
