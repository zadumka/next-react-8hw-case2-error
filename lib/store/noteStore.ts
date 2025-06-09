import { create } from 'zustand';
import { Tag } from '@/types/note';
import { CreateNoteData } from '../api';

interface DraftNote {
  title: string;
  content: string;
  tag: Tag;
}

type NoteDraftStore = {
  draft: DraftNote;
  setDraft: (note: DraftNote) => void;
  clearDraft: () => void;
};

const initialDraft: CreateNoteData = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraftStore = create<NoteDraftStore>()((set) => ({
  draft: initialDraft,
  setDraft: (note) => set(() => ({ draft: note })),
  clearDraft: () => set(() => ({ draft: initialDraft })),
}));
