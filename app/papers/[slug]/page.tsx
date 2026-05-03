import { getPaper, listPapers } from '@/lib/rfcs';
import { Markdown } from '@/components/Markdown';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const papers = await listPapers();
  return papers.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const paper = await getPaper(slug);
  return { title: paper?.title ?? 'Paper' };
}

export default async function PaperPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const paper = await getPaper(slug);
  if (!paper) notFound();
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-8">
        <Link href="/papers" className="text-sm text-white/55 hover:text-white">← All papers</Link>
      </div>
      <Markdown source={paper.content} />
    </div>
  );
}
