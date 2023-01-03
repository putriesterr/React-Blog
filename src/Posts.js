import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Posts(props) {
  const [posts, setPosts] = useState([]);
  const { postId } = useParams();
  const { name } = useParams();
  const [active, setActive] = useState(false);
  const [unactive, setUnActive] = useState(false);

  // const numberOfLikes = 0;

  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  // const likeCountOrigin = numberOfLikes;
  // const dislikeCountOrigin = numberOfLikes;

  const handleLikeClick = () => {
    setActive(!active);
    setLikeCount(likeCount + 1);
    if (active === true) {
      setLikeCount(likeCount - 1);
    }
    if (unactive === true) {
      setUnActive(false);
      setDislikeCount(dislikeCount - 1);
    }
  };

  const handleDislikeClick = () => {
    setUnActive(!unactive);
    setDislikeCount(dislikeCount + 1);
    setLikeCount(likeCount);
    if (unactive === true) {
      setDislikeCount(dislikeCount - 1);
    }
    if (active === true) {
      setActive(false);
      setLikeCount(likeCount - 1);
    }
  };

  useEffect(() => {
    let uri = "posts/";
    if (postId) uri += postId;
    if (name) uri += "author/" + name;

    fetch(props.apiUrl + uri)
      .then((response) => response.json())
      .then((response) => {
        setPosts(response);
        setLikeCount(response[0].likes);
        setDislikeCount(response[0].dislike);
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
          <p id="text-body">{post.text}</p>
          <button
            id="thumbs-up"
            style={{ backgroundColor: active ? "#BFEAF5" : "white" }}
            onClick={handleLikeClick}
          >
            <i
              class="fa fa-thumbs-up"
              style={{ color: active ? "black" : "salmon" }}
            >
              {likeCount}
            </i>
          </button>
          <button
            id="thumb-down"
            style={{ backgroundColor: unactive ? "pink" : "white" }}
            onClick={handleDislikeClick}
          >
            <i
              class="fa fa-thumbs-down"
              style={{ color: unactive ? "black" : "salmon" }}
            >
              {dislikeCount}
            </i>
          </button>
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
