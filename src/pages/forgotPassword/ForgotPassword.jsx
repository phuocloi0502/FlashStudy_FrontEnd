import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import "./forgotPassword.scss";
const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, values.email);
      message.success("Đã gửi email đặt lại mật khẩu!");
      setCountdown(30);
    } catch (error) {
      message.error("Lỗi: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="forgotpassword-wrap">
      <Form onFinish={onFinish} layout="vertical" style={{ width: "300px" }}>
        <Form.Item
          label="Nhập email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          disabled={countdown > 0}
          loading={loading}
        >
          {countdown > 0 ? `Gửi lại sau ${countdown}s` : "Gửi yêu cầu"}
        </Button>
      </Form>
    </div>
  );
};

export default ForgotPassword;
