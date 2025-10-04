import { PrismaClient, Role, AttendanceStatus } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Début du seed avec données réelles...");

  // 1. Créer le tenant Masjid An-Noor
  const tenant = await prisma.tenant.upsert({ 
    where: { slug: "masjid-noor" }, 
    update: {}, 
    create: { 
      slug: "masjid-noor", 
      name: "Masjid An-Noor",
      timezone: "Europe/Paris"
    } 
  });
  console.log("✅ Tenant créé:", tenant.name);

  // 2. Créer l'administrateur
  const admin = await prisma.user.upsert({ 
    where: { email: "admin@masjid-noor.com" }, 
    update: {}, 
    create: { 
      email: "admin@masjid-noor.com", 
      name: "Sheikh Ahmed Al-Mansouri",
      phone: "+33 1 23 45 67 89"
    } 
  });
  
  await prisma.userOnTenant.upsert({ 
    where: { userId_tenantId: { userId: admin.id, tenantId: tenant.id } }, 
    update: { role: Role.SUPER_ADMIN }, 
    create: { userId: admin.id, tenantId: tenant.id, role: Role.SUPER_ADMIN } 
  });
  console.log("✅ Admin créé:", admin.name);

  // 3. Créer l'année scolaire
  const year = await prisma.schoolYear.create({ 
    data: { 
      tenantId: tenant.id, 
      name: "2025-2026", 
      startDate: new Date("2025-09-01"), 
      endDate: new Date("2026-07-01") 
    } 
  });
  console.log("✅ Année scolaire créée:", year.name);

  // 4. Créer les salles
  const rooms = await Promise.all([
    prisma.room.create({ data: { tenantId: tenant.id, name: "Salle 101", capacity: 25 } }),
    prisma.room.create({ data: { tenantId: tenant.id, name: "Salle 102", capacity: 20 } }),
    prisma.room.create({ data: { tenantId: tenant.id, name: "Salle 103", capacity: 15 } }),
    prisma.room.create({ data: { tenantId: tenant.id, name: "Bibliothèque", capacity: 30 } }),
  ]);
  console.log("✅ Salles créées:", rooms.length);

  // 5. Créer les matières
  const subjects = await Promise.all([
    prisma.subject.create({ data: { tenantId: tenant.id, schoolYearId: year.id, name: "Coran", category: "quran", coefficient: 3 } }),
    prisma.subject.create({ data: { tenantId: tenant.id, schoolYearId: year.id, name: "Tajwid", category: "quran", coefficient: 2 } }),
    prisma.subject.create({ data: { tenantId: tenant.id, schoolYearId: year.id, name: "Arabe", category: "language", coefficient: 2 } }),
    prisma.subject.create({ data: { tenantId: tenant.id, schoolYearId: year.id, name: "Tafsir", category: "quran", coefficient: 2 } }),
    prisma.subject.create({ data: { tenantId: tenant.id, schoolYearId: year.id, name: "Fiqh", category: "islamic", coefficient: 1 } }),
  ]);
  console.log("✅ Matières créées:", subjects.length);

  // 6. Créer les classes
  const classes = await Promise.all([
    prisma.class.create({ data: { tenantId: tenant.id, schoolYearId: year.id, name: "Groupe Coran Débutants", roomId: rooms[0].id } }),
    prisma.class.create({ data: { tenantId: tenant.id, schoolYearId: year.id, name: "Groupe Coran Intermédiaires", roomId: rooms[1].id } }),
    prisma.class.create({ data: { tenantId: tenant.id, schoolYearId: year.id, name: "Groupe Coran Avancés", roomId: rooms[2].id } }),
    prisma.class.create({ data: { tenantId: tenant.id, schoolYearId: year.id, name: "Groupe Arabe", roomId: rooms[3].id } }),
    prisma.class.create({ data: { tenantId: tenant.id, schoolYearId: year.id, name: "Groupe Tafsir", roomId: rooms[0].id } }),
  ]);
  console.log("✅ Classes créées:", classes.length);

  // 7. Créer les sessions (emploi du temps)
  const sessions = [];
  for (const classe of classes) {
    const classSubjects = classe.name.includes("Coran") ? [subjects[0], subjects[1]] : 
                         classe.name.includes("Arabe") ? [subjects[2]] : 
                         [subjects[3]];
    
    for (const subject of classSubjects) {
      sessions.push(
        prisma.session.create({
          data: {
            tenantId: tenant.id,
            classId: classe.id,
            subjectId: subject.id,
            roomId: classe.roomId,
            weekday: classe.name.includes("Débutants") ? 1 : 
                    classe.name.includes("Intermédiaires") ? 2 :
                    classe.name.includes("Avancés") ? 3 :
                    classe.name.includes("Arabe") ? 4 : 5,
            startsAt: "10:00",
            endsAt: "12:00",
            notes: `Session ${subject.name} pour ${classe.name}`
          }
        })
      );
    }
  }
  await Promise.all(sessions);
  console.log("✅ Sessions créées:", sessions.length);

  // 8. Créer des tuteurs
  const guardians = await Promise.all([
    prisma.user.create({ data: { email: "ahmed.hassan@email.com", name: "Ahmed Al-Hassan", phone: "+33 1 23 45 67 90" } }),
    prisma.user.create({ data: { email: "fatima.benali@email.com", name: "Fatima Ben Ali", phone: "+33 1 23 45 67 91" } }),
    prisma.user.create({ data: { email: "omar.said@email.com", name: "Omar Said", phone: "+33 1 23 45 67 92" } }),
    prisma.user.create({ data: { email: "layla.mahdi@email.com", name: "Layla Al-Mahdi", phone: "+33 1 23 45 67 93" } }),
    prisma.user.create({ data: { email: "youssef.zahra@email.com", name: "Youssef Al-Zahra", phone: "+33 1 23 45 67 94" } }),
  ]);

  const guardianRecords = await Promise.all(
    guardians.map(guardian => 
      prisma.guardian.create({ 
        data: { 
          userId: guardian.id, 
          tenantId: tenant.id 
        } 
      })
    )
  );
  console.log("✅ Tuteurs créés:", guardianRecords.length);

  // 9. Créer des étudiants
  const students = await Promise.all([
    prisma.student.create({ data: { tenantId: tenant.id, matricule: "STU001", birthDate: new Date("2010-05-15"), gender: "F" } }),
    prisma.student.create({ data: { tenantId: tenant.id, matricule: "STU002", birthDate: new Date("2009-08-22"), gender: "M" } }),
    prisma.student.create({ data: { tenantId: tenant.id, matricule: "STU003", birthDate: new Date("2011-03-10"), gender: "F" } }),
    prisma.student.create({ data: { tenantId: tenant.id, matricule: "STU004", birthDate: new Date("2010-11-05"), gender: "M" } }),
    prisma.student.create({ data: { tenantId: tenant.id, matricule: "STU005", birthDate: new Date("2009-12-18"), gender: "F" } }),
    prisma.student.create({ data: { tenantId: tenant.id, matricule: "STU006", birthDate: new Date("2011-07-03"), gender: "M" } }),
    prisma.student.create({ data: { tenantId: tenant.id, matricule: "STU007", birthDate: new Date("2010-01-25"), gender: "F" } }),
    prisma.student.create({ data: { tenantId: tenant.id, matricule: "STU008", birthDate: new Date("2009-09-14"), gender: "M" } }),
  ]);
  console.log("✅ Étudiants créés:", students.length);

  // 10. Lier étudiants et tuteurs
  const studentGuardians = [];
  for (let i = 0; i < students.length; i++) {
    const guardianIndex = i % guardianRecords.length;
    studentGuardians.push(
      prisma.studentGuardian.create({
        data: {
          tenantId: tenant.id,
          studentId: students[i].id,
          guardianId: guardianRecords[guardianIndex].id,
          relation: i % 2 === 0 ? "Père" : "Mère"
        }
      })
    );
  }
  await Promise.all(studentGuardians);
  console.log("✅ Relations tuteurs-étudiants créées:", studentGuardians.length);

  // 11. Inscrire les étudiants dans les classes
  const enrollments = [];
  for (let i = 0; i < students.length; i++) {
    const classIndex = i % classes.length;
    enrollments.push(
      prisma.enrollment.create({
        data: {
          tenantId: tenant.id,
          classId: classes[classIndex].id,
          studentId: students[i].id
        }
      })
    );
  }
  await Promise.all(enrollments);
  console.log("✅ Inscriptions créées:", enrollments.length);

  // 12. Créer des présences d'exemple
  const attendances = [];
  const today = new Date();
  for (let i = 0; i < 5; i++) {
    const session = sessions[i % sessions.length];
    const classStudents = students.filter((_, index) => index % classes.length === i % classes.length);
    
    for (const student of classStudents) {
      attendances.push(
        prisma.attendance.create({
          data: {
            tenantId: tenant.id,
            sessionId: session.id,
            studentId: student.id,
            date: new Date(today.getTime() - i * 24 * 60 * 60 * 1000),
            status: Math.random() > 0.1 ? AttendanceStatus.PRESENT : 
                   Math.random() > 0.5 ? AttendanceStatus.ABSENT : AttendanceStatus.LATE,
            comment: Math.random() > 0.8 ? "Justifié par les parents" : null
          }
        })
      );
    }
  }
  await Promise.all(attendances);
  console.log("✅ Présences créées:", attendances.length);

  // 13. Créer des notes d'exemple
  const gradeItems = await Promise.all([
    prisma.gradeItem.create({
      data: {
        tenantId: tenant.id,
        subjectId: subjects[0].id,
        title: "Récitation Sourate Al-Fatiha",
        maxScore: 20,
        weight: 1,
        date: new Date("2025-09-15")
      }
    }),
    prisma.gradeItem.create({
      data: {
        tenantId: tenant.id,
        subjectId: subjects[2].id,
        title: "Examen Arabe - Grammaire",
        maxScore: 20,
        weight: 1,
        date: new Date("2025-09-20")
      }
    }),
  ]);

  const grades = [];
  for (const gradeItem of gradeItems) {
    for (const student of students) {
      grades.push(
        prisma.grade.create({
          data: {
            tenantId: tenant.id,
            gradeItemId: gradeItem.id,
            studentId: student.id,
            score: Math.floor(Math.random() * 10) + 10, // Notes entre 10 et 20
            comment: Math.random() > 0.7 ? "Très bon travail" : null
          }
        })
      );
    }
  }
  await Promise.all(grades);
  console.log("✅ Notes créées:", grades.length);

  // 14. Créer des progressions Coraniques
  const quranProgresses = [];
  for (const student of students) {
    quranProgresses.push(
      prisma.quranProgress.create({
        data: {
          tenantId: tenant.id,
          studentId: student.id,
          surah: Math.floor(Math.random() * 5) + 1, // Sourates 1-5
          fromAyah: 1,
          toAyah: Math.floor(Math.random() * 10) + 5,
          kind: Math.random() > 0.5 ? "Mémorisation" : "Récitation",
          date: new Date(today.getTime() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000),
          comment: Math.random() > 0.6 ? "Excellent progrès" : null
        }
      })
    );
  }
  await Promise.all(quranProgresses);
  console.log("✅ Progressions Coraniques créées:", quranProgresses.length);

  console.log("🎉 Seed terminé avec succès !");
  console.log(`📊 Résumé:`);
  console.log(`   - 1 tenant: ${tenant.name}`);
  console.log(`   - 1 admin: ${admin.name}`);
  console.log(`   - 1 année scolaire: ${year.name}`);
  console.log(`   - ${rooms.length} salles`);
  console.log(`   - ${subjects.length} matières`);
  console.log(`   - ${classes.length} classes`);
  console.log(`   - ${sessions.length} sessions`);
  console.log(`   - ${guardianRecords.length} tuteurs`);
  console.log(`   - ${students.length} étudiants`);
  console.log(`   - ${enrollments.length} inscriptions`);
  console.log(`   - ${attendances.length} présences`);
  console.log(`   - ${grades.length} notes`);
  console.log(`   - ${quranProgresses.length} progressions Coraniques`);
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
