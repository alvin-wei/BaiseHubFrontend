import { Text, Container, ActionIcon, Group, rem, Title } from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons-react";
import classes from "./layout.module.css";
import Link from "next/link";

const data = [
  {
    title: "关于",
    links: [
      { label: "特色", link: "#" },
      { label: "价格", link: "#" },
      { label: "支持", link: "#" },
      { label: "论坛", link: "#" },
    ],
  },
  {
    title: "合作",
    links: [
      { label: "联系方式", link: "#" },
      { label: "合作平台", link: "#" },
      { label: "公告", link: "#" },
      { label: "发布", link: "#" },
    ],
  },
  {
    title: "社区",
    links: [
      { label: "加入TG群", link: "#" },
      { label: "关注 Twitter", link: "#" },
      { label: "合作商业邮箱", link: "#" },
      { label: "其他合作", link: "#" },
    ],
  },
];

export function Footer() {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Link href={link.link} key={index} className={classes.footer_link}>
        {link.label}
      </Link>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.footer_inner}>
        <div className={classes.footer_logo}>
          <Title ta="center" fz="h1">
            BaiseHub
          </Title>
          <Text size="xs" c="dimmed" className={classes.description}>
            Build fully functional accessible web applications faster than ever
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © 2020 mantine.dev. All rights reserved.
        </Text>

        <Group
          gap={0}
          className={classes.social}
          justify="flex-end"
          wrap="nowrap"
        >
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}

export default Footer;
