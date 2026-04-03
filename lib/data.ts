import { roomMedia } from './media';

export interface RoomFeature {
    icon: string;
    title: string;
}

export interface Room {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    details: string[];
    features: RoomFeature[];
    images: string[];
}

export const roomsData: Room[] = [
    {
        id: 'double',
        title: 'Double Room',
        subtitle: 'Private room with double bed',
        description: 'A private room with a double bed and access to the shared bathroom, kitchen, terrace, and lounge.',
        details: [
            'Located on the 5th floor of a building without an elevator.',
            'Around a 10-minute walk from Knez Mihailova, in the Savamala district.',
            'City tax is EUR 1.35 per night and is paid in cash on arrival.',
        ],
        features: [
            { icon: 'Bed', title: 'Double Bed' },
            { icon: 'Bath', title: 'Shared Bathroom' },
            { icon: 'Kitchen', title: 'Kitchen Access' },
            { icon: 'Terrace', title: 'Terrace' },
            { icon: 'WiFi', title: 'WiFi' },
            { icon: 'Maps', title: 'City Maps' },
        ],
        images: [...roomMedia.double],
    },
    {
        id: 'four-bed',
        title: 'Four Bed Dorm',
        subtitle: '2 bunk beds with personal lockers',
        description: 'A comfortable shared dorm with two bunk beds, personal lockers, and access to all common hostel spaces.',
        details: [
            'Located on the 5th floor of a building without an elevator.',
            'Around a 10-minute walk from Knez Mihailova, in the Savamala district.',
            'City tax is EUR 1.35 per night and is paid in cash on arrival.',
        ],
        features: [
            { icon: 'Guests', title: '4 Beds' },
            { icon: 'Locker', title: 'Personal Lockers' },
            { icon: 'Light', title: 'Reading Lights' },
            { icon: 'Bath', title: 'Shared Bathroom' },
            { icon: 'WiFi', title: 'WiFi' },
            { icon: 'Maps', title: 'City Maps' },
        ],
        images: [...roomMedia.fourBed],
    },
    {
        id: 'six-bed',
        title: 'Six Bed Room',
        subtitle: '3 bunk beds with great views',
        description: 'A brighter shared room with three bunk beds, personal lockers, and access to the kitchen, terrace, and lounge.',
        details: [
            'Located on the 5th floor of a building without an elevator.',
            'Around a 10-minute walk from Knez Mihailova, in the Savamala district.',
            'City tax is EUR 1.35 per night and is paid in cash on arrival.',
        ],
        features: [
            { icon: 'Guests', title: '6 Beds' },
            { icon: 'Locker', title: 'Personal Lockers' },
            { icon: 'Views', title: 'Great Views' },
            { icon: 'Bath', title: 'Shared Bathroom' },
            { icon: 'WiFi', title: 'WiFi' },
            { icon: 'Maps', title: 'City Maps' },
        ],
        images: [...roomMedia.sixBed],
    },
];

export interface Feature {
    icon: string;
    title: string;
    description: string;
}

export const featuresData: Feature[] = [
    {
        icon: 'WiFi',
        title: 'High-Speed WiFi',
        description: 'Unlimited high-speed internet access throughout the entire hostel',
    },
    {
        icon: 'TV',
        title: 'Entertainment',
        description: 'TV with 50+ international and movie channels',
    },
    {
        icon: 'Maps',
        title: 'City Maps',
        description: 'Belgrade maps with highlighted attractions and recommendations',
    },
    {
        icon: 'Terrace',
        title: 'Panoramic Terrace',
        description: 'Stunning rooftop terrace with breathtaking city views',
    },
    {
        icon: 'Location',
        title: 'Prime Location',
        description: 'Perfectly centrally located in the heart of Belgrade',
    },
    {
        icon: 'Comfort',
        title: 'Comfort First',
        description: 'Bright, spacious, spotless rooms with comfortable mattresses',
    },
];
