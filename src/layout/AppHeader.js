import React from 'react';
import AppBar from 'material-ui/AppBar';

const style = {
  position: 'fixed',
  top: 0
};


const AppBarHeader = ({title}) => (
  <AppBar style={style} title={title} iconClassNameRight="muidocs-icon-navigation-expand-more" />
);

export default AppBarHeader;