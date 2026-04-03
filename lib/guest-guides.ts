export type GuideSectionEntry = {
    title: string;
    description: string;
};

export type GuideSection = {
    title: string;
    intro?: string;
    items?: GuideSectionEntry[];
    bullets?: string[];
    note?: string;
    tone?: 'default' | 'highlight' | 'warning';
};

export type GuideResource = {
    label: string;
    href: string;
    external?: boolean;
};

export type GuestGuide = {
    slug: string;
    label: string;
    eyebrow: string;
    title: string;
    description: string;
    cardSummary: string;
    cardPoints: string[];
    icon: 'route' | 'shield' | 'map';
    readTime: string;
    quickFacts: Array<{ label: string; value: string }>;
    sections: GuideSection[];
    resources?: GuideResource[];
    closingNote?: string;
};

export const guestGuides: GuestGuide[] = [
    {
        slug: 'getting-here',
        label: 'Arrival Guide',
        eyebrow: 'How to Reach Us',
        title: 'How to Reach Hostel Downtown Inn',
        description:
            'Step-by-step arrival directions from Belgrade Airport, the main bus station, and Prokop, plus practical notes guests usually need before check-in.',
        cardSummary:
            'The most practical routes to the hostel, with airport, bus, and rail directions in one place.',
        cardPoints: ['Airport, BAS, and Prokop options', 'Free city transport note', 'Late-arrival reminder'],
        icon: 'route',
        readTime: '5 min read',
        quickFacts: [
            { label: 'Address', value: 'Koče Popovića 6, Savski Venac, Belgrade' },
            { label: 'Former street name', value: 'Some older maps may still show Zagrebačka 6' },
            { label: 'Best landmark', value: 'A short walk from Savski Trg and Branko’s Bridge' },
            { label: 'Arrival note', value: 'Please message us in advance if you expect a very late or very early check-in' },
        ],
        resources: [
            {
                label: 'Open Google Maps',
                href: 'https://www.google.com/maps/search/?api=1&query=Ko%C4%8De%20Popovi%C4%87a%206%2C%2011000%20Belgrade%2C%20Serbia',
                external: true,
            },
            {
                label: 'Start Navigation',
                href: 'https://www.google.com/maps/dir/?api=1&destination=%D0%9A%D0%BE%D1%87%D0%B5%20%D0%9F%D0%BE%D0%BF%D0%BE%D0%B2%D0%B8%D1%9B%D0%B0%206%2C%20%D0%91%D0%B5%D0%BE%D0%B3%D1%80%D0%B0%D0%B4%2011000&travelmode=driving',
                external: true,
            },
        ],
        sections: [
            {
                title: 'From Belgrade Nikola Tesla Airport (BEG)',
                intro: 'These are the easiest ways to reach the hostel from the airport.',
                items: [
                    {
                        title: 'By A1 Shuttle (Recommended)',
                        description:
                            'Take the A1 airport shuttle, which is usually faster than the regular city line. It costs about EUR 4. Get off at Glavna železnička stanica / Savski Trg and walk about 5 minutes to the hostel.',
                    },
                    {
                        title: 'By Bus 72',
                        description:
                            'Take bus 72 to its final stop, Zeleni Venac. From the market area, walk downhill toward Branko’s Bridge, turn left into Gavrila Principa, and then take the third street on your right: Koče Popovića.',
                    },
                    {
                        title: 'By Taxi',
                        description:
                            'Do not take a taxi directly from drivers waiting inside the terminal. Go to the Taxi Info desk, give them our address, and ask for a fixed-price voucher. The ride should be around RSD 3,000, or roughly EUR 25.',
                    },
                ],
            },
            {
                title: 'From the Main Bus Station (BAS)',
                intro: 'The bus station is very close, so walking is usually the best option.',
                items: [
                    {
                        title: 'On Foot (About 5 to 7 Minutes)',
                        description:
                            'When you exit the station, head toward Karađorđeva, the street with the tram tracks. Walk uphill toward the city center using Lička or Kraljevića Marka until you reach Gavrila Principa. Turn right, and the next street is Koče Popovića. We are at number 6.',
                    },
                ],
            },
            {
                title: 'From the Main Railway Station (Beograd Centar / Prokop)',
                intro: 'Most domestic and international trains now arrive at Prokop, which is slightly outside the city center.',
                items: [
                    {
                        title: 'By Public Transport',
                        description:
                            'Take bus 36 from the station and get off at Savski Trg, the old railway station area. From there, the hostel is a short walk away.',
                    },
                    {
                        title: 'By Taxi',
                        description:
                            'A taxi ride from Prokop usually takes around 10 minutes and costs about RSD 800 to 1,200, depending on traffic.',
                    },
                ],
            },
            {
                title: 'Useful Tips for Arrival',
                tone: 'highlight',
                bullets: [
                    'Some older maps and GPS systems still show our street as Zagrebačka. If needed, try searching for Zagrebačka 6.',
                    'As of January 1, 2025, public city transport in Belgrade is free for everyone. Buses, trams, and trolleybuses do not require tickets. The A1 shuttle may still charge a fare.',
                    'If you expect to arrive very late or very early, please let us know in advance so we can arrange your welcome smoothly.',
                ],
                note: 'The hostel is inside a residential building in central Belgrade, so a quick message before unusual arrival hours is always appreciated.',
            },
        ],
    },
    {
        slug: 'house-rules',
        label: 'House Rules',
        eyebrow: 'Stay Basics',
        title: 'Hostel Downtown Inn House Rules',
        description:
            'The practical rules that keep the hostel clean, calm, and comfortable for everyone, from check-in timing to shared-space etiquette.',
        cardSummary:
            'Everything guests should know about check-in, shared spaces, quiet hours, payments, and safety.',
        cardPoints: ['Check-in and check-out timing', 'Shared kitchen and fridge etiquette', 'Quiet hours and safety rules'],
        icon: 'shield',
        readTime: '6 min read',
        quickFacts: [
            { label: 'Standard check-in', value: 'From 12:00 AM' },
            { label: 'Check-out', value: 'By 10:00 AM on departure day' },
            { label: 'Quiet hours', value: '11:00 PM to 7:00 AM' },
            { label: 'Lost key fee', value: 'EUR 10, charged in RSD' },
        ],
        sections: [
            {
                title: 'Check-in and Check-out',
                items: [
                    {
                        title: 'Standard Check-in',
                        description: 'Regular check-in starts from 12:00 AM.',
                    },
                    {
                        title: 'Early Check-in',
                        description:
                            'If you arrive up to 5 hours before standard check-in, between 7:00 AM and 12:00 AM, the surcharge is 50% of the nightly rate. If you arrive more than 5 hours earlier, before 7:00 AM, one full nightly rate is charged.',
                    },
                    {
                        title: 'Check-out',
                        description: 'Please vacate your room by 10:00 AM on your day of departure.',
                    },
                    {
                        title: 'Late Departure',
                        description:
                            'Leaving after 10:00 AM carries a 50% surcharge. If the room is not vacated by 3:00 PM, a full nightly rate will be charged.',
                    },
                ],
            },
            {
                title: 'Payments and Extensions',
                items: [
                    {
                        title: 'Advance Payment Only',
                        description:
                            'All stays must be paid in full upon arrival. We do not offer post-payment after the stay.',
                    },
                    {
                        title: 'Accepted Payment Methods',
                        description: 'You can pay at reception in cash (RSD) or by credit or debit card.',
                    },
                    {
                        title: 'Longer Stays',
                        description: 'For stays longer than 7 days, payment must be settled every 7 days.',
                    },
                    {
                        title: 'Extending Your Stay',
                        description:
                            'Please check availability and pay at reception at least 24 hours before your planned departure if you want to stay longer.',
                    },
                ],
            },
            {
                title: 'Shared Hostel Etiquette',
                tone: 'highlight',
                bullets: [
                    'This is a hostel, not a hotel. Please help keep things tidy and respect the shared atmosphere.',
                    'After using glasses, plates, or cutlery, wash them immediately and return them to their proper place.',
                    'Please leave the bathrooms clean and tidy after every use.',
                    'Everything used in the common areas should be returned to its original place in clean condition.',
                ],
            },
            {
                title: 'Shared Fridge and Food Rules',
                bullets: [
                    'Do not take or use food and drinks that belong to other guests.',
                    'On your check-out day, remove all food from the shared fridge and cabinets.',
                    'For hygiene and safety reasons, food storage and eating inside the bedrooms is not allowed.',
                ],
            },
            {
                title: 'Noise and Quiet Hours',
                tone: 'warning',
                bullets: [
                    'Complete quiet is expected from 11:00 PM to 7:00 AM in rooms, hallways, and shared areas.',
                    'TVs, computers, and music are allowed only when they do not disturb others.',
                    'All louder activity must stop during quiet hours.',
                ],
            },
            {
                title: 'Safety and Responsibility',
                bullets: [
                    'Please use the lockers provided in the rooms for valuables.',
                    'The hostel is not responsible for lost or stolen money, valuables, or food left in shared areas.',
                    'It is forbidden to remove hostel equipment or inventory from the property.',
                    'Smoking is strictly prohibited indoors and allowed only on the outdoor terrace.',
                    'Heating appliances, flammable materials, and explosive items are not allowed in the hostel.',
                    'Outside visitors are not allowed inside guest rooms.',
                    'Guests are responsible for any damage caused during their stay and must settle it before check-out.',
                ],
            },
        ],
        closingNote:
            'Failure to follow these rules, especially around hygiene, food theft, damage, or noise, may result in immediate termination of the stay without a refund.',
    },
    {
        slug: 'belgrade-guide',
        label: '3 Days in Belgrade',
        eyebrow: 'City Recommendations',
        title: '3 Days in Belgrade: Our Top Recommendations',
        description:
            'A simple city guide for one, two, or three days in Belgrade, plus local tips, emergency numbers, and sightseeing ideas for first-time visitors.',
        cardSummary:
            'A clean itinerary for 1, 2, or 3 days in Belgrade, with local tips, tours, and guest-friendly city advice.',
        cardPoints: ['One, two, or three-day plans', 'Free transport note for 2025', 'Tours, cruises, and local tips'],
        icon: 'map',
        readTime: '8 min read',
        quickFacts: [
            { label: 'Best for', value: 'First-time guests staying 1 to 3 days' },
            { label: 'Public transport', value: 'Free in Belgrade since January 1, 2025' },
            { label: 'Main emergency line', value: '112' },
            { label: 'Tourist info tip', value: 'TOB Info Center, Knez Mihailova 5' },
        ],
        resources: [
            {
                label: 'Tourist Organization of Belgrade',
                href: 'https://tob.rs',
                external: true,
            },
        ],
        sections: [
            {
                title: '1 Day: The Belgrade Essentials',
                items: [
                    {
                        title: 'Morning',
                        description:
                            'Start at Knez Mihailova, Belgrade’s main pedestrian street, and walk toward Kalemegdan Fortress. Explore the old walls, Roman remains, and the famous view where the Sava meets the Danube.',
                    },
                    {
                        title: 'Afternoon',
                        description:
                            'Visit the Temple of Saint Sava, one of the largest Orthodox churches in the world. Its gold-covered crypt is especially impressive.',
                    },
                    {
                        title: 'Evening',
                        description:
                            'Spend the evening in Skadarlija, the city’s bohemian quarter, known for cobblestones, old Belgrade atmosphere, and live acoustic music.',
                    },
                ],
            },
            {
                title: '2 Days: Rivers and Retro Vibes',
                items: [
                    {
                        title: 'Morning',
                        description:
                            'Visit the Museum of Yugoslavia and the House of Flowers for a strong glimpse into 20th-century history and the Yugoslav era.',
                    },
                    {
                        title: 'Afternoon',
                        description:
                            'Go to Zemun, walk along the riverside quay, and climb to Gardoš Tower for one of the city’s best panoramic views.',
                    },
                    {
                        title: 'Evening',
                        description:
                            'Head to Beton Hala by the river for modern restaurants, bars, and excellent views of the bridges at night.',
                    },
                ],
            },
            {
                title: '3 Days: Deep Dive and Local Relaxation',
                items: [
                    {
                        title: 'Morning',
                        description:
                            'Visit the Nikola Tesla Museum and, if possible, book a guided tour so you can see demonstrations of his inventions.',
                    },
                    {
                        title: 'Afternoon',
                        description:
                            'If the weather is good, spend time at Ada Ciganlija, Belgrade’s famous lake area, great for cycling, swimming, or a long coffee break by the water.',
                    },
                    {
                        title: 'Evening',
                        description:
                            'Explore Cetinjska Street, a former industrial zone turned into an alternative nightlife area with bars, music, and a younger local crowd.',
                    },
                ],
            },
            {
                title: 'Quick Tips for Your Stay',
                tone: 'highlight',
                bullets: [
                    'Belgraders love coffee and take cafe time seriously, so slow down and enjoy it.',
                    'Tap water in Belgrade is safe to drink.',
                    'Public transport is free as of January 1, 2025, so you do not need tickets. If you want route planning, apps such as Beograd Plus can still be useful.',
                    'If you expect a very late or very early hostel arrival, please let us know in advance.',
                ],
            },
            {
                title: 'Emergency Numbers',
                tone: 'warning',
                bullets: ['Police: 192', 'Fire Department: 193', 'Ambulance: 194', 'General Emergency: 112'],
            },
            {
                title: 'Free Walking Tours and Sightseeing Adventures',
                intro: 'For the latest schedules, seasonal offers, and bookings, we recommend checking the Tourist Organization of Belgrade.',
                items: [
                    {
                        title: 'Free Walking Tours',
                        description:
                            'Most tours start around Republic Square, run for about 2 to 2.5 hours, and are tip-based. Look for yellow or orange umbrellas, or check tob.rs for current times.',
                    },
                    {
                        title: 'Belgrade by Water',
                        description:
                            'Boat tours on the Sava and Danube usually last 60 to 90 minutes and offer a different view of Kalemegdan, Great War Island, and Belgrade Waterfront. Sunset cruises are especially worth it.',
                    },
                    {
                        title: 'Romantika Train and Historic Rail Tours',
                        description:
                            'These special tourist rides are seasonal, usually during spring and summer, and sometimes head to places like Sremski Karlovci or Vršac. Check the Excursions section on tob.rs for current availability.',
                    },
                    {
                        title: 'Open-Top Bus Tours',
                        description:
                            'A practical option if you want to cover major landmarks quickly, including Dedinje and the Royal Palaces, with audio guides in several languages.',
                    },
                ],
                note: 'A short walk from the hostel, the TOB Info Center at Knez Mihailova 5 is a good place to pick up free maps and brochures.',
            },
        ],
    },
];

export function getGuestGuide(slug: string) {
    return guestGuides.find((guide) => guide.slug === slug);
}
