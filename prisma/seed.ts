import { createSeedClient, seedAtlasData } from "../lib/seed-importer";

const prisma = createSeedClient();

async function seedInventory() {
  console.log("Seeding Owned Inventory...");

  await prisma.ownedInventory.deleteMany({});

  await prisma.ownedInventory.createMany({
    data: [
      {
        displayName: "Dinsaw Mini Lab Unit Alpha",
        ownershipStatus: "OPERATIONAL",
        ownerOrg: "FIBO KMUTT",
        custodian: "FIBO Robotics Lab",
        conditionStatus: "EXCELLENT",
        locationLabel: "FIBO Building, KMUTT Bangmod",
        serialNumber: "DSW-2024-001",
        publicSerialSafe: true,
        firmwareVersion: "v2.4.0",
        notes: "Routine maintenance completed. Ready for demo.",
        visibility: "private",
      },
      {
        displayName: "FIBO Walker Testbed #2",
        ownershipStatus: "MAINTENANCE",
        ownerOrg: "FIBO KMUTT",
        custodian: "AI & Robotics Department",
        conditionStatus: "FAIR",
        locationLabel: "Robotics Research Center, KMUTT",
        serialNumber: "FBW-2025-009",
        publicSerialSafe: false,
        firmwareVersion: "v1.1.2",
        notes: "Replaced knee actuator servo motor. Pending calibration.",
        visibility: "private",
      },
    ],
  });
  console.log("✔ Seeded 2 Owned Inventory records successfully.");
}

// Execution Flow
seedAtlasData(prisma)
  .then(async () => {
    await seedInventory();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });