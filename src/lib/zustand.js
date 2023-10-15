import { create } from 'zustand'

const useModalStore = create((set) => ({
  isModalVisible: true,
  currentModal: "filter",
  currentUsername: null,
  uploadPercent: 0,

  openModal: (modalName) => { 
    set((state) => ({ isModalVisible: true, currentModal: modalName }))
  },

  closeModal: () => {
    set((state) => ({ isModalVisible: false, currentModal: "" }))
  },

  setCurrentUsername: (username) =>{
    set((state)=>({currentUsername: username}))
  },

  setUploadPercent: (num) =>{
    set((state)=>({uploadPercent: num}))
  }

}))

export {
  useModalStore
}