import ToolCardList from "@/components/ToolCardList";
import React from "react";

const getToolsList = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tool/3`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    return data?.tool || [];
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return [];
  }
};

export default async function Page() {
  const toolsList = await getToolsList();

  return (
    <>
      <ToolCardList toolsList={toolsList} />
    </>
  );
}
