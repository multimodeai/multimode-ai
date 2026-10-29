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
      { who: "assistant", text: `Thanks for calling ${biz}, this is their assistant. The crew's out on a pickup right now. What do you need hauled?` },
      { who: "caller", text: `An old couch and a dead fridge out of my garage${where(town)}.` },
      { who: "assistant", text: "Got it. Is everything in the garage, or does anything come down stairs?" },
      { who: "caller", text: "All in the garage. What does that run?" },
      { who: "assistant", text: "A couch and a fridge usually come to $150 to $250. The crew confirms the price when they see it, before they load anything. Fridges can carry a small disposal fee." },
      { who: "caller", text: "Okay. Thursday morning?" },
      { who: "assistant", text: "Thursday 9 to 11 is open. I've booked it, and I'm texting you a link to send a couple of photos so they show up with the right truck." },
    ],
    ownerText: (town, at) => `New job, ${at}. Sarah: couch + fridge, garage pickup${where(town)}. Booked Thu 9-11.`,
    after: (biz, town, at) => [
      { label: "On your Google Calendar", kind: "calendar", title: "Thursday · 9:00-11:00 AM", text: `Pickup: couch + fridge, garage, no stairs · Sarah · 1420 Elm St${where(town)} · quoted range $150-250 · photos attached` },
      { label: "Sarah gets a text", kind: "customer", text: `Hi Sarah, you're booked with ${biz} Thursday 9-11 AM. Couch + fridge usually runs $150-250; the crew confirms before loading. Send photos here: [link]. Reply C to change.` },
      { label: "You get a text", kind: "owner", text: `New job, ${at}. Sarah, couch + fridge from her garage${where(town)}, no stairs. Booked Thu 9-11. 3 photos in. Fridge disposal fee may apply.` },
      { label: "Wednesday evening", kind: "after", text: "Sarah gets a reminder for tomorrow's window, so you don't drive out to an empty house." },
      { label: "After the pickup", kind: "after", text: "You tap Approve on the invoice ($210). Sarah pays by a text link. The next morning she gets a thank-you and a Google review link." },
    ],
    footnote: "Prices here are made-up examples. Yours come from your own price list, and the assistant only ever gives a range. The firm price is always yours.",
  },
  lawn: {
    label: "lawn care",
    caller: "Mike",
    call: (biz, town) => [
      { who: "assistant", text: `Thanks for calling ${biz}, this is their assistant. They're both out on a job right now. How can I help?` },
      { who: "caller", text: `I need aeration and a fall cleanup${where(town)}. Saw you had dates left?` },
      { who: "assistant", text: "There are a couple left this month. Roughly how big is the yard, front and back?" },
      { who: "caller", text: "Average, maybe a quarter acre. What's the price?" },
      { who: "assistant", text: "Aeration on a yard that size is usually $65 to $95. A fall cleanup depends on the leaves, so they'll confirm it when they see it." },
      { who: "caller", text: "Okay, book me in." },
      { who: "assistant", text: "You're down for Saturday morning. I'm texting you the details, and they'll confirm the cleanup price on the day before they start." },
    ],
    ownerText: (town, at) => `New job, ${at}. Mike: aeration + fall cleanup, ~1/4 acre${where(town)}. Booked Sat AM.`,
    after: (biz, town, at) => [
      { label: "On your Google Calendar", kind: "calendar", title: "Saturday · 8:00-10:00 AM", text: `Aeration + fall cleanup · Mike · 1420 Elm St${where(town)} · ~1/4 acre · aeration quoted $65-95 · cleanup TBD on site` },
      { label: "Mike gets a text", kind: "customer", text: `Hi Mike, you're booked with ${biz} Saturday 8-10 AM for aeration and a fall cleanup. Aeration usually runs $65-95; cleanup is priced on the day. Please flag sprinkler heads. Reply C to change.` },
      { label: "You get a text", kind: "owner", text: `New job, ${at}. Mike, aeration + cleanup, ~1/4 acre${where(town)}. Booked Sat 8-10. Two dates left this month.` },
      { label: "After the job", kind: "after", text: "You tap Approve on the invoice. Mike pays by a text link, then gets a review request the next day." },
      { label: "In spring", kind: "after", text: "Mike gets a short text offering his spring aeration slot first, before you post dates on Facebook." },
    ],
    footnote: "Prices here are made-up examples. Yours come from your own price list, and the assistant only ever gives a range. The firm price is always yours.",
  },
  flooring: {
    label: "flooring",
    caller: "Dana",
    call: (biz, town) => [
      { who: "assistant", text: `Thanks for calling ${biz}, this is their assistant. The team's at an install right now. What are you looking at doing?` },
      { who: "caller", text: `New floors in two bedrooms and a hallway${where(town)}.` },
      { who: "assistant", text: "Nice. Any idea what you'd like, carpet, vinyl plank, something else? And roughly how many square feet?" },
      { who: "caller", text: "Probably vinyl plank, maybe 450 square feet. Ballpark?" },
      { who: "assistant", text: "Vinyl plank installed usually runs $4 to $8 a square foot, depending on the product and the floor underneath. They'll measure and give you an exact quote when they bring samples." },
      { who: "caller", text: "Can they come out this week?" },
      { who: "assistant", text: "Wednesday 5 PM is open for the samples visit. I've booked it and I'm texting you a confirmation." },
    ],
    ownerText: (town, at) => `New lead, ${at}. Dana: LVP, 2 bedrooms + hall, ~450 sq ft${where(town)}. Samples visit Wed 5 PM.`,
    after: (biz, town, at) => [
      { label: "On your Google Calendar", kind: "calendar", title: "Wednesday · 5:00-6:00 PM", text: `Samples + measure · Dana · 1420 Elm St${where(town)} · LVP, 2 bedrooms + hall, ~450 sq ft · ballpark given $4-8/sq ft` },
      { label: "Dana gets a text", kind: "customer", text: `Hi Dana, ${biz} will bring samples and measure Wednesday at 5 PM. Exact quote after measuring. Reply C to change.` },
      { label: "You get a text", kind: "owner", text: `New lead, ${at}. Dana, LVP ~450 sq ft, 2 bedrooms + hall${where(town)}. Samples visit Wed 5 PM.` },
      { label: "After you send the quote", kind: "after", text: "If Dana hasn't replied in 3 days, she gets a friendly check-in from you, with your OK first. Quotes that go quiet are where flooring jobs get lost." },
      { label: "After the install", kind: "after", text: "You tap Approve on the final invoice. Dana pays by a text link, then gets a review request the next day." },
    ],
    footnote: "Prices here are made-up examples. Yours come from your own price list, and the assistant only ever gives a range. The firm price is always yours.",
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
      { who: "assistant", text: `Thanks for calling ${biz}, this is their assistant. The tech's on a job right now. What's going on?` },
      { who: "caller", text: `My furnace is making a banging noise when it kicks on${where(town)}.` },
      { who: "assistant", text: "Okay. First, do you smell gas at all, or is it just the noise?" },
      { who: "caller", text: "No smell, just loud. What's this going to cost?" },
      { who: "assistant", text: "There's an $89 service call to diagnose it, and that goes toward the repair if you go ahead. The tech gives you the exact price before doing any work." },
      { who: "caller", text: "Fine. When can someone come?" },
      { who: "assistant", text: "Tomorrow 8 to 10 AM is open. I've booked it and I'm texting you the details. If you ever smell gas, leave the house and call the gas company first." },
    ],
    ownerText: (town, at) => `New service call, ${at}. Priya: furnace banging on start-up, no gas smell${where(town)}. Booked tomorrow 8-10.`,
    after: (biz, town, at) => [
      { label: "On your Google Calendar", kind: "calendar", title: "Tomorrow · 8:00-10:00 AM", text: `Diagnostic: furnace banging on start-up · Priya · 1420 Elm St${where(town)} · no gas smell confirmed · $89 service call quoted` },
      { label: "Priya gets a text", kind: "customer", text: `Hi Priya, you're booked with ${biz} tomorrow 8-10 AM. $89 service call, credited toward the repair. If you smell gas, leave and call the gas company. Reply C to change.` },
      { label: "You get a text", kind: "owner", text: `New service call, ${at}. Priya, furnace banging on start-up, no gas smell${where(town)}. Booked tomorrow 8-10.` },
      { label: "If it turns into a replacement", kind: "after", text: "You send the quote from your phone. If Priya goes quiet, she gets a check-in after 3 days, with your OK first." },
      { label: "After the job", kind: "after", text: "You tap Approve on the invoice. Priya pays by a text link, then gets a review request the next day." },
    ],
    footnote: "Prices here are made-up examples. Yours come from your own price list, and the assistant only ever gives a range or your set service-call fee. The repair price is always yours, on site. Anything that sounds like gas goes straight to the gas company and to you.",
  },
};
