import React from 'react';
import { motion } from 'motion/react';
import { SEO } from '../components/SEO';
import { 
  FileText, 
  CheckCircle, 
  Info, 
  CreditCard, 
  LogOut, 
  Users, 
  UserCheck, 
  ShieldAlert, 
  BookOpen, 
  Calendar, 
  Truck, 
  Coffee, 
  ShoppingBag, 
  Shirt, 
  MessageSquare, 
  Clock,
  Star,
  Zap,
  ShieldCheck,
  Heart,
  Video,
  GraduationCap,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '../components/Feedback';
import { fetchGlobalSettings } from '../services/googleSheets';

export const Admissions = () => {
  const [expandedSection, setExpandedSection] = React.useState<string | null>(null);

  const { data: settings, isLoading: isLoadingSettings } = useQuery({
    queryKey: ['global-settings'],
    queryFn: fetchGlobalSettings,
  });

  const brochure = settings?.brochure || '';

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  const SectionHeader = ({ 
    icon: Icon, 
    title, 
    color = "text-brand-green", 
    isCollapsible = false, 
    isOpen = false, 
    onToggle,
    titleClassName = "text-2xl md:text-5xl"
  }: { 
    icon: any, 
    title: string, 
    color?: string, 
    isCollapsible?: boolean, 
    isOpen?: boolean, 
    onToggle?: () => void,
    titleClassName?: string
  }) => (
    <div 
      className={`flex items-center justify-between mb-4 md:mb-8 ${isCollapsible ? 'cursor-pointer select-none' : ''}`}
      onClick={onToggle}
    >
      <div className="flex items-center space-x-3 md:space-x-4 min-w-0">
        <div className={`p-2 md:p-3 rounded-xl md:rounded-2xl bg-brand-gold/10 ${color} shrink-0`}>
          <Icon size={24} className="md:w-8 md:h-8" />
        </div>
        <h2 className={`${titleClassName} font-serif ${color} break-words leading-tight`}>{title}</h2>
      </div>
      {isCollapsible && (
        <div className={`${color} shrink-0 ml-2`}>
          {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>
      )}
    </div>
  );

  const RuleList = ({ items, textColor = "text-brand-green/80" }: { items: string[], textColor?: string }) => (
    <ul className="space-y-3 md:space-y-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start space-x-3 group">
          <div className="mt-1.5 shrink-0">
            <CheckCircle size={16} className="text-brand-gold group-hover:scale-110 transition-transform md:w-[18px] md:h-[18px]" />
          </div>
          <span className={`${textColor} leading-relaxed text-base md:text-lg`}>{item}</span>
        </li>
      ))}
    </ul>
  );

  const CollapsibleSection = ({ id, icon, title, children, className = "", dark = false, compact = false }: { id: string, icon: any, title: string, children: React.ReactNode, className?: string, dark?: boolean, compact?: boolean, key?: React.Key }) => {
    const isOpen = expandedSection === id;
    
    return (
      <section id={id} className={`${className} ${dark ? 'bg-brand-green text-brand-cream' : 'bg-white'} p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-md border border-brand-green/10 transition-all duration-300 h-full`}>
        <SectionHeader 
          icon={icon} 
          title={title} 
          color={dark ? "text-brand-gold" : "text-brand-green"} 
          isCollapsible={true}
          isOpen={isOpen}
          onToggle={() => toggleSection(id)}
          titleClassName={compact ? "text-xl md:text-2xl lg:text-3xl" : "text-2xl md:text-5xl"}
        />
        <AnimatePresence initial={false}>
          {(isOpen || window.innerWidth >= 768) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-4 md:pt-0">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-20 bg-brand-cream/10"
    >
      <SEO 
        title="Admissions 2026 | Best Girls School in Surat | Al-Mu'minah School"
        description="Apply for admission at Al-Mu'minah Group of Schools, Surat. Affordable English medium Islamic education for girls. Admission rules, fees structure, and school policies."
        keywords="school admission Surat 2026, affordable schools in Surat, English medium schools list Surat, girls only islamic school surat, best school for girls surat"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-brand-gold font-semibold uppercase tracking-widest text-sm mb-4 block">Admissions</span>
          <h1 className="text-6xl md:text-8xl font-serif text-brand-green mb-8 leading-tight">
            Join Our <span className="italic">Learning Community</span>
          </h1>
          <div className="flex justify-center gap-6">
            {isLoadingSettings ? (
              <Skeleton className="h-14 w-64 rounded-2xl" />
            ) : brochure ? (
              <a 
                href={brochure} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-8 py-4 bg-brand-green text-brand-cream font-bold rounded-2xl hover:bg-brand-gold hover:text-brand-green transition-all shadow-lg flex items-center"
              >
                <FileText className="mr-2" size={24} /> Download Brochure
              </a>
            ) : null}
          </div>
        </div>

        <div className="space-y-6 md:space-y-24">
          {/* Admissions Section */}
          <CollapsibleSection id="admissions" icon={Info} title="Admissions">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-4 md:space-y-6">
                <p className="text-lg md:text-xl text-brand-green/80 leading-relaxed">
                  Application for admission must be made on the prescribed form available from the school.
                </p>
                <p className="text-lg md:text-xl text-brand-green/80 leading-relaxed">
                  Students coming from schools outside the state of Gujarat must submit a Leaving Certificate countersigned by the District Education Officer (D.E.O.) of the respective state.
                </p>
              </div>
              <div className="space-y-4 md:space-y-6">
                <p className="text-lg md:text-xl text-brand-green/80 leading-relaxed">
                  Admission will be granted based on the age of the student, availability of seats, and other relevant factors.
                </p>
                <div className="p-4 md:p-6 bg-brand-green/5 rounded-2xl border-l-4 border-brand-gold">
                  <p className="text-brand-green font-serif text-lg md:text-xl italic">
                    "The decision of the Principal regarding admission and placement will be final. Insha Allah."
                  </p>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Fees Section */}
          <CollapsibleSection id="fees" icon={CreditCard} title="Fees" dark={true}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 relative z-10">
              <div className="space-y-4 md:space-y-6">
                <RuleList 
                  textColor="text-brand-cream/90"
                  items={[
                    "All school dues must be paid regularly as notified by the school.",
                    "Fees once paid are non-refundable under any circumstances.",
                    "Delay in fee payment beyond two months may result in removal of the student from school as per Government rules.",
                    "Fees for April and May must be paid by the end of March.",
                    "Hall tickets for final examinations will be issued only after full payment of fees up to May."
                  ]} 
                />
              </div>
              <div className="bg-white/10 p-6 md:p-8 rounded-3xl border border-white/10">
                <h4 className="text-xl md:text-2xl font-serif text-brand-gold mb-4 md:mb-6">Fee Instalments</h4>
                <div className="space-y-3 md:space-y-4">
                  {[
                    { period: "June to September", label: "1st Instalment" },
                    { period: "October to January", label: "2nd Instalment" },
                    { period: "February to May", label: "3rd Instalment" }
                  ].map((inst, i) => (
                    <div key={i} className="flex justify-between items-center p-3 md:p-4 bg-white/5 rounded-xl">
                      <span className="font-medium text-sm md:text-base">{inst.period}</span>
                      <span className="text-brand-gold text-[10px] md:text-sm font-bold uppercase tracking-widest">{inst.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Leaving/Transfer Section */}
          <CollapsibleSection id="leaving" icon={LogOut} title="Leaving / Transfer" className="bg-brand-cream/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <RuleList items={[
                "Written notice of withdrawal must be submitted by parents/guardians before the end of the month; otherwise, fees for the following month will be charged.",
                "Students are liable to pay fees until their name is removed from the class register.",
                "A student leaving school in April or October must pay fees for May or November respectively."
              ]} />
              <RuleList items={[
                "No Leaving Certificate (LC) will be issued unless all school dues are cleared.",
                "The Leaving Certificate will be issued only after submission of the prescribed application form."
              ]} />
            </div>
          </CollapsibleSection>

          {/* Rules for Parents & Students */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
            <CollapsibleSection id="rules-parents" icon={Users} title="Rules for Parents">
              <RuleList items={[
                "Parents must inform the school in writing of any change in residential address or contact details.",
                "In case of absence, completion of pending work is the sole responsibility of parents and students.",
                "Children should be dropped at the school entrance at least 10 minutes before school begins.",
                "Medical appointments during school hours are not permitted without prior information.",
                "For leave exceeding three days, written permission must be obtained from the Principal or Coordinator in advance.",
                "Minimum 80% attendance is compulsory for all students.",
                "Parents must cooperate with school authorities in matters of discipline.",
                "Parents are expected to interact respectfully with all staff members and maintain discipline and courteous behaviour at all times.",
                "Parents should not approach school staff for private tuition.",
                "Parents must not send sweets, gifts, cards, or any items for students’ birthdays or for teachers.",
                "All important information in the school diary must be filled on the first day of school.",
                "Attendance on the first and last working day of the academic year is compulsory.",
                "Parents are expected to help maintain an Islamic environment at home and act as positive role models for their children."
              ]} />
            </CollapsibleSection>

            <CollapsibleSection id="rules-students" icon={UserCheck} title="Rules for Students" className="bg-brand-green/5">
              <RuleList items={[
                "All students must communicate in English within the school premises.",
                "Polite and respectful behaviour is expected at all times.",
                "Juniors should be treated with love and care, and seniors with respect.",
                "Bringing fancy stationery items is strictly prohibited and will be confiscated.",
                "Lending or borrowing money or personal articles is not allowed.",
                "Students must take care of school property; damage caused must be compensated.",
                "Students should be neatly dressed at all times.",
                "Nails must be trimmed and kept clean.",
                "Homework must be completed regularly and sincerely.",
                "Use of unfair means during tests or examinations is a serious offence and may lead to strict disciplinary action.",
                "Possession of any lethal weapon will result in immediate issue of a School Leaving Certificate.",
                "Corporal punishment is strictly forbidden."
              ]} />
            </CollapsibleSection>
          </div>

          {/* Policies Grid - Redesigned for Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                id: "policy-discipline",
                icon: ShieldAlert,
                title: "Discipline",
                items: [
                  "Aggression, bullying, foul language, or rude behaviour will not be tolerated.",
                  "The school reserves the right to suspend or take strict disciplinary action against students violating school rules.",
                  "No re-examination will be conducted under any circumstances."
                ]
              },
              {
                id: "policy-homework",
                icon: BookOpen,
                title: "Homework Policy",
                items: [
                  "Written homework must be completed by the student herself.",
                  "Parents should check and sign the school diary daily."
                ]
              },
              {
                id: "policy-absence",
                icon: Calendar,
                title: "Absence Policy",
                items: [
                  "For long-term leave, prior written permission from the Principal is mandatory.",
                  "In case of sudden absence, a written note mentioning the dates of absence must be sent when the student resumes school."
                ]
              },
              {
                id: "policy-transport",
                icon: Truck,
                title: "Transportation",
                items: [
                  "The school acts only as a facilitator between parents and transport service providers.",
                  "The school management and trustees are not responsible for any act or omission by transport service providers."
                ]
              },
              {
                id: "policy-food",
                icon: Coffee,
                title: "Food Policy",
                items: [
                  "Students must bring their own homemade snacks and water bottles.",
                  "Packet snacks, junk food, chewing gum, sweets, chocolates, and soft drinks are strictly prohibited.",
                  "Any prohibited food items will be confiscated without notice."
                ]
              },
              {
                id: "policy-books",
                icon: ShoppingBag,
                title: "Books & Bags",
                items: [
                  "Books and school bags will be available at the beginning of each academic year.",
                  "Confirmation of the required book set must be completed by parents in the month of January.",
                  "The cost of books varies according to the standard.",
                  "Parents will be informed in advance about the distribution schedule."
                ]
              },
              {
                id: "policy-uniform",
                icon: Shirt,
                title: "Uniform",
                items: [
                  "The school uniform must be clean, washed, and ironed daily.",
                  "Students must wear black socks and black shoes only."
                ]
              },
              {
                id: "policy-comm",
                icon: MessageSquare,
                title: "Communication",
                items: [
                  "Students’ academic progress and reports will be discussed with parents only during Open Days or scheduled Parent-Teacher Meetings (PTMs).",
                  "Parents should not call teachers or staff after school hours to discuss students’ reports.",
                  "In case of urgency, parents may visit the school and meet the concerned authority during school hours with prior permission."
                ]
              },
              {
                id: "policy-punctual",
                icon: Clock,
                title: "Punctuality",
                items: [
                  "Punctuality is mandatory for all students.",
                  "Only two late arrivals are permitted in a month; thereafter, the student may be sent home.",
                  "Parents must pick up students promptly at dispersal time without delay."
                ]
              }
            ].map((policy, i) => (
              <CollapsibleSection key={i} id={policy.id} icon={policy.icon} title={policy.title} className="!p-6 !rounded-[2rem]" compact={true}>
                <ul className="space-y-3">
                  {policy.items.map((item, j) => (
                    <li key={j} className="text-sm text-brand-green/70 leading-relaxed flex items-start space-x-2">
                      <span className="text-brand-gold mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CollapsibleSection>
            ))}
          </div>

          {/* Salient Features Section - Redesigned for Modern Look */}
          <section className="bg-brand-green text-brand-cream p-8 md:p-16 rounded-[3rem] md:rounded-[4rem] relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-gold/5 via-transparent to-brand-green/20 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="text-center mb-12 md:mb-20">
                <span className="text-brand-gold font-bold uppercase tracking-widest text-xs md:text-sm mb-4 block">Why Choose Us</span>
                <h2 className="text-4xl md:text-7xl font-serif mb-6 leading-tight">Salient Features</h2>
                <p className="text-brand-gold text-lg md:text-2xl font-serif italic opacity-90">Preparing Students for Modern Academic & Professional Excellence</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {[
                  { icon: MessageSquare, title: "Fluency in English", desc: "Developing confident communication skills." },
                  { icon: Zap, title: "Strong Foundation", desc: "Excellence in Science, Mathematics & Technology." },
                  { icon: Heart, title: "Islamic Studies", desc: "Developing love for Islam through modern methods." },
                  { icon: BookOpen, title: "Tajweed & Makhraj", desc: "Focus on correct Quranic pronunciation." },
                  { icon: ShieldCheck, title: "Quran & Sunnah", desc: "Emphasis on understanding core Islamic values." },
                  { icon: GraduationCap, title: "Karate Classes", desc: "Physical fitness and self-defense training." },
                  { icon: Users, title: "Guidance", desc: "Continuous support for student well-being." },
                  { icon: Video, title: "24/7 Security", desc: "CCTV surveillance for a safe environment." },
                  { icon: UserCheck, title: "All Ladies Staff", desc: "Safe and comfortable environment for girls." }
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="group relative bg-white/5 backdrop-blur-sm border border-white/10 p-5 md:p-6 rounded-2xl md:rounded-3xl hover:bg-white/10 hover:border-brand-gold/30 transition-all duration-500 shadow-lg hover:shadow-brand-gold/5"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-brand-gold/20 rounded-xl flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform duration-500">
                        <feature.icon size={24} className="md:w-7 md:h-7" />
                      </div>
                      <div>
                        <h4 className="text-lg md:text-xl font-serif text-brand-gold mb-1">{feature.title}</h4>
                        <p className="text-brand-cream/60 text-xs md:text-sm leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">{feature.desc}</p>
                      </div>
                    </div>
                    {/* Subtle glow effect on hover */}
                    <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-brand-gold/0 group-hover:bg-brand-gold/5 transition-colors pointer-events-none" />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

