
•	
•	


 
 # **Professional Full-Stack Development Prompt** # **Project Name: Zumrah Apparel – Premium Custom Apparel Platform** ## Project Overview Build a **production-ready, enterprise-level full-stack eCommerce web application** named **Zumrah Apparel**. The platform should allow customers to design premium custom apparel online using a professional 3D customization studio, upload images, add text, preview the final design in real-time, place orders, complete secure payments, and allow administrators to manage products, customers, and orders through a modern Admin Dashboard. The website should look as premium as brands like: * Nike * Adidas * Printful * Printify * Canva * Gelato The entire project must be scalable, responsive, SEO optimized, secure, and production-ready. --- # Target Market Pakistan Currency: **PKR (Pakistani Rupees)** Website Name: **Zumrah Apparel** --- # Technology Stack Frontend * Next.js 15 (App Router) * React 19 * TypeScript * TailwindCSS * Framer Motion * Three.js * React Three Fiber * Drei Backend * Next.js API Routes / Server Actions * Prisma ORM Database * PostgreSQL (Supabase) Authentication * Better Auth / NextAuth Storage * Supabase Storage Image Processing * Sharp State Management * Zustand Validation * Zod Forms * React Hook Form Payments * Stripe (Visa / Mastercard / Debit Cards) * EasyPaisa * JazzCash * Cash on Delivery (COD) Deployment * Vercel --- # Website Pages ## Landing Page Include * Hero Section * Animated Background * Premium Product Showcase * 3D Shirt Preview * Why Choose Us * DTF Printing * Sublimation Printing * Featured Products * Testimonials * FAQ * Newsletter * Footer --- ## Shop Page Display products professionally. Categories * DTF Printing * Sublimation Printing Filters * Price * Color * Size * Printing Method * New Arrival * Best Seller Sorting * Newest * Price Low to High * Price High to Low * Popular Search Live Search --- ## Product Details Show * Product Images * 3D Preview * Available Colors * Sizes * Price * Printing Method * Description * Reviews * Add to Cart * Customize Now --- # Custom Shirt Designer This is the most important feature. Create a professional design studio similar to Canva. --- ## 3D Shirt Use Three.js. Features * Rotate Shirt * Zoom * Pan * Real-time Rendering Available Views * Front * Back * Left Sleeve * Right Sleeve --- ## Shirt Colors Provide all available colors. Changing color should instantly update the 3D model. --- ## Image Upload Allow PNG JPG JPEG GIF WEBP Maximum Size 5MB Features * Drag & Drop * Resize * Rotate * Move * Delete * Duplicate * Flip * Lock Position * Opacity * Layer Order --- ## Text Editor Allow unlimited text. Fonts Include all common fonts * Arial * Helvetica * Times New Roman * Georgia * Verdana * Tahoma * Courier New * Comic Sans * Impact * Trebuchet MS * Poppins * Inter * Roboto * Montserrat * Open Sans Text Features * Color Picker * Font Size * Letter Spacing * Line Height * Rotation * Opacity * Bold * Italic * Underline * Shadow * Outline * Alignment --- ## Print Area Validation Prevent users from placing artwork outside printable areas. Highlight printable boundaries. --- ## Save Design Allow users to * Save Draft * Continue Later * Duplicate Design * Download Preview * Share Design --- # User Authentication Allow Login using * Email * Password Social Login * Google * Facebook Phone Login * OTP Verification --- # User Dashboard Include Profile Saved Designs Wishlist Addresses Order History Downloads Invoices Notifications Settings --- # Shopping Cart Include Product Size Color Printing Method Quantity Customization Preview Price Breakdown Tax Shipping Grand Total Coupon Code --- # Checkout Collect Full Name Phone Number Email Complete Address City Province Postal Code Country Special Instructions --- # Payment Methods Support the following payment options: ### Credit / Debit Cards * Visa * Mastercard * Debit Cards ### Pakistani Digital Wallets * EasyPaisa * JazzCash ### Other Digital Wallets * Any supported Pakistani payment gateway wallets ### Cash on Delivery (COD) * Available across Pakistan The checkout page should clearly display all available payment methods with their respective icons and instructions. --- # Shipping Charges Automatically calculate shipping charges based on the customer's city. ### Karachi Delivery Charges: **PKR 300** ### All Other Cities in Pakistan Delivery Charges: **PKR 450** Requirements: * Automatically detect selected city during checkout. * Apply the correct shipping fee. * Display shipping cost before payment. * Update the order total in real-time. * Show a clear pricing breakdown: * Product Total * Shipping Charges * Discount (if applicable) * Grand Total --- # Currency Display **all prices exclusively in PKR (₨)** throughout the website. Examples: ₨ 1,499 ₨ 2,250 ₨ 5,999 No USD or other currencies should appear anywhere on the website. --- # Order Confirmation After successful order Generate Order ID Invoice Confirmation Email SMS (optional) Order Tracking --- # Admin Dashboard Secure Admin Login Role Based Access Admin Manager Staff --- # Dashboard Show Today's Orders Monthly Revenue Total Customers Pending Orders Completed Orders Popular Products Sales Graph --- # Order Management Admin should View Orders Search Orders Filter Orders Update Status Cancel Orders Refund Orders Print Invoice Download Design PNG --- Each Order Must Show Customer Name Phone Email Address Postal Code Payment Method Payment Status Shipping Charges Subtotal Grand Total Front Design Preview Back Design Preview PNG Download Production Notes Timeline --- # Product Management Admin should Add Products Edit Products Delete Products Hide Products Manage Inventory Upload Images Manage Colors Manage Sizes Manage Prices Manage Categories No coding required. Everything should be manageable from the dashboard. --- # Categories DTF Printing Sublimation Printing Future Support Embroidery Screen Printing Vinyl Printing --- # Customer Management View Users Search Users Order History Saved Designs Blocked Users Active Users --- # Notifications Send Email Order Placed Payment Received Order Confirmed Printing Started Shipped Delivered Cancelled Refunded --- # Security Implement JWT Authentication HTTPS Rate Limiting CSRF Protection XSS Protection SQL Injection Protection Input Validation Secure File Upload Password Hashing PCI-DSS Best Practices --- # Performance Lazy Loading Code Splitting Image Optimization Caching Server Components SEO Optimization Structured Data Fast Loading Core Web Vitals Optimized --- # Responsive Design Desktop Laptop Tablet Mobile Everything should work perfectly on all screen sizes. --- # UI Design Theme Luxury Premium Minimal Dark + White Modern Rounded Components Glassmorphism Smooth Animations Professional Typography Micro Interactions Beautiful Hover Effects --- # Additional Features * Coupon System * Referral Program * Customer Reviews * Product Ratings * Wishlist * Recently Viewed Products * Design Templates * Bulk Order Form * Live Chat * FAQ * Contact Form * Blog * Newsletter * Social Media Integration * Analytics Dashboard * Google Analytics * Facebook Pixel * Search Engine Optimization * XML Sitemap * Robots.txt --- # Database Create proper relational database tables for: Users Products Categories Orders Order Items Designs Uploaded Images Payments Shipping Addresses Reviews Coupons Wishlists Notifications Settings Activity Logs --- # Deliverables The final project must include: * Complete Full Stack Source Code * Responsive UI * Professional Admin Dashboard * 3D Shirt Designer * Authentication System * Payment Gateway Integration (Visa, Mastercard, Debit Card, EasyPaisa, JazzCash, COD) * Shipping Calculation (Karachi: PKR 300, Other Cities: PKR 450) * Order Management System * Product Management System * User Dashboard * Database Schema * API Documentation * Production Deployment Configuration * Clean Folder Structure * Fully Commented Code * High Performance * Enterprise-Level Security * Production-Ready Architecture The code should follow modern best practices, be scalable, maintainable, reusable, and written like a professional software engineer building a commercial SaaS product. The UI/UX should feel polished and premium, with smooth animations, responsive layouts, accessibility support, and an intuitive customer journey from product customization to checkout. 


Bhai, ye prompt already enterprise level hai. Is prompt se AI ko full-stack application banane ki direction mil jayegi.
Lekin agar tum Figma Make / Figma AI se expect kar rahe ho ke woh poori production-ready website, database, authentication, Stripe, EasyPaisa, JazzCash, 3D Designer, Admin Dashboard, aur backend APIs sab ek hi prompt se bana de, to ye practical nahi hai.
Professional software houses bhi is size ke project ko multiple phases me build karte hain.
Is project ko 8 AI prompts me divide karna best rahega:
1.	Project Architecture & Folder Structure
•	Complete Next.js setup
•	Folder structure
•	Database architecture
•	Environment variables
•	Prisma schema
2.	Landing Website
•	Premium homepage
•	Animations
•	Responsive design
•	SEO
3.	Shop + Product Pages
•	Categories
•	Filters
•	Search
•	Product Detail
4.	3D Custom Shirt Designer
•	Three.js
•	React Three Fiber
•	Canvas-style editor
•	Image upload
•	Text tools
•	Layers
•	Print validation
5.	Authentication + User Dashboard
•	Better Auth / NextAuth
•	Google Login
•	OTP
•	Saved Designs
•	Wishlist
•	Orders
6.	Cart + Checkout + Payments
•	Stripe
•	Visa
•	Mastercard
•	EasyPaisa
•	JazzCash
•	COD
•	Shipping logic
•	Coupons
7.	Admin Dashboard
•	Products
•	Orders
•	Analytics
•	Customers
•	Reviews
•	Coupons
•	Inventory
8.	Production Optimization
•	Security
•	Performance
•	SEO
•	Deployment
•	Testing
•	Documentation
________________________________________
Meri recommendation
Tumhara goal sirf website banana nahi hai.
Tum Printful + Canva + Nike Customizer jaisa SaaS build kar rahe ho.
Isliye agar AI ko ek hi 8,000-word prompt doge to woh aksar:
•	features skip karega,
•	inconsistent code likhega,
•	duplicate files banayega,
•	architecture kharab karega,
•	aur baad me maintain karna mushkil ho jayega.
Professional approach ye hai ke har module alag banaya jaye aur phir integrate kiya jaye.
Agar hum is tarah chalein to end me tumhare paas:
•	✅ Enterprise folder structure
•	✅ Production-ready architecture
•	✅ Reusable components
•	✅ Clean code
•	✅ Proper database
•	✅ Scalable APIs
•	✅ Professional UI/UX
•	✅ Commercial-quality application
hogi.
Main tumhare liye is project ko Software House standard ke hisaab se complete roadmap me tod sakta hoon—lagbhag 30–40 detailed AI prompts ke saath—jisse Figma AI aur coding AIs step by step poora project professionally build kar saken.


Project Architecture & Folder Structure Complete Next.js setup Folder structure Database architecture Environment variables Prisma schema


Bhai, agar tum AI se production-level code generate karwana chahte ho to prompt bhi Software House standard ka hona chahiye. Neeche wala prompt directly Figma AI, Codex, Cursor, Claude Code, Gemini CLI ya kisi bhi coding AI ko de sakte ho.
________________________________________
Professional AI Development Prompt
Phase 1 — Project Architecture & Folder Structure
Project: Zumrah Apparel
________________________________________
ROLE
You are a Senior Full-Stack Software Engineer with over 15 years of experience building enterprise SaaS platforms.
Build a production-ready architecture for a premium custom apparel eCommerce platform called Zumrah Apparel.
Do not create demo code.
Do not create placeholder code.
Everything must be scalable, maintainable and follow industry best practices.
Write code exactly like a professional software company.
________________________________________
Technology Stack
Frontend
•	Next.js 15 (App Router)
•	React 19
•	TypeScript
•	TailwindCSS
•	Framer Motion
•	React Three Fiber
•	Three.js
•	Zustand
Backend
•	Next.js Server Actions
•	Route Handlers
•	Prisma ORM
Database
•	PostgreSQL
•	Supabase
Authentication
•	Better Auth (preferred)
•	NextAuth (fallback)
Storage
•	Supabase Storage
Validation
•	Zod
Forms
•	React Hook Form
Payments
•	Stripe
•	EasyPaisa
•	JazzCash
•	Cash on Delivery
Deployment
•	Vercel
Package Manager
•	pnpm
Code Quality
•	ESLint
•	Prettier
•	Husky
•	lint-staged
Testing
•	Vitest
•	Playwright
________________________________________
Goal
Generate the complete project architecture before writing any application features.
The project should be easy to maintain for years.
________________________________________
Create the Complete Folder Structure
Create every folder and explain its purpose.
Example:
zumrah-apparel/

├── app/
│   ├── (marketing)/
│   ├── (shop)/
│   ├── (dashboard)/
│   ├── (admin)/
│   ├── api/
│   ├── auth/
│   ├── customize/
│   ├── checkout/
│   ├── cart/
│   ├── account/
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   └── page.tsx

├── components/
│   ├── ui/
│   ├── forms/
│   ├── layout/
│   ├── marketing/
│   ├── shop/
│   ├── product/
│   ├── designer/
│   ├── dashboard/
│   ├── admin/
│   └── common/

├── features/

├── hooks/

├── lib/

├── services/

├── actions/

├── repositories/

├── prisma/

├── types/

├── schemas/

├── stores/

├── utils/

├── constants/

├── middleware/

├── emails/

├── public/

├── styles/

├── docs/

├── scripts/

└── tests/
Every folder must contain its purpose.
________________________________________
App Router Structure
Design the App Router professionally.
Example
app/

(marketing)

(shop)

(product)

(customizer)

(checkout)

(account)

(admin)

api/
Use Route Groups properly.
________________________________________
Component Architecture
Separate components into
UI Components
Business Components
Shared Components
Server Components
Client Components
Reusable Components
Explain where each belongs.
________________________________________
Feature-Based Architecture
Organize code by feature.
Example
features/

auth/

cart/

checkout/

products/

orders/

users/

designer/

payments/

shipping/

wishlist/

notifications/

analytics/

reviews/
________________________________________
Service Layer
Create
services/

auth.service.ts

payment.service.ts

shipping.service.ts

email.service.ts

designer.service.ts

storage.service.ts
Use Dependency Injection principles.
________________________________________
Repository Layer
Separate database logic.
repositories/

user.repository.ts

order.repository.ts

product.repository.ts

payment.repository.ts
No database queries inside components.
________________________________________
State Management
Use Zustand.
Create stores for
Cart
Authentication
Wishlist
Customization
Notifications
Theme
UI
________________________________________
Environment Variables
Generate
.env.example
Include
DATABASE_URL

DIRECT_URL

NEXT_PUBLIC_SUPABASE_URL

NEXT_PUBLIC_SUPABASE_ANON_KEY

SUPABASE_SERVICE_ROLE_KEY

BETTER_AUTH_SECRET

BETTER_AUTH_URL

GOOGLE_CLIENT_ID

GOOGLE_CLIENT_SECRET

FACEBOOK_CLIENT_ID

FACEBOOK_CLIENT_SECRET

STRIPE_SECRET_KEY

STRIPE_WEBHOOK_SECRET

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

JAZZCASH_MERCHANT_ID

JAZZCASH_PASSWORD

JAZZCASH_INTEGRITY_SALT

EASYPAISA_STORE_ID

SMTP_HOST

SMTP_PORT

SMTP_USER

SMTP_PASSWORD

NEXT_PUBLIC_SITE_URL

NEXT_PUBLIC_GA_ID

NEXT_PUBLIC_FACEBOOK_PIXEL
Add comments explaining every variable.
________________________________________
Prisma Architecture
Create
prisma/

schema.prisma

seed.ts
________________________________________
Database Models
Design proper relational database.
Include
User
Account
Session
Product
Category
Color
Size
Inventory
Review
Wishlist
Cart
CartItem
Order
OrderItem
Payment
ShippingAddress
Coupon
Notification
ActivityLog
UploadedImage
Design
DesignLayer
TextLayer
ImageLayer
Template
Settings
Use
UUID
createdAt
updatedAt
Soft Delete
Indexes
Relations
Cascade Rules
Enums
________________________________________
Required Enums
ProductStatus
OrderStatus
PaymentStatus
UserRole
PrintingMethod
PaymentMethod
NotificationType
ShippingStatus
DesignStatus
CouponType
________________________________________
Security
Implement
JWT
CSRF
Rate Limiting
Input Sanitization
Secure Uploads
Password Hashing
XSS Protection
SQL Injection Protection
HTTPS Only Cookies
Strict CSP
Helmet Headers
________________________________________
Middleware
Generate middleware for
Authentication
Admin Routes
Manager Routes
Rate Limiting
Localization
Security Headers
Logging
________________________________________
Validation
Create
schemas/

auth.schema.ts

product.schema.ts

checkout.schema.ts

designer.schema.ts

payment.schema.ts

coupon.schema.ts
Use Zod.
________________________________________
Utility Layer
Create
Currency Formatter
Image Optimizer
Slug Generator
Price Calculator
Shipping Calculator
Tax Calculator
Coupon Calculator
Date Formatter
File Validator
Phone Formatter
________________________________________
Constants
Create
Routes
Roles
Permissions
Printing Methods
Colors
Sizes
Cities
Shipping Charges
Fonts
Allowed File Types
Maximum Upload Size
________________________________________
Documentation
Generate
README.md
Installation Guide
Deployment Guide
Folder Structure Guide
Database Documentation
API Documentation
Coding Standards
Contributing Guide
Architecture Diagram
________________________________________
Code Standards
Use
SOLID Principles
Clean Architecture
Repository Pattern
Service Pattern
Feature Based Structure
Strict TypeScript
Reusable Components
No Duplicate Code
Server Components whenever possible
Client Components only when necessary
Proper Error Handling
Reusable Hooks
Proper Loading States
Suspense
Streaming
Accessibility
SEO
________________________________________
Performance
Implement
Server Components
Image Optimization
Caching
Dynamic Imports
Lazy Loading
Code Splitting
Memoization
ISR
SSR
Streaming
Edge Runtime where appropriate
________________________________________
Output Format
Generate the project in the following order:
1.	Project initialization commands.
2.	Complete folder structure.
3.	Purpose of every folder.
4.	Required dependencies.
5.	Configuration files.
6.	Environment variables.
7.	Prisma schema.
8.	Database architecture.
9.	Middleware setup.
10.	Validation architecture.
11.	Service layer.
12.	Repository layer.
13.	State management architecture.
14.	Utility layer.
15.	Constants.
16.	Documentation structure.
17.	Development workflow.
18.	Production deployment checklist.
Do not skip any file or folder. Generate production-quality code and architecture that is immediately usable as the foundation for the entire Zumrah Apparel platform.
________________________________________
💎 Result
Ye prompt AI ko Software House level architecture generate karne ke liye optimize kiya gaya hai. Iske baad agla phase hoga:
Phase 2 — Landing Page + Premium UI Design System, jahan complete design system (colors, typography, components, animations, responsive layout, glassmorphism, dark/light theme, etc.) define kiya jayega.


move to phase 2


Professional AI Development Prompt
Phase 2 — Landing Page + Premium UI Design System
Project: Zumrah Apparel
________________________________________
ROLE
You are a Senior Product Designer, UI/UX Architect, Frontend Engineer, Motion Designer, and Design System Expert with over 15 years of experience designing luxury eCommerce platforms.
Design the entire UI/UX system for Zumrah Apparel, a premium custom apparel platform focused on custom T-shirts and apparel in Pakistan.
The design quality should match or exceed:
•	Nike
•	Adidas
•	Apple
•	Canva
•	Printful
•	Printify
•	Gelato
•	Framer
•	Stripe
The output must be production-ready, pixel-perfect, fully responsive, accessible, and scalable.
Do not use generic templates.
Create a unique luxury identity for Zumrah Apparel.
________________________________________
Primary Goal
Create:
•	Complete Design System
•	Landing Page UI
•	Responsive Layout
•	Premium Components
•	Motion System
•	Color System
•	Typography
•	Icons
•	Grid
•	Design Tokens
•	Accessibility
•	Dark/Light Theme
•	Figma-ready component hierarchy
Everything must be reusable.
________________________________________
Brand Identity
Brand Name
Zumrah Apparel
Brand Personality
Luxury
Modern
Creative
Minimal
Premium
Confident
Professional
Innovative
High Quality
Exclusive
________________________________________
Target Audience
Individuals
Businesses
Universities
Schools
Sports Teams
Corporate Clients
Content Creators
Startups
Brands
________________________________________
Design Style
Luxury
Minimal
Large White Space
Rounded Components
Glassmorphism
Soft Shadows
Elegant Animations
Premium Typography
Large Product Images
Smooth Transitions
High-end User Experience
________________________________________
Color Palette
Create a complete design token system.
Include
Primary
Secondary
Accent
Success
Warning
Danger
Info
Neutral
Surface
Background
Border
Text
Muted
Hover
Active
Disabled
Focus
Dark Theme
Light Theme
Generate every shade
Example
50
100
200
300
400
500
600
700
800
900
950
Provide
HEX
RGB
HSL
Usage guidelines
Contrast ratios
Accessibility compliance
________________________________________
Typography
Use modern fonts.
Primary
Inter
Secondary
Poppins
Fallback
System Fonts
Generate
Display
Heading
Subheading
Body
Caption
Button
Label
Navigation
Create
Font Sizes
Line Heights
Letter Spacing
Font Weights
Responsive Typography Scale
________________________________________
Grid System
Desktop
1440px
12 Columns
Laptop
Tablet
Mobile
Proper gutters
Margins
Breakpoints
Spacing system
________________________________________
Spacing System
Generate
4
8
12
16
20
24
32
40
48
56
64
80
96
128
Use 8pt Grid System.
________________________________________
Border Radius
Create tokens
Small
Medium
Large
XL
2XL
Pill
Circle
________________________________________
Shadows
Generate
XS
SM
MD
LG
XL
2XL
Glass
Floating
Modal
Dropdown
Card
Hover
________________________________________
Icons
Use
Lucide Icons
Organize by
Commerce
Navigation
Customization
Payments
Orders
Dashboard
Settings
User
Admin
________________________________________
Button System
Create
Primary
Secondary
Outline
Ghost
Gradient
Icon
Floating
Loading
Disabled
Danger
Success
Small
Medium
Large
Icon Left
Icon Right
Hover
Pressed
Focus
Loading State
Disabled State
________________________________________
Form Components
Text Field
Password
Email
Phone
OTP
Search
Textarea
Checkbox
Radio
Toggle
Slider
Range
Dropdown
Color Picker
File Upload
Date Picker
Time Picker
Validation States
Error States
Loading States
Success States
________________________________________
Navigation
Sticky Header
Transparent Header
Mega Menu
Mobile Drawer
Breadcrumb
Search
Cart Icon
Wishlist
Notifications
Account Menu
Theme Switcher
Language Switcher (future ready)
________________________________________
Landing Page Structure
Design the complete landing page.
________________________________________
Hero Section
Luxury Hero
Large Typography
CTA
Background Animation
Floating Shapes
3D Shirt
Live Preview
Gradient Lighting
Scrolling Indicator
Primary CTA
Customize Now
Secondary CTA
Shop Collection
________________________________________
Trusted By
Display client logos.
________________________________________
Featured Categories
DTF Printing
Sublimation Printing
Embroidery (Coming Soon)
Screen Printing (Coming Soon)
Vinyl Printing (Coming Soon)
________________________________________
Featured Products
Luxury Product Cards
Hover Animation
Quick View
Wishlist
Ratings
Prices
Badges
________________________________________
Why Choose Zumrah
Premium Materials
Fast Delivery
Professional Printing
Secure Payments
High Quality
Customer Support
________________________________________
Printing Services
DTF
Sublimation
Comparison Cards
Advantages
Best Use Cases
________________________________________
Design Studio Preview
Interactive Preview
3D Shirt
Color Change
Upload Image Demo
Text Demo
Layer Panel Preview
Toolbar Preview
________________________________________
How It Works
Step 1
Choose Product
↓
Step 2
Customize
↓
Step 3
Preview
↓
Step 4
Checkout
↓
Step 5
Delivery
________________________________________
Testimonials
Customer Cards
Photos
Ratings
Verified Badge
Animated Carousel
________________________________________
Statistics
Orders
Customers
Countries
Products
Success Rate
Animated Counters
________________________________________
FAQ
Accordion
Search
Categories
________________________________________
Newsletter
Luxury Subscription Card
Email Input
Gradient Background
________________________________________
Footer
Company
Products
Resources
Support
Social Links
Legal
Newsletter
Copyright
________________________________________
Motion Design
Use Framer Motion.
Create animation system.
Include
Fade
Slide
Scale
Rotate
Blur
Parallax
Mouse Follow
Magnetic Buttons
Hover Lift
Card Tilt
Reveal on Scroll
Smooth Page Transition
Loading Skeleton
Micro Interactions
Button Ripple
Image Zoom
Floating Animation
________________________________________
Cards
Glass Card
Product Card
Feature Card
Pricing Card
Testimonial Card
Dashboard Card
Statistics Card
Blog Card
Service Card
________________________________________
Images
Use large premium imagery.
Modern mockups.
3D renders.
Lifestyle apparel.
Minimal backgrounds.
Luxury lighting.
________________________________________
Responsive Design
Desktop
Laptop
Tablet
Mobile
Landscape
Foldable Devices
Ensure every section adapts beautifully.
________________________________________
Accessibility
WCAG AA
Keyboard Navigation
Focus States
Screen Reader Support
ARIA Labels
Proper Contrast
Reduced Motion Support
________________________________________
SEO
Semantic HTML
Heading Hierarchy
Metadata
Structured Data
Open Graph
Twitter Cards
Image Alt Text
Performance Optimized
________________________________________
Performance
Optimize
Images
Fonts
Animations
Bundle Size
Lazy Loading
Dynamic Imports
Server Components
Streaming
Code Splitting
________________________________________
Component Library
Generate reusable components.
Navbar
Footer
Button
Card
Modal
Drawer
Toast
Alert
Badge
Chip
Tabs
Accordion
Tooltip
Dropdown
Pagination
Breadcrumb
Avatar
Skeleton
Spinner
Timeline
Empty State
Error State
Loading State
________________________________________
Design Tokens
Generate
Colors
Typography
Spacing
Radius
Shadows
Opacity
Animation Duration
Animation Curves
Z-index
Breakpoints
Container Widths
________________________________________
Figma Organization
Create pages:
1.	Foundations
2.	Design Tokens
3.	Components
4.	Marketing Pages
5.	Shop Pages
6.	Product Pages
7.	Designer Studio
8.	User Dashboard
9.	Admin Dashboard
10.	Prototypes
Organize every component using Auto Layout, Variables, Component Properties, and Variants.
________________________________________
Deliverables
Generate:
1.	Complete Design System.
2.	Full UI Style Guide.
3.	Design Tokens.
4.	Landing Page Wireframe.
5.	High-Fidelity Landing Page.
6.	Mobile, Tablet, Desktop layouts.
7.	Component Library.
8.	Motion Specifications.
9.	Responsive Rules.
10.	Accessibility Guidelines.
11.	Figma Component Hierarchy.
12.	Developer Handoff Specifications.
Do not skip any section. Every component should be production-ready, reusable, scalable, and ready for implementation in Next.js 15 using React 19, Tailwind CSS, and Framer Motion.
________________________________________
✅ Next Phase
After completing this phase, move to Phase 3 — Shop, Product Listing, Search, Filters, Product Details, and Product Catalog Architecture, where the complete shopping experience and product browsing system will be designed.


move to Phase 3


Excellent. Now we move from the marketing website to the actual eCommerce experience.
This phase defines the complete shopping architecture, product catalog, search engine, filtering system, product detail pages, SEO, and user experience. It should be implemented before the 3D Custom Designer.
________________________________________
Professional AI Development Prompt
Phase 3 — Shop, Product Catalog, Search, Filters & Product Details
Project: Zumrah Apparel
________________________________________
ROLE
You are a Senior Full-Stack Software Engineer, UX Architect, and eCommerce Solutions Architect with 15+ years of experience building enterprise-level online stores.
Design and implement the complete shopping experience for Zumrah Apparel, a premium custom apparel platform.
The implementation must be production-ready, scalable, SEO-optimized, accessible, responsive, and maintainable.
Do not generate placeholder code or demo data.
The architecture must be suitable for handling tens of thousands of products in the future.
________________________________________
Objective
Build the complete shopping module including:
•	Shop Homepage
•	Product Catalog
•	Categories
•	Product Collections
•	Search Engine
•	Filters
•	Sorting
•	Product Detail Page
•	Related Products
•	Recently Viewed
•	Wishlist
•	Reviews
•	Product SEO
•	Inventory Display
•	Product Variants
•	API Architecture
________________________________________
Product Categories
Initially create:
•	DTF Printing
•	Sublimation Printing
Future Ready Categories
•	Embroidery
•	Screen Printing
•	Vinyl Printing
•	Hoodies
•	Polo Shirts
•	Sweatshirts
•	Jerseys
•	Tote Bags
•	Caps
•	Mugs
The database and UI must support unlimited future categories.
________________________________________
Product Collections
Create support for:
New Arrivals
Best Sellers
Featured
Trending
Premium Collection
Limited Edition
Sale
Business Collection
Sports Collection
Corporate Collection
Seasonal Collection
Custom Collection
________________________________________
Shop Homepage
Design a premium shopping experience.
Include:
Hero Banner
Featured Categories
Popular Products
Best Sellers
New Arrivals
Trending Products
Recently Viewed
Recommended For You
Customer Reviews
Newsletter
________________________________________
Product Card
Every product card must display:
Product Image
Hover Image
Product Name
Starting Price (PKR)
Rating
Review Count
Available Colors
Printing Method Badge
New Badge
Best Seller Badge
Discount Badge
Wishlist Button
Quick View
Compare Button (future ready)
Customize Button
Add to Cart
Hover Animation
Loading Skeleton
Lazy Loaded Images
________________________________________
Shop Layout
Desktop
Left Sidebar
Products Grid
Top Toolbar
Pagination
Mobile
Filter Drawer
Sticky Bottom Actions
Responsive Grid
________________________________________
Filters
Implement a dynamic filtering system.
Price Range
Minimum Price
Maximum Price
Color
Size
Printing Method
Category
Availability
Rating
Collection
New Arrival
Best Seller
Discount
Customizable
Gender (future)
Material (future)
Sleeve Type (future)
Brand (future)
Filters must be URL-based for SEO.
Example:
/shop?category=dtf&color=black&size=xl&price=1000-3000
________________________________________
Sorting
Newest
Oldest
Popularity
Best Rated
Most Ordered
Price Low → High
Price High → Low
Alphabetical A-Z
Alphabetical Z-A
Discount %
________________________________________
Search
Create an enterprise search system.
Features
Instant Search
Debounced Search
Search Suggestions
Recent Searches
Popular Searches
Trending Searches
Search History
Misspelling Tolerance
Category Search
Product Search
Tag Search
Color Search
SKU Search
Future AI Search Support
Keyboard Navigation
Highlight Matching Results
Empty State
Loading State
Search Analytics
________________________________________
Product Detail Page
Create a luxury product page.
Sections
Image Gallery
Zoom
360 Preview (future)
3D Preview Button
Thumbnail Gallery
Color Selection
Size Selection
Printing Method
Quantity Selector
Stock Status
SKU
Estimated Delivery
Shipping Charges
Product Description
Specifications
Features
Materials
Care Instructions
Size Guide
Customization Button
Add to Cart
Buy Now
Wishlist
Share
Recently Viewed
Related Products
Frequently Bought Together
Customer Reviews
FAQ
Shipping Information
Returns Policy
________________________________________
Product Variants
Support unlimited combinations.
Example
Color
White
Black
Navy
Red
Green
Blue
Sizes
XS
S
M
L
XL
2XL
3XL
Printing Method
DTF
Sublimation
Every combination should have:
SKU
Stock
Price
Images
Availability
________________________________________
Product Images
Support
Primary Image
Hover Image
Gallery Images
Variant Images
Thumbnail
Zoom Images
WebP
AVIF
Responsive Images
Blur Placeholder
Lazy Loading
________________________________________
Reviews
Verified Purchase
Photos
Ratings
Comments
Likes
Replies (future)
Helpful Button
Sort Reviews
Filter Reviews
Average Rating
Rating Distribution
Review Moderation
________________________________________
Wishlist
Add
Remove
Move to Cart
Share Wishlist (future)
Guest Wishlist
Logged-in Wishlist
________________________________________
Recently Viewed
Store
Last Viewed
History
Maximum Items
Sync for Logged-in Users
________________________________________
Inventory
Display
In Stock
Low Stock
Out of Stock
Backorder (future)
Expected Restock Date
________________________________________
Pricing
Currency
PKR Only
Support
Regular Price
Sale Price
Discount %
Bulk Pricing
Wholesale Pricing (future)
Dynamic Pricing (future)
________________________________________
Coupons
Support
Percentage
Fixed Amount
Minimum Order
Expiry Date
Usage Limit
First Order Only
Specific Categories
Specific Products
________________________________________
Product SEO
Automatically generate
SEO Title
SEO Description
Slug
Canonical URL
Open Graph
Twitter Card
JSON-LD Product Schema
Breadcrumb Schema
Sitemap Entry
Alt Tags
Robots Metadata
________________________________________
API Architecture
Create APIs for:
Products
Categories
Collections
Variants
Reviews
Wishlist
Search
Recommendations
Related Products
Recently Viewed
Inventory
Coupons
________________________________________
Server Components
Use Server Components wherever possible.
Client Components only for:
Filters
Search
Wishlist
Image Gallery
Add to Cart
Interactive Variant Selection
________________________________________
Performance
Implement
Server-side Rendering
Streaming
Image Optimization
Code Splitting
Suspense
Dynamic Imports
Caching
Pagination
Cursor-based Pagination
Infinite Scroll (optional)
________________________________________
Database Models
Extend Prisma schema with:
Product
Category
Collection
Variant
VariantImage
Review
ReviewImage
Wishlist
WishlistItem
RecentlyViewed
Inventory
Tag
ProductTag
SEO
CouponProduct
CouponCategory
________________________________________
Validation
Create Zod schemas for:
Product
Variant
Review
Search
Filters
Coupon
Wishlist
________________________________________
Security
Validate all query parameters
Prevent SQL Injection
Rate Limit Search API
Sanitize Reviews
Image Upload Validation
Permission Checks
________________________________________
UI Components
Create reusable components:
ProductCard
ProductGrid
ProductList
CategoryCard
CollectionCard
SearchBar
SearchDropdown
FilterSidebar
FilterDrawer
SortDropdown
Pagination
Breadcrumb
ImageGallery
VariantSelector
ColorSwatches
SizeSelector
PriceDisplay
StockBadge
RatingStars
ReviewCard
ReviewForm
WishlistButton
RecentlyViewed
RelatedProducts
FrequentlyBoughtTogether
ProductTabs
FAQAccordion
ShippingInfo
SizeGuideModal
________________________________________
Analytics
Track:
Product Views
Search Queries
Popular Filters
Most Viewed Products
Wishlist Adds
Cart Adds
Conversion Rate
Bounce Rate
Category Performance
________________________________________
Deliverables
Generate:
1.	Shop Architecture
2.	Product Catalog Structure
3.	Search Architecture
4.	Filter System
5.	Product Detail Page
6.	Variant System
7.	Review System
8.	Wishlist System
9.	Recently Viewed System
10.	Product SEO Architecture
11.	Database Schema Extensions
12.	API Routes
13.	Server Actions
14.	UI Component Hierarchy
15.	Folder Structure
16.	Performance Strategy
17.	Security Strategy
18.	Testing Plan
19.	Developer Documentation
The implementation must be enterprise-grade, scalable, and immediately ready for integration with the next phase.
________________________________________
✅ Next Phase
Phase 4 — 3D Product Customization Studio (Canva + Printful Style)
This will be the core feature of Zumrah Apparel and will cover:
•	React Three Fiber + Three.js 3D shirt rendering
•	Front, back, left sleeve, right sleeve views
•	Canva-style drag-and-drop editor
•	Text editing
•	Image upload
•	Layers panel
•	Transform tools (move, resize, rotate, flip)
•	Print area validation
•	Real-time texture generation
•	Design save/load
•	High-resolution print export
•	Production-ready architecture for the customization engine.


move to Phase 4


Perfect. Phase 4 is the heart of the entire Zumrah Apparel platform. This is the feature that differentiates your platform from a normal eCommerce store.
This phase should be treated like building a mini Canva + Printful Designer, not just a simple T-shirt editor.
________________________________________
Professional AI Development Prompt
Phase 4 — Enterprise 3D Product Customization Studio
Project: Zumrah Apparel
________________________________________
ROLE
You are a Senior Graphics Software Engineer, Three.js Expert, React Three Fiber Architect, WebGL Engineer, and Full-Stack SaaS Developer with over 15 years of experience building professional browser-based design applications similar to Canva, Printful, Printify, Adobe Express, and VistaCreate.
Build a production-ready 3D apparel customization studio for Zumrah Apparel.
Do not build a demo.
Do not simplify the implementation.
The editor must be modular, scalable, performant, and suitable for commercial use.
________________________________________
Objective
Create a professional browser-based customization studio where users can:
•	Design apparel in real time
•	View a live 3D model
•	Upload images
•	Add unlimited text
•	Move, resize, rotate, and layer objects
•	Switch between printable sides
•	Validate print areas
•	Save and continue later
•	Export print-ready assets
•	Preview exactly what will be printed
________________________________________
Tech Stack
Use:
•	Three.js
•	React Three Fiber
•	Drei
•	Zustand
•	TypeScript
•	Next.js 15
•	React 19
•	TailwindCSS
•	Framer Motion
•	React Hook Form
•	Zod
•	Sharp (server-side image processing)
________________________________________
Studio Layout
Design a professional desktop-first workspace.
Structure:
Left Sidebar
Center Canvas
Right Properties Panel
Top Toolbar
Bottom Status Bar
Responsive Mobile Layout
Resizable Panels
Collapsible Panels
Keyboard Friendly
________________________________________
Left Sidebar
Include:
Templates
Uploads
Text
Shapes (future)
Logos
Clipart (future)
Layers
History
Saved Assets
Brand Assets (future)
Favorites
Recently Used
Search
Each section should support lazy loading.
________________________________________
Center Workspace
Display:
Interactive 3D Shirt
Real-time Rendering
Grid Overlay
Safe Print Area
Bleed Area (optional)
Zoom
Pan
Rotate
Reset Camera
Environment Lighting
Shadow Controls
Transparent Background Preview
________________________________________
Shirt Views
Support:
Front
Back
Left Sleeve
Right Sleeve
Future Ready:
Collar
Inside Neck Label
Pocket
Full Wrap
Switching views should preserve artwork independently.
________________________________________
Camera Controls
Implement:
Orbit Controls
Zoom Limits
Pan Limits
Smooth Damping
Auto Fit
Reset View
Double Click Focus
Touch Gestures
________________________________________
Shirt Colors
Support unlimited colors.
Changing color should instantly update:
3D mesh
Lighting reflections
Material
Texture blending
________________________________________
Materials
Support:
Cotton
Polyester
Dry Fit
Heavyweight
Future materials should be configurable from Admin Dashboard.
________________________________________
Image Upload
Allow:
PNG
JPG
JPEG
WEBP
GIF (static first frame unless animation support is added later)
SVG (optional with sanitization)
Maximum Size:
5 MB
Validation:
File Type
Dimensions
Aspect Ratio
Virus Scan Hook
Corrupted File Detection
Drag & Drop
Paste from Clipboard
Browse Files
Mobile Upload
________________________________________
Uploaded Image Tools
Every image should support:
Move
Resize
Rotate
Scale
Flip Horizontal
Flip Vertical
Crop (future)
Opacity
Brightness
Contrast
Saturation
Blur (future)
Lock
Unlock
Duplicate
Delete
Rename
Snap to Guides
Center Alignment
Bring Forward
Send Backward
Layer Order
________________________________________
Text Editor
Allow unlimited text layers.
Fonts:
System Fonts
Google Fonts
Custom Fonts (Admin Upload)
Support:
Font Family
Font Size
Weight
Bold
Italic
Underline
Uppercase
Lowercase
Alignment
Letter Spacing
Line Height
Text Rotation
Curved Text (future)
Shadow
Outline
Opacity
Gradient Fill (future)
Text Background (future)
Emoji Support
Unicode Support
________________________________________
Layers Panel
Implement:
Drag & Drop Reordering
Lock Layer
Hide Layer
Rename Layer
Duplicate Layer
Delete Layer
Multi-select (future)
Grouping (future)
Nested Layers (future)
Layer Thumbnails
________________________________________
Toolbar
Include:
Undo
Redo
Copy
Paste
Duplicate
Delete
Zoom
Fit to Screen
Reset View
Grid Toggle
Snap Toggle
Guides Toggle
Preview Mode
Fullscreen
Save
Download Preview
Share Design
________________________________________
History System
Implement:
Undo Stack
Redo Stack
History Timeline
Maximum configurable history depth
Autosave checkpoints
________________________________________
Print Area Validation
Every product side must define a printable boundary.
Requirements:
Prevent artwork outside the printable area.
Highlight overflow visually.
Warn users before checkout.
Support different print areas per product variant.
Configurable by Admin Dashboard.
________________________________________
Alignment Tools
Provide:
Center Horizontally
Center Vertically
Align Left
Align Right
Align Top
Align Bottom
Distribute Evenly (future)
Snap to Center
Snap to Guides
Snap to Grid
________________________________________
Guides & Grid
Support:
Grid
Rulers (future)
Safe Area
Bleed Area
Smart Guides
Measurement Overlay
________________________________________
Design Templates
Support categories:
Business
Sports
University
Birthday
Minimal
Streetwear
Corporate
Festivals
Seasonal
Users can:
Preview
Apply
Customize
Save as New
________________________________________
Design Persistence
Users can:
Save Draft
Continue Later
Duplicate Design
Rename Design
Delete Design
Auto Save every configurable interval
Version History (future)
________________________________________
Export
Generate:
Preview PNG
High Resolution PNG
Transparent PNG
Print-ready Assets
Merged Texture
Metadata JSON
Future:
PDF
SVG
Layered Export
________________________________________
Rendering
Use:
Physically Based Rendering (PBR)
HDR Environment
Soft Shadows
Ambient Occlusion
Tone Mapping
Color Management
Texture Compression
Mipmaps
________________________________________
Texture Generation
Generate textures dynamically from:
Uploaded Images
Text Layers
Color Layers
Logos
Templates
Composite them into a single texture for each printable side.
________________________________________
Performance
Optimize for:
60 FPS target
Texture Caching
Object Pooling
Memoization
Dynamic Imports
Web Workers (where appropriate)
Lazy Loading
GPU-friendly rendering
Compressed textures
Minimal re-renders
________________________________________
Mobile Experience
Support:
Touch Drag
Pinch Zoom
Two Finger Rotate
Gesture Controls
Responsive Panels
Bottom Sheet Tools
________________________________________
Accessibility
Keyboard Shortcuts
ARIA Labels
Focus States
Reduced Motion
High Contrast Support
Screen Reader Friendly controls where practical
________________________________________
Keyboard Shortcuts
Ctrl + Z
Undo
Ctrl + Shift + Z
Redo
Ctrl + C
Copy
Ctrl + V
Paste
Delete
Remove Object
Ctrl + D
Duplicate
Ctrl + S
Save Draft
Ctrl + +
Zoom In
Ctrl + -
Zoom Out
Space
Pan
________________________________________
Database Models
Extend Prisma schema with:
Design
DesignSide
Layer
TextLayer
ImageLayer
Template
TemplateCategory
UploadedAsset
BrandAsset
SavedDesign
DesignHistory
ExportJob
________________________________________
API Architecture
Create APIs/Server Actions for:
Upload Asset
Delete Asset
Save Design
Load Design
Duplicate Design
Export Preview
Export Print Files
List Templates
Favorite Template
Autosave
Validate Print Area
________________________________________
Folder Structure
Organize into:
features/designer/
components/designer/
lib/designer/
hooks/designer/
stores/designer/
schemas/designer/
services/designer/
utils/designer/
workers/
assets/
________________________________________
State Management
Use Zustand.
Separate stores for:
Canvas
Camera
Selection
Layers
History
Uploads
Templates
Export
UI
Preferences
Autosave
________________________________________
Security
Validate uploads
Limit file sizes
Sanitize SVG
Protect APIs
Rate Limit uploads
Secure storage access
Prevent malicious file execution
________________________________________
Testing
Include:
Unit Tests
Integration Tests
Component Tests
Visual Regression Tests
End-to-End Tests
Performance Benchmarks
________________________________________
Deliverables
Generate:
1.	Complete Designer Architecture
2.	Folder Structure
3.	Component Hierarchy
4.	Three.js Scene Architecture
5.	React Three Fiber Integration
6.	Canvas State Architecture
7.	Layer Management System
8.	Image Upload Pipeline
9.	Text Editing System
10.	Print Area Validation Logic
11.	Texture Generation Pipeline
12.	Export Pipeline
13.	API Routes / Server Actions
14.	Database Schema Extensions
15.	Zustand Store Architecture
16.	Performance Optimization Strategy
17.	Security Strategy
18.	Testing Strategy
19.	Developer Documentation
The resulting customization studio must be modular, enterprise-grade, and ready to integrate directly with the shopping cart and checkout flow in the next phase.
________________________________________
✅ Next Phase
Phase 5 — Authentication, User Dashboard, Shopping Cart, Checkout, Orders, Payments & Shipping
This phase will connect the customization studio to the complete customer journey, including:
•	Better Auth / NextAuth with email, Google, Facebook, and phone OTP
•	User profile and saved designs
•	Cart with customization previews
•	Checkout flow
•	Stripe integration
•	EasyPaisa & JazzCash integration
•	Cash on Delivery
•	Karachi (₨300) / Other Pakistan cities (₨450) shipping calculation
•	Order creation, invoices, and order tracking
•	Notification system (email and optional SMS)


move to Phase 5


Excellent. At this point, the customer can browse products and design apparel. Phase 5 connects everything into a complete purchasing workflow—from authentication through payment, order creation, and post-purchase tracking.
________________________________________
Professional AI Development Prompt
Phase 5 — Authentication, User Dashboard, Cart, Checkout, Orders, Payments & Shipping
Project: Zumrah Apparel
________________________________________
ROLE
You are a Senior Full-Stack Software Engineer, Authentication Architect, FinTech Integration Specialist, and eCommerce Solutions Architect with over 15 years of experience building enterprise SaaS platforms.
Build the complete customer account and commerce workflow for Zumrah Apparel.
The implementation must be production-ready, secure, scalable, maintainable, and optimized for Pakistan.
Do not generate demo code or placeholder implementations.
________________________________________
Objective
Implement the complete authenticated customer journey:
•	Authentication
•	User Dashboard
•	Profile Management
•	Address Book
•	Saved Designs
•	Shopping Cart
•	Checkout
•	Payments
•	Shipping Calculation
•	Order Creation
•	Order Tracking
•	Invoices
•	Notifications
The entire workflow must integrate seamlessly with the 3D Customization Studio.
________________________________________
Authentication
Preferred
Better Auth
Fallback
NextAuth
________________________________________
Login Methods
Support:
Email + Password
Google OAuth
Facebook OAuth
Phone Number + OTP
Future Ready:
Apple Login
GitHub Login
Microsoft Login
Magic Link Login
________________________________________
Registration
Collect:
First Name
Last Name
Email
Phone Number
Password
Confirm Password
Accept Terms
Newsletter Opt-in (optional)
________________________________________
Authentication Features
Email Verification
Password Reset
Forgot Password
Change Password
Remember Me
Refresh Tokens
Session Management
Multi-device Sessions
Logout All Devices
Account Lockout
Brute Force Protection
Rate Limiting
Audit Logs
________________________________________
User Dashboard
Create a premium dashboard.
Sections:
Dashboard Home
Profile
Orders
Saved Designs
Wishlist
Addresses
Payment Methods (future)
Downloads
Invoices
Notifications
Security
Settings
Support
________________________________________
Dashboard Home
Display:
Welcome Message
Recent Orders
Order Status
Saved Designs
Wishlist Count
Recently Viewed
Recommended Products
Quick Actions
________________________________________
Profile Management
Allow users to update:
Profile Picture
First Name
Last Name
Email
Phone
Password
Preferred Language (future)
Theme Preference
Notification Preferences
________________________________________
Address Book
Support multiple addresses.
Fields:
Full Name
Phone Number
Address Line 1
Address Line 2
City
Province
Postal Code
Country
Default Address
Address Label
Home
Office
Other
________________________________________
Saved Designs
Users can:
View Designs
Edit Designs
Duplicate Designs
Rename Designs
Delete Designs
Move to Cart
Download Preview
Share Design (future)
________________________________________
Wishlist
Users can:
Add Products
Remove Products
Move to Cart
View Product Availability
Sync Across Devices
________________________________________
Shopping Cart
Support:
Guest Cart
Authenticated Cart
Cart Merge on Login
Persistent Cart
Unlimited Items
________________________________________
Each Cart Item Contains
Product
Variant
Color
Size
Printing Method
Quantity
Customization Preview
Front Preview
Back Preview
Sleeve Preview
Price Breakdown
Discount
Subtotal
Shipping Estimate
Grand Total
________________________________________
Cart Features
Update Quantity
Remove Item
Duplicate Item
Save for Later
Apply Coupon
Estimate Shipping
Continue Shopping
Proceed to Checkout
________________________________________
Checkout Flow
Steps:
1.	Customer Information
2.	Shipping Address
3.	Delivery Method
4.	Payment Method
5.	Order Review
6.	Place Order
7.	Confirmation
Support guest checkout with optional account creation after purchase.
________________________________________
Customer Information
Collect:
Full Name
Phone Number
Email
Special Instructions
________________________________________
Shipping Address
Fields:
Country
Pakistan (default)
Province
City
Postal Code
Address
Landmark
Delivery Notes
________________________________________
Shipping Charges
Automatically calculate:
Karachi
Shipping Fee
₨300
All Other Cities in Pakistan
Shipping Fee
₨450
Requirements:
Update instantly when city changes.
Display:
Product Total
Shipping Charges
Discount
Grand Total
________________________________________
Payment Methods
Support:
Stripe
Visa
Mastercard
Debit Cards
Support:
3D Secure
Webhook Verification
Refunds
Payment Status Sync
________________________________________
Pakistani Digital Payments
EasyPaisa
JazzCash
Architecture must support:
Sandbox
Production
Webhook Verification
Transaction Reference
Retry Handling
Failure Recovery
________________________________________
Cash on Delivery
Available across Pakistan.
Support:
COD Fee (future)
Order Confirmation
COD Eligibility Rules (future)
________________________________________
Coupon System
Support:
Percentage Discount
Fixed Discount
Minimum Order
Maximum Discount
Category-specific Coupons
Product-specific Coupons
Usage Limits
Expiry Dates
First Order Coupons
Referral Coupons
Automatic Coupons
________________________________________
Tax & Pricing
All prices displayed only in PKR (₨).
Pricing Breakdown:
Product Total
Discount
Shipping
Tax (future if required)
Grand Total
________________________________________
Order Creation
On successful checkout:
Generate unique Order ID
Reserve Inventory
Save Design Snapshot
Create Invoice
Create Timeline
Trigger Notifications
Record Payment
Generate Tracking Number (when shipped)
________________________________________
Order Status Workflow
Pending
Payment Pending
Payment Received
Confirmed
In Production
Printing
Quality Check
Packed
Shipped
Out for Delivery
Delivered
Cancelled
Refund Requested
Refunded
Failed
________________________________________
Order Details Page
Display:
Order ID
Order Date
Customer
Shipping Address
Items
Customization Preview
Payment Method
Payment Status
Shipping Charges
Discount
Grand Total
Invoice
Tracking Timeline
Download Invoice
Reorder
Contact Support
________________________________________
Invoice Generation
Generate PDF invoices.
Include:
Company Logo
Customer Details
Billing Details
Shipping Details
Order Summary
Tax Information
Payment Method
Order Timeline
Invoice Number
QR Code (future)
________________________________________
Order Tracking
Timeline:
Order Placed
Payment Confirmed
Printing Started
Quality Check
Packed
Shipped
Out for Delivery
Delivered
Display timestamps and status history.
________________________________________
Notifications
Email Notifications:
Account Created
Email Verified
Password Reset
Order Placed
Payment Received
Order Confirmed
Printing Started
Shipped
Delivered
Cancelled
Refunded
Newsletter
Future:
SMS
WhatsApp
Push Notifications
________________________________________
Email Templates
Create templates for:
Welcome
Verify Email
Reset Password
Order Confirmation
Invoice
Shipping Update
Delivery Confirmation
Refund Confirmation
________________________________________
Database Models
Extend Prisma schema with:
Address
Cart
CartItem
Order
OrderItem
Invoice
Payment
PaymentAttempt
Shipment
ShipmentEvent
CouponUsage
SavedDesign
NotificationPreference
SessionLog
OTPVerification
________________________________________
API Routes / Server Actions
Create endpoints/actions for:
Register
Login
Logout
Refresh Session
Verify Email
Forgot Password
Reset Password
Send OTP
Verify OTP
Manage Profile
Manage Addresses
Manage Wishlist
Manage Cart
Apply Coupon
Remove Coupon
Calculate Shipping
Create Checkout Session
Create Order
Capture Payment
Verify Payment
Cancel Order
Request Refund
Download Invoice
Track Order
________________________________________
Folder Structure
Organize into:
features/auth/
features/account/
features/cart/
features/checkout/
features/orders/
features/payments/
features/shipping/
features/invoices/
features/notifications/
components/account/
components/cart/
components/checkout/
components/orders/
components/payments/
services/auth/
services/payment/
services/shipping/
repositories/orders/
repositories/payments/
________________________________________
State Management
Use Zustand.
Create stores for:
Authentication
User
Cart
Checkout
Addresses
Orders
Notifications
Wishlist
Saved Designs
________________________________________
Security
Implement:
JWT or secure session tokens
HTTP-only cookies
CSRF protection
Rate limiting
Password hashing
Webhook signature verification
PCI-DSS best practices
Input validation with Zod
Secure file access
Session expiration
Audit logging
________________________________________
Performance
Implement:
Server Components
Streaming
Suspense
Optimistic UI
Caching
Image optimization
Dynamic imports
Background jobs for email/webhooks
Efficient database queries
________________________________________
Testing
Include:
Unit Tests
Integration Tests
Authentication Tests
Payment Flow Tests
Checkout Tests
Webhook Tests
Order Creation Tests
Invoice Generation Tests
End-to-End Tests
________________________________________
Deliverables
Generate:
1.	Authentication Architecture
2.	User Dashboard Architecture
3.	Cart System
4.	Checkout Workflow
5.	Payment Integration Architecture
6.	Shipping Calculation Logic
7.	Order Management Architecture
8.	Invoice Generation System
9.	Notification System
10.	Database Schema Extensions
11.	API Routes / Server Actions
12.	Folder Structure
13.	Zustand Store Architecture
14.	Security Strategy
15.	Performance Strategy
16.	Testing Strategy
17.	Developer Documentation
The implementation must be enterprise-grade, production-ready, and fully integrated with the product catalog and 3D customization studio.
________________________________________
✅ Next Phase
Phase 6 — Enterprise Admin Dashboard & Business Management Platform
This phase will build the complete back-office system, including:
•	Secure role-based admin authentication
•	Admin, Manager, and Staff permissions
•	Product management
•	Order management
•	Customer management
•	Inventory management
•	Design review and production queue
•	Coupons and promotions
•	Analytics and sales dashboards
•	Content management (homepage, blog, FAQs)
•	Settings management
•	Activity logs and audit trails
•	Reporting and business intelligence
•	Production workflow management
•	File and asset management
•	Notification management
This will complete the operational side of the Zumrah Apparel platform.


move to Phase 6


Perfect. Phase 6 transforms Zumrah Apparel from an eCommerce website into a complete business management platform. This is the system your team will use daily to manage products, orders, production, customers, inventory, content, analytics, and business operations.
________________________________________
Professional AI Development Prompt
Phase 6 — Enterprise Admin Dashboard & Business Management Platform
Project: Zumrah Apparel
________________________________________
ROLE
You are a Senior Enterprise Software Architect, Full-Stack Engineer, ERP Consultant, and UX Architect with over 15 years of experience building commercial SaaS platforms and internal business management systems.
Build a production-ready enterprise admin dashboard for Zumrah Apparel.
The dashboard must support business operations from order placement to production, shipping, customer management, reporting, and system administration.
Do not generate placeholder implementations or demo dashboards.
Everything must be modular, scalable, secure, and production-ready.
________________________________________
Objective
Create the complete back-office platform including:
•	Secure Admin Authentication
•	Role-Based Access Control (RBAC)
•	Dashboard & Analytics
•	Product Management
•	Category & Collection Management
•	Inventory Management
•	Order Management
•	Production Queue
•	Design Approval Workflow
•	Customer Management
•	Coupon & Promotion Management
•	Reviews Management
•	Notifications
•	CMS
•	Settings
•	Reports
•	Audit Logs
•	Asset Management
________________________________________
User Roles
Implement RBAC.
Default Roles
Super Admin
Admin
Manager
Staff
Customer Support
Production Operator
Warehouse Staff
Marketing Manager
Future Ready:
Finance
Content Editor
Designer
Vendor
Each role should have granular permissions.
________________________________________
Permission System
Support:
View
Create
Edit
Delete
Approve
Publish
Export
Import
Assign
Refund
Manage Settings
Permissions should be configurable from the Admin Dashboard.
________________________________________
Admin Authentication
Support:
Secure Login
2FA (future-ready)
Session Expiration
Device Tracking
IP Logging
Login History
Password Reset
Account Lockout
Audit Logs
________________________________________
Dashboard Home
Display real-time business metrics.
Widgets:
Today's Orders
Pending Orders
Printing Queue
Orders in Production
Shipped Orders
Revenue Today
Revenue This Month
Revenue This Year
Average Order Value
Conversion Rate
Customers
Returning Customers
Popular Products
Inventory Alerts
Coupon Usage
Recent Reviews
Support Tickets (future)
Recent Activity
________________________________________
Analytics
Interactive charts.
Include:
Sales by Day
Sales by Month
Revenue
Top Products
Top Categories
Top Customers
Payment Method Distribution
City-wise Orders
Conversion Funnel
Customer Retention
Average Processing Time
Shipping Performance
Order Status Breakdown
Inventory Trends
Coupon Performance
Review Trends
Export to:
CSV
Excel
PDF
________________________________________
Product Management
Admin can:
Create Products
Edit Products
Archive Products
Delete Products
Duplicate Products
Bulk Import
Bulk Export
Manage Variants
Manage Images
Manage Videos (future)
Manage Sizes
Manage Colors
Manage Materials
Manage Printing Methods
Manage SEO
Manage Pricing
Manage Inventory
Assign Collections
Assign Categories
Manage Tags
Hide Products
Schedule Product Publishing
Everything must be editable without touching code.
________________________________________
Category Management
Manage:
Categories
Subcategories
Collections
Sorting
Featured Categories
SEO
Visibility
Future categories must be supported without schema changes.
________________________________________
Inventory Management
Track:
SKU
Variant Stock
Reserved Stock
Available Stock
Low Stock Alerts
Out of Stock
Inventory History
Stock Adjustments
Warehouse Location (future)
Barcode (future)
________________________________________
Order Management
Display:
Order ID
Customer
Phone
Email
Address
Payment Method
Payment Status
Shipping Status
Production Status
Assigned Staff
Timeline
Customization Preview
Download Print Assets
Invoice
Notes
Tags
________________________________________
Order Actions
Admin can:
Approve Order
Reject Order
Assign Production
Update Status
Print Invoice
Download Design Files
Refund
Cancel
Duplicate Order
Merge Orders (future)
Split Orders (future)
________________________________________
Production Queue
Dedicated production module.
Stages:
Waiting for Approval
Approved
Ready for Printing
Printing
Quality Check
Packing
Ready to Ship
Completed
Assign operators.
Track production time.
Production notes.
Priority orders.
________________________________________
Design Review
View:
Front Design
Back Design
Sleeve Designs
Uploaded Assets
Print Boundaries
Warnings
Admin can:
Approve
Reject
Request Changes
Leave Notes
Download High-Resolution Assets
________________________________________
Customer Management
View:
Profile
Orders
Lifetime Value
Wishlist
Saved Designs
Reviews
Addresses
Activity
Support History
Admin Actions:
Block
Unblock
Reset Password
Resend Verification
Grant Coupons
View Login History
________________________________________
Reviews Management
Approve
Reject
Edit
Delete
Feature Reviews
Reply to Reviews
Report Abuse
________________________________________
Coupons & Promotions
Manage:
Percentage Coupons
Fixed Coupons
Referral Coupons
Bulk Coupons
Scheduled Campaigns
Usage Limits
Expiration
Category Restrictions
Product Restrictions
Customer Restrictions
________________________________________
Notifications
Create notification center.
Support:
Email
SMS (future)
Push (future)
WhatsApp (future)
Templates:
Order
Payment
Shipping
Marketing
System
________________________________________
CMS
Manage:
Homepage
Hero Section
Banners
Featured Products
Testimonials
FAQ
About
Contact
Blog
Footer
Announcements
SEO Content
No code changes required.
________________________________________
Blog Management
Create
Edit
Delete
Categories
Tags
Authors
Drafts
Scheduling
SEO
Featured Images
________________________________________
Media Library
Store:
Product Images
Design Templates
Logos
Banners
Icons
Documents
Videos (future)
Support:
Folders
Search
Tags
Bulk Upload
Compression
________________________________________
Settings
Manage:
General Settings
Business Information
Payment Settings
Shipping Rules
Email Configuration
Tax Rules
Brand Colors
Fonts
Theme
Feature Flags
Security Settings
API Keys
Maintenance Mode
________________________________________
Shipping Management
Manage:
Shipping Rates
Courier Partners
Cities
Delivery Zones
Tracking Providers
Future:
Multiple shipping rules
Weight-based pricing
________________________________________
Payment Management
View:
Transactions
Refunds
Failed Payments
Webhook Logs
Settlement Reports
Support:
Stripe
EasyPaisa
JazzCash
COD
________________________________________
Audit Logs
Track:
User
Action
IP
Browser
Timestamp
Affected Resource
Old Value
New Value
Export logs.
________________________________________
Activity Timeline
Display:
Product Updates
Orders
Payments
Users
Inventory
System Changes
________________________________________
Reports
Generate:
Sales Report
Inventory Report
Customer Report
Order Report
Tax Report (future)
Production Report
Refund Report
Coupon Report
Review Report
Export:
CSV
Excel
PDF
________________________________________
Database Models
Extend Prisma schema with:
AdminUser
Role
Permission
RolePermission
AdminSession
AuditLog
SystemSetting
MediaAsset
Banner
BlogPost
BlogCategory
FAQ
Announcement
InventoryLog
ProductionJob
ProductionStage
OrderAssignment
SupportTicket (future)
FeatureFlag
________________________________________
API Routes / Server Actions
Create endpoints/actions for:
Admin Login
Manage Roles
Manage Permissions
Manage Products
Manage Categories
Manage Inventory
Manage Orders
Manage Production
Approve Designs
Manage Customers
Manage Reviews
Manage Coupons
Manage CMS
Manage Blog
Upload Media
Generate Reports
Manage Settings
View Audit Logs
________________________________________
Folder Structure
Organize into:
features/admin/
features/products/
features/orders/
features/inventory/
features/production/
features/customers/
features/reviews/
features/coupons/
features/reports/
features/cms/
features/blog/
features/settings/
components/admin/
components/charts/
components/tables/
components/forms/
repositories/admin/
services/admin/
________________________________________
State Management
Use Zustand.
Stores:
AdminAuth
Dashboard
Products
Orders
Inventory
Production
Customers
Reviews
Coupons
Reports
CMS
Notifications
Settings
________________________________________
UI Components
Reusable components:
AdminLayout
Sidebar
Topbar
DataTable
AdvancedFilters
ChartCard
MetricCard
StatusBadge
Timeline
KanbanBoard
MediaPicker
RichTextEditor
BulkActionToolbar
PermissionMatrix
Modal
Drawer
Toast
ConfirmDialog
ExportDialog
FileUploader
________________________________________
Security
Implement:
RBAC
Permission Guards
Rate Limiting
CSRF Protection
XSS Protection
SQL Injection Protection
Secure File Uploads
HTTP-only Cookies
Session Rotation
Audit Logging
Encryption for Sensitive Configuration
________________________________________
Performance
Optimize:
Server Components
Streaming
Pagination
Virtualized Tables
Caching
Background Jobs
Image Optimization
Lazy Loading
Code Splitting
________________________________________
Testing
Include:
Unit Tests
Integration Tests
Permission Tests
API Tests
Dashboard Tests
Inventory Tests
Production Workflow Tests
End-to-End Tests
Load Testing Strategy
________________________________________
Deliverables
Generate:
1.	Admin Dashboard Architecture
2.	RBAC & Permission System
3.	Analytics Dashboard
4.	Product Management Module
5.	Inventory Module
6.	Order & Production Management
7.	Customer Management
8.	CMS Architecture
9.	Reports & Analytics
10.	Database Schema Extensions
11.	API Routes / Server Actions
12.	Folder Structure
13.	Zustand Store Architecture
14.	Security Strategy
15.	Performance Strategy
16.	Testing Strategy
17.	Deployment Considerations
18.	Developer Documentation
The admin platform must be enterprise-grade, modular, and ready to support daily operations for Zumrah Apparel as the business scales.
________________________________________
✅ Next Phase
Phase 7 — Production Optimization, DevOps, CI/CD, Monitoring, Security Hardening & Deployment
This final phase will prepare the platform for a real production environment by covering:
•	Docker & containerization
•	CI/CD with GitHub Actions
•	Vercel deployment
•	Supabase production configuration
•	CDN & caching strategy
•	Security hardening (CSP, HSTS, secret management)
•	Monitoring (Sentry, OpenTelemetry, logging)
•	Background jobs & queues
•	Backup & disaster recovery
•	Automated testing pipeline
•	Performance optimization (Core Web Vitals)
•	SEO verification
•	Accessibility audits
•	Production documentation
•	Release management
•	Operational runbooks
The result will be a commercial-grade platform ready for launch and long-term maintenance.


move to Phase 7


Excellent. Phase 7 is the final engineering phase. By this point, all business features are complete. This phase focuses on making the platform production-ready, ensuring it is secure, observable, scalable, maintainable, and deployable with enterprise-grade DevOps practices.
________________________________________
Professional AI Development Prompt
Phase 7 — Production Optimization, DevOps, CI/CD, Security Hardening & Deployment
Project: Zumrah Apparel
________________________________________
ROLE
You are a Principal Software Architect, DevOps Engineer, Site Reliability Engineer (SRE), Cloud Security Engineer, and Platform Engineer with over 15 years of experience deploying enterprise SaaS applications at global scale.
Prepare Zumrah Apparel for a real production launch.
Do not generate demo configurations or placeholder implementations.
Everything must follow enterprise best practices and be production-ready.
________________________________________
Objective
Prepare the complete platform for production by implementing:
•	DevOps Architecture
•	CI/CD Pipeline
•	Infrastructure
•	Security Hardening
•	Monitoring
•	Logging
•	Error Tracking
•	Performance Optimization
•	Scalability
•	Disaster Recovery
•	Automated Testing
•	Deployment
•	Operational Documentation
________________________________________
Infrastructure
Deploy using:
Frontend
•	Vercel
Database
•	PostgreSQL (Supabase)
Object Storage
•	Supabase Storage
DNS
•	Cloudflare
Future Ready
•	Kubernetes
•	AWS
•	Azure
•	Google Cloud
________________________________________
Environment Strategy
Support:
Development
Testing
Staging
Production
Use separate:
Environment Variables
Databases
Storage Buckets
Secrets
API Keys
Webhook Endpoints
________________________________________
Secrets Management
Manage securely:
Database Credentials
JWT Secrets
Better Auth Secrets
Stripe Keys
EasyPaisa Credentials
JazzCash Credentials
SMTP Credentials
Supabase Keys
Google OAuth
Facebook OAuth
Analytics Keys
Never expose secrets to the client.
________________________________________
Docker
Create:
Production Dockerfile
Development Dockerfile
.dockerignore
Multi-stage builds
Minimal image size
Health checks
________________________________________
CI/CD
Implement GitHub Actions.
Pipeline:
Install Dependencies
Type Checking
Lint
Formatting
Unit Tests
Integration Tests
Build
Security Scan
Dependency Audit
Bundle Analysis
Deploy Preview
Production Deployment
Rollback Support
________________________________________
Git Strategy
Branches:
main
develop
staging
feature/*
bugfix/*
hotfix/*
release/*
Protect main and staging branches.
Require pull request reviews and passing checks.
________________________________________
Code Quality
Enforce:
TypeScript Strict Mode
ESLint
Prettier
Commitlint
Husky
lint-staged
No unused imports
No console logs in production
Consistent naming conventions
________________________________________
Testing
Implement:
Unit Tests (Vitest)
Component Tests
Integration Tests
API Tests
End-to-End Tests (Playwright)
Accessibility Tests
Performance Tests
Visual Regression Tests
Smoke Tests
Regression Tests
Coverage Reports
________________________________________
Performance Optimization
Optimize:
Server Components
Streaming
Image Optimization
Next/Image
Code Splitting
Dynamic Imports
Tree Shaking
Caching
Suspense
Lazy Loading
Memoization
Database Query Optimization
Connection Pooling
Edge Runtime where appropriate
________________________________________
Core Web Vitals
Target:
LCP < 2.5s
CLS < 0.1
INP < 200ms
TTFB < 800ms
________________________________________
Caching Strategy
Implement:
Browser Cache
CDN Cache
Route Cache
API Cache
Database Query Cache
Image Cache
Static Asset Cache
Revalidation Strategy
________________________________________
Database Optimization
Implement:
Indexes
Composite Indexes
Query Optimization
Pagination
Cursor-based Pagination
Transactions
Connection Pooling
Read Replicas (future)
Migration Strategy
Seed Strategy
Backup Strategy
________________________________________
Background Jobs
Implement queue architecture for:
Email Delivery
Invoice Generation
Image Processing
Export Generation
Notifications
Webhook Retries
Analytics Aggregation
Future integrations
Use a queue system that works well with your chosen deployment strategy and document how retries, idempotency, and dead-letter handling are implemented.
________________________________________
Logging
Centralized logging.
Log:
API Requests
Errors
Authentication
Payments
Uploads
Orders
Admin Actions
Performance
Webhook Events
Include:
Correlation IDs
Request IDs
Structured Logs
________________________________________
Monitoring
Integrate:
Sentry
OpenTelemetry
Health Checks
Application Metrics
API Metrics
Database Metrics
Memory Usage
CPU Usage
Slow Queries
Background Jobs
________________________________________
Alerts
Configure alerts for:
High Error Rate
Payment Failures
Database Issues
API Downtime
Storage Limits
High Latency
Deployment Failures
Queue Failures
________________________________________
Security Hardening
Implement:
Strict CSP
HSTS
XSS Protection
CSRF Protection
Rate Limiting
Input Sanitization
SQL Injection Prevention
Secure Cookies
HTTP-only Cookies
SameSite Cookies
Content Security Policy
Secure File Upload Validation
SVG Sanitization
MIME Validation
Request Validation
JWT Security
Session Rotation
Password Hashing
Webhook Signature Verification
Secrets Rotation Strategy
________________________________________
Compliance
Follow best practices for:
OWASP Top 10
PCI-DSS (payment integrations)
GDPR-ready architecture (future)
Cookie Consent
Privacy Policy support
Terms & Conditions support
________________________________________
SEO Optimization
Generate:
robots.txt
XML Sitemap
Dynamic Sitemap
Metadata
Canonical URLs
Open Graph
Twitter Cards
JSON-LD Structured Data
Breadcrumb Schema
Organization Schema
Product Schema
FAQ Schema
Review Schema
________________________________________
Accessibility
Meet WCAG 2.2 AA standards.
Implement:
Keyboard Navigation
Focus Management
ARIA Labels
Semantic HTML
Reduced Motion
Color Contrast
Screen Reader Support
________________________________________
Asset Optimization
Optimize:
Images
Fonts
JavaScript
CSS
SVG
3D Assets
Textures
Compression
________________________________________
Email Infrastructure
Configure:
SMTP
Transactional Email Provider
Retry Logic
Template Versioning
Bounce Handling
Delivery Monitoring
________________________________________
Analytics
Integrate:
Google Analytics 4
Facebook Pixel
Custom Event Tracking
Server-side Events where applicable
Track:
Page Views
Product Views
Searches
Cart Adds
Checkout Starts
Purchases
Coupon Usage
Design Saves
________________________________________
Backup Strategy
Implement:
Database Backups
Storage Backups
Configuration Backups
Disaster Recovery Documentation
Restore Procedures
Backup Verification
________________________________________
Deployment
Production Checklist:
Environment Variables
Database Migration
Seed Data (optional)
Storage Configuration
Domain Setup
SSL
Webhook Configuration
Health Checks
Monitoring
Smoke Tests
Rollback Plan
________________________________________
Documentation
Generate:
README.md
Installation Guide
Architecture Guide
Folder Structure Guide
Deployment Guide
Environment Variables Guide
API Documentation
Database Documentation
Security Guide
Testing Guide
Contributing Guide
Release Guide
Runbooks
Incident Response Guide
Troubleshooting Guide
________________________________________
Release Management
Support:
Semantic Versioning
Release Notes
Feature Flags
Blue/Green Deployment (future-ready)
Canary Release Strategy (future-ready)
Rollback Procedure
________________________________________
Folder Structure
Organize:
.github/
workflows/
docker/
scripts/
monitoring/
docs/
tests/
config/
________________________________________
API Hardening
Implement:
Request Validation
Response Validation
Rate Limits
API Versioning
Idempotency Keys (for payment/order creation)
Pagination Standards
Error Standards (RFC 7807 style)
________________________________________
Production Readiness Checklist
Verify:
Authentication
Payments
Shipping
Orders
Admin Dashboard
3D Designer
Email Delivery
Uploads
SEO
Accessibility
Performance
Security
Monitoring
Logging
Backups
Disaster Recovery
________________________________________
Deliverables
Generate:
1.	Production Infrastructure Architecture
2.	DevOps Architecture
3.	Docker Configuration
4.	CI/CD Pipeline
5.	GitHub Actions Workflows
6.	Environment Strategy
7.	Security Hardening Guide
8.	Monitoring & Logging Architecture
9.	Performance Optimization Plan
10.	Database Optimization Strategy
11.	Backup & Disaster Recovery Plan
12.	SEO & Accessibility Checklist
13.	Testing Pipeline
14.	Deployment Guide
15.	Operational Runbooks
16.	Release Management Strategy
17.	Production Readiness Checklist
18.	Complete Technical Documentation
The entire solution must be production-ready, scalable, secure, observable, and maintainable, following modern enterprise engineering standards.
________________________________________
✅ Final Project Outcome
After completing all seven phases, the Zumrah Apparel platform should include:
•	Modern Full-Stack Architecture with Next.js 15, React 19, TypeScript, Tailwind CSS, Prisma, PostgreSQL (Supabase), and Better Auth.
•	Premium Marketing Website with a reusable design system and responsive UI.
•	Enterprise Product Catalog with advanced search, filtering, SEO, reviews, wishlists, and variants.
•	Professional 3D Customization Studio featuring React Three Fiber, Three.js, layered editing, print-area validation, autosave, and export pipelines.
•	Complete Commerce Workflow including authentication, user accounts, cart, checkout, payments (Stripe, EasyPaisa, JazzCash, COD), shipping, invoices, and order tracking.
•	Enterprise Admin Dashboard with RBAC, analytics, product/order/customer management, production workflow, CMS, inventory, reports, and audit logs.
•	Production-Ready Operations including CI/CD, monitoring, logging, testing, security hardening, backups, documentation, and deployment.
This completes a comprehensive specification for a commercial-grade custom apparel platform that can be developed incrementally while maintaining a clean, scalable architecture.

