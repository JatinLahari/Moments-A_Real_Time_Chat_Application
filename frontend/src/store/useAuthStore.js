import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import {io} from "socket.io-client";
const Base_URL = "http://localhost:2275";

export const useAuthStore = create((set, get)=>({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async() => {
        try {
            const res = await axiosInstance.get("/user/check");
            set({authUser:res.data})
            get().connectSocket();
        } catch (error) {
            console.log("Error in CheckAuth: ", error);
            set({authUser:null})
        }finally{
            set({isCheckingAuth: false});
        }
    },

    signup: async (data) =>{
        set({ isSigningUp: true});
        try {
            const res = await axiosInstance.post("/user/signup", data);
            set({authUser: res.data});
            toast.success("Account created successfully");
            get().connectSocket();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Signup failed");
        }finally{
            set({isSigningUp : false});
        }
    },

    logout: async () =>{
        try {
            await axiosInstance.post("/user/logout");
            set({authUser:null});
            toast.success("Logged Out Successfully");
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    login: async (data) =>{
        set ({isLoggingIn: true});
        try {
            const res = await axiosInstance.post("/user/login", data);
            set({authUser: res.data});
            toast.success("Login successful");
            get().connectSocket();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Login failed");
        }finally{
            set({isLoggingIn: false});
        }
    },

    updateProfile: async(data)=>{
        set({isUpdatingProfile: true});
        try {
            const res = await axiosInstance.put("/user/update-profile", data);
            set({authUser: res.data});
            toast.success("Profile updated Successfully");
        } catch (error) {
            console.log("Error in update profile: ", error);
            toast.error(error.response.data.message);
        }finally{
            set({isUpdatingProfile: false});
        }
    },
    connectSocket: () => {
        const {authUser} = get();
        if(!authUser || get().socket?.connected) return;

        const socket = io(Base_URL, {
            query: {
                userId: authUser._id,
            },
        });
        socket.connect();

        set({socket:socket});

        socket.on("getOnlineUsers", (userIds)=>{
            set({ onlineUsers: userIds})
        })
    },
    disconnectSocket: () => {
        if(get().socket?.connected) get().socket.disconnect();
    },
}));