
import * as React from 'react';

const Callback: React.SFC<{
  handleAuthentication: () => void
}> = props => {
  props.handleAuthentication();
  return (
    <h1>Loading...</h1>
  );
};

export default Callback;