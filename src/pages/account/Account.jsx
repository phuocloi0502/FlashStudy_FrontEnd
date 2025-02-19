import React, { useState } from "react";
import "./account.scss";
import { Form, Input, Button, Flex, message, Spin } from "antd";
import { auth } from "../../firebase";

import {
  getAuth,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
export const Account = (props) => {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    setLoading(true);
    const { oldPassword, newPassword, confirmPassword } = values;
    const user = auth.currentUser;

    if (newPassword !== confirmPassword) {
      message.error("Mật khẩu mới không khớp!");
      setLoading(false);
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        message.error("Người dùng chưa đăng nhập.");
        setLoading(false);
        return;
      }

      // Xác thực lại bằng mật khẩu cũ
      const credential = EmailAuthProvider.credential(user.email, oldPassword);
      await reauthenticateWithCredential(user, credential);

      // Cập nhật mật khẩu mới
      await updatePassword(user, newPassword);
      message.success("Đổi mật khẩu thành công!");
      localStorage.removeItem("token");
      nav("/login");
      setLoading(false);
    } catch (error) {
      if (error.code == "auth/invalid-credential") {
        message.error("Mật khẩu cũ không chính xác!");
      } else {
        message.error("Lỗi: " + error.message);
        console.log(error.message);
      }
      setLoading(false);
    }
  };
  return (
    <div className="account-wrap">
      <Spin spinning={loading} fullscreen={true} />
      <Flex justify="center" align="center">
        <Form onFinish={onFinish} layout="vertical" style={{ width: "500px" }}>
          <Form.Item
            label="Mật khẩu cũ"
            name="oldPassword"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu mới"
            name="confirmPassword"
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu mới!" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Đổi mật khẩu
          </Button>
        </Form>
      </Flex>
    </div>
  );
};
