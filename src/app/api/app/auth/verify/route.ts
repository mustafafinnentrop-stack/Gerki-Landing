import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json(
      { valid: false },
      { status: 401, headers: CORS_HEADERS }
    );
  }

  const token = authHeader.slice(7);
  const secret = process.env.APP_JWT_SECRET;

  if (!secret) {
    console.error("APP_JWT_SECRET is not set");
    return NextResponse.json(
      { valid: false },
      { status: 500, headers: CORS_HEADERS }
    );
  }

  try {
    const payload = jwt.verify(token, secret, {
      algorithms: ["HS256"],
    }) as jwt.JwtPayload;

    return NextResponse.json(
      {
        valid: true,
        user: {
          id: payload.sub,
          email: payload.email,
          username: payload.username,
          plan: payload.plan,
          created_at: payload.iat
            ? new Date(payload.iat * 1000).toISOString()
            : null,
        },
      },
      { status: 200, headers: CORS_HEADERS }
    );
  } catch {
    return NextResponse.json(
      { valid: false },
      { status: 401, headers: CORS_HEADERS }
    );
  }
}
