import {createSlice, PayloadAction } from "@reduxjs/toolkit";

interface answerState {
    value: number
}
const initialState : answerState= {
  value: 0
}

export const AnswerSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {
    showAnswer: (state,action:PayloadAction<{value:number}>) => {
      state.value = action.payload.value
    }
  }
})

export default AnswerSlice.reducer;
export const { showAnswer } = AnswerSlice.actions;
