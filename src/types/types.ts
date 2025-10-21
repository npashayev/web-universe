export interface TaskCode {
    code: string;
    output: string
}
export interface TaskData {
    task: string;
    codeSnippets: TaskCode[];
}

export interface PlanetData {
    step: number;
    name: string;
    image: string;
    description: string;
    tags: string[];
    researchTopics: string[];
    tasks: TaskData[];
    questions: string[];
}