export interface GrokMatch {
    match: string;
    start: number;
    end: number;
    fields: Record<string, string>;
}

export interface GrokParserOptions {
    patterns?: Record<string, string>; // initial pattern map
}

export interface GrokParser {
    addPattern(name: string, pattern: string): void;
    loadPatternFile(fileContent: string): void;
    compile(pattern: string): RegExp;
    match(text: string, grokPattern: string, fromIndex?: number): GrokMatch | null;
    debugMatch(text: string, grokPattern: string, fromIndex?: number): void;
    getLoadedFiles() : string [];
}