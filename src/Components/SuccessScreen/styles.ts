// Components/SuccessScreen/styles.ts
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  text-align: center;
`;

export const StickerPreview = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const ClipboardButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: #25d366;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #128c7e;
  }

  &:active {
    background: #0e6e5e;
  }
`;
