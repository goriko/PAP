"use client";

import React, { useEffect, useState } from "react";
import { saveEvaluationAction } from "@/infrastructure/server/actions/save-evaluation.action";
import { Separator } from "@/features/shared/components/base/separator";
import { useRouter } from "next/navigation";
import { toast } from "@/features/shared/lib/toast";

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
  attendedEvents: { user_event: { id: string; userId: string; eventId: number; firstCheckinAt: Date | null; lastCheckinAt: Date | null; terminalId: string | null; }; event_name: { id: number; title: string; type: string; } | null; }[];

const ratingScale = [
  { value: 4, label: "Strongly Agree" },
  { value: 3, label: "Agree" },
  { value: 2, label: "Disagree" },
  { value: 1, label: "Strongly Disagree" },
  { value: 0, label: "N/A" },
];

const sections: Section[] = [
  {
    id: "pre-registration",
    title: "PART 1: Pre-Registration",
    questions: [
      { id: "reg-1", text: "The online registration was clearly communicated (social media accounts/emails).", required: true },
      { id: "reg-2", text: "The online registration was easy to fill-out.", required: true },
      { id: "reg-3", text: "The online registration instructions were clear.", required: true },
      { id: "reg-4", text: "The online payment option was easy to accomplish.", required: true },
      { id: "reg-5", text: "Online payment options were accessible.", required: true },
    ],
    openEnded: "How else can we improve on the registration process?",
  },
  {
    id: "program",
    title: "PART 2: Program",
    questions: [
      { id: "prog-1", text: "The convention theme was accurately conveyed in the program.", required: true },
      { id: "prog-2", text: "The convention program was useful in navigating through the conference proceedings.", required: true },
      { id: "prog-3", text: "The program was well-organized.", required: true },
      { id: "prog-4", text: "The program topics were relevant.", required: true },
    ],
    openEnded: "How else can the conference program be improved?",
  },
  {
    id: "speakers",
    title: "PART 3: Plenary Speakers",
    questions: [
      { id: "spk-1", text: "The speaker was informative.", required: true },
      { id: "spk-2", text: "The speaker was prepared for his or her talk.", required: true },
      { id: "spk-3", text: "The materials presented were understandable.", required: true },
      { id: "spk-4", text: "The speaker presented the materials in an organized manner.", required: true },
      { id: "spk-5", text: "The speaker was knowledgeable about the subject.", required: true },
      { id: "spk-6", text: "The speaker handled the questions and discussion satisfactorily.", required: true },
    ],
    openEnded: "How else can the speakers improve in their delivery?",
  },
  {
    id: "session",
    title: "PART 4: Learning Session",
    questions: [
      { id: "ls-1", text: "The facilitator was informative.", required: true },
      { id: "ls-2", text: "The facilitator was prepared for his or her learning session.", required: true },
      { id: "ls-3", text: "The facilitator presented the materials in an organized manner.", required: true },
      { id: "ls-4", text: "The materials presented were understandable.", required: true },
      { id: "ls-5", text: "The facilitator was knowledgeable about the subject.", required: true },
      { id: "ls-6", text: "The facilitator handled the questions and discussion satisfactorily. ", required: true },
    ],
    openEnded: "How else can the speakers improve in their delivery?",
  },
  {
    id: "symposium",
    title: "PART 5: Parallel Paper Presentation / Organized Symposium / Forum",
    questions: [
      { id: "os-1", text: "The presentation was informative.", required: true },
      { id: "os-2", text: "The presenter/s was/were prepared.", required: true },
      { id: "os-3", text: "The presenter/s handled the questions and discussion well.", required: true },
      { id: "os-4", text: "The presentation materials were understandable.", required: true },
      { id: "os-5", text: "There was a good mix of topics in the selected papers for parallel presentation and organized symposia.", required: true },
    ],
    openEnded: "How else can the paper presentations and organized symposia be improved?",
  },
  {
    id: "logistics",
    title: "PART 6: Logistics",
    questions: [
      { id: "log-1", text: "The food was good.", required: true },
      { id: "log-2", text: "The session schedules (start and end) were prompt.", required: true },
      { id: "log-3", text: "The convention program was well-prepared. ", required: true },
      { id: "log-4", text: "The convention kit and its content/s were appropriate.", required: true },
      { id: "log-5", text: "The distribution of convention kits was efficient.", required: true },
      { id: "log-6", text: "The convention center/hotel venue for Plenary Sessions was spacious.", required: true },
      { id: "log-7", text: "The facilities for breakout sessions were adequate. ", required: true },
      { id: "log-8", text: "The exhibits add value to the convention.", required: true },
    ],
    openEnded: "How else can the logistics of the convention be improved?",
  },
  {
    id: "comments",
    title: "PART 7: Comments, Feedback and Suggestions",
    questions: [],
    openEnded: "What are your overall comments, feedback and suggestions?",
  },
];

const plenarySpeakers = [
  { id: "1", title: "Dr. Arthur Evans Jr." },
  { id: "2", title: "Dr. Debra M. Kawahara" },
  { id: "3", title: "Dr. Rose Marie Clemeña" },
  { id: "4", title: "Dr. Grace H. Aguiling-Dalisay" },
];

export function EvaluationComponent({ user, attendedEvents }: EvaluationProps) {

  const router = useRouter();

  const [parallelSession, setParallelSession] = useState<{ user_event: { id: string; userId: string; eventId: number; firstCheckinAt: Date | null; lastCheckinAt: Date | null; terminalId: string | null; }; event_name: { id: number; title: string; type: string; } | null; }[] | null>(null)
  const [organizedSymposium, setOrganizedSymposium] = useState<{ user_event: { id: string; userId: string; eventId: number; firstCheckinAt: Date | null; lastCheckinAt: Date | null; terminalId: string | null; }; event_name: { id: number; title: string; type: string; } | null; }[] | null>(null)
  const [loading, setLoading] = useState(false);
  const [ratings, setRatings] = useState<RatingsState>({});
  const [textAnswers, setTextAnswers] = useState<TextAnswersState>({});
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: boolean } = {};

    sections.forEach(
      (section) => {
        if (section.id == "pre-registration" || section.id == "program" || section.id == "logistics" || section.id == "comments") {
          section.questions.forEach((q) => {
            if (q.required && (ratings[q.id] === null || ratings[q.id] === undefined)) {
              newErrors[q.id] = true;
            }
          });
        } else if (section.id == "speakers") {
          plenarySpeakers.forEach((speaker) => {
            section.questions.forEach((q) => {
              if (q.required && (ratings["speaker-" + speaker.id + "-" + q.id] === null || ratings["speaker-" + speaker.id + "-" + q.id] === undefined)) {
                newErrors["speaker-" + speaker.id + "-" + q.id] = true;
              }
            });
          })
        } else if (section.id == "session") {
          parallelSession && parallelSession.forEach((session) => {
            section.questions.forEach((q) => {
              if (q.required && (ratings["session-" + session.user_event.eventId + "-" + q.id] === null || ratings["session-" + session.user_event.eventId + "-" + q.id] === undefined)) {
                newErrors["session-" + session.user_event.eventId + "-" + q.id] = true;
              }
            });
          })
        } else if (section.id == "symposium") {
          organizedSymposium && organizedSymposium.forEach((symposium) => {
            section.questions.forEach((q) => {
              if (q.required && (ratings["symposium-" + symposium.user_event.eventId + "-" + q.id] === null || ratings["symposium-" + symposium.user_event.eventId + "-" + q.id] === undefined)) {
                newErrors["symposium-" + symposium.user_event.eventId + "-" + q.id] = true;
              }
            });
          })
        }
      }
    );

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRatingChange = (questionId: string, value: number) => {
    setRatings((prev) => ({ ...prev, [questionId]: value }));
    setErrors((prev) => ({ ...prev, [questionId]: false }));
  };

  const handleTextChange = (questionId: string, value: string) => {
    setTextAnswers((prev) => ({ ...prev, [questionId]: value }));
    setErrors((prev) => ({ ...prev, [questionId]: false }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.warning("Please make sure to fill in all required fields before submitting.");
      return
    };

    const sanitizedRatings: Record<string, number> = Object.fromEntries(
      Object.entries(ratings).map(([k, v]) => [k, v ?? 0])
    );

    const evaluationData = {
      userId: user.id,
      ratings: sanitizedRatings,
      textAnswers,
      submittedAt: new Date().toISOString(),
    };
    try {
      setLoading(true);
      await saveEvaluationAction(evaluationData);
      toast.success("Evaluation successfully submitted")
      setRatings({});
      setTextAnswers({});
      router.push("/certificate");
    } catch (error) {
      console.error("Error saving evaluation:", error);
      toast.warning("Something went wrong while saving your evaluation.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtered1 = attendedEvents.filter(data => data.event_name != null && data.event_name.type == "Learning Session");
    setParallelSession(filtered1)

    const filtered2 = attendedEvents.filter(data => data.event_name != null && data.event_name.type == "Organized Symposium");
    setOrganizedSymposium(filtered2)
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-primary">Convention Evaluation</h1>

      <form onSubmit={handleSubmit} className="space-y-10">
        {sections.map((section) => (
          <div key={section.id} className="p-6 rounded-xl shadow bg-card text-card-foreground">
            <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
            {(section.id == "pre-registration" || section.id == "program" || section.id == "logistics" || section.id == "comments") && (
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
                      className={`w-full border rounded-lg p-2`}
                      rows={3}
                      value={textAnswers[section.id] || ""}
                      onChange={(e) => handleTextChange(section.id, e.target.value)}
                    />
                  </div>
                )}
              </div>
            )}

            {(section.id == "speakers") && (
              <>
                {plenarySpeakers.map((speaker) => (
                  <div key={speaker.id} className="pb-2 space-y-4">
                    <Separator />
                    <p className="font-bold text-1xl whitespace-normal">{speaker.title}</p>
                    {section.questions.map((q) => (
                      <div key={"speaker-" + speaker.id + "-" + q.id} className="flex flex-col gap-2">
                        <p className={errors["speaker-" + speaker.id + "-" + q.id] ? "text-destructive font-medium" : ""}>
                          {q.text}{q.required && <span className="text-destructive">*</span>}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                          {ratingScale.map((r) => (
                            <button
                              key={r.value}
                              type="button"
                              className={`px-3 py-1 rounded-lg border text-left ${ratings["speaker-" + speaker.id + "-" + q.id] === r.value
                                ? "bg-primary text-primary-foreground"
                                : "bg-background"
                                }`}
                              onClick={() =>
                                handleRatingChange("speaker-" + speaker.id + "-" + q.id, r.value)
                              }
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
                          className={`w-full border rounded-lg p-2`}
                          rows={3}
                          value={textAnswers[section.id + "-" + speaker.id] || ""}
                          onChange={(e) => handleTextChange(section.id + "-" + speaker.id, e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}

            {(section.id == "session") && (
              <>
                {parallelSession == null || parallelSession.length == 0 ? (
                  <p className="text-muted-foreground">No learning sessions attended.</p>
                ) : (
                  <>
                    {parallelSession.map((session) => (
                      <div key={session.user_event.eventId} className="pb-2 space-y-4">
                        <Separator />
                        <p className="font-bold text-1xl whitespace-normal">{session.event_name != null && session.event_name.title}</p>
                        {section.questions.map((q) => (
                          <div key={"session-" + session.user_event.eventId + "-" + q.id} className="flex flex-col gap-2">
                            <p className={errors["session-" + session.user_event.eventId + "-" + q.id] ? "text-destructive font-medium" : ""}>
                              {q.text}{q.required && <span className="text-destructive">*</span>}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                              {ratingScale.map((r) => (
                                <button
                                  key={r.value}
                                  type="button"
                                  className={`px-3 py-1 rounded-lg border text-left ${ratings["session-" + session.user_event.eventId + "-" + q.id] === r.value
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-background"
                                    }`}
                                  onClick={() =>
                                    handleRatingChange("session-" + session.user_event.eventId + "-" + q.id, r.value)
                                  }
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
                              className={`w-full border rounded-lg p-2`}
                              rows={3}
                              value={textAnswers[section.id + "-" + session.user_event.eventId] || ""}
                              onChange={(e) => handleTextChange(section.id + "-" + session.user_event.eventId, e.target.value)}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </>
            )}

            {(section.id == "symposium") && (
              <>
                {organizedSymposium == null || organizedSymposium.length == 0 ? (
                  <p className="text-muted-foreground">No parallel paper presentation / organized symposium / forum attended.</p>
                ) : (
                  <>
                    {organizedSymposium.map((symposium) => (
                      <div key={symposium.user_event.eventId} className="pb-2 space-y-4">
                        <Separator />
                        <p className="font-bold text-1xl whitespace-normal">{symposium.event_name != null && symposium.event_name.title}</p>
                        {section.questions.map((q) => (
                          <div key={"symposium-" + symposium.user_event.eventId + "-" + q.id} className="flex flex-col gap-2">
                            <p className={errors["symposium-" + symposium.user_event.eventId + "-" + q.id] ? "text-destructive font-medium" : ""}>
                              {q.text}{q.required && <span className="text-destructive">*</span>}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                              {ratingScale.map((r) => (
                                <button
                                  key={r.value}
                                  type="button"
                                  className={`px-3 py-1 rounded-lg border text-left ${ratings["symposium-" + symposium.user_event.eventId + "-" + q.id] === r.value
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-background"
                                    }`}
                                  onClick={() =>
                                    handleRatingChange("symposium-" + symposium.user_event.eventId + "-" + q.id, r.value)
                                  }
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
                              className={`w-full border rounded-lg p-2`}
                              rows={3}
                              value={textAnswers[section.id + "-" + symposium.user_event.eventId] || ""}
                              onChange={(e) => handleTextChange(section.id + "-" + symposium.user_event.eventId, e.target.value)}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </>
            )}

          </div>
        ))}
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
