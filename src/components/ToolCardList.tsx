"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { Co2Sharp } from "@mui/icons-material";

function ToolCardList({
  authToken,
  toolsList,
}: {
  authToken: String;
  toolsList: any[];
}) {
  const handleClick = (id: String) => {
    if (confirm("Are you sure you want to delete this tool?")) {
      fetch(process.env.NEXT_PUBLIC_API_URL + "/tool/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          cookies: `auth_token=${authToken}`,
        },
      })
        .then((res) => {
          console.log(res);
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          alert(data.message);
          window.location.reload();
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    }
    toolsList.splice(
      toolsList.findIndex((tool) => tool._id === id),
      1
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        gap: 4,
        mt: 2,
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {toolsList.map((tool, index) => (
        <Card
          key={index}
          variant="outlined"
          sx={{
            width: { xs: "90%", sm: 300 },
            display: "flex",
            flexDirection: "column",
            "&:hover": {
              boxShadow: 6,
              borderColor: "primary.main",
            },
          }}
        >
          <Box
            component="img"
            src={
              tool.tumbnail ||
              "https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=300"
            }
            alt={tool.name}
            loading="lazy"
            sx={{
              width: "100%",
              height: 180,
              objectFit: "cover",
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
            }}
          />
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {tool.name}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {tool.description}
            </Typography>
            <Link href={tool.link} target="_blank">
              <OpenInNewIcon />
            </Link>
            {Boolean(authToken) && (
              <>
                <EditIcon />
                <Button
                  startIcon={<DeleteIcon />}
                  onClick={() => handleClick(tool._id)}
                />
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default ToolCardList;
