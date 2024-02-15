import styled from "@emotion/styled";

import type { Gradient } from "types";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
`;

export const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;

  @media (min-width: 425px) {
    padding-bottom: 1rem;
  }

  @media (min-width: 850px) {
    padding-bottom: 2rem;
  }
`;

export const Heading = styled.h1<{ gradient: Gradient }>`
  color: var(--color-black);
  background: ${({ gradient: { direction, colors } }) =>
    `linear-gradient(${direction.value}, ${colors[1]}, ${colors[2]})`};
  background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.8;
  font-family: var(--font-heading);
  font-size: 52px;
  text-align: center;
  width: 100%;
  max-width: 60rem;

  @media (min-width: 425px) {
    margin: 1rem 0;
  }

  @media (min-width: 850px) {
    font-size: 92px;
  }
`;

export const ColorSection = styled.div<{ gradient: Gradient }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ gradient: { direction, colors } }) =>
    `linear-gradient(${direction.value}, ${colors[1]}, ${colors[2]})`};
  position: relative;
`;

export const WaveContainer = styled.div`
  position: absolute;
  top: -1px;
  left: 0;
  width: 100%;
`;
