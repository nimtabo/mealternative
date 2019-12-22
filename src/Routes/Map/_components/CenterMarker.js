import React from 'react';
import PropTypes from 'prop-types';
import { PersonPin } from '@material-ui/icons';

const CenterMarker = props => {
  const { classes, $hover } = props;

  return (
    <div className={classes.centerMarker}>
      <PersonPin color='primary' fontSize='large' />
    </div>
  );
};

CenterMarker.propTypes = {
  classes: PropTypes.object.isRequired
};

export default CenterMarker;