import React from 'react';
import { StyledBadge } from './Badge.styles';

const Badge = ({ children, type, size, padding, round }) => {
  return (
    <StyledBadge $type={type} $size={size} $padding={padding} $round={round}>
      {children}
    </StyledBadge>
  );
};

export default Badge;
