import * as React from 'react';
import styled from 'styled-components';

type Direction = 'vertical' | 'horizontal'

type Props = {
  direction?: Direction
  gap?: number
  color?: string
}

const VerticalDivider = styled.span<Props>(props => ({
  borderRight: '1px solid',
  margin: `0 ${props.gap}px`,
  borderColor: props.color
}));

const HorizontalDivider = styled.div<Props>(props => ({
  borderBottom: '1px solid',
  margin: `${props.gap}px 0`,
  borderColor: props.color
}));

const Divider: React.FC<Props> = (props) => {
  const {direction} = props;

  return (
    direction === 'horizontal' ?
      <HorizontalDivider {...props}/> :
      <VerticalDivider {...props}/>
  );
};

Divider.defaultProps = {
  direction: 'vertical',
  gap: 16,
  color: '#eee'
};

export default Divider;
