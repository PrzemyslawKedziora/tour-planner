import { Button, Container, Title } from "./style";

const Tour = ({ _id, name, pointsToVisit, date, city, removeTour, goToUpdateTour }) => {
    return (
        <div>
            <Container>
                <Title>{name}</Title>
                <h4 style={{ marginBottom: "20px" }}>{city}</h4>
                {pointsToVisit.map((tourPoint, index) => (
                    <p key={index}>
                        {index + 1}.{tourPoint}
                    </p>
                ))}
                <Title>Date:</Title>
                <p>{new Date(date).toDateString()}</p>
                <Button style={{ background: "#154681" }} onClick={() => goToUpdateTour(_id)}>Edit tour</Button>
                <Button style={{ background: "#8a0606" }} onClick={() => removeTour(_id)}>Remove</Button>
            </Container>
        </div>
    );
};

export default Tour;
