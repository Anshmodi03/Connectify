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
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
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
  const { neutral } = theme.palette;

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
    });
  }, []);

  const iconSx = {
    color: neutral.dark,
    transition: "color 0.2s ease, transform 0.2s ease",
    "&:hover": { color: theme.palette.primary.main, transform: "scale(1.1)" },
  };

  const commonMenu = (
    <>
      <Tooltip title="Toggle Dark/Light Mode" arrow>
        <IconButton onClick={() => dispatch(setMode())} sx={iconSx}>
          {theme.palette.mode === "dark" ? (
            <DarkMode sx={{ fontSize: "22px" }} />
          ) : (
            <LightMode sx={{ fontSize: "22px" }} />
          )}
        </IconButton>
      </Tooltip>

      <Tooltip title="Messages" arrow>
        <IconButton sx={iconSx}>
          <Message sx={{ fontSize: "22px" }} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Notifications" arrow>
        <IconButton sx={iconSx}>
          <Notifications sx={{ fontSize: "22px" }} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Help" arrow>
        <IconButton sx={iconSx}>
          <Help sx={{ fontSize: "22px" }} />
        </IconButton>
      </Tooltip>

      <FormControl variant="standard" value={fullName}>
        <Select
          value={fullName}
          sx={{
            background: "rgba(255,255,255,0.06)",
            border: `1px solid ${theme.palette.divider}`,
            width: "160px",
            px: 1.5,
            py: 0.5,
            borderRadius: "10px",
            color: neutral.dark,
            ".MuiSvgIcon-root": { color: neutral.medium },
            "&:hover": { background: "rgba(255,255,255,0.1)" },
          }}
          input={<InputBase />}
        >
          <MenuItem value={fullName}>
            <Typography fontSize="13px" fontWeight={500}>
              {fullName}
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(setLogout());
              navigate("/login");
            }}
          >
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
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        background: "rgba(10,10,15,0.85)",
        borderBottom: `1px solid ${theme.palette.divider}`,
        px: { xs: "4%", md: "6%" },
        py: "0.75rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Left: Logo + Search */}
      <FlexBetween gap="1.5rem">
        <Typography
          fontWeight={700}
          fontSize="clamp(1rem, 2vw, 1.6rem)"
          sx={{
            cursor: "pointer",
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.5px",
            "&:hover": { opacity: 0.85 },
            transition: "opacity 0.2s ease",
          }}
          onClick={() => navigate("/home")}
        >
          SocialPulse
        </Typography>

        {isNonMobileScreens && (
          <FlexBetween
            sx={{
              background: "rgba(255,255,255,0.05)",
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: "12px",
              px: "1.25rem",
              py: "0.4rem",
              gap: "0.5rem",
              "&:focus-within": {
                border: `1px solid ${theme.palette.primary.main}`,
                background: "rgba(94,106,210,0.08)",
              },
              transition: "all 0.2s ease",
            }}
          >
            <InputBase
              placeholder="Search..."
              sx={{
                color: neutral.dark,
                fontSize: "14px",
                width: "200px",
                "::placeholder": { color: neutral.medium },
              }}
            />
            <IconButton sx={{ p: 0, color: neutral.medium }}>
              <Search sx={{ fontSize: "20px" }} />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* Right: Actions */}
      {isNonMobileScreens ? (
        <FlexBetween gap="1rem">{commonMenu}</FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          sx={iconSx}
        >
          <Menu />
        </IconButton>
      )}

      {/* Mobile drawer */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          sx={{
            position: "fixed",
            right: 0,
            top: 0,
            height: "100%",
            width: "280px",
            zIndex: 200,
            background: "rgba(17,17,24,0.97)",
            backdropFilter: "blur(20px)",
            borderLeft: `1px solid ${theme.palette.divider}`,
            p: "1.5rem",
          }}
        >
          <Box display="flex" justifyContent="flex-end" mb="1.5rem">
            <IconButton onClick={() => setIsMobileMenuToggled(false)} sx={iconSx}>
              <Close />
            </IconButton>
          </Box>
          <FlexBetween flexDirection="column" alignItems="flex-start" gap="1.25rem">
            {commonMenu}
          </FlexBetween>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
