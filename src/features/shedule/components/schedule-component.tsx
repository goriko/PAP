'use client';

import { useState } from 'react';
import { Card, CardContent } from "@/features/shared/components/base/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/features/shared/components/base/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/features/shared/components/base/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/features/shared/components/base/dialog"
import { CardHeader, CardTitle, CardDescription } from "@/features/shared/components/base/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/features/shared/components/base/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/features/shared/components/base/avatar";

const users = [
  { name: 'PROR. BRIDGITTE KHOURY, PHD', image: 'speakers/OpeningAddress_Dr. Brigitte Khoury.jpg', title: 'President-Elect, International Union of Psychological Societies', description: 'Dr. Khoury is a professor and Vice Chair for psychological affairs at the Psychiatry Department at the Faculty of Medicine, American University of Beirut, Lebanon. Dr. Khoury is an expert in trauma, refugees\' mental health, sexuality and LGBTQ+, and diagnostics and classification. Dr. Khoury is the vice president of the founding board of the Lebanese Order of Psychologists. She is a fellow of the American Psychological Association and was the past president for the International Psychology division. She serves currently as the president-elect of the International Union of Psychological Science.' },
  { name: 'MR ADRIAN TOH', initials: "AD", title: 'President, ASEAN Regional Union of Psychological Societies', description: 'Adrian Toh is the President of the Singapore Psychological Society (SPS) and an advocate for advancing psychology in ASEAN. He contributed to The Handbook of International Psychology Ethics and the SPS Code of Ethics revision, working with local and international bodies to strengthen professional standards and ethical decision-making in diverse cultural contexts.' },
  { name: 'DR. ARTHUR EVANS JR.', image: 'speakers/Plenary1_Dr. Arthur Evans Jr..jpg', title: 'Chief Executive Officer, American Psychological Association', description: 'Clinical and community psychologist and health care innovator Arthur C. Evans Jr., PhD, is CEO of the American Psychological Association, the leading scientific and professional organization representing psychology in the United States. With more than 146,000 researchers, educators, clinicians, consultants, and students as members, APA promotes and disseminates psychological knowledge to benefit society and improve lives a mission consistent with Evans\' life work' },
  { name: 'DR. DEBRA M. KAWAHARA', image: 'speakers/Plenary2_Dr. Debra M. Kawahara.jpg', title: 'President, American Psychological Association', description: 'She is the associate dean of Academic Affairs and distinguished professor at the California School of Professional Psychology, Alliant International University. She manages over 20 programs in psychology and mental health across six campuses in California, as well as online. Additionally, she has an independent practice where she sees individuals, couples, and families, and conducts trainings for organizations. As the 2025 president of the American Psychological Association (APA), Kawahara aims to bring her campaign slogan, "Strength in Unity," to fruition. She is the first Asian American woman and the first Japanese American to serve in this role' },
  { name: 'ATTY. FLORANIE POLO-JACOB', image: 'speakers/Plenary3_Atty. Floranie Polo-Jacob.jpg', title: '2000 - 2001 President, Psychological Association of the Philippines', title2: 'Of Counsel, VBSP Law Offices', description: 'Atty. "Nanie" Jacob has been a Lawyer for more than thirty years now, and a Psychologist for over 50 years. Being both Psychologist and Lawyer, she has focused her legal practice in Family Law, particularly in marriage dissolution, child adoption, protection of children, property relations, settlement of estates, and other civil cases relative to Persons and Family. She served as Board Member of the ICAB (Intercountry Adoption Board) as both Psychologist and Lawyer. She continues to be active in the Psychological Association of the Philippines having served as Board Director and President. She is also active in espousing the concepts of Forensic Psychology and Therapeutic Jurisprudence vis-à-vis Therapeutic Justice. She was instrumental in the formulation of the Psychology Bill and continues to render participation in current efforts relative to the Law which, at present, faces revision and possible amendments incorporating issues about Psychometricians vis-a-vis Psychologists.' },
  { name: 'DR. ROSE MARIE CLEMEÑA', initials: "RC", title: '1995-1996 President, Psychological Association of the Philippines', title2: '2015 PRC Outstanding Professional of the Year in the Field of Psychology', description: 'Clinical and community psychologist and health care innovator Arthur C. Evans Jr., PhD, is CEO of the American Psychological Association, the leading scientific and and professional organization representing psychology in the United States. With more than 146,000 researchers, educators, clinicians, consultants, and students as members, APA promotes and disseminates psychological knowledge to benefit society and improve lives - a mission consistent with Evans\' life work' },
  { name: 'DR. GRACE H. AGUILING-DALISAY', image: 'speakers/Plenary4_Dr. Grace H. Aguiling-Dalisay.jpg', title: '2024 PRC Outstanding Professional of the Year in the Field of Psychology', title2: 'President and CEO, Center for Educational Measurement', description: 'She has had an exceptional career as a distinguished figure in psychology and education. She was Full Professor of Psychology until her retirement from the University of the Philippines Diliman in 2021. Her work has greatly influenced Indigenous psychology in the Philippines. In 2001, she co-founded Volunteer Organizations Information, Coordination and Exchange (VOICE) where she served as the executive director, continuing to the present as founding president on the board. She was recognized as the 2024 PRC Outstanding Professional of the Year in the Field of Psychology. This award signifies significant accomplishments and contributions to the field of psychology. Currently, she holds the position of President and CEO of the Center for Educational Measurement, Inc.' },
];

export function ScheduleComponent() {

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [selected1, setSelected1] = useState<string | null>(null);

  const handleRowClick = (user: any) => {
    setSelectedUser(user);
    setOpen(true);
  };

  return (
    <div>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-3xl text-foreground">Event Schedule</h1>
        </div>
      </div>
      <Tabs defaultValue="1">
        <TabsList>
          <TabsTrigger value="1">Day 1</TabsTrigger>
          <TabsTrigger value="2">Day 2</TabsTrigger>
          <TabsTrigger value="3">Day 3</TabsTrigger>
        </TabsList>
        <TabsContent value="1">
          <div className="w-screen overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="p-4 font-medium text-foreground">
                    <p className="whitespace-normal">Time</p>
                  </TableHead>
                  <TableHead className="p-4 font-medium text-foreground">
                    <p className="whitespace-normal">Activity</p>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p className="whitespace-normal">6:00 am</p>
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p className="whitespace-normal">Registration</p>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p className="whitespace-normal">8:00 am - 8:45 am</p>
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p className="whitespace-normal">Opening Ceremony</p>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="p-4 font-medium text-foreground" />
                  <TableCell className="p-4 font-medium text-foreground">
                    <p className="whitespace-normal">Ecumenical Prayer</p>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="p-4 font-medium text-foreground" />
                  <TableCell className="p-4 font-medium text-foreground">
                    <p className="whitespace-normal">National Anthem</p>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="p-4 font-medium text-foreground" />
                  <TableCell className="p-4 font-medium text-foreground">
                    <p className="whitespace-normal">Welcome Greetings</p>
                    <br />
                    <p className="whitespace-normal">Dr. Glenn G. Glarino</p>
                    <span className="whitespace-normal">President, Psychological Association of the Philippines </span>
                  </TableCell>
                </TableRow>
                <TableRow onClick={() => handleRowClick(users[1])}>
                  <TableCell className="p-4 font-medium text-foreground" />
                  <TableCell className="p-4 font-medium text-foreground">
                    <p className="whitespace-normal">Welcome Remarks</p>
                    <br />
                    <p className="whitespace-normal">Mr. Adrian Toh</p>
                    <span className="whitespace-normal">President, ASEAN Regional Union of Psychological Societies</span>
                  </TableCell>
                </TableRow>
                <TableRow onClick={() => handleRowClick(users[0])}>
                  <TableCell className="p-4 font-medium text-foreground" />
                  <TableCell className="p-4 font-medium text-foreground">
                    <p className="whitespace-normal">Opening Address</p>
                    <br />
                    <p className="whitespace-normal">Prof. Brigitte Khoury, PhD</p>
                    <span className="whitespace-normal">President-Elect, International Union of Psychological Societies</span>
                  </TableCell>
                </TableRow>
                <TableRow onClick={() => handleRowClick(users[1])}>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p className="whitespace-normal">8:45 am - 9:45 am</p>
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p className="whitespace-normal">Keynote Address 1</p>
                    <br />
                    <p className="whitespace-normal">Mr. Adrian Toh</p>
                    <p className="whitespace-normal">President, ASEAN Regional Union of Psychological Societies</p>
                    <br />
                    <span className="whitespace-normal">Advancing Mental Health in ASEAN: Bridging Policy, Practice, and Cultural Diversity</span>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p className="whitespace-normal">9:45 am - 10:00 am</p>
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p className="whitespace-normal">Health Break</p>
                  </TableCell>
                </TableRow>
                <TableRow onClick={() => handleRowClick(users[2])}>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p className="whitespace-normal">10:00 am - 11:00 am</p>
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p className="whitespace-normal">Plenary Session 1</p>
                    <br />
                    <p className="whitespace-normal">Dr. Arthur Evans Jr.</p>
                    <p className="whitespace-normal">Chief Executive Officer, American Psychological Association</p>
                    <br />
                    <span className="whitespace-normal">Scaling Public Health Approaches for Mental Health Through Innovations in Policy, Community-Based Care, and Disaster Response</span>
                  </TableCell>
                </TableRow>
                <TableRow onClick={() => handleRowClick(users[3])}>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p className="whitespace-normal">11:00 am - 12:00 pm</p>
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p className="whitespace-normal">Plenary Session 2</p>
                    <br />
                    <p className="whitespace-normal">Dr. Debra M. Kawahara</p>
                    <p className="whitespace-normal">President, American Psychological Association</p>
                    <br />
                    <span className="whitespace-normal">Integrating Intersectionality and Feminist Principles to Empower Diverse Populations</span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p className="whitespace-normal">12:00 pm - 1:30 pm</p>
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p className="whitespace-normal">PAP General Membership Meeting/ Lunch</p>
                    <br />
                    <p className="whitespace-normal">Report on the operations of PAP for the past year</p>
                    <p className="whitespace-normal">Financial Report</p>
                    <p className="whitespace-normal">Membership Report</p>
                    <p className="whitespace-normal">Expressed appreciation to the outgoing members of the BOD</p>
                    <p className="whitespace-normal">BOD Nominees introduced to the members of PAP</p>
                  </TableCell>
                </TableRow>
                <TableRow onClick={() => handleRowClick(users[4])}>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p className="whitespace-normal">1:30 pm - 2:30 pm</p>
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p className="whitespace-normal">Keynote Address 2</p>
                    <br />
                    <p className="whitespace-normal">Atty. Floranie Polo-Jacob</p>
                    <p className="whitespace-normal">2000-2001 President, Psychological Association of the Philippines</p>
                    <p className="whitespace-normal">Office Counsel, VBSP Law Offices</p>
                    <br />
                    <span className="whitespace-normal">The Law Meets Psychology: A Cross-Disciplinary Path to Justice and Well-Being (The Philippine Experience)</span>
                  </TableCell>
                </TableRow>
                <TableRow onClick={() => handleRowClick(users[5])}>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p className="whitespace-normal">2:30 pm -3:30 pm</p>
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p className="whitespace-normal">Plenary Session 3</p>
                    <br />
                    <p className="whitespace-normal">Dr. Rose Marie Clemeña</p>
                    <p className="whitespace-normal">1995-1996 President, Psychological Association of the Philippines</p>
                    <p className="whitespace-normal">2015 PRC Outstanding Professional of the Year in the Field of Psychology</p>
                    <br />
                    <span className="whitespace-normal">Philippine Perspective on Counseling Psychology: Future Opportunities for ASEAN'S Broader Mental Health Agenda</span>
                  </TableCell>
                </TableRow>
                <TableRow onClick={() => handleRowClick(users[6])}>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p className="whitespace-normal">3:30 pm - 4:30 pm</p>
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p className="whitespace-normal">Plenary Session 4</p>
                    <br />
                    <p className="whitespace-normal">Dr. Grace H. Aguiling-Dalisay</p>
                    <p className="whitespace-normal">2024 PRC Outstanding Professional of the Year in the Field of Psychology</p>
                    <p className="whitespace-normal">President and CEO, Center for Educational Measurement</p>
                    <br />
                    <span className="whitespace-normal">Reflections on the Practice of Filipino Psychology for Human Development</span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p className="whitespace-normal">7:00 pm - 9:00 pm</p>
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p className="whitespace-normal">Fellowship Night(Cocktails)</p>
                    <p className="whitespace-normal">Announcement of Official Results of Elections</p>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p className="whitespace-normal">8:00 am - 6:00 pm</p>
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p className="whitespace-normal">e-Poster Presentations</p>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="2">
          <div className="w-screen overflow-x-auto">
            <Table className="w-full">
              <TableBody>
                <TableRow>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p className="whitespace-normal">7:00 am - 8:00 am</p>
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p className="whitespace-normal">Holy Mass (attendance optional)</p>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p className="whitespace-normal">8:00 am - 6:00 pm</p>
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p className="whitespace-normal">e-Poster Presentations</p>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <Select onValueChange={(value) => setSelected(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a parallel session" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="parallelA">Parallel Session A</SelectItem>
              <SelectItem value="parallelB">Parallel Session B</SelectItem>
              <SelectItem value="chapterMeeting">Chapter Meeting</SelectItem>
              <SelectItem value="parallelC">Parallel Session C</SelectItem>
              <SelectItem value="parallelD">Parallel Session D</SelectItem>
              <SelectItem value="parallelE">Parallel Session E</SelectItem>
            </SelectContent>
          </Select>
          {selected === "parallelA" && (
            <>
              <div className="w-screen overflow-x-auto">
                <p className="px-4 pt-4 whitespace-normal">Time: 8:30 am - 10:00 am</p>
                <Table className="w-full">
                  <TableBody>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">New Room 1</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 1</p>
                        <br />
                        <p className="whitespace-normal">Dr. Karen Katrina V. Trinidad</p>
                        <p className="whitespace-normal">Chair, Department of Psychology, College of Science, University of Santo Tomas </p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">The Important Role Psychologists Play in Sports</p>
                        <br />
                        <span className="whitespace-normal">Moderator: Alyssa Kae Alegre</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">New Room 2</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 2</p>
                        <br />
                        <p className="whitespace-normal">Dr. Henndy Ginting</p>
                        <p className="whitespace-normal">Licensed Psychologist, Indonesia</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">Assessment of Personality Styles and Disorders</p>
                        <br />
                        <span className="whitespace-normal">Moderator: Raj Pallon</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Yakal Hall 3</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 3</p>
                        <br />
                        <p className="whitespace-normal">Ms. Karen Rose Vardeleon</p>
                        <p className="whitespace-normal">Founding Partner of Childfam-Possibilities</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">Deliberate Practice for Counselors</p>
                        <br />
                        <span className="whitespace-normal">Moderator: Alyssa Marie Dar Juan</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Mahogany Hall</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 4</p>
                        <br />
                        <p className="whitespace-normal">Dr. Mary Grace Serranilla-Orquiza</p>
                        <p className="whitespace-normal">(PAP Developmental Psych Division)</p>
                        <p className="whitespace-normal">President and Founder, GrayMatters Psychological and Consultancy, Inc.</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">Mapping Practices, Pioneering Progress: Innovations in Elderly Mental Health Care for Aging Filipinos</p>
                        <br />
                        <p className="whitespace-normal">Moderator: Ma. Catherine Pestaño-Africa</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Yakal Hall 1</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 5</p>
                        <p className="whitespace-normal">Dr. Clarissa F. Delariarte</p>
                        <p className="whitespace-normal">Licensed Psychologist and Guidance Counsellor</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">The Value of Qualitative Findings in the Practice of Psychology</p>
                        <br />
                        <p className="whitespace-normal">Moderator: Sr. Angelina M. Julom</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Layco</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 6</p>
                        <br />
                        <p className="whitespace-normal">Oliver B. Sta. Ana</p>
                        <p className="whitespace-normal">Educational Psychology Division</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">Why Academic Resilience Matters in the Context of Climate Change?</p>
                        <br />
                        <p className="whitespace-normal">Moderator: Elise Limson</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Hotel Quincentennial</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 7</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">Brian Riedesel & Ronal Brown (APA)</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">Interventions for Psychology in Health and Wellbeing: From Traditional to Modern</p>
                        <br />
                        <p className="whitespace-normal">Moderator: Carlos Buan</p>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="w-screen overflow-x-auto">
                <p className="px-4 pt-4 whitespace-normal">Organized Symposium: 8:30 am - 10:00 am</p>
                <Table className="w-full">
                  <TableBody>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Treasures Hall 1</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Org Sympo 1</p>
                        <br />
                        <p className="whitespace-normal">Vulnerable Communities Focus</p>
                        <br />
                        <p className="whitespace-normal">Dr. Edo Jaya</p>
                        <p className="whitespace-normal">Researcher and Clinical Psychologist</p>
                        <p className="whitespace-normal">Indonesian Psychological Healthcare Center</p>
                        <br />
                        <span className="whitespace-normal">Convenor: Henmar Cardiño</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Treasures Hall 2</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Org Sympo 2</p>
                        <br />
                        <p className="whitespace-normal">Substance Use Prevention and Rehabilitation in the Philippines: Approaches, Evidences and Narratives</p>
                        <br />
                        <p className="whitespace-normal">Trixia Anne C. Co</p>
                        <p className="whitespace-normal">Chairperson - Substance Use, Prevention, and Recovery</p>
                        <br />
                        <span className="whitespace-normal">Convenor: Trixia Anne C. Co</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Treasures Hall 3</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Org Sympo 3</p>
                        <br />
                        <p className="whitespace-normal">Psychological Landscape in Sports and Movement Exploring Anxiety, Motivation and Mental Health</p>
                        <br />
                        <p className="whitespace-normal">Naira Orbeta</p>
                        <p className="whitespace-normal">Sports Psychology SIG</p>
                        <br />
                        <span className="whitespace-normal">Convenor: Naira Orbeta</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Narra Hall 3</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Org Sympo 4</p>
                        <br />
                        <p className="whitespace-normal">Queer Justice and Advocacy in the Philippines</p>
                        <br />
                        <p className="whitespace-normal">Rolf Gian Marcos</p>
                        <p className="whitespace-normal">LGBT Psychology SIG</p>
                        <br />
                        <p className="whitespace-normal">Convenor: Rolf Gian Marcos</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Narra Hall 1</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Org Sympo 5</p>
                        <br />
                        <p className="whitespace-normal">Navigating Filipino Work Realities: Leadership, Team Development, and Indigenous HR Practices</p>
                        <br />
                        <p className="whitespace-normal">Riyan Portuguez</p>
                        <p className="whitespace-normal">Chairperson - Industrial Organizational Psychology Division</p>
                        <br />
                        <p className="whitespace-normal">Convenor: Riyan Portuguez</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Narra Hall 2</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Org Sympo 6</p>
                        <br />
                        <p className="whitespace-normal">Wellbeing and Mental Health in Higher Education Frameworks, Protocols, and Best Practices</p>
                        <br />
                        <p className="whitespace-normal">Kristine Faith C. Moral</p>
                        <p className="whitespace-normal">Chairperson - N. NCR Chapter</p>
                        <br />
                        <p className="whitespace-normal">Convenor: Kristine Faith C. Moral</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Yakal Hall 2</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Org Sympo 7</p>
                        <br />
                        <p className="whitespace-normal">Culturally Responsive Mindfulness BaseD-Program Initial Outcomes and Evidence of Feasibilty and Acceptability</p>
                        <br />
                        <p className="whitespace-normal">Angelique Pearl Virtue P. Villasanta</p>
                        <p className="whitespace-normal">Research Psychology SIG</p>
                        <br />
                        <p className="whitespace-normal">Convenor: Angelique Pearl Virtue P. Villasanta</p>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </>
          )}
          {selected === "parallelB" && (
            <>
              <div className="w-screen overflow-x-auto">
                <p className="px-4 pt-4 whitespace-normal">Time: 10:30 am - 12:00 pm</p>
                <Table className="w-full">
                  <TableBody>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">New Room 1</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 1</p>
                        <br />
                        <p className="whitespace-normal">Ms. Maria Adela Guerrero</p>
                        <p className="whitespace-normal">DSWD Program Management Bureau</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">Psychological Practice in Social Welfare</p>
                        <br />
                        <span className="whitespace-normal">Moderator: Alyssa Kae Alegre</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">New Room 2</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 2</p>
                        <br />
                        <p className="whitespace-normal">Dr. Patricia Hayres Arroyo Perez</p>
                        <p className="whitespace-normal">Faculty Member, Department of Psychology, Adler University, Chicago, USA</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">The Global Context of Psychology and Human Rights</p>
                        <br />
                        <span className="whitespace-normal">Moderator: Ar-Jay Perez</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Yakal Hall 3</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 3</p>
                        <br />
                        <p className="whitespace-normal">Ms. Irene Marie S. Isleta</p>
                        <p className="whitespace-normal">Assistant Vice President, Human Resources Group, St. Luke’s Medical Center</p>
                        <p className="whitespace-normal">2023 President – Philippine Society for Talent Development</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">Human Sustainability at Work: Mental Health, Organizational Culture, and Employee Engagement</p>
                        <br />
                        <span className="whitespace-normal">Moderator: Abraham Linco</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Mahogany Hall</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 4</p>
                        <br />
                        <p className="whitespace-normal">Ms. Elaine Salansan Ferrer</p>
                        <p className="whitespace-normal">Training Lead Mental Health and Psychosocial Services SIG</p>
                        <p className="whitespace-normal">PsycServ, Freelance Training and People Development Consultant</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">Beyond PFA: Exploring Best Practices outside of Psychological First Aid</p>
                        <br />
                        <p className="whitespace-normal">Moderator: Jun Angelo Sunglao</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Yakal Hall 1</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 5</p>
                        <br />
                        <p className="whitespace-normal">Dr. Arsenio Sze Alianan, Jr.</p>
                        <p className="whitespace-normal">Faculty Member, Department of Psychology, Ateneo de Manila University</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">GenAI in the Conduct of Psychological Assessment</p>
                        <br />
                        <p className="whitespace-normal">Moderator: Sr. Angelina Julom</p>
                      </TableCell>
                    </TableRow>
                    <TableRow onClick={() => handleRowClick(users[1])}>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Layco</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 6</p>
                        <br />
                        <p className="whitespace-normal">Mr. Adrian Toh</p>
                        <p className="whitespace-normal">President, Singapore Psychological Society Science</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">Ethical Decision-Making Process</p>
                        <br />
                        <p className="whitespace-normal">Moderator: Faridah Kristi Wetherick</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Hotel Quincentennial</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 7</p>
                        <br />
                        <p className="whitespace-normal">Amanda Clinton and Faye Campbel (APA)</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">Technology's Impact on Psychology</p>
                        <br />
                        <p className="whitespace-normal">Moderator: Carlos Buan</p>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="w-screen overflow-x-auto">
                <p className=" px-4 pt-4 whitespace-normal">Organized Symposium 10:30 am - 12:00 pm</p>
                <Table className="w-full">
                  <TableBody>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Treasures Hall 1</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Org Sympo 1</p>
                        <br />
                        <p className="whitespace-normal">Psychological Responses to Climate Crisis</p>
                        <br />
                        <p className="whitespace-normal">John Jamir Benzon R. Aruta</p>
                        <p className="whitespace-normal">Chairperson</p>
                        <p className="whitespace-normal">Environmental Psychology SIG</p>
                        <br />
                        <p className="whitespace-normal">Convenor: John Jamir Benzon R. Aruta</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Treasures Hall 2</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Org Sympo 2</p>
                        <br />
                        <p className="whitespace-normal">Struggles and Strength Stories of Hope, Healing and Well-being</p>
                        <br />
                        <p className="whitespace-normal">Gabriel Sebastian N. Lizada</p>
                        <p className="whitespace-normal">Chairperson</p>
                        <p className="whitespace-normal">Positive Psychology SIG</p>
                        <br />
                        <p className="whitespace-normal">Convenor: Gabriel Sebastian Lizada</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Treasures Hall 3</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Org Sympo 3</p>
                        <br />
                        <p className="whitespace-normal">Pathways to Education, Prosociality, and Youth Participation</p>
                        <br />
                        <p className="whitespace-normal">Jeremiah Paul C. Silvestre</p>
                        <p className="whitespace-normal">Chairperson</p>
                        <p className="whitespace-normal">Social Psychology Division</p>
                        <br />
                        <p className="whitespace-normal">Convenor: Jeremiah Paul Silvestre</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Narra Hall 3</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Org Sympo 4</p>
                        <br />
                        <p className="whitespace-normal">Reimagining Pedagogical Futures: Innovations, Ethics, and AI in Psychology Learning and Teaching</p>
                        <br />
                        <p className="whitespace-normal">Pat Kathlyn Dione D. Ramirez</p>
                        <p className="whitespace-normal">Chairperson</p>
                        <p className="whitespace-normal">Teaching Psychology</p>
                        <br />
                        <p className="whitespace-normal">Convenor: Pat Kathlyn Dione Ramirez</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Narra Hall 1</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Org Sympo 5</p>
                        <br />
                        <p className="whitespace-normal">Care and Connection in Neurodiverse Realities: Filipino Narratives of Resilience, Rights, and Relationships</p>
                        <br />
                        <p className="whitespace-normal">Antero Rosauro V. Arias, Jr.</p>
                        <p className="whitespace-normal">Chairperson</p>
                        <p className="whitespace-normal">Persons with Disabilities Psych-SIG</p>
                        <br />
                        <p className="whitespace-normal">Convenor: Antero Rosauro Arias Jr</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Narra Hall 2</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Org Sympo 6</p>
                        <br />
                        <p className="whitespace-normal">Experiences in Sports: Perspectives on Participation, Resilence, Rights and Relationships</p>
                        <br />
                        <p className="whitespace-normal">David Kuyunjik Damian</p>
                        <p className="whitespace-normal">Sports Psychology SIG</p>
                        <br />
                        <p className="whitespace-normal">Convenor: David Kuyunjik Damia</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Yakal  Hall 2</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Org Sympo 7</p>
                        <br />
                        <p className="whitespace-normal">Intersecting Minds: Cultural and Clinical Perspectives on Body Dysmorphic and Obsessive Compulsive Disorders in Southeast Asia</p>
                        <br />
                        <p className="whitespace-normal">Peejay D. Bengwasan</p>
                        <p className="whitespace-normal">Clinical Psych Division </p>
                        <br />
                        <p className="whitespace-normal">Convenor: Peejay Bengwasan</p>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </>
          )}
          {selected === "chapterMeeting" && (
            <>
              <div className="w-screen overflow-x-auto">
                <p className="px-4 pt-4 whitespace-normal">Time: 12:00 am - 1:00 pm</p>
                <Table className="w-full">
                  <TableBody>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">New Room 1</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Bicol</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">New Room 2</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Northern Luzon</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Yakal Hall 3</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Central Luzon</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Treasures Hall 1</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">CALABARZON-MIMAROPA</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Treasures Hall 2</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Southern Mindanao</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Narra Hall 1</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">NCR North</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Narra Hall 2</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">NCR South</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Mahogany Hall</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Western Visayas</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Yakal Hall 1</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Southern Visayas</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Yakal Hall 2</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Northern Mindanao</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Layco</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Western Mindanao</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Hotel Quincentennial</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">CLSB</p>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </>
          )}
          {selected === "parallelC" && (
            <>
              <div className="w-screen overflow-x-auto">
                <p className="px-4 pt-4 whitespace-normal">Time: 1:00 pm - 2:30 pm</p>
                <Table className="w-full">
                  <TableBody>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">New Room 1</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 1</p>
                        <br />
                        <p className="whitespace-normal">Dr. Ron R. Resurreccion</p>
                        <p className="whitespace-normal">Director, Student Success Center, De La Salle University</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">Towards Inclusive Education: Facilitators, Barriers, and Insights from Higher Education Teachers</p>
                        <br />
                        <span className="whitespace-normal">Moderator: Abigail Capay</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">New Room 2</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 2</p>
                        <br />
                        <p className="whitespace-normal">Elvira C. David</p>
                        <p className="whitespace-normal">Professor, Holy Angel University</p>
                        <p className="whitespace-normal">Clinical and Assessment Practitioner, Espada Psychological Consultancy</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">Strength-Based Approach in Assessment: Integration and Practice Considerations</p>
                        <br />
                        <span className="whitespace-normal">Moderator: Rachel C. Reyes-Laureano</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Yakal Hall 3</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 3</p>
                        <br />
                        <p className="whitespace-normal">Dr. Mira Alexis P. Ofreneo</p>
                        <p className="whitespace-normal">Director, University Gender Hub</p>
                        <p className="whitespace-normal">Ateneo de Manila University</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">Institutionalizing Gender-Inclusive Practices in HEIs: The Story of the Ateneo Gender Hub</p>
                        <br />
                        <span className="whitespace-normal">Moderator: Rolf Gian Marcos</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Mahogany Hall</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 4</p>
                        <br />
                        <p className="whitespace-normal">Hon. Judge Jose Nathaniel S. Andal</p>
                        <p className="whitespace-normal">Regional Trial Court Judge, Cebu City</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">Psychological Practice in Family Court Civil Cases</p>
                        <br />
                        <p className="whitespace-normal">Moderator: Odette Esteve</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Layco</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 5</p>
                        <br />
                        <p className="whitespace-normal">England Danne B. Castro (Social Psych Division)</p>
                        <p className="whitespace-normal">Faculty, De La Salle University</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">Ugnayan: Applying Social Psychology to Advocacy Work and Community Action</p>
                        <br />
                        <p className="whitespace-normal">Moderator: Jeremiah Paul Silvestre</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Hotel Quincentennial</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 6</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">APA Panel</p>
                        <br />
                        <p className="whitespace-normal">Moderator: Carlos Buan</p>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="w-screen overflow-x-auto">
                <p className="px-4 pt-4 whitespace-normal">Organized Symposium: 1:00 pm - 2:30 pm</p>
                <Table className="w-full">
                  <TableBody>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Treasures Hall 1</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Org Sympo 1</p>
                        <br />
                        <p className="whitespace-normal">Regional Roots, Global Goals: Psychology in Action for Health, Education, Inclusion and Resilience</p>
                        <br />
                        <p className="whitespace-normal">Mahjalin Araiza B. Diez</p>
                        <p className="whitespace-normal">CALABARZON Chapter</p>
                        <br />
                        <p className="whitespace-normal">Convenor: Mahjalin Araiza Diez</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Treasures Hall 2</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Org Sympo 2</p>
                        <br />
                        <p className="whitespace-normal">A Community that Cares: Task Shifting Mental Health Initiatives in Underserved Settings</p>
                        <br />
                        <p className="whitespace-normal">Jun Angelo Sunglao</p>
                        <p className="whitespace-normal">Mental Health and Psychosocial Services</p>
                        <br />
                        <p className="whitespace-normal">Convenor: Jun Angelo Sunglao</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Treasures Hall 3</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Org Sympo 3</p>
                        <br />
                        <p className="whitespace-normal">Approaches in Learning and Cognitive Development of Children and Adults</p>
                        <br />
                        <p className="whitespace-normal">Jericho Medel</p>
                        <p className="whitespace-normal">Developmental Psychology Division</p>
                        <br />
                        <p className="whitespace-normal">Convenor: Jericho Medel</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Narra Hall 3</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Org Sympo 4</p>
                        <br />
                        <p className="whitespace-normal">Counseling Psychology and Clinical Governance: Latest Trends in Client Needs, Systems, and Professional Care</p>
                        <br />
                        <p className="whitespace-normal">Lance Lyle De Jesus</p>
                        <p className="whitespace-normal">Counseling Psychology Division</p>
                        <br />
                        <p className="whitespace-normal">Convenor: Alessandra Arpon</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Narra Hall 1</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Org Sympo 5</p>
                        <br />
                        <p className="whitespace-normal">Effectiveness and Impact of Interventions</p>
                        <br />
                        <p className="whitespace-normal">Dr. Lianne P. Alampay</p>
                        <br />
                        <p className="whitespace-normal">Convenor: Lianne Alampay</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Narra Hall 2</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Org Sympo 6</p>
                        <br />
                        <p className="whitespace-normal">From Pathogenesis to Recovery: Exploring the Spectrum of Mental Health Disorders</p>
                        <br />
                        <p className="whitespace-normal">Peejay D. Bengwasan</p>
                        <p className="whitespace-normal">Clinical Psychology</p>
                        <br />
                        <p className="whitespace-normal">Convenor: Peejay Bengwasan</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Yakal Hall 1</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Org Sympo 7</p>
                        <br />
                        <p className="whitespace-normal">Resilience and Well-being in Northern Mindanao: Key Features and Implications to Mental Health Intervention</p>
                        <br />
                        <p className="whitespace-normal">Jason Manaois</p>
                        <p className="whitespace-normal">Northern Mindanao Chapter</p>
                        <br />
                        <p className="whitespace-normal">Convenor: Yayet Dela Peña</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Yakal Hall 2</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Org Sympo 8</p>
                        <br />
                        <p className="whitespace-normal">Queering and Decolonizing Psychology in Asia</p>
                        <br />
                        <p className="whitespace-normal">Mx. Kyle Tan</p>
                        <br />
                        <p className="whitespace-normal">Convenor: Ar-Jay Perez</p>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </>
          )}
          {selected === "parallelD" && (
            <>
              <div className="w-screen overflow-x-auto">
                <p className="px-4 pt-4 whitespace-normal">Time: 2:30 pm - 4:00 pm</p>
                <Table className="w-full">
                  <TableBody>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">New Room 1</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 1</p>
                        <br />
                        <p className="whitespace-normal">Alexandria Blake C. Real-Pisalbo</p>
                        <p className="whitespace-normal">(Environmental Psych SIG)</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">Practicing Nature-based Therapy as a Psychotherapeutic Approach and a Pathway toward Environmental Action</p>
                        <br />
                        <span className="whitespace-normal">Moderator: Maica Pineda</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">New Room 2</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 2</p>
                        <br />
                        <p className="whitespace-normal">Peejay D. Bengwasan</p>
                        <p className="whitespace-normal">(Clinical Psych Division)</p>
                        <p className="whitespace-normal">De La Salle University</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">Fifty Minutes to Change: Crafting a CBT Session That Works</p>
                        <br />
                        <span className="whitespace-normal">Moderator: Raphael O. Inocencio</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Yakal Hall 3</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 3</p>
                        <br />
                        <p className="whitespace-normal">Aneesh Kumar, PhD</p>
                        <p className="whitespace-normal">Associate Professor</p>
                        <p className="whitespace-normal">CHRIST University (Bengaluru, India)</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">Centering the Learner, Centering the World: Psychological Literacy and Competency-Based Psychology Education</p>
                        <br />
                        <span className="whitespace-normal">Moderator: Ver Reyes</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Mahogany Hall</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 4</p>
                        <br />
                        <p className="whitespace-normal">Angelique Pearl Virtue P. Villasanta</p>
                        <p className="whitespace-normal">Instructor, Department of Psychology, Ateneo de Manila University</p>
                        <p className="whitespace-normal">Principal Investigator, Sexual Violence and Healing Research, Gender Justice Research Collective, Ateneo de Manila University</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">Reimagining Research: A Brief Introduction to Feminist Research Practices in Psychology</p>
                        <br />
                        <p className="whitespace-normal">Moderator: Jaime Felice Caringal-Go</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Layco</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 5</p>
                        <br />
                        <p className="whitespace-normal">Gabriel Sebastian N. Lizada</p>
                        <p className="whitespace-normal">Co-Managing Partner, Olive Branch Wellbeing Center, Davao City, Philippines</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">Bazinga! Why Your Feelings Know Things Before You Do</p>
                        <br />
                        <p className="whitespace-normal">Moderator: Merimee T. Siena</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Hotel Quincentennial</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 6</p>
                        <br />
                        <p className="whitespace-normal">Trixia Anne C. Co</p>
                        <p className="whitespace-normal">President, Singapore Psychological Society Science</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">Strengthening Coaching and Supervision in Community-Based Drug Rehabilitation Programs</p>
                        <br />
                        <p className="whitespace-normal">Moderator: Gino Cabrera</p>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="w-screen overflow-x-auto">
                <p className="px-4 pt-4 whitespace-normal">Organized Symposium: 2:30 pm - 4:00 pm</p>
                <Table className="w-full">
                  <TableBody>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Treasures Hall 1</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Org Sympo 1</p>
                        <br />
                        <p className="whitespace-normal">Psychological Testiing and Assessment in the Philippines</p>
                        <br />
                        <p className="whitespace-normal">Dr. Arsenio Sze Alianan, Jr.</p>
                        <p className="whitespace-normal">Assessment Psychology SIG</p>
                        <br />
                        <p className="whitespace-normal">Convenor: Arsenio Sze Alianan Jr.</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Treasures Hall 2</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Org Sympo 2</p>
                        <br />
                        <p className="whitespace-normal">Multilayered Political Psychology for Sustainable Peace</p>
                        <br />
                        <p className="whitespace-normal">Dr. Joshua Uyheng</p>
                        <br />
                        <p className="whitespace-normal">Convenor: Joshua Uyheng</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Treasures Hall 3</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Org Sympo 3</p>
                        <br />
                        <p className="whitespace-normal">NGO and Community Transformation in the Philippines</p>
                        <p className="whitespace-normal">Dr. Josephine Perez </p>
                        <p className="whitespace-normal">Department of Psychology, Ateneo de Manila University</p>
                        <br />
                        <p className="whitespace-normal">Convenor: Josephine Perez</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Narra Hall 3</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Org Sympo 4</p>
                        <br />
                        <p className="whitespace-normal">Psychology at the Forefront of Public Health </p>
                        <br />
                        <p className="whitespace-normal">Dr. Nino Jose Mateo</p>
                        <br />
                        <p className="whitespace-normal">Convenor: Nino Jose Mateo</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Narra Hall 1</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Org Sympo 5</p>
                        <br />
                        <p className="whitespace-normal">Best Practices in Clinical Supervision</p>
                        <br />
                        <p className="whitespace-normal">Dr. Anna Cristina Tuazon</p>
                        <p className="whitespace-normal">University of the Philippines Diliman</p>
                        <br />
                        <p className="whitespace-normal">Convenor: Anna Cristina Tuazon</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Narra Hall 2</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Org Sympo 6</p>
                        <br />
                        <p className="whitespace-normal">Transformative Narrative of Empowered and Extraordinary Filipino Women</p>
                        <br />
                        <p className="whitespace-normal">Dr. Olive Carandang</p>
                        <br />
                        <p className="whitespace-normal">Convenor: Lolina Bajin</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Yakal Hall 1</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Org Sympo 7</p>
                        <br />
                        <p className="whitespace-normal">Achieving Learning Competencies and Sound Psychological Wellbeing</p>
                        <br />
                        <p className="whitespace-normal">Dr. Julie Ann C. Faustino</p>
                        <br />
                        <p className="whitespace-normal">Convenor: Mary Ann Espinosa</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Yakal Hall 2</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Org Sympo 8</p>
                        <br />
                        <p className="whitespace-normal">Instruction, Support, and Beliefs in Southeast Asian Math Engagement</p>
                        <br />
                        <p className="whitespace-normal">Paul Angelo Arcega</p>
                        <p className="whitespace-normal">Department of Psychology of De La Salle University</p>
                        <br />
                        <p className="whitespace-normal">Convenor: Paul Angelo Arcega</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">4:00 pm</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Health Break</p>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </>
          )}
          {selected === "parallelE" && (
            <>
              <div className="w-screen overflow-x-auto">
                <p className="px-4 pt-4 whitespace-normal">Time: 4:00 pm - 6:00 pm</p>
                <Table className="w-full">
                  <TableBody>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">New Room 1</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 1</p>
                        <br />
                        <p className="whitespace-normal">Hon. Dr. Hector M. Perez</p>
                        <p className="whitespace-normal">Member, Professional Regulatory Board of Psychology</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">Psychologists as Expert Witnesses</p>
                        <br />
                        <span className="whitespace-normal">Moderator: Andrew Macalma</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">New Room 2</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 2</p>
                        <br />
                        <p className="whitespace-normal">Hon. Dr. Imelda Virginia G. Villar</p>
                        <p className="whitespace-normal">Member, Professional Regulatory Board of Psychology</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">A Quick Look at A Quick Look at Neurolinguistic Programming (NLP)</p>
                        <br />
                        <span className="whitespace-normal">Moderator:  Maryjun Delgado</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Yakal Hall 3</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 3</p>
                        <br />
                        <p className="whitespace-normal">Dr. Rhodora Gail T. Ilagan</p>
                        <p className="whitespace-normal">Faculty Member, Department of Psychology, Ateneo de Davao University</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">Disaster Situations: Psychological Practice and Response</p>
                        <br />
                        <span className="whitespace-normal">Moderator: Maureen Lara</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Mahogany Hall</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 4</p>
                        <br />
                        <p className="whitespace-normal">Kenneth Roy V. Aranas</p>
                        <p className="whitespace-normal">Psychologist, Rebel Fitness Inc.</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">The Psychology of Injury and Rehabilitation: Supporting Mental and Emotional Recovery</p>
                        <br />
                        <p className="whitespace-normal">Moderator: David Kuyunjik Damian</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Layco</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 5</p>
                        <br />
                        <p className="whitespace-normal">Jun Angelo Sunglao</p>
                        <p className="whitespace-normal">Mental Health and Psychosocial Services SIG</p>
                        <p className="whitespace-normal">Chairperson PAP</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">Introduction to Global and Public Mental Health: Critical Perspectives, Local Realities, and Sustainable Future</p>
                        <br />
                        <p className="whitespace-normal">Moderator: Gladys Canillo</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Hotel Quincentennial</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 6</p>
                        <br />
                        <p className="whitespace-normal">Antero Rosauro Arias, Jr.</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">Meaning-Making of Caregivers of Neurodivergents</p>
                        <br />
                        <p className="whitespace-normal">Moderator: Kate Anjelline Dela Cruz</p>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="w-screen overflow-x-auto">
                <p className="px-4 pt-4 whitespace-normal">Organized Symposium 4:00 pm - 6:00 pm</p>
                <Table className="w-full">
                  <TableBody>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Treasures Hall 1</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Org Sympo 1</p>
                        <br />
                        <p className="whitespace-normal">Issues in Lifespan Development Across Contexts</p>
                        <br />
                        <p className="whitespace-normal">Danielle Ochoa</p>
                        <p className="whitespace-normal">Associate Professor at the Department of Psychology, University of the Philippines Diliman</p>
                        <br />
                        <p className="whitespace-normal">Convenor: Danielle Ochoa</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Treasures Hall 2</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Org Sympo 2</p>
                        <br />
                        <p className="whitespace-normal">Psychological Insights to Engage Minds and the Future</p>
                        <br />
                        <p className="whitespace-normal">Oliver B. Sta Ana</p>
                        <br />
                        <p className="whitespace-normal">Convenor: Oliver Sta. Ana</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Treasures Hall 3</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Org Sympo 3</p>
                        <br />
                        <p className="whitespace-normal">Strengthening Meaning, Wellbeing and Workplace Mental Health in the Filipino Context</p>
                        <br />
                        <p className="whitespace-normal">Abraham Linco</p>
                        <p className="whitespace-normal">Industrial Organizational Psychology</p>
                        <br />
                        <p className="whitespace-normal">Convenor: Abraham Linco</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Narra Hall 3</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Org Sympo 4</p>
                        <br />
                        <p className="whitespace-normal">From Fear to Flourishing Understanding Hope,  Compassion, and Mental Health in Youth</p>
                        <br />
                        <p className="whitespace-normal">Merimee T. Siena</p>
                        <p className="whitespace-normal">Positive Psychology SIG</p>
                        <br />
                        <p className="whitespace-normal">Convenor: Merimee Siena</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Narra Hall 1</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Org Sympo 5</p>
                        <br />
                        <p className="whitespace-normal">Queer Lives Across the Lifespan</p>
                        <br />
                        <p className="whitespace-normal">Ken Andrei B. Cuarto</p>
                        <p className="whitespace-normal">LGBT Psych SIG</p>
                        <br />
                        <p className="whitespace-normal">Convenor: Ken Andrei Cuarto</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Narra Hall 2</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Org Sympo 6</p>
                        <br />
                        <p className="whitespace-normal">Adventure in Marriage and Family Therapy: Concurrent Individual and Relational Therapeutic Work Experience in the Philippines</p>
                        <br />
                        <p className="whitespace-normal">Raphael O. Inocencio</p>
                        <p className="whitespace-normal">Clinical Psychology Division</p>
                        <br />
                        <p className="whitespace-normal">Convenor: Raphael Inocencio</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Yakal Hall 1</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Org Sympo 7</p>
                        <br />
                        <p className="whitespace-normal">Cultural Values, Social Action, and Transnational Solidarity</p>
                        <br />
                        <p className="whitespace-normal">England Castro</p>
                        <p className="whitespace-normal">Social Psychology Division</p>
                        <br />
                        <p className="whitespace-normal">Convenor: England Castro</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Yakal  Hall 2</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Org Sympo 8</p>
                        <br />
                        <p className="whitespace-normal">Critical and Culturally Rooted Pedagogies in Psychology Learning and Teaching</p>
                        <br />
                        <p className="whitespace-normal">Junix Delos Santos</p>
                        <p className="whitespace-normal">Teaching Psychology</p>
                        <br />
                        <p className="whitespace-normal">Convenor: Junix Delos Santos</p>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </TabsContent>
        <TabsContent value="3">
          <Select onValueChange={(value) => setSelected1(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a session" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mainSession">Main Session</SelectItem>
              <SelectItem value="parallelF">Parallel Session F</SelectItem>
              <SelectItem value="sigMeetings">SIG Meetings</SelectItem>
              <SelectItem value="parallelG">Parallel Session G</SelectItem>
            </SelectContent>
          </Select>
          {selected1 === "mainSession" && (
            <>
              <div className="w-screen overflow-x-auto">
                <Table className="w-full">
                  <TableBody>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">8:00 am - 12:00 pm</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">e-Poster Presentations</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">9:00 am - 10:00 am</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Division Meeting</p>
                        <br />
                        <p className="whitespace-normal">Clinical Psychology</p>
                        <p className="whitespace-normal">Counseling Psychology</p>
                        <p className="pl-4 whitespace-normal">Industrial / Organizational Psychology</p>
                        <p className="pl-4 whitespace-normal">Developmental Psychology</p>
                        <p className="pl-4 whitespace-normal">Educational Psychology</p>
                        <p className="pl-4 whitespace-normal">Assessment Psychology</p>
                        <p className="pl-4 whitespace-normal">Social Psychology</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">10:00 am - 11:00 am</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="font-bold text-1xl whitespace-normal">Update Report on the Psychology Law Revisions</p>
                        <br />
                        <p className="whitespace-normal">Dr. Maria Caridad H. Tarroja</p>
                        <p className="whitespace-normal">2010-2012 PAP President</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">11:00 am - 12:00 pm</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="font-bold text-1xl whitespace-normal">Shaping The Future of Professional Psychology: The IPCP and Its Implications for Education, Career Pathways, Specialization, and International Mobility</p>
                        <br />
                        <p className="whitespace-normal">Dr. Miriam P. Cue</p>
                        <p className="whitespace-normal">Professional Regulatory Board of Psychology Chairperson</p>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground" />
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">END OF PAPCON-ARUPS Program</p>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </>
          )}
          {selected1 === "parallelF" && (
            <>
              <div className="w-screen overflow-x-auto">
                <p className="px-4 pt-4 whitespace-normal">Time: 7:30 am - 9:00 am</p>
                <Table className="w-full">
                  <TableBody>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Treasures Hall 1</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 1</p>
                        <br />
                        <p className="whitespace-normal">Assoc. Prof. Nanchatsan Sakunpong</p>
                        <p className="whitespace-normal">Associate Professor of Psychology, Srinakharinwirot University, Thailand </p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">Healing in Nature: Forest Therapy for LGBTQ+ Mental Health and Well-Being</p>
                        <br />
                        <span className="whitespace-normal">Moderator: Faridah Kristi Wetherick</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Treasures Hall 2</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 2</p>
                        <br />
                        <p className="whitespace-normal">Dr. Jusmawati Fauzaman </p>
                        <p className="whitespace-normal">Vice President, Malaysian Psychological Association</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">Rejuvenating the Soul in the Study of Psychology</p>
                        <br />
                        <span className="whitespace-normal">Moderator: Marianne Taladua</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Layco</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 3</p>
                        <br />
                        <p className="whitespace-normal">Dr. Henndy Ginting </p>
                        <p className="whitespace-normal">Licensed Psychologist, Indonesia</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">Healthy Behaviours in Chronic Illness</p>
                        <br />
                        <span className="whitespace-normal">Moderator: John Manuel Kliatchko</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Hotel Quincentennial</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 4</p>
                        <br />
                        <p className="whitespace-normal">Raphael Gunner (APA)</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">Contemporary Tends in Clinical Practice: Reflections on my Journey from Interpretation to Experience</p>
                        <br />
                        <p className="whitespace-normal">Moderator: Maria Isabel Lemen</p>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </>
          )}
          {selected1 === "sigMeetings" && (
            <>
              <div className="w-screen overflow-x-auto">
                <p className="px-4 pt-4 whitespace-normal">Time: 8:00 am - 9:00 am</p>
                <Table className="w-full">
                  <TableBody>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">New Room 1</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Environmental Psychology</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">New Room 2</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">LGBTQ Psychology</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Yakal Hall 3</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Sports Psychology</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Treasures Hall 1</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Psych Public Service</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Treasures Hall 2</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Positive Psychology</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Narra Hall 1</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">PWD Psychology</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Narra Hall 2</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Research Psychology</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Mahogany Hall</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Teaching Psychology</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Yakal Hall 1</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">MHPSS</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Yakal Hall 2</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Substance Use</p>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </>
          )}
          {selected1 === "parallelG" && (
            <>
              <div className="w-screen overflow-x-auto">
                <p className="px-4 pt-4 whitespace-normal">08:30 am - 10:00 am</p>
                <Table className="w-full">
                  <TableBody>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Treasures Hall 3</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 1</p>
                        <br />
                        <p className="whitespace-normal">Victor Go Weng Yew</p>
                        <p className="whitespace-normal">Group CEO, HELP Education Group Former President, PSIMA (Malaysian Psychology Association)</p>
                        <p className="whitespace-normal">Former President, ARUPS (ASEAN Regional Union of Psychological Science)</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">The Future of Psychology in a VUCA World</p>
                        <br />
                        <span className="whitespace-normal">Moderator: Faridah Kristi Wetherick</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Narra Hall 3</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 2</p>
                        <br />
                        <p className="whitespace-normal">Dr. Daniella Maryam Mohd Mokhtar</p>
                        <p className="whitespace-normal">Assistant Secretary, Malaysian Psychological Association</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">Strengthening Personal Resilience – Coping with Workplace Bullying</p>
                        <br />
                        <span className="whitespace-normal">Moderator: Juniebe Manganohoy</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Layco</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 3</p>
                        <br />
                        <p className="whitespace-normal">Mr. Jeremy Heng</p>
                        <p className="whitespace-normal">Senior Psychologist, Deputy Head Singapore Children’s Society. Past Honorary Secretary of the Singapore Psychology Society (SPS)</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">Promoting Trauma Recovery in Residential Care: A Singaporean Perspective</p>
                        <br />
                        <span className="whitespace-normal">Moderator: John Manuel Kliatchko</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Hotel Quincentennial</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Learning Session 4</p>
                        <br />
                        <p className="whitespace-normal">Nancy Sidun (APA)</p>
                        <br />
                        <p className="font-bold text-1xl whitespace-normal">Change and Catastrophe:Gendered Impacts of the Lahaina Wildfire on Filipino Women</p>
                        <br />
                        <p className="whitespace-normal">Moderator: Maria Isabel Lemen</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">9:00 am - 10:00 am</p>
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p className="whitespace-normal">Psych CHED Techinical Panel Consultative Meeting</p>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle />
            <DialogDescription />
          </DialogHeader>
          <Card className="w-full max-w-md shadow-lg border-none shadow-none">
            <CardHeader className="flex flex-col items-center text-center">
              <Avatar className="w-20 h-20 mb-4">
                <AvatarImage src={selectedUser?.image} alt="User Avatar" />
                <AvatarFallback>{selectedUser?.initials}</AvatarFallback>
              </Avatar>
              <CardTitle>{selectedUser?.name}</CardTitle>
              <CardDescription className="space-y-1">
                <p className="whitespace-normal">{selectedUser?.title}</p>
              </CardDescription>
              <CardDescription className="space-y-1">
                <p className="whitespace-normal">{selectedUser?.title2}</p>
              </CardDescription>
            </CardHeader>

            <CardContent>
              <p className="text-sm font-normal text-muted-foreground text-justify">
                {selectedUser?.description}
              </p>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
}