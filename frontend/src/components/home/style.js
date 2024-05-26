import styled from "styled-components";
import {Link} from "react-router-dom";

export const Container = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    height: 100vh;
    font-size: 3rem;
    flex-direction: column;
    align-items: center;
    color: antiquewhite;
`
export const InfoBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 10px 20px;
`
export const UserPanel = styled(Link)`
    position: absolute;
    right: 20px;
    color: blue;
    text-decoration: none;
    transition: .2s ease-in-out;
    &:hover {
        color: aquamarine;
    }
`
export const AttractionsContainer = styled.div`
    color: #282c34;
    padding: 10px;
    margin-top: 20px;
    border-radius: 25px;
    overflow-y: auto;
    max-height: 75vh;

    p{
        text-shadow: none;
        font-weight: bold;
    }
    li{
        list-style-type: none;
    }
    img{
        padding: 0 10px;
    }

`
