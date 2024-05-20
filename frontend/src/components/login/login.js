import {useState} from "react";

const Login = () => {
    const [formData,setFormData] = useState({
        login:'',
        password:''
    })

    const logIn = () =>{
        const response = fetch('http://localhost:5000/login',{
            method:'POST',
            body: JSON.stringify({
                login: formData.login,
                password: formData.password
            })
        })
    }
    return <div>
        <form action={logIn}>
            <div>
                <input type="text" name="login" value={formData.login}/>
            </div>
            <div>
                <input type="text" name="password" value={formData.password}/>
            </div>
            <button type="submit">Log in</button>
        </form>
    </div>
}
export default Login;