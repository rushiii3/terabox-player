import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
};

const fetchData = async (id: string) => {
  try {
    const { data } = await axios.get(
      `https://terabox.hnn.workers.dev/api/get-info?shorturl=${id}&pwd=`,{
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      }
    );
    console.log(data);
    
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
type downloadType = {
  shareid: string;
  uk: string;
  sign: string;
  timestamp: string;
  fs_id: string;
};
const fetchDownload = async ({
  shareid,
  uk,
  sign,
  timestamp,
  fs_id,
}: downloadType) => {
  try {
    const { data } = await axios.post(
      "https://terabox.hnn.workers.dev/api/get-download",
      {
        shareid,
        uk,
        sign,
        timestamp,
        fs_id,
      },
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error fetching download:", error);
    throw error;
  }
};

const fetchDownloadP = async ({
  shareid,
  uk,
  sign,
  timestamp,
  fs_id,
}: downloadType) => {
  try {
    const { data } = await axios.post(
      "https://terabox.hnn.workers.dev/api/get-downloadp",
      {
        shareid,
        uk,
        sign,
        timestamp,
        fs_id,
      },
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error fetching download (P):", error);
    throw error;
  }
};

const useFileDetails = (id: string) => {
  const [fileDetails, setFileDetails] = useState<{
    filename: string;
    fileSize: string;
    uploadDate: string;
    downloadUrls: { label: string; url: string }[];
  }>({
    filename: "",
    fileSize: "",
    uploadDate: "",
    downloadUrls: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFileDetails = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError("");

    try {
      const data = await fetchData(id);
      if (data?.ok && data?.list?.length) {
        const filename = data.list[0].filename;
        const fileSize = formatFileSize(parseInt(data.list[0].size, 10));
        const uploadDate = new Date(
          data.list[0].create_time * 1000
        ).toLocaleDateString();

        const downloadUrl1 = await fetchDownload({
          shareid: data.shareid,
          uk: data.uk,
          sign: data.sign,
          timestamp: data.timestamp,
          fs_id: data.list[0].fs_id,
        });

        const downloadUrl2 = await fetchDownloadP({
          shareid: data.shareid,
          uk: data.uk,
          sign: data.sign,
          timestamp: data.timestamp,
          fs_id: data.list[0].fs_id,
        });
        
        const downloadUrls = [];

        if (downloadUrl1?.ok === true) {
          downloadUrls.push({ label: "Server 1", url: downloadUrl1.downloadLink });
        }

        if (downloadUrl2?.ok === true) {
          downloadUrls.push({ label: "Server 2", url: downloadUrl2.downloadLink });
        }

        setFileDetails({
          filename: filename || "Unknown File",
          fileSize: fileSize || "Size Not Available",
          uploadDate: uploadDate || "Date Not Available",
          downloadUrls,
        });
      }
    } catch (err) {
      setError("Failed to fetch file details.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchFileDetails();
  }, [fetchFileDetails]);

  return { fileDetails, loading, error };
};

export default useFileDetails;
