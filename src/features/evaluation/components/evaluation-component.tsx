"use client";

import React, { useState } from "react";
import { saveEvaluationAction } from "@/infrastructure/server/actions/save-evaluation.action";

interface Question {
    id: string;
    text: string;
    required?: boolean;
}

interface Section {
    id: string;
    title: string;
    questions: Question[];
    openEnded?: string;
}

interface RatingsState {
    [key: string]: number | null;
}

interface TextAnswersState {
    [key: string]: string;
}

interface EvaluationProps {
    user: {
        id: string;
        name: string;
        email: string;
    };
    attendedEvents: { eventId: number; title: string | null }[];
}

const ratingScale = [
    { value: 4, label: "Strongly Agree" },
    { value: 3, label: "Agree" },
    { value: 2, label: "Disagree" },
    { value: 1, label: "Strongly Disagree" },
    { value: 0, label: "N/A" },
];

// Sections 1–2–3
const sections: Section[] = [
    {
        id: "pre-registration",
        title: "PART 1: Pre-Registration",
        questions: [
            { id: "reg-1", text: "The online registration was clearly communicated (social media accounts/emails)", required: true },
            { id: "reg-2", text: "The online registration was easy to fill-out", required: true },
            { id: "reg-3", text: "The online registration instructions were clear", required: true },
            { id: "reg-4", text: "The online payment option was easy to accomplish", required: true },
            { id: "reg-5", text: "Online payment options were accessible for me", required: true },
        ],
        openEnded: "How else can we improve on the registration process?",
    },
    {
        id: "program",
        title: "PART 2: Program",
        questions: [
            { id: "prog-1", text: "The convention theme was accurately conveyed in the program", required: true },
            { id: "prog-2", text: "The convention program was useful in navigating through the conference proceedings", required: true },
            { id: "prog-3", text: "The program is well organized", required: true },
            { id: "prog-4", text: "The program topics were relevant to me", required: true },
        ],
        openEnded: "How else can the conference program be improved?",
    },
    {
        id: "speakers",
        title: "PART 3: Plenary Speakers",
        questions: [
            { id: "spk-1", text: "The speaker was informative", required: true },
            { id: "spk-2", text: "The speaker is prepared for their talk", required: true },
            { id: "spk-3", text: "The materials presented were understandable", required: true },
            { id: "spk-4", text: "The speaker presented the materials in an organized manner", required: true },
            { id: "spk-5", text: "The speaker is knowledgeable about the subject", required: true },
            { id: "spk-6", text: "The speaker handled the questions and discussion satisfactorily", required: true },
        ],
        openEnded: "How else can the speakers improve in their delivery?",
    },
];

// Learning Sessions (Part 4)
// update the titles and ids to match the data in event_name table
const learningSessions = [
    { id: "1", title: "Pre-Convention" },
    { id: "2", title: "Main Event Day 1" },
    { id: "5", title: "The Important Role Psychologists Play in Sports" },
    { id: "6", title: "Assessment of Personality Styles and Disorders" },
    { id: "3", title: "Main Event Day 2" },
    { id: "B3", title: "Enhancing Awareness And Dialogue By Utilizing Dreams, Fairy Tales And Identification-Projection Experiments (P701, Waldo Perfecto Bldg.)" },
    { id: "C1", title: "Designing and Facilitating Safe Spaces for Young Women, Men, and LGBT+ Youth (P701, Waldo Perfecto Bldg.)" },
    { id: "C2", title: "Proposing a Philippine Journal of Psychology Special Issue (Center for Culture and the Arts)" },
    { id: "C3", title: "Exploring Therapeutic Foundation and Techniques of Compassion Focused Therapy (Francis Gevers Hall, Diego Silang Bldg.)" },
    { id: "C4", title: "Formulating and Communicating Psychological Diagnoses in Private Practice: Issues of Ethics and Duty (P405, Waldo Perfecto Bldg.)" },
    { id: "D1", title: "The Power of Digital Media and Social Media in Shaping the Future of Psychology and Advocacy (Francis Gevers Hall, Diego Silang Bldg.)" },
    { id: "D2", title: "Crisis Intervention Among Children Survivors of Sexual Abuse (Center for Culture and the Arts)" },
    { id: "D3", title: "Efficient Energy Management in Sports and Life Outside It (P700, Waldo Perfecto Bldg.)" },
    { id: "E1", title: "Significant Lived Experiences of a Filipino Psychologist in Ontario, Canada (Francis Gevers Hall, Diego Silang Bldg.)" },
    { id: "E2", title: "Transforming Lives from Gray to Green: Embracing the Psychology of Sustainability (P700, Waldo Perfecto Bldg.)" },
    { id: "E3", title: "Best Practices in Case Formulation and Report Writing for Psychological Assessment (Center for Culture and the Arts)" },
    { id: "F1", title: "Affirmative Counseling: Embracing and Empowering LGBTQI+ Lives (Francis Gevers Hall, Diego Silang Bldg.)" },
    { id: "F2", title: "Scholarly Peer Review (Center for Culture and the Arts)" },
    { id: "F3", title: "Community-Based Mental Health and Psychosocial Support Services for Persons with Disabilities in Emergency Contexts (P700, Waldo Perfecto Bldg.)" },
];

const learningSessionQuestions: Question[] = [
    { id: "ls-1", text: "The learning session facilitator was informative", required: true },
    { id: "ls-2", text: "The facilitator is prepared for their talk", required: true },
    { id: "ls-3", text: "The materials presented were understandable", required: true },
    { id: "ls-4", text: "The facilitator presented the materials in an organized manner", required: true },
    { id: "ls-5", text: "The facilitator is knowledgeable about the subject", required: true },
    { id: "ls-6", text: "The facilitator handled the questions and discussion satisfactorily", required: true },
];

// Parallel Paper Presentations (Part 5)
const parallelPaperQuestions: Question[] = [
    { id: "pp-1", text: "The presentation was informative", required: true },
    { id: "pp-2", text: "The presenters are prepared", required: true },
    { id: "pp-3", text: "The presentation materials were understandable", required: true },
    { id: "pp-4", text: "The questions and discussion were handled well", required: true },
    { id: "pp-5", text: "There was a good mix of topics in the selected papers", required: true },
];

// Logistics (Part 6)
const logisticsQuestions: Question[] = [
    { id: "log-1", text: "The food was good.", required: true },
    { id: "log-2", text: "The session schedules (starting and ending) were prompt.", required: true },
    { id: "log-3", text: "The onsite registration went smoothly", required: true },
    { id: "log-4", text: "The exhibits add value to the convention", required: true },
    { id: "log-5", text: "The convention kit and its content were appropriate", required: true },
    { id: "log-6", text: "The convention program is well prepared", required: true },
    { id: "log-7", text: "Distribution of convention kits was handled smoothly", required: true },
    { id: "log-8", text: "Baguio Convention and Cultural Center was spacious enough", required: true },
    { id: "log-9", text: "SLU classrooms and facilities were adequate", required: true },
];

export function EvaluationComponent({ user, attendedEvents }: EvaluationProps) {
    const [ratings, setRatings] = useState<RatingsState>({});
    const [textAnswers, setTextAnswers] = useState<TextAnswersState>({});
    const [selectedSessions, setSelectedSessions] = useState<string[]>([]);
    const [selectedParallel, setSelectedParallel] = useState<string[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
    const [loading, setLoading] = useState(false);

    const handleRatingChange = (questionId: string, value: number) => {
        setRatings((prev) => ({ ...prev, [questionId]: value }));
        setErrors((prev) => ({ ...prev, [questionId]: false }));
    };

    const handleTextChange = (questionId: string, value: string) => {
        setTextAnswers((prev) => ({ ...prev, [questionId]: value }));
        setErrors((prev) => ({ ...prev, [questionId]: false }));
    };

    const handleAddSession = (sessionId: string) => {
        if (sessionId && !selectedSessions.includes(sessionId)) {
            setSelectedSessions((prev) => [...prev, sessionId]);
        }
    };

    const handleAddParallel = (title: string) => {
        if (title && !selectedParallel.includes(title)) {
            setSelectedParallel((prev) => [...prev, title]);
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: boolean } = {};

        [...sections, { id: "logistics", title: "PART 6", questions: logisticsQuestions }].forEach(
            (section) => {
                section.questions.forEach((q) => {
                    if (q.required && (ratings[q.id] === null || ratings[q.id] === undefined)) {
                        newErrors[q.id] = true;
                    }
                });
            }
        );

        if (!textAnswers["overall-comments"] || textAnswers["overall-comments"].trim() === "") {
            newErrors["overall-comments"] = true;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        const sanitizedRatings: Record<string, number> = Object.fromEntries(
            Object.entries(ratings).map(([k, v]) => [k, v ?? 0])
        );

        const evaluationData = {
            userId: user.id,
            ratings: sanitizedRatings,
            textAnswers,
            // selectedSessions,
            selectedParallel,
            submittedAt: new Date().toISOString(),
        };

        try {
            setLoading(true);
            await saveEvaluationAction(evaluationData);
            alert("Evaluation submitted. Thank you!");
            setRatings({});
            setTextAnswers({});
            setSelectedSessions([]);
            setSelectedParallel([]);
        } catch (error) {
            console.error("Error saving evaluation:", error);
            alert("Something went wrong while saving your evaluation.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6 text-primary">Convention Evaluation</h1>

            <form onSubmit={handleSubmit} className="space-y-10">
                {/* Sections 1–3 */}
                {sections.map((section) => (
                    <div key={section.id} className="p-6 rounded-xl shadow bg-card text-card-foreground">
                        <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                        <div className="space-y-4">
                            {section.questions.map((q) => (
                                <div key={q.id} className="flex flex-col gap-2">
                                    <p className={errors[q.id] ? "text-destructive font-medium" : ""}>
                                        {q.text}{q.required && <span className="text-destructive">*</span>}
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                                        {ratingScale.map((r) => (
                                            <button
                                                key={r.value}
                                                type="button"
                                                className={`px-3 py-1 rounded-lg border text-left ${ratings[q.id] === r.value
                                                    ? "bg-primary text-primary-foreground"
                                                    : "bg-background"
                                                    }`}
                                                onClick={() => handleRatingChange(q.id, r.value)}
                                            >
                                                {r.value} - {r.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {section.openEnded && (
                                <div>
                                    <label className="block mb-2">{section.openEnded}</label>
                                    <textarea
                                        className={`w-full border rounded-lg p-2 ${errors[section.id] ? "border-destructive" : ""
                                            }`}
                                        rows={3}
                                        value={textAnswers[section.id] || ""}
                                        onChange={(e) => handleTextChange(section.id, e.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {/* Part 4: Learning Sessions */}
                <div className="p-6 rounded-xl shadow bg-card text-card-foreground">
                    <h2 className="text-xl font-semibold mb-4">PART 4: Learning Sessions</h2>

                    {attendedEvents.length === 0 ? (
                        <p className="text-muted-foreground">No learning sessions attended.</p>
                    ) : (
                        attendedEvents
                            // Only include sessions that exist in learningSessions
                            .filter(ev => learningSessions.some(ls => ls.id === ev.eventId.toString()))
                            .map(ev => {
                                const session = learningSessions.find(ls => ls.id === ev.eventId.toString());
                                if (!session) return null;

                                return (
                                    <div key={session.id} className="mb-6 p-4 rounded-lg border bg-background">
                                        <p className="font-medium mb-4">{session.title}</p>

                                        {/* Questions */}
                                        {learningSessionQuestions.map((q) => (
                                            <div key={q.id} className="flex flex-col gap-2 mb-3">
                                                <p className={errors[`session-${session.id}-${q.id}`] ? "text-destructive font-medium" : ""}>
                                                    {q.text}{q.required && <span className="text-destructive">*</span>}
                                                </p>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                                                    {ratingScale.map((r) => (
                                                        <button
                                                            key={r.value}
                                                            type="button"
                                                            className={`px-3 py-1 rounded-lg border text-left ${ratings[`session-${session.id}-${q.id}`] === r.value
                                                                ? "bg-primary text-primary-foreground"
                                                                : "bg-background"
                                                                }`}
                                                            onClick={() =>
                                                                handleRatingChange(`session-${session.id}-${q.id}`, r.value)
                                                            }
                                                        >
                                                            {r.value} - {r.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}

                                        {/* Comments for the session */}
                                        <div className="mt-4">
                                            <label className="block mb-2 font-medium">How else can the facilitator improve in their delivery?</label>
                                            <textarea
                                                placeholder="Your comments..."
                                                value={textAnswers[`session-comments-${session.id}`] || ""}
                                                onChange={(e) =>
                                                    handleTextChange(`session-comments-${session.id}`, e.target.value)
                                                }
                                                className="w-full border rounded-lg p-2"
                                                rows={3}
                                            />
                                        </div>
                                    </div>
                                );
                            })
                    )}
                </div>

                {/* Part 5: Parallel Papers */}
                <div className="p-6 rounded-xl shadow bg-card text-card-foreground">
                    <h2 className="text-xl font-semibold mb-4">PART 5: Parallel Papers</h2>
                    {attendedEvents
                        .filter(ev => ev.title?.toLowerCase().includes("parallel"))
                        .map(ev => (
                            <div key={ev.eventId} className="mb-6">
                                <p className="font-medium mb-2">{ev.title}</p>
                                <div className="flex gap-2">
                                    {ratingScale.map((num) => (
                                        <button
                                            key={num.value}
                                            className={`px-3 py-1 rounded ${ratings[`session-${ev.eventId}`] === num.value
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted"
                                                }`}
                                            onClick={() =>
                                                setRatings((prev) => ({
                                                    ...prev,
                                                    [`session-${ev.eventId}`]: num.value,
                                                }))
                                            }
                                        >
                                            {num.label}
                                        </button>
                                    ))}

                                </div>
                                <textarea
                                    placeholder="Comments..."
                                    value={textAnswers[`parallel-${ev.eventId}`] || ""}
                                    onChange={(e) =>
                                        setTextAnswers(prev => ({
                                            ...prev,
                                            [`parallel-${ev.eventId}`]: e.target.value,
                                        }))
                                    }
                                    className="w-full border rounded mt-2 p-2"
                                />
                            </div>
                        ))}
                </div>

                {/* Part 6: Logistics */}
                <div className="p-6 rounded-xl shadow bg-card text-card-foreground">
                    <h2 className="text-xl font-semibold mb-4">PART 6: Logistics</h2>
                    {logisticsQuestions.map((q) => (
                        <div key={q.id} className="flex flex-col gap-2 mb-2">
                            <p className={errors[q.id] ? "text-destructive font-medium" : ""}>
                                {q.text}{q.required && <span className="text-destructive">*</span>}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                                {ratingScale.map((r) => (
                                    <button
                                        key={r.value}
                                        type="button"
                                        className={`px-3 py-1 rounded-lg border text-left ${ratings[q.id] === r.value
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-background"
                                            }`}
                                        onClick={() => handleRatingChange(q.id, r.value)}
                                    >
                                        {r.value} - {r.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                    <textarea
                        className="w-full border rounded-lg p-2"
                        rows={3}
                        value={textAnswers["logistics-feedback"] || ""}
                        onChange={(e) => handleTextChange("logistics-feedback", e.target.value)}
                    />
                </div>

                {/* Part 7: Overall Comments */}
                <div className="p-6 rounded-xl shadow bg-card text-card-foreground">
                    <h2 className="text-xl font-semibold mb-4">PART 7: Overall Comments</h2>
                    <label className={errors["overall-comments"] ? "text-destructive font-medium" : ""}>
                        What are your overall comments, feedback, and suggestions?{" "}
                        <span className="text-destructive">*</span>
                    </label>
                    <textarea
                        className={`w-full border rounded-lg p-2 ${errors["overall-comments"] ? "border-destructive" : ""
                            }`}
                        rows={4}
                        value={textAnswers["overall-comments"] || ""}
                        onChange={(e) => handleTextChange("overall-comments", e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                >
                    {loading ? "Submitting..." : "Submit Evaluation"}
                </button>
            </form>
        </div>
    );
}
