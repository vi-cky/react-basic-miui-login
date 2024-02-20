import React from "react";

import { Form, Grid, message, theme, Typography } from "antd";

import { LockOutlined, MailOutlined, ProfileOutlined } from "@ant-design/icons";
import { TempCredential } from "./TempCredential";
import { useNavigate } from "react-router-dom";
import { SimpleInput } from "../../controls/BasicInput";
import { SimpleButton } from "../../controls/Button";
const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title } = Typography;

export default function signin() {
  const { token } = useToken();
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    const { code, email, password } = values;
    console.log("object", code, email, password);
    if (
      code === TempCredential[0].sCode &&
      email === TempCredential[0].sEmail &&
      password === TempCredential[0].sPassword
    ) {
      localStorage.setItem("credentials", JSON.stringify(values));
      console.log("Successfully login");
      navigate("/dashboard");
    } else {
      message.error("Invalid Credential's !!");
    }
  };
  console.log("token", token);
  const styles = {
    container: {
      margin: "0 auto",
      padding: screens.md
        ? `${token.paddingXL}px`
        : `${token.sizeXXL}px ${token.padding}px`,
      width: "380px",
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%",
    },
    forgotPassword: {
      float: "right",
    },
    header: {
      marginBottom: token.marginXL,
    },
    section: {
      alignItems: "center",
      backgroundColor: token.colorBgContainer,
      display: "flex",
      height: screens.sm ? "100vh" : "auto",
      padding: "0px",
    },
    text: {
      color: token.colorTextSecondary,
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          {/* //NOTE COMMENT THE LOGO AND HEADING WORK */}
          {/* <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0.464294" width="24" height="24" rx="4.8" fill="#1890FF" />
            <path
              d="M14.8643 3.6001H20.8643V9.6001H14.8643V3.6001Z"
              fill="white"
            />
            <path
              d="M10.0643 9.6001H14.8643V14.4001H10.0643V9.6001Z"
              fill="white"
            />
            <path
              d="M4.06427 13.2001H11.2643V20.4001H4.06427V13.2001Z"
              fill="white"
            />
          </svg>*/}

          <Title style={styles.title}>Sign in</Title>
          <Text style={styles.text}>
            Welcome back to LMS UI! Please enter your details below to sign in.
          </Text>
        </div>
        <Form
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
        >
          {/* <Form.Item
            name="code"
            rules={[
              {
                type: "string",
                required: true,
                message: "Please input your Company Code!",
              },
            ]}
          >
            <Input prefix={<ProfileOutlined />} placeholder="Company Code" />
          </Form.Item> */}
          <SimpleInput
            name="code"
            id={"txtcode"}
            maxLength={10}
            prefix={<ProfileOutlined />}
            minLength={3}
            validationOn={"Company Code"}
            required={true}
            placeholder="Company Code"
            tabIndex={1}
          />
          <SimpleInput
            type={"string"}
            name="email"
            id={"txtemail"}
            prefix={<MailOutlined />}
            minLength={3}
            validationOn={"Email"}
            required={true}
            placeholder="Enter Code"
            tabIndex={2}
          />

          <SimpleInput
            type={"password"}
            name="password"
            id={"txtpassword"}
            maxLength={10}
            prefix={<LockOutlined />}
            minLength={3}
            validationOn={"Password"}
            required={true}
            placeholder="Enter Password"
            tabIndex={3}
            Focus
          />

          {/*
         // NOTE COMMENT THE REMEMBER AND FORGET PASSWORD PAGE
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a style={styles.forgotPassword} href="">
              Forgot password?
            </a>
          </Form.Item> */}

          <SimpleButton
            name="loginButton"
            label="Log in"
            block="true"
            type="primary"
            htmlType="submit"
          />
        </Form>
      </div>
    </section>
  );
}
