import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(
  request: NextRequest,
  { params }: { params: { tenant: string } }
) {
  try {
    const { name, schoolYearId, roomId } = await request.json();

    // Vérifier que le tenant existe
    const tenant = await prisma.tenant.findUnique({
      where: { slug: params.tenant }
    });

    if (!tenant) {
      return NextResponse.json({ error: "Tenant introuvable" }, { status: 404 });
    }

    // Vérifier que l'année scolaire existe
    const schoolYear = await prisma.schoolYear.findFirst({
      where: { 
        id: schoolYearId,
        tenantId: tenant.id 
      }
    });

    if (!schoolYear) {
      return NextResponse.json({ error: "Année scolaire introuvable" }, { status: 400 });
    }

    // Vérifier que la salle existe (si fournie)
    if (roomId) {
      const room = await prisma.room.findFirst({
        where: { 
          id: roomId,
          tenantId: tenant.id 
        }
      });

      if (!room) {
        return NextResponse.json({ error: "Salle introuvable" }, { status: 400 });
      }
    }

    // Créer la classe
    const newClass = await prisma.class.create({
      data: {
        name,
        schoolYearId,
        roomId: roomId || null,
        tenantId: tenant.id
      },
      include: {
        schoolYear: true,
        room: true,
        enrollments: {
          include: {
            student: {
              include: {
                user: true
              }
            }
          }
        }
      }
    });

    return NextResponse.json(newClass);
  } catch (error) {
    console.error("Erreur lors de la création de la classe:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la classe" },
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

    const classes = await prisma.class.findMany({
      where: { tenantId: tenant.id },
      include: {
        schoolYear: true,
        room: true,
        enrollments: {
          include: {
            student: {
              include: {
                user: true
              }
            }
          }
        }
      }
    });

    return NextResponse.json(classes);
  } catch (error) {
    console.error("Erreur lors de la récupération des classes:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des classes" },
      { status: 500 }
    );
  }
}
