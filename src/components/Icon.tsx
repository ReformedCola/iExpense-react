import React from 'react';
import styled from 'styled-components';
import theme from 'theme';
// import cs from 'classnames';

let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
try {importAll(require.context('icons', true, /\.svg$/));} catch (error) {console.log(error);}

// type Props = {
//   name?: string
// } & React.SVGAttributes<SVGElement>

type TProps = {
  name: string
  color?: string
  size?: number
} & React.SVGAttributes<SVGElement>

type TIconWrapper = {
  size: number
}

const IconWrapper = styled.svg<TIconWrapper>(props => ({
  width: props.size,
  height: props.size,
  fill: props.color
}));

const Icon: React.FC<TProps> = (props) => {
  const {name, color, size, ...attributes} = props;
  return (
    // <svg className={cs('icon', className)} {...rest}>
    //   {props.name && <use xlinkHref={'#' + props.name}/>}
    // </svg>
    <IconWrapper size={size!}
                 color={color}
                 className="icon"
                 aria-hidden="true"
                 {...attributes}>
      <use xlinkHref={`#${name}`}/>
    </IconWrapper>
  );
};

Icon.defaultProps = {
  size: 16,
  color: theme.$normalText
};

export default Icon;