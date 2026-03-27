import { useRef } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Form from "./Form";

const LoginPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const formRef = useRef(null);

  useGSAP(() => {
    // Ambient blobs entrance
    gsap.from(".login-blob", {
      scale: 0,
      opacity: 0,
      duration: 1.4,
      stagger: 0.3,
      ease: "power2.out",
    });
    // Form card entrance
    gsap.from(formRef.current, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: "cubic-bezier(0.16,1,0.3,1)",
      delay: 0.2,
    });
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        background: "#0A0A0F",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        px: "1rem",
      }}
    >
      {/* Ambient glow blobs */}
      <Box
        className="login-blob"
        sx={{
          position: "absolute",
          top: "-10%",
          left: "-5%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(94,106,210,0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <Box
        className="login-blob"
        sx={{
          position: "absolute",
          bottom: "-10%",
          right: "-5%",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(225,29,72,0.14) 0%, transparent 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      {/* Logo */}
      <Typography
        fontWeight={700}
        fontSize="clamp(1.8rem, 4vw, 2.5rem)"
        sx={{
          mb: "2.5rem",
          background: "linear-gradient(135deg, #5E6AD2, #E11D48)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-1px",
        }}
      >
        SocialPulse
      </Typography>

      {/* Form card */}
      <Box
        ref={formRef}
        sx={{
          width: isNonMobileScreens ? "480px" : "100%",
          maxWidth: "480px",
          background: "rgba(17,17,24,0.9)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "1.5rem",
          p: { xs: "1.75rem", md: "2.5rem" },
          boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
        }}
      >
        <Typography
          fontWeight={600}
          variant="h4"
          sx={{ mb: "0.5rem", color: "#EDEDEF" }}
        >
          Welcome back
        </Typography>
        <Typography
          variant="body2"
          sx={{ mb: "2rem", color: "#8A8F98", lineHeight: 1.6 }}
        >
          Sign in to your account or create a new one to get started.
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
