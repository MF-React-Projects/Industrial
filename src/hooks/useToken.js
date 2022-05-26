import {useEffect, useState} from "react";

const useToken = user => {
    console.log(user)
    const [token, setToken] = useState('');
    useEffect(() => {
        const email = user?.user?.email;
        const currentUser = {name: user?.user?.displayName, email: email};
        if (email) {
            fetch(`http://localhost:5000/user/${email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + localStorage.getItem('accessToken')
                },
                body: JSON.stringify(currentUser)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    localStorage.setItem('accessToken', data.token);
                    setToken(data.token);
                })
        }
    }, [user])

    return [token];
}
export default useToken;