export interface Processing {
    text: string;
    entities: string[];
}

export interface Intent {
    intent: string;
    match: string;
    score: number;
}

export interface Response {
    url: string;
    message: string[];
    statusCode: string;
}

export interface ResponseAgent {
    text: string;
    processing: Processing;
    intent: Intent;
    response: Response;
    context:any
}


export interface BodyAgent {
    text: string;
    context: any;
}