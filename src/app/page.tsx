import Image from "next/image";
import styles from "./page.module.css";
import ToolCardList from "@/components/ToolCardList";
import { cookies } from "next/headers";

const getToolsList = () => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/tool/list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      return data?.tools || [];
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const search = (await searchParams).search?.toLowerCase() || "";

  let toolsList = await getToolsList();

  if (search) {
    toolsList = toolsList.filter(
      (tool: any) =>
        tool.name.toLowerCase().includes(search) ||
        tool.description.toLowerCase().includes(search)
    );
  }

  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value || "";

  return (
    <main className={styles.main}>
      <ToolCardList authToken={authToken} toolsList={toolsList} />
    </main>
  );
}
