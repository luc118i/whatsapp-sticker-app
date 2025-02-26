import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 200px;
  margin: auto;
  margin-top: 20vh;
  border: 2px dashed #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    border-color: #777;
    background-color: #f0f0f0;
  }
`;

export const UploadIcon = styled.div`
  font-size: 40px;
  color: #555;
  margin-bottom: 10px;
`;

export const Message = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: #333;
  font-family: "Arial", sans-serif;
`;
export const ErrorMessage = styled.p`
  font-size: 14px;
  color: #d9534f;
  margin-top: 10px;
  font-weight: bold;
  text-align: center;
`;
