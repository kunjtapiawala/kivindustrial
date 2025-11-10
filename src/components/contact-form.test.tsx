import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";

import ContactForm from "./contact-form";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("ContactForm", () => {
  beforeEach(() => {
    mockedAxios.post.mockReset();
  });

  it("submits when required fields are complete", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { message: "ok" } });

    render(<ContactForm />);

    await userEvent.type(screen.getByLabelText(/Part Needed/i), "Hydraulic Pump");
    await userEvent.type(screen.getByLabelText(/Part Number/i), "PN-1234");
    await userEvent.type(screen.getByLabelText(/Quantity/i), "4");
    await userEvent.selectOptions(screen.getByLabelText(/Urgency/i), "Soon (1-2 weeks)");
    await userEvent.type(screen.getByLabelText(/Contact Email/i), "ops@example.com");
    await userEvent.type(screen.getByLabelText(/Contact Phone/i), "+1 555 123 4567");
    await userEvent.type(
      screen.getByLabelText(/Additional Details/i),
      "Need spec sheet included.",
    );

    await userEvent.click(screen.getByRole("button", { name: /Submit Request/i }));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith("/api/contact", {
        partName: "Hydraulic Pump",
        partNumber: "PN-1234",
        quantity: 4,
        urgency: "Soon (1-2 weeks)",
        contactEmail: "ops@example.com",
        contactPhone: "+1 555 123 4567",
        additionalInfo: "Need spec sheet included.",
      });
    });

    expect(
      await screen.findByText(/Request sent. We'll get back to you within 12 hours./i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/We respond within 12 hours. Need a quote faster?/i),
    ).toBeInTheDocument();
  });

  it("shows validation message when required fields missing", async () => {
    render(<ContactForm />);

    await userEvent.click(screen.getByRole("button", { name: /Submit Request/i }));

    expect(await screen.findByText(/Please tell us which part you need./i)).toBeInTheDocument();
    expect(mockedAxios.post).not.toHaveBeenCalled();
  });
});
