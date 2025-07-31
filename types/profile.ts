import { ImageSourcePropType } from "react-native";

export interface Profile {
    firstName: string;
    lastName: string;
    images: ImageSourcePropType[];
}