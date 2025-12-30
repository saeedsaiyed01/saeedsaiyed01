import fs from "fs";
import path from "path";

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

const updateReadme = async () => {
  try {
    const bentoUrl = await fetchBentoUrl(apiUrl);
    const readmePath = path.join(process.cwd(), "README.md");
    
    let readmeContent = fs.readFileSync(readmePath, "utf-8");
    
    // Replace or add the bento image
    const bentoImageMarkdown = `[![bento](${bentoUrl})](https://github.com/saeedsaiyed01)`;
    
    if (readmeContent.includes("[![bento]")) {
      readmeContent = readmeContent.replace(/\[!?\[bento\]\([^)]+\)\]\([^)]+\)/g, bentoImageMarkdown);
    } else {
      readmeContent = readmeContent + "\n\n" + bentoImageMarkdown + "\n";
    }
    
    fs.writeFileSync(readmePath, readmeContent, "utf-8");
    console.log("README.md updated successfully with new bento image");
  } catch (error) {
    console.error("Failed to update README:", error);
    process.exit(1);
  }
};

updateReadme();
