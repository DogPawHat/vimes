import Viewer from "./Viewer";
import Post from "./Post";
import PostData, { posts } from "../data/PostData";

const getPostsByAuthorId = (viewer: Viewer, authorId: string) => 
    posts.filter(p => p.authorId === authorId)
        .map(p => p.id)
        .map(id => Post.gen(viewer, id));

class PostsByAuthor {
    static gen(viewer: Viewer, authorId: string) {
        return posts.filter(p => p.authorId === authorId)
            .map(p => p.id)
            .map(id => Post.gen(viewer, id));
    }
}

export default PostsByAuthor;