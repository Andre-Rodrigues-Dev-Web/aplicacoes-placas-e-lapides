import React from 'react';
import { 
    TimelineContainer, 
    TimelineItem, 
    TimelineContent, 
    YearBadge, 
    EventTitle, 
    EventDescription 
} from './Timeline.styles';

const Timeline = ({ events }) => {
    if (!events || events.length === 0) return null;

    return (
        <div style={{ marginTop: '4rem', marginBottom: '2rem' }}>
            <h2 style={{ textAlign: 'center', color: '#1A365D', fontFamily: '"Playfair Display", serif', fontSize: '2rem' }}>
                Linha do Tempo
            </h2>
            <TimelineContainer>
                {events.map((event, index) => {
                    const eventYear = event.event_date ? new Date(event.event_date).getFullYear() : '';
                    return (
                        <TimelineItem key={index}>
                            <TimelineContent>
                                {eventYear && <YearBadge>{eventYear}</YearBadge>}
                                <EventTitle>{event.title}</EventTitle>
                                {event.description && <EventDescription>{event.description}</EventDescription>}
                            </TimelineContent>
                        </TimelineItem>
                    );
                })}
            </TimelineContainer>
        </div>
    );
};

export default Timeline;
