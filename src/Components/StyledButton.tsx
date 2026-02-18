import Button, { type ButtonProps } from "@mui/material/Button";
import Box from "@mui/material/Box";

export type StyledButtonVariant = "filled" | "tinted" | "outline" | "ghost";
export type StyledButtonSize = "small" | "default" | "large";

export interface StyledButtonPressEvent {
  name: string;
  variant: StyledButtonVariant;
  size: StyledButtonSize;
}

export interface StyledButtonIcon {
  src: string;
  position?: "left" | "right";
  ariaLabel?: string;
}

export interface StyledButtonProps
  extends Omit<ButtonProps, "variant" | "size" | "children"> {
  name: string;
  variant?: StyledButtonVariant;
  size?: StyledButtonSize;
  icon?: StyledButtonIcon;
  disabled?: boolean;
  onPressed?: (event: StyledButtonPressEvent) => void;
}

const disabledStyles = {
  bgcolor: "var(--surface-2)",
  color: "var(--text-muted)",
  borderColor: "var(--border-default)",
};

const sizeStyles: Record<StyledButtonSize, object> = {
  small: {
    minWidth: "72px",
    height: "30px",
    px: "10px",
    py: "6px",
    fontSize: "0.85rem",
    fontWeight: 600,
    borderRadius: "4px",
  },
  default: {
    minWidth: "86px",
    height: "38px",
    px: "12px",
    py: "10px",
    fontSize: "0.95rem",
    fontWeight: 600,
    borderRadius: "6px",
  },
  large: {
    minWidth: "100px",
    height: "48px",
    px: "16px",
    py: "12px",
    fontSize: "1rem",
    fontWeight: 600,
    borderRadius: "8px",
  },
};

const iconSize: Record<StyledButtonSize, number> = {
  small: 12,
  default: 14,
  large: 18,
};

function resolveIconSrc(src: string): string {
  if (
    src.startsWith("/") ||
    src.startsWith("http") ||
    src.startsWith("data:")
  ) {
    return src;
  }
  return new URL(src, import.meta.url).href;
}

function MaskIcon({
  src,
  sizePx,
  ariaLabel,
}: {
  src: string;
  sizePx: number;
  ariaLabel?: string;
}) {
  const url = resolveIconSrc(src);
  return (
    <Box
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      sx={{
        width: sizePx,
        height: sizePx,
        display: "inline-block",
        flex: "0 0 auto",
        bgcolor: "currentColor",
        WebkitMask: `url(${url}) no-repeat center / contain`,
        mask: `url(${url}) no-repeat center / contain`,
      }}
    />
  );
}

function variantSx(variant: StyledButtonVariant) {
  switch (variant) {
    case "filled":
      return {
        muiVariant: "contained" as const,
        sx: {
          bgcolor: "var(--primary-2)",
          color: "var(--text-inverse)",
          "&:hover": { bgcolor: "var(--primary-1)" },
          "&.Mui-disabled": disabledStyles,
        },
      };
    case "tinted":
      return {
        muiVariant: "outlined" as const,
        sx: {
          borderColor: "var(--primary-3)",
          bgcolor: "var(--primary-5)",
          color: "var(--text-primary)",
          "&:hover": {
            borderColor: "var(--secondary-2)",
            bgcolor: "var(--primary-4)",
          },
          "&.Mui-disabled": disabledStyles,
        },
      };
    case "outline":
      return {
        muiVariant: "outlined" as const,
        sx: {
          borderColor: "var(--primary-3)",
          bgcolor: "var(--surface-1)",
          color: "var(--text-primary)",
          "&:hover": {
            borderColor: "var(--secondary-2)",
            bgcolor: "var(--surface-2)",
          },
          "&.Mui-disabled": disabledStyles,
        },
      };
    case "ghost":
      return {
        muiVariant: "text" as const,
        sx: {
          color: "var(--secondary-2)",
          "&:hover": { bgcolor: "var(--surface-2)" },
          "&.Mui-disabled": { color: "var(--text-muted)" },
        },
      };
  }
}

export default function StyledButton({
  name,
  variant = "filled",
  size = "default",
  icon,
  disabled,
  onClick,
  onPressed,
  sx,
  ...rest
}: StyledButtonProps) {
  const { muiVariant, sx: variantStyles } = variantSx(variant);
  const iconPx = iconSize[size];
  const iconPosition = icon?.position ?? "left";

  return (
    <Button
      {...rest}
      disabled={disabled}
      variant={muiVariant}
      onClick={(event) => {
        onClick?.(event);
        onPressed?.({ name, variant, size });
      }}
      sx={{
        ...sizeStyles[size],
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        textTransform: "none",
        lineHeight: 1,
        ...variantStyles,
        ...(sx as object),
      }}
    >
      {icon && iconPosition === "left" && (
        <MaskIcon src={icon.src} sizePx={iconPx} ariaLabel={icon.ariaLabel} />
      )}

      <span>{name}</span>

      {icon && iconPosition === "right" && (
        <MaskIcon src={icon.src} sizePx={iconPx} ariaLabel={icon.ariaLabel} />
      )}
    </Button>
  );
}
