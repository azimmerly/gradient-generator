import styled from '@emotion/styled';

export const Container = styled.div`
  position: relative;
`;

export const ColorButton = styled.button<{ buttoncolor: string }>`
  padding: 9px 1rem;
  border: none;
  border-radius: var(--border-radius);
  color: var(--color-white);
  background: ${({ buttoncolor }) => buttoncolor};
  display: flex;
  align-items: center;
  gap: 0.7rem;
  cursor: pointer;
  text-transform: uppercase;
  font-family: var(--font-primary);
  font-size: 16px;
  transition: opacity 150ms linear;

  &:hover {
    opacity: 0.9;
    background: ${({ buttoncolor }) => buttoncolor};
  }
`;

export const ColorPicker = styled.div`
  position: absolute;
  top: 3rem;
  left: -40%;
  z-index: 20;
`;
