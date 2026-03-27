import { useRef } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Form from "./Form";

const LoginPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const formRef = useRef(null);
  const logoRef = useRef(null);

  useGSAP(() => {
    gsap.from(logoRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.from(formRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.65,
      ease: "cubic-bezier(0.16,1,0.3,1)",
      delay: 0.12,
    });
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        background: "#09090E",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: "1rem",
        py: "2rem",
      }}
    >
      {/* Logo */}
      <Box ref={logoRef} sx={{ mb: "2rem", textAlign: "center" }}>
        <Typography
          fontWeight={700}
          fontSize="clamp(1.6rem, 4vw, 2.2rem)"
          sx={{
            color: "#5E6AD2",
            letterSpacing: "-0.5px",
            mb: "0.25rem",
          }}
        >
          Connectify
        </Typography>
        <Typography
          fontSize="0.875rem"
          sx={{ color: "#8A8F98" }}
        >
          Connect with people around you
        </Typography>
      </Box>

      {/* Form card */}
      <Box
        ref={formRef}
        sx={{
          width: isNonMobileScreens ? "460px" : "100%",
          maxWidth: "460px",
          background: "#141420",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "1.25rem",
          p: { xs: "1.75rem", md: "2.25rem" },
          boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
        }}
      >
        <Form />
      </Box>

      {/* Footer */}
      <Typography
        fontSize="0.75rem"
        sx={{ color: "#4A4A5A", mt: "2rem" }}
      >
        © {new Date().getFullYear()} Connectify. All rights reserved.
      </Typography>
    </Box>
  );
};

export default LoginPage;
