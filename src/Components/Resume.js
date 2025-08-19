import { useFormState } from 'react-dom';
import React from 'react'

export default function Resume() {

    const isMobile = window.innerWidth <= 768; // ✅ Detect mobile screen width

    const maincontainer = {
        display: 'flex',
        flexWrap: 'wrap',                // ✅ Allow columns to stack on mobile
        width: '100%',
        alignItems: 'stretch',           // ✅ Ensure equal height columns
        position: 'relative',            // ✅ Needed for absolute vertical divider
    };

    const column1 = {
        flex: isMobile ? '100%' : '1',   // ✅ Full width on mobile
        width: isMobile ? '100%' : 'auto',
        padding: '20px',
        boxSizing: 'border-box',
        position: 'relative',
        // height: '100%',               // ❌ Not needed
    };

    const column2 = {
        flex: isMobile ? '100%' : '2',   // ✅ Full width on mobile
        width: isMobile ? '100%' : 'auto',
        padding: '20px',
        boxSizing: 'border-box',
        paddingLeft: isMobile ? '20px' : '30px', // ✅ Less padding on mobile
        // height: '100%',              // ❌ Not needed
        // borderLeft: '2px solid #ccc', // ❌ Replaced with custom divider
    };

    return (
        <div className="resume-container max-w-4xl mx-3 p-6 shadow-md rounded-md">
            <div className='flex' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <h1 className="text-3xl font-bold mb-6" style={{ color: '#1A1A40' }}>Resume</h1>
                <a
                    href={`${process.env.PUBLIC_URL}/resume.pdf`}
                    download="Prashant Resume.pdf"
                    className="inline-block mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
                    style={{ top: '8px' }}
                >
                    Download Resume (PDF)
                </a>
            </div>
            <hr />

            <div style={maincontainer}>
                <div style={column1}>
                    {/* Vertical divider */}

                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: '2px',
                            height: '100%',
                            backgroundColor: '#ccc',
                        }}
                    />

                    {/* Contact */}
                    <section>
                        <h2 className="text-2xl font-semibold border-b pb-1 mb-3">Contact</h2>
                        <p>Email: abc@gmail.com</p>
                        <p>Phone: +91 xxxxxxxxxx</p>
                        <p>LinkedIn: <a href="https://linkedin.com/in/xxxxxxxxx" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">linkedin.com/in/xxxxxxxxx</a></p>
                    </section>

                    <section className="">
                        <h2 className="text-2xl font-semibold border-b pb-1 mb-3">Education</h2>
                        <ul className="list-disc list-inside ml-4">
                            <li>
                                <strong>Bachelor of Management Studies</strong> (2016 – 2019) <br />
                                Mumbai University <br />
                                GPA: 7.38
                            </li>
                            <li className="">
                                <strong>Masters of Management Studies in Marketing</strong> (2019 – 2021) <br />
                                VIVA Institute of Management & Research, Mumbai University <br />
                                GPA: 8.07
                            </li>
                        </ul>
                    </section>

                    {/* Skills */}
                    <section className="">
                        <h2 className="text-2xl font-semibold border-b pb-1 mb-3">Skills</h2>

                        <h3 className="font-semibold mt-2">Hard Skills</h3>
                        <ul className="list-disc list-inside ml-4">
                            <li>WordPress: Landing Page, Sign up Page & Blogs</li>
                            <li>Adobe Photoshop: Display Ads</li>
                            <li>Blender: 3D Modeling</li>
                            <li>Microsoft Office: Word, Excel, PowerPoint</li>
                            <li>Filmora Go: Video Editing</li>
                            <li>Aurora: Proficient in smart 3D roof design (self-taught)</li>
                        </ul>

                        <h3 className="font-semibold mt-4">Soft Skills</h3>
                        <ul className="list-disc list-inside ml-4">
                            <li>Observation</li>
                            <li>Communication</li>
                            <li>Decision making</li>
                            <li>Multi-tasking</li>
                            <li>Critical thinking</li>
                        </ul>
                    </section>
                </div>

                <div className="vertical-divider" style={column2}>
                    {/* Career Objective */}
                    <section className="">
                        <h2 className="text-2xl font-semibold border-b pb-1 mb-3">Career Objective</h2>
                        <p>
                            Passionate about design and creative communication, with hands-on experience in crafting visual content using Photoshop, Blender, and modern AI tools. Skilled in producing marketing materials, display ads, and client-support documents such as quotations. Experienced in client documentation including proposal and tax invoices. Eager to contribute to a dynamic team and grow in a fast-paced, design-driven environment.
                        </p>
                    </section>

                    {/* Summary */}
                    {/* <section className="mb-6">
                        <h2 className="text-2xl font-semibold border-b pb-1 mb-3">Summary</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam pariatur tenetur quas obcaecati vel, atque commodi mollitia nihil aut. Blanditiis harum repellendus iste vel ad similique doloremque, est debitis dolor sed recusandae quasi nemo!</p>
                    </section> */}

                    {/* Summer Internship Project */}
                    <section className="">
                        <h2 className="text-2xl font-semibold border-b pb-1 mb-3">Summer Internship Project</h2>
                        <h3 className="font-semibold">Project Title:</h3>
                        <p>A Study on Marketing Strategies of Amazon</p>
                        <p>A Study on Online Shopping and Indian Society.</p>
                        <h3 className="font-semibold mt-2">Description:</h3>
                        <p>
                            The attempt is to study the marketing strategies of Amazon and its impact on its customers, and also to study the marketing objectives with respect to targeting, segmenting and positioning.
                        </p>
                    </section>

                    {/* Experience */}
                    <section className="">
                        <h2 className="text-2xl font-semibold border-b pb-1 mb-3">Experience</h2>
                        <p><strong>Administrative Coordinator & Marketing Executive</strong></p>
                        <p>PKJ Electronics Security Systems & Services</p>
                        <p><em>August 2021 – Present</em></p>
                        <p className="mt-2"><strong>Responsibilities:</strong></p>
                        <ul className="list-disc list-inside ml-4">
                            <li>Customer communication</li>
                            <li>Quotation, invoicing, follow-up on payments</li>
                            <li>Designing, website development, digital marketing</li>
                        </ul>
                    </section>

                    {/* Certifications */}
                    <section className="">
                        <h2 className="text-2xl font-semibold border-b pb-1 mb-3">Certifications</h2>
                        <ul className="list-disc list-inside ml-4">
                            <li>Google Digital Garage | The Fundamentals of Digital Marketing</li>
                            <li>Google Digital Garage | Feb 2024 | Google Analytics (GA4)</li>
                            <li>SEMrush | Jan 2024 | Mastering YouTube Search Trends and SEO Strategies</li>
                        </ul>
                    </section>

                    {/* Projects */}
                </div>
            </div>
        </div>
    )
}