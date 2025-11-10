import React from "react";
import "@testing-library/jest-dom";

jest.mock("next/link", () => {
  const Link = ({ children, href, ...rest }: { children: React.ReactNode; href: string }) =>
    React.createElement("a", { href, ...rest }, children);
  Link.displayName = "NextLink";
  return Link;
});
