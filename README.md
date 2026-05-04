# College Prep Collective

A full-stack website I built for a college admissions consultant. She needed a professional site to showcase her services, collect leads, and direct clients to her payment and booking pages. I handled everything from design to deployment.

Live: <https://www.collegeprepcollective.com>

-----

## What it is

Dr. Krystal Johnson has 13+ years in college admissions including roles at Columbia University. She runs a consulting practice helping families navigate the college process — essays, financial aid, college lists, the whole thing. She needed a site that looked the part and fit her needs.

-----

## What I built

The frontend is a single-page site with sections for her about, services, quick wins, membership, student results, FAQ, and a contact modal. The backend is an Express server that handles form submissions and sends email notifications through Nodemailer.

Payment buttons link out to her Stan Store. Booking buttons go straight to her Calendly. Both open in a new tab so the user stays on the site.

-----

## Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js + Express
- **Email:** Nodemailer
- **Hosting:** Render
- **Domain:** Namecheap → custom domain via CNAME
- **Version control:** Git + GitHub
- **Payments:** Stan Store
- **Scheduling:** Calendly

-----

## Folder structure

```
college-prep-collective/
├── public/
│   ├── index.html
│   └── IMG_4144.JPG
├── server.js
├── package.json
├── .env
└── README.md
```

-----

## Running it locally

```bash
git clone https://github.com/Shaquillew93/college-prep-collective.git
cd college-prep-collective
npm install
node server.js
```

Then go to `http://localhost:3000`.

You’ll need a `.env` file:

```
PORT=3000
EMAIL_USER=your_email
EMAIL_PASS=your_app_password
NOTIFY_EMAIL=notification_email
FRONTEND_URL=https://www.collegeprepcollective.com
```

-----

## API

|Method|Route         |What it does                 |
|------|--------------|-----------------------------|
|POST  |`/api/contact`|Consultation form submissions|
|POST  |`/api/order`  |Order/checkout submissions   |
|GET   |`/api/health` |Health check                 |

-----

## Deployment

Hosted on Render. Pushes to `main` auto-deploy — no manual steps needed after the initial setup. Custom domain pointed from Namecheap using a CNAME record.

-----

## Notes

This was a real client project. The site is live and she’s actively using it to run her business. It was a good exercise in going from a design brief to a deployed product without a framework — just vanilla JS, Node, and figuring things out as they came up.

-----

Built by Shaquille W. — [@Shaquillew93](https://github.com/Shaquillew93)
