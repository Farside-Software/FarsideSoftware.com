import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import GlassButton from '../components/GlassButton';
import FarsideMark from '../components/FarsideMark';
import PageHeader from '../components/PageHeader';
import SplitSection, { rowClass } from '../components/SplitSection';
import { LEGAL_NAME, SITE_NAME } from '../config/site';
import familyshot from '../assets/familyshot.jpg';
import familyshotWebp from '../assets/familyshot.webp';
import headshot from '../assets/nickheadshot.jpg';
import headshotWebp from '../assets/nickheadshot.webp';
import resumePDF from '../assets/nickmolargikresume.pdf';
import ScrollToTop from '../components/ScrollToTop';
import { useRouteMeta } from '../hooks';
import opaliteIcon from '../assets/opalite/icon.png';
import mygraIcon from '../assets/mygra/icon.png';
import waffleIcon from '../assets/waffle/icon.png';
import storkIcon from '../assets/stork/icon.png';
import setDeckIcon from '../assets/setdeck/icon.png';
import maestroIcon from '../assets/maestro/icon.png';
import AppIcon from '../components/AppIcon';
import { findApp } from '../data/apps';

const SKILL_GROUPS = [
  {
    category: 'Apple Ecosystem',
    /** The longest list, so it gets the full width above the other two. */
    wide: true,
    items: [
      'Apple Intelligence (Foundation Models)',
      'SwiftData',
      'CloudKit',
      'Core Data',
      'HealthKit',
      'WeatherKit',
      'WidgetKit',
      'Live Activities',
      'App Intents',
      'Watch Connectivity',
      'StoreKit 2',
      'Swift Charts',
      'TipKit',
      'Core Spotlight',
      'Core Location',
      'Core Motion',
      'PhotoKit',
      'Vision',
      'Core Image',
      'AVFoundation',
      'Accelerate',
      'WebKit',
      'PencilKit',
      'RealityKit',
      'SpriteKit',
      'PDFKit',
      'CoreML',
    ],
  },
  {
    category: 'Mobile Development',
    items: [
      'Swift',
      'SwiftUI',
      'UIKit',
      'AppKit',
      'Swift Concurrency',
      'Swift Testing',
      'Swift Package Manager',
      'Xcode Cloud',
      'Kotlin Multiplatform',
      'Flutter + BLoC',
      'Jetpack Compose',
    ],
  },
  {
    category: 'Systems Engineering',
    items: ['C Libraries', 'MATLAB', 'Python Automation', 'GitLab CI/CD', 'Hardware Integration', 'Arduino', '3D Printing'],
  },
];

const pill = 'rounded-full border border-line/15 px-3 py-1 text-sm font-semibold text-muted';
const bodyText = 'space-y-4 text-lg leading-relaxed text-muted';

function Pills({ items, label }: { items: string[]; label?: string }) {
  return (
    <ul className="mt-5 flex list-none flex-wrap gap-2 p-0" aria-label={label}>
      {items.map((item) => (
        <li key={item} className={pill}>
          {item}
        </li>
      ))}
    </ul>
  );
}

function JobRow({ dates, note, role, company, children }: { dates: string; note?: string; role: string; company?: ReactNode; children: ReactNode }) {
  return (
    <div className={`${rowClass} grid gap-x-10 gap-y-3 sm:grid-cols-[11rem_1fr]`}>
      <div>
        <p className="text-sm font-bold tabular-nums text-muted">{dates}</p>
        {note && <p className="mt-1 text-xs text-muted/70">{note}</p>}
      </div>
      <div>
        <h3 className="text-2xl font-extrabold tracking-[-0.02em] text-ink">{role}</h3>
        {company && <p className="mt-1 text-xl text-muted">{company}</p>}
        <div className={`mt-4 ${bodyText}`}>{children}</div>
      </div>
    </div>
  );
}

export default function About() {
  useRouteMeta();

  const projects = [
    { title: 'Maestro', tagline: 'Turns any song into a Tesla light show on iPhone, iPad, and Mac: on-device signal processing, a hardware-accurate fleet preview, a Sequence Editor, and USB-ready exports.', image: maestroIcon, path: '/maestro', accentColor: '#2D7FF9' },
    { title: 'Opalite', tagline: 'The ultimate color manager: six pickers, smart palettes, WCAG and color-blindness checks, a canvas, a community, and export to Procreate, Adobe, SwiftUI, and CSS.', image: opaliteIcon, path: '/opalite', accentColor: '#CAC0E8' },
    { title: 'SetDeck', tagline: 'Strength training companion: weekly routines, set-by-set logging, stats and achievements, hydration and calories, Apple Watch and Siri.', image: setDeckIcon, path: '/setdeck', accentColor: '#65DA92' },
    { title: 'Mygra', tagline: 'Intelligent migraine journal with on-device Apple Intelligence insights, weather correlations, Apple Health, and iCloud sync.', image: mygraIcon, path: '/mygra', accentColor: '#6E60FF' },
    { title: 'Stork', tagline: 'L&D companion with a Delivery Jar, career stats, milestones, share cards, and PDF/CSV export. HIPAA-conscious by design.', image: storkIcon, path: '/stork', accentColor: '#E8672B' },
    { title: 'Waffle', tagline: 'Live web grid and split-screen browser: two pages on iPhone, up to 4x4 on iPad, four panes on iPhone Duo.', image: waffleIcon, path: '/waffle', accentColor: '#DFA656' },
  ];

  return (
    <>
      <PageHeader
        eyebrow="About"
        title={SITE_NAME}
        lead="Founded in 2025 to transform personal pain points into innovative solutions. Specializing in privacy-first development with iOS 26+, Apple Intelligence, HealthKit, WeatherKit, and more for native experiences."
        aside={
          <div className="flex justify-center lg:justify-end">
            <FarsideMark className="w-[200px] lg:w-full lg:max-w-[340px]" />
          </div>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <GlassButton href="#projects" size="md">
            See the apps
          </GlassButton>
          <GlassButton to="/contact" tone="ghost" size="md">
            Contact
          </GlassButton>
        </div>
      </PageHeader>

      <SplitSection
        id="company"
        eyebrow="Company"
        tone="well"
        title={LEGAL_NAME}
      >
        <div className="reveal">
          <div className={rowClass}>
            <h3 className="text-2xl font-extrabold tracking-[-0.02em] text-ink">Mission</h3>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              Create intuitive, impactful apps born from real user needs—whether tracking migraines with AI, revolutionizing iPad browsing, or empowering L&amp;D nurses. Every project prioritizes privacy, performance, and meaningful problem-solving.
            </p>
          </div>
          <div className={rowClass}>
            <h3 className="text-2xl font-extrabold tracking-[-0.02em] text-ink">Core Technologies</h3>
            <Pills
              label="Core Technologies"
              items={[
                'Swift 6 + SwiftUI on every Apple platform',
                'On-device Apple Intelligence',
                'SwiftData + CloudKit cross-device sync',
                'Widgets, Live Activities, App Intents',
                'HealthKit, WeatherKit, and Core Location',
                'StoreKit 2 with Family Sharing',
                'Swift Charts and TipKit',
                'PhotoKit, Vision, and Core Image',
                'AVFoundation + Accelerate audio analysis',
                'WebKit, PencilKit, and RealityKit',
              ]}
            />
          </div>
          <p className="mt-6 text-sm text-muted">
            Built with <span className="font-medium text-ink">React</span>, <span className="font-medium text-ink">Vite</span>, and <span className="font-medium text-ink">Tailwind CSS</span>. Web dev supports my mobile passion—but is certainly not my expertise.
          </p>
        </div>
      </SplitSection>

      <SplitSection
        id="projects"
        eyebrow="Projects"
        title="Featured Projects"
        intro={
          <>
            All apps available on the <strong className="text-ink">App Store</strong>. Built solo from conceptualization to launch. Some graphic design has been outsourced to (much more talented) artists.
          </>
        }
      >
        <div className="reveal">
          {projects.map((project) => (
            <div key={project.path} className={`${rowClass} group group/app relative flex items-center gap-4 transition-colors hover:bg-line/[0.04]`}>
              <AppIcon src={project.image} darkSrc={findApp(project.path.slice(1))?.iconDark} size={52} loading="lazy" className="h-[52px] w-[52px] rounded-[14px]" />
              <div className="min-w-0 flex-1">
                <Link
                  to={project.path}
                  aria-label={`${project.title} — ${project.tagline}`}
                  className="text-xl font-extrabold tracking-[-0.02em] text-ink after:absolute after:inset-0"
                >
                  {project.title}
                </Link>
                <p className="mt-0.5 text-[0.95rem] leading-snug text-muted">{project.tagline}</p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-muted/70 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-ink" aria-hidden="true" />
            </div>
          ))}
        </div>
      </SplitSection>

      <SplitSection
        id="founder"
        eyebrow="Founder"
        tone="well"
        title="Nick Molargik"
        intro={<>Senior Software Engineer &amp; Founder, {LEGAL_NAME}</>}
      >
        <div className="reveal">
          <div className="grid max-w-md grid-cols-2 gap-4">
            <picture>
              <source srcSet={headshotWebp} type="image/webp" />
              <img
                src={headshot}
                alt="Nick Molargik"
                width={160}
                height={160}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full rounded-3xl border border-line/10 object-cover object-center"
              />
            </picture>
            <picture>
              <source srcSet={familyshotWebp} type="image/webp" />
              <img
                src={familyshot}
                alt="Nick with his family"
                width={160}
                height={160}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full rounded-3xl border border-line/10 object-cover object-center"
              />
            </picture>
          </div>
          <p className="mt-8 text-lg leading-relaxed text-muted">
            Versatile engineer, transitioned from electrical engineering to mobile development. Expertise in Swift, SwiftUI, Flutter, Kotlin Multiplatform, and hardware integration. Building privacy-first solutions that solve real user problems. Husband, Father, Dog Dad, living life in Indiana.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-line/15 px-3 py-1 text-xs font-medium tracking-wide text-muted">
            <span className="inline-block h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
            Available for new projects
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <GlassButton href={resumePDF} download tone="ghost" size="md">
              Download Résumé
            </GlassButton>
            <GlassButton href="https://github.com/NMolargik" target="_blank" tone="ghost" size="md">
              GitHub
            </GlassButton>
            <GlassButton href="https://www.linkedin.com/in/nicholas-molargik/" target="_blank" tone="ghost" size="md">
              LinkedIn
            </GlassButton>
          </div>
        </div>
      </SplitSection>

      <SplitSection id="journey" eyebrow="Experience" title="Professional Journey">
        <div className="reveal">
        <JobRow
          dates="2026 to Present"
          role="Senior Software Engineer"
          company={<Link to="/streetiq" className="underline decoration-line/30 underline-offset-4 hover:text-ink hover:decoration-line/60">StreetIQ</Link>}
        >
                    <p>
                      Joined the Indianapolis-based infrastructure intelligence company to rebuild its field app natively, and shipped <strong className="text-ink">SCOUT</strong>: a ground-up <strong className="text-ink">Swift 6.2 / SwiftUI</strong> app on a layered Swift Package, replacing the original Flutter implementation with ~1,150 tests behind it.
                    </p>
                    <p>
                      Built the <strong className="text-ink">distance-based capture pipeline</strong> (dead-reckoned between GPS fixes, speed-adaptive camera streaming, thermal governance), the on-device <strong className="text-ink">live coverage engine</strong> that fires the shutter only where pavement is still owed, <strong className="text-ink">offline Mapbox maps</strong>, turn-by-turn navigation, GoPro companion cameras over Bluetooth, and background uploads with Live Activities.
                    </p>
                    <p>
                      <strong className="text-ink">Delivery:</strong> Xcode Cloud CI/CD across four environments, each with its own TestFlight product, plus MetricKit crash diagnostics and structured in-app logging — no third-party analytics SDKs.
                    </p>
        </JobRow>
        <JobRow
          dates="2024 to 2026" note="Contractor &rarr; Engineer &rarr; Senior"
          role="Senior Mobile Software Engineer"
          company={<Link to="/v1sports" className="underline decoration-line/30 underline-offset-4 hover:text-ink hover:decoration-line/60">V1 Sports</Link>}
        >
                    <p>
                      Built a custom <strong className="text-ink">golf ball tracer</strong> from scratch—training a YOLO-based detection model on 28,000 images, converting it to <strong className="text-ink">CoreML</strong> for on-device inference, and designing a multi-phase tracking algorithm with trajectory-based detection gating and cluster rejection using Apple's <strong className="text-ink">Vision framework</strong>.
                    </p>
                    <p>
                      Delivered a production <strong className="text-ink">video pipeline</strong> processing frames at 120 FPS with real-time shot trace rendering. Developed cross-platform video composition using <strong className="text-ink">Kotlin Multiplatform</strong>, AVFoundation, and FFmpeg, improving playback and stitching on iOS and Android.
                    </p>
                    <p>
                      Built camera capture features in Swift and AVFoundation, packaged as a <strong className="text-ink">Flutter Native Plugin</strong> with Codemagic CI/CD. Designed and shipped <strong className="text-ink">multi-device camera sync</strong> — letting multiple iOS devices discover one another over the local network, clock-sync, and record in lockstep for synchronized multi-angle capture. Integrated a pressure mat device via custom <strong className="text-ink">C library</strong>, generating real-time heat maps and biomechanics feedback.
                    </p>
                    <p>
                      <strong className="text-ink">Impact:</strong> Authored system architecture documentation enabling rapid onboarding; led cross-functional discussions and architectural refactors that accelerated feature deployment.
                    </p>
        </JobRow>
        <JobRow
          dates="2025 to Present"
          role="Founder &amp; Developer"
          company={LEGAL_NAME}
        >
                    <p>
                      Founded to build Apple apps from real user needs identified through friends, family, and professional networks. Solo-developing full lifecycle—from user interviews and SwiftUI prototyping to App Store deployment and iteration.
                    </p>
                    <p>
                      Launched four apps in first year: <strong className="text-ink">Mygra</strong> (AI migraine tracker with WeatherKit/HealthKit), <strong className="text-ink">Waffle</strong> (iPadOS 26 grid browser), <strong className="text-ink">Stork</strong> (L&D delivery tracker), and <strong className="text-ink">SetDeck</strong> (Fitness companion, workout tracker), followed by <strong className="text-ink">Opalite</strong> (color palette manager with iCloud sync, canvas, and more) and <strong className="text-ink">Maestro</strong> (Tesla light show studio for macOS) in year two.
                    </p>
                    <p>
                      <strong className="text-ink">Philosophy:</strong> Bootstrap lean, iterate fast, solve niche problems with enterprise-grade polish. Every app tells a story of user frustration transformed into intuitive solutions.
                    </p>
        </JobRow>
        <JobRow
          dates="2022 to 2024"
          role="Mobile &amp; Desktop Applications Engineer"
          company="Sweetwater Sound"
        >
                    <p>
                      Spearheaded the complete <strong className="text-ink">mobile app revival</strong>, transforming a failed Flutter implementation (user-advised to avoid) into world-class native apps using <strong className="text-ink">SwiftUI</strong> for iOS and <strong className="text-ink">Jetpack Compose</strong> for Android.
                    </p>
                    <p>
                      Results were transformative: native apps surpassed the website in discovery-to-sales conversion, driving significant revenue growth. Rapidly expanded from 4D database maintenance to leading mobile development after proving capabilities through bug fixes and feature delivery.
                    </p>
                    <p>
                      Architected <strong className="text-ink">GitLab CI/CD pipelines</strong> accelerating deployment cycles. Maintained legacy <strong className="text-ink">Objective-C/Swift desktop applications</strong> and enterprise 4D systems managing full business operations—sales, inventory, payments, logistics, and customer engagement.
                    </p>
                    <p>
                      <strong className="text-ink">Key Achievement:</strong> Proved cross-platform expertise by quickly mastering Android development while maintaining iOS excellence, positioning mobile as Sweetwater's premier retail channel.
                    </p>
        </JobRow>
        <JobRow
          dates="2020 to 2022"
          role="Electrical Engineer"
          company="Raytheon Technologies"
        >
                    <p>
                      Developed comprehensive <strong className="text-ink">automated testing frameworks</strong> using MATLAB and Python for radar system Unit Under Test (UUT) validation, dramatically reducing manual testing time and improving test coverage for critical defense hardware.
                    </p>
                    <p>
                      Performed <strong className="text-ink">schematic capture and PCB rework</strong> for radar components, collaborating with RF engineers to integrate digital control systems with analog RF frontends. Held <strong className="text-ink">active Secret Clearance</strong> and contributed to classified system documentation.
                    </p>
                    <p>
                      Executed full lifecycle testing including design verification, environmental testing, and performance characterization. Modified electrical schematics to resolve design flaws and enhance system reliability in mission-critical applications.
                    </p>
                    <p>
                      <strong className="text-ink">Defense Expertise:</strong> Gained deep understanding of radar systems, signal processing, and DoD compliance—skills informing modern hardware-software integration approaches in indie development.
                    </p>
        </JobRow>
          <JobRow dates="2014 to 2020" role="Early Foundation">
            <div>
              <h4 className="font-bold text-ink">NAVSEA Crane Intern</h4>
              <p className="mt-1">Developed Python automation for radar system upgrades (Secret Clearance). Signal analysis with MATLAB.</p>
            </div>
            <div>
              <h4 className="font-bold text-ink">Purdue School of Engineering &amp; Technology @ IUPUI - 3D Printing Lab</h4>
              <p className="mt-1">Managed printer fleet, trained students, end-to-end print workflow for engineering projects.</p>
            </div>
            <div>
              <h4 className="font-bold text-ink">Molargik Woodworking Inc. - Laborer, CNC Operator, Delivery, IT</h4>
              <p className="mt-1">Cabinet component preparation and assembly, delivery to job sites, customer interaction, CNC machinery operation, and one-man IT support.</p>
            </div>
            <div>
              <h4 className="font-bold text-ink">BS Electrical Engineering, IUPUI</h4>
              <p className="mt-1">3.72 GPA, Mathematics minor, focus on electric motors and power systems / transmission / conversion</p>
            </div>
          </JobRow>
        </div>
      </SplitSection>

      <SplitSection id="skills" eyebrow="Skills" tone="well" title="Technical Expertise">
        <div className="reveal grid gap-10 sm:grid-cols-2">
          {SKILL_GROUPS.map((group) => (
            <div key={group.category} className={'wide' in group && group.wide ? 'sm:col-span-2' : undefined}>
              <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-muted/70">{group.category}</h3>
              <Pills items={group.items} label={group.category} />
            </div>
          ))}
        </div>
      </SplitSection>

      <SplitSection id="github" eyebrow="Activity" title="GitHub Contributions">
        <div className="reveal rounded-3xl border border-line/10 bg-panel p-4">
          <a href="https://github.com/NMolargik" aria-label="View Nick Molargik on GitHub" className="block">
            <img
              src="https://ghchart.rshah.org/NMolargik"
              alt="GitHub contribution graph for NMolargik"
              loading="lazy"
              className="mx-auto w-full max-w-[820px]"
            />
          </a>
          <p className="mt-3 text-center text-sm text-muted">
            Data updates automatically from GitHub. Click the graph to visit my profile.
          </p>
        </div>
      </SplitSection>

      <SplitSection id="contact" eyebrow="Contact" tone="well" title="Have an idea? Let's build it.">
        <div className="reveal">
          <p className="text-lg leading-relaxed text-muted">
            Open to collaborations on Apple platform development or IoT projects. Whether it's a new app concept, contract work, or a partnership, I'd love to hear from you.
          </p>
          <div className="mt-8 flex flex-col flex-wrap gap-3 sm:flex-row">
            <GlassButton to="/contact" size="lg">
              Get in Touch
            </GlassButton>
            <GlassButton href={resumePDF} download tone="ghost" size="lg">
              Download Résumé
            </GlassButton>
            <GlassButton href="https://www.linkedin.com/in/nicholas-molargik/" target="_blank" tone="ghost" size="lg">
              LinkedIn
            </GlassButton>
            <GlassButton href="https://github.com/nmolargik" target="_blank" tone="ghost" size="lg">
              GitHub
            </GlassButton>
          </div>
        </div>
      </SplitSection>

      <ScrollToTop />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                "name": "Nick Molargik",
                "jobTitle": "Indie Mobile Engineer & Founder",
                "url": "https://farsidesoftware.com/",
                "sameAs": [
                  "https://www.linkedin.com/in/nicholas-molargik/",
                  "https://github.com/nmolargik"
                ],
                "knowsAbout": ["SwiftUI", "Apple Intelligence", "Kotlin Multiplatform", "HealthKit", "Radar Systems"]
              },
              {
                "@type": "Organization",
                "name": LEGAL_NAME,
                "url": "https://farsidesoftware.com/",
                "founder": {"@id": "#person"}
              }
            ]
          })
        }}
      />
    </>
  );
}
