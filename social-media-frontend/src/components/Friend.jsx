import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import { addRemoveFriend } from "../api/api";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import toast from "react-hot-toast";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const friends = useSelector((state) => state.user.friends);
  const { palette } = useTheme();

  const isFriend = friends?.some(
    (f) => (f._id || f) === friendId
  );

  const handleFriendToggle = async () => {
    try {
      const { data } = await addRemoveFriend(_id, friendId);
      dispatch(setFriends({ friends: data }));
    } catch {
      toast.error("Failed to update friend");
    }
  };

  return (
    <FlexBetween
      sx={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${palette.divider}`,
        padding: "0.85rem 1rem",
        borderRadius: "12px",
        transition: "background 0.2s ease, border-color 0.2s ease",
        "&:hover": {
          background: "rgba(94,106,210,0.06)",
          borderColor: "rgba(94,106,210,0.3)",
        },
      }}
    >
      <FlexBetween gap="0.85rem">
        <UserImage image={userPicturePath} size="50px" />
        <Box
          onClick={() => navigate(`/profile/${friendId}`)}
          sx={{ cursor: "pointer" }}
        >
          <Typography
            color={palette.neutral.dark}
            variant="h5"
            fontWeight={500}
            sx={{
              "&:hover": { color: palette.primary.main },
              transition: "color 0.2s ease",
            }}
          >
            {name}
          </Typography>
          <Typography color={palette.neutral.medium} fontSize="0.8rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>

      {friendId !== _id && (
        <IconButton
          onClick={handleFriendToggle}
          sx={{
            background: isFriend
              ? "rgba(225,29,72,0.12)"
              : "rgba(94,106,210,0.12)",
            border: `1px solid ${isFriend ? palette.secondary.main : palette.primary.main}`,
            color: isFriend ? palette.secondary.main : palette.primary.main,
            p: "0.5rem",
            transition: "all 0.2s ease",
            "&:hover": {
              background: isFriend
                ? "rgba(225,29,72,0.2)"
                : "rgba(94,106,210,0.2)",
              transform: "scale(1.08)",
            },
          }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ fontSize: "18px" }} />
          ) : (
            <PersonAddOutlined sx={{ fontSize: "18px" }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default Friend;
