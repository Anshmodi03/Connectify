import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  CircularProgress,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";
import {
  EditOutlined,
  Visibility,
  VisibilityOff,
  ErrorOutline,
} from "@mui/icons-material";
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
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  location: yup.string().required("Location is required"),
  occupation: yup.string().required("Occupation is required"),
  picture: yup.mixed(),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Email is required"),
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

// Returns error message if field is invalid (after touch OR after first submit attempt)
const fieldError = (touched, errors, submitCount, name) =>
  (touched[name] || submitCount > 0) && errors[name] ? errors[name] : undefined;

const inputSx = (palette) => ({
  "& .MuiOutlinedInput-root": {
    background: "rgba(255,255,255,0.04)",
    borderRadius: "10px",
    color: palette.neutral.dark,
    fontSize: "14px",
    "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.18)" },
    "&.Mui-focused fieldset": { borderColor: palette.primary.main },
    "&.Mui-error fieldset": { borderColor: palette.secondary.main },
  },
  "& .MuiInputLabel-root": { color: palette.neutral.medium, fontSize: "14px" },
  "& .MuiInputLabel-root.Mui-focused": { color: palette.primary.main },
  "& .MuiInputLabel-root.Mui-error": { color: palette.secondary.main },
  "& .MuiFormHelperText-root": {
    color: palette.secondary.main,
    fontSize: "12px",
    marginTop: "4px",
  },
});

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
        "Something went wrong. Please try again.";
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
      {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm, submitCount }) => {
        const err = (name) => fieldError(touched, errors, submitCount, name);
        const hasErrors = submitCount > 0 && Object.keys(errors).length > 0;

        return (
          <form onSubmit={handleSubmit} noValidate>
            {/* Title */}
            <Typography fontWeight={600} fontSize="1.25rem" sx={{ color: "#EDEDEF", mb: "0.375rem" }}>
              {isLogin ? "Welcome back" : "Create an account"}
            </Typography>
            <Typography fontSize="0.875rem" sx={{ color: "#8A8F98", mb: "1.75rem", lineHeight: 1.6 }}>
              {isLogin
                ? "Sign in to continue to Connectify"
                : "Fill in your details to get started"}
            </Typography>

            {/* Submit error summary */}
            {hasErrors && (
              <Alert
                severity="error"
                icon={<ErrorOutline fontSize="small" />}
                sx={{
                  mb: "1.25rem",
                  background: "rgba(225,29,72,0.08)",
                  border: "1px solid rgba(225,29,72,0.25)",
                  borderRadius: "10px",
                  color: "#F87096",
                  fontSize: "13px",
                  "& .MuiAlert-icon": { color: "#E11D48" },
                  "& .MuiAlert-message": { width: "100%" },
                }}
              >
                <Typography fontWeight={500} fontSize="13px" mb="0.375rem">
                  Please fix the following:
                </Typography>
                <Box component="ul" sx={{ m: 0, pl: "1.25rem" }}>
                  {Object.values(errors).map((msg, i) => (
                    <Typography component="li" key={i} fontSize="12px" sx={{ opacity: 0.9 }}>
                      {msg}
                    </Typography>
                  ))}
                </Box>
              </Alert>
            )}

            <Box
              display="grid"
              gap="1rem"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
            >
              {!isLogin && (
                <>
                  <Box sx={{ gridColumn: "span 2" }}>
                    <TextField
                      label="First Name *"
                      name="firstName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstName}
                      error={Boolean(err("firstName"))}
                      helperText={err("firstName")}
                      fullWidth
                      sx={inputSx(palette)}
                      autoComplete="given-name"
                    />
                  </Box>
                  <Box sx={{ gridColumn: "span 2" }}>
                    <TextField
                      label="Last Name *"
                      name="lastName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastName}
                      error={Boolean(err("lastName"))}
                      helperText={err("lastName")}
                      fullWidth
                      sx={inputSx(palette)}
                      autoComplete="family-name"
                    />
                  </Box>
                  <Box sx={{ gridColumn: "span 4" }}>
                    <TextField
                      label="Location *"
                      name="location"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.location}
                      error={Boolean(err("location"))}
                      helperText={err("location")}
                      fullWidth
                      sx={inputSx(palette)}
                      autoComplete="address-level2"
                    />
                  </Box>
                  <Box sx={{ gridColumn: "span 4" }}>
                    <TextField
                      label="Occupation *"
                      name="occupation"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.occupation}
                      error={Boolean(err("occupation"))}
                      helperText={err("occupation")}
                      fullWidth
                      sx={inputSx(palette)}
                    />
                  </Box>

                  {/* Profile picture dropzone */}
                  <Box gridColumn="span 4">
                    <Typography fontSize="12px" sx={{ color: palette.neutral.medium, mb: "0.5rem" }}>
                      Profile Picture (optional)
                    </Typography>
                    <Dropzone
                      acceptedFiles={{ "image/*": [".jpg", ".jpeg", ".png"] }}
                      multiple={false}
                      onDrop={(acceptedFiles) => setFieldValue("picture", acceptedFiles[0])}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          sx={{
                            border: `1.5px dashed rgba(94,106,210,0.4)`,
                            borderRadius: "10px",
                            p: "0.875rem 1rem",
                            textAlign: "center",
                            cursor: "pointer",
                            background: "rgba(94,106,210,0.04)",
                            "&:hover": {
                              border: `1.5px dashed ${palette.primary.main}`,
                              background: "rgba(94,106,210,0.08)",
                            },
                            transition: "all 0.2s ease",
                          }}
                        >
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <Typography color="neutral.medium" fontSize="13px">
                              Drop profile picture here or click to upload
                            </Typography>
                          ) : (
                            <FlexBetween>
                              <Typography color="neutral.dark" fontSize="13px">
                                {values.picture.name}
                              </Typography>
                              <EditOutlined sx={{ color: palette.primary.main, fontSize: "18px" }} />
                            </FlexBetween>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Box>
                </>
              )}

              {/* Email */}
              <Box sx={{ gridColumn: "span 4" }}>
                <TextField
                  label="Email *"
                  name="email"
                  type="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  error={Boolean(err("email"))}
                  helperText={err("email")}
                  fullWidth
                  sx={inputSx(palette)}
                  autoComplete="email"
                />
              </Box>

              {/* Password */}
              <Box sx={{ gridColumn: "span 4" }}>
                <TextField
                  label="Password *"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  error={Boolean(err("password"))}
                  helperText={err("password")}
                  fullWidth
                  sx={inputSx(palette)}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          tabIndex={-1}
                          sx={{ color: palette.neutral.medium, "&:hover": { color: palette.neutral.dark } }}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword
                            ? <VisibilityOff sx={{ fontSize: "18px" }} />
                            : <Visibility sx={{ fontSize: "18px" }} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>

            {/* Submit button */}
            <Button
              fullWidth
              type="submit"
              disabled={isLoading}
              sx={{
                mt: "1.5rem",
                mb: "1rem",
                p: "0.8rem",
                background: palette.primary.main,
                color: "#fff",
                fontWeight: 600,
                fontSize: "14px",
                borderRadius: "10px",
                letterSpacing: "0.2px",
                "&:hover": {
                  background: palette.primary.dark,
                },
                "&:disabled": { opacity: 0.55, cursor: "not-allowed" },
                transition: "background 0.2s ease",
                minHeight: "44px",
              }}
            >
              {isLoading ? (
                <CircularProgress size={20} sx={{ color: "#fff" }} />
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </Button>

            {/* Switch mode link */}
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textAlign: "center",
                color: palette.primary.main,
                fontSize: "13px",
                cursor: "pointer",
                "&:hover": { color: palette.primary.light },
                transition: "color 0.2s ease",
                userSelect: "none",
              }}
            >
              {isLogin
                ? "Don't have an account? Create one"
                : "Already have an account? Sign in"}
            </Typography>
          </form>
        );
      }}
    </Formik>
  );
};

export default Form;
