'use client'
import { IPlanet } from "@/types/types";
import axios from "axios";
import { use, useEffect, useRef, useState } from "react";
import styles from './page.module.scss';
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function Planet({ params }: { params: Promise<{ map: string, planetName: string }> }) {

    const { planetName, map } = use(params);
    const [planet, setPlanet] = useState<IPlanet | null>(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const timeoutRef = useRef<number | undefined>(undefined);


    useEffect(() => {
        setLoading(true);
        const getPlanets = async () => {
            try {
                const res = await axios.get<IPlanet[]>(`http://localhost:5000/${map}`);
                setPlanet(res.data.find(p => p.name === planetName) || null)
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        getPlanets();
    }, [planetName, map]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current !== undefined) {
                window.clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleCopy = async (code: string) => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true)
            if (timeoutRef.current !== undefined) {
                window.clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = window.setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy", err);
            setCopied(false);
        }
    }


    return (
        planet &&
        <main className={styles.page}>
            <section className={styles.headerSection}>
                <div className={styles.headerText}>
                    <h1 className={styles.pageHeader}>
                        Welcome to {planet.name}
                    </h1>

                    <p>
                        <span className={styles.tagsHeader}>Tags:</span> {planet.tags?.join(", ")}
                    </p>

                    <p className={styles.description}>
                        {planet.description}
                    </p>
                </div>

                <Image
                    className={styles.planetImage}
                    src={planet.image}
                    alt={planet.image}
                    width={1024}
                    height={1024}
                    loading='lazy'
                />
            </section>

            <section className={styles.researchSection}>
                <h2>Research topics</h2>
                <ul className={styles.researchTopicList}>
                    {
                        planet.researchTopics.map((topic, index) => <li key={index}>{topic}</li>)
                    }
                </ul>
            </section>

            {
                planet.tasks?.length > 0 &&
                <section className={styles.taskSection}>
                    <h2>Tasks</h2>
                    {
                        planet.tasks.map((task, index) => (
                            <div key={index} className={styles.task}>
                                <pre className={styles.question}>{`${index + 1}. ${task.question}`}</pre>

                                {
                                    task.codeTasks?.length > 0 &&
                                    <div className={styles.codeTasksCnr}>
                                        {
                                            task.codeTasks.map((codeTask, index) => (
                                                <div className={styles.codeTask} key={index}>
                                                    <p className={styles.codeTaskTitle}>{codeTask.title}</p>
                                                    {
                                                        codeTask.cases?.map((testCase, index) => (
                                                            <div className={styles.inputOutputCnr} key={index}>
                                                                <pre>
                                                                    <span>Input: </span>
                                                                    <code>
                                                                        {testCase.input}
                                                                    </code>
                                                                </pre>

                                                                <pre>
                                                                    <span>Expected output/return value: </span>
                                                                    <code>
                                                                        {testCase.expectedOutput}
                                                                    </code>
                                                                </pre>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            ))
                                        }
                                    </div>
                                }

                                {
                                    task.codeExamples?.length > 0 &&
                                    <div className={styles.codeExamplesCnr}>
                                        {
                                            task.codeExamples.map((codeExample, index) => (
                                                <div className={styles.codeExample} key={index}>
                                                    <p className={styles.codeExampleTitle}>{codeExample.title}</p>

                                                    <div className={styles.inputOutputCnr}>
                                                        <pre className={styles.codeExamplePre}>
                                                            <button
                                                                className={styles.copyButton}
                                                                onClick={() => handleCopy(codeExample.code)}
                                                            >
                                                                <span aria-live="polite">
                                                                    {
                                                                        copied
                                                                            ? <>
                                                                                <FontAwesomeIcon icon={faCheck} /> Copied
                                                                            </>
                                                                            : <>
                                                                                <FontAwesomeIcon icon={faCopy} /> Copy code
                                                                            </>
                                                                    }
                                                                </span>
                                                            </button>


                                                            <code>
                                                                {codeExample.code}
                                                            </code>
                                                        </pre>

                                                        {
                                                            codeExample.output &&
                                                            <pre>
                                                                <p>Output: </p>
                                                                <code>
                                                                    {codeExample.output}
                                                                </code>
                                                            </pre>
                                                        }
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                }

                                {
                                    task.htmlElements?.length > 0 &&
                                    <div className={styles.htmlElementsCnr}>
                                        {
                                            task.htmlElements.map((htmlElement, index) => (
                                                <div className={styles.htmlElement} key={index}>
                                                    <p className={styles.htmlElementTitle}>{htmlElement.title}</p>

                                                    <div className={styles.elementBox}>
                                                        {htmlElement.css && <style>{htmlElement.css}</style>}

                                                        <div dangerouslySetInnerHTML={{ __html: htmlElement.html }} />
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                }
                            </div>
                        ))
                    }
                </section>
            }

            <section className={styles.questionsSection}>
                <h2>Questions</h2>
                <p>Try your best to answer these questions and test your understanding of the topic.</p>
                <ol className={styles.questionsList}>
                    {
                        planet.questions.map((question, index) => <li key={index}>{question}</li>)
                    }
                </ol>
            </section>
        </main>
    )
}
