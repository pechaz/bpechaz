import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

// Since we have a root `[locale]` layout, this root layout is just a wrapper
// that passes children through. Next.js requires a root layout.
export default function RootLayout({ children }: Props) {
  return children;
}
