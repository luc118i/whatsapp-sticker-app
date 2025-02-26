// Components/ConfigScreen/styles.ts
import styled from "styled-components";

interface ButtonProps {
  $primary?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
`;

export const PreviewWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
`;

export const ControlsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 300px;
  margin: 0 auto;
`;

export const Button = styled.button<ButtonProps>`
  background-color: ${({ $primary }) => ($primary ? "#007BFF" : "#6c757d")};
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ $primary }) => ($primary ? "#0056b3" : "#5a6268")};
  }
`;

export const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: #fff;
  border-radius: 4px;
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  display: grid;
  place-items: center;
`;

export const ErrorMessage = styled.div`
  position: absolute;
  bottom: 0;
  background: #ff4444;
  color: white;
  padding: 0.5rem;
  width: 100%;
  text-align: center;
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const BorderOverlay = styled.div`
  position: absolute;
  inset: 0;
  border: 16px solid white;
  pointer-events: none;
`;
