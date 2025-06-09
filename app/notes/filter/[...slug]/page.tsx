import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import { Tag } from '@/types/note';
import { Metadata } from 'next';

type generateMetadataProps = {
  params: { slug: string[] };
};

export async function generateMetadata({ params }: generateMetadataProps): Promise<Metadata> {
  const { slug } = params;
  const tag: Tag | string = slug[0];

  return {
    title: `Notes - ${tag === 'All' ? 'All Tags' : tag}`,
    description: `Browse notes tagged with ${
      tag === 'All' ? 'all tags' : tag
    }. NoteHub allows you to filter and view notes based on specific tags for better organization.`,
    openGraph: {
      title: `Notes - ${tag === 'All' ? 'All Tags' : tag}`,
      description: `Browse notes tagged with ${
        tag === 'All' ? 'all tags' : tag
      }. NoteHub allows you to filter and view notes based on specific tags for better organization.`,
      url: `https://notehub.com/notes/filter/${tag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `Notes - ${tag === 'All' ? 'All Tags' : tag} | NoteHub`,
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: generateMetadataProps) {
  const { slug } = params;
  const tag: Tag | string = slug[0];

  const data = await fetchNotes({
    searchText: '',
    page: 1,
    ...(tag && tag !== 'All' && { tag }),
  });

  return <NotesClient initialData={data} tag={tag} />;
}
