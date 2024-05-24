"use client";
import React from "react";
import { upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Center,
} from "@mantine/core";
import { GoogleButton } from "./GoogleButton";
import { TwitterButton } from "./TwitterButton";
import { useState } from "react";

function useToggle(initialState: boolean): [boolean, () => void] {
  const [state, setState] = useState(initialState);
  const toggle = () => setState((prev) => !prev);
  return [state, toggle];
}

interface AuthenticationFormProps extends PaperProps {}

export default function AuthenticationForm(props: AuthenticationFormProps) {
  const [type, toggle] = useToggle(false);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val: string) => (/^\S+@\S+$/.test(val) ? null : "无效的邮箱地址"),
      password: (val: string) =>
        val.length <= 6 ? "密码应包含至少 6 个字符" : null,
    },
  });

  return (
    <Group justify="center">
      <Paper
        radius="md"
        p="xl"
        withBorder
        w={"700px"}
        {...props}
        style={{ maxWidth: "700px" }}
      >
        <Text size="lg" fw={500}>
          欢迎访问 BaiseHub, 快速{type ? "注册" : "登陆"}
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
          <TwitterButton radius="xl">Twitter</TwitterButton>
        </Group>

        <Divider label="或者继续使用电子邮件" labelPosition="center" my="lg" />

        <form onSubmit={form.onSubmit(() => {})}>
          <Stack>
            {type && (
              <TextInput
                label="用户名"
                placeholder="请输入用户名"
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue("name", event.currentTarget.value)
                }
                radius="md"
              />
            )}

            <TextInput
              required
              label="邮箱"
              placeholder="baise@gmail.com"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "无效的邮箱地址"}
              radius="md"
            />

            <PasswordInput
              required
              label="密码"
              placeholder="请输入密码"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={form.errors.password && "密码应包含至少 6 个字符"}
              radius="md"
            />

            {type && (
              <Checkbox
                label="我接受条款和条件"
                checked={form.values.terms}
                onChange={(event) =>
                  form.setFieldValue("terms", event.currentTarget.checked)
                }
              />
            )}
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type ? "已经有帐户？ 登录" : "没有帐户？ 注册"}
            </Anchor>
            <Button type="submit" radius="xl">
              {upperFirst(type ? "注册" : "登陆")}
            </Button>
          </Group>
        </form>
      </Paper>
    </Group>
  );
}
