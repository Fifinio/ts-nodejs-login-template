interface IMeeting {
    title: string;
    location?: string;
    description?: string;
    start: string;
    end: string;
    timeZone: string;
    attendees: { email: string }[];
  }