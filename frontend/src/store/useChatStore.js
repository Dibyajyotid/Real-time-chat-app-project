import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { useAuthStore } from './useAuthStore';

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  // fetch all users for chat
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // fetch messages with a particular user
  getMessages: async (userId: string) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // send a message to selected user
  sendMessage: async (messageData: { text: string }) => {
    const { selectedUser, messages } = get();
    const socket = useAuthStore.getState().socket;
    if (!selectedUser) return;

    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });

      // emit real-time event to backend
      socket?.emit("sendMessage", res.data);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to send message");
    }
  },

  // subscribe to real-time messages
  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    // unsubscribe first to avoid duplicate listeners
    socket.off("newMessage");

    socket.on("newMessage", (newMessage: any) => {
      const selectedUser = get().selectedUser;
      const authUser = useAuthStore.getState().authUser;

      if (!selectedUser || !authUser) return;

      // only add messages from the currently selected user
      if (
        newMessage.senderId !== selectedUser._id &&
        newMessage.receiverId !== selectedUser._id
      )
        return;

      set({ messages: [...get().messages, newMessage] });
    });
  },

  // unsubscribe from messages
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket?.off("newMessage");
  },

  // select a user to chat with
  setSelectedUser: (selectedUser: any) => {
    // clear old messages
    set({ selectedUser, messages: [] });

    // fetch messages for this user
    get().getMessages(selectedUser._id);

    // subscribe to messages for this user
    get().subscribeToMessages();
  },
}));
