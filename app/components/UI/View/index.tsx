import styled, { css } from 'styled-components/native';
import {
  space,
  SpaceProps,
  layout,
  LayoutProps,
  color,
  ColorProps,
  background,
  BackgroundProps,
  border,
  BorderProps,
} from 'styled-system';

export interface ElementPropsType
  extends SpaceProps,
    LayoutProps,
    ColorProps,
    BackgroundProps,
    BorderProps,
    ViewAdditionalTypes {}

const alignStartCss = ({ alignStart }: ElementPropsType) =>
  alignStart &&
  css`
    align-items: flex-start;
  `;

const alignCenterCss = ({ alignCenter }: ElementPropsType) =>
  alignCenter &&
  css`
    align-items: center;
  `;

const alignEndCss = ({ alignEnd }: ElementPropsType) =>
  alignEnd &&
  css`
    align-items: flex-end;
  `;

const fullHeightCss = ({ fullHeight }: ElementPropsType) =>
  fullHeight &&
  css`
    height: 100%;
  `;

const fullWidthCss = ({ fullWidth }: ElementPropsType) =>
  fullWidth &&
  css`
    width: 100%;
  `;

const justifyCenterCss = ({ justifyCenter }: ElementPropsType) =>
  justifyCenter &&
  css`
    justify-content: center;
  `;

const justifyEndCss = ({ justifyEnd }: ElementPropsType) =>
  justifyEnd &&
  css`
    justify-content: flex-end;
  `;
const justifyStartCss = ({ justifyStart }: ElementPropsType) =>
  justifyStart &&
  css`
    justify-content: flex-start;
  `;

const justifySpaceBetweenCss = ({ justifySpaceBetween }: ElementPropsType) =>
  justifySpaceBetween &&
  css`
    justify-content: space-between;
  `;
const justifySpaceAroundCss = ({ justifySpaceAround }: ElementPropsType) =>
  justifySpaceAround &&
  css`
    justify-content: space-around;
  `;

const noShrinkCss = ({ noShrink }: ElementPropsType) =>
  noShrink &&
  css`
    flex-shrink: 0;
  `;

const stretchCss = ({ stretch }: ElementPropsType) =>
  stretch &&
  css`
    flex: 1;
  `;

const Element = styled.View<ElementPropsType>`
  ${alignStartCss}
  ${alignCenterCss}
  ${alignEndCss}
  ${fullHeightCss}
  ${fullWidthCss}
  ${justifyCenterCss}
  ${justifyEndCss}
  ${justifyStartCss}
  ${justifySpaceBetweenCss}
  ${justifySpaceAroundCss}
  ${noShrinkCss}
  ${stretchCss}
  ${space}
  ${layout}
  ${color}
  ${background}
  ${border}
`;

const Column = styled(Element)<ElementPropsType>`
  flex-direction: column;
`;

const Row = styled(Element)<ElementPropsType>`
  flex-direction: row;
`;

export { Column, Row };
