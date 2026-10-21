# SIA — Student Academic Information System

A student academic portal built with **React + TypeScript + Vite**. One place for KRS (course planning), grades, tuition and payments, schedules, notifications, profile, campus services and a small poster maker — plus an AI chat sidebar for quick questions.

> Coursework project. The data layer is mocked in `constants.ts` / `types.ts`; wire it to your campus API before using it for real.

## Pages

| Route / page | What it does |
|---|---|
| `Dashboard` | GPA, credits, payment status and today's schedule at a glance |
| `KRS` | Plan and review the semester course load |
| `Grades` | Transcript view with per-course scores and grade points |
| `Finance` | Tuition bill, payment status and history |
| `Schedule` | Weekly class timetable |
| `Notifications` | Campus announcements |
| `Profile` | Student identity and programme details |
| `Services` | Campus service shortcuts |
| `PosterMaker` | Generates a shareable poster from student data |

## Stack

- React 19 + TypeScript, Vite
- Tailwind (CDN config in `index.html`)
- `lucide-react` icons
- AI chat sidebar component (`components/AIChatSidebar.tsx`)

## Run locally

```sh
npm install
npm run dev        # Vite dev server
npm run build      # production build
npm run preview    # preview the build
```

Open the URL Vite prints (usually <http://localhost:5173>).

## Structure

```text
App.tsx              app shell and page switching
components/          Layout, AI chat sidebar
pages/               Dashboard, KRS, Grades, Finance, Schedule,
                     Notifications, Profile, Services, PosterMaker
constants.ts         mock campus data
types.ts             shared types
```

## License

MIT
