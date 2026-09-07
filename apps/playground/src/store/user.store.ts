import {create} from 'zustand';


export type User = {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    role: 'user' | 'admin';
}

type UserStore = {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({user}),
    clearUser: () => set({user: null}),
}));