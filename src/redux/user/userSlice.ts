import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  isLoggedIn: boolean;
  user: any;
  members: [];
  isDataLoading: boolean;
  pendingUsers: any[];
  storerDetail: {};
  creatorDetail: {};
}

const initialState: UserState = {
  isLoggedIn: false,
  user: {},
  members: [],
  isDataLoading: false,
  pendingUsers: [],
  storerDetail: {},
  creatorDetail: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.members = [];
      state.user = {};
    },
    authenticate: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    restoreAuthState: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    setAllMembers: (state, action: PayloadAction<any>) => {
      state.members = action.payload;
    },
    setDataLoading: (state, action: PayloadAction<boolean>) => {
      state.isDataLoading = action.payload;
    },
  },
});

export const userActions = {
  ...userSlice.actions,
  allMembers: createAction<{ url: string }>("user/allMembers"),
};

export default userSlice.reducer;
