import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Zumrah Apparel",
  description: "How Zumrah Apparel collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy-policy" },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-white text-lg font-bold mb-3 font-sans">{title}</h2>
      <div className="text-gray-400 text-sm leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-white text-3xl font-bold font-sans mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: July 29, 2026</p>

        <Section title="1. Introduction">
          <p>
            Zumrah Apparel (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) provides custom DTF and sublimation printed
            apparel to customers in Pakistan through this website. This Privacy Policy explains what
            information we collect when you use our website, how we use it, and the choices you have.
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <p>We collect the following information:</p>
          <ul className="list-disc list-inside space-y-1.5">
            <li><strong className="text-gray-300">Account information:</strong> name, email address, and phone number when you register, log in, or place an order.</li>
            <li><strong className="text-gray-300">Sign-in via Google or Facebook:</strong> if you choose to log in with Google or Facebook, we receive your name, email address, and profile picture from that provider to create or access your account. We do not receive your password for these services.</li>
            <li><strong className="text-gray-300">Order and shipping information:</strong> delivery address, city, and order details necessary to fulfil and deliver your order.</li>
            <li><strong className="text-gray-300">Payment details:</strong> your selected payment method (Cash on Delivery, EasyPaisa, or JazzCash) and, where applicable, a transaction reference you provide for manual payment verification. We do not collect or store card numbers, EasyPaisa/JazzCash PINs, or other sensitive payment credentials.</li>
            <li><strong className="text-gray-300">Custom designs:</strong> images and design files you upload when using our Design Studio to personalize a product.</li>
            <li><strong className="text-gray-300">Usage data:</strong> basic technical information such as browser type and pages visited, collected automatically to keep the site secure and working correctly.</li>
          </ul>
        </Section>

        <Section title="3. How We Use Your Information">
          <ul className="list-disc list-inside space-y-1.5">
            <li>To process, print, and deliver your orders.</li>
            <li>To create and manage your account and order history.</li>
            <li>To communicate with you about your orders, account, or customer support requests.</li>
            <li>To verify manual EasyPaisa/JazzCash payments against the reference you provide.</li>
            <li>To improve our products, website, and customer experience.</li>
          </ul>
        </Section>

        <Section title="4. Cookies">
          <p>
            We use cookies to keep you signed in, remember items in your shopping cart, and keep the
            site secure. You can disable cookies in your browser settings, though some parts of the
            site (such as checkout) may not work correctly without them.
          </p>
        </Section>

        <Section title="5. How We Share Information">
          <p>We do not sell your personal information. We share it only with:</p>
          <ul className="list-disc list-inside space-y-1.5">
            <li><strong className="text-gray-300">Sign-in providers</strong> (Google, Facebook) — solely to authenticate your login, as described above.</li>
            <li><strong className="text-gray-300">Service providers</strong> who help us operate the website and deliver orders (e.g., hosting and database providers, courier services), under obligations to protect your data.</li>
            <li><strong className="text-gray-300">Legal authorities</strong>, only where required by law.</li>
          </ul>
        </Section>

        <Section title="6. Data Retention">
          <p>
            We retain account and order information for as long as your account is active or as
            needed to provide our services, comply with our legal obligations, and resolve disputes.
            You may request deletion of your account at any time by contacting us below.
          </p>
        </Section>

        <Section title="7. Your Rights">
          <p>
            You can access, update, or request deletion of your personal information by logging into
            your account or contacting us directly. If you signed up using Google or Facebook, you can
            also revoke Zumrah Apparel&apos;s access from your Google or Facebook account settings at
            any time.
          </p>
        </Section>

        <Section title="8. Children's Privacy">
          <p>
            Our services are not directed to children under 13, and we do not knowingly collect
            personal information from children under 13.
          </p>
        </Section>

        <Section title="9. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page
            with an updated &quot;Last updated&quot; date.
          </p>
        </Section>

        <Section title="10. Contact Us">
          <p>
            If you have questions about this Privacy Policy or your personal information, contact us at{" "}
            <a href="mailto:support@zumrahapparel.pk" className="text-[#D4AF37] hover:underline">
              support@zumrahapparel.pk
            </a>{" "}
            or +92-300-ZUMRAH (986724).
          </p>
        </Section>
      </div>
    </div>
  );
}
