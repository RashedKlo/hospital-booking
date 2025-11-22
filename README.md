# Hospital Booking System

A modern, responsive hospital booking application built with Next.js, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Modern UI/UX**: Glassmorphism design, smooth animations, and responsive layout.
- **Dynamic Clinic Pages**: Detailed views for each clinic with static generation support.
- **Appointment Management**: Easy booking, rescheduling, and cancellation flows.
- **Search & Filter**: Advanced filtering for clinics by region, specialty, and rating.
- **Dark Mode**: Fully supported dark/light theme switching.
- **RTL Support**: Built with Arabic language support in mind.

## 🛠️ Tech Stack

- **Framework**: [Next.js 13+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: GitHub Pages (Static Export)

## 📦 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/RashedKlo/hospital-booking.git
   cd hospital-booking
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🚀 Deployment

This project is configured for static export (`output: 'export'`), making it perfect for GitHub Pages.

### Deploying to GitHub Pages

1. **Build the project**
   ```bash
   npm run build
   ```
   This will generate a `out` directory with the static files.

2. **Push to GitHub**
   Ensure your changes are committed and pushed to the `main` branch.

   ```bash
   git add .
   git commit -m "Update project"
   git push origin main
   ```

3. **Configure GitHub Pages**
   - Go to your repository settings on GitHub.
   - Navigate to "Pages".
   - Select `gh-pages` branch (if you are using a workflow) or configure it to serve from the `out` folder if you are deploying manually.
   - **Note**: For automated deployment, ensure you have a GitHub Actions workflow set up to build and deploy the Next.js app.

## 📄 License

This project is licensed under the MIT License.
