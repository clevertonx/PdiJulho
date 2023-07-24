import styled from "styled-components";

export const TableLine = styled.tr``;

export const TableColumn = styled.td`
    padding: 10px 0;
`;

export const Category = styled.div<{color: string}>`
    display: block;
    text-align: center;
    padding: 5px 10px;
    margin-right: 10px;
    border-radius: 5px;
    color: white;
    background-color: ${props => props.color};
`;

export const Value = styled.div<{color: string}>`
    color: ${props => props.color}
`;

export const Excluir = styled.div`
    button{
        background-color: red;
        border-radius: 100px;
        font-weight: bold;
        box-shadow: rgba(255, 0, 0, 0.35) 0 -25px 18px -14px inset, rgba(255, 0, 0, 0.25) 0 1px 2px,
        rgba(255, 0, 0, 0.25) 0 2px 4px, rgba(255, 0, 0, 0.25) 0 4px 8px, rgba(255, 0, 0, 0.25) 0 8px 5px,
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