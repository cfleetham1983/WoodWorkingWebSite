import { Paper, Typography } from "@mui/material";

type PageContentPanelProps = {
  title: string;
  description: string;
};

export default function PageContentPanel({
  title,
  description,
}: PageContentPanelProps) {
  return (
    <>
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          p: 2,
          backgroundColor: "var(--surface-1)",
          border: "1px solid var(--border-default)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "var(--primary-1)",
          }}
        >
          {title}
        </Typography>
      </Paper>
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          p: 2,
          mt: 1,
          backgroundColor: "var(--surface-1)",
          border: "1px solid var(--border-default)",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: "bold",
            color: "var(--text-muted)",
          }}
        >
          {description}
        </Typography>
      </Paper>
    </>
  );
}
