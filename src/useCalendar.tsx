import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useState } from 'react';

type TWBackgroundColorClass = string;
type TWTextColorClass = string;
export type ThemeConfig = {
    light: {
        backgroundColor: TWBackgroundColorClass | 'bg-white';
        textColor: TWTextColorClass | 'text-black';
    };
    dark: {
        backgroundColor: TWBackgroundColorClass | 'bg-slate-800';
        textColor: TWTextColorClass | 'text-white';
    };
};

interface CalendarProps {
    backgroundColor?: TWBackgroundColorClass;
    textColor?: TWTextColorClass;
    themeConfig?: ThemeConfig;
    theme?: 'light' | 'dark';
    calendarConfiguration?: any;
}

export default function useCalendar({
    theme,
    themeConfig,
    calendarConfiguration,
}: CalendarProps): {
    calendar: React.ReactElement<FullCalendar>;
    toggleTheme: () => void;
} {
    const [calendarTheme, setCalendarTheme] = useState<
        'light' | 'dark' | undefined
    >(theme || 'light');
    const [useCustomTheme] = useState(themeConfig ? true : false);
    const calendar = setupCalendar();

    const toggleTheme = () => {
        if (calendarTheme === 'light') {
            setCalendarTheme('dark');
        } else {
            setCalendarTheme('light');
        }
    };

    function setupCalendar(): React.ReactElement<FullCalendar> {
        if (!useCustomTheme) {
            return (
                <FullCalendar
                    {...calendarConfiguration}
                    plugins={[dayGridPlugin]}
                    height={'60vh'}
                    viewClassNames={
                        calendarTheme === 'light'
                            ? ['bg-white', 'text-black']
                            : ['bg-slate-800', 'text-white']
                    }
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
                        {...calendarConfiguration}
                        plugins={[dayGridPlugin]}
                        height={'60vh'}
                        viewClassNames={[
                            themeConfig.light.backgroundColor,
                            themeConfig.light.textColor,
                        ]}
                    />
                );
            case 'dark':
                return (
                    <FullCalendar
                        {...calendarConfiguration}
                        plugins={[dayGridPlugin]}
                        height={'60vh'}
                        viewClassNames={[
                            themeConfig.dark.backgroundColor,
                            themeConfig.dark.textColor,
                        ]}
                    />
                );
            default:
                throw new Error("calendarTheme must be 'light' or 'dark'");
        }
    }

    return {
        calendar,
        toggleTheme,
    };
}
