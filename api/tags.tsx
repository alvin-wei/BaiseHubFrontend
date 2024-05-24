export interface tag_ {
  id: number;
  name: string;
}

export const getTags = async () => {
  try {
    const res = await fetch(`http://localhost:7000/tags`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Failed to fetch tags:", error);
    throw error;
  }
};
