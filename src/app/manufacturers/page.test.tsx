import { render, screen } from "@testing-library/react";

import ManufacturersPage from "./page";
import { manufacturers } from "@/data/manufacturers";

describe("ManufacturersPage", () => {
  it("renders most requested brands section and popular manufacturer names", () => {
    render(<ManufacturersPage />);

    expect(screen.getByText(/Most requested brands/i)).toBeInTheDocument();

    const popularNames = manufacturers.filter((manufacturer) => manufacturer.popular).map(({ name }) => name);

    popularNames.forEach((name) => {
      expect(screen.getAllByText(name)[0]).toBeInTheDocument();
    });
  });
});
