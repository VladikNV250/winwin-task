import { produce } from 'immer'
import { create } from 'zustand'

import { ModalStore } from './types'

export const useModalStore = create<ModalStore>(set => ({
	modals: {},
	openModal: modalId =>
		set(
			produce((state: ModalStore) => {
				state.modals[modalId] = true
			})
		),
	closeModal: modalId =>
		set(
			produce((state: ModalStore) => {
				state.modals[modalId] = false
			})
		),
	closeAllModals: () => set({ modals: {} })
}))
