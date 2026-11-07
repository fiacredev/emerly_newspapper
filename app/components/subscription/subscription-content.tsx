"use client";

import { useRef, useState } from "react";

type Billing = "monthly" | "annual";
type PlanId = "basic" | "standard" | "premium";

interface Plan {
  id: PlanId;
  name: string;
  description: string;
  features: string[];
  monthly: number;
  annual: number;
  highlight?: boolean;
}

const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    description: "Stay informed with our free daily newsletter.",
    features: [
      "Daily morning newsletter",
      "Limited article access",
      "Weekly opinion roundup",
    ],
    monthly: 0,
    annual: 0,
  },
  {
    id: "standard",
    name: "Standard",
    description: "Unlimited access to all news and analysis.",
    features: [
      "Unlimited articles",
      "Exclusive newsletters",
      "No advertising",
      "Mobile app access",
    ],
    monthly: 9.99,
    annual: 99,
    highlight: true,
  },
  {
    id: "premium",
    name: "Premium",
    description: "Everything in Standard plus premium perks.",
    features: [
      "Everything in Standard",
      "Premium long-form reports",
      "Early access to investigations",
      "Subscriber-only events",
    ],
    monthly: 19.99,
    annual: 199,
  },
];

function formatPrice(plan: Plan, billing: Billing) {
  if (plan.monthly === 0) return "Free";
  const value = billing === "monthly" ? plan.monthly : plan.annual;
  return `$${value.toFixed(2)}`;
}

function periodLabel(plan: Plan, billing: Billing) {
  if (plan.monthly === 0) return "";
  return billing === "monthly" ? "/ month" : "/ year";
}

export default function SubscriptionContent() {
  const [billing, setBilling] = useState<Billing>("annual");
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("standard");
  const [form, setForm] = useState({
    name: "",
    email: "",
    plan: "standard" as PlanId,
    newsletter: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const choosePlan = (id: PlanId) => {
    setSelectedPlan(id);
    setForm((prev) => ({ ...prev, plan: id }));
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.email.trim()) {
      setError("Please enter your name and email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-[1160px] px-4 py-10 md:py-14">
      <section className="text-center">
        <span className="text-xs font-bold uppercase tracking-[0.28em] text-accent">
          Subscription
        </span>
        <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
          Support independent journalism emelry subscription
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">
          Choose the plan that works for you and get unlimited access to reporting,
          analysis, and opinion from our newsroom.
        </p>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          "Unlimited article access",
          "Exclusive newsletters",
          "Ad-free reading",
          "Cancel anytime",
        ].map((benefit) => (
          <div
            key={benefit}
            className="flex items-center gap-3 rounded-sm border border-gray-200 bg-gray-50 px-4 py-3"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
              ✓
            </span>
            <span className="text-sm font-medium text-gray-800">{benefit}</span>
          </div>
        ))}
      </section>

      <section className="mt-12 flex flex-col items-center gap-4">
        <div className="inline-flex rounded-full border border-gray-200 bg-white p-1">
          <button
            type="button"
            onClick={() => setBilling("monthly")}
            className={`rounded-full px-5 py-2 text-sm font-bold transition-colors ${
              billing === "monthly"
                ? "bg-accent text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBilling("annual")}
            className={`rounded-full px-5 py-2 text-sm font-bold transition-colors ${
              billing === "annual"
                ? "bg-accent text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Annual
            <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-green-700">
              Save
            </span>
          </button>
        </div>
        <p className="text-xs text-gray-500">
          Annual plans are billed once per year. You can cancel at any time.
        </p>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id;
          return (
            <div
              key={plan.id}
              className={`flex flex-col rounded-sm border p-6 transition-shadow ${
                plan.highlight
                  ? "border-accent shadow-lg"
                  : "border-gray-200"
              } ${isSelected ? "ring-2 ring-accent" : ""}`}
            >
              {plan.highlight && (
                <span className="mb-4 inline-block self-start rounded-sm bg-accent px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
                  Most popular
                </span>
              )}
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                {plan.name}
              </h2>
              <p className="mt-2 text-sm text-gray-600">{plan.description}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-serif text-4xl font-bold text-gray-900">
                  {formatPrice(plan, billing)}
                </span>
                <span className="text-sm font-medium text-gray-500">
                  {periodLabel(plan, billing)}
                </span>
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <span className="mt-0.5 text-accent">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => choosePlan(plan.id)}
                className={`mt-8 w-full rounded-sm px-4 py-3 text-sm font-bold transition-colors ${
                  plan.highlight
                    ? "bg-accent text-white hover:bg-accent-dark"
                    : "border border-gray-300 bg-white text-gray-900 hover:border-accent hover:text-accent"
                }`}
              >
                {isSelected ? "Selected" : "Choose plan"}
              </button>
            </div>
          );
        })}
      </section>

      <section className="mt-16 border-t border-gray-200 pt-12">
        <div className="mx-auto max-w-xl">
          <h2 className="text-center font-serif text-3xl font-bold text-gray-900">
            Start your subscription
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your details to continue. Payment is handled securely at
            checkout.
          </p>

          {submitted ? (
            <div className="mt-8 rounded-sm border border-green-200 bg-green-50 px-6 py-8 text-center">
              <p className="text-lg font-bold text-green-800">
                Thank you for subscribing!
              </p>
              <p className="mt-2 text-sm text-green-700">
                A confirmation email has been sent to {form.email}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: "", email: "", plan: selectedPlan, newsletter: true });
                }}
                className="mt-4 text-sm font-bold text-accent hover:underline"
              >
                Subscribe another email
              </button>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >
              <div>
                <label
                  htmlFor="sub-name"
                  className="block text-xs font-bold uppercase tracking-wider text-gray-700"
                >
                  Full name
                </label>
                <input
                  id="sub-name"
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="mt-2 w-full rounded-sm border border-gray-300 px-3 py-2.5 text-sm text-gray-900 focus:border-accent focus:outline-none"
                  placeholder="Jane Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="sub-email"
                  className="block text-xs font-bold uppercase tracking-wider text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="sub-email"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="mt-2 w-full rounded-sm border border-gray-300 px-3 py-2.5 text-sm text-gray-900 focus:border-accent focus:outline-none"
                  placeholder="jane@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="sub-plan"
                  className="block text-xs font-bold uppercase tracking-wider text-gray-700"
                >
                  Selected plan
                </label>
                <select
                  id="sub-plan"
                  value={form.plan}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      plan: e.target.value as PlanId,
                    }))
                  }
                  className="mt-2 w-full rounded-sm border border-gray-300 px-3 py-2.5 text-sm text-gray-900 focus:border-accent focus:outline-none"
                >
                  {plans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name} —{" "}
                      {formatPrice(plan, billing)} {periodLabel(plan, billing)}
                    </option>
                  ))}
                </select>
              </div>

              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={form.newsletter}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, newsletter: e.target.checked }))
                  }
                  className="h-4 w-4 accent-accent"
                />
                Send me the daily newsletter and product updates.
              </label>

              {error && (
                <p className="text-sm font-medium text-accent">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-sm bg-accent px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Processing…" : "Continue to checkout"}
              </button>

              <p className="text-center text-xs text-gray-500">
                By continuing you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          )}
        </div>
      </section>

      <section className="mt-16 border-t border-gray-200 pt-12">
        <h2 className="font-serif text-3xl font-bold text-gray-900">
          Frequently asked questions
        </h2>
        <div className="mt-6 space-y-6">
          {[
            {
              q: "Can I cancel anytime?",
              a: "Yes. You can cancel your subscription at any time from your account settings. You will retain access until the end of your billing period.",
            },
            {
              q: "Is there a free trial?",
              a: "New subscribers can try Standard for 7 days before being charged. Cancel during the trial and you will not be billed.",
            },
            {
              q: "Do you offer student discounts?",
              a: "Verified students receive 50% off Standard and Premium plans. Contact support to apply.",
            },
          ].map((item) => (
            <div key={item.q} className="border-b border-gray-200 pb-6">
              <h3 className="font-serif text-xl font-bold text-gray-900">
                {item.q}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
