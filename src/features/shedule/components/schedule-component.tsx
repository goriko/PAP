'use client';

import { Card, CardContent } from "@/features/shared/components/base/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/features/shared/components/base/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/features/shared/components/base/tabs";
import { Button } from "@/features/shared/components/base/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/features/shared/components/base/dialog"
import { Input } from "@/features/shared/components/base/input"
import { Label } from "@/features/shared/components/base/label"
import { useState } from 'react';

import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/features/shared/components/base/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/features/shared/components/base/avatar";

const users = [
  { name: 'PROR. BRIDGITTE KHOURY, PHD', title: 'President-Elect, International Union of Psychological Societies', description: 'Dr. Khoury is a professor and Vice Chair for psychological affairs at the Psychiatry Department at the Faculty of Medicine, American University of Beirut, Lebanon. Dr. Khoury is an expert in trauma, refugees\' mental health, sexuality and LGBTQ+, and diagnostics and classification. Dr. Khoury is the vice president of the founding board of the Lebanese Order of Psychologists. She is a fellow of the American Psychological Association and was the past president for the International Psychology division. She serves currently as the president-elect of the International Union of Psychological Science.' },
  { name: 'MR ADRIAN TOH', title: 'President, ASEAN Regional Union of Psychological Societies', description: 'Adrian Toh is the President of the Singapore Psychological Society (SPS) and an advocate for advancing psychology in ASEAN. He contributed to The Handbook of International Psychology Ethics and the SPS Code of Ethics revision, working with local and international bodies to strengthen professional standards and ethical decision-making in diverse cultural contexts.' },
  { name: 'DR. ARTHUR EVANS JR.', title: 'Chief Executive Officer, American Psychological Association', description: 'Clinical and community psychologist and health care innovator Arthur C. Evans Jr., PhD, is CEO of the American Psychological Association, the leading scientific and professional organization representing psychology in the United States. With more than 146,000 researchers, educators, clinicians, consultants, and students as members, APA promotes and disseminates psychological knowledge to benefit society and improve lives a mission consistent with Evans\' life work' },
  { name: 'DR. DEBRA M. KAWAHARA', title: 'President, American Psychological Association', description: 'She is the associate dean of Academic Affairs and distinguished professor at the California School of Professional Psychology, Alliant International University. She manages over 20 programs in psychology and mental health across six campuses in California, as well as online. Additionally, she has an independent practice where she sees individuals, couples, and families, and conducts trainings for organizations. As the 2025 president of the American Psychological Association (APA), Kawahara aims to bring her campaign slogan, "Strength in Unity," to fruition. She is the first Asian American woman and the first Japanese American to serve in this role' },
  { name: 'Atty. Floranie Polo-Jacob', title: '2000 - 2001 President, Psychological Association of the Philippines', title2: 'Of Counsel, VBSP Law Offices', description: 'Atty. "Nanie" Jacob has been a Lawyer for more than thirty years now, and a Psychologist for over 50 years. Being both Psychologist and Lawyer, she has focused her legal practice in Family Law, particularly in marriage dissolution, child adoption, protection of children, property relations, settlement of estates, and other civil cases relative to Persons and Family. She served as Board Member of the ICAB (Intercountry Adoption Board) as both Psychologist and Lawyer. She continues to be active in the Psychological Association of the Philippines having served as Board Director and President. She is also active in espousing the concepts of Forensic Psychology and Therapeutic Jurisprudence vis-à-vis Therapeutic Justice. She was instrumental in the formulation of the Psychology Bill and continues to render participation in current efforts relative to the Law which, at present, faces revision and possible amendments incorporating issues about Psychometricians vis-a-vis Psychologists.' },
  { name: 'Dr. Rose Marie Clemenia', title: '1995-1996 President, Psychological Association of the Philippines', title2: '2015 PRC Outstanding Professional of the Year in the Field of Psychology', description: 'Clinical and community psychologist and health care innovator Arthur C. Evans Jr., PhD, is CEO of the American Psychological Association, the leading scientific and and professional organization representing psychology in the United States. With more than 146,000 researchers, educators, clinicians, consultants, and students as members, APA promotes and disseminates psychological knowledge to benefit society and improve lives - a mission consistent with Evans\' life work' },
  { name: 'Dr. Grace H. Aguiling-Dalisay', title: '2024 PRC Outstanding Professional of the Year in the Field of Psychology', title2: 'President and CEO, Center for Educational Measurement', description: 'She has had an exceptional career as a distinguished figure in psychology and education. She was Full Professor of Psychology until her retirement from the University of the Philippines Diliman in 2021. Her work has greatly influenced Indigenous psychology in the Philippines. In 2001, she co-founded Volunteer Organizations Information, Coordination and Exchange (VOICE) where she served as the executive director, continuing to the present as founding president on the board. She was recognized as the 2024 PRC Outstanding Professional of the Year in the Field of Psychology. This award signifies significant accomplishments and contributions to the field of psychology. Currently, she holds the position of President and CEO of the Center for Educational Measurement, Inc.' },
];

export function ScheduleComponent() {

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

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
          <div>
            <Table className="min-w-[800px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="p-4 font-medium text-foreground">
                    Time
                  </TableHead>
                  <TableHead className="p-4 font-medium text-foreground">
                    Activity
                  </TableHead>
                  <TableHead className="p-4 font-medium text-foreground">
                    Topic / Speaker
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="p-4 font-medium text-foreground">
                    6:00 am
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    Registration
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground" />
                </TableRow>
                <TableRow>
                  <TableCell className="p-4 font-medium text-foreground">
                    8:00 am
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    Invocation
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground" />
                </TableRow>
                <TableRow>
                  <TableCell className="p-4 font-medium text-foreground" />
                  <TableCell className="p-4 font-medium text-foreground">
                    Singing of the National Anthem
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground" />
                </TableRow>
                <TableRow>
                  <TableCell className="p-4 font-medium text-foreground" />
                  <TableCell className="p-4 font-medium text-foreground">
                    Introduction of the PAP President
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground" />
                </TableRow>
                <TableRow>
                  <TableCell className="p-4 font-medium text-foreground" />
                  <TableCell className="p-4 font-medium text-foreground">
                    Welcome Remarks
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p>Dr. Glenn G. Glarino</p>
                    <span>
                      President, Psychological Association of the
                      Philippines, Inc.
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow onClick={() => handleRowClick(users[1])}>
                  <TableCell className="p-4 font-medium text-foreground" />
                  <TableCell className="p-4 font-medium text-foreground">
                    Welcome Remarks
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p>Mr. Adrian Toh</p>
                    <span>
                      President, ASEAN regional Union of Psychological
                      Societies
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow onClick={() => handleRowClick(users[0])}>
                  <TableCell className="p-4 font-medium text-foreground" />
                  <TableCell className="p-4 font-medium text-foreground">
                    Opening Address
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p>Prof. Brigitte Khoury, PhD</p>
                    <span>
                      President-Elect, Internationl Union of Psychological
                      Societies
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow onClick={() => handleRowClick(users[1])}>
                  <TableCell className="p-4 font-medium text-foreground">
                    9:00 am
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    Keynote Address 1
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p>Mr. Adrian Toh</p>
                    <p>
                      President, ASEAN regional Union of Psychological
                      Societies
                    </p>
                    <span>
                      Advancing Mental Health in ASEAN: Bridging Policy,
                      Practice, and Cultural Diversity
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow onClick={() => handleRowClick(users[2])}>
                  <TableCell className="p-4 font-medium text-foreground">
                    10:00 am
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    Plenary Session 1
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p>Dr. Arthur Evans Jr.</p>
                    <p>
                      Chief Executive Officer, American Psychological
                      Association
                    </p>
                    <span>
                      Scaling Public Health Approaches for Mental Health
                      Through Innovations in Policy, Community-Based Care
                      and Disaster Response
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow onClick={() => handleRowClick(users[3])}>
                  <TableCell className="p-4 font-medium text-foreground">
                    11:00 am
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    Plenary Session 3
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p>Dr. Debra Kawahara</p>
                    <p>President, American Psychological Association</p>
                    <span>
                      Integrating Intersectionality and Feminist Principles
                      to Empower Diverse Populations
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="p-4 font-medium text-foreground">
                    12:00 am
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    PAP General Assembly
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p>Report on the operations of PAP for the past year</p>
                    <p>Financial Report</p>
                    <p>Membership Report</p>
                    <p>
                      Expressed appreciation to the outgoing members of the
                      BOD
                    </p>
                  </TableCell>
                </TableRow>
                <TableRow onClick={() => handleRowClick(users[4])}>
                  <TableCell className="p-4 font-medium text-foreground">
                    01:30 pm
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    Keynote Address 2
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p>Atty. Floranie Polo-Jacob</p>
                    <p>
                      2000 - 2001 President, Psychological Association of
                      the Philippines
                    </p>
                    <p>Of Counsel, VBSP Law Offices</p>
                    <span>
                      The Law Meets Psychology: A Cross-Disciplinary Path to
                      Justice and Well-Being (The Philippine Experience)
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow onClick={() => handleRowClick(users[5])}>
                  <TableCell className="p-4 font-medium text-foreground">
                    02:30 pm
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    Plenary Session 4
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p>Dr. Rose Marie Clemenia</p>
                    <p>
                      1995-1996 President, Psychological Association of the
                      Philippines
                    </p>
                    <p>
                      2015 PRC Outstanding Professional of the Year in the
                      Field of Psychology
                    </p>
                    <span>
                      Reflections on the Practice of Filipino Psychology for
                      Human Development
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow onClick={() => handleRowClick(users[6])}>
                  <TableCell className="p-4 font-medium text-foreground">
                    03:30 pm
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    Plenary Session 5
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p>Dr. Grace H. Aguiling-Dalisay</p>
                    <p>
                      2024 PRC Outstanding Professional of the Year in the
                      Field of Psychology
                    </p>
                    <p>
                      President and CEO, Center for Educational Measurement
                    </p>
                    <span>
                      Reflections on the Practice of Filipino Psychology for
                      Human Development
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="p-4 font-medium text-foreground">
                    07:00 pm
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground"></TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p>Fellowship Night(Cocktails)</p>
                    <p>Announcement of Official Results of Elections</p>
                    <span>Awarding of Certified Specialists</span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="p-4 font-medium text-foreground">
                    8:00 am - 06:00 pm
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground"></TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p>e-Poster Presentations</p>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="2">
          <Tabs defaultValue="1">
            <TabsList>
              <TabsTrigger value="1">Parallel Session A</TabsTrigger>
              <TabsTrigger value="2">Parallel Session B</TabsTrigger>
              <TabsTrigger value="3">Parallel Session C</TabsTrigger>
              <TabsTrigger value="4">Parallel Session D</TabsTrigger>
              <TabsTrigger value="5">Parallel Session E</TabsTrigger>
            </TabsList>
            <TabsContent value="1">
              <p>Time: 8:30 am - 10:00 am</p>
              <div>
                <Table className="min-w-[800px]">
                  <TableBody>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        New Room 1
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Learning Session 1
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Dr. Karen Katrina V. Trinidad</p>
                        <p>
                          Chair, Department of Psychology, College of
                          Science, University of Santo Tomas
                        </p>
                        <br />
                        <p className="font-bold text-1xl">
                          The Important Role Psychologist Play in Sports
                        </p>
                        <br />
                        <span>Moderator: Alyssa Kae Alegre</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        New Room 2
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Learning Session 2
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Dr. Henndy Ginting</p>
                        <p>Licensed Psychologist, Indonesia</p>
                        <br />
                        <p className="font-bold text-1xl">
                          Assessment of Personality Styles dan Disorders
                        </p>
                        <br />
                        <span>Moderator: Raj Pallon</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        New Room 3
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Learning Session 3
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Ms. Karen Rose Vardeleon</p>
                        <p>Founding Partner of Childfam-Possibilities</p>
                        <br />
                        <p className="font-bold text-1xl">
                          Deliberate Practice for Counselors
                        </p>
                        <br />
                        <span>Moderator: Alyssa Marie Dar Juan</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Mahogany Hall
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Learning Session 4
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Dr. Mary Grace Serranilla-Orquiza</p>
                        <p>(PAP Developmental Psych Division)</p>
                        <p>
                          President and Founder, GrayMatters Psychological
                          and Consultancy, Inc.
                        </p>
                        <br />
                        <p className="font-bold text-1xl">
                          Mapping Practices, Pioneering Progress:
                          Innovations in Elderly Mental Health Care for
                          Aging Filipinos
                        </p>
                        <br />
                        <p>Moderator: Ma. Catherine Pestaño-Africa</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Yakal Hall 1
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Learning Session 5
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Dr. Clarissa F. Delariarte</p>
                        <p>Licensed Psychologist and Guidance Counsellor</p>
                        <br />
                        <p className="font-bold text-1xl">
                          The value of Qualitative Findings in the Practice
                          of Psychology
                        </p>
                        <br />
                        <p>Moderator: Sr. Angelina M. Julom</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Layco
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Learning Session 6
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Oliver B. Sta. Ana</p>
                        <p>Edicational Psychology Division</p>
                        <br />
                        <p className="font-bold text-1xl">
                          Why Academic Resilience Matters in the Context of
                          Climate Change
                        </p>
                        <br />
                        <p>Moderator: Elise Limson</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Hotel Quincentannial
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Learning Session 7
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <br />
                        <p className="font-bold text-1xl">APA Panel</p>
                        <br />
                        <p>Moderator: Carlos Buan</p>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <p>Organized Symposium 1-6: 8:30 am - 10:00 am</p>
              <div>
                <Table className="min-w-[800px]">
                  <TableBody>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Treasurers Hall 1
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Vulnerable Communities Focus
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Dr. Edo Jaya</p>
                        <p>Researcher and clinical Psychologist</p>
                        <p>Indonesian Psychological Healthcare Center</p>
                        <br />
                        <span>Convenor: Henmar Cardiño</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Treasurers Hall 2
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Substance Use Prevention and Rehabilitation in the
                        Philippines: Approaches, Evidences and Narrative
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Trixia Anne C. Co</p>
                        <p>
                          Chairperson - Substance Use, Prevention, and
                          Recovery
                        </p>
                        <br />
                        <span>Convenor: Trixia Anne C. Co</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Treasurers Hall 3
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Psychological Landscape in Sports and Movement
                        Exploring Anxiety, Motivation and Mental Health
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Naira Orbeta</p>
                        <p>Sports Psychology SIG</p>
                        <br />
                        <span>Convenor: Naira Orbeta</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Treasures Hall 4
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Queer Justice and Advocacy in the Philippines
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Rolf Gian Marcos</p>
                        <p>LGBT Psychology SIG</p>
                        <br />
                        <p>Convenor: Rolf Gian Marcos</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Narra Hall 1
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Navigating Filipino Work Realities: Leadership, Team
                        Development, and Indigenous HR Practices
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Riyan Portuguez</p>
                        <p>Chairperson - Industrial Organizational</p>
                        <p>Psychology Division</p>
                        <br />
                        <p>Convenor: Riyan Portuguez</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Narra Hall 2
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Wellbeing and Mental Health in Higher Education
                        Frameworks, Protocols, and Best Practices
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Kristine Faith C. Moral</p>
                        <p>Chairperson - N.NCR Chapter</p>
                        <br />
                        <p>Convenor: Kristine Faith C. Moral</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Yakal Hall 2
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Culturally Responsive Mindfulness BaseD-Program
                        Initial Outcomes and Evidence of Feasibility and
                        Acceptability
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Angelique Pearl Virtue P. Villasanta</p>
                        <p>Research Psychology SIG</p>
                        <br />
                        <p>
                          Convenor: Angelique Pearl Virtue P. Villasanta
                        </p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        10:00 am
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Health Break
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground"></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="2">
              <p>Time: 10:30 am - 12:00 pm</p>
              <div>
                <Table className="min-w-[800px]">
                  <TableBody>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        New Room 1
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Learning Session 1
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Ms. Maria Adela Guerreroy</p>
                        <p>DSWD Program Management Bureau</p>
                        <br />
                        <p className="font-bold text-1xl">
                          Psychological Practice in Social Work
                        </p>
                        <br />
                        <span>Moderator: Alyssa Kae Alegre</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        New Room 2
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Learning Session 2
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Dr. Patricia Hayres Arroyo Perez</p>
                        <p>
                          Faculty Member, Department of Psychology, Adler
                          University, Chicago, USA
                        </p>
                        <br />
                        <p className="font-bold text-1xl">
                          The global Context of Psychology and Human Rights
                        </p>
                        <br />
                        <span>Moderator: Ar-jay Perez</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        New Room 3
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Learning Session 3
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Ms. Irene MArie S. Isleta</p>
                        <p>
                          Assistant Vice President, Human Resources Group,
                          St. Luke's Medical Center
                        </p>
                        <p>
                          2023 President - Philippine Society for Talent
                          Development
                        </p>
                        <br />
                        <p className="font-bold text-1xl">
                          Human Sustainability at Work: Mental Health,
                          Organizational Vulture, and Employee Engagement
                        </p>
                        <br />
                        <span>Moderator: Abraham Linco</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Mahogany Hall
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Learning Session 4
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Ms. Elaine Salansan Ferrer</p>
                        <p>
                          Training Lead Mental Health and Psychological
                          Services SIG
                        </p>
                        <p>
                          PsycServ, Freelance Training and People
                          Development Consultant
                        </p>
                        <br />
                        <p className="font-bold text-1xl">
                          Beyond PFA: Exploring Best PRactices outside of
                          Psychological First Aid
                        </p>
                        <br />
                        <p>Moderator: Ma. Jun Angelo Sungalo</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Yakal Hall 1
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Learning Session 5
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Dr. Arsenio Sze Alianan Jr.</p>
                        <p>
                          Faculty Member, Department of Psychology, Ateneo
                          de Manila University
                        </p>
                        <br />
                        <p className="font-bold text-1xl">
                          GenAI in the Conduct of Psychological Assessment
                        </p>
                        <br />
                        <p>Moderator: Sr. Angelina Julom</p>
                      </TableCell>
                    </TableRow>
                    <TableRow onClick={() => handleRowClick(users[1])}>
                      <TableCell className="p-4 font-medium text-foreground">
                        Layco
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Learning Session 6
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Mr. Adrian Toh</p>
                        <p>
                          President, Singapore Psychological Society Science
                        </p>
                        <br />
                        <p className="font-bold text-1xl">
                          Ethical Decision-Making Process
                        </p>
                        <br />
                        <p>Moderator: Faridah Kristi Wetherick</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Hotel Quincentannial
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Learning Session 7
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <br />
                        <p className="font-bold text-1xl">APA Panel</p>
                        <br />
                        <p>Moderator: Carlos Buan</p>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <p>Organized Symposium 1-6: 10:30 am - 12:00 pm</p>
              <div>
                <Table className="min-w-[800px]">
                  <TableBody>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Treasurers Hall 1
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Psychological Responses to Climate Crisis
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>John Jamir Benzon R. Aruta</p>
                        <p>Chairperson</p>
                        <p>Environmental Psychology SIG</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Treasurers Hall 2
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Struggles and Strength Stories of Hope, Healing and
                        Well-being
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Gabriel Sebastian N. Lizada</p>
                        <p>Chairperson</p>
                        <p>Positive Psychology SIG</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Treasurers Hall 3
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Pathways to Education, Prosociality, and Youth
                        Participation
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Jeremiah Paul C. Silvestre</p>
                        <p>Chairperson</p>
                        <p>Social Psychology Division</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Treasures Hall 4
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Reimagining Pedagogical Futures: Innovations,
                        Ethics, and AI in Psychology Learning and Teaching
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Pat Kathlyn Dione D. Ramirez</p>
                        <p>Chairperson</p>
                        <p>Teaching Psychology</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Narra Hall 1
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Care and Connection in Neurodiverse Realities:
                        Filipino Narrativesof Resilience, Rights and
                        Relationship
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Antero Rosauro V. Arias Jr.</p>
                        <p>Chairperson</p>
                        <p>Person with Disabilities Psych-SIG</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Narra Hall 2
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Experiences in Sports: Perspective on Participation,
                        Resilience, Rights and Relationship
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>David Kuyunjik Damian</p>
                        <p>Sports Psychology SIG</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Yakal Hall 2
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Intersecting Minds: Cultural and Clinical
                        Perspectives on Body Dysmorphic and Obsessive
                        Compulsive Disorders in Southeast Asia
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Peejay D. Bengwasan</p>
                        <p>Clinical Psych Division</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        12:00 pm
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Lunch Break
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground"></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        12:00 pm - 1:00 pm
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Chapter Meeting
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Bicol</p>
                        <p>Northern Luzon</p>
                        <p>Central Luzon</p>
                        <p>CALABARZON-MIMAROPA</p>
                        <p>Southern Mindanao</p>
                        <p>NCR South</p>
                        <p>NCR North</p>
                        <p>Western Visayas</p>
                        <p>Northern Mindanao</p>
                        <p>Western Mindanao</p>
                        <p>Cebu Leyte Samar Biliran (CLSB)</p>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="3">
              <p>Time: 1:00 pm - 2:30 pm</p>
              <div>
                <Table className="min-w-[800px]">
                  <TableBody>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        New Room 1
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Learning Session 1
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Dr. Ron R. Resurrecion</p>
                        <p>
                          Director, Student Success Center, De La Salle
                          University
                        </p>
                        <br />
                        <p className="font-bold text-1xl">
                          Towards Inclusive Education: Facilitators,
                          Barriers, and Insights from Higher Education
                          Teachers
                        </p>
                        <br />
                        <span>Moderator: Abigail Capay</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        New Room 2
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Learning Session 2
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Elvira C. David</p>
                        <p>Professor, Holy Angel University</p>
                        <p>
                          Clinical and Assessment Practitioner, Espada
                          Psychological Consultancy
                        </p>
                        <br />
                        <p className="font-bold text-1xl">
                          Strength-Based Approach in Assessment: Integration
                          and Practice Considerations
                        </p>
                        <br />
                        <span>Moderator: Rachel C. Reyes-Laureano</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        New Room 3
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Learning Session 3
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Dr. Mira Alexis P. Ofreneo</p>
                        <p>Director, University Gender Hub</p>
                        <p>Ateneo de Manila Unisersity</p>
                        <br />
                        <p className="font-bold text-1xl">
                          Institutionalizing Gender-Inclusive Practices in
                          HEIs: The Story of the Ateneo Gender Hub
                        </p>
                        <br />
                        <span>Moderator: Rolf Gian Marcos</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Mahogany Hall
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Learning Session 4
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Hon. Judge Jose Nathaniel S. Andal</p>
                        <p>Regional Trial Court Judge, Cebu City</p>
                        <br />
                        <p className="font-bold text-1xl">
                          Psychological Practice in Family Court Civil Cases
                        </p>
                        <br />
                        <p>Moderator: Odette Esteve</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Layco
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Learning Session 5
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>
                          England Danne B. Castro (Social Psych Division)
                        </p>
                        <p>Faculty, De La Salle University</p>
                        <br />
                        <p className="font-bold text-1xl">
                          Ugnayan: Applying Social Psychology to Advocay
                          Work and Community Action
                        </p>
                        <br />
                        <p>Moderator: Jeremiah Paul Silvestre</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Hotel Quincentannial
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Learning Session 6
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <br />
                        <p className="font-bold text-1xl">APA Panel</p>
                        <br />
                        <p>Moderator: Carlos Buan</p>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <p>Organized Symposium 1-6: 1:00 pm - 2:30 pm</p>
              <div>
                <Table className="min-w-[800px]">
                  <TableBody>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Treasurers Hall 1
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Regional Roots, Gloobal Goals: Psychology in Action
                        for Health, Education, Inclusion, and Resilience
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Mahjalin Araiza B. Diez</p>
                        <p>CALABARZON Chapter</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Treasurers Hall 2
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        A Community that Cares: Task Shifting Mental Health
                        Initiatives in Underserved Settings
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Jun Angelo Sunglaon</p>
                        <p>Mental Health and Psychosocial Services</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Treasurers Hall 3
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Approaches in Learning Cognitive Development of
                        Children and Adults
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Jericho Medel</p>
                        <p>Developmental Psychology Division</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Treasures Hall 4
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Counseling Psychology and clinical Governance:
                        Latest Trends in Client Needs, Systems, and
                        Professional Care
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Lance Lyle De Jesus</p>
                        <p>Counseling PSychology Division</p>
                        <br />
                        <p>Convenor: Alessandra Arpon</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Narra Hall 1
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Effectiveness and Impact of Interventions
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Dr. Lianne P. Alampay</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Narra Hall 2
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        From Pathogenesis to Recovery: Exploring the
                        Spectrum of Mental Health Disorder
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Peejay Bengwasan</p>
                        <p>Clinical Psychology</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Yakal Hall 1
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Resilience and Well-being in Northern Mindanao: Key
                        Features and Implications to Mental Health
                        Intervention
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Jayson Manaois</p>
                        <p>Northern Mindanao Chapter</p>
                        <br />
                        <p>Convenor: Yayet Dela Peña</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Yakal Hall 2
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Queering and Decolonizing Psychology in Asia
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Mx. Kyle Tan</p>
                        <br />
                        <p>Convenor: Ar-Jay Perez</p>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="4">
              <p>Time: 2:30 pm - 4:00 pm</p>
              <div>
                <Table className="min-w-[800px]">
                  <TableBody>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        New Room 1
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Learning Session 1
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Alexandria Blake c. Real-Pisalbo</p>
                        <p>(Environmental Psych SIG)</p>
                        <br />
                        <p className="font-bold text-1xl">
                          Practicing Nature-based Therapy as a
                          Psychoterapeutic Approach and a Pathway toward
                          Environmental Action
                        </p>
                        <br />
                        <span>Moderator: Maica Pineda</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        New Room 2
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Learning Session 2
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Peejay D. Bengwasan</p>
                        <p>(Clinical Psych Division)</p>
                        <p>De La Salle University</p>
                        <br />
                        <p className="font-bold text-1xl">
                          Fifty Minutes to Change: Crafting a CBT Session
                          That Works
                        </p>
                        <br />
                        <span>Moderator: Raphael O. Inocencio</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        New Room 3
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Learning Session 3
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Aneesh Kumar, PhD</p>
                        <p>Associate Professor</p>
                        <p>CHRIST University (Bengaluru, India)</p>
                        <br />
                        <p className="font-bold text-1xl">
                          Centering the Learner, Centering the World:
                          Psychological Literacy and Competency-based
                          Psychology Education
                        </p>
                        <br />
                        <span>Moderator: Ver Reyes</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Mahogany Hall
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Learning Session 4
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Angelique Pearl Virtue P. Villasanta</p>
                        <p>
                          Instructor, Department of Psychology, Ateneo de
                          Manila University
                        </p>
                        <p>
                          Principal Investigator, Sexual Violence and
                          Healing Research, Gender Justice Research
                          Collective, Ateneo de Manila University
                        </p>
                        <br />
                        <p className="font-bold text-1xl">
                          Reimagining Research: A Brief Introduction to
                          Feminist Research Practices in Psychology
                        </p>
                        <br />
                        <p>Moderator: Jaime Felice Caringal-Go</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Layco
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Learning Session 5
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Gabriel Sebastian N. Lizada</p>
                        <p>
                          Co-Managing Partner, Olive Branch Wellbeing
                          Center, Davao City, Philippines
                        </p>
                        <br />
                        <p className="font-bold text-1xl">
                          Bazinga! Why Your Feelings Know Things Before You
                          Do
                        </p>
                        <br />
                        <p>Moderator: Merimee T. Siena</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Hotel Quincentannial
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Learning Session 6
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Trixia Anne C. Co</p>
                        <p>
                          President, Singapore Psychological Society Science
                        </p>
                        <br />
                        <p className="font-bold text-1xl">
                          Strengthening Coaching and Supervision in
                          Community-Based Drug Rehabilitation Programs
                        </p>
                        <br />
                        <p>Moderator: Gino Cabrera</p>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <p>Organized Symposium 1-6: 2:30 pm - 4:00 pm</p>
              <div>
                <Table className="min-w-[800px]">
                  <TableBody>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Treasurers Hall 1
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Psychological Testing and Assessment in the
                        Philippines
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Dr. Arsenio Sze Allanan Jr.</p>
                        <p>Assessment Psychology SIG</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Treasurers Hall 2
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Multilalyered Political Psychology of Sustainable
                        Peace
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Dr Joshua Uyheng</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Treasurers Hall 3
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        NGO and Community Transformation in the Philippines
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Dr Josephine Perez</p>
                        <p>
                          Deparment of Psychology, Ateneo de Manila
                          University
                        </p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Treasures Hall 4
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Psychology at the Forefront of Public Health
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Dr Nino Jose Mateo</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Narra Hall 1
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Best Practicess in Clinical Supervision
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Dr. Anna Cristina Tuazon</p>
                        <p>University of the Philippines Diliman</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Narra Hall 2
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Transformative Narrative of Empowered and
                        Extraordinary Filipino Women
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Dr. Olive Carandang</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Yakal Hall 1
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Acheiving Learning Competencies and Sound
                        Psychological Wellbeing
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Dr. Julie Ann C. Faustino</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Yakal Hall 2
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Instruction, Support, and Beliefs in Southeast Asian
                        Math Engagement
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Paul Angelo Arcega</p>
                        <p>
                          Department of Psychology od De La Salle University
                        </p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        4:00 pm
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Health Break
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground"></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="5">
              <p>Time: 4:00 pm - 6:00 pm</p>
              <div>
                <Table className="min-w-[800px]">
                  <TableBody>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        New Room 1
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Learning Session 1
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Hon. Dr. Hector M. Perez</p>
                        <p>
                          Member, Professional Regulatory Board of
                          Psychology
                        </p>
                        <br />
                        <p className="font-bold text-1xl">
                          Psychologist as Expert Witnesses
                        </p>
                        <br />
                        <span>Moderator: Andrew Macalma</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        New Room 2
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Learning Session 2
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Hon. Dr. Imelda Virginia G. villar</p>
                        <p>
                          Member, Professional Regulatory Board of
                          Psychology
                        </p>
                        <br />
                        <p className="font-bold text-1xl">
                          A Quick Look at A Quick Look at Neurolinguistic
                          Programming (NLP)
                        </p>
                        <br />
                        <span>Moderator: Maryjun Delgado</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        New Room 3
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Learning Session 3
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Dr. Rhodora Gail T. Ilagan</p>
                        <p>
                          Faculty Member, Department of Psychology, Ateneo
                          de Davao University
                        </p>
                        <br />
                        <p className="font-bold text-1xl">
                          Disaster Situations: Psychological Practice and
                          Response
                        </p>
                        <br />
                        <span>Moderator: Maureen Lara</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Mahogany Hall
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Learning Session 4
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Kenneth Roy V. Arana</p>
                        <p>Psychologist, Rebel Fitness Inc.</p>
                        <br />
                        <p className="font-bold text-1xl">
                          The Psychology of Injury and Rehabilitation:
                          Supporting Mental and Emotional Recovery
                        </p>
                        <br />
                        <p>Moderator: David Kuyunjik Damian</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Layco
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Learning Session 5
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Jun angelo Sungalo</p>
                        <p>Mental Health and Psychosocial Services SIG</p>
                        <p>Chairperson PAP</p>
                        <br />
                        <p className="font-bold text-1xl">
                          Introduction to Global and Public Mental Health:
                          Critical Perspectives, Local Realities, and
                          Sustainable future
                        </p>
                        <br />
                        <p>Moderator: Gladys Canillo</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Hotel Quincentannial
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Learning Session 6
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Antero Rosauro Arias Jr.</p>
                        <br />
                        <p className="font-bold text-1xl">
                          Meaning-Making of Caregivers of Neurodivergents
                        </p>
                        <br />
                        <p>Moderator: Kate Anjelline Dela Cruz</p>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <p>Organized Symposium 1-4: 4:00 pm - 6:00 pm</p>
              <div>
                <Table className="min-w-[800px]">
                  <TableBody>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Treasurers Hall 1
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Issues in Lifespan Development Across Contexts
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Danielle Ochoa</p>
                        <p>
                          Associate Professor at the Department of
                          Psychology, University of the Philippines Diliman
                        </p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Treasurers Hall 2
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Psychological Insights to Engage Minds and the
                        Future
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Oliver B. Sta. Ana</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Treasurers Hall 3
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Strengthening Meaning, Wellbeing and Workplace
                        Mental Health in the Filipino Context
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Abraham Linco</p>
                        <p>Industrial Organizational Psychology</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Treasures Hall 4
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        From Fear to Flourishing Understanding Hope,
                        Compassion, and Mental Health in Youth
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Merimee T. Siena</p>
                        <p>Positive Psychology SIG</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Narra Hall 1
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Queer Lives Across the Lifespan
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Ken Andrei B. Cuarto</p>
                        <p>LGBT Psych SIG</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Narra Hall 2
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Adventure in Marriage and family Theraphy:
                        Concurrent Individual and Relational Therapeutic
                        Work Experience in the Philippines
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Raphael O. Inocencio</p>
                        <p>Clinical Psychology Division</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Yakal Hall 1
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Cultural Values, Social Action, and Transnational
                        Solidarity
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>England Castro</p>
                        <p>Social Psychology Division</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        Yakal Hall 2
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Resilient Psychology for Equitable Futures in Work,
                        Techonology, and Urban Communities
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        <p>Junix Delos Santos</p>
                        <p>Teaching Psychology</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-4 font-medium text-foreground">
                        4:00 pm
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground">
                        Health Break
                      </TableCell>
                      <TableCell className="p-4 font-medium text-foreground"></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>
        <TabsContent value="3">
          <p>Parallel Session F: 7:30 am - 09:00 am</p>
          <div>
            <Table className="min-w-[800px]">
              <TableBody>
                <TableRow>
                  <TableCell className="p-4 font-medium text-foreground">
                    Treasurers Hall 1
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    Learning Session 1
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p>Assoc. Prof. Nanchatsan Sakunpong</p>
                    <p>Associate Professor of Psyhology, Srinakharinwirot University, Thailand</p>
                    <br />
                    <p className="font-bold text-1xl">
                      Healing in Nature: Forest Theraphy for LGBTQ+ Mental Health and Well-Being
                    </p>
                    <br />
                    <p>Moderator: Faridah Kristi Wetherick</p>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="p-4 font-medium text-foreground">
                    Treasurers Hall 2
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    Learning Sesstion 2
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p>Dr. Jusmawati Fauzaman</p>
                    <p>Vice President, Malaysian Psychological Association</p>
                    <br />
                    <p className="font-bold text-1xl"> Rejuvinating the Soul in the Study of Psychology</p>
                    <br />
                    <p>Moderator: Marianne Taladua</p>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="p-4 font-medium text-foreground">
                    Layco
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    Learning Session 3
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p>Dr. Henndy Ginting</p>
                    <p>Licensed Psychologist, Indonesia</p>
                    <br />
                    <p>Healthy Behaviors in Chronic Illness</p>
                    <br />
                    <p>Moderator: John Manuel Kliatchko</p>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="p-4 font-medium text-foreground">
                    Hotel Quincentennial
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    Learning Session 4
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p>APA Panel</p>
                    <p>Moderator: Maria Isabel Lemen</p>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="p-4 font-medium text-foreground">
                    8:00 am - 9:00 am
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    SIG Meetings
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p>Environmental Psychology</p>
                    <p>LBGTQ Psychology</p>
                    <p>Teaching Psychology</p>
                    <p>Mental Health and Psychosocial Psychology</p>
                    <p>Positive Psychology</p>
                    <p>PWD Psychology</p>
                    <p>Research Psychology</p>
                    <p>Psych Public Service</p>
                    <p>Sports Psychology</p>
                    <p>Substance Use</p>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <p>Parallel Session F: 8:30 am - 10:00 am</p>
          <div>
            <Table className="min-w-[800px]">
              <TableBody>
                <TableRow>
                  <TableCell className="p-4 font-medium text-foreground">
                    Treasurers Hall 3
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    Learning Session 1
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p>Victor Go Weng Yew</p>
                    <p>Group Ceo, HELP Education Group</p>
                    <p>Former President, PSIMA (Malaysian Psychology Association)</p>
                    <p>Former President, ARUPS (ASEAN Regional Union of Psychological Science)</p>
                    <br />
                    <p className="font-bold text-1xl">
                      The Future of Psychology in a VUCA World
                    </p>
                    <br />
                    <p>Moderator: Faridah Kristi Wetherick</p>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="p-4 font-medium text-foreground">
                    Seminary Hall 1
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    Learning Session 2
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p>Dr. Daniella Maryam Mohd Mokhtar</p>
                    <p>Assistant Secretary, Malaysian Psychological Association</p>
                    <br />
                    <p className="font-bold text-1xl"> Strengthening Personal Resilience - Coping with Workplace Bullying</p>
                    <br />
                    <p>Moderator: Juniebe Manganohoy</p>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="p-4 font-medium text-foreground">
                    Layco
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    Learning Session 3
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p>Mr. Jeremy Heng</p>
                    <p>Senior Psychologist, Deputy Head Singapore</p>
                    <p>Children's Society. Past Honoray Secretary of Singapore Psychology Society (SPS)</p>
                    <br />
                    <p className="font-bold text-1xl">Promoting Trauma Recovery in Residential Care: A Singaporean Perspective</p>
                    <br />
                    <p>Moderator: John Manuel Kliatchko</p>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="p-4 font-medium text-foreground">
                    Hotel Quincentennial
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    Learning Session 4
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p>APA Panel</p>
                    <p>Moderator: Maria Isabel Lemen</p>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div>
            <Table className="min-w-[800px]">
              <TableBody>
                <TableRow>
                  <TableCell className="p-4 font-medium text-foreground">
                    9:00 am - 10:00 am
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">

                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    Psych CHED Technical Panel Consultative Meeting
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="p-4 font-medium text-foreground">
                    9:00 am - 11:00 am
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    Oral Paper Symposium
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p className="font-bold text-1xl">Trauma Recovery, Parental Support, and Youth Mental Health: Community-Based Interventions Across Southeast Asia</p>
                    <br />
                    <p>Moderator: Armenia Montano</p>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="p-4 font-medium text-foreground">
                    9:00 am - 11:00 am
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    Oral Paper Symposion 2
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p className="font-bold text-1xl">Work, Culture, and Mental Health: Understanding Human Behavior in Diverse Contexts</p>
                    <br />
                    <p>Moderator: Henmar Cardino</p>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div>
            <Table className="min-w-[800px]">
              <TableBody>
                <TableRow>
                  <TableCell className="p-4 font-medium text-foreground">
                    9:00 am
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    Division Meeting
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p>Clinical PSychology</p>
                    <p>Counseling PSychology</p>
                    <p>Industrial / Organizational PSychology</p>
                    <p>Developmental PSychology</p>
                    <p>Educational PSychology</p>
                    <p>Assesment PSychology</p>
                    <p>Social PSychology</p>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="p-4 font-medium text-foreground">
                    10:00 am
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">

                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p>Dr. Maria Caridad H. Tarroja</p>
                    <p>2010-2012 PAP President</p>
                    <br />
                    <p className="font-bold text-1xl">Update Report on the PSychology Law Revisions</p>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="p-4 font-medium text-foreground">
                    11:00 am
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                  </TableCell>
                  <TableCell className="p-4 font-medium text-foreground">
                    <p>Dr. Miriam P. Cue</p>
                    <p>Professional Regulatory Board of Psychology</p>
                    <p>Chairperson</p>
                    <br />
                    <p className="font-bold text-1xl">Work, Culture, and Mental Health: Understanding Human Behavior in Diverse Contexts</p>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
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
                <AvatarImage src="/avatar.png" alt="User Avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <CardTitle>{selectedUser?.name}</CardTitle>
              <CardDescription className="space-y-1">
                <p>{selectedUser?.title}</p>
              </CardDescription>
              <CardDescription className="space-y-1">
                <p>{selectedUser?.title2}</p>
              </CardDescription>
            </CardHeader>

            <CardContent>
              <p className="text-sm font-normal text-muted-foreground">
                {selectedUser?.description}
              </p>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
}