import Viewer from "./Viewer";
import PostData, { posts } from "../data/PostData";

const canSeePost = (viewer: Viewer, post: PostData) =>
  // viewer is posts author
  viewer.user_id === post.authorId

class Post {
    private _id: number;
    private _authorId: string;
    private _title: string | undefined;
    private constructor(data: PostData) {
        this._id = data.id;
        this._authorId = data.authorId;
        this._title = data.title;
    }


    get id() { return this._id };
    get authorId() {return this._authorId};
    get title() {return this._title};
    static gen(viewer: Viewer, id: number) {
        const post = posts.find(p => p.id === id);

        return post && canSeePost(viewer, post) ?
            new Post(post) :
            null;
    }
}

export default Post;