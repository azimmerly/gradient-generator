import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const bounceIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-200px) scale(0.5);
  }
  40% {
    transform: translateX(25px) scale(1.1);
  }
  60% {
    transform: translateX(-10px) scale(0.9);
  }
  80% {
    opacity: 1;
    transform: translateX(5px) scale(1.05);
  }
  100% {
    transform: translateX(0) scale(1);
  }
`;

const bounceOut = keyframes`
  20% {
    transform: scale(0.9);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
  100% {
    opacity: 0;
    transform: translateX(-100px) scale(0.3);
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 1rem 1.2rem;
  background: var(--color-white);
  position: absolute;
  left: 1rem;
  right: 1rem;
  bottom: 1rem;
  color: var(--color-black);
  border-radius: var(--border-radius);
  animation:
    ${bounceIn} 500ms linear,
    ${bounceOut} 250ms linear 2500ms forwards;

  @media (min-width: 420px) {
    right: auto;
  }

  svg {
    color: #03c988;
  }
`;
