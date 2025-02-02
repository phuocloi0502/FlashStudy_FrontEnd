import React, { useState } from "react";
import "./login.scss";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMailOutline, MdLockOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { setIsLogged } from "../../redux/slide/MyState";
import { isLogged } from "../../../utils/helpers";
export const Login = (props) => {
  const nav = useNavigate();

  // init
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // handle
  const handleLogin = async (value) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        value.email,
        value.password
      );
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      const UID = await user.uid;
      localStorage.setItem("UID", UID);
      localStorage.setItem("token", idToken);
      dispatch(setIsLogged(true));
      nav("/");
      message.success("Đăng nhập thành công!");
    } catch (error) {
      console.log(error);

      message.error("Email hoặc mật khẩu không đúng ! ");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login-form-wrap">
      <Form
        name="loginForm"
        onFinish={handleLogin}
        style={{
          maxWidth: 360,
        }}
        className="login-form"
      >
        <Form.Item>
          <h2>Đăng nhập</h2>
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập Email!",
            },
            {
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Email không hợp lệ!",
            },
          ]}
          className="login-form-item"
        >
          <Input
            prefix={<MdOutlineMailOutline />}
            placeholder="Nhập email..."
            type="email"
            size="large"
            autoFocus
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập Password!",
            },
          ]}
          className="login-form-item"
        >
          <Input.Password
            prefix={<MdLockOutline />}
            placeholder="Nhập mật khẩu..."
            type="password"
            size="large"
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item className="login-form-item">
          <Link>
            <strong>Quên mật khẩu ?</strong>
          </Link>
          <br />

          <strong
            onClick={() => {
              nav("/signup");
            }}
          >
            {" "}
            Chưa có tài khoản ? Đăng ký ngay
          </strong>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
