import path, {dirname} from "path";
import {readFile, writeFile} from "fs/promises";
import {fileURLToPath} from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataFilePath = path.join(__dirname, '../datas', 'MOCK_DATA.json');


export const getLastInsertId = async () => {
    const rawData = await readFile(dataFilePath, 'utf-8');
    const result = JSON.parse(rawData)
   return result.slice(-1)[0].id
};

// Helper function to read data from JSON file
export const readData = async () => {
    const rawData = await readFile(dataFilePath, 'utf-8');
    return JSON.parse(rawData);
};

// Helper function to write data to JSON file
export const writeData = async (data) => {
    await writeFile(dataFilePath, JSON.stringify(data, null, 2));
};
