import Papa from 'papaparse';
export interface ParsedCSVData<T = unknown> {
    data: T[];
    error?: string;
}
export const parseCSV = <T = unknown>(csvText: string, delimiter: string = ';'): ParsedCSVData<T> => {
    try {
        const result = Papa.parse<T>(csvText, {
            header: true,
            delimiter,
            skipEmptyLines: true,
            transformHeader: (header) => header.trim(),
            transform: (value) => value.trim(),
        });
        if (result.errors.length > 0) {
            return {
                data: [],
                error: result.errors.map(err => err.message).join(', '),
            };
        }
        return { data: result.data };
    }
    catch (error) {
        return {
            data: [],
            error: error instanceof Error ? error.message : 'Unknown parsing error',
        };
    }
};
export const loadCSV = async <T = unknown>(url: string, delimiter?: string): Promise<ParsedCSVData<T>> => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch CSV: ${response.statusText}`);
        }
        const csvText = await response.text();
        return parseCSV<T>(csvText, delimiter);
    }
    catch (error) {
        return {
            data: [],
            error: error instanceof Error ? error.message : 'Unknown fetch error',
        };
    }
};
