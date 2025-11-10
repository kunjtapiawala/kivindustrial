/**
 * @jest-environment node
 */

import { POST } from "./route";

type NodemailerMock = {
  createTransport: jest.Mock;
  default: {
    createTransport: jest.Mock;
  };
};

jest.mock("nodemailer", () => {
  const createTransport = jest.fn();
  return {
    __esModule: true,
    default: { createTransport },
    createTransport,
  } satisfies NodemailerMock;
});

const nodemailerMock = jest.requireMock("nodemailer") as NodemailerMock;
const createTransportMock = nodemailerMock.createTransport;

let sendMailMock: jest.Mock;

describe("POST /api/contact", () => {
  const baseEnv = { ...process.env };

  beforeEach(() => {
    sendMailMock = jest.fn();
    createTransportMock.mockReturnValue({ sendMail: sendMailMock });

    Object.assign(process.env, baseEnv, {
      SMTP_HOST: "smtp.example.com",
      SMTP_PORT: "587",
      SMTP_USER: "smtp-user",
      SMTP_PASS: "smtp-pass",
      CONTACT_RECIPIENT_EMAIL: "owner@example.com",
      CONTACT_SENDER_EMAIL: "noreply@example.com",
    });
  });

  afterEach(() => {
    createTransportMock.mockReset();
    sendMailMock.mockReset();
    Object.assign(process.env, baseEnv);
  });

  it("returns 200 and sends email for valid payload", async () => {
    sendMailMock.mockResolvedValueOnce({});

    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({
        partName: "Hydraulic Pump",
        partNumber: "AB-123",
        quantity: 5,
        urgency: "Immediate (24-48h)",
        contactEmail: "ops@example.com",
        contactPhone: "+1-555-123-4567",
        additionalInfo: "Need overnight shipping",
      }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);

    expect(response.status).toBe(200);
    expect(createTransportMock).toHaveBeenCalledWith({
      host: "smtp.example.com",
      port: 587,
      secure: false,
      auth: {
        user: "smtp-user",
        pass: "smtp-pass",
      },
    });
    expect(sendMailMock).toHaveBeenCalledTimes(1);
    const payload = await response.json();
    expect(payload).toEqual({ message: "Request submitted" });
  });

  it("returns 400 when payload is invalid", async () => {
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({
        partName: "",
        quantity: 0,
        urgency: "Invalid",
        contactEmail: "bad-email",
        contactPhone: "",
      }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    expect(sendMailMock).not.toHaveBeenCalled();
  });
});
