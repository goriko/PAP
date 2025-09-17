import { QRScanActionEnum } from "@/types/enums/QRScanActionEnum";
import { z } from "zod";

export const ConfirmationDataSchema = z.object({
	actionType: z.nativeEnum(QRScanActionEnum),
	event: z.string(),
	terminalId: z.string(),
	kitClaiming: z.boolean().optional().default(false),
	hasClaimedKit: z.boolean().optional().default(false),
});

export type ConfirmationData = z.infer<typeof ConfirmationDataSchema>;

export const VALID_TERMINAL_IDS: ConfirmationData["terminalId"][] = [
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10",
	"11",
	"12",
	"13",
	"14",
	"15",
];

export const VALID_EVENT_NAMES: ConfirmationData["event"][] = [
	"Main Event",
	"Pre-Convention",
	"Parallel Session 1",
	"Dialogical and Embodied Approaches to Feminist Counseling: Transformative Healing from Sexual Violence (Francis Gevers Hall, Diego Silang Bldg.)",
	"Rethinking Psychology Curriculum: Considerations for Promoting Philippine Psychology (P700, Waldo Perfecto Bldg.)",
	"Psychological Incapacity in Court Annulment Cases (Center for Culture and the Arts)",
	"RACE Against Suicide Toolkit: A Gatekeeper Training Toolkit for Suicide Prevention in Schools (Francis Gevers Hall, Diego Silang Bldg.)",
	"The Application of Choice Theory Reality Therapy in Facilitating Support Groups for Postpartum Mothers (Center for Culture and the Arts)",
	"Enhancing Awareness And Dialogue By Utilizing Dreams, Fairy Tales And Identification-Projection Experiments (P701, Waldo Perfecto Bldg.)",
	"Designing and Facilitating Safe Spaces for Young Women, Men, and LGBT+ Youth (P701, Waldo Perfecto Bldg.)",
	"Proposing a Philippine Journal of Psychology Special Issue (Center for Culture and the Arts)",
	"Exploring Therapeutic Foundation and Techniques of Compassion Focused Therapy (Francis Gevers Hall, Diego Silang Bldg.)",
	"Formulating and Communicating Psychological Diagnoses in Private Practice: Issues of Ethics and Duty (P405, Waldo Perfecto Bldg.)",
	"The Power of Digital Media and Social Media in Shaping the Future of Psychology and Advocacy (Francis Gevers Hall, Diego Silang Bldg.)",
	"Crisis Intervention Among Children Survivors of Sexual Abuse (Center for Culture and the Arts)",
	"Efficient Energy Management in Sports and Life Outside It (P700, Waldo Perfecto Bldg.)",
	"Significant Lived Experiences of a Filipino Psychologist in Ontario, Canada (Francis Gevers Hall, Diego Silang Bldg.)",
	"Transforming Lives from Gray to Green: Embracing the Psychology of Sustainability (P700, Waldo Perfecto Bldg.)",
	"Best Practices in Case Formulation and Report Writing for Psychological Assessment (Center for Culture and the Arts)",
	"Affirmative Counseling: Embracing and Empowering LGBTQI+ Lives (Francis Gevers Hall, Diego Silang Bldg.)",
	"Scholarly Peer Review (Center for Culture and the Arts)",
	"Community-Based Mental Health and Psychosocial Support Services for Persons with Disabilities in Emergency Contexts (P700, Waldo Perfecto Bldg.)",
];
