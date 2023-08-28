
const initialState = {
    members: [],
  };
  
  const membersReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'EDIT_MEMBER':
        const updatedMembers = state.members.map((member) =>
          member.id === action.payload.id ? action.payload : member
        );
        return { ...state, members: updatedMembers };
      default:
        return state;
    }
  };
  
  export default membersReducer;
  