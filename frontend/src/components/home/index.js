import "bootstrap-icons/font/bootstrap-icons.css";
import {Container, InfoBar, UserPanel} from "./style";
import './style.css';
import NewTourForm from "../new-tour/new-tour-form";
import {Link} from "react-router-dom";

const Index = () =>{

    return(
        <Container>
            <InfoBar>
                <Link to={'/tour-creator'} className="link-class">Create tour</Link>
                <p>Tour Scanner</p>
                <UserPanel to={'/login'}>
                    <i className="bi bi-person"></i>
                </UserPanel>
            </InfoBar>
            <NewTourForm creatorMode={false}/>
        </Container>
    )
}

export default Index;