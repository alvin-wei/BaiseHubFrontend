"use client";
import {
  Group,
  SimpleGrid,
  Skeleton,
  Button,
  Title,
  Space,
  Pagination,
  Center,
  Flex,
} from "@mantine/core";
import { Suspense, useEffect, useState } from "react";
import { getTags, tag_ } from "../api/tags";
import HoverVideoPlayer from "react-hover-video-player";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import {
  IconEye,
  IconUserSquareRounded,
  IconThumbUp,
  IconHeart,
} from "@tabler/icons-react";

const VideoList = [
  { link: "#", uploader: "" },
  { link: "#", uploader: "" },
  { link: "#", uploader: "" },
  { link: "#", uploader: "" },
  { link: "#", uploader: "" },
];

interface VideoProps {
  id: number;
}

const VideoCard = ({ id }: VideoProps) => {
  return (
    <Suspense fallback={<Skeleton width={320} height={180} radius="xl" />}>
      <Link href={`/Video/${id}`} key={id} style={{ width: 320, height: 180 }}>
        <HoverVideoPlayer
          videoSrc="/Besties_clips.mp4"
          pausedOverlay={
            <Image
              src="/Besties_cover.jpg"
              alt="thumbnail"
              fill
              style={{ objectFit: "cover" }}
            />
          }
          loadingOverlay={<div className="loading-overlay">Loading...</div>}
          preload="auto"
          muted={true}
          loop={true}
          volume={0.8}
          style={{ width: "320", height: "180" }}
        />
      </Link>
    </Suspense>
  );
};

const VideoPreview = ({ id }: VideoProps) => {
  return (
    <Flex
      mih={50}
      gap={0}
      justify="center"
      align="center"
      direction="column"
      wrap="wrap"
    >
      <VideoCard id={id} />
      <Group justify="space-between" style={{ width: "320px" }}>
        <Group gap="3px">
          <IconUserSquareRounded
            stroke={2}
            width={15}
            height={15}
            color="white"
          />
          Alvin
        </Group>
        <Group justify="space-between">
          <Group gap="3px">
            <IconEye stroke={2} width={15} height={15} color="white" />
            32
          </Group>
          <Group gap="3px">
            <IconThumbUp stroke={2} width={15} height={15} color="white" />
            54
          </Group>
          <Group gap="3px">
            <IconHeart stroke={2} width={15} height={15} color="white" />
            12
          </Group>
        </Group>
      </Group>
      <Group align="flex-start" style={{ width: "320px" }}>
        <Title order={4}>视频标题...</Title>
      </Group>
    </Flex>
  );
};

export default function Home() {
  const [tags, setTags] = useState<tag_[]>([]);
  const [page, setPage] = useState(0);

  const videoPreviews = Array.from({ length: 20 }, (_, index) => (
    <VideoPreview key={index} id={index} />
  ));

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const data = await getTags();
        setTags(data);
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      }
    };

    fetchTags();
  }, []);
  return (
    <div className="VideoWrapper">
      <Suspense fallback={<Skeleton height={8} mt={6} radius="xl" />}>
        <Group visibleFrom="md">
          {tags.length === 0 ? (
            <Skeleton height={25} radius="xl" width="90%" />
          ) : (
            tags.map((item) => (
              <Button key={item.id} variant="default">
                {item.name}
              </Button>
            ))
          )}
        </Group>
      </Suspense>
      <Space h="sm" />
      <Title fz="h1">热门视频</Title>
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 4 }}
        spacing={{ base: 10, sm: "xl" }}
        verticalSpacing={{ base: "lg", sm: "xl" }}
      >
        {videoPreviews}
      </SimpleGrid>
      <Group justify="center">
        <Pagination
          total={Math.ceil(20 / 18)}
          value={1}
          onChange={(page) => setPage(page)}
          mt="xl"
        />
      </Group>
    </div>
  );
}
