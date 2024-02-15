import styled from '@emotion/styled';

export const Container = styled.div`
  color: var(--color-white);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  padding: 1rem;
`;

export const GradientText = styled.p`
  font-family: var(--font-code);
  color: var(--color-white);
  max-width: 52rem;
  text-align: left;
  min-height: 4rem;
  font-size: 16px;

  @media (min-width: 425px) {
    min-height: 3rem;
    font-size: 17px;
  }

  @media (min-width: 850px) {
    min-height: 2rem;
  }
`;

export const StyledButton = styled.button`
  padding: 9px 1rem;
  border: 1px solid var(--color-white);
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  gap: 0.7rem;
  border-width: 2px;
  cursor: pointer;
  background: transparent;
  color: var(--color-white);
  text-transform: uppercase;
  font-family: var(--font-primary);
  font-size: 16px;
  transition: all 150ms linear;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &:active {
    background: rgba(255, 255, 255, 0.2);
  }
`;
