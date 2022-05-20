export const likeUseState = (payload, state) => payload instanceof Function 
  ? payload(state)
  : payload