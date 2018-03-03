import Viewer from './Viewer';

interface UserData {
    id: string;
    firstName: string;
    lastName: string;
}

const authors: UserData[] = [
    { 
        id: 'google-oauth2|102506641910834945276',
        firstName: 'Ciarán',
        lastName: 'Curley'
    }
];


const canSeeUser = (viewer: Viewer, user: UserData) =>
  // viewer is posts author
  viewer.user_id === user.id

export default class User {
    private _id: string;
    private _firstName: string;
    private _lastName: string;
    private constructor(data: UserData) {
        this._id = data.id;
        this._firstName = data.firstName;
        this._lastName = data.lastName;
    }


    get id() { return this._id };
    get firstName() {return this._firstName};
    get lastName() {return this._lastName};
    static gen(viewer: Viewer, id: string) {
        const data = authors.find(a => a.id === id);
    
        return data && canSeeUser(viewer, data) ? 
            new User(data) :
            null;
    };
}
