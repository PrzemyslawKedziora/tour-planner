import "bootstrap-icons/font/bootstrap-icons.css";
import {Container, InfoBar} from "./style";
import NewTourForm from "../new-tour/new-tour-form";
import Sidebar from "../sidebar/sidebar";

const Index = () =>{

    return(
        <Container>
            <InfoBar>
                <Sidebar/>
                <p>Tour Scanner</p>
            </InfoBar>
            <NewTourForm creatorMode={false}/>
        </Container>
    )
}

export default Index;