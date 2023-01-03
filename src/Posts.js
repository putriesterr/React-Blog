import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Posts(props) {
  const [posts, setPosts] = useState([]);
  const { postId } = useParams();
  const { name } = useParams();
  const [active, setActive] = useState(false);
  const [unactive, setUnActive] = useState(false);

  const [likeCount, setLikeCount] = useState(50);
  const [dislikeCount, setDislikeCount] = useState(25);

  const [activeBtn, setActiveBtn] = useState("none");

  const handleClick = () => {
    setActive(!active);
  };

  const handleUnClick = () => {
    setUnActive(!unactive);
  };

  const handleLikeClick = () => {
    if (activeBtn === "none") {
      setLikeCount(likeCount + 1);
      setActiveBtn("like");
      return;
    }

    if (activeBtn === 'like') {
      setLikeCount(likeCount - 1);
      setActiveBtn("none");
      return;
    }

    if (activeBtn === "dislike") {
      setLikeCount(likeCount + 1);
      setDislikeCount(dislikeCount - 1);
      setActiveBtn("like");
    }
  };

  const handleDisikeClick = () => {
    if (activeBtn === "none") {
      setDislikeCount(dislikeCount + 1);
      setActiveBtn("dislike");
      return;
    }

    if (activeBtn === 'dislike') {
      setDislikeCount(dislikeCount - 1);
      setActiveBtn("none");
      return;
    }

    if (activeBtn === "like") {
      setDislikeCount(dislikeCount + 1);
      setLikeCount(likeCount - 1);
      setActiveBtn("dislike");
    }
  };

  useEffect(() => {
    let uri = "posts/";
    if (postId) uri += postId;
    if (name) uri += "author/" + name;

    fetch(props.apiUrl + uri)
      .then((response) => response.json())
      .then((response) => {
        setPosts(response)
        setLikeCount(response[0].likes)
        setDislikeCount(response[0].dislike)
      });
  }, [postId, name]);

  return (
    <span key={name}>
      {posts.map((post) => (
        <section key={post._id.$oid}>
          <header className="main">
            <h1>{post.title}</h1>
          </header>
          <h3>{post.resume}</h3>
          <p>{post.text}</p>
          <div className="container">
            <div className="btn-container">
              <button
                className={`btn ${activeBtn === "like" ? "like-active" : ""}`}
                onClick={handleLikeClick}
                Style={{ border: "1 px solid white" }}
              >
                <i class="fa fa-thumbs-up"></i>
                {likeCount}
              </button>

              <button
                className={`btn ${activeBtn === "dislike" ? "dislike-active" : ""}`}
                onClick={handleDisikeClick}
                Style={{ border: "1 px solid white" }}
              >
                <i class="fa fa-thumbs-down"></i>
                {dislikeCount}
              </button>
            </div>
          </div>
          <h4>Related Links</h4>
          <ul className="alt">
            {post.relatedlinks.map((link, index) => (
              <li key={index}>{link}</li>
            ))}
          </ul>
          <h4>Tags</h4>
          <ul>
            {post.tags.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
          <h4>Author</h4>
          <p>{post.author}</p>
        </section>
      ))}
      <p>
        <Link to="/">Back to Home Page</Link>
      </p>
    </span>
  );
}