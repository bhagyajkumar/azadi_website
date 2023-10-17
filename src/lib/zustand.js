import { create } from 'zustand'

const useModalStore = create((set) => ({
  isModalVisible: false,
  currentModal: "",
  currentUsername: null,
  uploadPercent: 0,

  filterSubject: null,

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
  },

  setFilterSubject: (subject)=>{
    set((state)=>({filterSubject: subject}))
  }


}))

export {
  useModalStore
}