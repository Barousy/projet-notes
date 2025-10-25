import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, name, adminEmail, adminName, adminPhone, schoolYear, startDate, endDate } = body;

    // Validation
    if (!slug || !name || !adminEmail || !adminName || !schoolYear || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    // Vérifier si le slug existe déjà
    const existingTenant = await prisma.tenant.findUnique({
      where: { slug }
    });

    if (existingTenant) {
      return NextResponse.json(
        { error: 'Cet identifiant est déjà utilisé. Veuillez en choisir un autre.' },
        { status: 400 }
      );
    }

    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: adminEmail }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Cet email est déjà utilisé. Veuillez en choisir un autre.' },
        { status: 400 }
      );
    }

    // Créer le tenant
    const tenant = await prisma.tenant.create({
      data: {
        slug,
        name,
        timezone: 'Europe/Paris'
      }
    });

    // Créer l'administrateur
    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        name: adminName,
        phone: adminPhone || null
      }
    });

    // Associer l'admin au tenant
    await prisma.userOnTenant.create({
      data: {
        userId: admin.id,
        tenantId: tenant.id,
        role: Role.SUPER_ADMIN
      }
    });

    // Créer l'année scolaire
    const year = await prisma.schoolYear.create({
      data: {
        tenantId: tenant.id,
        name: schoolYear,
        startDate: new Date(startDate),
        endDate: new Date(endDate)
      }
    });

    // Créer quelques salles par défaut
    const rooms = await Promise.all([
      prisma.room.create({
        data: { tenantId: tenant.id, name: 'Salle principale', capacity: 30 }
      }),
      prisma.room.create({
        data: { tenantId: tenant.id, name: 'Salle annexe', capacity: 20 }
      }),
      prisma.room.create({
        data: { tenantId: tenant.id, name: 'Bibliothèque', capacity: 25 }
      })
    ]);

    // Créer quelques matières par défaut
    const subjects = await Promise.all([
      prisma.subject.create({
        data: {
          tenantId: tenant.id,
          schoolYearId: year.id,
          name: 'Coran',
          category: 'quran',
          coefficient: 3
        }
      }),
      prisma.subject.create({
        data: {
          tenantId: tenant.id,
          schoolYearId: year.id,
          name: 'Tajwid',
          category: 'quran',
          coefficient: 2
        }
      }),
      prisma.subject.create({
        data: {
          tenantId: tenant.id,
          schoolYearId: year.id,
          name: 'Arabe',
          category: 'language',
          coefficient: 2
        }
      })
    ]);

    // Créer quelques classes par défaut
    const classes = await Promise.all([
      prisma.class.create({
        data: {
          tenantId: tenant.id,
          schoolYearId: year.id,
          name: 'Groupe Coran Débutants',
          roomId: rooms[0].id
        }
      }),
      prisma.class.create({
        data: {
          tenantId: tenant.id,
          schoolYearId: year.id,
          name: 'Groupe Arabe Niveau 1',
          roomId: rooms[1].id
        }
      })
    ]);

    const url = `/s/${slug}/dashboard`;

    return NextResponse.json({
      success: true,
      message: 'Entité créée avec succès',
      url,
      data: {
        tenant: tenant.name,
        admin: admin.name,
        year: year.name,
        rooms: rooms.length,
        subjects: subjects.length,
        classes: classes.length
      }
    });

  } catch (error: any) {
    console.error('Erreur lors de la création de l\'entité:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création. Veuillez réessayer.' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
