import { useEffect, useState, useCallback } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import {
  deleteAll,
  deleteById,
  getAllUrls,
  getTop5LatestUrls,
  insertUrl,
  updateDateById,
} from "@/database";
import { Alert } from "react-native";

interface UrlRecord {
  id: number;
  url: string;
  date: string;
}
function isUrlValid(url: string) {
  var res = url.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  if (res == null) return false;
  else return true;
}
export const useDB = () => {
  const router = useRouter();
  const [recentLinks, setRecentLinks] = useState<UrlRecord[]>([]);
  const [allLinks, setAllLinks] = useState<UrlRecord[]>([]);

  /**
   * Fetch and update top 5 latest links.
   */
  const fetchRecentLinks = useCallback(async () => {
    try {
      const top5 = await getTop5LatestUrls();
      if (top5) setRecentLinks(top5 as UrlRecord[]);
    } catch (error) {
      console.error("Error fetching top 5 links:", error);
    }
  }, []);

  /**
   * Fetch and update all stored links.
   */
  const fetchAllLinks = useCallback(async () => {
    try {
      const urls = await getAllUrls();
      if (urls) setAllLinks(urls as UrlRecord[]);
    } catch (error) {
      console.error("Error fetching all links:", error);
    }
  }, []);

  /**
   * Delete a link by ID and refresh data.
   */
  const handleDeleteLink = useCallback(
    async (id: number) => {
      try {
        await deleteById(id);

        await fetchRecentLinks();
        await fetchAllLinks();
      } catch (error) {
        console.error(`Error deleting link (ID: ${id}):`, error);
      }
    },
    [fetchRecentLinks, fetchAllLinks]
  );

  /**
   * Delete all links and refresh data.
   */
  const handleDeleteAll = useCallback(async () => {
    console.log("delete all");
    
    try {
      await deleteAll();
      fetchRecentLinks();
       fetchAllLinks();
    } catch (error) {
      console.error("Error deleting all links:", error);
    }
  }, [fetchRecentLinks, fetchAllLinks]);

  /**
   * Update link timestamp and navigate.
   */
  const handleOpenLink = useCallback(
    async ({ id, url }: { id: number; url: string }) => {
      try {
        await updateDateById(id);
        await fetchRecentLinks();
        router.push({
          pathname: "/details/[url]",
          params: { url },
        });
      } catch (error) {
        console.error(`Error updating link (ID: ${id}):`, error);
      }
    },
    [fetchRecentLinks, router]
  );

  const handlePlay = useCallback(
    async ({ url }: { url: string }) => {
      try {
        if (!url.trim()) {
          Alert.alert("Error", "Please enter a TeraBox URL");
          return;
        }

        if (!isUrlValid(url)) {
          Alert.alert("Invalid URL", "Please enter a valid TeraBox URL");
          return;
        }
        await insertUrl(url);
        await fetchRecentLinks();
        router.push({
          pathname: "/details/[url]",
          params: {
            url: url,
          },
        });
      } catch (error) {
        console.error(`Error: `, error);
      }
    },
    [fetchRecentLinks, router]
  );

  // Initial data load
//   useEffect(() => {
//     Promise.all([fetchRecentLinks(), fetchAllLinks()]).catch(console.error);
//   }, [fetchRecentLinks, fetchAllLinks]);

  useFocusEffect(
    useCallback(() => {
        Promise.all([fetchRecentLinks(), fetchAllLinks()]).catch(console.error);
    }, [fetchRecentLinks, fetchAllLinks])
  );
  return {
    recentLinks,
    allLinks,
    handleOpenLink,
    handleDeleteLink,
    handleDeleteAll,
    handlePlay,
  };
};
