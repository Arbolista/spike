import { connect } from 'react-redux';

import { ensureExamples } from 'shared/reducers/examples.reducer';

const mapStateToProps = (state) => {
  return {
    examples: state['examples'],
    session: state['session']
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    ensureExamples: (token)=>{
      ensureExamples.assignTo(dispatch);
      ensureExamples({token: token});
    }
  }
}

const indexContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default indexContainer;
