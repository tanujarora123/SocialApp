import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import profileService from './profileService';

const initialState = {
	profile: null,
	profiles: [],
	repos: [],
	isLoading: false,
	isError: false,
	isSuccess: false,
	message: '',
};

export const getMyProfile = createAsyncThunk(
	'profile/me',
	async (_, thunkApi) => {
		try {
			const token = thunkApi.getState().auth.user.token;
			const data = await profileService.getLoggedInUserProfile(token);
			return data;
		} catch (err) {
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

export const createProfile = createAsyncThunk(
	'profile/create',
	async (profileData, thunkApi) => {
		try {
			const token = thunkApi.getState().auth.user.token;
			const data = await profileService.createProfile(profileData, token);
			return data;
		} catch (err) {
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

export const createExperience = createAsyncThunk(
	'profile/experience/create',
	async (expData, thunkApi) => {
		try {
			const token = thunkApi.getState().auth.user.token;
			const data = await profileService.createExperience(expData, token);
			return data;
		} catch (err) {
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

export const createEducation = createAsyncThunk(
	'profile/education/create',
	async (eduData, thunkApi) => {
		try {
			const token = thunkApi.getState().auth.user.token;
			const data = await profileService.createEducation(eduData, token);
			return data;
		} catch (err) {
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

export const deleteExperience = createAsyncThunk(
	'profile/experience/delete',
	async (expId, thunkApi) => {
		try {
			const token = thunkApi.getState().auth.user.token;
			const data = await profileService.deleteExperience(expId, token);
			return data;
		} catch (err) {
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

export const deleteEducation = createAsyncThunk(
	'profile/education/delete',
	async (eduId, thunkApi) => {
		try {
			const token = thunkApi.getState().auth.user.token;
			const data = await profileService.deleteEducation(eduId, token);
			return data;
		} catch (err) {
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

export const deleteAccount = createAsyncThunk(
	'profile/delete',
	async (_, thunkApi) => {
		try {
			const token = thunkApi.getState().auth.user.token;
			const data = await profileService.deleteAccount(token);
			return data;
		} catch (err) {
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

export const getAllProfiles = createAsyncThunk(
	'profiles/get',
	async (_, thunkApi) => {
		try {
			const data = await profileService.getAllProfiles();
			return data;
		} catch (err) {
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

export const getSingleProfile = createAsyncThunk(
	'profile/get',
	async (id, thunkApi) => {
		try {
			const data = await profileService.getSingleProfile(id);
			return data;
		} catch (err) {
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

export const getuserRepos = createAsyncThunk(
	'profile/repos/get',
	async (username, thunkApi) => {
		try {
			const data = await profileService.getuserRepos(username);
			return data;
		} catch (err) {
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		clearProfile: state => initialState,
		reset: state => {
			state.isError = false;
			state.isSuccess = false;
			state.message = '';
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getMyProfile.pending, state => {
				state.isLoading = true;
			})
			.addCase(getMyProfile.fulfilled, (state, action) => {
				state.isLoading = false;
				//state.isSuccess = true; No Need to user isSuccess
				state.profile = action.payload.data;
			})
			.addCase(getMyProfile.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.profile = null;
				state.message = action.payload;
			})
			.addCase(createProfile.pending, state => {
				state.isLoading = true;
			})
			.addCase(createProfile.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.profile = action.payload.data;
			})
			.addCase(createProfile.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.profile = null;
				state.message = action.payload;
			})
			.addCase(createExperience.pending, state => {
				state.isLoading = true;
			})
			.addCase(createExperience.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.profile = action.payload.data;
			})
			.addCase(createExperience.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.profile = null;
				state.message = action.payload;
			})
			.addCase(createEducation.pending, state => {
				state.isLoading = true;
			})
			.addCase(createEducation.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.profile = action.payload.data;
			})
			.addCase(createEducation.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.profile = null;
				state.message = action.payload;
			})
			.addCase(deleteExperience.pending, state => {
				state.isLoading = true;
			})
			.addCase(deleteExperience.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.profile = action.payload.data;
			})
			.addCase(deleteExperience.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deleteEducation.pending, state => {
				state.isLoading = true;
			})
			.addCase(deleteEducation.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.profile = action.payload.data;
			})
			.addCase(deleteEducation.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deleteAccount.pending, state => {
				state.isLoading = true;
			})
			.addCase(deleteAccount.fulfilled, state => {
				state.isLoading = false;
				//state.isSuccess = true; No need required
				state.profile = null;
			})
			.addCase(deleteAccount.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getAllProfiles.pending, state => {
				state.isLoading = true;
			})
			.addCase(getAllProfiles.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.profiles = action.payload.data;
			})
			.addCase(getAllProfiles.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getSingleProfile.pending, state => {
				state.isLoading = true;
			})
			.addCase(getSingleProfile.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.profile = action.payload.data;
			})
			.addCase(getSingleProfile.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getuserRepos.pending, state => {
				state.isLoading = true;
			})
			.addCase(getuserRepos.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.repos = action.payload.data;
			})
			.addCase(getuserRepos.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { clearProfile, reset } = profileSlice.actions;
export default profileSlice.reducer;
