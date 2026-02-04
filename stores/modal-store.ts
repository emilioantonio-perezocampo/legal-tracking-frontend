import { create } from 'zustand'

interface ModalStore {
  addToCaseOpen: boolean
  draftModalOpen: boolean
  openAddToCase: () => void
  closeAddToCase: () => void
  openDraftModal: () => void
  closeDraftModal: () => void
  closeAll: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
  addToCaseOpen: false,
  draftModalOpen: false,
  openAddToCase: () => set({ addToCaseOpen: true }),
  closeAddToCase: () => set({ addToCaseOpen: false }),
  openDraftModal: () => set({ draftModalOpen: true }),
  closeDraftModal: () => set({ draftModalOpen: false }),
  closeAll: () => set({ addToCaseOpen: false, draftModalOpen: false }),
}))
