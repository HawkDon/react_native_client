class FetchFacade {
    register = (user) => {
        return fetch("http://192.168.0.3:3000/api/register", {
            method: 'POST',
            body: JSON.stringify(user),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
    }
}

export default new FetchFacade();