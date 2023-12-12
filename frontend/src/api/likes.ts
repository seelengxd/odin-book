import client from "./base";

class LikeAPI {
  protected getLikeUrl(postId: number) {
    return `/api/posts/${postId}/likes/`;
  }

  public async createLike(postId: number) {
    const response = await client.post(this.getLikeUrl(postId));
    return response;
  }

  public async deleteLike(postId: number) {
    const response = await client.delete(this.getLikeUrl(postId));
    return response;
  }
}

const likeApi = new LikeAPI();

export default likeApi;
