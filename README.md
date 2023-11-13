# DEFI Motors and Auto-works - website

Source code for DEFI Motors and Autoworks website. 

## Live site

#### Public Pages

- Home: [`/`](https://www.defioffroads.co.ke/)
- Cars: [`/cars`](https://www.defioffroads.co.ke/cars)
- Services: [`/services`](https://www.defioffroads.co.ke/services)
- Blog: [`/blog`](https://www.defioffroads.co.ke/blog)
- Contacts: [`/contacts`](https://www.defioffroads.co.ke/contacts)

#### Admin Pages

- Home: [`/`](https://www.defioffroads.co.ke/)
- Inventory (Products & Services): [`/admin/inventory`](https://www.defioffroads.co.ke/admin/inventory)
- Blog: [`/admin/blog`](https://www.defioffroads.co.ke/admin/blog)
- Leads: [`/admin/leads`](https://www.defioffroads.co.ke/admin/leads)

#### Backend routes

- Authentication: [`/api/auth`]
- Products: [`/api/products`] 
- Blogs: [`/api/blogs`]

## Toolchain

- Next js 13: bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
- css: [`Tailwind`](https://tailwindcss.com/) v3.
- Hosting: [`Vercel`](https://vercel.com/).
- Mail: [`nodemailer`](https://nodemailer.com/).
- Authentication: [`Next.js Auth`](https://next-auth.js.org). 

### Running App

Clone this repo in your local directory:

```bash
git clone https://github.com/goweki/defi-web
```

Navigate into the local repo and install dependencies:

```bash
npm i
```

To run the development server, within the cloned repo:

```bash
npm run dev
```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### To build the production-ready optimized build.

```bash
npm run build
```

- The output of the build process is stored in the .next directory by default.

To start the server in production mode

 ```bash
npm run start
```

- serves the previously built and optimized version of your application.
- Next js runs the server on port 3000 by default

