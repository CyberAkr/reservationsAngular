export class Show {
    id?: number;
    slug?: string;
    title?: string;
    description?: string;
    posterUrl?: string;
    location?: {
        name?: string;
        address?: string;
    };
    bookable?: boolean;
    price?: number;
}