const NewTourForm = () =>{
    return(
        <div>
        <form>
            <input type="text" placeholder="Destination city"/>
            <input type="date" placeholder="Tour date"/>
            <input type="number" placeholder="Travellers"/>
            <button type='submit'>Search</button>
        </form>
        </div>
    )
}

export default NewTourForm;