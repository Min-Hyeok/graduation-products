import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@store/index';

interface SettingsState {
  theme: 'light' | 'dark';
  isLogin: boolean;
}

const initialState: SettingsState = {
  theme: 'light',
  isLogin: false,
};

export const rootSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<SettingsState['theme']>) => {
      state.theme = action.payload;
    },
    setLogin: (state, action: PayloadAction<SettingsState['isLogin']>) => {
      state.isLogin = action.payload;
    },
  },
});

export const { setTheme, setLogin } = rootSlice.actions;
export const isLogin = (state: RootState) => state.root.isLogin;

export default rootSlice.reducer;
