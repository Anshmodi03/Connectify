import { useRef } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from(".home-column", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: "cubic-bezier(0.16,1,0.3,1)",
    });
  }, { scope: containerRef });

  return (
    <Box sx={{ background: "#0A0A0F", minHeight: "100vh" }}>
      <Navbar />
      <Box
        ref={containerRef}
        sx={{
          display: "flex",
          flexDirection: isNonMobileScreens ? "row" : "column",
          gap: "1.5rem",
          padding: { xs: "1.5rem 4%", md: "2rem 6%" },
          alignItems: "flex-start",
        }}
      >
        {/* Left Column */}
        <Box
          className="home-column"
          sx={{ flexBasis: isNonMobileScreens ? "25%" : "100%", flexShrink: 0 }}
        >
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>

        {/* Center Column */}
        <Box
          className="home-column"
          sx={{ flex: 1, minWidth: 0 }}
        >
          <MyPostWidget picturePath={picturePath} />
          <Box sx={{ mt: "1.5rem" }}>
            <PostsWidget userId={_id} />
          </Box>
        </Box>

        {/* Right Column */}
        {isNonMobileScreens && (
          <Box
            className="home-column"
            sx={{
              flexBasis: "26%",
              flexShrink: 0,
              position: "sticky",
              top: "5rem",
            }}
          >
            <AdvertWidget />
            <Box sx={{ mt: "1.5rem" }}>
              <FriendListWidget userId={_id} />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
