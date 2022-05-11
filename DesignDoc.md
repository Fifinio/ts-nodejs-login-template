# Scheduler

Aplikacja służy do umawiania spotkań między dwoma osobami

### Funkcjonalności jako User Story

1. Jako użytkownik chce dać możliwość interesantom umówienia spotkania ze mną

   - Udostępniam interesantom link do mojej aplikacji gdzie mogą wprowadzić swoje dane i znaleźć wolny termin na spotkanie lub znaleźć godzinę w konkretny umówiony przez nas dzień
   - Dostaję informację o spotkaniu i potwierdzam je. (_dashboard lub mail_)
   - Interesant dostaje informację o potwierdzeniu spotkania (_dashboard lub mail_)

2. Jako użytkownik chcę móc odwołać spotkanie

- W tym momencie chce zamknąć link do spotkania aby nikt nie mógł już wysyłać prośby
- Chcę odesłać informację zwrotną do wszystkich uczestników i powiadomić ich że nie będę w stanie wziąć udziału

### Wymagane modele

#### User

- id: string (_randomUUID_)

* username: string,
* password: string
* attendingMeetings: Meeting[],
* usesExternalCalendar: boolean
* externalCalendar?: Calendar

#### Propsal

agenda: string
message: string
proposedStartDates: Date[]
duration: number
attendees: attendee[]

#### Meeting

- id: string (_randomUUID_)
- startDate: Date
- duration: number
- meetingUrl?: string
- agenda: string
- message: string
- attendees: attendee[]

#### Attendee

- userId: string
- remind: boolean
- isComing?: boolean (_gdzie null znaczy może_)
