export class FeedbackListDTO {
    id: bigint = BigInt(0);
    category_Id: bigint = BigInt(0);
    severity_Id: bigint = BigInt(0);
    status: bigint = BigInt(0);
    comments!: string;
    created_By!: string;
    modified_Date!: Date;
    user_Name!: string;
}