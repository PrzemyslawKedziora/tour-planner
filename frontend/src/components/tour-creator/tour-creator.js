import {Container, InfoBar, UserPanel} from "../home/style";
import NewTourForm from "../new-tour/new-tour-form";

const TourCreator = () =>{
    return <Container>
        <InfoBar>
            {/*<Link to={'/'} className="link-class">Find Tour</Link>*/}
            <p>Tour Creator</p>
            <UserPanel to={'/login'}>
                <i className="bi bi-person"></i>
            </UserPanel>
        </InfoBar>
        <div style={{display: "flex"}}>
            <NewTourForm creatorMode={true}/>
        </div>
    </Container>
}

export default TourCreator;