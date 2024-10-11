import { prisma } from "@/prisma/prisma-client";
import { findOrCreateCart, updateCartTotalAmount } from "@/shared/lib";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ items: [], totalAmount: 0 });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            token,
          },
        ],
      },
      include: {
        items: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (error) {
    console.error("[CART_GET] Server error", error);
    return NextResponse.json(
      { message: "Не удалось получить корзину" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);
    const data = (await req.json()) as CreateCartItemValues;

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        ingredients: { every: { id: { in: data.ingredients } } },
      },
    });

    // const many = await prisma.cartItem.findMany({
    //   where: {
    //     cartId: userCart.id,
    //     productItemId: data.productItemId,
    //     ingredients: { every: { id: { in: data.ingredients } } },
    //   },
    // });

    // console.log(many);

    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          quantity: 1,
          ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
        },
      });
    }

    const updatedUserCart = await updateCartTotalAmount(token);

    const res = NextResponse.json(updatedUserCart);
    res.cookies.set("cartToken", token);
    return res;
  } catch (error) {
    console.error("[CART_POST] Server error", error);
    return NextResponse.json(
      { message: "Не удалось создать корзину" },
      { status: 500 }
    );
  }
}
