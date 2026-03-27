import { useState, useRef } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Tooltip,
  Avatar,
} from "@mui/material";
import {
  Search,
  Message,
  Notifications,
  Help,
  Menu,
  Close,
  LogoutOutlined,
  PersonOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "state";
import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FlexBetween from "components/FlexBetween";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const navRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const fullName = user ? `${user.firstName} ${user.lastName}` : "";
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { neutral, primary, divider } = theme.palette;

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -60,
      opacity: 0,
      duration: 0.55,
      ease: "power3.out",
    });
  }, []);

  const iconBtnSx = {
    color: neutral.main,
    transition: "color 0.2s ease, background 0.2s ease",
    "&:hover": {
      color: neutral.dark,
      background: "rgba(255,255,255,0.06)",
    },
  };

  const navActions = (
    <>
      <Tooltip title="Messages" arrow>
        <IconButton sx={iconBtnSx}>
          <Message sx={{ fontSize: "20px" }} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Notifications" arrow>
        <IconButton sx={iconBtnSx}>
          <Notifications sx={{ fontSize: "20px" }} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Help" arrow>
        <IconButton sx={iconBtnSx}>
          <Help sx={{ fontSize: "20px" }} />
        </IconButton>
      </Tooltip>

      <FormControl variant="standard">
        <Select
          value={fullName}
          sx={{
            background: "rgba(255,255,255,0.05)",
            border: `1px solid ${divider}`,
            width: "160px",
            px: 1.5,
            py: 0.5,
            borderRadius: "10px",
            color: neutral.dark,
            fontSize: "13px",
            fontWeight: 500,
            ".MuiSvgIcon-root": { color: neutral.medium },
            "&:hover": { background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)" },
            transition: "all 0.2s ease",
          }}
          input={<InputBase />}
        >
          <MenuItem value={fullName} sx={{ fontSize: "13px", fontWeight: 500 }}>
            {fullName}
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate(`/profile/${user?._id}`);
            }}
            sx={{ fontSize: "13px", gap: "0.5rem" }}
          >
            <PersonOutlined sx={{ fontSize: "16px" }} />
            Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(setLogout());
              navigate("/login");
            }}
            sx={{ fontSize: "13px", color: theme.palette.secondary.main, gap: "0.5rem" }}
          >
            <LogoutOutlined sx={{ fontSize: "16px" }} />
            Log Out
          </MenuItem>
        </Select>
      </FormControl>
    </>
  );

  return (
    <Box
      ref={navRef}
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        background: "rgba(9,9,14,0.88)",
        borderBottom: `1px solid ${divider}`,
        px: { xs: "4%", md: "6%" },
        py: "0.65rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Left: Logo + Search */}
      <FlexBetween gap="1.5rem">
        <Typography
          fontWeight={700}
          fontSize="clamp(1rem, 2vw, 1.4rem)"
          onClick={() => navigate("/home")}
          sx={{
            cursor: "pointer",
            color: primary.main,
            letterSpacing: "-0.3px",
            userSelect: "none",
            "&:hover": { color: primary.light },
            transition: "color 0.2s ease",
          }}
        >
          Connectify
        </Typography>

        {isNonMobileScreens && (
          <FlexBetween
            sx={{
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${divider}`,
              borderRadius: "10px",
              px: "1rem",
              py: "0.45rem",
              gap: "0.5rem",
              "&:focus-within": {
                border: `1px solid ${primary.main}`,
                background: "rgba(94,106,210,0.06)",
              },
              transition: "all 0.2s ease",
            }}
          >
            <InputBase
              placeholder="Search..."
              sx={{
                color: neutral.dark,
                fontSize: "13px",
                width: "190px",
                "& ::placeholder": { color: neutral.medium },
              }}
            />
            <Search sx={{ fontSize: "18px", color: neutral.medium }} />
          </FlexBetween>
        )}
      </FlexBetween>

      {/* Right: Actions */}
      {isNonMobileScreens ? (
        <FlexBetween gap="0.75rem">{navActions}</FlexBetween>
      ) : (
        <IconButton onClick={() => setIsMobileMenuToggled(true)} sx={iconBtnSx}>
          <Menu />
        </IconButton>
      )}

      {/* Mobile drawer */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            display: "flex",
          }}
        >
          {/* Backdrop */}
          <Box
            onClick={() => setIsMobileMenuToggled(false)}
            sx={{ flex: 1, background: "rgba(0,0,0,0.6)" }}
          />
          {/* Drawer */}
          <Box
            sx={{
              width: "280px",
              height: "100%",
              background: "#0F0F18",
              borderLeft: `1px solid ${divider}`,
              p: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb="0.5rem">
              <Typography fontWeight={700} color={primary.main} fontSize="1.1rem">
                Connectify
              </Typography>
              <IconButton onClick={() => setIsMobileMenuToggled(false)} sx={iconBtnSx}>
                <Close />
              </IconButton>
            </Box>
            <FlexBetween flexDirection="column" alignItems="flex-start" gap="0.5rem">
              {navActions}
            </FlexBetween>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
