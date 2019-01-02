import authReducer from './../../reducers/auth';

test('should set uid for login', () => {
   const action = {
      type: 'LOGIN',
      uid: '121'
   };
   const state = authReducer({}, action);
   expect(state.uid).toBe(action.uid);
});

test('should clear uid for logout', () => {
   const state = authReducer({uid: 'abc'}, {
      type: 'LOGOUT'
   });
   expect(state).toEqual({});
});