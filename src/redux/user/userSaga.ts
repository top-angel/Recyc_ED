import { call, put, delay, all, takeEvery } from "redux-saga/effects";
import { userActions } from "./userSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { useFetch } from "../../hooks/useFetch";
import { API_URI } from "src/api/auth";

// import type { AppState } from "../store";
// import { selects } from "../hooks";

export function* userAllMembersHandler(
  action: PayloadAction<{
    results: number;
    url: string;
  }>
): Generator<any, any, any> {
  console.warn("allMembers", action);

  try {
    const url = action.payload.url;
    const data = yield call(useFetch, url, "GET", "");
    yield put(userActions.setAllMembers(data.results));
  } catch (err) {
  } finally {
  }
}

export default function* userWalletSaga() {
  yield all([takeEvery(userActions.allMembers.type, userAllMembersHandler)]);
  delay(1000);
}
