import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  AlternateEmail,
  LinkedIn,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../../api/api";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  useEffect(() => {
    fetchUser(userId)
      .then(({ data }) => setUser(data))
      .catch(() => {});
  }, [userId]);

  if (!user) return null;

  const { firstName, lastName, location, occupation, viewedProfile, impressions, friends } = user;

  return (
    <WidgetWrapper>
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
        sx={{ cursor: "pointer" }}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{ "&:hover": { color: palette.primary.main } }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends?.length ?? 0} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined sx={{ color: medium }} />
      </FlexBetween>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">{viewedProfile}</Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">{impressions}</Typography>
        </FlexBetween>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

      <Box p="1rem 0">
        <Typography fontSize="0.875rem" color={main} fontWeight="600" mb="0.875rem" letterSpacing="0.3px">
          SOCIAL PROFILES
        </Typography>

        <FlexBetween mb="0.75rem">
          <FlexBetween gap="0.75rem">
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: "8px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.07)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AlternateEmail sx={{ fontSize: "16px", color: medium }} />
            </Box>
            <Box>
              <Typography color={main} fontWeight="500" fontSize="0.875rem">Twitter / X</Typography>
              <Typography color={medium} fontSize="0.75rem">Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: medium, fontSize: "16px", cursor: "pointer", "&:hover": { color: main } }} />
        </FlexBetween>

        <FlexBetween>
          <FlexBetween gap="0.75rem">
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: "8px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.07)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LinkedIn sx={{ fontSize: "16px", color: medium }} />
            </Box>
            <Box>
              <Typography color={main} fontWeight="500" fontSize="0.875rem">LinkedIn</Typography>
              <Typography color={medium} fontSize="0.75rem">Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: medium, fontSize: "16px", cursor: "pointer", "&:hover": { color: main } }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
