export interface ITask {
    question: string;
    codeTasks: ICodeTask[];
    codeExamples: ICodeExample[];
    htmlElements: IHtmlElement[];
}

export interface ICodeTask {
    title: string;
    cases: {
        input: string;
        expectedOutput: string;
    }[]
}

export interface ICodeExample {
    title: string;
    code: string;
    output: string;
}

export interface IHtmlElement {
    title: string;
    html: string;
    css: string;
}

export interface IPlanet {
    step: number;
    name: string;
    image: string;
    tags: string[];
    description: string;
    researchTopics: string[];
    tasks: ITask[];
    questions: string[];
}