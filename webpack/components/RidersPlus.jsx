import { connect } from 'react-redux';

import Riders from './Riders.bs.js';

import {
  getRidersList,
  hideRidersList,
  showCurrentRider,
  hideCurrentRider
} from '../actions/index.js';

const mapStateToProps = state => {
  const { apiInfo, loginInfo, ridersInfo } = state;

  return { apiInfo, loginInfo, ridersInfo };
};

const mapDispatchToProps = {
  getRidersList,
  hideRidersList,
  showCurrentRider,
  hideCurrentRider
};

const RidersPlus = connect(
  mapStateToProps,
  mapDispatchToProps
)(Riders);

export default RidersPlus;
