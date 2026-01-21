# posts-api
Create api for posts using node and mongoose 

## Assignment Requirements

This API implements the following endpoints:

### Posts API
1. **Add a New Post** - `POST /post` - Allows a user to add a new post to the database
2. **Get All Posts** - `GET /post` - Returns all posts in the database as a JSON array
3. **Get a Post by ID** - `GET /post/<post_id>` - Returns the post with the specified ID
4. **Get Posts by Sender** - `GET /post?senderId=<sender_id>` - Returns all posts published by a specific sender
5. **Update a Post** - `PUT /post/<post_id>` - Updates a post with new data using JSON body
6. **Delete a Post** - `DELETE /post/<post_id>` - Removes a post from the database

### Comments API (Full CRUD)
1. **Create a Comment** - `POST /post-comment` - Add a comment to a post
2. **Get All Comments** - `GET /post-comment` - Returns all comments
3. **Get Comments by Post** - `GET /post-comment?postId=<post_id>` - Returns all comments for a specific post
4. **Get a Comment by ID** - `GET /post-comment/<comment_id>` - Returns a specific comment
5. **Update a Comment** - `PUT /post-comment/<comment_id>` - Updates a comment
6. **Delete a Comment** - `DELETE /post-comment/<comment_id>` - Removes a comment

## Data Models

### Post
- **_id** (ObjectId, auto-generated): Unique identifier for the post
- **title** (String, required): Title of the post
- **content** (String, required): Content of the post
- **senderId** (String, required): User ID of the post author
- **publishedAt** (Date, auto-generated): Timestamp when the post was created

### Comment
- **_id** (ObjectId, auto-generated): Unique identifier for the comment
- **message** (String, required): Comment message
- **postId** (String, required): ID of the post being commented on
- **writerId** (String, required): User ID of the comment author
- **publishedAt** (Date, auto-generated): Timestamp when the comment was created

## Testing

All API endpoints are documented in `src/tests/requests.rest` file for testing with REST clients.
