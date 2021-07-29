/*
 * RegisterPage Messages
 *
 * This contains all the text for the RegisterPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.RegisterPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Register participant account',
  },
  register: {
    id: `${scope}.register`,
    defaultMessage: 'Register',
  },
  login: {
    id: `${scope}.login`,
    defaultMessage: 'I already have an account',
  },
  firstNameLabel: {
    id: `${scope}.firstNameLabel`,
    defaultMessage: 'First Name',
  },
  firstName: {
    id: `${scope}.firstName`,
    defaultMessage: 'Enter first name',
  },
  lastNameLabel: {
    id: `${scope}.lastNameLabel`,
    defaultMessage: 'Last name',
  },
  lastName: {
    id: `${scope}.lastName`,
    defaultMessage: 'Enter last name',
  },
  emailLabel: {
    id: `${scope}.emailLabel`,
    defaultMessage: 'E-mail address',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Enter e-mail address',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Enter password',
  },
  passwordLabel: {
    id: `${scope}.passwordLabel`,
    defaultMessage: 'Password',
  },
  confirmPasswordLabel: {
    id: `${scope}.confirmPasswordLabel`,
    defaultMessage: 'Password confirmation',
  },
  confirmPassword: {
    id: `${scope}.confirmPassword`,
    defaultMessage: 'Retype your password',
  },
  validEmail: {
    id: `${scope}.validEmail`,
    defaultMessage: 'Provide valid email',
  },
  emailRequired: {
    id: `${scope}.emailRequired`,
    defaultMessage: 'Email is required',
  },
  passwordRequired: {
    id: `${scope}.passwordRequired`,
    defaultMessage: 'Password is required',
  },
  passwordLength: {
    id: `${scope}.passwordLength`,
    defaultMessage: 'Password must have at least {length} characters',
  },
  passwordInvalid: {
    id: `${scope}.passwordInvalid`,
    defaultMessage:
      "Password must contain capital letter, small letter, digit and special character (for example !@#$%^&*\"-+=`~:;|',.?\\\\/[]()<>'{}')",
  },
  passwordMatch: {
    id: `${scope}.passwordMatch`,
    defaultMessage: 'Password must match',
  },
  firstNameRequired: {
    id: `${scope}.firstNameRequired`,
    defaultMessage: 'First name is required',
  },
  lastNameRequired: {
    id: `${scope}.lastNameRequired`,
    defaultMessage: 'First name is required',
  },
  createdAccount: {
    id: `${scope}.createdAccount`,
    defaultMessage: 'Your account has been created',
  },
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'Registration',
  },
  headerInvite: {
    id: `${scope}.headerInvite`,
    defaultMessage: 'Register {role} account',
  },
  termsRequired: {
    id: `${scope}.termsRequired`,
    defaultMessage: 'You need to accept Terms and conditions & Privacy Policy',
  },
  termsAndConditions: {
    id: `${scope}.termsAndConditions`,
    defaultMessage: 'Terms and conditions & Privacy Policy',
  },
  termsAndConditionsParticipantText: {
    id: `${scope}.termsAndConditionsParticipantText`,
    defaultMessage: `
<h2>APPLICATION END-USER TERMS OF USE</h2>
<p>
    The following Terms of Use apply to the use of any program made using the Computerized Intervention Authoring System, version 3.0 (CIAS; “Application”) by User/you. By accepting these Terms of Use or using the Application, you agree
    that you have received, read, understood, and agree to be bound by the terms and conditions contained herein, and subsequent amendments thereto, as well as the laws, rules, and regulations now existing or which may hereafter be enacted,
    issued or enforced.
</p>
<p>
    Please read these Terms of Use carefully before using the Application. These Terms of Use govern your access and use of the Application and the services available on the Application. CIAS (referred to as "us," "our," or "we") reserves
    the right to make changes to the Application and to these Terms of Use at any time without prior notice.
</p>

<h3>1. Intellectual Property Rights</h3>
<p>
    CIAS is owned by Michigan State University (MSU) and Wayne State University (WSU) (together the “Universities”). You may not modify, copy, reproduce, republish, upload, post, transmit, translate, sell, create derivative works, exploit,
    or distribute in any manner or medium (including by email or other electronic means), the Application or any material from the Application unless explicitly authorized in these Terms of Use.
</p>
<p>
    You acknowledge that all rights, title and interest in and to the Application, together with its codes, derivative works, organization, structure, interfaces, any documentation, data, trade names, trademarks, trade secrets, proprietary
    information or other related materials is, and at all times shall remain University’s’ sole and exclusive property. Except the right to use the Application, as expressly provided herein, these Terms of Use do not grant you any rights
    to, or in, patents, copyrights, database rights, trade secrets, trade names, trademarks (whether registered or unregistered) or any other rights or licenses with respect to the Application.
</p>
<p>
    The CIAS name, the Application and all related names, logos, product and service names, designs and slogans are copyright and trademarks belonging to the Universities. You must not use such marks without our prior written permission.
    All other names, logos, product and service names, designs and slogans on this Application are the trademarks of their respective owners.
</p>

<h3>2. The Agreement</h3>
<p>
    These Terms of Use are an agreement between you and us. It details our obligations to you and it highlights certain risks on using our services and you must consider such risks carefully as you will be bound by the provision of this
    Terms of Use through your use of this Application. Upon agreeing to these Terms of Use, we grant you the non-exclusive, non-transferrable right and license to use this program. You must not:
</p>
<ul>
    <li>Republish material from CIAS</li>
    <li>Sell, rent or sub-license material from CIAS</li>
    <li>Reproduce, duplicate or copy material from CIAS</li>
</ul>

<h3>3. Registration</h3>
<p>
    To access certain features on the Application, you may be required to provide your name and email address as part of the registration process. You agree to provide true, accurate, current and complete information about yourself as
    prompted by the applicable registration and you are responsible for keeping such information up-to date (this includes your contact information, so that we can reliably contact you). Also, you are to protect the confidentiality of your
    account password/passcode as we are not liable for any loss or damage arising from your failure to protect your password/passcode or account information.
</p>
<p>When you register an account on CIAS we will ask you for the following information:</p>
<ol type="a">
    <li>Your Name</li>
    <li>Email address</li>
    <li>Cell phone number (optional)</li>
</ol>

<h3>4. User Representation</h3>
<p>You shall not alter copy, modify or tamper with the Application as provided. You agree not to use the Application:</p>
<ol>
    <li>in any manner that could damage, disable, overburden, or impair the Application or servers or networks connected to the Application,</li>
    <li>in any manner that could interfere with any other party’s use and enjoyment of the Application or servers or networks connected to the Application.</li>
    <li>
        to upload, post, transmit, share or otherwise make available any material that contains software viruses or any other malicious or tracking computer code, files or programs designed to track, interrupt, destroy or limit the
        functionality of any computer software or hardware or telecommunications equipment or any information that infringes the intellectual property rights of others;
    </li>
    <li>to intimidate or harass another User;</li>
    <li>
        to upload, post, transmit, share, store or otherwise make available content that would constitute, encourage or provide instructions for a criminal offense, violate the rights of any party, or that would otherwise create liability
        or violate any state, national or international law;
    </li>
    <li>to use or attempt to use another's account, service or system without authorization from that person and from us or create a false identity on the Application.</li>
</ol>

<h3>5. Age Restriction</h3>
<p>
    In order to register for our services on the Application, you represent and warrant that: You either possess corporate legal personality, are at least 18 years of age and are legally able to enter into a binding contract, or are using
    this software with the permission of a parent or legal guardian.
</p>

<h3>6. Assignment</h3>
<p>
    You may not transfer or assign any rights or obligations you have under this Terms of Use without our prior written consent in its sole and absolute discretion. We reserve the right to transfer or assign this Terms of Use or any right
    or obligation under this Terms of Use at any time.
</p>

<h3>7. Communications and Notices to you</h3>
<p>
    By accepting these Terms of Use, you expressly consent to receive emails from us regarding program elements that you have not completed. You agree that we may also send you text messages if you voluntarily provide us with your cell
    phone number.
</p>

<h3>8. Suspension or Termination of Access</h3>
<p>We have the right to deny your access to, and suspend or terminate your access to, the Application for any reason, including for any violation by you of these Terms of Use.</p>

<h3>9. Limitation of Liability</h3>
<p>
    TO THE EXTENT NOT PROHIBITED BY APPLICABLE LAW, IN NO EVENT SHALL UNIVERSITIES BE LIABLE FOR ANY INCIDENTAL, SPECIAL, INDIRECT OR CONSEQUENTIAL DAMAGES AND LOSSES OF PROFITS ARISING OUT OF YOUR USE OF THE APPLICATION, INCLUDING WITHOUT
    LIMITATION, DAMAGES FOR LOSS OF PROFITS, CORRUPTION OR LOSS OF DATA OR INFORMATION, EVEN IF UNIVERSITIES HAVE BEEN ADVISED OR IS AWARE OF THE POSSIBILITY OF SUCH DAMAGES AND REGARDLESS OF THE THEORY OF LIABILITY (CONTRACT, TORT, OR
    OTHERWISE).
</p>
<p>
    As permitted by applicable law, the Universities will not be liable to any user for any loss or damage, even if foreseeable, arising under or in connection with the use of, or inability to use our Application and you hold the
    Universities harmless in respect of:
</p>
<ol type="i">
    <li>any loss of profits, loss of business, loss of revenue, loss of contracts, loss of goodwill, loss of anticipated earnings or savings (whether direct, indirect, incidental or consequential); or</li>
    <li>any loss of use or value or damage of any data or equipment (including software), wasted management, operation or other time (whether direct, indirect, incidental or consequential); or</li>
    <li>Any special, indirect, punitive, incidental or consequential loss, arising in connection therefrom.</li>
</ol>
<p>Universities shall not be liable for any unauthorized use of the Application, or the consequences thereof. Such unauthorized usage shall be entirely at your own risk.</p>

<h3>10. INDEMNITY</h3>
<p>
    You hereby agree and undertake to fully indemnify and keep the Universities harmless from and against all actions, claims, costs (including legal costs on a full indemnity basis), losses, charges, expenses and damages which we may
    suffer or incur as a result of:
</p>
<ul>
    <li>
        any fraud, negligence, dishonesty or misconduct (criminal or otherwise) relating to the transactions perpetrated by you, your servants, agents, employees or contractors or the fraud, dishonesty or misconduct (criminal or otherwise)
        perpetrated by a third party as a result of the negligence or default of you, your servants, agents, employees or contractors.
    </li>
    <li>any loss arising from any fraud or dishonesty arising from a breach of security of your software or hardware by a third party on the Application.</li>
</ul>
<p>
    You shall not hold the Universities liable or responsible for any action, claim, cost, expense, damage and loss, including consequential loss or damage or loss of profit, which you may suffer or incur as a result of a breakdown in the
    Application or when the Application is not available by reason of circumstances beyond our control or arising directly or indirectly out of your use of the Application.
</p>

<h3>11. General Disclaimer</h3>
<p>
    The services provided under this Application are provided to you "as is," without any representation or warranty, express or implied, of any kind, including, but not limited to, warranties of MERCHATABILITY, non-infringement, or
    FITNESSS FOR ANY PARTICULAR PURPOSE. The Universities do not warrant the accuracy or completeness of the CIAS application, the suitability of the content or the reliability of any advice, opinion, statement or other information
    displayed or distributed through the Application. The Universities give no assurance that the Application will meet any or all requirements you may have, whether or not advised to you. Furthermore, the Universities give no assurance
    that the running of the Application will be incessant, uninterrupted or error-free, that defects will be corrected, or that the Application is free of viruses or other harmful components. The Universities cannot guarantee and do not
    promise any specific results from use of our services via the Application.
</p>
<p>
    The Application and the service may be temporarily unavailable from time to time for maintenance or other reasons. The Universities assume no responsibility for any error, omission, interruption, deletion, defect, delay in operation or
    transmission, communications line failure, theft or destruction or unauthorized access to, or alteration of User communications. The Universities are not responsible for any problems or technical malfunction of any telephone network or
    lines, computer online systems, servers or providers, computer equipment, software, failure of email or players on account of technical problems or traffic congestion on the Internet or on the Application or combination thereof,
    including injury or damage to Users or to any other person's computer related to or resulting from participating or downloading materials in connection with the web and/or in connection with the service provided via the Application.
</p>

<h3>12. Force Majeure</h3>
<p>
    The Universities will not be liable for delay or for failure to perform our obligations if and to the extent such delay or failure results from circumstances including but not limited to acts of God, fire, flood, invasion, war,
    revolution, uprising, insurrection, social/public unrest, public disturbance, strike, riots, fire disaster, storm, acts of terrorism, plague, epidemic, pandemic, outbreaks of infectious disease or any other public health crisis,
    including quarantine or other employee restrictions, and any other circumstance which may hinder or delay the performance of our obligations under this Terms of Use.
</p>

<h3>13. Data Protection</h3>
<p>
    If you choose to use the Application, you agree to the collection and use of your Personal Data in accordance with the CIAS Privacy Policy. We will not use or share your personal information with anyone except as provided in the Privacy
    Policy.
</p>

<h3>14. Dispute Resolution</h3>
<p>
    If a dispute or difference arises as to the validity, interpretation, effects or rights and obligations of the Parties under this Agreement, the Parties shall use their best endeavor to reach an amicable settlement of dispute. All
    actions or proceedings related to these Terms of Use shall be litigated in state courts of competent jurisdiction located in the state of Michigan, United States of America. User consents and submits to the jurisdiction of any Michigan
    state court with competent jurisdiction and shall not bring any action or claim against MSU in any other jurisdiction.
</p>

<h3>15. Applicable Law</h3>
<p>These Terms of Use shall be governed and construed under the laws of the United States of America and the State of Michigan.</p>

<h3>16. Waiver and Severability</h3>
<p>
    Our failure to enforce a provision of these Terms is not a waiver of our right to do so later. If any provision of these Terms is found unenforceable, the remaining provisions of the Terms will remain in full effect and an enforceable
    term or terms will be substituted reflecting our intent as closely as possible.
</p>

<h3>17. Contact Us</h3>
<p>Any question regarding the use of the Application, or comments about the services provided via the Application or its contents should be directed to <a href="mailto:cias@msu.edu">cias@msu.edu</a>.</p>

<h3>18. Modifications</h3>
<p>
    We reserve the right to change, modify and update these Terms of Use at any time. Your continued use of the Application after any modifications to these Terms of Use shall mean you accept those modifications. Any aspect of the
    Application or the services provided on the Application may be amended, changed, modified, supplemented, deleted or updated without notice at our sole discretion. You should therefore review these Terms of Use each time you access this
    Application.
</p>

<h2>PRIVACY POLICY</h2>
<p>
    The Computerized Intervention Authoring System, v. 3.0 (CIAS) is committed to protecting personally identifiable information you and other users of this software program may provide to us. Please review the Privacy section of the Policy
    to understand how your personal information is collected, processed, and used.
</p>

<h3>The Personal Information We Collect</h3>
<p>
    CIAS does not collect any personally identifiable information (“PII”) about you unless you voluntarily provide it to us. This PII information may include your name, cell phone number, and email address, as well as information about you,
    your health, your feelings, your safety, and your health habits. Please note by using CIAS you are agreeing to the data practices described in this Policy.
</p>

<h3>Automatically Collected Information</h3>
<p>
    Information about your computer or mobile device, and also about how you use this program, may be automatically collected. This might include your IP address or the type of browser you are using, the specific screens you visit while
    using this program, and how long you spend using the program. It is important to note that this information reveals nothing personal about you and is reported only in aggregate (for all users as a group).
</p>

<h3>Our Use and Sharing of Your PII</h3>
<p>
    CIAS will not give, rent, or sell your PII. We will not share your PII outside CIAS, with one exception: we may share your PII with your healthcare providers if you give us permission to do that. Note that the researchers, healthcare
    professionals, or service providers who are asking you to use CIAS may have a separate policy for how they use any personal information that you enter into CIAS.
</p>
<p>
    We use the information collected automatically in a variety of ways, such as to analyze site traffic (such as aggregated information on the pages visited by our users), which allows us to improve the design and content of this program.
</p>

<h3>Our Commitment to Security</h3>
<p>
    CIAS takes many steps to protect your PII, and complies with the data security requirements of the Health Insurance, Portability, and Accountability Act (HIPAA). Your PII is encrypted (making it unreadable) while being sent from the
    device or computer you use to our server, and is also encrypted on our secure server. Only the researchers or others who are providing the content you are using can see your answers through their dashboard. Further, we keep records of
    all access to the PII of people like you who use an app made with CIAS. However, although these and other steps we take provide a high level of security, security breaches or inadvertent disclosures of your personally identifiable
    information are still possible.
</p>

<h3>Revisions to our Privacy Policy</h3>
<p>CIAS reserves the right to revise this policy or any part of it from time to time. We will post a new or revised policy to our Website, and suggest you review our Privacy Policy periodically.</p>

<h3>Contact Us</h3>
<p>CIAS welcomes your questions or comments regarding this Policy. You may contact us with questions or concerns at <a href="mailto:cias@msu.edu">cias@msu.edu</a>.</p>
    `,
  },
  termsAndConditionsOtherRolesText: {
    id: `${scope}.termsAndConditionsOtherRolesText`,
    defaultMessage: `
<h2>APPLICATION TERMS OF USE FOR CIAS</h2>
<p>
    The following Terms of Use apply to the use of the Michigan State University (“MSU”) instance of the Computerized Intervention Authoring System, version 3.0 (CIAS; “CIAS Application” or “Application”) by User/you. By accepting these
    Terms of Use or using the CIAS Application, you agree that you have received, read, understood, and agree to be bound by the terms and conditions contained herein, and subsequent amendments thereto, as well as the laws, rules, and
    regulations now existing or which may hereafter be enacted, issued or enforced.
</p>
<p>
    Please read these Terms of Use carefully before using the CIAS Application. These Terms of Use govern your access and use of the CIAS Application and the services available on the Application. CIAS (referred to as "us," "our," or "we")
    provides the Application at no charge to you and reserves the right to make changes to the Application and to these Terms of Use at any time without prior notice.
</p>

<h3>1. Intellectual Property Rights</h3>
<p>
    The MSU CIAS Application and the CIAS 3.0 source code are owned by MSU, Wayne State University (“WSU”), and the University of Michigan (together the “Universities”). They have agreed to make the CIAS Application available for research
    at little to no cost (see Section 8, below, for details). Further, Universities have agreed to make CIAS source code available under the GNU General Public License, Version 3 for research purposes
    (https://www.gnu.org/licenses/gpl-3.0.txt). If you would like a copy of the source code pursuant to the GNU General Public License, Version 3, it may be downloaded from GitHub (<a href="https://github.com/">https://github.com/</a>).
</p>
<p>
    Interventions developed using either the CIAS Application or the CIAS source code are the intellectual property of their creator (the individual investigator or team). Further, the GNU General Public License Version 3 also allows
    commercialization of content developed using CIAS Source Code, with conditions specified in detail in the license. However, the MSU CIAS Application is a particular instance of CIAS. In the same way that an author cannot distribute free
    copies of specific word processing software to enable others to read their novel, behavioral scientists may not use the research-focused MSU CIAS Application for commercial purposes, even if they do so with their own interventions
    (their intellectual property).
</p>
<p>
    You may not modify, copy, reproduce, republish, upload, post, transmit, translate, sell, create derivative works, exploit, or distribute in any manner or medium (including by email or other electronic means), the Application or any
    material from the Application unless explicitly authorized in these Terms of Use. You may make derivative works from CIAS source code available under the GNU General Public License, Version 3 mentioned above.
</p>
<p>
    You acknowledge that all rights, title and interest in and to the Application, together with its codes, derivative works, organization, structure, interfaces, any documentation, data, trade names, trademarks, trade secrets, proprietary
    information or other related materials is, and at all times shall remain Universities’ sole and exclusive property. Except with respect to the right to use the Application, as expressly provided herein, these Terms of Use do not grant
    you any rights to, or in, patents, copyrights, database rights, trade secrets, trade names, trademarks (whether registered or unregistered) or any other rights or licenses with respect to the Application.
</p>
<p>
    The CIAS name, the Application and all related names, logos, product and service names, designs and slogans are copyright and trademarks belonging to the Universities. You must not use such marks without our prior written permission.
    All other names, logos, product and service names, designs and slogans on this Application are the trademarks of their respective owners.
</p>

<h3>2. The Agreement</h3>
<p>
    These Terms of Use are an agreement between you and us. It details our obligations to you and it highlights certain risks on using our services and you must consider such risks carefully as you will be bound by the provision of this
    Terms of Use through your use of this Application. Upon agreeing to these Terms of Use, we grant you the non-exclusive, non-transferrable right and license to use/install and use this Application.
</p>
<p>
    You agree that you are solely responsible for (i) your use of the Application, (ii) obtaining appropriate IRB approval for any research conducted using CIAS; (iii) compliance with 45 CFR 46; (iv) any breach of your obligations under the
    Terms of Use, (v) the consequences of any such breach (including any loss or damage which we may suffer). For example, you are responsible for obtaining appropriate informed consent and/or consent to terms of use and privacy policies
    from all participants or other end-users, and (vi) regularly downloading and saving any research data generated by participants in your studies who use CIAS. Neither CIAS nor MSU will guarantee permanent access to participant data.
</p>

<h3>3. Registration</h3>
<p>
    To access certain features on the Application, you may be required to provide personal and/or demographic information as part of the registration process. You agree to provide true, accurate, current and complete information about
    yourself as prompted by the applicable registration and you are responsible for keeping such information up-to date (this includes your contact information, so that we can reliably contact you). Also, you are to protect the
    confidentiality of your account password/passcode as we are not liable for any loss or damage arising from your failure to protect your password/passcode or account information.
</p>
<p>
    When you register your account on CIAS you must choose an account type. The four account types are Guest Participant, Registered Participant, Researcher, and Team Administrator. Guest Participant accounts gain access to intervention
    content via email or public link. Their responses to the intervention content are anonymous and no identifiable information is saved in the system. Registered Participant accounts must create a CIAS account, by providing their first and
    last name, and email address in order to gain access to an intervention. Within their account, Registered Participants will have the ability to view all interventions they are participating in- including all upcoming sessions, as well
    as reports containing a summary of their responses for all previous sessions completed. Researcher accounts can create, edit, and manage (invite, remove, and deactivate) participants for their own interventions. Team Administrator
    accounts have the ability to manage (invite, remove, and deactivate) researcher and participant accounts on their team. Team Administer accounts can also create, view, edit, and download data files for all interventions created within
    their team.
</p>
<p>When you register an account on CIAS we will ask you for the following information:</p>
<ol type="a">
    <li>Your Name</li>
    <li>Your institution</li>
    <li>Email address</li>
    <li>Role</li>
    <li>Research interests</li>
    <li>How you learned about CIAS</li>
    <li>The expected size of your study team</li>
    <li>Prior experience with CIAS or other digital intervention development</li>
    <li>Which CIAS features you plan to use</li>
    <li>Verification that CIAS will be used for non-commercial research only</li>
    <li>Details about the project you will be using CIAS for</li>
    <li>The estimated sample size of your study</li>
    <li>Whether your project will use text messaging, and if so the estimated number of text messages to be sent to each participant (0, 1-10, etc.)</li>
    <li>If this work is supported by a specific grant award and details of the grant, if any</li>
    <li>If you will be using CIAS for wireframing or prototyping</li>
    <li>If you are hoping to use CIAS to collect Protected Health Information</li>
    <li>Any other information we deem to be required to set up your account</li>
</ol>
<p>
    Please note that Protected Health Information (PHI) may not be entered into the CIAS Application under any circumstances without our express permission. If your project will use CIAS to collect and store PHI, you may do so only by
    retrieving the CIAS 3.0 code from https://github.com/ and installing an instance of CIAS on servers belonging to your institution or the covered entity in question. If you require assistance in this process, we can connect you to our
    software developers (a separate company unrelated to MSU), who may charge you for any assistance needed by you or your IT team. You should also check with your institution for guidance on its internal processes for collecting and
    storing PHI.
</p>

<h3>4. User Representation</h3>
<p>
    You shall not alter copy, modify or tamper with the Application as provided. You further agree not to collect email addresses, phone numbers, or other contact information of Users from the Application by electronic or other means for
    the purposes of sending unsolicited emails, text messages, or other unsolicited communications. Additionally, you agree not to use automated scripts to collect information from the Application or for any other purpose. You further agree
    that you may not use the Application in any unlawful manner or in any other manner that could impact the Application. In addition, you agree not to use the Application:
</p>
<ol>
    <li>in any manner that could damage, disable, overburden, or impair the Application or servers or networks connected to the Application,</li>
    <li>in any manner that could interfere with any other party’s use and enjoyment of the Application or servers or networks connected to the Application.</li>
    <li>
        to upload, post, transmit, share or otherwise make available any material that contains software viruses or any other malicious or tracking computer code, files or programs designed to track, interrupt, destroy or limit the
        functionality of any computer software or hardware or telecommunications equipment or any information that infringes the intellectual property rights of others;
    </li>
    <li>to intimidate or harass another User;</li>
    <li>
        to upload, post, transmit, share, store or otherwise make available content that would constitute, encourage or provide instructions for a criminal offense, violate the rights of any party, or that would otherwise create liability
        or violate any state, national or international law;
    </li>
    <li>to use or attempt to use another's account, service or system without authorization from that person and from us or create a false identity on the Application.</li>
</ol>

<h3>5. Age Restriction</h3>
<p>In order to register for our services on the Application, you represent and warrant that: You either possess corporate legal personality or are at least 18 years of age and are legally able to enter into a binding contract.</p>

<h3>6. Assignment</h3>
<p>
    You may not transfer or assign any rights or obligations you have under this Terms of Use without our prior written consent in its sole and absolute discretion. We reserve the right to transfer or assign this Terms of Use or any right
    or obligation under this Terms of Use at any time.
</p>

<h3>7. Communications and Notices to you</h3>
<p>
    By accepting these Terms of Use, you expressly consent to be contacted by us, our agents, representatives, affiliates, or anyone calling on our behalf for any and all purposes, at any telephone number, or physical or electronic address
    you provide or at which you may be reached. You agree that we may contact you by email, text message, or phone call. In the event that an agent or representative calls, he or she may also leave a message on your answering machine or
    voice mail. You also agree that we may contact people in your network should we try to reach you to no avail.
</p>

<h3>8. Supporting the CIAS Platform for Future Research</h3>
<p>
    The CIAS Application is a non-commercial and open research resource. Our goal is for cost to never be a barrier to distribution and use by the academic research community. You can help make this possible by including $3,000 per year for
    use of this platform into any new grant budgets. We also ask that well-funded investigators using CIAS for unfunded or internally funded studies also consider paying a similar amount to support this initiative. Studies involving many
    participants or many text messages may be required to provide financial support over and above $3,000 per year, even if not part of a funded study. All fees paid to MSU will be handled under a service contract that MSU will initiate.
</p>
<p>
    If asked, we can “white list” your intervention (that is, for your participants to see your own logo). However, we will only add a study or University logo that you provide to us, and only if it is sent with an acknowledgement that you
    have the right or privilege to use that image for your study.
</p>
<p>
    Applied use of the CIAS Application by non-profit organizations for projects that do not qualify as research (for example, projects that focus on service provision and that are not considered research by an IRB) will require written
    permission from MSU, and may require financial support. Permission can be requested by emailing us at <a href="mailto:cias@msu.edu">cias@msu.edu</a>.
</p>
<p>
    CIAS is administered by MSU to facilitate research around the world. However, MSU’s ability to provide technical support to individual CIAS Users is extremely limited. If you are having trouble using CIAS, please consult the training
    and help materials that are available on our website at www.cias.app. If you are still having issues you may want to attend one of our onboarding and orientation sessions which are scheduled periodically. We will also provide a link for
    submission of technical support tickets, but our ability to respond to tickets depends on the volume of tickets we receive. If you require more technical support, we can provide a list of outside consultants with expertise in CIAS 3.0.
    These consultants, however, are not affiliated with MSU and may charge a fee for their services. MSU does not endorse or in any way warrant the work of any consultant recommend for technical support.
</p>

<h3>9. Citing the CIAS resource</h3>
<p>All those using CIAS in their research must cite CIAS in publications and presentations as follows:</p>
<p>
    Ondersma S, Broderick B, Spiller A, Marcu G, Buis L. The Computerized Intervention Authoring System (CIAS), v. 3.0. www.cias.app. CIAS is an open-source research resource funded by NIH/NIBIB grant 7U24EB028990 and administered by
    Michigan State University.
</p>

<h3>10. Suspension or Termination of Access</h3>
<p>We have the right to deny your access to, and suspend or terminate your access to, the Application for any reason, including for any violation by you of these Terms of Use.</p>

<h3>11. Limitation of Liability</h3>
<p>
    TO THE EXTENT NOT PROHIBITED BY APPLICABLE LAW, IN NO EVENT SHALL UNIVERSITIES BE LIABLE FOR ANY INCIDENTAL, SPECIAL, INDIRECT OR CONSEQUENTIAL DAMAGES AND LOSSES OF PROFITS ARISING OUT OF YOUR USE OF THE APPLICATION, INCLUDING WITHOUT
    LIMITATION, DAMAGES FOR LOSS OF PROFITS, CORRUPTION OR LOSS OF DATA OR INFORMATION, EVEN IF UNIVERSITIES HAVE BEEN ADVISED OR ARE AWARE OF THE POSSIBILITY OF SUCH DAMAGES AND REGARDLESS OF THE THEORY OF LIABILITY (CONTRACT, TORT, OR
    OTHERWISE).
</p>
<p>
    As permitted by applicable law, the Universities will not be liable to any user for any loss or damage, even if foreseeable, arising under or in connection with the use of, or inability to use our Application and you hold the
    Universities harmless in respect of:
</p>
<ol type="i">
    <li>any loss of profits, loss of business, loss of revenue, loss of contracts, loss of goodwill, loss of anticipated earnings or savings (whether direct, indirect, incidental or consequential); or</li>
    <li>any loss of use or value or damage of any data or equipment (including software), wasted management, operation or other time (whether direct, indirect, incidental or consequential); or</li>
    <li>Any special, indirect, punitive, incidental or consequential loss, arising in connection therefrom.</li>
</ol>
<p>Universities shall not be liable for any unauthorized use of the Application, or the consequences thereof. Such unauthorized usage shall be entirely at your own risk.</p>

<h3>12. INDEMNITY</h3>
<p>
    You hereby agree and undertake to fully indemnify and keep the Universities harmless from and against all actions, claims, costs (including legal costs on a full indemnity basis), losses, charges, expenses and damages which we may
    suffer or incur as a result of:
</p>
<ul>
    <li>
        any fraud, negligence, dishonesty or misconduct (criminal or otherwise) relating to the transactions perpetrated by you, your servants, agents, employees or contractors or the fraud, dishonesty or misconduct (criminal or otherwise)
        perpetrated by a third party as a result of the negligence or default of you, your servants, agents, employees or contractors.
    </li>
    <li>any loss arising from any fraud or dishonesty arising from a breach of security of your software or hardware by a third party on the Application.</li>
</ul>
<p>
    You shall not hold the Universities liable or responsible for any action, claim, cost, expense, damage and loss, including consequential loss or damage or loss of profit, which you may suffer or incur as a result of a breakdown in the
    Application or when the Application is not available by reason of circumstances beyond our control or arising directly or indirectly out of your use of the Application.
</p>

<h3>13. General Disclaimer</h3>
<p>
    The services provided under this Application are provided to you "as is," without any representation or warranty, express or implied, of any kind, including, but not limited to, warranties of MERCHANTABILITY, non-infringement, or
    FITNESSS FOR ANY PARTICULAR PURPOSE. The Universities do not warrant the accuracy or completeness of the CIAS application, the suitability of the content or the reliability of any advice, opinion, statement or other information
    displayed or distributed through the Application. The Universities give no assurance that the Application will meet any or all requirements you may have, whether or not advised to you. Furthermore, the Universities give no assurance
    that the running of the Application will be incessant, uninterrupted or error-free, that defects will be corrected, or that the Application is free of viruses or other harmful components. The Universities cannot guarantee and do not
    promise any specific results from use of our services via the Application.
</p>
<p>
    The Application and the service may be temporarily unavailable from time to time for maintenance or other reasons. The Universities assume no responsibility for any error, omission, interruption, deletion, defect, delay in operation or
    transmission, communications line failure, theft or destruction or unauthorized access to, or alteration of User communications. The Universities are not responsible for any problems or technical malfunction of any telephone network or
    lines, computer online systems, servers or providers, computer equipment, software, failure of email or players on account of technical problems or traffic congestion on the Internet or on the Application or combination thereof,
    including injury or damage to Users or to any other person's computer related to or resulting from participating or downloading materials in connection with the web and/or in connection with the service provided via the Application.
</p>

<h3>14. Force Majeure</h3>
<p>
    The Universities will not be liable for delay or for failure to perform our obligations if and to the extent such delay or failure results from circumstances including but not limited to acts of God, fire, flood, invasion, war,
    revolution, uprising, insurrection, social/public unrest, public disturbance, strike, riots, fire disaster, storm, acts of terrorism, plague, epidemic, pandemic, outbreaks of infectious disease or any other public health crisis,
    including quarantine or other employee restrictions, and any other circumstance which may hinder or delay the performance of our obligations under this Terms of Use.
</p>

<h3>15. Data Protection</h3>
<p>
    If you choose to use the Application, you agree to the collection and use of your Personal Data in accordance with the CIAS Privacy Policy. We will not use or share your personal information with anyone except as provided in the Privacy
    Policy.
</p>

<h3>16. Dispute Resolution</h3>
<p>
    If a dispute or difference arises as to the validity, interpretation, effects or rights and obligations of the Parties under this Agreement, the Parties shall use their best endeavor to reach an amicable settlement of dispute. All
    actions or proceedings related to these Terms of Use shall be litigated in state courts of competent jurisdiction located in the state of Michigan, United States of America. User consents and submits to the jurisdiction of any Michigan
    state court with competent jurisdiction and shall not bring any action or claim against MSU in any other jurisdiction.
</p>

<h3>17. Applicable Law</h3>
<p>These Terms of Use shall be governed and construed under the laws of the United States of America and the State of Michigan.</p>

<h3>18. Waiver and Severability</h3>
<p>
    Our failure to enforce a provision of these Terms is not a waiver of our right to do so later. If any provision of these Terms is found unenforceable, the remaining provisions of the Terms will remain in full effect and an enforceable
    term or terms will be substituted reflecting our intent as closely as possible.
</p>

<h3>19. Contact Us</h3>
<p>Any question regarding the use of the Application, or comments about the services provided via the Application or its contents should be directed to {Insert support contact details}</p>

<h3>20. Modifications</h3>
<p>
    We reserve the right to change, modify and update these Terms of Use at any time. Your continued use of the Application after any modifications to these Terms of Use shall mean you accept those modifications. Any aspect of the
    Application or the services provided on the Application may be amended, changed, modified, supplemented, deleted or updated without notice at our sole discretion. You should therefore review these Terms of Use each time you access this
    Application.
</p>

<h2>PRIVACY POLICY</h2>
<p>
    The Computerized Intervention Authoring System, v. 3.0 (CIAS) is committed to protecting personally identifiable information you and other users of this web application may provide us through our website. Please review the Privacy
    section of the Policy to understand how your personal information is collected, processed, and used. Please note that this Policy is for researchers and others who use the MSU CIAS Application to create content. You are responsible for
    obtaining appropriate informed consent and/or consent to terms of use and privacy policies from all participants or other end-users. Please also note by using CIAS you are agreeing to the data practices described in this Policy.
</p>

<h3>The Personal Information We Collect</h3>
<p>
    CIAS does not collect any personally identifiable information (“PII”) about you unless you voluntarily provide it to us. This PII information may include name, institution, email address, and other information collected when you first
    seek access to CIAS.
</p>

<h3>Automatically Collected Information</h3>
<p>
    Information about your computer and your visit may be automatically collected, such as your IP address or the type of browser you are using, the specific web pages you visit on our Website, and the duration of your visits. It is
    important to note, this information reveals nothing personal about you and is reported only in aggregate.
</p>

<h3>Our Use and Sharing of Your PII</h3>
<p>
    We use the PII you provide us to deliver the information and services you request or which we may feel interest you. CIAS will not give, rent, or sell your PII. We will not share your PII outside CIAS with the exception that we may
    share your PII with third parties that perform data services, such as maintenance and back up. Any such third parties will be under an obligation to maintain the confidentiality of your PII.
</p>
<p>
    We use the information collected automatically in a variety of ways, such as to analyze site traffic (such as aggregated information on the pages visited by our users), which allows us to improve the design and content of our website.
</p>
<p>CIAS cannot guarantee the protection of the information that researchers send to us by means of unencrypted email, or that may be accessible by others while in transit.</p>

<h3>Links to Third-Party Sites</h3>
<p>CIAS may link to or contain links to other third party websites that we do not control or maintain. We are not responsible for the privacy practices employed by any third party website.</p>

<h3>Tracking User Behavior</h3>
<p>
    CIAS uses “cookies” and “web beacons” (also called “clear gifs” or “pixel tags”) to obtain certain types of information when your web browser accesses our Website. It is important to note that the cookies and web beacons that we use are
    not tied to personal information. We use cookies and web beacons to collect anonymous, aggregated information to assist us in understanding how users use our Website. We do not use any of this information to identify visitors and we do
    not share it with third parties.
</p>

<h3>Disabling Cookies</h3>
<p>You are not required to accept cookies. However, some parts of our Website may not function properly or be available to you if you refuse to accept a cookie or choose to disable the acceptance of cookies.</p>

<h3>Our Commitment to Security</h3>
<p>
    The researcher-facing side of CIAS has implemented security measures we consider reasonable and appropriate to protect against the loss, misuse and alteration of the information under our control. However, we cannot and do not guarantee
    or warrant the security of any information you disclose or transmit to us online and we are not responsible for the theft, destruction, or inadvertent disclosure of your personally identifiable information.
</p>

<h3>Children</h3>
<p>The researcher-facing side of CIAS does not knowingly collect PII information from children.</p>

<h3>Revisions to our Privacy Policy</h3>
<p>CIAS reserves the right to revise this policy or any part of it from time to time. We will post a new or revised policy to our Website, and suggest you review our Privacy Policy periodically.</p>

<h3>Contact Us</h3>
<p>CIAS welcomes your questions or comments regarding this Policy. You may contact us with questions or concerns at <a href="mailto:cias@msu.edu">cias@msu.edu</a>.</p>
    `,
  },
  accept: {
    id: `${scope}.accept`,
    defaultMessage: 'Accept',
  },
});
