import "dotenv/config";
import seedAll from "./utils/fakeInputGenerator.js";

seedAll()
  .then(() => {
    console.log("Seeding complete");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
  });
