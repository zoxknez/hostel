export interface RoomFeature {
    icon: string;
    title: string;
    desc: string;
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
        description: 'This room is part of hostel. You get private room with double bed with shared toilet, kitchen, terrace and living room. Towels, linen, WiFi, toilet paper, shampoo, maps, city tour are free.',
        details: [
            'We are on the 5th level in the building without elevator but we are clean, cheap, located in center (middle of bohemian quarter Savamala and 10 min walking distance from the pedestrian zone Knez Mihailova Street).',
            'Upon arrival every guest pays €1.35 per night for city tax in cash.',
            '24/7 reception'
        ],
        features: [
            { icon: '🛏️', title: 'Double Bed', desc: 'Comfortable mattress' },
            { icon: '🚿', title: 'Shared Bathroom', desc: 'Clean facilities' },
            { icon: '🍳', title: 'Kitchen Access', desc: 'Fully equipped' },
            { icon: '🌆', title: 'Terrace', desc: 'Panoramic views' },
            { icon: '📶', title: 'Free WiFi', desc: 'High-speed internet' },
            { icon: '🗺️', title: 'Free Maps', desc: 'City tour included' }
        ],
        images: [
            '/assets/images/double-room.jpg',
            '/assets/images/rooms/double/1.jpg',
            '/assets/images/rooms/double/2.jpg'
        ]
    },
    {
        id: 'four-bed',
        title: 'Four Bed Dorm',
        subtitle: '2 bunk beds with personal lockers',
        description: 'This room has 2 bunk beds with new comfortable mattresses and 4 lockers. You get bed in 4 bed room with shared toilet, kitchen, terrace and living room. Towels, linen, WiFi, toilet paper, shampoo, maps, city tour, locker are free.',
        details: [
            'We are on the 5th level in the building without elevator but we are clean, cheap, located in center (middle of bohemian quarter Savamala and 10 min walking distance from the pedestrian zone Knez Mihailova Street).',
            'Upon arrival every guest pays €1.35 per night for city tax in cash.',
            '24/7 reception'
        ],
        features: [
            { icon: '👥', title: '4 Beds', desc: '2 bunk beds' },
            { icon: '🔒', title: 'Personal Lockers', desc: 'Secure storage' },
            { icon: '💡', title: 'Reading Lights', desc: 'Individual lights' },
            { icon: '🚿', title: 'Shared Bathroom', desc: 'Clean facilities' },
            { icon: '📶', title: 'Free WiFi', desc: 'High-speed internet' },
            { icon: '🗺️', title: 'Free Maps', desc: 'City tour included' }
        ],
        images: [
            '/assets/images/four-bed-dorm.jpg',
            '/assets/images/rooms/four-bed/1.jpg',
            '/assets/images/rooms/four-bed/2.jpg',
            '/assets/images/rooms/four-bed/3.jpg',
            '/assets/images/rooms/four-bed/4.jpg',
            '/assets/images/rooms/four-bed/5.jpg',
            '/assets/images/rooms/four-bed/6.jpg',
            '/assets/images/rooms/four-bed/7.jpg'
        ]
    },
    {
        id: 'six-bed',
        title: 'Six Bed Room',
        subtitle: '3 bunk beds with great views',
        description: 'This room is part of hostel. Have 3 bunk beds, new comfortable mattress and 6 lockers in room. You get one bed in room with shared toilet, kitchen, terrace and living room. Towels, linen, WiFi, toilet paper, shampoo, maps, city tour are free.',
        details: [
            'We are on the 5th level in the building without elevator but we are clean, cheap, located in center (middle of bohemian quarter Savamala and 10 min walking distance from the pedestrian zone Knez Mihailova Street).',
            'Upon arrival every guest pays €1.35 per night for city tax in cash.',
            '24/7 reception'
        ],
        features: [
            { icon: '👥', title: '6 Beds', desc: '3 bunk beds' },
            { icon: '🔒', title: 'Personal Lockers', desc: 'Secure storage' },
            { icon: '🪟', title: 'Great Views', desc: 'City panorama' },
            { icon: '🚿', title: 'Shared Bathroom', desc: 'Clean facilities' },
            { icon: '📶', title: 'Free WiFi', desc: 'High-speed internet' },
            { icon: '🗺️', title: 'Free Maps', desc: 'City tour included' }
        ],
        images: [
            '/assets/images/six-bed-room.jpg',
            '/assets/images/rooms/six-bed-yellow/1.jpg',
            '/assets/images/rooms/six-bed-yellow/2.jpg',
            '/assets/images/rooms/six-bed-yellow/3.jpg',
            '/assets/images/rooms/six-bed-yellow/4.jpg',
            '/assets/images/rooms/six-bed-blue/1.jpg',
            '/assets/images/rooms/six-bed-blue/2.jpg',
            '/assets/images/rooms/six-bed-blue/3.jpg',
            '/assets/images/rooms/six-bed-blue/4.jpg',
            '/assets/images/rooms/six-bed-blue/5.jpg',
            '/assets/images/rooms/six-bed-blue/6.jpg',
            '/assets/images/rooms/six-bed-blue/7.jpg'
        ]
    }
];

export interface Feature {
    icon: string;
    title: string;
    description: string;
}

export const featuresData: Feature[] = [
    {
        icon: '📶',
        title: 'High-Speed WiFi',
        description: 'Unlimited high-speed internet access throughout the entire hostel'
    },
    {
        icon: '📺',
        title: 'Entertainment',
        description: 'TV with 50+ international and movie channels'
    },
    {
        icon: '🗺️',
        title: 'City Maps',
        description: 'Belgrade maps with highlighted attractions and recommendations'
    },
    {
        icon: '🌆',
        title: 'Panoramic Terrace',
        description: 'Stunning rooftop terrace with breathtaking city views'
    },
    {
        icon: '📍',
        title: 'Prime Location',
        description: 'Perfectly centrally located in the heart of Belgrade'
    },
    {
        icon: '🛏️',
        title: 'Comfort First',
        description: 'Bright, spacious, spotless rooms with comfortable mattresses'
    }
];

export const galleryImages = [
    '/assets/images/double-room.jpg',
    '/assets/images/lounge-area.jpg',
    '/assets/images/common-room.jpg',
    '/assets/images/kitchen.jpg',
    '/assets/images/terrace-view.jpg',
    '/assets/images/bathroom.jpg'
];
