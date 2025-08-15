import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import type { CalendarOptions } from '@fullcalendar/core';
import { useState } from 'react';
export type ThemeConfig = {
    light: {
        backgroundColor: string | 'bg-white';
        textColor: string | 'text-black';
    };
    dark: {
        backgroundColor: string | 'bg-slate-800';
        textColor: string | 'text-white';
    };
};

export type CalendarFunctions = {
    dateClickCallback: (date: string) => void;
};

interface CalendarProps {
    backgroundColor?: string;
    textColor?: string;
    themeConfig?: ThemeConfig;
    theme?: 'light' | 'dark';
    calendarConfiguration?: CalendarOptions;
    functions?: CalendarFunctions;
}

export default function useCalendar({
    theme,
    themeConfig,
    calendarConfiguration,
    functions,
}: CalendarProps): {
    CalendarComponent: () => React.ReactElement<FullCalendar>;
    toggleTheme: () => void;
} {
    const [calendarTheme, setCalendarTheme] = useState<
        'light' | 'dark' | undefined
    >(theme || 'light');
    const [useCustomTheme] = useState(themeConfig ? true : false);
    const [selectedDate, setSelectedDate] = useState<string>('');

    const toggleTheme = () => {
        if (calendarTheme === 'light') {
            setCalendarTheme('dark');
        } else {
            setCalendarTheme('light');
        }
    };

    const CalendarComponent = (): React.ReactElement<FullCalendar> => {
        if (!useCustomTheme) {
            return (
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    height={'60vh'}
                    viewClassNames={
                        calendarTheme === 'light'
                            ? ['bg-white', 'text-black']
                            : ['bg-slate-800', 'text-white']
                    }
                    dateClick={(dateInfo) => {
                        functions?.dateClickCallback(dateInfo.dateStr);
                    }}
                    dayCellClassNames={() =>
                        '@apply hover:bg-primary cursor-pointer'
                    }
                    {...calendarConfiguration}
                />
            );
        }
        if (!themeConfig) {
            throw new Error(
                'props.themeConfig is required when using custom theme',
            );
        }

        switch (calendarTheme) {
            case 'light':
                return (
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        height={'60vh'}
                        viewClassNames={[
                            themeConfig.light.backgroundColor,
                            themeConfig.light.textColor,
                        ]}
                        dateClick={(dateInfo) => {
                            setSelectedDate(dateInfo.dateStr);
                        }}
                        dayCellClassNames={() =>
                            '@apply hover:bg-primary cursor-pointer'
                        }
                        {...calendarConfiguration}
                    />
                );
            case 'dark':
                return (
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        height={'60vh'}
                        viewClassNames={[
                            themeConfig.dark.backgroundColor,
                            themeConfig.dark.textColor,
                        ]}
                        dateClick={(dateInfo) => {
                            setSelectedDate(dateInfo.dateStr);
                        }}
                        dayCellClassNames={() =>
                            '@apply hover:bg-primary cursor-pointer'
                        }
                        {...calendarConfiguration}
                    />
                );
            default:
                throw new Error("calendarTheme must be 'light' or 'dark'");
        }
    };

    return {
        CalendarComponent,
        toggleTheme,
    };
}
