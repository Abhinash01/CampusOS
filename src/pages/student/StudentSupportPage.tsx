import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  HelpCircle,
  Phone,
  Mail,
  Building,
  FileQuestion,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Search,
  PlusCircle,
  Clock,
  ShieldCheck,
  Headphones,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: 'ATTENDANCE' | 'REQUESTS' | 'HOSTEL' | 'GENERAL'
}

const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'ATTENDANCE',
    question: 'What is the minimum mandatory attendance requirement?',
    answer:
      'The university strictly requires an overall attendance of 75% in each registered theory and laboratory subject to qualify for end-semester examinations. Students between 65% and 74.9% may submit medical certificate justifications through the Requests module for academic council review.',
  },
  {
    id: 'faq-2',
    category: 'REQUESTS',
    question: 'How long does it take for a hostel maintenance request to be attended?',
    answer:
      'Standard civil and electrical issues (e.g. tap leaks, fan regulator, lighting) are assigned to on-duty campus technicians within 4 operational hours. Emergency plumbing or electrical faults are expedited immediately with 2-hour priority SLAs.',
  },
  {
    id: 'faq-3',
    category: 'HOSTEL',
    question: 'How do I apply for an outstation or night-out gate pass?',
    answer:
      'Submit a Gate Pass request via CampusOS Requests module at least 12 hours prior to departure. Parental confirmation is recorded electronically, after which your warden approves the digital pass with a verifiable QR/security code for the main security gate.',
  },
  {
    id: 'faq-4',
    category: 'REQUESTS',
    question: 'Can I request an official Bonafide or Character Certificate online?',
    answer:
      'Yes. Go to Requests -> New Request -> Category: Certificate. Select the certificate type, provide your semester details, and the Registrar Office will process and electronically sign your verified PDF within 48 operational hours.',
  },
  {
    id: 'faq-5',
    category: 'GENERAL',
    question: 'What should I do if my Wi-Fi credentials or student email fails?',
    answer:
      'The Campus IT Center manages SSO accounts and MAC address registrations. You can contact it-support@campusos.edu or visit Room 102, Central Computing Centre between 09:30 AM and 05:00 PM on weekdays.',
  },
  {
    id: 'faq-6',
    category: 'HOSTEL',
    question: 'What are the official hostel curfew hours?',
    answer:
      'Hostel main gates close at 10:00 PM for all undergraduate boarders. Late entries past 10:00 PM require authorization from the Assistant Warden on duty or an approved campus library night-pass.',
  },
]

interface ContactOffice {
  name: string
  role: string
  location: string
  phone: string
  email: string
  hours: string
}

const CONTACT_OFFICES: ContactOffice[] = [
  {
    name: 'Office of the Chief Warden',
    role: 'Hostel Administration & Boarder Affairs',
    location: 'Hostel Administrative Block, Ground Floor',
    phone: '+91 674 238 5801',
    email: 'warden.office@campusos.edu',
    hours: '09:00 AM – 05:30 PM (Mon – Sat)',
  },
  {
    name: 'Estate & Infrastructure Maintenance',
    role: 'Plumbing, Electrical, Civil & Carpentry',
    location: 'Central Workshop Building, Bay 4',
    phone: '+91 674 238 5840',
    email: 'maintenance@campusos.edu',
    hours: '24/7 Emergency Dispatch Helpline',
  },
  {
    name: 'Academic Affairs & Registrar Section',
    role: 'Certificates, Transcripts & Registration',
    location: 'Administrative Block, Counter 3',
    phone: '+91 674 238 5812',
    email: 'academics@campusos.edu',
    hours: '10:00 AM – 04:30 PM (Mon – Fri)',
  },
  {
    name: 'Campus Health & Medical Centre',
    role: '24/7 First Aid, Resident Medical Officers & Ambulance',
    location: 'Near Gate 2, Health Centre Pavilion',
    phone: '+91 674 238 5899',
    email: 'health@campusos.edu',
    hours: 'Open 24 Hours with Resident Doctor',
  },
]

export const StudentSupportPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchFaq, setSearchFaq] = useState('')
  const [expandedFaq, setExpandedFaq] = useState<string | null>('faq-1')

  const filteredFaqs = FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchFaq.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchFaq.toLowerCase())
  )

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id)
  }

  return (
    <div className="space-y-7 pb-16 selection:bg-rose-100 selection:text-rose-900">
      {/* Header */}
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-rose-700 text-xs font-semibold mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-[#E11D48]" />
              Student Support Directory
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
              Help & Campus Support
            </h1>
            <p className="text-sm text-zinc-600 mt-1">
              Authoritative university FAQs, departmental contact points, and rapid issue dispatch.
            </p>
          </div>

          <Button
            onClick={() => navigate('/app/student/requests')}
            className="bg-[#E11D48] hover:bg-[#BE123C] text-white gap-2 font-medium self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Lodge an Issue / Request</span>
          </Button>
        </div>
      </FadeIn>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card
          onClick={() => navigate('/app/student/requests')}
          className="border-zinc-200/80 bg-white hover:border-[#E11D48]/50 hover:shadow-sm cursor-pointer transition-all p-4 group"
        >
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-rose-50 text-[#E11D48] group-hover:bg-[#E11D48] group-hover:text-white transition-colors">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 group-hover:text-[#E11D48] transition-colors">
                Report a Campus Problem
              </h3>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Log maintenance, plumbing, mess, or room defects directly to operational teams.
              </p>
            </div>
          </div>
        </Card>

        <Card
          onClick={() => {
            const faqSection = document.getElementById('faqs-section')
            faqSection?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="border-zinc-200/80 bg-white hover:border-zinc-300 hover:shadow-sm cursor-pointer transition-all p-4 group"
        >
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-zinc-100 text-zinc-700 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
              <FileQuestion className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-900">Campus Policy FAQs</h3>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Rules on attendance thresholds, gate passes, certificates, and curfew regulations.
              </p>
            </div>
          </div>
        </Card>

        <Card
          onClick={() => {
            const dirSection = document.getElementById('directory-section')
            dirSection?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="border-zinc-200/80 bg-white hover:border-zinc-300 hover:shadow-sm cursor-pointer transition-all p-4 group"
        >
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-zinc-100 text-zinc-700 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-900">Campus Office Contacts</h3>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Direct phone numbers and operating counters for chief warden, estate, and health.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* FAQ Section */}
      <div id="faqs-section" className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-zinc-900 flex items-center gap-2">
              <FileQuestion className="w-5 h-5 text-[#E11D48]" />
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Clear answers to the most common academic, hostel, and administrative inquiries.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              type="text"
              value={searchFaq}
              onChange={(e) => setSearchFaq(e.target.value)}
              placeholder="Search help topics..."
              className="pl-9 text-xs bg-white"
            />
          </div>
        </div>

        <Card className="border-zinc-200/80 bg-white divide-y divide-zinc-100">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center text-xs text-zinc-500">
              No answers matching "{searchFaq}". You can reach out directly to the respective department below.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isExpanded = expandedFaq === faq.id

              return (
                <div key={faq.id} className="transition-colors">
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 sm:p-5 flex items-start justify-between gap-4 text-left hover:bg-zinc-50/70 transition-colors"
                  >
                    <div className="space-y-1 pr-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="default" className="text-[10px] uppercase font-semibold text-zinc-600">
                          {faq.category}
                        </Badge>
                      </div>
                      <span className="text-sm font-semibold text-zinc-900 block mt-1">
                        {faq.question}
                      </span>
                    </div>

                    <div className="p-1 rounded-md text-zinc-400 hover:text-zinc-600 shrink-0">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-5 sm:px-5 pt-0 text-xs sm:text-sm text-zinc-600 leading-relaxed bg-zinc-50/40">
                      <div className="p-3.5 rounded-xl bg-white border border-zinc-200/80 shadow-2xs">
                        {faq.answer}
                      </div>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </Card>
      </div>

      {/* Campus Contacts Directory */}
      <div id="directory-section" className="space-y-4 pt-4">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-zinc-900 flex items-center gap-2">
            <Building className="w-5 h-5 text-[#E11D48]" />
            Official Departmental Contact Points
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Institutional offices, physical locations, counter timings, and verified hotlines.
          </p>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CONTACT_OFFICES.map((office, idx) => (
            <StaggerItem key={idx}>
              <Card className="h-full border-zinc-200/80 bg-white hover:border-zinc-300 transition-all p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold text-zinc-900">{office.name}</h3>
                    <Badge variant="default" className="text-[10px] text-zinc-600 font-medium">
                      Operational
                    </Badge>
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5">{office.role}</p>

                  <div className="mt-4 space-y-2 text-xs text-zinc-600">
                    <div className="flex items-start gap-2">
                      <Building className="w-3.5 h-3.5 text-zinc-400 mt-0.5 shrink-0" />
                      <span>{office.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span>{office.hours}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <a
                    href={`tel:${office.phone.replace(/[^0-9+]/g, '')}`}
                    className="inline-flex items-center gap-1.5 font-semibold text-zinc-900 hover:text-[#E11D48] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#E11D48]" />
                    <span>{office.phone}</span>
                  </a>
                  <a
                    href={`mailto:${office.email}`}
                    className="inline-flex items-center gap-1.5 text-zinc-600 hover:text-zinc-900 transition-colors font-mono text-[11px]"
                  >
                    <Mail className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{office.email}</span>
                  </a>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Emergency Assistance Banner */}
      <FadeIn delay={0.1}>
        <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-rose-50 via-orange-50/40 to-white border border-rose-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-rose-600 text-white shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-zinc-900">Campus Emergency & Safety Response</h4>
              <p className="text-xs text-zinc-600 mt-0.5">
                For urgent medical, security, fire, or severe hostel safety issues, dial the 24/7 Security Control Room directly: <strong className="text-zinc-900 font-mono">+91 674 238 5800</strong>.
              </p>
            </div>
          </div>
          <Button
            size="sm"
            onClick={() => (window.location.href = 'tel:+916742385800')}
            className="bg-[#BE123C] hover:bg-[#9F1239] text-white text-xs font-semibold shrink-0"
          >
            Emergency Dial
          </Button>
        </div>
      </FadeIn>
    </div>
  )
}
