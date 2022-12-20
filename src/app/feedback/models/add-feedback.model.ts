export class AddFeedbackDTO {
    id: bigint = BigInt(0);
    employee_Id: string = '';
    category_Id: bigint = BigInt(0);
    severity_Id: bigint = BigInt(0);
    visibility!: string;
    feedback_Target!: string;
    comments!: string;
}