
export default interface PostData {
    id: number;
    authorId: string;
    title?: string;
}

export const posts: PostData[] = [
    {
        id: 1,
        authorId: 'google-oauth2|102506641910834945276',
        title: 'Introduction to GraphQL'
    },
    { 
        id: 2,
        authorId: 'google-oauth2|102506641910834945276',
        title: 'Welcome to Meteor'
    },
    {
        id: 3,
        authorId: 'google-oauth2|102506641910834945276',
        title: 'Advanced GraphQL'
    },
    { 
        id: 4,
        authorId: 'google-oauth2|102506641910834945276',
        title: 'Launchpad is Cool'
    },
  ];