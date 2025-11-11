import { render, screen } from "@testing-library/react";

import AuctionsPage from "./page";

describe("AuctionsPage", () => {
  it("renders the auctions hero section", () => {
    render(<AuctionsPage />);

    expect(
      screen.getByText(/Industrial equipment auctions/i),
    ).toBeInTheDocument();
  });

  it("renders KIV Industrial Auctions title", () => {
    render(<AuctionsPage />);

    expect(
      screen.getByText(/KIV Industrial Auctions/i),
    ).toBeInTheDocument();
  });

  it("renders the coming soon section", () => {
    render(<AuctionsPage />);

    expect(
      screen.getByText(/Auctions platform launching soon/i),
    ).toBeInTheDocument();
  });
});

