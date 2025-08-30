"use client";

import { EMAIL, MOBILE_NUMBER } from "@/constants";
import { Shield, BookOpen, Scale, Mail, Phone, MapPin } from "lucide-react";

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-background pt-10">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl leading-tight text-foreground mb-6">
            Terms and Conditions
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Aligned with Islamic principles of fairness (عدل), transparency
            (الشفافية), and mutual respect (التعامل الحسن), these terms govern
            your use of Artificial Mufti services.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Service Terms */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-3xl">Service Terms</h2>
            </div>

            <div className="space-y-4 text-base leading-relaxed">
              <p>
                Artificial Mufti provides AI-powered Islamic guidance services
                designed to assist users in understanding religious principles
                and practices. These services are intended as supplementary
                tools and{" "}
                <strong>do not replace qualified Islamic scholars</strong>.
              </p>

              <p>
                All responses are generated through trained AI models based on
                established Islamic sources, scholarly interpretations, and
                traditional jurisprudence. However, answers are{" "}
                <em>advisory in nature</em> and should be reviewed with
                qualified scholars for final determination.
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>Services are available 24/7 through our platform</li>
                <li>
                  Response time may vary based on query complexity and system
                  load
                </li>
                <li>
                  Accuracy is maintained through regular scholar review and
                  model updates
                </li>
                <li>
                  Personal fatwa requests will be directed to qualified scholars
                </li>
              </ul>
            </div>
          </div>

          {/* User Obligations */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-secondary" />
              </div>
              <h2 className="text-3xl">User Obligations</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-secondary">
                  Accurate User Information
                </h3>
                <p className="text-base text-foreground/80">
                  Users must provide truthful and complete information when
                  creating accounts or submitting queries. Misrepresentation or
                  deceptive practices are strictly prohibited.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-secondary">
                  Respectful Conduct
                </h3>
                <p className="text-base text-foreground/80">
                  All interactions must maintain the dignity of Islamic
                  scholarship. Disrespectful language, personal attacks, or
                  attempts to circumvent the religious nature of the service
                  will result in immediate access suspension.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-secondary">
                  Confidentiality
                </h3>
                <p className="text-base text-foreground/80">
                  User queries are treated with the utmost confidentiality under
                  Islamic principles of
                  <em> al-satr</em> (concealment). However, users acknowledge
                  that queries may be reviewed by scholars for accuracy
                  enhancement.
                </p>
              </div>
            </div>
          </div>

          {/* Islamic Guidance Disclaimer */}
          <div className="bg-muted/50 rounded-lg border border-border p-8">
            <h2 className="text-3xl mb-4 text-destructive">
              Islamic Guidance Disclaimer
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p className="font-medium">
                <strong>
                  Important: AI responses do not constitute formal religious
                  rulings (fatwa).
                </strong>
              </p>

              <p>
                Artificial Mufti's responses are generated through AI analysis
                of Islamic sources and scholarly works. While every effort is
                made to ensure accuracy and adherence to Islamic principles,
                these responses:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>Should not be treated as definitive Islamic rulings</li>
                <li>
                  Must be verified with qualified Islamic scholars before
                  implementation
                </li>
                <li>
                  May not account for specific circumstances not disclosed in
                  the query
                </li>
                <li>
                  Do not replace personal consultation with Islamic scholars
                </li>
              </ul>

              <p className="mt-4">
                Users acknowledge that traditional consultation with qualified
                scholars remains superior to AI-generated guidance, particularly
                for complex personal circumstances.
              </p>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="space-y-4">
            <h2 className="text-3xl">Intellectual Property Rights</h2>

            <div className="space-y-4 text-base leading-relaxed">
              <p>
                All Quranic verses, hadith narrations, and classical texts are
                in the public domain. However, AI-generated responses and
                translations are the intellectual property of Artificial Mufti
                under Islamic principles of <em>amal salih</em> (beneficial
                work).
              </p>

              <div>
                <h3 className="text-xl font-semibold mb-3">User Rights</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Personal, non-commercial use of all responses</li>
                  <li>
                    Attribution required when sharing AI-generated guidance
                  </li>
                  <li>
                    Modification or commercial reuse requires explicit
                    permission
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Islamic Content Licensing
                </h3>
                <p>
                  Content referencing established Islamic sources is provided
                  under fair use principles consistent with Islamic education
                  goals. Users are encouraged to verify primary sources and seek
                  multiple scholarly opinions.
                </p>
              </div>
            </div>
          </div>

          {/* Liability Limitation */}
          <div className="space-y-4">
            <h2 className="text-3xl">Limitation of Liability</h2>

            <div className="space-y-4 text-base leading-relaxed">
              <p>
                In accordance with Islamic principles of <em>takaruf</em>{" "}
                (reasonable expectation), Artificial Mufti's liability is
                limited as follows:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>
                  No liability for acts taken based on AI-generated guidance
                  without scholarly verification
                </li>
                <li>
                  No liability for indirect, incidental, or consequential
                  damages
                </li>
                <li>
                  Liability capped at amount paid for services in the preceding
                  12 months
                </li>
                <li>
                  No liability for service interruptions, system failures, or
                  delays
                </li>
              </ul>
            </div>
          </div>

          {/* Account Management */}
          <div className="space-y-4">
            <h2 className="text-3xl">Account Management</h2>

            <div className="space-y-4 text-base leading-relaxed">
              <p>
                User accounts are created and managed under Islamic principles
                of <em>amanah</em> (trust). We are committed to protecting your
                privacy while providing access to religious guidance.
              </p>

              <div>
                <h3 className="text-xl font-semibold mb-3">Account Security</h3>
                <p>
                  Users are responsible for maintaining the confidentiality of
                  their account credentials. Any unauthorized use of your
                  account must be reported immediately at
                  support@artificialmufti.com.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Data Retention</h3>
                <p>
                  Queries are stored for service improvement and scholarly
                  review. Personal information is retained only as necessary to
                  provide services and comply with applicable laws.
                </p>
              </div>
            </div>
          </div>

          {/* Payment Terms */}
          <div className="space-y-4">
            <h2 className="text-3xl">Payment and Refund Policies</h2>

            <div className="space-y-4 text-base leading-relaxed">
              <p>
                All transactions are processed under Islamic finance principles
                - no interest (riba), transparent pricing, and fair value
                exchange.
              </p>

              <div>
                <h3 className="text-xl font-semibold mb-3">Payment Methods</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Sharia-compliant payment processing through verified Islamic
                    finance partners
                  </li>
                  <li>No hidden fees or charges beyond published rates</li>
                  <li>Instant access upon payment confirmation</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Refund Policy</h3>
                <p>
                  Refunds are provided within 72 hours of purchase if services
                  have not been extensively used. Partial refunds may be
                  available for unused portions of prepaid plans. Refund
                  requests are evaluated based on Islamic principles of fairness
                  and honest transaction.
                </p>
              </div>
            </div>
          </div>

          {/* Service Modifications */}
          <div className="space-y-4">
            <h2 className="text-3xl">Service Modification and Termination</h2>

            <div className="space-y-4 text-base leading-relaxed">
              <p>
                Artificial Mufti reserves the right to modify or terminate
                services while minimizing disruption to users. Major changes
                will be announced through email and platform notifications
                consistent with Islamic business ethics ("haya").
              </p>

              <p>
                Termination of user access will follow Islamic dispute
                resolution principles:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>Prior notice when possible</li>
                <li>Opportunity for users to download their data</li>
                <li>Fair handling of outstanding balances</li>
                <li>Consideration for religious obligations</li>
              </ul>
            </div>
          </div>

          {/* Governing Law */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Scale className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-3xl">Governing Law</h2>
            </div>

            <div className="space-y-4 text-base leading-relaxed">
              <p>These terms are governed by a combination of:</p>

              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Islamic jurisprudential principles (fiqh) as applicable to
                  digital services
                </li>
                <li>
                  International commercial law principles compatible with Sharia
                </li>
                <li>
                  User jurisdiction laws where not conflicting with Islamic
                  principles
                </li>
              </ul>

              <p>
                Any disputes will first attempt resolution through Islamic
                reconciliation methods, specifically <em>sulh</em> (amicable
                settlement) and <em>tahkim</em> (arbitration) by qualified
                Islamic scholars with digital commerce expertise.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="border-t border-border pt-12 space-y-6">
            <h2 className="text-3xl mb-6">Contact and Dispute Resolution</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Direct Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-secondary mt-0.5" />
                    <div>
                      <p className="font-medium">Email Support</p>
                      <a
                        href="mailto:support@artificialmufti.com"
                        className="text-primary hover:text-primary/80"
                      >
                        {EMAIL}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-secondary mt-0.5" />
                    <div>
                      <p className="font-medium">Islamic Consultation</p>
                      <a
                        href="tel:+1-555-MUFTI-01"
                        className="text-primary hover:text-primary/80"
                      >
                        +{MOBILE_NUMBER}
                      </a>
                    </div>
                  </div>

                  {/* <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-secondary mt-0.5" />
                    <div>
                      <p className="font-medium">Office Hours</p>
                      <p className="text-sm text-muted-foreground">
                        Monday-Friday, 9 AM - 5 PM (EST)
                      </p>
                    </div>
                  </div> */}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Formal Dispute Resolution
                </h3>
                <p className="text-base text-muted-foreground mb-4">
                  For formal disputes, please follow Islamic reconciliation
                  procedures:
                </p>
                <ol className="space-y-2 text-sm">
                  <li>
                    1. Written complaint to{" "}
                    <a
                      href="mailto:support@artificialmufti.com"
                      className="text-primary hover:text-primary/80"
                    >
                      {EMAIL}
                    </a>
                  </li>
                  <li>2. 30-day informal mediation period</li>
                  <li>3. Scholar-based arbitration if unresolved</li>
                  <li>4. Final determination by Islamic finance arbiter</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border text-sm text-muted-foreground text-center">
            <p>
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
