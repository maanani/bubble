export interface Quiz {
    
        id: number;
        idContent: number;
        type: number;
        question: string;
        responses: [ 
            {
            answer: string;
            iscorrect: boolean;
        }];
          
}