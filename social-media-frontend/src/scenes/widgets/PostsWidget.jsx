import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import { fetchPosts, fetchUserPosts } from "../../api/api";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import PostWidget from "./PostWidget";
import LoadingSkeleton from "components/LoadingSkeleton";
import { Box } from "@mui/material";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const [isLoading, setIsLoading] = useState(true);
  const listRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    const req = isProfile ? fetchUserPosts(userId) : fetchPosts();
    req
      .then(({ data }) => dispatch(setPosts({ posts: data })))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [userId, isProfile]); // eslint-disable-line react-hooks/exhaustive-deps

  useGSAP(() => {
    if (!isLoading && posts.length > 0) {
      gsap.from(".post-card", {
        y: 20,
        opacity: 0,
        duration: 0.45,
        stagger: 0.08,
        ease: "power2.out",
      });
    }
  }, { dependencies: [isLoading], scope: listRef });

  if (isLoading) {
    return (
      <Box>
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
      </Box>
    );
  }

  return (
    <Box ref={listRef}>
      {posts.map(({
        _id,
        userId: postUserId,
        firstName,
        lastName,
        description,
        location,
        picturePath,
        userPicturePath,
        likes,
        comments,
      }) => (
        <Box key={_id} className="post-card">
          <PostWidget
            postId={_id}
            postUserId={postUserId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        </Box>
      ))}
    </Box>
  );
};

export default PostsWidget;
