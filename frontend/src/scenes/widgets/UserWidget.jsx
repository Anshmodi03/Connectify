import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  AlternateEmail,
  LinkedIn,
  PeopleOutlined,
  VisibilityOutlined,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, IconButton, Tooltip } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import EditProfileModal from "components/EditProfileModal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchUser } from "../../api/api";

const StatRow = ({ icon, label, value, palette }) => (
  <FlexBetween sx={{ py: "0.5rem" }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      {icon}
      <Typography fontSize="0.875rem" color={palette.neutral.medium}>{label}</Typography>
    </Box>
    <Typography fontSize="0.875rem" fontWeight={600} color={palette.neutral.dark}>
      {value ?? 0}
    </Typography>
  </FlexBetween>
);

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.user);
  const isOwnProfile = loggedInUser?._id === userId;

  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  useEffect(() => {
    fetchUser(userId)
      .then(({ data }) => setUser(data))
      .catch(() => {});
  }, [userId]);

  // Re-sync if logged-in user's own profile was updated via Redux
  useEffect(() => {
    if (isOwnProfile && loggedInUser) {
      setUser((prev) =>
        prev
          ? { ...prev, ...loggedInUser }
          : prev
      );
    }
  }, [loggedInUser, isOwnProfile]);

  if (!user) return null;

  const { firstName, lastName, location, occupation, viewedProfile, impressions, friends } = user;
  const displayPicture = isOwnProfile ? loggedInUser?.picturePath : picturePath;

  return (
    <>
      <WidgetWrapper>
        {/* Header: avatar + name + edit button */}
        <FlexBetween gap="0.5rem" pb="1.25rem">
          <FlexBetween
            gap="1rem"
            onClick={() => navigate(`/profile/${userId}`)}
            sx={{ cursor: "pointer", flex: 1, minWidth: 0 }}
          >
            <UserImage image={displayPicture} />
            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant="h5"
                color={dark}
                fontWeight={600}
                noWrap
                sx={{
                  "&:hover": { color: palette.primary.main },
                  transition: "color 0.2s ease",
                }}
              >
                {firstName} {lastName}
              </Typography>
              <Typography color={medium} fontSize="0.8rem">
                {friends?.length ?? 0} {friends?.length === 1 ? "friend" : "friends"}
              </Typography>
            </Box>
          </FlexBetween>

          {isOwnProfile && (
            <Tooltip title="Edit Profile" arrow>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setEditOpen(true);
                }}
                size="small"
                sx={{
                  color: medium,
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${palette.divider}`,
                  "&:hover": {
                    color: palette.primary.main,
                    background: "rgba(94,106,210,0.08)",
                    borderColor: "rgba(94,106,210,0.3)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <ManageAccountsOutlined sx={{ fontSize: "18px" }} />
              </IconButton>
            </Tooltip>
          )}
        </FlexBetween>

        <Divider />

        {/* Location + Occupation */}
        <Box py="1rem">
          {location && (
            <Box display="flex" alignItems="center" gap="0.75rem" mb="0.5rem">
              <LocationOnOutlined sx={{ color: main, fontSize: "20px", flexShrink: 0 }} />
              <Typography color={medium} fontSize="0.875rem">{location}</Typography>
            </Box>
          )}
          {occupation && (
            <Box display="flex" alignItems="center" gap="0.75rem">
              <WorkOutlineOutlined sx={{ color: main, fontSize: "20px", flexShrink: 0 }} />
              <Typography color={medium} fontSize="0.875rem">{occupation}</Typography>
            </Box>
          )}
        </Box>

        <Divider />

        {/* Stats */}
        <Box py="0.75rem">
          <StatRow
            icon={<VisibilityOutlined sx={{ fontSize: "18px", color: main }} />}
            label="Profile views"
            value={viewedProfile}
            palette={palette}
          />
          <StatRow
            icon={<ThumbUpAltOutlined sx={{ fontSize: "18px", color: main }} />}
            label="Post impressions"
            value={impressions}
            palette={palette}
          />
          <StatRow
            icon={<PeopleOutlined sx={{ fontSize: "18px", color: main }} />}
            label="Friends"
            value={friends?.length ?? 0}
            palette={palette}
          />
        </Box>

        <Divider />

        {/* Social Profiles */}
        <Box pt="1rem" pb="0.25rem">
          <Typography
            fontSize="0.75rem"
            color={main}
            fontWeight={600}
            letterSpacing="0.6px"
            mb="0.875rem"
            sx={{ textTransform: "uppercase" }}
          >
            Social Profiles
          </Typography>

          <FlexBetween mb="0.75rem">
            <FlexBetween gap="0.75rem">
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.05)",
                  border: `1px solid ${palette.divider}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AlternateEmail sx={{ fontSize: "16px", color: medium }} />
              </Box>
              <Box>
                <Typography color={dark} fontWeight={500} fontSize="0.875rem">Twitter / X</Typography>
                <Typography color={medium} fontSize="0.75rem">Social Network</Typography>
              </Box>
            </FlexBetween>
            <EditOutlined
              sx={{
                fontSize: "16px",
                color: medium,
                cursor: "pointer",
                "&:hover": { color: palette.primary.main },
                transition: "color 0.2s ease",
              }}
            />
          </FlexBetween>

          <FlexBetween>
            <FlexBetween gap="0.75rem">
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.05)",
                  border: `1px solid ${palette.divider}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LinkedIn sx={{ fontSize: "16px", color: medium }} />
              </Box>
              <Box>
                <Typography color={dark} fontWeight={500} fontSize="0.875rem">LinkedIn</Typography>
                <Typography color={medium} fontSize="0.75rem">Network Platform</Typography>
              </Box>
            </FlexBetween>
            <EditOutlined
              sx={{
                fontSize: "16px",
                color: medium,
                cursor: "pointer",
                "&:hover": { color: palette.primary.main },
                transition: "color 0.2s ease",
              }}
            />
          </FlexBetween>
        </Box>
      </WidgetWrapper>

      {/* Edit Profile Modal */}
      {isOwnProfile && (
        <EditProfileModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          user={{ ...user, _id: userId }}
        />
      )}
    </>
  );
};

export default UserWidget;
