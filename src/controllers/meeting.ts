import { Schema, model } from "mongoose";
import crypto from "crypto";
interface IMeeting {
  title: string;
  location?: string;
  description?: string;
  start: string;
  end: string;
  timeZone: string;
  attendees: { email: string }[];
}

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

export const insert = (req, res) => {
  let salt = crypto.randomBytes(16).toString("base64");
  let hash = crypto
    .createHmac("sha1", salt)
    .update(req.body.password)
    .digest("base64");

  req.body.password = salt + "$" + hash;
  MeetingModel.create(req.body, (err, meeting) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(meeting);
    }
  });
};
