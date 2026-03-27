import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  CircularProgress,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import { loginUser, registerUser } from "../../api/api";
import toast from "react-hot-toast";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  location: yup.string().required("Location is required"),
  occupation: yup.string().required("Occupation is required"),
  picture: yup.mixed(),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const registerInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: null,
};

const loginInitialValues = { email: "", password: "" };

const inputSx = (palette) => ({
  "& .MuiOutlinedInput-root": {
    background: "rgba(255,255,255,0.04)",
    borderRadius: "10px",
    color: palette.neutral.dark,
    "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
    "&.Mui-focused fieldset": { borderColor: palette.primary.main },
  },
  "& .MuiInputLabel-root": { color: palette.neutral.medium },
  "& .MuiFormHelperText-root": { color: palette.secondary.main },
});

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";

  const handleSubmit = async (values, onSubmitProps) => {
    setIsLoading(true);
    try {
      if (isLogin) {
        const { data } = await loginUser({
          email: values.email,
          password: values.password,
        });
        dispatch(setLogin({ user: data.user, token: data.token }));
        navigate("/home");
      } else {
        const formData = new FormData();
        Object.entries(values).forEach(([key, val]) => {
          if (val !== null && val !== undefined) formData.append(key, val);
        });
        await registerUser(formData);
        toast.success("Account created! Please sign in.");
        onSubmitProps.resetForm();
        setPageType("login");
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        "Something went wrong";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={isLogin ? loginInitialValues : registerInitialValues}
      validationSchema={isLogin ? loginSchema : registerSchema}
      enableReinitialize
    >
      {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="16px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
          >
            {!isLogin && (
              <>
                <Box sx={{ gridColumn: "span 2" }}>
                  <TextField
                    label="First Name"
                    name="firstName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName || ""}
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                    fullWidth
                    sx={inputSx(palette)}
                  />
                </Box>
                <Box sx={{ gridColumn: "span 2" }}>
                  <TextField
                    label="Last Name"
                    name="lastName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName || ""}
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                    fullWidth
                    sx={inputSx(palette)}
                  />
                </Box>
                <Box sx={{ gridColumn: "span 4" }}>
                  <TextField
                    label="Location"
                    name="location"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location || ""}
                    error={Boolean(touched.location && errors.location)}
                    helperText={touched.location && errors.location}
                    fullWidth
                    sx={inputSx(palette)}
                  />
                </Box>
                <Box sx={{ gridColumn: "span 4" }}>
                  <TextField
                    label="Occupation"
                    name="occupation"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.occupation || ""}
                    error={Boolean(touched.occupation && errors.occupation)}
                    helperText={touched.occupation && errors.occupation}
                    fullWidth
                    sx={inputSx(palette)}
                  />
                </Box>
                <Box
                  gridColumn="span 4"
                  sx={{
                    border: `1px solid rgba(255,255,255,0.1)`,
                    borderRadius: "10px",
                    p: "0.75rem",
                  }}
                >
                  <Dropzone
                    acceptedFiles={{ "image/*": [".jpg", ".jpeg", ".png"] }}
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        sx={{
                          border: `2px dashed ${palette.primary.main}`,
                          borderRadius: "8px",
                          p: "1rem",
                          textAlign: "center",
                          cursor: "pointer",
                          background: "rgba(94,106,210,0.05)",
                          "&:hover": { background: "rgba(94,106,210,0.1)" },
                          transition: "background 0.2s ease",
                        }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <Typography color="neutral.medium" fontSize="14px">
                            Drop profile picture here or click to upload
                          </Typography>
                        ) : (
                          <FlexBetween>
                            <Typography color="neutral.dark" fontSize="14px">
                              {values.picture.name}
                            </Typography>
                            <EditOutlinedIcon sx={{ color: palette.primary.main }} />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <Box sx={{ gridColumn: "span 4" }}>
              <TextField
                label="Email"
                name="email"
                type="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                fullWidth
                sx={inputSx(palette)}
              />
            </Box>
            <Box sx={{ gridColumn: "span 4" }}>
              <TextField
                label="Password"
                type="password"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
                fullWidth
                sx={inputSx(palette)}
              />
            </Box>
          </Box>

          <Button
            fullWidth
            type="submit"
            disabled={isLoading}
            sx={{
              mt: "1.75rem",
              mb: "1rem",
              p: "0.85rem",
              background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`,
              color: "#fff",
              fontWeight: 600,
              fontSize: "15px",
              letterSpacing: "0.3px",
              borderRadius: "10px",
              boxShadow: `0 4px 20px rgba(94,106,210,0.35)`,
              "&:hover": {
                background: `linear-gradient(135deg, ${palette.primary.light}, ${palette.primary.main})`,
                boxShadow: `0 6px 28px rgba(94,106,210,0.5)`,
                transform: "translateY(-1px)",
              },
              "&:disabled": { opacity: 0.6 },
              transition: "all 0.2s ease",
            }}
          >
            {isLoading ? (
              <CircularProgress size={22} sx={{ color: "#fff" }} />
            ) : isLogin ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </Button>

          <Typography
            onClick={() => {
              setPageType(isLogin ? "register" : "login");
              resetForm();
            }}
            sx={{
              textAlign: "center",
              color: palette.primary.main,
              fontSize: "14px",
              cursor: "pointer",
              "&:hover": { color: palette.primary.light },
              transition: "color 0.2s ease",
            }}
          >
            {isLogin
              ? "Don't have an account? Create one"
              : "Already have an account? Sign in"}
          </Typography>
        </form>
      )}
    </Formik>
  );
};

export default Form;
