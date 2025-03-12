import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabaseSync("app.db");
export const setupDatabase = async () => {
  await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS URL (
        id INTEGER PRIMARY KEY NOT NULL,
        url TEXT NOT NULL,
          date TEXT DEFAULT (datetime('now', 'localtime'))

      );
    `);
};

export const getTop5LatestUrls = async () => {
  try {
    const top5Urls = await db.getAllAsync(
      "SELECT * FROM URL ORDER BY date DESC LIMIT 5"
    );
    console.log("Top 5 Latest URLs:", top5Urls);
    return top5Urls;
  } catch (error) {
    console.error("Error fetching top 5 latest URLs:", error);
    return [];
  }
};

export const getAllUrls = async () => {
  try {
    const allUrls = await db.getAllAsync(
      "SELECT * FROM URL ORDER BY date DESC"
    );
    console.log("All URLs:", allUrls);
    return allUrls;
  } catch (error) {
    console.error("Error fetching all URLs:", error);
    return [];
  }
};

export const insertUrl = async (url: string): Promise<boolean> => {
  try {
    // Check if URL already exists
    const existingUrl = await db.getAllAsync(
      "SELECT id FROM URL WHERE url = ? LIMIT 1",
      [url]
    );    
    if (existingUrl[0]) {
      // If URL exists, update the date
      const id = (existingUrl[0] as { id: number }).id;
      return await updateDateById(id);
    } else {
      // If URL does not exist, insert a new record
      await db.runAsync(
        "INSERT INTO URL (url, date) VALUES (?, datetime('now', 'localtime'))",
        [url]
      );
      console.log("URL inserted successfully:", url);
      return true;
    }
  } catch (error) {
    console.error("Error inserting URL:", error);
    return false;
  }
};

export const updateDateById = async (id: number): Promise<boolean> => {
  try {
    const result = await db.runAsync(
      "UPDATE URL SET date = datetime('now', 'localtime') WHERE id = ?",
      [id]
    );

    if (result.changes > 0) {
      console.log(`Date updated for URL with ID ${id}.`);
      return true;
    } else {
      console.warn(`No URL found with ID ${id}.`);
      return false;
    }
  } catch (error) {
    console.error("Error updating date:", error);
    return false;
  }
};

export const deleteById = async (id: number): Promise<boolean> => {
  try {
    const result = await db.runAsync("DELETE FROM URL WHERE id = ?", [id]);

    if (result.changes > 0) {
      console.log(`Deleted URL with ID ${id}.`);
      return true;
    } else {
      console.warn(`No URL found with ID ${id}.`);
      return false;
    }
  } catch (error) {
    console.error("Error deleting URL:", error);
    return false;
  }
};

export const deleteAll = async (): Promise<boolean> => {
  try {
    const result = await db.runAsync("DELETE FROM URL");

    if (result.changes > 0) {
      console.log("All URLs deleted.");
      return true;
    } else {
      console.warn("No URLs found in the table.");
      return false;
    }
  } catch (error) {
    console.error("Error deleting all URLs:", error);
    return false;
  }
};
