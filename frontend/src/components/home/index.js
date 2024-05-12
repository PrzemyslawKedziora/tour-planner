import {Link} from "react-router-dom";
import {Container, InfoBar} from "./style";
import './style.css';
import NewTourForm from "../../new-tour/new-tour-form";

const Index = () =>{

    return(
        <Container>
            <InfoBar>
                {/*<Link to={'/'} className="link-class">Find Tour</Link>*/}
                {/*<Link to={'/tour'}>Log In</Link>*/}
                <p>Tour Scanner</p>
            </InfoBar>
                <NewTourForm/>
        </Container>
    )
}

export default Index;