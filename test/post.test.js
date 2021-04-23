const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");

// styling method
chai.should();

// middleware
chai.use(chaiHttp);

describe("Testing Post Controller", () => {
  describe("GET All Post", () => {
    it("Should return all posts", (done) => {
      chai
        .request(server)
        .get("/posts")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");

          done();
        });
    });

    it("Should not return all posts", (done) => {
      chai
        .request(server)
        .get("/post")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe("GET Single Post", () => {
    it("Should return Single Post", (done) => {
      const postId = "60632e9682e4e94cfd6d6fe0";
      chai
        .request(server)
        .get(`/posts/${postId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");

          done();
        });
    });

    it("Should not return Single Post", (done) => {
      const postId = "60632e9682e4e94cf";
      chai
        .request(server)
        .get(`/posts/${postId}`)
        .end((err, res) => {
          res.should.have.status(404);

          done();
        });
    });
  });

  describe("UPDATE single post", () => {
    it("Should Update a post", (done) => {
      const postId = "60632e9682e4e94cfd6d6fe0";
      const body = {
        content: "Updated First Post Content",
      };

      chai
        .request(server)
        .patch(`/posts/${postId}`)
        .send(body)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");

          done();
        });
    });
  });
});
