export interface User {
    id? : number,
    email?: string,
    firstname? : string,
    lastname? : string,
    password? : string,
    role? : string
}

export interface Course {
    id? : number,
    name? : string,
    description? : string,
    teacher? : User
}

export interface Quiz {
    id? : number,
    name? : string,
    rules? : string,
    startTime? : string
    accessibleUntil? : string
    duration? : string,
    quizStatus? : string,
    maxPoints? : number
}

export interface Question {
    id? : number,
    title? : string,
    text? : string,
    maximumPoints? : number,
    questionType? : string,
    caseSensitive? : boolean
    questionAnswers : QuestionAnswer[]
}

export interface QuestionAnswer {
    id? : number,
    answer? : string,
    percentageValue? : number,
}

export interface QuestionResponse {
    id? : number,
    response? : string,
    acquiredPoints? : number,
    question?: Question
}

export interface QuestionResponseDto {
    question_id? : number,
    response? : string,
}
