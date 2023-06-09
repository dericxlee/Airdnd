import csrfFetch from "./csrf";

export const RECEIVE_REVIEWS = 'reviews/receiveReviews'
export const RECEIVE_REVIEW = 'reviews/receiveReview'
export const REMOVE_REVIEW = 'reviews/removeReview'

const receiveReviews = reviews => ({
    type: RECEIVE_REVIEWS,
    reviews
});

const receiveReview = review => ({
    type: RECEIVE_REVIEW,
    review
});

const removeReview = reviewId => ({
    type: REMOVE_REVIEW,
    reviewId
});

export const getReviews = state => {
    return state?.reviews ? Object.values(state.trips) : [];
};

export const getReview = (reviewId) => state => {
    return state?.reviews ? state.reviews(reviewId) : null;
};

export const fetchReviews = () => async (dispatch) => {
    const res = await csrfFetch (`/api/reviews/`)

    if(res.ok) {
        const reviews = await res.json()
        dispatch(receiveReviews(reviews))
    }
}

export const fetchReview = reviewId => async (dispatch) => {
    const res = await csrfFetch (`/api/reviews/${reviewId}`);
    // const data = await res.json()

    if(res.ok) {
        const review = await res.json()
        // console.log(listing, 'fetch')
        dispatch(receiveReview(review))
    }
}

export const createReview = review => async(dispatch) => {
    const {userId, listingId, tripId, body, rating} = review
    const res = await csrfFetch (`/api/reviews/`, {
        method: 'POST',
        body: JSON.stringify({
            userId,
            listingId,
            tripId,
            body,
            rating
        })
    })

    if(res.ok){
        const review = await res.json()
        dispatch(receiveReview(review))
    }
};

export const updateReview = review => async (dispatch) => {
    const res = await csrfFetch (`/api/reviews/${review.id}`, {
        method: 'PATCH',
        body: JSON.stringify(review)
    });

    if(res.ok) {
        const review = await res.json()
        dispatch(receiveReview(review))
    };
};

export const deleteReview = reviewId => async (dispatch) => {
    const res = await csrfFetch (`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    });

    if(res.ok){
        dispatch(removeReview(reviewId))
    };
};

const reviewsReducer = (state = {}, action) => {
    switch(action.type){
        case RECEIVE_REVIEWS:
            return {...action.reviews}
        case RECEIVE_REVIEW:
            return {...state, [action.review.id] : action.review}
        case REMOVE_REVIEW:
            const newState = {...state}
            delete newState[action.reviewId];
            return newState;
        default:
            return state;
    }
}

export default reviewsReducer;