'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BookingState {
    checkIn: Date | undefined;
    checkOut: Date | undefined;
    roomId: string | null;
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    numberOfGuests: number;
    specialRequests: string;
    step: number;
}

interface BookingContextType extends BookingState {
    setDates: (checkIn: Date | undefined, checkOut: Date | undefined) => void;
    setRoomId: (id: string | null) => void;
    setGuestDetails: (details: Partial<BookingState>) => void;
    setStep: (step: number) => void;
    reset: () => void;
}

const initialState: BookingState = {
    checkIn: undefined,
    checkOut: undefined,
    roomId: null,
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    numberOfGuests: 1,
    specialRequests: '',
    step: 1,
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<BookingState>(initialState);

    const setDates = (checkIn: Date | undefined, checkOut: Date | undefined) => {
        setState((prev) => ({ ...prev, checkIn, checkOut }));
    };

    const setRoomId = (roomId: string | null) => {
        setState((prev) => ({ ...prev, roomId }));
    };

    const setGuestDetails = (details: Partial<BookingState>) => {
        setState((prev) => ({ ...prev, ...details }));
    };

    const setStep = (step: number) => {
        setState((prev) => ({ ...prev, step }));
    };

    const reset = () => {
        setState(initialState);
    };

    return (
        <BookingContext.Provider
            value={{
                ...state,
                setDates,
                setRoomId,
                setGuestDetails,
                setStep,
                reset,
            }}
        >
            {children}
        </BookingContext.Provider>
    );
}

export function useBooking() {
    const context = useContext(BookingContext);
    if (context === undefined) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
}
