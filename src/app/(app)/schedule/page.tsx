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
} from "@/features/shared/components/base/tabs"

export const dynamic = "force-dynamic";

export default async function QRCodePage() {
	return (
		<div className="col-span-full flex flex-col">
			<div className="space-y-6">
				<div className="flex items-center gap-2">
					<h1 className="font-bold text-3xl text-foreground">
						Logs Monitoring Dashboard
					</h1>
				</div>
			</div>
			<Tabs defaultValue="1">
				<TabsList>
					<TabsTrigger value="1">Day 1</TabsTrigger>
					<TabsTrigger value="2">Day 2</TabsTrigger>
					<TabsTrigger value="3">Day 3</TabsTrigger>
				</TabsList>
				<TabsContent value="1">
					<Card className="hidden border-border sm:block dark:bg-card">
						<CardContent className="p-0">
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
												<span>President, Psychological Association of the Philippines, Inc.</span>
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell className="p-4 font-medium text-foreground" />
											<TableCell className="p-4 font-medium text-foreground">
												Welcome Remarks
											</TableCell>
											<TableCell className="p-4 font-medium text-foreground">
												<p>Mr. Adrian Toh</p>
												<span>President, ASEAN regional Union of Psychological Societies</span>
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell className="p-4 font-medium text-foreground" />
											<TableCell className="p-4 font-medium text-foreground">
												Opening Address
											</TableCell>
											<TableCell className="p-4 font-medium text-foreground">
												<p>Prof. Brigitte Khoury, PhD</p>
												<span>President-Elect, Internationl Union of Psychological Societies</span>
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell className="p-4 font-medium text-foreground">
												9:00 am
											</TableCell>
											<TableCell className="p-4 font-medium text-foreground">
												Keynote Address 1
											</TableCell>
											<TableCell className="p-4 font-medium text-foreground">
												<p>Mr. Adrian Toh</p>
												<p>President, ASEAN regional Union of Psychological Societies</p>
												<span>Advancing Mental Health in ASEAN: Bridging Policy, Practice, and Cultural Diversity</span>
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell className="p-4 font-medium text-foreground">
												10:00 am
											</TableCell>
											<TableCell className="p-4 font-medium text-foreground">
												Plenary Session 1
											</TableCell>
											<TableCell className="p-4 font-medium text-foreground">
												<p>Dr. Arthur Evans Jr.</p>
												<p>Chief Executive Officer, American Psychological Association</p>
												<span>Scaling Public Health Approaches for Mental Health Through Innovations in Policy, Community-Based Care and Disaster Response</span>
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell className="p-4 font-medium text-foreground">
												11:00 am
											</TableCell>
											<TableCell className="p-4 font-medium text-foreground">
												Plenary Session 3
											</TableCell>
											<TableCell className="p-4 font-medium text-foreground">
												<p>Dr. Debra Kawahara</p>
												<p>President, American Psychological Association</p>
												<span>Integrating Intersectionality and Feminist Principles to Empower Diverse Populations</span>
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
												<p>Expressed appreciation to the outgoing members of the BOD</p>
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell className="p-4 font-medium text-foreground">
												01:30 pm
											</TableCell>
											<TableCell className="p-4 font-medium text-foreground">
												Keynote Address 2
											</TableCell>
											<TableCell className="p-4 font-medium text-foreground">
												<p>Atty. Floranie Polo-Jacob</p>
												<p>2000 - 2001 President, Psychological Association of the Philippines</p>
												<p>Of Counsel, VBSP Law Offices</p>
												<span>The Law Meets Psychology: A Cross-Disciplinary Path to Justice and Well-Being (The Philippine Experience)</span>
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell className="p-4 font-medium text-foreground">
												02:30 pm
											</TableCell>
											<TableCell className="p-4 font-medium text-foreground">
												Plenary Session 4
											</TableCell>
											<TableCell className="p-4 font-medium text-foreground">
												<p>Dr. Rose Marie Clemenia</p>
												<p>1995-1996 President, Psychological Association of the Philippines</p>
												<p>2015 PRC Outstanding Professional of the Year in the Field of Psychology</p>
												<span>Reflections on the Practice of Filipino Psychology for Human Development</span>
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell className="p-4 font-medium text-foreground">
												03:30 pm
											</TableCell>
											<TableCell className="p-4 font-medium text-foreground">
												Plenary Session 5
											</TableCell>
											<TableCell className="p-4 font-medium text-foreground">
												<p>Dr. Grace H. Aguiling-Dalisay</p>
												<p>2024 PRC Outstanding Professional of the Year in the Field of Psychology</p>
												<p>President and CEO, Center for Educational Measurement</p>
												<span>Reflections on the Practice of Filipino Psychology for Human Development</span>
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell className="p-4 font-medium text-foreground">
												07:00 pm
											</TableCell>
											<TableCell className="p-4 font-medium text-foreground">
												
											</TableCell>
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
											<TableCell className="p-4 font-medium text-foreground">
												
											</TableCell>
											<TableCell className="p-4 font-medium text-foreground">
												<p>e-Poster Presentations</p>
											</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="2"></TabsContent>
				<TabsContent value="3"></TabsContent>
			</Tabs>
		</div>
	);
}
