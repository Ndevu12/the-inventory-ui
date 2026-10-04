import { NextResponse } from "next/server";

import {
  CONTACT_ANALYTICS_EVENTS,
  type ContactAnalyticsEvent,
} from "@/features/marketing/lib/contact-analytics";

const EVENTS = new Set<string>(CONTACT_ANALYTICS_EVENTS);

function isContactEvent(value: unknown): value is ContactAnalyticsEvent {
  return typeof value === "string" && EVENTS.has(value);
}

/** Record an anonymous contact event, and forward it when a webhook is set. */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ detail: "Invalid body" }, { status: 400 });
  }

  const event =
    body !== null && typeof body === "object" && "event" in body
      ? (body as { event: unknown }).event
      : null;
  if (!isContactEvent(event)) {
    return NextResponse.json({ detail: "Unknown event" }, { status: 400 });
  }

  console.info(JSON.stringify({ contact_event: event }));

  const webhook = process.env.CONTACT_ANALYTICS_WEBHOOK;
  if (webhook) {
    await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ event, path: "/contact" }),
    }).catch(() => undefined);
  }

  return new NextResponse(null, { status: 204 });
}
