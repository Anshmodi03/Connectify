import { Typography, useTheme, Box } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween mb="0.85rem">
        <Typography color={dark} variant="h5" fontWeight="600">
          Sponsored
        </Typography>
        <Typography
          color={medium}
          fontSize="0.8rem"
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
        sx={{
          width: "100%",
          height: "160px",
          borderRadius: "10px",
          mb: "0.85rem",
          background: "#1A1A28",
          border: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color={medium} fontSize="0.8rem">
          Advertisement
        </Typography>
      </Box>

      <FlexBetween mb="0.5rem">
        <Typography color={main} variant="h6" fontWeight="500">
          MikaCosmetics
        </Typography>
        <Typography
          color={medium}
          fontSize="0.8rem"
          sx={{ cursor: "pointer", "&:hover": { color: dark }, transition: "color 0.2s ease" }}
        >
          mikacosmetics.com
        </Typography>
      </FlexBetween>

      <Typography color={medium} variant="body2" lineHeight="1.6" fontSize="0.825rem">
        Discover your pathway to stunning and immaculate beauty. Exfoliate,
        refresh, and glow with MikaCosmetics!
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
