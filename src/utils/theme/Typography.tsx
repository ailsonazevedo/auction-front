import { Plus_Jakarta_Sans } from "next/font/google";

export const plus = Plus_Jakarta_Sans({
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const typography: any = {
  body1: {
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: "1.334rem",
  },
  body2: {
    fontSize: "0.75rem",
    fontWeight: 400,
    letterSpacing: "0rem",
    lineHeight: "1rem",
  },
  button: {
    fontWeight: 400,
    textTransform: "capitalize",
  },
  fontFamily: plus.style.fontFamily,
  h1: {
    fontSize: "2.25rem",
    fontWeight: 600,
    lineHeight: "2.75rem",
  },
  h2: {
    fontSize: "1.875rem",
    fontWeight: 600,
    lineHeight: "2.25rem",
  },
  h3: {
    fontSize: "1.5rem",
    fontWeight: 600,
    lineHeight: "1.75rem",
  },
  h4: {
    fontSize: "1.3125rem",
    fontWeight: 600,
    lineHeight: "1.6rem",
  },
  h5: {
    fontSize: "1.125rem",
    fontWeight: 600,
    lineHeight: "1.6rem",
  },
  h6: {
    fontSize: "1rem",
    fontWeight: 600,
    lineHeight: "1.2rem",
  },
  subtitle1: {
    fontSize: "0.875rem",
    fontWeight: 400,
  },
  subtitle2: {
    fontSize: "0.875rem",
    fontWeight: 400,
  },
};

export default typography;
