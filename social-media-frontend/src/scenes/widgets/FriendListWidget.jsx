import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import { fetchFriends } from "../../api/api";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const friends = useSelector((state) => state.user.friends);

  useEffect(() => {
    fetchFriends(userId)
      .then(({ data }) => dispatch(setFriends({ friends: data })))
      .catch(() => {});
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.25rem" }}
      >
        Friend List
      </Typography>
      {friends?.length > 0 ? (
        <Box display="flex" flexDirection="column" gap="0.85rem">
          {friends.map((friend) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          ))}
        </Box>
      ) : (
        <Typography color={palette.neutral.medium} fontSize="0.875rem" textAlign="center" py="1rem">
          No friends yet
        </Typography>
      )}
    </WidgetWrapper>
  );
};

export default FriendListWidget;
