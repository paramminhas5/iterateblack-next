import { IndustryDetail } from "./IndustryDetail";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <IndustryDetail slug={slug} />;
}
