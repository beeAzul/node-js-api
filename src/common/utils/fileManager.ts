import path from "path";
import {readFile, writeFile} from "fs/promises";

const dataFilePath = path.join('../../../', 'MOCK_DATA.json');

// Helper function to read data from JSON file
export const readData = async () => {
    const rawData = await readFile(dataFilePath, 'utf-8');
    return JSON.parse(rawData);
};

// Helper function to write data to JSON file
export const writeData = async (data) => {
    await writeFile(dataFilePath, JSON.stringify(data, null, 2));
};
