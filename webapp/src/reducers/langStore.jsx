import { createStore } from 'redux';

function lang(state = 'en_US', action) {
    switch (action.type) {
    case 'en_US' :
        return state = 'en_US'
    case 'TH':
      return state = 'TH'
    default:
      return state
    }
  }
  
  let langStore = createStore(lang);

  export default langStore;