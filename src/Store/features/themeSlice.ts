import {createSlice } from "@reduxjs/toolkit";
import {DarkButtonGroups, LightButtonGroups} from "../../Types/ButtonGroups";


interface ThemeState {
  theme: string,
  buttonGroup: []
}

const initialState: ThemeState = {
  theme: "dark",
  buttonGroup: LightButtonGroups,
};

export const ThemeSlice = createSlice({
  name: "theme",
  initialState ,
  reducers: {
    toggleTheme: (state) => {
          state.theme = state.theme === "dark" ? "light" : "dark"
          state.buttonGroup = state.theme === "dark" ? LightButtonGroups : DarkButtonGroups
    },
  },
});

export default ThemeSlice.reducer;
export const { toggleTheme } = ThemeSlice.actions;
