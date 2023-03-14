import {createSlice, PayloadAction } from "@reduxjs/toolkit";

interface sequenceState {
    value: string
}
const initialState : sequenceState= {
  value: ''
}

export const SequenceSlice = createSlice({
  name: "sequence",
  initialState,
  reducers: {
    updateSequence: (state,action:PayloadAction<{value:string }>) => {
      switch(action.payload.value){
        case('AC'):
          state.value = '';
          break;
        case('C'):
          state.value = state.value.slice(0,state.value.length-1)
          break;
        default:
          state.value += action.payload.value
          break
      }
    }
  }
})
export default SequenceSlice.reducer;
export const { updateSequence } = SequenceSlice.actions;
