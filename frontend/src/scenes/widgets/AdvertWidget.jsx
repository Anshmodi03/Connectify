import { Typography, useTheme, Box } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

// Static ad image served from our backend uploads (added by seed script)
const AD_IMAGE = `${import.meta.env.VITE_API_BASE_URL}/assets/ad-cosmetics.jpg`;

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween mb="0.875rem">
        <Typography color={dark} variant="h5" fontWeight={600} fontSize="0.875rem">
          Sponsored
        </Typography>
        <Typography
          color={medium}
          fontSize="0.75rem"
          sx={{
            cursor: "pointer",
            "&:hover": { color: dark },
            transition: "color 0.2s ease",
          }}
        >
          Create Ad
        </Typography>
      </FlexBetween>

      <Box
        component="img"
        src={AD_IMAGE}
        alt="MikaCosmetics advertisement"
        onError={(e) => {
          // fallback to a solid box if image hasn't been seeded yet
          e.target.style.display = "none";
          e.target.nextSibling.style.display = "flex";
        }}
        sx={{
          width: "100%",
          height: "160px",
          borderRadius: "10px",
          objectFit: "cover",
          mb: "0.875rem",
          display: "block",
          border: `1px solid ${palette.divider}`,
        }}
      />
      {/* Fallback box if image not loaded */}
      <Box
        sx={{
          width: "100%",
          height: "160px",
          borderRadius: "10px",
          mb: "0.875rem",
          background: "#1A1A28",
          border: `1px solid ${palette.divider}`,
          alignItems: "center",
          justifyContent: "center",
          display: "none",
        }}
      >
        <Typography color={medium} fontSize="0.8rem">Advertisement</Typography>
      </Box>

      <FlexBetween mb="0.5rem">
        <Typography color={main} variant="h6" fontWeight={600} fontSize="0.875rem">
          MikaCosmetics
        </Typography>
        <Typography
          color={medium}
          fontSize="0.75rem"
          sx={{ cursor: "pointer", "&:hover": { color: dark }, transition: "color 0.2s ease" }}
        >
          mikacosmetics.com
        </Typography>
      </FlexBetween>

      <Typography color={medium} variant="body2" lineHeight="1.65" fontSize="0.825rem">
        Discover your pathway to stunning and immaculate beauty. Exfoliate, refresh, and glow
        with MikaCosmetics.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
