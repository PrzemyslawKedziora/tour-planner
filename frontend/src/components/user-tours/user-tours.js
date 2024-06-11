import { useEffect, useState } from "react";
import axios from "axios";
import Tour from "../tour/tour";
import {Container, ToursContainer} from "./style";

const UserTours = () => {
    const [tours, setTours] = useState([]);

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const userId = sessionStorage.getItem('id');
                const response = await axios.get(`http://localhost:5000/tours/${userId}`);
                if (response.data.status) {
                    setTours(response.data.data);
                } else {
                    console.log('No tours found or there was an error');
                }
            } catch (error) {
                console.error('Error fetching tours:', error);
            }
        };
        fetchTours();
    }, []);
    useEffect(() => {
    }, [tours]);
    const removeTour = async (tourId) => {
        const userId = sessionStorage.getItem('id')
        const response = await axios.delete(`http://localhost:5000/tours/${userId}/${tourId}`);
        const data = response.data;
        setTours(tours.filter(tour => tour._id !== tourId));
    }


    return (
        <Container>
            <p>My tours</p>
           <ToursContainer>
               {tours.length > 0 ? (
                   tours.map(tour => (
                       <Tour key={tour._id} {...tour} removeTour={removeTour} />
                   ))
               ) : (
                   <p>No tours available</p>
               )}
           </ToursContainer>
        </Container>
    );
};

export default UserTours;

