'use client';

import { useSketchUnderlineAnimation, SketchUnderline } from '@/app/components/SketchUnderline';
import TopNav from '@/app/components/TopNav';
import ResumeSidebar from '@/app/components/ResumeSidebar';
import Image from 'next/image';

// Helper function to add basePath for GitHub Pages
// Uses runtime detection to work correctly in both dev and production
function getImageSrc(src: string): string {
  // If it's already a full URL (http/https), return as is
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  // Detect basePath from current location (runtime detection)
  // This works correctly in both development and GitHub Pages
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname;
    const basePath = pathname.startsWith('/ProfolioWSM') ? '/ProfolioWSM' : '';
    return src.startsWith('/') ? `${basePath}${src}` : `${basePath}/${src}`;
  }
  // Fallback for SSR (shouldn't happen in static export, but safe fallback)
  const basePath = process.env.NODE_ENV === 'production' ? '/ProfolioWSM' : '';
  return src.startsWith('/') ? `${basePath}${src}` : `${basePath}/${src}`;
}

const resumeSections = [
  { id: 'awards', label: 'Awards & Exhibitions' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Selected Projects' },
  { id: 'skills', label: 'Core Skills' },
  { id: 'education', label: 'Education' },
  { id: 'tools', label: 'Tools & Technologies' },
];

export default function Resume() {
  useSketchUnderlineAnimation();

  return (
    <div className="layout">
      <TopNav />
      <ResumeSidebar sections={resumeSections} />
      <main className="resume-page">
        <div className="resume-container">
          <div className="resume-content">
            {/* Awards & Exhibitions Section */}
            <section id="awards" className="resume-section">
              <h2 className="resume-section-title">Awards & Exhibitions</h2>
              <div className="resume-awards-list">
                <div className="resume-award-item">
                  <h3 className="resume-award-name">
                    Speaker, <SketchUnderline color="orange">AWE USA 2025</SketchUnderline>
                  </h3>
                  <p className="resume-award-project">
                    Project &quot;<SketchUnderline color="purple">Signie</SketchUnderline>&quot;
                  </p>
                </div>
                <div className="resume-award-item">
                  <h3 className="resume-award-name">
                    <SketchUnderline color="green">Immersive Arts UK</SketchUnderline>-supported Pop-up Exhibition
                  </h3>
                  <p className="resume-award-project">
                    Project &quot;<SketchUnderline color="orange">I AND AI: MIRROR</SketchUnderline>&quot; (Inspace,
                    Edinburgh)
                  </p>
                </div>
              </div>
            </section>

            {/* Professional Experience Section */}
            <section id="experience" className="resume-section">
              <h2 className="resume-section-title">Professional Experience</h2>
              <div className="resume-experience-list">
                <div className="resume-experience-item">
                  <div className="resume-experience-header">
                    <h3 className="resume-experience-title">XR Engineer</h3>
                    <span className="resume-experience-period">Mar 2026 – Present · 2 mos</span>
                  </div>
                  <p className="resume-experience-company">
                    TeknTrash Robotics · Part-time · London Area, United Kingdom · Remote
                  </p>
                  <ul className="resume-experience-description">
                    <li>
                      Led the development of{' '}
                      <SketchUnderline color="blue" path="M 2 6 Q 45 2, 100 7 T 198 4">
                        XR applications
                      </SketchUnderline>{' '}
                      for robotic systems, enhancing human-robot interaction.
                    </li>
                    <li>
                      Integrated XR hardware with robotic platforms to achieve{' '}
                      <SketchUnderline color="green" path="M 3 5 Q 55 9, 105 3 Q 155 8, 197 5">
                        real-time control
                      </SketchUnderline>{' '}
                      and responsiveness.
                    </li>
                    <li>
                      Built{' '}
                      <SketchUnderline color="purple" path="M 2 4 Q 70 9, 130 3 Q 170 8, 198 5">
                        Vision-Language-Action (VLA)
                      </SketchUnderline>{' '}
                      models using XR data, improving robotic perception and{' '}
                      <SketchUnderline color="orange" path="M 3 6 Q 50 2, 95 7 Q 150 3, 197 6">
                        multimodal learning
                      </SketchUnderline>
                      .
                    </li>
                    <li>
                      Collaborated cross-functionally, maintaining documentation to accelerate development and team
                      efficiency.
                    </li>
                  </ul>
                </div>
                <div className="resume-experience-item">
                  <div className="resume-experience-header">
                    <h3 className="resume-experience-title">Technical Artist / Creative Technologist (Freelance)</h3>
                    <span className="resume-experience-period">Mar 2025 – Jan 2026</span>
                  </div>
                  <p className="resume-experience-company">6Liè Projects · Remote (UK)</p>
                  <ul className="resume-experience-description">
                    <li>
                      Developed{' '}
                      <SketchUnderline color="green" path="M 2 4 Q 70 9, 130 3 Q 170 8, 198 5">
                        real-time interactive systems
                      </SketchUnderline>{' '}
                      using Unreal Engine for immersive and{' '}
                      <SketchUnderline color="blue">XR</SketchUnderline> projects.
                    </li>
                    <li>
                      Contributed to{' '}
                      <SketchUnderline color="orange" path="M 2 4 Q 70 9, 130 3 Q 170 8, 198 5">
                        UKRI Immersive Tech Network
                      </SketchUnderline>{' '}
                      and Immersive Arts supported works.
                    </li>
                    <li>
                      Integrated <SketchUnderline color="purple">AI-driven</SketchUnderline> components into real-time
                      pipelines.
                    </li>
                  </ul>
                </div>
                <div className="resume-experience-item">
                  <div className="resume-experience-header">
                    <h3 className="resume-experience-title">Visual Artist / Creative Technologist (Internship)</h3>
                    <span className="resume-experience-period">Sep 2021 – Jul 2022</span>
                  </div>
                  <p className="resume-experience-company">Shanghai Chaomo Studio · Shanghai, China</p>
                  <ul className="resume-experience-description">
                    <li>
                      Built{' '}
                      <SketchUnderline color="blue" path="M 2 4 Q 70 9, 130 3 Q 170 8, 198 5">
                        interactive and generative prototypes
                      </SketchUnderline>{' '}
                      using JavaScript and Python.
                    </li>
                    <li>
                      Designed visual systems for thematic{' '}
                      <SketchUnderline color="pink" path="M 3 5 Q 55 9, 105 3 Q 155 8, 197 5">
                        exhibitions and installations
                      </SketchUnderline>
                      .
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Selected Project Experience Section */}
            <section id="projects" className="resume-section">
              <h2 className="resume-section-title">Selected Project Experience</h2>
              <div className="resume-projects-list">
                <div className="resume-project-item">
                  <div className="resume-project-header">
                    <h3 className="resume-project-title">Signie — Shippable XR / AI Product (AWE USA 2025)</h3>
                  </div>
                  <p className="resume-project-description">
                    Designed and shipped a{' '}
                    <SketchUnderline color="orange" path="M 2 4 Q 70 9, 130 3 Q 170 8, 198 5">
                      real-world XR product
                    </SketchUnderline>{' '}
                    enabling real-time interaction and translation workflows.
                  </p>
                  <ul className="resume-project-features">
                    <li>
                      Built real-time interaction logic, animation pipelines, and system-level workflows using Unity /
                      Unreal Engine to support responsive, user-driven experiences.
                    </li>
                    <li>
                      Integrated <SketchUnderline color="purple">AI-driven</SketchUnderline> components to support
                      adaptive real-time behavior and deployment-ready product use.
                    </li>
                  </ul>
                </div>
                <div className="resume-project-item">
                  <div className="resume-project-header">
                    <h3 className="resume-project-title">Datnie</h3>
                  </div>
                  <p className="resume-project-description">
                    Developed a product-style XR prototype exploring real-time,{' '}
                    <SketchUnderline color="green" path="M 3 6 Q 50 2, 95 7 Q 150 3, 197 6">
                      gesture-driven interaction
                    </SketchUnderline>{' '}
                    within a scalable experience framework.
                  </p>
                  <ul className="resume-project-features">
                    <li>Implemented interaction systems, animation logic, and real-time visual feedback using game engine-based pipelines.</li>
                    <li>
                      Designed for <SketchUnderline color="blue">scalability</SketchUnderline> and system behavior,
                      beyond one-off visual demos.
                    </li>
                  </ul>
                </div>
                <div className="resume-project-item">
                  <div className="resume-project-header">
                    <h3 className="resume-project-title">I AND AI: MIRROR — Immersive Interactive Installation (Inspace, Edinburgh)</h3>
                  </div>
                  <p className="resume-project-description">
                    Created an{' '}
                    <SketchUnderline color="orange" path="M 2 4 Q 70 9, 130 3 Q 170 8, 198 5">
                      immersive interactive installation
                    </SketchUnderline>{' '}
                    integrating spatial interaction, real-time graphics, and multimedia systems.
                  </p>
                  <ul className="resume-project-features">
                    <li>
                      Built a virtual avatar using Unreal Engine{' '}
                      <SketchUnderline color="purple">MetaHuman</SketchUnderline>, implementing real-time lip sync to
                      enable embodied digital communication and interaction.
                    </li>
                    <li>
                      Designed a state-driven interaction system in{' '}
                      <SketchUnderline color="green">TouchDesigner</SketchUnderline>, using wake-word detection to
                      control avatar behavior and interaction flow.
                    </li>
                    <li>Exhibited with support from Immersive Arts UK at Inspace, Edinburgh.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Core Skills Section */}
            <section id="skills" className="resume-section">
              <h2 className="resume-section-title">Core Skills</h2>
              <ul className="resume-skills-list">
                <li>
                  Creative Technology &{' '}
                  <SketchUnderline color="orange">XR Development</SketchUnderline>
                </li>
                <li>
                  <SketchUnderline color="blue" path="M 2 4 Q 70 9, 130 3 Q 170 8, 198 5">
                    Real-Time Interactive Systems
                  </SketchUnderline>
                </li>
                <li>
                  <SketchUnderline color="green" path="M 3 5 Q 55 9, 105 3 Q 155 8, 197 5">
                    Prototyping & Product-Oriented Development
                  </SketchUnderline>
                </li>
                <li>
                  <SketchUnderline color="purple" path="M 2 4 Q 70 9, 130 3 Q 170 8, 198 5">
                    Interactive Installation & Immersive Experience Design
                  </SketchUnderline>
                </li>
              </ul>
            </section>

            {/* Education Section */}
            <section id="education" className="resume-section">
              <h2 className="resume-section-title">Education</h2>
              <div className="resume-education-list">
                <div className="resume-education-item">
                  <h3 className="resume-education-degree">MFA Computational Arts</h3>
                  <p className="resume-education-school">Goldsmiths, University of London</p>
                  <p className="resume-education-details">2022–2024</p>
                </div>
                <div className="resume-education-item">
                  <h3 className="resume-education-degree">BA Visual Communication Design</h3>
                  <p className="resume-education-school">East China University of Science and Technology</p>
                  <p className="resume-education-details">2019–2022</p>
                </div>
              </div>
            </section>

            {/* Tools & Technologies Section */}
            <section id="tools" className="resume-section">
              <h2 className="resume-section-title">Tools & Technologies</h2>
              <div className="resume-tools-content">
                <div className="resume-tools-group">
                  <h3 className="resume-tools-group-title">Development & Design</h3>
                  <div className="resume-tools-grid">
                    <span className="resume-tool-item">
                      <Image src={getImageSrc("/icons/github.svg")} alt="GitHub" width={20} height={20} className="resume-tool-icon" />
                      GitHub
                    </span>
                    <span className="resume-tool-item">
                      <Image src={getImageSrc("/icons/figma.svg")} alt="Figma" width={20} height={20} className="resume-tool-icon" />
                      Figma
                    </span>
                    <span className="resume-tool-item">
                      <Image src={getImageSrc("/icons/claude.svg")} alt="Claude" width={20} height={20} className="resume-tool-icon" />
                      <Image src={getImageSrc("/icons/obsidian.svg")} alt="Obsidian" width={20} height={20} className="resume-tool-icon" />
                      Claude + Obsidian
                    </span>
                    <span className="resume-tool-item">
                      <Image src={getImageSrc("/icons/photoshop.svg")} alt="Photoshop" width={20} height={20} className="resume-tool-icon" />
                      Photoshop
                    </span>
                    <span className="resume-tool-item">
                      <Image src={getImageSrc("/icons/adobe-premiere.svg")} alt="Premiere Pro" width={20} height={20} className="resume-tool-icon" />
                      Premiere Pro
                    </span>
                  </div>
                </div>
                <div className="resume-tools-group">
                  <h3 className="resume-tools-group-title">Game Engines</h3>
                  <div className="resume-tools-grid">
                    <span className="resume-tool-item">
                      <Image src={getImageSrc("/icons/unity.svg")} alt="Unity" width={20} height={20} className="resume-tool-icon" />
                      Unity (URP, Animation, VFX, XR Interaction Toolkit)
                    </span>
                    <span className="resume-tool-item">
                      <Image src={getImageSrc("/icons/unrealengine.svg")} alt="Unreal Engine" width={20} height={20} className="resume-tool-icon" />
                      Unreal Engine (Blueprints, C++)
                    </span>
                  </div>
                </div>
                <div className="resume-tools-group">
                  <h3 className="resume-tools-group-title">Creative Tools</h3>
                  <div className="resume-tools-grid">
                    <span className="resume-tool-item">
                      <Image src={getImageSrc("/icons/touchdesigner.svg")} alt="TouchDesigner" width={20} height={20} className="resume-tool-icon" />
                      TouchDesigner
                    </span>
                    <span className="resume-tool-item">Houdini & Houdini Engine (UE / Unity)</span>
                    <span className="resume-tool-item">
                      <Image src={getImageSrc("/icons/blender.svg")} alt="Blender" width={20} height={20} className="resume-tool-icon" />
                      Blender
                    </span>
                    <span className="resume-tool-item">Maya</span>
                    <span className="resume-tool-item">
                      <Image src={getImageSrc("/icons/motion builder.svg")} alt="MotionBuilder" width={20} height={20} className="resume-tool-icon" />
                      MotionBuilder
                    </span>
                  </div>
                </div>
                <div className="resume-tools-group">
                  <h3 className="resume-tools-group-title">Programming Languages</h3>
                  <div className="resume-tools-grid">
                    <span className="resume-tool-item">C#</span>
                    <span className="resume-tool-item">
                      <Image src={getImageSrc("/icons/python.svg")} alt="Python" width={20} height={20} className="resume-tool-icon" />
                      Python
                    </span>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
