# UseCalendar Hook Documentation

The `useCalendar` hook is a custom React hook that integrates a calendar component using [FullCalendar.js](https://fullcalendar.io/) and Tailwind CSS primitives for styling. It supports light and dark themes, which can be toggled dynamically, and allows for custom theming through Tailwind CSS classes.

## Installation

First, ensure that you have the `@fullcalendar/react` and `@fullcalendar/daygrid` packages installed, along with Tailwind CSS if you wish to use custom styles.

```bash
npm install @fullcalendar/react @fullcalendar/daygrid
```

## Usage

### Import the Hook

Import the necessary dependencies and the `useCalendar` hook in your component.

```javascript
import { useCalendar } from 'use-fullcalendar';
```

### Define Types

The types used by the hook for theming are defined as follows:

```typescript
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
```

### Properties

The `CalendarProps` interface accepts optional properties to configure the calendar component:

- **backgroundColor?**: Tailwind CSS class for the background color.
- **textColor?**: Tailwind CSS class for the text color.
- **themeConfig?**: Theme configuration using the `ThemeConfig` type.
- **theme?**: Initial theme, either `"light"` or `"dark"`.
- **calendarConfiguration?**: Configuration object for the FullCalendar instance.

### Hook Implementation

```javascript
function useCalendar({ theme, themeConfig, calendarConfiguration }: CalendarProps): {
    calendar: React.ReactElement<FullCalendar>,
    toggleTheme: () => void
} {
    const [calendarTheme, setCalendarTheme] = useState<"light" | "dark" | undefined>(theme || "light");
    const [useCustomTheme,] = useState(themeConfig ? true : false);

    const toggleTheme = () => {
        setCalendarTheme(calendarTheme === "light" ? "dark" : "light");
    };

    function setupCalendar(): React.ReactElement<FullCalendar> {
        if (!useCustomTheme) {
            return (
                <FullCalendar
                    {...calendarConfiguration}
                    plugins={[dayGridPlugin]}
                    height={"60vh"}
                    viewClassNames={calendarTheme === "light" ? ["bg-white", "text-black"] : ["bg-slate-800", "text-white"]}
                />
            );
        }

        if (!themeConfig) {
            throw new Error("props.themeConfig is required when using custom theme");
        }

        switch (calendarTheme) {
            case "light":
                return (
                    <FullCalendar
                        {...calendarConfiguration}
                        plugins={[dayGridPlugin]}
                        height={"60vh"}
                        viewClassNames={[themeConfig.light.backgroundColor, themeConfig.light.textColor]}
                    />
                );
            case "dark":
                return (
                    <FullCalendar
                        {...calendarConfiguration}
                        plugins={[dayGridPlugin]}
                        height={"60vh"}
                        viewClassNames={[themeConfig.dark.backgroundColor, themeConfig.dark.textColor]}
                    />
                );
            default:
                throw new Error("calendarTheme must be 'light' or 'dark'");
        }
    }

    return {
        calendar: setupCalendar(),
        toggleTheme
    };
}
```

### Example Usage

```javascript
import useCalendar from './useCalendar';

function CalendarComponent() {
    const { calendar, toggleTheme } = useCalendar({
        theme: 'light',
        themeConfig: {
            light: {
                backgroundColor: 'bg-blue-100',
                textColor: 'text-blue-800',
            },
            dark: {
                backgroundColor: 'bg-gray-900',
                textColor: 'text-white',
            },
        },
        calendarConfiguration: {
            initialView: 'dayGridMonth',
        },
    });

    return (
        <div>
            {calendar}
            <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
    );
}
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

---
