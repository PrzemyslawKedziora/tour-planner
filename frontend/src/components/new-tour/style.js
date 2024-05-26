import styled from "styled-components";

export const Input = styled.input`
    min-width: 8rem;
    height: 3rem;
    font-size: 1rem;
    border-radius: 10px;
    padding-left: 10px;
    margin-right: 5px;
`
export const Button = styled.button`
    min-width: 8rem;
    width: 12rem;
    height: 3.25rem;
    font-size: 1rem;
    border-radius: 10px;
    background-color: #23a5c7;
    transition: .3s ease-in-out;
    &:hover {
        background-color: #0b6f85;
        color: bisque;
        cursor: pointer;
    }
`
export const Form = styled.form`
`

export const CreatorContainer = styled.form`
    display: flex;
`