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
        width: 40px;
        text-align: center;
        font-size: 15px;
        cursor: pointer;
    }
`;