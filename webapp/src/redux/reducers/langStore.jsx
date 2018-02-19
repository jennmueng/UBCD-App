import { createStore } from 'redux';

import { SET_LANG, TOKEN } from '../actions/actions';

const initialState = {
  lang : 'en_US',
  token : null
};

function lang(state = initialState , action) {
    switch (action.type) {
    case SET_LANG :
      return state = Object.assign({}, state, {lang : action.lang})
    case TOKEN.SET :
      return state = Object.assign({}, state, {token : action.token})
    default:
      return state
    }
  }

  const mapStateToProps = state => {
    return {
      lang: getVisibleTodos(state.todos, state.visibilityFilter)
    }
  }
   
  const mapDispatchToProps = dispatch => {
    return {
      onTodoClick: id => {
        dispatch(toggleTodo(id))
      }
    }
  }

const mappedReg = connect(

)
  
let langStore = createStore(lang);

export default langStore;