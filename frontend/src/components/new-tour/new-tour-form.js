import { useState, useEffect } from 'react';
import { Button, CreatorContainer, Form, Input } from "./style";
import { RiseLoader } from "react-spinners";
import { AttractionsContainer } from "../home/style";
import Attraction from "../attraction/attraction";
import { Capitalize } from "../../middlewares/functions";
import axiosInstance from "../../middlewares/axiosConfig";

const NewTourForm = ({ creatorMode, editingTour }) => {
    const [formData, setFormData] = useState({
        city: '',
        date: '',
        tourDate: '',
        tourName: ''
    });
    const [attractions, setAttractions] = useState([]);
    const [tourPoints, setTourPoints] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        if (editingTour) {
            setFormData({
                city: editingTour.city,
                date: editingTour.date,
                tourDate: editingTour.date,
                tourName: editingTour.name
            });
            if (Array.isArray(editingTour.pointsToVisit)) {
                setTourPoints(editingTour.pointsToVisit.map((name, index) => ({ id: index, name })));
            } else {
                console.error('pointsToVisit is not an array:', editingTour.pointsToVisit);
            }
            handleSubmit().then(()=>{
                setTourPoints(editingTour.pointsToVisit.map((name, index) => ({ id: index, name })));
                });

        }
    }, [editingTour]);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        if (event) event.preventDefault();
        setIsLoading(true);
        setTourPoints([]);
        try {
            const response = await axiosInstance.post('/attractions', {
                city: formData.city,
                date: formData.date
            });
            sessionStorage.setItem('city', formData.city);
            const data = response.data;
            let localCounter = counter;
            const attractionsWithId = data.results.map(record => ({
                ...record,
                id: localCounter++
            }));

            setCounter(localCounter);
            setAttractions(attractionsWithId);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const addToTourPoints = (attraction) => {
        attraction = { ...attraction, id: counter };
        setCounter(counter + 1);
        setTourPoints([...tourPoints, attraction]);
    };

    const removeFromTourPoints = (attractionId) => {
        setTourPoints(tourPoints.filter(point => point.id !== attractionId));
    }

    const addTrip = async () => {
        const userId = sessionStorage.getItem('id');
        const payload = {
            userId,
            name: formData.tourName,
            pointsToVisit: tourPoints.map(point => point.name),
            date: formData.tourDate,
            city: formData.city,
            tourDescription: 'Description here'
        };
        try {
            console.log(editingTour)
            if (editingTour) {
                await axiosInstance.put(`/tours/${userId}/${editingTour._id}`, payload);
            } else {
                await axiosInstance.post(`/tours/${userId}`, payload);
            }
        } catch (error) {
            console.error('Error creating/updating tour:', error);
        }
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Input type="text" name="city" placeholder="City to visit..." value={formData.city} onChange={handleChange} />
                <Button type='submit'>Search</Button>
            </Form>
            <ul>
                {isLoading ? <div>
                    <p>Loading attractions...</p>
                    <RiseLoader />
                </div> : (
                    <AttractionsContainer
                        style={attractions.length > 0 ? { background: "rgba(226, 227, 223, 0.75)" } : { background: "unset" }}>
                        <CreatorContainer>
                            <div>
                                {attractions.length > 0 && creatorMode ? <input type="text" name="tourName" value={formData.tourName} onChange={handleChange} placeholder="My best tour" /> : ''}
                                {attractions.length > 0 && creatorMode ? <input type="date" name="tourDate" value={formData.tourDate} onChange={handleChange} /> : ''}
                                {tourPoints.length > 0 && tourPoints.map((point, index) => (
                                    <div key={index}>
                                        {point.name + ', ' + Capitalize(formData.city)}
                                        <button type="button" onClick={() => removeFromTourPoints(point.id)}>-</button>
                                    </div>
                                ))}
                                {attractions.length > 0 && tourPoints.length > 0 && creatorMode ? <button type="submit" onClick={addTrip}>Set trip!</button> : ''}
                            </div>
                            <div>
                                <p>{attractions.length > 0 ? 'List of Attractions' : ''}</p>
                                {attractions.map(attraction => (
                                    <Attraction key={attraction.id} attraction={attraction}
                                                addToTourPoints={addToTourPoints} creatorMode={creatorMode} />
                                ))}
                            </div>
                        </CreatorContainer>
                    </AttractionsContainer>
                )}
            </ul>
        </div>
    );
}

export default NewTourForm;
