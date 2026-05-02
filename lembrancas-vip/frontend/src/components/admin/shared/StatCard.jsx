import React from 'react';
import { Card, IconWrapper, Info, Value, Label } from './StatCard.styles';

const StatCard = ({ icon: Icon, label, value, color, bgColor }) => {
  return (
    <Card>
      <IconWrapper $color={color} $bgColor={bgColor}>
        <Icon />
      </IconWrapper>
      <Info>
        <Value>{value}</Value>
        <Label>{label}</Label>
      </Info>
    </Card>
  );
};

export default StatCard;
