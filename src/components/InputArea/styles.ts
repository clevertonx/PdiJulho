import styled from "styled-components";

export const Container = styled.div`
    background-color: #FFF;
    box-shadow: 0px 0px 5px #CCC;
    border-radius: 10px;
    padding: 20px;
    margin-top: 20px
`;

export const Input = styled.div`
    display: inline-block;
    padding: 5px 23px;
    input {
      box-shadow: 3px 2px 3px 2px #CCC;
      height: 25px;
      width: 150px;
      border: none;
      border-radius: 5px;
    }
    select{
        box-shadow: 3px 2px 3px 2px #CCC;
        height: 25px;
        width: 150px;
        border: none;
        border-radius: 5px;
    }
    button{
        background-color: #4169E1;
        border-radius: 100px;
        font-weight: bold;
        box-shadow: rgba(65, 105, 225, 0.35) 0 -25px 18px -14px inset, rgba(65, 105, 225, 0.25) 0 1px 2px,
        rgba(65, 105, 225, 0.25) 0 2px 4px, rgba(65, 105, 225, 0.25) 0 4px 8px, rgba(65, 105, 225, 0.25) 0 8px 16px,
        rgba(65, 105, 225, 0.25) 0 16px 32px;
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
        box-shadow: rgba(65, 105, 225, 0.35) 0 -25px 18px -14px inset, rgba(65, 105, 225, 0.25) 0 1px 2px,
        rgba(65, 105, 225, 0.25) 0 2px 4px, rgba(65, 105, 225, 0.25) 0 4px 8px, rgba(65, 105, 225, 0.25) 0 8px 16px,
        rgba(65, 105, 225, 0.25) 0 16px 32px;
  transform: scale(1.05) rotate(-1deg);
    }
`;