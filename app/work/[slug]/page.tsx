import { WorkDetail } from "./WorkDetail";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <WorkDetail slug={slug} />;
}
