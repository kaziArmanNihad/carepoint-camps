# CarePoint Camps

**Live Demo:** [Visit Website](https://carepoint-camps.vercel.app)

Manage your medical camps effortlessly with **CarePoint Camps**. Our comprehensive platform offers seamless registration, efficient resource planning, and real-time insights—ensuring every camp runs smoothly. Whether you're a doctor, volunteer, patient, or admin, CarePoint Camps helps you focus on delivering exceptional care without logistical stress.

---

## Features

- **Doctors** can create and manage medical camps.
- **Volunteers** can join camps and access their personal dashboards.
- **Patients** can register for free checkups at camps.
- **Admins** get a dedicated dashboard for managing users, resources, and camp activities.
- **Stripe integration** for secure and easy patient payments.
- **Personalized Dashboards** for all user roles.

---

## Tech Stack

### Frontend

Built with modern and scalable tools:

- **React 18**
- **React Router DOM 6**
- **Firebase** (Authentication & Backend)
- **Stripe JS** & **React Stripe JS** (Payments)
- **Tailwind CSS** & **DaisyUI**
- **React Query** (Data fetching & caching)
- **Recharts** (Data visualization)
- **Swiper**, **SweetAlert2**, **React Icons**, **React Hook Form**, **Moment.js**, **Axios**

### Development Tools

- **Vite** (Fast build tool)
- **ESLint**, **Prettier**, **PostCSS**
- **TailwindCSS Plugin**
- **TypeScript** (Types via @types)
- **React Hot Toast** for notifications

---

## Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/your-username/carepoint-camps.git
cd carepoint-camps
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

---

Environment Variables

Make sure to set up the following environment variables in a .env file:

```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_STRIPE_PUBLISHABLE_KEY=
```

---

Contribution

Contributions are welcome! Please fork the repo and submit a pull request.

---

License

This project is open source and available under the MIT License.

---

Built with love for better healthcare.
