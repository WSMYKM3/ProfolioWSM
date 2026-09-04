'use client';

import Link from 'next/link';
import Image from 'next/image';
import TopNav from '@/app/components/TopNav';
import ResumeSidebar from '@/app/components/ResumeSidebar';
import { getPublicAssetUrl } from '@/app/lib/publicAsset';

const resumeSections = [
  { id: 'profile', label: 'Profile' },
  { id: 'projects', label: 'AI Builder / Product Practice' },
  { id: 'experience', label: 'Professional Experience' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'education', label: 'Education & Certification' },
];

const resumeFile = '/Siming_Wang_AI_Builder Resume.pdf';

const capabilityGroups = [
  {
    title: 'AI Building',
    tools: [
      { label: 'Claude Code', icon: '/icons/claude.svg' },
      { label: 'Codex' },
      { label: 'Generative AI' },
      { label: 'ComfyUI' },
      { label: 'Multimodal Workflows' },
    ],
  },
  {
    title: 'Code & Integration',
    tools: [
      { label: 'Python', icon: '/icons/python.svg' },
      { label: 'TypeScript / JavaScript' },
      { label: 'React Native' },
      { label: 'Swift', icon: '/icons/swift-svgrepo-com.svg' },
      { label: 'C#' },
      { label: 'REST APIs' },
      { label: 'Computer Vision' },
    ],
  },
  {
    title: 'Product & Creator',
    tools: [
      { label: 'MVP Prototyping' },
      { label: 'Product Thinking' },
      { label: 'Figma', icon: '/icons/figma.svg' },
      { label: 'Xiaohongshu' },
      { label: 'Bilibili' },
      { label: 'YouTube' },
    ],
  },
  {
    title: 'Interactive & Spatial',
    tools: [
      { label: 'Unity', icon: '/icons/unity.svg' },
      { label: 'Unreal Engine', icon: '/icons/unrealengine.svg' },
      { label: 'TouchDesigner', icon: '/icons/touchdesigner.svg' },
      { label: 'ARKit' },
      { label: 'RealityKit' },
      { label: 'Meta Quest', icon: '/icons/meta.svg' },
      { label: 'Blender', icon: '/icons/blender.svg' },
      { label: 'After Effects' },
    ],
  },
];

export default function Resume() {
  return (
    <div className="layout">
      <TopNav />
      <ResumeSidebar sections={resumeSections} />

      <main className="resume-page portfolio-light-surface">
        <div className="resume-container">
          <div className="resume-content">
            <section id="profile" className="resume-section resume-profile-section">
              <div className="resume-profile-header">
                <div>
                  <h1 className="resume-name">Siming Wang</h1>
                  <p className="resume-title">
                    AI Builder | Hackathon Winner | AI Products · Creator Tools · Rapid Prototyping
                  </p>
                </div>
                <a
                  href={getPublicAssetUrl(resumeFile)}
                  download="Siming_Wang_AI_Builder Resume.pdf"
                  className="resume-download-button resume-profile-download"
                >
                  Download Resume
                </a>
              </div>

              <div className="resume-contact-details">
                <p><a className="resume-social-link" href="mailto:simingvv@gmail.com">simingvv@gmail.com</a></p>
                <div className="resume-social-links">
                  <Link className="resume-social-link" href="/">Portfolio</Link>
                  <a className="resume-social-link" href="https://uk.linkedin.com/in/siming-wang-321a18303" target="_blank" rel="noreferrer">LinkedIn</a>
                  <a className="resume-social-link" href="https://www.youtube.com/@WSMYKM3/videos" target="_blank" rel="noreferrer">YouTube</a>
                  <a className="resume-social-link" href="https://www.xiaohongshu.com/user/profile/5f200b2d00000000010096b9" target="_blank" rel="noreferrer">Xiaohongshu</a>
                  <a className="resume-social-link" href="https://space.bilibili.com/385278888" target="_blank" rel="noreferrer">Bilibili</a>
                </div>
              </div>

              <div className="resume-profile-content">
                <h2 className="resume-section-title">Profile</h2>
                <p className="resume-profile-text">
                  AI Builder and hackathon winner focused on AI-native products and creator tools. I find problems in real user behavior and creative workflows, use AI coding and multimodal workflows to build working MVPs quickly, then keep iterating through demos, content, and feedback.
                </p>
              </div>
            </section>

            <section id="projects" className="resume-section">
              <h2 className="resume-section-title">AI Builder / Product Practice</h2>
              <div className="resume-projects-list">
                <article className="resume-project-item">
                  <div className="resume-project-header">
                    <h3 className="resume-project-title">
                      <Link href="/projects/post-7">Reroll - AI Creator Tool / AR Directing Prototype</Link>
                    </h3>
                    <span className="resume-project-tech">KXSB AI Community</span>
                  </div>
                  <p className="resume-project-description">
                    3D previs has validated the need for directorial control, but non-3D users still have to build a scene first. Starting from one reference image, I use segmentation and depth estimation with iPhone AR to move objects, plan camera moves, and generate prompts for AI video.
                  </p>
                  <div className="resume-project-tools">
                    {['SwiftUI', 'ARKit', 'RealityKit', 'Python', 'SAM 3', 'DPT', 'Generative Video'].map((tool) => (
                      <span className="resume-project-tool" key={tool}>{tool}</span>
                    ))}
                  </div>
                </article>

                <article className="resume-project-item">
                  <div className="resume-project-header">
                    <h3 className="resume-project-title">
                      <Link href="/projects/post-2">Signie - XR / AI Product Prototype</Link>
                    </h3>
                    <span className="resume-project-tech">XR-Cohort Hackathon Winner · AWE USA 2025 Award Winner & Presenter</span>
                  </div>
                  <p className="resume-project-description">
                    Starting from the feedback gap in ASL learning - learners can understand a demonstration but struggle to judge whether they performed it correctly - I built an XR learning and real-time translation prototype from zero to one. It combines gesture recognition, micro-gestures, speech recognition, and an animation state machine in Unity and Meta Quest, and was iterated into the version presented at AWE USA 2025.
                  </p>
                  <div className="resume-project-tools">
                    {['Unity 6', 'Meta Quest', 'Wit.ai', 'Hand Tracking', 'Micro-Gestures'].map((tool) => (
                      <span className="resume-project-tool" key={tool}>{tool}</span>
                    ))}
                  </div>
                </article>

                <article className="resume-project-item">
                  <div className="resume-project-header">
                    <h3 className="resume-project-title">
                      <Link href="/projects/post-10">Could’ve - Consumer Product MVP</Link>
                    </h3>
                    <span className="resume-project-tech">iOS Prototype · Product Thinking</span>
                  </div>
                  <p className="resume-project-description">
                    Inspired by Korea’s dopamine site FoodNeverArrives, I turned the lack of immediate reward after resisting a purchase into a working MVP. Skipped purchases become an accumulating balance, while rewards, spending thresholds, weekly reviews, and links to real apps create a save, choose, then spend loop.
                  </p>
                  <div className="resume-project-tools">
                    {['React Native', 'Expo', 'TypeScript', 'Local-first', 'Swift'].map((tool) => (
                      <span className="resume-project-tool" key={tool}>{tool}</span>
                    ))}
                  </div>
                </article>

                <article className="resume-project-item">
                  <div className="resume-project-header">
                    <h3 className="resume-project-title">
                      <Link href="/projects/post-3">I AND AI: MIRROR - Interactive AI Installation</Link>
                    </h3>
                    <span className="resume-project-tech">Immersive Arts UK-supported</span>
                  </div>
                  <p className="resume-project-description">
                    To solve multi-system state synchronization and reliability problems in live AI interaction, I built a voice-triggered OSC state machine with Unreal Engine MetaHuman and TouchDesigner. During a three-day public exhibition at Inspace Edinburgh, the installation recorded 422 interactions and 287 completed experiences.
                  </p>
                  <div className="resume-project-tools">
                    {['Unreal Engine', 'MetaHuman', 'TouchDesigner', 'Python', 'OSC'].map((tool) => (
                      <span className="resume-project-tool" key={tool}>{tool}</span>
                    ))}
                  </div>
                </article>
              </div>
            </section>

            <section id="experience" className="resume-section">
              <h2 className="resume-section-title">Professional Experience</h2>
              <div className="resume-experience-list">
                <article className="resume-experience-item">
                  <div className="resume-experience-header">
                    <h3 className="resume-experience-title">XR Engineer (Project-based, Full-time)</h3>
                    <span className="resume-experience-period">Mar 2026 - Jun 2026</span>
                  </div>
                  <p className="resume-experience-company">TeknTrash Robotics · London / Remote</p>
                  <ul className="resume-experience-description">
                    <li>Mapped XR control and data-collection problems from robot-operator workflows into a headset interface, real-time control, and testing process, then completed platform integration and iterative validation.</li>
                  </ul>
                </article>

                <article className="resume-experience-item">
                  <div className="resume-experience-header">
                    <h3 className="resume-experience-title">Technical Artist / Creative Technologist (Freelance)</h3>
                    <span className="resume-experience-period">Mar 2025 - Jan 2026</span>
                  </div>
                  <p className="resume-experience-company">6Liè Projects · UK / Remote</p>
                  <ul className="resume-experience-description">
                    <li>Turned exhibition concepts into testable real-time interaction modules, integrating Unreal Engine MetaHuman, TouchDesigner, Python voice components, and OSC while debugging system state and validating on-site reliability.</li>
                  </ul>
                </article>

                <article className="resume-experience-item">
                  <div className="resume-experience-header">
                    <h3 className="resume-experience-title">Visual Artist / Creative Technologist (Internship)</h3>
                    <span className="resume-experience-period">Sep 2021 - Jul 2022</span>
                  </div>
                  <p className="resume-experience-company">Shanghai Chaomo Studio · Shanghai</p>
                  <ul className="resume-experience-description">
                    <li>Built interactive and generative prototypes rapidly with JavaScript and Python in response to exhibition narratives and on-site interaction needs, then iterated the visual system and interaction experience.</li>
                  </ul>
                </article>
              </div>
            </section>

            <section id="capabilities" className="resume-section">
              <h2 className="resume-section-title">Capabilities</h2>
              <div className="resume-tools-content">
                {capabilityGroups.map((group) => (
                  <div className="resume-tools-group" key={group.title}>
                    <h3 className="resume-tools-group-title">{group.title}</h3>
                    <div className="resume-tools-grid">
                      {group.tools.map((tool) => (
                        <span className="resume-tool-item" key={tool.label}>
                          {tool.icon && (
                            <Image
                              src={getPublicAssetUrl(tool.icon)}
                              alt=""
                              width={20}
                              height={20}
                              className="resume-tool-icon"
                            />
                          )}
                          {tool.label}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="education" className="resume-section">
              <h2 className="resume-section-title">Education & Certification</h2>
              <div className="resume-education-list">
                <article className="resume-education-item">
                  <h3 className="resume-education-degree">MFA Computational Arts</h3>
                  <p className="resume-education-school">Goldsmiths, University of London</p>
                  <p className="resume-education-details">2022 - 2024</p>
                </article>
                <article className="resume-education-item">
                  <h3 className="resume-education-degree">BA Visual Communication Design</h3>
                  <p className="resume-education-school">East China University of Science and Technology</p>
                  <p className="resume-education-details">2019 - 2022</p>
                </article>
                <article className="resume-education-item resume-certificate-item">
                  <Image
                    src={getPublicAssetUrl('/harvardx-logo.png')}
                    alt="HarvardX"
                    width={259}
                    height={50}
                    className="resume-certificate-logo"
                  />
                  <h3 className="resume-education-degree">HarvardX / edX Verified Certificate</h3>
                  <p className="resume-education-school">Machine Learning and AI with Python (CS109xa)</p>
                  <p className="resume-education-details">
                    Aug 2026 · <a className="resume-social-link" href="https://courses.edx.org/certificates/6d4b237aa2264298a998a6c645fd9718" target="_blank" rel="noreferrer">Credential</a>
                  </p>
                </article>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
