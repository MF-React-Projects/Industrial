import {useEffect, useState} from "react";

const useAdmin = user => {
    const [admin, setAdmin] = useState(false);
    const [adminLoading, setAdminLoading] = useState(true);
    useEffect(() => {
        const email = user?.email;
        if (email) {
            fetch(`http://localhost:5000/admin/${email}`,{
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(res => {
                    setAdmin(res.admin);
                    setAdminLoading(false);
                })
                .catch(err => console.log(err));
        }
    }, [user]);

    return [admin, adminLoading];
}
export default useAdmin;