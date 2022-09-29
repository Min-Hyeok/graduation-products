import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@store/index';

interface SettingsState {
  theme: 'light' | 'dark';
}

const initialState: SettingsState = {
  theme: 'light',
};

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<SettingsState['theme']>) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = settingSlice.actions;
export const selectTheme = (state: RootState) => state.setting.theme;

export default settingSlice.reducer;
