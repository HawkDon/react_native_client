// https://secure-anchorage-97919.herokuapp.com
class FetchFacade {
    register = (user) => {
        return fetch("https://secure-anchorage-97919.herokuapp.com/api/register", {
            method: 'POST',
            body: JSON.stringify(user),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
    }

    login = (jsonPackage) => {
        return fetch("https://secure-anchorage-97919.herokuapp.com/api/login", {
            method: 'POST',
            body: JSON.stringify(jsonPackage),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
    }

    getAllFriends = (user) => {
        return fetch("https://secure-anchorage-97919.herokuapp.com/api/allFriends", {
            method: 'POST',
            body: JSON.stringify(user),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
    }

    updateUserPos = (jsonPackage) => {
        return fetch("https://secure-anchorage-97919.herokuapp.com/api/updatePos", {
            method: 'POST',
            body: JSON.stringify(jsonPackage),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
    }

    getFriendsWithinRange = (jsonPackage) => {
        return fetch("https://secure-anchorage-97919.herokuapp.com/api/nearbyplayers", {
            method: 'POST',
            body: JSON.stringify(jsonPackage),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
    }
}

export default new FetchFacade();