import React from 'react';
import { Container, Title, ChartWrapper } from './ChartContainer.styles';

const ChartContainer = ({ title, icon: Icon, children, height, marginTop }) => {
  return (
    <Container $marginTop={marginTop}>
      {(title || Icon) && (
        <Title>
          {Icon && <Icon />}
          {title}
        </Title>
      )}
      <ChartWrapper $height={height}>
        {children}
      </ChartWrapper>
    </Container>
  );
};

export default ChartContainer;
