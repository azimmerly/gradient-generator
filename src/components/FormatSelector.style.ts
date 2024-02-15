import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  align-items: center;
  border-radius: var(--border-radius);
  border: 2px solid var(--color-white);
  height: 2rem;
  z-index: 10;
`;

export const Input = styled.input`
  display: none;

  &:checked + label {
    color: var(--color-black);
    background: var(--color-white);
  }
`;

export const Label = styled.label`
  cursor: pointer;
  background: transparent;
  padding: 6px 12px;
  transition: all 150ms linear;

  &:hover,
  &:focus {
    background: rgba(255, 255, 255, 0.1);
  }

  &:not(:last-of-type) {
    border-right: 2px solid var(--color-white);
  }
`;
