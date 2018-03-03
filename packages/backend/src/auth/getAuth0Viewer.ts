

const getAuth0Viewer = async (token: string) => {
    const headers = {
        "Authorization": `Bearer ${token}`
    };

    const auth_url = 'https://dph-test-auth.eu.auth0.com/userinfo';


    const response = await fetch(auth_url, {headers});

    return response.json()
};

export default getAuth0Viewer;