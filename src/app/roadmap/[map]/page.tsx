'use client'
import { PlanetData } from '@/types/types';
import React, { use, useEffect, useState } from 'react';
import styles from './page.module.scss';
import axios from 'axios';
import Planet from './components/Planet';

export default function Road({ params }: { params: Promise<{ map: string }> }) {

    const { map } = use(params);
    const [planets, setPlanets] = useState<PlanetData[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const getPlanets = async () => {
            try {
                const res = await axios.get<PlanetData[]>(`http://localhost:5000/${map}`);
                setPlanets(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        getPlanets();
    }, [map]);


    if (loading) return <div>Loading</div>;
    return (
        <main className={styles.page}>
            <div className={styles.wrapper}>
                <div className={styles.stars}></div>
                <div className={styles.stars2}></div>
                <div className={styles.stars3}></div>
            </div>
            {
                planets.length === 0
                    ? <div>No section to display</div>
                    : planets.map(planet => (
                        <Planet key={planet.name} planet={planet} />
                    ))
            }

        </main>
    );
}