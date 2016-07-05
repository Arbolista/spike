import { connect } from 'react-redux';

import { ensureExamples } from 'shared/reducers/examples.reducer';
import { detailExample } from 'shared/reducers/current_example.reducer';

const mapStateToProps = (state) => {
  return {
    session: state['session'],
    examples: state['examples'],
    current_example: state['current_example'],
    location: state['location']
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    ensureExamples: (token)=>{
      ensureExamples.assignTo(dispatch);
      ensureExamples({token: token});
    },
    detailExample: (data)=>{
      detailExample.assignTo(dispatch);
      detailExample(data);
    }
  };
}

const indexContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default indexContainer;
