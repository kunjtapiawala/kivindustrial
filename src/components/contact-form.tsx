"use client";

import axios from "axios";
import { FormEvent, useMemo, useState } from "react";

const urgencyOptions = [
  "Immediate (24-48h)",
  "Soon (1-2 weeks)",
  "Flexible (2+ weeks)",
];

type FormState = {
  partName: string;
  partNumber: string;
  quantity: string;
  urgency: string;
  contactEmail: string;
  contactPhone: string;
  additionalInfo: string;
};

type SubmissionState = "idle" | "loading" | "success" | "error";

const defaultState: FormState = {
  partName: "",
  partNumber: "",
  quantity: "",
  urgency: urgencyOptions[0],
  contactEmail: "",
  contactPhone: "",
  additionalInfo: "",
};

const ContactForm = () => {
  const [formState, setFormState] = useState<FormState>(defaultState);
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const isSubmitDisabled = useMemo(() => {
    return submissionState === "loading";
  }, [submissionState]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormState((previous) => ({ ...previous, [name]: value }));
  };

  const validateForm = () => {
    if (!formState.partName.trim()) {
      setFeedbackMessage("Please tell us which part you need.");
      return false;
    }

    const quantityValue = Number(formState.quantity);

    if (!Number.isFinite(quantityValue) || quantityValue < 1) {
      setFeedbackMessage("Quantity must be at least 1.");
      return false;
    }

    if (!formState.contactEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.contactEmail)) {
      setFeedbackMessage("Enter a valid email address so we can respond.");
      return false;
    }

    if (!formState.contactPhone.trim() || !/^[+()\-\.\s\d]{7,}$/.test(formState.contactPhone)) {
      setFeedbackMessage("Provide a phone number so we can reach you quickly.");
      return false;
    }

    if (!urgencyOptions.includes(formState.urgency)) {
      setFeedbackMessage("Select a valid urgency level.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFeedbackMessage("");

    if (!validateForm()) {
      setSubmissionState("error");
      return;
    }

    setSubmissionState("loading");

    try {
      await axios.post("/api/contact", {
        partName: formState.partName.trim(),
        partNumber: formState.partNumber.trim() || undefined,
        quantity: Number(formState.quantity),
        urgency: formState.urgency,
        contactEmail: formState.contactEmail.trim(),
        contactPhone: formState.contactPhone.trim(),
        additionalInfo: formState.additionalInfo.trim() || undefined,
      });

      setSubmissionState("success");
      setFeedbackMessage("Request sent. We'll get back to you within 12 hours. For urgent quotes call 469-316-8517.");
      setFormState(defaultState);
    } catch (error) {
      console.error("Contact form submission failed", error);
      setSubmissionState("error");
      setFeedbackMessage("Something went wrong. Please try again or call 469-316-8517 for immediate assistance.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" aria-describedby="form-status" noValidate>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-primary">
          Part Needed
          <input
            type="text"
            name="partName"
            value={formState.partName}
            onChange={handleChange}
            placeholder="e.g., Stainless Steel Valve"
            className="rounded-lg border border-white/10 bg-surface/70 px-4 py-3 text-sm text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent"
            required
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-primary">
          Part Number (if known)
          <input
            type="text"
            name="partNumber"
            value={formState.partNumber}
            onChange={handleChange}
            placeholder="e.g., 6ES7 214-1HG40-0XB0"
            className="rounded-lg border border-white/10 bg-surface/70 px-4 py-3 text-sm text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-primary">
          Quantity
          <input
            type="number"
            name="quantity"
            min={1}
            value={formState.quantity}
            onChange={handleChange}
            className="rounded-lg border border-white/10 bg-surface/70 px-4 py-3 text-sm text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent"
            required
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-primary">
          Urgency
          <select
            name="urgency"
            value={formState.urgency}
            onChange={handleChange}
            className="rounded-lg border border-white/10 bg-surface/70 px-4 py-3 text-sm text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent"
            aria-label="Select urgency"
          >
            {urgencyOptions.map((option) => (
              <option key={option} value={option} className="bg-surface text-primary">
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm text-primary">
          Contact Email
          <input
            type="email"
            name="contactEmail"
            value={formState.contactEmail}
            onChange={handleChange}
            placeholder="you@company.com"
            className="rounded-lg border border-white/10 bg-surface/70 px-4 py-3 text-sm text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent"
            required
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-primary">
          Contact Phone
          <input
            type="tel"
            name="contactPhone"
            value={formState.contactPhone}
            onChange={handleChange}
            placeholder="469-316-8517"
            className="rounded-lg border border-white/10 bg-surface/70 px-4 py-3 text-sm text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent"
            required
          />
        </label>
      </div>
      <label className="flex flex-col gap-2 text-sm text-primary">
        Additional Details (optional)
        <textarea
          name="additionalInfo"
          value={formState.additionalInfo}
          onChange={handleChange}
          rows={4}
          className="resize-none rounded-lg border border-white/10 bg-surface/70 px-4 py-3 text-sm text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent"
          placeholder="Share specs, target pricing, or timing notes."
        />
      </label>
      <div className="space-y-3">
        <button
          type="submit"
          className="w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background transition hover:bg-[var(--accent-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitDisabled}
        >
          {submissionState === "loading" ? "Sending..." : "Submit Request"}
        </button>
        <p id="form-status" className="text-sm text-muted" aria-live="polite">
          {feedbackMessage}
        </p>
        <p className="text-xs text-muted">
          We respond within 12 hours. Need a quote faster? Call <a href="tel:+14693168517" className="text-primary underline-offset-2 hover:underline">469-316-8517</a> anytime.
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
