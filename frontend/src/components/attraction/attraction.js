const Attraction = ({props,attraction, addToTourPoints,creatorMode }) => {
    let isUserLogged = true;
    const handleClick = (e) => {
        e.preventDefault();
        addToTourPoints(attraction);
    };

    return <div>
        <img src={props.icon} alt={props.name}/>
        <span>{props.name}</span>
        {isUserLogged && creatorMode ? <button onClick={handleClick}>+</button> : ''}
    </div>
}

export default Attraction;