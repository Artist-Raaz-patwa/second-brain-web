import { User as FirebaseUser } from 'firebase/auth';

// FIX: Use a type alias for FirebaseUser. This correctly inherits all properties
// from the base Firebase user type, fixing errors where properties like `uid` or `displayName`
// were not found. It can be extended later using intersection types if needed.
export type User = FirebaseUser;

// Represents a single Note item for the Notes module.
// New modules should have their own types defined here.
export interface Note {
    id: string;
    text: string;
    createdAt: number;
}
