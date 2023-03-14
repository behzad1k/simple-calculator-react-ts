import { ThemeSlice } from "./features/themeSlice";
import { AnswerSlice } from "./features/answerSlice";
import { SequenceSlice } from "./features/sequenceSlice";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    theme: ThemeSlice.reducer,
    answer: AnswerSlice.reducer,
    sequence: SequenceSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
