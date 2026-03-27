import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme, TextField, Button } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setPosts } from "state";
import { toggleLike, commentOnPost, deletePost } from "../../api/api";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import toast from "react-hot-toast";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.user._id);
  const posts = useSelector((state) => state.posts);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const heartRef = useRef(null);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const patchLike = async () => {
    // GSAP bounce on like
    gsap.fromTo(
      heartRef.current,
      { scale: 1.5 },
      { scale: 1, duration: 0.35, ease: "back.out(2)" }
    );
    try {
      const { data } = await toggleLike(postId);
      dispatch(setPost({ post: data }));
    } catch {
      toast.error("Failed to update like");
    }
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;
    try {
      const { data } = await commentOnPost(postId, commentText.trim());
      dispatch(setPost({ post: data }));
      setCommentText("");
    } catch {
      toast.error("Failed to add comment");
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(postId);
      dispatch(setPosts({ posts: posts.filter((p) => p._id !== postId) }));
      toast.success("Post deleted");
    } catch {
      toast.error("Failed to delete post");
    }
  };

  return (
    <WidgetWrapper sx={{ mb: "1.25rem" }}>
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />

      <Typography color={main} sx={{ mt: "1rem", lineHeight: 1.6 }}>
        {description}
      </Typography>

      {picturePath && (
        <Box
          component="img"
          src={`${import.meta.env.VITE_API_BASE_URL}/assets/${picturePath}`}
          alt="post"
          sx={{
            width: "100%",
            height: "auto",
            borderRadius: "12px",
            mt: "0.85rem",
            objectFit: "cover",
            maxHeight: "400px",
          }}
        />
      )}

      <FlexBetween mt="0.85rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton
              ref={heartRef}
              onClick={patchLike}
              sx={{
                color: isLiked ? palette.secondary.main : medium,
                transition: "color 0.2s ease",
                "&:hover": { color: palette.secondary.main },
              }}
            >
              {isLiked ? (
                <FavoriteOutlined sx={{ fontSize: "20px" }} />
              ) : (
                <FavoriteBorderOutlined sx={{ fontSize: "20px" }} />
              )}
            </IconButton>
            <Typography color={medium} fontSize="0.85rem">{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton
              onClick={() => setIsComments(!isComments)}
              sx={{ color: medium, "&:hover": { color: palette.primary.main } }}
            >
              <ChatBubbleOutlineOutlined sx={{ fontSize: "20px" }} />
            </IconButton>
            <Typography color={medium} fontSize="0.85rem">{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween gap="0.5rem">
          <IconButton sx={{ color: medium, "&:hover": { color: palette.primary.main } }}>
            <ShareOutlined sx={{ fontSize: "20px" }} />
          </IconButton>
          {postUserId === loggedInUserId && (
            <IconButton
              onClick={handleDelete}
              sx={{ color: medium, "&:hover": { color: palette.secondary.main } }}
            >
              <DeleteOutlined sx={{ fontSize: "20px" }} />
            </IconButton>
          )}
        </FlexBetween>
      </FlexBetween>

      {isComments && (
        <Box mt="0.75rem">
          <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mb: "0.75rem" }} />
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`} mb="0.5rem">
              <Typography
                sx={{
                  color: main,
                  pl: "1rem",
                  py: "0.4rem",
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                }}
              >
                {comment}
              </Typography>
            </Box>
          ))}
          <FlexBetween gap="0.75rem" mt="0.75rem">
            <TextField
              fullWidth
              size="small"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleComment()}
              sx={{
                "& .MuiOutlinedInput-root": {
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: "10px",
                  color: main,
                  fontSize: "0.875rem",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                  "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                  "&.Mui-focused fieldset": { borderColor: palette.primary.main },
                },
              }}
            />
            <Button
              onClick={handleComment}
              disabled={!commentText.trim()}
              sx={{
                background: palette.primary.main,
                color: "#fff",
                borderRadius: "10px",
                px: "1rem",
                py: "0.5rem",
                fontSize: "0.8rem",
                fontWeight: 600,
                whiteSpace: "nowrap",
                "&:hover": { background: palette.primary.dark },
                "&:disabled": { opacity: 0.5 },
              }}
            >
              Post
            </Button>
          </FlexBetween>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
