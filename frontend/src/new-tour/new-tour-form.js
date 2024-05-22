import { useState } from 'react';
import {Button, CreatorContainer, Form, Input} from "./style";
import {RiseLoader} from "react-spinners";
import {AttractionsContainer} from "../components/home/style";
import Attraction from "../components/attraction/attraction";

const NewTourForm = ({creatorMode}) => {
    const [formData, setFormData] = useState({
        city: '',
        date: '',
        numOfTravelers: ''
    });
    const [attractions, setAttractions] = useState([]);
    const [tourPoints, setTourPoints] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            console.log(formData);
            const response = await fetch('http://localhost:5000/attractions',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    city: formData.city,
                    date: formData.date,
                    visitors: formData.numOfTravelers
                })
            });
            const data = await response.json();
            console.log(data);
            setAttractions([])

            if (!response.ok) {
                throw new Error('An error has occured during fetching data.Please, try again.');
            }

            setAttractions(data.results);
        } catch (error) {
            console.error(error);
        }
        finally {
            setIsLoading(false);
        }
    };
    const addToTourPoints = (attraction) => {
        setTourPoints([...tourPoints, attraction]);
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
                    <RiseLoader/>
                </div> : (

                    <AttractionsContainer
                        style={attractions.length > 0 ? {background: "rgba(226, 227, 223, 0.75)"} : {background: "unset"}}>
                        <CreatorContainer>
                            <div>
                                {attractions.length > 0 && creatorMode ? <p>Wycieczka</p> : ''}
                                {tourPoints.map(point => (
                                <div>
                                    {point.name}
                                </div>
                            ))}
                            </div>
                            <div>
                                <p>{attractions.length > 0 ? 'List of Attractions' : ''}</p>
                                {attractions.map(attraction => (
                                    <Attraction key={attraction.id} props={attraction} attraction={attraction}
                                                addToTourPoints={addToTourPoints} creatorMode={creatorMode}/>
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