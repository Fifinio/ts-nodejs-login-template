class Meeting {
  summary: string;
  location: string;
  description: string;
  start: {
    DateTime: string;
    TimeZone: string;
  };
  end: {
    DateTime: string;
    TimeZone: string;
  };
  attendees: { email: string }[];

  constructor(meeting: Meeting) {
    this.summary = meeting.summary;
    this.location = meeting.location;
    this.description = meeting.description;
    this.start = meeting.start;
    this.end = meeting.end;
    this.attendees = meeting.attendees;
  }
}
