import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';
import { fetchNoteById } from '@/lib/api';
import { Metadata } from 'next';

interface NoteDetailsProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: NoteDetailsProps) {
  const { slug } = await params;
  const id = slug[0];
  const parsedId = Number(id);
  const note = await fetchNoteById(parsedId);

  return {
    title: note.title,
    description: `${note.content.slice(0, 30)}...`,
    openGraph: {
      title: note.title,
      description: `${note.content.slice(0, 30)}...`,
      url: `https://notehub.com/notes/${id}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `${note.title} | NoteHub`,
        },
      ],
    },
  };
}

export default async function NoteDetails({ params }: NoteDetailsProps) {
  const { slug } = await params;
  const id = slug[0];
  const parsedId = Number(id);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['note', parsedId],
    queryFn: () => fetchNoteById(parsedId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
