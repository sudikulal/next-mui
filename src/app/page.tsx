import Image from "next/image";
import styles from "./page.module.css";
import ToolCardList from "@/components/ToolCardList";

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
      console.log(data);
      return data?.tools || [];
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

export default async function Home() {
  const toolsList = await getToolsList();

  return (
    <main className={styles.main}>
      <ToolCardList toolsList={toolsList} />
    </main>
  );
}
