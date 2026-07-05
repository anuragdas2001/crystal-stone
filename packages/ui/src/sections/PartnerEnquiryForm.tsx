"use client";

import React, { useState, useEffect, type FormEvent, type ChangeEvent } from "react";

export type AudienceType = "individual" | "developer" | "investor";

export interface PartnerEnquiryFormProps {
  defaultAudience?: AudienceType;
  selectedAudience?: AudienceType;
  onAudienceChange?: (audience: AudienceType) => void;
}

const PURPOSE_OPTIONS: Record<AudienceType, string[]> = {
  individual: [
    "Sell My Property",
    "Property Management",
    "Legal Assistance",
    "General Enquiry",
  ],
  developer: [
    "Channel Partner Services",
    "Marketing Partnership",
    "Project Listing",
    "Joint Venture Discussion",
  ],
  investor: [
    "Strategic Investment Opportunities",
    "Off-Market Deals",
    "Joint Ventures",
    "Private Consultation",
  ],
};

export default function PartnerEnquiryForm({
  defaultAudience = "individual",
  selectedAudience: controlledAudience,
  onAudienceChange,
}: PartnerEnquiryFormProps) {
  const [internalAudience, setInternalAudience] = useState<AudienceType>(defaultAudience);
  const audience = controlledAudience !== undefined ? controlledAudience : internalAudience;

  const [purpose, setPurpose] = useState<string>(PURPOSE_OPTIONS[defaultAudience][0] || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);

  // Common fields
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [contactMethod, setContactMethod] = useState("Phone Call");
  const [message, setMessage] = useState("");

  // Conditional fields - Landowner
  const [propLocation, setPropLocation] = useState("");
  const [propType, setPropType] = useState("Residential Land");
  const [propSize, setPropSize] = useState("");
  const [expectedPrice, setExpectedPrice] = useState("");

  // Conditional fields - Developer
  const [devCompany, setDevCompany] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectLocation, setProjectLocation] = useState("");
  const [totalUnits, setTotalUnits] = useState("");
  const [website, setWebsite] = useState("");

  // Conditional fields - Investor
  const [budget, setBudget] = useState("₹1 Cr - ₹5 Cr");
  const [prefLocation, setPrefLocation] = useState("North Bangalore Growth Corridor");
  const [propPreference, setPropPreference] = useState("Plotted Land Development");
  const [investGoal, setInvestGoal] = useState("Capital Appreciation");

  // Update purpose when audience changes
  useEffect(() => {
    const options = PURPOSE_OPTIONS[audience];
    if (options && options.length > 0) {
      setPurpose(options[0]!);
    }
  }, [audience]);

  const handleAudienceToggle = (type: AudienceType) => {
    if (controlledAudience === undefined) {
      setInternalAudience(type);
    }
    if (onAudienceChange) {
      onAudienceChange(type);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const names = Array.from(e.target.files).map((f) => f.name);
      setUploadedFiles((prev) => [...prev, ...names]);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consent) return;

    setIsSubmitting(true);

    const payload: Record<string, unknown> = {
      type: audience,
      purpose,
      contact: {
        name,
        company: company || (audience === "developer" ? devCompany : undefined),
        email,
        mobile,
        city,
        preferredMethod: contactMethod,
      },
      message,
      timestamp: new Date().toISOString(),
      crm_lead_source: "Partner With Us Page",
    };

    if (audience === "individual") {
      payload["landowner_details"] = {
        propertyLocation: propLocation,
        propertyType: propType,
        size: propSize,
        expectedPrice,
        uploadedDocuments: uploadedFiles,
      };
    } else if (audience === "developer") {
      payload["developer_details"] = {
        companyName: devCompany || company,
        projectName,
        projectLocation,
        totalUnits,
        websiteUrl: website,
      };
    } else if (audience === "investor") {
      payload["investor_details"] = {
        budgetRange: budget,
        preferredLocation: prefLocation,
        propertyPreference: propPreference,
        investmentGoal: investGoal,
      };
    }

    console.log("[CRM Workflow Payload] Submitted Partnership Request:", payload);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setSubmitted(false);
    setMessage("");
    setUploadedFiles([]);
    setConsent(false);
  };

  if (submitted) {
    return (
      <div className="glass-panel p-8 md:p-12 text-center max-w-2xl mx-auto space-y-6">
        <span className="material-symbols-outlined text-primary text-5xl mb-2 block">check_circle</span>
        <h3 className="font-headline-lg text-2xl text-on-surface">
          Partnership Request Received
        </h3>
        <p className="section-body">
          Thank you for connecting with Crystal Stone Properties. Our institutional advisory team is reviewing your profile and will reach out within one business day.
        </p>
        <div className="pt-4">
          <button
            type="button"
            onClick={handleReset}
            className="px-8 py-4 border border-primary text-primary font-label-md uppercase tracking-widest hover:bg-primary/10 transition-colors bg-transparent"
          >
            Submit Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel p-8 md:p-12">
      <div className="text-center mb-10 space-y-3">
        <span className="section-eyebrow block">Dynamic portal</span>
        <h3 className="font-headline-lg text-2xl md:text-3xl text-on-surface">
          Initiate Your Partnership
        </h3>
        <p className="section-body max-w-xl mx-auto">
          Select your profile below to customize the required due diligence and project specifications.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Audience Toggle */}
        <div>
          <label className="block font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-3">
            1. I am a / We are
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: "individual", label: "Individual Landowner", icon: "real_estate_agent" },
              { id: "developer", label: "Developer & Builder", icon: "apartment" },
              { id: "investor", label: "Private / Institutional Investor", icon: "diamond" },
            ].map((tab) => {
              const isSelected = audience === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleAudienceToggle(tab.id as AudienceType)}
                  className={`flex items-center justify-center gap-2 px-4 py-3 font-label-md uppercase tracking-widest text-xs transition-colors ${
                    isSelected
                      ? "bg-primary text-on-primary luxury-button"
                      : "bg-surface-container-high border border-outline-variant/40 text-on-surface-variant hover:border-primary hover:text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Purpose Dropdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter pt-4 border-t border-outline-variant/20">
          <div>
            <label htmlFor="purpose" className="block font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-2">
              2. Primary Purpose of Partnership *
            </label>
            <select
              id="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              required
              className="w-full bg-surface-container-high border border-outline-variant/40 text-on-surface px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
            >
              {PURPOSE_OPTIONS[audience]?.map((opt) => (
                <option key={opt} value={opt} className="bg-surface text-on-surface">
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="contactMethod" className="block font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-2">
              Preferred Contact Method *
            </label>
            <select
              id="contactMethod"
              value={contactMethod}
              onChange={(e) => setContactMethod(e.target.value)}
              className="w-full bg-surface-container-high border border-outline-variant/40 text-on-surface px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
            >
              <option value="Phone Call" className="bg-surface">Phone Call</option>
              <option value="WhatsApp" className="bg-surface">WhatsApp</option>
              <option value="Email" className="bg-surface">Email</option>
            </select>
          </div>
        </div>

        {/* Step 3: Common Contact Fields */}
        <div className="space-y-6 pt-4 border-t border-outline-variant/20">
          <label className="block font-label-md text-on-surface-variant uppercase tracking-widest text-xs">
            3. Contact Information
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter">
            <div>
              <label htmlFor="name" className="block font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-2">
                Full Name *
              </label>
              <input
                id="name"
                type="text"
                required
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-surface-container-high border border-outline-variant/40 text-on-surface px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="company" className="block font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-2">
                Company / Family Office (Optional)
              </label>
              <input
                id="company"
                type="text"
                placeholder="Company name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-surface-container-high border border-outline-variant/40 text-on-surface px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-2">
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-container-high border border-outline-variant/40 text-on-surface px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="mobile" className="block font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-2">
                  Mobile Number *
                </label>
                <input
                  id="mobile"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full bg-surface-container-high border border-outline-variant/40 text-on-surface px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="city" className="block font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-2">
                  City *
                </label>
                <input
                  id="city"
                  type="text"
                  required
                  placeholder="Bangalore"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-surface-container-high border border-outline-variant/40 text-on-surface px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Step 4: Conditional Fields */}
        <div className="space-y-6 pt-4 border-t border-outline-variant/20">
          <label className="block font-label-md text-primary uppercase tracking-widest text-xs">
            4. {audience === "individual" && "Landowner Property Specifications"}
            {audience === "developer" && "Developer & Project Specifications"}
            {audience === "investor" && "Investor Mandate & Preferences"}
          </label>

          {/* Conditional: Landowner */}
          {audience === "individual" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter bg-surface-container-high/40 p-6 border border-outline-variant/30">
              <div>
                <label className="block font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-2">
                  Property Location / Micro-Market *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Devanahalli, North Bangalore"
                  value={propLocation}
                  onChange={(e) => setPropLocation(e.target.value)}
                  className="w-full bg-surface-container-high border border-outline-variant/40 text-on-surface px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-2">
                  Property Type *
                </label>
                <select
                  value={propType}
                  onChange={(e) => setPropType(e.target.value)}
                  className="w-full bg-surface-container-high border border-outline-variant/40 text-on-surface px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                >
                  <option value="Residential Land">Residential Land</option>
                  <option value="Agricultural Land">Agricultural Land</option>
                  <option value="Commercial Land">Commercial Land</option>
                  <option value="Independent Site">Independent Site</option>
                </select>
              </div>

              <div>
                <label className="block font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-2">
                  Property Size & Unit *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2.5 Acres / 4,800 Sq.ft"
                  value={propSize}
                  onChange={(e) => setPropSize(e.target.value)}
                  className="w-full bg-surface-container-high border border-outline-variant/40 text-on-surface px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-2">
                  Expected Price (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. ₹85 Lakhs / ₹4.5 Cr"
                  value={expectedPrice}
                  onChange={(e) => setExpectedPrice(e.target.value)}
                  className="w-full bg-surface-container-high border border-outline-variant/40 text-on-surface px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                />
              </div>

              <div className="sm:col-span-2 pt-2">
                <label className="block font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-2">
                  Upload Documents (Optional)
                </label>
                <div className="relative flex flex-col items-center justify-center border border-dashed border-outline-variant/60 bg-surface-container-high p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-primary text-3xl mb-2">cloud_upload</span>
                  <p className="section-body text-sm">
                    Drag & drop files here, or <span className="text-primary underline">browse</span>
                  </p>
                  <p className="font-label-md text-on-surface-variant uppercase tracking-widest text-[10px] mt-1">
                    Supports PDF, DOCX, JPG, PNG up to 10MB
                  </p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                </div>
                {uploadedFiles.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {uploadedFiles.map((file, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/30 px-3 py-1 font-label-md text-primary uppercase tracking-widest text-[10px]">
                        <span className="material-symbols-outlined text-xs">description</span>
                        {file}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Conditional: Developer */}
          {audience === "developer" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter bg-surface-container-high/40 p-6 border border-outline-variant/30">
              <div>
                <label className="block font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-2">
                  Company / Builder Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Prestige Sanctuary Builders"
                  value={devCompany}
                  onChange={(e) => setDevCompany(e.target.value)}
                  className="w-full bg-surface-container-high border border-outline-variant/40 text-on-surface px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aero City Golf Layout"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full bg-surface-container-high border border-outline-variant/40 text-on-surface px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-2">
                  Project Location *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Yelahanka / IVC Road, Bangalore"
                  value={projectLocation}
                  onChange={(e) => setProjectLocation(e.target.value)}
                  className="w-full bg-surface-container-high border border-outline-variant/40 text-on-surface px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-2">
                  Total Units / Plots *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 120 Premium Villa Plots"
                  value={totalUnits}
                  onChange={(e) => setTotalUnits(e.target.value)}
                  className="w-full bg-surface-container-high border border-outline-variant/40 text-on-surface px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-2">
                  Project Website / Brochure URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://www.yourproject.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full bg-surface-container-high border border-outline-variant/40 text-on-surface px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                />
              </div>
            </div>
          )}

          {/* Conditional: Investor */}
          {audience === "investor" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter bg-surface-container-high/40 p-6 border border-outline-variant/30">
              <div>
                <label className="block font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-2">
                  Investment Budget Range *
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-surface-container-high border border-outline-variant/40 text-on-surface px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                >
                  <option value="₹50 Lakhs - ₹1 Cr">₹50 Lakhs - ₹1 Cr</option>
                  <option value="₹1 Cr - ₹5 Cr">₹1 Cr - ₹5 Cr</option>
                  <option value="₹5 Cr - ₹15 Cr">₹5 Cr - ₹15 Cr</option>
                  <option value="₹15 Cr+ (Institutional / SPV)">₹15 Cr+ (Institutional / SPV)</option>
                </select>
              </div>

              <div>
                <label className="block font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-2">
                  Preferred Growth Corridor *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. North Bangalore / Devanahalli"
                  value={prefLocation}
                  onChange={(e) => setPrefLocation(e.target.value)}
                  className="w-full bg-surface-container-high border border-outline-variant/40 text-on-surface px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-2">
                  Property Asset Preference *
                </label>
                <select
                  value={propPreference}
                  onChange={(e) => setPropPreference(e.target.value)}
                  className="w-full bg-surface-container-high border border-outline-variant/40 text-on-surface px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                >
                  <option value="Plotted Land Development">Plotted Land Development</option>
                  <option value="Commercial & Retail Asset">Commercial & Retail Asset</option>
                  <option value="Agricultural Sanctuary Land">Agricultural Sanctuary Land</option>
                  <option value="Trophy Penthouse / Residence">Trophy Penthouse / Residence</option>
                </select>
              </div>

              <div>
                <label className="block font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-2">
                  Primary Investment Objective *
                </label>
                <select
                  value={investGoal}
                  onChange={(e) => setInvestGoal(e.target.value)}
                  className="w-full bg-surface-container-high border border-outline-variant/40 text-on-surface px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                >
                  <option value="Capital Appreciation (18-22%)">Capital Appreciation (18-22%)</option>
                  <option value="High Rental Monetisation">High Rental Monetisation</option>
                  <option value="Strategic Land Banking">Strategic Land Banking</option>
                  <option value="Portfolio Diversification">Portfolio Diversification</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Step 5: Message & Consent */}
        <div className="space-y-6 pt-4 border-t border-outline-variant/20">
          <div>
            <label htmlFor="message" className="block font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-2">
              5. Additional Notes / Project Mandate Details
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Please share any specific timelines, legal questions, or requirements..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-surface-container-high border border-outline-variant/40 text-on-surface px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-y min-h-[120px]"
            />
          </div>

          <div className="flex items-start gap-3">
            <input
              id="consent"
              type="checkbox"
              required
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 h-4 w-4 border-outline-variant text-primary focus:ring-primary bg-surface-container accent-primary cursor-pointer shrink-0"
            />
            <label htmlFor="consent" className="section-body text-xs cursor-pointer">
              I agree to Crystal Stone&apos;s <span className="text-primary underline">Privacy Policy</span> and consent to having my verified profile stored and reviewed by the institutional advisory team for real estate partnership opportunities.
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !consent}
            className="w-full py-4 bg-primary text-on-primary font-label-md uppercase tracking-widest luxury-button disabled:opacity-50"
          >
            {isSubmitting ? "Submitting Request..." : "Submit Partnership Request"}
          </button>
        </div>
      </form>
    </div>
  );
}
