export interface UserDetails {
  Title: "Mr" | "Mrs";
  Password: string;
  dob: Date;
  Newsletter?: boolean;
  SpecialOffers?: boolean;
  FirstName: string;
  LastName: string;
  Company?: string;
  Address: string;
  Address2?: string;
  Country:
    | "India"
    | "United States"
    | "Canada"
    | "Australia"
    | "Israel"
    | "New Zealand"
    | "Singapore";
  State: string;
  City: string;
  Zipcode: string;
  Mobile: number;
}
