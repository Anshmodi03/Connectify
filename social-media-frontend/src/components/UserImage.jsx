import { Box } from "@mui/material";

const ASSET_BASE = `${import.meta.env.VITE_API_BASE_URL}/assets`;

const UserImage = ({ image, size = "60px" }) => {
  const src = image
    ? `${ASSET_BASE}/${image}`
    : `https://api.dicebear.com/7.x/initials/svg?seed=${image || "user"}&backgroundColor=5E6AD2`;

  return (
    <Box
      width={size}
      height={size}
      sx={{
        borderRadius: "50%",
        overflow: "hidden",
        flexShrink: 0,
        border: "2px solid rgba(255,255,255,0.1)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
      }}
    >
      <img
        style={{ objectFit: "cover", width: "100%", height: "100%", display: "block" }}
        alt="user"
        src={src}
        onError={(e) => {
          e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=user&backgroundColor=5E6AD2`;
        }}
      />
    </Box>
  );
};

export default UserImage;
