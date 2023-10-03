import { create } from 'zustand'

const useModalStore = create((set) => ({
  isModalVisible: false,
  currentModal: "",
  currentUsername: null,

  openModal: (modalName) => { 
    set((state) => ({ isModalVisible: true, currentModal: modalName }))
  },

  closeModal: () => {
    set((state) => ({ isModalVisible: false, currentModal: "" }))
  },

  setCurrentUsername: (username) =>{
    set((state)=>({currentUsername: username}))
  }


}))

export {
  useModalStore
}