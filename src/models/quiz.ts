export interface Quiz {
    
        id: number;
        idContent: number;
        type: number;
        question: string;
        responses: [ 
            {
            id: string;
            answer: string;
            iscorrect: boolean;
        }];
          
}