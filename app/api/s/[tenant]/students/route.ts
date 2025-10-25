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
      matricule, 
      birthDate, 
      gender, 
      guardianName, 
      guardianEmail, 
      guardianPhone, 
      relation 
    } = await request.json();

    // Vérifier que le tenant existe
    const tenant = await prisma.tenant.findUnique({
      where: { slug: params.tenant }
    });

    if (!tenant) {
      return NextResponse.json({ error: "Tenant introuvable" }, { status: 404 });
    }

    // Vérifier que le matricule n'existe pas déjà
    const existingStudent = await prisma.student.findUnique({
      where: { matricule }
    });

    if (existingStudent) {
      return NextResponse.json({ error: "Ce matricule existe déjà" }, { status: 400 });
    }

    // Vérifier que l'email n'existe pas déjà
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json({ error: "Cet email existe déjà" }, { status: 400 });
    }

    // Créer l'utilisateur étudiant
    const hashedPassword = await bcrypt.hash("password123", 10); // Mot de passe par défaut
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        name,
        phone
      }
    });

    // Créer l'étudiant
    const student = await prisma.student.create({
      data: {
        matricule,
        birthDate: birthDate ? new Date(birthDate) : null,
        gender,
        tenantId: tenant.id,
        userId: user.id
      }
    });

    // Créer le tuteur si fourni
    if (guardianName && guardianEmail) {
      // Vérifier si le tuteur existe déjà
      let guardianUser = await prisma.user.findUnique({
        where: { email: guardianEmail }
      });

      if (!guardianUser) {
        const guardianHashedPassword = await bcrypt.hash("password123", 10);
        guardianUser = await prisma.user.create({
          data: {
            email: guardianEmail,
            passwordHash: guardianHashedPassword,
            name: guardianName,
            phone: guardianPhone
          }
        });
      }

      // Créer le guardian
      const guardian = await prisma.guardian.create({
        data: {
          userId: guardianUser.id,
          tenantId: tenant.id
        }
      });

      // Lier l'étudiant au tuteur
      await prisma.studentGuardian.create({
        data: {
          studentId: student.id,
          guardianId: guardian.id,
          tenantId: tenant.id,
          relation: relation || "Parent"
        }
      });
    }

    // Récupérer l'étudiant avec ses relations
    const studentWithRelations = await prisma.student.findUnique({
      where: { id: student.id },
      include: {
        user: true,
        guardians: {
          include: {
            guardian: {
              include: {
                user: true
              }
            }
          }
        },
        enrollments: {
          include: {
            class: true
          }
        }
      }
    });

    return NextResponse.json(studentWithRelations);
  } catch (error) {
    console.error("Erreur lors de la création de l'étudiant:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de l'étudiant" },
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

    const students = await prisma.student.findMany({
      where: { tenantId: tenant.id },
      include: {
        user: true,
        guardians: {
          include: {
            guardian: {
              include: {
                user: true
              }
            }
          }
        },
        enrollments: {
          include: {
            class: true
          }
        }
      }
    });

    return NextResponse.json(students);
  } catch (error) {
    console.error("Erreur lors de la récupération des étudiants:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des étudiants" },
      { status: 500 }
    );
  }
}
