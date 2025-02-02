import React, { useState } from "react";
import "./signUp.scss";
import "../login/login.scss";
import { Form, Input, Button, Flex, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMailOutline, MdLockOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
export const SignUp = (props) => {
  const nav = useNavigate();
  // init
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  // handle
  const handleSignUp = async (value) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        value.email,
        value.password
      );
      // dispatch(setShowSignUpForm(false));
      form.resetFields();
      message.success("Đăng ký thành công !");
      nav("/login");
    } catch (error) {
      if (error.message == "Firebase: Error (auth/email-already-in-use).") {
        message.error("Tài khoản này đã tồn tại !");
      } else {
        message.error(error.message);
        console.log(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login-form-wrap">
      <Form
        name="loginForm"
        onFinish={handleSignUp}
        form={form}
        className="login-form"
        style={{
          maxWidth: 360,
        }}
      >
        {" "}
        <Form.Item>
          <h2>Đăng ký</h2>
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
            {
              min: 6,
              message: "Mật khẩu phải có ít nhất 6 kí tự !",
            },
          ]}
          className="login-form-item"
        >
          <Input.Password
            prefix={<MdLockOutline />}
            placeholder="Nhập mật khẩu..."
            type="password"
            size="large"
            autoComplete="false"
          />
        </Form.Item>
        <Form.Item
          className="login-form-item"
          name="confirm"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập lại mật khẩu !",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu không khớp !"));
              },
            }),
          ]}
        >
          <Input.Password
            type="password"
            placeholder="Nhập lại mật khẩu..."
            prefix={<MdLockOutline />}
            size="large"
            autoComplete="false"
          />
        </Form.Item>
        <Form.Item className="login-form-item">
          <Flex justify="space-around">
            <Button
              onClick={() => {
                nav("/login");
              }}
              color="cyan"
              variant="solid"
            >
              Quay lại
            </Button>
            <Button type="primary" htmlType="submit">
              Đăng Ký
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </div>
  );
};
