import {Link, useNavigate} from "react-router-dom";
import './style.css';
import menuIcon from "../../assets/images/menuIcon.png";
import closeIcon from "../../assets/images/closeIcon.png";
import {useEffect} from "react";
const Sidebar = () => {
    const navigate = useNavigate();
    let isUserLoggedIn;

    useEffect(() => {
        sessionStorage.getItem('id').length > 5 ? isUserLoggedIn = true : isUserLoggedIn=false;
    }, []);

    const logOut = () =>{
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('key');
        sessionStorage.removeItem('city');
        navigate('/login');
    }

    return <div>
        <div className="page-container">
            <input type="checkbox" id="check"/>
            <label htmlFor="check">
                <i id="btn">
                    <img src={menuIcon} alt="open menu" width="50px" height="50px"/>
                </i>
                <i id="cancel">
                    <img src={closeIcon} alt="close menu" width="40px" height="40px"/>
                </i>
            </label>
            <div className="sidebar">
                <ul>
                    <li>
                        <Link to={'/'}>Check city</Link>
                    </li>
                    <li>
                        <Link to={'/tour-creator'}>Create Tour</Link>
                    </li>
                    <li>
                        <Link to={'/tours'}>Show tours</Link>
                    </li>
                    <li>
                        {isUserLoggedIn ? <Link to={'/login'}>Log In</Link> : <p onClick={()=>{logOut()}}>Log Out</p>}
                    </li>
                </ul>
            </div>
        </div>
    </div>
}
export default Sidebar;