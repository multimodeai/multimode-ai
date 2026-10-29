// Trade-specific call scripts for the missed-call demo. No business names live
// here: the page fills in the business from a data file kept outside the repo.

export type Line = { who: "assistant" | "caller"; text: string };

export type Step = {
  label: string;
  kind: "calendar" | "customer" | "owner" | "after";
  title?: string;
  text: string;
};

export type Trade = {
  label: string;
  caller: string;
  call: (biz: string, town: string) => Line[];
  ownerText: (town: string, at: string) => string;
  // Optional fuller sequence after the call. Without it, the page shows ownerText only.
  after?: (biz: string, town: string, at: string) => Step[];
  footnote?: string;
};

const where = (town: string) => (town ? ` in ${town}` : "");

export const TRADES: Record<string, Trade> = {
  junk: {
    label: "junk removal",
    caller: "Sarah",
    call: (biz, town) => [
      { who: "assistant", text: `Thanks for calling ${biz}. The crew's out on a job right now, so I'm picking up for them. What do you need hauled?` },
      { who: "caller", text: `An old couch and a dead fridge out of my garage${where(town)}.` },
      { who: "assistant", text: "Got it. What's the address, and what day works best?" },
      { who: "caller", text: "1420 Elm, and Thursday morning if they can." },
      { who: "assistant", text: "Perfect. I'm texting you a link to send a couple of photos so they can quote it properly. You'll hear back by 5 today." },
    ],
    ownerText: (town, at) => `New job, ${at}. Sarah: couch + fridge, garage pickup${where(town)}. Wants Thu AM. Photos coming. Quote by 5.`,
  },
  lawn: {
    label: "lawn care",
    caller: "Mike",
    call: (biz, town) => [
      { who: "assistant", text: `Thanks for calling ${biz}. They're on a job right now, so I'm picking up for them. How can I help?` },
      { who: "caller", text: `I need aeration and a fall cleanup${where(town)}. Saw you had dates left?` },
      { who: "assistant", text: "There are openings this month. Roughly how big is the yard, front and back?" },
      { who: "caller", text: "Average, quarter acre maybe." },
      { who: "assistant", text: "Great. I'll hold the next open date for you and text you to confirm the price. Is this the best number?" },
    ],
    ownerText: (town, at) => `New job, ${at}. Mike: aeration + fall cleanup, ~1/4 acre${where(town)}. Holding next open date. Confirm price by text.`,
  },
  flooring: {
    label: "flooring",
    caller: "Dana",
    call: (biz, town) => [
      { who: "assistant", text: `Thanks for calling ${biz}. The team's at a job right now, so I'm picking up for them. What are you looking at doing?` },
      { who: "caller", text: `New floors in two bedrooms and a hallway${where(town)}.` },
      { who: "assistant", text: "Nice. Do you know what you'd like, carpet, vinyl plank, something else? And roughly how many square feet?" },
      { who: "caller", text: "Probably vinyl plank. Maybe 450 square feet." },
      { who: "assistant", text: "Got it. They bring samples to you, so I'm texting you a link to pick a time for the visit." },
    ],
    ownerText: (town, at) => `New quote, ${at}. Dana: LVP, 2 bedrooms + hall, ~450 sq ft${where(town)}. Booking a sample visit.`,
  },
  garage: {
    label: "garage doors",
    caller: "Tom",
    call: (biz, town) => [
      { who: "assistant", text: `Thanks for calling ${biz}, this is their assistant. The tech's up on a job right now. What's going on with your door?` },
      { who: "caller", text: `The spring snapped this morning and the door won't open${where(town)}. My car's stuck inside.` },
      { who: "assistant", text: "Okay, we'll treat that as a priority. Please don't touch the spring or the cables, they're under a lot of tension. Single or double door?" },
      { who: "caller", text: "Double. How much is this going to cost me?" },
      { who: "assistant", text: "Spring replacements usually run $250 to $400 depending on the door. There's a $79 service call, and that's credited if you go ahead. The tech confirms the exact price before starting." },
      { who: "caller", text: "Fine. Can someone come today?" },
      { who: "assistant", text: "There's an opening today between 4:30 and 5:30. I've booked it and I'm texting you the details now." },
    ],
    ownerText: (town, at) => `Priority job, ${at}. Tom: broken spring, double door${where(town)}, car stuck inside. Booked today 4:30-5:30.`,
    after: (biz, town, at) => [
      { label: "On your Google Calendar", kind: "calendar", title: "Today · 4:30-5:30 PM", text: `Spring replacement, double door · Tom · 1420 Elm St${where(town)} · PRIORITY: car stuck inside · quoted range $250-400 + $79 service call` },
      { label: "Tom gets a text", kind: "customer", text: `Hi Tom, you're booked with ${biz} today 4:30-5:30 PM. Spring replacements usually run $250-400; the tech confirms the price before starting. Reply C to change the time.` },
      { label: "You get a text", kind: "owner", text: `New priority job, ${at}. Tom, broken spring, double door${where(town)}, car stuck inside. Booked today 4:30-5:30. Full call notes in your email.` },
      { label: "After the job", kind: "after", text: "You tap Approve on the invoice ($320). Tom gets a pay-by-text link. Nobody reads a card number over the phone." },
      { label: "Next morning", kind: "after", text: `Tom gets a short thank-you from ${biz} and a link to leave a Google review.` },
    ],
    footnote: "Prices here are made-up examples. Yours come from your own price list, and the assistant only ever gives a range. The firm price is always yours, on site.",
  },
  hvac: {
    label: "heating and cooling",
    caller: "Priya",
    call: (biz, town) => [
      { who: "assistant", text: `Thanks for calling ${biz}. The tech's on a job right now, so I'm picking up for them. What's going on?` },
      { who: "caller", text: `My furnace is making a banging noise when it kicks on${where(town)}.` },
      { who: "assistant", text: "Okay. Any smell of gas, or is it just the noise?" },
      { who: "caller", text: "No smell, just loud." },
      { who: "assistant", text: "Good. I'll put you down for a service visit and text you the first open time. If you ever smell gas, leave the house and call the gas company first." },
    ],
    ownerText: (town, at) => `New service call, ${at}. Priya: furnace banging on start-up, no gas smell${where(town)}. Texting her the next slot.`,
  },
};
