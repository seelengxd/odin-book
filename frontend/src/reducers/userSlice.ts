import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserWithFriendStatus } from "../types/user";
import { RootState } from "./store";

interface UserState {
  users: UserWithFriendStatus[];
}

const initialState: UserState = {
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserWithFriendStatus[]>) => {
      state.users = action.payload;
    },
  },
});

export const { setUsers } = userSlice.actions;

export const selectUsers = (state: RootState) => state.user.users;
export const selectIncomingRequestCount = (state: RootState) =>
  state.user.users.filter((user) => user.friendStatus === "incoming").length;
export default userSlice.reducer;
