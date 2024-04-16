import { create } from "zustand"

export type TUseCreateConversationDialogStore = {
  groupNameHeight: number
  userListHeight: number
  isDialogOpen: boolean
  setGroupNameHeight: (groupNameHeight: number) => void
  setUserListHeight: (userListHeight: number) => void
  setIsDialogOpen: (isDialogOpen: boolean) => void
}

export const useCreateConversationDialogStore =
  create<TUseCreateConversationDialogStore>(set => ({
    groupNameHeight: 124,
    userListHeight: 175,
    isDialogOpen: false,
    setGroupNameHeight: (groupNameHeight: number) => set({ groupNameHeight }),
    setUserListHeight: (userListHeight: number) => set({ userListHeight }),
    setIsDialogOpen: (isDialogOpen: boolean) => set({ isDialogOpen }),
  }))
