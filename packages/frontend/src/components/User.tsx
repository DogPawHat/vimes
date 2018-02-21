import * as React from 'react';
import { pure } from 'recompose';

export interface UserProps {
  fullName: string;
}

const User: React.SFC<UserProps> = props => (
  <h1>{props.fullName}</h1>
);

export default pure(User);
