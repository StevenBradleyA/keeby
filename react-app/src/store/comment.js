const normalizer = (data) => {
  const obj = {};
  data.forEach((item) => {
    obj[item.id] = item;
  });
  return obj;
};

// --------      Actions         --------

const LOAD_COMMENTS = "comments/LOAD_COMMENTS";
const CREATE_COMMENT = "comments/CREATE_COMMENT";
const UPDATE_COMMENT = "comments/UPDATE_COMMENT";
const DELETE_COMMENT = "comments/DELETE_COMMENT";
const CLEAR_COMMENT = "comments/CLEAR_COMMENT";

const loadComments = (allCommentData) => ({
  type: LOAD_COMMENTS,
  payload: allCommentData,
});

const createComment = (newCommentData) => ({
  type: CREATE_COMMENT,
  payload: newCommentData,
});

const updateComment = (updatedCommentData) => ({
  type: UPDATE_COMMENT,
  payload: updatedCommentData,
});
const deleteComment = (CommentId) => ({
  type: DELETE_COMMENT,
  payload: CommentId,
});
export const clearComment = () => ({
  type: CLEAR_COMMENT,
});

// --------      Thunks         --------

export const getAllCommentsPerListingThunk =
  (listingId) => async (dispatch) => {
    const response = await fetch(`/api/listings/${listingId}/comments`);
    if (response.ok) {
      const { comments } = await response.json();
      const normalizedCommentData = normalizer(comments);
      dispatch(loadComments(normalizedCommentData));
    }
  };

export const getCommentByIdThunk = (commentId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`);

  if (response.ok) {
    const singleMessageData = await response.json();
    const normalizedMessageData = {
      [singleMessageData.id]: singleMessageData,
    };
    dispatch(loadComments(normalizedMessageData));
  }
};

export const createCommentThunk =
  (listingId, newCommentData) => async (dispatch) => {
    try {
      const response = await fetch(`/api/listings/${listingId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCommentData),
      });

      const data = await response.json();
      const normalizedCommentData = {
        [data.id]: data,
      };
      dispatch(createComment(normalizedCommentData));
      return data;
    } catch (error) {
      console.log(error);
    }
  };

export const updateMessageThunk =
  (newCommentData, commentId) => async (dispatch) => {
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCommentData),
      });
      const data = await response.json();
      const normalizedCommentData = {
        [data.id]: data,
      };
      dispatch(updateComment(normalizedCommentData));
      return data;
    } catch (error) {
      console.log(error);
    }
  };

export const deleteCommentThunk = (commentId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteComment(commentId));
  }
};

const initialState = {};

const commentsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_COMMENTS:
      return { ...state, ...action.payload };
    case CREATE_COMMENT:
      return { ...state, ...action.payload };
    case UPDATE_COMMENT:
      return { ...state, ...action.payload };
    case DELETE_COMMENT:
      delete newState[action.payload];
      return newState;
    case CLEAR_COMMENT:
      return {};
    default:
      return state;
  }
};

export default commentsReducer;
