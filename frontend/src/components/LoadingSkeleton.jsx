import { Box, Skeleton } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const LoadingSkeleton = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        background: theme.palette.background.alt,
        borderRadius: "1rem",
        border: `1px solid ${theme.palette.divider}`,
        padding: "1.5rem",
        mb: "1.5rem",
      }}
    >
      {/* Header row */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "1rem", mb: "1rem" }}>
        <Skeleton variant="circular" width={52} height={52} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="40%" height={20} sx={{ mb: 0.5 }} />
          <Skeleton variant="text" width="25%" height={16} />
        </Box>
      </Box>

      {/* Content */}
      <Skeleton variant="text" width="90%" height={18} sx={{ mb: 0.5 }} />
      <Skeleton variant="text" width="75%" height={18} sx={{ mb: "1rem" }} />

      {/* Image placeholder */}
      <Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: "0.75rem", mb: "1rem" }} />

      {/* Action row */}
      <Box sx={{ display: "flex", gap: "1.5rem" }}>
        <Skeleton variant="text" width={60} height={20} />
        <Skeleton variant="text" width={60} height={20} />
      </Box>
    </Box>
  );
};

export default LoadingSkeleton;
