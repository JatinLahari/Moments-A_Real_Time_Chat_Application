import {create} from "zustand";
import toast from "react-hot-toast";
import {axiosInstance} from "../lib/axios";
import {useAuthStore} from "./useAuthStore";

export const useChatStore = create((set,get)=>({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async ()=>{
    set({isUsersLoading: true});
    try {
      const res = await axiosInstance.get("/message/users");
      set({users: res.data});
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }finally{
      set({isUsersLoading: false});
    }
  },

  getMessages: async (userId)=>{
    set({isMessagesLoading: true});
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({messages: res.data});
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }finally{
      set({isMessagesLoading: false});
    }
  },

  sendMessage: async(message) =>{
    const { selectedUser, messages} = get()
    if (!selectedUser?._id) {
      toast.error("No user selected");
      return;
    }
    try {
      const res = await axiosInstance.post(`/message/send/${selectedUser._id}`,message);
      set({messages:[...messages,res.data]});
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  },

  subscribeToMessages: () => {
    const {selectedUser} = get()
    if(!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    socket.on("newMessage", (newMessage) => {
      set({
        messages: [...get().messages, newMessage],
      });
    })
  },

  unsubscribeFromMessages: ()=>{
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({selectedUser}),
}))