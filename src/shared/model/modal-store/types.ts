export interface ModalStore {
	modals: Record<string, boolean>
	openModal: (modalId: string) => void
	closeModal: (modalId: string) => void
	closeAllModals: () => void
}
