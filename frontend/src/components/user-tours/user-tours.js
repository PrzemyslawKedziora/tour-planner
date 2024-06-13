import { useEffect, useState } from "react";
import Tour from "../tour/tour";
import NewTourForm from "../new-tour/new-tour-form";
import { Container, ToursContainer } from "./style";
import Sidebar from "../sidebar/sidebar";
import {InfoBar} from "../home/style";
import axiosInstance from "../../middlewares/axiosConfig";

const UserTours = () => {
    const [tours, setTours] = useState([]);
    const [editingTour, setEditingTour] = useState(null);

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const userId = sessionStorage.getItem('id');
                const response = await axiosInstance.get(`/tours/${userId}`);
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

    const removeTour = async (tourId) => {
        const userId = sessionStorage.getItem('id')
        await axiosInstance.delete(`/tours/${userId}/${tourId}`);
        setTours(tours.filter(tour => tour._id !== tourId));
    };

    const goToUpdateTour = (tourId) => {
        const tour = tours.find(t => t._id === tourId);
        setEditingTour(tour);
    };

    const clearEditingTour = () => {
        setEditingTour(null);
    };

    return (
        <Container>
            <InfoBar>
                <Sidebar/>
                <p>My tours</p>
            </InfoBar>
            {editingTour ? (
                <NewTourForm
                    creatorMode={true}
                    editingTour={editingTour}
                    clearEditingTour={clearEditingTour}
                />
            ) : (
                <ToursContainer>
                    {tours.length > 0 ? (
                        tours.map(tour => (
                            <Tour
                                key={tour._id}
                                {...tour}
                                removeTour={removeTour}
                                goToUpdateTour={goToUpdateTour}
                            />
                        ))
                    ) : (
                        <p>No tours available</p>
                    )}
                </ToursContainer>
            )}
        </Container>
    );
};

export default UserTours;
