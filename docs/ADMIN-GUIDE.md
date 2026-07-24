# Admin Panel Guide — Zumrah Apparel

This document covers the admin-facing features: separate admin login, user management, blog, dashboard analytics, and SEO fields.

## 1. Logging In

There are two separate login entry points:

- **Customers**: `/login` — regular customer account login/registration.
- **Admins**: `/admin` — visiting this URL while logged out shows a dedicated **Admin Login** form (it does not redirect to the customer login page).

After logging in:
- An admin account is redirected to `/admin` (the dashboard).
- A customer account is redirected to `/account`.

If a non-admin account is used on the `/admin` login form, the login is rejected with "This login is for admin accounts only."

Default seeded admin account (change the password after first login):
```
Email:    admin@zumrahapparel.com
Password: ChangeMe123!
```

## 2. Admin Dashboard (`/admin`)

- **Stat cards**: today's orders, monthly revenue, total customers, pending orders, delivered orders — each links to the relevant admin page.
- **Orders & Revenue — Last 30 Days**: a chart showing daily order volume (bars) and daily revenue (gold line), with a "Trending up / down / flat" badge comparing the last 15 days to the previous 15.
- **Popular Products**: top 5 products by review count.
- **Recent Orders**: the 6 most recent orders with a link straight to the customer's profile.

## 3. User Management (`/admin/users`)

Lists every registered user with role, status, order count, and join date. Available actions per user:

- **Promote/Demote** — toggle between `CUSTOMER` and `ADMIN`.
- **Block/Unblock** — a blocked user cannot log in (credentials or Google/Facebook), but their historical orders/reviews are preserved.
- **Delete** — permanently removes the user. Their past orders and reviews are kept but unlinked (`userId` set to null) rather than deleted.

An admin cannot promote/demote, block, or delete their own account, to prevent accidental lockout.

Click a user's name to open **`/admin/users/[id]`** — their full profile (join date, total orders, total spent) and complete order history.

## 4. Blog (`/admin/blog`)

Simple blog system:
- Fields: title, slug, cover image (URL), excerpt, content (plain text), published/draft toggle.
- Public pages: `/blog` (listing, published posts only) and `/blog/[slug]` (detail).
- A post only appears publicly once **Published** is toggled on.

## 5. SEO Fields

Both **Products** and **Blog Posts** have optional `SEO Title` / `SEO Description` fields in their admin forms.

- **Leave them blank** and the system auto-generates them from the product/post's own name and description (title capped at 60 chars + " | Zumrah Apparel", description capped at 160 chars) — this happens automatically on save, so every page always has valid SEO metadata even if the admin never touches these fields.
- **Fill them in** to override with custom copy.

These values are rendered as the real `<title>`, meta description, Open Graph, and Twitter Card tags on `/shop/[slug]` and `/blog/[slug]`. Product pages also include `Product` JSON-LD (price, availability, rating) and blog posts include `Article` JSON-LD — both improve how Google displays and ranks these pages (rich results eligibility), on top of the meta tags themselves.

Note: none of this replaces analytics/traffic tracking (page views, visitor counts) — that was intentionally left out; for real traffic numbers, use a dedicated tool like Google Analytics or Vercel Analytics rather than building it into the app database.

## Schema Changes Reference

- `User.blocked` (Boolean, default false)
- `Post` model (blog) — title, slug, excerpt, coverImage, content, published, metaTitle, metaDescription, authorId
- `Product.metaTitle`, `Product.metaDescription`
- `Post.metaTitle`, `Post.metaDescription`
- `Order.user` and `Review.user` relations changed to `onDelete: SetNull` so deleting a user doesn't fail or cascade-delete their order/review history.
