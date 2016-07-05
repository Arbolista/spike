import { connect } from 'react-redux';

import { login } from 'shared/reducers/session.reducer';

const mapStateToProps = (state) => {
  return {
    login: login
  };
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const loginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default loginContainer;
