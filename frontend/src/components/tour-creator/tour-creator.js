import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, InfoBar, UserPanel } from "../home/style";
import NewTourForm from "../new-tour/new-tour-form";
import Sidebar from "../sidebar/sidebar";
import axiosInstance from "../../middlewares/axiosConfig";

const TourCreator = () => {
    const { tourId } = useParams();
    const [tourData, setTourData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(tourId,'id')
        const fetchTour = async () => {
            if (tourId) {
                try {
                    const response = await axiosInstance.get(`/tour/${tourId}`);
                    if (response.data.status) {
                        setTourData(response.data.data);
                    } else {
                        console.log('Tour not found or there was an error');
                    }
                } catch (error) {
                    console.error('Error fetching tour:', error);
                }
            }
        };

        fetchTour();
    }, [tourId]);

    return (
        <Container>
            <InfoBar>
                <Sidebar/>
                <p>Tour Creator</p>
            </InfoBar>
            <div style={{ display: "flex" }}>
                {tourId !== undefined ? (
                    tourData ? (
                        <NewTourForm creatorMode={true} editingTour={tourData} />
                    ) : (
                        <p>Loading tour data...</p>
                    )
                ) : (
                    <NewTourForm creatorMode={true} />
                )}
            </div>
        </Container>
    );
};

export default TourCreator;
