const apiUrl = "https://opbento.edgexhq.tech/api/bento?n=saeed%20saiyed&g=saeedsaiyed01&x=saeedsaiyedtwt&l=saeedsaiyed01&i=&p=saeedsaiyed.me&z=5e391";
interface BentoResponse {
  url: string;
}

const fetchBentoUrl = async (apiUrl: string): Promise<string> => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: BentoResponse = (await response.json()) as BentoResponse;
    return data.url;
  } catch (error) {
    console.error("Error fetching Bento URL:", error);
    throw error;
  }
};

// @ts-ignore
fetchBentoUrl(apiUrl);
