
const MSPECS_API_URL = "https://integration.mspecs.se";

function getHeaders() {
  const token = process.env.MSPECS_ACCESS_TOKEN;
  const subscriberId = process.env.MSPECS_SUBSCRIBER_ID;

  if (!token) {
    throw new Error("MSPECS_ACCESS_TOKEN saknas i .env.local");
  }

  if (!subscriberId) {
    throw new Error("MSPECS_SUBSCRIBER_ID saknas i .env.local");
  }

  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "subscriber-id": subscriberId,
  };
}

// Hämta publicerade objekt till salu
export async function getDeals() {
  const response = await fetch(
    `${MSPECS_API_URL}/api/marketing/deals`,
    {
      headers: getHeaders(),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Mspecs getDeals: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

// Hämta sålda objekt, inklusive eventuella ytterligare sidor
export async function getSoldDeals() {
  const allDeals: any[] = [];
  let next: string | undefined;

  do {
    const url = new URL(
      `${MSPECS_API_URL}/api/marketing/sold/deals`
    );

    url.searchParams.set("limit", "1000");

    if (next) {
      url.searchParams.set("next", next);
    }

    const response = await fetch(url.toString(), {
      headers: getHeaders(),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorBody = await response.text();

      throw new Error(
        `Mspecs getSoldDeals: ${response.status} ` +
        `${response.statusText}. ${errorBody.slice(0, 500)}`
      );
    }

    const data = await response.json();
    console.log(
      "SÅLDA OBJEKT DATA:",
      JSON.stringify(data.deals, null, 2)
    );
    console.log("Mspecs sold API:", {
      status: response.status,
      antal: data.deals?.length,
      harNext: Boolean(data.next),
      nycklar: Object.keys(data),
    });

    if (Array.isArray(data.deals)) {
      allDeals.push(...data.deals);
    }

    next = data.next || undefined;
  } while (next);

  console.log("Antal sålda objekt från Mspecs:", allDeals.length);

  return allDeals;
}

// Hämta ett enskilt objekt
export async function getDeal(id: string) {
  const response = await fetch(
    `${MSPECS_API_URL}/api/marketing/deals/${encodeURIComponent(id)}`,
    {
      headers: getHeaders(),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Mspecs getDeal: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}
