"use client";

import Link from "next/link";
import {
  Container,
  Group,
  Drawer,
  Burger,
  Input,
  Space,
  Title,
  NavLink,
  Tabs,
  ActionIcon,
  rem,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconSearch,
  IconUserSquareRounded,
  IconVideoPlus,
  IconArrowRight,
} from "@tabler/icons-react";
import classes from "./layout.module.css";

const headLinks = [
  { link: "#", label: "隐私与安全" },
  { link: "#", label: "账户安全" },
  { link: "#", label: "技术支持" },
];

const MenuLinks = [
  { link: "/", label: "首页" },
  { link: "#", label: "视频分类" },
  { link: "#", label: "社区" },
  { link: "#", label: "明星" },
  { link: "#", label: "联系我们" },
];

const Header: React.FC = () => {
  const [opened, { toggle, close }] = useDisclosure(false);

  const menuItems = MenuLinks.map((item) => (
    <Tabs.Tab
      value={item.label}
      size="lg"
      className={classes.menuItem}
      color="orange"
      key={item.label}
    >
      <Link href={item.link} style={{ textDecoration: "none", color: "white" }}>
        {item.label}
      </Link>
    </Tabs.Tab>
  ));

  const headItems = headLinks.map((item) => (
    <Link href={item.link} key={item.label} className={classes.headItem}>
      {item.label}
    </Link>
  ));

  // responsive
  const mainItemsList = MenuLinks.map((item) => (
    <NavLink
      component={Link}
      key={item.label}
      href={item.link}
      label={item.label}
      className={classes.nav}
    />
  ));

  return (
    <header className={classes.header}>
      <Container className={classes.inner} size="responsive">
        <div className={classes.headLinks}>{headItems}</div>
        <Group className={classes.headerContent} justify="space-between">
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
            hiddenFrom="sm"
          />
          <Title className={classes.logo} fz="h1">
            BaiseHub
          </Title>
          <TextInput
            radius="xl"
            size="md"
            visibleFrom="md"
            ta="center"
            className={classes.searchBox}
            placeholder="搜索视频..."
            rightSectionWidth={42}
            leftSection={
              <IconSearch
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            }
            rightSection={
              <ActionIcon size={32} radius="xl" variant="filled" color="orange">
                <IconArrowRight
                  style={{
                    width: rem(18),
                    height: rem(18),
                  }}
                  stroke={1.5}
                />
              </ActionIcon>
            }
          />
          <Group ta="right" className={classes.icons}>
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconVideoPlus
                style={{ width: rem(28), height: rem(28) }}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon size="lg" color="gray" variant="subtle">
              <Link href="/User">
                <IconUserSquareRounded
                  style={{ width: rem(28), height: rem(28), color: "white" }}
                  stroke={1.5}
                />
              </Link>
            </ActionIcon>
          </Group>
        </Group>
        <Tabs radius="xs" defaultValue="gallery" visibleFrom="md">
          <Tabs.List>{menuItems}</Tabs.List>
        </Tabs>
      </Container>
      <Drawer opened={opened} onClose={close} position="top" size="xs">
        {mainItemsList}{" "}
      </Drawer>
      {/* <Space h="sm" /> */}
    </header>
  );
};

export default Header;
