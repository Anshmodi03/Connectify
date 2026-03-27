import {
  EditOutlined,
  DeleteOutlined,
  ImageOutlined,
  GifBoxOutlined,
  AttachFileOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import { createPost } from "../../api/api";
import toast from "react-hot-toast";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    if (!post.trim() && !image) return;
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("userId", _id);
      formData.append("description", post);
      if (image) formData.append("picture", image);

      const { data } = await createPost(formData);
      dispatch(setPosts({ posts: data }));
      setImage(null);
      setPost("");
      setIsImage(false);
      toast.success("Post shared!");
    } catch {
      toast.error("Failed to create post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const actionIconSx = {
    color: mediumMain,
    transition: "color 0.2s ease",
    "&:hover": { color: palette.primary.main },
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} size="45px" />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          multiline
          maxRows={4}
          sx={{
            width: "100%",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            padding: "0.75rem 1.25rem",
            color: palette.neutral.dark,
            fontSize: "0.9rem",
            "&:focus-within": {
              border: `1px solid ${palette.primary.main}`,
              background: "rgba(94,106,210,0.06)",
            },
            transition: "all 0.2s ease",
          }}
        />
      </FlexBetween>

      {isImage && (
        <Box
          mt="1rem"
          sx={{
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "10px",
            p: "0.85rem",
          }}
        >
          <Dropzone
            acceptedFiles={{ "image/*": [".jpg", ".jpeg", ".png"] }}
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  sx={{
                    border: `2px dashed ${palette.primary.main}`,
                    borderRadius: "8px",
                    p: "0.75rem 1rem",
                    width: "100%",
                    cursor: "pointer",
                    background: "rgba(94,106,210,0.05)",
                    "&:hover": { background: "rgba(94,106,210,0.1)" },
                    transition: "background 0.2s ease",
                  }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <Typography color={medium} fontSize="0.875rem" textAlign="center">
                      Drop image here or click to upload
                    </Typography>
                  ) : (
                    <FlexBetween>
                      <Typography color={palette.neutral.dark} fontSize="0.875rem">
                        {image.name}
                      </Typography>
                      <EditOutlined sx={{ color: palette.primary.main, fontSize: "18px" }} />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton onClick={() => setImage(null)} sx={{ ml: "0.5rem", color: medium }}>
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0", borderColor: "rgba(255,255,255,0.08)" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)} sx={{ cursor: "pointer" }}>
          <ImageOutlined sx={actionIconSx} />
          <Typography sx={{ ...actionIconSx, fontSize: "0.875rem" }}>Image</Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={actionIconSx} />
              <Typography sx={{ ...actionIconSx, fontSize: "0.875rem" }}>Clip</Typography>
            </FlexBetween>
            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={actionIconSx} />
              <Typography sx={{ ...actionIconSx, fontSize: "0.875rem" }}>Attachment</Typography>
            </FlexBetween>
            <FlexBetween gap="0.25rem">
              <MicOutlined sx={actionIconSx} />
              <Typography sx={{ ...actionIconSx, fontSize: "0.875rem" }}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <IconButton sx={{ color: mediumMain }}>
            <MoreHorizOutlined />
          </IconButton>
        )}

        <Button
          disabled={(!post.trim() && !image) || isSubmitting}
          onClick={handlePost}
          sx={{
            background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`,
            color: "#fff",
            borderRadius: "10px",
            px: "1.5rem",
            py: "0.5rem",
            fontWeight: 600,
            fontSize: "0.85rem",
            "&:hover": { background: `linear-gradient(135deg, ${palette.primary.light}, ${palette.primary.main})` },
            "&:disabled": { opacity: 0.5 },
            transition: "all 0.2s ease",
          }}
        >
          {isSubmitting ? "Posting..." : "Post"}
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
