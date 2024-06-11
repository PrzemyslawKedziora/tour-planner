import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: bisque;
    opacity: 0.8;
    width: 20vw;
    padding: 5px;
    max-width: 400px;
    border-radius: 10px;
    margin-bottom: 5px;
    p{
        text-shadow:none;
    }
`
export const Title = styled.p`
    font-size: 1.3rem;
    font-weight: bold;
`
export const Button = styled.button`
    font-size: 1.1rem;
    width: 12rem;
    color: bisque;
    margin-bottom: 5px;
    border-radius: 10px;
    transition: .3s ease-in-out;
    
`