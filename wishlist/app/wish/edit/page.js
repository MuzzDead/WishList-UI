"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CreateUpdate from "../../components/CreateUpdate"; // змініть шлях відповідно

const EditWishPage = () => {
  const searchParams = useSearchParams();
  const wishId = searchParams.get("id");

  const [wishData, setWishData] = useState(null);

  useEffect(() => {
    const fetchWishData = async () => {
      try {
        const response = await fetch(`https://localhost:7168/api/Wish/${wishId}`);
        const data = await response.json();
        setWishData(data);
      } catch (error) {
        console.error("Error fetching wish data:", error);
      }
    };

    if (wishId) fetchWishData();
  }, [wishId]);

  if (!wishData) return <p>Loading...</p>;

  return <CreateUpdate wishData={wishData} mode="edit" />;
};

export default EditWishPage;
