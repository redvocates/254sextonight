export const fetchHomeEscorts = async () => {
    try {
        const res = await fetch("/api/getmodels?limit=10"); // Fetch from API with limit
        if (!res.ok) throw new Error("Failed to fetch models");

        const { data } = await res.json(); // Extract the data
        return data || []; // Ensure an array is returned
    } catch (error) {
        console.error("Error fetching escorts:", error);
        return [];
    }
};
