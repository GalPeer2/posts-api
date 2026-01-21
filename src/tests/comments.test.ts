import request from "supertest";
import intApp from "../index";
import Comments from "../model/commentModel";
import { Express } from "express";

type PostComment = {
  message: string;
  postId: string;
  writerId: string;
  publishedAt?: Date;
  _id?: string;
};

var testData: PostComment[] = [
  { message: "Great post!", postId: "post1", writerId: "user1" },
  { message: "Loved it!", postId: "post1", writerId: "user4" },
  { message: "Not bad.", postId: "post2", writerId: "user2" },
  { message: "Worst post ever.", postId: "post2", writerId: "user1" },
  { message: "Could be better.", postId: "post3", writerId: "user3" },
];

let app: Express;
beforeAll(async () => {
  app = await intApp();
  await Comments.deleteMany({});
});

afterAll((done) => {
  done();
});

describe("Post Comments API", () => {
  test("test get all empty db", async () => {
    console.log("Test is running");
    const response = await request(app).get("/post-comment");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  test("test post comment", async () => {
    //add all comments from testData
    for (const comment of testData) {
      const response = await request(app).post("/post-comment").send(comment);
      expect(response.statusCode).toBe(201);
      expect(response.body).toMatchObject(comment);
    }
  });

  test("test get comments after post", async () => {
    const response = await request(app).get("/post-comment");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(testData.length);
  });

  test("test get comments with filter", async () => {
    const comment = testData[0];
    const response = await request(app).get(
      "/post-comment?postId=" + comment.postId
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);

    const comment2 = testData[4];
    const response2 = await request(app).get(
      "/post-comment?postId=" + comment2.postId
    );
    expect(response2.statusCode).toBe(200);
    expect(response2.body.length).toBe(1);
    testData[4]._id = response2.body[0]._id;
  });

  test("test get comment by id", async () => {
    const response = await request(app).get("/post-comment/" + testData[4]._id);
    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(testData[4]._id);
  });

  test("test put comment by id", async () => {
    testData[4].message = "this is the new text";
    const response = await request(app)
      .put("/post-comment/" + testData[4]._id)
      .send(testData[4]);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(testData[4].message);
  });

  test("test delete comment by id", async () => {
    const response = await request(app).delete("/post-comment/" + testData[4]._id);
    expect(response.statusCode).toBe(200);

    const getResponse = await request(app).get("/post-comment/" + testData[4]._id);
    expect(getResponse.statusCode).toBe(404);
  });
});
