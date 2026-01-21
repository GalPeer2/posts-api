import request from "supertest";
import intApp from "../index";
import Posts from "../model/postModel";
import { Express } from "express";

type Post = {
  title: string;
  content: string;
  senderId: string;
  publishedAt?: Date;
  _id?: string;
};
var testData: Post[] = [
  { title: "Post A", content: "Content A", senderId: "user1" },
  { title: "Post B", content: "Content B", senderId: "user2" },
  { title: "Post C", content: "Content C", senderId: "user3" },
];

let app: Express;
beforeAll(async () => {
  app = await intApp();
  await Posts.deleteMany({});
});

afterAll((done) => {
  done();
});

describe("Posts API", () => {
  test("test get all empty db", async () => {
    console.log("Test is running");
    const response = await request(app).get("/post");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  test("test post post", async () => {
    //add all posts from testData
    for (const post of testData) {
      const response = await request(app).post("/post").send(post);
      expect(response.statusCode).toBe(201);
      expect(response.body).toMatchObject(post);
    }
  });

  test("test get posts after post", async () => {
    const response = await request(app).get("/post");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(testData.length);
  });

  test("test get posts with filter", async () => {
    const post = testData[0];
    const response = await request(app).get(
      "/post?title=" + post.title
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].title).toBe(post.title);
    testData[0]._id = response.body[0]._id;
  });

  test("test get post by id", async () => {
    const response = await request(app).get("/post/" + testData[0]._id);
    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(testData[0]._id);
  });

  test("test put post by id", async () => {
    testData[0].content = "Updated content";
    const response = await request(app)
      .put("/post/" + testData[0]._id)
      .send(testData[0]);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(testData[0].title);
    expect(response.body.content).toBe(testData[0].content);
  });

  test("test delete post by id", async () => {
    const response = await request(app).delete("/post/" + testData[0]._id);
    expect(response.statusCode).toBe(200);

    const getResponse = await request(app).get("/post/" + testData[0]._id);
    expect(getResponse.statusCode).toBe(404);
  });
});
