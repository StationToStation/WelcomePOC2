import * as React from 'react';

export const Time = () => {
    const [date, setDate] = React.useState(new Date());
    React.useEffect(() => {
        const timer = window.setInterval(() => setDate(new Date()), 1000);
        return () => window.clearInterval(timer);
    });

    return <div>{date.toLocaleTimeString()}</div>;
};

export default Time;
