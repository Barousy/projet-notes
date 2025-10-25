import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(
  request: NextRequest,
  { params }: { params: { tenant: string } }
) {
  try {
    const { 
      name, 
      email, 
      phone, 
      role = "STAFF",
      subjects = []
    } = await request.json();

    // Vérifier que le tenant existe
    const tenant = await prisma.tenant.findUnique({
      where: { slug: params.tenant }
    });

    if (!tenant) {
      return NextResponse.json({ error: "Tenant introuvable" }, { status: 404 });
    }

    // Vérifier que l'email n'existe pas déjà
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json({ error: "Cet email existe déjà" }, { status: 400 });
    }

    // Créer l'utilisateur professeur
    const hashedPassword = await bcrypt.hash("password123", 10); // Mot de passe par défaut
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        name,
        phone
      }
    });

    // Créer la relation UserOnTenant
    const userOnTenant = await prisma.userOnTenant.create({
      data: {
        userId: user.id,
        tenantId: tenant.id,
        role: role as any
      }
    });

    // Récupérer l'utilisateur avec ses relations
    const userWithRelations = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        tenants: {
          where: { tenantId: tenant.id },
          include: {
            tenant: true
          }
        }
      }
    });

    return NextResponse.json(userWithRelations);
  } catch (error) {
    console.error("Erreur lors de la création du professeur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du professeur" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { tenant: string } }
) {
  try {
    const tenant = await prisma.tenant.findUnique({
      where: { slug: params.tenant }
    });

    if (!tenant) {
      return NextResponse.json({ error: "Tenant introuvable" }, { status: 404 });
    }

    const teachers = await prisma.userOnTenant.findMany({
      where: { 
        tenantId: tenant.id,
        role: { in: ["SCHOOL_ADMIN", "STAFF"] }
      },
      include: {
        user: true
      }
    });

    return NextResponse.json(teachers);
  } catch (error) {
    console.error("Erreur lors de la récupération des professeurs:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des professeurs" },
      { status: 500 }
    );
  }
}
