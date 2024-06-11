const Attraction = ({attraction, addToTourPoints,creatorMode }) => {
    let isUserLogged = true;
    const handleClick = (e) => {
        e.preventDefault();
        addToTourPoints(attraction);
    };

    return <div>
        <img src={attraction.icon} alt={attraction.name}/>
        <span>{attraction.name}</span>
        {isUserLogged && creatorMode ? <button onClick={handleClick}>+</button> : ''}
    </div>
}

export default Attraction;