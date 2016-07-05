import { connect } from 'react-redux';

import { login, logout } from 'shared/reducers/session.reducer';

const mapStateToProps = (state) => {
  return {
    session: state['session'],
    location: state['location']
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

const layoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default layoutContainer;
