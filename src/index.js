import React from 'react';

const transparent = C => by => props => (
  (typeof by === 'function' ? by(props) : props[by] !== undefined)
    ? <C {...props} />
    : props.children || null
);

export default transparent;
