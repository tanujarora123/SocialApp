import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postService from './postService';

const initialState = {
	posts: [],
	post: null,
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: '',
};

export const getAllPosts = createAsyncThunk(
	'posts/get',
	async (_, thunkApi) => {
		try {
			const token = thunkApi.getState().auth.user.token;
			const data = await postService.getAllPosts(token);
			return data;
		} catch (err) {
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

export const likePost = createAsyncThunk(
	'post/like',
	async (postId, thunkApi) => {
		try {
			const token = thunkApi.getState().auth.user.token;
			let data = await postService.likePost(postId, token);
			data = { id: postId, likes: data };
			return data;
		} catch (err) {
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

export const unlikePost = createAsyncThunk(
	'post/unlike',
	async (postId, thunkApi) => {
		try {
			const token = thunkApi.getState().auth.user.token;
			let data = await postService.unlikePost(postId, token);
			data = { id: postId, likes: data };
			return data;
		} catch (err) {
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

export const createPost = createAsyncThunk(
	'post/create',
	async (post, thunkApi) => {
		try {
			const token = thunkApi.getState().auth.user.token;
			const { data } = await postService.createPost(post, token);
			return data;
		} catch (err) {
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

export const deletePost = createAsyncThunk(
	'post/delete',
	async (id, thunkApi) => {
		try {
			const token = thunkApi.getState().auth.user.token;
			await postService.deletePost(id, token);
			return id;
		} catch (err) {
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

export const getPost = createAsyncThunk('post/get', async (id, thunkApi) => {
	try {
		const token = thunkApi.getState().auth.user.token;
		const data = await postService.getPost(id, token);
		return data;
	} catch (err) {
		return thunkApi.rejectWithValue(err.response.data.message);
	}
});

export const createComment = createAsyncThunk(
	'post/comment',
	async ({ id, text }, thunkApi) => {
		try {
			const token = thunkApi.getState().auth.user.token;
			const data = await postService.createComment(id, text, token);
			return data;
		} catch (err) {
			console.log(err);
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {
		clearPost: state => initialState,
		reset: state => {
			state.isError = false;
			state.isSuccess = false;
			state.message = '';
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getAllPosts.pending, state => {
				state.isLoading = true;
			})
			.addCase(getAllPosts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.posts = action.payload.data;
				state.isSuccess = true;
			})
			.addCase(getAllPosts.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})

			.addCase(likePost.pending, state => {
				state.isLoading = true;
			})
			.addCase(likePost.fulfilled, (state, action) => {
				state.isLoading = false;
				state.posts = state.posts.map(p =>
					p._id === action.payload.id
						? { ...p, likes: action.payload.likes.data }
						: p
				);
				state.isSuccess = true;
			})
			.addCase(likePost.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(unlikePost.pending, state => {
				state.isLoading = true;
			})
			.addCase(unlikePost.fulfilled, (state, action) => {
				state.isLoading = false;
				state.posts = state.posts.map(p =>
					p._id === action.payload.id
						? { ...p, likes: action.payload.likes.data }
						: p
				);
				state.isSuccess = true;
			})
			.addCase(unlikePost.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(createPost.pending, state => {
				state.isLoading = true;
			})
			.addCase(createPost.fulfilled, (state, action) => {
				state.isLoading = false;
				state.posts = [action.payload, ...state.posts];
				state.isSuccess = true;
			})
			.addCase(createPost.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deletePost.pending, state => {
				state.isLoading = true;
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				state.isLoading = false;
				state.posts = state.posts.filter(p => p._id !== action.payload);
				state.isSuccess = true;
			})
			.addCase(deletePost.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getPost.pending, state => {
				state.isLoading = true;
			})
			.addCase(getPost.fulfilled, (state, action) => {
				state.isLoading = false;
				state.post = action.payload.data;
				state.isSuccess = true;
			})
			.addCase(getPost.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(createComment.fulfilled, (state, action) => {
				state.isLoading = false;
				state.post.comments = action.payload.data;
				state.isSuccess = true;
			})
			.addCase(createComment.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset, clearPost } = postSlice.actions;
export default postSlice.reducer;
