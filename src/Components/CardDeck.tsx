import { Box, Card, Typography, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";

export type CardItem = {
  label: string;
  to: string;
  icon: ReactNode;
  external?: boolean;
};

type CardDeckProps = {
  cardItems: CardItem[];
};

const colors = {
  borderPrimary: "var(--primary-3)",
  borderHover: "var(--secondary-2)",
  borderHoverDark: "var(--secondary-4)",
  cardBackground: "var(--surface-1)",
  cardBackgroundHover: "var(--primary-3)",
  text: "var(--text-primary)",
  icon: "var(--secondary-3)",
};

export default function CardDeck({ cardItems }: CardDeckProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        alignContent: "flex-start",
        gap: 3,
        px: 4,
        py: 6,
        height: "100%",
      }}
    >
      {cardItems.map(({ label, to, icon, external }) =>
        external ? (
          <a
            key={label}
            href={to}
            target="_blank"
            rel="noreferrer"
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "block",
              width: "fit-content",
            }}
          >
            <Card
              sx={{
                border: `2px solid ${colors.borderPrimary}`,
                boxShadow: "none",
                borderRadius: "12px",
                width: { xs: "180px", sm: "220px" },
                height: "120px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                p: 2,
                position: "relative",
                background: colors.cardBackground,
                "&:hover": {
                  borderColor: colors.borderHoverDark,
                  background: colors.cardBackgroundHover,
                  "& .MuiIconButton-root": {
                    transform: "rotate(15deg)",
                  },
                },
              }}
            >
              <Typography
                sx={{
                  color: colors.text,
                  fontSize: "1.1rem",
                }}
              >
                {label}
              </Typography>
              <Box sx={{ position: "absolute", bottom: 12, right: 16 }}>
                <IconButton
                  size="small"
                  sx={{
                    color: colors.icon,
                    transition: "transform 200ms ease",
                  }}
                >
                  {icon}
                </IconButton>
              </Box>
            </Card>
          </a>
        ) : (
          <Link
            key={label}
            to={to}
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "block",
              width: "fit-content",
            }}
          >
            <Card
              sx={{
                border: `2px solid ${colors.borderPrimary}`,
                boxShadow: "none",
                borderRadius: "12px",
                width: { xs: "180px", sm: "220px" },
                height: "120px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                p: 2,
                position: "relative",
                background: colors.cardBackground,
                "&:hover": {
                  borderColor: colors.borderHover,
                  background: colors.cardBackgroundHover,
                  "& .MuiIconButton-root": {
                    transform: "rotate(15deg)",
                  },
                },
              }}
            >
              <Typography
                sx={{
                  color: colors.text,
                  fontSize: "1.1rem",
                }}
              >
                {label}
              </Typography>
              <Box sx={{ position: "absolute", bottom: 12, right: 16 }}>
                <IconButton
                  size="small"
                  sx={{
                    color: colors.icon,
                    transition: "transform 200ms ease",
                  }}
                >
                  {icon}
                </IconButton>
              </Box>
            </Card>
          </Link>
        ),
      )}
    </Box>
  );
}
