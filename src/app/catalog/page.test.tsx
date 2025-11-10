import { render, screen } from "@testing-library/react";

import CatalogPage from "./page";
import { catalogCategories } from "@/data/catalog";

describe("CatalogPage", () => {
  it("renders the catalog hero and all categories", () => {
    render(<CatalogPage />);

    expect(
      screen.getByText(/Every electrical, industrial, and automation part/i),
    ).toBeInTheDocument();

    catalogCategories.forEach((category) => {
      expect(screen.getAllByText(category.name).length).toBeGreaterThan(0);
    });
  });
});
