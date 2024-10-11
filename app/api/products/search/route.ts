import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query") || "";

  const products = await prisma.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query.toLowerCase(),
          },
        },
        {
          name: {
            contains:
              query.slice(0, 1).toUpperCase() + query.slice(1).toLowerCase(),
          },
        },
      ],
    },
    take: 5,
  });

  return NextResponse.json(products);
}
