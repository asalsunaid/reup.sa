import { V2Landing, v2Metadata } from "@/components/v2/landing";

export const metadata = v2Metadata("en");

export default function Page() {
  return <V2Landing locale="en" />;
}
