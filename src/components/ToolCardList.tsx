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

function ToolCardList({
  authToken,
  toolsList,
}: {
  authToken: String;
  toolsList: any[];
}) {
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
                <DeleteIcon />
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default ToolCardList;
