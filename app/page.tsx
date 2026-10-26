import { getDeals } from "@/lib/mspecs";

import Hero from "@/components/Hero";
import Properties from "@/components/Properties";
import Valuation from "@/components/Valuation";
import Broker from "@/components/Broker";
import UniqueHome from "@/components/UniqueHome";

export default async function HomePage() {
  const data = await getDeals();

  console.log("MSPECS DEALS:", data);

  const deals = Array.isArray(data)
    ? data
    : data?.deals || data?.items || [];

  return (
    <main>
      <Hero />

      <Properties deals={deals} />
      <Broker/>

      <Valuation/>
      <UniqueHome/>
    </main>
  );
}
