

const getAuth0Viewer = async (token: string) => {
    const body = {
        "client_id": process.env.CLIENT_ID,
        "client_secret": process.env.CLIENT_SECRET,
        "audience": "https://dph-test-auth.eu.auth0.com/api/v2/",
        "grant_type": "client_credentials"
    };

    const headers = {
        "Authorization": `Bearer ${token}`
    };

    const auth_url = 'https://dph-test-auth.eu.auth0.com/userinfo';


    return fetch(url, {headers});
};

export default getAuth0Viewer;