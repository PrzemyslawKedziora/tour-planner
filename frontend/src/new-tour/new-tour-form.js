import { useState } from 'react';
import { Button, Form, Input } from "./style";

const NewTourForm = () => {
    const [formData, setFormData] = useState({
        city: '',
        date: '',
        numOfTravelers: ''
    });
    const [attractions, setAttractions] = useState([]);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

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
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Input type="text" name="city" placeholder="City to visit..." value={formData.city} onChange={handleChange} />
                <Input type="date" name="date" value={formData.date} onChange={handleChange} />
                <Input type="number" name="numOfTravelers" placeholder="Number of travelers..." value={formData.numOfTravelers} onChange={handleChange} />
                <Button type='submit'>Search</Button>
            </Form>

            {/* Wyświetlanie atrakcji */}
            <ul>
                {attractions.map(attraction => (
                    <li key={attraction.id}>{attraction.formatted_address}</li>
                ))}
            </ul>
        </div>
    );
}

export default NewTourForm;