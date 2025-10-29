import Link from 'next/link';
import styles from './planet.module.scss';
import Image from 'next/image';
import { IPlanet } from '@/types/types';
import { usePathname } from 'next/navigation';

interface PlanetProps {
    planet: IPlanet;
}

const Planet = ({ planet }: PlanetProps) => {
    const pathname = usePathname();

    return (
        <section className={styles.planetSection}>
            <div className={styles.planetCnr}>
                <Link scroll={false} href={`${pathname}/${planet.name}`} className={styles.link}>
                    <Image
                        src={planet.image}
                        alt={planet.name}
                        width={1024}
                        height={1024}
                        className={styles.planet}
                        loading="lazy"
                    />
                </Link>
                <div className={styles.orbit}>
                    {planet.tags[0] && <div className={styles.satellite}>{planet.tags[0]}</div>}
                    {planet.tags[1] && <div className={styles.satellite}>{planet.tags[1]}</div>}
                    {planet.tags[2] && <div className={styles.satellite}>{planet.tags[2]}</div>}
                    {planet.tags[3] && <div className={styles.satellite}>{planet.tags[3]}</div>}
                </div>

                <div className={styles.outerOrbit}></div>

            </div>
        </section>
    );
};

export default Planet;