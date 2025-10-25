import { PrismaClient, Role } from "@prisma/client";
const prisma = new PrismaClient();

// ⚙️ CONFIGURATION - Modifiez ces valeurs pour votre nouvelle entité
const CONFIG = {
  // Slug unique de l'entité (utilisé dans l'URL)
  slug: "ecole-ibn-khaldoun",
  
  // Nom complet de l'entité
  name: "École Ibn Khaldoun",
  
  // Informations de l'administrateur principal
  admin: {
    email: "directeur@ibn-khaldoun.fr",
    name: "Mohamed Al-Hassan",
    phone: "+33 1 23 45 67 89"
  },
  
  // Année scolaire
  schoolYear: {
    name: "2025-2026",
    startDate: "2025-09-01",
    endDate: "2026-07-01"
  },
  
  // Salles
  rooms: [
    { name: "Salle principale", capacity: 30 },
    { name: "Salle annexe", capacity: 15 },
    { name: "Bibliothèque", capacity: 25 }
  ],
  
  // Matières enseignées
  subjects: [
    { name: "Coran", category: "quran", coefficient: 3 },
    { name: "Tajwid", category: "quran", coefficient: 2 },
    { name: "Arabe", category: "language", coefficient: 2 },
    { name: "Tafsir", category: "quran", coefficient: 2 }
  ],
  
  // Classes à créer
  classes: [
    { name: "Groupe Coran Débutants", roomIndex: 0 },
    { name: "Groupe Coran Intermédiaires", roomIndex: 0 },
    { name: "Groupe Arabe Niveau 1", roomIndex: 1 },
    { name: "Groupe Tafsir", roomIndex: 2 }
  ]
};

async function addNewTenant() {
  try {
    console.log("🚀 Création de la nouvelle entité...");
    console.log(`📋 Slug: ${CONFIG.slug}`);
    console.log(`🏢 Nom: ${CONFIG.name}`);
    
    // 1. Créer le tenant
    const tenant = await prisma.tenant.upsert({ 
      where: { slug: CONFIG.slug }, 
      update: {}, 
      create: { 
        slug: CONFIG.slug, 
        name: CONFIG.name,
        timezone: "Europe/Paris"
      } 
    });
    console.log("✅ Tenant créé:", tenant.name);
    
    // 2. Créer l'administrateur
    const admin = await prisma.user.upsert({ 
      where: { email: CONFIG.admin.email }, 
      update: {}, 
      create: { 
        email: CONFIG.admin.email, 
        name: CONFIG.admin.name,
        phone: CONFIG.admin.phone
      } 
    });
    console.log("✅ Admin créé:", admin.name);
    
    // 3. Associer l'admin au tenant
    await prisma.userOnTenant.upsert({ 
      where: { userId_tenantId: { userId: admin.id, tenantId: tenant.id } }, 
      update: { role: Role.SUPER_ADMIN }, 
      create: { userId: admin.id, tenantId: tenant.id, role: Role.SUPER_ADMIN } 
    });
    console.log("✅ Admin associé à l'entité");
    
    // 4. Créer l'année scolaire
    const year = await prisma.schoolYear.create({ 
      data: { 
        tenantId: tenant.id, 
        name: CONFIG.schoolYear.name, 
        startDate: new Date(CONFIG.schoolYear.startDate), 
        endDate: new Date(CONFIG.schoolYear.endDate) 
      } 
    });
    console.log("✅ Année scolaire créée:", year.name);
    
    // 5. Créer les salles
    const rooms = await Promise.all(
      CONFIG.rooms.map(room => 
        prisma.room.create({ 
          data: { 
            tenantId: tenant.id, 
            name: room.name, 
            capacity: room.capacity 
          } 
        })
      )
    );
    console.log(`✅ ${rooms.length} salles créées`);
    
    // 6. Créer les matières
    const subjects = await Promise.all(
      CONFIG.subjects.map(subject => 
        prisma.subject.create({ 
          data: { 
            tenantId: tenant.id, 
            schoolYearId: year.id, 
            name: subject.name, 
            category: subject.category, 
            coefficient: subject.coefficient 
          } 
        })
      )
    );
    console.log(`✅ ${subjects.length} matières créées`);
    
    // 7. Créer les classes
    const classes = await Promise.all(
      CONFIG.classes.map(classConfig => 
        prisma.class.create({ 
          data: { 
            tenantId: tenant.id, 
            schoolYearId: year.id, 
            name: classConfig.name, 
            roomId: rooms[classConfig.roomIndex].id 
          } 
        })
      )
    );
    console.log(`✅ ${classes.length} classes créées`);
    
    // Résumé
    console.log("\n🎉 Entité créée avec succès !");
    console.log(`\n📊 Résumé:`);
    console.log(`   - Slug: ${CONFIG.slug}`);
    console.log(`   - Nom: ${CONFIG.name}`);
    console.log(`   - Admin: ${CONFIG.admin.email}`);
    console.log(`   - Année: ${CONFIG.schoolYear.name}`);
    console.log(`   - Salles: ${rooms.length}`);
    console.log(`   - Matières: ${subjects.length}`);
    console.log(`   - Classes: ${classes.length}`);
    console.log(`\n🔗 URL d'accès:`);
    console.log(`   https://projet-notes.netlify.app/s/${CONFIG.slug}/dashboard`);
    
  } catch (error) {
    console.error("❌ Erreur lors de la création:", error);
    throw error;
  }
}

addNewTenant()
  .catch((e) => {
    console.error("❌ Erreur:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
