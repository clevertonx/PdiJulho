import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: #fff;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

export const Message = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 100px;
`;

export const CancelButton = styled.button`
background-color: red;
border-radius: 100px;
font-weight: bold;
box-shadow: rgba(255, 0, 0, 0.35) 0 -25px 18px -14px inset, rgba(255, 0, 0, 0.25) 0 1px 2px,
rgba(255, 0, 0, 0.25) 0 2px 4px, rgba(255, 0, 0, 0.25) 0 4px 8px, rgba(255, 0, 0, 0.25) 0 8px 16px,
rgba(255, 0, 0, 0.25) 0 16px 32px;
color: white;
cursor: pointer;
display: inline-block;
font-family: CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif;
padding: 7px 20px;
text-align: center;
text-decoration: none;
transition: all 250ms;
border: 0;
font-size: 12px;
user-select: none;
-webkit-user-select: none;
touch-action: manipulation;
}
button:hover{
    box-shadow: rgba(255, 0, 0, 0.35) 0 -25px 18px -14px inset, rgba(255, 0, 0, 0.25) 0 1px 2px,
    rgba(255, 0, 0, 0.25) 0 2px 4px, rgba(255, 0, 0, 0.25) 0 4px 8px, rgba(255, 0, 0, 0.25) 0 8px 16px,
    rgba(255, 0, 0, 0.25) 0 16px 32px;
transform: scale(1.05) rotate(-1deg);
}
`;

