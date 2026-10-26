import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch(
            "https://integration.mspecs.se/api/marketing/deals",
            {
                headers: {
                    Authorization: `Bearer ${process.env.MSPECS_ACCESS_TOKEN}`,
                    "subscriber-id": process.env.MSPECS_SUBSCRIBER_ID!,
                    Accept: "application/json",
                },
                cache: "no-store",
            }
        );

        const text = await response.text();

        console.log("Mspecs status:", response.status);
        console.log("Mspecs response:", text);

        const deals = JSON.parse(text);

        console.log("ANTAL DEALS:", deals.length);

        console.log(
            "DEALS:",
            deals.map((deal: any) => ({
                id: deal.id,
                shortId: deal.shortId,
                name: deal.displayName,
                saleStatus: deal.publishingInformation?.saleStatus,
                publishingStatus: deal.publishingInformation?.status,
                published: deal.publishingInformation?.published,
                updated: deal.publishingInformation?.updated,
            }))
        );

        return new NextResponse(text, {
            status: response.status,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Mspecs request failed:", error);

        return NextResponse.json(
            {
                error: "Could not connect to Mspecs",
            },
            { status: 500 }
        );
    }
}