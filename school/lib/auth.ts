
import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "school_erp_session";

export const ROLES = [
  "SUPER_ADMIN",
  "SCHOOL_ADMIN",
  "TEACHER",
  "ACCOUNTANT",
  "STUDENT",
  "PARENT",
] as const;

export type Role = (typeof ROLES)[number];

export type SessionUser = {
  userId: string;
  name: string;
  email: string;
  role: Role;
  schoolId?: string;
};

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET must be at least 32 characters long.");
  }

  return new TextEncoder().encode(secret);
}

export async function createSessionToken(user: SessionUser) {
  return new SignJWT({
    name: user.name,
    email: user.email,
    role: user.role,
    schoolId: user.schoolId,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.userId)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getJwtSecret());
}

export async function verifySessionToken(
  token: string
): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret(), {
      algorithms: ["HS256"],
    });

    const { sub, name, email, role, schoolId } = payload;

    if (
      typeof sub !== "string" ||
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof role !== "string" ||
      !ROLES.includes(role as Role)
    ) {
      return null;
    }

    return {
      userId: sub,
      name,
      email,
      role: role as Role,
      ...(typeof schoolId === "string" ? { schoolId } : {}),
    };
  } catch {
    return null;
  }
}
