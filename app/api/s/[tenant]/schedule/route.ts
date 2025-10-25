import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(
  request: NextRequest,
  { params }: { params: { tenant: string } }
) {
  try {
    const { 
      classId, 
      subjectId, 
      roomId, 
      weekday, 
      startsAt, 
      endsAt, 
      notes 
    } = await request.json();

    // Vérifier que le tenant existe
    const tenant = await prisma.tenant.findUnique({
      where: { slug: params.tenant }
    });

    if (!tenant) {
      return NextResponse.json({ error: "Tenant introuvable" }, { status: 404 });
    }

    // Vérifier que la classe existe
    const classe = await prisma.class.findFirst({
      where: { 
        id: classId,
        tenantId: tenant.id 
      }
    });

    if (!classe) {
      return NextResponse.json({ error: "Classe introuvable" }, { status: 400 });
    }

    // Vérifier que la matière existe
    const subject = await prisma.subject.findFirst({
      where: { 
        id: subjectId,
        tenantId: tenant.id 
      }
    });

    if (!subject) {
      return NextResponse.json({ error: "Matière introuvable" }, { status: 400 });
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

    // Créer la session
    const newSession = await prisma.session.create({
      data: {
        classId,
        subjectId,
        roomId: roomId || null,
        weekday: parseInt(weekday),
        startsAt,
        endsAt,
        notes: notes || null,
        tenantId: tenant.id
      },
      include: {
        class: true,
        subject: true,
        room: true
      }
    });

    return NextResponse.json(newSession);
  } catch (error) {
    console.error("Erreur lors de la création de la session:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la session" },
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

    const sessions = await prisma.session.findMany({
      where: { tenantId: tenant.id },
      include: {
        class: true,
        subject: true,
        room: true
      },
      orderBy: [
        { weekday: 'asc' },
        { startsAt: 'asc' }
      ]
    });

    return NextResponse.json(sessions);
  } catch (error) {
    console.error("Erreur lors de la récupération des sessions:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des sessions" },
      { status: 500 }
    );
  }
}
