import { V3Landing, v3Metadata } from "@/components/v3/landing";

export const metadata = v3Metadata("en");

export default function Page() {
  return <V3Landing locale="en" />;
}
