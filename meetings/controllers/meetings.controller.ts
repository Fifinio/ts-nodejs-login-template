import { Schema, model } from "mongoose";

const meetingSchema = new Schema<IMeeting>({
  title: { type: String, required: true },
  location: { type: String, required: false },
  description: { type: String, required: false },
  start: { type: String, required: true },
  end: { type: String, required: true },
  timeZone: { type: String, required: true },
  attendees: [{ email: String }],
});

export const MeetingModel = model<IMeeting>("Meeting", meetingSchema);
