# EduSched Pro

EduSched Pro is a modern, intelligent academic scheduling platform designed to streamline and optimize timetable creation for educational institutions. Built with Next.js and TypeScript, it offers advanced constraint management, predictive analytics, and full compliance with NEP 2020, empowering administrators and faculty to efficiently manage complex scheduling needs.

---

## 🚀 Features

- **Advanced Constraint Management**  
  Handle faculty availability, room capacity, equipment needs, and time preferences with ease.

- **Predictive Analytics Dashboard**  
  Forecast resource utilization, predict conflicts, and analyze faculty workload patterns.

- **Multidisciplinary Course Support**  
  NEP 2020 compliance with cross-department electives and flexible curricula.

- **Approval Workflow System**  
  Multi-level approval processes, revision tracking, comments, and automated notifications.

- **User Authentication & Authorization**  
  Secure sign-in/sign-up with Clerk integration.

- **Responsive UI**  
  Modern, accessible interface built with React and Tailwind CSS.

---

## 📁 Project Structure

```
edu-sched-pro/
├── .clerk/                # Clerk authentication config (auto-generated)
├── .next/                 # Next.js build output
├── public/                # Static assets (SVGs, images)
├── src/
│   ├── app/               # Next.js app directory
│   ├── components/        # Reusable UI and page components
│   │   └── landing-page/  # Landing page components (Navbar, etc.)
│   │   └── ui/            # UI primitives (Sheet, Drawer, etc.)
│   └── middleware.ts      # Middleware for request handling
├── .env                   # Environment variables
├── package.json           # Project metadata and scripts
├── tsconfig.json          # TypeScript configuration
├── next.config.ts         # Next.js configuration
└── README.md              # Project documentation
```

---

## 🛠️ Getting Started

1. **Clone the repository**
   ```sh
   git clone https://github.com/jatinkaushik-jk/EduSchedPro.git
   cd edu-sched-pro
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Set up environment variables**  
   Copy `.env.sample` to `.env` and fill in the required values.

4. **Run the development server**
   ```sh
   npm run dev
   ```

5. **Open in browser**  
   Visit [http://localhost:3000](http://localhost:3000)

---

## 🤝 Contribution Guidelines

We welcome contributions! To contribute:

1. **Fork the repository** and clone your fork.
2. **Create a new branch** for your feature or bugfix:
   ```sh
   git checkout -b feature/your-feature-name
   ```
3. **Commit your changes** with clear messages.
4. **Push to your fork** and open a Pull Request (PR) against the `main` branch.
5. **Describe your changes** in the PR and link any relevant issues.

Please follow the code style and conventions used in the project.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙋‍♂️ Support & Contact

For questions, issues, or feature requests, please open an issue on [GitHub](https://github.com/jatinkaushik-jk/EduSchedPro/issues).

---

**EduSched Pro** – Empowering educational institutions with intelligent scheduling.