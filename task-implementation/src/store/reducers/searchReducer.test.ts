import { searchReducer } from './searchReducer';

describe('Search Reducer Tests', () => {
  
  it('should return state default value', () => {

    const state = searchReducer(undefined, {});
    
    expect(state).toEqual('');
  });

  it('should pass "new value" and return the same', () => {

    const newValue: string = 'new value';
    const state = searchReducer(newValue, {});

    expect(state).toEqual(newValue);
  });

});