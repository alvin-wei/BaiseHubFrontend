import { Group, SimpleGrid, Skeleton, Button } from "@mantine/core";
import { Suspense, useEffect, useState } from "react";
import { getTags, tag_ } from "../../api/tags";
import HoverVideoPlayer from "react-hover-video-player";
import Link from "next/link";

const VideoCard = () => {
  return (
    <>
      <Suspense fallback={<Skeleton radius="xl" />}>
        <Link href="#" key={"#"}>
          <HoverVideoPlayer videoSrc=""></HoverVideoPlayer>
        </Link>
      </Suspense>
    </>
  );
};

export default function IndexPage() {
  const [tags, setTags] = useState<tag_[]>([]);

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
          {tags.map((item) => (
            <Button key={item.id} variant="default">
              {item.name}
            </Button>
          ))}
        </Group>
      </Suspense>
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 5 }}
        spacing={{ base: 10, sm: "xl" }}
        verticalSpacing={{ base: "md", sm: "xl" }}
      >
        <VideoCard />
      </SimpleGrid>
    </div>
  );
}
