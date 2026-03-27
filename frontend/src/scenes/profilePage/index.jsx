import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import { fetchUser } from "../../api/api";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const containerRef = useRef(null);

  useEffect(() => {
    fetchUser(userId)
      .then(({ data }) => setUser(data))
      .catch(() => {});
  }, [userId]);

  useGSAP(() => {
    if (user) {
      gsap.from(".profile-column", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "cubic-bezier(0.16,1,0.3,1)",
      });
    }
  }, { dependencies: [user], scope: containerRef });

  if (!user) return null;

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
          className="profile-column"
          sx={{ flexBasis: isNonMobileScreens ? "26%" : "100%", flexShrink: 0 }}
        >
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box sx={{ mt: "1.5rem" }}>
            <FriendListWidget userId={userId} />
          </Box>
        </Box>

        {/* Right Column */}
        <Box
          className="profile-column"
          sx={{ flex: 1, minWidth: 0, mt: isNonMobileScreens ? 0 : "1.5rem" }}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box sx={{ mt: "1.5rem" }}>
            <PostsWidget userId={userId} isProfile />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
