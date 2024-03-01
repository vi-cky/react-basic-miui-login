import React, { useLayoutEffect, useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  Typography,
  TextField,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { LockOutlined, MailOutlined } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import xhrClient from "../../../utilities/DataRequest";
export default function SignIn() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const onFinish = async (e) => {
    e.preventDefault();

    const { email, password } = values;

    const response = await xhrClient
      .post("signin", null, { email, password })
      .then((res) => {
        return res.data;
      });

    try {
      if (response.statusCode === 200) {
        localStorage.setItem(
          "token",
          JSON.stringify(response.response.token.accessToken)
        );
        localStorage.setItem(
          "refreshTOken",
          JSON.stringify(response.response.token.refreshToken)
        );

        navigate("/home");
      } else {
        alert(response.response);
      }
      console.log("responseObject", responseObject);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const styles = {
    container: {
      margin: "0 auto",
      padding: isSmScreen
        ? `${theme.spacing(5)} ${theme.spacing(2)}`
        : `${theme.spacing(10)} ${theme.spacing(2)}`,
      width: "380px",
    },
    footer: {
      marginTop: theme.spacing(3),
      textAlign: "center",
      width: "100%",
    },
    forgotPassword: {
      float: "right",
    },
    header: {
      marginBottom: theme.spacing(4),
    },
    section: {
      alignItems: "center",
      backgroundColor: theme.palette.background.default,
      display: "flex",
      height: isSmScreen ? "100vh" : "auto",
      padding: theme.spacing(2),
    },
    text: {
      color: theme.palette.text.secondary,
    },
    title: {
      fontSize: isSmScreen
        ? theme.typography.h5.fontSize
        : theme.typography.h4.fontSize,
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <Typography variant="h4" style={styles.title}>
            Sign in
          </Typography>
          <Typography variant="body2" style={styles.text}>
            Welcome back to LMS UI! Please enter your details below to sign in.
          </Typography>
        </div>

        <form name="normal_login" onSubmit={onFinish} style={{ width: "100%" }}>
          <FormControl fullWidth style={{ marginBottom: theme.spacing(2) }}>
            <TextField
              id="email"
              name="email"
              variant="outlined"
              label="Email"
              InputProps={{
                startAdornment: <MailOutlined />,
              }}
              required
              value={values.email}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl fullWidth style={{ marginBottom: theme.spacing(2) }}>
            <TextField
              id="password"
              name="password"
              variant="outlined"
              label="Password"
              type="password"
              InputProps={{
                startAdornment: <LockOutlined />,
              }}
              required
              value={values.password}
              onChange={handleChange}
            />
          </FormControl>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Log in
          </Button>
        </form>
      </div>
    </section>
  );
}
