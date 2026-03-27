import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  CircularProgress,
  Divider,
  Avatar,
} from "@mui/material";
import { Close, EditOutlined, PhotoCameraOutlined } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import Dropzone from "react-dropzone";
import { useDispatch } from "react-redux";
import { setProfile } from "state";
import { updateUser } from "../api/api";
import toast from "react-hot-toast";

const inputSx = (palette) => ({
  "& .MuiOutlinedInput-root": {
    background: "rgba(255,255,255,0.04)",
    borderRadius: "10px",
    color: palette.neutral.dark,
    fontSize: "14px",
    "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.18)" },
    "&.Mui-focused fieldset": { borderColor: palette.primary.main },
  },
  "& .MuiInputLabel-root": { color: palette.neutral.medium, fontSize: "14px" },
  "& .MuiInputLabel-root.Mui-focused": { color: palette.primary.main },
});

const EditProfileModal = ({ open, onClose, user }) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    location: user?.location || "",
    occupation: user?.occupation || "",
  });
  const [picture, setPicture] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    if (!form.firstName.trim() || !form.lastName.trim()) {
      toast.error("First and last name are required");
      return;
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("firstName", form.firstName.trim());
      formData.append("lastName", form.lastName.trim());
      formData.append("location", form.location.trim());
      formData.append("occupation", form.occupation.trim());
      if (picture) formData.append("picture", picture);

      const { data } = await updateUser(user._id, formData);
      dispatch(setProfile(data));
      toast.success("Profile updated successfully");
      onClose();
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update profile";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const assetBase = import.meta.env.VITE_API_BASE_URL + "/assets";
  const avatarSrc = picture
    ? URL.createObjectURL(picture)
    : user?.picturePath
    ? `${assetBase}/${user.picturePath}`
    : `https://api.dicebear.com/7.x/initials/svg?seed=${user?.firstName}&backgroundColor=5E6AD2`;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: "#141420",
          border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: "1.125rem",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: "1.25rem 1.5rem 1rem",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <Typography fontWeight={600} fontSize="1rem" color="neutral.dark">
          Edit Profile
        </Typography>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: "neutral.medium",
            "&:hover": { color: "neutral.dark", background: "rgba(255,255,255,0.06)" },
          }}
        >
          <Close fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: "1.5rem" }}>
        {/* Avatar section */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: "1.75rem" }}>
          <Box sx={{ position: "relative", mb: "0.75rem" }}>
            <Avatar
              src={avatarSrc}
              sx={{
                width: 80,
                height: 80,
                border: "2px solid rgba(94,106,210,0.4)",
                fontSize: "2rem",
              }}
            />
            <Dropzone
              acceptedFiles={{ "image/*": [".jpg", ".jpeg", ".png"] }}
              multiple={false}
              onDrop={(files) => setPicture(files[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <Box
                  {...getRootProps()}
                  sx={{
                    position: "absolute",
                    bottom: -4,
                    right: -4,
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: palette.primary.main,
                    border: "2px solid #141420",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    "&:hover": { background: palette.primary.dark },
                    transition: "background 0.2s ease",
                  }}
                >
                  <input {...getInputProps()} />
                  <PhotoCameraOutlined sx={{ fontSize: "14px", color: "#fff" }} />
                </Box>
              )}
            </Dropzone>
          </Box>

          {picture && (
            <Typography fontSize="12px" color="primary.main">
              {picture.name}
            </Typography>
          )}
          <Typography fontSize="12px" color="neutral.medium">
            Click the camera icon to change photo
          </Typography>
        </Box>

        {/* Form fields */}
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap="1rem" mb="1rem">
          <TextField
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            fullWidth
            sx={inputSx(palette)}
            required
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            fullWidth
            sx={inputSx(palette)}
            required
          />
        </Box>
        <Box display="flex" flexDirection="column" gap="1rem">
          <TextField
            label="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
            fullWidth
            sx={inputSx(palette)}
            placeholder="City, Country"
          />
          <TextField
            label="Occupation"
            name="occupation"
            value={form.occupation}
            onChange={handleChange}
            fullWidth
            sx={inputSx(palette)}
            placeholder="Your job title or role"
          />
        </Box>
      </DialogContent>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.07)" }} />

      <DialogActions sx={{ p: "1rem 1.5rem", gap: "0.75rem" }}>
        <Button
          onClick={onClose}
          disabled={isLoading}
          sx={{
            color: "neutral.medium",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "10px",
            px: "1.25rem",
            "&:hover": { background: "rgba(255,255,255,0.08)" },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          disabled={isLoading || !form.firstName.trim() || !form.lastName.trim()}
          sx={{
            background: palette.primary.main,
            color: "#fff",
            borderRadius: "10px",
            px: "1.5rem",
            fontWeight: 600,
            "&:hover": { background: palette.primary.dark },
            "&:disabled": { opacity: 0.5 },
            minWidth: "100px",
          }}
        >
          {isLoading ? <CircularProgress size={18} sx={{ color: "#fff" }} /> : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileModal;
