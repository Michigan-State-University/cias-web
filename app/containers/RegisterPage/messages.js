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
  termsAndConditionsText: {
    id: `${scope}.termsAndConditionsText`,
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
  accept: {
    id: `${scope}.accept`,
    defaultMessage: 'Accept',
  },
});
